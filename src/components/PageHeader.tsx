import './PageHeader.css'

type Props = {
  eyebrow: string
  title: string
  text: string
}

export default function PageHeader({ eyebrow, title, text }: Props) {
  return (
    <section className="page-header">
      <div className="container page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{text}</p>
      </div>
    </section>
  )
}
