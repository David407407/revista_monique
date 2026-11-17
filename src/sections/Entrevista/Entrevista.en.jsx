// Entrevista: doctor en mecánica de fluidos — responsable: compañero
// Versión en inglés. La versión en francés está en Entrevista.fr.jsx; Entrevista.jsx elige según el idioma.
// Entrevista hecha en español y traducida (al francés y de ahí al inglés). Las respuestas citan al doctor (solo se
// corrigieron gramática y muletillas del habla); no se cambian sus afirmaciones. Las notas «Ed. note» (N.d.l.r. en
// francés) son de la redacción: aclaran términos o precisan datos con fuente.
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
  alt: 'Rigoberto Ortega Chavez smiles, standing in front of a whiteboard covered in equations about relativistic fluid mechanics.',
  credito: 'Point Bleu Pâle',
}

const TITULO = 'From the shower to Jupiter'

function Sommaire() {
  return (
    <a href="#indice" className={styles.sommaire}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" /></svg>
      Contents
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
        <aside className={styles.ndlr} aria-label="Editors’ note">
          <span className={styles.ndlrEtiqueta}>Ed. note</span>
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
      <p>“{children}”</p>
      <footer>{DOCTOR}</footer>
    </blockquote>
  )
}

const RAPIDAS = [
  { pregunta: 'Your favorite fluid?', respuesta: 'Water.', detalle: 'The shortest answer of the interview.' },
  { pregunta: 'A movie that got the physics right?', respuesta: 'Interstellar.', detalle: 'We talk about it in our article on time.' },
  { pregunta: 'And a movie that got it wrong?', respuesta: 'Every Marvel movie.', detalle: 'And, more broadly, superhero movies.' },
  { pregunta: 'A phenomenon in the Universe you’d like to observe up close?', respuesta: 'Everything that happens in the Sun’s outer layer.', detalle: 'That’s where fluid mechanics and electromagnetism come into play.' },
]

