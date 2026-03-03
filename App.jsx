import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Image imports ─── */
import imgReception  from '/images/reception.jpg'
import imgSalle1     from '/images/salle1.jpg'
import imgSalle2     from '/images/salle2.jpg'
import imgSalle3     from '/images/salle3.jpg'
import imgSalle4     from '/images/salle4.jpg'
import imgSteril     from '/images/sterilisation.jpg'
import imgRadio      from '/images/radio.jpg'
import imgCouloir    from '/images/couloir.jpg'
import imgEquipe     from '/images/equipe.jpg'
import imgHall       from '/images/hall.jpg'

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── Counter animation ─── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#accueil',      label: 'Accueil' },
    { href: '#le-centre',    label: 'Le Centre' },
    { href: '#services',     label: 'Services' },
    { href: '#technologie',  label: 'Technologie' },
    { href: '#contact',      label: 'Contact' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#accueil" className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C11 4 7 8 7 12.5C7 17 9.5 21 12 24.5C13.5 26.5 14.5 28.5 16 28.5C17.5 28.5 18.5 26.5 20 24.5C22.5 21 25 17 25 12.5C25 8 21 4 16 4Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-main">Centre Dentaire</span>
            <span className="nav-logo-sub">Polo · Casablanca</span>
          </div>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-nav">Prendre RDV</a>

        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''}/>
          <span className={menuOpen ? 'open' : ''}/>
          <span className={menuOpen ? 'open' : ''}/>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn-nav mobile-cta" onClick={() => setMenuOpen(false)}>
          Prendre RDV
        </a>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero-bg">
        <img src={imgReception} alt="Réception Centre Dentaire Polo" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-badge reveal">
          <span className="hero-badge-dot" />
          Casablanca · Quartier Polo
        </div>
        <h1 className="hero-title reveal reveal-delay-1">
          L'excellence<br />
          <em>dentaire</em> au<br />
          cœur de Polo.
        </h1>
        <p className="hero-sub reveal reveal-delay-2">
          Un espace médical de pointe alliant confort, hygiène irréprochable et expertise clinique pour votre santé bucco-dentaire.
        </p>
        <div className="hero-actions reveal reveal-delay-3">
          <a href="#contact" className="btn-primary">
            Prendre rendez-vous
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </a>
          <a href="#le-centre" className="btn-ghost">Découvrir le centre</a>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Défiler</span>
      </div>

      {/* Floating card */}
      <div className="hero-card reveal reveal-delay-4">
        <div className="hero-card-icon">✓</div>
        <div>
          <div className="hero-card-title">Centre accrédité</div>
          <div className="hero-card-sub">Protocoles certifiés · Stérilisation totale</div>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats ─── */
function Stats() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const c1 = useCounter(15, 1600, started)
  const c2 = useCounter(4,  1200, started)
  const c3 = useCounter(98, 2000, started)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect() }
    }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="stats" ref={ref}>
      <div className="stats-inner">
        <div className="stat-item reveal">
          <div className="stat-number">{c1}<span>+</span></div>
          <div className="stat-label">Années d'expérience</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item reveal reveal-delay-1">
          <div className="stat-number">{c2}</div>
          <div className="stat-label">Salles de soins</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item reveal reveal-delay-2">
          <div className="stat-number">{c3}<span>%</span></div>
          <div className="stat-label">Patients satisfaits</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item reveal reveal-delay-3">
          <div className="stat-number">5</div>
          <div className="stat-label">Spécialités médicales</div>
        </div>
      </div>
    </section>
  )
}

