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
    <svg viewBox="0 0 1000 420" role="img" aria-label="Diagram of a black hole: the singularity at the center, surrounded by the event horizon, the photon sphere and the accretion disk.">
      <ellipse cx="500" cy="210" rx="330" ry="70" stroke="#FF7A1A" strokeWidth="18" strokeOpacity="0.35" fill="none" />
      <ellipse cx="500" cy="210" rx="330" ry="70" stroke="#FF7A1A" strokeWidth="2" fill="none" />
      <circle cx="500" cy="210" r="118" stroke="#7FE3D0" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
      <circle cx="500" cy="210" r="80" fill="#050505" stroke="#F6F1E4" strokeWidth="1.5" />
      <circle cx="500" cy="210" r="4" fill="#F6F1E4" />

      <path d="M500 210 L640 360 H760" {...linea} fill="none" />
      <text x="770" y="365" {...texto}>Singularity</text>
      <path d="M445 152 L340 70 H220" {...linea} fill="none" />
      <text x="70" y="75" {...texto}>Event horizon</text>
      <path d="M600 140 L680 60 H760" {...linea} fill="none" />
      <text x="770" y="65" {...texto}>Photon sphere</text>
      <path d="M190 225 L120 330 H80" {...linea} fill="none" />
      <text x="20" y="360" {...texto}>Accretion disk</text>
    </svg>
  )
}

