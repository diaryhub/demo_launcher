export function parseToken(token: string): Record<string, string> | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function isTokenValid(): boolean {
  const token = localStorage.getItem('token')
  if (!token) return false
  const payload = parseToken(token)
  if (!payload?.exp) return false
  return Number(payload.exp) * 1000 > Date.now()
}

export function getNickname(): string {
  const token = localStorage.getItem('token')
  if (!token) return ''
  const payload = parseToken(token)
  return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? ''
}
