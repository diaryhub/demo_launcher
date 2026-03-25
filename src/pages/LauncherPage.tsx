import { useNavigate } from 'react-router-dom'
import { getNickname } from '../utils/token'
import NoticeSection from '../components/NoticeSection'
import ServerStatus from '../components/ServerStatus'
import VersionInfo from '../components/VersionInfo'
import StartButton from '../components/StartButton'

export default function LauncherPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a2e] border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">GAME LAUNCHER</h1>
        <div className="flex items-center gap-4">
          <ServerStatus />
          <span className="text-gray-400 text-sm">안녕하세요, {getNickname()}님</span>
          <button
            onClick={handleLogout}
            className="text-xs text-[#6b7a99] hover:text-white border border-white/10 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 gap-0">
        {/* 좌측: 공지사항 */}
        <div className="flex-1 p-6">
          <NoticeSection />
        </div>

        {/* 우측: 버전 + 시작 버튼 */}
        <div className="w-72 bg-[#1a1a2e] border-l border-[#2a2a4a] p-6 flex flex-col gap-6">
          <VersionInfo />
          <StartButton />
        </div>
      </main>
    </div>
  )
}
