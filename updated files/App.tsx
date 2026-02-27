

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ChevronDown, 
  ChevronRight, 
  Play,
  Download,
  Menu,
  X,
  ArrowRight,
  Globe,
  Quote
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Types ---
type Page = 'home' | 'about' | 'formats' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Advertising Formats', id: 'formats' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 lg:px-20 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-auto max-w-[1600px] flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? 'bg-brand-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 md:px-10 py-3 shadow-2xl' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-white/20 transition-all duration-500">
                <span className="text-black font-bold text-2xl font-display">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tighter text-2xl leading-none font-display">Nawafith</span>
                <span className="text-white/30 text-[9px] uppercase tracking-[0.5em] leading-none font-bold mt-1.5">City Advertising</span>
              </div>
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 p-1.5 glass-card rounded-full border border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative group ${
                  currentPage === item.id ? 'text-white' : 'text-white/30 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.id && (
                  <motion.span 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4 text-[9px] font-bold text-white/30">
              <span className="hover:text-white cursor-pointer transition-colors">AR</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="text-white cursor-pointer flex items-center gap-1.5">
                <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 rounded-sm" />
                EN
              </span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-bold shadow-xl hover:shadow-white/10 transition-all"
            >
              <Phone size={12} fill="currentColor" />
              CALL NOW
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span 
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-brand-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-4xl md:text-6xl font-bold tracking-tighter font-display ${
                    currentPage === item.id ? 'text-white' : 'text-white/20'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-8 mt-12"
              >
                <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-sm font-bold shadow-2xl">
                  <Phone size={18} fill="currentColor" />
                  CALL NOW
                </button>
                <div className="flex items-center gap-6 text-xs font-bold text-white/30">
                  <span className="hover:text-white cursor-pointer">ARABIC</span>
                  <span className="w-px h-4 bg-white/10"></span>
                  <span className="text-white cursor-pointer flex items-center gap-2">
                    <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-5 rounded-sm" />
                    ENGLISH
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="md:col-span-2 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-black font-bold text-3xl font-display">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tighter text-3xl leading-none font-display">Nawafith</span>
                <span className="text-white/30 text-[10px] uppercase tracking-[0.4em] leading-none font-bold mt-2">City Advertising</span>
              </div>
            </div>
            <p className="text-xl text-white/40 leading-relaxed font-light max-w-md">
              Revolutionizing urban advertising through dynamic mobile digital displays. Connecting brands to people, one street at a time.
            </p>
          </div>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i} 
                whileHover={{ y: -5, scale: 1.1 }}
                href="#" 
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/20">Navigation</h4>
          <ul className="space-y-4">
            {['Home', 'About', 'Ad Formats', 'Contact Us'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => setPage(item.toLowerCase().replace(' ', '') as Page)}
                  className="text-white/40 hover:text-white transition-colors text-lg font-light"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/20">Contact</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">Khobar, Saudi Arabia</span>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">Nawafithadvsa@gmail.com</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">+966 --- --- ---</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
          © 2024 Nawafith City Advertising. All rights reserved.
        </p>
        <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
      
      {/* Large Background Text */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-white/[0.02] font-display pointer-events-none whitespace-nowrap select-none">
        NAWAFITH
      </div>
    </footer>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/40 to-brand-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/20 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/seed/city-night/1920/1080?blur=4" 
          alt="City Night" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="section-container relative z-20 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left relative z-20">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                <span className="w-12 h-px bg-white/20"></span>
                <span className="text-xs uppercase tracking-[0.6em] font-bold text-white/40">Established 2024</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-bold leading-[0.8] tracking-tighter text-white font-display"
              >
                Nawafith <br />
                <span className="text-white/20 italic font-serif font-light">Advertising</span>
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Redefining urban visibility through innovative <span className="text-white font-medium">On-Car Advertising</span>. 
                We turn every journey into a powerful brand statement.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center gap-3 group px-10 py-5 text-base"
                >
                  SCHEDULE A CALL
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center justify-center gap-3 px-10 py-5 text-base border-white/10 hover:border-white/40"
                >
                  EXPLORE SOLUTIONS
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Visual Content (Video) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] border border-white/10 aspect-[4/5] lg:aspect-[3/4] bg-brand-gray group">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-long-exposure-4444-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent"></div>
              
              {/* Technical Overlay */}
              <div className="absolute top-6 right-6 font-mono text-[8px] text-white/20 uppercase tracking-tighter">
                LIVE_FEED // 00:42:11
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-5 backdrop-blur-xl bg-white/5 border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-lg">
                    <Play fill="currentColor" size={20} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">Live Campaigns</p>
                    <p className="text-xs text-white/50">Real-time visibility tracking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Accent */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm z-30 hidden md:block">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">Dynamic Displays</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">Real-time Analytics</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20">Geo-Targeting</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const Clients = () => {
  const logos = [
    { name: 'Grid', url: 'https://picsum.photos/seed/logo1/100/40' },
    { name: 'Shodwe', url: 'https://picsum.photos/seed/logo2/100/40' },
    { name: 'Coconut', url: 'https://picsum.photos/seed/logo3/100/40' },
    { name: 'Wave', url: 'https://picsum.photos/seed/logo4/100/40' },
    { name: 'Thunder', url: 'https://picsum.photos/seed/logo5/100/40' },
    { name: 'Grid2', url: 'https://picsum.photos/seed/logo6/100/40' },
    { name: 'Shodwe2', url: 'https://picsum.photos/seed/logo7/100/40' },
    { name: 'Coconut2', url: 'https://picsum.photos/seed/logo8/100/40' },
  ];

  return (
    <section className="py-32 border-y border-white/5 bg-white/[0.01] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/10"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-white/10"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/10"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full space-y-20 relative z-10"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-white/20"></span>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30">Strategic Alliances</span>
            <span className="w-8 h-px bg-white/20"></span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white/60 tracking-tighter font-display">Trusted by Industry Leaders</h3>
        </div>
        <div className="flex w-full overflow-hidden relative">
          <div className="animate-infinite-scroll flex items-center gap-24 md:gap-48 px-4">
            {[...logos, ...logos].map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="h-8 md:h-10 w-auto object-contain opacity-20 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0" 
                  referrerPolicy="no-referrer" 
                />
                <span className="text-[8px] font-mono text-white/0 group-hover:text-white/20 transition-all uppercase tracking-tighter">
                  AUTH // 0x{Math.floor(Math.random() * 1000)}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-brand-black to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-brand-black to-transparent z-10"></div>
        </div>
      </motion.div>
    </section>
  );
};

const Mission = () => {
  return (
    <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="order-2 lg:order-1 relative group"
      >
        <div className="absolute -inset-4 bg-white/[0.02] rounded-[2.5rem] blur-2xl group-hover:bg-white/[0.05] transition-all duration-700"></div>
        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/mission/1000/800" 
            alt="Our Mission" 
            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Technical Data Overlay */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-1 font-mono text-[9px] text-white/40 uppercase tracking-widest">
            <span>COORDINATES: 26.2859° N, 50.2084° E</span>
            <span>SYSTEM STATUS: OPTIMIZED</span>
            <span className="text-white/60">EST. 2024</span>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-10 order-1 lg:order-2"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-white/20"></span>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Mission</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">Pioneering the Future of <span className="italic font-serif font-light text-white/60">Mobile Advertising</span></h2>
        </div>
        <div className="space-y-8 text-white/40 leading-relaxed text-lg font-light">
          <p>
            At <span className="text-white font-medium">Nawafith Advertising</span>, we are revolutionizing outdoor advertising with dynamic, innovative <span className="text-white font-medium">on-car solutions</span>. Our mission is to help businesses connect with their target audiences meaningfully, maximizing visibility and impact on the go.
          </p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-serif italic text-xl text-white/60 border-l-2 border-white/10 pl-6"
          >
            "We believe outdoor advertising should be both impactful and measurable."
          </motion.p>
          <p>
            Through our cutting-edge digital screens, we provide tools for tracking performance and making informed decisions. Our goal is to bring brands closer to people in <span className="text-white font-medium">real-time</span>.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 pt-6 border-t border-white/5">
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">100%</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Coverage Efficiency</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">24/7</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Active Monitoring</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-outline group flex items-center gap-4"
        >
          LEARN MORE
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

const Solutions = () => {
  return (
    <section className="bg-brand-gray py-32 overflow-hidden">
      <div className="section-container space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Solutions</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter font-display leading-[0.9]">Precision Engineered <br /><span className="italic font-serif font-light text-white/60">Advertising</span></h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 max-w-sm text-lg font-light leading-relaxed"
          >
            We combine cutting-edge hardware with sophisticated software to deliver your message exactly where it matters most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 glass-card overflow-hidden group relative"
          >
            <div className="p-12 space-y-8 relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Digital Tops</h3>
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-white transition-all duration-500"
                >
                  <span className="text-2xl font-serif italic">N</span>
                </motion.div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                Digital Tops by Nawafith Advertising are equipped with high-quality motion screens and modern data systems, making advertising campaigns more effective and measurable.
              </p>
              <div className="pt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
                <span>Explore Technology</span>
                <ChevronRight size={12} />
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/digital-top/1200/800" 
                alt="Digital Top" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
            </div>
            {/* Hardware Detail */}
            <div className="absolute top-4 right-4 font-mono text-[8px] text-white/10 uppercase tracking-tighter">
              REF: NWF-101 // V.2.4
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            {[
              { icon: MapPin, title: 'Data-tracked ads', desc: 'Real-time tracking and analytics for every campaign, ensuring you know exactly where and when your brand is seen.' },
              { icon: Globe, title: 'Scalable offerings', desc: 'From single vehicles to entire fleets, our solutions grow with your brand\'s ambitions.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                className="flex-1 glass-card p-10 flex flex-col justify-center space-y-8 group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <item.icon size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Leverage = () => {
  return (
    <section className="section-container space-y-24 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-white/20"></span>
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Strategy</span>
          <span className="w-12 h-px bg-white/20"></span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">How to Leverage <br /> <span className="italic font-serif font-light text-white/60">Nawafith's Advertising</span></h2>
        <p className="text-white/40 max-w-3xl mx-auto text-xl font-light leading-relaxed">
          Nawafith Advertising offers innovative "On-Car" advertising solutions, turning vehicles into mobile billboards with dynamic digital screens.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 space-y-10"
        >
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://picsum.photos/seed/leverage/1200/800" 
              alt="Leverage" 
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
            
            {/* Floating Detail */}
            <div className="absolute top-8 left-8 glass-card px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest">Live Network Active</span>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline group flex items-center gap-4"
          >
            <Download size={18} />
            COMPANY PRESENTATION
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
        <div className="lg:col-span-5 grid grid-cols-1 gap-8">
          {[
            { icon: Play, title: 'Real-time engagement', desc: 'Our screens provide vibrant ads in real-time, ensuring your message reaches the right audience at the right time.' },
            { icon: MapPin, title: 'Strategic placement', desc: 'We position your brand in high-traffic areas, events, or specific neighborhoods to maximize exposure.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="glass-card p-12 space-y-6 group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <item.icon size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ title, subtitle, buttonText }: { title: string, subtitle: string, buttonText: string }) => {
  return (
    <section className="relative py-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://picsum.photos/seed/cta-bg/1920/1080?blur=10" 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black"></div>
      </div>
      <div className="section-container relative z-10 text-center space-y-12">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold max-w-6xl mx-auto leading-[0.85] tracking-tighter font-display"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-4 mx-auto group"
        >
          <Phone size={18} />
          {buttonText}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20 space-y-48">
      <section className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 space-y-12"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Who We Are</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter font-display leading-[0.8]">About <br /><span className="italic font-serif font-light text-white/60">Nawafith</span></h1>
          </div>
          <div className="space-y-8 text-white/40 leading-relaxed text-2xl font-light max-w-3xl">
            <p>
              At Nawafith, we are proud to be a leading advertising company operating in Saudi Arabia, aligning our services with the ambitious goals of <span className="text-white font-medium underline underline-offset-8 decoration-white/10">Vision 2030</span>.
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative p-12 glass-card border border-white/10"
            >
              <Quote className="absolute top-8 left-8 text-white/10" size={48} />
              <p className="font-serif italic text-white/80 text-3xl leading-snug relative z-10">
                "Committed to fostering economic growth and creativity, we partner with brands to create impactful campaigns that resonate across the Kingdom."
              </p>
            </motion.div>
            <p className="text-xl">
              By embracing cutting-edge technology and forward-thinking strategies, we contribute to building a vibrant and diversified economy, supporting the transformation outlined in Vision 2030.
            </p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative group aspect-[3/4]"
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/about-img/1000/1500" 
            alt="About Nawafith" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent"></div>
          
          {/* Vertical Text */}
          <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap">
            <span className="text-[10px] uppercase tracking-[1em] font-bold text-white/20">ESTABLISHED // 2024</span>
          </div>
        </motion.div>
      </section>

      <section className="bg-brand-gray py-48 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-2 lg:order-1 relative group"
          >
            <div className="absolute -inset-10 bg-white/[0.01] rounded-full blur-[120px]"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-video">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                src="https://picsum.photos/seed/mission-2/1200/800" 
                alt="Our Mission" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 space-y-10 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-white/20"></span>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Purpose</span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">Our <br /><span className="italic font-serif font-light text-white/60">Mission</span></h2>
            </div>
            <div className="space-y-8 text-white/40 leading-relaxed text-2xl font-light">
              <p>
                At <span className="text-white font-medium">Nawafith Advertising</span>, our mission is to redefine the advertising landscape by leveraging the power of mobile, <span className="text-white font-medium">on-car marketing solutions</span>.
              </p>
              <p className="text-xl">
                Our purpose is to provide businesses with innovative ways to reach audiences on the move, ensuring their message is seen by a diverse range of consumers in real-time, wherever they are.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-4xl font-bold text-white font-display">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-2">Coverage</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white font-display">24/7</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-2">Visibility</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const FormatsPage = () => {
  const formats = [
    { title: 'Live Update', desc: 'Real-time content changes remotely.', img: 'https://picsum.photos/seed/format1/800/600', size: 'large' },
    { title: 'Static Image', desc: 'High-impact high-resolution visuals.', img: 'https://picsum.photos/seed/format2/600/400', size: 'small' },
    { title: 'Geo-Targeted', desc: 'Location-based ad serving.', img: 'https://picsum.photos/seed/format3/600/400', size: 'small' },
  ];

  return (
    <div className="pt-32 pb-20 space-y-48">
      <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Technology</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-display leading-[0.9]">Digital <br /><span className="italic font-serif font-light text-white/60">Tops</span></h1>
          </div>
          <p className="text-xl text-white/40 leading-relaxed font-light max-w-xl">
            Nawafith Advertising's LED screen advertising format combines cutting-edge technology with mobility, offering businesses an exciting way to engage audiences on the move.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-8 py-5 flex items-center gap-4 border border-white/10"
            >
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">High Definition</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-8 py-5 flex items-center gap-4 border border-white/10"
            >
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Weatherproof</span>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative group"
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/led-top/1000/1200" 
            alt="LED Top" 
            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
        </motion.div>
      </section>

      <section className="bg-brand-gray py-48 overflow-hidden">
        <div className="section-container space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Variety</span>
              <span className="w-12 h-px bg-white/20"></span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">On Car Ad <br /><span className="italic font-serif font-light text-white/60">Formats</span></h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formats.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`glass-card overflow-hidden group relative ${f.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`${f.size === 'large' ? 'h-[600px]' : 'h-80'} overflow-hidden relative`}>
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5 }}
                    src={f.img} 
                    alt={f.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-white/30">0{i + 1}</span>
                    <h3 className="text-3xl font-bold tracking-tight">{f.title}</h3>
                  </div>
                  <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">{f.desc}</p>
                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all pt-4"
                  >
                    View Details <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container space-y-48">
        {[
          { title: 'High-Resolution Display', desc: 'Crisp, bright, and vibrant images and videos, ensuring that your message is seen clearly, day or night.', img: 'https://picsum.photos/seed/feat1/1200/800', tech: '4K // HDR' },
          { title: 'Weatherproof & Durable', desc: 'Designed to withstand the elements, our LED screens are built for all weather conditions, ensuring long-lasting performance.', img: 'https://picsum.photos/seed/feat2/1200/800', reverse: true, tech: 'IP67 // RATED' },
          { title: 'Real-Time Content Updates', desc: 'With the ability to update content remotely, advertisers can tailor their messages to different locations, times of day, or current events.', img: 'https://picsum.photos/seed/feat3/1200/800', tech: 'LTE // SYNC' },
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-24 items-center`}
          >
            <div className={`lg:col-span-5 space-y-8 ${feat.reverse ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-white/20">{feat.tech}</span>
                <span className="w-12 h-px bg-white/10"></span>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter font-display leading-[0.9]">{feat.title}</h3>
              <p className="text-xl text-white/40 leading-relaxed font-light">{feat.desc}</p>
              <div className="w-20 h-1 bg-white/10"></div>
            </div>
            <div className={`lg:col-span-7 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group ${feat.reverse ? 'lg:order-1' : ''}`}>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src={feat.img} 
                alt={feat.title} 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent"></div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

const ContactPage = () => {
  const faqs = [
    { q: 'How do I get started with Nawafith Advertising?', a: 'Getting started with Nawafith Advertising is easy! Simply reach out to our team through our contact page or by phone, and we\'ll schedule an initial consultation. During this consultation, we\'ll discuss your advertising goals, select the best vehicle format (e.g., wraps or LED screens), and tailor a solution that fits your needs.' },
    { q: 'What types of vehicles can be used for advertising?', a: 'We primarily use taxis and private vehicles for our LED top displays and full vehicle wraps.' },
    { q: 'How long does it take to get my vehicle(s) ready for advertising?', a: 'Typically, it takes 3-5 business days for installation once the creative assets are approved.' },
    { q: 'Can I choose the design of the advertisement?', a: 'Yes, you have full creative control, or our design team can help you create a high-impact visual.' },
    { q: 'Do you offer geo-targeted advertising?', a: 'Absolutely! Our digital tops allow for precise location-based ad serving.' },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-20 space-y-48">
      <section className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 space-y-16"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Contact</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-display leading-[0.9]">Get In <br /><span className="italic font-serif font-light text-white/60">Touch</span></h1>
            <p className="text-xl text-white/40 leading-relaxed font-light max-w-xl">
              We're here to help bring your vision to life! Whether you're ready to start your next advertising campaign or just want to learn more.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+123-456-7890', tech: 'EXT // 404' },
              { icon: MapPin, label: 'Visit Us', value: 'Khobar, Saudi Arabia', tech: 'LOC // 26.2172° N' },
              { icon: Mail, label: 'Email Us', value: 'Nawafithadvsa@gmail.com', tech: 'SMTP // SECURE' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">{item.label}</span>
                    <span className="font-mono text-[8px] text-white/10">{item.tech}</span>
                  </div>
                  <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 glass-card p-12 space-y-10 relative"
        >
          <div className="absolute top-8 right-8 font-mono text-[8px] text-white/10 uppercase tracking-tighter">
            FORM_ID // NWF-CONTACT-01
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight font-display">Send a Message</h2>
            <p className="text-white/40 font-light">We'll get back to you within 24 hours.</p>
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/20 ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/20 ml-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/20 ml-1">Subject</label>
              <select className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all text-white/40">
                <option>General Inquiry</option>
                <option>Advertising Campaign</option>
                <option>Partnership</option>
                <option>Technical Support</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/20 ml-1">Your Message</label>
              <textarea placeholder="Tell us about your project..." rows={5} className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full py-5 flex items-center justify-center gap-3"
            >
              SEND MESSAGE
              <ChevronRight size={18} />
            </motion.button>
          </form>
        </motion.div>
      </section>

      <section className="section-container space-y-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Support</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display">Getting Started FAQ</h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {faqs.slice(0, 3).map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left font-bold transition-all"
                >
                  <div className="flex items-center gap-6">
                    <motion.div 
                      animate={{ rotate: openFaq === i ? 90 : 0 }}
                      className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-white text-black' : 'group-hover:border-white/30'}`}
                    >
                      {openFaq === i ? <X size={14} /> : <ChevronRight size={14} />}
                    </motion.div>
                    <span className="text-lg tracking-tight">{faq.q}</span>
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-20 pb-8 text-white/40 text-base leading-relaxed font-light"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="space-y-4">
            {faqs.slice(3).map((faq, i) => {
              const idx = i + 3;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group"
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-8 text-left font-bold transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <motion.div 
                        animate={{ rotate: openFaq === idx ? 90 : 0 }}
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${openFaq === idx ? 'bg-white text-black' : 'group-hover:border-white/30'}`}
                      >
                        {openFaq === idx ? <X size={14} /> : <ChevronRight size={14} />}
                      </motion.div>
                      <span className="text-lg tracking-tight">{faq.q}</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-20 pb-8 text-white/40 text-base leading-relaxed font-light"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col relative bg-brand-black text-white font-sans selection:bg-white selection:text-black">
      <div className="noise-overlay fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay"></div>
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Clients />
              <Mission />
              <CTA 
                title="Ready to Boost Your Brand Visibility?" 
                subtitle="Schedule a free call today to explore how Nawafith can drive your brand forward."
                buttonText="SCHEDULE A CALL"
              />
              <Solutions />
              <Leverage />
              <CTA 
                title="Ready to Elevate Your Advertising?" 
                subtitle="Partner with Nawafith today and take your brand to the next level."
                buttonText="EXPLORE SOLUTIONS"
              />
              <div className="section-container">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 1.5 }}
                    src="https://picsum.photos/seed/footer-taxi/1200/600" 
                    alt="Taxis" 
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          )}

          {page === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutPage />
            </motion.div>
          )}

          {page === 'formats' && (
            <motion.div
              key="formats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FormatsPage />
            </motion.div>
          )}

          {page === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />

      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center shadow-xl z-40 hover:scale-110 transition-transform"
      >
        <ChevronDown className="rotate-180" />
      </button>
    </div>
  );
}
