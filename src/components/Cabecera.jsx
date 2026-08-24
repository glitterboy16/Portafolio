import { useTitularRevelado } from '../hooks';

/**
 * Cabecera de sección. El titular se parte en palabras con SplitText y cada
 * una sube desde detrás del recorte de su línea al entrar en pantalla.
 */
export default function Cabecera({ sobretitulo, titulo, className = '' }) {
  const ref = useTitularRevelado(titulo);

  return (
    <header className={`mb-[clamp(2rem,5vw,3.5rem)] ${className}`}>
      {sobretitulo && <p className="marbete mb-3">{sobretitulo}</p>}
      <h2
        ref={ref}
        className="max-w-[18ch] text-balance text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
      >
        {titulo}
      </h2>
    </header>
  );
}