export default function Articulo1() {
  return (
    <Article
      id="agujeros-negros"
      numero="03 / 09"
      seccion="Black holes"
      acento={{ oscuro: 'var(--biolum)', papel: 'var(--biolum-papel)' }}
      titulo="One-way ticket to a black hole"
      tituloJsx={<>One-way ticket to <em>a black hole</em></>}
      auteur="[AUTHOR]"
      auteurBio="[AUTHOR BIO]."
      date="Nov. 10, 2026"
      lecture="7 MIN"
      tags={['black holes', 'gravity', 'relativity']}
      hero={{
        src: m87Grande,
        srcSet: `${m87Chica} 1200w, ${m87Grande} 2400w`,
        alt: 'First image of a black hole: a glowing orange ring around a dark shadow, at the center of the galaxy M87.',
        credito: 'Image: EHT Collaboration',
        posicion: '50% 62%',
      }}
      cuerpo={
        <>
          <p>Buckle up: we’re heading for the most extreme object in the Universe. No return trip planned, but I promise you’ll learn a lot along the way.</p>

          <h2>A hole… that isn’t a hole</h2>
          <p>First misunderstanding to clear up before takeoff: a black hole isn’t a hole. It isn’t a tunnel, and it isn’t empty. It’s exactly the opposite: a huge amount of matter, crushed into a tiny space.</p>
          <p>Imagine taking the whole Earth (the oceans, the mountains, your house, your math teacher) and squeezing it harder and harder. To turn it into a black hole, you’d have to shrink it to the size of a marble, less than 2 centimeters across. The Sun would become a ball about 6 kilometers wide. The size of a small town, for an object that could swallow a million Earths.</p>
          <p>When matter is packed that tightly, its gravity becomes so strong that nothing can escape. Not even light. And if light can’t get out, we see nothing: hence the “black”.</p>
          <EscenaTierra />

          <h2>No, it’s not a vacuum cleaner</h2>
          <p><strong>Myth:</strong> a black hole sucks in everything that passes nearby. <strong>Reality:</strong> a black hole pulls on things exactly like any other object with the same mass. No more.</p>
          <p>Let’s try an experiment (in our heads, thankfully). Let’s replace the Sun with a black hole that has exactly the same mass. What happens to the Earth? Nothing. It keeps going around on the same orbit, at the same pace, as if nothing had happened.</p>
          <p>Well… almost nothing. There would be no more light or heat. We’d live in the dark, at minus 200 degrees. But at least we wouldn’t get sucked in.</p>
          <p>The real danger is getting too close. And that’s exactly what we’re about to do.</p>
          <EscenaSol />

          <h2>The door of no return</h2>
          <p>Around every black hole there’s an invisible boundary: the event horizon. It isn’t a wall, or a surface. It’s a limit. From outside, you can still get away. Once you’re on the other side, it’s over. Nothing comes back out, ever.</p>
          <p>Physicists like to explain it with a river. Imagine that space flows toward the black hole like the water of a river toward a waterfall. Far from the falls, a fish swims upstream with no trouble. The closer it gets, the faster the current. At some point, the water moves faster than the fish can swim: even giving it everything, it drifts backward.</p>
          <p>The event horizon is that place. There, space “flows” faster than light can travel. And since nothing goes faster than light… nothing can make it back up.</p>
          <EscenaRio />

          <h2>Careful, you’re about to become spaghetti</h2>
          <p>Let’s say you fall in feet first. Your feet are a little closer to the black hole than your head, so they get pulled a little harder. On Earth, that difference is tiny. Near a black hole, it becomes enormous: your feet are pulled much harder than your head, and you stretch. And stretch. And stretch. Until you look like a strand of spaghetti.</p>
          <p>Scientists really do call it “spaghettification”. I promise, it’s not a joke.</p>
          <p>But here’s the paradox: the small black holes are the most dangerous. With a black hole of a few solar masses, you’d be stretched long before reaching the horizon. With a giant black hole, millions of times heavier, the stretching at the horizon is so gentle that you’d cross it without feeling a thing. The giants are, in a way, the “nicest” ones.</p>
          <EscenaEspagueti />
          <RelojEsquina />
        </>
      }
      notas={[
        'Event horizon: the boundary beyond which nothing, not even light, can get back out.',
        'Singularity: the central point where all the matter is crushed. Nobody really knows yet what happens there.',
        'Accretion disk: the gas that whirls around the black hole at top speed and heats up until it glows.',
        'Black holes and fluids have more in common than you’d think. We talk about it with a real expert in the interview, at the end of the issue.',
      ]}
      figura={{
        svg: <Anatomie />,
        pie: 'Fig. 6 — Anatomy of a black hole (diagram, not to scale). © Point Bleu Pâle',
      }}
      cuerpoFinal={
        <>
          <h2>Hollywood drew a black hole before anyone else</h2>
          <p>In 2014, the movie <em>Interstellar</em> put a giant black hole called Gargantua on the big screen. And it wasn’t just a pretty special effect.</p>
          <p>Behind the film there was a real physicist: Kip Thorne, one of the world’s leading black hole experts, who would later win the Nobel Prize in Physics (in 2017). His condition for taking part: nothing in the film could contradict the laws of physics.</p>
          <p>So the visual effects team didn’t draw Gargantua. They calculated it. The programmers used Einstein’s equations to follow the paths of millions of light rays around the black hole. Some frames took dozens of hours to compute.</p>
          <p>The result surprised even them. The disk of blazing gas spinning around the black hole doesn’t only appear in front of it: you also see it above and below. What you’re actually seeing is the back of the disk, because gravity bends its light and sends it over the black hole, like a bridge. The rendering was so accurate that the team published a real scientific paper in 2015.</p>
          <EscenaLente />
          <p>A movie that ends up in a scientific journal. That doesn’t happen every day.</p>

          <h2>Five years later, the real photo</h2>
          <p>On April 10, 2019, the world saw the first real image of a black hole. It was taken by the Event Horizon Telescope: eight radio telescopes spread across the planet, working together as a single telescope the size of the Earth.</p>
          <p>The black hole is called M87*. It’s 6.5 billion times heavier than the Sun and lies 55 million light-years away. In the photo: an orange ring around a black shadow. Exactly the idea from <em>Interstellar</em>.</p>
          <Comparador />
          <p>But take a close look at the two images. In the real photo, one side of the ring is much brighter than the other. That’s expected: the gas is spinning at enormous speed, and the side coming toward us shines brighter. The filmmakers knew this… and removed it on purpose, so the audience wouldn’t get confused.</p>
          <p>The movie got almost everything right. Except that detail.</p>
          <p>In 2022, the same team photographed Sagittarius A*, the black hole at the center of our own galaxy. It weighs about 4 million suns. Don’t worry: it’s about 26,000 light-years away. It won’t be coming for us.</p>

          <h2>And what about time?</h2>
          <p className={estilosEscenas.soloInmersivo}>Did you notice the little clock in the corner of the screen? It’s been slowing down since the start. That’s not a bug.</p>
          <p>Near a black hole, time passes more slowly than far away from it. Not in your head: for real. If you could stay near the horizon for a while and then come back to Earth, your friends would have aged much more than you.</p>
          <p>In <em>Interstellar</em>, the heroes spend about an hour on Miller’s planet, which orbits Gargantua. Meanwhile, back on Earth, seven years go by. It’s extreme, but Kip Thorne did the math: it’s possible if the black hole spins at almost the maximum speed physics allows.</p>
          <RelojesFinal />
          <p>How can time slow down? Now that’s another story. And it’s waiting for you a little further on in this issue.</p>
        </>
      }
      sources={[
        'Event Horizon Telescope — eventhorizontelescope.org (images of M87* and Sagittarius A*).',
        'Kip Thorne, The Science of Interstellar, 2014.',
        'O. James, E. von Tunzelmann, P. Franklin, K. S. Thorne, “Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar”, Classical and Quantum Gravity, 2015.',
        'NASA — “Black Holes”, science.nasa.gov.',
      ]}
      anterior={{ href: '#indice', titulo: 'Contents' }}
      siguiente={{ href: '#nebulosas', seccion: 'Nebulae', titulo: 'Where stars are born' }}
    />
  )
}
