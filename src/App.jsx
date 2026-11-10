// Muestra temporal de estilos. Se reemplaza cuando existan las secciones.
const colores = [
  ['--abismo', 'Abismo'], ['--bosque', 'Bosque'], ['--grafito', 'Grafito'],
  ['--papel', 'Papel lunar'], ['--papel-2', 'Papel 2'],
  ['--biolum', 'Bioluminiscencia'], ['--plasma', 'Plasma'],
  ['--nebulosa', 'Nebulosa'], ['--azul-palido', 'Azul pálido'],
]

export default function App() {
  return (
    <main style={{ background: 'var(--papel)', minHeight: '100vh', padding: 'clamp(24px, 5vw, 64px)' }}>
      <h1 style={{ fontSize: 'var(--text-hero-portada)' }}>
        Point Bleu <em style={{ color: 'var(--biolum-papel)' }}>Pâle</em>
      </h1>
      <p className="lead" style={{ marginTop: 24, maxWidth: 'var(--measure)' }}>
        Iluminando la ciencia que no se ve.
      </p>
      <h2 style={{ marginTop: 56 }}>Lo que cabe en un agujero negro</h2>
      <p style={{ marginTop: 16, maxWidth: 'var(--measure)' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="mono" style={{ marginTop: 16, color: 'var(--tinta-suave)' }}>
        Nº 07 — Noviembre 2026 · 12 min
      </p>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {colores.map(([v, nombre]) => (
          <li key={v} className="label" style={{ width: 150 }}>
            <span style={{ display: 'block', height: 64, borderRadius: 12, background: `var(${v})`, border: '1px solid var(--borde-papel)' }} />
            <span style={{ display: 'block', marginTop: 8 }}>{nombre}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
