import { Palette, Video, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    id: '01',
    category: 'Design',
    title: 'Graphic Design',
    desc: 'Your brand deserves to turn heads. We craft visuals that stop the scroll and leave a lasting impression.',
    icon: Palette,
    features: ['Brand identity & logo', 'Social media graphics', 'Poster & banner design']
  },
  {
    id: '02',
    category: 'Video',
    title: 'Video Editing',
    desc: 'In a world of noise, great video speaks volumes. We edit stories that hook, hold, and convert viewers into fans.',
    icon: Video,
    features: ['Reels & short-form content', 'YouTube video editing', 'Motion graphics & VFX']
  },
  {
    id: '03',
    category: 'Growth',
    title: 'Meta Marketing',
    desc: 'Every taka you spend should work harder. We run data-driven Meta ads that attract the right people and grow your business.',
    icon: TrendingUp,
    features: ['Facebook & Instagram Ads', 'Audience research & targeting', 'Campaign optimization']
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-dark relative overflow-hidden text-white">
      <div className="absolute inset-0 noise opacity-[0.05] pointer-events-none" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#7C3AED]">What We Do Best</span>
          </motion.div>
          
          <h2 
            className="font-accent tracking-tighter no-underline mb-8"
            style={{ 
              textAlign: 'center', 
              fontSize: '37px', 
              lineHeight: '36.8px', 
              fontStyle: 'normal', 
              fontWeight: 'normal' 
            }}
          >
            We don't just create. <br />
            <span className="bg-gradient-to-r from-[#818CF8] via-[#2DD4BF] to-[#2DD4BF] bg-clip-text text-transparent italic">We make you unforgettable.</span>
          </h2>
          
          <p className="max-w-2xl text-white/40 text-lg leading-relaxed font-medium">
            From bold visuals to scroll-stopping reels to ads that actually convert — we handle it all, so you can focus on growing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`group p-10 bg-[#0F111A]/80 backdrop-blur-3xl rounded-[2.5rem] border ${i === 1 ? 'border-primary/40' : 'border-white/5'} hover:border-primary/50 transition-all duration-700 flex flex-col shadow-2xl relative overflow-hidden`}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[12px] font-bold text-primary">{service.id} — {service.category}</span>
              </div>

              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 mb-8">
                <service.icon size={28} className="text-white/80" />
              </div>

              <h3 className="text-3xl font-black mb-6 text-white tracking-tight leading-none">{service.title}</h3>
              
              <p className="text-sm text-white/40 leading-relaxed font-medium mb-10 min-h-[60px]">
                {service.desc}
              </p>

              <div className="space-y-4 mb-10">
                {service.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-[13px] font-medium text-white/40">
                    <Check size={16} className="text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              {i === 1 && (
                <button className="mt-auto w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  Start creating
                  <ArrowRight size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
