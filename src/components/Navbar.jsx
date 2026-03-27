import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef(null);

  // Scroll detection — switch to frosted background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.5s ease, backdrop-filter 0.5s ease, padding 0.4s ease, border-color 0.5s ease;
          font-family: 'Tenor Sans', sans-serif;
        }
        .nav-root.scrolled {
          background: rgba(14,14,12,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(245,240,232,0.07);
        }
        .nav-root:not(.scrolled) {
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.4s ease;
        }
        .nav-root.scrolled .nav-inner {
          height: 64px;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          text-decoration: none;
          cursor: pointer;
        }
        .nav-logo-main {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.55rem;
          letter-spacing: 0.32em;
          color: #f5f0e8;
          line-height: 1;
          transition: color 0.3s;
        }
        .nav-logo-sub {
          font-size: 0.48rem;
          letter-spacing: 0.48em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          transition: color 0.3s;
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }

        .nav-link {
          position: relative;
          font-size: 0.58rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.55);
          text-decoration: none;
          padding-bottom: 0.25rem;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: rgba(245,240,232,0.55);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover,
        .nav-link.active {
          color: #f5f0e8;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
          background: rgba(245,240,232,0.8);
        }

        /* ── RIGHT SIDE — CTA + HAMBURGER ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-cta {
          display: none;
          font-size: 0.55rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #1a1a17;
          background: #f5f0e8;
          text-decoration: none;
          padding: 0.65rem 1.4rem;
          transition: background 0.3s, letter-spacing 0.3s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #e8e3db;
          letter-spacing: 0.46em;
        }
        @media (min-width: 769px) {
          .nav-cta { display: inline-block; }
        }

        /* ── HAMBURGER ── */
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 110;
        }
        @media (max-width: 768px) {
          .nav-burger { display: flex; }
        }
        .nav-burger-line {
          width: 100%;
          height: 1px;
          background: #f5f0e8;
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.3s ease,
                      width 0.3s ease;
        }
        .nav-burger.open .nav-burger-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .nav-burger.open .nav-burger-line:nth-child(2) {
          opacity: 0; width: 0;
        }
        .nav-burger.open .nav-burger-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── MOBILE MENU OVERLAY ── */
        .nav-mobile {
          position: fixed;
          inset: 0;
          background: #0e0e0c;
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .nav-mobile.open {
          opacity: 1;
          pointer-events: all;
        }

        .nav-mobile-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.025;
          pointer-events: none;
        }

        .nav-mobile-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
        }

        .nav-mobile-link {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 10vw, 4.5rem);
          letter-spacing: 0.08em;
          color: rgba(245,240,232,0.25);
          text-decoration: none;
          text-align: center;
          padding: 0.6rem 2rem;
          width: 100%;
          position: relative;
          transition: color 0.3s;
          transform: translateY(20px);
          opacity: 0;
          transition: color 0.3s, opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-mobile.open .nav-mobile-link {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-mobile-link:hover { color: #f5f0e8; }
        .nav-mobile-link::before {
          content: attr(data-num);
          position: absolute;
          left: max(2rem, calc(50% - 180px));
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.35em;
          color: rgba(245,240,232,0.2);
        }

        .nav-mobile-footer {
          position: absolute;
          bottom: 3rem;
          left: 0; right: 0;
          display: flex;
          justify-content: center;
          gap: 3rem;
          opacity: 0;
          transition: opacity 0.5s ease 0.5s;
        }
        .nav-mobile.open .nav-mobile-footer {
          opacity: 1;
        }
        .nav-mobile-footer-item {
          font-size: 0.55rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }
      `}</style>

      {/* Main navbar */}
      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <a href="#" className="nav-logo">
            <span className="nav-logo-main">RAMIZ</span>
            <span className="nav-logo-sub">Modern Menswear</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? "active" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nav-right">
            <a href="#contact" className="nav-cta">Enquire Now</a>

            {/* Hamburger */}
            <button
              className={`nav-burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <div className="nav-mobile-noise" />
        <div className="nav-mobile-inner">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-mobile-link"
              data-num={`0${i + 1}`}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 80 + 100}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-mobile-footer">
          <span className="nav-mobile-footer-item">Bangalore, India</span>
          <span className="nav-mobile-footer-item">Est. 2024</span>
          <span className="nav-mobile-footer-item">Menswear</span>
        </div>
      </div>
    </>
  );
}