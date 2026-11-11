import { useEffect, useRef, useState } from 'react'
import { NBSP } from '../typo.js'
import Modulo from './Modulo.jsx'
import s from './Modulos.module.css'

// M4 — «Vrai ou faux ?»: una afirmación a la vez, sin temporizador.
export default function ModuloQuiz({ t }) {
  const total = t.preguntas.length
  const [i, setI] = useState(0)
  const [respuesta, setRespuesta] = useState(null) // null | true | false (lo que eligió)
  const [score, setScore] = useState(0)
  const [fin, setFin] = useState(false)
  const foco = useRef(null)
  const moverFoco = useRef(false)

  useEffect(() => {
    if (moverFoco.current) foco.current?.focus()
    moverFoco.current = false
  }, [i, fin])

  const p = t.preguntas[i]
  const acierto = respuesta !== null && respuesta === p.vrai

  const responder = (valor) => {
    if (respuesta !== null) return
    setRespuesta(valor)
    if (valor === p.vrai) setScore(score + 1)
  }

  const siguiente = () => {
    moverFoco.current = true
    if (i + 1 >= total) setFin(true)
    else {
      setI(i + 1)
      setRespuesta(null)
    }
  }

  const rejouer = () => {
    moverFoco.current = true
    setI(0)
    setRespuesta(null)
    setScore(0)
    setFin(false)
  }

  const mensaje = [...t.mensajes].reverse().find(([desde]) => score >= desde)[1]

  return (
    <Modulo id="nebulosas-quiz" kicker={t.kicker} titulo={t.titulo} apoyo={t.apoyo} className={s.quiz}>
      {fin ? (
        <div className={s.quizCuerpo} aria-live="polite">
          <p ref={foco} tabIndex={-1} className={s.cifra}>
            {t.score}{NBSP}: {score} / {total}
          </p>
          <p className={s.apoyo}>{mensaje}</p>
          <div>
            <button type="button" className={s.pildora} onClick={rejouer}>
              {t.rejouer}
            </button>
          </div>
        </div>
      ) : (
        <div className={s.quizCuerpo}>
          <p className={s.dato}>
            {i + 1} / {total}
          </p>
          <h3 ref={foco} tabIndex={-1} className={s.quizPregunta}>
            {p.q}
          </h3>
          <div className={s.quizBotones}>
            {[
              [true, t.vrai],
              [false, t.faux],
            ].map(([valor, etiqueta]) => (
              <button
                key={etiqueta}
                type="button"
                aria-pressed={respuesta === valor}
                aria-disabled={respuesta !== null}
                className={`${s.pildora} ${s.pildoraGrande}`}
                onClick={() => responder(valor)}
              >
                {etiqueta}
              </button>
            ))}
          </div>
          <div aria-live="polite" className={s.quizRespuesta}>
            {respuesta !== null && (
              <>
                <p className={`${s.fichaTitulo} ${acierto ? '' : s.quizMal}`}>{acierto ? t.bien : t.mal}</p>
                <p className={s.apoyo}>
                  {!acierto && `${t.laRespuesta}${NBSP}: ${p.vrai ? t.vrai : t.faux}. `}
                  {p.expl}
                </p>
              </>
            )}
          </div>
          {respuesta !== null && (
            <div>
              <button type="button" className={s.pildora} onClick={siguiente}>
                {i + 1 >= total ? t.verScore : t.siguiente}
              </button>
            </div>
          )}
        </div>
      )}
    </Modulo>
  )
}