/* ─── Le Centre ─── */
function LeCentre() {
  useReveal()
  return (
    <section id="le-centre" className="centre">
      <div className="container">
        <div className="centre-grid">
          <div className="centre-text">
            <p className="section-eyebrow reveal">Notre identité</p>
            <h2 className="section-title reveal reveal-delay-1">
              Un cabinet pensé pour <em>votre confort</em>
            </h2>
            <p className="centre-desc reveal reveal-delay-2">
              Situé au quartier Polo à Casablanca, le Centre Dentaire Polo est un espace médical moderne entièrement dédié à votre santé bucco-dentaire. Nos salles de soins sont équipées des dernières technologies, et notre équipe qualifiée vous accueille dans un cadre chaleureux et serein.
            </p>
            <ul className="centre-features reveal reveal-delay-3">
              {[
                'Salles de chirurgie stérilisées et équipées',
                'Radiologie panoramique 3D sur site',
                'Protocoles d\'hygiène certifiés',
                'Équipe pluridisciplinaire expérimentée',
                'Prise en charge personnalisée',
              ].map((f, i) => (
                <li key={i} className="centre-feature">
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="centre-gallery">
            <div className="gallery-main reveal">
              <img src={imgHall} alt="Hall d'entrée" />
              <div className="gallery-caption">Hall d'accueil</div>
            </div>
            <div className="gallery-side">
              <div className="gallery-sm reveal reveal-delay-1">
                <img src={imgSteril} alt="Stérilisation" />
                <div className="gallery-caption">Stérilisation</div>
              </div>
              <div className="gallery-sm reveal reveal-delay-2">
                <img src={imgCouloir} alt="Couloir" />
                <div className="gallery-caption">Couloir des salles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
const services = [
  {
    icon: '🦷',
    title: 'Implantologie',
    desc: 'Restaurez la fonction et l'esthétique grâce à nos implants de haute précision posés dans notre salle dédiée à la chirurgie implantaire.',
    tag: 'Salle 1 dédiée',
  },
  {
    icon: '✨',
    title: 'Esthétique Dentaire',
    desc: 'Facettes en céramique, blanchiment professionnel et conception de sourire pour un résultat naturel et lumineux.',
    tag: 'Sur mesure',
  },
  {
    icon: '🔬',
    title: 'Chirurgie Orale',
    desc: 'Extractions complexes, chirurgies parodontales et interventions réalisées dans un bloc chirurgical stérile.',
    tag: 'Bloc stérile',
  },
  {
    icon: '📸',
    title: 'Radiologie 3D',
    desc: 'Panoramique et cone-beam réalisés sur place avec notre appareil Carestream pour un diagnostic précis et immédiat.',
    tag: 'Carestream',
  },
  {
    icon: '🛡️',
    title: 'Parodontologie',
    desc: 'Traitement des maladies des gencives, détartrages et maintenances parodontales régulières.',
    tag: 'Prévention',
  },
  {
    icon: '👶',
    title: 'Pédodontie',
    desc: 'Soins adaptés aux enfants dans un environnement doux et rassurant pour développer de bonnes habitudes dès le plus jeune âge.',
    tag: 'Dès 3 ans',
  },
]

function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Ce que nous traitons</p>
          <h2 className="section-title">Nos domaines<br /><em>d'expertise</em></h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-tag">{s.tag}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Technologie / Plateau ─── */
function Technologie() {
  const rooms = [
    { img: imgSalle1, label: 'Salle 1', sub: 'Implantologie & Chirurgie', featured: true },
    { img: imgSalle2, label: 'Salle 2', sub: 'Soins & Traitements', featured: false },
    { img: imgSalle3, label: 'Salle 3', sub: 'Consultation & Soins', featured: false },
    { img: imgSalle4, label: 'Salle 4', sub: 'Esthétique & Blanchiment', featured: false },
  ]

  return (
    <section id="technologie" className="technologie">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Notre plateau technique</p>
          <h2 className="section-title">4 salles de soins<br /><em>entièrement équipées</em></h2>
          <p className="section-sub reveal">
            Chaque salle est conçue pour une spécialité précise, avec un équipement médical dernière génération et des protocoles d'hygiène stricts.
          </p>
        </div>

        <div className="rooms-grid">
          {rooms.map((r, i) => (
            <div key={i} className={`room-card${r.featured ? ' featured' : ''} reveal reveal-delay-${i + 1}`}>
              <div className="room-img-wrap">
                <img src={r.img} alt={r.label} />
                <div className="room-overlay" />
              </div>
              <div className="room-info">
                <div className="room-label">{r.label}</div>
                <div className="room-sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment highlight */}
        <div className="equipment-strip reveal">
          <div className="equip-item">
            <img src={imgRadio} alt="Carestream" className="equip-img" />
            <div className="equip-text">
              <div className="equip-name">Carestream CS 8200 3D</div>
              <div className="equip-desc">Panoramique & Cone-beam</div>
            </div>
          </div>
          <div className="equip-item">
            <img src={imgSteril} alt="Stérilisation" className="equip-img" />
            <div className="equip-text">
              <div className="equip-name">Unité de Stérilisation</div>
              <div className="equip-desc">Autoclaves Euronda certifiés</div>
            </div>
          </div>
          <div className="equip-item">
            <img src={imgEquipe} alt="Équipe" className="equip-img" />
            <div className="equip-text">
              <div className="equip-name">Équipe Médicale</div>
              <div className="equip-desc">Protocoles stricts & formation continue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
const testimonials = [
  {
    text: "Un accueil chaleureux et un suivi impeccable. Les salles sont ultra-modernes et le Dr. est à l'écoute. Je recommande sans hésiter.",
    name: "Fatima Z.",
    role: "Patiente depuis 3 ans",
  },
  {
    text: "J'ai eu mes implants posés ici et le résultat est parfait. L'équipe est professionnelle et rassurante du début à la fin.",
    name: "Karim B.",
    role: "Implantologie",
  },
  {
    text: "L'espace est propre, moderne et bien organisé. On se sent entre de bonnes mains. Le meilleur cabinet dentaire que j'ai connu.",
    name: "Nadia M.",
    role: "Esthétique dentaire",
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(v => (v + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="testimonials">
      <div className="container">
        <p className="section-eyebrow reveal" style={{textAlign:'center'}}>Avis patients</p>
        <h2 className="section-title reveal" style={{textAlign:'center'}}>Ce que disent<br /><em>nos patients</em></h2>

        <div className="testimonial-carousel reveal">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-item${i === active ? ' active' : ''}`}>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot${i === active ? ' active' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact / Footer ─── */
function Contact() {
  const [form, setForm] = useState({ nom: '', tel: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: send to API / email service
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nom: '', tel: '', service: '', message: '' })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal">
            <p className="section-eyebrow" style={{color:'var(--green-400)'}}>Nous contacter</p>
            <h2 className="section-title" style={{color:'white'}}>Prenez<br /><em>rendez-vous</em></h2>
            <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem', lineHeight:1.7}}>
              Notre équipe vous accueille du lundi au samedi. N'hésitez pas à nous appeler ou à utiliser le formulaire de contact.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Adresse</div>
                  <div className="contact-value">Quartier Polo, Casablanca, Maroc</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Téléphone</div>
                  <div className="contact-value">+212 5XX XX XX XX</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <div className="contact-label">Horaires</div>
                  <div className="contact-value">Lun–Ven · 09h–19h &nbsp;|&nbsp; Sam · 09h–13h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap reveal reveal-delay-2">
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message envoyé !</h3>
                <p>Nous vous recontacterons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={form.nom}
                      onChange={e => setForm(v => ({...v, nom: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      placeholder="+212 6XX XX XX XX"
                      value={form.tel}
                      onChange={e => setForm(v => ({...v, tel: e.target.value}))}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Service souhaité</label>
                  <select
                    value={form.service}
                    onChange={e => setForm(v => ({...v, service: e.target.value}))}
                    required
                  >
                    <option value="">Sélectionner un service…</option>
                    <option>Implantologie</option>
                    <option>Chirurgie orale</option>
                    <option>Esthétique dentaire</option>
                    <option>Radiologie 3D</option>
                    <option>Parodontologie</option>
                    <option>Pédodontie</option>
                    <option>Consultation générale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message (optionnel)</label>
                  <textarea
                    placeholder="Décrivez votre demande…"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(v => ({...v, message: e.target.value}))}
                  />
                </div>
                <button type="submit" className="btn-primary btn-full">
                  Envoyer ma demande
                  <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <svg viewBox="0 0 24 24" fill="currentColor" className="footer-tooth">
            <path d="M12 2C8.5 2 5.5 5 5.5 8.5C5.5 12 7.5 15 9.5 18C10.5 19.5 11 21 12 21C13 21 13.5 19.5 14.5 18C16.5 15 18.5 12 18.5 8.5C18.5 5 15.5 2 12 2Z"/>
          </svg>
          <span>Centre Dentaire Polo</span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Centre Dentaire Polo · Casablanca, Maroc</p>
        <p className="footer-tagline">L'excellence clinique au cœur de Polo.</p>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <LeCentre />
        <Services />
        <Technologie />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
