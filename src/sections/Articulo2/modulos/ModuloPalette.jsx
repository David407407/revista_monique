import { useState } from 'react'
import { NBSP, nombre } from '../typo.js'
import Modulo from './Modulo.jsx'
import s from './Modulos.module.css'

const um = (n) => `${nombre(n)}${NBSP}µm`
const TICKS = [1, 2, 3, 4, 5]
// Altura de las piezas de la regla (px): carril de arriba, eje, carril de abajo, rótulos.
const EJE_Y = 64
const CARRIL_ARRIBA = 22
const CARRIL_ABAJO = 106

// M3 — «Palette Webb»: regla espectral lineal con los 6 filtros de Webb.
export default function ModuloPalette({ t }) {
  const [sel, setSel] = useState(0)
  const [min, max] = t.rango
  const pct = (x) => ((x - min) / (max - min)) * 100
  const f = t.filtres[sel]
  const [v0, v1] = t.bandaVisible

  return (
    <Modulo id="nebulosas-palette" kicker={t.kicker} titulo={t.titulo} apoyo={t.apoyo}>
      <div className={s.colAncha}>
        <div className={s.regla}>
          <svg className={s.reglaSvg} width="100%" height="100%" role="img" aria-label={t.reglaLabel}>
            <defs>
              <linearGradient id="nebulosas-espectro">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="45%" stopColor="#22c55e" />
                <stop offset="65%" stopColor="#facc15" />
                <stop offset="82%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <rect x="0" y={EJE_Y - 3} width="100%" height="6" rx="3" className={s.reglaEje} />
            <rect x={`${pct(v0)}%`} y={EJE_Y - 7} width={`${pct(v1) - pct(v0)}%`} height="14" rx="2" fill="url(#nebulosas-espectro)" />
            {t.filtres.map((x, i) => (
              <line
                key={x.couleur}
                x1={`${pct(x.um)}%`}
                x2={`${pct(x.um)}%`}
                y1={i % 2 === 0 ? CARRIL_ARRIBA + 10 : EJE_Y + 4}
                y2={i % 2 === 0 ? EJE_Y - 4 : CARRIL_ABAJO - 10}
                stroke={x.hex}
                strokeWidth="1.5"
              />
            ))}
            {TICKS.map((n) => (
              <g key={n}>
                <line x1={`${pct(n)}%`} x2={`${pct(n)}%`} y1={EJE_Y + 4} y2={EJE_Y + 10} className={s.reglaTick} />
                <text x={`${pct(n)}%`} y="148" textAnchor={n === max ? 'end' : 'middle'} className={s.reglaTexto}>
                  {um(n)}
                </text>
              </g>
            ))}
            <line x1={`${pct(v0)}%`} x2={`${pct(v0)}%`} y1={EJE_Y + 8} y2="160" className={s.reglaGuia} />
            <text x={`${pct(v0)}%`} y="174" className={s.reglaTexto}>
              {t.visible}
            </text>
          </svg>

          <div role="group" aria-label={t.filtrosLabel}>
            {t.filtres.map((x, i) => (
              <button
                key={x.couleur}
                type="button"
                aria-pressed={i === sel}
                aria-label={`${x.couleur}, ${um(x.um)}, ${x.nom}`}
                className={s.marcadorFiltro}
                style={{ left: `${pct(x.um)}%`, top: (i % 2 === 0 ? CARRIL_ARRIBA : CARRIL_ABAJO) - 22, '--color': x.hex }}
                onClick={() => setSel(i)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.colFicha}>
        <div aria-live="polite" className={s.fichaOscura}>
          <p className={s.filaMuestra}>
            <span className={s.muestra} style={{ background: f.hex }} aria-hidden="true" />
            <span className={s.dato}>{f.couleur} · {um(f.um)}</span>
          </p>
          <h3 className={s.fichaTitulo}>{f.nom}</h3>
          <p className={s.apoyo}>{f.texte}</p>
        </div>
      </div>

      <p className={s.nota}>{t.fuente}</p>
    </Modulo>
  )
}
