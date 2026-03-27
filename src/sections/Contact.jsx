
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const contactDetails = [
  {
    label: "Location",
    value: "Manjeri",
    sub: "India — 560 001",
    icon: "◎",
  },
  {
    label: "Phone",
    value: "+91 XXXXX XXXXX",
    sub: "Mon – Sat, 9am – 6pm IST",
    icon: "◎",
  },
  {
    label: "Email",
    value: "contact@Raviz.com",
    sub: "We reply within 24 hours",
    icon: "◎",
  },
];

export default function Contact() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [formRef, formVisible] = useInView(0.1);
  const [infoRef, infoVisible] = useInView(0.1);

  const [formState, setFormState] = useState({
    name: "", company: "", email: "", quantity: "", message: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormState({ name: "", company: "", email: "", quantity: "", message: "" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .contact-section {
          background: #f7f3ee;
          padding: 9rem 0 0;
          overflow: hidden;
          font-family: 'Tenor Sans', sans-serif;
          position: relative;
        }

        .contact-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 2.5rem;
          position: relative;
        }

        /* ── HEADER ── */
        .contact-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1rem;
        }
        .contact-eyebrow-line {
          width: 2rem; height: 1px;
          background: rgba(26,26,23,0.3);
        }
        .contact-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.45);
        }
        .contact-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 5vw, 4.4rem);
          letter-spacing: 0.06em;
          line-height: 1;
          color: #1a1a17;
          margin: 0;
        }
        .contact-heading em {
          font-style: italic;
          color: rgba(26,26,23,0.4);
        }
        .contact-header-note {
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          line-height: 1.9;
          color: rgba(26,26,23,0.45);
          max-width: 240px;
          border-left: 1px solid rgba(26,26,23,0.15);
          padding-left: 1.5rem;
        }

        /* ── TWO COLUMN ── */
        .contact-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: start;
          margin-bottom: 0;
        }
        @media (max-width: 860px) {
          .contact-layout { grid-template-columns: 1fr; gap: 4rem; }
        }

        /* ── FORM ── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .contact-field {
          position: relative;
          border-bottom: 1px solid rgba(26,26,23,0.15);
          padding: 1.6rem 0 0.6rem;
          margin-bottom: 0.1rem;
          transition: border-color 0.3s;
        }
        .contact-field:focus-within {
          border-color: rgba(26,26,23,0.55);
        }
        .contact-field label {
          position: absolute;
          top: 0.55rem;
          left: 0;
          font-size: 0.55rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.4);
          pointer-events: none;
          transition: color 0.3s;
        }
        .contact-field:focus-within label {
          color: rgba(26,26,23,0.7);
        }
        .contact-field input,
        .contact-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          color: #1a1a17;
          padding: 0;
          resize: none;
        }
        .contact-field textarea {
          height: 90px;
          line-height: 1.7;
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: rgba(26,26,23,0.2);
        }

        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 2rem;
        }
        @media (max-width: 500px) {
          .contact-row { grid-template-columns: 1fr; }
        }

        .contact-submit {
          margin-top: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .contact-btn {
          background: #1a1a17;
          color: #f5f0e8;
          border: none;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          padding: 1.1rem 2.5rem;
          cursor: pointer;
          transition: background 0.3s, letter-spacing 0.3s;
          position: relative;
          overflow: hidden;
        }
        .contact-btn:hover {
          background: #2e2e2a;
          letter-spacing: 0.5em;
        }
        .contact-btn-note {
          font-size: 0.58rem;
          letter-spacing: 0.05em;
          color: rgba(26,26,23,0.35);
          line-height: 1.7;
        }

        /* Sent confirmation */
        .contact-sent {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.55);
          animation: fadeIn 0.5s ease;
        }
        .contact-sent-line {
          width: 1.5rem; height: 1px;
          background: rgba(26,26,23,0.35);
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        /* ── INFO COLUMN ── */
        .contact-info {
          padding-top: 0.5rem;
        }
        .contact-info-card {
          padding: 2rem 0;
          border-bottom: 1px solid rgba(26,26,23,0.1);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.5rem;
          align-items: start;
          opacity: 0;
          transform: translateX(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .contact-info-card.visible {
          opacity: 1;
          transform: none;
        }
        .contact-info-icon {
          font-size: 0.5rem;
          color: rgba(26,26,23,0.25);
          padding-top: 0.3rem;
        }
        .contact-info-label {
          font-size: 0.55rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.35);
          margin-bottom: 0.5rem;
        }
        .contact-info-value {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.25rem;
          letter-spacing: 0.04em;
          color: #1a1a17;
          margin-bottom: 0.3rem;
          line-height: 1.2;
        }
        .contact-info-sub {
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          color: rgba(26,26,23,0.38);
          line-height: 1.6;
        }

        /* Enquiry badge */
        .contact-badge {
          margin-top: 2.5rem;
          border: 1px solid rgba(26,26,23,0.12);
          padding: 1.8rem;
          position: relative;
        }
        .contact-badge-tag {
          position: absolute;
          top: -0.6rem;
          left: 1.5rem;
          background: #f7f3ee;
          padding: 0 0.5rem;
          font-size: 0.55rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.35);
        }
        .contact-badge-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(26,26,23,0.65);
          line-height: 1.6;
        }
        .contact-badge-note {
          margin-top: 0.7rem;
          font-size: 0.62rem;
          letter-spacing: 0.05em;
          color: rgba(26,26,23,0.38);
          line-height: 1.7;
        }

        /* ── DARK FOOTER BAND ── */
        .contact-footer-band {
          margin-top: 7rem;
          background: #0e0e0c;
          padding: 3rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .contact-footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.5rem;
          letter-spacing: 0.25em;
          color: rgba(245,240,232,0.7);
        }
        .contact-footer-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .contact-footer-link {
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          text-decoration: none;
          transition: color 0.3s;
        }
        .contact-footer-link:hover { color: rgba(245,240,232,0.7); }
        .contact-footer-copy {
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          color: rgba(245,240,232,0.2);
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div className="contact-inner">

          {/* Header */}
          <div
            className="contact-header"
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div>
              <div className="contact-eyebrow">
                <div className="contact-eyebrow-line" />
                <span className="contact-eyebrow-text">Get in Touch</span>
              </div>
              <h2 className="contact-heading">
                Let's build<br /><em>something great</em>
              </h2>
            </div>
            <p className="contact-header-note">
              Based in Bangalore. Serving fashion brands across India and internationally. Bulk manufacturing enquiries welcome.
            </p>
          </div>

          {/* Layout */}
          <div className="contact-layout">

            {/* Form */}
            <form
              className="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "none" : "translateY(24px)",
                transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
              }}
            >
              <div className="contact-row">
                <div className="contact-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label>Company / Brand</label>
                  <input
                    type="text"
                    placeholder="Brand name"
                    value={formState.company}
                    onChange={e => setFormState(s => ({ ...s, company: e.target.value }))}
                  />
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@brand.com"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label>Est. Order Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 units"
                    value={formState.quantity}
                    onChange={e => setFormState(s => ({ ...s, quantity: e.target.value }))}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label>Message</label>
                <textarea
                  placeholder="Tell us about your project…"
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                />
              </div>

              <div className="contact-submit">
                {sent ? (
                  <div className="contact-sent">
                    <div className="contact-sent-line" />
                    Message received — we'll be in touch
                  </div>
                ) : (
                  <>
                    <button className="contact-btn" type="submit">
                      Send Enquiry
                    </button>
                    <span className="contact-btn-note">
                      We respond within<br />one business day
                    </span>
                  </>
                )}
              </div>
            </form>

            {/* Info column */}
            <div className="contact-info" ref={infoRef}>
              {contactDetails.map((item, i) => (
                <div
                  key={item.label}
                  className={`contact-info-card ${infoVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="contact-info-icon">{item.icon}</span>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                    <div className="contact-info-sub">{item.sub}</div>
                  </div>
                </div>
              ))}

              <div
                className="contact-badge"
                style={{
                  opacity: infoVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 0.45s",
                }}
              >
                <span className="contact-badge-tag">Enquiries</span>
                <p className="contact-badge-text">
                  "Bulk manufacturing for modern fashion brands — shirts, tees, and denim done right."
                </p>
                <p className="contact-badge-note">
                  Minimum order quantities apply.<br />
                  Samples available on request.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer band */}
        <div className="contact-footer-band">
          <span className="contact-footer-brand">Raviz</span>
          <nav className="contact-footer-links">
            {["Collections", "About", "Gallery", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="contact-footer-link">
                {link}
              </a>
            ))}
          </nav>
          <span className="contact-footer-copy">
            © {new Date().getFullYear()} Raviz. Bangalore, India.
          </span>
        </div>

      </section>
    </>
  );
}