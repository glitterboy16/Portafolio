import { useId, useMemo, useState } from 'react';

/**
 * Enlace a una red, con su marca. Gris en reposo y a color al pasar por
 * encima, igual que los iconos de tecnología, para que las dos rejillas se
 * comporten igual.
 *
 * Una red sin dirección todavía no se pinta como enlace: se muestra apagada y
 * anunciada como pendiente, en vez de llevar a ninguna parte.
 */
export default function IconoRed({ red, tamano = 20 }) {
  const { nombre, href, path, svg, color } = red;
  const idBase = useId().replace(/:/g, '');
  const [sobre, setSobre] = useState(false);

  const svgAislado = useMemo(
    () =>
      svg
        ? svg
            .replace(/id="([^"]+)"/g, `id="$1-${idBase}"`)
            .replace(/url\(#([^)]+)\)/g, `url(#$1-${idBase})`)
        : null,
    [svg, idBase],
  );

  const marca = svgAislado ? (
    <span
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgAislado }}
      style={{ width: tamano, height: tamano }}
      className={`inline-flex transition-[filter,opacity] duration-300 ease-suave [&>svg]:size-full ${
        sobre ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale'
      }`}
    />
  ) : (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width={tamano}
      height={tamano}
      fill="currentColor"
      style={{ color: sobre ? color : undefined }}
      className={`transition-colors duration-300 ease-suave ${sobre ? '' : 'text-texto-3'}`}
    >
      <path d={path} />
    </svg>
  );

  const clases =
    'inline-flex items-center gap-2 border border-borde px-3 py-2 text-[0.8125rem] transition-colors duration-300 ease-suave';

  if (!href) {
    return (
      <span className={`${clases} cursor-default text-texto-3 opacity-60`} title="Pendiente">
        {marca}
        {nombre}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer"
      onMouseEnter={() => setSobre(true)}
      onMouseLeave={() => setSobre(false)}
      onFocus={() => setSobre(true)}
      onBlur={() => setSobre(false)}
      className={`${clases} ${sobre ? 'border-borde-fuerte text-texto' : 'text-texto-2'}`}
    >
      {marca}
      {nombre}
    </a>
  );
}
