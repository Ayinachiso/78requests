export const roleNavigation = {
  superadmin: [
    { id: 'overview', label: 'Overview', icon: 'overview' },
    { id: 'users', label: 'Users', icon: 'users', badge: '3' },
    { id: 'roles', label: 'Roles & workflow', icon: 'roles' },
    { id: 'requests', label: 'Requests', icon: 'requests' },
    { id: 'audit', label: 'Audit log', icon: 'audit' },
  ],
  employee: [
    { id: 'home', label: 'Home', icon: 'overview' },
    { id: 'requests', label: 'My requests', icon: 'requests' },
    { id: 'make-request', label: 'Make a request', icon: 'plus' },
    { id: 'updates', label: 'Updates', icon: 'activity', badge: '2' },
  ],
  approver: [
    { id: 'home', label: 'Home', icon: 'overview' },
    { id: 'approvals', label: 'Approvals', icon: 'check', badge: '4' },
    { id: 'my-requests', label: 'My requests', icon: 'requests' },
    { id: 'updates', label: 'Updates', icon: 'activity', badge: '1' },
  ],
  finance: [
    { id: 'home', label: 'Home', icon: 'overview' },
    { id: 'payments', label: 'Payments', icon: 'check', badge: '3' },
    { id: 'own-requests', label: 'Own requests', icon: 'requests' },
    { id: 'updates', label: 'Updates', icon: 'activity', badge: '1' },
  ],
}

export const roleLabels = { superadmin: 'Super Admin', employee: 'Employee', approver: 'Approver', finance: 'Finance Officer' }

export const authScreens = ['setup', 'password', 'verification', 'sign-in']
export const extraRolePages = {
  employee: ['request-detail', 'receipt'],
  approver: ['review-request', 'my-requests'],
  finance: ['pay-out', 'after-payment', 'breakdown', 'own-requests'],
}

export function normalizeRoute(hash) {
  const path = hash.replace(/^#\/?/, '')
  if (!path || path === 'overview') return { role: 'superadmin', page: 'overview' }
  if (authScreens.includes(path.replace('auth/', ''))) return { role: 'auth', page: path.replace('auth/', '') }
  const [role, page] = path.split('/')
  const landingPages = { superadmin: 'overview', employee: 'home', approver: 'home', finance: 'home' }
  const valid = roleNavigation[role]?.some((item) => item.id === page) || extraRolePages[role]?.includes(page)
  return valid ? { role, page } : { role: landingPages[role] ? role : 'superadmin', page: landingPages[role] || 'overview' }
}

export function routeHash(role, page) {
  return `#/${role}/${page}`
}
