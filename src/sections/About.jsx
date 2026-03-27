import { useEffect, useRef, useState } from "react";
import shirtImg from "../assets/images/shirt.jpg";
import tshirtImg from "../assets/images/tshirt.jpg";
import jeansImg from "../assets/images/jeans.jpg";

const pillars = [
  { label: "Comfort", icon: "◈" },
  { label: "Durability", icon: "◈" },
  { label: "Contemporary Style", icon: "◈" },
  { label: "Reliable Production", icon: "◈" },
];

const products = [
  { name: "Premium Shirts", img: shirtImg },
  { name: "T-Shirts", img: tshirtImg },
  { name: "Denim & Jeans", img: jeansImg },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function About() {
  const [secRef, secVisible] = useInView(0.1);
  const [imgRef, imgVisible] = useInView(0.15);
  const [textRef, textVisible] = useInView(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap');

        .about-section {
          background: #0e0e0c;
          padding: 10rem 0 8rem;
          overflow: hidden;
          font-family: 'Tenor Sans', sans-serif;
          position: relative;
        }

        /* Subtle background texture */
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.028;
          pointer-events: none;
        }

        .about-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 2.5rem;
          position: relative;
        }

        /* ── TOP LABEL ── */
        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 5rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .about-eyebrow.visible {
          opacity: 1;
          transform: none;
        }
        .about-eyebrow-line {
          flex: 1;
          height: 1px;
          background: rgba(245,240,232,0.12);
        }
        .about-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
        }

        /* ── MAIN TWO-COLUMN LAYOUT ── */
        .about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        @media (max-width: 860px) {
          .about-layout { grid-template-columns: 1fr; gap: 4rem; }
          .about-images { order: -1; }
        }

        /* ── IMAGE COLUMN ── */
        .about-images {
          position: relative;
          height: 580px;
        }

        .about-img {
          position: absolute;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .about-img.visible { opacity: 1; }

        .about-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.55) contrast(1.05);
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1);
          display: block;
        }
        .about-img:hover img { transform: scale(1.05); }

        /* three overlapping cards */
        .about-img-a {
          width: 65%;
          height: 72%;
          top: 0; left: 0;
          transform: translateX(-20px);
          z-index: 3;
        }
        .about-img-a.visible { transform: translateX(0); }

        .about-img-b {
          width: 52%;
          height: 55%;
          bottom: 0; right: 0;
          transform: translateY(20px);
          transition-delay: 0.15s;
          z-index: 4;
          box-shadow: -8px -8px 40px rgba(0,0,0,0.6);
        }
        .about-img-b.visible { transform: translateY(0); }

        .about-img-c {
          width: 38%;
          height: 35%;
          bottom: 30%;
          right: 8%;
          transform: translateY(16px);
          transition-delay: 0.3s;
          z-index: 2;
          opacity: 0;
        }
        .about-img-c.visible { opacity: 0.45; transform: translateY(0); }

        /* Product label tags on images */
        .about-img-label {
          position: absolute;
          bottom: 0; left: 0;
          background: rgba(14,14,12,0.75);
          backdrop-filter: blur(8px);
          font-size: 0.55rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.55);
          padding: 0.5rem 0.85rem;
          z-index: 5;
        }

        /* Decorative vertical text */
        .about-vert-text {
          position: absolute;
          left: -3rem;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.55rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.18);
          white-space: nowrap;
        }

        /* ── TEXT COLUMN ── */
        .about-text {
          padding-top: 1rem;
        }

        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: 0.05em;
          color: #f5f0e8;
          margin: 0 0 2.5rem;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
        }
        .about-heading.visible { opacity: 1; transform: none; }
        .about-heading em {
          font-style: italic;
          color: rgba(245,240,232,0.45);
        }

        /* Thin rule */
        .about-rule {
          width: 0;
          height: 1px;
          background: rgba(245,240,232,0.25);
          margin-bottom: 2.5rem;
          transition: width 1s cubic-bezier(0.16,1,0.3,1) 0.3s;
        }
        .about-rule.visible { width: 5rem; }

        .about-body {
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          line-height: 2;
          color: rgba(245,240,232,0.48);
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s;
        }
        .about-body.visible { opacity: 1; transform: none; }

        /* Pillars list */
        .about-pillars {
          list-style: none;
          padding: 0;
          margin: 0 0 3.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem 2rem;
        }
        .about-pillar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.5);
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-pillar.visible { opacity: 1; transform: none; }
        .about-pillar-icon {
          color: rgba(245,240,232,0.2);
          font-size: 0.5rem;
        }

        /* CTA */
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 1.2rem;
          font-size: 0.6rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #f5f0e8;
          text-decoration: none;
          border-bottom: 1px solid rgba(245,240,232,0.25);
          padding-bottom: 0.5rem;
          opacity: 0;
          transition: opacity 0.8s ease 0.5s, gap 0.3s ease, border-color 0.3s ease;
        }
        .about-cta.visible { opacity: 1; }
        .about-cta:hover { gap: 1.8rem; border-color: rgba(245,240,232,0.6); }
        .about-cta-arrow { font-size: 0.75rem; }

        /* ── BOTTOM MARQUEE ── */
        .about-marquee-wrap {
          margin-top: 8rem;
          overflow: hidden;
          border-top: 1px solid rgba(245,240,232,0.08);
          border-bottom: 1px solid rgba(245,240,232,0.08);
          padding: 1.5rem 0;
        }
        .about-marquee {
          display: flex;
          gap: 4rem;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
        }
        .about-marquee-item {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          color: rgba(245,240,232,0.18);
          flex-shrink: 0;
        }
        .about-marquee-sep {
          color: rgba(245,240,232,0.1);
          font-style: normal;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="about-section" id="about" ref={secRef}>
        <div className="about-inner">

          {/* Eyebrow */}
          <div className={`about-eyebrow ${secVisible ? "visible" : ""}`}>
            <div className="about-eyebrow-line" />
            <span className="about-eyebrow-text">Our Story</span>
            <div className="about-eyebrow-line" />
          </div>

          {/* Two-column layout */}
          <div className="about-layout">

            {/* Image column */}
            <div className="about-images" ref={imgRef}>
              <span className="about-vert-text">Raviz — Est. 2024</span>

              <div className={`about-img about-img-a ${imgVisible ? "visible" : ""}`}>
                <img src={products[0].img} alt={products[0].name} />
                <span className="about-img-label">{products[0].name}</span>
              </div>

              <div className={`about-img about-img-b ${imgVisible ? "visible" : ""}`}>
                <img src={products[2].img} alt={products[2].name} />
                <span className="about-img-label">{products[2].name}</span>
              </div>

              <div className={`about-img about-img-c ${imgVisible ? "visible" : ""}`}>
                <img src={products[1].img} alt={products[1].name} />
              </div>
            </div>

            {/* Text column */}
            <div className="about-text" ref={textRef}>
              <h2 className={`about-heading ${textVisible ? "visible" : ""}`}>
                Made for the<br />
                <em>modern man</em><br />
                who moves.
              </h2>

              <div className={`about-rule ${textVisible ? "visible" : ""}`} />

              <p className={`about-body ${textVisible ? "visible" : ""}`}>
                Raviz is a modern menswear manufacturing brand specialising in premium shirts, T-shirts, and jeans. We exist at the intersection of comfort, craft, and contemporary form — built for fashion markets that demand both reliability and refinement.
                <br /><br />
                From first sketch to final stitch, every piece we produce is held to a standard that respects the wearer's time, taste, and investment.
              </p>

              <ul className="about-pillars">
                {pillars.map((p, i) => (
                  <li
                    key={p.label}
                    className={`about-pillar ${textVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${0.35 + i * 0.1}s` }}
                  >
                    <span className="about-pillar-icon">{p.icon}</span>
                    {p.label}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`about-cta ${textVisible ? "visible" : ""}`}>
                Work with us
                <span className="about-cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="about-marquee-wrap">
          <div className="about-marquee">
            {Array(2).fill([
              "Premium Shirts", "·", "Denim & Jeans", "·",
              "Modern Menswear", "·", "T-Shirts", "·",
              "Crafted in Quality", "·", "Raviz", "·",
            ]).flat().map((word, i) => (
              <span
                key={i}
                className={`about-marquee-item ${word === "·" ? "about-marquee-sep" : ""}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}