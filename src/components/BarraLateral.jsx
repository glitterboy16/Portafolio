import { useState } from 'react';
import { PERFIL } from '../data/perfil';
import { useFoco } from '../hooks';

const ICONOS_RED = {
  GitHub: (
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
    />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </g>
  ),
};

export default function BarraLateral() {
  const [clicks, setClicks] = useState(0);
  const foco = useFoco();
  const foto = clicks >= 5 ? PERFIL.gif : PERFIL.foto;

  return (
    <aside
      {...foco}
      className="vidrio foco animate-aparecer w-full shrink-0 rounded-[clamp(1.25rem,2.5vw,2rem)] p-[clamp(1.25rem,3vw,2rem)] lg:sticky lg:top-[clamp(0.875rem,2.5vw,2.5rem)] lg:w-[clamp(17rem,24vw,20rem)]"
    >
      {/* En columna (escritorio) el retrato manda y va centrado; en horizontal
          se pone al lado del nombre para no desperdiciar el ancho. */}
      <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
        <figure className="relative shrink-0 lg:mb-5">
          {/* Halo lila detrás del retrato */}
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full bg-acento/25 blur-xl"
          />
          <img
            src={foto}
            alt={PERFIL.nombre}
            width={200}
            height={200}
            onClick={() => setClicks((n) => n + 1)}
            className="relative size-[clamp(5rem,14vw,11.5rem)] cursor-pointer rounded-full border border-borde-fuerte object-cover shadow-[0_14px_40px_-12px_var(--c-sombra)] transition-transform duration-500 ease-suave hover:scale-[1.03] active:scale-95"
          />
        </figure>

        <div className="min-w-0 flex-1 lg:flex-none lg:text-center">
          <h1 className="text-[clamp(1.25rem,3.5vw,1.6rem)] font-bold leading-tight tracking-tight">
            {PERFIL.nombre}
          </h1>
          <p className="mt-1 text-sm text-texto-2">{PERFIL.cargo}</p>
        </div>
      </div>

      <div className="my-6 h-px bg-borde" />

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-5 gap-y-4 lg:grid-cols-1">
        {PERFIL.contacto.map(({ etiqueta, valor, href, ancho }) => (
          <li key={etiqueta} className={`min-w-0 ${ancho ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-texto-3">{etiqueta}</p>
            {href ? (
              <a
                href={href}
                className="break-words text-sm transition-colors duration-200 ease-suave hover:text-acento"
              >
                {valor}
              </a>
            ) : (
              <p className="break-words text-sm">{valor}</p>
            )}
          </li>
        ))}
      </ul>

      <div className="my-6 h-px bg-borde" />

      <ul className="flex justify-center gap-3">
        {PERFIL.redes.map(({ nombre, href }) => (
          <li key={nombre}>
            <a
              href={href}
              aria-label={nombre}
              target="_blank"
              rel="noreferrer"
              className="vidrio grid size-11 place-items-center rounded-full text-texto-2 transition-all duration-300 ease-suave hover:-translate-y-0.5 hover:scale-105 hover:text-acento active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                {ICONOS_RED[nombre]}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
