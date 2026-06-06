import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    content: 'Ehsan transformed our brand identity into something truly premium. His attention to detail and creative vision are unmatched.',
  },
  {
    name: 'Michael Chen',
    role: 'YouTube Creator',
    content: 'The video editing work Ehsan does is cinematic and engaging. My subscriber retention significantly improved after hiring him.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Founder, TechStart',
    content: 'Fast, professional, and incredibly creative. Ehsan is my go-to for all complex graphic design and 3D visualization projects.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 overflow-hidden relative bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center lg:text-left">
          <span className="section-title justify-center">Reviews</span>
          <h2 className="text-[56px] leading-[65px] font-bold uppercase tracking-tighter text-center underline" style={{ borderColor: '#0d666c' }}>
            Client <span className="text-gold">Voices.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 bg-bg-dark relative h-full group hover:bg-white/[0.02] transition-colors border border-white/5"
              id={`testimonial-${i}`}
            >
              <Quote className="text-gold/10 absolute top-12 right-12 transition-transform group-hover:scale-110" size={60} />
              <p className="text-white/60 italic mb-12 relative z-10 leading-relaxed text-sm">
                "{t.content}"
              </p>
              <div className="mt-auto border-l-2 border-gold pl-6">
                <p className="font-black text-white tracking-wider uppercase text-xs mb-1">{t.name}</p>
                <p className="text-white/30 text-xs uppercase tracking-wider font-bold">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
