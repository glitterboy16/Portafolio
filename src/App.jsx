import { useMemo } from 'react';
import Aurora from './components/Aurora';
import Navegacion from './components/Navegacion';
import Portada from './components/Portada';
import Brecha from './components/Brecha';
import SobreMi from './components/SobreMi';
import Proyectos from './components/Proyectos';
import Servicios from './components/Servicios';
import Pie from './components/Pie';
import { useTema, useScrollSuave, useSeccionVisible } from './hooks';

const SECCIONES = [
  { id: 'sobre-mi', etiqueta: { es: 'Sobre mí', en: 'About' } },
  { id: 'proyectos', etiqueta: { es: 'Proyectos', en: 'Work' } },
  { id: 'precios', etiqueta: { es: 'Precios', en: 'Pricing' } },
];

export default function App() {
  const { tema, alternar } = useTema();
  const { irA, parar } = useScrollSuave();
  const ids = useMemo(() => SECCIONES.map((s) => s.id), []);
  const activa = useSeccionVisible(ids);

  return (
    <>
      <Aurora />

      <Navegacion
        secciones={SECCIONES}
        activa={activa}
        onIr={irA}
        tema={tema}
        alternar={alternar}
        onBloquear={parar}
      />

      <main>
        <Portada onIr={irA} />
        <Brecha />

        <div className="mx-auto w-full max-w-[1240px] px-[clamp(0.875rem,2.5vw,2.5rem)]">
          <SobreMi />
          <Proyectos />
          <Servicios />
        </div>
      </main>

      <Pie onIr={irA} secciones={SECCIONES} />
    </>
  );
}
