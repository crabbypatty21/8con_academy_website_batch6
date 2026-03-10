import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import ScrollLink from "./ScrollLink"; // Import your ScrollLink component
import "../App.css";
import "../ConponentCSS/Header.css";

const sectionIds = ["home", "core-brand", "about", "careerpath", "internship", "contact"];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        
        {/* LEFT: Logo Section */}
        <div className="logo-section">
          <ScrollLink to="/#home" className="logo">
            <img
              src={!isDark && scrolled ? "/assets/logo/8con Academy Logo.png" : "/assets/logo/8con Academy Logo White.png"}
              alt="8Con Academy Logo"
              className="logo-img"
            />
          </ScrollLink>
        </div>

        {/* CENTER: Main Navigation */}
        <nav className="desktop-nav center-nav">
          <a href="#home" className={`nav-link ${activeSection === "home" ? "active" : ""}`}>
            Home
          </ScrollLink>

          <a href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`}>
            About Us
          </ScrollLink>

          <div className="dropdown">
            <a href="#internship" className={`nav-link ${activeSection === "careerpath" || activeSection === "internship" ? "active" : ""}`}>
              Careers ▾
            </ScrollLink>
            <div className="dropdown-content">
              <ScrollLink to="/#careerpath" className="dropdown-link">
                Career Paths
              </ScrollLink>
              <ScrollLink to="/#internship" className="dropdown-link">
                Internship
              </ScrollLink>
            </div>
          </div>

         <div className="dropdown">
            <a href="#core-brand" className={`nav-link ${activeSection === "core-brand" ? "active" : ""}`}>
              Brands ▾
            </ScrollLink>
            <div className="dropdown-content">
              <ScrollLink to="/#core-brand" className="dropdown-link">
                Core Brands
              </ScrollLink>
              <Link to="/sub-brands" className="dropdown-link">
                Sub-brands
              </Link>
            </div>
          </div>
          
          <a
            href="https://www.8connews.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Newsletters
          </a>

          <a href="#contact" className={`nav-link ${activeSection === "contact" ? "active" : ""}`}>
            Contact Us
          </a>
        </nav>

        {/* RIGHT: Theme Toggle, Register & Mobile Toggle */}
        <div className="right-actions">
          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Register Button (Desktop Only) */}
          <ScrollLink to="/registration" className="register-btn desktop-only">
            Register
          </ScrollLink>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <a
              href="#home"
              className={`mobile-nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#core-brand"
              className={`mobile-nav-link ${activeSection === "core-brand" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Core Brands
            </ScrollLink>
            <Link
              to="/sub-brands"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sub-brands
            </Link>
            <a
              href="https://www.8connews.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletters
            </a>
            <a
              href="#internship"
              className={`mobile-nav-link ${activeSection === "internship" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Internship
            </a>
            <a
              href="#careerpath"
              className={`mobile-nav-link ${activeSection === "careerpath" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Career Paths
            </a>
            <a
              href="#about"
              className={`mobile-nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </ScrollLink>
      
            <a
              href="#contact"
              className={`mobile-nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </a>
            {/* Added Register to Mobile Menu as well since it hides on desktop */}
            <a
              href="/registration"
              className="mobile-nav-link highlight-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register Here!
            </a>
            <button
              className="mobile-nav-link theme-toggle-mobile"
              onClick={toggleTheme}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;