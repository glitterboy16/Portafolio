import Cabecera from './Cabecera';
import { PERFIL } from '../data/perfil';
import { useFoco } from '../hooks';

function Hito({ titulo, fecha, descripcion, retraso }) {
  const foco = useFoco();

  return (
    <li
      {...foco}
      style={{ animationDelay: `${retraso}ms` }}
      className="vidrio foco animate-aparecer rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1.25rem,2.5vw,1.75rem)] transition-transform duration-500 ease-suave hover:-translate-y-1"
    >
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-semibold tracking-tight">{titulo}</h4>
        <span className="whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-texto-3">
          {fecha}
        </span>
      </div>
      <p className="max-w-[58ch] text-sm text-texto-2">{descripcion}</p>
    </li>
  );
}

export default function Resumen() {
  return (
    <article>
      <Cabecera sobretitulo="Trayectoria" titulo="Resumen." />

      <section className="mb-[clamp(2.5rem,5vw,4rem)]">
        <h3 className="animate-aparecer mb-4 text-[clamp(1.2rem,2.2vw,1.4rem)] font-semibold tracking-tight [animation-delay:260ms]">
          Educación
        </h3>
        <ol className="flex max-w-[42rem] flex-col gap-4">
          {PERFIL.educacion.map((hito, i) => (
            <Hito key={hito.titulo} {...hito} retraso={320 + i * 90} />
          ))}
        </ol>
      </section>

      <section>
        <h3 className="animate-aparecer mb-4 text-[clamp(1.2rem,2.2vw,1.4rem)] font-semibold tracking-tight [animation-delay:420ms]">
          Experiencia
        </h3>
        <div className="animate-aparecer max-w-[42rem] rounded-[clamp(1rem,2vw,1.5rem)] border border-dashed border-borde-fuerte p-[clamp(1.25rem,2.5vw,1.75rem)] text-sm text-texto-2 [animation-delay:480ms]">
          <p className="mb-1 font-semibold text-texto">Trabajando con clientes reales</p>
          <p>
            Los proyectos de esta página están en producción y en uso. Abierto a prácticas y primeras
            oportunidades profesionales.
          </p>
        </div>
      </section>
    </article>
  );
}
