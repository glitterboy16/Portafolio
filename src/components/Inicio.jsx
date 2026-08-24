import Cabecera from './Cabecera';
import IconoTecnologia from './IconoTecnologia';
import { PERFIL } from '../data/perfil';
import { HABILIDADES } from '../data/tecnologias';
import { useFoco } from '../hooks';

function Servicio({ titulo, descripcion, retraso }) {
  const foco = useFoco();

  return (
    <div
      {...foco}
      style={{ animationDelay: `${retraso}ms` }}
      className="vidrio foco animate-aparecer rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1.25rem,2.5vw,1.75rem)] transition-transform duration-500 ease-suave hover:-translate-y-1"
    >
      <h4 className="mb-1 font-semibold tracking-tight">{titulo}</h4>
      <p className="text-sm text-texto-2">{descripcion}</p>
    </div>
  );
}

export default function Inicio() {
  return (
    <article>
      <Cabecera sobretitulo="Sobre mí" titulo="Hola, soy Angel." />

      <section className="animate-aparecer mb-[clamp(2.5rem,5vw,4rem)] max-w-[62ch] text-[clamp(1rem,1.6vw,1.125rem)] text-texto-2 [animation-delay:340ms]">
        {PERFIL.presentacion.map((parrafo, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : undefined}>
            {parrafo}
          </p>
        ))}
      </section>

      <section className="mb-[clamp(2.5rem,5vw,4rem)]">
        <h3 className="animate-aparecer mb-4 text-[clamp(1.2rem,2.2vw,1.4rem)] font-semibold tracking-tight [animation-delay:400ms]">
          Qué hago
        </h3>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
          {PERFIL.servicios.map((servicio, i) => (
            <Servicio key={servicio.titulo} {...servicio} retraso={460 + i * 90} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="animate-aparecer mb-4 text-[clamp(1.2rem,2.2vw,1.4rem)] font-semibold tracking-tight [animation-delay:620ms]">
          Habilidades
        </h3>
        {/* Rejilla de celdas separadas por una hendidura de 4px: las líneas
            que se ven son el fondo asomando, no bordes. */}
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-1">
          {HABILIDADES.map((clave, i) => (
            <li
              key={clave}
              className="animate-aparecer"
              style={{ animationDelay: `${680 + i * 45}ms` }}
            >
              <IconoTecnologia clave={clave} conEtiqueta celda />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
