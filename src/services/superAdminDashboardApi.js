import { apiRequest } from './apiClient.js'

function appendQuery(path, query = {}) {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value)
  })
  const suffix = params.toString()
  return suffix ? `${path}?${suffix}` : path
}

function getRoute(routes, key, params = {}) {
  const configuredRoute = routes[key]
  if (typeof configuredRoute === 'function') return configuredRoute(params)
  if (typeof configuredRoute !== 'string' || !configuredRoute) {
    throw new Error(`Configure the '${key}' route from the agreed OpenAPI contract.`)
  }

  // String routes may use named segments, such as /resources/:id. Function
  // routes are available when ASP.NET Core uses a different route shape.
  return configuredRoute.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, (match, name) => {
    if (params[name] === undefined || params[name] === null) {
      throw new Error(`Route '${key}' requires the '${name}' value.`)
    }
    return encodeURIComponent(params[name])
  })
}

function queryRequest(request, routes, key, query) {
  return request(appendQuery(getRoute(routes, key), query))
}

function writeRequest(request, routes, key, method, params, body) {
  return request(getRoute(routes, key, params), { method, ...(body === undefined ? {} : { body }) })
}

/**
 * Build the Super Admin API adapter from route paths agreed in Swagger/OpenAPI.
 * No URLs are assumed here. Adjust HTTP verbs and request bodies to match the
 * final C# contract before connecting page actions.
 */
export function createSuperAdminDashboardApi({ routes, request = apiRequest } = {}) {
  if (!routes) throw new Error('Pass confirmed dashboard routes from the API contract.')

  return {
    // Dashboard reads
    getSummary: () => request(getRoute(routes, 'summary')),
    listPeople: (query) => queryRequest(request, routes, 'people', query),
    getPerson: (id) => request(getRoute(routes, 'person', { id })),
    listRequests: (query) => queryRequest(request, routes, 'requests', query),
    getRequest: (id) => request(getRoute(routes, 'request', { id })),
    listAuditEvents: (query) => queryRequest(request, routes, 'auditEvents', query),
    getOrganization: () => request(getRoute(routes, 'organization')),
    listNotifications: (query) => queryRequest(request, routes, 'notifications', query),

    // Mutations used by Super Admin actions. Connect only after request DTOs,
    // authorization scopes, and state transitions have been reviewed together.
    createPerson: (body) => writeRequest(request, routes, 'createPerson', 'POST', {}, body),
    bulkInvitePeople: (body) => writeRequest(request, routes, 'bulkInvitePeople', 'POST', {}, body),
    updatePerson: (id, body) => writeRequest(request, routes, 'person', 'PATCH', { id }, body),
    sendInvitation: (id) => writeRequest(request, routes, 'sendInvitation', 'POST', { id }),
    resendInvitation: (id) => writeRequest(request, routes, 'resendInvitation', 'POST', { id }),
    revokeInvitation: (id) => writeRequest(request, routes, 'revokeInvitation', 'POST', { id }),
    suspendPerson: (id, body) => writeRequest(request, routes, 'suspendPerson', 'POST', { id }, body),
    reactivatePerson: (id) => writeRequest(request, routes, 'reactivatePerson', 'POST', { id }),
    deactivatePerson: (id, body) => writeRequest(request, routes, 'deactivatePerson', 'POST', { id }, body),
    updateOrganization: (body) => writeRequest(request, routes, 'organization', 'PUT', {}, body),
    updateRolePermissions: (roleId, body) => writeRequest(request, routes, 'rolePermissions', 'PUT', { roleId }, body),
    updateApprovalRules: (body) => writeRequest(request, routes, 'approvalRules', 'PUT', {}, body),
    updateDelegation: (roleId, body) => writeRequest(request, routes, 'delegation', 'PUT', { roleId }, body),
    markNotificationsRead: (body) => writeRequest(request, routes, 'markNotificationsRead', 'POST', {}, body),
    createRequest: (body) => writeRequest(request, routes, 'createRequest', 'POST', {}, body),
  }
}
