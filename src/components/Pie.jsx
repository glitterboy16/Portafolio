import { useEffect, useState } from 'react';
import FondoFluido from './FondoFluido';
import Logotipo from './Logotipo';
import { PERFIL } from '../data/perfil';

/** Hora de Mérida en directo: la web sabe qué hora es donde trabajo. */
function useReloj() {
  const [ahora, setAhora] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formato = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const fecha = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return { hora: formato.format(ahora), fecha: fecha.format(ahora) };
}

export default function Pie({ onIr, secciones }) {
  const { hora, fecha } = useReloj();

  return (
    <footer className="relative mt-[clamp(3rem,8vw,6rem)] overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-[clamp(0.875rem,2.5vw,2.5rem)]">
        <div className="grid gap-10 border-t border-borde py-[clamp(2.5rem,6vw,4rem)] sm:grid-cols-2">
          <ul className="max-w-[22rem]">
            {secciones.map(({ id, etiqueta }) => (
              <li key={id} className="border-t border-borde last:border-b">
                <button
                  onClick={() => onIr(id)}
                  className="w-full py-3 text-left text-[clamp(1.4rem,4vw,2rem)] font-medium tracking-[-0.02em] text-texto-2 transition-colors duration-200 ease-suave hover:text-texto"
                >
                  {etiqueta}
                </button>
              </li>
            ))}
          </ul>

          <div className="sm:justify-self-end sm:text-right">
            <p className="marbete mb-3">Dónde encontrarme</p>
            <ul className="flex gap-2 sm:justify-end">
              {PERFIL.redes.map(({ nombre, href }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-borde px-3 py-2 text-[0.8125rem] text-texto-2 transition-colors duration-200 ease-suave hover:border-borde-fuerte hover:text-texto"
                  >
                    {nombre}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:villorinaangelandres@gmail.com"
                  className="block border border-borde px-3 py-2 text-[0.8125rem] text-texto-2 transition-colors duration-200 ease-suave hover:border-borde-fuerte hover:text-texto"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-[clamp(1.5rem,4vw,2.5rem)] text-xs text-texto-3">
          <p>
            Mérida {hora}
            <br />
            <span className="capitalize">{fecha}</span>
          </p>
          <button
            onClick={() => {
              onIr('portada');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="transition-colors duration-200 ease-suave hover:text-texto"
          >
            Volver arriba ↑
          </button>
          <p>© {new Date().getFullYear()} Angel Villorina</p>
        </div>
      </div>

      {/* Franja final: el mismo fluido de la portada, cerrando el círculo */}
      <div className="relative h-[clamp(9rem,22vw,15rem)]">
        <div className="absolute inset-0">
          <FondoFluido escala={3} />
        </div>
        <div className="relative flex h-full items-end justify-between px-[clamp(0.875rem,2.5vw,2.5rem)] pb-[clamp(1rem,3vw,2rem)]">
          <Logotipo tamano="clamp(1.6rem,4vw,2.4rem)" />
          <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] font-medium">
            ⌜ Que se note lo bueno que ya haces. ⌟
          </p>
        </div>
      </div>
    </footer>
  );
}
