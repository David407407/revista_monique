// Anuncio 2: Stellarium — responsable: compañero
// Anuncio real de un planetario gratuito. Misma estructura que Anuncio1; sin logos oficiales, solo el nombre.
// Hace eco del artículo anterior (El tiempo): mirar el cielo de cualquier fecha.
import styles from './Anuncio2.module.css'

const datos = [
  ['Gratuit', 'Logiciel libre'],
  ['Navigateur', 'Rien à installer'],
  ['Toutes les dates', 'Passé et futur'],
]

// Estrellas de fondo con posiciones fijas (generador pseudoaleatorio con semilla)
const fondo = (() => {
  let semilla = 7
  const azar = () => {
    semilla = (semilla * 16807) % 2147483647
    return semilla / 2147483647
  }
  const estrellas = []
  while (estrellas.length < 70) {
    const x = azar() * 480 - 240
    const y = azar() * 480 - 240
    if (Math.hypot(x, y) < 226) estrellas.push({ x, y, r: 0.6 + azar() * 1.4, retraso: azar() * 6 })
  }
  return estrellas
})()

// La Grande Ourse: sus dos estrellas «punteras» apuntan a la Estrella Polar, en el centro.
const osa = {
  dubhe: [-25, 100],
  merak: [-40, 160],
  phecda: [-105, 145],
  megrez: [-95, 90],
  alioth: [-145, 78],
  mizar: [-180, 70],
  alkaid: [-205, 92],
}
const trazo = ['dubhe', 'merak', 'phecda', 'megrez', 'dubhe', 'megrez', 'alioth', 'mizar', 'alkaid']

// Vista de planetario mirando al norte: el cielo gira despacio alrededor de la Estrella Polar
function Cielo() {
  const puntos = trazo.map((k) => osa[k].join(',')).join(' ')
  return (
    <svg viewBox="-260 -260 520 520" className={styles.cielo} aria-hidden="true">
      <circle r="240" className={styles.cupula} />
      {[80, 160, 240].map((r) => <circle key={r} r={r} className={styles.anillo} />)}
      <path d="M-240 0 H240 M0 -240 V240" className={styles.anillo} />

      <g className={styles.giro}>
        {fondo.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} className={styles.estrella} style={{ animationDelay: `${e.retraso}s` }} />
        ))}
        <line x1={osa.merak[0]} y1={osa.merak[1]} x2="0" y2="0" className={styles.puntero} />
        <polyline points={puntos} className={styles.constelacion} />
        {Object.values(osa).map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" className={styles.brillante} />)}
        <text x="-150" y="128" className={styles.etiqueta}>Grande Ourse</text>
      </g>

      <circle r="6" className={styles.polar} />
      <circle r="14" className={styles.halo} />
      <text x="14" y="-16" className={styles.etiqueta}>Étoile polaire</text>
      <text x="0" y="234" textAnchor="middle" className={styles.cardinal}>N</text>
    </svg>
  )
}

export default function Anuncio2() {
  return (
    <aside id="anuncio-2" aria-label="Publicité" className={styles.anuncio}>
      <div className={styles.cabecera}>
        <span className={styles.marca}>
          Stellarium <em>Web</em>
        </span>
        <span className={styles.pill}>Publicité</span>
      </div>

      <div className={styles.cuerpo}>
        <div className={styles.texto}>
          <h2 className={styles.titulo}>
            Le ciel de votre naissance.
            <br />
            Ou celui dans <em>mille ans.</em>
          </h2>
          <p className={styles.bajada}>
            Choisissez une date et un lieu, et regardez les étoiles, les planètes et les
            constellations telles qu’elles étaient, ou seront, au-dessus de votre tête. Un
            planétarium gratuit, dans votre navigateur ou sur votre téléphone.
          </p>
          <dl className={styles.datos}>
            {datos.map(([valor, texto]) => (
              <div key={valor}>
                <dt>{valor}</dt>
                <dd>{texto}</dd>
              </div>
            ))}
          </dl>
          <a href="https://stellarium-web.org/" target="_blank" rel="noreferrer" className={styles.cta}>
            Ouvrir Stellarium Web
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">(s’ouvre dans un nouvel onglet)</span>
          </a>
        </div>
        <Cielo />
      </div>

      <p className={styles.legal}>
        Annonce à but éducatif. Stellarium est un logiciel de planétarium libre et gratuit.
        Point Bleu Pâle n’est pas affilié au projet Stellarium.
      </p>
    </aside>
  )
}
