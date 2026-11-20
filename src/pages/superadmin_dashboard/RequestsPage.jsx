import { useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import Panel from '../../components/Panel.jsx'
import MetricCard from '../../components/MetricCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import FilterChip from '../../components/FilterChip.jsx'
import Icon from '../../components/Icon.jsx'
import { dashboardStyles as styles } from '../../styles/dashboardStyles.js'
import { requests } from '../../data/superAdminDemoData.js'

const filters = ['All', 'Draft', 'Pending approval', 'Returned for revision', 'Rejected', 'Approved', 'Awaiting Payment', 'Paid', 'Awaiting Reconciliation', 'Completed']
const money = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })

function RequestsPage({ onAction }) {
  const [filter, setFilter] = useState('All')
  const list = useMemo(() => requests.filter((request) => filter === 'All' || request.status === filter), [filter])
  const count = (status) => requests.filter((request) => request.status === status).length

  return (
    <>
      <PageHeader title="Requests" description="Track procurement requests, approval progress, and payments." actions={<button type="button" onClick={() => onAction('Create request')} style={styles.button}><Icon name="plus" size={17} />Make a request</button>} />
      <div style={{ ...styles.gridFour, marginBottom: 16 }}><MetricCard label="Pending approval" value={count('Pending approval')} icon="clock" tint="var(--status-warn-bg)" onClick={() => setFilter('Pending approval')} /><MetricCard label="Awaiting payment" value={count('Awaiting Payment')} icon="requests" tint="var(--status-info-bg)" onClick={() => setFilter('Awaiting Payment')} /><MetricCard label="Awaiting reconciliation" value={count('Awaiting Reconciliation')} icon="activity" tint="var(--status-lavender-bg)" onClick={() => setFilter('Awaiting Reconciliation')} /><MetricCard label="Completed" value={count('Completed')} icon="check" tint="var(--status-ok-bg)" onClick={() => setFilter('Completed')} /></div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 }}>{filters.map((item) => <FilterChip key={item} selected={filter === item} onClick={() => setFilter(item)}>{item}</FilterChip>)}</div>
      <Panel style={{ padding: '4px 16px' }}>
        <div className="dashboard-table-scroll"><table style={styles.table}><thead><tr><th style={styles.th}>Request</th><th className="dashboard-hide-mobile" style={styles.th}>Requester</th><th className="dashboard-hide-mobile" style={styles.th}>Approver</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th><th className="dashboard-hide-mobile" style={styles.th}>Date</th></tr></thead><tbody>{list.map((request) => <tr key={request.id}><td style={styles.td}><b style={{ display: 'block', fontSize: 12 }}>{request.item}</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>{request.id} · {request.category}</span></td><td className="dashboard-hide-mobile" style={styles.td}>{request.requester}</td><td className="dashboard-hide-mobile" style={{ ...styles.td, color: 'var(--muted)' }}>{request.approver}</td><td style={{ ...styles.td, whiteSpace: 'nowrap', fontWeight: 650 }}>{money.format(request.amount)}</td><td style={styles.td}><StatusBadge>{request.status}</StatusBadge></td><td className="dashboard-hide-mobile" style={{ ...styles.td, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{request.date}</td></tr>)}</tbody></table></div>
        {!list.length && <p style={{ padding: 28, color: 'var(--muted)', textAlign: 'center', fontSize: 13 }}>There are no requests in this status yet.</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 10px', color: 'var(--muted)', fontSize: 11 }}><span>Showing {list.length} of {requests.length} requests</span><span>Page 1 of 1</span></div>
      </Panel>
    </>
  )
}

export default RequestsPage
