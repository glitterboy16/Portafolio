import { useState, useId } from 'react';
import { TECNOLOGIAS } from '../data/tecnologias';

/**
 * Icono de tecnología: gris en reposo, color de marca oficial al enfocar o
 * pasar el ratón, con tooltip acorde a la página.
 *
 * @param {string} clave - clave dentro de TECNOLOGIAS
 * @param {number} tamano - lado del icono en píxeles
 * @param {boolean} conEtiqueta - muestra el nombre junto al icono (píldora de habilidades)
 */
export default function IconoTecnologia({ clave, tamano = 22, conEtiqueta = false }) {
  const tecnologia = TECNOLOGIAS[clave];
  const [activo, setActivo] = useState(false);
  const idTooltip = useId();

  if (!tecnologia) return null;

  const { nombre, color, path } = tecnologia;

  return (
    <span
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      onFocus={() => setActivo(true)}
      onBlur={() => setActivo(false)}
      tabIndex={0}
      aria-describedby={activo && !conEtiqueta ? idTooltip : undefined}
      className={`relative inline-flex items-center gap-2 rounded-full outline-offset-4 transition-all duration-300 ease-suave ${
        conEtiqueta
          ? `border border-borde bg-superficie px-4 py-1.5 text-sm font-medium hover:-translate-y-0.5 hover:border-borde-fuerte ${
              activo ? 'text-texto' : 'text-texto-2'
            }`
          : ''
      }`}
    >
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={tamano}
        height={tamano}
        fill="currentColor"
        style={{ color: activo ? color : undefined }}
        className={`shrink-0 transition-[color,transform] duration-300 ease-suave ${
          activo ? 'scale-110' : 'text-texto-3'
        }`}
      >
        <path d={path} />
      </svg>

      {conEtiqueta ? (
        <span>{nombre}</span>
      ) : (
        <>
          <span className="sr-only">{nombre}</span>
          {activo && (
            <span
              id={idTooltip}
              role="tooltip"
              className="animate-tooltip pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-30 whitespace-nowrap rounded-lg border border-borde-fuerte bg-superficie-alta/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-texto shadow-[0_8px_24px_oklch(0_0_0/0.45)] backdrop-blur-md"
            >
              {nombre}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-borde-fuerte bg-superficie-alta/90"
              />
            </span>
          )}
        </>
      )}
    </span>
  );
}
