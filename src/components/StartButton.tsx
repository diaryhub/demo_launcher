import { useState } from 'react'

export default function StartButton() {
  const [launching, setLaunching] = useState(false)

  const handleStart = () => {
    setLaunching(true)
    // 더미: 실제 게임 실행은 데스크톱 앱에서 처리
    setTimeout(() => setLaunching(false), 2000)
  }

  return (
    <button
      onClick={handleStart}
      disabled={launching}
      className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-colors shadow-lg"
    >
      {launching ? '실행 중...' : '게임 시작'}
    </button>
  )
}
