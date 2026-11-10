# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Compañeros de clase de los autores: estudiantes que leen la revista en el celular o la computadora, por gusto o como parte de la clase. No son especialistas; llegan con curiosidad, no con fórmulas.

## Product Purpose

**Point Bleu Pâle** es una revista digital científica de **espacio y física**. Su objetivo es que los lectores aprendan algo de forma divertida: explicaciones con imágenes y comparaciones cotidianas, sin fórmulas. El éxito es que un compañero la lea completa y se quede con al menos una idea que no sabía.

## Positioning

Es una revista hecha por dos estudiantes para sus compañeros: tiene estructura de revista impresa (portada, piezas, anuncios, contraportada) pero se lee como una web editorial con scroll animado.

## Operating Context

- Número actual: un solo número con 3 artículos (Agujeros negros, Nebulosas, El tiempo), 2 anuncios y una entrevista a un doctor en mecánica de fluidos.
- La hacen dos personas con reparto por secciones; ver `CLAUDE.md`.
- Proyecto escolar.

## Capabilities and Constraints

- React + Vite (JavaScript). Estilos compartidos en `src/styles/`.
- Sin backend: la suscripción solo confirma en pantalla.
- Anuncios **reales** (NASA's Eyes, Stellarium), no ficticios.
- Debe funcionar bien en celular.
- Pendiente: nombre y fotos del doctor, textos de los artículos, número de edición real.

## Brand Commitments

- Nombre: **Point Bleu Pâle**, con **â**. Referencia a la foto "Pale Blue Dot" de la Voyager 1 y a Carl Sagan.
- Idioma del contenido: **francés** (desde 2026-11-10). Todo texto visible, `alt` y `aria-label` van en francés; el `<html>` lleva `lang="fr"`.
- Tono: cercano, con humor, sin fórmulas.

## Evidence on Hand

- Foto de portada: "Cosmic Cliffs" (Nebulosa de Carina), telescopio James Webb. Crédito obligatorio: NASA, ESA, CSA, STScI.
- No hay todavía: textos de artículos, fotos del doctor, datos de lectura. No inventar cifras, citas ni datos científicos sin fuente.

## Product Principles

1. Primero que se entienda, después que impresione.
2. Cada pieza conecta con las demás (el tiempo con los agujeros negros, los fluidos con las nebulosas).
3. Nada de relleno: si un botón no funciona, no se muestra.
4. Real antes que inventado: imágenes y datos con crédito y fuente.
