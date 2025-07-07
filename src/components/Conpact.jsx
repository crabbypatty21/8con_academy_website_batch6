// ✅ Fixed scroll-triggered animation setup for ConPact with proper reset logic
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Target,
  Globe,
  Award,
  Network,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Building,
  Handshake,
  Lightbulb,
} from "lucide-react";

const ConPact = () => {
  const subBrandsData = [
    {
      id: "construct",
      name: "8ConStruct",
      route: "/construct",
      desc: "Research and statistical consultancy to empower decision-making.",
      icon: <Brain size={60} />,
    },
    {
      id: "conedge",
      name: "8ConEdge",
      route: "/conedge",
      desc: "Proprietary Forex tools to enhance trading efficiency.",
      icon: <TrendingUp size={60} />,
    },
    {
      id: "concise",
      name: "8ConCise",
      route: "/concise",
      desc: "Entrepreneur networking hub to grow business relationships.",
      icon: <Network size={60} />,
    },
    {
      id: "converse",
      name: "8ConVerse",
      route: "/converse",
      desc: "Language certification courses to broaden opportunities.",
      icon: <Globe size={60} />,
    },
    {
      id: "connect",
      name: "8ConNect",
      route: "/connect",
      desc: "Entrepreneur networking hub to grow business relationships.",
      icon: <Network size={60} />,
    },
    {
      id: "conlift",
      name: "8ConLift",
      route: "/conlift",
      desc: "Scholarship and training programs for deserving students.",
      icon: <Award size={60} />,
    },
    {
      id: "conquest",
      name: "8ConQuest",
      route: "/conquest",
      desc: "Thesis and career coaching for students and professionals.",
      icon: <Target size={60} />,
    },
    {
      id: "conspace",
      name: "8ConSpace",
      route: "/conspace",
      desc: "Co-working space and virtual office solutions for professionals and students.",
      icon: <Users size={60} />,
    },
    {
      id: "consult",
      name: "8ConSult",
      route: "/consult",
      desc: "Business development and startup advisory with Sir Nigel Santos.",
      icon: <BookOpen size={60} />,
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animationsPlayed, setAnimationsPlayed] = useState(new Set());
  const [isAtTop, setIsAtTop] = useState(true);

  const heroRef = useRef(null);
  const csrRef = useRef(null);
  const advantageRef = useRef(null);
  const ctaRef = useRef(null);

  // Fixed scroll handler with proper animation reset
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 0);

      const newIsAtTop = scrollTop <= 100;

      // Reset animations when scrolling back to top
      if (newIsAtTop && !isAtTop) {
        setIsAtTop(true);
        setAnimationsPlayed(new Set());

        // Reset all animated elements
        document.querySelectorAll(".fade-item").forEach((el) => {
          el.classList.remove("animate-section");
          el.classList.remove(
            "anim-hero",
            "anim-csr",
            "anim-advantage",
            "anim-cta"
          );
          el.style.animationDelay = "";
        });
      } else if (!newIsAtTop && isAtTop) {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop]);

  // Fixed intersection observer with proper animation logic
  useEffect(() => {
    const refs = [heroRef, csrRef, advantageRef, ctaRef];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const sectionName = section.dataset.section;

            // Always animate hero section when at top, or animate other sections if not played yet
            const shouldAnimate =
              (sectionName === "hero" && isAtTop) ||
              (!animationsPlayed.has(sectionName) && sectionName !== "hero");

            if (shouldAnimate) {
              const children = section.querySelectorAll(".fade-item");
              children.forEach((el, index) => {
                // Clear any existing animation classes first
                el.classList.remove("animate-section");
                el.classList.remove(
                  "anim-hero",
                  "anim-csr",
                  "anim-advantage",
                  "anim-cta"
                );

                // Force a reflow to ensure the class removal takes effect
                el.offsetHeight;

                // Add animation with delay
                setTimeout(() => {
                  el.style.animationDelay = `${index * 0.15}s`;
                  el.classList.add("animate-section", `anim-${sectionName}`);
                }, 50);
              });

              // Only add to played animations if it's not the hero section
              if (sectionName !== "hero") {
                setAnimationsPlayed((prev) => new Set([...prev, sectionName]));
              }
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [animationsPlayed, isAtTop]);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setSubBrandsDropdownOpen(false);
    setMobileSubBrandsDropdownOpen(false);
  };

  const handleSmoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={styles.container}>
      {/* Add CSS styles */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
           scroll-padding-top: 80px;
          }
          
          .header {
            background-color: transparent;
            box-shadow: none;
            position: fixed;
            top: 0;
            z-index: 1000;
            width: 100%;
            padding: 10px 0;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 900;
            text-transform: uppercase;
            transition: background-color 0.8s ease, box-shadow 0.8s ease, backdrop-filter 0.3s ease;
          }
          
          .header.scrolled {
            background-color: rgba(0, 0, 0, 0.95);
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
          
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 600;
            position: relative;
          }
          
          .nav-link {
            text-decoration: none;
            color: rgb(255, 255, 255);
            padding: 10px 15px;
            border-radius: 6px;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
            position: relative;
            display: inline-block;
            cursor: pointer;
          }
          
          .nav-link:hover {
            transform: translateY(-2px);
          }
          
          .dropdown {
            position: relative;
          }
          
          .dropdown:hover .dropdown-content {
            display: block;
          }
          
          .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: white;
            padding: 10px 0;
            min-width: 200px;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          }
          
          .dropdown-link {
            display: block;
            padding: 12px 20px;
            color: #333;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .dropdown-link:hover {
            background-color: #f0f0f0;
            color: #0edb61;
          }
          
          .mobile-menu-toggle {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: white;
            display: none;
            padding: 5px;
          }
          
          .mobile-nav {
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid #e5e7eb;
            padding: 10px 0;
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .mobile-nav-link {
            display: block;
            padding: 15px 20px;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #f3f4f6;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }
          
          .mobile-nav-link:hover {
            background-color: rgba(14, 219, 97, 0.1);
          }
          
          .mobile-dropdown {
            position: relative;
          }
          
          .mobile-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 15px 20px;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #f3f4f6;
            background: none;
            border: none;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
          }
          
          .mobile-dropdown-content {
            background-color: rgba(248, 249, 250, 0.9);
            border-radius: 0.5rem;
            margin: 0 20px;
            margin-bottom: 10px;
          }
          
          .mobile-nav-sublink {
            display: block;
            padding: 12px 20px;
            color: #555;
            text-decoration: none;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          
          .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }
          
          /* Animation Styles */
          .fade-item {
            opacity: 0;
            transform: translateY(30px);
            transition: none;
          }
          
          .animate-section {
            animation-duration: 0.8s;
            animation-fill-mode: forwards;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Hero Section Animations */
          .anim-hero {
            animation-name: heroFadeUp;
          }
          
          @keyframes heroFadeUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          /* CSR Section Animations */
          .anim-csr {
            animation-name: csrSlideIn;
          }
          
          @keyframes csrSlideIn {
            from {
              opacity: 0;
              transform: translateX(-50px) rotateY(-10deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) rotateY(0deg);
            }
          }
          
          /* Advantage Section Animations */
          .anim-advantage {
            animation-name: advantageZoomIn;
          }
          
          @keyframes advantageZoomIn {
            from {
              opacity: 0;
              transform: scale(0.8) rotate(-2deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }
          
          /* CTA Section Animations */
          .anim-cta {
            animation-name: ctaFadeSlide;
          }
          
          @keyframes ctaFadeSlide {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          /* Responsive Design */
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-toggle {
              display: block !important;
            }
            .header-container {
              padding-right: 4%;
              padding-left: 4%;
            }
          }
          
          @media (max-width: 768px) {
            .header-container {
              padding-right: 3%;
              padding-left: 3%;
            }
            .logo-img {
              height: 35px;
            }
            .container2 {
              padding: 0 15px;
            }
          }
          
          @media (max-width: 480px) {
            .header-container {
              padding-right: 2%;
              padding-left: 2%;
            }
            .logo-img {
              height: 30px;
            }
            .container2 {
              padding: 0 10px;
            }
          }
          
          @media (min-width: 1025px) {
            .mobile-nav {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Header - Navigation */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img
              src="/assets/logo/8con Academy Logo White.png"
              alt="8Con Academy Logo"
              className="logo-img"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/sub-brands" className="nav-link">
              Home
            </Link>
            {/* Sub-brands Dropdown */}
            <div className="dropdown">
              <span className="nav-link">Sub-brands ▾</span>
              <div className="dropdown-content">
                {subBrandsData.map((brand, index) => (
                  <a
                    key={index}
                    href={brand.route}
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(brand.route);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#csr-priorities"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("csr-priorities");
              }}
            >
              CSR Priorities
            </a>
            <a
              href="#advantage"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("advantage");
              }}
            >
              Our Advantage
            </a>
            <a
              href="#cta"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("cta");
              }}
            >
              Join Us
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/sub-brands" className="mobile-nav-link">
              Home
            </Link>

            {/* Mobile Sub-brands Dropdown */}
            <div className="mobile-dropdown">
              <button
                className="mobile-nav-link mobile-dropdown-toggle"
                onClick={() =>
                  setMobileSubBrandsDropdownOpen(!mobileSubBrandsDropdownOpen)
                }
              >
                Sub-brands{" "}
                <ChevronDown
                  size={16}
                  className={mobileSubBrandsDropdownOpen ? "rotate-180" : ""}
                />
              </button>
              {mobileSubBrandsDropdownOpen && (
                <div className="mobile-dropdown-content">
                  {subBrandsData.map((brand, index) => (
                    <a
                      key={index}
                      href={brand.route}
                      className="mobile-nav-sublink"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(brand.route);
                      }}
                    >
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#csr-priorities"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("csr-priorities");
              }}
            >
              CSR Priorities
            </a>
            <a
              href="#advantage"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("advantage");
              }}
            >
              Our Advantage
            </a>
            <a
              href="#cta"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("cta");
              }}
            >
              Join Us
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section - Green Background */}
      {/* Hero Section - Green Background */}
      <section
        id="hero"
        ref={heroRef}
        data-section="hero"
        style={styles.heroSection}
      >
        <div style={styles.heroContent}>
          {/* Large Brand Logo/Number Image - Like ConVerse */}
          <img
            src="/assets/logo/6.png"
            alt="8ConPact"
            style={styles.heroTopImage}
            className="fade-item"
          />

          {/* Glassmorphic Content Block */}
          <div style={styles.heroForegroundContent}>
            {/* Subtitle */}
            <p className="fade-item" style={styles.heroSubtitle}>
              Collaborate for Impact in Livelihood, Education, and Employment
            </p>

            {/* Description */}
            <p className="fade-item" style={styles.heroDescription}>
              8ConPact is committed to fostering meaningful partnerships with
              Local Government Units (LGUs), Small and Medium Enterprises
              (SMEs), cooperatives, and private organizations to drive community
              growth through targeted initiatives.
            </p>

            {/* Buttons */}
            <div className="fade-item" style={styles.heroButtons}>
              <button
                style={styles.ctaButtonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Partner With Us
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Priorities Section - Black Background */}
      <section
        id="csr-priorities"
        ref={csrRef}
        data-section="csr"
        style={styles.csrSection}
      >
        <div style={styles.container2}>
          <h2
            className="fade-item"
            style={{ ...styles.sectionTitle, color: "#0edb61" }}
          >
            How 8ConPact Aligns with CSR Priorities
          </h2>
          <div style={styles.csrGrid}>
            <div
              className="fade-item"
              style={styles.csrCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <div style={styles.csrIcon}>
                <Briefcase size={40} color="#0edb61" />
              </div>
              <h3 style={styles.csrTitle}>Livelihood Programs</h3>
              <p style={styles.csrSubtitle}>
                Skills Training for Local Communities
              </p>
              <p style={styles.csrDescription}>
                Organizes skills training programs to equip individuals with
                market-relevant skills, including financial literacy,
                entrepreneurship, and specialized trades.
              </p>
              <div style={styles.csrImpact}>
                <h4 style={styles.impactTitle}>Impact:</h4>
                <ul style={styles.csrList}>
                  <li style={styles.csrListItem}>
                    • Empowers community members to establish micro and small
                    businesses
                  </li>
                  <li style={styles.csrListItem}>
                    • Provides practical knowledge for resource management
                  </li>
                  <li style={styles.csrListItem}>
                    • Contributes to local economic growth
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="fade-item"
              style={styles.csrCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <div style={styles.csrIcon}>
                <GraduationCap size={40} color="#0edb61" />
              </div>
              <h3 style={styles.csrTitle}>Education and Youth Development</h3>
              <p style={styles.csrSubtitle}>
                Scholarships and Educational Grants
              </p>
              <p style={styles.csrDescription}>
                Facilitates scholarship opportunities funded through
                partnerships with LGUs, SMEs, and private organizations,
                including the 8ConLift Enrollment to Employment Program.
              </p>
              <div style={styles.csrImpact}>
                <h4 style={styles.impactTitle}>Impact:</h4>
                <ul style={styles.csrList}>
                  <li style={styles.csrListItem}>
                    • Ensures access to quality education for underserved youth
                  </li>
                  <li style={styles.csrListItem}>
                    • Connects graduates to employment opportunities
                  </li>
                  <li style={styles.csrListItem}>
                    • Provides career pathways within 8Con network
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="fade-item"
              style={styles.csrCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <div style={styles.csrIcon}>
                <DollarSign size={40} color="#0edb61" />
              </div>
              <h3 style={styles.csrTitle}>Financial and Economic Support</h3>
              <p style={styles.csrSubtitle}>Employment Generation Projects</p>
              <p style={styles.csrDescription}>
                Works with LGUs and private companies to design and implement
                employment generation initiatives, providing various career
                opportunities for graduates.
              </p>
              <div style={styles.csrImpact}>
                <h4 style={styles.impactTitle}>Impact:</h4>
                <ul style={styles.csrList}>
                  <li style={styles.csrListItem}>
                    • Reduces unemployment through job creation
                  </li>
                  <li style={styles.csrListItem}>
                    • Helps local businesses access skilled workers
                  </li>
                  <li style={styles.csrListItem}>
                    • Creates sustainable economic opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8ConPact Advantage Section - White Background */}
      <section
        id="advantage"
        ref={advantageRef}
        data-section="advantage"
        style={styles.advantageSection}
      >
        <div style={styles.container2}>
          <h2 className="fade-item" style={styles.sectionTitle}>
            The 8ConPact Advantage
          </h2>
          <div style={styles.advantageGrid}>
            <div
              className="fade-item"
              style={styles.advantageCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
                e.currentTarget.style.borderColor = "#0edb61";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
            >
              <div style={styles.advantageIcon}>
                <Handshake size={50} color="#0edb61" />
              </div>
              <h3 style={styles.advantageTitle}>Strategic Partnerships</h3>
              <p style={styles.advantageDescription}>
                Collaborates with LGUs to align CSR programs with community
                needs, ensuring impactful and sustainable initiatives. Engages
                SMEs and private organizations to co-fund and implement projects
                that generate long-term value.
              </p>
            </div>

            <div
              className="fade-item"
              style={styles.advantageCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(255, 31, 44, 0.2)";
                e.currentTarget.style.borderColor = "#ff1f2c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
            >
              <div style={styles.advantageIcon}>
                <Target size={50} color="#ff1f2c" />
              </div>
              <h3 style={styles.advantageTitle}>Focused Programs</h3>
              <p style={styles.advantageDescription}>
                Concentrates on initiatives with measurable outcomes in
                livelihood, education, and employment, driving real change at
                the grassroots level with targeted and effective solutions.
              </p>
            </div>

            <div
              className="fade-item"
              style={styles.advantageCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
                e.currentTarget.style.borderColor = "#0edb61";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
            >
              <div style={styles.advantageIcon}>
                <Star size={50} color="#0edb61" />
              </div>
              <h3 style={styles.advantageTitle}>
                Empowerment Through Education and Employment
              </h3>
              <p style={styles.advantageDescription}>
                Combines skills training and career development programs to
                create a holistic approach to community empowerment, ensuring
                sustainable growth and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section
        id="cta"
        ref={ctaRef}
        data-section="cta"
        style={styles.ctaSection}
      >
        <div style={styles.container2}>
          <h2 className="fade-item" style={styles.ctaTitle}>
            Join 8ConPact in Driving Impact
          </h2>
          <p className="fade-item" style={styles.ctaDescription}>
            At 8ConPact, we bridge businesses, government units, and communities
            to create meaningful collaborations that uplift lives and foster
            sustainable growth. Through livelihood programs, scholarships, and
            employment initiatives, we contribute to building stronger, more
            self-reliant communities.
          </p>
          <div className="fade-item" style={styles.ctaButtons}>
            <button
              style={styles.ctaButtonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start Partnership
            </button>
            <button
              style={styles.ctaButtonRed}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Involved
            </button>
          </div>
          <div
            className="fade-item"
            style={styles.ctaHighlight}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 31, 44, 0.2)";
              e.currentTarget.style.borderColor = "#ff1f2c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(14, 219, 97, 0.1)";
              e.currentTarget.style.borderColor = "#0edb61";
            }}
          >
            <strong>
              Let's collaborate to make a difference where it matters most.
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styling with alternating background colors and specified color palette
const styles = {
  container: {
    minHeight: "100vh",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: "1.6",
    color: "#000000",
    margin: 0,
    padding: 0,
  },

  container2: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  // Hero Section - Green Background
  heroSection: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgb(14, 219, 97) 0%, rgb(0, 0, 0) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(50px, 8vh, 80px) clamp(20px, 5vw, 40px)",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    // Responsive adjustments
    "@media (max-width: 768px)": {
      padding: "120px 15px 60px",
      minHeight: "90vh",
    },
    "@media (max-width: 480px)": {
      padding: "100px 12px 40px",
      minHeight: "85vh",
    },
  },

  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    margin: "0 auto",
    // Responsive width
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },

  heroSubtitle: {
    fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
    fontWeight: "600",
    marginBottom: "1rem",
    margin: "0 0 1rem 0",
    opacity: "0.9",
    color: "#ffffff",
    lineHeight: "1.3",
    "@media (max-width: 480px)": {
      fontSize: "clamp(0.9rem, 5vw, 1.4rem)",
      marginBottom: "1.2rem",
    },
  },

  heroDescription: {
    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
    color: "#cccccc",
    lineHeight: "1.6",
    marginTop: "0 !important",
    marginBottom: "0 !important", // Let CSS class handle it
    paddingBottom: "0 !important",
    opacity: "0.95",

    // Mobile responsiveness
    "@media (max-width: 768px)": {
      marginBottom: "2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "clamp(0.85rem, 4vw, 1rem)",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
    },
  },

  heroForegroundContent: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "clamp(1rem, 2vw, 1.5rem)",
    borderRadius: "15px",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxWidth: "1000px",
    width: "100%",

    textAlign: "center",

    marginBottom: "10rem",
    marginTop: "-100px",
    "@media (max-width: 768px)": {
      padding: "1.5rem 1rem",
      gap: "1rem",
    },
    "@media (max-width: 480px)": {
      padding: "1.2rem 0.8rem",
      gap: "0.8rem",
    },
  },

  heroTopImage: {
    width: "clamp(250px, 40vw, 500px)",
    height: "auto",
    opacity: 0.9,
    pointerEvents: "none",
    marginTop: "-80px",
  },

  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "2rem",
    margin: "0 !important", // Force reset
    padding: "0 !important",
    position: "relative",
    zIndex: "1",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      gap: "0.8rem",
      marginTop: "1.5rem",
    },
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "0.8rem",
      alignItems: "center",
    },
  },

  ctaButtonPrimary: {
    background: "#0edb61",
    color: "#ffffff",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    // Responsive button sizing
    "@media (max-width: 768px)": {
      padding: "0.9rem 1.8rem",
      fontSize: "1rem",
    },
    "@media (max-width: 480px)": {
      padding: "0.8rem 1.5rem",
      fontSize: "0.9rem",
      width: "200px",
    },
  },

  ctaButtonSecondary: {
    background: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    // Responsive sizing
    "@media (max-width: 768px)": {
      padding: "0.9rem 1.8rem",
      fontSize: "1rem",
    },
    "@media (max-width: 480px)": {
      padding: "0.8rem 1.5rem",
      fontSize: "0.9rem",
      width: "200px",
    },
  },

  ctaButtonRed: {
    background: "#ff1f2c",
    color: "#ffffff",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    // Responsive sizing
    "@media (max-width: 768px)": {
      padding: "0.9rem 1.8rem",
      fontSize: "1rem",
    },
    "@media (max-width: 480px)": {
      padding: "0.8rem 1.5rem",
      fontSize: "0.9rem",
      width: "200px",
    },
  },

  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#0edb61",
    textAlign: "center",
    marginBottom: "3rem",
  },

  csrSection: {
    background: "#ffffff",
    padding: "120px 20px 80px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  csrGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  csrCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    textAlign: "center",
  },

  csrIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  csrTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "0.5rem",
  },

  csrSubtitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ff1f2c",
    marginBottom: "1rem",
  },

  csrDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },

  csrImpact: {
    textAlign: "left",
    marginTop: "1rem",
  },

  impactTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "0.8rem",
  },

  csrList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  csrListItem: {
    fontSize: "0.95rem",
    color: "#000000",
    marginBottom: "0.6rem",
    lineHeight: "1.5",
  },

  // 8ConPact Advantage Section - Black Background
  advantageSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  advantageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  advantageCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "2px solid #f0f0f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  advantageIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  advantageTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "1rem",
  },

  advantageDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
  },

  // CTA Section - White Background
  ctaSection: {
    background: "#ffffff",
    color: "#ffffff",
    padding: "80px 20px",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  ctaTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#000000",
  },

  ctaDescription: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    lineHeight: "1.8",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    opacity: "0.95",
    color: "#000000",
  },

  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "2rem",
  },

  ctaHighlight: {
    background: "rgba(14, 219, 97, 0.1)",
    padding: "1.5rem",
    borderRadius: "10px",
    fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
    maxWidth: "700px",
    margin: "0 auto",
    border: "2px solid #0edb61",
    color: "#000000",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};

export default ConPact;
