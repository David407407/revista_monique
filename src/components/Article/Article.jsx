// Plantilla compartida de artículo (anatomía del diseño). La usan Articulo1, Articulo2 y Articulo3.
// Todo el texto visible va en francés.
import { useState } from 'react'
import { LogoMark } from '../Logo/Logo.jsx'
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
  const url = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}#${id}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(titulo)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2400)
    } catch {
      window.prompt('Copiez ce lien :', url)
    }
  }

  return (
    <div className={styles.partager}>
      <span className={styles.etiqueta}>Partager</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer">Facebook</a>
      <a href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noreferrer">X</a>
      <a href={`mailto:?subject=${t}&body=${u}`}>E-mail</a>
      <button type="button" onClick={copiar} aria-live="polite">
        {copiado ? 'Lien copié' : 'Copier le lien'}
      </button>
    </div>
  )
}

/**
 * props:
 *  id, numero ("03 / 09"), seccion, acento ({ oscuro, papel }), titulo (texto plano para compartir),
 *  tituloJsx, auteur, auteurBio, date, lecture, tags[], hero { src, srcSet, alt, credito, posicion },
 *  cuerpo (antes de la cita), notas[], cita { texto, autor }, figura { svg, pie }, cuerpoFinal,
 *  sources[], anterior { href, titulo }, siguiente { href, seccion, titulo }
 */
export default function Article(props) {
  const { id, numero, seccion, acento, titulo, tituloJsx, auteur, auteurBio, date, lecture, tags = [], hero, cuerpo, notas = [], cita, figura, cuerpoFinal, sources = [], anterior, siguiente } = props
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
    <article id={id} className={styles.article} style={{ '--acento': acento.oscuro, '--acento-papel': acento.papel }} aria-labelledby={`${id}-titre`} data-modo={modo}>
      {anterior && <a href={anterior.href} className={`${styles.borde} ${styles.bordeIzq}`}>← Précédent</a>}
      {siguiente && <a href={siguiente.href} className={`${styles.borde} ${styles.bordeDer}`}>Article suivant →</a>}

      <header className={styles.cabecera}>
        <div className={styles.cabeceraIzq}>
          <span className={styles.numero}>{numero}</span>
          <span className={styles.seccion}>{seccion}</span>
        </div>
        <span className={styles.marca} aria-hidden="true"><LogoMark size={30} accent="var(--acento-papel)" /></span>
        <div className={styles.cabeceraDer}>
          <div role="group" aria-label="Mode de lecture" className={styles.modo}>
            <button type="button" aria-pressed={immersif} onClick={() => cambiarModo('immersif')}>Immersif</button>
            <button type="button" aria-pressed={!immersif} onClick={() => cambiarModo('simple')}>Simple</button>
          </div>
          <a href="#indice" className={styles.sommaire}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" /></svg>
            Sommaire
          </a>
        </div>
      </header>

      {immersif ? (
        <div className={styles.hero}>
          <img src={hero.src} srcSet={hero.srcSet} sizes="(max-width: 640px) 100vw, 1360px" alt={hero.alt} loading="lazy" style={{ objectPosition: hero.posicion || 'center' }} />
          <div className={styles.heroTexto}>
            <h1 id={`${id}-titre`} className={styles.titulo}>{tituloJsx}</h1>
            <span className={styles.firma}>Écrit par {auteur} · {date}</span>
          </div>
          <span className={styles.credito}>{hero.credito}</span>
        </div>
      ) : (
        <div className={styles.simpleCabecera}>
          <h1 id={`${id}-titre`} className={`${styles.titulo} ${styles.tituloSimple}`}>{tituloJsx}</h1>
          <span className={styles.firma}>Écrit par {auteur} · {date}</span>
        </div>
      )}

      <div className={styles.rejilla}>
        <aside className={styles.metadatos} aria-label="Informations">
          <span className={styles.mono}>
            LECTURE · {lecture}
            <br />
            SECTION · {seccion.toUpperCase()}
            <br />
            Nº 07 · NOV. 2026
          </span>
          <div className={styles.tags}>
            {tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </aside>
        <div className={styles.cuerpo}>{cuerpo}</div>
        <aside className={styles.notas} aria-label="Notes en marge">
          <span className={styles.etiqueta}>Notes en marge</span>
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

          {sources.length > 0 && (
            <div className={styles.saberMas}>
              <span className={styles.etiquetaAcento}>Pour en savoir plus</span>
              <ul>
                {sources.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          <Partager id={id} titulo={titulo} />

          <div className={styles.autor}>
            <span className={styles.avatar} aria-hidden="true">{iniciales(auteur)}</span>
            <div>
              <span className={styles.etiqueta}>Écrit par</span>
              <span className={styles.autorNombre}>{auteur}</span>
              <p>{auteurBio}</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={styles.huecoDer} />
      </div>

      <nav aria-label="Navigation entre les articles" className={styles.prevNext}>
        {anterior && (
          <a href={anterior.href} className={styles.prev}>
            <span className={styles.etiqueta}>← Précédent</span>
            <span className={styles.prevTitulo}>{anterior.titulo}</span>
          </a>
        )}
        {siguiente && (
          <a href={siguiente.href} className={styles.next}>
            <span>
              <span className={styles.etiqueta}>Article suivant · {siguiente.seccion}</span>
              <span className={styles.prevTitulo}>{siguiente.titulo}</span>
            </span>
            <Flecha />
          </a>
        )}
      </nav>
    </article>
  )
}
