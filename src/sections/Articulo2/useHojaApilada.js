import { useEffect } from 'react'

// "Hoja apilada": la sección queda pegada (sticky) para que la siguiente suba y la cubra.
// top = min(alto del navbar, alto de la ventana − alto de la sección).
// Vive aquí porque todavía no existe un componente de hoja compartido en src/components;
// cuando exista, esta lógica debería moverse allí.
export default function useHojaApilada(ref, navH = 72) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const calcular = () => {
      const top = Math.min(navH, window.innerHeight - el.offsetHeight)
      el.style.top = `${top}px`
    }

    calcular()
    const observador = new ResizeObserver(calcular)
    observador.observe(el)
    window.addEventListener('resize', calcular)
    return () => {
      observador.disconnect()
      window.removeEventListener('resize', calcular)
    }
  }, [ref, navH])
}
