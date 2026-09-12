import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Phone, MessageCircle, ChevronDown, ChevronRight, Star,
  Globe, TrendingUp, Megaphone, Search, Target, Share2, Palette,
  Bot, Users, Zap, ArrowRight, MapPin, Mail,
  Clock, Award, Shield, Lightbulb, BarChart3, Rocket, Building2,
  ShoppingBag, Utensils, GraduationCap, Heart, Car, Leaf, Plane,
  DollarSign, Factory, Home, ChevronUp, Quote, Send
} from 'lucide-react'
import logoImg from './assets/logo/logo.png'

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
// ─── Navbar ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    setActiveDropdown(null)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    {
      label: 'Company',
      dropdown: [
        { label: 'About Us', id: 'about' },
        { label: 'Why Choose Us', id: 'why-us' },
        { label: 'Industries', id: 'industries' }
      ]
    },
    {
      label: 'Services',
      dropdown: [
        { label: 'Digital Marketing', id: 'services' },
        { label: 'SEO & Google Ads', id: 'services' },
        { label: 'AI Automation', id: 'services' },
        { label: 'Website Development', id: 'services' }
      ]
    },
    { label: 'Results', id: 'results' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white"
      style={{
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid #f1f5f9',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
          <img src={logoImg} alt="PragatiOne Logo" className="h-17 object-contain" />
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => item.id ? scrollTo(item.id) : null}
                className="flex items-center gap-1 py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
              </button>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-left ${activeDropdown === item.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                  <div className="py-2">
                    {item.dropdown.map((drop) => (
                      <button
                        key={drop.label}
                        onClick={() => scrollTo(drop.id)}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                      >
                        {drop.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/7709630163"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-6 py-2.5 rounded-full"
          >Consult Now</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-gray-800"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="lg:hidden transition-all duration-300 overflow-hidden bg-white"
        style={{
          maxHeight: open ? '1000px' : '0',
          boxShadow: open ? '0 10px 20px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1 border-t border-gray-100">
          {navItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.dropdown) {
                    setActiveDropdown(activeDropdown === item.label ? null : item.label)
                  } else if (item.id) {
                    scrollTo(item.id)
                  }
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 flex items-center justify-between"
              >
                {item.label}
                {item.dropdown && <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
              </button>

              {/* Mobile Dropdown */}
              {item.dropdown && (
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: activeDropdown === item.label ? '200px' : '0' }}
                >
                  <div className="pl-8 pr-4 py-2 flex flex-col gap-1">
                    {item.dropdown.map((drop) => (
                      <button
                        key={drop.label}
                        onClick={() => scrollTo(drop.id)}
                        className="text-left py-2 text-sm font-medium text-gray-600"
                      >
                        {drop.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 flex gap-3 pb-4">
            <a
              href="https://wa.me/7709630163"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center text-sm py-3 rounded-xl"
            >Consult Now</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero Section ──────────────────────────────────────────────────────
function Hero() {
  const [typedLength, setTypedLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = "Extraordinary Growth."
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && typedLength < text.length) {
      timeout = setTimeout(() => setTypedLength(l => l + 1), 100)
    } else if (!isDeleting && typedLength === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && typedLength > 0) {
      timeout = setTimeout(() => setTypedLength(l => l - 1), 50)
    } else if (isDeleting && typedLength === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 500)
    }

    return () => clearTimeout(timeout)
  }, [typedLength, isDeleting])

  const part1 = "Extraordinary ".slice(0, Math.max(0, typedLength))
  const part2 = "Growth.".slice(0, Math.max(0, typedLength - 14))

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white p-3"
    >
      {/* Background glowing dots similar to Digisahyadri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-[15%] w-3 h-3 bg-green-400 rounded-full opacity-50 blur-[2px]" />
        <div className="absolute top-[35%] right-[25%] w-2 h-2 bg-green-300 rounded-full opacity-60 blur-[1px]" />
        <div className="absolute bottom-1/3 right-[10%] w-4 h-4 bg-green-200 rounded-full opacity-70 blur-[2px]" />
        <div className="absolute bottom-1/4 right-[30%] w-2 h-2 bg-green-400 rounded-full opacity-50 blur-[1px]" />
        <div className="absolute top-1/3 left-[15%] w-2 h-2 bg-green-300 rounded-full opacity-40 blur-[1px]" />
      </div>

      {/* Large green circle accent */}
      <div className="absolute right-[-5%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full border-[8px] border-green-100 opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10">

        <h1
          className="text-gray-900 leading-tight mb-16 max-w-5xl min-h-[220px] md:min-h-0"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.8rem)' }}
        >
          <span className="font-light">Hello! We're </span>
          <span className="font-black italic text-gray-900">PragatiOne</span>
          <br />
          <span className="font-light">Your Partner for</span>
          <br />
          <span className="font-black italic text-gray-900">{part1}</span>
          {typedLength >= 14 && <br className="block md:hidden" />}
          <span className="font-light">{part2}</span>
          <span className="animate-pulse text-green-500 font-light">|</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <div className="w-24 h-1 bg-gray-900 mb-8" />
            <p className="text-green-600 text-3xl font-semibold leading-snug">
              Where ambition turns <br /> into new possibilities <br /> in motion.
            </p>
          </div>

          <div className="lg:pt-6">
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              At PragatiOne, we go beyond delivering services—we build lasting partnerships that create, long-term impact.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-gray-600 text-sm font-bold tracking-[0.2em] uppercase">Scroll Down</span>
        <ChevronDown size={24} className="text-green-500 animate-bounce mt-2" />
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
    { val: c1, suffix: '+', label: 'Projects Completed' },
    { val: c2, suffix: '+', label: 'Happy Clients' },
    { val: c3, suffix: 'M+', label: 'Total Reach' },
    { val: c4, suffix: 'K+', label: 'Leads Generated' },
  ]

  return (
    <div ref={ref} className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center reveal">
              <div
                className="text-5xl lg:text-6xl font-black mb-4"
                style={{ fontFamily: 'Poppins', color: '#16A34A' }}
              >
                {s.val}{s.suffix}
              </div>
              <div className="text-gray-500 text-sm lg:text-base font-semibold uppercase tracking-wider">{s.label}</div>
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
    { icon: <Palette size={22} />, text: 'No Branding', desc: 'Customers do not recognize you' },
    { icon: <Globe size={22} />, text: 'No Online Presence', desc: 'Not visible on Google' },
    { icon: <Megaphone size={22} />, text: 'Wrong Marketing', desc: 'Wasting money' },
    { icon: <Target size={22} />, text: 'No Leads', desc: 'No new customers' },
    { icon: <Lightbulb size={22} />, text: 'No Strategy', desc: 'No direction' },
    { icon: <Zap size={22} />, text: 'Manual Work', desc: 'Wasting time' },
    { icon: <TrendingUp size={22} />, text: 'Low Sales', desc: 'Sales are not growing' },
    { icon: <Shield size={22} />, text: 'Poor Customer Trust', desc: 'Customers do not trust you' },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider"
            style={{ background: 'rgba(230,57,70,0.1)', color: '#E63946' }}
          >The Real Problem</div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: 'Poppins', color: '#0A2342' }}
          >Is your business not growing?</h2>
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
    { title: 'Website Development', desc: 'Fast, beautiful, conversion-optimized websites that work 24/7 for your business.' },
    { title: 'Digital Marketing', desc: 'Full-funnel digital marketing strategies that bring real, measurable results.' },
    { title: 'SEO & Google Ads', desc: 'Rank on Google page 1 and attract organic traffic without paying per click.' },
    { title: 'Social Media', desc: 'Professional social media management that builds brand and community.' },
    { title: 'Brand Identity', desc: 'Premium logo, brand kit, and identity design that commands respect.' },
    { title: 'AI Automation', desc: 'Automate lead follow-up, WhatsApp, CRM and save 20+ hours per week.' },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2
            className="text-4xl lg:text-5xl font-black mb-6 text-gray-900"
            style={{ fontFamily: 'Poppins' }}
          >
            Our Core <span className="text-green-600 italic">Services</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything your business needs for digital growth, delivered with excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group bg-white rounded-2xl p-8 reveal border border-gray-100 transition-all hover:border-green-500 hover:shadow-xl hover:-translate-y-1"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-green-50 group-hover:bg-green-500 transition-colors">
                <div className="w-4 h-4 bg-green-500 group-hover:bg-white rounded-sm transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl" style={{ fontFamily: 'Poppins' }}>{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                Learn More <ArrowRight size={16} />
              </button>
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
            Our proven 8-step process that has brought success to 100+ businesses.
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
              Save time, reduce costs, and increase productivity using AI Automation.
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
            We have worked in 12+ industries. We know your sector.
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

// ─── Why Choose Us ─────────────────────────────────────────────────────
function WhyUs() {
  const points = [
    { title: 'Transparent Process', desc: 'Complete visibility into every step of our work. No hidden costs, no surprises.' },
    { title: 'Data Driven', desc: 'Every decision backed by data and analytics. We optimize based on numbers.' },
    { title: 'ROI Focused', desc: 'We measure success by your revenue growth, not vanity metrics.' },
    { title: 'Creative Team', desc: 'Award-winning creative work that differentiates your brand in the market.' },
    { title: 'Experienced Experts', desc: '5+ year experienced specialists in each domain under one roof.' },
    { title: 'Dedicated Support', desc: 'WhatsApp-first support with 4-hour response guarantee.' },
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2
            className="text-4xl lg:text-5xl font-black mb-6 text-gray-900"
            style={{ fontFamily: 'Poppins' }}
          >
            Why <span className="text-green-600 italic">Choose Us</span>
          </h2>
          <p className="text-gray-500 text-lg">
            We don't just deliver services—we build partnerships that create long-term impact for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins' }}>{p.title}</h3>
              <p className="text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────
// ─── FAQ & Contact ─────────────────────────────────────────────────────
function FAQAndContact() {
  const [open, setOpen] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you! We will call you within 2 hours.')
  }

  const faqs = [
    {
      q: 'How long does it take to see results from Digital Marketing?',
      a: 'Results vary by service: Google Ads and Meta Ads can generate leads within 7-14 days. SEO typically takes 3-6 months to show strong organic rankings. Website development takes 3-6 weeks for a complete build.',
    },
    {
      q: 'How much budget is needed for Digital Marketing?',
      a: 'Our packages start from ₹15,000/month. We build a customized strategy according to your business size, goals, and competition. In the free consultation, we suggest the best package for you.',
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
      q: 'Do you guarantee results?',
      a: 'We follow a performance-based approach. We track the results of every campaign, and if targets are missed, we provide free optimization. 95% of our clients renew — that is our guarantee.',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* FAQ Column */}
          <div className="reveal-left">
            <h2 className="text-3xl lg:text-4xl font-black mb-8 text-gray-900" style={{ fontFamily: 'Poppins' }}>
              Frequently Asked <span className="text-green-600 italic">Questions</span>
            </h2>
            <div className="flex flex-col gap-2">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0">
                  <button
                    className="w-full flex items-center justify-between py-5 text-left group"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className={`font-semibold transition-colors ${open === i ? 'text-green-600' : 'text-gray-800 group-hover:text-green-600'}`} style={{ fontFamily: 'Poppins' }}>
                      {f.q}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {open === i ? <ChevronUp size={20} className="text-green-600" /> : <ChevronDown size={20} className="text-gray-400 group-hover:text-green-600" />}
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: open === i ? '300px' : '0' }}
                  >
                    <p className="pb-5 text-gray-500 leading-relaxed text-sm pr-6">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="reveal-right">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                Book Free Strategy Call
              </h3>
              <p className="text-gray-500 text-sm mb-8">Connect today. Start growth tomorrow.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name', placeholder: 'Your Full Name *', type: 'text' },
                  { name: 'phone', placeholder: 'WhatsApp Number *', type: 'tel' },
                  { name: 'email', placeholder: 'Email Address', type: 'email' },
                  { name: 'business', placeholder: 'Business Type', type: 'text' },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    style={{ fontFamily: 'Inter' }}
                  />
                ))}
                <textarea
                  placeholder="Describe your business challenge (optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-sm outline-none resize-none transition-all border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  style={{ fontFamily: 'Inter' }}
                />
                <button type="submit" className="btn-primary mt-2 flex items-center justify-center gap-2 w-full py-4 text-base rounded-xl">
                  <Send size={18} /> Submit & Book Call
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/30 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-6 text-center reveal">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider bg-gray-800 border border-gray-700 text-green-400">
          Free Consultation
        </div>
        <h2
          className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: 'Poppins' }}
        >
          Ready to Grow?<br />
          Let's Build Your Business Together.
        </h2>
        <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
          Book a FREE 30-minute strategy call today. Our experts will create a personalized growth plan for your business.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/7709630163?text=Hi%20PragatiOne%2C%20I%20would%20like%20to%20book%20a%20free%20meeting."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg px-10 py-5 bg-green-500 text-white rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg animate-pulse-glow"
          >
            <Phone size={20} /> Book Free Meeting
          </a>
          <a
            href="https://wa.me/7709630163"
            className="flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 bg-green-800 text-white hover:bg-green-900"
          >
            <MessageCircle size={20} /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────


// ─── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-20 pb-8 relative overflow-hidden bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
              <img src={logoImg} alt="PragatiOne Logo" className="h-16 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
              The digital growth of your business is our responsibility. Website, Marketing, Branding, AI Automation — everything in one place.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {['f', 'in', 'yt', 'li'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 text-sm font-bold bg-gray-800 text-gray-300 hover:text-white"
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns — 2×2 on mobile, then side-by-side on lg */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <a href="#" className="text-gray-400 text-sm hover:text-green-400 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-4 justify-between bg-gray-800 border border-gray-700">
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>Free Marketing Tips Newsletter</div>
            <div className="text-gray-400 text-sm">Join 2,000+ business owners. No spam. Unsubscribe anytime.</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto sm:flex-1 md:w-56 px-4 py-2.5 rounded-xl text-sm outline-none bg-gray-900 border border-gray-700 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 text-sm w-full sm:w-auto rounded-xl transition-colors">Subscribe</button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4 pt-8 text-center md:text-left border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © 2024 PragatiOne. All rights reserved. | Made with ❤️ in Maharashtra
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((l) => (
              <a key={l} href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{l}</a>
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
        className="hidden md:flex fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full items-center justify-center text-white shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
        style={{ background: '#25D366' }}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* Call */}
      <a
        href="tel:+7709630163"
        className="hidden md:flex fixed bottom-8 right-5 z-50 w-14 h-14 rounded-full items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        style={{ background: '#0A2342' }}
        title="Call Now"
      >
        <Phone size={24} />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden md:flex fixed bottom-8 left-5 z-50 w-12 h-12 rounded-full items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
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
      <WhyFail />
      <Services />
      <Framework />
      <AISection />
      <Industries />
      <WhyUs />
      <StatsStrip />
      <FAQAndContact />
      <CTABanner />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
