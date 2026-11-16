// Módulos interactivos del Artículo 3. Todas las cifras salen del texto del artículo.
// En modo Simple se ocultan (CSS); con movimiento reducido no hay animaciones, se salta al resultado.
import { useEffect, useRef, useState } from 'react'
import { localeDe, useIdioma, useT } from '../../components/Idioma/Idioma.jsx'
import s from './Articulo3.module.css'

/* ---------- utilidades ---------- */

// Coma decimal en francés, punto en inglés
const coma = (n, dec = 1, idioma = 'fr') => {
  const texto = n.toFixed(dec).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
  return idioma === 'en' ? texto : texto.replace('.', ',')
}

function fmtAnios(a, idioma = 'fr') {
  const en = idioma === 'en'
  if (a < 1e6) {
    const n = Math.round(a)
    return `${n.toLocaleString(localeDe(idioma))} ${en ? (n === 1 ? 'year' : 'years') : 'ans'}`
  }
  if (a < 1e9) {
    const m = a / 1e6
    const cifra = coma(m, m < 10 ? 1 : 0, idioma)
    return en ? `${cifra} million years` : `${cifra} million${m >= 2 ? 's' : ''} d’années`
  }
  const g = a / 1e9
  return en ? `${coma(g, 1, idioma)} billion years` : `${coma(g, 1)} milliard${g >= 2 ? 's' : ''} d’années`
}

