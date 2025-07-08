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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${images[currentIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
       <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-image-container">
          <img
            src="/assets/logo/herologo.png"
            alt="8Con Academy Logo"
            className="hero-image"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Every Filipino Household with a Skilled and Profitable
            Forex Trader
          </h1>

          <div className="hero-buttons">
            <a href="#core-brand" className="btn-primary">
              Learn Forex Today
            </a>
            <a href="#contact" className="btn-secondary">
              Connect With Us
            </a>
          </div>

          <div className="card-container">
            <a href="#about" className="card-link">
              <div className="card">
                <div className="first-content">
                  <img src="/assets/images/workshop.jpg" alt="Workshop" />
                </div>
                <div className="second-content">
                  <img src="/assets/images/workshop.jpg" alt="Workshop" />
                  <span className="overlay-text">WORKSHOP</span>
                </div>
              </div>
            </a>

            <Link to="#news" className="card-link">
              <div className="card">
                <div className="first-content">
                  <img src="/assets/images/blog.jpg" alt="Blog" />
                </div>
                <div className="second-content">
                  <img src="/assets/images/blog.jpg" alt="Blog" />
                  <span className="overlay-text">BLOGS</span>
                </div>
              </div>
            </Link>

            <a href="#core-brand" className="card-link">
              <div className="card">
                <div className="first-content">
                  <img src="/assets/images/testimonials.jpg" alt="Testimonials" />
                </div>
                <div className="second-content">
                  <img src="/assets/images/testimonials.jpg" alt="Testimonials" />
                  <span className="overlay-text">TESTIMONIALS</span>
                </div>
              </div>
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
  padding: 80px 10px 10px;
  transition: background-image 1s ease-in-out;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* ⬅️ semi-transparent gray */
  z-index: 0;
  transition: background 0.5s ease-in-out;
}

/* Optional: overlay for readability */
.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 0;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  gap: 64px;
  align-items: center;
  z-index: 1; /* on top of the background */
  position: relative;
}
@keyframes change {
  0% {
    background-image: url(../public/assets/images/hero1.jpg);
  }
  25% {
    background-image: url(../public/assets/images/hero2.jpg);
  }
  50% {
    background-image: url(../public/assets/images/hero3.jpg);
  }
  75% {
    background-image: url(../assets/images/hero4.jpg);
  }
  100% {
    background-image: url(../assets/images/hero1.jpg);
  }
}

.hero-content {
  text-align: center;
  display: grid;
  align-items: center;
  gap: 2rem;
}

