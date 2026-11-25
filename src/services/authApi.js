const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const endpoints = {
  signIn: import.meta.env.VITE_AUTH_SIGN_IN_ENDPOINT || '/api/auth/sign-in',
  setPassword: import.meta.env.VITE_AUTH_SET_PASSWORD_ENDPOINT || '/api/auth/set-password',
  session: import.meta.env.VITE_AUTH_SESSION_ENDPOINT || '/api/auth/session',
  signOut: import.meta.env.VITE_AUTH_SIGN_OUT_ENDPOINT || '/api/auth/sign-out',
  twoStepSetup: import.meta.env.VITE_AUTH_TWO_STEP_SETUP_ENDPOINT || '/api/auth/two-step/setup',
  twoStepVerifySetup: import.meta.env.VITE_AUTH_TWO_STEP_VERIFY_SETUP_ENDPOINT || '/api/auth/two-step/verify-setup',
  twoStepSkipSetup: import.meta.env.VITE_AUTH_TWO_STEP_SKIP_SETUP_ENDPOINT || '/api/auth/two-step/skip',
  twoStepVerifySignIn: import.meta.env.VITE_AUTH_TWO_STEP_VERIFY_SIGN_IN_ENDPOINT || '/api/auth/two-step/verify',
  forgotPassword: import.meta.env.VITE_AUTH_FORGOT_PASSWORD_ENDPOINT || '/api/auth/password/forgot',
}

// Local preview accounts are available only while running Vite in development.
const DEMO_ENABLED = import.meta.env.DEV
const DEMO_SESSION_KEY = '78requests.demo.session'
const DEMO_ACCOUNTS = {
  'admin@78requests.test': { password: 'Demo1234!', requiresPasswordSetup: false },
  'setup@78requests.test': { password: 'TempPass123!', requiresPasswordSetup: true },
  'sade.ogunleye@bank78.co': { password: null, requiresPasswordSetup: true },
  'adaeze.okafor@bank78.co': { password: null, requiresPasswordSetup: true },
  'secure@78requests.test': { password: 'Demo1234!', requiresTwoStepVerification: true },
}

async function post(endpoint, payload) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('The authentication service is unavailable. Check your connection and try again.')
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || data.error || 'We could not complete your request. Check your details and try again.')
  }
  return data
}

/**
 * POST /api/auth/sign-in
 * First-time response: { requiresAccountSetup: true, setupToken }.
 * Existing 2-step response: { requiresTwoStepVerification: true, challengeToken }.
 * Fully authenticated success should set a secure, HTTP-only session cookie.
 */
export function signIn(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const demoAccount = DEMO_ENABLED ? DEMO_ACCOUNTS[normalizedEmail] : null
  if (demoAccount) {
    if (demoAccount.password && password !== demoAccount.password) throw new Error('Incorrect password. Check your details and try again.')
    if (demoAccount.requiresPasswordSetup) return Promise.resolve({ requiresAccountSetup: true, setupToken: 'demo-setup' })
    if (demoAccount.requiresTwoStepVerification) return Promise.resolve({ requiresTwoStepVerification: true, challengeToken: 'demo-challenge' })
    saveDemoSession(normalizedEmail)
    return Promise.resolve({})
  }
  return post(endpoints.signIn, { email, password })
}

/**
 * POST /api/auth/set-password
 * The temporary credential is sent only for this request and is not persisted.
 * Return a setup token for two-step enrollment; do not establish the final session yet.
 */
export function setPassword({ email, temporaryPassword, newPassword }) {
  const normalizedEmail = email.trim().toLowerCase()
  const demoAccount = DEMO_ENABLED ? DEMO_ACCOUNTS[normalizedEmail] : null
  if (demoAccount?.requiresPasswordSetup && (!demoAccount.password || temporaryPassword === demoAccount.password)) {
    return Promise.resolve({ setupToken: 'demo-setup' })
  }
  return post(endpoints.setPassword, { email, temporaryPassword, newPassword })
}

/** POST /api/auth/two-step/setup; expected to return { qrCodeDataUrl, secret, setupToken }. */
export function beginTwoStepSetup({ email, setupToken }) {
  if (DEMO_ENABLED && DEMO_ACCOUNTS[email.trim().toLowerCase()]?.requiresPasswordSetup) {
    return Promise.resolve({ demo: true, qrCodeDataUrl: '/images/demo-authenticator-qr.png', secret: 'JBSW Y3DP EHPK 3PXP', setupToken: setupToken || 'demo-setup' })
  }
  return post(endpoints.twoStepSetup, { email, setupToken })
}

/** POST /api/auth/two-step/verify-setup; success should establish the HTTP-only session. */
export function verifyTwoStepSetup({ email, setupToken, code }) {
  if (DEMO_ENABLED && DEMO_ACCOUNTS[email.trim().toLowerCase()]?.requiresPasswordSetup) {
    if (!/^\d{6}$/.test(code)) return Promise.reject(new Error('Enter a 6-digit code.'))
    saveDemoSession(email.toLowerCase())
    return Promise.resolve({})
  }
  return post(endpoints.twoStepVerifySetup, { email, setupToken, code })
}

/** POST /api/auth/two-step/skip for invited employees who defer optional enrollment. */
export function skipTwoStepSetup({ email, setupToken }) {
  const normalizedEmail = email.trim().toLowerCase()
  if (DEMO_ENABLED && DEMO_ACCOUNTS[normalizedEmail]?.requiresPasswordSetup) {
    saveDemoSession(normalizedEmail)
    return Promise.resolve({})
  }
  return post(endpoints.twoStepSkipSetup, { email, setupToken })
}

/** POST /api/auth/two-step/verify; success should establish the HTTP-only session. */
export function verifyTwoStepSignIn({ email, challengeToken, code }) {
  if (DEMO_ENABLED && email.toLowerCase() === 'secure@78requests.test') {
    if (!/^\d{6}$/.test(code)) return Promise.reject(new Error('Enter a 6-digit code.'))
    saveDemoSession(email.toLowerCase())
    return Promise.resolve({})
  }
  return post(endpoints.twoStepVerifySignIn, { email, challengeToken, code })
}

/** POST /api/auth/password/forgot with { email }; the response should not disclose whether the account exists. */
export function requestPasswordReset(email) {
  if (DEMO_ENABLED && Object.hasOwn(DEMO_ACCOUNTS, email.trim().toLowerCase())) return Promise.resolve({})
  return post(endpoints.forgotPassword, { email })
}

/** GET /api/auth/session; returns null when the visitor has no active session. */
export async function getSession() {
  if (DEMO_ENABLED) {
    try {
      const demoSession = JSON.parse(localStorage.getItem(DEMO_SESSION_KEY) || 'null')
      if (demoSession?.email) return demoSession
    } catch {
      localStorage.removeItem(DEMO_SESSION_KEY)
    }
  }
  let response
  try {
    response = await fetch(`${API_BASE_URL}${endpoints.session}`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
  } catch {
    return null
  }
  if (response.status === 401 || !response.ok) return null
  const data = await response.json().catch(() => ({}))
  const user = data.user || data
  return user.email ? user : null
}

/** POST /api/auth/sign-out; the backend should clear its HTTP-only session cookie. */
export function signOut() {
  if (DEMO_ENABLED) {
    try {
      if (localStorage.getItem(DEMO_SESSION_KEY)) {
        localStorage.removeItem(DEMO_SESSION_KEY)
        return Promise.resolve({})
      }
    } catch {
      // Continue with the backend sign-out if local storage is unavailable.
    }
  }
  return post(endpoints.signOut, {})
}

function saveDemoSession(email) {
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email }))
}

