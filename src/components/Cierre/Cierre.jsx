// Cierre de artículo: banda oscura con una tarjeta clara (fuentes, compartir, autor) y los enlaces
// Précédent / Suivant en vertical a los lados. Esquinas casi rectas. Lo usan Articulo2 y Articulo3
// (este último a través de <Article variante="afilado">). Texto en francés o inglés según el selector (useT).
import { useState } from 'react'
import { useT } from '../Idioma/Idioma.jsx'
import styles from './Cierre.module.css'

const ICONOS = {
  facebook: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M14.5 8H13a2 2 0 0 0-2 2v11.5M8.5 13h5.5" />
    </>
  ),
  x: <path d="M5 5l14 14M19 5L5 19" />,
  mail: (
    <>
      <path d="M3 5.5h18v13H3z" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </>
  ),
  lien: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
}

function Icono({ nombre }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONOS[nombre]}
    </svg>
  )
}

function Compartir({ id, titulo }) {
  const [copiado, setCopiado] = useState(false)
  const tr = useT()
  const url = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}#${id}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(titulo)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2400)
    } catch {
      window.prompt(tr('Copiez ce lien :', 'Copy this link:'), url)
    }
  }

  return (
    <div className={styles.bloque}>
      <span className={styles.etiqueta}>{tr('Partager l’article', 'Share this article')}</span>
      <div className={styles.iconos}>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer" aria-label={tr('Partager sur Facebook (nouvel onglet)', 'Share on Facebook (new tab)')}><Icono nombre="facebook" /></a>
        <a href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noreferrer" aria-label={tr('Partager sur X (nouvel onglet)', 'Share on X (new tab)')}><Icono nombre="x" /></a>
        <a href={`mailto:?subject=${t}&body=${u}`} aria-label={tr('Partager par e-mail', 'Share by email')}><Icono nombre="mail" /></a>
        <button type="button" onClick={copiar} aria-label={tr('Copier le lien', 'Copy link')}><Icono nombre="lien" /></button>
        <span className={styles.aviso} role="status" aria-live="polite">{copiado ? tr('Lien copié', 'Link copied') : ''}</span>
      </div>
    </div>
  )
}

/**
 * props: id (ancla del artículo), titulo (para compartir), fuentes[] (texto o JSX), nota (línea pequeña bajo las fuentes),
 *  auteur, auteurBio, anterior { href, titulo }, siguiente { href, seccion, titulo }, acento { oscuro, papel }
 */
export default function Cierre({ id, titulo, fuentes = [], nota, auteur, auteurBio, anterior, siguiente, acento }) {
  const tr = useT()
  const vars = acento ? { '--acento': acento.oscuro, '--acento-papel': acento.papel } : undefined

  return (
    <footer className={styles.cierre} style={vars} aria-label={tr('Fin de l’article', 'End of article')}>
      <div className={styles.rejilla}>
        {anterior && (
          <a href={anterior.href} className={`${styles.lateral} ${styles.izq}`}>
            <span aria-hidden="true">←</span> {tr('Article précédent', 'Previous article')}
            <span className="sr-only"> : {anterior.titulo}</span>
          </a>
        )}

        <div className={styles.tarjeta}>
          <div className={styles.columna}>
            {fuentes.length > 0 && (
              <div className={styles.bloque}>
                <span className={styles.etiqueta}>{tr('Pour en savoir plus', 'Further reading')}</span>
                <ul className={styles.fuentes}>
                  {fuentes.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                {nota && <p className={styles.nota}>{nota}</p>}
              </div>
            )}
            <Compartir id={id} titulo={titulo} />
          </div>

          <div className={styles.columna}>
            <div className={styles.bloque}>
              <span className={styles.etiqueta}>{tr('À propos de l’auteur', 'About the author')}</span>
              <p className={styles.nombre}>{auteur}</p>
              <p className={styles.bio}>{auteurBio}</p>
            </div>
          </div>

          {siguiente && (
            <a href={siguiente.href} className={styles.suivant}>
              <span className={styles.suivantTexto}>
                <span className={styles.suivantEtiqueta}>{tr('À suivre', 'Up next')} · {siguiente.seccion}</span>
                <span className={styles.suivantTitulo}>{siguiente.titulo}</span>
              </span>
              <span className={styles.boton} aria-hidden="true">{tr('Lire →', 'Read →')}</span>
            </a>
          )}
        </div>

        {siguiente && (
          <a href={siguiente.href} className={`${styles.lateral} ${styles.der}`}>
            {tr('Article suivant', 'Next article')} <span aria-hidden="true">→</span>
            <span className="sr-only"> : {siguiente.titulo}</span>
          </a>
        )}
      </div>
    </footer>
  )
}
