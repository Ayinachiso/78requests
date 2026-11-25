import PageHeader from '../../components/PageHeader.jsx'
import Panel from '../../components/Panel.jsx'
import MetricCard from '../../components/MetricCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { dashboardStyles as styles } from '../../styles/dashboardStyles.js'
import { auditEntries, people } from '../../data/superAdminDemoData.js'

const setupSteps = [
  ['Create departments', 'Set up the teams in your organisation', 'Done'],
  ['Define the hierarchy', 'Add reporting and approval lines', 'Done'],
  ['Assign roles & permissions', 'Choose who can do what', 'In progress'],
  ['Delegate approvals', 'Add alternates for unavailable approvers', 'To do'],
  ['Configure approval rules', 'Set thresholds by category', 'To do'],
  ['Invite employees', 'Help the team get started', 'To do'],
  ['Employees activate', 'People accept their invitations', 'To do'],
]

function OverviewPage({ onNavigate, onAction }) {
  return (
    <>
      <PageHeader title="Good morning, Sade" description="Bank 78’s departments are ready. Invite your team, then set who reports to whom." actions={<><button type="button" onClick={() => onAction('Invite team member')} style={styles.button}><Icon name="plus" size={17} />Invite team member</button><button type="button" onClick={() => onAction('Make a request')} style={styles.secondaryButton}><Icon name="requests" size={17} />Make a request</button></>} />

      <div className="workspace-grid-four" style={{ ...styles.gridFour, marginBottom: 16 }}>
        <MetricCard className="metric-everyone" label="Everyone" value="29" icon="users" onClick={() => onNavigate('users')} />
        <MetricCard className="metric-active" label="Active" value="21" icon="check" onClick={() => onNavigate('users')} tint="var(--status-ok-bg)" />
        <MetricCard className="metric-waiting" label="Waiting to join" value="6" icon="activity" onClick={() => onNavigate('users')} tint="var(--status-lavender-bg)" />
        <MetricCard className="metric-suspended" label="Suspended" value="1" icon="lock" onClick={() => onNavigate('users')} tint="var(--status-warn-bg)" />
      </div>

      <div style={{ ...styles.gridTwo, alignItems: 'start' }}>
        <Panel className="attention-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 7 }}><div><h2 style={{ margin: 0, fontFamily: 'Sora, Inter, sans-serif', fontSize: 18 }}>Needs your attention</h2><p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12 }}>A few things are waiting for a decision.</p></div><button type="button" aria-label="View users" onClick={() => onNavigate('users')} style={styles.secondaryButton}><Icon name="arrow" size={17} /></button></div>
          {people.filter((person) => ['Created', 'Invited'].includes(person.status)).slice(0, 3).map((person) => <div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: '1px solid var(--line-soft)' }}><Avatar name={person.name} /><div style={{ flex: 1, minWidth: 100 }}><b style={{ display: 'block', fontSize: 12 }}>{person.name}</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>{person.status === 'Created' ? 'Invitation not sent yet' : 'Waiting to join'}</span></div><button type="button" onClick={() => onAction(person.status === 'Created' ? 'Review invitation' : 'Resend invitation')} style={{ ...styles.secondaryButton, minHeight: 34, padding: '0 11px', fontSize: 11 }}>{person.status === 'Created' ? 'Review' : 'Resend'}</button></div>)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0 2px', borderTop: '1px solid var(--line-soft)' }}><span style={{ display: 'grid', width: 38, height: 38, placeItems: 'center', borderRadius: 13, background: 'var(--status-warn-bg)' }}><Icon name="roles" size={19} /></span><div style={{ flex: 1 }}><b style={{ display: 'block', fontSize: 12 }}>Access review due</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>18 of 28 people reviewed</span></div><button type="button" onClick={() => onNavigate('roles')} style={{ ...styles.secondaryButton, minHeight: 34, padding: '0 12px', fontSize: 11 }}>Review</button></div>
        </Panel>

        <Panel className="access-review-panel">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}><div><h2 style={{ margin: 0, fontFamily: 'Sora, Inter, sans-serif', fontSize: 18 }}>Access review</h2><p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12 }}>Quarterly permissions check</p></div><StatusBadge>In progress</StatusBadge></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 21 }}><div role="img" aria-label="Access review 64 percent complete" style={{ display: 'grid', width: 105, height: 105, flex: '0 0 auto', placeItems: 'center', borderRadius: '50%', background: 'conic-gradient(var(--accent) 0 64%, var(--line) 64% 100%)' }}><div style={{ display: 'grid', width: 79, height: 79, placeItems: 'center', borderRadius: '50%', background: 'var(--surface)', fontFamily: 'Sora, Inter, sans-serif', fontSize: 22, fontWeight: 750 }}>64%</div></div><p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>Review each person’s access to keep permissions current.</p></div>
        </Panel>

        <Panel className="setup-panel" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}><div><h2 style={{ margin: 0, fontFamily: 'Sora, Inter, sans-serif', fontSize: 18 }}>Set up 78 Requests</h2><p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12 }}>Seven steps from an empty workspace to a team ready to request.</p></div><span style={{ color: 'var(--muted)', fontSize: 12 }}>2 of 7 done</span></div>
          <div style={{ height: 7, overflow: 'hidden', marginBottom: 12, borderRadius: 999, background: 'var(--line-soft)' }}><div style={{ width: `${2 / 7 * 100}%`, height: '100%', borderRadius: 999, background: 'var(--accent)' }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 245px), 1fr))', gap: 4 }}>{setupSteps.map(([title, detail, state], index) => <button key={title} type="button" onClick={() => onAction(title)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', border: 0, borderRadius: 12, background: 'transparent', color: 'var(--ink)', textAlign: 'left', font: 'inherit', cursor: 'pointer' }}><span style={{ display: 'grid', flex: '0 0 auto', width: 27, height: 27, placeItems: 'center', borderRadius: 10, background: state === 'Done' ? 'var(--status-ok-bg)' : state === 'In progress' ? 'var(--status-warn-bg)' : 'var(--status-muted-bg)', fontSize: 11, fontWeight: 700 }}>{state === 'Done' ? <Icon name="check" size={15} /> : index + 1}</span><span style={{ minWidth: 0 }}><b style={{ display: 'block', fontSize: 11 }}>{title}</b><span style={{ color: 'var(--muted)', fontSize: 10 }}>{detail}</span></span></button>)}</div>
        </Panel>

        <Panel style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}><div><h2 style={{ margin: 0, fontFamily: 'Sora, Inter, sans-serif', fontSize: 18 }}>Live activity</h2><p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12 }}>Recent actions across the workspace</p></div><button type="button" onClick={() => onNavigate('audit')} style={styles.secondaryButton}>See all <Icon name="arrow" size={16} /></button></div>
          {auditEntries.slice(0, 4).map((entry) => <div key={`${entry.time}-${entry.detail}`} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderTop: '1px solid var(--line-soft)' }}><span style={{ display: 'grid', width: 35, height: 35, flex: '0 0 auto', placeItems: 'center', borderRadius: 12, background: entry.category === 'Denied' ? 'var(--status-danger-bg)' : 'var(--status-ok-bg)' }}><Icon name={entry.category === 'Denied' ? 'lock' : 'activity'} size={17} /></span><div style={{ flex: 1, minWidth: 0 }}><b style={{ display: 'block', fontSize: 12, lineHeight: 1.45 }}>{entry.detail}</b><span style={{ color: 'var(--muted)', fontSize: 11 }}>{entry.actor}</span></div><span className="dashboard-hide-mobile" style={{ color: 'var(--muted)', fontSize: 10, whiteSpace: 'nowrap' }}>{entry.time}</span></div>)}
        </Panel>
      </div>
    </>
  )
}

export default OverviewPage
