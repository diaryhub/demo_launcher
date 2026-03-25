import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkEmail, register } from '../api/user'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'invalid' | 'checking' | 'taken' | 'available'>('idle')

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!email) {
      setEmailStatus('idle')
      return
    }

    if (!isValidEmail(email)) {
      setEmailStatus('invalid')
      return
    }

    setEmailStatus('checking')

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    debounceTimer.current = setTimeout(async () => {
      await verifyEmail(email)
    }, 500)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [email])

  const verifyEmail = async (value: string) => {
    try {
      const taken = await checkEmail(value)
      setEmailStatus(taken ? 'taken' : 'available')
    } catch {
      setEmailStatus('idle')
    }
  }

  const handleBlur = async () => {
    if (!email || !isValidEmail(email)) return
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    await verifyEmail(email)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nickname || !email || !password) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if (emailStatus === 'taken') {
      setError('이미 사용 중인 이메일입니다.')
      return
    }
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await register(nickname, email, password)
      navigate('/login')
    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const emailBorderColor = {
    idle: 'border-white/10',
    invalid: 'border-red-500/60',
    checking: 'border-yellow-500/60',
    taken: 'border-red-500/60',
    available: 'border-green-500/60',
  }[emailStatus]

  const emailMessage = {
    idle: null,
    invalid: <span className="text-red-400">올바른 이메일 형식이 아닙니다.</span>,
    checking: <span className="text-yellow-400">확인 중...</span>,
    taken: <span className="text-red-400">이미 사용 중인 이메일입니다.</span>,
    available: <span className="text-green-400">사용 가능한 이메일입니다.</span>,
  }[emailStatus]

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
          <p className="text-sm text-[#6b7a99]">새 계정을 만드세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-7 py-8 backdrop-blur-md">
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8896b0]">닉네임</label>
              <input
                type="text"
                placeholder="플레이어 이름"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#3a4a66] outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8896b0]">이메일</label>
              <input
                type="email"
                placeholder="example@game.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                className={`bg-black/30 border ${emailBorderColor} rounded-lg px-4 py-3 text-sm text-white placeholder-[#3a4a66] outline-none transition-colors`}
              />
              {emailMessage && <p className="text-xs">{emailMessage}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8896b0]">비밀번호</label>
              <input
                type="password"
                placeholder="8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#3a4a66] outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading || emailStatus === 'taken' || emailStatus === 'invalid'}
              className="mt-1 py-3 bg-[linear-gradient(135deg,#0078ff,#0050cc)] text-sm font-semibold text-white rounded-lg tracking-wide shadow-[0_4px_16px_rgba(0,120,255,0.3)] hover:opacity-85 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#6b7a99]">
          이미 계정이 있으신가요?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer hover:text-blue-400">로그인</span>
        </p>
      </div>
    </div>
  )
}
