// Contraportada (footer) — responsable: David407407
import { useState } from 'react'
import Logo from '../../components/Logo/Logo.jsx'
import { useT } from '../../components/Idioma/Idioma.jsx'
import styles from './Contraportada.module.css'

const redes = {
  rss: <><path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="6" cy="18" r="2" fill="currentColor" /></>,
  video: <path d="M7 4l13 8-13 8z" fill="currentColor" />,
  photo: <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.4" /></>,
  podcast: <><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2.4" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /></>,
  newsletter: <><rect x="5" y="3" width="14" height="18" rx="2" fill="currentColor" /><path d="M8 8h8M8 12h8M8 16h5" stroke="var(--grafito)" strokeWidth="2" strokeLinecap="round" /></>,
}

// Nombres de las redes: [francés, inglés]
const nombresRedes = {
  rss: ['Flux RSS', 'RSS feed'],
  video: ['Vidéo', 'Video'],
  photo: ['Photographie', 'Photography'],
  podcast: ['Podcast', 'Podcast'],
  email: ['E-mail', 'Email'],
  newsletter: ['Newsletter', 'Newsletter'],
}

const enlaces = [
  ['À propos de Point Bleu Pâle', 'About Point Bleu Pâle'],
  ['Archives', 'Archives'],
  ['Contact', 'Contact'],
  ['Conditions d’utilisation', 'Terms of use'],
  ['Politique de confidentialité', 'Privacy policy'],
  ['Charte éditoriale sur l’IA', 'Editorial policy on AI'],
]

export default function Contraportada() {
  const [suscrito, setSuscrito] = useState(false)
  const t = useT()

  return (
    <footer id="contraportada" className={styles.contraportada}>
      <section className={styles.adelanto} aria-labelledby="proximo-numero">
        <div className={styles.adelantoTexto}>
          <span className={styles.kicker}>{t('PROCHAIN NUMÉRO · Nº 08 · DÉCEMBRE 2026', 'NEXT ISSUE · No. 08 · DECEMBER 2026')}</span>
          <h2 id="proximo-numero" className={styles.adelantoTitulo}>
            {t(<>Qu’y a-t-il au cœur d’une <em>étoile</em> à neutrons ?</>, <>What lies at the heart of a <em>neutron</em> star?</>)}
          </h2>
          <p>{t('Une matière plus dense que tout ce qui existe sur Terre. Disponible le [DATE].', 'Matter denser than anything that exists on Earth. Available on [DATE].')}</p>
        </div>

        {/* shortcut: no hay backend; el formulario solo confirma en pantalla. Conectar a un servicio de correo si se publica. */}
        <form
          className={styles.suscripcion}
          onSubmit={(e) => {
            e.preventDefault()
            setSuscrito(true)
          }}
        >
          <span className={styles.suscripcionTitulo}>{t('Recevez Point Bleu Pâle chaque mois, gratuitement.', 'Get Point Bleu Pâle every month, for free.')}</span>
          {suscrito ? (
            <p className={styles.gracias} role="status">{t('C’est noté ! Nous vous préviendrons à la sortie du prochain numéro.', 'Got it! We’ll let you know when the next issue comes out.')}</p>
          ) : (
            <>
              <label htmlFor="correo">{t('Adresse e-mail', 'Email address')}</label>
              <input id="correo" name="correo" type="email" required autoComplete="email" placeholder={t('vous@exemple.fr', 'you@example.com')} />
              <button type="submit">{t('M’abonner', 'Subscribe')}</button>
            </>
          )}
          <span className={styles.nota}>{t('Pas de spam. Désabonnement à tout moment.', 'No spam. Unsubscribe anytime.')}</span>
        </form>
      </section>

      <div className={styles.separador}><div /></div>

      <div className={styles.cuerpo}>
        <div className={styles.fila}>
          <Logo accent="var(--plasma)" large label={t('Point Bleu Pâle, retour à la couverture', 'Point Bleu Pâle, back to the cover')} />
          <div className={styles.redes}>
            {Object.entries(redes).map(([nombre, icono]) => (
              <a key={nombre} href="#" aria-label={t(...nombresRedes[nombre])}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">{icono}</svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t('Liens institutionnels', 'Institutional links')} className={styles.enlaces}>
          {enlaces.map(([fr, en]) => (
            <a key={fr} href="#">{t(fr, en)}</a>
          ))}
        </nav>

        <div className={styles.linea} />

        <div className={styles.pie}>
          <div className={styles.pieIzq}>
            <span>{t('Tous droits réservés', 'All rights reserved')} © 2026</span>
            <a href="#portada" className={styles.volver}>
              {t('Retour à la couverture', 'Back to the cover')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className={styles.pieDer}>
            <p>
              {t('Une publication de vulgarisation scientifique', 'An editorially independent')}
              <br />
              {t('éditorialement indépendante · [VILLE], Mexique.', 'popular-science publication · [CITY], Mexico.')}
            </p>
            <span className={styles.aliado}>{t('[LOGO PARTENAIRE]', '[PARTNER LOGO]')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
