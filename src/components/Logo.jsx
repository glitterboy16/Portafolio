/**
 * Monograma AV — Angel Villorina.
 *
 * Dos letras en grotesca maciza sobre una rejilla común: misma altura de caja
 * (140) y mismo grosor de asta, con la A y la V casi tocándose para que se
 * lean como una sola pieza y no como dos iniciales sueltas.
 *
 * Va en trazados, no en texto, para que el monograma sea siempre idéntico y no
 * dependa de que una tipografía concreta llegue a cargar.
 */
export default function Logo({ className = '', tamano = '1rem' }) {
  return (
    <svg
      viewBox="0 0 232 140"
      role="img"
      aria-label="Angel Villorina"
      className={`inline-block w-auto select-none fill-current ${className}`}
      style={{ height: tamano }}
    >
      {/* A — el contraste interior se recorta con evenodd, no con un segundo color */}
      <path
        fillRule="evenodd"
        d="M0 140 48 0h24l48 140H88l-11-32H43l-11 32H0zm51-58h18L60 46 51 82z"
      />
      {/* V — el reflejo exacto de la A, sin travesaño */}
      <path d="M120 0h32l24 96 24-96h32l-40 140h-32L120 0z" />
    </svg>
  );
}
