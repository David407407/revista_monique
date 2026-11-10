import { useState } from 'react'
import { NBSP } from '../typo.js'
import { dureeAnnees, formatDuree, posicionLog } from './calculos.js'
import Modulo from './Modulo.jsx'
import s from './Modulos.module.css'

// M1 — «Combien de temps pour traverser un pilier ?»
export default function ModuloEchelle({ t }) {
  const [sel, setSel] = useState('voyager')
  const v = t.vitesses.find((x) => x.id === sel)
  const resultado = formatDuree(dureeAnnees(t.longitudAl, v.kmS))
  const pos = posicionLog(dureeAnnees(t.longitudAl, v.kmS))

  return (
    <Modulo id="nebulosas-echelle" kicker={t.kicker} titulo={t.titulo} apoyo={t.apoyo}>
      <div className={s.colControles}>
        <div role="group" aria-label={t.botonesLabel} className={s.pildoras}>
          {t.vitesses.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === sel} className={s.pildora} onClick={() => setSel(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.colResultado}>
        <div aria-live="polite" className={s.resultado}>
          <p className={s.dato}>
            {t.resultadoPrefijo} · {v.label} · {v.detail}
          </p>
          <p className={s.cifra}>{resultado}</p>
          <p className={s.apoyo}>{v.note}</p>
        </div>

        <div className={s.barraLog} role="img" aria-label={`${t.barraLabel}${NBSP}: ${resultado}`}>
          <div className={s.barraPista}>
            {t.marcas.map((m, i) => (
              <span key={m} className={s.barraMarca} style={{ left: `${(i / (t.marcas.length - 1)) * 100}%` }} />
            ))}
            <span className={s.barraPunto} style={{ left: `${pos * 100}%` }} />
          </div>
          <div className={s.barraEtiquetas} aria-hidden="true">
            {t.marcas.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <p className={s.extra}>{t.extra}</p>
    </Modulo>
  )
}
