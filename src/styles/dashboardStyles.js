const ink = 'var(--ink)'
const muted = 'var(--muted)'
const line = 'var(--line)'
const mint = 'var(--mint)'
const card = 'var(--surface)'

export const dashboardStyles = {
  app: { minHeight: '100vh', background: 'var(--app-bg)', color: ink, fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  sidebar: { position: 'fixed', inset: '0 auto 0 0', zIndex: 5, width: 248, padding: '28px 16px 18px', display: 'flex', flexDirection: 'column', gap: 28, background: 'var(--nav-bg)', color: 'var(--nav-text)' },
  brand: { display: 'flex', alignItems: 'center', gap: 11, padding: '2px 10px', color: mint, fontSize: 19, fontWeight: 700, letterSpacing: '-.04em' },
  navLabel: { padding: '4px 12px 8px', color: 'var(--nav-muted)', fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' },
  navList: { display: 'grid', gap: 5 },
  navButton: { minHeight: 44, display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '0 13px', border: 0, borderRadius: 14, background: 'transparent', color: 'inherit', textAlign: 'left', font: 'inherit', fontSize: 14, cursor: 'pointer' },
  navButtonActive: { background: 'var(--nav-active)', color: 'var(--on-inverse)', fontWeight: 650 },
  navIcon: { width: 20, height: 20, flex: '0 0 auto' },
  profile: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', padding: 12, borderRadius: 16, background: 'var(--profile-bg)' },
  mainWrap: { minHeight: '100vh', marginLeft: 248 },
  topbar: { height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '0 36px', borderBottom: `1px solid ${line}`, background: 'var(--topbar-bg)' },
  content: { width: 'min(100%, 1440px)', margin: '0 auto', padding: '30px 36px 72px' },
  pageTitle: { margin: 0, fontFamily: "Sora, Inter, ui-sans-serif, system-ui, sans-serif", fontSize: 29, lineHeight: 1.18, letterSpacing: '-.045em', fontWeight: 700 },
  subtitle: { margin: '7px 0 0', color: muted, fontSize: 14, lineHeight: 1.55, maxWidth: 720 },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, marginBottom: 22 },
  card: { minWidth: 0, padding: 22, border: `1px solid ${line}`, borderRadius: 22, background: card },
  gridFour: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 14 },
  gridTwo: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 16 },
  row: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  button: { minHeight: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 17px', border: `1px solid ${ink}`, borderRadius: 999, background: ink, color: 'var(--on-inverse)', font: 'inherit', fontSize: 13, fontWeight: 650, cursor: 'pointer', whiteSpace: 'nowrap' },
  secondaryButton: { minHeight: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 15px', border: `1px solid ${line}`, borderRadius: 999, background: card, color: ink, font: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  input: { height: 42, minWidth: 220, width: '100%', padding: '0 13px', border: `1px solid ${line}`, borderRadius: 12, background: card, color: ink, font: 'inherit', fontSize: 14, outlineColor: 'var(--focus)' },
  chipButton: { minHeight: 35, padding: '0 13px', border: `1px solid ${line}`, borderRadius: 999, background: card, color: muted, font: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  chipSelected: { borderColor: ink, background: ink, color: 'var(--on-inverse)' },
  table: { width: '100%', minWidth: 650, borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '12px 10px', borderBottom: `1px solid ${line}`, color: muted, fontSize: 11, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' },
  td: { padding: '14px 10px', borderBottom: `1px solid ${line}`, fontSize: 13, verticalAlign: 'middle' },
  mobileNav: { display: 'none' },
}

export const responsiveDashboardCss = `
  .dashboard-theme {
    --app-bg: #f5f3ef; --surface: #fff; --topbar-bg: #f9f8f4; --surface-muted: #eeece7;
    --ink: #171716; --muted: #62665f; --line: #e6e4dd; --line-soft: #eeece7;
    --nav-bg: #171716; --nav-text: #c5c6c2; --nav-muted: #92938f; --nav-active: rgba(255,255,255,.13); --profile-bg: rgba(255,255,255,.08);
    --mint: #b2f1e7; --wash: #b2f1e7; --wash-ink: #171716; --accent: #163b36; --focus: #46089c;
    --on-inverse: #fff; --status-ok-bg: #d7f3ee; --status-ok-fg: #163b36;
    --status-info-bg: #e6edf8; --status-info-fg: #385374; --status-warn-bg: #fff1c9; --status-warn-fg: #76500b;
    --status-danger-bg: #fdecea; --status-danger-fg: #a32018; --status-muted-bg: #eeefec; --status-muted-fg: #555b53;
    --status-lavender-bg: #e7e2fa; --status-lavender-fg: #493b87; --status-salmon-bg: #fde7dc; --status-salmon-fg: #8b3f20;
    --switch-off: #c7c9c3; --avatar-ink: #272923; --quiet-ink: #777b74; --disabled-ink: #b1b3ac;
  }
  .dashboard-theme[data-theme="dark"] {
    color-scheme: dark;
    --app-bg: #101512; --surface: #18201b; --topbar-bg: #141b17; --surface-muted: #202923;
    --ink: #f0f3ee; --muted: #b2bbb4; --line: #303a33; --line-soft: #28322b;
    --nav-bg: #0b100d; --nav-text: #b3beb6; --nav-muted: #94a198; --nav-active: rgba(255,255,255,.11); --profile-bg: rgba(255,255,255,.08);
    --mint: #8ccdb8; --wash: #244238; --wash-ink: #eff8f2; --accent: #9fe1cc; --focus: #d2b8ff;
    --on-inverse: #101512; --status-ok-bg: #1c3830; --status-ok-fg: #b7e7d4;
    --status-info-bg: #243648; --status-info-fg: #c2d9f2; --status-warn-bg: #473a1e; --status-warn-fg: #f7dda0;
    --status-danger-bg: #492b2b; --status-danger-fg: #ffc0b8; --status-muted-bg: #303832; --status-muted-fg: #d0d8d1;
    --status-lavender-bg: #382e4a; --status-lavender-fg: #ded0ff; --status-salmon-bg: #49352d; --status-salmon-fg: #ffd2b8;
    --switch-off: #525d55; --avatar-ink: #17211b; --quiet-ink: #b2bbb4; --disabled-ink: #78837a;
  }
  html, body, #root { min-height: 100%; margin: 0; }
  body { background: var(--app-bg); }
  *, *::before, *::after { box-sizing: border-box; }
  button, input, select { font-family: inherit; }
  .dashboard-sidebar, .dashboard-main-wrap { transition: width 180ms ease, margin-left 180ms ease; }
  .dashboard-theme button:not(:disabled) { transition: filter 140ms ease, box-shadow 140ms ease, transform 140ms ease; }
  .dashboard-theme button:not(:disabled):hover { filter: brightness(.95); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }
  .dashboard-theme[data-theme="dark"] button:not(:disabled):hover { filter: brightness(1.17); }
  .dashboard-theme button:not(:disabled):active { transform: translateY(0) scale(.98); }
  .dashboard-theme button:disabled { cursor: not-allowed; }
  .dashboard-sidebar nav button:not([aria-current="page"]):hover { background: var(--nav-active) !important; color: var(--on-inverse) !important; }
  .dashboard-theme button[aria-current="page"]:hover { filter: brightness(1.08); }
  button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
  @media (max-width: 900px) {
    .dashboard-sidebar { display: none !important; }
    .dashboard-main-wrap { margin-left: 0 !important; }
    .dashboard-topbar { height: 66px !important; padding: 0 20px !important; }
    .dashboard-mobile-brand { display: inline !important; }
    .dashboard-content { padding: 24px 20px 104px !important; }
    .dashboard-mobile-nav { position: fixed !important; z-index: 8 !important; inset: auto 0 0 !important; display: grid !important; grid-template-columns: repeat(5, 1fr) !important; padding: 8px max(8px, env(safe-area-inset-right)) calc(8px + env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-left)) !important; border-top: 1px solid var(--line) !important; background: var(--topbar-bg) !important; backdrop-filter: blur(16px); }
    .dashboard-mobile-nav button { display: grid !important; justify-items: center !important; gap: 3px !important; padding: 5px 2px !important; border: 0 !important; background: transparent !important; color: var(--muted) !important; font: inherit !important; font-size: 10px !important; }
    .dashboard-mobile-nav button[aria-current="page"] { color: var(--ink) !important; font-weight: 700 !important; }
    .dashboard-table-scroll { overflow-x: auto; }
  }
  @media (max-width: 760px) { .dashboard-audit-row { grid-template-columns: 1fr !important; align-items: start !important; gap: 6px !important; } }
  @media (max-width: 560px) {
    .dashboard-content { padding: 20px 14px 102px !important; }
    .dashboard-topbar { padding: 0 14px !important; }
    .dashboard-page-header { flex-direction: column !important; align-items: stretch !important; }
    .dashboard-page-header > div:last-child { display: flex; }
    .dashboard-page-header button { flex: 1; }
    .dashboard-card { padding: 17px !important; border-radius: 18px !important; }
    .dashboard-page-title { font-size: 25px !important; }
    .dashboard-search { min-width: 100% !important; }
    .dashboard-hide-mobile { display: none !important; }
  }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
`
