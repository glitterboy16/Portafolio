export default function Cabecera({ sobretitulo, titulo }) {
  return (
    <header className="mb-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-acento">{sobretitulo}</p>
      <h2 className="text-[clamp(2.25rem,3.5vw+1.25rem,3.25rem)] font-extrabold leading-none tracking-tight">
        {titulo}
      </h2>
    </header>
  );
}
