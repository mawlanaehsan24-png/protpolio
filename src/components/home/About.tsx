import { motion } from 'motion/react';
import { useSettings } from '../../lib/useSettings';

export default function About() {
  const { settings } = useSettings();

  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-surface/50 backdrop-blur-3xl p-10 lg:p-16 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center text-center digital-glow"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-primary to-secondary mb-10" 
            />
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white mb-10 leading-[1] font-accent">
              About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Me.</span>
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-8 text-white/50 leading-relaxed text-lg lg:text-xl font-medium tracking-tight">
              <p>
                {settings.aboutText || "I am a creative Graphic Designer, skilled Freelancer, and Digital Marketer with a passion for delivering impactful and professional solutions. Alongside my creative and marketing expertise, I also work as an educator, helping students develop practical skills and adapt to modern technologies. I am committed to providing high-quality services in design, branding, and online marketing while continuously learning and sharing knowledge with others. My goal is to combine creativity, strategy, and education to create meaningful value and positive results."}
              </p>
            </div>

          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6">Expertise</p>
              <p className="text-xl font-bold text-white uppercase tracking-tighter leading-none">Creative Digital Strategy</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6">Execution</p>
              <p className="text-xl font-bold text-white uppercase tracking-tighter leading-none">Superior Motion Design</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6">Vision</p>
              <p className="text-xl font-bold text-white uppercase tracking-tighter leading-none">Minimal Powerful UX</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
