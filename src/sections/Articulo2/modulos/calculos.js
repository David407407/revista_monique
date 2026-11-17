// Cálculos de los módulos (compartidos con las versiones estáticas del modo Simple).
import { NBSP, annee, nombre } from '../typo.js'

export const KM_POR_AL = 9.4607e12
export const SEGUNDOS_POR_ANIO = 31557600

// années = (longitud × km por año-luz) / velocidad en km/s / segundos por año
export const dureeAnnees = (longitudAl, kmS) => (longitudAl * KM_POR_AL) / kmS / SEGUNDOS_POR_ANIO

const dosCifras = (n) => {
  const paso = 10 ** (Math.floor(Math.log10(n)) - 1)
  return Math.round(n / paso) * paso
}

const UNIDADES = {
  fr: { millones: 'millions d’années', anio: 'an', anios: 'ans' },
  en: { millones: 'million years', anio: 'year', anios: 'years' },
}

// ≥ 1 millón → «≈ X millions d’années» (1 decimal si < 10); ≥ 1 000 → 2 cifras significativas; < 10 → entero.
export function formatDuree(anios, idioma = 'fr') {
  const u = UNIDADES[idioma]
  if (anios >= 1e6) {
    const m = anios / 1e6
    const v = m < 10 ? Math.round(m * 10) / 10 : dosCifras(m)
    return `≈${NBSP}${nombre(v, undefined, idioma)}${NBSP}${u.millones}`
  }
  if (anios >= 1000) return `≈${NBSP}${nombre(dosCifras(anios), undefined, idioma)}${NBSP}${u.anios}`
  if (anios < 10) {
    const v = Math.round(anios)
    return `${nombre(v, undefined, idioma)}${NBSP}${plural(v, [u.anio, u.anios], idioma)}`
  }
  return `≈${NBSP}${nombre(Math.round(anios), undefined, idioma)}${NBSP}${u.anios}`
}

// Posición en la barra logarítmica de 1 año (0) a 1 000 millones de años (1).
export const posicionLog = (anios) => Math.min(1, Math.max(0, Math.log10(Math.max(anios, 1)) / 9))

// Año calendario a partir de los años transcurridos. No existe el año 0: 0 → 1 av. J.-C.
export function anneeTexte(ecoule, anioSalida, avJC) {
  const a = anioSalida + ecoule
  return a >= 1 ? annee(a) : `${annee(1 - a)}${NBSP}${avJC}`
}

// Francés: 0 y 1 van en singular. Inglés: solo 1.
export const plural = (n, [uno, varios], idioma = 'fr') => ((idioma === 'en' ? n === 1 : n < 2) ? uno : varios)
