const DEFAULT_API_BASE_URL = 'https://tdminfra-backend-py8m.vercel.app'

export const API_BASE_URL = (import.meta.env.VITE_TDMINFRA_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export const assetUrl = (value = '') => {
  if (!value) {
    return ''
  }

  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) {
    return value
  }

  if (value.startsWith('/uploads/')) {
    return apiUrl(value)
  }

  return value
}

export async function postJson(path, body, options = {}) {
  return fetchJson(path, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(body),
  })
}

export async function fetchJson(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorPayload = await response.json()
      message = errorPayload?.message || errorPayload?.error || message
    } catch {
      // Ignore JSON parse errors and fall back to the HTTP status message.
    }

    throw new Error(message)
  }

  const text = await response.text()
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}
