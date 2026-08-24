import { useEffect, useState } from 'react';
import Logo from './Logo';
import BotonTema from './BotonTema';

/**
 * Barra superior: el logo a la izquierda, las secciones en el centro y la
 * llamada a la acción a la derecha. Por debajo de `lg` las secciones se
 * repliegan en un panel a pantalla completa, y el disparador alterna entre
 * "Menú" y "Cerrar".
 */
export default function Navegacion({ secciones, activa, onCambiar, tema, alternar }) {
  const [abierto, setAbierto] = useState(false);

  // Con el panel abierto la página de detrás no debe poder desplazarse
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierto]);

  useEffect(() => {
    const alPulsar = (e) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', alPulsar);
    return () => document.removeEventListener('keydown', alPulsar);
  }, []);

  const ir = (id) => {
    setAbierto(false);
    onCambiar(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-[clamp(0.875rem,2.5vw,1.75rem)] py-3">
          <button
            onClick={() => ir(secciones[0].id)}
            className="shrink-0 transition-opacity duration-200 ease-suave hover:opacity-70"
          >
            <Logo tamano="clamp(1.05rem,2.6vw,1.3rem)" />
          </button>

          <nav aria-label="Secciones" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-6">
              {secciones.map(({ id, etiqueta }) => (
                <li key={id}>
                  <button
                    onClick={() => ir(id)}
                    aria-current={activa === id ? 'page' : undefined}
                    className={`text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200 ease-suave ${
                      activa === id ? 'text-texto' : 'text-texto-2 hover:text-texto'
                    }`}
                  >
                    {etiqueta}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <button
              onClick={() => ir('servicios')}
              className="group flex items-center gap-2 bg-texto px-3 py-2 text-[0.8125rem] font-medium text-fondo transition-opacity duration-200 ease-suave hover:opacity-90"
            >
              Empezar un proyecto
              <span className="grid size-[18px] shrink-0 place-items-center bg-fondo text-texto transition-transform duration-300 ease-entrada group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9 9 3M4.2 3H9v4.8" strokeLinecap="square" />
                </svg>
              </span>
            </button>

            <BotonTema tema={tema} alternar={alternar} compacto />

            <button
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              className="relative ml-1 text-[0.9375rem] font-medium lg:hidden"
            >
              {abierto ? 'Cerrar' : 'Menú'}
              <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Panel de navegación en pantallas pequeñas */}
      <div
        className={`fixed inset-0 z-40 bg-fondo transition-opacity duration-300 ease-suave lg:hidden ${
          abierto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="mt-24 px-[clamp(0.875rem,2.5vw,1.75rem)]">
          {secciones.map(({ id, etiqueta }, i) => (
            <li key={id} className="border-t border-borde last:border-b">
              <button
                onClick={() => ir(id)}
                style={{ transitionDelay: abierto ? `${80 + i * 45}ms` : '0ms' }}
                className={`w-full py-4 text-left text-[clamp(1.75rem,7vw,2.25rem)] font-medium tracking-[-0.02em] transition-all duration-500 ease-entrada ${
                  abierto ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${activa === id ? 'text-texto' : 'text-texto-2'}`}
              >
                {etiqueta}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
