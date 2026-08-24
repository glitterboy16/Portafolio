/**
 * Monograma AV — Angel Villorina.
 *
 * La A viene del logotipo, con su trazado tal cual. La V está dibujada para
 * acompañarla: mismo ancho de caja, misma altura y el mismo corte geométrico
 * de las astas, para que se lean como una pieza.
 *
 * Aquí van las letras limpias, sin el destello ni la órbita: a tamaño de
 * barra, esas piezas se convierten en manchas y ensucian la lectura. Viven en
 * el logotipo completo, que es donde tienen sitio.
 */
export default function Logo({ className = '', tamano = '1rem' }) {
  return (
    <svg
      viewBox="-4 -66 170 70"
      role="img"
      aria-label="Angel Villorina"
      className={`inline-block w-auto select-none fill-current ${className}`}
      style={{ height: tamano }}
    >
      {/* A — trazado original del logotipo */}
      <path d="M 51.3125 -61.296875 L 75.734375 0 L 51.3125 0 L 37.5625 -38.09375 L 31 -20.40625 L 42.296875 -20.40625 L 49.640625 0 L -0.171875 0 L 23.8125 -61.296875 Z" />
      {/* V — misma caja que la A */}
      <path d="M 86 -61.296875 L 110.5 -61.296875 L 124 -21 L 137.5 -61.296875 L 162 -61.296875 L 134 0 L 114 0 Z" />
    </svg>
  );
}
