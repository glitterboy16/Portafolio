/**
 * Cabecera de sección. El título se parte en palabras y cada una sube por
 * separado desde detrás de una máscara, así el encabezado entra con peso
 * en lugar de limitarse a aparecer.
 */
export default function Cabecera({ sobretitulo, titulo }) {
  const palabras = titulo.split(' ');

  return (
    <header className="mb-[clamp(1.75rem,4vw,2.75rem)]">
      <p className="animate-aparecer mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-acento">
        {sobretitulo}
      </p>
      <h2 className="text-[clamp(2.1rem,6vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
        {palabras.map((palabra, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              className="animate-aparecer inline-block"
              style={{ animationDelay: `${80 + i * 90}ms` }}
            >
              {palabra}
              {i < palabras.length - 1 && ' '}
            </span>
          </span>
        ))}
      </h2>
    </header>
  );
}
