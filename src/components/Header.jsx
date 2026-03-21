import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegistration } from "../context/RegistrationContext.jsx";
import ScrollLink from "./ScrollLink";
import "../App.css";
import "../ConponentCSS/Header.css";

const sectionIds = ["home", "core-brand", "about", "careerpath", "internship", "contact"];

/**
 * Desktop nav items. Each entry is one of:
 *   - { label, to, section }                      — a plain ScrollLink
 *   - { label, to, section, dropdown: [...] }     — a ScrollLink with a dropdown
 *   - { label, href, external: true }             — an external <a> tag
 */
const desktopNavItems = [
  { label: "Home", to: "/#home", section: "home" },
  { label: "About Us", to: "/#about", section: "about" },
  {
    label: "Careers ▾",
    to: "/#internship",
    section: "careers",
    activeSections: ["careerpath", "internship"],
    dropdown: [
      { label: "Career Paths", to: "/#careerpath" },
      { label: "Internship", to: "/#internship" },
    ],
  },
  {
    label: "Brands ▾",
    to: "/#core-brand",
    section: "core-brand",
    dropdown: [
      { label: "Core Brands", to: "/#core-brand", scrollLink: true },
      { label: "Sub-brands", to: "/sub-brands", routerLink: true },
    ],
  },
  { label: "Newsletters", href: "https://www.8connews.org/", external: true },
  { label: "Contact Us", to: "/#contact", section: "contact" },
];

/**
 * Mobile nav items. Each entry is one of:
 *   - { label, href, section }                  — plain <a> (hash link, works on home page)
 *   - { label, to, section, scrollLink: true }  — ScrollLink
 *   - { label, to, routerLink: true }           — React Router <Link>
 *   - { label, href, external: true }           — external <a>
 */
const mobileNavItems = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Core Brands", to: "/#core-brand", section: "core-brand", scrollLink: true },
  { label: "Sub-brands", to: "/sub-brands", routerLink: true },
  { label: "Newsletters", href: "https://www.8connews.org/", external: true },
  { label: "Internship", href: "#internship", section: "internship" },
  { label: "Career Paths", href: "#careerpath", section: "careerpath" },
  { label: "About Us", to: "/#about", section: "about", scrollLink: true },
  { label: "Contact Us", href: "#contact", section: "contact" },
];

const Header = () => {
  const { openRegistration } = useRegistration();
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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
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
            {desktopNavItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    {item.label}
                  </a>
                );
              }

              const activeSections = item.activeSections ?? (item.section ? [item.section] : []);
              const isActive = activeSections.some((s) => activeSection === s);
              const linkClass = `nav-link${isActive ? " active" : ""}`;

              if (item.dropdown) {
                return (
                  <div key={item.label} className="dropdown">
                    <ScrollLink to={item.to} className={linkClass}>
                      {item.label}
                    </ScrollLink>
                    <div className="dropdown-content">
                      {item.dropdown.map((child) =>
                        child.routerLink ? (
                          <Link key={child.label} to={child.to} className="dropdown-link">
                            {child.label}
                          </Link>
                        ) : (
                          <ScrollLink key={child.label} to={child.to} className="dropdown-link">
                            {child.label}
                          </ScrollLink>
                        )
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <ScrollLink key={item.label} to={item.to} className={linkClass}>
                  {item.label}
                </ScrollLink>
              );
            })}
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
            <button onClick={openRegistration} className="register-btn desktop-only">
              Register
            </button>

            {/* Mobile Toggle Button */}
            <button
              className={`mobile-menu-toggle${mobileMenuOpen ? " open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="burger-icon">
                <span className="burger-line" />
                <span className="burger-line" />
                <span className="burger-line" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation — rendered outside header to avoid fixed-in-fixed positioning bug */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {mobileNavItems.map((item) => {
            if (item.routerLink) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.scrollLink) {
              const isActive = activeSection === item.section;
              return (
                <ScrollLink
                  key={item.label}
                  to={item.to}
                  className={`mobile-nav-link${isActive ? " active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </ScrollLink>
              );
            }

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              );
            }

            // Plain hash link — works on home page
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`mobile-nav-link${isActive ? " active" : ""}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            );
          })}

          <button
            className="mobile-nav-link highlight-link"
            onClick={() => { closeMobileMenu(); openRegistration(); }}
          >
            Register Here!
          </button>
        </nav>
      )}
    </>
  );
};

export default Header;
