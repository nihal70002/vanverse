import { useEffect, useRef, useState } from "react";
import shirt from "../assets/images/shirt.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import jeans from "../assets/images/jeans.jpg";

const items = [
  {
    title: "Premium Shirts",
    subtitle: "Refined Essentials",
    desc: "Tailored silhouettes in breathable weaves. From boardroom to boulevard.",
    image: shirt,
    index: "01",
    tag: "Shirts",
  },
  {
    title: "Modern T-Shirts",
    subtitle: "Everyday Luxury",
    desc: "Supima cotton, structured cuts. The foundation of every great wardrobe.",
    image: tshirt,
    index: "02",
    tag: "T-Shirts",
  },
  {
    title: "Classic Denim Jeans",
    subtitle: "Built to Last",
    desc: "Raw selvedge to stretch denim — crafted for men who live without compromise.",
    image: jeans,
    index: "03",
    tag: "Denim",
  },
];

function CollectionCard({ item, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Image container */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        height: "520px",
      }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1.0)",
            filter: hovered ? "saturate(0.75) contrast(1.05)" : "saturate(0.5) contrast(1.1)",
            transition: "transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease",
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(10,10,8,0.88) 0%, rgba(10,10,8,0.2) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(10,10,8,0.7) 0%, rgba(10,10,8,0.1) 60%, transparent 100%)",
          transition: "background 0.6s ease",
        }} />

        {/* Top-left index + tag */}
        <div style={{
          position: "absolute",
          top: "1.6rem",
          left: "1.6rem",
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "rgba(245,240,232,0.35)",
            letterSpacing: "0.05em",
          }}>{item.index}</span>
          <span style={{
            width: "1px",
            height: "14px",
            background: "rgba(245,240,232,0.2)",
          }} />
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.4)",
          }}>{item.tag}</span>
        </div>

        {/* Bottom content */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "2rem 2rem 2.2rem",
        }}>
          {/* Expanding rule */}
          <div style={{
            width: hovered ? "100%" : "2rem",
            height: "1px",
            background: "rgba(245,240,232,0.3)",
            marginBottom: "1.1rem",
            transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
          }} />

          <p style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
            marginBottom: "0.5rem",
          }}>{item.subtitle}</p>

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "1.85rem",
            letterSpacing: "0.06em",
            color: "#f5f0e8",
            margin: "0 0 1rem",
            lineHeight: 1.1,
          }}>{item.title}</h3>

          {/* Description — reveals on hover */}
          <p style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.04em",
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.5)",
            margin: 0,
            maxWidth: "28ch",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}>{item.desc}</p>
        </div>
      </div>

      {/* Hover CTA below card */}
      <div style={{
        height: "1px",
        background: "rgba(245,240,232,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(245,240,232,0.35)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

export default function Collections() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .coll-section {
          background: #f7f3ee;
          padding: 9rem 0 8rem;
          overflow: hidden;
          font-family: 'Tenor Sans', sans-serif;
        }
        .coll-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Header */
        .coll-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .coll-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.1rem;
        }
        .coll-eyebrow-line {
          width: 2rem;
          height: 1px;
          background: rgba(26,26,23,0.3);
        }
        .coll-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.45);
        }
        .coll-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          color: #1a1a17;
          letter-spacing: 0.06em;
          line-height: 1;
          margin: 0;
        }
        .coll-heading em {
          font-style: italic;
          color: rgba(26,26,23,0.4);
        }
        .coll-header-note {
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          line-height: 1.9;
          color: rgba(26,26,23,0.45);
          max-width: 240px;
          border-left: 1px solid rgba(26,26,23,0.15);
          padding-left: 1.5rem;
        }

        /* Grid */
        .coll-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        @media (max-width: 768px) {
          .coll-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        /* Footer strip */
        .coll-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .coll-footer-text {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.35);
        }
        .coll-footer-line {
          flex: 1;
          height: 1px;
          background: rgba(26,26,23,0.12);
        }
        .coll-footer-link {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #1a1a17;
          text-decoration: none;
          border-bottom: 1px solid rgba(26,26,23,0.3);
          padding-bottom: 0.2rem;
          transition: border-color 0.3s;
        }
        .coll-footer-link:hover { border-color: #1a1a17; }
      `}</style>

      <section className="coll-section" id="collections">
        <div className="coll-inner">

          {/* Header */}
          <div
            className="coll-header"
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div>
              <div className="coll-eyebrow">
                <div className="coll-eyebrow-line" />
                <span className="coll-eyebrow-text">SS 2025</span>
              </div>
              <h2 className="coll-heading">
                The<br /><em>Collection</em>
              </h2>
            </div>
            <p className="coll-header-note">
              Three categories. One vision. Menswear that performs as well as it presents — season after season.
            </p>
          </div>

          {/* Cards */}
          <div className="coll-grid">
            {items.map((item, i) => (
              <CollectionCard key={i} item={item} i={i} />
            ))}
          </div>

          {/* Footer */}
          <div
            className="coll-footer"
            style={{
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            <div className="coll-footer-line" />
            <span className="coll-footer-text">3 Categories</span>
            <a href="#contact" className="coll-footer-link">
              Request Catalogue →
            </a>
          </div>

        </div>
      </section>
    </>
  );
}