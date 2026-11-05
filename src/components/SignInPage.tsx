import PageHeader from './PageHeader'
import './SignInPage.css'

export default function SignInPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Account"
        title="Sign in"
        text="Landlords manage rooms here. Tenants save listings and book viewings."
      />
      <section className="section">
        <div className="container">
          <form className="signin-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Email
              <input type="email" placeholder="you@email.com" required />
            </label>
            <label>
              Password
              <input type="password" placeholder="Your password" required />
            </label>
            <button className="btn btn-accent" type="submit">
              Sign in
            </button>
            <p className="signin-note">Google and email sign-in will connect through Supabase Auth.</p>
          </form>
        </div>
      </section>
    </div>
  )
}
