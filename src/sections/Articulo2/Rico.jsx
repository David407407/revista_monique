// Texto con marcado mínimo: *cursiva* y «1er» como 1<sup>er</sup>.
export default function Rico({ children }) {
  return children.split(/(\*[^*]+\*|\b1er\b)/g).map((parte, i) => {
    if (parte.startsWith('*') && parte.endsWith('*') && parte.length > 2) return <em key={i}>{parte.slice(1, -1)}</em>
    if (parte === '1er') return <span key={i}>1<sup>er</sup></span>
    return parte
  })
}
