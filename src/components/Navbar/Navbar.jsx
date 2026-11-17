import { useEffect, useState } from 'react'
import Logo from '../Logo/Logo.jsx'
import { useIdioma, useT } from '../Idioma/Idioma.jsx'
import styles from './Navbar.module.css'

const secciones = [
  ['#agujeros-negros', 'Trous noirs', 'Black holes'],
  ['#nebulosas', 'Nébuleuses', 'Nebulae'],
  ['#tiempo', 'Temps', 'Time'],
  ['#entrevista', 'Entretien', 'Interview'],
  ['#indice', 'Thèmes', 'Topics'],
  ['#contraportada', 'Archives', 'Archives'],
]

// Botón FR / EN: cambia el idioma de toda la revista
function SelectorIdioma() {
  const { idioma, setIdioma } = useIdioma()
  const t = useT()
  return (
    <div role="group" aria-label={t('Langue', 'Language')} className={styles.idioma}>
      {[['fr', 'FR', 'Français'], ['en', 'EN', 'English']].map(([codigo, corto, largo]) => (
        <button key={codigo} type="button" lang={codigo} aria-pressed={idioma === codigo} aria-label={largo} onClick={() => setIdioma(codigo)}>
          {corto}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const t = useT()
  // Transparente mientras está sobre la foto de la portada
  const [sobreFoto, setSobreFoto] = useState(true)

  useEffect(() => {
    const revisar = () => setSobreFoto(window.scrollY < window.innerHeight * 0.85)
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    window.addEventListener('resize', revisar)
    return () => {
      window.removeEventListener('scroll', revisar)
      window.removeEventListener('resize', revisar)
    }
  }, [])

  const transparente = sobreFoto && !abierto

  return (
    <header className={`${styles.navbar} ${transparente ? styles.transparente : ''}`}>
      {/* Seis capas de desenfoque progresivo; el CSS le da a cada una su radio y su máscara */}
      <div className={styles.glass} aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className={styles.inner}>
        <Logo accent="var(--azul-palido)" />
        <span className={styles.divider} aria-hidden="true" />
        <nav id="menu-secciones" aria-label="Sections" className={`${styles.nav} ${abierto ? styles.open : ''}`}>
          {secciones.map(([href, fr, en]) => (
            <a key={href} href={href} onClick={() => setAbierto(false)}>{t(fr, en)}</a>
          ))}
        </nav>
        <SelectorIdioma />
        <button
          type="button"
          aria-label={abierto ? t('Fermer le menu', 'Close menu') : t('Ouvrir le menu', 'Open menu')}
          aria-expanded={abierto}
          aria-controls="menu-secciones"
          className={styles.menuButton}
          onClick={() => setAbierto(!abierto)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
    </header>
  )
}