export default function EntrevistaEn() {
  return (
    <article id="entrevista" className={styles.entrevista} aria-labelledby="entrevista-titre">
      <header className={styles.apertura}>
        <div className={styles.cabecera}>
          <div className={styles.cabeceraIzq}>
            <span className={styles.numero}>08 / 09</span>
            <span className={styles.seccion}>Interview</span>
          </div>
          <Sommaire />
        </div>

        <div className={styles.aperturaTexto}>
          <h1 id="entrevista-titre" className={styles.titulo}>From the shower <em>to Jupiter</em></h1>
          <p className={styles.bajada}>
            Why does shower water sometimes come out in thin streams? Why has Jupiter’s Great Red Spot been spinning for centuries? To understand everything that flows, blows and swirls, we spoke with {DOCTOR}, a PhD in fluid mechanics.
          </p>
          <span className={styles.firma}>Interview · Conducted by Baruc Bazán</span>
        </div>

        <figure className={styles.vela}>
          <Humo className={styles.lienzo} />
          <figcaption>A candle’s smoke first rises in a perfectly straight thread, then starts to swirl. We’ll come back to this further down.</figcaption>
        </figure>
      </header>

      <div className={styles.rejilla}>
        <div className={styles.fila}>
          <aside className={styles.metadatos} aria-label="Article details">
            <span className={styles.mono}>
              READING TIME · 9 MIN
              <br />
              SECTION · INTERVIEW
              <br />
              No. 07 · NOV. 2026
            </span>
            <p className={styles.metaTexto}>Interview conducted in Spanish and translated by the editors. The “Ed. note” boxes are from the editors.</p>
          </aside>
          <div className={`${styles.dialogo} ${styles.intro}`}>
            <h3 className={styles.pregunta}>How would you explain your job to someone our age, in one sentence?</h3>
            <p className={styles.motUnique}>“Entertaining. Fun.”</p>
            <p className={styles.apresMot}>We asked for one sentence; two words were enough.</p>
          </div>
        </div>

        <div className={`${styles.fila} ${styles.filaRetrato}`}>
          <div className={styles.retratoAncho}>
            <Pizarron nombre={DOCTOR} titulo="PhD in fluid mechanics" retrato={RETRATO} />
          </div>
        </div>

        <Bloque titulo="The spark">
          <QR q="Was there a moment, or something you saw, that made you want to study fluids?">
            <p>A classical mechanics textbook, in the part devoted to fluids. I found it far more interesting in that book than in class, at university. I was in my sixth semester, and from that moment on I decided it would be my field.</p>
          </QR>

          <QR
            q="What is the strangest or most surprising thing you’ve seen a fluid do?"
            nota={<p>1.6 kelvin is about −271.5 °C, very close to absolute zero. Helium becomes superfluid below about 2.2 kelvin. Viscosity is a fluid’s resistance to flow: honey is very viscous, water much less so.</p>}
          >
            <p>I saw a video about superfluids, which showed how liquid helium could pass through a porous solid with tiny pores that another liquid would not get through. From 1.6 kelvin, it started to seep into those pores, which it couldn’t have done otherwise. As a fluid, no; as a superfluid, yes. The difference is that its viscosity drops.</p>
          </QR>
        </Bloque>

        <Bloque titulo="Everyday fluids">
          <QR
            q="First of all: what is a fluid, for physics?"
            nota={<p>Shear stress makes the layers of a material slide over one another, like when you push on the top of a deck of cards. A solid resists it; a fluid keeps flowing.</p>}
          >
            <p>When we study mechanics, we treat an object as a single particle. We can study many particles, but that doesn’t make it a fluid. In an avalanche, the sand is not a fluid: the fact that many particles are moving isn’t enough.</p>
            <p>So how do we know whether it’s a fluid or not? The classic definition, the most basic principle: it’s a material that takes up the space of the container that holds it. A more precise answer has to do with how it reacts to shear stress: a fluid is a material that keeps deforming as long as a force is applied to it.</p>
          </QR>

          <QR
            q="Why does shower water sometimes come out in thin streams, and sometimes in a single jet?"
            nota={<p>It’s the same principle that makes water shoot farther when you half-block a garden hose with your thumb: the same amount of water goes through a narrower opening, so it moves faster.</p>}
          >
            <p>The thin streams depend on the showerhead. In general, the water has to respect the continuity principle: if a certain volume goes in, that same volume has to come out. So if the showerhead has lots of little holes, that volume has to be shared out among them.</p>
          </QR>

          <QR q="Why is there turbulence on airplanes, and should we be afraid of it?">
            <p>There are two kinds. There’s the turbulence that we know about, and the one people talk about in aviation, which I’m less familiar with: it’s more when the airplane runs into conditions that aren’t ideal, like gusts of wind or air pockets.</p>
            <p>There’s no reason to be afraid, because airplanes are tested under extreme conditions. It would be very rare for an airliner to crash because of turbulence; it’s actually less likely in an airliner than in a small plane. As far as I know, there’s no real risk: you might feel a little queasy, but there’s nothing to worry about. The problem, in that case, would be the materials. Accidents almost always involve small or private planes.</p>
          </QR>

          <QR
            q="What do a candle’s smoke, milk in coffee and a thunderstorm have in common?"
            nota={<p>A laminar flow moves in neat layers that slide over one another without mixing. It’s the candle smoke <a href="#entrevista">at the top of this interview</a>, just before it starts to swirl.</p>}
          >
            <p>I suppose they’re all turbulent flows. With the candle, you can watch it: it starts out laminar, you see a very pretty thread of smoke, and then it becomes “chaotic”, though not as chaotic as it looks. When you pour milk into coffee, you see it spread out and turn chaotic.</p>
            <p>Turbulence obeys energy levels; it looks random to our eyes, but it can be quantified. Thunderstorms, in the same way, are turbulent fluids.</p>
          </QR>
        </Bloque>

        <Cita>A fluid is a material that keeps deforming as long as a force is applied to it.</Cita>

        <Bloque titulo="Fluids in space">
          <QR
            q="How does Saturn’s hexagon form, and why doesn’t it fall apart?"
            nota={<p>Saturn’s atmosphere is mostly hydrogen and helium, gases lighter than air. According to NASA, the hexagon is a jet stream: a very fast wind that snakes around the north pole in a six-sided shape, each side longer than the diameter of the Earth.</p>}
          >
            <p>My experience is not so much with Saturn as with natural convection. Imagine a fluid at rest, motionless, in a room, with one very hot wall and another at normal temperature. What happens? When the air heats up, its density drops and it rises. The air next to the cold wall has to sink while the other rises, and a small vortex forms. What we see are what are called convection rolls.</p>
            <p>Depending on certain variables, a perfect circle doesn’t form. We’re not talking about air as such, but about fluids with certain characteristics. In that case, their density or their thermal constants are not linear, and that’s what distorts them. In Saturn’s case, it’s not a matter of temperature, but of gravity. You’d have to see which substance dominates there: it’s not air, it must be other, heavier gases. So the phenomenon would be due to gravity and, above all, to the type of fluid that’s there.</p>
          </QR>

          <QR
            q="Why has Jupiter’s Great Red Spot been spinning for centuries?"
            nota={<p>A day on Jupiter lasts less than 10 hours: the planet spins about 2.4 times faster than the Earth. At the same wind speed, the Coriolis force there is therefore stronger, though not thousands of times stronger. As for the Great Red Spot, it has indeed been shrinking since the first precise measurements in the 19th century, but it is still wider than the Earth.</p>}
          >
            <p>It’s also a vortex, and on Earth there are some too: hurricanes. The main reason a hurricane keeps moving for so long is the Coriolis force. It results from the planet’s rotation: we are in a non-inertial reference frame, which gives rise to fictitious forces, like the Coriolis force. These are forces that we perceive because we’re inside that reference frame; someone on the outside would see them too, but would study them differently.</p>
            <p>It’s that Coriolis force that favors hurricanes. North of the equator, they spin one way; south of it, the other way. On Earth, they last two weeks at most. Jupiter is much bigger than the Earth: the Coriolis force there is probably thousands of times greater. On Earth, it depends on the size of the planet and how fast it spins, and Jupiter, because of its size, has higher speeds. It’s its dimensions that explain why the spot lasts so long. There must be other conditions, but it’s mainly that, and it should eventually dissipate.</p>
            <p>In the ocean, you can’t see them, but there are vortices too. They stretch over thousands of kilometers, but can take months to make one turn: they’re very slow, and that’s why we don’t see them. Yet they’re there, and have been for a long time, and they contribute a lot to transporting nutrients.</p>
          </QR>

          <QR
            q="What happens to water and fire without gravity?"
            nota={<p>What gives water its ball shape is surface tension, a kind of “skin” on the surface of the liquid. And indeed, in weightlessness a candle flame becomes round and bluish, because hot air no longer rises.</p>}
          >
            <p>We’ve all seen those videos where astronauts toss something and you see spheres form. If there’s no gravity, no stress is exerted on the liquid; and if no stress is exerted on any boundary of the liquid, it takes a round shape. Geometry is a matter of balance, and that balance is the sphere, like a bubble. The sphere is the optimal shape, the one that offers the best balance.</p>
            <p>As for fire, I don’t know. The flame becomes round. It’s interesting, because fire must be very delicate to handle without gravity, because of the astronaut’s mere breathing or a very slight draft.</p>
          </QR>

          <QR
            q="Do nebulae behave like fluids?"
            nota={<p>A nebula is a cloud of gas and dust inside a galaxy: it’s galaxies that contain nebulae, not the other way around. To learn more, see <a href="#nebulosas">our article on nebulae</a>.</p>}
          >
            <p>It’s not my field, but I have a friend who’s a cosmologist. I know they use equations like the continuity equation, which for us deals with mass, but which they use as well. I know there’s a certain connection; it’s just that the equations look alike, and I don’t know whether that’s enough to say they resemble a fluid. Electric current can also be seen as a fluid, but that doesn’t mean it is one.</p>
            <p>In the end, nebulae are made up of a lot of gas, galaxies and planets, but all of it is hollow. So the idea wouldn’t strike me as so crazy, given principles like viscosity, among others. In general, maybe so, it comes close.</p>
          </QR>

          <QR
            q="Does the matter spinning around a black hole behave like a fluid?"
            nota={<p>The ring in the famous image of the M87 black hole (see <a href="#agujeros-negros">our article on black holes</a>) is light emitted by extremely hot gas spinning around the black hole. To simulate that gas, astrophysicists use precisely the equations of fluids.</p>}
          >
            <p>Matter is almost always light. More than a fluid, I’d say it looks like a solid… Let’s see. The ring doesn’t deform: it would be more of a solid of revolution. There’s a discipline called continuum mechanics. It would look more like a fluid if there were disturbances, if, instead of a ring, we saw a disturbed ring. But if it stays fixed, I’d say it’s more of a solid of revolution.</p>
          </QR>
        </Bloque>

        <div className={`${styles.fila} ${styles.filaAncha}`}>
          <div className={styles.rapidas}>
            <h2 className={styles.bloqueTitulo}>Quick questions</h2>
            <p className={styles.instruccion}>Tap a card to reveal the answer.</p>
            <Tarjetas preguntas={RAPIDAS} />
          </div>
        </div>

        <QR q="And Oppenheimer?">
          <p>I liked its effects. But it’s not a physics movie: it’s more social, philosophical and political. It’s very good, very interesting. It would be great to have a movie that captured the spirit of the 1920s or 1930s, with the story of the atom, or a movie about Newton. Autistic, maybe, but he had every right to be.</p>
        </QR>

        <Bloque titulo="The big mystery">
          <QR
            q="What mystery of fluids is still unsolved?"
            nota={
              <>
                <p>Vorticity measures a fluid’s tendency to spin on itself, to form eddies.</p>
                <p>The problem is so hard that it’s one of the seven “Millennium Prize Problems”: the Clay Institute offers a million dollars to anyone who can prove certain properties of the equations that describe fluids, the Navier–Stokes equations.</p>
              </>
            }
          >
            <p>Turbulence. Turbulence models are just models: they can’t be derived from a fundamental equation. They’re empirical models, and a lot of other things rest on them. You have to accept certain simplifications in these models; they have worked, but they’re not exact.</p>
            <p>All vorticity is created at the boundaries: a fluid on its own won’t generate turbulence; you need that interaction. The problem is that it happens at very small scales. There are simulations, but of a tiny part of the wing, with gigantic computers that take an enormous amount of time to run them.</p>
            <p>We can improve the numerical models, because they’re approximations. We’d need to look for better ways to get numerical solutions: they would no longer be differential equations, maybe we’d reduce the order of operations, among other things. That’s how one can contribute, because for now everything is approximation, both the numerical computation and the turbulence. And the transition, we don’t know it: how a flow goes from laminar to turbulent, we know a little, but there are still many gaps to fill.</p>
          </QR>

          <QR q="What advice would you give to someone who wants to study science?">
            <p>You have to be self-taught. If you settle for what the university gives you, it won’t be enough: you’ll fall behind. You have to enjoy learning; if something interests you, start reading about it. Above all you need interest. You can’t say you like something without practicing it.</p>
            <p>If you want to dedicate yourself to science, start studying on your own, for example quantum mechanics at an introductory level, to know what exists, what is studied. That way, you’ll be able to move from one field to another. You may not yet know how to model it mathematically, but you’ll already know, in your head, how it’s going to work, because you know the principles. It should give you pleasure.</p>
          </QR>
        </Bloque>

        <Cita>You have to enjoy learning.</Cita>
      </div>

      <Cierre
        id="entrevista"
        titulo={TITULO}
        acento={{ oscuro: 'var(--nebulosa)', papel: 'var(--nebulosa-papel)' }}
        fuentes={[
          'NASA — science.nasa.gov, Saturn page (the north pole hexagon, Cassini mission).',
          'NASA — science.nasa.gov, Jupiter page (the Great Red Spot).',
          'NASA — flame experiments in microgravity aboard the International Space Station.',
          'Clay Mathematics Institute — claymath.org, “Navier–Stokes Equation” (Millennium Prize Problems).',
          'Event Horizon Telescope — eventhorizontelescope.org, first image of the M87 black hole (2019).',
        ]}
        nota="The sources relate to the editors’ notes. The answers are those of our guest."
        auteur="Baruc Bazán"
        auteurBio="Student and co-author of Point Bleu Pâle, who came up with the questions for this interview."
        anterior={{ href: '#tiempo', titulo: 'Time in the cosmos' }}
      />
    </article>
  )
}
