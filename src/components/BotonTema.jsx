/**
 * Alterna claro/oscuro. El sol y la luna comparten sitio: uno gira y se
 * encoge mientras el otro entra, así el cambio se lee como un solo gesto.
 */
export default function BotonTema({ tema, alternar, compacto = false }) {
  const esOscuro = tema === 'dark';

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
      className={`group grid shrink-0 place-items-center text-texto-2 transition-all duration-300 ease-suave hover:text-texto active:scale-95 ${
        compacto
          ? 'size-8 border border-borde hover:border-borde-fuerte'
          : 'vidrio size-11 rounded-full hover:scale-105'
      }`}
    >
      <span className="relative block size-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          className={`absolute inset-0 size-5 transition-all duration-500 ease-entrada ${
            esOscuro ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 4 4M20 20l-1.6-1.6M18.4 5.6 20 4M4 20l1.6-1.6" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 size-5 transition-all duration-500 ease-entrada ${
            esOscuro ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
        </svg>
      </span>
    </button>
  );
}
