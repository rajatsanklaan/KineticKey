import './Stats.css'

const stats = [
  { value: '6', label: 'Rooms shown' },
  { value: '4', label: 'Irish cities' },
  { value: '€500–€900', label: 'Typical rent' },
  { value: 'Walk times', label: 'On every card' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-row">
        {stats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
