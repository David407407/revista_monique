import { useEffect, useRef, useState } from 'react'
import { annee, nombre } from '../typo.js'
import useReduceMotion from './useReduceMotion.js'
import s from './Modulos.module.css'

const DURACION_MS = 900

const formatear = (item, n) => `${item.prefijo ?? ''}${item.anio ? annee(n) : nombre(n)}`

// «Les piliers en six chiffres»: cuenta de 0 al valor al entrar en pantalla.
// El texto accesible es siempre el valor final; la cifra animada va oculta para lectores de pantalla.
export default function Chiffres({ t }) {
  const reducir = useReduceMotion()
  const caja = useRef(null)
  const [avanceAnimado, setAvance] = useState(0) // 0–1
  const avance = reducir ? 1 : avanceAnimado

  useEffect(() => {
    const el = caja.current
    if (reducir || !el) return undefined
    let id
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        observador.disconnect()
        const t0 = performance.now()
        const paso = (ahora) => {
          const p = Math.min(1, (ahora - t0) / DURACION_MS)
          setAvance(1 - (1 - p) ** 3)
          if (p < 1) id = requestAnimationFrame(paso)
        }
        id = requestAnimationFrame(paso)
      },
      { threshold: 0.4 },
    )
    observador.observe(el)
    return () => {
      observador.disconnect()
      cancelAnimationFrame(id)
    }
  }, [reducir])

  return (
    <section ref={caja} aria-labelledby="nebulosas-chiffres" className={s.chiffres}>
      <h2 id="nebulosas-chiffres" className={s.chiffresTitulo}>
        {t.titulo}
      </h2>
      <ul className={s.chiffresLista}>
        {t.items.map((item) => {
          const final = item.texto ?? formatear(item, item.n)
          const visible = item.texto ?? formatear(item, Math.round(item.n * avance))
          return (
            <li key={item.label}>
              <span className={s.chiffreCifra}>
                <span aria-hidden="true">{visible}</span>
                <span className="sr-only">{final}</span>
              </span>
              <span className={s.chiffreLabel}>{item.label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
