// Artículo 3: Le temps dans le cosmos — responsable: compañero
// Versión en inglés del texto. La versión en francés está en Articulo3.fr.jsx; Articulo3.jsx elige según el idioma.
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
  ngc1068: 'ESA/Webb, NASA & CSA, J. Lee and the PHANGS-JWST team',
}

function Foto({ src, srcSet, width, height, alt, pie, credito, lado = 'derecha', recorte = false }) {
  return (
    <figure className={`${styles.foto} ${styles[lado]} ${recorte ? styles.recorte : ''}`}>
      <img src={src} srcSet={srcSet} sizes="(max-width: 640px) 100vw, 400px" width={width} height={height} alt={alt} loading="lazy" decoding="async" />
      <figcaption>
        {pie}
        <span className={styles.credito}>Image: {credito}</span>
      </figcaption>
    </figure>
  )
}

const H2 = ({ children }) => <h2 className={styles.limpiar}>{children}</h2>

export default function Articulo3En() {
  return (
    <Article
      id="tiempo"
      variante="afilado"
      numero="06 / 09"
      seccion="Time"
      // Verde «old money»: inglés profundo sobre papel, salvia claro sobre fondo oscuro
      // El título sobre la foto va en oro cálido: resalta contra los azules y rosas de Cassiopée A
      acento={{ oscuro: '#b3c8b4', papel: '#2f5b44', titulo: '#f6c978' }}
      titulo="Time in the cosmos"
      tituloJsx={<>Time <em>in the cosmos</em></>}
      auteur="Baruc Bazan"
      auteurBio="Student and co-author of Point Bleu Pâle."
      date="Nov. 10, 2026"
      lecture="8 MIN"
      tags={['time', 'light', 'relativity']}
      hero={{
        src: heroGrande,
        srcSet: `${heroChica} 1200w, ${heroGrande} 2000w`,
        alt: 'Supernova remnant: a large bubble of gas in blue, pink and purple filaments, against a black background scattered with stars.',
        credito: `Image: Cassiopeia A — ${CREDITOS.casA}`,
        posicion: '50% 50%',
      }}
      cuerpo={
        <>
          <p>No need for a time machine: all you have to do is look up. The light from stars and galaxies tells us about the Universe’s past, and it teaches us how to measure its spans of time, from the blink of an eye to a billion years.</p>

          <h2>Telescopes are time machines</h2>
          <p>Light never arrives instantly. It travels at about 300,000 kilometers per second: that’s very fast, but not infinite. That’s why the Sun you see is the Sun from a little over eight minutes ago. For more distant objects, the delay becomes enormous.</p>
          <p>The Cat’s Paw Nebula is about 5,500 light-years away. The light we receive from it today set out at the time when the first cities and writing were appearing in Mesopotamia. The galaxy NGC 1068, about 47 million light-years away, shows us light that set out when modern mammals were just beginning to diversify.</p>
          <ModuloMachine />
          <p>And that’s not all. In photos from big telescopes, many of the tiny smudges in the background are much more distant galaxies, whose light set out billions of years ago. Every point of light is a moment from the past. Looking at the sky means digging through archives.</p>
        </>
      }
      notas={[
        'Light-year: the distance light travels in one year, about 9.5 trillion kilometers. It’s a distance, not a length of time!',
        'Supernova (plural: supernovae): the explosion of a massive star at the end of its life.',
        'Pulsar: the crushed core of a star that exploded. It spins very fast and sweeps space with beams, like a lighthouse.',
        'Nanosecond: one billionth of a second. Microsecond: one millionth of a second.',
      ]}
      figura={{
        svg: <EscalaTiempo />,
        pie: 'Fig. 2 — The spans of time you’ll come across in this article, on a single ruler. Each tick multiplies the time by 1,000. Diagram. © Point Bleu Pâle',
      }}
      cuerpoFinal={
        <>
          <H2>Stars in a hurry</H2>
          <Foto
            lado="derecha"
            src={gatoGrande}
            srcSet={`${gatoChica} 800w, ${gatoGrande} 1440w`}
            width={1440}
            height={1581}
            alt="Nebula of orange and blue gas with bright stars and columns of dark dust."
            pie="Fig. 3 — The Cat’s Paw Nebula, a stellar nursery observed in infrared."
            credito={CREDITOS.gato}
          />
          <p>The Sun will live about 10 billion years. A massive star, on the other hand, may live only a few million years: a mere blink, on the scale of the cosmos.</p>
          <p>Why? The heavier a star is, the faster it burns through its fuel. A bit like a race car: its tank is bigger than a small city car’s, but it empties it much faster. And many of these stars in a hurry end up exploding as supernovae.</p>
          <p>Regions like the Cat’s Paw, where gas condenses to form stars, are true “nurseries”. And we see them almost live: a few thousand years of delay is nothing for stars that live for millions of years.</p>
          <ModuloCarrera />
          <p>The most massive of the stars being born in the Cat’s Paw will live fast and die young. Their explosions will return to space the heavy elements that will one day form new planets. Recycling, cosmic edition.</p>

          <H2>A delayed explosion</H2>
          <Foto
            lado="izquierda"
            src={cangrejoGrande}
            srcSet={`${cangrejoChica} 800w, ${cangrejoGrande} 1440w`}
            width={1440}
            height={1254}
            alt="Cage-shaped cloud of gas with orange and red filaments, filled with a white and bluish haze, against a starry black background."
            pie="Fig. 5 — The Crab Nebula, the remains of the supernova of 1054, seen in infrared."
            credito={CREDITOS.cangrejo}
          />
          <p>On July 4, 1054, Chinese astronomers recorded the appearance of a “guest star” in the constellation Taurus. It shone so brightly that it could be seen in broad daylight for 23 days, and at night for almost two years. What they were watching was a supernova: the explosion of a star about ten times heavier than the Sun.</p>
          <p>The remains of that explosion now form the Crab Nebula: a cloud of gas filaments that is still expanding at about 1,500 kilometers per second. At its center lies what’s left of the star’s core, crushed into a ball about twenty kilometers across that spins around about 30 times per second: a pulsar.</p>
          <p>But the craziest part is the timing. The Crab Nebula is about 6,500 light-years away. So the light from the explosion took 6,500 years to reach us. The star had actually exploded about 7,500 years ago, long before the pyramids were built. In 1054, the Chinese astronomers were watching a rerun.</p>
          <p>And what if a star exploded out there today? We wouldn’t find out for another 6,500 years, around the year 8500. The sky is like a delayed broadcast of a game: you learn the score long after it’s over. Betelgeuse, Orion’s red shoulder, will also end up as a supernova. It’s about 550 light-years away: if it exploded two centuries ago, the news is still on its way.</p>

          <H2>The cosmic year</H2>
          <Foto
            lado="derecha"
            src={espiralGrande}
            srcSet={`${espiralChica} 800w, ${espiralGrande} 1280w`}
            width={1280}
            height={1194}
            alt="Spiral galaxy with arms of orange dust and bright young stars."
            pie="Fig. 6 — The spiral galaxy NGC 2283. A galaxy like this one takes hundreds of millions of years to make one full turn."
            credito="ESA/Webb, NASA & CSA, A. Leroy"
          />
          <p>Galaxies rotate, but with a slowness that’s hard to imagine. At its distance from the center, the Sun (and us along with it) takes about 230 million years to go around the Milky Way: this is what’s called a “cosmic year”.</p>
          <p>At about 4.6 billion years old, the Sun has therefore made some twenty laps. The last time it was at this spot in the galaxy, the first dinosaurs were only just appearing. All of human history fits into a tiny fraction of a single cosmic year.</p>
          <ModuloGalaxia />

          <H2>When time doesn’t flow the same way</H2>
          <p>Until now, we’ve talked about time as if it were the same for everyone. It isn’t. Einstein showed that time flows at different rates depending on how fast you’re moving and how much gravity you’re under.</p>
          <p>Special relativity (1905) says that a fast-moving clock ticks more slowly than a clock at rest. General relativity (1915) adds that gravity slows time down too: a clock close to a massive object ticks more slowly than a clock far away.</p>
          <p>This isn’t just a theory written on a blackboard. In 1971, physicists Hafele and Keating put atomic clocks on board commercial airliners. Comparing them with a clock that stayed on the ground, they measured differences of a few tens to a few hundred nanoseconds, in line with the theory’s predictions.</p>
          <p>And every time you use GPS, relativity is working for you. The satellites’ clocks feel both effects: the weaker gravity up there makes them run fast; their speed makes them run slow. The net result: a difference of about 38 microseconds per day. That sounds ridiculous, but without correction, the position error would grow by about 10 kilometers every day.</p>
          <ModuloGps />
          <Foto
            lado="izquierda"
            src={ngc1068}
            width={864}
            height={974}
            alt="Face-on spiral galaxy with a very bright nucleus and a pinkish jet at its center."
            pie="Fig. 9 — NGC 1068, an active galaxy: hidden in its heart is a supermassive black hole."
            credito={CREDITOS.ngc1068}
          />
          <p>The most extreme effects happen near a black hole, like the one in NGC 1068. As we saw in <a href="#agujeros-negros">the article on black holes</a>, to a distant observer, a clock placed near the event horizon would tick more and more slowly.</p>
          <p>That’s the idea behind the movie <em>Interstellar</em>, where one hour on a planet close to the black hole equals seven years on Earth. The physics behind that scene is plausible, even if it requires extreme conditions. We promised to explain how time can slow down: promise kept.</p>
          <p>From the GPS satellite circling above your head to a galaxy 47 million light-years away, time is part of the very fabric of the Universe. A Universe whose history stretches back about 13.8 billion years. You’ve just spent a few minutes of it here. Well done.</p>
          <div className={styles.limpiar} />
        </>
      }
      sources={[
        'J. C. Hafele and R. E. Keating, “Around-the-World Atomic Clocks”, Science, 1972.',
        'N. Ashby, “Relativity in the Global Positioning System”, Living Reviews in Relativity, 2003.',
        'Chandra/NASA — chandra.harvard.edu/photo/2024/casa (image of Cassiopeia A).',
        'ESA/Webb — esawebb.org/images/weic2513a (Cat’s Paw Nebula).',
        'NASA/Webb — image of the Crab Nebula (2023).',
        'D. A. Green and F. R. Stephenson, “Historical Supernovae”, 2003 (supernova of 1054).',
        'ESA/Webb — esawebb.org (image of NGC 2283).',
        'ESA/Webb — esawebb.org, Picture of the Month for January 2023 (NGC 1068 / M77).',
        'Kip Thorne, The Science of Interstellar, 2014.',
      ]}
      anterior={{ href: '#nebulosas', titulo: 'The Pillars of Creation' }}
      siguiente={{ href: '#entrevista', seccion: 'Interview', titulo: 'From the shower to Jupiter' }}
    />
  )
}
