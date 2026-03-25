import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

export async function checkEmail(email: string): Promise<boolean> {
  const res = await axios.get<{ taken: boolean }>(`${API_BASE}/api/user/check-email`, {
    params: { email },
  })
  return res.data.taken
}

export async function register(nickname: string, email: string, password: string): Promise<void> {
  await axios.post(`${API_BASE}/api/user/register`, { nickname, email, password })
}
