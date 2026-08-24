import { useEffect, useState } from 'react';
import Logo from './Logo';
import BotonTema from './BotonTema';
import Menu from './Menu';
import Boton from './Boton';
import { useIdioma } from '../idioma';

/**
 * Barra superior: logo, secciones, llamada a la acción y, junto al tema, el
 * cambio de idioma. Navega por desplazamiento.
 */
export default function Navegacion({ secciones, activa, onIr, tema, alternar, onBloquear }) {
  const [abierto, setAbierto] = useState(false);
  const { idioma, alternar: alternarIdioma, t } = useIdioma();

  useEffect(() => {
    onBloquear?.(abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierto, onBloquear]);

  useEffect(() => {
    const alPulsar = (e) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', alPulsar);
    return () => document.removeEventListener('keydown', alPulsar);
  }, []);

  const ir = (id) => {
    setAbierto(false);
    onIr(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-[clamp(0.875rem,2.5vw,1.75rem)] py-3">
          <button
            onClick={() => ir('portada')}
            className="shrink-0 transition-opacity duration-200 ease-suave hover:opacity-70"
            aria-label="Angel Villorina"
          >
            <Logo tamano="clamp(1.05rem,2.6vw,1.3rem)" />
          </button>

          <nav aria-label={t({ es: 'Secciones', en: 'Sections' })} className="mx-auto hidden lg:block">
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
                    {t(etiqueta)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <Boton onClick={() => ir('precios')} className="hidden sm:inline-flex">
              {t({ es: 'Empezar proyecto', en: 'Start a project' })}
            </Boton>

            {/* Idioma y tema, juntos: los dos conmutadores de la página */}
            <button
              onClick={alternarIdioma}
              aria-label={t({ es: 'Switch to English', en: 'Cambiar a español' })}
              title={idioma === 'es' ? 'English' : 'Español'}
              className="grid size-11 shrink-0 place-items-center border border-borde text-[0.7rem] font-semibold uppercase tracking-wide text-texto-2 transition-all duration-300 ease-suave hover:border-borde-fuerte hover:text-texto active:scale-95 sm:size-8"
            >
              {idioma === 'es' ? 'EN' : 'ES'}
            </button>

            <BotonTema tema={tema} alternar={alternar} compacto />

            <button
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              className="relative ml-1 text-[0.9375rem] font-medium lg:hidden"
            >
              {abierto ? t({ es: 'Cerrar', en: 'Close' }) : t({ es: 'Menú', en: 'Menu' })}
              <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      <Menu abierto={abierto} secciones={secciones} activa={activa} onIr={ir} />
    </>
  );
}
