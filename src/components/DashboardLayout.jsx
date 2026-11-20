import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'
import { dashboardStyles, responsiveDashboardCss } from '../styles/dashboardStyles.js'
import { dashboardPages } from '../data/superAdminNavigation.js'

function DashboardLayout({ activePage, onNavigate, onOpenTour, children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem('78requests-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('78requests-sidebar-collapsed') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('78requests-theme', theme)
    } catch {
      // Theme selection still works for this session when storage is unavailable.
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101512' : '#f5f3ef')
  }, [theme])

  useEffect(() => {
    try {
      window.localStorage.setItem('78requests-sidebar-collapsed', String(sidebarCollapsed))
    } catch {
      // Sidebar preference remains available for this session when storage is unavailable.
    }
  }, [sidebarCollapsed])

  function navButton(page, mobile = false) {
    const current = activePage === page.id
    return (
      <button key={page.id} type="button" title={sidebarCollapsed && !mobile ? page.label : undefined} aria-label={mobile ? undefined : page.label} aria-current={current ? 'page' : undefined} onClick={() => onNavigate(page.id)} style={mobile ? undefined : { ...dashboardStyles.navButton, ...(sidebarCollapsed ? { justifyContent: 'center', padding: 0, width: 48, margin: '0 auto' } : {}), ...(current ? dashboardStyles.navButtonActive : {}) }}>
        <Icon name={page.icon} size={mobile ? 19 : 20} />
        {(!sidebarCollapsed || mobile) && <span>{mobile ? page.label.split(' ')[0] : page.label}</span>}
        {!mobile && !sidebarCollapsed && page.badge && <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 999, background: 'var(--mint)', color: 'var(--wash-ink)', fontSize: 11, fontWeight: 750 }}>{page.badge}</span>}
      </button>
    )
  }

  return (
    <div className="dashboard-theme" data-theme={theme} style={dashboardStyles.app}>
      <style>{responsiveDashboardCss}</style>
      <aside className="dashboard-sidebar" data-collapsed={sidebarCollapsed} style={{ ...dashboardStyles.sidebar, width: sidebarCollapsed ? 76 : 248, padding: sidebarCollapsed ? '24px 12px 16px' : dashboardStyles.sidebar.padding }}>
        <div style={{ ...dashboardStyles.brand, justifyContent: sidebarCollapsed ? 'center' : 'flex-start', padding: sidebarCollapsed ? 0 : dashboardStyles.brand.padding }}><span style={{ display: 'grid', width: 30, height: 30, flex: '0 0 auto', placeItems: 'center', borderRadius: 10, background: 'var(--mint)', color: 'var(--wash-ink)', fontSize: 17, fontWeight: 800 }}>78</span>{!sidebarCollapsed && <span>Requests</span>}</div>
        <button type="button" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!sidebarCollapsed} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ ...dashboardStyles.navButton, justifyContent: sidebarCollapsed ? 'center' : 'flex-start', width: sidebarCollapsed ? 48 : '100%', margin: sidebarCollapsed ? '0 auto' : 0, color: 'var(--nav-text)' }}><Icon name="panel" size={19} />{!sidebarCollapsed && <span>Collapse menu</span>}</button>
        <nav aria-label="Super Admin navigation">
          {!sidebarCollapsed && <div style={dashboardStyles.navLabel}>Workspace</div>}
          <div style={dashboardStyles.navList}>{dashboardPages.map((page) => navButton(page))}</div>
        </nav>
        <div title={sidebarCollapsed ? 'Sade Ogunleye · Super Admin' : undefined} style={{ ...dashboardStyles.profile, justifyContent: sidebarCollapsed ? 'center' : 'flex-start', padding: sidebarCollapsed ? '10px 0' : 12 }}><Avatar name="Sade Ogunleye" size={38} color="var(--mint)" />{!sidebarCollapsed && <><div style={{ minWidth: 0 }}><strong style={{ display: 'block', color: 'var(--on-inverse)', fontSize: 12 }}>Sade Ogunleye</strong><span style={{ fontSize: 11 }}>Super Admin</span></div><Icon name="dots" size={18} /></>}</div>
      </aside>

      <div className="dashboard-main-wrap" style={{ ...dashboardStyles.mainWrap, marginLeft: sidebarCollapsed ? 76 : 248 }}>
        <header className="dashboard-topbar" style={dashboardStyles.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span className="dashboard-mobile-brand" style={{ display: 'none', color: 'var(--ink)', fontWeight: 750 }}>78 Requests</span>
            <span style={{ color: 'var(--muted)' }} className="dashboard-hide-mobile">/</span>
            <span style={{ overflow: 'hidden', color: 'var(--muted)', fontSize: 13, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dashboardPages.find((page) => page.id === activePage)?.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" aria-label="Open the guided tour" title="Guided tour" onClick={onOpenTour} style={{ display: 'grid', width: 40, height: 40, placeItems: 'center', border: '1px solid var(--line)', borderRadius: 13, background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer' }}><Icon name="help" size={18} /></button>
            <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ display: 'grid', width: 40, height: 40, placeItems: 'center', border: '1px solid var(--line)', borderRadius: 13, background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer' }}><Icon name={theme === 'light' ? 'moon' : 'sun'} size={18} /></button>
            <div style={{ position: 'relative' }}>
              <button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }} style={{ position: 'relative', display: 'grid', width: 40, height: 40, placeItems: 'center', border: '1px solid var(--line)', borderRadius: 13, background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer' }}><Icon name="bell" size={19} /><span aria-label="3 unread" style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--focus)' }} /></button>
              {notificationsOpen && <div role="dialog" aria-label="Notifications" style={{ position: 'absolute', zIndex: 10, top: 48, right: 0, width: 'min(340px, calc(100vw - 28px))', padding: 16, border: '1px solid var(--line)', borderRadius: 18, background: 'var(--surface)', color: 'var(--ink)', boxShadow: '0 18px 48px rgba(0,0,0,.2)' }}><strong style={{ display: 'block', marginBottom: 12 }}>Notifications</strong>{[['Amara Eze needs an invitation', 'Created, not sent yet'], ['Tunde’s invitation expires soon', 'Resend it so he can join'], ['Funmi Adeyemi is unavailable', 'Requests may skip an approver']].map(([title, detail]) => <div key={title} style={{ padding: '11px 0', borderTop: '1px solid var(--line-soft)' }}><b style={{ display: 'block', fontSize: 12 }}>{title}</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>{detail}</span></div>)}</div>}
            </div>
            <div style={{ position: 'relative' }}>
              <button type="button" aria-label="Open account menu" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }} style={{ padding: 0, border: 0, borderRadius: 13, background: 'transparent', cursor: 'pointer' }}><Avatar name="Sade Ogunleye" size={39} color="var(--mint)" /></button>
              {profileOpen && <div role="menu" style={{ position: 'absolute', zIndex: 10, top: 48, right: 0, width: 190, padding: 10, border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', color: 'var(--ink)', boxShadow: '0 18px 48px rgba(0,0,0,.2)' }}><div style={{ padding: '6px 8px 10px', borderBottom: '1px solid var(--line-soft)' }}><b style={{ display: 'block', fontSize: 12 }}>Sade Ogunleye</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>Super Admin</span></div><button type="button" role="menuitem" onClick={() => setProfileOpen(false)} style={{ width: '100%', padding: '10px 8px', border: 0, background: 'transparent', color: 'var(--ink)', textAlign: 'left', font: 'inherit', fontSize: 12, cursor: 'pointer' }}>Account settings</button></div>}
            </div>
          </div>
        </header>
        <main className="dashboard-content" style={dashboardStyles.content}>
          <aside role="note" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 19, padding: '10px 13px', border: '1px solid var(--line)', borderRadius: 13, background: 'var(--surface)', color: 'var(--muted)', fontSize: 11 }}><span style={{ width: 7, height: 7, flex: '0 0 auto', borderRadius: '50%', background: 'var(--focus)' }} /><span><b style={{ color: 'var(--ink)' }}>Prototype preview.</b> Showing sample data; the backend API is not connected yet.</span></aside>
          {children}
        </main>
      </div>
      <nav className="dashboard-mobile-nav" aria-label="Main navigation" style={dashboardStyles.mobileNav}>{dashboardPages.map((page) => navButton(page, true))}</nav>
    </div>
  )
}

export default DashboardLayout
