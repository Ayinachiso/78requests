import { tokens } from '../styles/tokens.js'

export function Button({ children, variant = 'primary', icon, onClick, type = 'button', disabled = false, ...props }) {
  const styles = {
    primary: { background: tokens.ink, color: 'var(--on-inverse)', border: `1px solid ${tokens.ink}` },
    secondary: { background: tokens.surface, color: tokens.ink, border: `1px solid ${tokens.line}` },
    mint: { background: tokens.mint, color: tokens.ink, border: `1px solid ${tokens.mint}` },
    quiet: { background: 'transparent', color: tokens.ink, border: '1px solid transparent' },
    danger: { background: tokens.errorBg, color: tokens.errorText, border: `1px solid ${tokens.errorBg}` },
  }
  return <button type={type} disabled={disabled} onClick={onClick} {...props} style={{ minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 18px', borderRadius: 999, font: '600 14px Inter, sans-serif', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .48 : 1, whiteSpace: 'nowrap', transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease', ...styles[variant], ...props.style }}>{icon && <span aria-hidden="true">{icon}</span>}{children}</button>
}

export function Surface({ children, style = {}, as: Element = 'section', ...props }) {
  return <Element {...props} style={{ minWidth: 0, padding: 22, border: `1px solid ${tokens.line}`, borderRadius: 24, background: tokens.surface, color: tokens.ink, ...style }}>{children}</Element>
}

export function PageTitle({ eyebrow, title, description, actions, style = {} }) {
  return <div className="procurement-page-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 24, ...style }}>
    <div style={{ minWidth: 0 }}>
      {eyebrow && <div style={{ marginBottom: 8, color: tokens.muted, fontSize: 13 }}>{eyebrow}</div>}
      <h1 style={{ margin: 0, color: tokens.ink, font: '700 clamp(25px, 3vw, 34px)/1.15 Sora, sans-serif', letterSpacing: '-.045em' }}>{title}</h1>
      {description && <p style={{ margin: '8px 0 0', maxWidth: 720, color: tokens.muted, font: '400 14px/1.55 Inter, sans-serif' }}>{description}</p>}
    </div>
    {actions && <div className="procurement-page-actions" style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>{actions}</div>}
  </div>
}

export function Metric({ label, value, note, tint = tokens.mintSoft, icon = '↗' }) {
  return <Surface style={{ padding: 18, borderRadius: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}><span style={{ color: tokens.muted, font: '500 13px Inter, sans-serif' }}>{label}</span><span aria-hidden="true" style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 12, background: tint, color: tokens.teal, fontSize: 16 }}>{icon}</span></div>
    <div style={{ marginTop: 15, color: tokens.ink, font: '700 30px/1 Sora, sans-serif', letterSpacing: '-.04em' }}>{value}</div>
    {note && <div style={{ marginTop: 9, color: tokens.muted, font: '400 12px/1.4 Inter, sans-serif' }}>{note}</div>}
  </Surface>
}

const statusPalette = {
  Approved: [tokens.mintSoft, tokens.teal], Paid: [tokens.mintSoft, tokens.teal], Completed: [tokens.mintSoft, tokens.teal], Active: [tokens.mintSoft, tokens.teal],
  Pending: [tokens.warnBg, tokens.warnText], 'Pending approval': [tokens.warnBg, tokens.warnText], 'Awaiting Payment': [tokens.warnBg, tokens.warnText], 'In review': [tokens.warnBg, tokens.warnText],
  Rejected: [tokens.errorBg, tokens.errorText], Failed: [tokens.errorBg, tokens.errorText], Suspended: [tokens.errorBg, tokens.errorText],
  Draft: ['#F0F0EE', tokens.muted], Invited: ['#EAEAF2', tokens.muted],
}

export function StatusPill({ children }) {
  const [background, color] = statusPalette[children] || [tokens.mintSoft, tokens.teal]
  return <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 26, padding: '0 10px', borderRadius: 999, background, color, font: '600 11px Inter, sans-serif', whiteSpace: 'nowrap' }}>{children}</span>
}

