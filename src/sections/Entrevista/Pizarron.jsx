// Retrato del doctor delante de un pizarrón lleno de ecuaciones de fluidos (escritas «con gis»).
// Las ecuaciones son reales y varias hacen eco de sus respuestas: continuidad (la regadera),
// esfuerzo cortante (qué es un fluido), Coriolis (Júpiter), Reynolds (la transición que nadie entiende).
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Pizarron.module.css'

// [ecuación, izquierda %, arriba %, giro en grados, tamaño, visible en celular]
const FORMULAS = [
  ['∂ρ/∂t + ∇·(ρu) = 0', 4, 7, -3, 'l', true],
  ['ρ (∂u/∂t + (u·∇)u) = −∇p + μ∇²u + f', 46, 5, 2, 'xl', false],
  ['Re = ρvL / μ', 6, 36, -6, 'xl', true],
  ['p + ½ρv² + ρgz = cte', 68, 30, 3, 'l', false],
  ['F = −2m Ω × v', 27, 20, 5, 's', false],
  ['τ = μ · du/dy', 5, 70, 4, 'l', true],
  ['Q = πR⁴Δp / 8μL', 24, 56, 3, 's', false],
  ['Re ≈ 2300 → ?', 66, 52, -3, 'm', false],
  ['ω = ∇ × u', 70, 68, -4, 'l', true],
  ['∇·u = 0', 38, 87, -2, 'm', false],
  ['A₁v₁ = A₂v₂', 60, 88, 2, 'm', true],
]

export default function Pizarron({ nombre, titulo, retrato }) {
  const t = useT()
  return (
    <figure className={styles.pizarron}>
      <div className={styles.formulas} aria-hidden="true">
        {FORMULAS.map(([f, x, y, giro, tam, movil]) => (
          <span
            key={f}
            className={`${styles.formula} ${styles[tam]} ${movil ? '' : styles.soloAncho}`}
            style={{ left: `${x}%`, top: `${y}%`, rotate: `${giro}deg` }}
          >
            {f}
          </span>
        ))}
      </div>

      <div className={styles.centro}>
        {retrato ? (
          <img className={styles.foto} src={retrato.src} srcSet={retrato.srcSet} width={retrato.width} height={retrato.height} sizes="(max-width: 760px) 80vw, 460px" alt={retrato.alt} loading="lazy" decoding="async" />
        ) : (
          import.meta.env.DEV && (
            // Solo en desarrollo: marca dónde irá la foto. En la versión publicada no se ve.
            <div className={styles.hueco}>{t('Photo de', 'Photo of')} {nombre}</div>
          )
        )}
        <figcaption className={styles.pie}>
          <span className={styles.nombre}>{nombre}</span>
          <span className={styles.titulo}>{titulo}</span>
          {retrato?.credito && <span className={styles.credito}>{t('Photo :', 'Photo:')} {retrato.credito}</span>}
        </figcaption>
      </div>
    </figure>
  )
}
