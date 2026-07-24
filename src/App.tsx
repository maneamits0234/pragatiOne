import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Phone, MessageCircle, ChevronDown, ChevronRight, Star,
  Globe, TrendingUp, Megaphone, Search, Target, Share2, Palette,
  Bot, Users, Zap, ArrowRight, MapPin, Mail,
  Clock, Award, Shield, Lightbulb, BarChart3, Rocket, Building2,
  ShoppingBag, Utensils, GraduationCap, Heart, Car, Leaf, Plane,
  DollarSign, Factory, Home, ChevronUp, Quote, Send
} from 'lucide-react'

// ─── Scroll Reveal Hook ────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}

// ─── Counter Hook ──────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

// ─── Navbar ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['Home', 'Services', 'Industries', 'Results', 'About', 'Blog', 'Contact']

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,35,66,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(10,35,66,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #0A2342, #1a4a8a)' }}
          >P</div>
          <div>
            <div
              className="font-bold text-xl leading-none"
              style={{ fontFamily: 'Poppins, sans-serif', color: scrolled ? '#0A2342' : 'white' }}
            >PragatiOne</div>
            <div
              className="text-xs leading-none mt-0.5"
              style={{ color: scrolled ? '#64748B' : 'rgba(255,255,255,0.7)' }}
            >Digital Growth Agency</div>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l === 'Results' ? 'results' : l)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: scrolled ? '#1E293B' : 'rgba(255,255,255,0.9)',
                }}
              >{l}</button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+7709630163"
            className="flex items-center gap-2 text-sm font-semibold transition-all"
            style={{ color: scrolled ? '#0A2342' : 'white', fontFamily: 'Inter' }}
          >
            <Phone size={16} />
          </a>
          <a
            href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20to%20book%20a%20free%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2.5"
          >Book Free Consultation</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg"
          style={{ color: scrolled ? '#0A2342' : 'white' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="lg:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: open ? '600px' : '0',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l === 'Results' ? 'results' : l)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >{l}</button>
          ))}
          <div className="mt-2 flex gap-3">
            <a
              href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20to%20book%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-sm py-3 flex items-center justify-center"
            >Book Free Consultation</a>
            <a
              href="https://wa.me/7709630163"
              className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
              style={{ background: '#25D366', color: 'white' }}
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero Section ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2342 0%, #0d2d58 40%, #112f5e 60%, #0A2342 100%)' }}
    >
      {/* Mesh background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, #1a4a8a 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #E63946 0%, transparent 40%),
            radial-gradient(ellipse at 60% 80%, #1e3a6e 0%, transparent 50%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating elements */}
      <div className="absolute top-32 right-[8%] animate-float hidden xl:block">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white text-xs font-medium">Monthly Revenue</div>
            <div className="text-green-400 font-bold text-sm">+247% Growth</div>
          </div>
        </div>
      </div>

      <div className="absolute top-64 right-[12%] animate-float2 hidden xl:block" style={{ animationDelay: '1s' }}>
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
            <Users size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white text-xs">New Leads Today</div>
            <div className="text-blue-300 font-bold text-sm">+38 Leads</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-[6%] animate-float hidden xl:block" style={{ animationDelay: '2s' }}>
        <div className="glass rounded-2xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E63946' }}>
            <Star size={16} className="text-white" fill="white" />
          </div>
          <div>
            <div className="text-white text-xs">Google Rating</div>
            <div className="text-yellow-400 font-bold text-sm">★★★★★ 5.0</div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* Marathi subheading */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            style={{ background: 'rgba(230,57,70,0.15)', border: '1px solid rgba(230,57,70,0.3)' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300 font-medium">व्यवसाय वाढवायचा आहे? योग्य रणनीतीने सुरुवात करा.</span>
          </div>

          <h1
            className="text-white leading-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900 }}
          >
            Grow Business.<br />
            Increase Profit.<br />
            <span className="gradient-text">Build Brand.</span><br />
            Scale Faster.
          </h1>

          <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-xl">
            We help businesses grow through Digital Marketing, Branding, Websites, AI Automation and Business Strategy.
            <span className="block mt-2 text-blue-200 text-base">तुमचा व्यवसाय पुढच्या स्तरावर घेऊन जा.</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20to%20book%20a%20free%20strategy%20call."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              <Phone size={18} /> Book Free Strategy Call
            </a>
            <a
              href="https://wa.me/7709630163"
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all"
              style={{ background: '#25D366', color: 'white', fontFamily: 'Poppins' }}
            >
              <MessageCircle size={18} /> WhatsApp Now
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            {[
              { n: '100+', label: 'Businesses' },
              { n: '5★', label: 'Google Rating' },
              { n: '₹10Cr+', label: 'Revenue Generated' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins' }}>{s.n}</div>
                <div className="text-blue-300 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: 480 }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format"
              alt="Business growth and digital marketing team"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85) saturate(1.1)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,35,66,0.6) 0%, transparent 50%)' }}
            />
            {/* Graph overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass rounded-2xl p-4">
                <div className="text-white text-sm font-semibold mb-3">Business Growth After PragatiOne</div>
                <div className="flex items-end gap-1.5 h-16">
                  {[30, 45, 38, 60, 52, 72, 68, 88, 82, 96, 90, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: `${h}%`,
                        background: i >= 6
                          ? 'linear-gradient(to top, #E63946, #ff6b7a)'
                          : 'rgba(255,255,255,0.25)',
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-blue-200 text-xs">
                  <span>Before PragatiOne</span>
                  <span className="text-green-400 font-semibold">↑ 247% After</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-blue-300 text-xs">Scroll to explore</span>
        <ChevronDown size={20} className="text-blue-300" />
      </div>
    </section>
  )
}

// ─── Stats Strip ───────────────────────────────────────────────────────
function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const c1 = useCounter(500, 2000, started)
  const c2 = useCounter(100, 2000, started)
  const c3 = useCounter(10, 2000, started)
  const c4 = useCounter(100, 2000, started)

  const stats = [
    { val: c1, suffix: '+', label: 'Projects Completed', icon: <Rocket size={24} /> },
    { val: c2, suffix: '+', label: 'Happy Clients', icon: <Users size={24} /> },
    { val: c3, suffix: 'M+', label: 'Total Reach', icon: <Globe size={24} /> },
    { val: c4, suffix: 'K+', label: 'Leads Generated', icon: <Target size={24} /> },
  ]

  return (
    <div ref={ref} className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center reveal">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(10,35,66,0.08), rgba(10,35,66,0.04))' }}
              >
                <span style={{ color: '#0A2342' }}>{s.icon}</span>
              </div>
              <div
                className="text-4xl font-black mb-1"
                style={{ fontFamily: 'Poppins', color: '#0A2342' }}
              >
                {s.val}{s.suffix}
              </div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Why Businesses Fail ───────────────────────────────────────────────
function WhyFail() {
  const problems = [
    { icon: <Palette size={22} />, text: 'No Branding', desc: 'ग्राहक ओळखत नाहीत' },
    { icon: <Globe size={22} />, text: 'No Online Presence', desc: 'Google वर दिसत नाही' },
    { icon: <Megaphone size={22} />, text: 'Wrong Marketing', desc: 'पैसे वाया जातात' },
    { icon: <Target size={22} />, text: 'No Leads', desc: 'नवीन ग्राहक नाहीत' },
    { icon: <Lightbulb size={22} />, text: 'No Strategy', desc: 'दिशा नाही' },
    { icon: <Zap size={22} />, text: 'Manual Work', desc: 'वेळ वाया जातो' },
    { icon: <TrendingUp size={22} />, text: 'Low Sales', desc: 'विक्री वाढत नाही' },
    { icon: <Shield size={22} />, text: 'Poor Customer Trust', desc: 'ग्राहक विश्वास ठेवत नाहीत' },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}
          >The Real Problem</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >तुमचा व्यवसाय वाढत नाही का?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Most businesses struggle not because of bad products — but because of these 8 critical gaps.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <div
              key={p.text}
              className="card-tilt bg-white rounded-2xl p-6 reveal"
              style={{
                border: '1px solid rgba(230,57,70,0.1)',
                transitionDelay: `${i * 60}ms`,
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(230,57,70,0.08)' }}
              >
                <span style={{ color: '#E63946' }}>{p.icon}</span>
              </div>
              <div className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Poppins' }}>{p.text}</div>
              <div className="text-slate-500 text-sm">{p.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <p className="text-lg text-slate-600 mb-6">
            Sound familiar? <strong className="text-red-500">You're not alone.</strong> We've helped 100+ businesses overcome exactly these challenges.
          </p>
          <a
            href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20a%20free%20business%20audit."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            Get Free Business Audit <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Services Section ──────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: <Globe size={28} />, title: 'Website Development', desc: 'Fast, beautiful, conversion-optimized websites that work 24/7 for your business.', color: '#0A2342' },
    { icon: <TrendingUp size={28} />, title: 'Digital Marketing', desc: 'Full-funnel digital marketing strategies that bring real, measurable results.', color: '#1a4a8a' },
    { icon: <Search size={28} />, title: 'SEO', desc: 'Rank on Google page 1 and attract organic traffic without paying per click.', color: '#0A2342' },
    { icon: <Target size={28} />, title: 'Google Ads', desc: 'High-ROI Google Ads campaigns that put your business in front of ready buyers.', color: '#E63946' },
    { icon: <Share2 size={28} />, title: 'Meta Ads', desc: 'Facebook & Instagram advertising that targets your ideal customers precisely.', color: '#E63946' },
    { icon: <Share2 size={28} />, title: 'Social Media', desc: 'Professional social media management that builds brand and community.', color: '#1a4a8a' },
    { icon: <Palette size={28} />, title: 'Brand Identity', desc: 'Premium logo, brand kit, and identity design that commands respect.', color: '#0A2342' },
    { icon: <Bot size={28} />, title: 'AI Automation', desc: 'Automate lead follow-up, WhatsApp, CRM and save 20+ hours per week.', color: '#E63946' },
    { icon: <Users size={28} />, title: 'CRM & Leads', desc: 'Set up CRM systems and lead generation pipelines that never miss a prospect.', color: '#1a4a8a' },
    { icon: <Megaphone size={28} />, title: 'Lead Generation', desc: 'Consistent qualified leads delivered directly to your sales team every day.', color: '#0A2342' },
    { icon: <MessageCircle size={28} />, title: 'WhatsApp Automation', desc: 'Automate your entire WhatsApp business communication and follow-ups.', color: '#25D366' },
    { icon: <Lightbulb size={28} />, title: 'Business Consultation', desc: 'Strategic business consulting to identify growth opportunities and systems.', color: '#E63946' },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >Our Services</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Everything Your Business Needs<br />
            <span className="gradient-text">to Grow Online</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            तुमच्या व्यवसायाच्या वाढीसाठी सर्व काही एकाच छताखाली.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="card-tilt group bg-white rounded-2xl p-6 reveal cursor-pointer text-center md:text-left"
              style={{
                border: '1px solid #E2E8F0',
                transitionDelay: `${i * 40}ms`,
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 mx-auto md:mx-0"
                style={{ background: `${s.color}12` }}
              >
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-lg" style={{ fontFamily: 'Poppins' }}>{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div
                className="flex items-center justify-center md:justify-start gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: s.color }}
              >
                Learn More <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Our Solution / Framework ──────────────────────────────────────────
function Framework() {
  const steps = [
    { n: '01', title: 'Understand Business', desc: 'Deep dive into your business model, goals, and current challenges.' },
    { n: '02', title: 'Research Competitors', desc: 'Analyse your competitors and identify your competitive advantage.' },
    { n: '03', title: 'Create Strategy', desc: 'Build a 90-day customized digital growth strategy for your business.' },
    { n: '04', title: 'Build Website', desc: 'Design and develop a high-converting website that sells for you.' },
    { n: '05', title: 'Launch Marketing', desc: 'Run targeted ads and content campaigns to attract qualified leads.' },
    { n: '06', title: 'Generate Leads', desc: 'Implement lead capture systems and automation for consistent pipeline.' },
    { n: '07', title: 'Optimize', desc: 'Analyze data, test and improve every campaign for better ROI.' },
    { n: '08', title: 'Scale Business', desc: 'Double down on what works and scale your revenue exponentially.' },
  ]

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A2342 0%, #0d2d58 100%)' }}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(230,57,70,0.2)', color: '#ff8a94' }}
          >Our Framework</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4 text-white"
            style={{ fontFamily: 'Poppins' }}
          >Business Growth Framework</h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            आमची सिद्ध 8-step प्रक्रिया जी 100+ व्यवसायांना यश मिळवून दिली आहे.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative group cursor-pointer reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="rounded-2xl p-6 h-full transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="text-5xl font-black mb-4 leading-none"
                  style={{ fontFamily: 'Poppins', color: 'rgba(230,57,70,0.3)' }}
                >{s.n}</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Poppins' }}>{s.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && i % 4 !== 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                  <ChevronRight size={20} className="text-blue-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center reveal">
          <a
            href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20want%20to%20start%20my%20growth%20journey."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 mx-auto text-base px-8 py-4"
          >
            Start Your Growth Journey <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── AI Automation ─────────────────────────────────────────────────────
function AISection() {
  const features = [
    { icon: <MessageCircle size={20} />, title: 'WhatsApp Automation', desc: 'Auto-reply, follow-ups, order confirmations on WhatsApp.' },
    { icon: <Users size={20} />, title: 'CRM Integration', desc: 'Capture every lead automatically in your CRM.' },
    { icon: <Zap size={20} />, title: 'Lead Follow-up', desc: 'Never miss a lead — automated nurturing sequences.' },
    { icon: <BarChart3 size={20} />, title: 'Invoicing & Reports', desc: 'Auto-generate invoices and business reports.' },
    { icon: <Bot size={20} />, title: 'AI Customer Support', desc: '24/7 AI chatbot that handles customer queries.' },
    { icon: <Clock size={20} />, title: 'Save 20+ Hours/Week', desc: 'Eliminate repetitive tasks from your workflow.' },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
              style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}
            >AI Automation</div>
            <h2
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: 'Poppins', color: '#0A2342' }}
            >
              Work Smarter,<br />
              <span className="gradient-text">Not Harder</span>
            </h2>
            <p className="text-slate-500 text-lg mb-4 leading-relaxed">
              Let AI handle the repetitive work while you focus on growing your business.
            </p>
            <p className="text-slate-500 mb-8">
              AI Automation वापरून तुमचा वेळ वाचवा, खर्च कमी करा आणि productivity वाढवा.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-4 bg-white rounded-xl" style={{ border: '1px solid #E2E8F0' }}>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(10,35,66,0.08)' }}
                  >
                    <span style={{ color: '#0A2342' }}>{f.icon}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Poppins' }}>{f.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20want%20to%20explore%20AI%20Automation%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Explore AI Automation <ArrowRight size={18} />
            </a>
          </div>

          <div className="reveal-right">
            <div className="relative rounded-3xl overflow-hidden" style={{ height: 520 }}>
              <img
                src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&h=600&fit=crop&auto=format"
                alt="AI Automation for business"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,35,66,0.7), transparent 50%)' }} />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E63946' }}>
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">PragatiOne AI Bot</div>
                    <div className="text-green-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online • Handling 47 queries
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Leads Captured', val: '24' },
                    { label: 'Hours Saved', val: '18h' },
                    { label: 'Response Rate', val: '100%' },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-white font-bold text-lg">{m.val}</div>
                      <div className="text-blue-300 text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Industries ────────────────────────────────────────────────────────
function Industries() {
  const industries = [
    { icon: <Heart size={24} />, label: 'Healthcare', sub: 'Clinics & Hospitals' },
    { icon: <GraduationCap size={24} />, label: 'Education', sub: 'Institutes & Coaching' },
    { icon: <Factory size={24} />, label: 'Manufacturing', sub: 'MSME & Industry' },
    { icon: <ShoppingBag size={24} />, label: 'Retail', sub: 'Shops & E-commerce' },
    { icon: <Utensils size={24} />, label: 'Restaurant', sub: 'Food & Hospitality' },
    { icon: <Building2 size={24} />, label: 'Construction', sub: 'Builders & Infra' },
    { icon: <Home size={24} />, label: 'Real Estate', sub: 'Agents & Developers' },
    { icon: <Plane size={24} />, label: 'Travel', sub: 'Tour & Travel' },
    { icon: <DollarSign size={24} />, label: 'Finance', sub: 'CA, Insurance, NBFC' },
    { icon: <Leaf size={24} />, label: 'Agriculture', sub: 'Agri & FPO' },
    { icon: <Car size={24} />, label: 'Automobile', sub: 'Dealers & Service' },
    { icon: <Rocket size={24} />, label: 'Startups', sub: 'Early & Growth Stage' },
  ]

  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >Industries We Serve</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Your Industry.<br />
            <span className="gradient-text">Our Expertise.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            आम्ही 12+ industries मध्ये काम केले आहे. तुमचा sector माहित आहे आम्हाला.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {industries.map((ind, i) => (
            <div
              key={ind.label}
              className="card-tilt group bg-white rounded-2xl p-5 text-center cursor-pointer reveal"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(10,35,66,0.08), rgba(10,35,66,0.04))' }}
              >
                <span style={{ color: '#0A2342' }}>{ind.icon}</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Poppins' }}>{ind.label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{ind.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Case Studies / Results ────────────────────────────────────────────
function Results() {
  const cases = [
    {
      industry: 'Manufacturing',
      company: 'Precision Parts Pvt Ltd',
      location: 'Pune, Maharashtra',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format',
      before: { leads: '3/month', revenue: '₹18L/month', traffic: '120 visits' },
      after: { leads: '45/month', revenue: '₹52L/month', traffic: '3,800 visits' },
      result: '+1400% more leads in 6 months',
      services: ['Website', 'SEO', 'Google Ads', 'LinkedIn'],
    },
    {
      industry: 'Healthcare',
      company: 'Dr. Sharma Dental Clinic',
      location: 'Nashik, Maharashtra',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format',
      before: { leads: '8/month', revenue: '₹2.5L/month', traffic: '300 visits' },
      after: { leads: '72/month', revenue: '₹9.8L/month', traffic: '12,000 visits' },
      result: '9x appointment growth in 4 months',
      services: ['Website', 'Google Ads', 'Meta Ads', 'SEO'],
    },
    {
      industry: 'Retail',
      company: 'FreshMart Superstore',
      location: 'Aurangabad, Maharashtra',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
      before: { leads: '20/month', revenue: '₹8L/month', traffic: '500 visits' },
      after: { leads: '180/month', revenue: '₹28L/month', traffic: '22,000 visits' },
      result: '+250% revenue in 3 months',
      services: ['Meta Ads', 'WhatsApp', 'Branding', 'Social Media'],
    },
  ]

  return (
    <section id="results" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >Success Stories</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Real Results for<br />
            <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            यशाच्या गोष्टी — आमच्या ग्राहकांनी नक्की किती वाढ अनुभवली.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {cases.map((c, i) => (
            <div
              key={c.company}
              className="card-tilt bg-white rounded-3xl overflow-hidden reveal"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={c.image} alt={c.company} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,35,66,0.8), transparent 50%)' }} />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: '#E63946' }}
                >{c.industry}</div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-white font-bold" style={{ fontFamily: 'Poppins' }}>{c.company}</div>
                  <div className="text-blue-300 text-xs flex items-center gap-1">
                    <MapPin size={10} /> {c.location}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Before', data: c.before },
                    { label: 'After', data: c.after },
                  ].map((col) => (
                    <div
                      key={col.label}
                      className="rounded-xl p-3"
                      style={{ background: col.label === 'After' ? 'rgba(46,125,50,0.06)' : 'rgba(100,116,139,0.06)' }}
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: col.label === 'After' ? '#2E7D32' : '#94a3b8' }}
                      >{col.label}</div>
                      {Object.entries(col.data).map(([k, v]) => (
                        <div key={k} className="text-sm font-semibold text-slate-700">{v}</div>
                      ))}
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center gap-2 p-3 rounded-xl mb-4"
                  style={{ background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.15)' }}
                >
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-green-700 font-bold text-sm">{c.result}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(10,35,66,0.07)', color: '#0A2342' }}
                    >{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ─────────────────────────────────────────────────────
function WhyUs() {
  const points = [
    { icon: <Shield size={24} />, title: 'Transparent Process', desc: 'Complete visibility into every step of our work. No hidden costs, no surprises.' },
    { icon: <BarChart3 size={24} />, title: 'Data Driven', desc: 'Every decision backed by data and analytics. We optimize based on numbers.' },
    { icon: <TrendingUp size={24} />, title: 'ROI Focused', desc: 'We measure success by your revenue growth, not vanity metrics.' },
    { icon: <Palette size={24} />, title: 'Creative Team', desc: 'Award-winning creative work that differentiates your brand in the market.' },
    { icon: <Award size={24} />, title: 'Experienced Experts', desc: '5+ year experienced specialists in each domain under one roof.' },
    { icon: <Clock size={24} />, title: 'Dedicated Support', desc: 'WhatsApp-first support with 4-hour response guarantee.' },
    { icon: <DollarSign size={24} />, title: 'Affordable Pricing', desc: 'Enterprise-quality results at pricing that makes sense for Indian SMBs.' },
    { icon: <Bot size={24} />, title: 'Modern Technology', desc: 'We use the latest AI tools and platforms for maximum efficiency.' },
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
              style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
            >Why Choose Us</div>
            <h2
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: 'Poppins', color: '#0A2342' }}
            >
              We Don't Just Deliver.<br />
              <span className="gradient-text">We Transform.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-4 leading-relaxed">
              100+ businesses have trusted PragatiOne to build their digital presence, generate leads and grow revenue.
            </p>
            <p className="text-slate-500 mb-8">
              आमच्यासोबत काम केलेल्या प्रत्येक व्यवसायाने वाढ अनुभवली आहे.
            </p>
            <button className="btn-primary flex items-center gap-2">
              See Our Work <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-right">
            {points.map((p, i) => (
              <div
                key={p.title}
                className="group p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg"
                style={{
                  border: '1px solid #E2E8F0',
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(10,35,66,0.1), rgba(10,35,66,0.05))' }}
                >
                  <span style={{ color: '#0A2342' }}>{p.icon}</span>
                </div>
                <div className="font-bold text-slate-800 mb-1 text-sm" style={{ fontFamily: 'Poppins' }}>{p.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0)

  const reviews = [
    {
      name: 'Rajesh Patil',
      role: 'Owner, Patil Iron Works',
      location: 'Pune',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
      text: 'PragatiOne ने आमच्या कारखान्याची पूर्णपणे digital presence बनवली. आता Google वरून रोज नवीन inquiries येतात. 6 महिन्यात turnover दुप्पट झाला!',
      rating: 5,
      result: '200% Revenue Growth',
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Owner, Smile Dental Clinic',
      location: 'Nashik',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b11c?w=80&h=80&fit=crop&auto=format',
      text: 'Before PragatiOne, I had no online presence at all. Now my clinic gets 70+ new patient appointments every month purely from Google Ads and SEO. Best investment I made.',
      rating: 5,
      result: '9x More Appointments',
    },
    {
      name: 'Suresh Agarwal',
      role: 'Director, AgroFresh Pvt Ltd',
      location: 'Aurangabad',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
      text: 'WhatsApp automation alone saved our team 25 hours per week. The leads come in automatically, follow-ups happen automatically. It feels like magic. Highly recommended!',
      rating: 5,
      result: '25 Hrs/Week Saved',
    },
    {
      name: 'Sunita Mehta',
      role: 'Founder, Mehta Fashion House',
      location: 'Nagpur',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
      text: 'हमारी brand identity और website बहुत professional लगती है अब. Meta Ads से हर month ₹4-5 lakh के orders आते हैं. PragatiOne ने सब कुछ बदल दिया.',
      rating: 5,
      result: '₹4L+ Monthly Orders',
    },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >Client Reviews</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >What Our Clients Say</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400" fill="#FBBF24" />
            ))}
            <span className="text-slate-600 ml-2 font-semibold">5.0 on Google</span>
          </div>
          <p className="text-slate-400 text-sm">Based on 100+ verified reviews</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="card-tilt bg-white rounded-3xl p-7 reveal cursor-pointer"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                transitionDelay: `${i * 80}ms`,
              }}
              onClick={() => setActive(i)}
            >
              <div className="flex items-start gap-4 mb-5">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800" style={{ fontFamily: 'Poppins' }}>{r.name}</div>
                  <div className="text-slate-500 text-sm">{r.role}</div>
                  <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {r.location}
                  </div>
                </div>
                <div
                  className="ml-auto px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(46,125,50,0.1)', color: '#2E7D32' }}
                >{r.result}</div>
              </div>

              <div className="flex mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400" fill="#FBBF24" />
                ))}
              </div>

              <Quote size={20} className="text-slate-200 mb-2" />
              <p className="text-slate-600 leading-relaxed text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog ──────────────────────────────────────────────────────────────
function Blog() {
  const posts = [
    {
      category: 'Digital Marketing',
      title: '10 Ways to Generate More Leads for Your Local Business in 2024',
      excerpt: 'Discover proven lead generation strategies that are working for Indian SMBs right now.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
      time: '5 min read',
      date: 'Jan 15, 2024',
    },
    {
      category: 'AI Automation',
      title: 'WhatsApp Automation से अपना Business कैसे Automate करें',
      excerpt: 'WhatsApp Business API और automation tools की मदद से business को smart बनाएं.',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&h=400&fit=crop&auto=format',
      time: '7 min read',
      date: 'Feb 3, 2024',
    },
    {
      category: 'SEO',
      title: 'Google वर Page 1 वर येण्यासाठी काय करावे — Complete SEO Guide',
      excerpt: 'Local SEO strategies जे Marathi businesses साठी खरोखर काम करतात.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop&auto=format',
      time: '8 min read',
      date: 'Feb 18, 2024',
    },
  ]

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="reveal">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
              style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
            >Blog</div>
            <h2
              className="text-4xl lg:text-5xl font-black"
              style={{ fontFamily: 'Poppins', color: '#0A2342' }}
            >Insights & Tips<br />
              <span className="gradient-text">for Business Growth</span>
            </h2>
          </div>
          <button className="btn-secondary flex items-center gap-2 reveal">
            View All Articles <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <div
              key={p.title}
              className="card-tilt bg-white rounded-3xl overflow-hidden cursor-pointer reveal"
              style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: '#0A2342' }}
                >{p.category}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                  <span>{p.date}</span>
                  <span>•</span>
                  <span>{p.time}</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-3 leading-snug" style={{ fontFamily: 'Poppins' }}>{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.excerpt}</p>
                <div
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: '#0A2342' }}
                >
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How long does it take to see results from Digital Marketing?',
      a: 'Results vary by service: Google Ads and Meta Ads can generate leads within 7-14 days. SEO typically takes 3-6 months to show strong organic rankings. Website development takes 3-6 weeks for a complete build.',
    },
    {
      q: 'Digital Marketing साठी किती budget लागतो?',
      a: 'आमचे packages ₹15,000/month पासून सुरु होतात. तुमच्या business size, goals आणि competition नुसार आम्ही customized strategy बनवतो. Free consultation मध्ये आम्ही तुमच्यासाठी best package suggest करतो.',
    },
    {
      q: 'Do you work with businesses outside Maharashtra?',
      a: 'Yes! While we are based in Maharashtra and specialize in Marathi-speaking markets, we work with businesses across India. We have clients in Gujarat, Rajasthan, Delhi, and South India as well.',
    },
    {
      q: 'What makes PragatiOne different from other agencies?',
      a: 'We combine deep understanding of Indian market psychology, bilingual communication, AI-powered automation, and ROI-focused strategy. We don\'t just run campaigns — we build complete growth systems for your business.',
    },
    {
      q: 'क्या आप guarantee देते हो results की?',
      a: 'हम performance-based approach follow करते हैं। हम हर campaign के results track करते हैं और अगर targets miss होते हैं, तो हम free optimization करते हैं। हमारे 95% clients renewals करते हैं — यही हमारी guarantee है।',
    },
    {
      q: 'How do I get started with PragatiOne?',
      a: 'Simply book a free 30-minute strategy call. We will analyze your business, competitors, and current digital presence, then recommend a clear roadmap for growth. No obligations, no sales pressure — just honest advice.',
    },
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >FAQ</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Got Questions?<br />
            <span className="gradient-text">We Have Answers.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden reveal"
              style={{ border: '1px solid #E2E8F0', transitionDelay: `${i * 60}ms` }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-800 pr-4" style={{ fontFamily: 'Poppins' }}>{f.q}</span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: open === i ? '#0A2342' : 'rgba(10,35,66,0.08)' }}
                >
                  {open === i
                    ? <ChevronUp size={16} className="text-white" />
                    : <ChevronDown size={16} style={{ color: '#0A2342' }} />
                  }
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0' }}
              >
                <p className="px-6 pb-6 text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A2342 0%, #0d2d58 100%)' }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at 10% 50%, #E63946 0%, transparent 50%),
            radial-gradient(ellipse at 90% 50%, #1a4a8a 0%, transparent 50%)`,
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center reveal">
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
          style={{ background: 'rgba(230,57,70,0.2)', color: '#ff8a94' }}
        >Free Consultation</div>
        <h2
          className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: 'Poppins' }}
        >
          Ready to Grow?<br />
          <span className="gradient-text">Let's Build Your Business Together.</span>
        </h2>
        <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
          Book a FREE 30-minute strategy call today. आमचे experts तुमच्या business साठी personalized growth plan बनवतील.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20to%20book%20a%20free%20meeting."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 text-lg px-10 py-5 animate-pulse-glow"
          >
            <Phone size={20} /> Book Free Meeting
          </a>
          <a
            href="https://wa.me/7709630163"
            className="flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1"
            style={{ background: '#25D366', color: 'white', fontFamily: 'Poppins' }}
          >
            <MessageCircle size={20} /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you! We will call you within 2 hours. / आम्ही 2 तासात call करतो.')
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(10,35,66,0.08)', color: '#0A2342' }}
          >Contact Us</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Let's Talk About<br />
            <span className="gradient-text">Your Business Growth</span>
          </h2>
          <p className="text-slate-500 text-lg">आज connect करा. उद्याच growth सुरू करा.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="reveal-left">
            <div className="grid gap-5 mb-8">
              {[
                { icon: <Phone size={22} />, label: 'Call Us', val: '+91 7709630163', sub: 'Mon–Sat 9am–7pm' },
                { icon: <MessageCircle size={22} />, label: 'WhatsApp', val: '+91 7709630163', sub: 'Chat anytime' },
                { icon: <Mail size={22} />, label: 'Email', val: 'hello@pragatione.com', sub: 'Reply within 2 hours' },
                { icon: <MapPin size={22} />, label: 'Office', val: 'Pune, Maharashtra', sub: 'Visit by appointment' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-5 p-5 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(10,35,66,0.1), rgba(10,35,66,0.05))' }}
                  >
                    <span style={{ color: '#0A2342' }}>{c.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{c.label}</div>
                    <div className="font-bold text-slate-800" style={{ fontFamily: 'Poppins' }}>{c.val}</div>
                    <div className="text-slate-400 text-xs">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ height: 220, background: '#e8edf2', border: '1px solid #E2E8F0' }}
            >
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=700&h=300&fit=crop&auto=format"
                alt="Pune office location"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm"
                  style={{ background: '#0A2342' }}
                >
                  <MapPin size={16} /> View on Google Maps
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            <div
              className="bg-white rounded-3xl p-8"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Poppins' }}>
                Book Free Strategy Call
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name', placeholder: 'Your Full Name *', type: 'text' },
                  { name: 'phone', placeholder: 'WhatsApp Number *', type: 'tel' },
                  { name: 'email', placeholder: 'Email Address', type: 'email' },
                  { name: 'business', placeholder: 'Business Type (e.g. Clinic, Shop, Factory)', type: 'text' },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2E8F0',
                      fontFamily: 'Inter',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0A2342')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                ))}
                <textarea
                  placeholder="Describe your business challenge (optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: '1.5px solid #E2E8F0', fontFamily: 'Inter' }}
                  onFocus={(e) => (e.target.style.borderColor = '#0A2342')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
                <button type="submit" className="btn-primary flex items-center justify-center gap-2 w-full py-4 text-base">
                  <Send size={18} /> Submit & Book Call
                </button>
                <p className="text-slate-400 text-xs text-center">
                  आम्ही 2 तासात call करतो. 100% free consultation. No spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="pt-20 pb-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050f1e 0%, #0A2342 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #E63946, #c62d39)' }}
              >P</div>
              <div>
                <div className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins' }}>PragatiOne</div>
                <div className="text-blue-400 text-xs">Digital Growth Agency</div>
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
              तुमच्या व्यवसायाची digital growth आमची जबाबदारी. Website, Marketing, Branding, AI Automation — सर्व एकाच ठिकाणी.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {['f', 'in', 'yt', 'li'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 text-sm font-bold"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Services',
              links: ['Website Development', 'Digital Marketing', 'SEO', 'Google Ads', 'Meta Ads', 'AI Automation'],
            },
            {
              title: 'Industries',
              links: ['Healthcare', 'Manufacturing', 'Retail', 'Restaurant', 'Education', 'Real Estate'],
            },
            {
              title: 'Company',
              links: ['About Us', 'Our Team', 'Case Studies', 'Blog', 'Careers', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title} className="text-center md:text-left">
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins' }}>{col.title}</h4>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-blue-300 text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-4 justify-between"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>Free Marketing Tips Newsletter</div>
            <div className="text-blue-300 text-sm">Join 2,000+ business owners. No spam. Unsubscribe anytime.</div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
            />
            <button className="btn-primary px-5 py-3 text-sm flex-shrink-0">Subscribe</button>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4 pt-8 text-center md:text-left"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-blue-400 text-sm">
            © 2024 PragatiOne. All rights reserved. | Made with ❤️ in Maharashtra
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((l) => (
              <a key={l} href="#" className="text-blue-400 text-xs hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating Buttons ──────────────────────────────────────────────────
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/7709630163"
        className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
        style={{ background: '#25D366' }}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* Call */}
      <a
        href="tel:+7709630163"
        className="fixed bottom-8 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        style={{ background: '#0A2342' }}
        title="Call Now"
      >
        <Phone size={24} />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-5 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
          style={{ background: 'rgba(10,35,66,0.9)', backdropFilter: 'blur(10px)' }}
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Mobile floating CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 p-4 flex gap-3 md:hidden"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid #E2E8F0' }}
      >
        <a
          href="tel:+7709630163"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{ background: '#0A2342', color: 'white', fontFamily: 'Poppins' }}
        >
          <Phone size={16} /> Call Now
        </a>
        <a
          href="https://wa.me/7709630163"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{ background: '#25D366', color: 'white', fontFamily: 'Poppins' }}
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal()

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsStrip />
      <WhyFail />
      <Services />
      <Framework />
      <AISection />
      <Industries />
      <Results />
      <WhyUs />
      <Testimonials />
      <Blog />
      <FAQ />
      <CTABanner />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
