// Esquemas animados del Artículo 1. Cada uno avanza con el scroll: bajar = acercarse al agujero negro.
// En modo Simple se ocultan (CSS). Con movimiento reducido se muestran en su estado final.
import { useCallback, useEffect, useRef, useState } from 'react'
import { coma, limitar, mezclar, suave, useMovimientoReducido, useProgreso } from './useProgreso.js'
import m87 from '../../assets/articulo1/m87-1200.webp'
import styles from './Escenas.module.css'

// Ritmo de "tu" reloj visto desde la Tierra: 1 al empezar el artículo, casi 0 al final.
const ritmo = (p) => Math.max(0.02, 1 - 0.98 * Math.pow(p, 1.15))
const GRADOS_POR_MS = 0.09 // una vuelta cada 4 s a ritmo normal
const ritmoTierra = () => 1
const ritmoTuyo = () => 0.02

function Escena({ refEscena, children, lecturas, pie }) {
  return (
    <figure ref={refEscena} className={styles.escena}>
      <div className={styles.lienzo}>
        {children}
        {lecturas && <div className={styles.lecturas}>{lecturas}</div>}
      </div>
      <figcaption>{pie}</figcaption>
    </figure>
  )
}

function useP(ref) {
  const reducido = useMovimientoReducido()
  const p = useProgreso(ref)
  return reducido ? 1 : p
}

/* 1 · La Tierra comprimida hasta ser una canica */
function formatoDiametro(m) {
  if (m >= 1000) return `${Math.round(m / 1000).toLocaleString('fr-FR')} km`
  if (m >= 1) return `${Math.round(m).toLocaleString('fr-FR')} m`
  return `${(m * 100).toLocaleString('fr-FR', { maximumFractionDigits: m < 0.1 ? 1 : 0 })} cm`
}

export function EscenaTierra() {
  const ref = useRef(null)
  const p = useP(ref)
  const r = 120 * Math.pow(6 / 120, p)
  const diametro = 12742000 * Math.pow(0.018 / 12742000, p)
  const bille = suave(0.7, 0.95, p)

  return (
    <Escena
      refEscena={ref}
      pie="Fig. 2 — Pour devenir un trou noir, la Terre devrait tenir dans une bille. Schéma, pas à l’échelle."
      lecturas={<>
        <span>Diamètre de la Terre : <b>{formatoDiametro(diametro)}</b></span>
        <span>Masse : <b>inchangée</b></span>
      </>}
    >
      <svg viewBox="0 0 480 280" role="img" aria-label="La Terre se comprime jusqu’à la taille d’une bille, sans perdre de masse.">
        <defs>
          <radialGradient id="pbp-tierra" cx="35%" cy="32%" r="75%">
            <stop offset="0" stopColor="#d3e8fb" />
            <stop offset="0.55" stopColor="var(--azul-palido)" />
            <stop offset="1" stopColor="#2f5b82" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="140" r="6" fill="none" stroke="var(--niebla)" strokeDasharray="2 3" />
        <circle cx="240" cy="140" r={r} fill="url(#pbp-tierra)" />
        <g opacity={bille}>
          <path d="M248 132 L300 90 H340" stroke="var(--niebla)" fill="none" />
          <text x="346" y="95" className={styles.t}>une bille</text>
        </g>
      </svg>
    </Escena>
  )
}

