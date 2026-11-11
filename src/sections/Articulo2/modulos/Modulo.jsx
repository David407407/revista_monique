import s from './Modulos.module.css'

// Tarjeta oscura común a todos los módulos interactivos (mismo estilo que «Explorez l’image»).
export default function Modulo({ id, kicker, titulo, apoyo, className = '', children }) {
  return (
    <section aria-labelledby={id} className={`${s.modulo} ${className}`}>
      <header className={s.cabecera}>
        <p className={s.kicker}>{kicker}</p>
        <h2 id={id} className={s.titulo}>{titulo}</h2>
        {apoyo && <p className={s.apoyo}>{apoyo}</p>}
      </header>
      {children}
    </section>
  )
}
