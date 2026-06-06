import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Youtube, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ];

  return (
    <footer className="bg-dark pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link to="/" className="text-4xl font-black tracking-tighter flex items-center gap-2 mb-8 font-accent uppercase">
              <span className="text-white">Ehsan</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Ahmad.</span>
            </Link>
            <p className="text-white/40 max-w-sm mb-10 leading-relaxed text-lg font-medium">
              Creating digital excellence through superior design, cinematic motion, and high-performance strategy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Me', href: '#about' },
                { name: 'Portfolio', href: '#work' },
                { name: 'Services', href: '#services' }
              ].map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-white transition-colors font-medium flex items-center gap-2 group">
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">Connect</h4>
            <ul className="space-y-6">
              <li>
                <a href="mailto:mawlanaehsan24@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors border border-white/5">
                    <Mail size={16} />
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors font-medium">mawlanaehsan24@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:01887090916" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors border border-white/5">
                    <Phone size={16} />
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors font-medium">01887090916</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            © {currentYear} EH — BUILT FOR EXCELLENCE
          </p>
          <div className="flex items-center gap-8 text-white/20 text-xs font-bold uppercase tracking-widest">
             <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
             <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
