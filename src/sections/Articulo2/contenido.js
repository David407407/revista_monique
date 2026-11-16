// Textos y datos de la sección Nebulosas, en inglés (versión para el doctor). Todo pasa por frProfundo()
// (solo cambia ' por ’ en estos textos), salvo href, hex e id. Marcado mínimo en los párrafos: *cursiva*.
import { frProfundo } from './typo.js'

const crudo = {
  id: 'nebulosas',
  numero: '05 / 09', // 5.ª de 9 secciones según el orden de CLAUDE.md
  rubrique: 'Nebulae',

  modo: { grupo: 'Reading mode', immersif: 'Immersive', simple: 'Simple' },
  sommaire: { texto: 'Contents', href: '#indice' },

  hero: {
    chip: 'M16 · EAGLE NEBULA',
    tituloAntes: 'The Pillars of ',
    tituloEnfasis: 'Creation',
    autorLinea: 'Written by Sofía Contreras · November 10, 2026',
    credito: 'Image: NASA, ESA, CSA, STScI',
    alt: 'The Pillars of Creation: golden and reddish columns of gas and dust against a blue background scattered with stars, seen in infrared by the James Webb Space Telescope',
    defilar: 'Scroll down',
  },

  meta: ['READING TIME · 12 MIN', 'SECTION · NEBULAE', 'No. 07 · NOV. 2026'],
  etiquetas: ['nebulae', 'star formation', 'James Webb', 'infrared'],
  etiquetasLabel: 'Keywords',

  lead: 'They look as if they were carved out of stone. They are made of gas and dust, they are slowly worn away by the radiation of nearby stars — and the light that shows them to us left the nebula long before writing was invented.',

  // Bloques del artículo, en orden. Cada uno: { titulo, parrafos }.
  bloques: {
    icone: {
      titulo: 'A photograph that became an icon',
      parrafos: [
        'On April 1, 1995, the Hubble Space Telescope photographed the heart of the Eagle Nebula. In the image, credited to astronomers Jeff Hester and Paul Scowen of Arizona State University, three dark columns rise against a bright background. They were immediately nicknamed the “Pillars of Creation”, a name said to be borrowed from an 1857 sermon by the British preacher Charles Spurgeon.',
        'The region itself had been known for a long time: the star cluster that lights it up, NGC 6611, was spotted in 1745-1746 by the Swiss astronomer Jean-Philippe Loys de Chéseaux, before the nebula entered Messier’s catalog as number 16 — hence its name, M16.',
        'Hubble revisited the pillars in 2014 with a newer camera (the image was unveiled in January 2015). Then, on October 19, 2022, the James Webb Space Telescope released its own portrait, in near-infrared: the dust becomes almost transparent and thousands of stars appear behind the columns.',
      ],
    },
    colonnes: {
      titulo: 'Columns four light-years tall',
      parrafos: [
        'The left pillar is about four light-years long, or nearly 38 trillion kilometers. Their finger-shaped tips are larger than the Solar System. The whole structure lies some 6,500 light-years from Earth (up to 7,000, depending on the estimate).',
        'These “columns” are anything but solid: they are cold, very thin clouds of molecular hydrogen and dust, gradually sculpted by the ultraviolet radiation of nearby hot stars. Like a rock in a stream, the densest part holds out longer and shields the gas behind it — hence these long, pillar-shaped trails.',
        'To get a sense of scale: an airliner would take nearly five million years to cross a single pillar. Voyager 1, the human-made object farthest from Earth, would take about 70,000. Try it yourself.',
      ],
    },
    passe: {
      titulo: 'A photo of the past',
      parrafos: [
        'Light travels fast, but not instantly. At 6,500 light-years away, we see the pillars as they were about 6,500 years ago, around 4500 BC. At that time, writing did not exist yet, and neither did the wheel. And the light Webb captured in 2022 had already been on its way since the Neolithic.',
        'What we call “today” is, for the pillars, a very distant moment. Trace that journey back with the slider below.',
      ],
    },
    couleurs: {
      titulo: 'Colors that don’t exist',
      parrafos: [
        'Webb’s image is not a photograph in the everyday sense. The telescope observes in the near-infrared, a kind of light our eyes cannot see. So the science teams assign a visible color to each wavelength: from violet for 0.9 µm to red for 4.7 µm, the latter revealing molecular hydrogen. The golden tones of the columns, the blue of the background: it is all a translation, not a reflection.',
        'Even the brightest stars have eight spikes. That isn’t their real shape, it’s the telescope’s signature: light diffracting off its hexagonal mirror and its supports.',
      ],
    },
    naissance: {
      titulo: 'Stars being born',
      parrafos: [
        'The red dots glowing at the tips of the pillars are protostars: clumps of gas massive enough to collapse under their own gravity, slowly heat up, and then ignite. They shoot out jets of material that, as they crash into the surrounding gas, trace the wavy outlines that Webb’s teams compare to lava. These young stars are only a few hundred thousand years old — and will keep forming for millions of years.',
        'Inside the pillars, small dense globules called EGGs (*evaporating gaseous globules*) shield the gas behind them from the intense ultraviolet radiation, and some stars form there. The NGC 6611 cluster, which lights up and erodes the nebula, is itself only 1 to 2 million years old: a newborn on the cosmic scale.',
      ],
    },
    encore: {
      titulo: 'Do the pillars still exist?',
      parrafos: [
        'In 2007, the Spitzer telescope detected hot dust near the pillars. One team saw it as a possible sign of a supernova shock wave that might have destroyed the columns about 6,000 years ago. Since the light takes about 7,000 years to reach us, we would be looking at scenery that is already gone — and that destruction would become visible from Earth in about 1,000 years.',
        'The hypothesis is disputed: a supernova should produce more radio and X-ray emission than what has been observed, and winds from massive stars could be enough to heat the dust. Hubble’s 2014 observations found no evidence of a supernova. As far as we know, the hypothesis has not been confirmed — but it is a reminder that these pillars, eternal on our screens, are fleeting on the scale of the Universe.',
      ],
    },
    cierre: {
      titulo: 'A pale blue dot, seen from even farther away',
      parrafos: [
        'In 1990, Voyager 1 turned back toward Earth and photographed it as a mere pale blue speck of light — the image that inspired the name of this magazine. Even at that probe’s speed, it would take about 70,000 years to cross a single Pillar of Creation.',
        'We will never visit these columns. We can only look at them — 6,500 years late.',
      ],
    },
  },

  ficha: {
    titulo: 'Object profile',
    filas: [
      ['OBJECT', 'M16 · Eagle Nebula'],
      ['CONSTELLATION', 'Serpens (the Serpent)'],
      ['DISTANCE', '≈ 6,500 light-years'],
      ['INSTRUMENT', 'NIRCam · James Webb Telescope'],
      ['LIGHT', 'Near-infrared'],
      ['CLUSTER', 'NGC 6611 · 1 to 2 million years old'],
      ['LENGTH OF ONE PILLAR', '≈ 4 light-years'],
      ['ICONIC IMAGE', 'April 1, 1995 (Hubble)'],
      ['WEBB PORTRAIT', 'October 19, 2022'],
    ],
  },

  explorador: {
    kicker: 'Explore the image',
    titulo: 'Zoom in on four corners',
    botonesLabel: 'Choose a detail',
    credito: 'Image: NASA, ESA, CSA, STScI',
    defs: [
      { label: 'Left pillar', tag: 'DETAIL 1 · LEFT PILLAR', origin: '20% 18%', scale: 2.3, title: 'The top of the left pillar', fact: 'Frayed edges of gas and dust, sculpted by the radiation of nearby young stars.', alt: 'Close-up of the top of the nebula’s left pillar' },
      { label: 'Center pillar', tag: 'DETAIL 2 · CENTER PILLAR', origin: '45% 12%', scale: 2.4, title: 'Red flashes at the top', fact: 'The red dots mark very young stars that are still ejecting material into their surroundings.', alt: 'Close-up of the tip of the center pillar, with red flashes' },
      { label: 'Right pillar', tag: 'DETAIL 3 · RIGHT PILLAR', origin: '72% 22%', scale: 2.3, title: 'The most fragmented pillar', fact: 'A thinner, darker column, with branches that fade into the blue background.', alt: 'Close-up of the nebula’s right pillar' },
      { label: 'Stars', tag: 'DETAIL 4 · STAR FIELD', origin: '2% 60%', scale: 2.5, title: 'Spikes that don’t come from the star', fact: 'The eight-pointed spikes are light diffracted by the telescope’s hexagonal mirror and supports.', alt: 'Close-up of bright stars with diffraction spikes' },
    ],
  },

  // M1 — Échelle
  echelle: {
    kicker: 'Scale',
    titulo: 'How long would it take to cross a pillar?',
    apoyo: 'The left pillar is about 4 light-years long, or ≈ 37.8 trillion kilometers. Choose your means of transportation.',
    botonesLabel: 'Means of transportation',
    resultadoPrefijo: 'Crossing time',
    barraLabel: 'Logarithmic scale from 1 year to 1 billion years',
    marcas: ['1 year', '1,000 years', '1 million years', '1 billion years'],
    extra: 'Another benchmark: the Solar System, out to the heliopause, is about 240 AU across; it would fit about a thousand times along the length of one pillar.',
    tabla: { caption: 'How long would it take to cross a pillar?', cols: ['Means of transportation', 'Speed', 'Time'] },
    longitudAl: 4, // années-lumière
    vitesses: [
      { id: 'marche', label: 'On foot', detail: '5 km/h', kmS: 5 / 3600, note: 'About 3,000 times the age of Homo sapiens (≈ 300,000 years).' },
      { id: 'avion', label: 'Airliner', detail: '900 km/h', kmS: 900 / 3600, note: 'That’s about sixteen times the age of Homo sapiens.' },
      { id: 'voyager', label: 'Voyager 1', detail: '≈ 17 km/s', kmS: 17, note: 'Launched in 1977, the probe would take about 70,000 years to cross a single pillar.' },
      { id: 'parker', label: 'Parker probe (record)', detail: '≈ 190 km/s', kmS: 190, note: 'Even the fastest spacecraft ever built would take thousands of years.' },
      { id: 'lumiere', label: 'Light', detail: '299,792 km/s', kmS: 299792, note: 'Barely as long as a college degree.' },
    ],
  },

  // M2 — Machine à remonter la lumière
  machine: {
    kicker: 'Light’s journey',
    titulo: 'A machine for traveling back along the light',
    apoyo: 'Drag the slider: for every light-year traveled, one year goes by.',
    sliderLabel: 'Years since the light left',
    marcadoresLabel: 'Jump to a stage',
    distancia: 'Distance traveled',
    resta: 'Remaining',
    restaFin: 'to Earth',
    anio: 'Year',
    al: ['light-year', 'light-years'],
    ecoule: ['year elapsed', 'years elapsed'],
    avJC: 'BC',
    autoplay: 'Autoplay',
    pausa: 'Pause',
    nota: 'Distance used: 6,500 light-years (estimates go up to 7,000). Dates are rounded.',
    listaTitulo: 'Light’s journey, step by step',
    distanciaTotal: 6500,
    anioSalida: -4474, // 2026 − 6 500
    evenements: [
      { ecoule: 0, annee: 'around 4500 BC', titre: 'Departure', texte: 'The light leaves the pillars. We are in the Neolithic, before writing.' },
      { ecoule: 974, annee: 'around 3500 BC', titre: 'The wheel', texte: 'The first wheels appear in Mesopotamia.' },
      { ecoule: 1274, annee: 'around 3200 BC', titre: 'Writing', texte: 'The first cuneiform writing appears in Sumer.' },
      { ecoule: 1914, annee: 'around 2560 BC', titre: 'The Great Pyramid', texte: 'The great monument of Giza is completed.' },
      { ecoule: 6083, annee: '1609', titre: 'Galileo’s telescope', texte: 'Galileo points his telescope at the sky.' },
      { ecoule: 6219, annee: '1745-1746', titre: 'Chéseaux and the cluster', texte: 'Jean-Philippe Loys de Chéseaux spots the nebula’s star cluster.' },
      { ecoule: 6469, annee: '1995', titre: 'Hubble', texte: 'Hubble photographs the pillars: the image becomes world-famous.' },
      { ecoule: 6496, annee: '2022', titre: 'Webb', texte: 'The James Webb Telescope releases its near-infrared portrait.' },
      { ecoule: 6500, annee: '2026', titre: 'Arrival', texte: 'Today: the light finally reaches your eyes.' },
    ],
  },

  // M3 — Palette Webb (fuente: tabla de filtros de ESA/Webb)
  palette: {
    kicker: 'Colors',
    titulo: 'These colors don’t exist… and that’s a good thing',
    apoyo: 'Webb observes in the infrared, which is invisible to the eye. So astronomers assign a visible color to each wavelength.',
    reglaLabel: 'Wavelength ruler from 0.3 to 5 µm. Visible light goes from 0.38 to 0.75 µm; Webb’s six filters sit between 0.9 and 4.7 µm, in the infrared, invisible to the eye.',
    visible: 'Visible light',
    infrarrojo: 'Infrared',
    filtrosLabel: 'Choose a filter',
    fuente: 'Source: ESA/Webb, NASA, CSA, STScI. The colors are assigned, not natural.',
    tabla: { caption: 'The colors assigned to Webb’s filters', cols: ['Color', 'Wavelength', 'What it reveals'] },
    rango: [0.3, 5],
    bandaVisible: [0.38, 0.75],
    filtres: [
      { couleur: 'Violet', hex: '#9B7BFF', um: 0.9, nom: '“z” filter', texte: 'Broadband filter, at the edge of the visible.' },
      { couleur: 'Blue', hex: '#4DA3FF', um: 1.87, nom: 'Paschen-α', texte: 'A spectral line of ionized hydrogen.' },
      { couleur: 'Cyan', hex: '#4DE3E3', um: 2.0, nom: '2.0 µm filter', texte: 'Broadband filter.' },
      { couleur: 'Yellow', hex: '#FFD84D', um: 3.35, nom: 'PAH', texte: 'Emission from organic molecules (polycyclic aromatic hydrocarbons) mixed in with the dust.' },
      { couleur: 'Orange', hex: '#FF9A3D', um: 4.44, nom: '4.44 µm filter', texte: 'Broadband filter.' },
      { couleur: 'Red', hex: '#FF5A4D', um: 4.7, nom: 'Molecular hydrogen', texte: 'The cold gas the pillars are made of.' },
    ],
  },

  // M4 — Vrai ou faux ?
  quiz: {
    kicker: 'Quiz',
    titulo: 'True or false?',
    apoyo: 'Six common misconceptions about the Pillars of Creation.',
    vrai: 'True',
    faux: 'False',
    bien: 'Correct',
    mal: 'Not quite',
    laRespuesta: 'The answer was',
    siguiente: 'Next question',
    verScore: 'See my score',
    score: 'Your score',
    rejouer: 'Play again',
    mensajes: [
      [0, 'The pillars are keeping their secrets… for now.'],
      [3, 'Good eye: you read the sky well.'],
      [5, 'Budding astronomer!'],
    ],
    preguntas: [
      { q: 'The pillars are solid columns, like rock.', vrai: false, expl: 'They are very thin clouds of gas (mostly molecular hydrogen) and dust.' },
      { q: 'The light we see shows the pillars as they are today.', vrai: false, expl: 'It has traveled for about 6,500 years: it’s a photo of the past.' },
      { q: 'The colors in the image are the ones a human eye would see.', vrai: false, expl: 'They are assigned to the infrared wavelengths Webb observes.' },
      { q: 'The eight-pointed spikes are part of the stars.', vrai: false, expl: 'They come from light diffracting in the telescope’s optics.' },
      { q: 'Stars are being born inside the pillars.', vrai: true, expl: 'The red dots are protostars a few hundred thousand years old.' },
      { q: 'The pillars will last forever.', vrai: false, expl: 'Ultraviolet radiation from nearby hot stars is slowly wearing them away (photoevaporation).' },
    ],
  },

  // M5 — Écouter la nébuleuse (interpretación sonora del magazine)
  sonido: {
    kicker: 'Experience',
    titulo: 'Listen to the nebula',
    apoyo: 'A playhead sweeps across the image from left to right. The brighter a spot, the louder the sound; the higher it is in the image, the higher the note.',
    aviso: 'Artistic sonification made by the magazine, not official.',
    alternativa: 'This is an audio experience; you don’t need it to understand the article.',
    escuchar: 'Listen',
    pausa: 'Pause',
    volumen: 'Volume',
    reiniciar: 'Restart',
    alt: 'The Pillars of Creation, crossed by a vertical orange playhead',
    progreso: 'Playhead position',
    sinAudio: 'Your browser can’t play this sound.',
  },

  chiffres: {
    titulo: 'The pillars in six numbers',
    items: [
      { n: 6500, label: 'light-years to Earth' },
      { prefijo: '≈ ', n: 4, label: 'light-years long (left pillar)' },
      { texto: '1–2 M', label: 'years, the age of the NGC 6611 cluster' },
      { n: 1995, anio: true, label: 'first iconic image (Hubble)' },
      { n: 2022, anio: true, label: 'Webb’s portrait' },
      { n: 8, label: 'diffraction spikes on bright stars' },
    ],
  },

  // Galería «D'autres nuages». Nombre del objeto y crédito según la ficha de ESA/Webb.
  galerie: {
    kicker: 'Gallery',
    titulo: 'The pillars are not alone',
    intro: 'The pillars are just a small corner of the sky. Here are three other nebulae: none looks like the others, but they are all made of the same gas and the same dust.',
    imagenes: [
      {
        id: 'creuse',
        titre: 'A cloud hollowed out from within',
        texte: 'In the center, a large bluish cavity, like a bubble. Around the edges, the orange dust and dark filaments are still holding out: it is the same duel as in the pillars, between starlight and the cloud surrounding the stars.',
        alt: 'Orange and blue nebula: a vast glowing cavity in the center, surrounded by clouds of brown dust and dark filaments, against a star-studded background.',
        credit: 'N159, Large Magellanic Cloud · ESA/Webb, NASA & CSA, E. Sabbi, M. Zamani (ESA/Webb)',
      },
      {
        id: 'dentelle',
        titre: 'Lace made of fire',
        texte: 'Thousands of orange filaments tangle around a blue core. As with the pillars, these colors are a translation: they make visible kinds of light our eyes cannot see.',
        alt: 'Burst-shaped nebula: a bright blue core surrounded by very fine orange filaments stretching up and down, against a starry black background.',
        credit: 'NGC 6302, Butterfly Nebula · ESA/Webb, NASA & CSA, M. Matsuura',
      },
      {
        id: 'sablier',
        titre: 'An hourglass in the crowd',
        texte: 'In the center, a very bright point. On either side, red gas stretches out like the two halves of an hourglass, crossed by long blue veils. All around, thousands of stars: we are looking through a very crowded region of the sky.',
        alt: 'Small red hourglass-shaped nebula around a bright white point, crossed by blue veils, in the middle of a very dense star field.',
        credit: 'NGC 6537, Red Spider Nebula · ESA/Webb, NASA & CSA, J. H. Kastner (RIT)',
      },
    ],
  },

  cita: {
    texto: 'What we see today left the pillars around 4500 BC.',
    autor: '— Point Bleu Pâle',
  },

  masLejos: {
    titulo: 'Further reading',
    nuevaVentana: '(opens in a new tab)',
    enlaces: [
      { fuente: 'ESA/Webb', titulo: 'Pillars of Creation (NIRCam)', href: 'https://esawebb.org/images/weic2216b/' },
      { fuente: 'Wikipedia', titulo: 'Pillars of Creation', href: 'https://en.wikipedia.org/wiki/Pillars_of_Creation' },
      { fuente: 'Wikipedia', titulo: 'Eagle Nebula', href: 'https://en.wikipedia.org/wiki/Eagle_Nebula' },
      { fuente: 'ESA/Webb', titulo: 'Stars brewing in a nebulous cauldron (N159)', href: 'https://esawebb.org/images/potm2610a/' },
      { fuente: 'ESA/Webb', titulo: 'Webb investigates complex heart of a cosmic butterfly (NGC 6302)', href: 'https://esawebb.org/news/weic2517/' },
      { fuente: 'ESA/Webb', titulo: 'Red Spider Nebula (NGC 6537)', href: 'https://esawebb.org/images/potm2510a/' },
    ],
    glosario: 'Glossary: nebula, protostar, infrared, diffraction, photoevaporation, EGG.',
    creditos: 'Images: NASA, ESA, CSA, STScI (pillars); ESA/Webb, NASA & CSA (gallery).',
  },

  partager: {
    titulo: 'Share',
    copiar: 'Copy link',
    copiado: 'Link copied',
    error: 'Couldn’t copy the link',
    asunto: 'The Pillars of Creation — Point Bleu Pâle',
  },

  autor: {
    iniciales: 'SC',
    etiqueta: 'Written by',
    nombre: 'Sofía Contreras',
    bio: 'Astrophysicist and science communicator.',
  },

  // Vecinos según el orden de CLAUDE.md. Títulos reales de Articulo1 y Articulo3.
  navegacion: {
    label: 'Neighboring articles',
    bordeAnterior: '← Previous article',
    bordeSiguiente: 'Next →',
    anterior: { href: '#agujeros-negros', etiqueta: '← Previous · Black holes', titulo: 'One-way ticket to a black hole' },
    siguiente: { href: '#tiempo', etiqueta: 'Next · Time', seccion: 'Time', titulo: 'Time in the cosmos' },
  },
}

export const texto = frProfundo(crudo)
