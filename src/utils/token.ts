export function parseToken(token: string): Record<string, string> | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function getNickname(): string {
  const token = localStorage.getItem('token')
  if (!token) return ''
  const payload = parseToken(token)
  return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? ''
}
