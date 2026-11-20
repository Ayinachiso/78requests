import { useCallback, useEffect, useState } from 'react'
import DashboardLayout from './components/DashboardLayout.jsx'
import DashboardTour from './components/DashboardTour.jsx'
import OverviewPage from './pages/superadmin_dashboard/OverviewPage.jsx'
import UsersPage from './pages/superadmin_dashboard/UsersPage.jsx'
import RolesPage from './pages/superadmin_dashboard/RolesPage.jsx'
import AuditLogPage from './pages/superadmin_dashboard/AuditLogPage.jsx'
import RequestsPage from './pages/superadmin_dashboard/RequestsPage.jsx'
import { dashboardTourSteps } from './data/superAdminTour.js'

const validPages = ['overview', 'users', 'roles', 'audit', 'requests']

function getInitialPage() {
  const hash = window.location.hash.slice(1)
  return validPages.includes(hash) ? hash : 'overview'
}

function hasCompletedTour() {
  try {
    return window.localStorage.getItem('78requests-superadmin-tour-complete') === 'true'
  } catch {
    return false
  }
}

function App() {
  const [tourOpen, setTourOpen] = useState(() => !hasCompletedTour())
  const [tourStepIndex, setTourStepIndex] = useState(0)
  const [activePage, setActivePage] = useState(() => hasCompletedTour() ? getInitialPage() : 'overview')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function syncPage() {
      const nextPage = getInitialPage()
      setActivePage(nextPage)
    }
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    if (!message) return undefined
    const timeout = window.setTimeout(() => setMessage(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [message])

  const navigate = useCallback((page) => {
    if (!validPages.includes(page)) return
    setActivePage(page)
    window.location.hash = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const closeTour = useCallback(() => {
    setTourOpen(false)
    try {
      // Replace this browser-local flag with a per-user preference after auth is connected.
      window.localStorage.setItem('78requests-superadmin-tour-complete', 'true')
    } catch {
      // The tour can still be dismissed for this session when storage is unavailable.
    }
  }, [])

  const openTour = useCallback(() => {
    setTourStepIndex(0)
    setTourOpen(true)
    navigate('overview')
  }, [navigate])

  function nextTourStep() {
    const nextIndex = tourStepIndex + 1
    if (nextIndex >= dashboardTourSteps.length) {
      closeTour()
      navigate('overview')
      return
    }
    setTourStepIndex(nextIndex)
    navigate(dashboardTourSteps[nextIndex].page)
  }

  function previousTourStep() {
    const previousIndex = Math.max(0, tourStepIndex - 1)
    setTourStepIndex(previousIndex)
    navigate(dashboardTourSteps[previousIndex].page)
  }

  function showPlaceholderMessage(action) {
    setMessage(`${action} is a prototype action. It will be connected to the agreed workflow later.`)
  }

  const pageProps = { onNavigate: navigate, onAction: showPlaceholderMessage }
  const pages = {
    overview: <OverviewPage {...pageProps} />,
    users: <UsersPage {...pageProps} />,
    roles: <RolesPage {...pageProps} />,
    audit: <AuditLogPage {...pageProps} />,
    requests: <RequestsPage {...pageProps} />,
  }

  return (
    <>
      <DashboardLayout activePage={activePage} onNavigate={navigate} onOpenTour={openTour}>{pages[activePage]}</DashboardLayout>
      {tourOpen && <DashboardTour stepIndex={tourStepIndex} onNext={nextTourStep} onPrevious={previousTourStep} onSkip={closeTour} />}
      {message && <div role="status" aria-live="polite" style={{ position: 'fixed', zIndex: 20, right: 18, bottom: 'max(18px, env(safe-area-inset-bottom))', maxWidth: 'min(420px, calc(100vw - 36px))', padding: '13px 17px', borderRadius: 14, background: 'var(--ink)', color: 'var(--on-inverse)', boxShadow: '0 14px 34px rgba(23,23,22,.2)', fontSize: 13, lineHeight: 1.5 }}>{message}</div>}
    </>
  )
}

export default App
