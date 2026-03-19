import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import "../ConponentCSS/Animations.css"; // Using your native Animations CSS
import TradingBackground from "./TradingBackground.jsx"; // Imported Trading Background
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
  Users,
  BookOpen,
  Check,
  Microscope,
  Building2,
  Handshake,
} from "lucide-react";

const ConStruct = () => {
  const navigate = useNavigate();
  const { colors, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);

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
      id: "conpact",
      name: "8ConPact",
      route: "/8conpact",
      desc: "Collaborate for Impact in Livelihood, Education, and Employment.",
      icon: <Handshake size={60} />,
    },
    {
      id: "consult",
      name: "8ConSult",
      route: "/8consult",
      desc: "Business development and startup advisory with Sir Nigel Santos.",
      icon: <BookOpen size={60} />,
    },
  ];

  // Handle header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use Intersection Observer to trigger classes from Animations.css
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 'visible' class triggers the animation in Animations.css
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Target all elements with these animation classes
    const animatedElements = document.querySelectorAll(".slide-in-right, .fade-in-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  const handleLearnMore = () => {
    handleSmoothScroll("services");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: "1.6",
      color: colors.textPrimary,
      margin: 0,
      padding: 0,
      backgroundColor: "#131B21", 
    },
    container2: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      position: "relative",
      zIndex: 2, // Keeps content above the animated background
    },

    heroSection: {
      minHeight: "100vh",
      backgroundImage: "linear-gradient(rgba(25, 35, 42, 0.65), rgba(25, 35, 42, 0.9)), url('../src/assets/images/imagebg.png')",
      backgroundColor: "#19232A",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
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
      justifyContent: "center",
      width: "100%",
      position: "relative",
      zIndex: 2,
      maxWidth: "900px",
      margin: "0 auto",
      marginTop: "-30vh", 
    },

    heroTopImage: {
      width: "clamp(300px, 50vw, 600px)",
      height: "auto",
      marginBottom: "-10rem",
      position: "relative",
      zIndex: 3,
      pointerEvents: "none",
      filter: "drop-shadow(0px 8px 25px rgba(154, 205, 50, 0.8))",
    },

    heroSubtitle: {
      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
      fontWeight: "700",
      marginTop: "0", 
      marginBottom: "1rem",
      color: "#ffffff",
      lineHeight: "1.3",
      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      position: "relative",
      zIndex: 4,
    },

    heroDescription: {
      fontSize: "clamp(1rem, 2vw, 1.15rem)",
      color: "#e2e8f0", 
      lineHeight: "1.6",
      maxWidth: "800px",
      marginTop: "0",
      marginBottom: "2.5rem",
      textShadow: "0 1px 5px rgba(0,0,0,0.5)",
    },

    heroForegroundContent: {
      width: "100%",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      zIndex: 4,
    },

    heroButtons: {
      display: "flex",
      gap: "1.5rem",
      justifyContent: "center",
      flexWrap: "wrap",
      position: "relative",
      zIndex: "5",
    },

    ctaButtonPrimary: {
      background: "#0edb61",
      color: "#ffffff",
      border: "none",
      padding: "14px 36px",
      fontSize: "1rem",
      fontWeight: "700",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: "0 4px 15px rgba(14, 219, 97, 0.3)",
    },

    ctaButtonSecondary: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(5px)",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      padding: "14px 36px",
      fontSize: "1rem",
      fontWeight: "700",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    leadershipSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    
    sectionTitle: {
      fontSize: "clamp(2rem, 5vw, 2.5rem)",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "2rem",
      textAlign: "center",
    },
    leadershipText: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: colors.textMuted,
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "0 auto",
    },
    
    servicesSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#19232A", 
      position: "relative",
      overflow: "hidden",
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    serviceCard: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      transition: "all 0.3s ease-out", 
      position: "relative", 
      overflow: "hidden",
      height: "100%",
    },
    serviceTitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "1rem",
    },
    serviceDescription: {
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      color: "#A0ABB5",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
    },
    serviceList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    serviceListItem: {
      fontSize: "0.95rem",
      color: "#A0ABB5",
      lineHeight: "1.6",
      marginBottom: "8px",
      paddingLeft: "0",
      display: "flex",
      alignItems: "flex-start",
    },

    whyChooseSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21",
      position: "relative",
      overflow: "hidden",
    },
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    benefitCard: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2rem",
      borderRadius: "15px",
      textAlign: "center",       
      display: "flex",   
      flexDirection: "column", 
      alignItems: "center",      
      gap: "1.2rem",     
      border: "1px solid rgba(255, 255, 255, 0.03)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease-out", 
      height: "100%",
    },
    benefitTitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
    },
    benefitDescription: {
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      color: "#A0ABB5",
      lineHeight: "1.6",
    },
    clientsSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      background: "#19232A",
      position: "relative",
      overflow: "hidden",
    },
    clientsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    clientCard: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2.5rem 2rem",
      borderRadius: "15px",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease-out", 
      height: "100%",
    },
    clientIcon: {
      fontSize: "clamp(2rem, 5vw, 3rem)",
      marginBottom: "1.5rem",
    },
    clientTitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "1rem",
    },
    clientDescription: {
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      color: colors.textMuted,
      lineHeight: "1.6",
    },
    ctaSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#131B21",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    ctaTitle: {
      fontSize: "clamp(2rem, 5vw, 2.5rem)",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "1.5rem",
      fontFamily: "'Unbounded', sans-serif",
    },
    ctaDescription: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: colors.textMuted,
      lineHeight: "1.6",
      marginBottom: "2.5rem",
      maxWidth: "600px",
      margin: "0 auto 2.5rem",
    },
    ctaButton: {
      backgroundColor: colors.accentGreen,
      color: "#ffffff",
      border: "none",
      padding: "clamp(12px, 3vw, 15px) clamp(30px, 6vw, 40px)",
      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
      fontWeight: "600",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(14, 219, 97, 0.2)",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 60px;
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
            background-color: rgba(19, 27, 33, 0.98);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
            color: #ffffff;
            padding: 10px 15px;
            border-radius: 6px;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
            position: relative;
            display: inline-block;
            cursor: pointer;
          }
          
          .nav-link:hover {
            transform: translateY(-2px);
            color: #0edb61;
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
            background-color: #1c2730;
            padding: 10px 0;
            min-width: 200px;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .dropdown-link {
            display: block;
            padding: 12px 20px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .dropdown-link:hover {
            background-color: rgba(255, 255, 255, 0.05);
            color: #0edb61;
          }
          
          .mobile-menu-toggle {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #ffffff;
            display: none;
            padding: 5px;
          }
          
          .mobile-nav {
            background-color: rgba(19, 27, 33, 0.98);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding: 10px 0;
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .mobile-nav-link {
            display: block;
            padding: 15px 20px;
            text-decoration: none;
            color: #ffffff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
            color: #ffffff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            background: none;
            border: none;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
          }
          
          .mobile-dropdown-content {
            background-color: #131B21;
            border-radius: 0.5rem;
            margin: 0 20px;
            margin-bottom: 10px;
          }
          
          .mobile-nav-sublink {
            display: block;
            padding: 12px 20px;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
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

          @media (max-width: 480px) {
            .header-container {
              padding-right: 3%;
              padding-left: 3%;
            }
          }

          .heroForegroundContent * {
            max-width: 100%;
            word-wrap: break-word;
          }
        `}
      </style>

      {/* Header - Navigation */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <a href="/" className="logo">
            <img
              src={isDark ? "/assets/logo/8con Academy Logo White.png" : "/assets/logo/8con Academy Logo.png"}
              alt="8Con Academy Logo"
              className="logo-img"
            />
          </a>

          <nav className="desktop-nav">
            <Link to="/sub-brands" className="nav-link">
              Home
            </Link>
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
                      navigate(brand.route);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
            <a href="#leadership" className="nav-link">
              Leadership
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#why-choose" className="nav-link">
              Insights
            </a>
            <a href="#clients" className="nav-link">
              Clients
            </a>
            <a href="#cta" className="nav-link">
              Contact
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/sub-brands" className="mobile-nav-link">
              Home
            </Link>
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
                        navigate(brand.route);
                        setMobileMenuOpen(false);
                        setMobileSubBrandsDropdownOpen(false);
                      }}
                    >
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#leadership"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leadership
            </a>
            <a
              href="#services"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#why-choose"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </a>
            <a
              href="#clients"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clients
            </a>
            <a
              href="#cta"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section (Original Design, NO TradingBackground) */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <img
            src="/assets/logo/7.png"
            alt="8ConStruct"
            style={styles.heroTopImage}
            className="fade-in-up anim-delay-1"
          />

          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className="fade-in-up anim-delay-2">
              Building Clarity, Confidence, and Results in Data
            </p>

            <p style={styles.heroDescription} className="fade-in-up anim-delay-3">
              Comprehensive research and statistical analysis services for businesses, academic institutions, and organizations. We provide data-driven insights to help you make informed decisions and achieve your strategic objectives.
            </p>

            <div style={styles.heroButtons} className="fade-in-up anim-delay-4">
              <button
                style={styles.ctaButtonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0bb454";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Started
              </button>

              <button
                style={styles.ctaButtonSecondary}
                onClick={handleLearnMore}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Section */}
      <section id="leadership" style={styles.leadershipSection}>
        <TradingBackground variant={1} />
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", color: "#ffffff" }} className="fade-in-up anim-delay-1">
            Led by <span style={{ color: "#75F94C" }}>Expert Leadership</span>
          </h2>
          <p style={styles.leadershipText} className="fade-in-up anim-delay-2">
            Services led by{" "}
            <strong style={{ color: "#39CC2F", fontWeight: "700" }}>Doc May L. Francisco</strong>, an
            expert with extensive experience in academic and business research,
            ensuring precision, reliability, and results that empower clients to
            excel in their respective fields.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={styles.servicesSection}>
        <TradingBackground variant={2} />
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, color: "#ffffff", fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }} className="fade-in-up">
            OUR SERVICES
          </h2>
          <div style={styles.servicesGrid}>
            {[
              {
                title: "Statistical Analysis for Research",
                description: "Comprehensive statistical services tailored to support academic and corporate research.",
                items: [
                  "• Academic Research: Thesis, dissertations, and journal articles",
                  "• Corporate Research: Data-driven business strategies and market analysis",
                  "• Advanced statistical modeling and predictive analysis",
                ],
              },
              {
                title: "Data Refinement and Management",
                description: "Transform raw data into meaningful insights through comprehensive data management.",
                items: [
                  "• Data Cleaning: Remove inconsistencies and ensure accuracy",
                  "• Data Transformation: Structure data for analysis and reporting",
                  "• Data Visualization: Create intuitive charts and dashboards",
                ],
              },
              {
                title: "Research Consultancy",
                description: "Personalized guidance for students, academics, and businesses.",
                items: [
                  "• Topic selection and research proposal writing",
                  "• Literature review for strong theoretical foundation",
                  "• Survey and experiment design assistance",
                ],
              },
              {
                title: "Customized Workshops and Training",
                description: "Tailored workshops to enhance research and data analysis skills.",
                items: [
                  "• Statistical tools training (SPSS, STATA, Excel, R)",
                  "• Data interpretation and hypothesis validation",
                  "• Effective presentation of research findings",
                ],
              },
              {
                title: "Technical Writing Support",
                description: "Professional assistance in writing and structuring research materials.",
                items: [
                  "• Research papers, reports, and presentations",
                  "• Focus on clarity, coherence, and academic rigor",
                  "• APA, MLA, Chicago formatting compliance",
                ],
              },
              {
                title: "Specialized Support for Companies",
                description: "Data-driven solutions for strategic business decisions.",
                items: [
                  "• Market Research: Trends and competitive analysis",
                  "• Operational Efficiency Studies: Workflow optimization",
                  "• Employee Insights: Organizational culture improvement",
                ],
              },
            ].map((service, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#F51616";
              
              // We wrap the card in a div with Animations.css classes 
              // so the entry transition doesn't conflict with the hover transition
              return (
                <div key={index} className={`slide-in-right anim-delay-${(index % 6) + 1}`}>
                  <div
                    style={styles.serviceCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(57, 204, 47, 0.15)"; 
                      e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.3)"; 
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: topColor }} />

                    <h3 style={{ ...styles.serviceTitle, fontFamily: "'Unbounded', sans-serif" }}>{service.title}</h3>
                    <p style={styles.serviceDescription}>{service.description}</p>
                    <ul style={styles.serviceList}>
                      {service.items.map((item, itemIndex) => {
                        const cleanText = item.replace("• ", "");

                        return (
                          <li key={itemIndex} style={styles.serviceListItem}>
                            <Check size={18} color="#39CC2F" strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                            <span>{cleanText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" style={styles.whyChooseSection}>
        <TradingBackground variant={1} />
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", color: "#ffffff", textTransform: "uppercase" }} className="fade-in-up">
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONSTRUCT?</span>
          </h2>

          <div style={styles.benefitsGrid}>
            {[
              {
                title: "Expert Leadership",
                description: "Years of experience in academic research and corporate consulting with Doc May L. Francisco's deep understanding of research methodologies.",
                icon: <Brain size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Comprehensive Support",
                description: "End-to-end support from initial research design to final presentation of results, ensuring a seamless process.",
                icon: <BookOpen size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Tailored Solutions",
                description: "Every project is unique, and our approach is customized to meet specific needs of students, academics, or businesses.",
                icon: <Target size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Quality Assurance",
                description: "Rigorous quality checks ensure accuracy, reliability, and adherence to international research standards.",
                icon: <Globe size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Timely Delivery",
                description: "Committed to meeting deadlines without compromising on quality, helping clients stay on track with their goals.",
                icon: <TrendingUp size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Affordable Excellence",
                description: "High-quality services at competitive rates, making professional research support accessible to students and businesses alike.",
                icon: <Award size={48} color="#39CC2F" strokeWidth={1.5} />
              },
            ].map((benefit, index) => (
              <div key={index} className={`slide-in-right anim-delay-${(index % 6) + 1}`}>
                <div
                  style={styles.benefitCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(57, 204, 47, 0.15)"; 
                    e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.3)"; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)"; 
                  }}
                >
                  <div>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                    <p style={styles.benefitDescription}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" style={styles.clientsSection}>
        <TradingBackground variant={2} />
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, color: "#ffffff", fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }} className="fade-in-up">
            WHO WE SERVE
          </h2>
          
          <div style={styles.clientsGrid}>
            {[
              {
                title: "Students & Academics",
                description: "Supporting undergraduate, graduate, and doctoral students with thesis, dissertation, and research projects.",
                icon: <BookOpen size={48} color="#75F94C" strokeWidth={1.5} />,
              },
              {
                title: "Researchers & Institutions",
                description: "Collaborating with research institutions, universities, and independent researchers on complex studies.",
                icon: <Microscope size={48} color="#75F94C" strokeWidth={1.5} />,
              },
              {
                title: "Businesses & Corporations",
                description: "Helping companies make data-driven decisions through market research, operational studies, and strategic analysis.",
                icon: <Building2 size={48} color="#75F94C" strokeWidth={1.5} />,
              },
            ].map((client, index) => (
              <div key={index} className={`slide-in-right anim-delay-${(index % 6) + 1}`}>
                <div
                  style={styles.clientCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"; 
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(57, 204, 47, 0.15)"; 
                    e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.3)"; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)"; 
                  }}
                >
                  <div style={styles.clientIcon}>{client.icon}</div>
                  <h3 style={styles.clientTitle}>{client.title}</h3>
                  <p style={styles.clientDescription}>{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" style={styles.ctaSection}>
        <TradingBackground variant={1} />
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="fade-in-up anim-delay-1">Ready to Transform Your Data?</h2>
          <p style={styles.ctaDescription} className="fade-in-up anim-delay-2">
            Let 8ConStruct help you build clarity, confidence, and results in
            your research and data analysis projects.
          </p>
          
          {/* Using a wrapper for the animation so the button's inline styles remain untouched */}
          <div className="fade-in-up anim-delay-3" style={{ display: "inline-block" }}>
            <button
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0bb454";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 25px rgba(14, 219, 97, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#0edb61";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(14, 219, 97, 0.2)";
              }}
              onClick={() => {
                window.location.href = "mailto:contact@8construct.com";
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConStruct;