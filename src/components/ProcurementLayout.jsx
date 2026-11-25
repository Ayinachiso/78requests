import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'
import { roleLabels, roleNavigation } from '../data/productNavigation.js'
import { tokens } from '../styles/tokens.js'
import { responsiveDashboardCss } from '../styles/dashboardStyles.js'

const css = `
  html, body, #root { min-height: 100%; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; }
  body { background: var(--app-bg); color: var(--ink); font-family: Inter, system-ui, sans-serif; }
  button, input, textarea, select { font: inherit; }
  button:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(20,20,20,.12); }
  .workspace-app > a:focus { left:8px !important; }
  button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
  .workspace-app { --app-bg:#f7f7f4; --surface:#fff; --topbar-bg:#fff; --surface-muted:#f0f0ed; --ink:#141414; --muted:#5a607a; --line:#e6e2d9; --line-soft:#eeece7; --mint:#b2f1e7; --mint-soft:#d7f7f3; --wash:#d7f7f3; --wash-ink:#141414; --teal:#163b36; --accent:#163b36; --focus:#163b36; --on-inverse:#fff; --nav-bg:#141414; --nav-text:#fff; --nav-muted:#a3a4a1; --nav-active:rgba(255,255,255,.13); --profile-bg:rgba(255,255,255,.08); --warn-bg:#fff1c9; --warn-text:#7a4a00; --error-bg:#fdecea; --error-text:#a32018; --status-ok-bg:#d7f7f3; --status-ok-fg:#163b36; --status-info-bg:#e6edf8; --status-info-fg:#385374; --status-warn-bg:#fff1c9; --status-warn-fg:#7a4a00; --status-danger-bg:#fdecea; --status-danger-fg:#a32018; --status-muted-bg:#eeefec; --status-muted-fg:#555b53; --status-lavender-bg:#e7e2fa; --status-lavender-fg:#493b87; --status-salmon-bg:#fde7dc; --status-salmon-fg:#8b3f20; min-height:100vh; background:var(--app-bg); color:var(--ink); }
  .workspace-app[data-theme=dark] { --app-bg:#101512; --surface:#18201b; --topbar-bg:#141b17; --surface-muted:#202923; --ink:#f0f3ee; --muted:#b2bbb4; --line:#303a33; --line-soft:#28322b; --mint:#8ccdb8; --mint-soft:#244238; --wash:#244238; --wash-ink:#eff8f2; --teal:#9fe1cc; --accent:#9fe1cc; --focus:#b2f1e7; --on-inverse:#101512; --nav-bg:#0b100d; --nav-text:#f0f3ee; --nav-muted:#94a198; --nav-active:rgba(255,255,255,.11); --profile-bg:rgba(255,255,255,.08); --warn-bg:#473a1e; --warn-text:#f7dda0; --error-bg:#492b2b; --error-text:#ffc0b8; --status-ok-bg:#1c3830; --status-ok-fg:#b7e7d4; --status-info-bg:#243648; --status-info-fg:#c2d9f2; --status-warn-bg:#473a1e; --status-warn-fg:#f7dda0; --status-danger-bg:#492b2b; --status-danger-fg:#ffc0b8; --status-muted-bg:#303832; --status-muted-fg:#d0d8d1; --status-lavender-bg:#382e4a; --status-lavender-fg:#ded0ff; --status-salmon-bg:#49352d; --status-salmon-fg:#ffd2b8; color-scheme:dark; }
  .workspace-sidebar { position:fixed; inset:0 auto 0 0; z-index:10; width:248px; padding:22px 14px 16px; display:flex; flex-direction:column; gap:22px; background:var(--nav-bg); color:var(--nav-text); transition:width .18s ease; }
  .workspace-main { min-height:100vh; margin-left:248px; transition:margin-left .18s ease; }
  .workspace-header { position:sticky; top:0; z-index:8; min-height:72px; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 30px; border-bottom:1px solid var(--line); background:var(--surface); }
  .workspace-content { width:min(100%, 1500px); margin:auto; padding:28px 30px 60px; }
  .workspace-brand { display:flex; align-items:center; gap:10px; color:var(--nav-text); font:700 18px Sora,sans-serif; letter-spacing:-.05em; }
  .workspace-nav { display:grid; gap:5px; }
  .workspace-nav button { min-height:44px; display:flex; align-items:center; gap:12px; width:100%; padding:0 12px; border:0; border-radius:14px; background:transparent; color:inherit; text-align:left; font:500 13px Inter,sans-serif; cursor:pointer; }
  .workspace-nav button[aria-current=page] { background:var(--mint); color:#141414; font-weight:650; }
  .workspace-mobile-nav { display:none; }
  .workspace-sidebar[data-collapsed=true] { width:76px; padding-inline:10px; }
  .workspace-sidebar[data-collapsed=true] + .workspace-main { margin-left:76px; }
  .workspace-page-title { font-family:Sora,sans-serif; }
  .workspace-grid-four { grid-template-columns:repeat(4,minmax(0,1fr)) !important; }
  .workspace-grid-two { grid-template-columns:minmax(0,1.25fr) minmax(270px,.8fr) !important; }
  @media(max-width:900px) { .workspace-sidebar { display:none; } .workspace-main,.workspace-sidebar[data-collapsed=true] + .workspace-main { margin-left:0; } .workspace-header { min-height:64px; padding:0 20px; } .workspace-mobile-brand { display:inline !important; } .workspace-content { padding:24px 20px 106px; } .workspace-grid-two { grid-template-columns:1fr !important; } .workspace-grid-four { grid-template-columns:repeat(2,minmax(0,1fr)) !important; } .workspace-mobile-nav { position:fixed; inset:auto 0 0; z-index:20; display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:2px; padding:7px max(7px,env(safe-area-inset-right)) calc(7px + env(safe-area-inset-bottom)) max(7px,env(safe-area-inset-left)); border-top:1px solid var(--line); background:var(--surface); } .workspace-mobile-nav button { min-width:0; display:grid; justify-items:center; align-content:center; gap:4px; min-height:48px; padding:4px 2px; border:0; border-radius:12px; background:transparent; color:var(--muted); font:500 9px Inter,sans-serif; cursor:pointer; } .workspace-mobile-nav button[aria-current=page] { background:var(--mint-soft); color:var(--ink); font-weight:700; } }
  @media(max-width:560px) { .workspace-content { padding:20px 14px 104px; } .workspace-header { padding:0 14px; } .workspace-hide-small { display:none !important; } .workspace-grid-four { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:8px !important; } .workspace-grid-four section { padding:14px !important; } .workspace-grid-two section[style*="grid-column"] { grid-column:auto !important; } .procurement-page-title { flex-direction:column; align-items:stretch !important; } .procurement-page-actions { width:100%; } .procurement-page-actions button { flex:1; } }
  @media(prefers-reduced-motion:reduce) { *,*::before,*::after { scroll-behavior:auto !important; animation-duration:.01ms !important; transition-duration:.01ms !important; } }
`

function ProcurementLayout({ role, activePage, onNavigate, onRoleChange, onOpenAuth, onOpenTour, children }) {
  const [collapsed, setCollapsed] = useState(() => { try { return window.localStorage.getItem('78requests-nav-collapsed') === 'true' } catch { return false } })
  const [theme, setTheme] = useState(() => { try { return window.localStorage.getItem('78requests-theme') || 'light' } catch { return 'light' } })
  const navigation = roleNavigation[role] || roleNavigation.superadmin
  const profile = {
    superadmin: 'Sade Ogunleye',
    employee: 'Adaeze Okafor',
    approver: 'Kunle Adeyemi',
    finance: 'Bola Adewale',
  }[role] || 'Team member'
  const routeLabels = { 'make-request':'Make a request','request-detail':'Request details',receipt:'Receipt','review-request':'Review a request','my-requests':'My requests','pay-out':'Pay out','after-payment':'After payment',breakdown:'Payment breakdown','own-requests':'Own requests' }

  useEffect(() => {
    try { window.localStorage.setItem('78requests-theme', theme) } catch { /* Keep the selected mode for this session. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101512' : '#ffffff')
  }, [theme])
  useEffect(() => {
    try { window.localStorage.setItem('78requests-nav-collapsed', String(collapsed)) } catch { /* Navigation still works without persistent storage. */ }
  }, [collapsed])

  function navButton(item, mobile = false) {
    const active = activePage === item.id
    const mobileLabel = item.label === 'My requests' ? 'Requests' : item.label === 'Make a request' ? 'New request' : item.label
    return <button key={item.id} type="button" aria-current={active ? 'page' : undefined} aria-label={item.label} title={collapsed && !mobile ? item.label : undefined} onClick={() => onNavigate(role, item.id)}>
      <Icon name={item.icon} size={mobile ? 18 : 19} />{(!collapsed || mobile) && <span style={{ overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{mobile ? mobileLabel : item.label}</span>}{!mobile && !collapsed && item.badge && <span style={{ marginLeft:'auto',padding:'3px 8px',borderRadius:99,background:'rgba(178,241,231,.18)',color:tokens.mint,fontSize:10 }}>{item.badge}</span>}
    </button>
  }

  return <div className="workspace-app" data-theme={theme}>
    <style>{css}{responsiveDashboardCss}</style>
    <a href="#main-content" style={{ position:'absolute',left:-9999,top:8,zIndex:100,padding:10,background:'#fff',color:'#141414' }}>Skip to content</a>
    <aside className="workspace-sidebar" data-collapsed={collapsed}>
      <div className="workspace-brand" style={{ justifyContent:collapsed?'center':'flex-start' }}><span style={{ width:34,height:34,display:'grid',placeItems:'center',borderRadius:12,background:tokens.mint,color:tokens.ink,font: '800 14px Sora,sans-serif' }}>78</span>{!collapsed && 'Requests'}</div>
      <button type="button" aria-label={collapsed?'Expand navigation':'Collapse navigation'} aria-expanded={!collapsed} onClick={() => setCollapsed((value) => !value)} style={{ display:'flex',alignItems:'center',justifyContent:collapsed?'center':'flex-start',gap:10,minHeight:40,padding:'0 11px',border:'1px solid rgba(255,255,255,.13)',borderRadius:13,background:'transparent',color:'var(--nav-text)',fontSize:12,cursor:'pointer' }}><Icon name="panel" size={18}/>{!collapsed && 'Collapse menu'}</button>
      <nav className="workspace-nav" aria-label={`${roleLabels[role]} navigation`}>{navigation.map((item) => navButton(item))}</nav>
      <div style={{ marginTop:'auto',padding:collapsed?7:12,borderRadius:16,background:'rgba(255,255,255,.09)',display:'flex',alignItems:'center',justifyContent:collapsed?'center':'flex-start',gap:10 }}><Avatar name={profile} size={36} color={tokens.mint}/>{!collapsed && <div style={{minWidth:0}}><b style={{display:'block',fontSize:11}}>{profile}</b><span style={{fontSize:10,color:'#c5c6c2'}}>{roleLabels[role]}</span></div>}</div>
    </aside>
    <div className="workspace-main">
      <header className="workspace-header">
        <div style={{display:'flex',alignItems:'center',gap:9,minWidth:0}}><span className="workspace-mobile-brand" style={{display:'none',font:'700 15px Sora,sans-serif',whiteSpace:'nowrap'}}>78 Requests</span><span className="workspace-hide-small" style={{color:'var(--muted)'}}>›</span><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:'var(--muted)',fontSize:12}}>{roleLabels[role]} / {navigation.find((item)=>item.id===activePage)?.label||routeLabels[activePage]||activePage}</span></div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <label className="workspace-hide-small" style={{display:'flex',alignItems:'center',gap:7,color:'var(--muted)',fontSize:11}}>View as <select aria-label="Preview role" value={role} onChange={(event)=>onRoleChange(event.target.value)} style={{height:36,maxWidth:145,padding:'0 9px',border:`1px solid var(--line)`,borderRadius:11,background:'var(--surface)',color:'var(--ink)',fontSize:11}}>{Object.entries(roleLabels).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
          {role==='superadmin'&&<button type="button" aria-label="Open the guided tour" title="Guided tour" onClick={onOpenTour} style={{width:38,height:38,display:'grid',placeItems:'center',border:`1px solid var(--line)`,borderRadius:12,background:'var(--surface)',color:'var(--ink)',cursor:'pointer'}}><Icon name="help" size={18}/></button>}
          <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title="Change colour mode" onClick={()=>setTheme(theme==='light'?'dark':'light')} style={{width:38,height:38,display:'grid',placeItems:'center',border:`1px solid var(--line)`,borderRadius:12,background:'var(--surface)',color:'var(--ink)',cursor:'pointer'}}><Icon name={theme==='light'?'moon':'sun'} size={18}/></button>
          <button type="button" onClick={onOpenAuth} title="Open sign-in screens" style={{display:'flex',alignItems:'center',gap:8,padding:'3px 9px 3px 4px',border:`1px solid var(--line)`,borderRadius:999,background:'var(--surface)',color:'var(--ink)',cursor:'pointer'}}><Avatar name={profile} size={30}/><span className="workspace-hide-small" style={{fontSize:11,fontWeight:600}}>{profile.split(' ')[0]}</span></button>
        </div>
      </header>
      <main id="main-content" className="workspace-content"><aside role="note" style={{display:'flex',alignItems:'center',gap:8,marginBottom:18,padding:'10px 13px',border:`1px solid var(--line)`,borderRadius:13,background:'var(--surface)',color:'var(--muted)',font:'400 11px/1.5 Inter,sans-serif'}}><span aria-hidden="true" style={{width:7,height:7,flex:'0 0 auto',borderRadius:'50%',background:'var(--mint)'}}/><span><b style={{color:'var(--ink)'}}>Prototype preview.</b> Sample data only; the API is not connected and payment actions do not transfer funds.</span></aside>{children}</main>
    </div>
    <nav className="workspace-mobile-nav" aria-label="Main navigation" style={{gridTemplateColumns:`repeat(${navigation.length},minmax(0,1fr))`}}>{navigation.map((item)=>navButton(item,true))}</nav>
  </div>
}

export default ProcurementLayout