/* 2 · El Sol se convierte en un agujero negro de la misma masa: la órbita no cambia */
export function EscenaSol() {
  const ref = useRef(null)
  const p = useP(ref)
  const e = suave(0.2, 0.6, p)
  const ang = ((-90 + p * 540) * Math.PI) / 180
  const tx = 240 + 110 * Math.cos(ang)
  const ty = 140 + 110 * Math.sin(ang)

  return (
    <Escena
      refEscena={ref}
      pie="Fig. 3 — On remplace le Soleil par un trou noir de même masse : la Terre ne change pas d’orbite. Schéma."
      lecturas={<>
        <span>Au centre : <b>{e < 0.5 ? 'le Soleil' : 'un trou noir'}</b></span>
        <span>Orbite : <b>identique</b></span>
        <span>Lumière reçue : <b>{Math.round((1 - e) * 100)} %</b></span>
      </>}
    >
      <svg viewBox="0 0 480 280" role="img" aria-label="La Terre tourne autour du Soleil. Le Soleil devient un minuscule trou noir et la Terre garde exactement la même orbite, mais dans le noir.">
        <rect x="0" y="0" width="480" height="280" fill="#020605" opacity={e * 0.6} />
        <circle cx="240" cy="140" r="110" fill="none" stroke="var(--niebla)" strokeDasharray="3 6" opacity="0.7" />
        <circle cx="240" cy="140" r="70" fill="var(--plasma)" opacity={0.14 * (1 - e)} />
        <circle cx="240" cy="140" r={mezclar(32, 4, e)} fill="var(--plasma)" opacity={1 - e} />
        <circle cx="240" cy="140" r="4" fill="#050505" stroke="var(--papel)" strokeWidth="1" opacity={e} />
        <circle cx={tx} cy={ty} r="8" fill="var(--azul-palido)" opacity={1 - 0.6 * e} />
        <text x="240" y="276" textAnchor="middle" className={styles.tSuave}>même orbite</text>
      </svg>
    </Escena>
  )
}

/* 3 · El río que cae en cascada: el horizonte de sucesos */
export function EscenaRio() {
  const ref = useRef(null)
  const p = useP(ref)
  const HORIZONTE = 350
  const x = mezclar(60, 420, p)
  const pasado = x > HORIZONTE
  const flechas = []
  for (let fx = 40; fx <= 440; fx += 44) {
    const k = fx / 480
    const largo = 8 + k * k * 34
    for (const fy of [102, 138]) {
      flechas.push(
        <path
          key={`${fx}-${fy}`}
          d={`M${fx - largo / 2} ${fy} H${fx + largo / 2} M${fx + largo / 2 - 5} ${fy - 4} L${fx + largo / 2} ${fy} L${fx + largo / 2 - 5} ${fy + 4}`}
          stroke="var(--azul-palido)"
          strokeWidth="1.5"
          fill="none"
          opacity={0.3 + 0.6 * k}
        />,
      )
    }
  }

  return (
    <Escena
      refEscena={ref}
      pie="Fig. 4 — L’espace « coule » vers le trou noir comme une rivière vers une cascade. Schéma."
      lecturas={<>
        <span>Courant : <b>{x < 200 ? 'lent' : x < HORIZONTE ? 'rapide' : 'plus rapide que la lumière'}</b></span>
        <span>Retour possible : <b>{pasado ? 'non' : 'oui'}</b></span>
      </>}
    >
      <svg viewBox="0 0 480 240" role="img" aria-label="Un poisson nage à contre-courant dans une rivière qui accélère vers une cascade. Après la ligne de l’horizon, le courant l’emporte.">
        <defs>
          <linearGradient id="pbp-cascada" x1="0" x2="1">
            <stop offset="0" stopColor="#050505" stopOpacity="0" />
            <stop offset="1" stopColor="#050505" />
          </linearGradient>
        </defs>
        <rect x="0" y="78" width="480" height="84" fill="var(--azul-palido)" opacity="0.1" />
        <rect x={HORIZONTE} y="78" width={480 - HORIZONTE} height="84" fill="url(#pbp-cascada)" />
        {flechas}
        <line x1={HORIZONTE} y1="56" x2={HORIZONTE} y2="184" stroke="var(--biolum)" strokeDasharray="4 4" />
        <text x={HORIZONTE} y="44" textAnchor="middle" className={styles.t}>horizon</text>
        <g transform={`translate(${x} 120)`}>
          <path d="M-12 0 H-40 M-34 -5 L-40 0 L-34 5" stroke={pasado ? 'var(--niebla)' : 'var(--biolum)'} strokeWidth="2" fill="none" />
          <circle r="7" fill="var(--papel)" />
          <text y="44" textAnchor="middle" className={styles.tSuave}>le poisson</text>
        </g>
      </svg>
    </Escena>
  )
}

