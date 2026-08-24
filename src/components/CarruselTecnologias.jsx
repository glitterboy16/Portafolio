import IconoTecnologia from './IconoTecnologia';

/**
 * Tecnologías en desfile continuo, para pantallas estrechas.
 *
 * En móvil la rejilla se estiraba y alargaba muchísimo la página, así que el
 * mismo contenido pasa a una tira que se desplaza sola. La lista va escrita
 * dos veces: al recorrer la mitad, el contenido vuelve a un punto idéntico al
 * de partida, de modo que el bucle no tiene costura.
 *
 * La copia se marca como oculta para lectores de pantalla, que si no leerían
 * la lista entera dos veces.
 */
export default function CarruselTecnologias({ claves, duracion = 46 }) {
  const tira = (aria) =>
    claves.map((clave) => (
      <li key={`${aria}-${clave}`} className="w-[7.5rem] shrink-0">
        <IconoTecnologia clave={clave} tamano={34} conEtiqueta celda />
      </li>
    ));

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      // Al pasar el dedo o el ratón por encima, el desfile se detiene
      style={{ '--duracion': `${duracion}s` }}
    >
      <ul
        className="flex w-max gap-1 [animation:desfilar_var(--duracion)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        aria-label="Tecnologías"
      >
        {tira('a')}
        <span aria-hidden="true" className="contents">
          {tira('b')}
        </span>
      </ul>
    </div>
  );
}
