import { useState } from 'react'
import styles from './Articulo2.module.css'

function copiarConTextarea(valor) {
  const campo = document.createElement('textarea')
  campo.value = valor
  campo.setAttribute('readonly', '')
  campo.style.position = 'fixed'
  campo.style.opacity = '0'
  document.body.appendChild(campo)
  campo.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  campo.remove()
  return ok
}

// Fila «Partager». Los enlaces apuntan a esta sección (#nebulosas).
export default function Partager({ t, ancla }) {
  const [aviso, setAviso] = useState('')
  const url = `${window.location.origin}${window.location.pathname}#${ancla}`
  const u = encodeURIComponent(url)
  const asunto = encodeURIComponent(t.asunto)

  const enlaces = [
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['X', `https://x.com/intent/post?url=${u}&text=${asunto}`],
    ['E-mail', `mailto:?subject=${asunto}&body=${u}`],
  ]

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url)
      setAviso(t.copiado)
    } catch {
      // Respaldo para navegadores que bloquean la API del portapapeles
      setAviso(copiarConTextarea(url) ? t.copiado : t.error)
    }
  }

  return (
    <div className={styles.partager}>
      <span className={styles.partagerTitulo}>{t.titulo}</span>
      {enlaces.map(([nombre, href]) => (
        <a
          key={nombre}
          href={href}
          className={styles.pildora}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {nombre}
        </a>
      ))}
      <button type="button" className={styles.pildora} onClick={copiar}>
        {t.copiar}
      </button>
      <span role="status" aria-live="polite" className={styles.aviso}>
        {aviso}
      </span>
    </div>
  )
}
