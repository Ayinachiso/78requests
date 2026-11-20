import { dashboardStyles } from '../styles/dashboardStyles.js'

function PageHeader({ title, description, actions }) {
  return (
    <header className="dashboard-page-header" style={dashboardStyles.pageHeader}>
      <div>
        <h1 className="dashboard-page-title" style={dashboardStyles.pageTitle}>{title}</h1>
        {description && <p style={dashboardStyles.subtitle}>{description}</p>}
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>{actions}</div>}
    </header>
  )
}

export default PageHeader
