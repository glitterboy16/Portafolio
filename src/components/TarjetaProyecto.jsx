import IconoTecnologia from './IconoTecnologia';
import VistaPrevia from './VistaPrevia';
import { useFoco, useRevelar } from '../hooks';

function Enlaces({ web, codigo }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
      {web && (
        <a
          href={web}
          target="_blank"
          rel="noreferrer"
          className="group/enlace inline-flex items-center gap-1.5 text-sm font-semibold text-acento transition-opacity duration-200 ease-suave hover:opacity-75"
        >
          Ver en vivo
          <span className="transition-transform duration-300 ease-suave group-hover/enlace:translate-x-1">
            →
          </span>
        </a>
      )}
      {codigo && (
        <a
          href={codigo}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-texto-2 underline-offset-4 transition-colors duration-200 ease-suave hover:text-texto hover:underline"
        >
          Ver código
        </a>
      )}
    </div>
  );
}

function Stack({ stack }) {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {stack.map((clave) => (
        <li key={clave}>
          <IconoTecnologia clave={clave} />
        </li>
      ))}
    </ul>
  );
}

export default function TarjetaProyecto({ proyecto, indice }) {
  const { nombre, categoria, resumen, aportacion, stack, web, codigo, anio, destacado } = proyecto;
  const foco = useFoco();
  const ref = useRevelar({ retraso: indice * 0.09 });

  if (destacado) {
    return (
      <li ref={ref} className="col-span-full">
        <div
          {...foco}
          className="vidrio foco vidrio-alto group relative overflow-hidden rounded-[clamp(1.25rem,2.5vw,2rem)] p-[clamp(1.25rem,3.5vw,2.5rem)]"
        >
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-full border border-acento/40 bg-acento-suave px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-acento">
              Destacado
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-texto-3">
              {categoria} · {anio}
            </span>
          </div>

          <h3 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-tight tracking-[-0.025em]">
            {nombre}
          </h3>
          <p className="mt-3 max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.0625rem)] text-texto-2">{resumen}</p>
          {aportacion && <p className="mt-2 max-w-[60ch] text-sm text-texto-3">{aportacion}</p>}

          {web && (
            <a
              href={web}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir ${nombre} en una pestaña nueva`}
              className="mt-7 block transition-transform duration-500 ease-suave hover:scale-[1.01]"
            >
              <VistaPrevia url={web} nombre={nombre} proporcion={16 / 9} />
            </a>
          )}

          <div className="mt-6">
            <Stack stack={stack} />
          </div>
          <Enlaces web={web} codigo={codigo} />
        </div>
      </li>
    );
  }

  return (
    <li ref={ref}>
      <div
        {...foco}
        className="vidrio foco group flex h-full flex-col rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1.1rem,2.5vw,1.5rem)] transition-transform duration-500 ease-suave hover:-translate-y-1.5"
      >
        {web && (
          <a
            href={web}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${nombre} en una pestaña nueva`}
            className="mb-5 block"
          >
            <VistaPrevia url={web} nombre={nombre} />
          </a>
        )}

        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-texto-3">
          {categoria} · {anio}
        </p>
        <h3 className="text-[clamp(1.1rem,2.2vw,1.3rem)] font-semibold tracking-tight">{nombre}</h3>
        <p className="mt-2 flex-1 text-sm text-texto-2">{resumen}</p>

        <div className="mt-5">
          <Stack stack={stack} />
        </div>
        <Enlaces web={web} codigo={codigo} />
      </div>
    </li>
  );
}
