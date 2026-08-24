import BotonTema from './BotonTema';

/**
 * Barra superior a ancho completo, compacta y de esquinas rectas: el nombre a
 * la izquierda, las secciones en medio y una acción sólida a la derecha.
 * La sección activa se marca con una regla bajo el texto, no con una píldora.
 */
export default function Navegacion({ secciones, activa, onCambiar, tema, alternar }) {
  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-[clamp(0.875rem,2.5vw,2.5rem)] py-2.5">
        <button
          onClick={() => onCambiar(secciones[0].id)}
          className="mr-auto flex shrink-0 items-center gap-2 text-[0.8125rem] font-semibold tracking-[-0.01em] transition-opacity duration-200 ease-suave hover:opacity-70"
        >
          <span aria-hidden="true" className="size-2.5 shrink-0 bg-solido" />
          <span className="hidden sm:inline">Angel Villorina</span>
          <span className="sm:hidden">Angel V.</span>
        </button>

        <nav aria-label="Secciones">
          <ul className="flex items-center gap-x-[clamp(0.75rem,2vw,1.5rem)]">
            {secciones.map(({ id, etiqueta }) => (
              <li key={id}>
                <button
                  onClick={() => onCambiar(id)}
                  aria-current={activa === id ? 'page' : undefined}
                  className={`relative py-1 text-[clamp(0.75rem,1.8vw,0.8125rem)] tracking-[-0.01em] transition-colors duration-200 ease-suave ${
                    activa === id ? 'text-texto' : 'text-texto-2 hover:text-texto'
                  }`}
                >
                  {etiqueta}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-solido transition-transform duration-300 ease-entrada ${
                      activa === id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-1 flex shrink-0 items-center gap-2">
          {/* El texto rueda al pasar por encima: una copia sale y otra entra */}
          <button
            onClick={() => onCambiar('servicios')}
            className="solido group relative hidden overflow-hidden px-4 py-1.5 text-[0.7rem] sm:block"
          >
            <span className="block transition-transform duration-300 ease-entrada group-hover:-translate-y-[150%]">
              Pedir presupuesto
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 grid translate-y-[150%] place-items-center transition-transform duration-300 ease-entrada group-hover:translate-y-0"
            >
              Pedir presupuesto
            </span>
          </button>

          <BotonTema tema={tema} alternar={alternar} compacto />
        </div>
      </div>
    </header>
  );
}
