import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Shield, Clock, MapPin, Globe, Lock, Star, Zap, ChevronDown, Send, Phone, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
    toast.success('Transmission received!', {
      style: {
        background: '#111',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
  };

  const contactInfo = [
    { icon: Clock, label: 'RESPONSE TIME', value: 'Within 24 hours', color: 'bg-indigo-500/10 text-indigo-400' },
    { icon: MapPin, label: 'BASED IN', value: 'Dhaka, Bangladesh', color: 'bg-rose-500/10 text-rose-400' },
    { icon: Globe, label: 'AVAILABLE FOR', value: 'Remote clients worldwide', color: 'bg-emerald-500/10 text-emerald-400' },
  ];

  const socialLinks = [
    { name: 'Email', icon: Mail, href: '#' },
    { name: 'WhatsApp', icon: Phone, href: '#' },
    { name: 'LinkedIn', icon: Shield, href: '#' },
  ];

  return (
    <section id="contact" className="py-32 bg-dark relative overflow-hidden text-white">
      <div className="absolute inset-0 noise opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-5 pt-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="section-tag" style={{ fontSize: '29px', fontWeight: 'bold', textDecorationLine: 'none', lineHeight: '29px' }}>
                Contact
              </div>

              <h2 className="text-[39px] leading-[49.8px] font-black mb-10 tracking-tighter uppercase font-accent">
                Let's Start <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Innovating.
                </span>
              </h2>

              <p className="text-white/40 text-xl font-medium leading-relaxed mb-16 max-w-sm">
                Have a project or vision? Let's transform it into a digital reality. I respond within 24 hours.
              </p>

              <div className="space-y-8 mb-16">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                      <info.icon size={24} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">{info.label}</p>
                      <p className="text-lg font-bold text-white/80">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/30 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
                    title={link.name}
                  >
                    <link.icon size={20} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 backdrop-blur-3xl border border-blue-100 rounded-[3.5rem] p-10 md:p-16 shadow-2xl shadow-blue-500/5 relative overflow-hidden text-slate-900"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-black tracking-[0.5em] uppercase text-blue-900/40 font-accent">Drop a direct message</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/30">Your Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="What should I call you?"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 text-sm font-bold outline-none focus:border-blue-500/50 focus:bg-white transition-all placeholder:text-slate-300 text-slate-800"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/30">Your Gmail</label>
                        <input 
                          required
                          type="email" 
                          placeholder="your@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 text-sm font-bold outline-none focus:border-blue-500/50 focus:bg-white transition-all placeholder:text-slate-300 text-slate-800"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/30">Comment</label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="I'm all ears..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] px-8 py-6 text-sm font-bold outline-none focus:border-blue-500/50 focus:bg-white resize-none transition-all placeholder:text-slate-300 text-slate-800 leading-relaxed"
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl py-6 flex items-center justify-center gap-4 group mt-6 transition-colors shadow-lg shadow-blue-600/20"
                      >
                        {loading ? 'Transmitting...' : (
                          <>
                            <span className="uppercase tracking-widest text-[11px] font-black italic">Send Message</span>
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                      <Send size={40} className="text-white" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-6 font-accent">Success!</h3>
                    <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                      Your transmission has been logged. Expect a response in the next light cycle.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-8 pt-12 mt-12 border-t border-slate-100 opacity-60">
                <div className="flex items-center gap-2">
                  <Shield size={12} className="text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-none">Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-none">Instant Queue</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
