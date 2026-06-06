import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutText: string;
  aboutImageUrl: string;
}

const defaultSettings: SiteSettings = {
  heroTitle: 'Ehsan Ahmad',
  heroSubtitle: 'Graphic Designer with Video Editor and Teacher.',
  heroImageUrl: 'https://i.postimg.cc/QVLR6MZj/Whats-App-Image-2026-04-24-at-11-23-48-AM.jpg',
  aboutTitle: 'About Me',
  aboutText: 'I am a creative Graphic Designer, skilled Freelancer, and Digital Marketer with a passion for delivering impactful and professional solutions. Alongside my creative and marketing expertise, I also work as an educator, helping students develop practical skills and adapt to modern technologies. I am committed to providing high-quality services in design, branding, and online marketing while continuously learning and sharing knowledge with others. My goal is to combine creativity, strategy, and education to create meaningful value and positive results.',
  aboutImageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1200'
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const q = collection(db, 'settings');
        const snap = await getDocs(q);
        if (!snap.empty) {
          setSettings(prev => ({ ...prev, ...snap.docs[0].data() }));
        }
      } catch (e) {
        console.error('Error fetching settings:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
