import { useState } from 'react'
import { setPassword } from '../../services/authApi.js'
import { Brand } from '../../components/Brand.jsx'
import PasswordEye from '../../components/PasswordEye.jsx'

const passwordRules = [
  { label: 'At least 12 characters', test: (value) => value.length >= 12 },
  { label: 'An upper and a lower case letter', test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'A number and a symbol', test: (value) => /\d/.test(value) && /[^A-Za-z0-9]/.test(value) },
]

function AccountSetup({ account, onComplete }) {
  const [password, setPasswordValue] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const allRulesPass = passwordRules.every((rule) => rule.test(password))
  const passwordsMatch = Boolean(password) && password === confirmPassword

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!allRulesPass || !passwordsMatch) {
      setError('Meet each password requirement before continuing.')
      return
    }

    setBusy(true)
    try {
      const result = await setPassword({
        email: account.email,
        temporaryPassword: account.temporaryPassword,
        newPassword: password,
      })
      onComplete({ ...account, setupToken: result.setupToken || account.setupToken })
    } catch (submitError) {
      setError(submitError.message || 'We could not save your password. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="setup-shell password-setup-shell">
      <div className="setup-content password-setup-content">
        <Brand className="setup-brand" />
        <section className="setup-card password-setup-card" aria-labelledby="setup-title">
          <h1 id="setup-title">Choose a new password</h1>
          <p className="setup-description">This replaces the temporary password IT sent you. {account.role === 'employee' ? 'You can add a code from your phone for extra security.' : 'You’ll use it with a code from your phone every time you sign in.'}</p>
          <form className="setup-form" onSubmit={handleSubmit} noValidate>
            <label className="reference-label" htmlFor="new-password">New password</label>
            <div className="reference-password">
              <input
                className="reference-input"
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPasswordValue(event.target.value)}
                disabled={busy}
              />
              <button className="reference-eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} disabled={busy}><PasswordEye visible={showPassword} /></button>
            </div>

            <label className="reference-label setup-confirm-label" htmlFor="confirm-password">Confirm password</label>
            <div className="reference-password">
              <input
                className="reference-input"
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={busy}
              />
              <button className="reference-eye" type="button" aria-label={showConfirm ? 'Hide password' : 'Show password'} aria-pressed={showConfirm} onClick={() => setShowConfirm((visible) => !visible)} disabled={busy}><PasswordEye visible={showConfirm} /></button>
            </div>

            <ul className="password-rules">
              {passwordRules.map((rule) => {
                const passed = rule.test(password)
                return <li className={passed ? 'rule-passed' : ''} key={rule.label}><span aria-hidden="true">{passed ? '✓' : ''}</span>{rule.label}</li>
              })}
              <li className={passwordsMatch ? 'rule-passed' : ''}><span aria-hidden="true">{passwordsMatch ? '✓' : ''}</span>Both passwords match</li>
            </ul>
            <p className="reference-error setup-error" role="alert">{error}</p>
            <button className="reference-submit setup-submit" type="submit" disabled={busy}>
              {busy ? 'Saving password…' : 'Continue'}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default AccountSetup
