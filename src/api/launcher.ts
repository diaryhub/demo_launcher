import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

const client = axios.create()
client.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export interface Notice {
  id: number
  title: string
  content: string
  createdAt: string
}

export interface VersionInfo {
  version: string
  patchNote: string
  releaseDate: string
}

export async function fetchNotices(): Promise<Notice[]> {
  const res = await client.get<Notice[]>(`${API_BASE}/api/launcher/notices`)
  return res.data
}

export async function fetchServerStatus(): Promise<string> {
  const res = await client.get<{ status: string }>(`${API_BASE}/api/launcher/server-status`)
  return res.data.status
}

export async function fetchVersion(): Promise<VersionInfo> {
  const res = await client.get<VersionInfo>(`${API_BASE}/api/launcher/version`)
  return res.data
}

export interface Banner {
  id: number
  name: string
  startTime: string
  endTime: string
  cost: number
  imageUrl: string | null
}

export async function fetchBanners(): Promise<Banner[]> {
  const res = await client.get<Banner[]>(`${API_BASE}/api/launcher/banners`)
  return res.data
}
