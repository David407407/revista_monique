// Humo de una vela: sube recto (laminar) y luego se ondula y se enrosca (turbulento).
// Es la imagen de la pregunta «vela, leche en el café y tormenta». Canvas ligero:
// se pausa fuera de pantalla y queda quieto con prefers-reduced-motion.
import { useEffect, useRef } from 'react'

const HILOS = 6

// Sube suave de 0 a 1 entre a y b
function rampa(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export default function Humo({ className }) {
  const lienzo = useRef(null)

  useEffect(() => {
    const canvas = lienzo.current
    const ctx = canvas.getContext('2d')
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const colorHumo = css.getPropertyValue('--niebla-clara').trim() || '#c9d6d1'
    const colorLlama = css.getPropertyValue('--plasma').trim() || '#ff7a1a'
    const colorVela = css.getPropertyValue('--papel-2').trim() || '#ede6d3'

    let ancho = 0
    let alto = 0
    let raf = 0
    let visible = false
    const fases = Array.from({ length: HILOS }, (_, i) => i * 1.7)

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ancho = canvas.clientWidth
      alto = canvas.clientHeight
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const dibujar = (t) => {
      ctx.clearRect(0, 0, ancho, alto)
      const x0 = ancho * 0.5
      const yMecha = alto * 0.8
      const H = yMecha - alto * 0.04
      const amp = Math.min(ancho * 0.22, 140)

      // Vela (geometría simple) y llama
      ctx.fillStyle = colorVela
      ctx.fillRect(x0 - 13, yMecha + 10, 26, alto - yMecha)
      ctx.strokeStyle = '#2a2622'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x0, yMecha + 10)
      ctx.lineTo(x0, yMecha + 2)
      ctx.stroke()
      const brillo = ctx.createRadialGradient(x0, yMecha - 6, 0, x0, yMecha - 6, 46)
      brillo.addColorStop(0, 'rgba(255, 122, 26, 0.35)')
      brillo.addColorStop(1, 'rgba(255, 122, 26, 0)')
      ctx.fillStyle = brillo
      ctx.fillRect(x0 - 50, yMecha - 56, 100, 100)
      const parpadeo = quieto ? 0 : Math.sin(t * 9) * 0.6
      ctx.fillStyle = colorLlama
      ctx.beginPath()
      ctx.moveTo(x0, yMecha - 24 - parpadeo * 2)
      ctx.bezierCurveTo(x0 + 9, yMecha - 10, x0 + 8, yMecha + 2, x0, yMecha + 3)
      ctx.bezierCurveTo(x0 - 8, yMecha + 2, x0 - 9, yMecha - 10, x0, yMecha - 24 - parpadeo * 2)
      ctx.fill()

      // Hilos de humo
      ctx.strokeStyle = colorHumo
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (let h = 0; h < HILOS; h++) {
        const f = fases[h]
        const lado = (h - (HILOS - 1) / 2) / HILOS
        let antes = null
        for (let s = 0; s <= H; s += 3) {
          const u = s / H
          // Laminar hasta ~30 % de la altura, luego la perturbación crece
          const k = rampa(0.26, 1, u)
          const a = amp * Math.pow(k, 1.25)
          const x = x0 + lado * a * 0.9
            + a * (Math.sin(s * 0.018 - t * 1.3 + f) + 0.55 * Math.sin(s * 0.041 + t * 0.9 + f * 2.1) + 0.25 * Math.sin(s * 0.09 - t * 2.2 + f))
          const y = yMecha - 26 - s + a * 0.55 * Math.cos(s * 0.034 - t * 1.6 + f * 1.3)
          if (antes) {
            ctx.globalAlpha = (1 - u) * 0.75 * (1 - 0.35 * k)
            ctx.lineWidth = 1 + k * 1.6
            ctx.beginPath()
            ctx.moveTo(antes[0], antes[1])
            ctx.lineTo(x, y)
            ctx.stroke()
          }
          antes = [x, y]
        }
      }
      ctx.globalAlpha = 1
    }

    const bucle = (ms) => {
      dibujar(ms / 1000)
      if (visible && !quieto) raf = requestAnimationFrame(bucle)
    }

    medir()
    dibujar(4)

    const ro = new ResizeObserver(() => {
      medir()
      dibujar(quieto ? 4 : performance.now() / 1000)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !quieto) raf = requestAnimationFrame(bucle)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={lienzo} className={className} aria-hidden="true" />
}
