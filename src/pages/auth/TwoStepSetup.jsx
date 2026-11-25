import { useEffect, useState } from 'react'
import { Brand } from '../../components/Brand.jsx'
import { beginTwoStepSetup, skipTwoStepSetup, verifyTwoStepSetup } from '../../services/authApi.js'

function TwoStepSetup({ account, onComplete }) {
  const isEmployee = account.role === 'employee'
  const [enrollment, setEnrollment] = useState(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    beginTwoStepSetup({ email: account.email, setupToken: account.setupToken })
      .then((result) => { if (active) setEnrollment(result) })
      .catch((requestError) => { if (active) setError(requestError.message || 'Could not start two-step setup.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [account.email, account.setupToken])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from your authenticator app.')
      return
    }
    setBusy(true)
    try {
      await verifyTwoStepSetup({ email: account.email, setupToken: enrollment?.setupToken || account.setupToken, code })
      onComplete(account.email)
    } catch (requestError) {
      setError(requestError.message || 'That code could not be verified. Try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSkip() {
    setError('')
    setBusy(true)
    try {
      await skipTwoStepSetup({ email: account.email, setupToken: enrollment?.setupToken || account.setupToken })
      onComplete(account.email)
    } catch (requestError) {
      setError(requestError.message || 'We could not skip this step. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="setup-shell two-step-shell">
      <div className="setup-content two-step-content">
        <Brand className="setup-brand" />
        <section className="setup-card two-step-card" aria-labelledby="two-step-title">
          <h1 id="two-step-title">{isEmployee ? 'Add a code from your phone' : 'Turn on two-step verification'}</h1>
          <p className="setup-description">{isEmployee ? 'This keeps your account safe even if someone learns your password. Scan the code with an authenticator app, then type the 6 digits. You can skip this for now.' : 'Open an authenticator app on your phone, scan this code, then type the 6 digits it shows. This is required for every Super Admin.'}</p>
          {loading ? <div className="qr-placeholder" role="status">Preparing your secure setupâ€¦</div> : null}
          {!loading && enrollment?.qrCodeDataUrl ? (
            <div className="setup-qr-row">
              <img className="enrollment-qr" src={enrollment.qrCodeDataUrl} alt="Scan with your authenticator app" />
              {enrollment.secret ? <div className="secret-key"><span>Canâ€™t scan? Type this key instead</span><code>{enrollment.secret}</code></div> : null}
            </div>
          ) : null}
          {!loading && !enrollment?.demo && !enrollment?.qrCodeDataUrl && !error ? <p className="setup-inline-error" role="alert">The setup endpoint did not return a QR code.</p> : null}
          <form className="setup-form mfa-form" onSubmit={handleSubmit} noValidate>
            <label className="reference-label" htmlFor="setup-code">6-digit code</label>
            <input className="reference-input mfa-code-input" id="setup-code" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="0 0 0 0 0 0" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} disabled={busy || loading || !enrollment} />
            <p className="reference-error setup-error" role="alert">{error}</p>
            <button className="reference-submit setup-submit" type="submit" disabled={busy || loading || !enrollment}>{busy ? 'Verifying...' : isEmployee ? 'Verify and continue' : 'Verify and open my dashboard'}</button>
            {isEmployee && <button className="skip-setup-button" type="button" onClick={handleSkip} disabled={busy || loading}>{busy ? 'Please wait...' : 'Skip for now'}</button>}
          </form>
        </section>
      </div>
    </main>
  )
}

export default TwoStepSetup
