import { useState } from 'react'
import s from './modulos/Modulos.module.css'

// Bloque interactivo «Explorez l’image»: cuatro botones hacen zoom sobre partes de la foto.
export default function ExplorateurImage({ t, imagen }) {
  const [detail, setDetail] = useState(1)
  const d = t.defs[detail]

  return (
    <section aria-labelledby="nebulosas-explorer" className={`${s.modulo} ${s.explorador}`}>
      <div className={s.colAncha}>
        <div className={`${s.visor} ${s.visorLleno}`}>
          <img
            src={imagen.src}
            srcSet={imagen.srcSet}
            sizes="100vw"
            width={imagen.width}
            height={imagen.height}
            alt={d.alt}
            loading="lazy"
            decoding="async"
            className={`${s.visorImg} ${s.visorZoom}`}
            style={{ transform: `scale(${d.scale})`, transformOrigin: d.origin }}
          />
          <span className={s.visorTag}>{d.tag}</span>
        </div>
        <p className={s.nota}>{t.credito}</p>
      </div>

      <div className={s.colFicha}>
        <p className={s.kicker}>{t.kicker}</p>
        <h2 id="nebulosas-explorer" className={s.titulo}>{t.titulo}</h2>
        <div role="group" aria-label={t.botonesLabel} className={s.pildoras}>
          {t.defs.map((def, i) => (
            <button key={def.tag} type="button" aria-pressed={i === detail} className={s.pildora} onClick={() => setDetail(i)}>
              {def.label}
            </button>
          ))}
        </div>
        <div aria-live="polite" className={s.fichaOscura}>
          <h3 className={s.fichaTitulo}>{d.title}</h3>
          <p className={s.apoyo}>{d.fact}</p>
        </div>
      </div>
    </section>
  )
}
