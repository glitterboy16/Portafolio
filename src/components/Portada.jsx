import FondoFluido from './FondoFluido';
import Logotipo from './Logotipo';
import { useIdioma } from '../idioma';

/**
 * Primera pantalla: el fluido tramado de fondo, la declaración en el centro y
 * el logotipo ocupando todo el ancho abajo, recortado por el borde inferior.
 */
export default function Portada({ onIr }) {
  const { t } = useIdioma();

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* La tela sólo se retira del centro, en óvalo, para que el texto respire */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_58%_42%_at_50%_40%,transparent_30%,black_78%)]">
        <FondoFluido escala={3} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Globo de alambre: el guiño a que esto se ve desde cualquier parte */}
        <svg
          viewBox="0 0 64 40"
          aria-hidden="true"
          className="animate-aparecer mb-7 w-14 text-texto-2 [animation-delay:120ms]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <ellipse cx="32" cy="20" rx="30" ry="14" />
          <ellipse cx="32" cy="20" rx="12" ry="14" />
          <ellipse cx="32" cy="20" rx="24" ry="14" />
          <path d="M2 20h60M32 6v28" />
        </svg>

        {/* Es el titular real de la página, así que va como h1: sin él, la
            página no tenía encabezado de primer nivel. */}
        <h1 className="animate-aparecer max-w-[34ch] text-balance text-[clamp(1.05rem,2.6vw,1.4rem)] font-semibold leading-snug tracking-[-0.02em] [animation-delay:200ms]">
          {t({
            es: 'Diseño y construyo webs y aplicaciones web a medida. Dale una identidad digital a tu negocio.',
            en: 'I design and build custom websites and web applications. Give your business a digital identity.',
          })}
        </h1>
        <p className="animate-aparecer mt-6 max-w-[42ch] text-balance text-[clamp(0.95rem,2.2vw,1.15rem)] font-medium text-texto-2 [animation-delay:300ms]">
          {t({
            es: 'Creamos o transformamos tu presencia online con infraestructura digital que hará destacar tu negocio.',
            en: 'We build or transform your online presence with digital infrastructure that makes your business stand out.',
          })}
        </p>

        <button
          onClick={() => onIr('proyectos')}
          className="marbete animate-aparecer mt-10 transition-colors duration-200 ease-suave hover:text-texto [animation-delay:400ms]"
        >
          {t({ es: 'Ver el trabajo', en: 'See the work' })}
        </button>
      </div>

      {/* El logotipo a sangre, cortado por abajo como una marca impresa */}
      <div className="animate-aparecer relative flex justify-center overflow-hidden px-[2vw] [animation-delay:480ms]">
        <Logotipo tamano="min(21vw, 15rem)" className="translate-y-[12%] text-texto" />
      </div>
    </section>
  );
}
