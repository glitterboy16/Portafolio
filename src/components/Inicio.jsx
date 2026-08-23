import Cabecera from './Cabecera';
import IconoTecnologia from './IconoTecnologia';
import { PERFIL } from '../data/perfil';
import { HABILIDADES } from '../data/tecnologias';

export default function Inicio() {
  return (
    <article>
      <Cabecera sobretitulo="Sobre mí" titulo="Hola, soy Angel." />

      <section className="animate-aparecer mb-12 max-w-[62ch] text-[1.0625rem] text-texto-2 [animation-delay:80ms]">
        {PERFIL.presentacion.map((parrafo, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : undefined}>
            {parrafo}
          </p>
        ))}
      </section>

      <section className="animate-aparecer mb-12 [animation-delay:160ms]">
        <h3 className="mb-4 text-xl font-semibold tracking-tight">Qué hago</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {PERFIL.servicios.map(({ titulo, descripcion }) => (
            <div
              key={titulo}
              className="rounded-2xl border border-borde bg-superficie p-6 transition-colors duration-300 ease-suave hover:border-borde-fuerte"
            >
              <h4 className="mb-1 font-semibold tracking-tight">{titulo}</h4>
              <p className="text-sm text-texto-2">{descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="animate-aparecer [animation-delay:240ms]">
        <h3 className="mb-4 text-xl font-semibold tracking-tight">Habilidades</h3>
        <ul className="flex flex-wrap gap-3">
          {HABILIDADES.map((clave) => (
            <li key={clave}>
              <IconoTecnologia clave={clave} tamano={22} conEtiqueta />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
