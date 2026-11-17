import { useEffect, useRef, useState } from 'react'
import s from './modulos/Modulos.module.css'

const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor))

// Bloque interactivo «Explorez l’image»: cuatro botones hacen zoom sobre partes de la foto.
// Cada detalle (def) indica el centro de la zona (cx, cy, como fracción de la foto, de 0 a 1) y el aumento.
// La foto se ajusta al visor como «cover»; el encuadre se calcula sobre la foto (no sobre la caja del visor)
// para que el centro del detalle quede siempre en medio y nunca se vea fuera de la foto. Un mini-mapa marca
// de dónde sale el zoom.
export default function ExplorateurImage({ t, imagen }) {
  const [detail, setDetail] = useState(1)
  const [caja, setCaja] = useState(null)
  const visor = useRef(null)
  const d = t.defs[detail]

  useEffect(() => {
    const el = visor.current
    const medir = () => setCaja({ w: el.clientWidth, h: el.clientHeight })
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  let escena
  let zona = null // zona visible, en fracciones de la foto
  if (caja && caja.w && caja.h) {
    const proporcion = imagen.width / imagen.height
    const ancho = Math.max(caja.w, caja.h * proporcion) // tamaño de la foto con «cover», sin zoom
    const alto = ancho / proporcion
    const x = limitar(caja.w / 2 - d.cx * ancho * d.scale, caja.w - ancho * d.scale, 0)
    const y = limitar(caja.h / 2 - d.cy * alto * d.scale, caja.h - alto * d.scale, 0)
    escena = { inset: 'auto', left: 0, top: 0, width: ancho, height: alto, transform: `translate(${x}px, ${y}px) scale(${d.scale})` }
    zona = {
      left: `${(-x / (ancho * d.scale)) * 100}%`,
      top: `${(-y / (alto * d.scale)) * 100}%`,
      width: `${(caja.w / (ancho * d.scale)) * 100}%`,
      height: `${(caja.h / (alto * d.scale)) * 100}%`,
    }
  }

  return (
    <section aria-labelledby="nebulosas-explorer" className={`${s.modulo} ${s.explorador}`}>
      <div className={s.colAncha}>
        <div ref={visor} className={`${s.visor} ${s.visorLleno}`}>
          <div className={`${s.visorEscena} ${s.visorZoom}`} style={escena}>
            <img
              src={imagen.src}
              srcSet={imagen.srcSet}
              sizes="200vw"
              width={imagen.width}
              height={imagen.height}
              alt={d.alt}
              loading="lazy"
              decoding="async"
              className={s.visorImg}
            />
          </div>
          <span className={s.visorTag}>{d.tag}</span>
          {zona && (
            <div className={s.localizador} style={{ aspectRatio: `${imagen.width} / ${imagen.height}` }} aria-hidden="true">
              <img src={imagen.src} alt="" width={imagen.width} height={imagen.height} className={s.localizadorImg} />
              <span className={s.localizadorZona} style={zona} />
            </div>
          )}
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
