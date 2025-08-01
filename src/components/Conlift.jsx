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

const ConLift = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);

  const isAnimated = (sectionId) => animatedSections.has(sectionId);

  // Refs for animation observers
  const heroRef = useRef(null);
  const initiativesRef = useRef(null);
  const benefitsRef = useRef(null);
  const whyChooseRef = useRef(null);
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

  // Scroll handler for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer setup (like Converse)
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

    const sections = [
      heroRef,
      initiativesRef,
      benefitsRef,
      whyChooseRef,
      ctaRef,
    ];

    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Observer for hero section to detect when user is at top (like Converse)
  useEffect(() => {
    const heroObserverOptions = {
      threshold: 0.6,
      rootMargin: "0px",
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const wasInHero = isInHeroSection;
        const nowInHero = entry.isIntersecting;

        setIsInHeroSection(nowInHero);

        if (nowInHero && !wasInHero) {
          // Reset ALL section animations when entering hero section
          setAnimatedSections(new Set());
          setHeroAnimationKey((prev) => prev + 1);

          // Trigger hero animation
          setTimeout(() => {
            setAnimatedSections((prev) => new Set([...prev, "hero"]));
          }, 100);
        }
      });
    }, heroObserverOptions);

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => heroObserver.disconnect();
  }, [isInHeroSection]);

  // Initial page load animation trigger (like Converse)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAnimatedSections(new Set());

    setTimeout(() => {
      setAnimatedSections((prev) => new Set([...prev, "hero"]));
    }, 300);
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

  return (
    <div style={styles.container}>
      {/* Add CSS styles */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 2px;
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

          /* Animation Classes for Converse-style animations */
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(60px);
            transition: none;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1.2s ease-out forwards;
          }

          .animate-slide-in-top {
            animation: slideInFromTop 1s ease-out forwards;
          }

          .animate-zoom-in {
            animation: zoomIn 0.8s ease-out forwards;
          }

          .animate-pulse-glow {
            animation: pulseGlow 2s infinite;
          }

          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.3s; }
          .stagger-3 { animation-delay: 0.5s; }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
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
          
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-toggle {
              display: block !important;
            }
          }
          
          @media (min-width: 1025px) {
            .mobile-nav {
              display: none !important;
            }
          }
/* Additional animation classes for other sections */
.animate-fade-in-left {
  animation: fadeInLeft 1s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out forwards;
}

.animate-slide-in-bottom {
  animation: slideInFromBottom 1s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out forwards;
}

/* Animation delays for staggered effects */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-800 { animation-delay: 0.8s; }