export function Field({ label, hint, error, as: Element = 'input', options, style = {}, ...props }) {
  const controlStyle = { width: '100%', minHeight: 46, padding: '0 13px', border: `1px solid ${error ? tokens.errorText : tokens.line}`, borderRadius: 14, background: tokens.surface, color: tokens.ink, font: '400 14px Inter, sans-serif', outlineColor: tokens.teal, ...style }
  return <label style={{ display: 'grid', gap: 7, color: tokens.ink, font: '600 12px/1.4 Inter, sans-serif' }}>
    {label}{Element === 'select' ? <select {...props} style={controlStyle}>{options?.map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}</select> : <Element {...props} style={controlStyle} />}
    {hint && <span style={{ color: tokens.muted, fontWeight: 400 }}>{hint}</span>}{error && <span role="alert" style={{ color: tokens.errorText, fontWeight: 500 }}>{error}</span>}
  </label>
}

export function SearchInput({ value, onChange, placeholder = 'Search' }) {
  return <label style={{ display: 'flex', alignItems: 'center', gap: 9, width: 'min(100%, 310px)', height: 44, padding: '0 13px', border: `1px solid ${tokens.line}`, borderRadius: 14, background: tokens.surface, color: tokens.muted }}>
    <span aria-hidden="true">⌕</span><input aria-label={placeholder} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} style={{ width: '100%', minWidth: 0, border: 0, outline: 0, background: 'transparent', color: tokens.ink, font: '400 13px Inter, sans-serif' }} />
  </label>
}

export function Notice({ children, tone = 'info' }) {
  const palette = tone === 'warning' ? [tokens.warnBg, tokens.warnText] : tone === 'error' ? [tokens.errorBg, tokens.errorText] : [tokens.mintSoft, tokens.teal]
  return <div role="note" style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '12px 14px', borderRadius: 15, background: palette[0], color: palette[1], font: '500 12px/1.5 Inter, sans-serif' }}><span aria-hidden="true">●</span>{children}</div>
}

export function DataTable({ columns, rows, onRowClick }) {
  return <div style={{ width: '100%', overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', font: '400 13px Inter, sans-serif' }}><thead><tr>{columns.map((column) => <th key={column.key} style={{ padding: '12px 13px', borderBottom: `1px solid ${tokens.line}`, color: tokens.muted, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.id ?? index} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>{columns.map((column) => <td key={column.key} style={{ padding: '14px 13px', borderBottom: `1px solid ${tokens.line}`, color: tokens.ink, verticalAlign: 'middle', whiteSpace: column.nowrap ? 'nowrap' : 'normal' }}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div>
}

export function Modal({ title, children, onClose, footer }) {
  return <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} style={{ position: 'fixed', zIndex: 40, inset: 0, display: 'grid', placeItems: 'center', padding: 18, background: 'rgba(20,20,20,.38)' }}>
    <section role="dialog" aria-modal="true" aria-labelledby="dialog-title" style={{ width: 'min(100%, 520px)', maxHeight: 'min(88vh, 760px)', overflowY: 'auto', padding: 24, borderRadius: 24, background: tokens.surface, color: tokens.ink, boxShadow: '0 28px 90px rgba(20,20,20,.24)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}><h2 id="dialog-title" style={{ margin: 0, color: tokens.ink, font: '700 21px Sora, sans-serif' }}>{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} style={{ width: 36, height: 36, border: `1px solid ${tokens.line}`, borderRadius: '50%', background: tokens.surface, color: tokens.ink, fontSize: 20, cursor: 'pointer' }}>×</button></div>
      <div>{children}</div>{footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9, marginTop: 23 }}>{footer}</div>}
    </section>
  </div>
}

export function ChoiceChip({ active, children, onClick }) {
  return <button type="button" onClick={onClick} aria-pressed={active} style={{ minHeight: 37, padding: '0 13px', border: `1px solid ${active ? tokens.ink : tokens.line}`, borderRadius: 999, background: active ? tokens.ink : tokens.surface, color: active ? 'var(--on-inverse)' : tokens.muted, font: '500 12px Inter, sans-serif', cursor: 'pointer' }}>{children}</button>
}
