// Nebulosas — responsable: compañero
// Artículo 2 en francés: «Les piliers de la création». Dos modos de lectura: Immersif (hero a pantalla
// completa + módulos interactivos + cita) y Simple (texto íntegro + versiones estáticas de M1, M2 y M3).
// La hoja de esta sección va sin bordes (bleed).
import { useEffect, useRef, useState } from 'react'
import img1000 from '../../assets/nebulosas/piliers-de-la-creation-1000.webp'
import img1600 from '../../assets/nebulosas/piliers-de-la-creation-1600.webp'
import img2560 from '../../assets/nebulosas/piliers-de-la-creation-2560.webp'
import { texto as t } from './contenido.js'
import ExplorateurImage from './ExplorateurImage.jsx'
import Partager from './Partager.jsx'
import Rico from './Rico.jsx'
import { NBSP } from './typo.js'
import useHojaApilada from './useHojaApilada.js'
import Chiffres from './modulos/Chiffres.jsx'
import { ListaMachine, TablaEchelle, TablaPalette } from './modulos/Estaticos.jsx'
import ModuloEchelle from './modulos/ModuloEchelle.jsx'
import ModuloMachine from './modulos/ModuloMachine.jsx'
import ModuloPalette from './modulos/ModuloPalette.jsx'
import ModuloQuiz from './modulos/ModuloQuiz.jsx'
import ModuloSonido from './modulos/ModuloSonido.jsx'
import styles from './Articulo2.module.css'

const imagen = {
  src: img1600,
  srcSet: `${img1000} 1000w, ${img1600} 1600w, ${img2560} 2560w`,
  width: 2560,
  height: 1617,
}

const CLAVE_MODO = 'pbp:nebulosas:modo'

function leerModo(inicial) {
  try {
    const guardado = window.localStorage.getItem(CLAVE_MODO)
    if (guardado === 'immersif' || guardado === 'simple') return guardado
  } catch {
    // localStorage bloqueado (modo privado): se usa el modo inicial
  }
  return inicial
}

