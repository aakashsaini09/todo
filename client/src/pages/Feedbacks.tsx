import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserName } from '@/store/user'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import Loading from '@/components/Loading'
import Footer from '@/components/Footer'
import { RefreshCw, Copy, Trash2, MessageSquare, LogOut, X, Link as LinkIcon, Mail } from 'lucide-react'

interface Feed {
    id: string;
    title: string;
    description: string;
    date: string;
    accepting: boolean;
}

const Feedbacks = () => {
  const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL
  const name = useRecoilValue(UserName)
  const {toast} = useToast()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [userdata, setuserdata] = useState<Feed[]>([])
  const id = localStorage.getItem('id')
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

  const getUserFeeds = async() => {
    setloading(true)
    const token = localStorage.getItem('token')
    try {    
      const res = await axios.post(`${BackEndURL}/api/auth/feed/getuserfeed`, { id: localStorage.getItem('id') }, 
      {
        headers: {
          Authorization: token,
        }
      })
      if (res.data.success) {
        setuserdata(res.data.feeds)
        setloading(false)
      } else {
        toast({ variant: 'destructive', description: res.data.message })
        setloading(false)
      }
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }

  useEffect(() => {
    getUserFeeds()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    navigate('/')
  }

  const deleteFeed = async(id: string) => {
    setloading(true)
    const token = localStorage.getItem('token')
    try {    
      const res = await axios.delete(`${BackEndURL}/api/auth/feed/deleteuserfeed`,  
        { headers: { Authorization: `${token}`, id: id }})
      if (res.data.success) {
        setloading(false)
        toast({ variant: 'default', description: 'Message Deleted Successfully!'})
        getUserFeeds()
      } else {
        toast({ variant: 'destructive', description: res.data.message })
        setloading(false)
      }
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  } 

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("en-GB", { month: "short" })
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const FRONTENDURL = import.meta.env.VITE_APP_FRONTEND_URL
  const userURL = `${FRONTENDURL}/message/${id}`

  const copyFunction = () => {
    navigator.clipboard.writeText(userURL)
    toast({description: "URL copied!!" })
  }

  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)

  const openFeed = (feed: Feed) => {
    setSelectedFeed(feed)
    document.body.classList.add('no-scroll')
  }

  const closeFeed = () => {
    setSelectedFeed(null)
    document.body.classList.remove('no-scroll')
  }

  const [switchValue, setswitchValue] = useState(true)

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("switchVal: ", switchValue)
    const isChecked = e.target.checked
    setswitchValue(isChecked)
    setloading(true)
    const token = localStorage.getItem('token')
    try {    
      const res = await axios.patch(`${BackEndURL}/api/auth/feed/update`, {accepting: switchValue}, 
        { headers: { Authorization: `${token}`, id: id }})
      if (res.data.success) {
        setloading(false)
        console.log(res.data)
        toast({ variant: 'default', description: 'Message updated Successfully!'})
        getUserFeeds()
      } else {
        toast({ variant: 'destructive', description: res.data.message })
        setloading(false)
      }
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }

  return (
    <>
      {loading && <div className="min-h-[100vh] w-[100vw] overflow-hidden fixed z-10 bg-gray-900 text-white"><Loading/></div>}
    
      <div className="min-h-screen bg-gray-900">
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 opacity-5" style={{backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px"}}></div>
        
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
          <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2 group">
                <MessageSquare className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-2xl font-bold text-white">SILENT SHOUT</span>
              </a>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-800/60 rounded-lg border border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-gray-300">Welcome, <span className="font-semibold text-white">{name || 'User'}</span></span>
                </div>
                
                <Button 
                  onClick={logOut}
                  variant="secondary"
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Dashboard</h1>
            <p className="text-lg text-gray-400">Manage your anonymous feedback and share your unique link</p>
          </div>

          {/* URL Share Card */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <LinkIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Your Unique URL</h2>
                <p className="text-sm text-gray-400">Share this link to receive anonymous feedback</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 px-4 py-3 bg-slate-800/60 rounded-lg border border-slate-700/50 text-blue-300 font-mono text-sm overflow-x-auto whitespace-nowrap">
                {userURL}
              </div>
              <Button
                onClick={copyFunction}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={switchValue}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className={`w-14 h-7 rounded-full transition-all duration-300 ${switchValue ? 'bg-green-500' : 'bg-red-500'} relative shadow-inner`}>
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${switchValue ? 'translate-x-7' : 'translate-x-0'} shadow-md`}></div>
              </div>
              <span className="ml-3 text-gray-200 font-medium">
                Accepting Messages: <span className={`font-bold ${switchValue ? 'text-green-400' : 'text-red-400'}`}>{switchValue ? 'ON' : 'OFF'}</span>
              </span>
            </label>

            {/* Refresh Button */}
            <Button
              onClick={getUserFeeds}
              variant="outline"
              className="bg-slate-700/50 hover:bg-slate-700 border-slate-600 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Messages Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-400" />
              Your Messages
            </h2>
          </div>

          {/* Feedback Grid */}
          {userdata.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-16 h-16 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">No Messages Yet!</h3>
              <p className="text-gray-400 text-lg">Share your link to start receiving anonymous feedback</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userdata.slice().reverse().map((feed: Feed) => (
                <div
                  key={feed.id}
                  className="group relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                  onClick={() => openFeed(feed)}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteFeed(feed.id)
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-all group/delete"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400 transition-colors" />
                    </button>
                  </div>

                  {/* Message Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {feed.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {feed.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                    <span className="text-xs text-gray-500 font-medium">{formatDate(feed.date)}</span>
                    <span className="text-xs text-blue-400 font-medium group-hover:text-blue-300">Click to view →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Modal */}
        {selectedFeed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border-b border-slate-700/50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                        <MessageSquare className="w-8 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{selectedFeed.title}</h2>
                    </div>
                    <span className="text-sm text-gray-400 ml-13">{formatDate(selectedFeed.date)}</span>
                  </div>
                  <button
                    onClick={closeFeed}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-all flex-shrink-0"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              {/* <div className="p-6 overflow-y-auto max-h-[55vh] bg-red-700">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedFeed.description}
                </p>
              </div> */}

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl p-6">
                <div className="flex gap-3 justify-between">
                  <span></span>
                  <div className='flex gap-3'>
                    <Button
                      onClick={() => deleteFeed(selectedFeed.id)}
                      className="flex-1 max-w-fit bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Message
                    </Button>
                    <Button
                      onClick={closeFeed}
                      variant="outline"
                      className="bg-slate-700/50 hover:bg-slate-700 hover:text-white border-slate-600 text-white"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer/>
      </div>
    </>
  )
}

export default Feedbacks