import styles from './Logo.module.css'

// Punto azul pálido con anillo orbital. `accent` colorea el anillo y "pâle revue".
export function LogoMark({ size = 36, accent = 'var(--biolum)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <ellipse cx="18" cy="18" rx="16" ry="7" transform="rotate(-24 18 18)" stroke={accent} strokeWidth="1" strokeDasharray="1.5 3" />
      <circle cx="18" cy="18" r="5.5" fill="var(--azul-palido)" />
      <circle cx="4.5" cy="23" r="1.6" fill="var(--papel)" />
      <circle cx="31" cy="12.5" r="1.8" fill="var(--papel)" />
      <circle cx="9" cy="7" r="1.1" fill="var(--papel)" opacity="0.7" />
      <circle cx="28" cy="29" r="1.1" fill="var(--papel)" opacity="0.7" />
    </svg>
  )
}

export default function Logo({ accent = 'var(--biolum)', large = false, label = 'Point Bleu Pâle, aller à la couverture' }) {
  return (
    <a href="#portada" aria-label={label} className={`${styles.logo} ${large ? styles.large : ''}`} style={{ '--accent': accent }}>
      <LogoMark size={large ? 40 : 36} accent={accent} />
      <span className={styles.point}>point bleu</span>
      <span className={styles.pale}>pâle</span>
      <span className={styles.revue}>revue</span>
    </a>
  )
}
