// Progreso 0→1 de un elemento mientras cruza la pantalla, y preferencia de movimiento reducido.
import { useEffect, useState } from 'react'

export const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const mezclar = (a, b, t) => a + (b - a) * t
export const suave = (desde, hasta, v) => {
  const t = limitar((v - desde) / (hasta - desde))
  return t * t * (3 - 2 * t)
}
export const coma = (n, decimales = 1) => n.toFixed(decimales).replace('.', ',')

// La animación ocurre mientras el elemento se ve (casi) completo:
// p = 0 cuando su centro está al 75 % de la ventana, p = 1 cuando llega al 30 %.
// Así el recorrido es de ~45 % de pantalla en celular y en escritorio.
export function useProgreso(ref) {
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let raf = 0
    let visible = false

    const medir = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const centro = r.top + r.height / 2
      const a = vh * 0.75
      const b = vh * 0.3
      const v = limitar((a - centro) / (a - b))
      setP((prev) => (Math.abs(prev - v) < 0.001 ? prev : v))
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      pedir()
    }, { rootMargin: '25% 0px' })
    const alScroll = () => visible && pedir()

    io.observe(el)
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', pedir)
    pedir()
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', pedir)
    }
  }, [ref])

  return p
}

export function useMovimientoReducido() {
  const consulta = '(prefers-reduced-motion: reduce)'
  const [reducido, setReducido] = useState(() => typeof window !== 'undefined' && window.matchMedia(consulta).matches)

  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const cambio = () => setReducido(mq.matches)
    mq.addEventListener('change', cambio)
    return () => mq.removeEventListener('change', cambio)
  }, [])

  return reducido
}
