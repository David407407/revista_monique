import { useState } from 'react'
import { NBSP } from '../typo.js'
import { dureeAnnees, formatDuree, posicionLog } from './calculos.js'
import e from './Echelle.module.css'

// M1 — «Combien de temps pour traverser un pilier ?»
// Estilo «Papier et vin»: papel mate, líneas finas, serif ligera y cifra en rojo vino.
export default function ModuloEchelle({ t }) {
  const [sel, setSel] = useState('voyager')
  const v = t.vitesses.find((x) => x.id === sel)
  const resultado = formatDuree(dureeAnnees(t.longitudAl, v.kmS))
  const pos = posicionLog(dureeAnnees(t.longitudAl, v.kmS))

  // «≈ 71 000 ans» → aprox. «≈», cifra «71 000», unidad «ans»
  const aprox = resultado.startsWith('≈')
  const [cifra, ...unidad] = resultado.replace(/^≈\s*/, '').split(NBSP)

  return (
    <section aria-labelledby="nebulosas-echelle" className={e.tarjeta}>
      <div className={e.grano} aria-hidden="true" />

      <div className={e.lado}>
        <p className={e.kicker}>{t.kicker}</p>
        <h2 id="nebulosas-echelle" className={e.titulo}>{t.titulo}</h2>
        <p className={e.apoyo}>{t.apoyo}</p>

        <div role="group" aria-label={t.botonesLabel} className={e.lista}>
          {t.vitesses.map((x, i) => (
            <button key={x.id} type="button" aria-pressed={x.id === sel} className={e.opcion} onClick={() => setSel(x.id)}>
              <span className={e.indice}>{String(i + 1).padStart(2, '0')}</span>
              <span className={e.nombre}>{x.label}</span>
              <span className={e.velocidad}>{x.detail}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={e.resultadoCol}>
        <div aria-live="polite" className={e.resultado}>
          <p className={e.etiqueta}>
            {t.resultadoPrefijo} <span className={e.sep}>/</span> {v.label}
          </p>
          <p key={sel} className={e.cifra} aria-label={resultado}>
            {aprox && <span className={e.aprox} aria-hidden="true">≈</span>}
            <span className={e.numero} aria-hidden="true">{cifra}</span>
            <span className={e.unidad} aria-hidden="true">{unidad.join(' ')}</span>
          </p>
          <p className={e.nota}>{v.note}</p>
        </div>

        <div className={e.escala} role="img" aria-label={`${t.barraLabel}${NBSP}: ${resultado}`}>
          <div className={e.pista}>
            <span className={e.relleno} style={{ width: `${pos * 100}%` }} />
            {t.marcas.map((m, i) => (
              <span key={m} className={e.marca} style={{ left: `${(i / (t.marcas.length - 1)) * 100}%` }} />
            ))}
            <span className={e.aguja} style={{ left: `${pos * 100}%` }} />
          </div>
          <div className={e.marcas} aria-hidden="true">
            {t.marcas.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>

      <p className={e.extra}>{t.extra}</p>
    </section>
  )
}
