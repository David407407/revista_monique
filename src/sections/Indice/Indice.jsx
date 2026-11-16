// Índice — responsable: David407407
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Indice.module.css'

// Títulos y tiempos de lectura provisionales: cada responsable los ajusta al escribir su pieza.
const piezas = [
  { href: '#agujeros-negros', n: '01', min: '7', seccion: ['Trous noirs', 'Black holes'], titulo: ['Aller simple pour un trou noir', 'One-way ticket to a black hole'], acento: 'var(--biolum)' },
  { href: '#nebulosas', n: '02', min: '[X]', seccion: ['Nébuleuses', 'Nebulae'], titulo: ['Là où naissent les étoiles', 'Where stars are born'], acento: 'var(--plasma)' },
  { href: '#tiempo', n: '03', min: '8', seccion: ['Temps', 'Time'], titulo: ['Le temps dans le cosmos', 'Time in the cosmos'], acento: 'var(--biolum)' },
  { href: '#entrevista', n: '04', min: '[X]', seccion: ['Entretien', 'Interview'], titulo: ['[NOM DU DOCTEUR] et les fluides de l’univers', '[DOCTOR’S NAME] and the fluids of the universe'], acento: 'var(--nebulosa)' },
]

export default function Indice() {
  const t = useT()
  return (
    <section id="indice" className={styles.indice} aria-labelledby="indice-titulo">
      <div className={styles.inner}>
        <h2 id="indice-titulo" className={styles.titulo}>{t('Dans ce numéro', 'In this issue')}</h2>
        <nav aria-label={t('Dans ce numéro', 'In this issue')} className={styles.lista}>
          {piezas.map((p) => (
            <a key={p.href} href={p.href} className={styles.pieza} style={{ '--acento': p.acento }}>
              <span className={styles.meta}>{p.n} · {p.min} min</span>
              <span className={styles.seccion}>{t(...p.seccion)}</span>
              <span className={styles.piezaTitulo}>{t(...p.titulo)}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
