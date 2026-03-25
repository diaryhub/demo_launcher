import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

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
  const res = await axios.get<Notice[]>(`${API_BASE}/api/launcher/notices`)
  return res.data
}

export async function fetchServerStatus(): Promise<string> {
  const res = await axios.get<{ status: string }>(`${API_BASE}/api/launcher/server-status`)
  return res.data.status
}

export async function fetchVersion(): Promise<VersionInfo> {
  const res = await axios.get<VersionInfo>(`${API_BASE}/api/launcher/version`)
  return res.data
}
