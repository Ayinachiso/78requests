import { useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import Panel from '../../components/Panel.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import Avatar from '../../components/Avatar.jsx'
import SearchField from '../../components/SearchField.jsx'
import FilterChip from '../../components/FilterChip.jsx'
import { auditEntries } from '../../data/superAdminDemoData.js'

const filters = ['All', 'Sign-ins', 'Requests', 'Access', 'Denied']

function AuditLogPage() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const entries = useMemo(() => auditEntries.filter((entry) => (filter === 'All' || entry.category === filter) && `${entry.detail} ${entry.actor}`.toLowerCase().includes(query.toLowerCase())), [filter, query])

  return (
    <>
      <PageHeader title="Audit log" description="A read-only record of sign-ins, decisions, and access changes." />
      <Panel style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}><SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the log" label="Search the audit log" /><div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>{filters.map((item) => <FilterChip key={item} selected={filter === item} onClick={() => setFilter(item)}>{item}</FilterChip>)}</div></div>
        {entries.map((entry) => <article key={`${entry.time}-${entry.detail}`} className="dashboard-audit-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, .55fr) minmax(240px, 1.6fr) minmax(180px, 1fr) auto', alignItems: 'center', gap: 14, padding: '14px 2px', borderTop: '1px solid var(--line-soft)' }}><time style={{ color: 'var(--muted)', fontSize: 11 }}>{entry.time}</time><div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>{entry.detail}</div><div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 11 }}><Avatar name={entry.actor.split(' · ')[0]} size={30} color="var(--status-lavender-bg)" />{entry.actor}</div><StatusBadge>{entry.tag}</StatusBadge></article>)}
        {!entries.length && <p style={{ padding: 28, color: 'var(--muted)', textAlign: 'center', fontSize: 13 }}>Nothing matches your search. Try another filter or phrase.</p>}
        <div style={{ padding: '12px 2px 0', borderTop: '1px solid var(--line-soft)', color: 'var(--muted)', fontSize: 11 }}>Showing {entries.length} of {auditEntries.length} events · Log entries can’t be edited or deleted.</div>
      </Panel>
      <style>{`@media(max-width:760px){.dashboard-audit-row{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}

export default AuditLogPage
