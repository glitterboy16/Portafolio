import { useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { PERFIL } from '../data/perfil';

const ICONOS_RED = { GitHub: FaGithub, Instagram: FaInstagram };

export default function BarraLateral() {
  const [clicks, setClicks] = useState(0);
  const foto = clicks >= 5 ? PERFIL.gif : PERFIL.foto;

  return (
    <aside className="animate-aparecer w-full shrink-0 rounded-3xl border border-borde bg-superficie p-6 lg:sticky lg:top-[clamp(1rem,3vw,2.5rem)] lg:w-[312px] lg:p-8 lg:px-6">
      <figure className="mb-6 flex justify-center">
        <img
          src={foto}
          alt={PERFIL.nombre}
          width={132}
          height={132}
          onClick={() => setClicks((n) => n + 1)}
          className="size-28 cursor-pointer rounded-full border border-borde-fuerte object-cover shadow-[0_8px_32px_oklch(0_0_0/0.35)] transition-transform duration-150 ease-suave active:scale-95 lg:size-33"
        />
      </figure>

      <h1 className="text-center text-2xl font-bold leading-tight tracking-tight">{PERFIL.nombre}</h1>
      <p className="mt-1 text-center text-sm text-texto-2">{PERFIL.cargo}</p>

      <div className="my-6 h-px bg-borde" />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-1">
        {PERFIL.contacto.map(({ etiqueta, valor, href }) => (
          <li key={etiqueta}>
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-texto-3">{etiqueta}</p>
            {href ? (
              <a
                href={href}
                className="text-sm break-words transition-colors duration-150 ease-suave hover:text-acento"
              >
                {valor}
              </a>
            ) : (
              <p className="text-sm break-words">{valor}</p>
            )}
          </li>
        ))}
      </ul>

      <div className="my-6 h-px bg-borde" />

      <ul className="flex justify-center gap-3">
        {PERFIL.redes.map(({ nombre, href }) => {
          const Icono = ICONOS_RED[nombre];
          return (
            <li key={nombre}>
              <a
                href={href}
                aria-label={nombre}
                target="_blank"
                rel="noreferrer"
                className="grid size-11 place-items-center rounded-full border border-borde text-texto-2 transition-all duration-150 ease-suave hover:-translate-y-0.5 hover:border-borde-fuerte hover:bg-superficie-alta hover:text-texto active:translate-y-0 active:scale-95"
              >
                <Icono size={20} />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
