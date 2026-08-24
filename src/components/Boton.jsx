/**
 * Botón principal.
 *
 * Al pasar por encima ocurren tres cosas a la vez: el rótulo rueda hacia
 * arriba mientras una copia idéntica sube a ocupar su sitio, la flecha se va
 * en diagonal por la esquina de arriba y otra entra desde la de abajo, y el
 * cuadro de la flecha se hincha un poco. Las dos primeras necesitan que su
 * caja recorte, que es lo que hace que las piezas aparezcan y desaparezcan
 * por los bordes en lugar de flotar fuera.
 */
export default function Boton({ children, onClick, href, className = '', ...resto }) {
  const Elemento = href ? 'a' : 'button';

  return (
    <Elemento
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 bg-texto px-3 py-2 text-[0.8125rem] font-medium text-fondo ${className}`}
      {...resto}
    >
      {/* El rótulo y su doble: uno sale por arriba, el otro llega detrás */}
      <span className="relative grid overflow-hidden">
        <span className="col-start-1 row-start-1 transition-transform duration-500 ease-entrada group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 translate-y-full transition-transform duration-500 ease-entrada group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      {/* El cuadro de la flecha, con las dos copias cruzándose en diagonal */}
      <span className="relative grid size-[18px] shrink-0 place-items-center overflow-hidden bg-fondo text-texto transition-transform duration-500 ease-entrada group-hover:scale-110">
        <Flecha className="col-start-1 row-start-1 transition-transform duration-500 ease-entrada group-hover:translate-x-full group-hover:-translate-y-full" />
        <Flecha
          className="col-start-1 row-start-1 -translate-x-full translate-y-full transition-transform duration-500 ease-entrada group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </Elemento>
  );
}

function Flecha({ className = '' }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`size-2.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9 9 3M4.2 3H9v4.8" strokeLinecap="square" />
    </svg>
  );
}
