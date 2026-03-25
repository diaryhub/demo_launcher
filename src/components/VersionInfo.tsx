import { useEffect, useState } from 'react'
import { fetchVersion, type VersionInfo as VersionData } from '../api/launcher'

export default function VersionInfo() {
  const [data, setData] = useState<VersionData | null>(null)

  useEffect(() => {
    fetchVersion()
      .then(setData)
      .catch(() => setData(null))
  }, [])

  return (
    <div className="bg-[#0f0f1a] rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">현재 버전</p>
      <p className="text-2xl font-bold text-white mb-3">v{data?.version ?? '...'}</p>
      <p className="text-xs text-gray-400">{data?.patchNote}</p>
      <p className="text-xs text-gray-500 mt-1">{data?.releaseDate}</p>
    </div>
  )
}
