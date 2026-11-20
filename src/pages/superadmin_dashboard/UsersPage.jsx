import { useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import Panel from '../../components/Panel.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import Avatar from '../../components/Avatar.jsx'
import SearchField from '../../components/SearchField.jsx'
import FilterChip from '../../components/FilterChip.jsx'
import Icon from '../../components/Icon.jsx'
import { dashboardStyles as styles } from '../../styles/dashboardStyles.js'
import { people } from '../../data/superAdminDemoData.js'

const filters = ['All', 'Active', 'Created', 'Invited', 'Suspended', 'Deactivated']

function UsersPage({ onAction }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const filteredPeople = useMemo(() => people.filter((person) => (filter === 'All' || person.status === filter) && `${person.name} ${person.email} ${person.role} ${person.department}`.toLowerCase().includes(query.toLowerCase())), [filter, query])

  return (
    <>
      <PageHeader title="Users & access" description="Create people, assign roles, and review who has access to your workspace." actions={<><button type="button" onClick={() => onAction('Invite team member')} style={styles.button}><Icon name="plus" size={17} />Invite team member</button><button type="button" onClick={() => onAction('Bulk upload')} style={styles.secondaryButton}>Bulk upload</button></>} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}><SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email or role" label="Search people" /><div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>{filters.map((item) => <FilterChip key={item} selected={filter === item} onClick={() => setFilter(item)}>{item}</FilterChip>)}</div></div>
      <Panel style={{ padding: '4px 16px' }}>
        <div className="dashboard-table-scroll"><table style={styles.table}><thead><tr><th style={styles.th}>Person</th><th className="dashboard-hide-mobile" style={styles.th}>Role</th><th className="dashboard-hide-mobile" style={styles.th}>Department</th><th style={styles.th}>Status</th><th className="dashboard-hide-mobile" style={styles.th}>Last active</th><th style={styles.th}><span className="dashboard-hide-mobile">Actions</span></th></tr></thead><tbody>{filteredPeople.map((person, index) => <tr key={person.id}><td style={styles.td}><div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 180 }}><Avatar name={person.name} color={['var(--mint)', 'var(--status-lavender-bg)', 'var(--status-warn-bg)', 'var(--status-info-bg)'][index % 4]} /><div><b style={{ display: 'block', fontSize: 12 }}>{person.name}</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>{person.email}</span></div></div></td><td className="dashboard-hide-mobile" style={styles.td}>{person.role}</td><td className="dashboard-hide-mobile" style={{ ...styles.td, color: 'var(--muted)' }}>{person.department}</td><td style={styles.td}><StatusBadge>{person.status}</StatusBadge></td><td className="dashboard-hide-mobile" style={{ ...styles.td, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{person.lastSeen}</td><td style={styles.td}><button type="button" aria-label={`More actions for ${person.name}`} onClick={() => onAction(`Manage access for ${person.name}`)} style={{ display: 'grid', width: 34, height: 34, placeItems: 'center', border: '1px solid var(--line)', borderRadius: 11, background: 'var(--surface)', cursor: 'pointer' }}><Icon name="dots" size={17} /></button></td></tr>)}</tbody></table></div>
        {!filteredPeople.length && <p style={{ padding: 28, color: 'var(--muted)', textAlign: 'center', fontSize: 13 }}>No people match that search. Try another name or filter.</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 10px', color: 'var(--muted)', fontSize: 11 }}><span>Showing {filteredPeople.length} of {people.length} people</span><span>Page 1 of 1</span></div>
      </Panel>
    </>
  )
}

export default UsersPage
