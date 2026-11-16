// Portada — responsable: David407407
import fotoGrande from '../../assets/portada/cosmic-cliffs-2560.webp'
import fotoChica from '../../assets/portada/cosmic-cliffs-1080.webp'
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Portada.module.css'

export default function Portada() {
  const t = useT()
  return (
    <section id="portada" className={styles.portada} aria-labelledby="portada-titulo">
      <img
        className={styles.foto}
        src={fotoGrande}
        srcSet={`${fotoChica} 1080w, ${fotoGrande} 2560w`}
        sizes="100vw"
        alt={t('Les Falaises cosmiques de la nébuleuse de la Carène : des montagnes de gaz orangé sous un ciel bleu rempli d’étoiles.', 'The Cosmic Cliffs of the Carina Nebula: mountains of orange gas under a blue sky full of stars.')}
        fetchPriority="high"
      />

      <div className={styles.texto}>
        <p className={styles.numero}>{t('Nº 07 · Novembre 2026', 'No. 07 · November 2026')}</p>
        <h1 id="portada-titulo" className={styles.titulo}>
          {t('Éclairer la science ', 'Shedding light on the science ')}<em>{t('qu’on ne voit pas', 'we can’t see')}</em>
        </h1>
        <p className={styles.bajada}>
          {t(
            'Des trous noirs, des nuages où naissent les étoiles, des horloges qui retardent et un expert des fluides. Un numéro consacré à l’invisible.',
            'Black holes, clouds where stars are born, clocks that run slow and an expert on fluids. An issue devoted to the invisible.',
          )}
        </p>
      </div>

      <a href="#indice" className={styles.desliza}>
        <span>{t('Faites défiler pour lire', 'Scroll to read')}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <p className={styles.credito}>
        {t('Image : NASA, ESA, CSA, STScI · Télescope spatial James Webb', 'Image: NASA, ESA, CSA, STScI · James Webb Space Telescope')}
      </p>
    </section>
  )
}
