// Idioma de la revista: francés (por defecto) o inglés.
// Orden de prioridad al abrir: ?lang=en|fr en la URL > lo guardado en localStorage > francés.
// Uso en cualquier componente:
//   const t = useT()            →  t('Texte en français', 'English text')
//   const { idioma } = useIdioma()  →  'fr' | 'en'
import { createContext, useContext, useEffect, useState } from 'react'

const CLAVE = 'pbp-idioma'
const TITULOS = {
  fr: 'Point Bleu Pâle — revue de science',
  en: 'Point Bleu Pâle — a science magazine',
}

const IdiomaContext = createContext({ idioma: 'fr', setIdioma: () => {} })

function idiomaInicial() {
  try {
    const url = new URLSearchParams(window.location.search).get('lang')
    if (url === 'en' || url === 'fr') return url
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === 'en' || guardado === 'fr') return guardado
  } catch {
    // sin almacenamiento o sin URL: francés
  }
  return 'fr'
}

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(idiomaInicial)

  useEffect(() => {
    document.documentElement.lang = idioma
    document.title = TITULOS[idioma]
    // Si se entró con ?lang=..., el enlace sigue al idioma elegido (al recargar no vuelve al anterior)
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang') && url.searchParams.get('lang') !== idioma) {
      url.searchParams.set('lang', idioma)
      window.history.replaceState(null, '', url)
    }
    try {
      localStorage.setItem(CLAVE, idioma)
    } catch {
      // sin almacenamiento: el idioma solo dura esta visita
    }
  }, [idioma])

  return <IdiomaContext.Provider value={{ idioma, setIdioma }}>{children}</IdiomaContext.Provider>
}

export const useIdioma = () => useContext(IdiomaContext)

export function useT() {
  const { idioma } = useIdioma()
  return (fr, en) => (idioma === 'en' ? en : fr)
}

// Formato de números y fechas según el idioma
export const localeDe = (idioma) => (idioma === 'en' ? 'en-US' : 'fr-FR')
