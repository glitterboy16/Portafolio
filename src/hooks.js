import { useCallback, useEffect, useRef, useState } from 'react';

const CLAVE_TEMA = 'tema';

/**
 * Tema claro/oscuro. Arranca con lo que el usuario haya elegido antes; si no
 * ha elegido nada, sigue la preferencia del sistema y reacciona si cambia.
 */
export function useTema() {
  const [tema, setTema] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (guardado === 'light' || guardado === 'dark') return guardado;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  useEffect(() => {
    if (localStorage.getItem(CLAVE_TEMA)) return;
    const consulta = window.matchMedia('(prefers-color-scheme: light)');
    const alCambiar = (e) => setTema(e.matches ? 'light' : 'dark');
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);

  const alternar = useCallback(() => {
    setTema((actual) => {
      const siguiente = actual === 'dark' ? 'light' : 'dark';
      localStorage.setItem(CLAVE_TEMA, siguiente);
      return siguiente;
    });
  }, []);

  return { tema, alternar };
}

/**
 * Publica la posición del cursor dentro del elemento como --mx / --my,
 * que es lo que lee el foco de luz de .foco en CSS.
 */
export function useFoco() {
  const ref = useRef(null);

  const alMover = useCallback((e) => {
    const nodo = ref.current;
    if (!nodo) return;
    const caja = nodo.getBoundingClientRect();
    nodo.style.setProperty('--mx', `${e.clientX - caja.left}px`);
    nodo.style.setProperty('--my', `${e.clientY - caja.top}px`);
  }, []);

  return { ref, onMouseMove: alMover };
}

/**
 * Revela el elemento cuando entra en pantalla. Devuelve una ref y un booleano;
 * deja de observar en cuanto se ha revelado, no hace falta vigilar más.
 */
export function useRevelar({ margen = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { rootMargin: margen },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [margen]);

  return { ref, visible };
}
