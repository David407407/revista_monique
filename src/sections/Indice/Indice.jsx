// Índice — responsable: David407407
import styles from './Indice.module.css'

// Títulos y tiempos de lectura provisionales: cada responsable los ajusta al escribir su pieza.
const piezas = [
  { href: '#agujeros-negros', n: '01', min: '[X]', seccion: 'Trous noirs', titulo: 'Ce que contient un trou noir', acento: 'var(--biolum)' },
  { href: '#nebulosas', n: '02', min: '[X]', seccion: 'Nébuleuses', titulo: 'Là où naissent les étoiles', acento: 'var(--plasma)' },
  { href: '#tiempo', n: '03', min: '[X]', seccion: 'Temps', titulo: 'L’horloge qui retarde', acento: 'var(--biolum)' },
  { href: '#entrevista', n: '04', min: '[X]', seccion: 'Entretien', titulo: '[NOM DU DOCTEUR] et les fluides de l’univers', acento: 'var(--nebulosa)' },
]

export default function Indice() {
  return (
    <section id="indice" className={styles.indice} aria-labelledby="indice-titulo">
      <div className={styles.inner}>
        <h2 id="indice-titulo" className={styles.titulo}>Dans ce numéro</h2>
        <nav aria-label="Dans ce numéro" className={styles.lista}>
          {piezas.map((p) => (
            <a key={p.href} href={p.href} className={styles.pieza} style={{ '--acento': p.acento }}>
              <span className={styles.meta}>{p.n} · {p.min} min</span>
              <span className={styles.seccion}>{p.seccion}</span>
              <span className={styles.piezaTitulo}>{p.titulo}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
