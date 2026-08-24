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

  // El campo se arrastra en diagonal: el viento sopla siempre hacia un lado
  vec2 d = vec2(uv.x * proporcion * 2.6 - tiempo * 1.6, uv.y * 3.4 + tiempo * 0.55);

  // Distorsionar el dominio con otro ruido es lo que ondula el tejido
  float deforma = fbm(d * 0.7 + vec2(4.2, -1.7));
  float campo = fbm(d + deforma * vec2(1.9, 1.3));

  // Doblar el campo sobre sí mismo marca las crestas del pliegue
  campo = 1.0 - abs(campo - 0.5) * 2.0;

  // La tela se desvanece hacia arriba y hacia abajo
  float velo = sin(3.14159 * clamp(uv.y * 1.12, 0.0, 1.0));
  float intensidad = clamp((campo * velo - 0.42) * 2.6, 0.0, 1.0);

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

export default function FondoFluido({ escala = 3, className = '' }) {
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

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(uEscala, escala);

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
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      vigilante.disconnect();
      gl.deleteProgram(programa);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [escala]);

  return (
    <canvas
      ref={refLienzo}
      aria-hidden="true"
      className={`pointer-events-none size-full opacity-45 ${className}`}
    />
  );
}
