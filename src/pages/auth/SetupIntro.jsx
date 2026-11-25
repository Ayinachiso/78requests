import { Brand } from '../../components/Brand.jsx'
import { PromoPanel } from './Login.jsx'

function SetupIntro({ onContinue, onBack, role = 'admin' }) {
  const isEmployee = role === 'employee'
  return (
    <main className="auth-shell auth-shell-split">
      <div className="auth-left">
        <Brand />
        <section className="setup-intro-panel" aria-labelledby="intro-title">
          <span className="setup-badge"><svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 2.5 16 5v4.4c0 3.7-2.4 6.2-6 8.1-3.6-1.9-6-4.4-6-8.1V5l6-2.5Z" /><path d="m7.5 9.8 1.7 1.7 3.5-3.8" /></svg> {isEmployee ? 'Invitation from Bank 78' : 'Super Admin account'}</span>
          <h1 id="intro-title">Set up your account</h1>
          <p className="auth-subtitle">{isEmployee ? 'Two quick steps and you’re in.' : 'Three quick steps and you’re in.'}</p>
          <button className="reference-submit intro-submit" type="button" onClick={onContinue}>
            Set up my account <span aria-hidden="true">→</span>
          </button>
          <ul className="setup-next-steps">
            {isEmployee ? <>
              <li className="setup-step-complete"><span className="step-number" aria-label="Complete"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg></span><span><b>Open your invitation</b><small>You did this from your email</small></span></li>
              <li><span className="step-number">2</span><span><b>Choose a password</b><small>For signing in to 78 Requests</small></span></li>
              <li><span className="step-number">3</span><span><b>Add a phone code</b><small>Optional, and you can do it later</small></span></li>
            </> : <>
              <li className="setup-step-complete"><span className="step-number" aria-label="Complete"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg></span><span><b>Sign in</b><small>With the temporary password from IT</small></span></li>
              <li><span className="step-number">2</span><span><b>Choose a new password</b><small>Replaces the temporary one</small></span></li>
              <li><span className="step-number">3</span><span><b>Turn on two-step verification</b><small>A code from your phone</small></span></li>
            </>}
          </ul>
          <div className="setup-meta">
            <span><svg aria-hidden="true" viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg>{isEmployee ? 'Link valid for 72 hours' : 'Created by Bank 78 IT'}</span>
            <span><svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.5 1.5" /></svg>{isEmployee ? 'About 1 minute' : 'About 2 minutes'}</span>
          </div>
          <button className="setup-back-link" type="button" onClick={onBack}>Back to sign in</button>
        </section>
      </div>
      <PromoPanel />
    </main>
  )
}

export default SetupIntro
