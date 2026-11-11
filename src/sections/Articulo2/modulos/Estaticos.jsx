// Versiones estáticas de M1, M2 y M3 para el modo Simple (sobre el papel, dentro de la columna de texto).
import { NBSP, nombre } from '../typo.js'
import { dureeAnnees, formatDuree } from './calculos.js'
import s from './Modulos.module.css'

export function TablaEchelle({ t }) {
  return (
    <table className={s.tabla}>
      <caption>{t.tabla.caption}</caption>
      <thead>
        <tr>
          {t.tabla.cols.map((c) => (
            <th key={c} scope="col">{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {t.vitesses.map((v) => (
          <tr key={v.id}>
            <th scope="row">{v.label}</th>
            <td>{v.detail}</td>
            <td>{formatDuree(dureeAnnees(t.longitudAl, v.kmS))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function ListaMachine({ t }) {
  return (
    <section aria-labelledby="nebulosas-lista-luz" className={s.estatico}>
      <h3 id="nebulosas-lista-luz" className={s.estaticoTitulo}>{t.listaTitulo}</h3>
      <ol className={s.cronologia}>
        {t.evenements.map((e) => (
          <li key={e.ecoule}>
            <span className={s.cronologiaAnio}>{e.annee}</span>
            <span>
              <strong>{e.titre}.</strong> {e.texte}
            </span>
          </li>
        ))}
      </ol>
      <p className={s.notaPapel}>{t.nota}</p>
    </section>
  )
}

export function TablaPalette({ t }) {
  return (
    <>
      <table className={s.tabla}>
        <caption>{t.tabla.caption}</caption>
        <thead>
          <tr>
            {t.tabla.cols.map((c) => (
              <th key={c} scope="col">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.filtres.map((f) => (
            <tr key={f.couleur}>
              <th scope="row">
                <span className={s.muestra} style={{ background: f.hex }} aria-hidden="true" /> {f.couleur}
              </th>
              <td>{nombre(f.um)}{NBSP}µm</td>
              <td>
                <strong>{f.nom}.</strong> {f.texte}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={s.notaPapel}>{t.fuente}</p>
    </>
  )
}
