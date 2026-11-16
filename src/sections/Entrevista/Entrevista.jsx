// Entrevista — responsable: compañero
import { useT } from '../../components/Idioma/Idioma.jsx'
export default function Entrevista() {
  const t = useT()
  return (
    <section id="entrevista" aria-label={t('Entretien', 'Interview')} style={{ minHeight: "60vh", padding: 24, color: "var(--papel)" }}>
      <h2>{t('Entretien', 'Interview')}</h2>
    </section>
  )
}
