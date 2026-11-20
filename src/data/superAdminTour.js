export const dashboardTourSteps = [
  { page: 'overview', title: 'Your workspace at a glance', text: 'The overview brings together team setup, account activity, and items that need attention. The figures here are sample data until the dashboard is connected to the API.', icon: 'overview' },
  { page: 'users', title: 'People and access', text: 'Review employee accounts, their roles, departments, and invitation status. The server must enforce access rules; hiding controls in this interface is not security.', icon: 'users' },
  { page: 'roles', title: 'Organisation and workflow', text: 'Set departments, role permissions, reporting lines, and delegation. Approval categories and thresholds still need approval, so the prototype leaves them unconfigured.', icon: 'roles' },
  { page: 'requests', title: 'Procurement requests', text: 'Follow request progress from draft through approval, payment, reconciliation, and completion. The backend will determine each request’s route from the approved rules.', icon: 'requests' },
  { page: 'audit', title: 'A record of important actions', text: 'The audit log gives authorised people a history of sign-ins, decisions, and access changes. The backend should create and protect these records.', icon: 'audit' },
]
