import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Trophy, Target, Activity, Shield } from 'lucide-react';

export default function CareerJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const milestones = [
    { year: '2018', title: 'The Genesis', desc: 'Starting the journey in creative design, mastering the foundations of visual communication.', icon: Activity },
    { year: '2020', title: 'Digital Motion', desc: 'Expanding into high-end video editing and motion graphics for global brands.', icon: Target },
    { year: '2023', title: 'Strategic Growth', desc: 'Pivoting to Meta performance marketing and data-driven digital strategies.', icon: Shield },
    { year: '2026', title: 'Professional Impact', desc: 'Leading creative innovation and educating the next generation of digital artists.', icon: Trophy },
  ];

  return (
    <section ref={containerRef} id="journey" className="relative py-32 bg-dark overflow-hidden selection:bg-primary selection:text-white">
      {/* Muted Atmospheric Background with Digital Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        
        {/* Animated Digital Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestones.map((ms, i) => (
            <motion.div
              key={ms.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative group p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-700"
            >
              <div className="mb-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary transition-all duration-700 digital-glow">
                <ms.icon size={28} strokeWidth={1} className="text-primary group-hover:text-white transition-colors" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <p className="text-4xl font-black text-white group-hover:text-primary transition-colors">{ms.year}</p>
                <div className="flex-1 h-px bg-white/10 group-hover:bg-primary/50 transition-all duration-700" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight group-hover:text-accent transition-colors">{ms.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium">
                {ms.desc}
              </p>

              {/* Hover Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative Large Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.01] whitespace-nowrap pointer-events-none select-none uppercase leading-none font-accent tracking-[-0.05em]">
        Innovation
      </div>
    </section>
  );
}
