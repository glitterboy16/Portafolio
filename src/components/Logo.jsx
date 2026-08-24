/**
 * Logotipo ANGEL.
 *
 * Grotesca ancha y pesada, con una letra intervenida: la G lleva dentro un
 * cuadrado en lugar de su hueco redondo, el mismo recurso con el que MONOLOG
 * sustituye una de sus O. Se compone con texto real —no trazados— para que
 * siga siendo seleccionable y no pese nada.
 */
export default function Logo({ className = '', tamano = '1rem' }) {
  return (
    <span
      className={`inline-flex select-none items-center font-[Archivo] font-extrabold uppercase leading-none tracking-[-0.03em] [font-stretch:125%] ${className}`}
      style={{ fontSize: tamano }}
      aria-label="Angel"
    >
      <span aria-hidden="true">AN</span>
      <span aria-hidden="true" className="relative inline-block">
        G
        {/* El cuadrado se posa sobre el hueco de la G */}
        <span className="absolute left-1/2 top-1/2 block size-[0.3em] -translate-x-[45%] -translate-y-[35%] bg-current" />
      </span>
      <span aria-hidden="true">EL</span>
    </span>
  );
}