/* New keyframes */
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInFromBottom {
  from { opacity: 0; transform: translateY(100px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
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

.animate-slide-in-bottom {
  animation: slideInFromBottom 1s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.delay-800 { animation-delay: 0.8s; }

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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
              href="#initiatives"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("initiatives");
              }}
            >
              Key Initiatives
            </a>
            <a
              href="#benefits"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("benefits");
              }}
            >
              Benefits
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
              href="#initiatives"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("initiatives");
              }}
            >
              Key Initiatives
            </a>
            <a
              href="#benefits"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("benefits");
              }}
            >
              Benefits
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
      <section id="hero" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          {/* Large Brand Logo/Number Image - Like ConVerse */}
          <img
            src="/assets/logo/2.png"
            alt="8ConLift"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${
              isAnimated("hero") ? "animate-slide-in-top" : ""
            }`}
          />

          {/* Glassmorphic Content Block */}
          <div style={styles.heroForegroundContent}>
            {/* Subtitle */}
            <p
              style={styles.heroSubtitle}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-1" : ""
              }`}
            >
              Lifting Dreams, Transforming Lives
            </p>

            {/* Description */}
            <p
              style={styles.heroDescription}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""
              }`}
            >
              8ConLift is dedicated to empowering underserved Filipinos by
              providing scholarships, training programs, and pathways to
              financial independence. We believe in creating opportunities for
              individuals to build a better future through education and skill
              development.
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
                Apply for Scholarship
              </button>

              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("initiatives")}
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

      {/* Key Initiatives Section - White Background */}
      <section
        id="initiatives"
        ref={initiativesRef}
        style={styles.initiativesSection}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#000000" }}
            className={`animate-on-scroll ${
              isAnimated("initiatives") ? "animate-fade-in-up" : ""
            }`}
          >
            Key Initiatives Under 8ConLift
          </h2>
          <div style={styles.initiativesGrid}>
            <div
              style={styles.initiativeCard}
              className={`animate-on-scroll ${
                isAnimated("initiatives")
                  ? "animate-fade-in-left delay-100"
                  : ""
              }`}
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
              <div style={styles.initiativeIcon}>
                <GraduationCap size={40} color="#0edb61" />
              </div>
              <h3 style={styles.initiativeTitle}>
                Scholarships for Underserved Filipinos
              </h3>
              <p style={styles.initiativeDescription}>
                Provide financial assistance to deserving individuals who
                demonstrate potential and determination but lack resources for
                quality education.
              </p>
              <ul style={styles.initiativeList}>
                <li style={styles.initiativeListItem}>
                  • Tuition for Forex Derivative Course
                </li>
                <li style={styles.initiativeListItem}>
                  • Access to review programs for licensure exams
                </li>
                <li style={styles.initiativeListItem}>
                  • Language certification support
                </li>
                <li style={styles.initiativeListItem}>
                  • Comprehensive educational journey support
                </li>
              </ul>
            </div>

            <div
              style={styles.initiativeCard}
              className={`animate-on-scroll ${
                isAnimated("initiatives")
                  ? "animate-fade-in-left delay-200"
                  : ""
              }`}
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
              <div style={styles.initiativeIcon}>
                <Users size={40} color="#0edb61" />
              </div>
              <h3 style={styles.initiativeTitle}>
                Training Programs & OJT Opportunities
              </h3>
              <p style={styles.initiativeDescription}>
                Offer students real-world experience through On-the-Job Training
                programs at 8Con Academy, franchises, or partner companies.
              </p>
              <ul style={styles.initiativeList}>
                <li style={styles.initiativeListItem}>
                  • Hands-on training programs
                </li>
                <li style={styles.initiativeListItem}>
                  • Practical application of learned skills
                </li>
                <li style={styles.initiativeListItem}>
                  • Real-world trading challenges
                </li>
                <li style={styles.initiativeListItem}>
                  • Business and specialized career preparation
                </li>
              </ul>
            </div>

            <div
              style={styles.initiativeCard}
              className={`animate-on-scroll ${
                isAnimated("initiatives")
                  ? "animate-fade-in-left delay-300"
                  : ""
              }`}
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
              <div style={styles.initiativeIcon}>
                <ArrowRight size={40} color="#0edb61" />
              </div>
              <h3 style={styles.initiativeTitle}>
                Enrollment to Employment Program
              </h3>
              <p style={styles.initiativeDescription}>
                Graduates of Forex Derivative Course Level II are guided through
                career opportunities aligned with their skills and goals.
              </p>
              <ul style={styles.initiativeList}>
                <li style={styles.initiativeListItem}>
                  • Stand-Alone Trader pathway
                </li>
                <li style={styles.initiativeListItem}>
                  • Proprietary Firm Trader positions
                </li>
                <li style={styles.initiativeListItem}>
                  • 8Con Trading Hub opportunities
                </li>
                <li style={styles.initiativeListItem}>
                  • Private Company Forex Trader roles
                </li>
              </ul>
            </div>

            <div
              style={styles.initiativeCard}
              className={`animate-on-scroll ${
                isAnimated("initiatives")
                  ? "animate-fade-in-left delay-400"
                  : ""
              }`}
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
              <div style={styles.initiativeIcon}>
                <Handshake size={40} color="#0edb61" />
              </div>
              <h3 style={styles.initiativeTitle}>
                Government Grants & Partnerships
              </h3>
              <p style={styles.initiativeDescription}>
                Secure government funding to provide broader access to
                scholarships and training programs for marginalized communities.
              </p>
              <ul style={styles.initiativeList}>
                <li style={styles.initiativeListItem}>
                  • Government funding initiatives
                </li>
                <li style={styles.initiativeListItem}>
                  • LGU collaboration programs
                </li>
                <li style={styles.initiativeListItem}>
                  • Deserving beneficiary identification
                </li>
                <li style={styles.initiativeListItem}>
                  • Program impact expansion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Black Background */}
      <section id="benefits" ref={benefitsRef} style={styles.benefitsSection}>
        <div style={styles.container2}>
          <h2
            style={styles.sectionTitle}
            className={`animate-on-scroll ${
              isAnimated("benefits") ? "animate-fade-in-up" : ""
            }`}
          >
            Benefits of 8ConLift
          </h2>
          <div style={styles.benefitsGrid}>
            <div
              style={styles.benefitCard}
              className={`animate-on-scroll ${
                isAnimated("benefits") ? "animate-scale-in delay-100" : ""
              }`}
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
              <div style={styles.benefitIcon}>
                <Star size={50} color="#0edb61" />
              </div>
              <h3 style={styles.benefitTitle}>Empowering Individuals</h3>
              <p style={styles.benefitDescription}>
                Provide access to education and training that equips
                beneficiaries with skills for lifelong success and personal
                growth.
              </p>
            </div>

            <div
              style={styles.benefitCard}
              className={`animate-on-scroll ${
                isAnimated("benefits") ? "animate-scale-in delay-200" : ""
              }`}
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
              <div style={styles.benefitIcon}>
                <DollarSign size={50} color="#ff1f2c" />
              </div>
              <h3 style={styles.benefitTitle}>Creating Career Pathways</h3>
              <p style={styles.benefitDescription}>
                Through the "Enrollment to Employment" program, graduates
                seamlessly transition from learning to earning, fostering
                financial independence.
              </p>
            </div>

            <div
              style={styles.benefitCard}
              className={`animate-on-scroll ${
                isAnimated("benefits") ? "animate-scale-in delay-300" : ""
              }`}
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
              <div style={styles.benefitIcon}>
                <Building size={50} color="#0edb61" />
              </div>
              <h3 style={styles.benefitTitle}>Strengthening Communities</h3>
              <p style={styles.benefitDescription}>
                By uplifting individuals, 8ConLift contributes to the economic
                and social growth of communities across the Philippines.
              </p>
            </div>

            <div
              style={styles.benefitCard}
              className={`animate-on-scroll ${
                isAnimated("benefits") ? "animate-scale-in delay-400" : ""
              }`}
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
              <div style={styles.benefitIcon}>
                <Heart size={50} color="#ff1f2c" />
              </div>
              <h3 style={styles.benefitTitle}>Supporting Underserved Groups</h3>
              <p style={styles.benefitDescription}>
                Scholarships, OJTs, and government grants ensure that even the
                most disadvantaged individuals have access to quality training
                and career opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose 8ConLift Section - White Background */}
      <section
        id="why-choose"
        ref={whyChooseRef}
        style={styles.whyChooseSection}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#000000" }}
            className={`animate-on-scroll ${
              isAnimated("why-choose") ? "animate-fade-in-up" : ""
            }`}
          >
            Why Choose 8ConLift?
          </h2>
          <div style={styles.whyChooseGrid}>
            <div
              style={styles.whyChooseCard}
              className={`animate-on-scroll ${
                isAnimated("why-choose")
                  ? "animate-slide-in-bottom delay-200"
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
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#0edb61";
              }}
            >
              <h3 style={styles.whyChooseTitle}>Comprehensive Support</h3>
              <p style={styles.whyChooseDescription}>
                Beyond education, beneficiaries receive mentorship, hands-on
                training, and career placement support throughout their journey.
              </p>
            </div>

            <div
              style={styles.whyChooseCard}
              className={`animate-on-scroll ${
                isAnimated("why-choose")
                  ? "animate-slide-in-bottom delay-400"
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
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#0edb61";
              }}
            >
              <h3 style={styles.whyChooseTitle}>Collaborative Growth</h3>
              <p style={styles.whyChooseDescription}>
                By partnering with LGUs, businesses, and private firms, 8ConLift
                ensures sustainable support and impactful outcomes for
                beneficiaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section id="cta" ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.container2}>
          <h2
            style={styles.ctaTitle}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-fade-in-up" : ""
            }`}
          >
            Transforming Lives, One Dream at a Time
          </h2>
          <p
            style={styles.ctaDescription}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-fade-in-up delay-200" : ""
            }`}
          >
            At 8ConLift, we believe in the power of education to change lives.
            Through scholarships, OJT opportunities, and our unique Enrollment
            to Employment Program, we are creating a future where financial
            independence and success are within reach for every Filipino.
          </p>
          <div
            style={styles.ctaButtons}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-bounce-in delay-400" : ""
            }`}
          >
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
              Apply for Program
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
              Partner With Us
            </button>
          </div>
          <div
            style={styles.ctaHighlight}
            className={`animate-on-scroll ${
              isAnimated("cta") ? "animate-scale-in delay-600" : ""
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
              Join 8ConLift today—where dreams take flight and lives are
              transformed!
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles object
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
  },

  heroTopImage: {
    width: "clamp(250px, 40vw, 500px)",
    height: "auto",
    opacity: 0.9,
    pointerEvents: "none",
    marginTop: "-80px",
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
  },

  heroSubtitle: {
    fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
    fontWeight: "600",
    marginBottom: "1rem",
    margin: "0 0 1rem 0",
    opacity: "0.9",
    color: "#ffffff",
    lineHeight: "1.3",
  },

  heroDescription: {
    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
    color: "#cccccc",
    lineHeight: "1.6",
    marginTop: "0",
    marginBottom: "0",
    paddingBottom: "0",
    opacity: "0.95",
  },

  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "2rem",
    margin: "0",
    padding: "0",
    position: "relative",
    zIndex: "1",
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
  },

  // Key Initiatives Section - White Background
  initiativesSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#0edb61",
    textAlign: "center",
    marginBottom: "3rem",
  },

  initiativesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  initiativeCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    textAlign: "center",
  },

  initiativeIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  initiativeTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
  },

  initiativeDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },

  initiativeList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },

  initiativeListItem: {
    fontSize: "0.95rem",
    color: "#000000",
    marginBottom: "0.8rem",
    lineHeight: "1.5",
  },

  // Benefits Section - Black Background
  benefitsSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  benefitCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "2px solid #f0f0f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  benefitIcon: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  benefitTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "1rem",
  },

  benefitDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
  },

  // Why Choose 8ConLift Section - White Background
  whyChooseSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  whyChooseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },

  whyChooseCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  whyChooseTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
  },

  whyChooseDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
  },

  // CTA Section - Black Background
  ctaSection: {
    background: "#000000",
    color: "#000000",
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
    color: "#ffffff",
  },

  ctaDescription: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    lineHeight: "1.8",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    opacity: "0.95",
    color: "#ffffff",
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
    color: "#ffffff",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};

export default ConLift;
