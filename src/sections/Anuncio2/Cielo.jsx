// Cielo de fondo del anuncio, al estilo de Stellarium Web: mirando al norte, con horizonte,
// puntos cardinales, líneas y nombres de constelaciones. Las posiciones son reales
// (ascensión recta en horas, declinación en grados) proyectadas alrededor del polo norte.
import { useMemo } from 'react'
import styles from './Anuncio2.module.css'

// [nombre, AR (h), Dec (°), magnitud]
const ESTRELLAS = {
  polaire: [2.53, 90, 2.0], // en el polo para el dibujo (de verdad está a 0,7°)
  // Grande Ourse
  dubhe: [11.06, 61.75, 1.8],
  merak: [11.03, 56.38, 2.4],
  phecda: [11.9, 53.69, 2.4],
  megrez: [12.26, 57.03, 3.3],
  alioth: [12.9, 55.96, 1.8],
  mizar: [13.4, 54.93, 2.2],
  alkaid: [13.79, 49.31, 1.9],
  // Petite Ourse
  yildun: [17.54, 86.59, 4.4],
  epsUmi: [16.77, 82.04, 4.2],
  zetaUmi: [15.73, 77.79, 4.3],
  kochab: [14.85, 74.16, 2.1],
  pherkad: [15.35, 71.83, 3.0],
  etaUmi: [16.29, 75.76, 5.0],
  // Cassiopée
  caph: [0.15, 59.15, 2.3],
  schedar: [0.68, 56.54, 2.2],
  gammaCas: [0.95, 60.72, 2.4],
  ruchbah: [1.43, 60.24, 2.7],
  segin: [1.91, 63.67, 3.4],
  // Estrellas brillantes con nombre
  capella: [5.28, 46.0, 0.1],
  vega: [18.62, 38.78, 0.0],
  deneb: [20.69, 45.28, 1.3],
}

const LINEAS = [
  ['dubhe', 'merak', 'phecda', 'megrez', 'dubhe', 'megrez', 'alioth', 'mizar', 'alkaid'],
  ['polaire', 'yildun', 'epsUmi', 'zetaUmi', 'kochab', 'pherkad', 'etaUmi', 'zetaUmi'],
  ['caph', 'schedar', 'gammaCas', 'ruchbah', 'segin'],
]

// Nombres que se quedan derechos mientras el cielo gira: [texto, estrellas de referencia, desplazamiento px, tipo]
const NOMBRES = [
  ['Grande Ourse', ['megrez', 'phecda', 'alioth'], [0, 34], 'constelacion'],
  ['Petite Ourse', ['kochab', 'zetaUmi', 'pherkad'], [0, 30], 'constelacion'],
  ['Cassiopée', ['schedar', 'gammaCas', 'ruchbah'], [0, -26], 'constelacion'],
  ['Capella', ['capella'], [10, -10], 'estrella'],
  ['Véga', ['vega'], [10, -10], 'estrella'],
  ['Deneb', ['deneb'], [10, -10], 'estrella'],
]

const rad = Math.PI / 180

// Coordenadas en grados alrededor del polo, con el norte celeste arriba.
// Mirando al norte, la ascensión recta crece en el sentido de las agujas del reloj.
function proyectar([ar, dec], lst) {
  const d = 90 - dec
  const a = (ar - lst) * 15 * rad
  return [d * Math.sin(a), -d * Math.cos(a)]
}

// Posición en pantalla de un nombre tras girar el cielo `grados`
export function posicionEtiqueta({ x, y, dx, dy }, grados, { px, py, escala }) {
  const c = Math.cos(grados * rad)
  const s = Math.sin(grados * rad)
  const gx = +x * c - +y * s
  const gy = +x * s + +y * c
  return { x: (px + gx * escala + +dx).toFixed(1), y: (py + gy * escala + +dy).toFixed(1) }
}

// Estrellas de fondo con semilla fija, en grados alrededor del polo
const FONDO = (() => {
  let semilla = 11
  const azar = () => {
    semilla = (semilla * 16807) % 2147483647
    return semilla / 2147483647
  }
  const lista = []
  for (let i = 0; i < 900; i++) {
    const d = 130 * Math.sqrt(azar())
    const a = azar() * 2 * Math.PI
    const brillo = azar() ** 3
    lista.push({ x: d * Math.cos(a), y: d * Math.sin(a), r: 0.5 + brillo * 1.3, o: 0.35 + brillo * 0.6, t: azar() < 0.22, retraso: azar() * 7 })
  }
  return lista
})()

const radio = (mag) => Math.max(1.6, 4.2 - mag * 0.8)

