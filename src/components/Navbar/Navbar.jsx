import { useEffect, useRef, useState } from 'react'
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

// Navbar de cristal (transparente con desenfoque, estilo Apple).
// Se esconde al bajar y vuelve a aparecer al subir; arriba del todo siempre se ve.
export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [oculto, setOculto] = useState(false)
  const ultimoY = useRef(0)

  useEffect(() => {
    // Barato: solo compara posiciones; React ignora setOculto con el mismo valor
    const revisar = () => {
      const y = window.scrollY
      const delta = y - ultimoY.current
      if (y < 80) setOculto(false)
      else if (delta > 6) setOculto(true)
      else if (delta < -6) setOculto(false)
      if (Math.abs(delta) > 6 || y < 80) ultimoY.current = y
    }
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [])

  const escondido = oculto && !abierto

  return (
    <header
      className={`${styles.navbar} ${escondido ? styles.oculto : ''}`}
      onFocus={() => setOculto(false)}
    >
      {/* Desenfoque progresivo (como iOS): 7 capas de blur creciente, cada una en su franja */}
      <div className={styles.cristal} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <span key={i} />)}
      </div>
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
