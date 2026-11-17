// Preguntas rápidas: tarjetas que se voltean al tocarlas (pregunta delante, respuesta detrás).
import { useState } from 'react'
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Entrevista.module.css'

function Girar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v5h-5" />
    </svg>
  )
}

function Tarjeta({ pregunta, respuesta, detalle }) {
  const [vuelta, setVuelta] = useState(false)
  const t = useT()

  return (
    <li className={styles.carta}>
      <button type="button" className={styles.cartaBoton} aria-expanded={vuelta} onClick={() => setVuelta((v) => !v)} data-vuelta={vuelta}>
        <span className={styles.cartaInterior}>
          <span className={`${styles.cara} ${styles.caraFrente}`} aria-hidden={vuelta}>
            <span className={styles.cartaPregunta}>{pregunta}</span>
            <span className={styles.cartaPista}><Girar /> {t('Retourner', 'Flip')}</span>
          </span>
          <span className={`${styles.cara} ${styles.caraDorso}`} aria-hidden={!vuelta}>
            <span className={styles.cartaPreguntaChica}>{pregunta}</span>
            <span className={styles.cartaRespuesta}>{respuesta}</span>
            {detalle && <span className={styles.cartaDetalle}>{detalle}</span>}
          </span>
        </span>
      </button>
    </li>
  )
}

export default function Tarjetas({ preguntas }) {
  return (
    <ul className={styles.cartas}>
      {preguntas.map((p) => <Tarjeta key={p.pregunta} {...p} />)}
    </ul>
  )
}
