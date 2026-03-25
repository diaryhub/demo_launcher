import { useEffect, useState } from 'react'
import { fetchNotices, type Notice } from '../api/launcher'

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [selected, setSelected] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotices()
      .then((data) => {
        setNotices(data)
        if (data.length > 0) setSelected(data[0])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">공지사항</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">불러오는 중...</p>
      ) : notices.length === 0 ? (
        <p className="text-gray-500 text-sm">등록된 공지사항이 없습니다.</p>
      ) : (
        <div className="flex gap-4 flex-1">
          <ul className="w-64 flex flex-col gap-1">
            {notices.map((n) => (
              <li
                key={n.id}
                onClick={() => setSelected(n)}
                className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors ${
                  selected?.id === n.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-[#2a2a4a]'
                }`}
              >
                {n.title}
              </li>
            ))}
          </ul>

          {selected && (
            <div className="flex-1 bg-[#1a1a2e] rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-2">{selected.createdAt}</p>
              <h3 className="text-white font-semibold mb-3">{selected.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{selected.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
