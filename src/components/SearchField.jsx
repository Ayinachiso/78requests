import Icon from './Icon.jsx'
import { dashboardStyles } from '../styles/dashboardStyles.js'

function SearchField({ value, onChange, placeholder = 'Search', label = 'Search' }) {
  return (
    <label className="dashboard-search" style={{ position: 'relative', display: 'block', minWidth: 250, flex: '1 1 260px' }}>
      <span style={{ position: 'absolute', inset: '0 auto 0 13px', display: 'flex', alignItems: 'center', color: 'var(--quiet-ink)', pointerEvents: 'none' }}><Icon name="search" size={18} /></span>
      <input value={value} onChange={onChange} placeholder={placeholder} aria-label={label} style={{ ...dashboardStyles.input, paddingLeft: 40 }} />
    </label>
  )
}

export default SearchField
