const palette = {
  Active: ['--status-ok-bg', '--status-ok-fg'],
  Approved: ['--status-ok-bg', '--status-ok-fg'],
  Paid: ['--status-ok-bg', '--status-ok-fg'],
  Completed: ['--status-ok-bg', '--status-ok-fg'],
  'Awaiting Payment': ['--status-info-bg', '--status-info-fg'],
  'Awaiting Reconciliation': ['--status-info-bg', '--status-info-fg'],
  Invited: ['--status-lavender-bg', '--status-lavender-fg'],
  Created: ['--status-info-bg', '--status-info-fg'],
  Pending: ['--status-warn-bg', '--status-warn-fg'],
  'Pending approval': ['--status-warn-bg', '--status-warn-fg'],
  Returned: ['--status-warn-bg', '--status-warn-fg'],
  'Returned for revision': ['--status-warn-bg', '--status-warn-fg'],
  Rejected: ['--status-danger-bg', '--status-danger-fg'],
  Suspended: ['--status-salmon-bg', '--status-salmon-fg'],
  Deactivated: ['--status-muted-bg', '--status-muted-fg'],
  'Sign-in': ['--status-ok-bg', '--status-ok-fg'],
  Blocked: ['--status-danger-bg', '--status-danger-fg'],
  Denied: ['--status-danger-bg', '--status-danger-fg'],
  'Final approval': ['--status-lavender-bg', '--status-lavender-fg'],
  'Needs configuration': ['--status-warn-bg', '--status-warn-fg'],
  'Example only': ['--status-muted-bg', '--status-muted-fg'],
  'In progress': ['--status-info-bg', '--status-info-fg'],
  'To do': ['--status-muted-bg', '--status-muted-fg'],
}

function StatusBadge({ children }) {
  const [background, color] = palette[children] || ['--status-muted-bg', '--status-muted-fg']
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 25, padding: '3px 10px', borderRadius: 999, background: `var(${background})`, color: `var(${color})`, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}><span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />{children}</span>
}

export default StatusBadge
