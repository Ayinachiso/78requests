import { useEffect, useState } from 'react'
import { requestPasswordReset, signIn } from '../../services/authApi.js'
import { Brand } from '../../components/Brand.jsx'
import PasswordEye from '../../components/PasswordEye.jsx'

export function PromoPanel() {
  const [slide, setSlide] = useState(0)
  const slides = [
    { image: '/images/auth-team-1.jpg', first: 'Approved', second: 'On its way', title: 'Every purchase request,', highlight: 'in one place', description: 'Submit, track and approve spending without chasing emails or paper.' },
    { image: '/images/auth-team-2.jpg', first: 'Request sent', second: 'Paid', title: 'Approvals that', highlight: 'follow your rules', description: 'Each request goes to the right people in order, based on category and amount.' },
    { image: '/images/auth-team-1.jpg', first: 'Approved', second: 'On its way', title: 'A record of', highlight: 'every action', description: 'Who approved, who paid and who changed access, all kept in the audit log.' },
  ]
  const current = slides[slide]

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((currentSlide) => (currentSlide + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <aside className="auth-promo" aria-label="78 Requests procurement workspace">
      <img className="promo-photo" src={current.image} alt="Colleagues reviewing a purchase request together" />
      <span className="promo-status promo-status-top">{current.first}</span>
      <span className="promo-status promo-status-side">{current.second}</span>
      <div className="promo-shade" />
      <div className="promo-content">
        <h2>{current.title} <em>{current.highlight}</em></h2>
        <p>{current.description}</p>
        <div className="promo-dots" aria-label="Choose a featured image">
          {slides.map((item, index) => (
            <button key={index} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)} />
          ))}
        </div>
      </div>
    </aside>
  )
}

function Login({ onSetupRequired, onTwoStepRequired, onSignedIn, variant = 'admin' }) {
  const isEmployee = variant === 'employee'
  const [email, setEmail] = useState(isEmployee ? 'adaeze.okafor@bank78.co' : 'sade.ogunleye@bank78.co')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    const normalizedEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid work email address.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }

    setBusy(true)
    try {
      const result = await signIn(normalizedEmail, password)
      if (result.requiresAccountSetup || result.requiresPasswordSetup) {
        onSetupRequired({ email: normalizedEmail, temporaryPassword: password, setupToken: result.setupToken, role: variant })
      } else if (result.requiresTwoStepVerification) {
        onTwoStepRequired({ email: normalizedEmail, challengeToken: result.challengeToken, role: variant })
      } else {
        onSignedIn(normalizedEmail)
      }
    } catch (submitError) {
      setError(submitError.message || 'We could not sign you in. Try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleForgotPassword() {
    setError('')
    setNotice('')
    const normalizedEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter your company email first.')
      return
    }
    setBusy(true)
    try {
      await requestPasswordReset(normalizedEmail)
      setNotice('If an account exists for this email, password reset instructions will be sent.')
    } catch (requestError) {
      setError(requestError.message || 'We could not request a password reset. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="auth-shell auth-shell-split">
      <div className="auth-left">
        <Brand />
        <section className="signin-panel" aria-labelledby="signin-title">
          <h1 id="signin-title">Sign in</h1>
          <p className="auth-subtitle">{isEmployee ? 'Use the email and temporary password from your invitation.' : 'Use the email and password IT sent you.'}</p>
          <form className="reference-form signin-form" onSubmit={handleSubmit} noValidate>
            <label className="reference-label" htmlFor="email">Company email</label>
            <input className="reference-input" id="email" type="email" autoComplete="username" autoFocus placeholder="name@company.com" value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} />

            <label className="reference-label password-caption" htmlFor="password">Password</label>
            <div className="reference-password">
              <input className="reference-input" id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} />
              <button className="reference-eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} disabled={busy}><PasswordEye visible={showPassword} /></button>
            </div>
            <button className="password-forgot" type="button" onClick={handleForgotPassword} disabled={busy}>Forgot password?</button>
            <p className="reference-notice" role="status">{notice}</p>
            <p className="reference-error" role="alert">{error}</p>
            <button className="reference-submit signin-submit" type="submit" disabled={busy}>{busy ? 'Signing inâ€¦' : 'Continue'}</button>
          </form>
          <p className="reference-help">{isEmployee ? 'No invitation yet? Ask your admin.' : "Don't have them yet? Ask IT."}</p>
        </section>
      </div>
      <PromoPanel />
    </main>
  )
}

export default Login
