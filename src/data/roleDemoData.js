// Example rows model the design prototype only; replace these values with API responses.
export const requestRows = [
  { id: 'PR-ENG-0044', item: 'Engineering test devices', category: 'IT equipment', amount: '₦1,280,000', requester: 'Adaeze Okafor', department: 'Engineering', status: 'Pending approval', date: 'Today, 9:31 AM', approver: 'Kunle Adeyemi' },
  { id: 'PR-ENG-0041', item: 'Cloud service renewal', category: 'Software', amount: '₦470,000', requester: 'Chidi Eze', department: 'Engineering', status: 'Paid', date: 'Today, 9:48 AM', approver: 'Bola Adewale' },
  { id: 'PR-FIN-0018', item: 'Quarterly office supplies', category: 'Stationery', amount: '₦118,000', requester: 'Hauwa Sani', department: 'Finance', status: 'Awaiting Payment', date: '10 Nov, 12:15 PM', approver: 'Ifeoma Nwosu' },
  { id: 'PR-OPS-0012', item: 'Generator maintenance', category: 'Maintenance', amount: '₦280,000', requester: 'Ife Daniels', department: 'Operations', status: 'Approved', date: '8 Nov, 4:50 PM', approver: 'Finance' },
  { id: 'PR-ENG-0039', item: 'Keyboard replacement', category: 'IT equipment', amount: '₦45,000', requester: 'Adaeze Okafor', department: 'Engineering', status: 'Completed', date: '4 Nov, 11:30 AM', approver: 'Finance' },
  { id: 'PR-OPS-0008', item: 'Desk chair', category: 'Furniture', amount: '₦95,000', requester: 'Ifeoma Nwosu', department: 'Operations', status: 'Draft', date: '3 Nov, 2:10 PM', approver: '—' },
]

export const updates = [
  { title: 'Your request was approved', detail: 'PR-ENG-0039 · Keyboard replacement', time: 'Today · 10:42 AM', tone: 'success' },
  { title: 'Finance is preparing payment', detail: 'PR-ENG-0041 · Cloud service renewal', time: 'Today · 9:48 AM', tone: 'info' },
  { title: 'A request needs more information', detail: 'PR-ENG-0044 · Engineering test devices', time: 'Yesterday · 4:16 PM', tone: 'warning' },
  { title: 'A receipt was added', detail: 'PR-OPS-0012 · Generator maintenance', time: 'Yesterday · 2:30 PM', tone: 'info' },
]

export const approvals = [
  { id: 'PR-ENG-0044', item: 'Engineering test devices', requester: 'Adaeze Okafor', department: 'Engineering', amount: '₦1,280,000', submitted: 'Today, 9:31 AM', priority: 'Needs review' },
  { id: 'PR-OPS-0016', item: 'Field team transport', requester: 'Bola Adewale', department: 'Operations', amount: '₦235,000', submitted: 'Today, 8:56 AM', priority: 'Standard' },
  { id: 'PR-ENG-0043', item: 'Testing platform subscription', requester: 'Zainab Musa', department: 'Engineering', amount: '₦540,000', submitted: 'Yesterday, 4:22 PM', priority: 'Standard' },
  { id: 'PR-OPS-0014', item: 'Office internet renewal', requester: 'Ife Daniels', department: 'Operations', amount: '₦180,000', submitted: 'Yesterday, 2:10 PM', priority: 'Standard' },
]

export const paymentRows = [
  { id: 'PR-ENG-0041', item: 'Cloud service renewal', payee: 'CloudWorks Nigeria Ltd', amount: '₦470,000', account: '•••• 2841', status: 'Awaiting Payment', approved: 'Today, 9:48 AM' },
  { id: 'PR-FIN-0018', item: 'Quarterly office supplies', payee: 'OfficeMart', amount: '₦118,000', account: '•••• 6172', status: 'Awaiting Payment', approved: '10 Nov, 12:15 PM' },
  { id: 'PR-OPS-0012', item: 'Generator maintenance', payee: 'Midas Technical Services', amount: '₦280,000', account: '•••• 0047', status: 'Paid', approved: '8 Nov, 4:50 PM' },
]

export const peopleRows = [
  { name: 'Adaeze Okafor', email: 'adaeze.okafor@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Active' },
  { name: 'Chidi Eze', email: 'chidi.eze@bank78.co', role: 'Team Lead', department: 'Engineering', status: 'Active' },
  { name: 'Bola Adewale', email: 'bola.adewale@bank78.co', role: 'Finance Officer', department: 'Finance', status: 'Active' },
  { name: 'Amara Eze', email: 'amara.eze@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Invited' },
]

export const auditRows = [
  { time: 'Today, 10:15 AM', actor: 'Bola Adewale · Finance Officer', action: 'Signed in with two-step verification', category: 'Sign-ins' },
  { time: 'Today, 9:48 AM', actor: 'Bola Adewale · Finance Officer', action: 'Started payment for PR-ENG-0041', category: 'Payments' },
  { time: 'Today, 9:31 AM', actor: 'Kunle Adeyemi · Head of Engineering', action: 'Approved PR-ENG-0044', category: 'Requests' },
  { time: 'Yesterday, 6:05 PM', actor: 'Sade Ogunleye · Super Admin', action: 'Updated Engineering approval chain', category: 'Access' },
]
