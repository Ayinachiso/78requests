import Icon from './Icon.jsx'
import Panel from './Panel.jsx'

function MetricCard({ label, value, icon = 'overview', tint = 'var(--mint)', onClick }) {
  return (
    <Panel style={{ padding: 18 }}>
      <button type="button" onClick={onClick} style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'flex-start', padding: 0, border: 0, background: 'transparent', color: 'inherit', textAlign: 'left', font: 'inherit', cursor: onClick ? 'pointer' : 'default' }}>
        <span style={{ display: 'grid', width: 42, height: 42, placeItems: 'center', marginBottom: 14, borderRadius: 14, background: tint, color: 'var(--ink)' }}><Icon name={icon} size={21} /></span>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>{label}</span>
        <strong style={{ marginTop: 3, fontFamily: 'Sora, Inter, sans-serif', fontSize: 31, lineHeight: 1.2, letterSpacing: '-.04em' }}>{value}</strong>
      </button>
    </Panel>
  )
}

export default MetricCard
