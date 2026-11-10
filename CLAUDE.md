# Point Bleu Pâle — revista digital

Contexto del proyecto para cualquier Claude que trabaje en este repo. Léelo antes de empezar.

> **IDIOMA: todo el contenido visible de la revista va en FRANCÉS** (textos, títulos, botones, `alt` de imágenes, `aria-label`, anuncios, entrevista). Decidido el 2026-11-10. Este archivo, los comentarios del código, los nombres de carpetas y los `id` de las secciones (`#agujeros-negros`, etc.) siguen en español.

## Qué es

Revista digital científica de **espacio y física** llamada **Point Bleu Pâle** ("Pale Blue Dot" en francés, por la foto de la Tierra de la Voyager 1 popularizada por Carl Sagan). Se escribe con **â** (acento circunflejo).

- **Público:** compañeros de clase.
- **Objetivo:** que aprendan algo de forma divertida.
- **Tono:** cercano, con humor, explicado con imágenes y comparaciones cotidianas. Sin fórmulas.
- **Formato:** revista editorial híbrida. Portada y contraportada tienen efecto de revista (abrir / cerrar). Los artículos se leen con scroll animado (scrollytelling). Debe funcionar bien en celular.

## Equipo y reparto

Son dos personas. Cada una es dueña de secciones completas.

| Dueño del repo (David407407) | Compañero |
|---|---|
| Portada (animación de abrir) | Artículo 2: Nebulosas |
| Contraportada (animación de cerrar) | Artículo 3: El tiempo |
| Índice y navegación entre secciones | Anuncio 2: Stellarium |
| Scroll suave y transiciones entre páginas | Entrevista al doctor en mecánica de fluidos |
| Artículo 1: Agujeros negros | |
| Anuncio 1: NASA's Eyes | |

Cada uno escribe también el texto de sus secciones.

## Orden de la revista

1. Portada
2. Índice
3. Artículo 1: **Agujeros negros**
4. Anuncio 1: **NASA's Eyes** (app gratuita de la NASA para explorar en 3D el sistema solar, naves y exoplanetas). Idea: pasar de "leíste sobre el universo" a "ahora míralo tú".
5. Artículo 2: **Nebulosas**
6. Artículo 3: **El tiempo**. Puede retomar los agujeros negros: cerca de uno, el tiempo pasa más lento.
7. Anuncio 2: **Stellarium** (planetario gratis en navegador y celular). Gancho con el artículo anterior: *"Mira el cielo de cualquier fecha: el día que naciste o dentro de mil años."*
8. **Entrevista a un doctor en mecánica de fluidos** (sección propia del equipo)
9. Contraportada

Los anuncios son **reales** (no ficticios) y hacen eco del artículo que tienen justo antes.

## La entrevista

- En **texto**, con **fotos del doctor**. Nombre del doctor y fotos: pendientes.
- Cubre la mecánica de fluidos y sirve de puente con los otros artículos.
- Idea de diseño: las preguntas rápidas como tarjetas que se voltean.

Preguntas propuestas:

**Apertura (conocerlo como persona)**
- ¿Cómo explicaría su trabajo a alguien de nuestra edad, en una frase?
- ¿Hubo algún momento o algo que vio que lo hizo querer estudiar los fluidos?
- ¿Qué es lo más raro o sorprendente que ha visto hacer a un fluido?

**Fluidos en la vida diaria**
- ¿Por qué el agua de la regadera a veces sale "en tiritas" y otras en chorro?
- ¿Por qué hay turbulencia en los aviones y hay que tenerle miedo?
- ¿Qué tienen en común el humo de una vela, la leche en el café y una tormenta?

**Fluidos en el espacio**
- ¿Cómo se forma el hexágono de Saturno y por qué no se deshace?
- ¿Por qué la Gran Mancha Roja de Júpiter lleva siglos girando?
- ¿Qué le pasa al agua y al fuego sin gravedad?
- ¿Las nebulosas se comportan como fluidos?
- ¿El material que gira alrededor de un agujero negro se comporta como un fluido?

**Preguntas rápidas**
- ¿Fluido favorito?
- ¿Una película que haya hecho bien la física, y una que la haya hecho fatal?
- Si pudiera observar de cerca un fenómeno del universo, ¿cuál sería?

**Cierre**
- ¿Qué misterio de los fluidos sigue sin resolverse?
- ¿Qué consejo le daría a alguien que quiere estudiar ciencias?

