/**
 * Telón de color. Tres focos saturados se mezclan abajo y un velo del color
 * del fondo los disuelve hacia arriba, así la parte donde vive el texto queda
 * limpia y el color aparece como atmósfera, no como relleno.
 */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ opacity: 'var(--c-malla-opacidad)' }}
      >
        <div
          className="animate-deriva absolute -bottom-[30%] -left-[15%] size-[75vmax] rounded-full blur-[120px]"
          style={{ background: 'var(--c-malla-1)' }}
        />
        <div
          className="animate-deriva absolute -bottom-[35%] left-[25%] size-[65vmax] rounded-full blur-[120px] [animation-delay:-9s] [animation-duration:30s]"
          style={{ background: 'var(--c-malla-2)' }}
        />
        <div
          className="animate-deriva absolute -right-[20%] bottom-[-25%] size-[70vmax] rounded-full blur-[120px] [animation-delay:-18s] [animation-duration:36s]"
          style={{ background: 'var(--c-malla-3)' }}
        />
      </div>

      {/* Velo en tres paradas: opaco arriba, medio cuerpo por el centro y
          transparente sólo al final, para que el color quede de horizonte. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--c-velo) 20%, color-mix(in oklab, var(--c-velo) 62%, transparent) 58%, transparent 92%)',
        }}
      />
    </div>
  );
}
