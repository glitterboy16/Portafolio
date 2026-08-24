import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { TECNOLOGIAS } from '../data/tecnologias';

/**
 * Los SVG de devicon declaran sus degradados con ids cortos ("a", "b"). Si la
 * misma página inserta dos iconos con el mismo id, el navegador resuelve todas
 * las referencias contra el primero. Se les da un sufijo único por instancia.
 */
function aislarIds(svg, sufijo) {
  return svg
    .replace(/id="([^"]+)"/g, `id="$1-${sufijo}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${sufijo})`);
}

/**
 * Icono de tecnología: gris en reposo, colores reales al pasar el ratón o
 * enfocar. En móvil el nombre se abre como popover al tocarlo.
 */
export default function IconoTecnologia({ clave, tamano = 22, conEtiqueta = false }) {
  const tecnologia = TECNOLOGIAS[clave];
  const idBase = useId().replace(/:/g, '');
  const [sobre, setSobre] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);

  const svg = useMemo(
    () => (tecnologia ? aislarIds(tecnologia.svg, idBase) : ''),
    [tecnologia, idBase],
  );

  // Un popover abierto se cierra al tocar fuera o al pulsar Escape.
  useEffect(() => {
    if (!abierto) return;

    const alTocarFuera = (e) => {
      if (!contenedor.current?.contains(e.target)) setAbierto(false);
    };
    const alPulsar = (e) => {
      if (e.key === 'Escape') setAbierto(false);
    };

    document.addEventListener('pointerdown', alTocarFuera);
    document.addEventListener('keydown', alPulsar);
    return () => {
      document.removeEventListener('pointerdown', alTocarFuera);
      document.removeEventListener('keydown', alPulsar);
    };
  }, [abierto]);

  if (!tecnologia) return null;

  const { nombre } = tecnologia;
  const activo = sobre || abierto;
  const mostrarNombre = !conEtiqueta && activo;

  const icono = (
    <span
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ width: tamano, height: tamano }}
      className={`inline-flex shrink-0 transition-[filter,transform] duration-300 ease-suave [&>svg]:size-full ${
        activo ? 'scale-110 grayscale-0 opacity-100' : 'grayscale opacity-55'
      }`}
    />
  );

  if (conEtiqueta) {
    return (
      <span
        onMouseEnter={() => setSobre(true)}
        onMouseLeave={() => setSobre(false)}
        className={`vidrio inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-suave hover:-translate-y-0.5 hover:scale-[1.04] ${
          activo ? 'text-texto' : 'text-texto-2'
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

      {mostrarNombre && (
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