// Mismo dibujo que LogoMark (rama portada-contraportada). Cambiar por ese componente cuando se una a main.
function Emblema() {
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <ellipse cx="18" cy="18" rx="16" ry="7" transform="rotate(-24 18 18)" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 3" />
      <circle cx="18" cy="18" r="5.5" fill="var(--azul-palido)" />
      <circle cx="4.5" cy="23" r="1.6" fill="currentColor" />
      <circle cx="31" cy="12.5" r="1.8" fill="currentColor" />
      <circle cx="9" cy="7" r="1.1" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="29" r="1.1" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function BarraSuperior({ modo, setModo }) {
  return (
    <header className={`${styles.barra} ${modo === 'immersif' ? styles.barraSobreHero : ''}`}>
      <div className={styles.barraInner}>
        <p className={styles.barraIzq}>
          <span className={styles.numero}>{t.numero}</span>
          <span className={styles.rubrique}>{t.rubrique}</span>
        </p>
        <span className={styles.emblema} role="img" aria-label={t.emblema}>
          <Emblema />
        </span>
        <div className={styles.barraDer}>
          <div role="group" aria-label={t.modo.grupo} className={styles.toggle}>
            {['immersif', 'simple'].map((m) => (
              <button key={m} type="button" aria-pressed={modo === m} onClick={() => setModo(m)}>
                {t.modo[m]}
              </button>
            ))}
          </div>
          <a href={t.sommaire.href} className={styles.sommaire}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M9 2v14M2 9h14" />
            </svg>
            {t.sommaire.texto}
          </a>
        </div>
      </div>
    </header>
  )
}

function Titulo({ className }) {
  return (
    <h1 id="nebulosas-titulo" className={className}>
      {t.hero.tituloAntes}
      <em>{t.hero.tituloEnfasis}</em>
    </h1>
  )
}

function HeroPantallaCompleta() {
  return (
    <figure className={`${styles.hero} ${styles.oscuro}`}>
      <img
        src={imagen.src}
        srcSet={imagen.srcSet}
        sizes="100vw"
        width={imagen.width}
        height={imagen.height}
        alt={t.hero.alt}
        fetchPriority="high"
        decoding="async"
        className={styles.heroImg}
      />
      <div className={styles.heroDegradadoArriba} aria-hidden="true" />
      <div className={styles.heroDegradadoAbajo} aria-hidden="true" />
      <div className={styles.heroContenido}>
        <span className={styles.heroChip}>{t.hero.chip}</span>
        <Titulo className={styles.heroTitulo} />
        <p className={styles.autorLinea}>{t.hero.autorLinea}</p>
      </div>
      <a href="#nebulosas-corps" className={styles.defilar}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
        {t.hero.defilar}
      </a>
      <figcaption className={styles.heroCredito}>{t.hero.credito}</figcaption>
    </figure>
  )
}

function CabeceraSimple() {
  return (
    <div className={styles.cabeceraSimple}>
      <Titulo className={styles.simpleTitulo} />
      <p className={`${styles.autorLinea} ${styles.autorLineaPapel}`}>{t.hero.autorLinea}</p>
    </div>
  )
}

function Ficha() {
  return (
    <aside className={styles.ficha} aria-labelledby="nebulosas-ficha">
      <h2 id="nebulosas-ficha" className={styles.fichaTitulo}>{t.ficha.titulo}</h2>
      <dl className={styles.fichaLista}>
        {t.ficha.filas.map(([etiqueta, valor]) => (
          <div key={etiqueta} className={styles.fichaFila}>
            <dt>{etiqueta}</dt>
            <dd><Rico>{valor}</Rico></dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

// Un H2 del artículo con sus párrafos.
function Apartado({ bloque, primero = false }) {
  return (
    <>
      <h2 className={`${styles.h2} ${primero ? styles.h2SinMargenArriba : ''}`}>{bloque.titulo}</h2>
      {bloque.parrafos.map((p) => (
        <p key={p} className={styles.parrafo}>
          <Rico>{p}</Rico>
        </p>
      ))}
    </>
  )
}

// Columna central de lectura con columnas laterales vacías como espaciadores.
function BloqueTexto({ children }) {
  return (
    <div className={styles.columnas}>
      <div className={styles.colIzq} aria-hidden="true" />
      <div className={styles.colCentro}>{children}</div>
      <div className={styles.colDerEspacio} aria-hidden="true" />
    </div>
  )
}

function Cuerpo() {
  return (
    <div id="nebulosas-corps" className={styles.columnas}>
      <div className={styles.colIzq}>
        <p className={styles.meta}>
          {t.meta.map((linea) => (
            <span key={linea}>{linea}</span>
          ))}
        </p>
        <ul className={styles.tags} aria-label={t.etiquetasLabel}>
          {t.etiquetas.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className={styles.colCentro}>
        <p className={styles.lead}>{t.lead}</p>
        <Apartado bloque={t.bloques.icone} primero />
        <Apartado bloque={t.bloques.colonnes} />
      </div>
      <Ficha />
    </div>
  )
}

function Cita() {
  return (
    <blockquote className={styles.cita}>
      <span className={styles.comilla} aria-hidden="true">«</span>
      <p className={styles.citaTexto}>{t.cita.texto}</p>
      <footer className={styles.citaAutor}>{t.cita.autor}</footer>
    </blockquote>
  )
}

function MasLejos() {
  const m = t.masLejos
  return (
    <section className={styles.masLejos} aria-labelledby="nebulosas-plus-loin">
      <h2 id="nebulosas-plus-loin" className={styles.masLejosTitulo}>{m.titulo}</h2>
      <ul>
        {m.enlaces.map((e) => (
          <li key={e.href}>
            {`${e.fuente} — `}
            <a href={e.href} target="_blank" rel="noopener noreferrer">
              {`«${NBSP}${e.titulo}${NBSP}»`}
              <span className="sr-only">{` ${m.nuevaVentana}`}</span>
            </a>
          </li>
        ))}
        <li>{m.glosario}</li>
      </ul>
      <p className={styles.masLejosCreditos}>{m.creditos}</p>
    </section>
  )
}

function Autor() {
  return (
    <div className={styles.autorTarjeta}>
      <span className={styles.avatar} aria-hidden="true">{t.autor.iniciales}</span>
      <div className={styles.autorTexto}>
        <p className={styles.autorEtiqueta}>{t.autor.etiqueta}</p>
        <p className={styles.autorNombre}>{t.autor.nombre}</p>
        <p className={styles.autorBio}>{t.autor.bio}</p>
      </div>
    </div>
  )
}

// Cierre común a los dos modos: lecturas, compartir y autor.
function Final() {
  return (
    <>
      <MasLejos />
      <Partager t={t.partager} ancla={t.id} />
      <Autor />
    </>
  )
}

function Navegacion() {
  const n = t.navegacion
  return (
    <nav aria-label={n.label} className={styles.prevNext}>
      <a href={n.anterior.href} className={styles.prev}>
        <span className={styles.prevNextEtiqueta}>{n.anterior.etiqueta}</span>
        <span className={styles.prevNextTitulo}>{n.anterior.titulo}</span>
      </a>
      <a href={n.siguiente.href} className={`${styles.next} ${styles.oscuro}`}>
        <span>
          <span className={styles.prevNextEtiqueta}>{n.siguiente.etiqueta}</span>
          <span className={styles.prevNextTitulo}>{n.siguiente.titulo}</span>
        </span>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.nextFlecha}>
          <path d="M5 14h18M16 7l7 7-7 7" />
        </svg>
      </a>
    </nav>
  )
}

export default function Articulo2({ initialMode = 'immersif' }) {
  const hoja = useRef(null)
  const [modo, setModo] = useState(() => leerModo(initialMode))
  useHojaApilada(hoja)

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_MODO, modo)
    } catch {
      // sin persistencia si el navegador lo bloquea
    }
  }, [modo])

  const immersif = modo === 'immersif'
  const b = t.bloques

  return (
    <>
      {/* El ancla va fuera de la hoja: si estuviera en el elemento sticky, al saltar a #nebulosas desde
          más abajo el navegador usaría la posición "pegada" y caería en el lugar equivocado. */}
      <div id={t.id} className={immersif ? styles.ancla : `${styles.ancla} ${styles.anclaSimple}`} />
      <article
        ref={hoja}
        lang="fr"
        aria-labelledby="nebulosas-titulo"
        className={`${styles.hoja} ${immersif ? styles.immersif : styles.simple}`}
      >
        <BarraSuperior modo={modo} setModo={setModo} />
        {immersif ? <HeroPantallaCompleta /> : <CabeceraSimple />}

        <a href={t.navegacion.anterior.href} className={`${styles.borde} ${styles.bordeIzq}`}>
          {t.navegacion.bordeAnterior}
        </a>
        <a href={t.navegacion.siguiente.href} className={`${styles.borde} ${styles.bordeDer}`}>
          {t.navegacion.bordeSiguiente}
        </a>

        <Cuerpo />

        {immersif ? (
          <>
            <ModuloEchelle t={t.echelle} />
            <ExplorateurImage t={t.explorador} imagen={imagen} />
            <BloqueTexto>
              <Apartado bloque={b.passe} primero />
            </BloqueTexto>
            <ModuloMachine t={t.machine} />
            <Cita />
            <BloqueTexto>
              <Apartado bloque={b.couleurs} primero />
            </BloqueTexto>
            <ModuloPalette t={t.palette} />
            <BloqueTexto>
              <Apartado bloque={b.naissance} primero />
              <Apartado bloque={b.encore} />
            </BloqueTexto>
            <Chiffres t={t.chiffres} />
            <ModuloQuiz t={t.quiz} />
            <ModuloSonido t={t.sonido} imagen={img1000} />
            <BloqueTexto>
              <Apartado bloque={b.cierre} primero />
              <Final />
            </BloqueTexto>
          </>
        ) : (
          // Modo Simple: texto íntegro en una sola columna, con las versiones estáticas de M1, M2 y M3
          <BloqueTexto>
            <TablaEchelle t={t.echelle} />
            <Apartado bloque={b.passe} />
            <ListaMachine t={t.machine} />
            <Apartado bloque={b.couleurs} />
            <TablaPalette t={t.palette} />
            <Apartado bloque={b.naissance} />
            <Apartado bloque={b.encore} />
            <Apartado bloque={b.cierre} />
            <Final />
          </BloqueTexto>
        )}

        <Navegacion />
      </article>
    </>
  )
}
