// Anuncio 1: NASA's Eyes — responsable: David407407
// Anuncio real de una herramienta gratuita. Sin logos oficiales: solo el nombre del servicio.
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Anuncio1.module.css'

const datos = [
  [['Gratuit', 'Free'], ['Aucun abonnement', 'No subscription']],
  [['3D', '3D'], ['Planètes, lunes et sondes', 'Planets, moons and spacecraft']],
  [['Navigateur', 'Browser'], ['Rien à installer', 'Nothing to install']],
]

// Órbitas del sistema solar interior que giran despacio
function Orbitas() {
  const planetas = [
    { r: 70, size: 6, color: '#C9C7F0', dur: 9 },
    { r: 115, size: 9, color: '#F3D9B1', dur: 15 },
    { r: 165, size: 10, color: '#9CC9F0', dur: 22 },
    { r: 215, size: 8, color: '#FF9B6A', dur: 34 },
  ]
  return (
    <svg viewBox="-260 -260 520 520" className={styles.orbitas} aria-hidden="true">
      <circle r="26" fill="#FFD27A" />
      <circle r="44" fill="#FFD27A" opacity="0.12" />
      {planetas.map((p) => (
        <g key={p.r}>
          <circle r={p.r} fill="none" stroke="#34315E" strokeWidth="1.2" />
          <g className={styles.giro} style={{ animationDuration: `${p.dur}s` }}>
            <circle cx={p.r} r={p.size} fill={p.color} />
          </g>
        </g>
      ))}
      <g className={styles.giro} style={{ animationDuration: '50s' }}>
        <path d="M-150 -170 l10 -6 l4 10 l-10 6 z" fill="#ECEBFF" />
        <path d="M-160 -160 h-14 M-136 -184 h14" stroke="#ECEBFF" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default function Anuncio1() {
  const t = useT()
  return (
    <aside id="anuncio-1" aria-label={t('Publicité', 'Advertisement')} className={styles.anuncio}>
      <div className={styles.cabecera}>
        <span className={styles.marca}>
          NASA’s <em>Eyes</em>
        </span>
        <span className={styles.pill}>{t('Publicité', 'Advertisement')}</span>
      </div>

      <div className={styles.cuerpo}>
        <div className={styles.texto}>
          <h2 className={styles.titulo}>
            {t('Vous avez lu.', 'You’ve read about it.')}
            <br />
            {t('Maintenant, ', 'Now ')}<em>{t('regardez.', 'see it.')}</em>
          </h2>
          <p className={styles.bajada}>
            {t(
              'Explorez le Système solaire en 3D et suivez les sondes spatiales là où elles se trouvent aujourd’hui. Une application gratuite de la NASA, directement dans votre navigateur.',
              'Explore the Solar System in 3D and follow space probes to wherever they are today. A free app from NASA, right in your browser.',
            )}
          </p>
          <dl className={styles.datos}>
            {datos.map(([valor, texto]) => (
              <div key={valor[0]}>
                <dt>{t(...valor)}</dt>
                <dd>{t(...texto)}</dd>
              </div>
            ))}
          </dl>
          <a href="https://eyes.nasa.gov/" target="_blank" rel="noreferrer" className={styles.cta}>
            {t('Ouvrir NASA’s Eyes', 'Open NASA’s Eyes')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">{t('(s’ouvre dans un nouvel onglet)', '(opens in a new tab)')}</span>
          </a>
        </div>
        <Orbitas />
      </div>

      <p className={styles.legal}>
        {t(
          'Annonce à but éducatif. NASA’s Eyes est un service gratuit de la NASA et du JPL. Point Bleu Pâle n’est pas affilié à la NASA.',
          'Educational advertisement. NASA’s Eyes is a free service from NASA and JPL. Point Bleu Pâle is not affiliated with NASA.',
        )}
      </p>
    </aside>
  )
}
