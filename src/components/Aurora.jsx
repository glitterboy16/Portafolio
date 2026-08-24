/**
 * Fondo vivo: tres manchas de color que derivan muy despacio detrás del
 * contenido. Es lo que da profundidad al cristal — sin algo que desenfocar,
 * el efecto vidrio no se aprecia.
 */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-deriva absolute -left-[15%] -top-[20%] size-[65vmax] rounded-full blur-[110px]"
        style={{ background: 'var(--c-aurora-1)' }}
      />
      <div
        className="animate-deriva absolute -right-[10%] top-[15%] size-[55vmax] rounded-full blur-[110px] [animation-delay:-8s] [animation-duration:30s]"
        style={{ background: 'var(--c-aurora-2)' }}
      />
      <div
        className="animate-deriva absolute -bottom-[25%] left-[20%] size-[60vmax] rounded-full blur-[110px] [animation-delay:-16s] [animation-duration:36s]"
        style={{ background: 'var(--c-aurora-3)' }}
      />
    </div>
  );
}