function useMovimientoReducido() {
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

// Anima un valor de 0 a 1 en `ms` milisegundos mientras `activo` sea true.
function useAnimacion(activo, ms, alPaso, alTerminar) {
  const pasoRef = useRef(alPaso)
  const finRef = useRef(alTerminar)
  useEffect(() => {
    pasoRef.current = alPaso
    finRef.current = alTerminar
  })
  useEffect(() => {
    if (!activo) return undefined
    const t0 = performance.now()
    let id
    const paso = (ahora) => {
      const v = Math.min(1, (ahora - t0) / ms)
      pasoRef.current(v)
      if (v < 1) id = requestAnimationFrame(paso)
      else finRef.current()
    }
    id = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(id)
  }, [activo, ms])
}

function Modulo({ titulo, children, lecturas, mensaje, pie }) {
  const t = useT()
  return (
    <figure className={s.modulo}>
      <div className={s.panel}>
        <div className={s.moduloCabecera}>
          <span className={s.kicker}>{t('À toi de jouer', 'Your turn')}</span>
          <p className={s.moduloTitulo}>{titulo}</p>
        </div>
        {children}
        {mensaje && <p className={s.mensaje} aria-live="polite">{mensaje}</p>}
        {lecturas && (
          <dl className={s.lecturas}>
            {lecturas.map(([dt, dd]) => (
              <div key={dt}>
                <dt>{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <figcaption>{pie}</figcaption>
    </figure>
  )
}

function Opciones({ etiqueta, opciones, valor, onChange }) {
  return (
    <div role="group" aria-label={etiqueta} className={s.opciones}>
      {opciones.map(([id, texto]) => (
        <button key={id} type="button" aria-pressed={valor === id} onClick={() => onChange(id)}>
          {texto}
        </button>
      ))}
    </div>
  )
}

/* ---------- 1 · La machine à remonter le temps ---------- */

// Textos de cada objeto: [francés, inglés]
const objetos = [
  {
    id: 'soleil',
    boton: ['Le Soleil', 'The Sun'],
    distancia: ['un peu plus de 8 minutes-lumière', 'a little over 8 light-minutes'],
    salida: ['il y a un peu plus de 8 minutes', 'a little over 8 minutes ago'],
    terre: ['Il y a 8 minutes, tu étais peut-être déjà en train de lire cet article.', '8 minutes ago, you might already have been reading this article.'],
  },
  {
    id: 'chat',
    boton: ['La Patte de Chat', 'The Cat’s Paw'],
    distancia: ['≈ 5 500 années-lumière', '≈ 5,500 light-years'],
    salida: ['il y a ≈ 5 500 ans', '≈ 5,500 years ago'],
    terre: ['Sur Terre, les premières villes et l’écriture apparaissent en Mésopotamie.', 'On Earth, the first cities and writing are appearing in Mesopotamia.'],
  },
  {
    id: 'ngc',
    boton: ['NGC 1068', 'NGC 1068'],
    distancia: ['≈ 47 millions d’années-lumière', '≈ 47 million light-years'],
    salida: ['il y a ≈ 47 millions d’années', '≈ 47 million years ago'],
    terre: ['Sur Terre, les mammifères modernes commencent tout juste à se diversifier.', 'On Earth, modern mammals are just beginning to diversify.'],
  },
  {
    id: 'fond',
    boton: ['Les galaxies du fond', 'Background galaxies'],
    distancia: ['des milliards d’années-lumière', 'billions of light-years'],
    salida: ['il y a des milliards d’années', 'billions of years ago'],
    terre: ['Selon la galaxie, le Soleil et la Terre n’existaient peut-être même pas encore : le Soleil n’a qu’environ 4,6 milliards d’années.', 'Depending on the galaxy, the Sun and the Earth may not even have existed yet: the Sun is only about 4.6 billion years old.'],
  },
]

// Dibujos de tinta (trazo fino), como grabados
function Astro({ id }) {
  if (id === 'soleil') {
    return (
      <g className={s.tinta}>
        <circle cx="70" cy="90" r="20" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((g) => {
          const r = (g * Math.PI) / 180
          return <line key={g} x1={70 + 28 * Math.cos(r)} y1={90 + 28 * Math.sin(r)} x2={70 + 38 * Math.cos(r)} y2={90 + 38 * Math.sin(r)} />
        })}
      </g>
    )
  }
  if (id === 'chat') {
    return (
      <g className={s.tinta}>
        <path d="M34 84 C 36 60, 70 54, 88 66 C 108 78, 110 104, 92 116 C 74 128, 44 122, 38 104" />
        <path d="M50 92 C 54 76, 76 74, 86 86 C 94 96, 84 108, 70 106" />
        <circle cx="70" cy="90" r="3" className={s.tintaLlena} stroke="none" />
      </g>
    )
  }
  if (id === 'ngc') {
    return (
      <g className={s.tinta} strokeLinecap="round">
        <path d="M70 90 C 90 70, 110 100, 88 118 C 64 136, 30 110, 42 78 C 52 52, 96 48, 108 70" />
        <circle cx="70" cy="90" r="4" className={s.tintaLlena} stroke="none" />
      </g>
    )
  }
  return (
    <g className={s.tintaLlena}>
      {[[50, 70, 4], [78, 62, 3], [92, 96, 5], [60, 110, 3], [40, 94, 2.5], [84, 124, 2.5], [104, 76, 2]].map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={r * 1.6} ry={r} />
      ))}
    </g>
  )
}

export function ModuloMachine() {
  const [sel, setSel] = useState('chat')
  const t = useT()
  const o = objetos.find((x) => x.id === sel)

  return (
    <Modulo
      titulo={t('La machine à remonter le temps', 'The time machine')}
      mensaje={t(...o.terre)}
      lecturas={[
        ['Distance', t(...o.distancia)],
        [t('Lumière partie', 'Light left'), t(...o.salida)],
      ]}
      pie={t('Fig. 1 — Choisis un objet : la lumière que tu reçois aujourd’hui est partie il y a longtemps. Schéma, distances pas à l’échelle.', 'Fig. 1 — Pick an object: the light you receive today set out a long time ago. Diagram, distances not to scale.')}
    >
      <Opciones etiqueta={t('Choisis un objet à observer', 'Pick an object to observe')} opciones={objetos.map((x) => [x.id, t(...x.boton)])} valor={sel} onChange={setSel} />
      <svg viewBox="0 0 640 180" className={s.lienzo} aria-hidden="true">
        <line x1="110" y1="90" x2="560" y2="90" className={s.trayecto} />
        <Astro id={o.id} />
        <circle key={sel} cx="110" cy="90" r="6" className={s.foton} />
        <g className={s.tinta}>
          <circle cx="586" cy="90" r="20" />
          <ellipse cx="586" cy="90" rx="8" ry="20" />
          <line x1="566" y1="90" x2="606" y2="90" />
        </g>
        <text x="586" y="140" textAnchor="middle" className={s.svgEtiqueta}>{t('Toi', 'You')}</text>
        <text x="70" y="160" textAnchor="middle" className={s.svgEtiqueta}>{t(...o.boton)}</text>
      </svg>
    </Modulo>
  )
}

/* ---------- 2 · La course des étoiles ---------- */

const VIDA_SOL = 10e9
const VIDA_MASIVA = 4e6 // «quelques millions d’années»: valor solo para el dibujo
const ESCALAS = { soleil: 10e9, zoom: 10e6 }

export function ModuloCarrera() {
  const [escala, setEscala] = useState('soleil')
  const { idioma } = useIdioma()
  const tr = useT()
  const [t, setT] = useState(0)
  const [corriendo, setCorriendo] = useState(false)
  const reducido = useMovimientoReducido()

  useAnimacion(corriendo, 6000, setT, () => setCorriendo(false))

  const transcurrido = t * ESCALAS[escala]
  const solResta = Math.max(0, 1 - transcurrido / VIDA_SOL)
  const masivaResta = Math.max(0, 1 - transcurrido / VIDA_MASIVA)
  const explotada = masivaResta === 0
  const solFin = solResta === 0

  const lanzar = () => {
    setT(reducido ? 1 : 0)
    setCorriendo(!reducido)
  }
  const cambiarEscala = (e) => {
    setEscala(e)
    setCorriendo(false)
    setT(0)
  }

  let mensaje = tr('Appuie sur « Lancer le chrono » : les deux étoiles commencent à brûler leur combustible en même temps.', 'Press “Start the clock”: both stars start burning their fuel at the same time.')
  if (t > 0 && escala === 'soleil') {
    mensaje = solFin
      ? tr('Le Soleil arrive au bout de son combustible. Pas d’explosion pour lui : il n’est pas assez massif pour devenir une supernova.', 'The Sun runs out of fuel. No explosion for it: it isn’t massive enough to become a supernova.')
      : tr('Boum ! L’étoile massive a déjà explosé en supernova. Le Soleil, lui, a à peine commencé. Essaie le zoom pour voir ce qui s’est passé.', 'Boom! The massive star has already exploded as a supernova. The Sun has barely started. Try the zoom to see what happened.')
  } else if (t > 0) {
    mensaje = explotada
      ? tr('Boum ! Supernova après quelques millions d’années. Pendant ce temps, le Soleil a utilisé moins de 0,1 % de son combustible.', 'Boom! Supernova after a few million years. Meanwhile, the Sun has used less than 0.1% of its fuel.')
      : tr('L’étoile massive vide son réservoir à toute vitesse…', 'The massive star is emptying its tank at full speed…')
  }

  const fila = (y, nombre, r, color, resta, muerta) => (
    <g>
      {muerta ? (
        <g className={s.explosion} style={{ transformOrigin: `60px ${y}px` }}>
          <circle cx="60" cy={y} r="26" fill="none" style={{ stroke: color }} strokeWidth="1.5" />
          <circle cx="60" cy={y} r="14" fill="none" style={{ stroke: color }} strokeWidth="1" strokeDasharray="2 4" />
        </g>
      ) : (
        <circle cx="60" cy={y} r={r} style={{ fill: color }} />
      )}
      <text x="110" y={y - 18} className={s.svgEtiqueta}>{nombre}</text>
      <rect x="110" y={y - 6} width="490" height="14" className={s.barraFondo} />
      <rect x="110" y={y - 6} width={490 * resta} height="14" style={{ fill: color }} />
    </g>
  )

  return (
    <Modulo
      titulo={tr('La course des étoiles', 'The star race')}
      mensaje={mensaje}
      lecturas={[
        [tr('Chrono', 'Clock'), fmtAnios(transcurrido, idioma)],
        [tr('Combustible du Soleil', 'Sun’s fuel'), `${coma(solResta * 100, solResta > 0.99 ? 2 : 0, idioma)}${tr(' %', '%')}`],
        [tr('Étoile massive', 'Massive star'), explotada ? 'supernova' : `${coma(masivaResta * 100, 0, idioma)}${tr(' %', '%')}`],
      ]}
      pie={tr('Fig. 4 — La même course, vue à l’échelle du Soleil puis avec un zoom ×1 000. Schéma : la durée exacte dépend de la masse de l’étoile.', 'Fig. 4 — The same race, seen on the Sun’s scale and then zoomed in ×1,000. Diagram: the exact duration depends on the star’s mass.')}
    >
      <div className={s.controles}>
        <Opciones
          etiqueta={tr('Échelle du chrono', 'Clock scale')}
          opciones={[['soleil', tr('Échelle du Soleil', 'Sun’s scale')], ['zoom', tr('Zoom ×1 000', 'Zoom ×1,000')]]}
          valor={escala}
          onChange={cambiarEscala}
        />
        <button type="button" className={s.accion} onClick={lanzar} disabled={corriendo}>
          {t > 0 && !corriendo ? tr('Recommencer', 'Restart') : tr('Lancer le chrono', 'Start the clock')}
        </button>
      </div>
      <svg viewBox="0 0 640 190" className={s.lienzo} aria-hidden="true">
        {fila(55, tr('Le Soleil', 'The Sun'), 14, 'var(--acento-papel)', solResta, false)}
        {fila(140, tr('Une étoile massive', 'A massive star'), 22, 'var(--tinta)', masivaResta, explotada)}
      </svg>
    </Modulo>
  )
}

/* ---------- 3 · L’horloge de la Galaxie ---------- */

const ANIO_COSMICO = 230 // millones de años
const EDAD_SOL = 4600

const brazos = [0, 0.18, 1, 1.18, 2, 2.18, 3, 3.18].map((k) => {
  const pts = []
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * 4.2 + (k * Math.PI) / 2
    const r = 14 + i * 4.2
    pts.push(`${(200 + r * Math.cos(a)).toFixed(1)},${(200 + r * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join(' L')}`
})

export function ModuloGalaxia() {
  const [ma, setMa] = useState(0)
  const { idioma } = useIdioma()
  const t = useT()
  const [jugando, setJugando] = useState(false)
  const [desde, setDesde] = useState(0)
  const reducido = useMovimientoReducido()

  useAnimacion(jugando, Math.max(1, ((EDAD_SOL - desde) / EDAD_SOL) * 12000), (v) => {
    setMa(Math.round(desde + v * (EDAD_SOL - desde)))
  }, () => setJugando(false))

  const ir = (v) => {
    setJugando(false)
    setMa(v)
  }
  const jugar = () => {
    const inicio = ma >= EDAD_SOL ? 0 : ma
    if (reducido) return ir(EDAD_SOL)
    setDesde(inicio)
    setMa(inicio)
    setJugando(true)
  }

  const vueltas = ma / ANIO_COSMICO
  const ang = (-90 + vueltas * 360) * (Math.PI / 180)
  const solX = 200 + 120 * Math.cos(ang)
  const solY = 200 + 120 * Math.sin(ang)
  const textoTiempo = ma === 0 ? t('aujourd’hui', 'today') : t(`il y a ${fmtAnios(ma * 1e6)}`, `${fmtAnios(ma * 1e6, idioma)} ago`)

  let mensaje = t(
    `Il y a ${fmtAnios(ma * 1e6)}, le Soleil se trouvait ici. Depuis, il a fait ${coma(vueltas, 1)} tour${vueltas >= 2 ? 's' : ''} de la Galaxie.`,
    `${fmtAnios(ma * 1e6, idioma)} ago, the Sun was here. Since then, it has made ${coma(vueltas, 1, idioma)} ${vueltas === 1 ? 'lap' : 'laps'} around the Galaxy.`,
  )
  if (ma === 0) mensaje = t('Aujourd’hui. Toute l’histoire humaine tient dans un trait trop fin pour être dessiné sur ce cercle.', 'Today. All of human history fits into a line too thin to draw on this circle.')
  else if (Math.abs(ma - ANIO_COSMICO) <= 10) mensaje = t('Il y a une année cosmique, le Soleil était au même endroit… et les premiers dinosaures faisaient à peine leur apparition.', 'One cosmic year ago, the Sun was in the same spot… and the first dinosaurs were only just appearing.')
  else if (ma >= EDAD_SOL) mensaje = t('Naissance du Soleil, il y a environ 4,6 milliards d’années. Depuis, il a fait une vingtaine de tours.', 'The birth of the Sun, about 4.6 billion years ago. Since then, it has made some twenty laps.')

  return (
    <Modulo
      titulo={t('L’horloge de la Galaxie', 'The Galaxy clock')}
      mensaje={mensaje}
      lecturas={[
        [t('Moment', 'When'), textoTiempo],
        [t('Tours de galaxie', 'Laps around the galaxy'), coma(vueltas, 1, idioma)],
      ]}
      pie={t('Fig. 7 — Fais remonter le temps : le Soleil fait un tour de la Voie lactée en environ 230 millions d’années. Schéma, pas à l’échelle.', 'Fig. 7 — Turn back time: the Sun makes one lap around the Milky Way in about 230 million years. Diagram, not to scale.')}
    >
      <div className={s.galaxia}>
        <svg viewBox="0 0 400 400" className={s.lienzoCuadrado} aria-hidden="true">
          {brazos.map((d) => <path key={d} d={d} className={s.brazo} />)}
          <circle cx="200" cy="200" r="30" className={s.nucleo} />
          <circle cx="200" cy="200" r="5" className={s.tintaLlena} />
          <circle cx="200" cy="200" r="120" className={s.orbita} />
          <circle cx="200" cy="80" r="4" className={s.marcaOrbita} />
          <circle cx={solX} cy={solY} r="13" className={s.halo} />
          <circle cx={solX} cy={solY} r="6" className={s.acentoLleno} />
        </svg>
        <div className={s.galaxiaControles}>
          <label htmlFor="tiempo-galaxia" className={s.kicker}>{t('Remonter le temps', 'Turn back time')}</label>
          <input
            id="tiempo-galaxia"
            type="range"
            min="0"
            max={EDAD_SOL}
            step="10"
            value={ma}
            aria-valuetext={`${textoTiempo}, ${coma(vueltas, 1, idioma)} ${t('tours', 'laps')}`}
            onChange={(e) => ir(Number(e.target.value))}
            style={{ '--progreso': `${(ma / EDAD_SOL) * 100}%` }}
          />
          <div className={s.escalaRango} aria-hidden="true"><span>{t('aujourd’hui', 'today')}</span><span>{t('4,6 milliards d’années', '4.6 billion years')}</span></div>
          <div className={s.opciones}>
            <button type="button" onClick={() => ir(0)} aria-pressed={ma === 0}>{t('Aujourd’hui', 'Today')}</button>
            <button type="button" onClick={() => ir(ANIO_COSMICO)} aria-pressed={ma === ANIO_COSMICO}>{t('Premiers dinosaures', 'First dinosaurs')}</button>
            <button type="button" onClick={() => ir(EDAD_SOL)} aria-pressed={ma === EDAD_SOL}>{t('Naissance du Soleil', 'Birth of the Sun')}</button>
          </div>
          <button type="button" className={s.accion} onClick={jugar} disabled={jugando}>{t('Faire tourner la Galaxie', 'Spin the Galaxy')}</button>
        </div>
      </div>
    </Modulo>
  )
}

/* ---------- 4 · Et si le GPS oubliait Einstein ? ---------- */

export function ModuloGps() {
  const [dias, setDias] = useState(0)
  const { idioma } = useIdioma()
  const t = useT()
  const km = dias * 10
  const us = dias * 38
  const avance = us >= 1000 ? `${coma(us / 1000, 2, idioma)} ms` : `${us} µs`
  const desvio = Math.min(km, 300) * 1.3 // 300 km = 390 px

  let mensaje = t('Avec la correction d’Einstein, ton GPS tombe juste.', 'With Einstein’s correction, your GPS is spot on.')
  if (dias >= 1) {
    mensaje = t(
      `Sans correction depuis ${dias} jour${dias > 1 ? 's' : ''}, ton GPS se trompe d’environ ${km} km.`,
      `After ${dias} day${dias > 1 ? 's' : ''} without correction, your GPS is off by about ${km} km.`,
    )
  }
  if (dias === 1) mensaje += t(' La boulangerie est dans la ville d’à côté.', ' The bakery is in the next town over.')
  else if (dias >= 2 && dias < 10) mensaje += t(' Tes amis t’attendent toujours au cinéma.', ' Your friends are still waiting for you at the movies.')
  else if (dias >= 10) mensaje += t(' À ce stade, il te place carrément dans une autre région.', ' At this point, it puts you in a whole other region.')

  return (
    <Modulo
      titulo={t('Et si le GPS oubliait Einstein ?', 'What if GPS forgot about Einstein?')}
      mensaje={mensaje}
      lecturas={[
        [t('Avance des horloges du satellite', 'Satellite clocks running ahead by'), avance],
        [t('Erreur de position', 'Position error'), `≈ ${km} km`],
      ]}
      pie={t('Fig. 8 — Chaque jour sans correction, les horloges des satellites prennent environ 38 microsecondes d’avance, et la position dérive d’environ 10 km. Schéma.', 'Fig. 8 — Every day without correction, the satellites’ clocks gain about 38 microseconds, and the position drifts by about 10 km. Diagram.')}
    >
      <svg viewBox="0 0 640 220" className={s.lienzo} aria-hidden="true">
        {[40, 80, 120, 160, 200].map((y) => <line key={y} x1="0" y1={y} x2="640" y2={y} className={s.calle} />)}
        {[60, 140, 220, 300, 380, 460, 540, 620].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="220" className={s.calle} />)}
        {dias > 0 && <line x1="120" y1="120" x2={120 + desvio} y2="120" className={s.desvio} />}
        {dias > 0 && (
          <text x={120 + desvio / 2} y="108" textAnchor="middle" className={s.svgEtiqueta}>≈ {km} km</text>
        )}
        <g transform={`translate(${120 + desvio} 120)`} className={dias > 0 ? s.pinFantasma : s.pinOculto}>
          <path d="M0 0 C -12 -16 -12 -34 0 -34 C 12 -34 12 -16 0 0 Z" className={s.acentoLleno} />
          <text x="0" y="22" textAnchor="middle" className={s.svgEtiqueta}>{t('ton GPS', 'your GPS')}</text>
        </g>
        <g transform="translate(120 120)">
          <path d="M0 0 C -12 -16 -12 -34 0 -34 C 12 -34 12 -16 0 0 Z" className={s.tintaLlena} />
          <circle cx="0" cy="-23" r="4" style={{ fill: 'var(--papel-2)' }} />
          <text x="0" y="22" textAnchor="middle" className={s.svgEtiqueta}>{t('toi', 'you')}</text>
        </g>
      </svg>
      <label htmlFor="tiempo-gps" className={s.kicker}>{t('Jours sans correction :', 'Days without correction:')} {dias}</label>
      <input
        id="tiempo-gps"
        type="range"
        min="0"
        max="30"
        step="1"
        value={dias}
        aria-valuetext={t(`${dias} jours, erreur d’environ ${km} kilomètres`, `${dias} days, error of about ${km} kilometers`)}
        onChange={(e) => setDias(Number(e.target.value))}
        style={{ '--progreso': `${(dias / 30) * 100}%` }}
      />
    </Modulo>
  )
}

/* ---------- Esquema: todas las duraciones en una regla (figura de la plantilla, solo Immersif) ---------- */

const x = (anios) => 50 + (Math.log10(anios) + 5.5) * 56.25
const EJE_Y = 340

const graduaciones = [
  [1, ['1 an', '1 year']],
  [1e3, ['1 000 ans', '1,000 years']],
  [1e6, ['1 million d’années', '1 million years']],
  [1e9, ['1 milliard d’années', '1 billion years']],
]

// [años, fila (y), etiqueta [fr, en], valor [fr, en], lado del texto]
const duraciones = [
  [8.3 / (60 * 24 * 365.25), 88, ['Lumière du Soleil', 'Light from the Sun'], ['8 minutes de trajet', '8-minute trip'], 'derecha'],
  [5500, 280, ['Lumière de la Patte de Chat', 'Light from the Cat’s Paw'], ['partie il y a 5 500 ans', 'left 5,500 years ago'], 'izquierda'],
  [47e6, 184, ['Lumière de NGC 1068', 'Light from NGC 1068'], ['partie il y a 47 millions d’années', 'left 47 million years ago'], 'izquierda'],
  [230e6, 136, ['Une année cosmique', 'One cosmic year'], ['230 millions d’années', '230 million years'], 'izquierda'],
  [1e10, 88, ['Vie du Soleil', 'Life of the Sun'], ['10 milliards d’années', '10 billion years'], 'izquierda'],
  [13.8e9, 40, ['Âge de l’Univers', 'Age of the Universe'], ['13,8 milliards d’années', '13.8 billion years'], 'izquierda'],
]

export function EscalaTiempo() {
  const t = useT()
  const tramo = [x(1e6), x(1e7)]
  const medioTramo = (tramo[0] + tramo[1]) / 2
  const texto = (xi, y, etiqueta, valor, lado) => {
    const derecha = lado === 'derecha'
    const tx = derecha ? xi + 10 : xi - 10
    const anchor = derecha ? 'start' : 'end'
    return (
      <>
        <text x={tx} y={y} textAnchor={anchor} className={s.etiqueta}>{etiqueta}</text>
        <text x={tx} y={y + 19} textAnchor={anchor} className={s.valor}>{valor}</text>
      </>
    )
  }

  return (
    <svg viewBox="0 0 1000 390" role="img" aria-label={t('Échelle des durées de l’article, du plus court au plus long : 8 minutes pour la lumière du Soleil, 5 500 ans pour celle de la Patte de Chat, quelques millions d’années de vie pour une étoile massive, 47 millions d’années pour la lumière de NGC 1068, 230 millions d’années pour une année cosmique, 10 milliards d’années de vie pour le Soleil et 13,8 milliards d’années pour l’âge de l’Univers.', 'Scale of the spans of time in the article, from shortest to longest: 8 minutes for light from the Sun, 5,500 years for light from the Cat’s Paw, a few million years of life for a massive star, 47 million years for light from NGC 1068, 230 million years for one cosmic year, 10 billion years of life for the Sun and 13.8 billion years for the age of the Universe.')}>
      {graduaciones.map(([anios, nombre]) => (
        <g key={anios}>
          <line x1={x(anios)} y1={EJE_Y - 8} x2={x(anios)} y2={EJE_Y + 8} className={s.marca} />
          <text x={x(anios)} y={EJE_Y + 30} textAnchor="middle" className={s.graduacion}>{t(...nombre)}</text>
        </g>
      ))}
      <line x1="40" y1={EJE_Y} x2="960" y2={EJE_Y} className={s.eje} />
      <path d={`M952 ${EJE_Y - 6} L962 ${EJE_Y} L952 ${EJE_Y + 6}`} fill="none" className={s.eje} />

      <line x1={tramo[0]} y1={EJE_Y} x2={tramo[1]} y2={EJE_Y} className={s.tramo} />
      <line x1={medioTramo} y1={EJE_Y} x2={medioTramo} y2={232 - 14} className={s.guia} />
      {texto(medioTramo, 232, t('Vie d’une étoile massive', 'Life of a massive star'), t('quelques millions d’années', 'a few million years'), 'izquierda')}

      {duraciones.map(([anios, y, etiqueta, valor, lado]) => (
        <g key={anios}>
          <line x1={x(anios)} y1={EJE_Y} x2={x(anios)} y2={y - 14} className={s.guia} />
          <circle cx={x(anios)} cy={EJE_Y} r="5" className={s.punto} />
          {texto(x(anios), y, t(...etiqueta), t(...valor), lado)}
        </g>
      ))}
    </svg>
  )
}
