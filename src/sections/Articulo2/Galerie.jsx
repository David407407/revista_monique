import g1s from '../../assets/nebulosas/galerie-1-800.webp'
import g1m from '../../assets/nebulosas/galerie-1-1400.webp'
import g1l from '../../assets/nebulosas/galerie-1-full.webp'
import g2s from '../../assets/nebulosas/galerie-2-800.webp'
import g2m from '../../assets/nebulosas/galerie-2-1400.webp'
import g2l from '../../assets/nebulosas/galerie-2-full.webp'
import g3s from '../../assets/nebulosas/galerie-3-800.webp'
import g3l from '../../assets/nebulosas/galerie-3-full.webp'
import s from './Galerie.module.css'

// Archivos de cada imagen, en el mismo orden que t.imagenes (contenido.js)
const ARCHIVOS = [
  { src: g1m, srcSet: `${g1s} 800w, ${g1m} 1400w, ${g1l} 1821w`, ancho: 1821, alto: 2000 },
  { src: g2m, srcSet: `${g2s} 800w, ${g2m} 1400w, ${g2l} 1877w`, ancho: 1877, alto: 2000 },
  { src: g3l, srcSet: `${g3s} 800w, ${g3l} 1123w`, ancho: 1123, alto: 1125 },
]

// Galería «Les piliers ne sont pas seuls».
// Immersif: banda oscura a todo el ancho de la hoja, una imagen panorámica y dos debajo.
// Simple: las tres imágenes una tras otra, al ancho de la columna de texto.
export default function Galerie({ t, simple = false }) {
  return (
    <section aria-labelledby="nebulosas-galerie" className={simple ? s.simple : s.galerie}>
      <header className={s.cabecera}>
        <p className={s.kicker}>{t.kicker}</p>
        <h2 id="nebulosas-galerie" className={s.titulo}>
          {t.titulo}
        </h2>
        <p className={s.intro}>{t.intro}</p>
      </header>

      <ol className={s.mosaico}>
        {t.imagenes.map((img, i) => {
          const a = ARCHIVOS[i]
          const grande = i === 0 && !simple
          return (
            <li key={img.id} className={s.item}>
              <figure className={s.figura}>
                <div className={s.marco}>
                  <img
                    src={a.src}
                    srcSet={a.srcSet}
                    sizes={grande ? '(min-width: 900px) 92vw, 100vw' : '(min-width: 900px) 46vw, 100vw'}
                    width={a.ancho}
                    height={a.alto}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={s.imagen}
                  />
                </div>
                <figcaption className={s.leyenda}>
                  <span className={s.numero} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.leyendaTexto}>
                    <span className={s.titre}>{img.titre}</span>
                    <span className={s.texte}>{img.texte}</span>
                    <span className={s.credit}>{img.credit}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
