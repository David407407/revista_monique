// Typographie française para los textos de la sección (helper reutilizable).
// - espacio no separable (U+00A0) antes de : ; ! ? y dentro de « »
// - espacio fino no separable (U+202F) en los miles: «6 500»
// - apóstrofo tipográfico ’
// - guion normal en lugar de U+2011 (las fuentes del proyecto no tienen ese glifo)
export const NBSP = ' '
export const FINE = ' '
const WJ = '⁠' // word joiner: impide el corte de línea sin dibujar nada

const nf = new Intl.NumberFormat('fr-FR')
const nfAnnee = new Intl.NumberFormat('fr-FR', { useGrouping: false })

// Números con espacio fino en los miles y coma decimal (Intl usa U+202F en fr-FR).
export const nombre = (n, opciones) => (opciones ? new Intl.NumberFormat('fr-FR', opciones) : nf).format(n)
export const annee = (n) => nfAnnee.format(n)

export function fr(texto) {
  return texto
    .replace(/‑/g, '-')
    .replace(/'/g, '’')
    .replace(/« ?/g, `«${NBSP}`)
    .replace(/ ?»/g, `${NBSP}»`)
    .replace(/ ([:;!?])/g, `${NBSP}$1`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${FINE}$2`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${FINE}$2`) // segunda pasada: 38 000 000
    .replace(/(\d) (µm|km\/h|km\/s|km|UA|ans?\b|M\b)/g, `$1${NBSP}$2`)
    .replace(/≈ /g, `≈${NBSP}`)
    .replace(/\bN° ?/g, `N°${NBSP}`)
    .replace(/av\. J\.-C\./g, `av.${NBSP}J.-${WJ}C.`)
}

// Aplica fr() a todas las cadenas de un objeto de contenido, salvo enlaces, colores e ids.
const CLAVES_CRUDAS = new Set(['href', 'hex', 'id'])
export function frProfundo(valor, clave) {
  if (typeof valor === 'string') return CLAVES_CRUDAS.has(clave) ? valor : fr(valor)
  if (Array.isArray(valor)) return valor.map((v) => frProfundo(v))
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, frProfundo(v, k)]))
  }
  return valor
}
