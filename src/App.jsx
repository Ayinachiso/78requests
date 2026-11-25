import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import AdminHomePage from './pages/AdminHomePage.jsx'
import Login from './pages/auth/Login.jsx'
import AccountSetup from './pages/auth/AccountSetup.jsx'
import SetupIntro from './pages/auth/SetupIntro.jsx'
import TwoStepSetup from './pages/auth/TwoStepSetup.jsx'
import TwoStepChallenge from './pages/auth/TwoStepChallenge.jsx'
import BrandMark from './components/Brand.jsx'
import { getSession, signOut } from './services/authApi.js'
import './styles/auth.css'

function App() {
  const employeeMode = window.location.pathname.startsWith('/employee')
  const [signedInEmail, setSignedInEmail] = useState('')
  const [setupAccount, setSetupAccount] = useState(null)
  const [authStep, setAuthStep] = useState('login')
  const [challenge, setChallenge] = useState(null)
  const [sessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    let active = true
    getSession().then((user) => {
      if (active && user) setSignedInEmail(user.email)
    }).finally(() => {
      if (active) setSessionLoading(false)
    })
    return () => { active = false }
  }, [])

  async function handleSignOut() {
    try {
      await signOut()
    } catch {
      // Clear the local view even if the remote sign-out endpoint is temporarily unavailable.
    } finally {
      setSignedInEmail('')
      setSetupAccount(null)
      setChallenge(null)
      setAuthStep('login')
    }
  }

  if (sessionLoading) {
    return <main className="auth-loading"><BrandMark className="requests-mark" /><span>Requests</span></main>
  }

  if (setupAccount && authStep === 'intro') {
    return <SetupIntro role={setupAccount.role} onContinue={() => setAuthStep('password')} onBack={() => { setSetupAccount(null); setAuthStep('login') }} />
  }
  if (setupAccount && authStep === 'password') {
    return (
      <AccountSetup
        account={setupAccount}
        onComplete={(account) => { setSetupAccount(account); setAuthStep('two-step') }}
      />
    )
  }
  if (setupAccount && authStep === 'two-step') {
    return <TwoStepSetup account={setupAccount} onComplete={(email) => { setSetupAccount(null); setAuthStep('login'); setSignedInEmail(email) }} />
  }
  if (challenge) {
    return <TwoStepChallenge challenge={challenge} onComplete={setSignedInEmail} />
  }
  if (!signedInEmail) {
    return <Login
      variant={employeeMode ? 'employee' : 'admin'}
      onSetupRequired={(account) => { setSetupAccount(account); setAuthStep('intro') }}
      onTwoStepRequired={setChallenge}
      onSignedIn={setSignedInEmail}
    />
  }

  return employeeMode
    ? <HomePage email={signedInEmail} onSignOut={handleSignOut} />
    : <AdminHomePage email={signedInEmail} onSignOut={handleSignOut} />
}

export default App
