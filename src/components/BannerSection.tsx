import { useEffect, useState } from 'react'
import { fetchBanners, type Banner } from '../api/launcher'

export default function BannerSection() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchBanners().then(setBanners).catch(() => {})
  }, [])

  if (banners.length === 0) return null

  const banner = banners[current]

  return (
    <div className="relative w-full h-40 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
      {banner.imageUrl ? (
        <img src={banner.imageUrl} alt={banner.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4a]">
          <span className="text-white text-lg font-bold">{banner.name}</span>
        </div>
      )}

      {/* 배너 정보 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2 flex items-center justify-between">
        <span className="text-white text-sm font-semibold">{banner.name}</span>
        <span className="text-yellow-400 text-sm">{banner.cost} 재화</span>
      </div>

      {/* 이전/다음 버튼 */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors cursor-pointer"
          >
            ›
          </button>

          {/* 인디케이터 */}
          <div className="absolute top-2 right-3 flex gap-1">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === current ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
