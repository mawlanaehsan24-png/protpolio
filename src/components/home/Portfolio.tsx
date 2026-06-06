import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Play, Grid, Palette, Video, Megaphone, MoreHorizontal } from 'lucide-react';
import { Category } from '../../types';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const categoryConfig = [
  { 
    id: 'All', 
    icon: Grid, 
    color: 'primary', 
    hex: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'Graphic Design', 
    icon: Palette, 
    color: 'rose-500', 
    hex: '#F43F5E',
    image: 'https://i.postimg.cc/D8YGHBFG/parfume.png'
  },
  { 
    id: 'Video Editing', 
    icon: Video, 
    color: 'cyan-500', 
    hex: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'Meta Marketing', 
    icon: Megaphone, 
    color: 'emerald-500', 
    hex: '#10B981',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'Others', 
    icon: MoreHorizontal, 
    color: 'amber-500', 
    hex: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800'
  },
];

const categories: Category[] = ['All', 'Graphic Design', 'Video Editing', 'Meta Marketing', 'Others'];

const tools = [
  { name: 'Photoshop', icon: 'Ps', color: '#31A8FF' },
  { name: 'Illustrator', icon: 'Ai', color: '#FF9A00' },
  { name: 'Premiere Pro', icon: 'Pr', color: '#9999FF' },
  { name: 'After Effects', icon: 'Ae', color: '#CF96FD' },
  { name: 'CapCut', icon: 'Cc', color: '#FFFFFF' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const pQuery = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const vQuery = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
        
        const [pSnap, vSnap] = await Promise.all([getDocs(pQuery), getDocs(vQuery)]);
        
        const pData = pSnap.docs.map(d => ({ id: d.id, ...d.data(), dataType: 'image' } as any));
        const vData = vSnap.docs.map(d => ({ id: d.id, ...d.data(), dataType: 'video' } as any));
        
        const combined = [...pData, ...vData]
          .filter(item => item.published !== false)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
        setItems(combined);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = items.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  useEffect(() => {
    setCenterIndex(0);
  }, [activeCategory]);

  const handlePrev = () => setCenterIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  const handleNext = () => setCenterIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));

  return (
    <section id="work" className="py-32 bg-dark overflow-hidden relative selection:bg-primary selection:text-white">
      <div className="absolute inset-0 noise opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col gap-16">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-black text-white leading-[0.8] tracking-tighter uppercase font-accent"
            >
              My <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Work.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoryConfig.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`flex flex-col items-center justify-center gap-6 p-8 rounded-[3rem] transition-all duration-700 group border-2 relative overflow-hidden ${
                  activeCategory === cat.id
                    ? 'bg-surface border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.5)] text-white'
                    : 'bg-white/2 border-white/5 text-white/30 hover:bg-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={cat.image} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-dark/60" />
                </div>

                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 relative z-10 ${
                  activeCategory === cat.id 
                    ? 'bg-primary/20 text-primary shadow-[0_0_40px_rgba(124,58,237,0.2)]' 
                    : 'bg-white/5 group-hover:bg-white/10 group-hover:translate-y-[-5px]'
                }`}>
                  <cat.icon size={32} strokeWidth={1} style={{ 
                    color: activeCategory === cat.id ? cat.hex : 'currentColor' 
                  }} />
                </div>

                <div className="text-center space-y-1 relative z-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${
                    activeCategory === cat.id ? 'text-white' : 'text-white/20 group-hover:text-white/60'
                  }`}>
                    {cat.id}
                  </span>
                </div>
                
                {/* Active Indicator Line */}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="category-active"
                    className="absolute inset-x-0 bottom-0 h-1 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Grid Layout instead of Carousel for high-end feel */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group relative aspect-[16/10] bg-surface rounded-[2rem] overflow-hidden border border-white/5 digital-glow hover:border-primary/50 transition-all duration-700"
            >
              <img 
                src={item.imageUrl || item.thumbnailUrl || item.videoUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt={item.title}
              />
              
              {/* Overlay with high-end glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                 <div className="flex items-center justify-between gap-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2 block">{item.category}</span>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tight">{item.title}</h3>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl"
                    >
                      {item.dataType === 'video' ? <Play size={24} fill="white" /> : <ExternalLink size={24} />}
                    </motion.div>
                 </div>
              </div>

              {/* Minimal Tag */}
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-dark/40 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/60">
                 {item.dataType === 'video' ? 'Production' : 'Concept'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Toolkit - Redesigned */}
      <div className="max-w-7xl mx-auto px-6 mt-48 mb-32 relative z-10">
        <center>
          <div className="mb-20">
             <div className="section-tag justify-center">Toolkit</div>
             <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Tools I <span className="text-accent underline decoration-primary/50 underline-offset-8">Use.</span></h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
             {tools.map((tool) => (
               <motion.div
                 key={tool.name}
                 whileHover={{ y: -10 }}
                 className="flex flex-col items-center gap-4 group"
               >
                 <div 
                   className="w-20 h-20 md:w-28 md:h-28 bg-surface rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                 >
                   <span className="text-3xl md:text-5xl font-black tracking-tighter transition-transform duration-500 group-hover:scale-110" style={{ color: tool.color }}>
                     {tool.icon}
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-primary transition-all duration-500">
                   {tool.name}
                 </span>
               </motion.div>
             ))}
          </div>
        </center>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
