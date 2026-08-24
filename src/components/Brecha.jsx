import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, quieto } from '../gsap';

const IZQUIERDA = 'DE LA IDEA';
const DERECHA = 'AL DEPLOY';
const PASOS = ['idea', 'diseño', 'código', 'deploy'];

/**
 * El hueco que se cierra.
 *
 * Las dos mitades del titular llegan separadas y se juntan atadas al scroll:
 * ScrollTrigger con `scrub` liga el avance de la línea de tiempo a la posición
 * de la sección, así que el cierre obedece a la rueda, no a un reloj. Cada
 * letra entra con su propio retardo, de modo que se lee como un fuelle.
 *
 * En el hueco hay una terminal escribiendo las fases del trabajo: lo que
 * separa una idea de una web publicada es, literalmente, ese trecho.
 */
export default function Brecha() {
  const raiz = useRef(null);
  const izq = useRef(null);
  const der = useRef(null);
  const hueco = useRef(null);
  const [paso, setPaso] = useState(0);

  useLayoutEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;

    const contexto = gsap.context(() => {
      const letrasIzq = izq.current.querySelectorAll('span');
      const letrasDer = der.current.querySelectorAll('span');

      if (quieto()) {
        gsap.set([izq.current, der.current], { x: 0 });
        gsap.set([...letrasIzq, ...letrasDer], { x: 0, opacity: 1 });
        gsap.set(hueco.current, { scale: 1, opacity: 1 });
        return;
      }

      const t = gsap.timeline({
        scrollTrigger: {
          trigger: nodo,
          start: 'top 85%',
          end: 'center 55%',
          scrub: 0.6,
        },
      });

      // Las mitades entran abiertas y se cierran
      t.fromTo(izq.current, { xPercent: -14 }, { xPercent: 0, ease: 'none' }, 0)
        .fromTo(der.current, { xPercent: 14 }, { xPercent: 0, ease: 'none' }, 0)
        // Dentro de cada mitad, las letras del borde interior llegan antes
        .fromTo(
          letrasIzq,
          { xPercent: -30, opacity: 0.25 },
          { xPercent: 0, opacity: 1, ease: 'none', stagger: { each: 0.05, from: 'end' } },
          0,
        )
        .fromTo(
          letrasDer,
          { xPercent: 30, opacity: 0.25 },
          { xPercent: 0, opacity: 1, ease: 'none', stagger: 0.05 },
          0,
        )
        .fromTo(hueco.current, { scale: 0.8, opacity: 0.3 }, { scale: 1, opacity: 1, ease: 'none' }, 0);
    }, nodo);

    return () => contexto.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPaso((p) => (p + 1) % PASOS.length), 1400);
    return () => clearInterval(id);
  }, []);

  const letras = (texto) =>
    [...texto].map((letra, i) => (
      <span key={i} className="inline-block">
        {letra === ' ' ? ' ' : letra}
      </span>
    ));

  return (
    <section ref={raiz} className="overflow-hidden py-[clamp(3.5rem,8vw,6rem)]">
      <div className="flex items-center justify-center font-[Archivo] text-[clamp(1.35rem,6vw,4.75rem)] font-extrabold uppercase leading-none tracking-[-0.04em] [font-stretch:118%]">
        <span ref={izq} className="flex whitespace-nowrap">
          {letras(IZQUIERDA)}
        </span>

        <span
          ref={hueco}
          aria-hidden="true"
          className="mx-[clamp(0.4rem,1.2vw,1rem)] grid shrink-0 place-items-center border border-borde bg-fondo-2/80 backdrop-blur-sm"
          style={{ width: 'clamp(2.6rem,7vw,5.5rem)', height: 'clamp(2.6rem,7vw,5.5rem)' }}
        >
          <span className="font-sans text-[clamp(0.5rem,1.4vw,0.8125rem)] font-medium normal-case tracking-normal text-acento">
            {PASOS[paso]}
            <span className="ml-px inline-block w-[0.5ch] animate-pulse bg-acento text-transparent">.</span>
          </span>
        </span>

        <span ref={der} className="flex whitespace-nowrap">
          {letras(DERECHA)}
        </span>
      </div>

      <p className="mx-auto mt-[clamp(2rem,5vw,3.5rem)] max-w-[46ch] text-balance px-4 text-center text-[clamp(0.95rem,1.8vw,1.0625rem)] text-texto-2">
        Entre una idea y una web publicada hay diseño, código y un montón de decisiones pequeñas. Ese
        trecho es justo lo que hago yo.
      </p>
    </section>
  );
}
