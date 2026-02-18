import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../App.css";
import "./Header.css"; // Import the separated CSS file
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

          <a href="https://www.8connews.org/" target="no_blank" className="nav-link">
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
    </header>
  );
};

export default Header;