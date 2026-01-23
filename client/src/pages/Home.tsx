import { useState } from 'react'
import { Shield, Heart, Share2, Smile, MessageSquare, Sparkles, Github, Star, Menu, X } from 'lucide-react'

const Landing = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [star] = useState(142)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  const url = 'https://silent-shout.netlify.com'
  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url)
    showNotification("Link copied to clipboard!")
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) {
      showNotification("Please enter a message")
      return
    }
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      showNotification("Message sent successfully! 🎉")
      setTitle("")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-black to-slate-800 text-white overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="bg-white text-slate-900 z-40 px-6 py-3 rounded-lg shadow-lg border border-purple-200">
            {toastMessage}
          </div>
        </div>
      )}
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-10 backdrop-blur-sm bg-slate-950/50 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <MessageSquare className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <div className="absolute inset-0 bg-purple-400/20 blur-xl group-hover:bg-purple-300/30 transition-all"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SILENT SHOUT
              </span>
            </a>

            {/* Desktop GitHub Button */}
            <div className="hidden md:block">
              <a 
                href='https://github.com/aakashsaini09/Silent-Shout.git' 
                target='_blank'
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">Star on GitHub</span>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{star}</span>
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {navbarOpen && (
            <div className="md:hidden mt-4 pb-4 animate-in slide-in-from-top">
              <a 
                href='https://github.com/aakashsaini09/Silent-Shout.git' 
                target='_blank'
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
              >
                <Github className="w-5 h-5" />
                <span>Star on GitHub</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{star}</span>
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center transition-all duration-1000 opacity-100 translate-y-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">100% Anonymous Feedback Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Invite Honest Thoughts,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              No Names Attached
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Share your unique link to receive honest, anonymous feedback from friends and followers. 
            <span className="text-purple-300 font-semibold"> No sign-ups, no identities</span> — just real opinions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={copyLinkToClipboard}
              className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Invite Your Friends
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 rounded-full blur transition-opacity"></div>
            </button>

            <a
              href='/login'
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
            >
              <span className="flex items-center gap-2">
                Get Started Free
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </a>
          </div>
        </div>

        {/* Hero Image with glassmorphism */}
        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-white/5 p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop" 
              className="w-full h-auto rounded-xl opacity-80 hover:opacity-100 transition-opacity duration-500" 
              alt="Silent Shout Platform"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why Silent Shout?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The best platform to share your thoughts for a particular person, completely free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Security & Privacy",
                description: "Your identity is safe with us. Messages are fully anonymous, and no personal data is shared. Feel confident in your privacy.",
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: Heart,
                title: "Respectful Feedback Only",
                description: "Our platform is built for honest, constructive feedback—harassment and harmful language have no place here.",
                color: "from-pink-500 to-red-500"
              },
              {
                icon: Share2,
                title: "Effortless Sharing",
                description: "Share your link on social media or directly with friends. No sign-ups required for message senders, making it easy for everyone to connect.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Smile,
                title: "Simple & Insightful",
                description: "View all your feedback in one place. Log in anytime to see what others have to say and gain real insights.",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <form onSubmit={sendMessage} className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl p-12">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Have Something in Mind?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Have Feedback? Share It Anonymously Directly with Me!
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="This website is amazing because..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Send Feedback
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 Silent Shout. Made with ❤️ for honest conversations.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing