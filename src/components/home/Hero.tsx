import { motion } from 'motion/react';
import { ArrowRight, Play, User, Briefcase, TrendingUp } from 'lucide-react';
import { useSettings } from '../../lib/useSettings';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-[110vh] flex flex-col pt-24 bg-dark selection:bg-primary selection:text-white overflow-hidden text-white">
      {/* Cinematic Grain & Overlays */}
      <div className="absolute inset-0 noise opacity-[0.1] pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark pointer-events-none z-10" />
      
      {/* Moving Digital Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-primary/30 blur-[180px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-secondary/20 blur-[150px] rounded-full pointer-events-none" 
      />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "fit-content", opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full mb-10 overflow-hidden backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/90 whitespace-nowrap">Digital Innovation Hub</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[0.9] font-accent tracking-tighter uppercase max-w-xl mx-auto lg:mx-0">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="block text-white"
                style={{ 
                  width: '498px', 
                  height: '116px', 
                  fontSize: '75px', 
                  marginLeft: '47px', 
                  marginTop: '24px', 
                  borderColor: '#08d1eb', 
                  fontWeight: 'bold', 
                  lineHeight: '120px', 
                  paddingLeft: '5px', 
                  paddingTop: '-7px', 
                  paddingRight: '4px', 
                  marginRight: '27px', 
                  marginBottom: '9px', 
                  fontFamily: 'Courier New' 
                }}
              >
                Ehsan Ahmad
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                style={{ borderColor: '#000000', fontSize: '30px', lineHeight: '52px', textAlign: 'center' }}
              >
                Portfolio.
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
              style={{ fontSize: '15px' }}
            >
              Graphic Designer | Video Editor | Meta Marketer | Educator — Creating impactful designs, engaging content, and helping others grow through creativity and learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <a 
                href="#work"
                className="premium-button flex items-center gap-4 group"
              >
                My Work 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 rounded-[4rem] overflow-hidden border border-white/10 group bg-surface digital-glow">
              <img 
                src={settings.heroImageUrl || "https://i.postimg.cc/QVLR6MZj/Whats-App-Image-2026-04-24-at-11-23-48-AM.jpg"} 
                alt={settings.heroTitle || "Ehsan Ahmad"}
                className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80" />
            </div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-5 px-6 py-4 bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-[10px] font-black tracking-widest uppercase">Live Editing</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-5 -left-10 px-8 py-6 bg-primary/10 backdrop-blur-2xl rounded-[2.5rem] border border-primary/20 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black">4.2x</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Growth ROI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>


    </section>
  );
}
