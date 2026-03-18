import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
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
  BarChart3,
  Zap,
  Shield,
  Rocket,
  Users,
  Star,
  BookOpen,
  Check, // Imported Check for lists
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
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(false);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);

  // Animation refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const toolsRef = useRef(null);
  const whyChooseRef = useRef(null);
  const ctaRef = useRef(null);
  const toolCardsRef = useRef([]);
  const benefitCardsRef = useRef([]);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setAnimatedSections((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const sectionRefs = [heroRef, aboutRef, toolsRef, whyChooseRef, ctaRef];

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInHero = isInHeroSection;
          const nowInHero = entry.isIntersecting;

          setIsInHeroSection(nowInHero);

          if (nowInHero && !wasInHero) {
            setAnimatedSections(new Set());
            setHeroAnimationKey((prev) => prev + 1);
            setTimeout(() => {
              setAnimatedSections(new Set(["hero"]));
            }, 100);
          } else if (nowInHero && wasInHero) {
            setAnimatedSections((prev) => new Set([...prev, "hero"]));
          }
        });
      },
      { threshold: 0.6 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    return () => heroObserver.disconnect();
  }, [isInHeroSection]);

  const handleNavigation = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
    setSubBrandsDropdownOpen(false);
    setMobileSubBrandsDropdownOpen(false);
  };

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

  // Applied Construct Design Styles
  const styles = {
    container: {
      minHeight: "100vh",
      fontFamily: "'Montserrat', sans-serif", // Changed to match Construct
      lineHeight: "1.6",
      color: colors.textPrimary,
      margin: 0,
      padding: 0,
    },

    container2: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
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

    // Apply #131B21 Background
    aboutSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21",
      textAlign: "center",
    },

    sectionTitle: {
      fontSize: "clamp(2rem, 5vw, 2.5rem)",
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "2rem",
    },

    aboutText: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: "#A0ABB5",
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "0 auto",
    },

    strongText: {
      color: "#39CC2F",
      fontWeight: "700",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },

    // Lifted 3D Card Style for Stats
    statCard: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2rem",
      borderRadius: "15px",
      textAlign: "center",
      display: "flex",   
      flexDirection: "column", 
      alignItems: "center",      
      gap: "0.5rem",     
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.03)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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

    // Apply #19232A Background
    toolsSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#19232A", 
    },

    toolsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },

    // Lifted 3D Card Style for Tools
    toolCard: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2rem",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative", 
      overflow: "hidden", 
    },

    toolTitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "1rem",
      marginTop: "1rem",
    },

    toolDescription: {
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      color: "#A0ABB5",
      lineHeight: "1.6",
      marginBottom: "1.5rem",
    },

    toolFeatures: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },

    toolFeatureItem: {
      fontSize: "0.95rem",
      color: "#A0ABB5",
      lineHeight: "1.6",
      marginBottom: "8px",
      paddingLeft: "0",
      display: "flex", 
      alignItems: "flex-start", 
    },

    // Apply #131B21 Background
    whyChooseSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21", 
    },

    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },

    // Lifted 3D Card Style for Benefits
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
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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

    // Apply #19232A Background
    ctaSection: {
      padding: "clamp(60px, 12vh, 80px) clamp(20px, 5vw, 40px)",
      backgroundColor: "#19232A",
      textAlign: "center",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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

    ctaHighlight: {
      background: "#0edb61",
      padding: "1.5rem 2rem",
      borderRadius: "50px",
      fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
      maxWidth: "800px",
      margin: "0 auto 2rem",
      color: "#ffffff",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: "0 8px 25px rgba(14, 219, 97, 0.2)",
      fontWeight: "700",
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
            background-color: ${colors.headerScrolledBg};
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
            color: ${isDark ? "rgb(255,255,255)" : "#1a1a2e"};
            padding: 10px 15px;
            border-radius: 6px;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
            position: relative;
            display: inline-block;
            cursor: pointer;
            background: none;
            border: none;
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            text-transform: inherit;
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
            background-color: ${colors.bgCard};
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
            color: ${colors.textPrimary};
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
            color: ${isDark ? "rgb(255,255,255)" : "#1a1a2e"};
            display: none;
            padding: 5px;
          }

          .mobile-nav {
            background-color: ${isDark ? "rgba(19,27,33,0.98)" : "rgba(255,255,255,0.98)"};
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
            color: ${colors.textPrimary};
            border-bottom: 1px solid #f3f4f6;
            font-size: 16px;
            transition: background-color 0.3s ease;
            background: none;
            border: none;
            font-family: inherit;
            cursor: pointer;
            text-align: left;
            width: 100%;
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
            background-color: ${colors.bgSurface};
            border-radius: 0.5rem;
            margin: 0 20px;
            margin-bottom: 10px;
          }

          .mobile-nav-sublink {
            display: block;
            padding: 12px 20px;
            color: ${colors.textPrimary};
            text-decoration: none;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          
          .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }

          /* Animation Keyframes */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInFromTop {
            from { opacity: 0; transform: translateY(-60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(14, 219, 97, 0.3); }
            50% { box-shadow: 0 0 40px rgba(14, 219, 97, 0.6); }
          }

          .animate-pulse-glow { animation: pulseGlow 2s infinite; }
          .animate-slide-in-top { animation: slideInFromTop 1s ease-out forwards; }
          .animate-zoom-in { animation: zoomIn 0.8s ease-out forwards; }
          .animate-fade-in-up { animation: fadeInUp 1.2s ease-out forwards; }

          .animate-on-scroll { opacity: 0; transform: translateY(60px); }
          .section-animate { opacity: 0; transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
          .section-animate.animate { opacity: 1; }

          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.3s; }
          .stagger-3 { animation-delay: 0.5s; }

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
                        handleNavigation(brand.route);
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
      </header>

      {/* Hero Section */}
      <section id="hero" style={styles.heroSection} ref={heroRef}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          <img
            src="/assets/logo/5.png"
            alt="8ConEdge"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${animatedSections.has("hero") ? "animate-slide-in-top" : ""}`}
          />

          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className={`animate-on-scroll ${animatedSections.has("hero") ? "animate-fade-in-up stagger-1" : ""}`}>
              Cutting-Edge Forex Tools for Trading Excellence
            </p>
            <p style={styles.heroDescription} className={`animate-on-scroll ${animatedSections.has("hero") ? "animate-fade-in-up stagger-2" : ""}`}>
              Proprietary Forex tools and advanced trading systems designed to enhance trading efficiency, maximize profits, and provide traders with the competitive edge they need to succeed in the global markets.
            </p>
            <div style={styles.heroButtons} className={`animate-on-scroll ${animatedSections.has("hero") ? "animate-zoom-in stagger-3" : ""}`}>
              <button
                style={styles.ctaButtonPrimary}
                className={animatedSections.has("hero") ? "animate-pulse-glow" : ""}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Free Trial
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("tools")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Explore Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        style={styles.aboutSection}
        className={`section-animate ${animatedSections.has("about") ? "animate" : ""}`}
      >
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }}>
            ADVANCED <span style={{ color: "#39CC2F" }}>TRADING TECHNOLOGY</span>
          </h2>
          <p style={styles.aboutText}>
            8ConEdge delivers <strong style={styles.strongText}>cutting-edge proprietary Forex tools</strong> that revolutionize the way traders analyze markets, execute trades, and manage risk. Our advanced technology combines artificial intelligence, real-time market analysis, and sophisticated algorithms to provide traders with unparalleled insights and trading advantages.
          </p>
          <div style={styles.statsGrid}>
            {[
              { number: "95%", label: "Accuracy Rate" },
              { number: "24/7", label: "Market Monitoring" },
              { number: "500+", label: "Active Traders" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`section-animate ${animatedSections.has("about") ? "animate" : ""}`}
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(57, 204, 47, 0.25)"; 
                  e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.5)"; 
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)"; 
                  e.currentTarget.style.borderTop = "1px solid rgba(255, 255, 255, 0.12)";
                }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        ref={toolsRef}
        style={styles.toolsSection}
        className={`section-animate ${animatedSections.has("tools") ? "animate" : ""}`}
      >
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, color: "#ffffff", fontFamily: "'Unbounded', sans-serif", textTransform: "uppercase" }}>
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
                <div
                  key={index}
                  ref={(el) => (toolCardsRef.current[index] = el)}
                  style={styles.toolCard}
                  className="section-animate animate"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(57, 204, 47, 0.25)"; 
                    e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.5)"; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: topColor }} />
                  <div>{tool.icon}</div>
                  <h3 style={styles.toolTitle}>{tool.title}</h3>
                  <p style={styles.toolDescription}>{tool.description}</p>
                  <ul style={styles.toolFeatures}>
                    {tool.features.map((feature, idx) => (
                      <li key={idx} style={styles.toolFeatureItem}>
                        <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="why-choose"
        ref={whyChooseRef}
        style={styles.whyChooseSection}
        className={`section-animate ${animatedSections.has("why-choose") ? "animate" : ""}`}
      >
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Unbounded', sans-serif", color: "#ffffff", textTransform: "uppercase" }}>
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONEDGE?</span>
          </h2>
          <div style={styles.benefitsGrid}>
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
              <div
                key={index}
                ref={(el) => (benefitCardsRef.current[index] = el)}
                style={styles.benefitCard}
                className="section-animate animate"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(57, 204, 47, 0.25)"; 
                  e.currentTarget.style.borderColor = "rgba(57, 204, 47, 0.5)"; 
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)"; 
                  e.currentTarget.style.borderTop = "1px solid rgba(255, 255, 255, 0.12)";
                }}
              >
                <div>{benefit.icon}</div>
                <div>
                  <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        ref={ctaRef}
        style={styles.ctaSection}
        className={`section-animate ${animatedSections.has("cta") ? "animate" : ""}`}
      >
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle}>
            Transform Your Trading Journey with <span style={{ color: "#ff1f2c" }}>8ConEdge</span>
          </h2>
          <p style={styles.ctaDescription}>
            Don't let another profitable opportunity slip away. With 8ConEdge's cutting-edge proprietary tools, you'll gain the precision, speed, and intelligence that separates consistently profitable traders from the rest. Our AI-powered market analysis, lightning-fast execution, and advanced risk management systems work together 24/7 to maximize your trading potential while protecting your capital.
          </p>
          <div
            style={styles.ctaHighlight}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff1f2c";
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 31, 44, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0edb61";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(14, 219, 97, 0.2)";
            }}
          >
            🚀 Unlock Your Trading Potential - Start Your 14-Day Free Trial!
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConEdge;