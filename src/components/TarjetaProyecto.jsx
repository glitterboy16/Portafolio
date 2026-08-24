import IconoTecnologia from './IconoTecnologia';
import VistaPrevia from './VistaPrevia';
import { useFoco, useRevelar } from '../hooks';
import { useIdioma } from '../idioma';

/**
 * Tarjeta de proyecto. Todas pesan lo mismo: no hay destacado, porque todos
 * los proyectos importan igual. Además de la vista en vivo, cada una cuenta
 * qué puso Angel de su parte, que es lo que a un cliente le dice algo.
 */
export default function TarjetaProyecto({ proyecto, indice }) {
  const { nombre, categoria, resumen, aportacion, stack, web, codigo, anio } = proyecto;
  const foco = useFoco();
  const ref = useRevelar({ retraso: indice * 0.09 });
  const { t } = useIdioma();

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
            aria-label={t({ es: `Abrir ${nombre} en una pestaña nueva`, en: `Open ${nombre} in a new tab` })}
            className="mb-5 block"
          >
            <VistaPrevia url={web} nombre={nombre} />
          </a>
        )}

        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-texto-3">
          {t(categoria)} · {anio}
        </p>
        <h3 className="text-[clamp(1.1rem,2.2vw,1.3rem)] font-semibold tracking-tight">{nombre}</h3>
        <p className="mt-2 text-sm text-texto-2">{t(resumen)}</p>

        {/* Lo que puso Angel: separado por una regla, como una ficha técnica */}
        {aportacion && (
          <div className="mt-4 border-t border-borde pt-3">
            <p className="marbete mb-1">{t({ es: 'Mi parte', en: 'My part' })}</p>
            <p className="text-sm text-texto-2">{t(aportacion)}</p>
          </div>
        )}

        <div className="mt-auto pt-5">
          <ul className="flex flex-wrap items-center gap-4">
            {stack.map((clave) => (
              <li key={clave}>
                <IconoTecnologia clave={clave} />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {web && (
              <a
                href={web}
                target="_blank"
                rel="noreferrer"
                className="group/enlace inline-flex items-center gap-1.5 text-sm font-semibold text-acento transition-opacity duration-200 ease-suave hover:opacity-75"
              >
                {t({ es: 'Ver en vivo', en: 'View live' })}
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
                {t({ es: 'Ver código', en: 'View code' })}
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
