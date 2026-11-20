import { dashboardStyles } from '../styles/dashboardStyles.js'

function Panel({ children, style, className = '' }) {
  return <section className={`dashboard-card ${className}`} style={{ ...dashboardStyles.card, ...style }}>{children}</section>
}

export default Panel
