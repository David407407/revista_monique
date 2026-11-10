// Orden de la revista. Cada sección vive en src/sections/<Nombre>/ y la edita solo su responsable.
import Navbar from './components/Navbar/Navbar.jsx'
import Portada from './sections/Portada/Portada.jsx'
import Indice from './sections/Indice/Indice.jsx'
import Articulo1 from './sections/Articulo1/Articulo1.jsx'
import Anuncio1 from './sections/Anuncio1/Anuncio1.jsx'
import Articulo2 from './sections/Articulo2/Articulo2.jsx'
import Articulo3 from './sections/Articulo3/Articulo3.jsx'
import Anuncio2 from './sections/Anuncio2/Anuncio2.jsx'
import Entrevista from './sections/Entrevista/Entrevista.jsx'
import Contraportada from './sections/Contraportada/Contraportada.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Portada />
        <Indice />
        <Articulo1 />
        <Anuncio1 />
        <Articulo2 />
        <Articulo3 />
        <Anuncio2 />
        <Entrevista />
      </main>
      <Contraportada />
    </>
  )
}
