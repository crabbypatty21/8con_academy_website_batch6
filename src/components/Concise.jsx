
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
  BookOpen,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const ConCise = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);

  // Create refs for each section
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const highlightsRef = useRef(null);
  const whyChooseRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  const subBrandsData = [
    {
      id: "construct",
      name: "8ConStruct",
      route: "/8construct",
      desc: "Research and statistical consultancy to empower decision-making.",
      icon: <Brain size={60} />,
    },
    {
      id: "conedge",
      name: "8ConEdge",
      route: "/8conedge",
      desc: "Proprietary Forex tools to enhance trading efficiency.",
      icon: <TrendingUp size={60} />,
    },
    {
      id: "concise",
      name: "8ConCise",
      route: "/8concise",
      desc: "Entrepreneur networking hub to grow business relationships.",
      icon: <Network size={60} />,
    },
    {
      id: "converse",
      name: "8ConVerse",
      route: "/8converse",
      desc: "Language certification courses to broaden opportunities.",
      icon: <Globe size={60} />,
    },
    {
      id: "connect",
      name: "8ConNect",
      route: "/8connect",
      desc: "Entrepreneur networking hub to grow business relationships.",
      icon: <Network size={60} />,
    },
    {
      id: "conlift",
      name: "8ConLift",
      route: "/8conlift",
      desc: "Scholarship and training programs for deserving students.",
      icon: <Award size={60} />,
    },
    {
      id: "conquest",
      name: "8ConQuest",
      route: "/8conquest",
      desc: "Thesis and career coaching for students and professionals.",
      icon: <Target size={60} />,
    },
    {
      id: "conspace",
      name: "8ConSpace",
      route: "/8conspace",
      desc: "Co-working space and virtual office solutions for professionals and students.",
      icon: <Users size={60} />,
    },
    {
      id: "consult",
      name: "8ConSult",
      route: "/8consult",
      desc: "Business development and startup advisory with Sir Nigel Santos.",
      icon: <BookOpen size={60} />,
    },
  ];

  // Intersection Observer for all sections (including hero)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setAnimatedSections((prev) => new Set([...prev, sectionId]));
        }
      });
    }, observerOptions);

    // Observe all sections including hero
    const sections = [
      heroRef,
      servicesRef,
      highlightsRef,
      whyChooseRef,
      benefitsRef,
      ctaRef,
    ];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Special observer for hero section to track when user enters/exits hero
  useEffect(() => {
    const heroObserverOptions = {
      threshold: 0.6, // Hero is considered "active" when 60% visible
      rootMargin: "0px",
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const wasInHero = isInHeroSection;
        const nowInHero = entry.isIntersecting;

        setIsInHeroSection(nowInHero);

        // If we're entering the hero section from outside (scrolling back to top)
        if (nowInHero && !wasInHero) {
          console.log("Returning to hero - restarting all animations");

          // Reset ALL section animations
          setAnimatedSections(new Set());

          // Increment animation key to force re-render of hero content
          setHeroAnimationKey((prev) => prev + 1);

          // Start hero animation first
          setTimeout(() => {
            setAnimatedSections((prev) => new Set([...prev, "hero"]));
          }, 100);
        }
        // If we're in hero section initially (page load)
        else if (nowInHero && wasInHero) {
          // Ensure hero animation is active on initial load
          setAnimatedSections((prev) => new Set([...prev, "hero"]));
        }
      });
    }, heroObserverOptions);

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => heroObserver.disconnect();
  }, [isInHeroSection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLearnMore = () => {
    handleSmoothScroll("services");
  };

  // Initialize hero animation on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAnimatedSections(new Set());

    // Trigger hero animation on mount
    setTimeout(() => {
      setAnimatedSections((prev) => new Set([...prev, "hero"]));
    }, 300);
  }, []);

  // Check if section should be animated
  const isAnimated = (sectionId) => animatedSections.has(sectionId);

  return (
    <div style={styles.container}>
      {/* Add CSS styles including enhanced animations */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 2px;
          }
          
          /* Enhanced Animation Keyframes */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.7) translateY(30px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.2) translateY(50px);
            }
            50% {
              opacity: 1;
              transform: scale(1.1) translateY(-10px);
            }
            70% {
              transform: scale(0.95) translateY(5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes slideInFromBottom {
            from {
              opacity: 0;
              transform: translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes rotateIn {
            from {
              opacity: 0;
              transform: rotate(-180deg) scale(0.5);
            }
            to {
              opacity: 1;
              transform: rotate(0deg) scale(1);
            }
          }
          
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.3);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(14, 219, 97, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(14, 219, 97, 0.6);
            }
          }
          
          /* Enhanced Animation Classes */
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          
          .animate-fade-in-left {
            animation: fadeInLeft 1s ease-out forwards;
          }
          
          .animate-fade-in-right {
            animation: fadeInRight 1s ease-out forwards;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.8s ease-out forwards;
          }
          
          .animate-bounce-in {
            animation: bounceIn 1s ease-out forwards;
          }
          
          .animate-slide-in-bottom {
            animation: slideInFromBottom 1.2s ease-out forwards;
          }
          
          .animate-slide-in-top {
            animation: slideInFromTop 1s ease-out forwards;
          }
          
          .animate-rotate-in {
            animation: rotateIn 1s ease-out forwards;
          }
          
          .animate-zoom-in {
            animation: zoomIn 0.8s ease-out forwards;
          }
          
          .animate-pulse-glow {
            animation: pulseGlow 2s infinite;
          }
          
          /* Enhanced stagger animations */
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.3s; }
          .stagger-3 { animation-delay: 0.5s; }
          .stagger-4 { animation-delay: 0.7s; }
          .stagger-5 { animation-delay: 0.9s; }
          .stagger-6 { animation-delay: 1.1s; }
          .stagger-7 { animation-delay: 1.3s; }
          .stagger-8 { animation-delay: 1.5s; }
          .stagger-9 { animation-delay: 1.7s; }
          
          /* Initial state for animated elements */
          .animate-on-scroll {
            opacity: 0;
          }
          
          .header {
            background-color: transparent;
            box-shadow: none;
            position: fixed;
            top: 0;
            z-index: 1000;
            width: 100%;
            padding: 8px 0;
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
            padding: 0 5%;
          }

          .logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            margin-right: auto;
          }
          
          .logo-img {
            height: 35px;
            width: auto;
          }
          
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            position: relative;
          }
          
          .nav-link {
            text-decoration: none;
            color: rgb(255, 255, 255);
            padding: 8px 12px;
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
          
          /* Responsive Media Queries */
          @media (max-width: 1200px) {
            .header-container {
              padding: 0 3%;
            }
            .desktop-nav {
              gap: 6px;
              font-size: 12px;
            }
            .nav-link {
              padding: 6px 10px;
            }
          }
          
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-toggle {
              display: block !important;
            }
            .logo-img {
              height: 30px;
            }
          }
          
          @media (max-width: 768px) {
            .header {
              padding: 6px 0;
            }
            .header-container {
              padding: 0 4%;
            }
            .logo-img {
              height: 28px;
            }
            .mobile-nav-link {
              padding: 12px 15px;
              font-size: 15px;
            }
            .mobile-dropdown-toggle {
              padding: 12px 15px;
              font-size: 15px;
            }
            .mobile-nav-sublink {
              padding: 10px 15px;
              font-size: 13px;
            }
          }
          
          @media (max-width: 480px) {
            .header-container {
              padding: 0 3%;
            }
            .logo-img {
              height: 25px;
            }
            .mobile-nav-link {
              padding: 10px 12px;
              font-size: 14px;
            }
            .mobile-dropdown-toggle {
              padding: 10px 12px;
              font-size: 14px;
            }
            .mobile-nav-sublink {
              padding: 8px 12px;
              font-size: 12px;
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
              href="#services"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("services");
              }}
            >
              Services
            </a>
            <a
              href="#highlights"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("highlights");
              }}
            >
              Program Highlights
            </a>
            <a
              href="#why-choose"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("why-choose");
              }}
            >
              Why Choose Us
            </a>
            <a
              href="#benefits"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("benefits");
              }}
            >
              Who Benefits
            </a>
            <a
              href="#cta"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("cta");
              }}
            >
              Contact
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
              href="#services"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("services");
              }}
            >
              Services
            </a>
            <a
              href="#highlights"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("highlights");
              }}
            >
              Program Highlights
            </a>
            <a
              href="#why-choose"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("why-choose");
              }}
            >
              Why Choose Us
            </a>
            <a
              href="#benefits"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("benefits");
              }}
            >
              Who Benefits
            </a>
            <a
              href="#cta"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("cta");
              }}
            >
              Contact
            </a>
          </nav>
        )}
      </header>
      {/* Hero Section with key-based animation reset */}
      <section id="hero" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          {/* Optional: Add logo image */}
          <img
            src="/assets/logo/8.png"
            alt="8ConCise"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${
              isAnimated("hero") ? "animate-slide-in-top" : ""
            }`}
          />
          <div style={styles.heroForegroundContent}>
            {/* Subtitle */}
            <p
              style={styles.heroSubtitle}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-1" : ""
              }`}
            >
              Your Precise Pathway to Exam Success
            </p>

            {/* Description */}
            <p
              style={styles.heroDescription}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""
              }`}
            >
              8ConCise is dedicated to helping students and professionals
              achieve academic and career milestones through comprehensive,
              focused review programs. Led by Doc May L. Francisco, an
              experienced educator with a proven track record.
            </p>

            {/* Buttons */}
            <div
              style={styles.heroButtons}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-zoom-in stagger-3" : ""
              }`}
            >
              <button
                style={styles.ctaButtonPrimary}
                className={isAnimated("hero") ? "animate-pulse-glow" : ""}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Your Journey
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={handleLearnMore}
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

      {/* Services Section - White Background */}
      <section id="services" ref={servicesRef} style={styles.servicesSection}>
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#0edb61" }}
            className={`animate-on-scroll ${
              isAnimated("services") ? "animate-slide-in-top" : ""
            }`}
          >
            Services Offered by 8ConCise
          </h2>
          <div style={styles.servicesGrid}>
            {[
              {
                icon: <BookOpen size={40} color="#0edb61" />,
                title: "Licensure Exam Review",
                description:
                  "Comprehensive preparation for professional licensure exams including LET and Criminology Board Exams.",
                items: [
                  "• Licensure Examination for Teachers (LET)",
                  "• Criminology Licensure Exam",
                  "• Updated materials aligned with latest syllabi",
                  "• Practice exams and simulations",
                ],
              },
              {
                icon: <Users size={40} color="#0edb61" />,
                title: "Civil Service Exam Preparation",
                description:
                  "Designed for individuals aiming to qualify for government positions with comprehensive review coverage.",
                items: [
                  "• Verbal reasoning and numerical ability",
                  "• General information coverage",
                  "• Time management strategies",
                  "• Mock exams in real test conditions",
                ],
              },
              {
                icon: <Target size={40} color="#0edb61" />,
                title: "College Entrance Exam Preparation",
                description:
                  "Help high school students prepare for admission to top colleges and universities.",
                items: [
                  "• Mathematics, Science, English coverage",
                  "• Logical reasoning development",
                  "• University-specific preparation",
                  "• Test-taking strategies and techniques",
                ],
              },
              {
                icon: <Clock size={40} color="#0edb61" />,
                title: "Personalized Learning & Crash Courses",
                description:
                  "Customized study plans and intensive preparation for last-minute review needs.",
                items: [
                  "• One-on-one mentoring sessions",
                  "• Customized study plans",
                  "• Intensive crash courses",
                  "• Focus on individual strengths/weaknesses",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                style={styles.serviceCard}
                className={`animate-on-scroll ${
                  isAnimated("services")
                    ? `animate-bounce-in stagger-${index + 1}`
                    : ""
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 35px rgba(14, 219, 97, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={styles.serviceIcon}
                  className={`animate-on-scroll ${
                    isAnimated("services")
                      ? `animate-rotate-in stagger-${index + 2}`
                      : ""
                  }`}
                >
                  {service.icon}
                </div>
                <h3
                  style={styles.serviceTitle}
                  className={`animate-on-scroll ${
                    isAnimated("services")
                      ? `animate-fade-in-left stagger-${index + 3}`
                      : ""
                  }`}
                >
                  {service.title}
                </h3>
                <p style={styles.serviceDescription}>{service.description}</p>
                <ul style={styles.serviceList}>
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      style={styles.serviceListItem}
                      className={`animate-on-scroll ${
                        isAnimated("services")
                          ? `animate-fade-in-right stagger-${
                              index + itemIndex + 4
                            }`
                          : ""
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="highlights"
        ref={highlightsRef}
        style={styles.highlightsSection}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#ffffff" }}
            className={`animate-on-scroll ${
              isAnimated("highlights") ? "animate-slide-in-top" : ""
            }`}
          >
            Program Highlights
          </h2>
          <div style={styles.highlightsGrid}>
            {[
              {
                icon: <Award size={50} color="#0edb61" />,
                title: "Expert-Led Instruction",
                description:
                  "All programs are led by Doc May L. Francisco, whose years of teaching and academic experience have prepared countless students to succeed.",
              },
              {
                icon: <BookOpen size={50} color="#ff1f2c" />,
                title: "Comprehensive Materials",
                description:
                  "Reviewers, handouts, and practice questions are updated regularly to reflect the latest exam formats and trends.",
              },
              {
                icon: <CheckCircle size={50} color="#0edb61" />,
                title: "Mock Exams & Simulations",
                description:
                  "Full-length practice tests designed to simulate actual exam conditions, helping students manage time effectively.",
              },
              {
                icon: <Globe size={50} color="#ff1f2c" />,
                title: "Flexible Delivery Modes",
                description:
                  "Choose between on-site classes for interactive learning or online sessions for convenient home study.",
              },
            ].map((highlight, index) => (
              <div
                key={index}
                style={styles.highlightCard}
                className={`animate-on-scroll ${
                  isAnimated("highlights")
                    ? `animate-scale-in stagger-${index + 1}`
                    : ""
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    index % 2 === 0
                      ? "0 12px 35px rgba(14, 219, 97, 0.2)"
                      : "0 12px 35px rgba(255, 31, 44, 0.2)";
                  e.currentTarget.style.borderColor =
                    index % 2 === 0 ? "#0edb61" : "#ff1f2c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}
              >
                <div
                  style={styles.highlightIcon}
                  className={`animate-on-scroll ${
                    isAnimated("highlights")
                      ? `animate-bounce-in stagger-${index + 2}`
                      : ""
                  }`}
                >
                  {highlight.icon}
                </div>
                <h3
                  style={styles.highlightTitle}
                  className={`animate-on-scroll ${
                    isAnimated("highlights")
                      ? `animate-fade-in-left stagger-${index + 3}`
                      : ""
                  }`}
                >
                  {highlight.title}
                </h3>
                <p
                  style={styles.highlightDescription}
                  className={`animate-on-scroll ${
                    isAnimated("highlights")
                      ? `animate-fade-in-right stagger-${index + 4}`
                      : ""
                  }`}
                >
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-choose"
        ref={whyChooseRef}
        style={styles.whyChooseSection}
      >
        <div style={styles.container2}>
          <h2
            style={styles.sectionTitle}
            className={`animate-on-scroll ${
              isAnimated("why-choose") ? "animate-slide-in-top" : ""
            }`}
          >
            Why Choose 8ConCise?
          </h2>
          <div style={styles.benefitsGrid}>
            {[
              {
                title: "Proven Track Record",
                description:
                  "With Doc May's extensive background in education, 8ConCise has a history of producing successful passers across various licensure and entrance exams.",
              },
              {
                title: "Student-Centric Approach",
                description:
                  "Every program is tailored to meet the specific needs of students, ensuring they receive the guidance they need to excel.",
              },
              {
                title: "Accessible and Flexible",
                description:
                  "With both on-site and online options, students can choose a mode of learning that works best for them.",
              },
              {
                title: "Holistic Preparation",
                description:
                  "Beyond academic preparation, 8ConCise equips students with test-taking strategies, time management skills, and confidence.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                style={styles.benefitCard}
                className={`animate-on-scroll ${
                  isAnimated("why-choose")
                    ? `animate-fade-in-up stagger-${index + 1}`
                    : ""
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 35px rgba(14, 219, 97, 0.2)";
                  e.currentTarget.style.borderColor = "#0edb61";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#0edb61";
                }}
              >
                <h3
                  style={styles.benefitTitle}
                  className={`animate-on-scroll ${
                    isAnimated("why-choose")
                      ? `animate-fade-in-left stagger-${index + 2}`
                      : ""
                  }`}
                >
                  {benefit.title}
                </h3>
                <p
                  style={styles.benefitDescription}
                  className={`animate-on-scroll ${
                    isAnimated("why-choose")
                      ? `animate-fade-in-right stagger-${index + 3}`
                      : ""
                  }`}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" ref={benefitsRef} style={styles.benefitsSection}>
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#ffffff" }}
            className={`animate-on-scroll ${
              isAnimated("benefits") ? "animate-slide-in-top" : ""
            }`}
          >
            Who Can Benefit from 8ConCise?
          </h2>
          <div style={styles.clientsGrid}>
            {[
              {
                icon: <Users size={60} color="#0edb61" />,
                title: "Aspiring Professionals",
                items: [
                  "• Teachers preparing for LET",
                  "• Criminologists preparing for board exams",
                  "• Professionals seeking career advancement",
                ],
              },
              {
                icon: <Target size={60} color="#ff1f2c" />,
                title: "Civil Service Applicants",
                items: [
                  "• Government position seekers",
                  "• Career shifters to public service",
                  "• Fresh graduates targeting government jobs",
                ],
              },
              {
                icon: <BookOpen size={60} color="#0edb61" />,
                title: "High School Students",
                items: [
                  "• College admission exam takers",
                  "• Students targeting top universities",
                  "• Those needing intensive review support",
                ],
              },
            ].map((client, index) => (
              <div
                key={index}
                style={styles.clientCategory}
                className={`animate-on-scroll ${
                  isAnimated("benefits")
                    ? `animate-zoom-in stagger-${index + 1}`
                    : ""
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    index === 1
                      ? "0 12px 35px rgba(255, 31, 44, 0.2)"
                      : "0 12px 35px rgba(14, 219, 97, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={styles.clientIcon}
                  className={`animate-on-scroll ${
                    isAnimated("benefits")
                      ? `animate-rotate-in stagger-${index + 2}`
                      : ""
                  }`}
                >
                  {client.icon}
                </div>
                <h3
                  style={styles.clientTitle}
                  className={`animate-on-scroll ${
                    isAnimated("benefits")
                      ? `animate-fade-in-up stagger-${index + 3}`
                      : ""
                  }`}
                >
                  {client.title}
                </h3>
                <ul style={styles.clientList}>
                  {client.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      style={styles.clientListItem}
                      className={`animate-on-scroll ${
                        isAnimated("benefits")
                          ? `animate-fade-in-left stagger-${
                              index + itemIndex + 4
                            }`
                          : ""
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="cta" ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.container2}>
          <h2
            style={styles.ctaTitle}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-slide-in-top" : ""
            }`}
          >
            The 8ConCise Advantage
          </h2>
          <p
            style={styles.ctaDescription}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-fade-in-up stagger-1" : ""
            }`}
          >
            At 8ConCise, we believe that exam success is not just about studying
            hard but studying smart. With expert guidance from Doc May L.
            Francisco and a proven, structured approach, we empower students to
            achieve their goals and unlock new opportunities.
          </p>
          <div
            style={styles.ctaButtons}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-scale-in stagger-2" : ""
            }`}
          >
            <button
              style={styles.ctaButtonPrimary}
              className={`animate-on-scroll ${
                isAnimated("cta") ? "animate-bounce-in stagger-3" : ""
              }`}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enroll Now
            </button>
            <button
              style={styles.ctaButtonRed}
              className={`animate-on-scroll ${
                isAnimated("cta") ? "animate-bounce-in stagger-4" : ""
              }`}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Started Today
            </button>
          </div>
          <div
            style={styles.ctaHighlight}
            className={`animate-on-scroll ${
              isAnimated("cta")
                ? "animate-fade-in-up stagger-5 animate-pulse-glow"
                : ""
            }`}
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
              Let 8ConCise be your partner in success—your future begins here!
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

// Enhanced Responsive Styling
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
    // Responsive padding
    "@media (max-width: 768px)": {
      padding: "0 15px",
    },
    "@media (max-width: 480px)": {
      padding: "0 12px",
    },
  },

  // Hero Section - Enhanced Responsive
  heroSection: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgb(14, 219, 97) 0%, rgb(0, 0, 0) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(50px, 8vh, 80px) clamp(20px, 5vw, 40px)", // ✅ Reduce top/bottom padding
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
    maxWidth: "900px",
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
    color: "#ffffff",
    marginBottom: "0.5rem", // ✅ Less bottom margin
    fontWeight: "600",
    lineHeight: "1.3",
    // Mobile adjustments
    "@media (max-width: 480px)": {
      fontSize: "clamp(0.9rem, 5vw, 1.4rem)",
      marginBottom: "1.2rem",
    },
  },

  heroDescription: {
    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
    color: "#cccccc",
    lineHeight: "1.6",
    marginTop: "0.3rem",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      margin: "0 auto 1.5rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "clamp(0.85rem, 4vw, 1rem)",
      lineHeight: "1.6",
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

  // Services Section - Enhanced Responsive
  servicesSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      padding: "60px 15px",
      minHeight: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "40px 12px",
    },
  },

  sectionTitle: {
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#0edb61",
    textAlign: "center",
    marginBottom: "3rem",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      marginBottom: "2rem",
    },
    "@media (max-width: 480px)": {
      marginBottom: "1.5rem",
      fontSize: "clamp(1.3rem, 6vw, 2rem)",
    },
  },

  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
    // Enhanced responsive grid
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "1.2rem",
      marginTop: "1rem",
    },
  },

  serviceCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    textAlign: "center",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      padding: "1.5rem",
    },
    "@media (max-width: 480px)": {
      padding: "1.2rem",
      borderRadius: "12px",
    },
  },

  serviceIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    // Mobile adjustments
    "@media (max-width: 480px)": {
      marginBottom: "0.8rem",
    },
  },

  serviceTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "1.2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.1rem",
      marginBottom: "0.8rem",
    },
  },

  serviceDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
      marginBottom: "1.2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      marginBottom: "1rem",
    },
  },

  serviceList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },

  serviceListItem: {
    fontSize: "0.95rem",
    color: "#000000",
    marginBottom: "0.8rem",
    lineHeight: "1.5",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
      marginBottom: "0.7rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.85rem",
      marginBottom: "0.6rem",
    },
  },

  // Program Highlights Section - Enhanced Responsive
  highlightsSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      padding: "60px 15px",
      minHeight: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "40px 12px",
    },
  },

  highlightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
    // Enhanced responsive grid
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "1.2rem",
      marginTop: "1rem",
    },
  },

  highlightCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "2px solid #f0f0f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      padding: "1.5rem",
    },
    "@media (max-width: 480px)": {
      padding: "1.2rem",
      borderRadius: "12px",
    },
  },

  highlightIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    // Mobile adjustments
    "@media (max-width: 480px)": {
      marginBottom: "0.8rem",
    },
  },

  highlightTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "1rem",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "1.3rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.2rem",
      marginBottom: "0.8rem",
    },
  },

  highlightDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      lineHeight: "1.6",
    },
  },

  // Why Choose Section - Enhanced Responsive
  whyChooseSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      padding: "60px 15px",
      minHeight: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "40px 12px",
    },
  },

  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
    // Enhanced responsive grid
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "1.2rem",
      marginTop: "1rem",
    },
  },

  benefitCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    cursor: "pointer",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      padding: "1.5rem",
    },
    "@media (max-width: 480px)": {
      padding: "1.2rem",
      borderRadius: "12px",
    },
  },

  benefitTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "1.3rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.2rem",
      marginBottom: "0.8rem",
    },
  },

  benefitDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      lineHeight: "1.6",
    },
  },

  // Who Benefits Section - Enhanced Responsive
  benefitsSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      padding: "60px 15px",
      minHeight: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "40px 12px",
    },
  },

  clientsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "3rem",
    marginTop: "3rem",
    // Enhanced responsive grid
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
  },

  clientCategory: {
    background: "#ffffff",
    padding: "2.5rem",
    borderRadius: "15px",
    border: "2px solid #0edb61",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      padding: "2rem",
    },
    "@media (max-width: 480px)": {
      padding: "1.5rem",
      borderRadius: "12px",
    },
  },

  clientIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    // Mobile adjustments
    "@media (max-width: 480px)": {
      marginBottom: "0.8rem",
    },
  },

  clientTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1.5rem",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "1.4rem",
      marginBottom: "1.2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.3rem",
      marginBottom: "1rem",
    },
  },

  clientList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },

  clientListItem: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1rem",
    lineHeight: "1.6",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      fontSize: "0.95rem",
      marginBottom: "0.8rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      marginBottom: "0.7rem",
    },
  },

  // CTA Section - Enhanced Responsive
  ctaSection: {
    background: "#ffffff",
    color: "#ffffff",
    padding: "80px 20px",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      padding: "60px 15px",
      minHeight: "auto",
    },
    "@media (max-width: 480px)": {
      padding: "40px 12px",
    },
  },

  ctaTitle: {
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#000000",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      marginBottom: "1.5rem",
    },
    "@media (max-width: 480px)": {
      marginBottom: "1.2rem",
      fontSize: "clamp(1.3rem, 6vw, 2rem)",
    },
  },

  ctaDescription: {
    fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
    lineHeight: "1.8",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    opacity: "0.95",
    color: "#000000",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      margin: "0 auto 1.5rem",
      lineHeight: "1.7",
    },
    "@media (max-width: 480px)": {
      fontSize: "clamp(0.85rem, 4vw, 1rem)",
      lineHeight: "1.6",
      margin: "0 auto 1.2rem",
    },
  },

  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "2rem",
    // Mobile adjustments
    "@media (max-width: 768px)": {
      gap: "0.8rem",
      marginBottom: "1.5rem",
    },
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "0.8rem",
      alignItems: "center",
      marginBottom: "1.2rem",
    },
  },

  ctaHighlight: {
    background: "rgba(14, 219, 97, 0.1)",
    padding: "1.5rem",
    borderRadius: "10px",
    fontSize: "clamp(1rem, 3vw, 1.3rem)",
    maxWidth: "700px",
    margin: "0 auto",
    border: "2px solid #0edb61",
    color: "#000000",
    transition: "all 0.3s ease",
    cursor: "pointer",
    // Mobile responsiveness
    "@media (max-width: 768px)": {
      padding: "1.2rem",
      maxWidth: "100%",
      fontSize: "clamp(0.95rem, 4vw, 1.2rem)",
    },
    "@media (max-width: 480px)": {
      padding: "1rem",
      borderRadius: "8px",
      fontSize: "clamp(0.9rem, 4.5vw, 1.1rem)",
    },
  },
};

export default ConCise;
