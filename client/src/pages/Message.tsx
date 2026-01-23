import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Message = () => {
  const { id } = useParams();
  const BackEndURL = import.meta.env.VITE_APP_BACKEND_URL;
  const { toast } = useToast();
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const sendMessage = async () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter a message before sending",
      });
      return;
    }

    setloading(true);
    try {
      const res = await axios.post(
        `${BackEndURL}/api/auth/user/addfeed/${id}`,
        { title: title }
      );
      toast({ description: res.data.message });
      setloading(false);
      settitle("");
    } catch (error) {
      settitle("");
      toast({
        variant: "destructive",
        description: "Error Occure! Please try again",
      });
      console.log("Something went wrong. Error: ", error);
      setloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {loading && (
        <div className="min-h-screen w-screen fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <Loading />
        </div>
      )}

      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="pt-12 pb-8 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-purple-300">
                  100% Anonymous
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Share Your Thoughts
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Your identity is completely hidden. Express yourself freely.
              </p>
            </div>
          </div>

          {/* Message Input Section */}
          <div className="flex-1 flex items-center justify-center px-6 pb-12">
            <div className="w-full max-w-3xl">
              <div
                className={`relative transition-all duration-300 ${
                  isFocused ? "scale-[1.02]" : "scale-100"
                }`}
              >
                {/* Glow effect when focused */}
                {isFocused && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-10 animate-pulse" />
                )}

                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                  {/* Sparkle decoration */}
                  <div className="absolute -top-3 -right-3">
                    <svg className="w-6 h-6 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <textarea
                        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-6 py-4 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none min-h-[120px]"
                        value={title}
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your anonymous message here..."
                        maxLength={500}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {title.length}/500
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50"
                      type="submit"
                      onClick={sendMessage}
                      disabled={loading}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Anonymous Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Your Identity is Protected
                      </h3>
                      <p className="text-sm text-gray-400">
                        No login required. Completely anonymous messaging.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Be Respectful
                      </h3>
                      <p className="text-sm text-gray-400">
                        Kindness goes a long way. Share constructive thoughts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="py-8 px-6 border-t border-slate-700/30 bg-slate-900/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-lg">
                  Want to receive anonymous feedback too?
                </span>
                <span className="font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-2">
                  Join Silent-Shout
                  <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;