## Diseño

El diseño visual ya está hecho en **Claude Design**, en la laptop del compañero. Es la fuente de verdad visual: tipografías, colores, espaciados y estilo de las secciones salen de ahí. Todavía no está importado a este repo.

Los estilos compartidos ya están en `src/styles/tokens.css` (paleta, fuentes, tamaños, medidas) y `src/styles/base.css` (estilos globales y clases `.label`, `.mono`, `.lead`, `.sr-only`). Úsalos con `var(--nombre)`; no inventes colores ni fuentes nuevas. Todo debe verse como una sola revista, no como dos pegadas.

**Decisión del equipo:** del diseño de Claude Design se toma **solo lo visual** (paleta, tipografía, navegación con hojas que se apilan, anatomía del artículo, navbar y footer estilo Quanta). El **contenido** es el de este archivo, no el del diseño: si el diseño dice Física / Biología / Matemáticas, Dra. Elena Marín, anuncios ficticios (Lumen, Orión) u otro orden de secciones, ignóralo. Cada artículo usa uno de los tres acentos (`--biolum`, `--plasma`, `--nebulosa`).

**Cambios al diseño ya decididos:**
- **Portada minimalista** estilo [Aeon](https://aeon.co/essays/why-astrophysics-needs-to-abandon-the-big-questions): foto a pantalla completa ("Cosmic Cliffs" del telescopio Webb, crédito NASA, ESA, CSA, STScI) con título y bajada centrados. Sin botones ni índice.
- **Índice** como sección aparte justo después de la portada (`#indice`).
- **Navbar** transparente sobre la foto de la portada y sin íconos que no funcionan (solo el botón de menú en pantallas angostas).
- Si un botón no funciona, no se muestra.

## Componentes compartidos

- **`src/components/Article/Article.jsx`**: plantilla de artículo con la anatomía del diseño (cabecera con número y sección, modo **Immersif/Simple** guardado en `localStorage`, hero con foto, cuerpo en 3 columnas con metadatos y *Notes en marge*, cita y figura solo en Immersif, *Pour en savoir plus*, *Partager* funcional, tarjeta de autor y navegación Précédent / Article suivant). **Articulo2 y Articulo3 deben usarla**; `src/sections/Articulo1/Articulo1.jsx` es el ejemplo de cómo pasarle las props. Las fotos van optimizadas en WebP en `src/assets/<seccion>/`, con crédito.
- **`src/components/Hojas/Hojas.jsx`**: efecto de hojas apiladas en `App.jsx`. Cada sección se queda fija al terminarla y la siguiente la cubre. Una sección que mide una pantalla completa debe usar `min-height: calc(100vh - var(--nav-h))` para no quedar bajo el navbar (ver `Anuncio1`).
- **`src/components/Logo/Logo.jsx`** y **`src/components/Navbar/Navbar.jsx`**.

La verdad del producto para impeccable está en `PRODUCT.md`. El diseño se trabaja con la skill **impeccable**.

## Stack

- **Vite + React 19, JavaScript** (ya creado).
- Animaciones propuestas, todavía sin instalar: **Motion** (antes Framer Motion) para transiciones, **GSAP + ScrollTrigger** para animaciones ligadas al scroll, **Lenis** para scroll suave. Opcional: **react-pageflip** para portada y contraportada.

## Estructura de carpetas acordada

```
src/
  styles/        ← compartido: colores, fuentes, espaciados (avisar antes de cambiar)
  components/    ← compartido: piezas reutilizables (avisar antes de cambiar)
  sections/
    Portada/
    Indice/
    Articulo1/   (Agujeros negros)
    Anuncio1/
    Articulo2/   (Nebulosas)
    Articulo3/   (El tiempo)
    Anuncio2/
    Entrevista/
    Contraportada/
```

Cada persona trabaja solo dentro de sus carpetas de `sections/`.

## Git

- Una rama por sección (`portada`, `articulo-2`, `entrevista`, etc.).
- Para juntar trabajo: pull request hacia `main`, y el otro lo revisa antes de unir.
- No subir directo a `main`.

## Pendiente

- Importar el diseño de Claude Design al repo.
- Escribir el texto de los 3 artículos.
- Nombre y fotos del doctor; hacer la entrevista.
- Crear la estructura de carpetas e instalar las librerías de animación.
