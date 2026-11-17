// Plantilla compartida de artículo (anatomía del diseño). La usan Articulo1, Articulo2 y Articulo3.
// Texto visible en francés o inglés según el selector de idioma (useT).
import { useState } from 'react'
import { LogoMark } from '../Logo/Logo.jsx'
import Cierre from '../Cierre/Cierre.jsx'
import { useT } from '../Idioma/Idioma.jsx'
import styles from './Article.module.css'

const CLAVE_MODO = 'pbp-modo-lectura'

function leerModo() {
  try {
    return localStorage.getItem(CLAVE_MODO) === 'simple' ? 'simple' : 'immersif'
  } catch {
    return 'immersif'
  }
}

function Flecha({ izquierda }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={izquierda ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function iniciales(nombre) {
  if (nombre.startsWith('[')) return 'PBP'
  return nombre.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

function Partager({ id, titulo }) {
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
    <div className={styles.partager}>
      <span className={styles.etiqueta}>{tr('Partager', 'Share')}</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer">Facebook</a>
      <a href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noreferrer">X</a>
      <a href={`mailto:?subject=${t}&body=${u}`}>{tr('E-mail', 'Email')}</a>
      <button type="button" onClick={copiar} aria-live="polite">
        {copiado ? tr('Lien copié', 'Link copied') : tr('Copier le lien', 'Copy link')}
      </button>
    </div>
  )
}

/**
 * props:
 *  id, numero ("03 / 09"), seccion, acento ({ oscuro, papel, titulo? }: titulo = color opcional del título sobre la foto), titulo (texto plano para compartir),
 *  tituloJsx, auteur, auteurBio, date, lecture, tags[], hero { src, srcSet, alt, credito, posicion },
 *  cuerpo (antes de la cita), notas[], cita { texto, autor }, figura { svg, pie }, cuerpoFinal,
 *  sources[], anterior { href, titulo }, siguiente { href, seccion, titulo },
 *  variante: 'afilado' (opcional) = esquinas casi rectas y cierre con la tarjeta <Cierre>. Sin ella, todo queda igual.
 */
export default function Article(props) {
  const { id, numero, seccion, acento, titulo, tituloJsx, auteur, auteurBio, date, lecture, tags = [], hero, cuerpo, notas = [], cita, figura, cuerpoFinal, sources = [], anterior, siguiente, variante } = props
  const afilado = variante === 'afilado'
  const tr = useT()
  const [modo, setModo] = useState(leerModo)
  const immersif = modo === 'immersif'

  const cambiarModo = (nuevo) => {
    setModo(nuevo)
    try {
      localStorage.setItem(CLAVE_MODO, nuevo)
    } catch {
      // sin almacenamiento: el modo solo dura esta visita
    }
  }

  return (
    <article id={id} className={`${styles.article} ${afilado ? styles.afilado : ''}`} style={{ '--acento': acento.oscuro, '--acento-papel': acento.papel, '--acento-titulo': acento.titulo }} aria-labelledby={`${id}-titre`} data-modo={modo}>
      {anterior && <a href={anterior.href} className={`${styles.borde} ${styles.bordeIzq}`}>{tr('← Précédent', '← Previous')}</a>}
      {siguiente && <a href={siguiente.href} className={`${styles.borde} ${styles.bordeDer}`}>{tr('Article suivant →', 'Next article →')}</a>}

      <header className={styles.cabecera}>
        <div className={styles.cabeceraIzq}>
          <span className={styles.numero}>{numero}</span>
          <span className={styles.seccion}>{seccion}</span>
        </div>
        {!afilado && <span className={styles.marca} aria-hidden="true"><LogoMark size={30} accent="var(--acento-papel)" /></span>}
        <div className={styles.cabeceraDer}>
          <div role="group" aria-label={tr('Mode de lecture', 'Reading mode')} className={styles.modo}>
            <button type="button" aria-pressed={immersif} onClick={() => cambiarModo('immersif')}>{tr('Immersif', 'Immersive')}</button>
            <button type="button" aria-pressed={!immersif} onClick={() => cambiarModo('simple')}>Simple</button>
          </div>
          <a href="#indice" className={styles.sommaire}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" /></svg>
            {tr('Sommaire', 'Contents')}
          </a>
        </div>
      </header>

      {immersif ? (
        <div className={styles.hero}>
          <img src={hero.src} srcSet={hero.srcSet} sizes={afilado ? '100vw' : '(max-width: 640px) 100vw, 1360px'} alt={hero.alt} loading="lazy" style={{ objectPosition: hero.posicion || 'center' }} />
          <div className={styles.heroTexto}>
            <h1 id={`${id}-titre`} className={styles.titulo}>{tituloJsx}</h1>
            <span className={styles.firma}>{tr('Écrit par', 'Written by')} {auteur} · {date}</span>
          </div>
          <span className={styles.credito}>{hero.credito}</span>
        </div>
      ) : (
        <div className={styles.simpleCabecera}>
          <h1 id={`${id}-titre`} className={`${styles.titulo} ${styles.tituloSimple}`}>{tituloJsx}</h1>
          <span className={styles.firma}>{tr('Écrit par', 'Written by')} {auteur} · {date}</span>
        </div>
      )}

      <div className={styles.rejilla}>
        <aside className={styles.metadatos} aria-label={tr('Informations', 'Article details')}>
          <span className={styles.mono}>
            {tr('LECTURE', 'READING TIME')} · {lecture}
            <br />
            SECTION · {seccion.toUpperCase()}
            <br />
            {tr('Nº 07', 'No. 07')} · NOV. 2026
          </span>
          <div className={styles.tags}>
            {tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </aside>
        <div className={styles.cuerpo}>{cuerpo}</div>
        <aside className={styles.notas} aria-label={tr('Notes en marge', 'Margin notes')}>
          <span className={styles.etiqueta}>{tr('Notes en marge', 'Margin notes')}</span>
          {notas.map((n, i) => (
            <div key={i} className={styles.nota}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{n}</p>
            </div>
          ))}
        </aside>
      </div>

      {immersif && cita && (
        <blockquote className={styles.cita}>
          <span aria-hidden="true" className={styles.comilla}>“</span>
          <p>{cita.texto}</p>
          <footer>— {cita.autor}</footer>
        </blockquote>
      )}

      {immersif && figura && (
        <figure className={styles.figura}>
          <div className={styles.figuraFondo}>{figura.svg}</div>
          <figcaption>{figura.pie}</figcaption>
        </figure>
      )}

      <div className={styles.rejilla}>
        <div aria-hidden="true" className={styles.hueco} />
        <div className={styles.cuerpo}>
          {cuerpoFinal}

          {!afilado && (
            <>
              {sources.length > 0 && (
                <div className={styles.saberMas}>
                  <span className={styles.etiquetaAcento}>{tr('Pour en savoir plus', 'Further reading')}</span>
                  <ul>
                    {sources.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              <Partager id={id} titulo={titulo} />

              <div className={styles.autor}>
                <span className={styles.avatar} aria-hidden="true">{iniciales(auteur)}</span>
                <div>
                  <span className={styles.etiqueta}>{tr('Écrit par', 'Written by')}</span>
                  <span className={styles.autorNombre}>{auteur}</span>
                  <p>{auteurBio}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div aria-hidden="true" className={styles.huecoDer} />
      </div>

      {afilado ? (
        <Cierre id={id} titulo={titulo} fuentes={sources} auteur={auteur} auteurBio={auteurBio} anterior={anterior} siguiente={siguiente} />
      ) : (
      <nav aria-label={tr('Navigation entre les articles', 'Article navigation')} className={styles.prevNext}>
        {anterior && (
          <a href={anterior.href} className={styles.prev}>
            <span className={styles.etiqueta}>{tr('← Précédent', '← Previous')}</span>
            <span className={styles.prevTitulo}>{anterior.titulo}</span>
          </a>
        )}
        {siguiente && (
          <a href={siguiente.href} className={styles.next}>
            <span>
              <span className={styles.etiqueta}>{tr('Article suivant', 'Next article')} · {siguiente.seccion}</span>
              <span className={styles.prevTitulo}>{siguiente.titulo}</span>
            </span>
            <Flecha />
          </a>
        )}
      </nav>
      )}
    </article>
  )
}
