import { useState } from 'react';
import Cabecera from './Cabecera';
import { PLANES, NOTA_PRECIOS } from '../data/planes';
import { useFoco } from '../hooks';

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

  const asunto = encodeURIComponent(`Presupuesto — plan ${plan.nombre}`);
  const cuerpo = encodeURIComponent(
    `Hola Angel:\n\nMe interesa el plan ${plan.nombre} para mi proyecto.\n\nEsto es lo que necesito:\n`,
  );

  return (
    <section id="precios" className="scroll-mt-24 py-[clamp(3rem,6vw,5rem)]">
      <Cabecera sobretitulo="Servicios" titulo="Un precio claro desde el principio." />

      <p className="animate-aparecer mb-2 max-w-[58ch] text-[clamp(0.95rem,1.6vw,1.0625rem)] text-texto-2 [animation-delay:300ms]">
        Sin cuotas mensuales ni letra pequeña. Eliges el alcance, te paso el presupuesto cerrado y
        empezamos.
      </p>
      <p className="animate-aparecer mb-8 max-w-[58ch] text-xs text-texto-3 [animation-delay:340ms]">
        {NOTA_PRECIOS}
      </p>

      <div
        {...foco}
        className="vidrio foco animate-aparecer relative mx-auto mt-14 max-w-[30rem] rounded-2xl p-[clamp(1.25rem,3vw,1.75rem)] [animation-delay:400ms]"
      >
        {/* Pestaña que sobresale, como la etiqueta de una carpeta */}
        <div className="-mt-[calc(clamp(1.25rem,3vw,1.75rem)+1.6rem)] mb-5 flex justify-center">
          <span className="solido rounded-lg px-4 py-2 text-[0.7rem]">Desarrollo web a medida</span>
        </div>

        {/* Selector de plan */}
        <div
          role="tablist"
          aria-label="Planes"
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
              {p.nombre}
            </button>
          ))}
        </div>

        {/* El precio y todo lo que cambia con él */}
        <div key={plan.id} className="animate-aparecer">
          <p className="mb-4 text-sm text-texto-2">{plan.resumen}</p>

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
          <p className="marbete mb-6">Entrega estimada {plan.entrega}</p>

          <ul className="mb-7 flex flex-col gap-2.5">
            {plan.incluye.map((punto) => (
              <li key={punto} className="flex items-start gap-2.5 text-sm text-texto-2">
                <Check />
                <span>{punto}</span>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:villorinaangelandres@gmail.com?subject=${asunto}&body=${cuerpo}`}
            className="solido block rounded-xl px-5 py-3.5 text-center text-[0.8125rem]"
          >
            Pedir presupuesto
          </a>
          <p className="mt-3 text-center text-xs text-texto-3">
            Respondo en menos de 24 h · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
