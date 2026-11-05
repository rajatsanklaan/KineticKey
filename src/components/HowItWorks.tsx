import './HowItWorks.css'

const steps = [
  {
    n: '01',
    title: 'Pick an area',
    text: 'Dublin 6, Dublin 8, Cork, Galway or Limerick — then set rooms and rent.',
  },
  {
    n: '02',
    title: 'Check walking times',
    text: 'See Luas, shops, parks and more on each landlord listing.',
  },
  {
    n: '03',
    title: 'Book a viewing',
    text: 'Open a room, read the details, then request a visit.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Process</p>
          <h2>How KineticKey works</h2>
          <p className="muted">Three short steps from area search to a room viewing.</p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article key={step.n} className="step-card">
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
