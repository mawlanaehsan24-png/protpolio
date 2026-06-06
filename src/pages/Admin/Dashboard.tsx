import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  LogOut, 
  Settings, 
  Users, 
  FileText,
  Upload,
  X
} from 'lucide-react';
import { PortfolioItem, VideoItem, Category } from '../../types';

export default function Dashboard() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'videos' | 'testimonials' | 'config' | 'admins'>('portfolio');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [admins, setAdmins] = useState<{id: string, email: string}[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [config, setConfig] = useState({
    heroTitle: 'Ehsan Ahmad',
    heroSubtitle: 'Graphic Designer with Video Editor and Teacher.',
    heroImageUrl: '',
    aboutTitle: 'About Me',
    aboutText: 'I am a creative Graphic Designer, skilled Freelancer, and Digital Marketer with a passion for delivering impactful and professional solutions. Alongside my creative and marketing expertise, I also work as an educator, helping students develop practical skills and adapt to modern technologies. I am committed to providing high-quality services in design, branding, and online marketing while continuously learning and sharing knowledge with others. My goal is to combine creativity, strategy, and education to create meaningful value and positive results.',
    aboutImageUrl: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<Category>('Graphic Design');
  const [fileUrl, setFileUrl] = useState('');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/admin');
    if (!loading && user && !isAdmin) {
      toast.error('Unauthorized access');
      navigate('/');
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'portfolio') {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as PortfolioItem));
        setItems(data);
      } else if (activeTab === 'videos') {
        const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as VideoItem));
        setVideoItems(data);
      } else if (activeTab === 'config') {
        const q = collection(db, 'settings');
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data = snap.docs[0].data();
          setConfig(prev => ({ ...prev, ...data }));
        }
      } else if (activeTab === 'admins') {
        const q = collection(db, 'admins');
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, email: d.data().email }));
        setAdmins(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveConfig = async () => {
    try {
      const q = collection(db, 'settings');
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(q, config);
      } else {
        await updateDoc(doc(db, 'settings', snap.docs[0].id), config);
      }
      toast.success('Settings updated');
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: reader.result, folder: activeTab }),
        });
        const data = await res.json();
        if (data.url) {
          setFileUrl(data.url);
          toast.success('File uploaded successfully');
        }
      } catch (err) {
        toast.error('Upload failed');
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) return toast.error('Please upload a file first');

    try {
      if (activeTab === 'portfolio') {
        await addDoc(collection(db, 'portfolio'), {
          title,
          description: desc,
          category,
          imageUrl: fileUrl,
          published,
          createdAt: new Date().toISOString(),
          order: items.length
        });
      } else if (activeTab === 'videos') {
        await addDoc(collection(db, 'videos'), {
          title,
          description: desc,
          category,
          videoUrl: fileUrl,
          published,
          createdAt: new Date().toISOString(),
        });
      }
      toast.success('Item added');
      setIsAdding(false);
      setTitle('');
      setDesc('');
      setFileUrl('');
      fetchData();
    } catch (err) {
      toast.error('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      toast.success('Deleted');
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const togglePublished = async (item: any) => {
    try {
      await updateDoc(doc(db, activeTab, item.id), { published: !item.published });
      toast.success('Visibility updated');
      fetchData();
    } catch (err) {
      toast.error('Failed to update visibility');
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    try {
      await addDoc(collection(db, 'admins'), { email: newAdminEmail });
      toast.success('Admin added');
      setNewAdminEmail('');
      fetchData();
    } catch (err) {
      toast.error('Failed to add admin');
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Remove admin access?')) return;
    try {
      await deleteDoc(doc(db, 'admins', id));
      toast.success('Admin removed');
      fetchData();
    } catch (err) {
      toast.error('Failed to remove admin');
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/admin');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      {/* Top Navbar */}
      <nav className="h-20 bg-surface border-b border-[#5d4037]/10 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold italic tracking-tighter text-[#5d4037] lowercase">Ehsan Ahmad</Link>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'portfolio' ? 'bg-gold text-white' : 'text-[#5d4037]/60 hover:bg-[#5d4037]/5'}`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'videos' ? 'bg-gold text-white' : 'text-[#5d4037]/60 hover:bg-[#5d4037]/5'}`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'testimonials' ? 'bg-gold text-white' : 'text-[#5d4037]/60 hover:bg-[#5d4037]/5'}`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-gold text-white' : 'text-[#5d4037]/60 hover:bg-[#5d4037]/5'}`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'admins' ? 'bg-gold text-white' : 'text-[#5d4037]/60 hover:bg-[#5d4037]/5'}`}
            >
              Admins
            </button>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold capitalize">{activeTab} Management</h1>
            <p className="text-gray-400 text-sm">Manage your website content efficiently.</p>
          </div>
          {activeTab !== 'config' && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 bg-gold text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus size={20} /> Add New {activeTab === 'portfolio' ? 'Project' : 'Video'}
            </button>
          )}
        </div>

        {activeTab === 'config' ? (
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white/80">Home Section</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">Hero Heading</label>
                  <input 
                    value={config.heroTitle} 
                    onChange={e => setConfig({...config, heroTitle: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">Hero Subtitle</label>
                  <textarea 
                    rows={3}
                    value={config.heroSubtitle} 
                    onChange={e => setConfig({...config, heroSubtitle: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold resize-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">Hero Image</label>
                  <div className="flex gap-4 items-center">
                    <img src={config.heroImageUrl} className="w-20 h-20 object-cover rounded-xl border border-white/10" alt="Hero Preview" />
                    <div className="flex-1 relative h-12 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                      <input type="file" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = async () => {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ file: reader.result, folder: 'settings' }),
                            });
                            const data = await res.json();
                            if (data.url) setConfig({...config, heroImageUrl: data.url});
                          };
                        }
                      }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <p className="text-xs text-gray-400">Replace Hero Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white/80">About Section</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">About Heading</label>
                  <input 
                    value={config.aboutTitle} 
                    onChange={e => setConfig({...config, aboutTitle: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">About Bio</label>
                  <textarea 
                    rows={4}
                    value={config.aboutText} 
                    onChange={e => setConfig({...config, aboutText: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold resize-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-white/30 tracking-wider">About Image</label>
                  <div className="flex gap-4 items-center">
                    <img src={config.aboutImageUrl} className="w-20 h-20 object-cover rounded-xl border border-white/10" alt="About Preview" />
                    <div className="flex-1 relative h-12 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                      <input type="file" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = async () => {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ file: reader.result, folder: 'settings' }),
                            });
                            const data = await res.json();
                            if (data.url) setConfig({...config, aboutImageUrl: data.url});
                          };
                        }
                      }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <p className="text-xs text-gray-400">Replace About Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={saveConfig}
              className="px-12 py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-gold/20"
            >
              Publish Changes
            </button>
          </div>
        ) : activeTab === 'admins' ? (
          <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white/80">Authorized Access</h2>
              <form onSubmit={handleAddAdmin} className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="admin@email.com"
                  value={newAdminEmail}
                  onChange={e => setNewAdminEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold"
                  required
                />
                <button type="submit" className="bg-gold text-black px-6 font-bold rounded-xl hover:scale-105 transition-all">Add Admin</button>
              </form>

              <div className="space-y-4">
                {admins.map(admin => (
                  <div key={admin.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 group">
                    <span className="font-medium text-white/80">{admin.email}</span>
                    <button 
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-red-500/30 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/20 italic italic">Owner account (mawlanaehsan24@gmail.com) has permanent fallback access.</p>
          </div>
        ) : (
          /* Dynamic List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {(activeTab === 'portfolio' ? items : videoItems).map((item) => (
              <div key={item.id} className="glass rounded-2xl overflow-hidden group">
                <div className="aspect-video relative">
                  <img 
                    src={(item as PortfolioItem).imageUrl || (item as VideoItem).thumbnailUrl || (item as any).videoUrl} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500 rounded-full text-white">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gold text-xs font-bold uppercase tracking-wider">{item.category}</span>
                    <button 
                      onClick={() => togglePublished(item)}
                      className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${item.published ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                    >
                      {item.published ? 'Public' : 'Private'}
                    </button>
                  </div>
                  <h3 className="font-bold text-lg mt-1 truncate">{item.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal Placeholder */}
        {isAdding && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
            <div className="relative glass w-full max-w-lg rounded-3xl p-8 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Add {activeTab}</h2>
                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold">
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Meta Marketing">Meta Marketing</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="published" 
                    checked={published} 
                    onChange={e => setPublished(e.target.checked)}
                    className="accent-gold w-4 h-4"
                  />
                  <label htmlFor="published" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer">Published / Visible to public</label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload File</label>
                  <div className="relative h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {uploading ? (
                      <p className="text-gold animate-pulse text-sm">Uploading to Cloudinary...</p>
                    ) : fileUrl ? (
                      <p className="text-green-500 text-sm flex items-center gap-2"><ImageIcon size={16}/> File Ready</p>
                    ) : (
                      <>
                        <Upload className="text-gray-500 group-hover:text-gold transition-colors mb-2" />
                        <p className="text-xs text-gray-500">Click or drag & drop</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold resize-none" rows={3} />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !fileUrl}
                  className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-xl disabled:opacity-50"
                >
                  Save Entry
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
