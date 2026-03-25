import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

export async function login(email: string, password: string): Promise<string> {
  const res = await axios.post<{ token: string }>(`${API_BASE}/api/auth/login`, {
    email,
    password,
  })
  return res.data.token
}
