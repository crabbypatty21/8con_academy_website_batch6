import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../App.css";
import Registration from "./Registration.jsx";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <a href="#home" className="logo">
          <img
            src="/assets/logo/8con Academy Logo White.png"
            alt="8Con Academy Logo"
            className="logo-img"
          />
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <nav className="desktop-nav">
          <a href="#home" className="nav-link">
            Home
          </a>

          <div className="dropdown">
            <a href="#core-brand" className="nav-link">
              Brands ▾
            </a>
            <div className="dropdown-content">
              <a href="#core-brand" className="dropdown-link">
                Core Brands
              </a>
              <Link to="/sub-brands" className="dropdown-link">
                Sub-brands
              </Link>
            </div>
          </div>

          <a href="#about" className="nav-link">
            About Us
          </a>

          <div className="dropdown">
            <a href="#internship" className="nav-link">
              Careers ▾
            </a>
            <div className="dropdown-content">
              <a href="#careerpath" className="dropdown-link">
                Career Paths
              </a>
              <a href="#internship" className="dropdown-link">
                Internship
              </a>
            </div>
          </div>

          <a href="https://8conacademy.blogspot.com/" target="no_blank" className="nav-link">
            Newsletters
          </a>
          <a href="/registration" className="nav-link">
            Register Here!
          </a>
        </nav>

        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <a
              href="#home"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#core-brand"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Core Brands
            </a>
            <Link
              to="/sub-brands"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sub-brands
            </Link>
            <a
              href="#news"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletters
            </a>
            <a
              href="#internship"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Internship
            </a>
            <a
              href="#careerpath"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Career Paths
            </a>
            <a
              href="#about"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
          </nav>
        )}
      </div>
      <style>{`.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: transparent; /* transparent initially */
  padding: 10px 5%;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  transition: background-color 0.8s ease, box-shadow 0.8s ease;
}

.header.scrolled {
  background-color: rgb(0, 0, 0); /* optional slight bg */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5%;
  padding-left: 5%;
}

.header-font {
  font-family: "Montserrat", sans-serif;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-placeholder {
  height: 40px;
  width: 128px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: rgb(255, 255, 255);
  padding: 0px 15px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 10%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff9d9f, #ff1f2c);
  transition: width 0.3s ease;
  transform: translateX(0%);
}

.nav-link:hover {
  color: #ff1f2c;
  transform: translateY(-5px);
}

.nav-link:hover::before {
  width: 80%;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 5px 0;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.dropdown-content a,
.dropdown-link {
  display: block;
  padding: 10px 15px;
  color: #121411;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
}

.dropdown-content a:hover,
.dropdown-link:hover {
  background-color: white;
  color: #ff1f2c;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 60px; /* adjust to match header height */
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  text-decoration: none;
  color: #121411;
  border-bottom: 1px solid #f3f4f6;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}

.mobile-nav-link:hover {
  background-color: #f9fafb;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: white;
}

.mobile-dropdown {
  position: relative;
}

.mobile-dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mobile-dropdown-content {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  margin: 0.5rem 1rem;
}

.mobile-nav-sublink {
  display: block;
  padding: 0.75rem 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-sublink:last-child {
  border-bottom: none;
}

.mobile-nav-sublink:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* ==========================================
   MOBILE NAVIGATION - BLURRY TRANSPARENT DESIGN
   ========================================== */

/* Header adjustments for mobile */
@media (max-width: 1024px) {
  .header {
    transition: all 0.3s ease;
  }

  .header.scrolled {
    background: #000000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  /* Mobile navigation menu */
  .mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #000000;
    z-index: 998;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile navigation links */
  .mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  /* Hover effect for mobile links */
  .mobile-nav-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #0edb61;
    padding-left: 32px;
    border-left: 3px solid #0edb61;
  }

  .mobile-nav-link:hover::before {
    left: 100%;
  }

  .mobile-nav-link:last-child {
    border-bottom: none;
  }

  /* Active/pressed state */
  .mobile-nav-link:active {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(0.98);
  }

  /* Logo adjustments for mobile */
  .logo-img {
    height: 35px;
    transition: all 0.3s ease;
  }

  /* Header container adjustments */
  .header-container {
    padding-right: 20px;
    padding-left: 20px;
  }
}

/* ==========================================
   TABLET SPECIFIC ADJUSTMENTS
   ========================================== */
@media (max-width: 1024px) and (min-width: 769px) {
  .mobile-nav-link {
    padding: 18px 32px;
    font-size: 17px;
  }

  .logo-img {
    height: 38px;
  }
}

/* ==========================================
   MOBILE LARGE (768px and below)
   ========================================== */
@media (max-width: 768px) {
  .header {
    padding: 8px 4%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.85);
  }

  .mobile-nav-link {
    padding: 15px 20px;
    font-size: 15px;
  }

  .logo-img {
    height: 32px;
  }

  .header-container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

/* ==========================================
   MOBILE MEDIUM (480px and below)
   ========================================== */
@media (max-width: 480px) {
  .header {
    padding: 6px 3%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  .mobile-nav-link {
    padding: 14px 18px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  .mobile-menu-toggle {
    padding: 6px;
    font-size: 16px;
  }

  .logo-img {
    height: 28px;
  }

  .header-container {
    padding-right: 12px;
    padding-left: 12px;
  }
}

/* ==========================================
   MOBILE SMALL (375px and below)
   ========================================== */
@media (max-width: 375px) {
  .header {
    padding: 5px 2%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.92);
  }

  .mobile-nav-link {
    padding: 12px 16px;
    font-size: 13px;
  }

  .mobile-menu-toggle {
    padding: 5px;
    font-size: 15px;
  }

  .logo-img {
    height: 26px;
  }

  .header-container {
    padding-right: 10px;
    padding-left: 10px;
  }
}

/* ==========================================
   MOBILE EXTRA SMALL (320px and below)
   ========================================== */
@media (max-width: 320px) {
  .header {
    padding: 4px 2%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.95);
  }

  .mobile-nav-link {
    padding: 11px 14px;
    font-size: 12px;
  }

  .mobile-menu-toggle {
    padding: 4px;
    font-size: 14px;
  }

  .logo-img {
    height: 24px;
  }

  .header-container {
    padding-right: 8px;
    padding-left: 8px;
  }
}

/* ==========================================
   ADDITIONAL ENHANCEMENTS
   ========================================== */

/* Smooth scrolling when clicking mobile nav links */
@media (max-width: 1024px) {
  html {
    scroll-behavior: smooth;
  }

  /* Add a subtle glow effect to the mobile menu */
  .mobile-nav::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 219, 97, 0.5),
      transparent
    );
    animation: shimmerLine 3s ease-in-out infinite;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Focus states for accessibility */
  .mobile-nav-link:focus-visible {
    outline: 2px solid #0edb61;
    outline-offset: -2px;
    background: rgba(14, 219, 97, 0.1);
  }

  /* Improved touch targets */
  .mobile-menu-toggle {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-link {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}

/* ==========================================
   DARK MODE COMPATIBILITY
   ========================================== */
@media (prefers-color-scheme: dark) and (max-width: 1024px) {
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    border-top-color: rgba(255, 255, 255, 0.15);
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }

  .mobile-nav-link {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
}

/* ==========================================
   REDUCED MOTION ACCESSIBILITY
   ========================================== */
@media (prefers-reduced-motion: reduce) and (max-width: 1024px) {
  .mobile-nav {
    animation: none;
  }

  .mobile-nav-link::before {
    transition: none;
  }

  .mobile-nav-link:hover::before {
    left: 0;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.5;
    }
  }
}

/* ==========================================
   ADDITIONAL ENHANCEMENTS
   ========================================== */

/* Smooth scrolling when clicking mobile nav links */
@media (max-width: 1024px) {
  html {
    scroll-behavior: smooth;
  }

  /* Add a subtle glow effect to the mobile menu */
  .mobile-nav::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 219, 97, 0.5),
      transparent
    );
    animation: shimmerLine 3s ease-in-out infinite;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Focus states for accessibility */
  .mobile-nav-link:focus-visible {
    outline: 2px solid #0edb61;
    outline-offset: -2px;
    background: rgba(14, 219, 97, 0.1);
  }

  /* Improved touch targets */
  .mobile-menu-toggle {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-link {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}

/* ==========================================
   DARK MODE COMPATIBILITY
   ========================================== */
@media (prefers-color-scheme: dark) and (max-width: 1024px) {
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    border-top-color: rgba(255, 255, 255, 0.15);
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }

  .mobile-nav-link {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
}

/* ==========================================
   REDUCED MOTION ACCESSIBILITY
   ========================================== */
@media (prefers-reduced-motion: reduce) and (max-width: 1024px) {
  .mobile-nav {
    animation: none;
  }

  .mobile-nav-link::before {
    transition: none;
  }

  .mobile-nav-link:hover::before {
    left: 0;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.5;
    }
  }
}`}</style>
    </header>
  );
};

export default Header;
