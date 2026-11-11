import { useEffect, useState } from 'react'

const consulta = '(prefers-reduced-motion: reduce)'

// true si el sistema pide reducir el movimiento.
export default function useReduceMotion() {
  const [reducir, setReducir] = useState(() => window.matchMedia?.(consulta).matches ?? false)

  useEffect(() => {
    const mq = window.matchMedia?.(consulta)
    if (!mq) return undefined
    const cambiar = () => setReducir(mq.matches)
    mq.addEventListener('change', cambiar)
    return () => mq.removeEventListener('change', cambiar)
  }, [])

  return reducir
}