/* 4 · Espaguetificación: un trou noir pequeño estira mucho; uno gigante, casi nada */
function Barra({ cx, base, sy }) {
  const sx = 1 / Math.sqrt(sy)
  return (
    <g transform={`translate(${cx} ${base}) scale(${sx} ${sy})`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="-11" y={-(i + 1) * 16} width="22" height="13" rx="2" fill="var(--biolum)" opacity={1 - i * 0.12} />
      ))}
    </g>
  )
}

export function EscenaEspagueti() {
  const ref = useRef(null)
  const p = useP(ref)
  const syPeque = 1 + 1.1 * p * p
  const syGigante = 1 + 0.05 * p
  const baseGigante = mezclar(140, 286, p)

  return (
    <Escena
      refEscena={ref}
      pie="Fig. 5 — Le même objet tombe vers deux trous noirs. Plus le trou noir est petit, plus il étire. Schéma."
      lecturas={<>
        <span>Petit trou noir : étirement <b>×{coma(syPeque)}</b></span>
        <span>Trou noir géant : étirement <b>×{coma(syGigante)}</b>{baseGigante > 262 ? ', horizon franchi' : ''}</span>
      </>}
    >
      <svg viewBox="0 0 480 300" role="img" aria-label="À gauche, un petit trou noir étire l’objet qui tombe comme un spaghetti avant même l’horizon. À droite, un trou noir géant le laisse presque intact, même après l’horizon.">
        <defs>
          <clipPath id="pbp-gigante"><rect x="250" y="0" width="230" height="300" /></clipPath>
        </defs>
        <line x1="240" y1="20" x2="240" y2="290" stroke="var(--borde-oscuro-2)" />
        <text x="120" y="28" textAnchor="middle" className={styles.t}>Petit trou noir</text>
        <text x="360" y="28" textAnchor="middle" className={styles.t}>Trou noir géant</text>

        <circle cx="120" cy="266" r="16" fill="#050505" stroke="var(--papel)" strokeOpacity="0.6" />
        <Barra cx={120} base={mezclar(150, 226, p)} sy={syPeque} />

        <g clipPath="url(#pbp-gigante)">
          <circle cx="360" cy="562" r="300" fill="#050505" stroke="var(--papel)" strokeOpacity="0.6" />
          <Barra cx={360} base={baseGigante} sy={syGigante} />
        </g>
      </svg>
    </Escena>
  )
}

/* 5 · La luz de la parte de atrás del disco se curva por encima del agujero negro */
function Arco({ d, ancho = 3 }) {
  return (
    <>
      <path d={d} stroke="var(--plasma)" strokeWidth={ancho * 4} strokeOpacity="0.28" fill="none" strokeLinecap="round" />
      <path d={d} stroke="#ffc58f" strokeWidth={ancho} fill="none" strokeLinecap="round" />
    </>
  )
}

export function EscenaLente() {
  const ref = useRef(null)
  const p = useP(ref)
  const rx = mezclar(190, 68, p)
  const ry = mezclar(22, 80, p)
  const etiqueta = suave(0.65, 0.95, p)

  return (
    <Escena
      refEscena={ref}
      pie="Fig. 7 — Pourquoi Gargantua a l’air « plié » : la gravité courbe la lumière de l’arrière du disque. Schéma."
      lecturas={<span>Arrière du disque : <b>{p < 0.5 ? 'caché derrière le trou noir' : 'visible par-dessus et par-dessous'}</b></span>}
    >
      <svg viewBox="0 0 480 280" role="img" aria-label="Un disque de gaz entoure un trou noir. La lumière de l’arrière du disque est courbée et apparaît au-dessus et en dessous du trou noir.">
        <Arco d={`M${240 - rx} 150 A${rx} ${ry} 0 0 1 ${240 + rx} 150`} />
        <g opacity={p}>
          <Arco d={`M178 150 A62 ${mezclar(1, 64, p)} 0 0 0 302 150`} ancho={1.5} />
        </g>
        <circle cx="240" cy="150" r="46" fill="#050505" />
        <Arco d="M50 150 A190 22 0 0 0 430 150" />
        <text x="240" y={150 - ry - 22} textAnchor="middle" className={styles.tSuave} opacity={etiqueta}>arrière du disque</text>
        <text x="240" y="268" textAnchor="middle" className={styles.tSuave}>avant du disque</text>
      </svg>
    </Escena>
  )
}

