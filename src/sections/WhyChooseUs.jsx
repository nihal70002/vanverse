import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Premium Fabric Quality",
    desc: "Every thread sourced with precision. We partner with certified mills to deliver weight, drape, and hand-feel that outlasts trends.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "Materials",
  },
  {
    number: "02",
    title: "Modern Stitching Standards",
    desc: "Double-needle finishing, reinforced seams, and calibrated tension—stitching that holds its form wash after wash.",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&q=80",
    tag: "Craft",
  },
  {
    number: "03",
    title: "Bulk Manufacturing Capability",
    desc: "From 500 to 500,000 units—our floor scales without compromise. Capacity built for brands that move fast.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    tag: "Scale",
  },
  {
    number: "04",
    title: "Reliable Delivery Commitment",
    desc: "Timelines aren't suggestions. Our logistics infrastructure ensures your production window is a guarantee, not a guess.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    tag: "Logistics",
  },
  {
    number: "05",
    title: "Consistent Finishing",
    desc: "From first unit to last, every piece passes our 12-point quality audit. Consistency is the hallmark of a brand worth trusting.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    tag: "Quality",
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isLarge = index === 0; // first card spans wider

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "#0e0e0c",
      }}
      className="wcu-card"
    >
      {/* Background image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${feature.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: hovered ? "scale(1.06)" : "scale(1.0)",
        transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        filter: "saturate(0.5) contrast(1.1)",
        opacity: hovered ? 0.55 : 0.35,
      }} />

      {/* Gradient mask */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: hovered
          ? "linear-gradient(160deg, rgba(14,14,12,0.3) 0%, rgba(14,14,12,0.85) 100%)"
          : "linear-gradient(160deg, rgba(14,14,12,0.5) 0%, rgba(14,14,12,0.92) 100%)",
        transition: "background 0.6s ease",
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        padding: isLarge ? "3.5rem" : "2.8rem",
        height: isLarge ? "380px" : "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "4rem",
            fontWeight: 300,
            lineHeight: 1,
            color: "rgba(245,240,232,0.15)",
            letterSpacing: "-0.02em",
          }}>
            {feature.number}
          </span>
          <span style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.38em",
            color: "rgba(245,240,232,0.4)",
            textTransform: "uppercase",
            border: "1px solid rgba(245,240,232,0.15)",
            padding: "0.4rem 0.85rem",
          }}>
            {feature.tag}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          {/* Thin rule */}
          <div style={{
            width: hovered ? "100%" : "2.5rem",
            height: "1px",
            background: "rgba(245,240,232,0.3)",
            transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "1.4rem",
          }} />

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: isLarge ? "2.1rem" : "1.65rem",
            color: "#f5f0e8",
            letterSpacing: "0.04em",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}>
            {feature.title}
          </h3>

          <p style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "0.78rem",
            letterSpacing: "0.03em",
            lineHeight: 1.75,
            color: "rgba(245,240,232,0.5)",
            maxWidth: "36ch",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}>
            {feature.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .wcu-section {
          background: #f7f3ee;
          padding: 8rem 0;
          overflow: hidden;
          font-family: 'Tenor Sans', sans-serif;
        }

        .wcu-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        .wcu-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .wcu-title-block {}

        .wcu-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }
        .wcu-eyebrow-line {
          width: 2.5rem;
          height: 1px;
          background: #1a1a17;
          opacity: 0.35;
        }
        .wcu-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #1a1a17;
          opacity: 0.5;
        }

        .wcu-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3rem, 5.5vw, 5rem);
          line-height: 0.95;
          letter-spacing: 0.06em;
          color: #1a1a17;
          margin: 0;
        }
        .wcu-heading em {
          font-style: italic;
          color: rgba(26,26,23,0.45);
        }

        .wcu-header-right {
          max-width: 280px;
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          line-height: 1.9;
          color: rgba(26,26,23,0.5);
          border-left: 1px solid rgba(26,26,23,0.15);
          padding-left: 1.8rem;
        }

        /* Masonry-like grid: 3 cols, rows auto */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: auto;
          gap: 1.5px;
        }

        /* Last card if odd: center it */
        .wcu-card:last-child:nth-child(odd) {
          grid-column: 2 / 3;
        }

        /* Bottom strip */
        .wcu-strip {
          margin-top: 5rem;
          border-top: 1px solid rgba(26,26,23,0.12);
          padding-top: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .wcu-strip-stat {
          text-align: center;
        }
        .wcu-strip-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 300;
          color: #1a1a17;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .wcu-strip-label {
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(26,26,23,0.4);
          margin-top: 0.4rem;
        }
        .wcu-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(26,26,23,0.15);
        }

        @media (max-width: 768px) {
          .wcu-grid {
            grid-template-columns: 1fr;
          }
          .wcu-card, .wcu-card:last-child:nth-child(odd) {
            grid-column: span 1 !important;
          }
        }
      `}</style>

      <section className="wcu-section">
        <div className="wcu-inner">

          {/* Header */}
          <div
            className="wcu-header"
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div className="wcu-title-block">
              <div className="wcu-eyebrow">
                <div className="wcu-eyebrow-line" />
                <span className="wcu-eyebrow-text">Our Standard</span>
              </div>
              <h2 className="wcu-heading">
                Why <em>Vanverse</em><br />stands apart
              </h2>
            </div>

            <p className="wcu-header-right">
              Every decision we make—from thread count to delivery schedules—is built around one principle: your brand deserves a manufacturer that takes it personally.
            </p>
          </div>

          {/* Cards grid */}
          <div className="wcu-grid">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>

          {/* Stats strip */}
          <div
            className="wcu-strip"
            style={{
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            {[
              { num: "12+", label: "Years in Production" },
              { num: "500K", label: "Units / Month Capacity" },
              { num: "98%", label: "On-Time Delivery Rate" },
              { num: "200+", label: "Brand Partners" },
            ].map((stat, i) => (
              <>
                {i > 0 && <div className="wcu-strip-divider" key={`div-${i}`} />}
                <div className="wcu-strip-stat" key={stat.label}>
                  <div className="wcu-strip-num">{stat.num}</div>
                  <div className="wcu-strip-label">{stat.label}</div>
                </div>
              </>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}