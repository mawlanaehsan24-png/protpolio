import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Briefcase, User, Mail, Shield, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Works', href: '#portfolio', icon: Briefcase },
    { name: 'About', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Mail },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-8 lg:px-16 z-50 transition-all duration-500 bg-dark/20 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-16">
          <Link to="/" className="flex flex-col leading-[0.7] group">
            <span className="text-2xl font-black uppercase tracking-tighter text-white">Ehsan</span>
            <span className="text-2xl font-black uppercase tracking-tighter text-secondary">Ahmad</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.5em] font-black text-white/40">
            {['Services', 'Journey', 'Work', 'About'].map(item => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-accent transition-all duration-500 relative group overflow-hidden"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center px-10 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
          >
            Start Project
          </motion.a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 group border border-white/5"
          >
            {isOpen ? (
              <X size={20} className="text-accent" />
            ) : (
              <Menu size={20} className="text-white group-hover:text-accent transition-colors" />
            )}
          </button>
        </div>
      </header>

      {/* Facebook-style Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/5 z-[45]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="fixed top-28 right-8 lg:right-16 w-80 bg-surface rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/10 z-50 overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-6 py-8 flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 px-4 mb-6">Digital Experience</p>
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-5 p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 border border-white/5 group-hover:border-primary/50">
                      <item.icon size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-white/80 text-sm uppercase tracking-widest group-hover:text-white">{item.name}</span>
                      <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest group-hover:text-white/40 transition-colors">Go to section</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="px-10 py-8 bg-white/[0.02] border-t border-white/5">
                <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest text-center font-black">
                  Innovating the art of <br /> 
                  <span className="text-accent">Digital Branding</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
