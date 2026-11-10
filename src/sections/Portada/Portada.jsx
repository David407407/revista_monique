// Portada — responsable: David407407
import fotoGrande from '../../assets/portada/cosmic-cliffs-2560.webp'
import fotoChica from '../../assets/portada/cosmic-cliffs-1080.webp'
import styles from './Portada.module.css'

export default function Portada() {
  return (
    <section id="portada" className={styles.portada} aria-labelledby="portada-titulo">
      <img
        className={styles.foto}
        src={fotoGrande}
        srcSet={`${fotoChica} 1080w, ${fotoGrande} 2560w`}
        sizes="100vw"
        alt="Les Falaises cosmiques de la nébuleuse de la Carène : des montagnes de gaz orangé sous un ciel bleu rempli d’étoiles."
        fetchPriority="high"
      />

      <div className={styles.texto}>
        <p className={styles.numero}>Nº 07 · Novembre 2026</p>
        <h1 id="portada-titulo" className={styles.titulo}>
          Éclairer la science <em>qu’on ne voit pas</em>
        </h1>
        <p className={styles.bajada}>
          Des trous noirs, des nuages où naissent les étoiles, des horloges qui
          retardent et un expert des fluides. Un numéro consacré à l’invisible.
        </p>
      </div>

      <a href="#indice" className={styles.desliza}>
        <span>Faites défiler pour lire</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <p className={styles.credito}>
        Image : NASA, ESA, CSA, STScI · Télescope spatial James Webb
      </p>
    </section>
  )
}