.hero-title {
  color: #ffffff;
  line-height: 1.2;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 45px;
  filter: drop-shadow(0 0 5px #121411) drop-shadow(0 0 10px #121411)
    drop-shadow(0 0 15px #121411);
}

.hero-image-container {
  display: flex;
  justify-content: center;
}

.hero-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 5px #121411) drop-shadow(0 0 10px #121411)
    drop-shadow(0 0 15px #121411);
}

.hero-image-placeholder {
  width: 100%;
  max-width: 400px;
  height: 256px;
  background-color: #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  filter: drop-shadow(0 0 8px #121411) drop-shadow(0 0 16px #121411)
    drop-shadow(0 0 24px #121411);
}
@media (min-width: 2560px) {
  .logo-img {
    height: clamp(40px, 3vw, 80px);
    width: auto;
  }

  .nav-link {
    font-size: clamp(14px, 1vw, 30px);
  }

  .dropdown-content a {
    font-size: clamp(14px, 1vw, 18px);
  }

  .hero-section {
    min-height: 1575px;
  }
  .hero-title {
    font-size: 6rem;
  }

  .hero-image {
    max-width: clamp(300px, 40vw, 1000px);
  }
  .hero-container {
    max-width: 2000px;
    max-height: 1500px;
    gap: clamp(2rem, 5vw, 6rem);
  }

  .hero-subtitle {
    font-size: 1.5rem;
    max-width: 1000px;
  }

  .hero-buttons {
    font-size: 2.25rem;
  }

  .card-container {
    max-width: 1000px;
  }

  .feature-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }

  .faq-section {
    max-width: 1800px;
    margin: 0 auto;
    padding: 100px 10%;
  }

  .footer {
    padding: 60px 10%;
    font-size: 18px;
  }
}
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .nav-link {
    font-family: "Montserrat", sans-serif;
    font-size: 9.5px;
  }

  .logo-img {
    height: 30px;
    width: 100%;
  }

  .hero-container {
    grid-template-columns: 1fr;
  }

  .hero-image-container {
    order: 2;
  }

  .hero-content {
    order: 1;
  }

  .hero-title {
    font-size: 32px;
  }

  .contact-content {
    flex-direction: column;
  }

  .footer-bottom-content {
    flex-direction: column;
  }

  .footer-bottom-links {
    margin-top: 16px;
  }

  .carousel-button-prev {
    left: -20px;
  }

  .carousel-button-next {
    right: -20px;
  }

  .core-brand-content {
    grid-template-columns: 1fr;
    gap: 60px;
    margin-bottom: 80px;
  }

  .core-brand-features,
  .core-brand-cta {
    padding: 32px;
  }

  .core-brand-header {
    margin-bottom: 60px;
  }
}
  @media (min-width: 1024px) {
  .intcards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    justify-items: center;
    max-width: 700px;
    margin: 0 auto;
  }

  .intcard {
    width: 300px;
    height: 400px;
  }

  .intcard .intcontent {
    padding: 25px;
  }

  .intcard-title {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .intcard-description {
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .hero-container {
    grid-template-columns: 1fr 1fr;
  }

  .hero-image-container {
    order: 1;
  }

  .hero-content {
    order: 2;
    text-align: left;
  }

  .hero-buttons {
    justify-content: flex-start;
  }

  .contact-content {
    flex-direction: row;
  }

  .footer-bottom-content {
    flex-direction: row;
  }

  .footer-bottom-links {
    margin-top: 0;
  }
  .footer-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
  @media (max-width: 768px) {
  @media (max-width: 768px) {
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
    }
    .intcard .intcontent {
      width: 100%;
      height: auto;
    }

    .hero-image-container {
      order: 1;
      padding-bottom: 0; /* remove big space under logo on small screen */
    }

    .hero-title {
      order: 2;
      font-size: 2rem;
    }

    .hero-buttons {
      order: 3;
      width: 100%;
    }

    .hero-buttons a {
      width: 100%;
      text-align: center;
    }

    .card-container {
      order: 4;
    }
  }
  .mvv-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }

  .mvv-card {
    padding: 30px 20px;
  }

  .about-main-title {
    font-size: 2.5rem;
  }

  .hero-buttons {
    width: 100%;
  }

  .hero-buttons a {
    width: 100%;
    text-align: center;
  }

  .search-input:focus,
  .search-input.expanded {
    z-index: 999;
    width: 150px;
  }

  .faq-list {
    grid-template-columns: 1fr; /* <== DELETE this */
  }
  .testimonials-section {
    padding: 3rem 0;
  }

  .testimonials-container {
    padding: 0 1rem;
  }

  .testimonials-header {
    margin-bottom: 3rem;
  }

  .carousel-button {
    width: 50px;
    height: 50px;
  }

  .carousel-button-prev {
    left: -10px;
  }

  .carousel-button-next {
    right: -10px;
  }

  .testimonial-card {
    border-radius: 20px;
  }

  .testimonial-text {
    font-size: 1.2rem;
  }

  .testimonial-footer {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .intcards-container {
    flex-direction: column;
    gap: 20px;
  }

  .internship-title h1,
  .careerpath-title h1 {
    font-size: 2rem;
  }

  .core-brand-section {
    padding: 60px 20px;
  }
}
  @media (min-width: 767px) and (max-width: 768px) {
  .hero-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 150px 20px 20px;
  }
  .hero-image {
    width: 80%;
  }
}
@media (max-width: 766px) {
  .card-container {
    flex-direction: column;
  }
  .hero-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 140px 20px 20px;
  }

  .hero-title {
    font-size: 28px;
  }

  .card-container {
    gap: 1.5rem;
    align-items: center;
  }
}
  @media (max-width: 767px) {
  .hero-buttons {
    flex-direction: column;
  }
}
  @media (max-width: 768px) {
  .hero-section {
    animation: change-mobile 20s infinite ease-in-out;
  }
}
  @keyframes change-mobile {
  0% {
    background-image: url(../public/assets/images/mobile-hero1.jpg);
  }
  25% {
    background-image: url(../public/assets/images/mobile-hero2.jpg);
  }
  50% {
    background-image: url(../public/assets/images/mobile-hero3.jpg);
  }
  75% {
    background-image: url(../assets/images/mobile-hero4.jpg);
  }
  100% {
    background-image: url(../assets/images/mobile-hero1.jpg);
  }
}
`}</style>
    </section>
  );
};

export default HeroSection;