/* 6 · Comparador: anillo simétrico (como en la película) contra la foto real de M87* */
export function Comparador() {
  const ref = useRef(null)
  const [x, setX] = useState(50)
  const tocado = useRef(false)
  const reducido = useMovimientoReducido()

  // Una sola vez, al aparecer, el deslizador se mueve solo para enseñar que se puede arrastrar.
  useEffect(() => {
    if (reducido) return undefined
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const paso = (t) => {
        if (tocado.current) return
        const k = limitar((t - t0) / 1400)
        setX(50 - 18 * Math.sin(k * Math.PI) * (1 - k * 0.3))
        if (k < 1) raf = requestAnimationFrame(paso)
        else setX(50)
      }
      raf = requestAnimationFrame(paso)
    }, { threshold: 0.7 })
    if (ref.current) io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reducido])

  return (
    <figure ref={ref} className={styles.escena}>
      <div className={styles.comparador} style={{ '--x': `${x}%` }}>
        <img src={m87} alt="" loading="lazy" />
        <svg className={styles.film} viewBox="0 0 1200 699" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="1200" height="699" fill="#070302" />
          <defs>
            <filter id="pbp-brillo" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22" /></filter>
            <filter id="pbp-brillo-2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
          </defs>
          <circle cx="600" cy="320" r="100" fill="none" stroke="#c2410c" strokeWidth="110" filter="url(#pbp-brillo)" opacity="0.8" />
          <circle cx="600" cy="320" r="92" fill="none" stroke="#ff9a3c" strokeWidth="44" filter="url(#pbp-brillo-2)" />
        </svg>
        <span className={`${styles.marca} ${styles.marcaIzq}`}>Sans l’effet Doppler, comme dans le film</span>
        <span className={`${styles.marca} ${styles.marcaDer}`}>Photo réelle · M87*</span>
        <span className={styles.linea} aria-hidden="true" />
        <input
          className={styles.rango}
          type="range"
          min="0"
          max="100"
          value={x}
          onChange={(e) => {
            tocado.current = true
            setX(Number(e.target.value))
          }}
          aria-label="Comparer : glisser vers la gauche pour voir la photo réelle, vers la droite pour voir l’anneau symétrique"
        />
        <span className={styles.poignee} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <figcaption>Fig. 8 — Gauche : un anneau parfaitement régulier, comme Gargantua (illustration). Droite : M87*, Event Horizon Telescope, 2019. Sur la vraie photo, le bas de l’anneau brille davantage.</figcaption>
    </figure>
  )
}

/* Reloj: hace girar una manecilla con un ritmo que puede cambiar en cada cuadro */
function useManecilla(refManecilla, activo, obtenerRitmo, cx = 24, cy = 24, inicial = 0) {
  useEffect(() => {
    if (!activo) return undefined
    let raf = 0
    let ultimo = performance.now()
    let angulo = inicial
    const paso = (t) => {
      angulo = (angulo + (t - ultimo) * GRADOS_POR_MS * obtenerRitmo()) % 360
      ultimo = t
      refManecilla.current?.setAttribute('transform', `rotate(${angulo} ${cx} ${cy})`)
      raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [refManecilla, activo, obtenerRitmo, cx, cy, inicial])
}

function Esfera({ cx, cy, r, refManecilla, color, angulo = 0 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="var(--abismo)" stroke="var(--borde-oscuro-2)" strokeWidth={r / 18} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <line key={i} x1={cx + Math.sin(a) * r * 0.78} y1={cy - Math.cos(a) * r * 0.78} x2={cx + Math.sin(a) * r * 0.9} y2={cy - Math.cos(a) * r * 0.9} stroke="var(--niebla)" strokeWidth={r / 22} />
      })}
      <line ref={refManecilla} transform={`rotate(${angulo} ${cx} ${cy})`} x1={cx} y1={cy + r * 0.14} x2={cx} y2={cy - r * 0.72} stroke={color} strokeWidth={r / 11} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r / 12} fill={color} />
    </g>
  )
}

