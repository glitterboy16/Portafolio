import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Idioma de la interfaz.
 *
 * Cada texto vive en los dos idiomas a la vez, como un objeto { es, en }, y
 * `t` elige el que toca. Sin catálogos aparte ni claves inventadas: el texto
 * está donde se usa, y añadir un idioma sería añadir una letra más al objeto.
 */
const CLAVE = 'idioma';
const ContextoIdioma = createContext(null);

export function ProveedorIdioma({ children }) {
  const [idioma, setIdioma] = useState(() => {
    if (typeof window === 'undefined') return 'es';
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === 'es' || guardado === 'en') return guardado;
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  const alternar = useCallback(() => {
    setIdioma((actual) => {
      const siguiente = actual === 'es' ? 'en' : 'es';
      localStorage.setItem(CLAVE, siguiente);
      return siguiente;
    });
  }, []);

  const t = useCallback((texto) => (typeof texto === 'string' ? texto : (texto?.[idioma] ?? texto?.es)), [idioma]);

  return (
    <ContextoIdioma.Provider value={{ idioma, alternar, t }}>{children}</ContextoIdioma.Provider>
  );
}

export function useIdioma() {
  const contexto = useContext(ContextoIdioma);
  if (!contexto) throw new Error('useIdioma necesita estar dentro de ProveedorIdioma');
  return contexto;
}
