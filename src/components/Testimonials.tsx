import './Testimonials.css'

const summary = {
  score: '4.8',
  count: '126',
  label: 'from tenants who booked a room',
}

const reviews = [
  {
    name: 'Maeve K.',
    city: 'Dublin 8',
    room: 'Portobello ensuite',
    rating: 5,
    text: 'Walking times on the listing matched the real street. I booked a viewing on KineticKey and moved in the same week.',
  },
  {
    name: 'Tomás O.',
    city: 'Galway',
    room: 'Salthill single',
    rating: 5,
    text: 'Clear photos and bills marked upfront. No chasing landlords on random apps — just a simple viewing request.',
  },
  {
    name: 'Sara L.',
    city: 'Cork',
    room: 'College Road double',
    rating: 4,
    text: 'Found a room near UCC with the area filters. The landlord replied fast and the house was as described.',
  },
  {
    name: 'James R.',
    city: 'Limerick',
    room: 'City centre studio',
    rating: 5,
    text: 'Eircode and nearby tags made shortlisting easy. I knew the bus stop was a minute away before I visited.',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <i key={index} className={index < rating ? 'is-on' : undefined} />
      ))}
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-top">
          <div className="section-head">
            <p className="eyebrow">Tenant feedback</p>
            <h2>Rated by people who found their room here</h2>
            <p className="muted">
              Reviews from tenants after they booked a viewing and moved into a KineticKey listing.
            </p>
          </div>

          <div className="testimonials-score">
            <strong>{summary.score}</strong>
            <Stars rating={5} />
            <p>
              Average from {summary.count} reviews
              <span>{summary.label}</span>
            </p>
          </div>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <article key={review.name} className="testimonial-card">
              <div className="testimonial-card-top">
                <Stars rating={review.rating} />
                <span>{review.rating}.0</span>
              </div>
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-by">
                <span className="testimonial-av" aria-hidden="true">
                  {review.name.charAt(0)}
                </span>
                <div>
                  <strong>{review.name}</strong>
                  <span>
                    {review.city} · {review.room}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
