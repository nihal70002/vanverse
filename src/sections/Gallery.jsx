import { useEffect, useRef, useState } from "react";
import img1 from "../assets/images/gallery1.jpg";
import img2 from "../assets/images/gallery2.jpg";
import img3 from "../assets/images/gallery3.jpg";
import img4 from "../assets/images/gallery4.jpg";
import img6 from "../assets/images/gallery6.jpg";
import img7 from "../assets/images/gallery7.jpg";
import img8 from "../assets/images/gallery8.jpg";

const galleryImages = [
  { src: img1, alt: "Premium shirt detail", span: "tall" },
  { src: img2, alt: "Modern menswear", span: "normal" },
  { src: img3, alt: "T-shirt texture", span: "normal" },
  { src: img4, alt: "Denim close-up", span: "wide" },
  { src: img6, alt: "Fabric detail", span: "normal" },
  { src: img7, alt: "Product look", span: "tall" },
  { src: img8, alt: "Garment fold", span: "normal" },
];

function GalleryItem({ img, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const spanClass =
    img.span === "tall" ? "gallery-item-tall" :
    img.span === "wide" ? "gallery-item-wide" : "";

  return (
    <div
      ref={ref}
      className={`gallery-item ${spanClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1.0)",
          filter: hovered ? "saturate(0.8) contrast(1.05)" : "saturate(0.45) contrast(1.1)",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease",
        }}
      />

      {/* Hover overlay */}
      <div
        className="gallery-item-overlay"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div className="gallery-item-label">
          <div className="gallery-item-rule" style={{ width: hovered ? "2rem" : "0" }} />
          <span>{img.alt}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
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

        .gallery-section {
          background: #0e0e0c;
          padding: 9rem 0 8rem;
          overflow: hidden;
          font-family: 'Tenor Sans', sans-serif;
          position: relative;
        }
        .gallery-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.025;
          pointer-events: none;
        }

        .gallery-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
        }

        /* Header */
        .gallery-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4.5rem;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .gallery-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1rem;
        }
        .gallery-eyebrow-line {
          width: 2rem; height: 1px;
          background: rgba(245,240,232,0.25);
        }
        .gallery-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
        }
        .gallery-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 5vw, 4.4rem);
          letter-spacing: 0.06em;
          line-height: 1;
          color: #f5f0e8;
          margin: 0;
        }
        .gallery-heading em {
          font-style: italic;
          color: rgba(245,240,232,0.4);
        }
        .gallery-header-note {
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          line-height: 1.9;
          color: rgba(245,240,232,0.35);
          max-width: 230px;
          border-left: 1px solid rgba(245,240,232,0.12);
          padding-left: 1.5rem;
        }

        /* ── MASONRY GRID ── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 3px;
        }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 200px;
          }
          .gallery-item-wide { grid-column: span 2; }
          .gallery-item-tall { grid-row: span 2; }
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
          }
          .gallery-item-wide { grid-column: span 2; }
          .gallery-item-tall { grid-row: span 2; }
        }
        @media (max-width: 400px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 240px;
          }
          .gallery-item-wide,
          .gallery-item-tall {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        /* Card */
        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a17;
        }
        .gallery-item-tall { grid-row: span 2; }
        .gallery-item-wide { grid-column: span 2; }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Overlay */
        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,10,8,0.75) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 1.2rem 1.4rem;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .gallery-item-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.58rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.65);
        }
        .gallery-item-rule {
          height: 1px;
          background: rgba(245,240,232,0.4);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }

        /* Footer */
        .gallery-footer {
          margin-top: 4rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .gallery-footer-line {
          flex: 1; height: 1px;
          background: rgba(245,240,232,0.08);
        }
        .gallery-footer-count {
          font-size: 0.58rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
        }
      `}</style>

      <section className="gallery-section" id="gallery">
        <div className="gallery-inner">

          {/* Header */}
          <div
            className="gallery-header"
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div>
              <div className="gallery-eyebrow">
                <div className="gallery-eyebrow-line" />
                <span className="gallery-eyebrow-text">Visual Journal</span>
              </div>
              <h2 className="gallery-heading">
                Craft in<br /><em>Every Frame</em>
              </h2>
            </div>
            <p className="gallery-header-note">
              A look inside the details — fabric, form, and finish that define the Raviz standard.
            </p>
          </div>

          {/* Masonry grid */}
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <GalleryItem key={i} img={img} index={i} />
            ))}
          </div>

          {/* Footer */}
          <div
            className="gallery-footer"
            style={{
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <div className="gallery-footer-line" />
            <span className="gallery-footer-count">
              {galleryImages.length} Images
            </span>
          </div>

        </div>
      </section>
    </>
  );
}