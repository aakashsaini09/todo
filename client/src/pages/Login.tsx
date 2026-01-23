import Loading from '@/components/Loading'
import { useToast } from '@/hooks/use-toast'
import { UserEmail, UserName } from '@/store/user'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const Login = () => {
  const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [recoilUser, setRecoilUser] = useRecoilState(UserName)
  const [recoilEmail, setRecoilEmail] = useRecoilState(UserEmail)
  
  if (!BackEndURL) {
    console.log("Recoil User: ", recoilUser)
    console.log("Recoil Email: ", recoilEmail)
  }

  const [userData, setuserData] = useState({
    email: '',
    password: ''
  })

  const loginfunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await axios.post(
        `${BackEndURL}/api/auth/user/login`,
        { email: userData.email, password: userData.password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        const jwt = res.data.jwt;
        localStorage.setItem("token", jwt)
        setRecoilUser(res.data.user.name)
        setRecoilEmail(res.data.user.email)
        const id = res.data.user.id
        localStorage.setItem("id", id)
        navigate('/feedback');
        setloading(false)
      } else {
        toast({ variant: 'destructive', description: res.data.message });
        console.log(res)
        setloading(false)
      }
    } catch (err) {
      toast({ variant: 'destructive', description: "Incorrect Credentials" });
      setuserData({
        email: "",
        password: ""
      })
      console.log(err)
      setloading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-800 via-black to-slate-800 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
              SILENT SHOUT
            </span>
          </Link>
        </div>
      </header>

      {loading && (
        <div className="min-h-screen w-screen fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <Loading />
        </div>
      )}

      {/* Main Content */}
      <section className="relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4 backdrop-blur-sm">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-purple-300">
                Welcome Back
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Login to Your Account
            </h1>
            <p className="text-gray-400">
              Continue your anonymous feedback journey
            </p>
          </div>

          {/* Login Card */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={loginfunction} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    value={userData.email}
                    onChange={(e) => setuserData({ ...userData, email: e.target.value })}
                    type="email"
                    name="email"
                    id="email"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    value={userData.password}
                    onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                    type="password"
                    name="password"
                    id="password"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login to Account"
                )}
              </button>

              {/* Sign up link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400">Secure & Private</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400">Instant Access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login