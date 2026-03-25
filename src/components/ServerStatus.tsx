import { useEffect, useState } from 'react'
import { fetchServerStatus } from '../api/launcher'

type Status = 'online' | 'maintenance' | 'unknown'

export default function ServerStatus() {
  const [status, setStatus] = useState<Status>('unknown')

  useEffect(() => {
    fetchServerStatus()
      .then((s) => setStatus(s === 'online' ? 'online' : 'maintenance'))
      .catch(() => setStatus('unknown'))
  }, [])

  const label = {
    online: '서버 정상',
    maintenance: '점검 중',
    unknown: '확인 중',
  }[status]

  const color = {
    online: 'bg-green-500',
    maintenance: 'bg-yellow-500',
    unknown: 'bg-gray-500',
  }[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  )
}