/* El reloj de la esquina: se frena a medida que bajas por el artículo */
export function RelojEsquina() {
  const ref = useRef(null)
  const manecilla = useRef(null)
  const valor = useRef(null)
  const ritmoActual = useRef(1)
  const reducido = useMovimientoReducido()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const articulo = ref.current?.closest('article')
    if (!articulo) return undefined
    let raf = 0
    let enPantalla = false

    const medir = () => {
      raf = 0
      const vh = window.innerHeight
      const r = articulo.getBoundingClientRect()
      const final = articulo.querySelector('[data-reloj-final]')?.getBoundingClientRect()
      // De 0 (empieza el texto) a 1 (aparecen los relojes finales): así llega a ×0,02 justo al relevo.
      const recorrido = final ? final.top - r.top - vh : r.height - vh
      const p = limitar(-r.top / recorrido)
      ritmoActual.current = ritmo(p)
      if (valor.current) valor.current.textContent = `×${coma(ritmoActual.current, 2)}`
      const finalVisible = final && final.top < vh && final.bottom > 0
      setVisible(articulo.dataset.modo !== 'simple' && r.top < vh * 0.2 && r.bottom > vh * 0.7 && !finalVisible)
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir)
    }
    const io = new IntersectionObserver(([e]) => {
      enPantalla = e.isIntersecting
      pedir()
    })
    const alScroll = () => enPantalla && pedir()
    io.observe(articulo)
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', pedir)
    }
  }, [])

  const obtenerRitmo = useCallback(() => ritmoActual.current, [])
  useManecilla(manecilla, visible && !reducido, obtenerRitmo)

  return (
    <div ref={ref} className={styles.reloj} data-visible={visible} aria-hidden="true">
      <svg width="44" height="44" viewBox="0 0 48 48">
        <Esfera cx={24} cy={24} r={22} refManecilla={manecilla} color="var(--biolum)" />
      </svg>
      <span className={styles.relojTexto}>
        <span>Ton temps</span>
        <b ref={valor}>×1,00</b>
      </span>
    </div>
  )
}

/* 7 · Final: el reloj de la Tierra contra el tuyo, cerca del horizonte */
export function RelojesFinal() {
  const ref = useRef(null)
  const tierra = useRef(null)
  const tuyo = useRef(null)
  const reducido = useMovimientoReducido()
  const [enPantalla, setEnPantalla] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useManecilla(tierra, enPantalla && !reducido, ritmoTierra, 130, 120, 250)
  useManecilla(tuyo, enPantalla && !reducido, ritmoTuyo, 350, 120, 5)

  return (
    <figure ref={ref} className={styles.escena} data-reloj-final="">
      <div className={styles.lienzo}>
        <svg viewBox="0 0 480 250" role="img" aria-label="Deux horloges. Celle de la Terre tourne normalement ; la tienne, près de l’horizon, avance à peine.">
          <Esfera cx={130} cy={120} r={86} refManecilla={tierra} color="var(--azul-palido)" angulo={250} />
          <Esfera cx={350} cy={120} r={86} refManecilla={tuyo} color="var(--biolum)" angulo={5} />
        </svg>
        <div className={styles.lecturas}>
          <span>Terre : <b>×1</b></span>
          <span>Toi, près de l’horizon : <b>×0,02</b></span>
        </div>
      </div>
      <figcaption>Fig. 9 — Pendant que l’horloge de la Terre fait un tour, la tienne bouge à peine. Schéma : près d’un vrai trou noir, l’écart peut être bien plus grand.</figcaption>
    </figure>
  )
}

