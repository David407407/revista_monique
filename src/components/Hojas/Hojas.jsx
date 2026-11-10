// Efecto de hojas apiladas: cada sección se queda fija al terminar de leerse y la siguiente sube y la cubre.
// top = min(navbar, altoVentana − altoSección): una sección larga se lee completa antes de quedarse fija.
import { Children, useLayoutEffect, useRef, useState } from 'react'
import styles from './Hojas.module.css'

export default function Hojas({ children }) {
  const hojas = Children.toArray(children)
  const refs = useRef([])
  const [tops, setTops] = useState([])

  useLayoutEffect(() => {
    const medir = () => {
      const vh = window.innerHeight
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
      setTops(refs.current.map((el, i) => {
        const base = i === 0 ? 0 : nav
        return el ? Math.min(base, vh - el.offsetHeight) : base
      }))
    }
    medir()
    const ro = new ResizeObserver(medir)
    refs.current.forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [hojas.length])

  return hojas.map((hoja, i) => (
    <div
      key={hoja.key ?? i}
      ref={(el) => { refs.current[i] = el }}
      className={i === 0 ? styles.primera : styles.hoja}
      style={{ top: tops[i] ?? 0, zIndex: i + 1 }}
    >
      {hoja}
    </div>
  ))
}
