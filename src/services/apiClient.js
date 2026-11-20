const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

/**
 * Shared JSON request helper for the future ASP.NET Core API integration.
 * Callers provide the confirmed route and any auth headers supplied by the
 * authentication integration. Never put API secrets in VITE_ environment vars;
 * Vite exposes those values in the browser bundle.
 */
export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('Set VITE_API_BASE_URL before making API requests.')
  }
  if (!path || !path.startsWith('/')) {
    throw new Error('API routes must be absolute paths beginning with /.')
  }

  const headers = new Headers(options.headers)
  const body = options.body
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  const isAlreadyEncoded = isFormData || typeof body === 'string'
    || (typeof Blob !== 'undefined' && body instanceof Blob)
    || body instanceof URLSearchParams
  headers.set('Accept', 'application/json')
  if (body !== undefined && body !== null && !isAlreadyEncoded) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: body !== undefined && body !== null && !isAlreadyEncoded ? JSON.stringify(body) : body,
  })

  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  const rawPayload = await response.text()
  const isJsonResponse = contentType.includes('application/json') || contentType.includes('+json')
  let payload = rawPayload
  if (isJsonResponse && rawPayload) {
    try {
      payload = JSON.parse(rawPayload)
    } catch {
      // Preserve the raw response as a useful error message if JSON is malformed.
    }
  }

  if (!response.ok) {
    // ASP.NET Core can return ProblemDetails; retain a useful message for the UI.
    const validationError = typeof payload === 'object' && payload.errors
      ? Object.values(payload.errors).flat().find((error) => typeof error === 'string')
      : undefined
    const message = typeof payload === 'object' && payload !== null
      ? payload.detail || validationError || payload.title
      : payload
    throw new Error(message || `Request failed with status ${response.status}.`)
  }

  return payload
}
