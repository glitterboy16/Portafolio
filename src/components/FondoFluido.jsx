import { useEffect, useRef } from 'react';

/**
 * Fluido tramado.
 *
 * Se calcula un campo de ondas a resolución muy baja (un píxel del buffer son
 * varios de pantalla) y cada punto se decide contra una matriz de Bayer 4x4:
 * en lugar de mezclar color, se enciende o se apaga. De ahí sale la trama de
 * puntos, y de la baja resolución sale que se mueva con soltura en un móvil.
 */

// Matriz de Bayer 4x4 normalizada: el umbral que hace de trama.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((fila) => fila.map((v) => (v + 0.5) / 16));

// La tinta se fija aquí y no se lee del CSS: el canvas necesita un rgb suelto
// y resolver oklch a mano cuesta más de lo que aporta.
const TINTA = {
  light: [150, 108, 220],
  dark: [178, 138, 250],
};

export default function FondoFluido({ escala = 6, className = '' }) {
  const refLienzo = useRef(null);

  useEffect(() => {
    const lienzo = refLienzo.current;
    if (!lienzo) return;
    const ctx = lienzo.getContext('2d');
    if (!ctx) return;

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cuadro = 0;
    let imagen = null;
    let ancho = 0;
    let alto = 0;
    let tinta = TINTA.dark;

    const releerTema = () => {
      tinta = TINTA[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'];
    };

    const medir = () => {
      const caja = lienzo.getBoundingClientRect();
      ancho = Math.max(1, Math.ceil(caja.width / escala));
      alto = Math.max(1, Math.ceil(caja.height / escala));
      lienzo.width = ancho;
      lienzo.height = alto;
      imagen = ctx.createImageData(ancho, alto);
    };

    const pintar = (t) => {
      if (!imagen) return;
      const datos = imagen.data;
      const [r, g, b] = tinta;

      for (let y = 0; y < alto; y++) {
        const v = y / alto;
        for (let x = 0; x < ancho; x++) {
          const u = x / ancho;

          // Tres senos desfasados: una forma orgánica que no se repite a ojo
          const onda =
            Math.sin(u * 3.1 + t * 0.00021) * 0.5 +
            Math.sin(u * 1.7 - v * 2.3 + t * 0.00017) * 0.35 +
            Math.sin(v * 4.2 + u * 1.1 - t * 0.00013) * 0.3;

          // Banda difusa que ondula por el centro
          const distancia = Math.abs(v - 0.52 - onda * 0.13);
          let intensidad = 1 - distancia * 3.4;
          intensidad = Math.max(0, Math.min(1, intensidad));
          intensidad *= intensidad;

          const encendido = intensidad > BAYER[y & 3][x & 3];
          const i = (y * ancho + x) * 4;
          datos[i] = r;
          datos[i + 1] = g;
          datos[i + 2] = b;
          // Los puntos apagados quedan transparentes: el fondo se ve entre ellos
          datos[i + 3] = encendido ? 255 : 0;
        }
      }

      ctx.putImageData(imagen, 0, 0);
    };

    const bucle = (t) => {
      pintar(t);
      cuadro = requestAnimationFrame(bucle);
    };

    releerTema();
    medir();
    if (quieto) pintar(0);
    else cuadro = requestAnimationFrame(bucle);

    const observador = new ResizeObserver(() => {
      medir();
      if (quieto) pintar(0);
    });
    observador.observe(lienzo);

    const vigilante = new MutationObserver(releerTema);
    vigilante.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      vigilante.disconnect();
    };
  }, [escala]);

  return (
    <canvas
      ref={refLienzo}
      aria-hidden="true"
      className={`pointer-events-none size-full opacity-35 [image-rendering:pixelated] ${className}`}
    />
  );
}
