import { useId } from 'react';

/**
 * Monograma AV — Angel Villorina.
 *
 * La A es la del logotipo que trajo Angel, con su trazado tal cual. La V está
 * dibujada para acompañarla: mismo ancho de caja, misma altura y el mismo
 * corte geométrico de las astas, para que se lean como una pieza y no como una
 * letra prestada y otra añadida.
 *
 * Las tres piezas que dan carácter al original —el destello, su órbita y el
 * trazo que cruza por abajo— no se pintan encima: actúan como máscara y vacían
 * la letra que tienen debajo. Hacerlo así, en vez de con formas del color del
 * fondo como venían en el archivo, permite que el hueco deje ver lo que haya
 * detrás, y el monograma sirve sobre cualquier superficie y en los dos temas.
 */
export default function Logo({ className = '', tamano = '1rem' }) {
  const id = useId().replace(/:/g, '');
  const mascara = `logo-recorte-${id}`;

  return (
    <svg
      viewBox="-6 -68 176 78"
      role="img"
      aria-label="Angel Villorina"
      className={`inline-block w-auto select-none ${className}`}
      style={{ height: tamano }}
    >
      <defs>
        <mask id={mascara}>
          {/* Blanco deja ver; negro vacía */}
          <rect x="-12" y="-74" width="200" height="92" fill="#fff" />

          {/* Destello y órbita conservan entre sí la distancia del original:
              se mueven juntos, por eso van en el mismo grupo. */}
          <g fill="#000" transform="translate(-10.4 -152.1) scale(0.78)">
            <path d="M 182.4375 156.589844 C 172.503906 157.855469 171.910156 158.882812 171.183594 176.121094 C 170.453125 158.882812 169.859375 157.855469 159.929688 156.589844 C 169.859375 155.324219 170.453125 154.300781 171.183594 137.0625 C 171.910156 154.300781 172.503906 155.328125 182.4375 156.589844 Z" />
            <path d="M 169.589844 155.691406 C 157.109375 161.976562 148.183594 169.4375 149.65625 172.355469 C 151.125 175.277344 162.433594 172.546875 174.914062 166.261719 C 187.394531 159.976562 196.320312 152.515625 194.851562 149.597656 C 193.382812 146.679688 182.070312 149.410156 169.589844 155.691406 Z M 174.628906 165.699219 C 165.671875 170.207031 157.347656 171.75 156.035156 169.144531 C 154.722656 166.539062 160.917969 160.765625 169.875 156.257812 C 178.835938 151.75 187.160156 150.207031 188.472656 152.8125 C 189.78125 155.417969 183.585938 161.1875 174.628906 165.699219 Z" />
          </g>

          {/* El trazo largo no entra aquí: para cruzar dos letras necesitaría
              el 89% de su altura y se las comería. Vive en el logotipo
              completo, que es para lo que fue dibujado. */}
        </mask>
      </defs>

      <g fill="currentColor" mask={`url(#${mascara})`}>
        {/* A — trazado original del logotipo */}
        <path d="M 51.3125 -61.296875 L 75.734375 0 L 51.3125 0 L 37.5625 -38.09375 L 31 -20.40625 L 42.296875 -20.40625 L 49.640625 0 L -0.171875 0 L 23.8125 -61.296875 Z" />
        {/* V — misma caja que la A */}
        <path d="M 86 -61.296875 L 110.5 -61.296875 L 124 -21 L 137.5 -61.296875 L 162 -61.296875 L 134 0 L 114 0 Z" />
      </g>
    </svg>
  );
}
