import { useCallback, useEffect, useState } from 'react'
import ProcurementLayout from './components/ProcurementLayout.jsx'
// The Super Admin tour is paused; its component and steps remain available for later.
import { normalizeRoute, routeHash } from './data/productNavigation.js'
import OverviewPage from './pages/superadmin_dashboard/OverviewPage.jsx'
import UsersPage from './pages/superadmin_dashboard/UsersPage.jsx'
import RolesPage from './pages/superadmin_dashboard/RolesPage.jsx'
import AuditLogPage from './pages/superadmin_dashboard/AuditLogPage.jsx'
import RequestsPage from './pages/superadmin_dashboard/RequestsPage.jsx'
import EmployeeHomePage from './pages/employee/EmployeeHomePage.jsx'
import EmployeeRequestsPage from './pages/employee/EmployeeRequestsPage.jsx'
import MakeRequestPage from './pages/employee/MakeRequestPage.jsx'
import RequestDetailPage from './pages/employee/RequestDetailPage.jsx'
import ReceiptPage from './pages/employee/ReceiptPage.jsx'
import EmployeeUpdatesPage from './pages/employee/UpdatesPage.jsx'
import ApproverHomePage from './pages/approver/ApproverHomePage.jsx'
import ApprovalsPage from './pages/approver/ApprovalsPage.jsx'
import ReviewRequestPage from './pages/approver/ReviewRequestPage.jsx'
import MyRequestsPage from './pages/approver/MyRequestsPage.jsx'
import ApproverUpdatesPage from './pages/approver/UpdatesPage.jsx'
import FinanceHomePage from './pages/finance/FinanceHomePage.jsx'
import PaymentsPage from './pages/finance/PaymentsPage.jsx'
import PayOutPage from './pages/finance/PayOutPage.jsx'
import AfterPaymentPage from './pages/finance/AfterPaymentPage.jsx'
import PaymentBreakdownPage from './pages/finance/PaymentBreakdownPage.jsx'
import OwnRequestsPage from './pages/finance/OwnRequestsPage.jsx'
import FinanceUpdatesPage from './pages/finance/UpdatesPage.jsx'
import Login from './pages/auth/Login.jsx'
import SetupIntro from './pages/auth/SetupIntro.jsx'
import AccountSetup from './pages/auth/AccountSetup.jsx'
import TwoStepSetup from './pages/auth/TwoStepSetup.jsx'
import TwoStepChallenge from './pages/auth/TwoStepChallenge.jsx'
import { getSession, signOut } from './services/authApi.js'
import './styles/auth.css'

function productRole(role, email = '') {
  const normalized = String(role || '').toLowerCase().replace(/[^a-z]/g, '')
  if (normalized.includes('approver')) return 'approver'
  if (normalized.includes('finance')) return 'finance'
  if (normalized.includes('employee')) return 'employee'
  if (normalized.includes('admin') || normalized === 'superadmin') return 'superadmin'
  return email.toLowerCase() === 'adaeze.okafor@bank78.co' ? 'employee' : 'superadmin'
}

