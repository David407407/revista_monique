import { useEffect, useRef, useState } from 'react'
import { NBSP } from '../typo.js'
import Modulo from './Modulo.jsx'
import useReduceMotion from './useReduceMotion.js'
import s from './Modulos.module.css'

const DURACION_MS = 24000
const COLUMNAS = 200
const FILAS = 126
const FRANJAS = 8
// Pentatónica menor de La, de la franja de arriba (aguda) a la de abajo (grave): D4 C4 A3 G3 E3 D3 C3 A2
const NOTAS = [293.66, 261.63, 220, 196, 164.81, 146.83, 130.81, 110]
const GANANCIA = 0.06
const PASOS_REDUCIDOS = 24

// Brillo medio (0–1, normalizado al máximo) de 8 franjas horizontales en cada una de las 200 columnas.
async function analizarImagen(src) {
  const img = new Image()
  img.src = src
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = COLUMNAS
  canvas.height = FILAS
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, COLUMNAS, FILAS)
  const { data } = ctx.getImageData(0, 0, COLUMNAS, FILAS)
  const alto = FILAS / FRANJAS
  const columnas = []
  let maximo = 0
  for (let x = 0; x < COLUMNAS; x++) {
    const franjas = []
    for (let b = 0; b < FRANJAS; b++) {
      let suma = 0
      let n = 0
      for (let y = Math.floor(b * alto); y < Math.floor((b + 1) * alto); y++) {
        const k = (y * COLUMNAS + x) * 4
        suma += (0.2126 * data[k] + 0.7152 * data[k + 1] + 0.0722 * data[k + 2]) / 255
        n++
      }
      const media = suma / n
      maximo = Math.max(maximo, media)
      franjas.push(media)
    }
    columnas.push(franjas)
  }
  return columnas.map((f) => f.map((v) => v / maximo))
}

// Con reduced-motion la línea avanza en pasos discretos.
function dibujarLinea(el, progreso, reducir) {
  const p = reducir ? Math.floor(progreso * PASOS_REDUCIDOS) / PASOS_REDUCIDOS : progreso
  if (el) el.style.left = `${p * 100}%`
}

function silenciar(a) {
  if (!a) return
  a.voces.forEach(({ g }) => g.gain.setTargetAtTime(0, a.ctx.currentTime, 0.05))
}

// M5 — «Écouter la nébuleuse»: sonificación hecha con Web Audio. No arranca sola.
export default function ModuloSonido({ t, imagen }) {
  const [jugando, setJugando] = useState(false)
  const [volumen, setVolumen] = useState(0.4)
  const [error, setError] = useState(false)
  const reducir = useReduceMotion()
  const audio = useRef(null) // { ctx, maestro, voces, brillo }
  const progreso = useRef(0) // 0–1
  const linea = useRef(null)

  async function preparar() {
    if (audio.current) return audio.current
    const Contexto = window.AudioContext || window.webkitAudioContext
    if (!Contexto) throw new Error('sin Web Audio')
    const brillo = await analizarImagen(imagen)
    const ctx = new Contexto()
    const compresor = ctx.createDynamicsCompressor()
    const maestro = ctx.createGain()
    maestro.gain.value = volumen
    maestro.connect(compresor)
    compresor.connect(ctx.destination)
    const voces = NOTAS.map((frecuencia) => {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = frecuencia
      const g = ctx.createGain()
      g.gain.value = 0
      o.connect(g)
      g.connect(maestro)
      o.start()
      return { o, g }
    })
    audio.current = { ctx, maestro, voces, brillo }
    return audio.current
  }

  async function alternar() {
    if (jugando) {
      setJugando(false)
      return
    }
    try {
      const a = await preparar()
      await a.ctx.resume()
      if (progreso.current >= 1) progreso.current = 0
      setJugando(true)
    } catch {
      setError(true)
    }
  }

  const reiniciar = () => {
    progreso.current = 0
    dibujarLinea(linea.current, progreso.current, reducir)
  }

  // Bucle de reproducción
  useEffect(() => {
    const a = audio.current
    if (!jugando || !a) {
      silenciar(a)
      return undefined
    }
    let previo = performance.now()
    let id
    const paso = (ahora) => {
      progreso.current = Math.min(1, progreso.current + (ahora - previo) / DURACION_MS)
      previo = ahora
      const col = Math.min(COLUMNAS - 1, Math.floor(progreso.current * COLUMNAS))
      a.voces.forEach(({ g }, b) => g.gain.setTargetAtTime(a.brillo[col][b] * GANANCIA, a.ctx.currentTime, 0.05))
      dibujarLinea(linea.current, progreso.current, reducir)
      if (progreso.current >= 1) setJugando(false)
      else id = requestAnimationFrame(paso)
    }
    id = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(id)
  }, [jugando, reducir])

  // Volumen
  useEffect(() => {
    const a = audio.current
    if (a) a.maestro.gain.setTargetAtTime(volumen, a.ctx.currentTime, 0.05)
  }, [volumen])

  // Liberar el audio al desmontar
  useEffect(
    () => () => {
      const a = audio.current
      if (!a) return
      a.voces.forEach(({ o }) => o.stop())
      a.ctx.close()
      audio.current = null
    },
    [],
  )

  return (
    <Modulo id="nebulosas-sonido" kicker={t.kicker} titulo={t.titulo} apoyo={t.apoyo}>
      <div className={s.colAncha}>
        <div className={s.visor}>
          <img src={imagen} alt={t.alt} loading="lazy" decoding="async" className={s.visorImg} />
          <span ref={linea} className={s.lineaLectura} aria-hidden="true" />
        </div>
      </div>

      <div className={s.colFicha}>
        <div className={s.filaAcciones}>
          <button type="button" aria-pressed={jugando} className={s.pildora} onClick={alternar}>
            {jugando ? t.pausa : t.escuchar}
          </button>
          <button type="button" className={s.pildora} onClick={reiniciar}>
            {t.reiniciar}
          </button>
        </div>
        <label className={s.volumen}>
          <span className={s.dato}>{t.volumen}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volumen}
            aria-valuetext={`${Math.round(volumen * 100)}${NBSP}%`}
            onChange={(e) => setVolumen(Number(e.target.value))}
            className={s.curseur}
            style={{ '--progreso': `${volumen * 100}%` }}
          />
        </label>
        <p className={s.apoyo}>{t.alternativa}</p>
        <p className={s.nota}>{t.aviso}</p>
        <p role="status" className={s.nota}>
          {error ? t.sinAudio : ''}
        </p>
      </div>
    </Modulo>
  )
}
