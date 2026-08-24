import { useEffect, useRef } from 'react';

/**
 * Tela al viento, tramada. Se dibuja en la GPU.
 *
 * El mismo efecto calculado en JavaScript costaba unos cinco millones de
 * operaciones por fotograma y la página se arrastraba a 3 fps. Aquí el ruido,
 * el pliegue y la trama van en un shader de fragmento: la tarjeta gráfica
 * resuelve todos los píxeles a la vez y sobra tiempo de sobra por cuadro.
 *
 * El tejido sale de ruido fractal con el dominio distorsionado —se usa un
 * ruido para desplazar las coordenadas de otro—, que es lo que produce
 * pliegues en lugar de manchas. La trama es una matriz de Bayer 4x4: cada
 * punto se enciende o se apaga, nunca se mezcla.
 */

const VERTICE = `
attribute vec2 posicion;
void main() {
  gl_Position = vec4(posicion, 0.0, 1.0);
}`;

const FRAGMENTO = `
precision highp float;

uniform vec2 resolucion;
uniform float tiempo;
uniform vec3 tinta;
uniform float escala;
uniform float contraste;
uniform sampler2D imagen;
uniform bool hayImagen;
// Por dónde se apaga la tela: x arriba, y abajo. 0 llega al borde, 1 se
// desvanece antes de alcanzarlo.
uniform vec2 desvanece;

// Ruido de valor: hash por celda e interpolación suave entre esquinas
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float ruido(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Cuatro octavas: la primera da la forma, las demás el tejido fino
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * ruido(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

// Umbral ordenado 4x4: de aquí sale la trama de puntos
float bayer(vec2 pixel) {
  vec2 p = mod(floor(pixel), 4.0);
  int x = int(p.x);
  int y = int(p.y);
  float m[16];
  m[0]=0.0;  m[1]=8.0;  m[2]=2.0;  m[3]=10.0;
  m[4]=12.0; m[5]=4.0;  m[6]=14.0; m[7]=6.0;
  m[8]=3.0;  m[9]=11.0; m[10]=1.0; m[11]=9.0;
  m[12]=15.0;m[13]=7.0; m[14]=13.0;m[15]=5.0;
  int idx = y * 4 + x;
  float valor = 0.0;
  for (int i = 0; i < 16; i++) {
    if (i == idx) valor = m[i];
  }
  return (valor + 0.5) / 16.0;
}

void main() {
  // Se cuantiza a la rejilla de la trama para que el punto sea del tamaño pedido
  vec2 pixel = floor(gl_FragCoord.xy / escala);
  vec2 uv = pixel * escala / resolucion;
  float proporcion = resolucion.x / resolucion.y;

  float intensidad;

  if (hayImagen) {
    // Con imagen de fondo, es ella la que pone la forma: se lee su
    // luminancia y se agita con ruido, de modo que la materia sea real
    // y el movimiento, calculado.
    vec2 vaiven = vec2(
      fbm(uv * 2.4 + vec2(tiempo * 0.9, 0.0)) - 0.5,
      fbm(uv * 2.4 + vec2(0.0, tiempo * 0.6 + 7.3)) - 0.5
    ) * 0.035;

    vec3 muestra = texture2D(imagen, vec2(uv.x, 1.0 - uv.y) + vaiven).rgb;
    float luz = dot(muestra, vec3(0.299, 0.587, 0.114));
    intensidad = clamp((luz - 0.5) * contraste + 0.5, 0.0, 1.0);
  } else {
    // Sin imagen, la forma se genera: el campo se arrastra en diagonal,
    // como si el viento soplara siempre hacia el mismo lado.
    vec2 d = vec2(uv.x * proporcion * 2.6 - tiempo * 1.6, uv.y * 3.4 + tiempo * 0.55);

    // Distorsionar el dominio con otro ruido es lo que ondula el tejido
    float deforma = fbm(d * 0.7 + vec2(4.2, -1.7));
    float campo = fbm(d + deforma * vec2(1.9, 1.3));

    // Doblar el campo sobre sí mismo marca las crestas del pliegue
    campo = 1.0 - abs(campo - 0.5) * 2.0;

    // La tela se apaga sólo por donde se le pida
    float arriba = mix(1.0, smoothstep(0.0, 0.34, uv.y), desvanece.x);
    float abajo = mix(1.0, smoothstep(1.0, 0.66, uv.y), desvanece.y);
    intensidad = clamp((campo * arriba * abajo - 0.42) * contraste, 0.0, 1.0);
  }

  float encendido = step(bayer(pixel), intensidad);
  gl_FragColor = vec4(tinta, encendido);
}`;

// El mismo lila en los dos temas. En oscuro se probó uno más claro y salía
// chillón: sobre fondo negro, subir el brillo del punto lo que hace es
// separarlo del fondo, no integrarlo.
const TINTA = {
  light: [138 / 255, 96 / 255, 214 / 255],
  dark: [138 / 255, 96 / 255, 214 / 255],
};

