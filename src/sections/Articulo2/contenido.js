// Textos y datos de la sección Nebulosas, en francés. Todo pasa por frProfundo() (typographie française),
// salvo href, hex e id. Marcado mínimo en los párrafos: *cursiva*; «1er» se muestra como 1<sup>er</sup>.
import { frProfundo } from './typo.js'

const crudo = {
  id: 'nebulosas',
  numero: '05 / 09', // 5.ª de 9 secciones según el orden de CLAUDE.md
  rubrique: 'Nébuleuses',

  modo: { grupo: 'Mode de lecture', immersif: 'Immersif', simple: 'Simple' },
  sommaire: { texto: 'Sommaire', href: '#indice' },

  hero: {
    chip: 'M16 · NÉBULEUSE DE L’AIGLE',
    tituloAntes: 'Les piliers de la ',
    tituloEnfasis: 'création',
    autorLinea: 'Écrit par Sofía Contreras · 10 novembre 2026',
    credito: 'Image : NASA, ESA, CSA, STScI',
    alt: 'Les piliers de la création : colonnes de gaz et de poussière dorées et rougeâtres sur un fond bleu parsemé d’étoiles, vues en infrarouge par le télescope spatial James-Webb',
    defilar: 'Faites défiler',
  },

  meta: ['LECTURE · 12 MIN', 'RUBRIQUE · NÉBULEUSES', 'N° 07 · NOV. 2026'],
  etiquetas: ['nébuleuses', 'formation stellaire', 'James-Webb', 'infrarouge'],
  etiquetasLabel: 'Mots-clés',

  lead: 'On les dirait taillées dans la pierre. Elles sont faites de gaz et de poussière, elles s’érodent lentement sous le rayonnement des étoiles voisines — et la lumière qui nous les montre a quitté la nébuleuse bien avant l’invention de l’écriture.',

  // Bloques del artículo, en orden. Cada uno: { titulo, parrafos }.
  bloques: {
    icone: {
      titulo: 'Une photographie devenue icône',
      parrafos: [
        'Le 1er avril 1995, le télescope spatial Hubble photographie le cœur de la nébuleuse de l’Aigle. Sur l’image, signée des astronomes Jeff Hester et Paul Scowen, de l’université d’État d’Arizona, trois colonnes sombres se dressent sur un fond lumineux. On les rebaptise aussitôt « piliers de la création », un nom que l’on dit emprunté à un sermon du prédicateur britannique Charles Spurgeon, en 1857.',
        'La région, elle, était connue depuis longtemps : l’amas d’étoiles qui l’éclaire, NGC 6611, a été repéré en 1745-1746 par l’astronome suisse Jean-Philippe Loys de Chéseaux, avant que la nébuleuse n’entre au catalogue de Messier sous le numéro 16 — d’où son nom, M16.',
        'Hubble revisite les piliers en 2014 avec une caméra plus récente (image dévoilée en janvier 2015). Puis, le 19 octobre 2022, le télescope spatial James-Webb publie son propre portrait, en proche infrarouge : la poussière devient presque transparente et des étoiles par milliers apparaissent derrière les colonnes.',
      ],
    },
    colonnes: {
      titulo: 'Des colonnes de quatre années-lumière',
      parrafos: [
        'Le pilier de gauche mesure environ quatre années-lumière de long, soit près de 38 000 milliards de kilomètres. Leurs sommets en forme de doigts sont plus grands que le Système solaire. L’ensemble se trouve à quelque 6 500 années-lumière de la Terre (selon les estimations, jusqu’à 7 000).',
        'Ces « colonnes » n’ont rien de solide : ce sont des nuages froids d’hydrogène moléculaire et de poussière, très ténus, que le rayonnement ultraviolet des étoiles chaudes voisines sculpte peu à peu. Comme un rocher dans un courant, la partie la plus dense résiste plus longtemps et protège le gaz qui se trouve derrière elle — d’où ces longues traînées en forme de pilier.',
        'Pour se faire une idée : un avion de ligne mettrait près de cinq millions d’années à traverser un seul pilier. Voyager 1, l’objet construit par l’humanité le plus éloigné de la Terre, en mettrait environ 70 000. À vous d’essayer.',
      ],
    },
    passe: {
      titulo: 'Une photo du passé',
      parrafos: [
        'La lumière voyage vite, mais pas instantanément. À 6 500 années-lumière, nous voyons les piliers tels qu’ils étaient il y a environ 6 500 ans, vers 4500 av. J.-C. À cette époque, l’écriture n’existe pas encore, la roue non plus. Et la lumière que Webb a captée en 2022 était déjà en route depuis le Néolithique.',
        'Ce que nous appelons « aujourd’hui » est, pour les piliers, un instant très lointain. Remontez le fil de ce voyage avec le curseur ci-dessous.',
      ],
    },
    couleurs: {
      titulo: 'Des couleurs qui n’existent pas',
      parrafos: [
        'L’image de Webb n’est pas une photographie au sens courant. Le télescope observe dans le proche infrarouge, une lumière que nos yeux ne perçoivent pas. Les équipes scientifiques attribuent donc une couleur visible à chaque longueur d’onde : du violet pour 0,9 µm jusqu’au rouge pour 4,7 µm, ce dernier révélant l’hydrogène moléculaire. Les tons dorés des colonnes, le bleu du fond : tout est une traduction, pas un reflet.',
        'Même les étoiles les plus brillantes y portent huit pointes. Ce n’est pas leur vraie forme, c’est la signature du télescope : la diffraction de la lumière dans son miroir hexagonal et ses supports.',
      ],
    },
    naissance: {
      titulo: 'Des étoiles en train de naître',
      parrafos: [
        'Les points rouges qui brillent à la pointe des piliers sont des protoétoiles : des grumeaux de gaz assez massifs pour s’effondrer sous leur propre gravité, se réchauffer lentement, puis s’allumer. Elles expulsent des jets de matière qui, en heurtant le gaz alentour, dessinent ces contours ondulés que les équipes de Webb comparent à de la lave. Ces jeunes étoiles n’ont que quelques centaines de milliers d’années — et continueront de se former pendant des millions d’années.',
        'À l’intérieur des piliers, de petits globules denses, les EGG (*evaporating gaseous globules*), protègent le gaz situé derrière eux du rayonnement ultraviolet intense, et certaines étoiles s’y forment. L’amas NGC 6611, qui éclaire et érode la nébuleuse, n’a lui-même que 1 à 2 millions d’années : à l’échelle cosmique, un nouveau-né.',
      ],
    },
    encore: {
      titulo: 'Les piliers existent-ils encore ?',
      parrafos: [
        'En 2007, le télescope Spitzer détecte de la poussière chaude près des piliers. Une équipe y voit la trace possible d’une onde de choc de supernova qui aurait détruit les colonnes il y a environ 6 000 ans. Comme la lumière met environ 7 000 ans à nous parvenir, nous contemplerions un décor déjà disparu — et cette destruction serait visible depuis la Terre dans environ 1 000 ans.',
        'L’hypothèse est contestée : une supernova devrait produire plus d’émission radio et de rayons X que celle observée, et les vents d’étoiles massives pourraient suffire à chauffer la poussière. Les observations de Hubble en 2014 n’ont pas mis en évidence de supernova. À notre connaissance, l’hypothèse n’a pas été confirmée — mais elle rappelle que ces piliers, éternels sur nos écrans, sont éphémères à l’échelle de l’Univers.',
      ],
    },
    cierre: {
      titulo: 'Un point bleu pâle, vu de plus loin encore',
      parrafos: [
        'En 1990, Voyager 1 se retournait vers la Terre et la photographiait comme un simple grain de lumière bleu pâle — l’image qui a inspiré le nom de ce magazine. Même à la vitesse de cette sonde, il lui faudrait environ 70 000 ans pour traverser un seul pilier de la création.',
        'Nous ne visiterons jamais ces colonnes. Nous pouvons seulement les regarder — avec 6 500 ans de retard.',
      ],
    },
  },

  ficha: {
    titulo: 'Fiche de l’objet',
    filas: [
      ['OBJET', 'M16 · Nébuleuse de l’Aigle'],
      ['CONSTELLATION', 'Le Serpent (Serpens)'],
      ['DISTANCE', '≈ 6 500 années-lumière'],
      ['INSTRUMENT', 'NIRCam · Télescope James-Webb'],
      ['LUMIÈRE', 'Proche infrarouge'],
      ['AMAS', 'NGC 6611 · 1 à 2 millions d’années'],
      ['LONGUEUR D’UN PILIER', '≈ 4 années-lumière'],
      ['IMAGE ICONIQUE', '1er avril 1995 (Hubble)'],
      ['PORTRAIT WEBB', '19 octobre 2022'],
    ],
  },

  explorador: {
    kicker: 'Explorez l’image',
    titulo: 'Approchez-vous de quatre recoins',
    botonesLabel: 'Choisir un détail',
    credito: 'Image : NASA, ESA, CSA, STScI',
    defs: [
      { label: 'Pilier gauche', tag: 'DÉTAIL 1 · PILIER GAUCHE', origin: '20% 18%', scale: 2.3, title: 'Le sommet du pilier gauche', fact: 'Des bords effilochés de gaz et de poussière, sculptés par le rayonnement d’étoiles jeunes voisines.', alt: 'Gros plan sur le sommet du pilier gauche de la nébuleuse' },
      { label: 'Pilier central', tag: 'DÉTAIL 2 · PILIER CENTRAL', origin: '45% 12%', scale: 2.4, title: 'Des éclats rouges au sommet', fact: 'Les points rouges signalent de très jeunes étoiles qui expulsent encore de la matière dans leur environnement.', alt: 'Gros plan sur la pointe du pilier central, avec des éclats rouges' },
      { label: 'Pilier droit', tag: 'DÉTAIL 3 · PILIER DROIT', origin: '72% 22%', scale: 2.3, title: 'Le pilier le plus fragmenté', fact: 'Une colonne plus fine et plus sombre, aux ramifications qui se fondent dans le fond bleu.', alt: 'Gros plan sur le pilier droit de la nébuleuse' },
      { label: 'Étoiles', tag: 'DÉTAIL 4 · CHAMP STELLAIRE', origin: '2% 60%', scale: 2.5, title: 'Des pointes qui ne viennent pas de l’étoile', fact: 'Les pointes à huit branches sont de la diffraction de la lumière par le miroir hexagonal et les supports du télescope.', alt: 'Gros plan sur des étoiles brillantes aux pointes de diffraction' },
    ],
  },

  // M1 — Échelle
  echelle: {
    kicker: 'Échelle',
    titulo: 'Combien de temps pour traverser un pilier ?',
    apoyo: 'Le pilier de gauche mesure environ 4 années-lumière, soit ≈ 37 800 milliards de kilomètres. Choisissez votre moyen de transport.',
    botonesLabel: 'Moyen de transport',
    resultadoPrefijo: 'Temps de traversée',
    barraLabel: 'Échelle logarithmique de 1 an à 1 milliard d’années',
    marcas: ['1 an', '1 000 ans', '1 million d’années', '1 milliard d’années'],
    extra: 'Autre repère : le Système solaire, jusqu’à l’héliopause, mesure environ 240 UA de diamètre ; il tiendrait environ mille fois dans la longueur d’un pilier.',
    tabla: { caption: 'Combien de temps pour traverser un pilier ?', cols: ['Moyen de transport', 'Vitesse', 'Durée'] },
    longitudAl: 4, // années-lumière
    vitesses: [
      { id: 'marche', label: 'À pied', detail: '5 km/h', kmS: 5 / 3600, note: 'Environ 3 000 fois l’âge d’Homo sapiens (≈ 300 000 ans).' },
      { id: 'avion', label: 'Avion de ligne', detail: '900 km/h', kmS: 900 / 3600, note: 'Soit environ seize fois l’âge d’Homo sapiens.' },
      { id: 'voyager', label: 'Voyager 1', detail: '≈ 17 km/s', kmS: 17, note: 'Lancée en 1977, la sonde mettrait environ 70 000 ans à traverser un seul pilier.' },
      { id: 'parker', label: 'Sonde Parker (record)', detail: '≈ 190 km/s', kmS: 190, note: 'Même l’engin le plus rapide jamais construit mettrait des millénaires.' },
      { id: 'lumiere', label: 'La lumière', detail: '299 792 km/s', kmS: 299792, note: 'À peine la durée d’un cursus universitaire.' },
    ],
  },

  // M2 — Machine à remonter la lumière
  machine: {
    kicker: 'Voyage de la lumière',
    titulo: 'Machine à remonter la lumière',
    apoyo: 'Faites glisser le curseur : à chaque année-lumière parcourue, un an s’écoule.',
    sliderLabel: 'Années écoulées depuis le départ de la lumière',
    marcadoresLabel: 'Aller à une étape',
    distancia: 'Distance parcourue',
    resta: 'Il reste',
    restaFin: 'jusqu’à la Terre',
    anio: 'Année',
    al: ['année-lumière', 'années-lumière'],
    ecoule: ['an écoulé', 'ans écoulés'],
    avJC: 'av. J.-C.',
    autoplay: 'Lecture automatique',
    pausa: 'Pause',
    nota: 'Distance retenue : 6 500 années-lumière (les estimations vont jusqu’à 7 000). Les dates sont arrondies.',
    listaTitulo: 'Le voyage de la lumière, étape par étape',
    distanciaTotal: 6500,
    anioSalida: -4474, // 2026 − 6 500
    evenements: [
      { ecoule: 0, annee: 'vers 4500 av. J.-C.', titre: 'Le départ', texte: 'La lumière quitte les piliers. Nous sommes au Néolithique, avant l’écriture.' },
      { ecoule: 974, annee: 'vers 3500 av. J.-C.', titre: 'La roue', texte: 'Les premières roues apparaissent en Mésopotamie.' },
      { ecoule: 1274, annee: 'vers 3200 av. J.-C.', titre: 'L’écriture', texte: 'Les premières écritures cunéiformes naissent à Sumer.' },
      { ecoule: 1914, annee: 'vers 2560 av. J.-C.', titre: 'La pyramide de Khéops', texte: 'Le grand monument de Gizeh est achevé.' },
      { ecoule: 6083, annee: '1609', titre: 'La lunette de Galilée', texte: 'Galilée pointe sa lunette vers le ciel.' },
      { ecoule: 6219, annee: '1745-1746', titre: 'Chéseaux et l’amas', texte: 'Jean-Philippe Loys de Chéseaux repère l’amas d’étoiles de la nébuleuse.' },
      { ecoule: 6469, annee: '1995', titre: 'Hubble', texte: 'Hubble photographie les piliers : l’image devient mondialement célèbre.' },
      { ecoule: 6496, annee: '2022', titre: 'Webb', texte: 'Le télescope James-Webb publie son portrait en proche infrarouge.' },
      { ecoule: 6500, annee: '2026', titre: 'L’arrivée', texte: 'Aujourd’hui : la lumière atteint enfin vos yeux.' },
    ],
  },

  // M3 — Palette Webb (fuente: tabla de filtros de ESA/Webb)
  palette: {
    kicker: 'Couleurs',
    titulo: 'Ces couleurs n’existent pas… et c’est tant mieux',
    apoyo: 'Webb observe dans l’infrarouge, invisible pour l’œil. Les astronomes attribuent donc une couleur visible à chaque longueur d’onde.',
    reglaLabel: 'Règle des longueurs d’onde de 0,3 à 5 µm. La lumière visible va de 0,38 à 0,75 µm ; les six filtres de Webb se situent entre 0,9 et 4,7 µm, dans l’infrarouge, invisible pour l’œil.',
    visible: 'Lumière visible',
    infrarrojo: 'Infrarouge',
    filtrosLabel: 'Choisir un filtre',
    fuente: 'Source : ESA/Webb, NASA, CSA, STScI. Les couleurs sont assignées, non naturelles.',
    tabla: { caption: 'Les couleurs assignées aux filtres de Webb', cols: ['Couleur', 'Longueur d’onde', 'Ce qu’elle révèle'] },
    rango: [0.3, 5],
    bandaVisible: [0.38, 0.75],
    filtres: [
      { couleur: 'Violet', hex: '#9B7BFF', um: 0.9, nom: 'Filtre « z »', texte: 'Filtre à large bande, à la lisière du visible.' },
      { couleur: 'Bleu', hex: '#4DA3FF', um: 1.87, nom: 'Paschen-α', texte: 'Raie de l’hydrogène ionisé.' },
      { couleur: 'Cyan', hex: '#4DE3E3', um: 2.0, nom: 'Filtre à 2,0 µm', texte: 'Filtre à large bande.' },
      { couleur: 'Jaune', hex: '#FFD84D', um: 3.35, nom: 'HAP', texte: 'Émission de molécules organiques (hydrocarbures aromatiques polycycliques) mêlées à la poussière.' },
      { couleur: 'Orange', hex: '#FF9A3D', um: 4.44, nom: 'Filtre à 4,44 µm', texte: 'Filtre à large bande.' },
      { couleur: 'Rouge', hex: '#FF5A4D', um: 4.7, nom: 'Hydrogène moléculaire', texte: 'Le gaz froid dont sont faits les piliers.' },
    ],
  },

  // M4 — Vrai ou faux ?
  quiz: {
    kicker: 'Quiz',
    titulo: 'Vrai ou faux ?',
    apoyo: 'Six idées reçues sur les piliers de la création.',
    vrai: 'Vrai',
    faux: 'Faux',
    bien: 'Bonne réponse',
    mal: 'Pas tout à fait',
    laRespuesta: 'La réponse était',
    siguiente: 'Question suivante',
    verScore: 'Voir mon score',
    score: 'Votre score',
    rejouer: 'Rejouer',
    mensajes: [
      [0, 'Les piliers gardent leurs secrets… pour l’instant.'],
      [3, 'Bon œil : vous lisez bien le ciel.'],
      [5, 'Astronome en herbe !'],
    ],
    preguntas: [
      { q: 'Les piliers sont des colonnes solides, comme de la roche.', vrai: false, expl: 'Ce sont des nuages de gaz (surtout de l’hydrogène moléculaire) et de poussière, très ténus.' },
      { q: 'La lumière que l’on voit montre les piliers tels qu’ils sont aujourd’hui.', vrai: false, expl: 'Elle a voyagé environ 6 500 ans : c’est une photo du passé.' },
      { q: 'Les couleurs de l’image sont celles que verrait un œil humain.', vrai: false, expl: 'Elles sont assignées aux longueurs d’onde infrarouges observées par Webb.' },
      { q: 'Les pointes à huit branches font partie des étoiles.', vrai: false, expl: 'Elles viennent de la diffraction de la lumière dans l’optique du télescope.' },
      { q: 'Des étoiles sont en train de naître dans les piliers.', vrai: true, expl: 'Les points rouges sont des protoétoiles âgées de quelques centaines de milliers d’années.' },
      { q: 'Les piliers dureront éternellement.', vrai: false, expl: 'Le rayonnement ultraviolet des étoiles chaudes voisines les érode peu à peu (photoévaporation).' },
    ],
  },

  // M5 — Écouter la nébuleuse (interpretación sonora del magazine)
  sonido: {
    kicker: 'Expérience',
    titulo: 'Écouter la nébuleuse',
    apoyo: 'Une ligne de lecture traverse l’image de gauche à droite. Plus un endroit est lumineux, plus le son est fort ; plus il est haut dans l’image, plus la note est aiguë.',
    aviso: 'Sonification artistique réalisée par le magazine, non officielle.',
    alternativa: 'Cette expérience est sonore ; elle n’est pas nécessaire pour comprendre l’article.',
    escuchar: 'Écouter',
    pausa: 'Pause',
    volumen: 'Volume',
    reiniciar: 'Recommencer',
    alt: 'Les piliers de la création, parcourus par une ligne de lecture verticale orange',
    progreso: 'Position de la ligne de lecture',
    sinAudio: 'Votre navigateur ne permet pas de jouer ce son.',
  },

  chiffres: {
    titulo: 'Les piliers en six chiffres',
    items: [
      { n: 6500, label: 'années-lumière jusqu’à la Terre' },
      { prefijo: '≈ ', n: 4, label: 'années-lumière de longueur (pilier de gauche)' },
      { texto: '1–2 M', label: 'années, l’âge de l’amas NGC 6611' },
      { n: 1995, anio: true, label: 'première image iconique (Hubble)' },
      { n: 2022, anio: true, label: 'le portrait de Webb' },
      { n: 8, label: 'pointes de diffraction sur les étoiles brillantes' },
    ],
  },

  cita: {
    texto: 'Ce que nous voyons aujourd’hui a quitté les piliers vers 4500 av. J.-C.',
    autor: '— Point Bleu Pâle',
  },

  masLejos: {
    titulo: 'Pour aller plus loin',
    nuevaVentana: '(s’ouvre dans un nouvel onglet)',
    enlaces: [
      { fuente: 'ESA/Webb', titulo: 'Pillars of Creation (NIRCam)', href: 'https://esawebb.org/images/weic2216b/' },
      { fuente: 'Wikipédia', titulo: 'Piliers de la création', href: 'https://fr.wikipedia.org/wiki/Piliers_de_la_cr%C3%A9ation' },
      { fuente: 'Wikipédia', titulo: 'Nébuleuse de l’Aigle', href: 'https://fr.wikipedia.org/wiki/N%C3%A9buleuse_de_l%27Aigle' },
    ],
    glosario: 'Glossaire : nébuleuse, protoétoile, infrarouge, diffraction, photoévaporation, EGG.',
    creditos: 'Image : NASA, ESA, CSA, STScI.',
  },

  partager: {
    titulo: 'Partager',
    copiar: 'Copier le lien',
    copiado: 'Lien copié',
    error: 'Impossible de copier le lien',
    asunto: 'Les piliers de la création — Point Bleu Pâle',
  },

  autor: {
    iniciales: 'SC',
    etiqueta: 'Écrit par',
    nombre: 'Sofía Contreras',
    bio: 'Astrophysicienne et vulgarisatrice.',
  },

  // Vecinos según el orden de CLAUDE.md. Títulos reales de Articulo1 y Articulo3.
  navegacion: {
    label: 'Articles voisins',
    bordeAnterior: '← Article précédent',
    bordeSiguiente: 'Suivant →',
    anterior: { href: '#agujeros-negros', etiqueta: '← Précédent · Trous noirs', titulo: 'Aller simple pour un trou noir' },
    siguiente: { href: '#tiempo', etiqueta: 'Suivant · Temps', seccion: 'Temps', titulo: 'Le temps dans le cosmos' },
  },
}

export const texto = frProfundo(crudo)
