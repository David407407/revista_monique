import { useEffect, useState } from 'react'
import Logo from '../Logo/Logo.jsx'
import styles from './Navbar.module.css'

const secciones = [
  ['#agujeros-negros', 'Trous noirs'],
  ['#nebulosas', 'Nébuleuses'],
  ['#tiempo', 'Temps'],
  ['#entrevista', 'Entretien'],
  ['#indice', 'Thèmes'],
  ['#contraportada', 'Archives'],
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
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
      <div className={styles.inner}>
        <Logo accent="var(--azul-palido)" />
        <span className={styles.divider} aria-hidden="true" />
        <nav id="menu-secciones" aria-label="Sections" className={`${styles.nav} ${abierto ? styles.open : ''}`}>
          {secciones.map(([href, nombre]) => (
            <a key={href} href={href} onClick={() => setAbierto(false)}>{nombre}</a>
          ))}
        </nav>
        <button
          type="button"
          aria-label={abierto ? 'Fermer le menu' : 'Ouvrir le menu'}
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
