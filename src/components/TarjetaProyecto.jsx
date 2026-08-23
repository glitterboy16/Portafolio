import IconoTecnologia from './IconoTecnologia';
import VistaPrevia from './VistaPrevia';

function Enlaces({ web, codigo }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {web && (
        <a
          href={web}
          target="_blank"
          rel="noreferrer"
          className="group/enlace inline-flex items-center gap-1.5 text-sm font-semibold text-acento transition-opacity duration-150 ease-suave hover:opacity-75"
        >
          Ver en vivo
          <span className="transition-transform duration-300 ease-suave group-hover/enlace:translate-x-1">→</span>
        </a>
      )}
      {codigo && (
        <a
          href={codigo}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-texto-2 underline-offset-4 transition-colors duration-150 ease-suave hover:text-texto hover:underline"
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

  if (destacado) {
    return (
      <li
        className="animate-aparecer group relative overflow-hidden rounded-3xl border border-borde bg-superficie p-8 transition-all duration-300 ease-suave hover:border-borde-fuerte sm:col-span-2 lg:p-10"
        style={{ animationDelay: `${80 + indice * 60}ms` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-acento/10 blur-3xl"
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-acento/40 bg-acento/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-acento">
              Destacado
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-texto-3">
              {categoria} · {anio}
            </span>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{nombre}</h3>
          <p className="mt-3 max-w-[60ch] text-[1.0625rem] text-texto-2">{resumen}</p>
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
    <li
      className="animate-aparecer group flex flex-col rounded-2xl border border-borde bg-superficie p-6 transition-all duration-300 ease-suave hover:-translate-y-1 hover:border-borde-fuerte hover:shadow-[0_16px_40px_oklch(0_0_0/0.35)]"
      style={{ animationDelay: `${80 + indice * 60}ms` }}
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

      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-texto-3">
        {categoria} · {anio}
      </p>
      <h3 className="text-xl font-semibold tracking-tight">{nombre}</h3>
      <p className="mt-2 flex-1 text-sm text-texto-2">{resumen}</p>

      <div className="mt-5">
        <Stack stack={stack} />
      </div>
      <Enlaces web={web} codigo={codigo} />
    </li>
  );
}
