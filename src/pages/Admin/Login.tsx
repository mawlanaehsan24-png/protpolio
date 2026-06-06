import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome back, Admin');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error('Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col lg:flex-row p-4 lg:p-0">
      {/* Left Panel: Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface items-center justify-center p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="text-4xl font-extrabold text-[#5d4037] lowercase mb-12 block italic">Ehsan Ahmad</Link>
          <div className="w-20 h-1 bg-gold mb-12" />
          <h2 className="text-5xl font-display font-bold text-[#5d4037] mb-8 leading-tight uppercase">Admin Management Console</h2>
          <p className="text-gold-dark/60 text-lg leading-relaxed mb-12 font-medium">
            Welcome to your professional control center. Manage your projects, update your portfolio, and track engagements seamlessly.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center border border-[#5d4037]/10">
                <ShieldCheck className="text-[#5d4037]" />
              </div>
              <span className="text-[#5d4037] font-bold uppercase tracking-widest text-xs">Secure Access</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center border border-[#5d4037]/10">
                <LogIn className="text-[#5d4037]" />
              </div>
              <span className="text-[#5d4037] font-bold uppercase tracking-widest text-xs">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center bg-bg-dark py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-md p-10 rounded-[40px] border border-[#5d4037]/10 shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
              <Lock className="text-gold" size={32} />
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-center mb-2 text-[#5d4037]">Login to <span className="text-gold">Dashboard</span></h1>
          <p className="text-gold-dark/40 text-center mb-10 font-bold uppercase tracking-tighter text-xs">A-H-M-A-D Portfolio Control</p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 mb-8 bg-white border border-[#5d4037]/10 text-[#5d4037] font-black uppercase tracking-widest rounded-2xl hover:bg-gold/10 transition-all flex items-center justify-center gap-4 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#5d4037]/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#f0e6d2] px-4 text-gold-dark/40 font-bold">Or use email</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gold-dark/40 uppercase tracking-widest">Email Address</label>
              <input
                required
                type="email"
                className="w-full bg-white/20 border border-[#5d4037]/10 rounded-2xl px-4 py-4 focus:border-gold outline-none text-[#5d4037] placeholder-[#5d4037]/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gold-dark/40 uppercase tracking-widest">Password</label>
              <input
                required
                type="password"
                className="w-full bg-white/20 border border-[#5d4037]/10 rounded-2xl px-4 py-4 focus:border-gold outline-none text-[#5d4037]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-5 bg-[#5d4037] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#3d2b1f] transition-all disabled:opacity-50 shadow-xl"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-8 text-xs text-[#5d4037]/40 hover:text-gold transition-colors font-bold uppercase tracking-widest"
          >
            Return to Website
          </button>
        </motion.div>
      </div>
    </div>
  );
}
