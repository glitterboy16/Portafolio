import Cabecera from './Cabecera';
import { PERFIL } from '../data/perfil';

export default function Resumen() {
  return (
    <article>
      <Cabecera sobretitulo="Trayectoria" titulo="Resumen." />

      <section className="animate-aparecer mb-12 [animation-delay:80ms]">
        <h3 className="mb-4 text-xl font-semibold tracking-tight">Educación</h3>
        <ol className="flex max-w-[640px] flex-col gap-4">
          {PERFIL.educacion.map(({ titulo, fecha, descripcion }) => (
            <li
              key={titulo}
              className="rounded-2xl border border-borde bg-superficie p-6 transition-colors duration-300 ease-suave hover:border-borde-fuerte"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4">
                <h4 className="font-semibold tracking-tight">{titulo}</h4>
                <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] text-texto-3">
                  {fecha}
                </span>
              </div>
              <p className="max-w-[56ch] text-sm text-texto-2">{descripcion}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="animate-aparecer [animation-delay:160ms]">
        <h3 className="mb-4 text-xl font-semibold tracking-tight">Experiencia</h3>
        <div className="max-w-[640px] rounded-2xl border border-dashed border-borde-fuerte p-6 text-sm text-texto-2">
          <p className="mb-1 font-semibold text-texto">Trabajando con clientes reales</p>
          <p>
            Los proyectos de esta página están en producción y en uso. Abierto a prácticas y primeras oportunidades
            profesionales.
          </p>
        </div>
      </section>
    </article>
  );
}
