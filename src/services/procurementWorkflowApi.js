import { apiRequest } from './apiClient.js'

function route(routes, key, params = {}) {
  const value = routes[key]
  if (typeof value === 'function') return value(params)
  if (typeof value !== 'string' || !value) throw new Error(`Configure the '${key}' route from the reviewed ASP.NET Core OpenAPI contract.`)
  return value.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, (match, name) => {
    if (params[name] === undefined || params[name] === null) throw new Error(`Route '${key}' requires '${name}'.`)
    return encodeURIComponent(params[name])
  })
}

function query(path, values = {}) {
  const params = new URLSearchParams()
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value)
  })
  const suffix = params.toString()
  return suffix ? `${path}?${suffix}` : path
}

/**
 * Frontend adapter boundary for the C# API. Configure every route from the
 * backend's reviewed Swagger/OpenAPI contract. Method names below express UI
 * operations; confirm route shape, verbs, DTOs and auth before wiring pages.
 */
export function createProcurementWorkflowApi({ routes, request = apiRequest } = {}) {
  if (!routes) throw new Error('Pass confirmed workflow routes from Swagger/OpenAPI.')
  const read = (key, params, filters) => request(query(route(routes, key, params), filters))
  const write = (key, method, params, body) => request(route(routes, key, params), { method, ...(body === undefined ? {} : { body }) })

  return {
    // Auth: credential handling and MFA enrollment/verification stay server-authoritative.
    signIn: (body) => write('signIn', 'POST', {}, body),
    signOut: () => write('signOut', 'POST', {}),
    getCurrentUser: () => read('currentUser'),
    acceptInvitation: (body) => write('acceptInvitation', 'POST', {}, body),
    setPassword: (body) => write('setPassword', 'POST', {}, body),
    startMfaEnrollment: () => write('startMfaEnrollment', 'POST', {}),
    verifyMfa: (body) => write('verifyMfa', 'POST', {}, body),

    // Employee request lifecycle and protected document upload.
    getEmployeeSummary: () => read('employeeSummary'),
    listMyRequests: (filters) => read('myRequests', {}, filters),
    getRequest: (id) => read('request', { id }),
    createRequestDraft: (body) => write('createRequestDraft', 'POST', {}, body),
    updateRequestDraft: (id, body) => write('requestDraft', 'PATCH', { id }, body),
    submitRequest: (id) => write('submitRequest', 'POST', { id }),
    uploadRequestDocument: (id, formData) => request(route(routes, 'requestDocuments', { id }), { method: 'POST', body: formData }),

    // Approvals: the server determines the actor's queue and next approver.
    getApproverSummary: () => read('approverSummary'),
    listApprovals: (filters) => read('approvals', {}, filters),
    approveRequest: (id, body) => write('approveRequest', 'POST', { id }, body),
    returnRequest: (id, body) => write('returnRequest', 'POST', { id }, body),
    rejectRequest: (id, body) => write('rejectRequest', 'POST', { id }, body),

    // Finance: call payout only after the backend contract and safeguards are agreed.
    getFinanceSummary: () => read('financeSummary'),
    listPayments: (filters) => read('payments', {}, filters),
    getPaymentBreakdown: (id) => read('paymentBreakdown', { id }),
    createPayout: (id, body) => write('createPayout', 'POST', { id }, body),
    listOwnFinanceRequests: (filters) => read('ownFinanceRequests', {}, filters),

    // Notifications and history are queried by the authenticated user/scope.
    listNotifications: (filters) => read('notifications', {}, filters),
    markNotificationsRead: (body) => write('markNotificationsRead', 'POST', {}, body),
    listAuditEvents: (filters) => read('auditEvents', {}, filters),
  }
}
