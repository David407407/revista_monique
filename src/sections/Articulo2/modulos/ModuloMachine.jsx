import { useEffect, useRef, useState } from 'react'
import { NBSP, nombre } from '../typo.js'
import { anneeTexte, plural } from './calculos.js'
import Modulo from './Modulo.jsx'
import useReduceMotion from './useReduceMotion.js'
import s from './Modulos.module.css'

const DURACION_MS = 14000 // de 0 a 6 500 en ~14 s

// M2 — «Machine à remonter la lumière»
export default function ModuloMachine({ t }) {
  const total = t.distanciaTotal
  const [valor, setValor] = useState(0)
  const [jugandoPedido, setJugando] = useState(false)
  const reducir = useReduceMotion()
  const jugando = jugandoPedido && !reducir // sin lectura automática con reduced-motion
  const valorRef = useRef(0)

  useEffect(() => {
    valorRef.current = valor
  }, [valor])

  useEffect(() => {
    if (!jugando) return undefined
    const inicio = valorRef.current >= total ? 0 : valorRef.current
    const t0 = performance.now()
    let id
    const paso = (ahora) => {
      const n = Math.min(total, inicio + ((ahora - t0) * total) / DURACION_MS)
      setValor(n)
      if (n >= total) setJugando(false)
      else id = requestAnimationFrame(paso)
    }
    id = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(id)
  }, [jugando, total])

  const v = Math.round(valor)
  const anio = anneeTexte(v, t.anioSalida, t.avJC)
  const resta = total - v
  const actual = [...t.evenements].reverse().find((e) => e.ecoule <= v) ?? t.evenements[0]

  const irA = (n) => {
    setJugando(false)
    setValor(n)
  }

  return (
    <Modulo id="nebulosas-machine" kicker={t.kicker} titulo={t.titulo} apoyo={t.apoyo}>
      <div className={s.colAncha}>
        <label htmlFor="nebulosas-curseur" className={s.dato}>
          {t.sliderLabel}
        </label>
        <input
          id="nebulosas-curseur"
          type="range"
          min="0"
          max={total}
          step="1"
          value={v}
          aria-valuetext={`${nombre(v)}${NBSP}${plural(v, t.ecoule)}, ${anio}`}
          onChange={(e) => irA(Number(e.target.value))}
          className={s.curseur}
          style={{ '--progreso': `${(v / total) * 100}%` }}
        />
        <div className={s.pistaEventos} aria-hidden="true">
          {t.evenements.map((e) => (
            <span
              key={e.ecoule}
              className={`${s.puntoEvento} ${e.ecoule <= v ? s.puntoAlcanzado : ''}`}
              style={{ left: `${(e.ecoule / total) * 100}%` }}
            />
          ))}
        </div>

        <dl className={s.lecturas}>
          <div>
            <dt>{t.distancia}{NBSP}:</dt>
            <dd>{nombre(v)} {plural(v, t.al)}</dd>
          </div>
          <div>
            <dt>{t.resta}{NBSP}:</dt>
            <dd>{nombre(resta)} {plural(resta, t.al)} {t.restaFin}</dd>
          </div>
          <div>
            <dt>{t.anio}{NBSP}:</dt>
            <dd>{anio}</dd>
          </div>
        </dl>

        <div role="group" aria-label={t.marcadoresLabel} className={s.pildoras}>
          {t.evenements.map((e) => (
            <button
              key={e.ecoule}
              type="button"
              aria-current={e === actual ? 'step' : undefined}
              className={`${s.pildora} ${s.pildoraPeque}`}
              onClick={() => irA(e.ecoule)}
            >
              {e.titre}
            </button>
          ))}
        </div>

        <div className={s.filaAcciones}>
          {!reducir && (
            <button type="button" aria-pressed={jugando} className={s.pildora} onClick={() => setJugando(!jugando)}>
              {jugando ? t.pausa : t.autoplay}
            </button>
          )}
        </div>
      </div>

      <div className={s.colFicha}>
        <div aria-live="polite" className={s.fichaOscura}>
          <p className={s.dato}>{actual.annee}</p>
          <h3 className={s.fichaTitulo}>{actual.titre}</h3>
          <p className={s.apoyo}>{actual.texte}</p>
        </div>
        <p className={s.nota}>{t.nota}</p>
      </div>
    </Modulo>
  )
}
