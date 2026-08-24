import { useState } from 'react';
import Cabecera from './Cabecera';
import { PLANES, NOTA_PRECIOS } from '../data/planes';
import { useFoco } from '../hooks';
import { useIdioma } from '../idioma';

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-0.5 size-[18px] shrink-0 text-acento"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="10" cy="10" r="8.5" className="opacity-35" />
      <path d="m6.4 10.3 2.5 2.4 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Servicios() {
  const [activo, setActivo] = useState(PLANES[1].id);
  const plan = PLANES.find((p) => p.id === activo);
  const foco = useFoco();
  const { t } = useIdioma();

  const asunto = encodeURIComponent(
    t({ es: `Presupuesto — plan ${t(plan.nombre)}`, en: `Quote — ${t(plan.nombre)} plan` }),
  );
  const cuerpo = encodeURIComponent(
    t({
      es: `Hola Angel:\n\nMe interesa el plan ${t(plan.nombre)} para mi proyecto.\n\nEsto es lo que necesito:\n`,
      en: `Hi Angel,\n\nI'm interested in the ${t(plan.nombre)} plan for my project.\n\nHere's what I need:\n`,
    }),
  );

  return (
    <section id="precios" className="scroll-mt-24 py-[clamp(3rem,6vw,5rem)]">
      <Cabecera
        sobretitulo={t({ es: 'Servicios', en: 'Services' })}
        titulo={t({ es: 'Un precio claro desde el principio.', en: 'A clear price from the start.' })}
      />

      <p className="mb-2 max-w-[58ch] text-[clamp(0.95rem,1.6vw,1.0625rem)] text-texto-2">
        {t({
          es: 'Sin cuotas mensuales ni letra pequeña. Eliges el alcance, te paso el presupuesto cerrado y empezamos.',
          en: 'No monthly fees, no fine print. You choose the scope, I send a fixed quote, and we start.',
        })}
      </p>
      <p className="mb-8 max-w-[58ch] text-xs text-texto-3">{t(NOTA_PRECIOS)}</p>

      <div
        {...foco}
        className="vidrio foco relative mx-auto mt-14 max-w-[30rem] rounded-2xl p-[clamp(1.25rem,3vw,1.75rem)]"
      >
        {/* Pestaña que sobresale, como la etiqueta de una carpeta */}
        <div className="-mt-[calc(clamp(1.25rem,3vw,1.75rem)+1.6rem)] mb-5 flex justify-center">
          <span className="solido rounded-lg px-4 py-2 text-[0.7rem]">
            {t({ es: 'Desarrollo web a medida', en: 'Custom web development' })}
          </span>
        </div>

        {/* Selector de plan */}
        <div
          role="tablist"
          aria-label={t({ es: 'Planes', en: 'Plans' })}
          className="mb-6 grid grid-cols-3 gap-1 rounded-xl border border-borde bg-fondo-2/60 p-1"
        >
          {PLANES.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === activo}
              onClick={() => setActivo(p.id)}
              className={`rounded-lg px-2 py-2 text-[clamp(0.75rem,1.6vw,0.8125rem)] font-semibold transition-all duration-300 ease-suave active:scale-95 ${
                p.id === activo
                  ? 'bg-solido text-solido-texto'
                  : 'text-texto-2 hover:bg-borde hover:text-texto'
              }`}
            >
              {t(p.nombre)}
            </button>
          ))}
        </div>

        {/* El precio y todo lo que cambia con él */}
        <div key={plan.id} className="animate-aparecer">
          <p className="mb-4 text-sm text-texto-2">{t(plan.resumen)}</p>

          <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
            <span className="text-[clamp(2.5rem,8vw,3.5rem)] font-bold leading-none tracking-[-0.04em]">
              ${plan.desde}
            </span>
            <span className="text-[clamp(1.1rem,3vw,1.5rem)] font-medium text-texto-3">
              — ${plan.hasta}
              {plan.abierto && '+'}
            </span>
            <span className="text-sm text-texto-3">USD</span>
          </div>
          <p className="marbete mb-6">
            {t({ es: 'Entrega estimada', en: 'Estimated delivery' })} {t(plan.entrega)}
          </p>

          <ul className="mb-7 flex flex-col gap-2.5">
            {plan.incluye.map((punto, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-texto-2">
                <Check />
                <span>{t(punto)}</span>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:villorinaangelandres@gmail.com?subject=${asunto}&body=${cuerpo}`}
            className="solido block rounded-xl px-5 py-3.5 text-center text-[0.8125rem]"
          >
            {t({ es: 'Pedir presupuesto', en: 'Request a quote' })}
          </a>
          <p className="mt-3 text-center text-xs text-texto-3">
            {t({ es: 'Respondo en menos de 24 h · Sin compromiso', en: 'I reply within 24h · No commitment' })}
          </p>
        </div>
      </div>
    </section>
  );
}
