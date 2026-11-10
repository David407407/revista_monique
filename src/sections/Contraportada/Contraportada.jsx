// Contraportada (footer) — responsable: David407407
import { useState } from 'react'
import Logo from '../../components/Logo/Logo.jsx'
import styles from './Contraportada.module.css'

const redes = {
  'Flux RSS': <><path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><circle cx="6" cy="18" r="2" fill="currentColor" /></>,
  'Vidéo': <path d="M7 4l13 8-13 8z" fill="currentColor" />,
  'Photographie': <><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.4" /></>,
  'Podcast': <><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></>,
  'E-mail': <><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2.4" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /></>,
  'Newsletter': <><rect x="5" y="3" width="14" height="18" rx="2" fill="currentColor" /><path d="M8 8h8M8 12h8M8 16h5" stroke="var(--grafito)" strokeWidth="2" strokeLinecap="round" /></>,
}

const enlaces = ['À propos de Point Bleu Pâle', 'Archives', 'Contact', 'Conditions d’utilisation', 'Politique de confidentialité', 'Charte éditoriale sur l’IA']

export default function Contraportada() {
  const [suscrito, setSuscrito] = useState(false)

  return (
    <footer id="contraportada" className={styles.contraportada}>
      <section className={styles.adelanto} aria-labelledby="proximo-numero">
        <div className={styles.adelantoTexto}>
          <span className={styles.kicker}>PROCHAIN NUMÉRO · Nº 08 · DÉCEMBRE 2026</span>
          <h2 id="proximo-numero" className={styles.adelantoTitulo}>
            Qu’y a-t-il au cœur d’une <em>étoile</em> à neutrons ?
          </h2>
          <p>Une matière plus dense que tout ce qui existe sur Terre. Disponible le [DATE].</p>
        </div>

        {/* shortcut: no hay backend; el formulario solo confirma en pantalla. Conectar a un servicio de correo si se publica. */}
        <form
          className={styles.suscripcion}
          onSubmit={(e) => {
            e.preventDefault()
            setSuscrito(true)
          }}
        >
          <span className={styles.suscripcionTitulo}>Recevez Point Bleu Pâle chaque mois, gratuitement.</span>
          {suscrito ? (
            <p className={styles.gracias} role="status">C’est noté ! Nous vous préviendrons à la sortie du prochain numéro.</p>
          ) : (
            <>
              <label htmlFor="correo">Adresse e-mail</label>
              <input id="correo" name="correo" type="email" required autoComplete="email" placeholder="vous@exemple.fr" />
              <button type="submit">M’abonner</button>
            </>
          )}
          <span className={styles.nota}>Pas de spam. Désabonnement à tout moment.</span>
        </form>
      </section>

      <div className={styles.separador}><div /></div>

      <div className={styles.cuerpo}>
        <div className={styles.fila}>
          <Logo accent="var(--plasma)" large label="Point Bleu Pâle, retour à la couverture" />
          <div className={styles.redes}>
            {Object.entries(redes).map(([nombre, icono]) => (
              <a key={nombre} href="#" aria-label={nombre}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">{icono}</svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Liens institutionnels" className={styles.enlaces}>
          {enlaces.map((e) => (
            <a key={e} href="#">{e}</a>
          ))}
        </nav>

        <div className={styles.linea} />

        <div className={styles.pie}>
          <div className={styles.pieIzq}>
            <span>Tous droits réservés © 2026</span>
            <a href="#portada" className={styles.volver}>
              Retour à la couverture
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className={styles.pieDer}>
            <p>
              Une publication de vulgarisation scientifique
              <br />
              éditorialement indépendante · [VILLE], Mexique.
            </p>
            <span className={styles.aliado}>[LOGO PARTENAIRE]</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
