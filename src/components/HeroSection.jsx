import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";

const HeroSection = () => {
  const images = [
    "/assets/images/hero1.jpg",
    "/assets/images/hero2.jpg",
    "/assets/images/hero3.jpg",
    "/assets/images/hero4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero-bg-slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title fade-in-up">
            <span className="text-green">Empowering</span> Every Filipino <span className="text-coral">Household</span>
            <br />
            With A <span className="text-coral">Skilled</span> And <span className="text-green"> Profitable</span> <span>Forex Trader</span>
          </h1>
          
          <p className="hero-subtitle fade-in-up anim-delay-2">
            Hands-on training with real-time market simulations.
          </p>

          <div className="hero-buttons fade-in-up anim-delay-4">
            <a href="#core-brand" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Learn Forex Today
              <span className="arrow-box" style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center' }}>
                <ArrowUpRight size={25} strokeWidth={3} />
              </span>
            </a>
            <a href="#contact" className="btn-secondary">
              Connect With Us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 20px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .hero-bg-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          z-index: 0;
        }

        .hero-bg-slide.active {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 0;
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
          position: relative;
        }

        .hero-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-title {
          color: #ffffff;
          line-height: 1.3;
          font-family: "Unbounded", sans-serif;
          font-weight: 800;
          font-size: clamp(30px, 4vw, 44px);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
          margin: 0;
        }

        .hero-section .text-green {
          color: #32EA7C !important;
        }

        .text-coral {
          color: #F95545;
        }


        .hero-subtitle {
          color: #ffffff;
          font-size: clamp(18px, 2vw, 24px);
          font-family: "Geist Sans", sans-serif;
          font-weight: 400;
          margin: -25px 0 0 0;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 10px 30px;
          font-size: 18px;
          font-weight: 600;
          font-family: "Geist Sans", sans-serif;
          text-decoration: none;
          border-radius: 43px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn-primary {
          background-color: #068c3b;
          color: #ffffff;
        }

        .btn-secondary {
          background-color: rgba(255, 254, 254, 0.24);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .btn-primary:hover, .btn-secondary:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        @keyframes change {
          0% { background-image: url(/assets/images/hero1.jpg); }
          25% { background-image: url(/assets/images/hero2.jpg); }
          50% { background-image: url(/assets/images/hero3.jpg); }
          75% { background-image: url(/assets/images/hero4.jpg); }
          100% { background-image: url(/assets/images/hero1.jpg); }
        }

        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;