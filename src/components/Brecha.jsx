import { useEffect, useRef, useState } from 'react';

const IZQUIERDA = 'DE LA IDEA';
const DERECHA = 'AL DEPLOY';

/**
 * El hueco que se cierra.
 *
 * Las dos mitades del titular arrancan separadas y se juntan conforme la
 * sección cruza la pantalla; cada letra llega con un retardo propio, así que
 * el cierre se lee como un fuelle y no como un bloque. En el hueco que dejan
 * hay una terminal que va escribiendo sola: lo que separa una idea de una web
 * publicada es, literalmente, ese trabajo del medio.
 */

const PASOS = ['idea', 'diseño', 'código', 'deploy'];

function Mitad({ texto, lado, avance }) {
  const letras = [...texto];
  // Cerrado del todo, las mitades se tocan; abierto, se van a los lados
  const abertura = (1 - avance) * (lado === 'izq' ? -1 : 1);

  return (
    <span
      className="flex whitespace-nowrap will-change-transform"
      style={{ transform: `translate3d(${abertura * 9}vw, 0, 0)` }}
    >
      {letras.map((letra, i) => {
        // Las letras del borde interior reaccionan antes que las del exterior
        const orden = lado === 'izq' ? letras.length - 1 - i : i;
        const retraso = Math.max(0, Math.min(1, avance * 1.6 - orden * 0.06));
        return (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: `translate3d(${(1 - retraso) * (lado === 'izq' ? -1 : 1) * 1.6}vw, 0, 0)`,
              opacity: 0.28 + retraso * 0.72,
            }}
          >
            {letra === ' ' ? ' ' : letra}
          </span>
        );
      })}
    </span>
  );
}

export default function Brecha() {
  const ref = useRef(null);
  const [avance, setAvance] = useState(0);
  const [paso, setPaso] = useState(0);

  // El avance se ata a la posición de la sección dentro de la ventana
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAvance(1);
      return;
    }

    let cuadro = 0;
    const medir = () => {
      const caja = nodo.getBoundingClientRect();
      const alto = window.innerHeight;
      // 0 cuando entra por abajo, 1 cuando queda centrada
      const bruto = 1 - (caja.top - alto * 0.25) / (alto * 0.75);
      setAvance(Math.max(0, Math.min(1, bruto)));
      cuadro = 0;
    };

    const alDesplazar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('resize', alDesplazar);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener('scroll', alDesplazar);
      window.removeEventListener('resize', alDesplazar);
    };
  }, []);

  // La terminal del hueco va pasando de fase
  useEffect(() => {
    const id = setInterval(() => setPaso((p) => (p + 1) % PASOS.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="py-[clamp(5rem,14vw,10rem)]">
      <div className="flex items-center justify-center overflow-hidden font-[Archivo] text-[clamp(1.35rem,6vw,4.75rem)] font-extrabold uppercase leading-none tracking-[-0.04em] [font-stretch:118%]">
        <Mitad texto={IZQUIERDA} lado="izq" avance={avance} />

        {/* El hueco: una terminal diminuta que hace el trabajo del medio */}
        <span
          aria-hidden="true"
          className="mx-[clamp(0.4rem,1.2vw,1rem)] grid shrink-0 place-items-center border border-borde bg-fondo-2/80 backdrop-blur-sm"
          style={{
            width: 'clamp(2.6rem,7vw,5.5rem)',
            height: 'clamp(2.6rem,7vw,5.5rem)',
            opacity: 0.35 + avance * 0.65,
            transform: `scale(${0.86 + avance * 0.14})`,
          }}
        >
          <span className="font-sans text-[clamp(0.5rem,1.4vw,0.8125rem)] font-medium normal-case tracking-normal text-acento">
            {PASOS[paso]}
            <span className="ml-px inline-block w-[0.5ch] animate-pulse bg-acento text-transparent">.</span>
          </span>
        </span>

        <Mitad texto={DERECHA} lado="der" avance={avance} />
      </div>

      <p className="mx-auto mt-[clamp(2rem,5vw,3.5rem)] max-w-[46ch] text-balance text-center text-[clamp(0.95rem,1.8vw,1.0625rem)] text-texto-2">
        Entre una idea y una web publicada hay diseño, código y un montón de decisiones pequeñas. Ese
        trecho es justo lo que hago yo.
      </p>
    </section>
  );
}
