import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const token = await login(email, password)
      localStorage.setItem('token', token)
      navigate('/launcher')
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#0a0e1a_0%,#0d1b3e_50%,#0a0e1a_100%)]">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,120,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-sm px-6">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,#0078ff,#0050cc)] flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(0,120,255,0.4)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-widest mb-2">GAME LAUNCHER</h1>
          <p className="text-sm text-[#6b7a99]">계정에 로그인하세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-7 py-8 backdrop-blur-md">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8896b0]">이메일</label>
              <input
                type="email"
                placeholder="example@game.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#3a4a66] outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-medium tracking-widest uppercase text-[#8896b0]">비밀번호</label>
                <span className="text-xs text-blue-500 cursor-pointer hover:text-blue-400">비밀번호 찾기</span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#3a4a66] outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 py-3 bg-[linear-gradient(135deg,#0078ff,#0050cc)] text-sm font-semibold text-white rounded-lg tracking-wide shadow-[0_4px_16px_rgba(0,120,255,0.3)] hover:opacity-85 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#6b7a99]">
          계정이 없으신가요?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer hover:text-blue-400">회원가입</span>
        </p>
      </div>
    </div>
  )
}