// Silueta de colinas bajas sobre el horizonte, hasta el fondo de la hoja
function suelo(w, h, horizonte) {
  const puntos = []
  for (let x = 0; x <= w + 24; x += 24) {
    const y = horizonte - 6 + Math.sin(x * 0.006 + 1.3) * 7 + Math.sin(x * 0.017) * 3 + Math.sin(x * 0.0021 + 4) * 9
    puntos.push(`${x},${y.toFixed(1)}`)
  }
  return `M0,${h} L${puntos.join(' L')} L${w + 24},${h} Z`
}

export function Cielo({ medidas, lst, giro, etiquetas }) {
  const { w, h, px, py, horizonte, escala } = medidas

  const cielo = useMemo(() => {
    const pos = Object.fromEntries(Object.entries(ESTRELLAS).map(([k, [ar, dec, mag]]) => [k, { p: proyectar([ar, dec], lst), mag }]))
    const alcance = Math.max(Math.hypot(px, py), Math.hypot(w - px, py), Math.hypot(px, h - py), Math.hypot(w - px, h - py)) / escala + 2
    const nombres = NOMBRES.map(([texto, refs, [dx, dy], tipo]) => {
      const x = refs.reduce((s, k) => s + pos[k].p[0], 0) / refs.length
      const y = refs.reduce((s, k) => s + pos[k].p[1], 0) / refs.length
      return { texto, x, y, dx, dy, tipo }
    })
    return { pos, alcance, nombres }
  }, [lst, w, h, px, py, escala])

  const { pos, alcance, nombres } = cielo
  const e = (k) => [pos[k].p[0] * escala, pos[k].p[1] * escala]

  return (
    <svg className={styles.cielo} width={w} height={h} aria-hidden="true">
      <defs>
        <linearGradient id="anuncio2-resplandor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.resplandor0} />
          <stop offset="1" className={styles.resplandor1} />
        </linearGradient>
      </defs>
      <rect x="0" y={horizonte * 0.45} width={w} height={horizonte * 0.55 + 4} fill="url(#anuncio2-resplandor)" />

      <g transform={`translate(${px} ${py})`}>
        <g ref={giro}>
          {FONDO.filter((s) => Math.hypot(s.x, s.y) < alcance).map((s, i) => (
            <circle
              key={i}
              cx={(s.x * escala).toFixed(1)}
              cy={(s.y * escala).toFixed(1)}
              r={s.r}
              opacity={s.o}
              className={s.t ? styles.titila : styles.estrella}
              style={s.t ? { animationDelay: `${s.retraso}s` } : undefined}
            />
          ))}
          {LINEAS.map((trazo) => (
            <polyline key={trazo[0]} points={trazo.map((k) => e(k).join(',')).join(' ')} className={styles.linea} />
          ))}
          {Object.keys(ESTRELLAS)
            .filter((k) => k !== 'polaire')
            .map((k) => {
              const [x, y] = e(k)
              return <circle key={k} cx={x} cy={y} r={radio(pos[k].mag)} className={styles.brillante} />
            })}
        </g>

        {/* La Estrella Polar casi no se mueve: está a menos de un grado del polo */}
        <g transform={`translate(${e('polaire').join(' ')})`}>
          <circle r={radio(2)} className={styles.polar} />
          <path d="M-13,-6 A14,14 0 0 1 -6,-13 M6,-13 A14,14 0 0 1 13,-6 M13,6 A14,14 0 0 1 6,13 M-6,13 A14,14 0 0 1 -13,6" className={styles.reticula} />
          <text x="22" y="-3" className={styles.nombrePolar}>Étoile polaire</text>
          <text x="22" y="15" className={styles.notaPolar}>tout tourne autour d’elle</text>
        </g>
      </g>

      {nombres.map((n, i) => (
        <text
          key={n.texto}
          ref={(el) => { etiquetas.current[i] = el }}
          data-x={n.x}
          data-y={n.y}
          data-dx={n.dx}
          data-dy={n.dy}
          textAnchor={n.tipo === 'constelacion' ? 'middle' : 'start'}
          className={n.tipo === 'constelacion' ? styles.constelacion : styles.nombreEstrella}
          {...posicionEtiqueta({ x: n.x, y: n.y, dx: n.dx, dy: n.dy }, 0, medidas)}
        >
          {n.texto}
        </text>
      ))}

      <path d={suelo(w, h, horizonte)} className={styles.suelo} />
      {[['NO', -45], ['N', 0], ['NE', 45]].map(([letra, az]) => (
        <text key={letra} x={px + az * escala} y={horizonte - 18} textAnchor="middle" className={styles.cardinal}>
          {letra}
        </text>
      ))}
    </svg>
  )
}