function compilar(gl, tipo, fuente) {
  const shader = gl.createShader(tipo);
  gl.shaderSource(shader, fuente);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * @param {number} escala - lado del punto de la trama, en píxeles
 * @param {string} [imagen] - ruta a una imagen propia que haga de materia.
 *   Sin ella el fondo se genera con ruido; con ella se trama la imagen, que es
 *   como se consiguen formas de humo o tela creíbles.
 * @param {number} contraste - cuánto se separan luces y sombras antes de tramar
 */
export default function FondoFluido({
  escala = 3,
  imagen,
  contraste = 3.1,
  desvanece = [1, 1],
  className = '',
}) {
  const refLienzo = useRef(null);

  useEffect(() => {
    const lienzo = refLienzo.current;
    if (!lienzo) return;

    const gl = lienzo.getContext('webgl', { alpha: true, antialias: false, depth: false });
    if (!gl) return;

    const vs = compilar(gl, gl.VERTEX_SHADER, VERTICE);
    const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO);
    if (!vs || !fs) return;

    const programa = gl.createProgram();
    gl.attachShader(programa, vs);
    gl.attachShader(programa, fs);
    gl.linkProgram(programa);
    if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
      console.error('Programa:', gl.getProgramInfoLog(programa));
      return;
    }
    gl.useProgram(programa);

    // Dos triángulos que cubren la pantalla
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const attr = gl.getAttribLocation(programa, 'posicion');
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);

    const uResolucion = gl.getUniformLocation(programa, 'resolucion');
    const uTiempo = gl.getUniformLocation(programa, 'tiempo');
    const uTinta = gl.getUniformLocation(programa, 'tinta');
    const uEscala = gl.getUniformLocation(programa, 'escala');
    const uContraste = gl.getUniformLocation(programa, 'contraste');
    const uDesvanece = gl.getUniformLocation(programa, 'desvanece');
    const uImagen = gl.getUniformLocation(programa, 'imagen');
    const uHayImagen = gl.getUniformLocation(programa, 'hayImagen');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(uEscala, escala);
    gl.uniform1f(uContraste, contraste);
    gl.uniform2f(uDesvanece, desvanece[0], desvanece[1]);
    gl.uniform1i(uHayImagen, 0);

    // La imagen, si la hay, entra como textura en cuanto termina de cargar
    let textura = null;
    let anulado = false;
    if (imagen) {
      const foto = new Image();
      foto.crossOrigin = 'anonymous';
      foto.onload = () => {
        if (anulado) return;
        textura = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textura);
        // Sin mipmaps y con borde fijado: la imagen no tiene por qué medir
        // una potencia de dos, y así WebGL 1 la acepta igual.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, foto);
        gl.useProgram(programa);
        gl.uniform1i(uImagen, 0);
        gl.uniform1i(uHayImagen, 1);
      };
      foto.src = imagen;
    }

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cuadro = 0;

    const aplicarTinta = () => {
      const c = TINTA[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
      gl.useProgram(programa);
      gl.uniform3fv(uTinta, c);
    };

    const medir = () => {
      const caja = lienzo.getBoundingClientRect();
      // Se limita a 1x: la trama ya es gruesa y el doble de píxeles no se nota
      const w = Math.max(1, Math.round(caja.width));
      const h = Math.max(1, Math.round(caja.height));
      if (lienzo.width !== w || lienzo.height !== h) {
        lienzo.width = w;
        lienzo.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.useProgram(programa);
      gl.uniform2f(uResolucion, w, h);
    };

    const pintar = (ms) => {
      gl.useProgram(programa);
      gl.uniform1f(uTiempo, ms * 0.00006);
      if (textura) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textura);
      }
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const bucle = (t) => {
      pintar(t);
      cuadro = requestAnimationFrame(bucle);
    };

    aplicarTinta();
    medir();
    if (quieto) pintar(0);
    else cuadro = requestAnimationFrame(bucle);

    const observador = new ResizeObserver(() => {
      medir();
      if (quieto) pintar(0);
    });
    observador.observe(lienzo);

    const vigilante = new MutationObserver(() => {
      aplicarTinta();
      if (quieto) pintar(0);
    });
    vigilante.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      anulado = true;
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      vigilante.disconnect();
      if (textura) gl.deleteTexture(textura);
      gl.deleteProgram(programa);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
    // Se depende de los valores y no del array: uno nuevo en cada render
    // reiniciaría el contexto de WebGL sin motivo.
  }, [escala, imagen, contraste, desvanece[0], desvanece[1]]);

  return (
    <canvas
      ref={refLienzo}
      aria-hidden="true"
      className={`pointer-events-none size-full opacity-70 ${className}`}
    />
  );
}
