// Entrevista: doctor en mecánica de fluidos — responsable: compañero
// El texto vive en dos archivos, uno por idioma: Entrevista.fr.jsx y Entrevista.en.jsx.
// Humo, Pizarron y Tarjetas son los mismos en los dos y traducen sus rótulos solos.
import { useIdioma } from '../../components/Idioma/Idioma.jsx'
import EntrevistaFr from './Entrevista.fr.jsx'
import EntrevistaEn from './Entrevista.en.jsx'

export default function Entrevista() {
  const { idioma } = useIdioma()
  return idioma === 'en' ? <EntrevistaEn /> : <EntrevistaFr />
}
