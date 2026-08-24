import { useLayoutEffect, useRef } from 'react';
import { gsap, quieto } from '../gsap';
import { PERFIL } from '../data/perfil';

/**
 * Panel de navegación a pantalla completa.
 *
 * Entra en dos tiempos: primero el telón sube desde abajo con una curva larga,
 * y sólo cuando ya cubre, los enlaces asoman desde detrás de su propia línea.
 * Cada uno lleva su ordinal, que es lo que convierte una lista en un índice.
 */
export default function Menu({ abierto, secciones, activa, onIr }) {
  const raiz = useRef(null);
  const telon = useRef(null);
  const filas = useRef([]);
  const pie = useRef(null);
  const linea = useRef(null);

  useLayoutEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return;

    const contexto = gsap.context(() => {
      if (quieto()) {
        gsap.set(nodo, { autoAlpha: abierto ? 1 : 0 });
        return;
      }

      const t = gsap.timeline({ defaults: { ease: 'salida' } });

      if (abierto) {
        gsap.set(nodo, { autoAlpha: 1, pointerEvents: 'auto' });
        t.fromTo(telon.current, { yPercent: 100 }, { yPercent: 0, duration: 0.72 })
          .fromTo(
            linea.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, transformOrigin: 'left center' },
            '-=0.32',
          )
          .fromTo(
            filas.current,
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.06 },
            '-=0.5',
          )
          .fromTo(pie.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35');
      } else {
        t.to(filas.current, { yPercent: -60, opacity: 0, duration: 0.3, stagger: 0.03 })
          .to(pie.current, { opacity: 0, duration: 0.2 }, 0)
          .to(telon.current, { yPercent: 100, duration: 0.45, ease: 'entrada' }, '-=0.1')
          .set(nodo, { autoAlpha: 0, pointerEvents: 'none' });
      }
    }, nodo);

    return () => contexto.revert();
  }, [abierto]);

  return (
    <div
      ref={raiz}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden opacity-0 lg:hidden"
      aria-hidden={!abierto}
    >
      <div ref={telon} className="absolute inset-0 bg-fondo" />

      <div className="relative flex h-full flex-col justify-between px-[clamp(0.875rem,2.5vw,1.75rem)] pb-8 pt-24">
        <div>
          <span
            ref={linea}
            aria-hidden="true"
            className="mb-2 block h-px w-full origin-left bg-borde-fuerte"
          />
          <ul>
            {secciones.map(({ id, etiqueta }, i) => (
              <li key={id} className="overflow-hidden border-b border-borde">
                <button
                  ref={(el) => (filas.current[i] = el)}
                  onClick={() => onIr(id)}
                  className={`flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-200 ease-suave ${
                    activa === id ? 'text-texto' : 'text-texto-2'
                  }`}
                >
                  <span className="marbete shrink-0 before:content-['']">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[clamp(1.9rem,8vw,2.6rem)] font-medium leading-none tracking-[-0.03em]">
                    {etiqueta}
                  </span>
                  {activa === id && (
                    <span aria-hidden="true" className="ml-auto size-2 shrink-0 self-center bg-solido" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div ref={pie} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="marbete mb-2">Hablemos</p>
            <a
              href="mailto:villorinaangelandres@gmail.com"
              className="text-sm underline-offset-4 hover:underline"
            >
              villorinaangelandres@gmail.com
            </a>
          </div>
          <ul className="flex gap-2">
            {PERFIL.redes.map(({ nombre, href }) => (
              <li key={nombre}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-borde px-3 py-2 text-xs text-texto-2 transition-colors duration-200 ease-suave hover:border-borde-fuerte hover:text-texto"
                >
                  {nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
