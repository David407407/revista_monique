// Artículo 3: Le temps dans le cosmos — responsable: compañero
// Usa la plantilla compartida Article (mismo patrón que Articulo1). Fotos en src/assets/articulo3/.
// Las fotos flotan a un lado del texto; en pantalla ancha salen hacia la columna vacía.
// Los módulos interactivos están en Modulos.jsx y se ocultan en modo Simple.
import Article from '../../components/Article/Article.jsx'
import heroGrande from '../../assets/articulo3/hero-cas-a-2000.webp'
import heroChica from '../../assets/articulo3/hero-cas-a-1200.webp'
import gatoGrande from '../../assets/articulo3/cats-paw-1440.webp'
import gatoChica from '../../assets/articulo3/cats-paw-800.webp'
import cangrejoGrande from '../../assets/articulo3/crab-1440.webp'
import cangrejoChica from '../../assets/articulo3/crab-800.webp'
import espiralGrande from '../../assets/articulo3/spiral-1280.webp'
import espiralChica from '../../assets/articulo3/spiral-800.webp'
import ngc1068 from '../../assets/articulo3/ngc-1068-864.webp'
import { EscalaTiempo, ModuloCarrera, ModuloGalaxia, ModuloGps, ModuloMachine } from './Modulos.jsx'
import styles from './Articulo3.module.css'

// Créditos según la ficha oficial de cada imagen
const CREDITOS = {
  casA: 'NASA/CXC/SAO, NASA/ESA/STScI, NASA/ESA/CSA/STScI/Milisavljevic et al., NASA/JPL/Caltech',
  gato: 'NASA, ESA, CSA, STScI',
  // Verificar en la ficha de la imagen al descargarla
  cangrejo: 'NASA, ESA, CSA, STScI, T. Temim (Princeton University)',
  ngc1068: 'ESA/Webb, NASA & CSA, J. Lee et l’équipe PHANGS-JWST',
}

function Foto({ src, srcSet, width, height, alt, pie, credito, lado = 'derecha', recorte = false }) {
  return (
    <figure className={`${styles.foto} ${styles[lado]} ${recorte ? styles.recorte : ''}`}>
      <img src={src} srcSet={srcSet} sizes="(max-width: 640px) 100vw, 400px" width={width} height={height} alt={alt} loading="lazy" decoding="async" />
      <figcaption>
        {pie}
        <span className={styles.credito}>Image : {credito}</span>
      </figcaption>
    </figure>
  )
}

const H2 = ({ children }) => <h2 className={styles.limpiar}>{children}</h2>

