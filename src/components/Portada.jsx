import FondoFluido from './FondoFluido';
import Logotipo from './Logotipo';

/**
 * Primera pantalla: el fluido tramado de fondo, la declaración en el centro y
 * el nombre ocupando todo el ancho abajo, recortado por el borde inferior.
 */
export default function Portada({ onIr }) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* La trama se retira del centro para dejar respirar al texto */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_45%_at_50%_42%,transparent_35%,black_80%)]">
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

        <p className="animate-aparecer max-w-[34ch] text-balance text-[clamp(1.05rem,2.6vw,1.4rem)] font-semibold leading-snug tracking-[-0.02em] [animation-delay:200ms]">
          Diseño y construyo webs que hacen que un negocio pequeño parezca lo que ya es de puertas
          adentro.
        </p>
        <p className="animate-aparecer mt-6 max-w-[32ch] text-balance text-[clamp(0.95rem,2.2vw,1.15rem)] font-medium text-texto-2 [animation-delay:300ms]">
          Para quien atiende bien, cocina bien o trabaja bien, y no lo parece en internet.
        </p>

        <button
          onClick={() => onIr('proyectos')}
          className="marbete animate-aparecer mt-10 transition-colors duration-200 ease-suave hover:text-texto [animation-delay:400ms]"
        >
          Ver el trabajo
        </button>
      </div>

      {/* El logotipo a sangre, cortado por abajo como una marca impresa */}
      <div className="animate-aparecer relative flex justify-center overflow-hidden px-[2vw] [animation-delay:480ms]">
        <Logotipo tamano="min(21vw, 15rem)" className="translate-y-[12%] text-texto" />
      </div>
    </section>
  );
}
