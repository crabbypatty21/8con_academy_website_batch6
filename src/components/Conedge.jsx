import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import "../ConponentCSS/Animations.css"; // Imported native animations
import TradingBackground from "./TradingBackground.jsx"; // Forex trading background
import {
  ChevronDown,
  Brain,
  Target,
  Globe,
  Award,
  Network,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Rocket,
  Users,
  Star,
  BookOpen,
  Check,
  Handshake,
} from "lucide-react";

const ConEdge = () => {
  const { isDark, colors } = useTheme();
  const navigate = useNavigate();
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

  // Header scroll background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Intersection Observer for Animations.css classes
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".slide-in-right, .fade-in-up, .fade-in, .scale-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      zIndex: 2,
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
      zIndex: 2, // Added to shield the hero from the fixed animation background
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

    aboutSection: {
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
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "2rem",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },

    statNumber: {
      fontSize: "clamp(2rem, 5vw, 3rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#39CC2F",
      marginBottom: "0.5rem",
    },

    statLabel: {
      fontSize: "1rem",
      color: "#A0ABB5",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },

    toolsSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#19232A", 
      position: "relative",
      overflow: "hidden",
    },

    toolsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
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

    ctaSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#19232A",
      textAlign: "center",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },

    ctaTitle: {
      fontSize: "clamp(2rem, 5vw, 2.8rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "1.5rem",
      textTransform: "uppercase",
    },

    ctaDescription: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: "#A0ABB5",
      lineHeight: "1.8",
      marginBottom: "2.5rem",
      maxWidth: "800px",
      margin: "0 auto 2.5rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Global Fixed Trading Background applied ONE time */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <TradingBackground variant={1} />
      </div>

      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 60px;
          }
          
          /* ----- Beautiful CSS for the Cards ----- */
          .conedge-card {
            background: linear-gradient(145deg, #1c2730, #131b21);
            padding: 2rem;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out;
          }

          .conedge-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(57, 204, 47, 0.15);
            border-color: rgba(57, 204, 47, 0.3);
          }
          
          /* ----- Grid 2x2 for Why Choose Section ----- */
          .grid-2x2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 3rem;
          }
          
          @media (max-width: 768px) {
            .grid-2x2 {
              grid-template-columns: 1fr;
            }
          }

          /* ----- Beautiful CSS for the Buttons ----- */
          .btn-primary {
            background: #0edb61;
            color: #ffffff;
            border: none;
            padding: 14px 36px;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(14, 219, 97, 0.3);
          }
          .btn-primary:hover {
            background: #ff1f2c; /* Conedge secondary accent */
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 31, 44, 0.3);
          }

          .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(5px);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            padding: 14px 36px;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 1);
          }

          /* ----- Header CSS ----- */
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
            background: none;
            border: none;
            font-family: inherit;
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
            background: none;
            border: none;
            font-family: inherit;
            width: 100%;
            text-align: left;
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
            .desktop-nav { display: none !important; }
            .mobile-menu-toggle { display: block !important; }
          }
          @media (min-width: 1025px) {
            .mobile-nav { display: none !important; }
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
            <button onClick={() => handleSmoothScroll("about")} className="nav-link">
              About
            </button>
            <button onClick={() => handleSmoothScroll("tools")} className="nav-link">
              Tools
            </button>
            <button onClick={() => handleSmoothScroll("why-choose")} className="nav-link">
              Insights
            </button>
            <button onClick={() => handleSmoothScroll("cta")} className="nav-link">
              Contact
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`mobile-menu-toggle${mobileMenuOpen ? " open" : ""}`}
            aria-label="Toggle mobile menu"
          >
            <span className="burger-icon">
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </span>
          </button>
        </div>

      </header>

        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/sub-brands" className="mobile-nav-link">
              Home
            </Link>
            <div className="mobile-dropdown">
              <button
                className="mobile-nav-link mobile-dropdown-toggle"
                onClick={() => setMobileSubBrandsDropdownOpen(!mobileSubBrandsDropdownOpen)}
              >
                Sub-brands <ChevronDown size={16} className={mobileSubBrandsDropdownOpen ? "rotate-180" : ""} />
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
            <button onClick={() => handleSmoothScroll("about")} className="mobile-nav-link">
              About
            </button>
            <button onClick={() => handleSmoothScroll("tools")} className="mobile-nav-link">
              Tools
            </button>
            <button onClick={() => handleSmoothScroll("why-choose")} className="mobile-nav-link">
              Insights
            </button>
            <button onClick={() => handleSmoothScroll("cta")} className="mobile-nav-link">
              Contact
            </button>
          </nav>
        )}

      {/* Hero Section */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <img
            src="/assets/logo/5.png"
            alt="8ConEdge"
            style={styles.heroTopImage}
            className="fade-in-up anim-delay-1"
          />

          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className="fade-in-up anim-delay-2">
              Cutting-Edge Forex Tools for Trading Excellence
            </p>
            <p style={styles.heroDescription} className="fade-in-up anim-delay-3">
              Proprietary Forex tools and advanced trading systems designed to enhance trading efficiency, maximize profits, and provide traders with the competitive edge they need to succeed in the global markets.
            </p>
            <div style={styles.heroButtons} className="fade-in-up anim-delay-4">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-secondary" onClick={() => handleSmoothScroll("tools")}>
                Explore Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }} className="fade-in-up anim-delay-1">
            ADVANCED <span style={{ color: "#39CC2F" }}>TRADING TECHNOLOGY</span>
          </h2>
          {/* Removed duplicate style prop here */}
          <p className="fade-in-up anim-delay-2" style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", color: colors.textMuted, lineHeight: "1.8", maxWidth: "800px", margin: "0 auto" }}>
            8ConEdge delivers <strong style={{ color: "#39CC2F", fontWeight: "700" }}>cutting-edge proprietary Forex tools</strong> that revolutionize the way traders analyze markets, execute trades, and manage risk. Our advanced technology combines artificial intelligence, real-time market analysis, and sophisticated algorithms to provide traders with unparalleled insights and trading advantages.
          </p>
          <div style={styles.statsGrid}>
            {[
              { number: "95%", label: "Accuracy Rate" },
              { number: "24/7", label: "Market Monitoring" },
              { number: "500+", label: "Active Traders" }
            ].map((stat, index) => (
              <div key={index} className={`scale-up anim-delay-${(index % 3) + 3}`}>
                <div className="conedge-card" style={{ alignItems: "center", justifyContent: "center" }}>
                  <div style={styles.statNumber}>{stat.number}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" style={styles.toolsSection}>
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, color: "#ffffff", fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }} className="fade-in-up">
            OUR PROPRIETARY TOOLS
          </h2>
          <div style={styles.toolsGrid}>
            {[
              {
                icon: <BarChart3 size={40} color="#39CC2F" strokeWidth={1.5} />,
                title: "Smart Market Analyzer",
                description: "AI-powered market analysis tool that identifies profitable trading opportunities by analyzing multiple currency pairs simultaneously.",
                features: ["Real-time market scanning", "Pattern recognition algorithms", "Automated signal generation"],
              },
              {
                icon: <Zap size={40} color="#ff1f2c" strokeWidth={1.5} />,
                title: "Lightning Trade Executor",
                description: "Ultra-fast trade execution platform that ensures optimal entry and exit points with minimal slippage and maximum efficiency.",
                features: ["Sub-second execution speed", "Advanced order management", "Multi-broker compatibility"],
              },
              {
                icon: <Shield size={40} color="#39CC2F" strokeWidth={1.5} />,
                title: "Risk Guardian Pro",
                description: "Comprehensive risk management system that protects your capital through advanced position sizing and automated stop-loss mechanisms.",
                features: ["Dynamic position sizing", "Automated risk controls", "Portfolio protection alerts"],
              },
              {
                icon: <Rocket size={40} color="#ff1f2c" strokeWidth={1.5} />,
                title: "Profit Accelerator",
                description: "Advanced profit optimization engine that maximizes returns through intelligent trade scaling and momentum-based position management.",
                features: ["Automated profit scaling", "Momentum indicators", "Performance optimization"],
              },
              {
                icon: <Users size={40} color="#39CC2F" strokeWidth={1.5} />,
                title: "Social Trading Hub",
                description: "Connect with professional traders, copy successful strategies, and learn from the best performers in our exclusive trading community.",
                features: ["Strategy copying", "Performance leaderboards", "Community insights"],
              },
              {
                icon: <Star size={40} color="#ff1f2c" strokeWidth={1.5} />,
                title: "Elite Backtesting Engine",
                description: "Professional-grade backtesting platform that validates trading strategies using historical data with institutional-level accuracy and detail.",
                features: ["Historical data analysis", "Strategy validation", "Performance metrics"],
              },
            ].map((tool, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";

              return (
                <div key={index} className={`slide-in-right anim-delay-${(index % 6) + 1}`}>
                  <div className="conedge-card">
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: topColor }} />
                    <div>{tool.icon}</div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "1rem", marginTop: "1rem" }}>{tool.title}</h3>
                    <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6", marginBottom: "1.5rem" }}>{tool.description}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {tool.features.map((feature, idx) => (
                        <li key={idx} style={{ fontSize: "0.95rem", color: "#A0ABB5", lineHeight: "1.6", marginBottom: "8px", paddingLeft: "0", display: "flex", alignItems: "flex-start" }}>
                          <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                          <span>{feature}</span>
                        </li>
                      ))}
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
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", color: "#ffffff", textTransform: "uppercase" }} className="fade-in-up">
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONEDGE?</span>
          </h2>
          
          <div className="grid-2x2">
            {[
              {
                title: "Proprietary Technology",
                description: "Our tools are built in-house by expert developers and traders, ensuring unique features and competitive advantages not available elsewhere.",
                icon: <Brain size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Proven Performance",
                description: "Track record of helping traders achieve consistent profitability with tools tested and refined by professional traders in live market conditions.",
                icon: <TrendingUp size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Continuous Innovation",
                description: "Regular updates and new features based on market evolution and user feedback, keeping you ahead of market trends and opportunities.",
                icon: <Rocket size={48} color="#39CC2F" strokeWidth={1.5} />
              },
              {
                title: "Expert Support",
                description: "24/7 technical support from trading professionals who understand both the technology and the markets, ensuring you maximize your trading potential.",
                icon: <Users size={48} color="#39CC2F" strokeWidth={1.5} />
              },
            ].map((benefit, index) => (
              <div key={index} className={`slide-in-right anim-delay-${(index % 4) + 1}`}>
                <div className="conedge-card" style={{ alignItems: "center", textAlign: "center" }}>
                  <div>{benefit.icon}</div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem", marginTop: "1rem" }}>{benefit.title}</h3>
                    <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" style={styles.ctaSection}>
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="fade-in-up anim-delay-1">
            Transform Your Trading Journey with <span style={{ color: "#ff1f2c" }}>8ConEdge</span>
          </h2>
          <p style={styles.ctaDescription} className="fade-in-up anim-delay-2">
            Don't let another profitable opportunity slip away. With 8ConEdge's cutting-edge proprietary tools, you'll gain the precision, speed, and intelligence that separates consistently profitable traders from the rest. Our AI-powered market analysis, lightning-fast execution, and advanced risk management systems work together 24/7 to maximize your trading potential while protecting your capital.
          </p>
          <div className="fade-in-up anim-delay-3" style={{ display: "inline-block" }}>
            <div
              style={{
                background: "#0edb61",
                padding: "1.5rem 2rem",
                borderRadius: "50px",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                maxWidth: "800px",
                margin: "0 auto",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(14, 219, 97, 0.3)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 31, 44, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(14, 219, 97, 0.3)";
              }}
            >
              🚀 Unlock Your Trading Potential - Start Your 14-Day Free Trial!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConEdge;