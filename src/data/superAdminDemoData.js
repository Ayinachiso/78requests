// Sample content taken from the supplied design prototype. Replace with API data later.
export const people = [
  { id: 1, name: 'Sade Ogunleye', email: 'sade.ogunleye@bank78.co', role: 'Super Admin', department: 'Operations', status: 'Active', lastSeen: 'Today, 8:30 AM' },
  { id: 2, name: 'Adaeze Okafor', email: 'adaeze.okafor@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Active', lastSeen: 'Today, 9:02 AM' },
  { id: 3, name: 'Chidi Eze', email: 'chidi.eze@bank78.co', role: 'Team Lead', department: 'Engineering', status: 'Active', lastSeen: 'Today, 8:41 AM' },
  { id: 4, name: 'Zainab Musa', email: 'zainab.musa@bank78.co', role: 'Staff Engineer', department: 'Engineering', status: 'Active', lastSeen: 'Yesterday, 6:12 PM' },
  { id: 5, name: 'Kunle Adeyemi', email: 'kunle.adeyemi@bank78.co', role: 'Head of Engineering', department: 'Engineering', status: 'Active', lastSeen: 'Today, 9:20 AM' },
  { id: 6, name: 'Funmi Adeyemi', email: 'funmi.adeyemi@bank78.co', role: 'CTO', department: 'Engineering', status: 'Active', lastSeen: '3 Nov, 2:15 PM' },
  { id: 7, name: 'Ifeoma Nwosu', email: 'ifeoma.nwosu@bank78.co', role: 'COO', department: 'Operations', status: 'Active', lastSeen: 'Today, 7:55 AM' },
  { id: 8, name: 'Bola Adewale', email: 'bola.adewale@bank78.co', role: 'Finance Officer', department: 'Finance', status: 'Active', lastSeen: 'Today, 10:15 AM' },
  { id: 9, name: 'Amara Eze', email: 'amara.eze@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Created', lastSeen: 'Never' },
  { id: 10, name: 'Tunde Bakare', email: 'tunde.bakare@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Invited', lastSeen: 'Never' },
  { id: 11, name: 'Ife Daniels', email: 'ife.daniels@bank78.co', role: 'Team Lead', department: 'Operations', status: 'Invited', lastSeen: 'Never' },
  { id: 12, name: 'Hauwa Sani', email: 'hauwa.sani@bank78.co', role: 'Finance Officer', department: 'Finance', status: 'Invited', lastSeen: 'Never' },
  { id: 13, name: 'Kelechi Obi', email: 'kelechi.obi@bank78.co', role: 'Engineer', department: 'Engineering', status: 'Suspended', lastSeen: '2 Nov, 4:10 PM' },
]

export const requests = [
  { id: 'PR-OPS-0007', item: 'USB-C docking station', category: 'IT equipment', amount: 85000, requester: 'Sade Ogunleye', status: 'Pending approval', approver: 'Ifeoma Nwosu', date: 'Today, 9:42 AM' },
  { id: 'PR-OPS-0006', item: 'Wireless keyboard and mouse', category: 'IT equipment', amount: 32000, requester: 'Sade Ogunleye', status: 'Approved', approver: 'Finance', date: 'Yesterday, 3:16 PM' },
  { id: 'PR-OPS-0005', item: 'Annual antivirus licences', category: 'Software', amount: 640000, requester: 'Sade Ogunleye', status: 'Rejected', approver: 'Kunle Adeyemi', date: '11 Nov, 1:05 PM' },
  { id: 'PR-ENG-0044', item: 'Engineering test devices', category: 'IT equipment', amount: 1280000, requester: 'Adaeze Okafor', status: 'Returned for revision', approver: 'Kunle Adeyemi', date: 'Today, 9:31 AM' },
  { id: 'PR-ENG-0041', item: 'Cloud service renewal', category: 'Software', amount: 470000, requester: 'Chidi Eze', status: 'Paid', approver: 'Finance', date: 'Today, 9:48 AM' },
  { id: 'PR-FIN-0018', item: 'Quarterly office supplies', category: 'Stationery', amount: 118000, requester: 'Hauwa Sani', status: 'Awaiting Payment', approver: 'Finance', date: '10 Nov, 12:15 PM' },
  { id: 'PR-OPS-0012', item: 'Generator maintenance', category: 'Maintenance', amount: 280000, requester: 'Ife Daniels', status: 'Awaiting Reconciliation', approver: 'Finance', date: '8 Nov, 4:50 PM' },
  { id: 'PR-ENG-0039', item: 'Keyboard replacement', category: 'IT equipment', amount: 45000, requester: 'Adaeze Okafor', status: 'Completed', approver: 'Finance', date: '4 Nov, 11:30 AM' },
  { id: 'PR-OPS-0008', item: 'Desk chair', category: 'Maintenance', amount: 95000, requester: 'Ifeoma Nwosu', status: 'Draft', approver: '—', date: '3 Nov, 2:10 PM' },
]

export const auditEntries = [
  { time: 'Today, 10:15 AM', detail: 'Signed in with two-step verification', actor: 'Bola Adewale · Finance Officer', category: 'Sign-ins', tag: 'Sign-in' },
  { time: 'Today, 9:48 AM', detail: 'Started payment for PR-ENG-0041. Bank78 confirmed it', actor: 'Bola Adewale · Finance Officer', category: 'Requests', tag: 'Paid' },
  { time: 'Today, 9:31 AM', detail: 'Rejected PR-ENG-0044 and gave a reason', actor: 'Kunle Adeyemi · Head of Engineering', category: 'Requests', tag: 'Rejected' },
  { time: 'Today, 9:05 AM', detail: 'Tried to change their own role', actor: 'Sade Ogunleye · Super Admin', category: 'Denied', tag: 'Blocked' },
  { time: 'Yesterday, 6:05 PM', detail: 'Verified with Face ID and gave final approval on PR-ENG-0040', actor: 'Ifeoma Nwosu · COO', category: 'Requests', tag: 'Final approval' },
  { time: 'Yesterday, 2:20 PM', detail: 'Opened PR-ENG-0031 outside their department queue', actor: 'Tunde Bakare · Engineer', category: 'Denied', tag: 'Denied' },
  { time: '11 Nov, 3:12 PM', detail: 'Sent an invitation to Tunde Bakare. The link is valid for 72 hours', actor: 'Sade Ogunleye · Super Admin', category: 'Access', tag: 'Invited' },
  { time: '2 Nov, 4:10 PM', detail: 'Suspended Kelechi Obi and signed them out on every device', actor: 'Sade Ogunleye · Super Admin', category: 'Access', tag: 'Suspended' },
]

export const departments = ['Engineering', 'Operations', 'Finance', 'Compliance']
export const roles = ['Engineer', 'Team Lead', 'Staff Engineer', 'Head of Engineering', 'CTO', 'COO', 'Finance Officer', 'Super Admin']
