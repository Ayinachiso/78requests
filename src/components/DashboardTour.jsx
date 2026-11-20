import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import { dashboardStyles as styles } from '../styles/dashboardStyles.js'
import { dashboardTourSteps } from '../data/superAdminTour.js'

function DashboardTour({ stepIndex, onNext, onPrevious, onSkip }) {
  const dialogRef = useRef(null)
  const current = dashboardTourSteps[stepIndex]

  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onSkip])

  if (!current) return null

  return (
    <div onMouseDown={onSkip} style={{ position: 'fixed', zIndex: 30, inset: 0, display: 'grid', placeItems: 'center', padding: 18, background: 'rgba(7,12,9,.62)', backdropFilter: 'blur(3px)' }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-description" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()} onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled)')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }} style={{ width: 'min(100%, 510px)', maxHeight: 'calc(100dvh - 36px)', overflowY: 'auto', padding: 'clamp(22px, 5vw, 34px)', border: '1px solid var(--line)', borderRadius: 25, background: 'var(--surface)', color: 'var(--ink)', boxShadow: '0 28px 90px rgba(0,0,0,.3)', outline: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 25 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 650 }}>A quick tour · {stepIndex + 1} of {dashboardTourSteps.length}</span>
          <button type="button" onClick={onSkip} style={{ ...styles.chipButton, border: 0, background: 'transparent' }}>Skip guide</button>
        </div>
        <div aria-hidden="true" style={{ display: 'flex', gap: 5, marginBottom: 24 }}>{dashboardTourSteps.map((step, index) => <span key={step.page} style={{ flex: 1, height: 4, borderRadius: 999, background: index <= stepIndex ? 'var(--accent)' : 'var(--line)' }} />)}</div>
        <span style={{ display: 'grid', width: 54, height: 54, placeItems: 'center', marginBottom: 17, borderRadius: 18, background: 'var(--wash)', color: 'var(--wash-ink)' }}><Icon name={current.icon} size={25} /></span>
        <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: 12, fontWeight: 650 }}>78 Requests · {current.page === 'roles' ? 'Roles & workflow' : current.page === 'audit' ? 'Audit log' : current.page[0].toUpperCase() + current.page.slice(1)}</p>
        <h2 id="tour-title" style={{ margin: 0, fontFamily: 'Sora, Inter, sans-serif', fontSize: 'clamp(22px, 5vw, 29px)', lineHeight: 1.2, letterSpacing: '-.035em' }}>{current.title}</h2>
        <p id="tour-description" aria-live="polite" style={{ margin: '12px 0 27px', color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{current.text}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <button type="button" disabled={stepIndex === 0} onClick={onPrevious} style={{ ...styles.secondaryButton, opacity: stepIndex === 0 ? .45 : 1 }}>Back</button>
          <button type="button" onClick={onNext} style={styles.button}>{stepIndex === dashboardTourSteps.length - 1 ? 'Finish tour' : 'Next'}<Icon name={stepIndex === dashboardTourSteps.length - 1 ? 'check' : 'arrow'} size={16} /></button>
        </div>
        <p style={{ margin: '18px 0 0', color: 'var(--muted)', textAlign: 'center', fontSize: 11 }}>You can reopen this guide any time with the help button.</p>
      </section>
    </div>
  )
}

export default DashboardTour