function App() {
  const [route, setRoute] = useState(() => normalizeRoute(window.location.hash || '#/auth/sign-in'))
  const [message, setMessage] = useState('')
  const [authVariant, setAuthVariant] = useState(() => route.role === 'employee' ? 'employee' : 'admin')
  const [authTargetRole, setAuthTargetRole] = useState(() => route.role === 'auth' ? 'superadmin' : route.role)
  const [authStep, setAuthStep] = useState('login')
  const [setupAccount, setSetupAccount] = useState(null)
  const [challenge, setChallenge] = useState(null)
  const [signedInEmail, setSignedInEmail] = useState('')

  useEffect(() => {
    const sync = () => setRoute(normalizeRoute(window.location.hash))
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!message) return undefined
    const id = window.setTimeout(() => setMessage(''), 3500)
    return () => window.clearTimeout(id)
  }, [message])

  const navigate = useCallback((role, page) => {
    if (page === undefined) { page = role; role = 'superadmin' }
    const next = { role, page }
    setRoute(next)
    window.location.hash = routeHash(role, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (route.role !== 'auth') return undefined
    let active = true
    getSession().then((user) => {
      if (!active || !user?.email) return
      const nextRole = productRole(user.role, user.email)
      setSignedInEmail(user.email)
      setAuthTargetRole(nextRole)
      if (normalizeRoute(window.location.hash).role === 'auth') {
        navigate(nextRole, nextRole === 'superadmin' ? 'overview' : 'home')
      }
    })
    return () => { active = false }
  }, [navigate, route.role])

  const action = (label) => setMessage(`${label} is a prototype action. It will connect to the C# API when the backend endpoints are ready.`)
  const adminNavigate = (page) => navigate('superadmin', page)

  const enterWorkspace = (email, role) => {
    const nextRole = productRole(role, email)
    setSignedInEmail(email)
    setAuthTargetRole(nextRole)
    setSetupAccount(null)
    setChallenge(null)
    setAuthStep('login')
    navigate(nextRole, nextRole === 'superadmin' ? 'overview' : 'home')
  }
  const handleOpenAuth = async () => {
    setAuthVariant(route.role === 'employee' ? 'employee' : 'admin')
    setAuthTargetRole(route.role)
    if (signedInEmail) {
      try { await signOut() } catch { /* Continue to the sign-in screen if the API is unavailable. */ }
      setSignedInEmail('')
    }
    setAuthStep('login')
    setSetupAccount(null)
    setChallenge(null)
    navigate('auth', 'sign-in')
  }
  const handleSetupRequired = (account) => {
    setSetupAccount({ ...account, returnRole: authTargetRole })
    setAuthStep('intro')
  }

  if (route.role === 'auth') {
    if (setupAccount && authStep === 'intro') {
      return <SetupIntro role={setupAccount.role} onContinue={() => setAuthStep('password')} onBack={() => { setSetupAccount(null); setAuthStep('login') }} />
    }
    if (setupAccount && authStep === 'password') {
      return <AccountSetup account={setupAccount} onComplete={(account) => { setSetupAccount(account); setAuthStep('two-step') }} />
    }
    if (setupAccount && authStep === 'two-step') {
      return <TwoStepSetup account={setupAccount} onComplete={(email) => enterWorkspace(email, setupAccount.returnRole || setupAccount.role)} />
    }
    if (challenge) {
      return <TwoStepChallenge challenge={challenge} onComplete={(email) => enterWorkspace(email, challenge.returnRole || challenge.role)} />
    }
    return <Login
      variant={authVariant}
      onSetupRequired={handleSetupRequired}
      onTwoStepRequired={(nextChallenge) => setChallenge({ ...nextChallenge, returnRole: authTargetRole })}
      onSignedIn={(email, role) => enterWorkspace(email, role || authTargetRole)}
    />
  }

  const roleProps = { onNavigate: navigate, onAction: action }
  const pages = {
    superadmin: {
      overview: <OverviewPage onNavigate={adminNavigate} onAction={action} />,
      users: <UsersPage onNavigate={adminNavigate} onAction={action} />,
      roles: <RolesPage onNavigate={adminNavigate} onAction={action} />,
      requests: <RequestsPage onNavigate={adminNavigate} onAction={action} />,
      audit: <AuditLogPage onNavigate={adminNavigate} onAction={action} />,
    },
    employee: {
      home: <EmployeeHomePage {...roleProps} />,
      requests: <EmployeeRequestsPage {...roleProps} />,
      'make-request': <MakeRequestPage {...roleProps} />,
      'request-detail': <RequestDetailPage {...roleProps} />,
      receipt: <ReceiptPage {...roleProps} />,
      updates: <EmployeeUpdatesPage {...roleProps} />,
    },
    approver: {
      home: <ApproverHomePage {...roleProps} />,
      approvals: <ApprovalsPage {...roleProps} />,
      'review-request': <ReviewRequestPage {...roleProps} />,
      'my-requests': <MyRequestsPage {...roleProps} />,
      updates: <ApproverUpdatesPage {...roleProps} />,
    },
    finance: {
      home: <FinanceHomePage {...roleProps} />,
      payments: <PaymentsPage {...roleProps} />,
      'pay-out': <PayOutPage {...roleProps} />,
      'after-payment': <AfterPaymentPage {...roleProps} />,
      breakdown: <PaymentBreakdownPage {...roleProps} />,
      'own-requests': <OwnRequestsPage {...roleProps} />,
      updates: <FinanceUpdatesPage {...roleProps} />,
    },
  }
  const content = pages[route.role]?.[route.page] || pages.superadmin.overview

  return <>
    <ProcurementLayout
      role={route.role}
      activePage={route.page}
      onNavigate={navigate}
      onRoleChange={(role) => navigate(role, role === 'superadmin' ? 'overview' : 'home')}
      onOpenAuth={handleOpenAuth}
    >{content}</ProcurementLayout>
    {message && <div role="status" aria-live="polite" style={{ position:'fixed', zIndex:30, right:16, bottom:'max(16px,env(safe-area-inset-bottom))', maxWidth:'min(420px,calc(100vw - 32px))', padding:'13px 16px', borderRadius:15, background:'#141414', color:'#fff', boxShadow:'0 18px 50px rgba(0,0,0,.22)', font:'500 12px/1.5 Inter,sans-serif' }}>{message}</div>}
  </>
}

export default App
