// Artículo 1: Trous noirs — responsable: David407407
// Texto completo y esquema de scroll en texto.md. Esquemas animados en Escenas.jsx.
import Article from '../../components/Article/Article.jsx'
import m87Grande from '../../assets/articulo1/m87-2400.webp'
import m87Chica from '../../assets/articulo1/m87-1200.webp'
import { Comparador, EscenaEspagueti, EscenaLente, EscenaRio, EscenaSol, EscenaTierra, RelojEsquina, RelojesFinal } from './Escenas.jsx'
import estilosEscenas from './Escenas.module.css'


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
      titulo="Aller simple pour un trou noir"
      tituloJsx={<>Aller simple pour <em>un trou noir</em></>}
      auteur="[AUTEUR]"
      auteurBio="[BIO DE L’AUTEUR]."
      date="10 nov. 2026"
      lecture="7 MIN"
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
          <p>Attache ta ceinture : on part vers l’objet le plus extrême de l’Univers. Pas de retour prévu, mais promis, tu vas apprendre plein de choses en chemin.</p>

          <h2>Un trou… qui n’est pas un trou</h2>
          <p>Premier malentendu à régler avant le décollage : un trou noir n’est pas un trou. Ce n’est pas un tunnel, ni un vide. C’est exactement l’inverse : énormément de matière, écrasée dans un tout petit espace.</p>
          <p>Imagine qu’on prenne la Terre entière (les océans, les montagnes, ta maison, ton prof de maths) et qu’on la comprime de plus en plus fort. Pour en faire un trou noir, il faudrait la réduire à la taille d’une bille, de moins de 2 centimètres. Le Soleil, lui, deviendrait une boule d’environ 6 kilomètres de large. La taille d’une petite ville, pour un astre qui pourrait avaler un million de Terres.</p>
          <p>Quand la matière est aussi serrée, sa gravité devient si forte que rien ne peut s’en échapper. Pas même la lumière. Et si la lumière ne ressort pas, on ne voit rien : d’où le « noir ».</p>
          <EscenaTierra />

          <h2>Non, ce n’est pas un aspirateur</h2>
          <p><strong>Mythe :</strong> un trou noir aspire tout ce qui passe près de lui. <strong>Réalité :</strong> un trou noir attire les choses exactement comme n’importe quel objet de la même masse. Pas plus.</p>
          <p>Faisons une expérience (dans notre tête, heureusement). Remplaçons le Soleil par un trou noir qui a exactement la même masse. Que se passe-t-il pour la Terre ? Rien. Elle continue de tourner sur la même orbite, au même rythme, comme si de rien n’était.</p>
          <p>Enfin… presque rien. Il n’y aurait plus de lumière ni de chaleur. On vivrait dans le noir, à moins 200 degrés. Mais au moins, on ne serait pas aspirés.</p>
          <p>Le vrai danger, c’est de s’approcher trop près. Et c’est justement ce qu’on va faire.</p>
          <EscenaSol />

          <h2>La porte sans retour</h2>
          <p>Autour de chaque trou noir, il y a une frontière invisible : l’horizon des événements. Ce n’est pas un mur, ni une surface. C’est une limite. De l’extérieur, on peut encore s’en aller. Une fois de l’autre côté, c’est fini. Rien ne ressort, jamais.</p>
          <p>Les physiciens aiment l’expliquer avec une rivière. Imagine que l’espace coule vers le trou noir comme l’eau d’une rivière vers une cascade. Loin de la chute, un poisson nage sans problème à contre-courant. Plus il s’approche, plus le courant accélère. À un certain point, l’eau va plus vite que le poisson ne peut nager : même en donnant tout, il recule.</p>
          <p>L’horizon des événements, c’est cet endroit. Là, l’espace « coule » plus vite que la lumière ne peut avancer. Et comme rien ne va plus vite que la lumière… rien ne peut remonter.</p>
          <EscenaRio />

          <h2>Attention, tu vas devenir un spaghetti</h2>
          <p>Imaginons que tu tombes les pieds en avant. Tes pieds sont un peu plus près du trou noir que ta tête, donc ils sont tirés un peu plus fort. Sur Terre, cette différence est minuscule. Près d’un trou noir, elle devient énorme : tes pieds sont tirés beaucoup plus fort que ta tête, et tu t’étires. Encore. Et encore. Jusqu’à ressembler à un spaghetti.</p>
          <p>Les scientifiques appellent vraiment ça la « spaghettification ». Promis, ce n’est pas une blague.</p>
          <p>Mais voici le paradoxe : ce sont les petits trous noirs les plus dangereux. Avec un trou noir de la masse de quelques soleils, tu serais étiré bien avant d’atteindre l’horizon. Avec un trou noir géant, des millions de fois plus lourd, l’étirement est si doux au niveau de l’horizon que tu le traverserais sans rien sentir. Les géants sont, en quelque sorte, les plus « gentils ».</p>
          <EscenaEspagueti />
          <RelojEsquina />
        </>
      }
      notas={[
        'Horizon des événements : la frontière au-delà de laquelle rien, pas même la lumière, ne peut ressortir.',
        'Singularité : le point central où toute la matière est écrasée. Personne ne sait encore vraiment ce qui s’y passe.',
        'Disque d’accrétion : le gaz qui tourne autour du trou noir à toute vitesse et chauffe au point de briller.',
        'Les trous noirs et les fluides ont plus en commun qu’on ne le croit. On en parle avec un vrai spécialiste dans l’interview, à la fin du numéro.',
      ]}
      figura={{
        svg: <Anatomie />,
        pie: 'Fig. 6 — Anatomie d’un trou noir (schéma, pas à l’échelle). © Point Bleu Pâle',
      }}
      cuerpoFinal={
        <>
          <h2>Hollywood a dessiné un trou noir avant tout le monde</h2>
          <p>En 2014, le film <em>Interstellar</em> a montré au cinéma un trou noir géant appelé Gargantua. Et ce n’était pas qu’un joli effet spécial.</p>
          <p>Derrière le film, il y avait un vrai physicien : Kip Thorne, l’un des plus grands spécialistes des trous noirs, qui recevra plus tard le prix Nobel de physique (en 2017). Sa condition pour participer : rien dans le film ne devait contredire les lois de la physique.</p>
          <p>Alors l’équipe des effets visuels n’a pas dessiné Gargantua. Elle l’a calculé. Les programmeurs ont utilisé les équations d’Einstein pour suivre le trajet de millions de rayons de lumière autour du trou noir. Certaines images ont demandé des dizaines d’heures de calcul.</p>
          <p>Le résultat les a surpris eux-mêmes. Le disque de gaz brûlant qui tourne autour du trou noir n’apparaît pas seulement devant lui : on le voit aussi au-dessus et en dessous. En réalité, on voit l’arrière du disque, parce que la gravité courbe sa lumière et la fait passer par-dessus le trou noir, comme un pont. Ce rendu était tellement précis que l’équipe a publié un véritable article scientifique en 2015.</p>
          <EscenaLente />
          <p>Un film qui finit dans une revue scientifique. Ça n’arrive pas tous les jours.</p>

          <h2>Cinq ans plus tard, la vraie photo</h2>
          <p>Le 10 avril 2019, le monde a découvert la première vraie image d’un trou noir. Elle a été prise par l’Event Horizon Telescope : huit radiotélescopes répartis sur la planète, qui ont travaillé ensemble comme un seul télescope de la taille de la Terre.</p>
          <p>Le trou noir s’appelle M87*. Il est 6,5 milliards de fois plus lourd que le Soleil et se trouve à 55 millions d’années-lumière. Sur la photo : un anneau orangé autour d’une ombre noire. Exactement l’idée d’<em>Interstellar</em>.</p>
          <Comparador />
          <p>Mais compare bien les deux images. Sur la vraie photo, un côté de l’anneau est beaucoup plus brillant que l’autre. C’est normal : le gaz tourne à toute vitesse, et le côté qui vient vers nous brille davantage. Les créateurs du film le savaient… et l’ont enlevé exprès, pour que le public ne soit pas perdu.</p>
          <p>Le film a eu presque tout bon. Sauf ce détail.</p>
          <p>En 2022, la même équipe a photographié Sagittarius A*, le trou noir qui se trouve au centre de notre propre galaxie. Il pèse environ 4 millions de soleils. Rassure-toi : il est à environ 26 000 années-lumière. Il ne viendra pas nous chercher.</p>

          <h2>Et le temps, dans tout ça ?</h2>
          <p className={estilosEscenas.soloInmersivo}>Tu as remarqué la petite horloge, dans le coin de l’écran ? Elle ralentit depuis le début. Ce n’est pas un bug.</p>
          <p>Près d’un trou noir, le temps s’écoule plus lentement que loin de lui. Pas dans ta tête : pour de vrai. Si tu pouvais rester un moment près de l’horizon puis revenir sur Terre, tes amis auraient vieilli beaucoup plus que toi.</p>
          <p>Dans <em>Interstellar</em>, les héros passent environ une heure sur la planète de Miller, en orbite autour de Gargantua. Pendant ce temps, sur Terre, sept ans s’écoulent. C’est extrême, mais Kip Thorne a fait les calculs : c’est possible si le trou noir tourne sur lui-même presque à la vitesse maximale autorisée par la physique.</p>
          <RelojesFinal />
          <p>Comment le temps peut-il ralentir ? Ça, c’est une autre histoire. Et elle t’attend un peu plus loin dans ce numéro.</p>
        </>
      }
      sources={[
        'Event Horizon Telescope — eventhorizontelescope.org (images de M87* et de Sagittarius A*).',
        'Kip Thorne, La Science d’Interstellar, 2014.',
        'O. James, E. von Tunzelmann, P. Franklin, K. S. Thorne, « Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar », Classical and Quantum Gravity, 2015.',
        'NASA — « Black Holes », science.nasa.gov.',
      ]}
      anterior={{ href: '#indice', titulo: 'Sommaire' }}
      siguiente={{ href: '#nebulosas', seccion: 'Nébuleuses', titulo: 'Là où naissent les étoiles' }}
    />
  )
}
