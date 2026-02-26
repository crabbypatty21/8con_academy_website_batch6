import React, { useState, useEffect } from "react";
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${images[currentIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <img src="/src/assets/images/8con_logo.png" alt="pn" style={{ width: '200px', height: 'auto' }} />
          <h1 className="hero-title">
            <span className="text-green">Empowering</span> Every Filipino <span className="text-coral">Household</span>
            <br />
            With A Skilled And Profitable <span className="text-green">Forex Trader</span>
          </h1>
          
          <p className="hero-subtitle">
            Hands-on training with real-time market simulations.
          </p>

          <div className="hero-buttons">
            <a href="#core-brand" className="btn-primary">
              Learn Forex Today
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
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px 20px;
          transition: background-image 1s ease-in-out;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Darkened slightly for better text readability */
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
          font-family: "Roboto", sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4vw, 55px);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
          margin: 0;
        }

        .text-green {
          color: #21e67b; /* Matches the green in the image */
        }

        .text-coral {
          color: #ff5a5a; /* Matches the coral/red in the image */
        }

        .hero-subtitle {
          color: #ffffff;
          font-size: clamp(18px, 2vw, 24px);
          font-family: "Roboto", sans-serif;
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
          text-decoration: none;
          border-radius: 5px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn-primary {
          background-color: #068c3b;
          color: #ffffff;
        }

        .btn-secondary {
          background-color: #990f17;
          color: #ffffff;
        }

        .btn-primary:hover, .btn-secondary:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        @keyframes change {
          0% { background-image: url(../public/assets/images/hero1.jpg); }
          25% { background-image: url(../public/assets/images/hero2.jpg); }
          50% { background-image: url(../public/assets/images/hero3.jpg); }
          75% { background-image: url(../assets/images/hero4.jpg); }
          100% { background-image: url(../assets/images/hero1.jpg); }
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