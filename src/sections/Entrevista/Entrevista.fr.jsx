// Entrevista: doctor en mecánica de fluidos — responsable: compañero
// Versión en francés. La versión en inglés está en Entrevista.en.jsx; Entrevista.jsx elige según el idioma.
// Entrevista hecha en español y traducida al francés. Las respuestas citan al doctor (solo se corrigieron
// gramática y muletillas del habla); no se cambian sus afirmaciones. Las «N.d.l.r.» (notes de la rédaction)
// son de la redacción: aclaran términos o precisan datos con fuente.
// Estructura: apertura oscura con el humo de la vela → la respuesta en dos palabras → retrato en el pizarrón →
// bloques de preguntas → preguntas rápidas en tarjetas → cierre compartido <Cierre>.
import Cierre from '../../components/Cierre/Cierre.jsx'
import Humo from './Humo.jsx'
import Pizarron from './Pizarron.jsx'
import Tarjetas from './Tarjetas.jsx'
import retratoGrande from '../../assets/entrevista/rigoberto-ortega-chavez-1200.webp'
import retratoChico from '../../assets/entrevista/rigoberto-ortega-chavez-800.webp'
import styles from './Entrevista.module.css'

const DOCTOR = 'Rigoberto Ortega Chavez'

// Foto del doctor (WebP en src/assets/entrevista/). Si se quita (null), solo se ve el pizarrón con su nombre.
const RETRATO = {
  src: retratoGrande,
  srcSet: `${retratoChico} 800w, ${retratoGrande} 1200w`,
  width: 1200,
  height: 1600,
  alt: 'Rigoberto Ortega Chavez sourit, debout devant un tableau blanc couvert d’équations sur la mécanique des fluides relativistes.',
  credito: 'Point Bleu Pâle',
}

const TITULO = 'De la douche à Jupiter'

function Sommaire() {
  return (
    <a href="#indice" className={styles.sommaire}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" /></svg>
      Sommaire
    </a>
  )
}

// Una pregunta con su respuesta y, opcional, una nota de la redacción al margen
function QR({ q, nota, children }) {
  return (
    <div className={styles.fila}>
      <div className={styles.dialogo}>
        <h3 className={styles.pregunta}>{q}</h3>
        <div className={styles.respuesta}>{children}</div>
      </div>
      {nota && (
        <aside className={styles.ndlr} aria-label="Note de la rédaction">
          <span className={styles.ndlrEtiqueta}>N.d.l.r.</span>
          {nota}
        </aside>
      )}
    </div>
  )
}

function Bloque({ titulo, children }) {
  return (
    <>
      <div className={styles.fila}>
        <h2 className={styles.bloqueTitulo}>{titulo}</h2>
      </div>
      {children}
    </>
  )
}

function Cita({ children }) {
  return (
    <blockquote className={styles.cita}>
      <p>« {children} »</p>
      <footer>{DOCTOR}</footer>
    </blockquote>
  )
}

const RAPIDAS = [
  { pregunta: 'Votre fluide préféré ?', respuesta: 'L’eau.', detalle: 'La réponse la plus courte de l’entretien.' },
  { pregunta: 'Un film qui a bien traité la physique ?', respuesta: 'Interstellar.', detalle: 'Nous en parlons dans notre article sur le temps.' },
  { pregunta: 'Et un film qui l’a mal traitée ?', respuesta: 'Tous les Marvel.', detalle: 'Et, plus largement, les films de super-héros.' },
  { pregunta: 'Un phénomène de l’Univers à observer de près ?', respuesta: 'Tout ce qui se passe dans la couche externe du Soleil.', detalle: 'C’est là qu’interviennent la mécanique des fluides et l’électromagnétisme.' },
]

