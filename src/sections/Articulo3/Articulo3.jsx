// Artículo 3: Le temps dans le cosmos — responsable: compañero
// El texto vive en dos archivos, uno por idioma: Articulo3.fr.jsx y Articulo3.en.jsx.
// Los módulos interactivos (Modulos.jsx) son los mismos en los dos y traducen sus textos solos.
import { useIdioma } from '../../components/Idioma/Idioma.jsx'
import Articulo3Fr from './Articulo3.fr.jsx'
import Articulo3En from './Articulo3.en.jsx'

export default function Articulo3() {
  const { idioma } = useIdioma()
  return idioma === 'en' ? <Articulo3En /> : <Articulo3Fr />
}
