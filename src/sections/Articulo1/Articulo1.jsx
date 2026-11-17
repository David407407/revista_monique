// Artículo 1: Trous noirs — responsable: David407407
// El texto vive en dos archivos, uno por idioma: Articulo1.fr.jsx y Articulo1.en.jsx.
// Los esquemas animados (Escenas.jsx) son los mismos en los dos y traducen sus rótulos solos.
import { useIdioma } from '../../components/Idioma/Idioma.jsx'
import Articulo1Fr from './Articulo1.fr.jsx'
import Articulo1En from './Articulo1.en.jsx'

export default function Articulo1() {
  const { idioma } = useIdioma()
  return idioma === 'en' ? <Articulo1En /> : <Articulo1Fr />
}