export default function EntrevistaFr() {
  return (
    <article id="entrevista" className={styles.entrevista} aria-labelledby="entrevista-titre">
      <header className={styles.apertura}>
        <div className={styles.cabecera}>
          <div className={styles.cabeceraIzq}>
            <span className={styles.numero}>08 / 09</span>
            <span className={styles.seccion}>Entretien</span>
          </div>
          <Sommaire />
        </div>

        <div className={styles.aperturaTexto}>
          <h1 id="entrevista-titre" className={styles.titulo}>De la douche <em>à Jupiter</em></h1>
          <p className={styles.bajada}>
            Pourquoi l’eau de la douche sort-elle parfois en filets ? Pourquoi la Grande Tache rouge de Jupiter tourne-t-elle depuis des siècles ? Pour comprendre tout ce qui coule, souffle et tourbillonne, nous avons interrogé {DOCTOR}, docteur en mécanique des fluides.
          </p>
          <span className={styles.firma}>Entretien · Propos recueillis par Baruc Bazan et Andy Tarango</span>
        </div>

        <figure className={styles.vela}>
          <Humo className={styles.lienzo} />
          <figcaption>La fumée d’une bougie monte d’abord en un filet bien droit, puis se met à tourbillonner. Nous y reviendrons plus bas.</figcaption>
        </figure>
      </header>

      <div className={styles.rejilla}>
        <div className={styles.fila}>
          <aside className={styles.metadatos} aria-label="Informations">
            <span className={styles.mono}>
              LECTURE · 9 MIN
              <br />
              SECTION · ENTRETIEN
              <br />
              Nº 07 · NOV. 2026
            </span>
            <p className={styles.metaTexto}>Entretien réalisé en espagnol et traduit par la rédaction. Les notes « N.d.l.r. » sont de la rédaction.</p>
          </aside>
          <div className={`${styles.dialogo} ${styles.intro}`}>
            <h3 className={styles.pregunta}>Comment expliqueriez-vous votre métier à quelqu’un de notre âge, en une phrase ?</h3>
            <p className={styles.motUnique}>« Divertissant. Amusant. »</p>
            <p className={styles.apresMot}>Nous lui demandions une phrase ; deux mots lui ont suffi.</p>
          </div>
        </div>

        <div className={`${styles.fila} ${styles.filaRetrato}`}>
          <div className={styles.retratoAncho}>
            <Pizarron nombre={DOCTOR} titulo="Docteur en mécanique des fluides" retrato={RETRATO} />
          </div>
        </div>

        <Bloque titulo="Le déclic">
          <QR q="Y a-t-il eu un moment, ou quelque chose que vous avez vu, qui vous a donné envie d’étudier les fluides ?">
            <p>Un livre de mécanique classique, dans la partie consacrée aux fluides. Je l’ai trouvée bien plus intéressante dans ce livre qu’en cours, à l’université. J’étais en sixième semestre, et c’est à partir de ce moment que j’ai décidé que ce serait mon domaine.</p>
          </QR>

          <QR
            q="Quelle est la chose la plus étrange ou la plus surprenante que vous ayez vu faire à un fluide ?"
            nota={<p>1,6 kelvin correspond à environ −271,5 °C, tout près du zéro absolu. L’hélium devient superfluide en dessous d’environ 2,2 kelvin. La viscosité est la résistance d’un fluide à l’écoulement : le miel est très visqueux, l’eau beaucoup moins.</p>}
          >
            <p>J’ai vu une vidéo sur les superfluides, qui montrait comment l’hélium liquide pouvait traverser un solide poreux aux pores minuscules, qu’un autre liquide ne traverserait pas. À partir de 1,6 kelvin, il a commencé à pénétrer ces pores, ce qu’il n’aurait pas pu faire autrement. En tant que fluide, non ; en tant que superfluide, oui. La différence, c’est que sa viscosité diminue.</p>
          </QR>
        </Bloque>

        <Bloque titulo="Les fluides du quotidien">
          <QR
            q="Avant tout : qu’est-ce qu’un fluide, pour la physique ?"
            nota={<p>Un effort de cisaillement fait glisser les couches d’un matériau les unes sur les autres, comme lorsqu’on pousse le dessus d’un paquet de cartes. Un solide y résiste ; un fluide, lui, continue de s’écouler.</p>}
          >
            <p>Quand on étudie la mécanique, on considère l’objet comme une simple particule. On peut étudier de nombreuses particules, mais cela n’en fait pas un fluide. Lors d’une avalanche, le sable n’est pas un fluide : le fait que beaucoup de particules soient en mouvement ne suffit pas.</p>
            <p>Comment savoir, alors, si c’est un fluide ou non ? La définition classique, le principe le plus élémentaire : c’est un matériau qui occupe l’espace du récipient qui le contient. Une réponse plus précise tient à la façon dont il réagit à un effort de cisaillement : un fluide est un matériau qui se déforme tant qu’on lui applique une force.</p>
          </QR>

          <QR
            q="Pourquoi l’eau de la douche sort-elle parfois en filets, et parfois en un seul jet ?"
            nota={<p>C’est le même principe qui fait jaillir l’eau plus loin lorsqu’on bouche à moitié un tuyau d’arrosage avec le pouce : la même quantité d’eau passe par une ouverture plus étroite, donc elle va plus vite.</p>}
          >
            <p>Les filets, cela dépend de la pomme de douche. En général, l’eau doit respecter le principe de continuité : si un certain volume entre, ce même volume doit sortir. Si la pomme de douche a beaucoup de petits trous, ce volume doit donc se répartir entre eux.</p>
          </QR>

          <QR q="Pourquoi y a-t-il des turbulences en avion, et faut-il en avoir peur ?">
            <p>Il y en a deux. Il y a la turbulence que nous connaissons, nous, et celle dont on parle en aviation, qui m’est moins familière : c’est plutôt lorsque l’avion affronte des conditions qui ne sont pas idéales, comme des rafales de vent ou des trous d’air.</p>
            <p>Il n’y a pas lieu d’en avoir peur, car les avions sont testés dans des conditions extrêmes. Il serait très rare qu’un avion de ligne s’écrase à cause de turbulences ; c’est d’ailleurs moins probable dans un avion de ligne que dans un petit avion. Pour autant que je sache, il n’y a pas vraiment de risque : on aura peut-être un peu mal au cœur, mais il n’y a pas de quoi s’inquiéter. Le problème, dans ce cas, ce seraient les matériaux. Les accidents concernent presque toujours de petits avions ou des avions privés.</p>
          </QR>

          <QR
            q="Qu’ont en commun la fumée d’une bougie, le lait dans le café et un orage ?"
            nota={<p>Un écoulement laminaire se fait en couches bien ordonnées, qui glissent les unes sur les autres sans se mélanger. C’est la fumée de la bougie <a href="#entrevista">en haut de cet entretien</a>, juste avant qu’elle ne se mette à tourbillonner.</p>}
          >
            <p>Je suppose que ce sont des écoulements turbulents. La bougie, on peut l’observer : elle commence de façon laminaire, on voit un très joli filet de fumée, puis il devient « chaotique », même s’il ne l’est pas tant que cela. Quand on verse du lait dans un café, on le voit se disperser et devenir chaotique.</p>
            <p>La turbulence obéit à des niveaux d’énergie ; elle paraît aléatoire à nos yeux, mais on peut la quantifier. Les orages, de la même façon, sont des fluides turbulents.</p>
          </QR>
        </Bloque>

        <Cita>Un fluide est un matériau qui se déforme tant qu’on lui applique une force.</Cita>

        <Bloque titulo="Les fluides de l’espace">
          <QR
            q="Comment se forme l’hexagone de Saturne, et pourquoi ne se défait-il pas ?"
            nota={<p>L’atmosphère de Saturne est surtout composée d’hydrogène et d’hélium, des gaz plus légers que l’air. Selon la NASA, l’hexagone est un courant-jet : un vent très rapide qui serpente autour du pôle nord en dessinant six côtés, chacun plus long que le diamètre de la Terre.</p>}
          >
            <p>Mon expérience ne porte pas tant sur Saturne que sur la convection naturelle. Imaginez un fluide stationnaire, immobile, dans une pièce, avec un mur très chaud et un autre à température normale. Que se passe-t-il ? Quand l’air se réchauffe, sa densité diminue et il monte. L’air du côté du mur froid doit descendre pendant que l’autre monte, et il se forme alors un petit vortex. On observe ce qu’on appelle des rouleaux de convection.</p>
            <p>Selon certaines variables, il ne se forme pas un cercle parfait. Il ne s’agit pas d’air à proprement parler, mais de fluides qui ont certaines caractéristiques. Dans ce cas, leur densité ou leurs constantes thermiques ne sont pas linéaires, et c’est ce qui les déforme. Dans le cas de Saturne, ce n’est pas une question de température, mais de gravité. Il faudrait voir quelle substance domine là-bas : ce n’est pas de l’air, ce doivent être d’autres gaz, plus lourds. Le phénomène serait donc dû à la gravité et, surtout, au type de fluide qui s’y trouve.</p>
          </QR>

          <QR
            q="Pourquoi la Grande Tache rouge de Jupiter tourne-t-elle depuis des siècles ?"
            nota={<p>Une journée sur Jupiter dure moins de 10 heures : la planète tourne environ 2,4 fois plus vite que la Terre. À vitesse de vent égale, la force de Coriolis y est donc plus forte, sans être des milliers de fois supérieure. Quant à la Grande Tache rouge, elle rétrécit bel et bien depuis les premières mesures précises, au XIXe siècle, mais elle reste plus large que la Terre.</p>}
          >
            <p>C’est aussi un vortex, et sur Terre, il en existe aussi : les ouragans. La principale raison pour laquelle un ouragan se déplace longtemps, c’est la force de Coriolis. Elle résulte de la rotation de la planète : nous nous trouvons dans un référentiel non inertiel, ce qui engendre des forces fictives, comme celle de Coriolis. Ce sont des forces que nous percevons parce que nous sommes à l’intérieur de ce référentiel ; quelqu’un de l’extérieur les verrait aussi, mais les étudierait différemment.</p>
            <p>C’est cette force de Coriolis qui favorise les ouragans. Au nord de l’équateur, ils tournent dans un sens ; au sud, dans l’autre. Sur Terre, ils durent au maximum deux semaines. Jupiter est beaucoup plus grande que la Terre : la force de Coriolis y est probablement des milliers de fois supérieure. Sur Terre, elle dépend de la taille de la planète et de la vitesse à laquelle elle tourne, et Jupiter, du fait de sa taille, présente des vitesses plus élevées. Ce sont ses dimensions qui expliquent que la tache dure aussi longtemps. Il doit y avoir d’autres conditions, mais c’est principalement cela, et elle devrait finir par se dissiper.</p>
            <p>Dans l’océan, on ne les voit pas, mais il existe aussi des vortex. Ils s’étendent sur des milliers de kilomètres, mais peuvent mettre des mois à faire un tour : ils sont très lents, et c’est pour cela que nous ne les voyons pas. Pourtant, ils sont bien là, et depuis longtemps, et ils contribuent beaucoup au transport des nutriments.</p>
          </QR>

          <QR
            q="Qu’arrive-t-il à l’eau et au feu sans gravité ?"
            nota={<p>Ce qui donne à l’eau sa forme de boule, c’est la tension superficielle, une sorte de « peau » à la surface du liquide. Et en effet, en apesanteur, la flamme d’une bougie devient ronde et bleutée, car l’air chaud ne monte plus.</p>}
          >
            <p>Nous avons tous vu ces vidéos où des astronautes lancent quelque chose et où l’on voit se former des sphères. S’il n’y a pas de gravité, aucun effort ne s’exerce sur le liquide ; et si aucun effort ne s’exerce sur aucune frontière du liquide, il prend une forme ronde. La géométrie est une question d’équilibre, et cet équilibre, c’est la sphère, comme une bulle. La sphère est la forme optimale, celle qui offre le meilleur équilibre.</p>
            <p>Pour le feu, je ne sais pas. La flamme devient ronde. C’est intéressant, car le feu doit être très délicat à manipuler sans gravité, à cause de la simple respiration de l’astronaute ou d’un très léger courant d’air.</p>
          </QR>

          <QR
            q="Les nébuleuses se comportent-elles comme des fluides ?"
            nota={<p>Une nébuleuse est un nuage de gaz et de poussière situé à l’intérieur d’une galaxie : ce sont les galaxies qui contiennent des nébuleuses, et non l’inverse. Pour en savoir plus, voir <a href="#nebulosas">notre article sur les nébuleuses</a>.</p>}
          >
            <p>Ce n’est pas mon domaine, mais j’ai un ami cosmologiste. Je sais qu’ils utilisent des équations comme celle de continuité, qui pour nous concerne la masse, mais dont ils se servent aussi. Je sais qu’il existe un certain lien ; seulement, que les équations se ressemblent, je ne sais pas si cela suffit pour dire qu’elles ressemblent à un fluide. Le courant électrique aussi peut être vu comme un fluide, mais cela ne signifie pas que c’en soit un.</p>
            <p>En fin de compte, les nébuleuses sont composées de beaucoup de gaz, de galaxies et de planètes, mais tout cela est creux. L’idée ne me semblerait donc pas si folle, au vu des principes de viscosité, entre autres. En général, peut-être que oui, cela s’en rapproche.</p>
          </QR>

          <QR
            q="La matière qui tourne autour d’un trou noir se comporte-t-elle comme un fluide ?"
            nota={<p>L’anneau de la célèbre image du trou noir de M87 (voir <a href="#agujeros-negros">notre article sur les trous noirs</a>) est la lumière émise par du gaz extrêmement chaud qui tourne autour du trou noir. Pour simuler ce gaz, les astrophysiciens utilisent justement les équations des fluides.</p>}
          >
            <p>La matière, c’est presque toujours de la lumière. Plus qu’un fluide, je dirais que cela ressemble à un solide… Voyons. L’anneau ne se déforme pas : ce serait plutôt un solide de révolution. Il existe une discipline qui s’appelle la mécanique des milieux continus. Cela ressemblerait davantage à un fluide s’il y avait des perturbations, si, au lieu d’un anneau, on voyait un anneau perturbé. Mais s’il reste fixe, je dirais plutôt un solide de révolution.</p>
          </QR>
        </Bloque>

        <div className={`${styles.fila} ${styles.filaAncha}`}>
          <div className={styles.rapidas}>
            <h2 className={styles.bloqueTitulo}>Questions express</h2>
            <p className={styles.instruccion}>Touchez une carte pour découvrir la réponse.</p>
            <Tarjetas preguntas={RAPIDAS} />
          </div>
        </div>

        <QR q="Et Oppenheimer ?">
          <p>J’en ai aimé les effets. Mais ce n’est pas un film de physique : il est plutôt social, philosophique et politique. Il est très bien, très intéressant. Ce serait formidable, un film qui reprenne l’esprit des années 1920 ou 1930, avec l’histoire de l’atome, ou un film sur Newton. Autiste, peut-être, mais il avait bien le droit de l’être.</p>
        </QR>

        <Bloque titulo="Le grand mystère">
          <QR
            q="Quel mystère des fluides reste à résoudre ?"
            nota={
              <>
                <p>La vorticité mesure la tendance d’un fluide à tourner sur lui-même, à former des tourbillons.</p>
                <p>Le problème est si ardu qu’il fait partie des sept « problèmes du millénaire » : l’Institut Clay promet un million de dollars à qui démontrera certaines propriétés des équations qui décrivent les fluides, les équations de Navier-Stokes.</p>
              </>
            }
          >
            <p>La turbulence. Les modèles de turbulence ne sont que des modèles : ils ne se déduisent pas d’une équation fondamentale. Ce sont des modèles empiriques, sur lesquels reposent beaucoup d’autres choses. Il faut accepter certaines simplifications dans ces modèles ; elles ont fonctionné, mais elles ne sont pas exactes.</p>
            <p>Toute la vorticité se crée aux frontières : un fluide, à lui seul, ne va pas générer de turbulence ; il faut cette interaction. Le problème, c’est que cela se produit à de très petites échelles. Il existe des simulations, mais d’une toute petite partie de l’aile, avec des ordinateurs gigantesques qui mettent énormément de temps à les réaliser.</p>
            <p>On peut améliorer les modèles numériques, car ce sont des approximations. Il faudrait chercher de meilleures façons d’obtenir des solutions numériques : ce ne seraient plus des équations différentielles, on réduirait peut-être l’ordre des opérations, entre autres. C’est ainsi que l’on peut contribuer, car pour l’instant tout n’est qu’approximation, aussi bien le calcul numérique que la turbulence. Et la transition, on ne la connaît pas : comment un écoulement passe de laminaire à turbulent, nous le savons un peu, mais il reste encore beaucoup de lacunes à combler.</p>
          </QR>

          <QR q="Quel conseil donneriez-vous à quelqu’un qui veut étudier les sciences ?">
            <p>Il faut être autodidacte. Si l’on se contente de ce que donne l’université, cela ne servira pas : on prendra du retard. Il faut prendre plaisir à apprendre ; si quelque chose vous intéresse, mettez-vous à lire sur le sujet. Il faut avant tout de l’intérêt. On ne peut pas dire que quelque chose nous plaît sans le pratiquer.</p>
            <p>Si vous souhaitez vous consacrer à la science, commencez à étudier par vous-même, par exemple la mécanique quantique à un niveau d’introduction, pour savoir ce qui existe, ce que l’on étudie. Ainsi, vous pourrez passer d’un domaine à l’autre. Vous ne saurez peut-être pas encore le modéliser mathématiquement, mais vous saurez déjà, dans votre tête, comment cela va fonctionner, parce que vous en connaissez les principes. Cela doit vous procurer du plaisir.</p>
          </QR>
        </Bloque>

        <Cita>Il faut prendre plaisir à apprendre.</Cita>
      </div>

      <Cierre
        id="entrevista"
        titulo={TITULO}
        acento={{ oscuro: 'var(--nebulosa)', papel: 'var(--nebulosa-papel)' }}
        fuentes={[
          'NASA — science.nasa.gov, dossier Saturne (l’hexagone du pôle nord, mission Cassini).',
          'NASA — science.nasa.gov, dossier Jupiter (la Grande Tache rouge).',
          'NASA — expériences sur les flammes en microgravité à bord de la Station spatiale internationale.',
          'Clay Mathematics Institute — claymath.org, « Navier–Stokes Equation » (problèmes du millénaire).',
          'Event Horizon Telescope — eventhorizontelescope.org, première image du trou noir de M87 (2019).',
        ]}
        nota="Les sources concernent les notes de la rédaction. Les réponses sont celles de notre invité."
        auteur="Baruc Bazan et Andy Tarango"
        auteurBio="Élèves et co-auteurs de Point Bleu Pâle."
        anterior={{ href: '#tiempo', titulo: 'Le temps dans le cosmos' }}
      />
    </article>
  )
}