export default function Articulo3() {
  return (
    <Article
      id="tiempo"
      variante="afilado"
      numero="06 / 09"
      seccion="Temps"
      // Verde «old money»: inglés profundo sobre papel, salvia claro sobre fondo oscuro
      // El título sobre la foto va en oro cálido: resalta contra los azules y rosas de Cassiopée A
      acento={{ oscuro: '#b3c8b4', papel: '#2f5b44', titulo: '#f6c978' }}
      titulo="Le temps dans le cosmos"
      tituloJsx={<>Le temps <em>dans le cosmos</em></>}
      auteur="Baruc Bazán"
      auteurBio="Élève et co-auteur de Point Bleu Pâle."
      date="10 nov. 2026"
      lecture="8 MIN"
      tags={['temps', 'lumière', 'relativité']}
      hero={{
        src: heroGrande,
        srcSet: `${heroChica} 1200w, ${heroGrande} 2000w`,
        alt: 'Reste de supernova : une grande bulle de gaz en filaments bleus, roses et violets, sur un fond noir parsemé d’étoiles.',
        credito: `Image : Cassiopée A — ${CREDITOS.casA}`,
        posicion: '50% 50%',
      }}
      cuerpo={
        <>
          <p>Pas besoin de machine à remonter le temps : il suffit de lever les yeux. La lumière des étoiles et des galaxies nous raconte le passé de l’Univers, et elle nous apprend à mesurer ses durées, du clin d’œil au milliard d’années.</p>

          <h2>Les télescopes, des machines à remonter le temps</h2>
          <p>La lumière n’arrive jamais instantanément. Elle voyage à environ 300 000 kilomètres par seconde : c’est très rapide, mais pas infini. C’est pour ça que le Soleil que tu vois est le Soleil d’il y a un peu plus de huit minutes. Pour des objets plus lointains, le retard devient immense.</p>
          <p>La nébuleuse de la Patte de Chat se trouve à environ 5 500 années-lumière. La lumière qu’on en reçoit aujourd’hui est partie à l’époque où apparaissaient les premières villes et l’écriture, en Mésopotamie. La galaxie NGC 1068, à environ 47 millions d’années-lumière, nous montre une lumière partie quand les mammifères modernes commençaient tout juste à se diversifier.</p>
          <ModuloMachine />
          <p>Et ce n’est pas fini. Sur les photos des grands télescopes, beaucoup des minuscules taches du fond sont des galaxies bien plus lointaines, dont la lumière est partie il y a des milliards d’années. Chaque point lumineux est un instant du passé. Observer le ciel, c’est fouiller dans des archives.</p>
        </>
      }
      notas={[
        'Année-lumière : la distance que parcourt la lumière en un an, environ 9 500 milliards de kilomètres. C’est une distance, pas une durée !',
        'Supernova (au pluriel, supernovæ) : l’explosion d’une étoile massive en fin de vie.',
        'Pulsar : le cœur écrasé d’une étoile qui a explosé. Il tourne très vite et balaie l’espace de faisceaux, comme un phare.',
        'Nanoseconde : un milliardième de seconde. Microseconde : un millionième de seconde.',
      ]}
      figura={{
        svg: <EscalaTiempo />,
        pie: 'Fig. 2 — Les durées que tu vas croiser dans cet article, sur une même règle. Chaque graduation multiplie le temps par 1 000. Schéma. © Point Bleu Pâle',
      }}
      cuerpoFinal={
        <>
          <H2>Des étoiles pressées</H2>
          <Foto
            lado="derecha"
            src={gatoGrande}
            srcSet={`${gatoChica} 800w, ${gatoGrande} 1440w`}
            width={1440}
            height={1581}
            alt="Nébuleuse de gaz orange et bleu avec des étoiles brillantes et des colonnes de poussière sombre."
            pie="Fig. 3 — La nébuleuse de la Patte de Chat, une pouponnière d’étoiles observée en infrarouge."
            credito={CREDITOS.gato}
          />
          <p>Le Soleil vivra environ 10 milliards d’années. Une étoile massive, elle, peut ne vivre que quelques millions d’années : un simple battement de cils, à l’échelle du cosmos.</p>
          <p>Pourquoi ? Plus une étoile est lourde, plus vite elle consomme son combustible. Un peu comme une voiture de course : son réservoir est plus gros que celui d’une petite citadine, mais elle le vide bien plus vite. Et beaucoup de ces étoiles pressées finissent par exploser en supernovæ.</p>
          <p>Des régions comme la Patte de Chat, où le gaz se condense pour former des étoiles, sont de véritables « pouponnières ». Et on les observe presque en direct : quelques milliers d’années de retard, ce n’est rien pour des étoiles qui vivent des millions d’années.</p>
          <ModuloCarrera />
          <p>Les plus massives des étoiles qui naissent dans la Patte de Chat vivront vite et mourront jeunes. Leurs explosions rendront à l’espace les éléments lourds qui formeront un jour de nouvelles planètes. Le recyclage, version cosmique.</p>

          <H2>Une explosion en différé</H2>
          <Foto
            lado="izquierda"
            src={cangrejoGrande}
            srcSet={`${cangrejoChica} 800w, ${cangrejoGrande} 1440w`}
            width={1440}
            height={1254}
            alt="Nuage de gaz en forme de cage, aux filaments orange et rouges, rempli d’une brume blanche et bleutée, sur un fond noir étoilé."
            pie="Fig. 5 — La nébuleuse du Crabe, les restes de la supernova de 1054, vue en infrarouge."
            credito={CREDITOS.cangrejo}
          />
          <p>Le 4 juillet 1054, des astronomes chinois notent l’apparition d’une « étoile invitée » dans la constellation du Taureau. Elle brille si fort qu’on la voit en plein jour pendant 23 jours, et la nuit pendant presque deux ans. Ce qu’ils observent, c’est une supernova : l’explosion d’une étoile environ dix fois plus lourde que le Soleil.</p>
          <p>Les restes de cette explosion forment aujourd’hui la nébuleuse du Crabe : un nuage de gaz en filaments qui continue de grossir à environ 1 500 kilomètres par seconde. En son centre, il reste le cœur de l’étoile, écrasé en une boule d’une vingtaine de kilomètres qui tourne sur elle-même environ 30 fois par seconde : un pulsar.</p>
          <p>Mais le plus fou, c’est le calendrier. La nébuleuse du Crabe se trouve à environ 6 500 années-lumière. La lumière de l’explosion a donc mis 6 500 ans à arriver jusqu’à nous. L’étoile avait en réalité explosé il y a environ 7 500 ans, bien avant la construction des pyramides. En 1054, les astronomes chinois regardaient une rediffusion.</p>
          <p>Et si une étoile explosait là-bas aujourd’hui ? On ne le saurait que dans 6 500 ans, vers l’an 8500. Le ciel, c’est un match en différé : on découvre le résultat longtemps après la fin. Bételgeuse, l’épaule rouge d’Orion, finira elle aussi en supernova. Elle est à environ 550 années-lumière : si elle a explosé il y a deux siècles, la nouvelle est encore en route.</p>

          <H2>L’année cosmique</H2>
          <Foto
            lado="derecha"
            src={espiralGrande}
            srcSet={`${espiralChica} 800w, ${espiralGrande} 1280w`}
            width={1280}
            height={1194}
            alt="Galaxie spirale aux bras de poussière orange et aux jeunes étoiles brillantes."
            pie="Fig. 6 — La galaxie spirale NGC 2283. Une galaxie comme celle-ci met des centaines de millions d’années à faire un tour complet."
            credito="ESA/Webb, NASA & CSA, A. Leroy"
          />
          <p>Les galaxies tournent, mais avec une lenteur difficile à imaginer. À sa distance du centre, le Soleil (et nous avec lui) met environ 230 millions d’années à faire le tour de la Voie lactée : c’est ce qu’on appelle une « année cosmique ».</p>
          <p>Âgé d’environ 4,6 milliards d’années, le Soleil a donc fait une vingtaine de tours. La dernière fois qu’il se trouvait à cet endroit de la galaxie, les premiers dinosaures faisaient à peine leur apparition. Toute l’histoire humaine tient dans une fraction minuscule d’une seule année cosmique.</p>
          <ModuloGalaxia />

          <H2>Quand le temps ne s’écoule pas de la même façon</H2>
          <p>Jusqu’ici, on a parlé du temps comme s’il était le même pour tout le monde. Ce n’est pas le cas. Einstein a montré que le temps s’écoule à des rythmes différents selon la vitesse à laquelle on se déplace et la gravité que l’on subit.</p>
          <p>La relativité restreinte (1905) affirme qu’une horloge en mouvement rapide avance plus lentement qu’une horloge au repos. La relativité générale (1915) ajoute que la gravité ralentit aussi le temps : une horloge proche d’un objet massif bat plus lentement qu’une horloge éloignée.</p>
          <p>Ce n’est pas qu’une théorie écrite sur un tableau. En 1971, les physiciens Hafele et Keating ont embarqué des horloges atomiques dans des avions de ligne. En les comparant à une horloge restée au sol, ils ont mesuré des écarts de quelques dizaines à quelques centaines de nanosecondes, conformes aux prédictions de la théorie.</p>
          <p>Et chaque fois que tu utilises le GPS, la relativité travaille pour toi. Les horloges des satellites subissent les deux effets : la gravité, plus faible là-haut, les fait avancer ; leur vitesse les fait retarder. Bilan : environ 38 microsecondes d’écart par jour. Ça paraît ridicule, mais sans correction, l’erreur de position augmenterait d’environ 10 kilomètres chaque jour.</p>
          <ModuloGps />
          <Foto
            lado="izquierda"
            src={ngc1068}
            width={864}
            height={974}
            alt="Galaxie spirale vue de face, au noyau très lumineux et avec un jet rosé en son centre."
            pie="Fig. 9 — NGC 1068, une galaxie active : en son cœur se cache un trou noir supermassif."
            credito={CREDITOS.ngc1068}
          />
          <p>Les effets les plus extrêmes se produisent près d’un trou noir, comme celui de NGC 1068. Comme on l’a vu dans <a href="#agujeros-negros">l’article sur les trous noirs</a>, pour un observateur lointain, une horloge placée près de l’horizon des événements avancerait de plus en plus lentement.</p>
          <p>C’est l’idée du film <em>Interstellar</em>, où une heure sur une planète proche du trou noir équivaut à sept ans sur Terre. La physique derrière cette scène est plausible, même si elle exige des conditions extrêmes. On t’avait promis d’expliquer comment le temps peut ralentir : promesse tenue.</p>
          <p>Du satellite GPS qui tourne au-dessus de ta tête à une galaxie située à 47 millions d’années-lumière, le temps fait partie de la structure même de l’Univers. Un Univers dont l’histoire s’étend sur environ 13,8 milliards d’années. Toi, tu viens d’en passer quelques minutes ici. Bien joué.</p>
          <div className={styles.limpiar} />
        </>
      }
      sources={[
        'J. C. Hafele et R. E. Keating, « Around-the-World Atomic Clocks », Science, 1972.',
        'N. Ashby, « Relativity in the Global Positioning System », Living Reviews in Relativity, 2003.',
        'Chandra/NASA — chandra.harvard.edu/photo/2024/casa (image de Cassiopée A).',
        'ESA/Webb — esawebb.org/images/weic2513a (nébuleuse de la Patte de Chat).',
        'NASA/Webb — image de la nébuleuse du Crabe (2023).',
        'D. A. Green et F. R. Stephenson, « Historical Supernovae », 2003 (supernova de 1054).',
        'ESA/Webb — esawebb.org (image de NGC 2283).',
        'ESA/Webb — esawebb.org, image du mois de janvier 2023 (NGC 1068 / M77).',
        'Kip Thorne, La Science d’Interstellar, 2014.',
      ]}
      anterior={{ href: '#nebulosas', titulo: 'Les piliers de la création' }}
      siguiente={{ href: '#entrevista', seccion: 'Entretien', titulo: '[NOM DU DOCTEUR] et les fluides de l’univers' }}
    />
  )
}
