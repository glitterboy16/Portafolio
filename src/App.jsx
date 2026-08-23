import { useState } from 'react';
import BarraLateral from './components/BarraLateral';
import Navegacion from './components/Navegacion';
import Inicio from './components/Inicio';
import Resumen from './components/Resumen';
import Proyectos from './components/Proyectos';

const SECCIONES = [
  { id: 'inicio', etiqueta: 'Inicio', Componente: Inicio },
  { id: 'resumen', etiqueta: 'Resumen', Componente: Resumen },
  { id: 'proyectos', etiqueta: 'Proyectos', Componente: Proyectos },
];

export default function App() {
  const [activa, setActiva] = useState('inicio');
  const { Componente } = SECCIONES.find((s) => s.id === activa);

  const cambiar = (id) => {
    if (id === activa) return;
    setActiva(id);
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' });
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1180px] flex-col items-start gap-6 p-[clamp(1rem,3vw,2.5rem)] lg:flex-row">
      <BarraLateral />

      <div className="w-full min-w-0 flex-1">
        <Navegacion secciones={SECCIONES} activa={activa} onCambiar={cambiar} />

        {/* La clave fuerza el remontaje para que las animaciones de entrada se reinicien */}
        <div key={activa}>
          <Componente />
        </div>

        <footer className="mt-16 border-t border-borde pt-6 text-xs text-texto-3">
          <p>Diseñado y construido por Angel Villorina · Mérida, España</p>
        </footer>
      </div>
    </main>
  );
}
