// Anuncio 2: Stellarium — responsable: compañero
// Anuncio real de un planetario gratuito. Sin logos oficiales, solo el nombre.
// Hace eco del artículo anterior (El tiempo): mirar el cielo de cualquier fecha.
// Composición de anuncio a página completa de revista; el fondo imita la vista de Stellarium Web
// (cielo mirando al norte, horizonte, puntos cardinales, reloj) y gira con el scroll.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Cielo, posicionEtiqueta } from './Cielo.jsx'
import styles from './Anuncio2.module.css'

const HORAS = 6 // el scroll lleva la noche de las 21:00 a las 03:00
const ALTURA_POLO = 30 // grados entre la Estrella Polar y el horizonte (latitud aproximada)

const formatoDia = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
const formatoHora = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' })

// Esta noche a las 21:00, hora local
function inicioDeNoche() {
  const d = new Date()
  d.setHours(21, 0, 0, 0)
  return d
}

// Tiempo sidéreo local aproximado (en horas). La longitud se estima con la zona horaria,
// así el cielo dibujado se parece al de esta noche hacia el norte, sin pedir la ubicación.
function tiempoSidereo(fecha) {
  const dias = fecha.getTime() / 86400000 + 2440587.5 - 2451545
  const gmst = 18.697374558 + 24.06570982441908 * dias
  const longitud = -fecha.getTimezoneOffset() / 4
  return (((gmst + longitud / 15) % 24) + 24) % 24
}

const flecha = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Anuncio2() {
  const raiz = useRef(null)
  const ventana = useRef(null)
  const giro = useRef(null)
  const etiquetas = useRef([])
  const dia = useRef(null)
  const hora = useRef(null)
  const [medidas, setMedidas] = useState(null)

  const inicio = useMemo(inicioDeNoche, [])
  const lst = useMemo(() => tiempoSidereo(inicio), [inicio])

  // Medidas de la hoja: el polo va en el centro alto de la «ventana» y el horizonte en su borde inferior
  useLayoutEffect(() => {
    const el = raiz.current
    const medir = () => {
      const v = ventana.current
      const w = el.offsetWidth
      const h = el.offsetHeight
      const horizonte = v.offsetTop + v.offsetHeight
      const px = v.offsetLeft + v.offsetWidth / 2
      const py = v.offsetTop + v.offsetHeight * 0.4
      const escala = (horizonte - py) / ALTURA_POLO
      setMedidas({ w, h, px, py, horizonte, escala })
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // El scroll hace avanzar la noche: el cielo gira alrededor de la Estrella Polar (15° por hora)
  useEffect(() => {
    if (!medidas) return
    const el = raiz.current
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)')
    let marco = 0
    let ultimo = -1

    const pintar = (p) => {
      const grados = -15 * HORAS * p
      giro.current?.setAttribute('transform', `rotate(${grados})`)
      etiquetas.current.forEach((t) => {
        if (!t) return
        const { x, y } = posicionEtiqueta(t.dataset, grados, medidas)
        t.setAttribute('x', x)
        t.setAttribute('y', y)
        t.style.opacity = y > medidas.horizonte - 10 ? 0 : ''
      })
      const ahora = new Date(inicio.getTime() + p * HORAS * 3600000)
      if (dia.current) dia.current.textContent = formatoDia.format(ahora)
      if (hora.current) hora.current.textContent = formatoHora.format(ahora)
    }

    const progreso = () => {
      const vh = window.innerHeight
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
      const hoja = el.parentElement
      const siguiente = hoja?.nextElementSibling
      const fijo = parseFloat(getComputedStyle(hoja).top) || nav
      const recorrido = vh - fijo + (siguiente ? vh - nav : el.offsetHeight)
      const subida = Math.max(0, vh - el.getBoundingClientRect().top)
      const tapa = siguiente ? Math.max(0, vh - siguiente.getBoundingClientRect().top) : 0
      return Math.min(1, Math.max(0, (subida + tapa) / recorrido))
    }

    const actualizar = () => {
      marco = 0
      const p = quieto.matches ? 0 : progreso()
      if (Math.abs(p - ultimo) < 0.0005) return
      ultimo = p
      pintar(p)
    }
    const pedir = () => {
      if (!marco) marco = requestAnimationFrame(actualizar)
    }

    actualizar()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    quieto.addEventListener('change', pedir)
    return () => {
      cancelAnimationFrame(marco)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      quieto.removeEventListener('change', pedir)
    }
  }, [medidas, inicio])

  return (
    <aside id="anuncio-2" aria-label="Publicité : Stellarium Web" className={styles.anuncio} ref={raiz}>
      {medidas && <Cielo medidas={medidas} lst={lst} giro={giro} etiquetas={etiquetas} />}

      <div className={styles.cabecera}>
        <span className={styles.pill}>Publicité</span>
      </div>

      <div className={styles.texto}>
        <h2 className={styles.titulo}>
          Le ciel de votre naissance.
          <br />
          Ou celui dans <em>mille ans.</em>
        </h2>
        <p className={styles.bajada}>
          Choisissez une date et un lieu, et regardez les étoiles, les planètes et les
          constellations telles qu’elles étaient, ou seront, au-dessus de votre tête. Un
          planétarium gratuit, dans votre navigateur ou sur votre téléphone.
        </p>
      </div>

      {/* Hueco de cielo despejado. Su borde inferior es el horizonte. */}
      <div className={styles.ventana} ref={ventana}>
        <div className={styles.reloj} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span ref={dia} className={styles.dia}>{formatoDia.format(inicio)}</span>
          <span ref={hora} className={styles.hora}>{formatoHora.format(inicio)}</span>
        </div>
      </div>

      <div className={styles.firma}>
        <div className={styles.marca}>
          <span className={styles.nombre}>
            Stellarium <em>Web</em>
          </span>
          <ul className={styles.datos}>
            <li>Gratuit et libre</li>
            <li>Rien à installer</li>
            <li>Passé et futur</li>
          </ul>
        </div>
        <a href="https://stellarium-web.org/" target="_blank" rel="noreferrer" className={styles.cta}>
          Ouvrir Stellarium Web
          {flecha}
          <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>
        </a>
      </div>

      <p className={styles.legal}>
        Annonce à but éducatif. Le ciel dessiné est celui de ce soir, vers le nord, de façon
        approximative. Stellarium est un logiciel de planétarium libre et gratuit. Point Bleu Pâle
        n’est pas affilié au projet Stellarium.
      </p>
    </aside>
  )
}
