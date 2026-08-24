import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { TECNOLOGIAS } from '../data/tecnologias';

/**
 * Los SVG de devicon declaran sus degradados con identificadores cortos ("a",
 * "b"). Si la misma página inserta dos iconos con el mismo identificador, el
 * navegador resuelve todas las referencias contra el primero. Se les añade un
 * sufijo propio por instancia.
 */
function aislarIds(svg, sufijo) {
  return svg
    .replace(/id="([^"]+)"/g, `id="$1-${sufijo}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${sufijo})`);
}

/**
 * Icono de tecnología, siempre con sus colores de marca. Al pasar por encima
 * se levanta un poco; en móvil el nombre se abre como aviso al tocarlo.
 */
export default function IconoTecnologia({ clave, tamano = 22, conEtiqueta = false, celda = false }) {
  const tecnologia = TECNOLOGIAS[clave];
  const idBase = useId().replace(/:/g, '');
  const [sobre, setSobre] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);

  const svgAislado = useMemo(
    () => (tecnologia?.svg ? aislarIds(tecnologia.svg, idBase) : null),
    [tecnologia, idBase],
  );

  useEffect(() => {
    if (!abierto) return;
    const alTocarFuera = (e) => {
      if (!contenedor.current?.contains(e.target)) setAbierto(false);
    };
    const alPulsar = (e) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('pointerdown', alTocarFuera);
    document.addEventListener('keydown', alPulsar);
    return () => {
      document.removeEventListener('pointerdown', alTocarFuera);
      document.removeEventListener('keydown', alPulsar);
    };
  }, [abierto]);

  if (!tecnologia) return null;

  const { nombre, path, color, imagen, sigla } = tecnologia;
  const activo = sobre || abierto;

  const comun = `shrink-0 transition-transform duration-300 ease-suave ${activo ? 'scale-110' : ''}`;

  let icono;
  if (svgAislado) {
    // devicon: el SVG trae sus colores puestos
    icono = (
      <span
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svgAislado }}
        style={{ width: tamano, height: tamano }}
        className={`inline-flex [&>svg]:size-full ${comun}`}
      />
    );
  } else if (imagen) {
    // Marca que sólo existe como imagen (Antigravity)
    icono = (
      <img
        src={imagen}
        alt=""
        width={tamano}
        height={tamano}
        loading="lazy"
        style={{ width: tamano, height: tamano }}
        className={`object-contain ${comun}`}
      />
    );
  } else if (path) {
    // simple-icons: un solo trazado, siempre con su color de marca
    icono = (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        width={tamano}
        height={tamano}
        fill={color}
        className={comun}
      >
        <path d={path} />
      </svg>
    );
  } else {
    // Sin marca en ninguna parte: monograma con el peso de los demás
    icono = (
      <span
        aria-hidden="true"
        style={{ width: tamano, height: tamano, color }}
        className={`inline-grid place-items-center rounded-[0.2em] border border-current text-[0.55em] font-bold leading-none ${comun}`}
      >
        {sigla}
      </span>
    );
  }

  if (conEtiqueta) {
    return (
      <span
        onMouseEnter={() => setSobre(true)}
        onMouseLeave={() => setSobre(false)}
        className={`transition-all duration-300 ease-suave ${
          celda
            ? `flex h-full flex-col items-center justify-center gap-2.5 bg-vidrio px-3 py-7 text-center text-[0.8125rem] ${
                activo ? 'bg-vidrio-alto text-texto' : 'text-texto-2'
              }`
            : `vidrio inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium hover:-translate-y-0.5 hover:scale-[1.04] ${
                activo ? 'text-texto' : 'text-texto-2'
              }`
        }`}
      >
        {icono}
        {nombre}
      </span>
    );
  }

  return (
    <span ref={contenedor} className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setSobre(true)}
        onMouseLeave={() => setSobre(false)}
        onFocus={() => setSobre(true)}
        onBlur={() => setSobre(false)}
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="inline-flex rounded-full outline-offset-4"
      >
        {icono}
        <span className="sr-only">{nombre}</span>
      </button>

      {activo && (
        <span
          role="tooltip"
          className="animate-tooltip pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-30 whitespace-nowrap rounded-lg border border-borde-fuerte bg-fondo-2/85 px-2.5 py-1 text-xs font-semibold tracking-wide text-texto shadow-[0_10px_28px_-8px_var(--c-sombra)] backdrop-blur-xl"
        >
          {nombre}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-borde-fuerte bg-fondo-2/85"
          />
        </span>
      )}
    </span>
  );
}
