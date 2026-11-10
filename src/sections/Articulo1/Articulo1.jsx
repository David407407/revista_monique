// Artículo 1: Trous noirs — responsable: David407407
// Texto provisional (lorem ipsum) hasta tener el artículo final en francés.
import Article from '../../components/Article/Article.jsx'
import m87Grande from '../../assets/articulo1/m87-2400.webp'
import m87Chica from '../../assets/articulo1/m87-1200.webp'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// Esquema de las partes de un agujero negro (no está a escala)
function Anatomie() {
  const texto = { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, fontWeight: 600, fill: '#F6F1E4' }
  const linea = { stroke: '#9FB3AD', strokeWidth: 1 }
  return (
    <svg viewBox="0 0 1000 420" role="img" aria-label="Schéma d’un trou noir : au centre la singularité, entourée de l’horizon des événements, de la sphère de photons et du disque d’accrétion.">
      <ellipse cx="500" cy="210" rx="330" ry="70" stroke="#FF7A1A" strokeWidth="18" strokeOpacity="0.35" fill="none" />
      <ellipse cx="500" cy="210" rx="330" ry="70" stroke="#FF7A1A" strokeWidth="2" fill="none" />
      <circle cx="500" cy="210" r="118" stroke="#7FE3D0" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
      <circle cx="500" cy="210" r="80" fill="#050505" stroke="#F6F1E4" strokeWidth="1.5" />
      <circle cx="500" cy="210" r="4" fill="#F6F1E4" />

      <path d="M500 210 L640 360 H760" {...linea} fill="none" />
      <text x="770" y="365" {...texto}>Singularité</text>
      <path d="M445 152 L340 70 H220" {...linea} fill="none" />
      <text x="70" y="75" {...texto}>Horizon des événements</text>
      <path d="M600 140 L680 60 H760" {...linea} fill="none" />
      <text x="770" y="65" {...texto}>Sphère de photons</text>
      <path d="M190 225 L120 330 H80" {...linea} fill="none" />
      <text x="20" y="360" {...texto}>Disque d’accrétion</text>
    </svg>
  )
}

export default function Articulo1() {
  return (
    <Article
      id="agujeros-negros"
      numero="03 / 09"
      seccion="Trous noirs"
      acento={{ oscuro: 'var(--biolum)', papel: 'var(--biolum-papel)' }}
      titulo="Ce que contient un trou noir"
      tituloJsx={<>Ce que contient <em>un trou noir</em></>}
      auteur="[AUTEUR]"
      auteurBio="[BIO DE L’AUTEUR]. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      date="10 nov. 2026"
      lecture="[X] MIN"
      tags={['trous noirs', 'gravité', 'relativité']}
      hero={{
        src: m87Grande,
        srcSet: `${m87Chica} 1200w, ${m87Grande} 2400w`,
        alt: 'Première image d’un trou noir : un anneau orangé lumineux autour d’une ombre sombre, au centre de la galaxie M87.',
        credito: 'Image : EHT Collaboration',
        posicion: '50% 62%',
      }}
      cuerpo={
        <>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <h2>Une porte sans retour</h2>
          <p>{lorem}</p>
          <p>{lorem}</p>
        </>
      }
      notas={[
        'Horizon des événements : lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Singularité : integer nec odio praesent libero sed cursus.',
        'Disque d’accrétion : sed nisi nulla quis sem at nibh elementum.',
      ]}
      cita={{ texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', autor: '[NOM], [FONCTION]' }}
      figura={{
        svg: <Anatomie />,
        pie: 'Fig. 1 — Anatomie d’un trou noir (schéma, pas à l’échelle). © Point Bleu Pâle',
      }}
      cuerpoFinal={
        <>
          <h2>Ce que l’on peut voir</h2>
          <p>{lorem}</p>
          <p>{lorem}</p>
        </>
      }
      sources={[
        'Lorem ipsum dolor sit amet — [SOURCE], [ANNÉE].',
        'Consectetur adipiscing elit — [SOURCE], [ANNÉE].',
      ]}
      anterior={{ href: '#indice', titulo: 'Sommaire' }}
      siguiente={{ href: '#nebulosas', seccion: 'Nébuleuses', titulo: 'Là où naissent les étoiles' }}
    />
  )
}
