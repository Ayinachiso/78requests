import { useState } from 'react'
import { Brand } from '../../components/Brand.jsx'
import { verifyTwoStepSignIn } from '../../services/authApi.js'

function TwoStepChallenge({ challenge, onComplete }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from your authenticator app.')
      return
    }
    setBusy(true)
    try {
      await verifyTwoStepSignIn({ email: challenge.email, challengeToken: challenge.challengeToken, code })
      onComplete(challenge.email)
    } catch (requestError) {
      setError(requestError.message || 'That code could not be verified. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="setup-shell challenge-shell">
      <div className="setup-content">
        <Brand className="setup-brand" />
        <section className="setup-card challenge-card" aria-labelledby="challenge-title">
          <span className="setup-badge setup-card-badge">{challenge.role === 'employee' ? 'Employee sign-in' : 'Super Admin sign-in'}</span>
          <h1 id="challenge-title">Enter your code</h1>
          <p className="setup-description">Open your authenticator app and enter the 6-digit code for 78 Requests.</p>
          <form className="setup-form mfa-form" onSubmit={handleSubmit} noValidate>
            <label className="reference-label" htmlFor="signin-code">6-digit code</label>
            <input className="reference-input mfa-code-input" id="signin-code" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} autoFocus placeholder="000000" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} disabled={busy} />
            <p className="reference-error setup-error" role="alert">{error}</p>
            <button className="reference-submit setup-submit" type="submit" disabled={busy}>{busy ? 'Verifying…' : 'Sign in'}</button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default TwoStepChallenge
