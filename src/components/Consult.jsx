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
  Users,
  BookOpen,
  Lightbulb,
  Presentation,
  Briefcase,
  LineChart,
  UserCheck,
  Building,
  Check, // Imported for clean bullet points
  Calendar,
  FileText,
  Handshake,
} from "lucide-react";

const ConSult = () => {
  const { colors, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);

  const isAnimated = (sectionId) => animatedSections.has(sectionId);

  // Refs for sections
  const heroRef = useRef(null);
  const leadershipRef = useRef(null);
  const servicesRef = useRef(null);
  const approachRef = useRef(null);
  const clientsRef = useRef(null);
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

  // Intersection Observer setup
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
      leadershipRef,
      servicesRef,
      approachRef,
      clientsRef,
      ctaRef,
    ];

    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Observer for hero section
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
          setAnimatedSections(new Set());
          setHeroAnimationKey((prev) => prev + 1);

          setTimeout(() => {
            setAnimatedSections((prev) => new Set([...prev, "hero"]));
          }, 100);
        } else if (nowInHero && wasInHero) {
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
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Premium Dark Theme & 3D Lifted Styles
  const styles = {
    container: {
      minHeight: "100vh",
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: "1.6",
      color: colors.textPrimary,
      margin: 0,
      padding: 0,
    },

    container2: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      "@media (max-width: 768px)": {
        padding: "0 15px",
      },
      "@media (max-width: 480px)": {
        padding: "0 12px",
      },
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
      display: "flex",
      alignItems: "center",
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
      display: "flex",
      alignItems: "center",
    },

    ctaButtonRed: {
      background: "#ff1f2c",
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
      display: "flex",
      alignItems: "center",
    },

    // Apply #131B21 Background
    leadershipSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21", 
    },

    sectionTitle: {
      fontSize: "clamp(2rem, 5vw, 2.5rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: "3rem",
      textTransform: "uppercase",
    },

    leadershipContent: {
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
      alignItems: "center",
      textAlign: "center",
    },

    aboutText: {
      maxWidth: "900px",
      margin: "0 auto",
      fontSize: "1.1rem",
      color: "#A0ABB5",
      lineHeight: "1.8",
    },

    aboutStatsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem",
      width: "100%",
      maxWidth: "1000px",
    },

    // Apply #19232A Background
    servicesSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#19232A", 
    },

    // Apply #131B21 Background
    approachSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21", 
    },

    // Apply #19232A Background
    clientsSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#19232A", 
    },

    // Apply #131B21 Background
    ctaSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21", 
      textAlign: "center",
    },

    // 2x2 Grid Layout
    grid2x2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
      gap: "2.5rem",
      marginTop: "2rem",
    },

    // 3D Floating Card Style
    cardStyle: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "2rem",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative", 
      overflow: "hidden",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },

    cardIcon: {
      display: "flex",
      justifyContent: "center",
    },

    cardTitle: {
      fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
    },

    cardDescription: {
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      color: "#A0ABB5",
      lineHeight: "1.6",
    },

    cardList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "left",
      width: "100%",
      marginTop: "0.5rem",
    },

    cardListItem: {
      fontSize: "0.95rem",
      color: "#A0ABB5",
      marginBottom: "0.8rem",
      lineHeight: "1.5",
      display: "flex",
      alignItems: "flex-start",
    },

    statNumber: {
      fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
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
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "0 auto 2.5rem",
      color: "#A0ABB5",
    },

    ctaButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "2rem",
      position: "relative",
      zIndex: 10,
    },

    ctaHighlight: {
      background: "#19232A",
      padding: "1.5rem 2rem",
      borderRadius: "15px",
      fontSize: "clamp(1rem, 3vw, 1.3rem)",
      maxWidth: "800px",
      margin: "0 auto",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      color: "#ffffff",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },
  };

  // Data Arrays
  const statsData = [
    { number: "20+", label: "Years Experience" },
    { number: "200+", label: "Startups Advised" },
    { number: "95%", label: "Success Rate" },
  ];

  const servicesData = [
    {
      icon: <Lightbulb size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Startup Coaching",
      description: "Comprehensive guidance for aspiring entrepreneurs from ideation to execution, ensuring your startup is built on solid foundations.",
      items: [
        "Idea validation and market research",
        "Business plan development and refinement",
        "Team building and leadership guidance",
      ]
    },
    {
      icon: <LineChart size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Business Model Analysis",
      description: "Get your business evaluated and refined with expert input, optimizing for sustainability and growth potential.",
      items: [
        "Revenue model optimization",
        "Cost structure analysis",
        "Competitive positioning strategy",
      ]
    },
    {
      icon: <TrendingUp size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Sales Strategy & Growth",
      description: "Tailored game plans for scaling and market positioning, designed to accelerate your business growth and market penetration.",
      items: [
        "Go-to-market strategy development",
        "Sales funnel optimization",
        "Growth hacking techniques",
      ]
    },
    {
      icon: <Presentation size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Investor Deck & Pitch",
      description: "Prepare for investor talks and funding rounds with compelling presentations and pitch strategies that get results.",
      items: [
        "Investor deck creation and refinement",
        "Pitch practice and coaching",
        "Investor network introductions",
      ]
    }
  ];

  const approachData = [
    {
      icon: <Briefcase size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Real-World Experience",
      description: "Benefit from decades of hands-on entrepreneurial experience, not just theoretical knowledge. Our advice comes from actual startup successes and lessons learned."
    },
    {
      icon: <Target size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Personalized Strategy",
      description: "Every business is unique. We develop customized strategies that align with your specific industry, market conditions, and growth objectives."
    },
    {
      icon: <Users size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "End-to-End Support",
      description: "From initial concept to investor readiness, we provide comprehensive support throughout your entrepreneurial journey, ensuring no critical step is missed."
    },
    {
      icon: <Network size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Network Access",
      description: "Gain access to an extensive network of investors, industry experts, and potential partners to accelerate your business growth and opportunities."
    }
  ];

  const clientsData = [
    {
      icon: <UserCheck size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Aspiring Entrepreneurs",
      items: [
        "First-time founders with innovative ideas",
        "Professionals transitioning to entrepreneurship",
        "Students developing startup concepts",
        "Career changers seeking business opportunities",
      ]
    },
    {
      icon: <Lightbulb size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Early-Stage Startups",
      items: [
        "Pre-seed and seed stage companies",
        "Startups seeking product-market fit",
        "Teams preparing for funding rounds",
        "Companies needing strategic pivot guidance",
      ]
    },
    {
      icon: <TrendingUp size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Growing Businesses",
      items: [
        "SMEs ready for scaling operations",
        "Companies entering new markets",
        "Businesses optimizing for growth",
        "Organizations seeking strategic partnerships",
      ]
    },
    {
      icon: <Building size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Corporate Innovators",
      items: [
        "Large companies developing new ventures",
        "Corporate innovation teams",
        "Organizations launching intrapreneurship programs",
        "Companies seeking digital transformation",
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <style>
        {`
          :root {
            --header-scrolled-bg: ${colors.headerScrolledBg};
            --header-text: ${isDark ? "rgb(255,255,255)" : "#1a1a2e"};
            --header-dropdown-bg: ${colors.bgCard};
            --header-dropdown-text: ${colors.textPrimary};
            --header-mobile-bg: ${isDark ? "rgba(19,27,33,0.98)" : "rgba(255,255,255,0.98)"};
            --header-mobile-text: ${colors.textPrimary};
          }

          html {
            scroll-behavior: smooth;
            scroll-padding-top: 60px;
          }

          /* Strict 2x2 grid */
          .grid-2x2-strict {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            margin-top: 2rem;
          }

          @media (max-width: 768px) {
            .grid-2x2-strict {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }

          /* Enhanced Animation Keyframes */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.7) translateY(30px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.2) translateY(50px); }
            50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
            70% { transform: scale(0.95) translateY(5px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @keyframes slideInFromTop {
            from { opacity: 0; transform: translateY(-60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes rotateIn {
            from { opacity: 0; transform: rotate(-180deg) scale(0.5); }
            to { opacity: 1; transform: rotate(0deg) scale(1); }
          }
          
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.3); }
            to { opacity: 1; transform: scale(1); }
          }
          
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(14, 219, 97, 0.3); }
            50% { box-shadow: 0 0 40px rgba(14, 219, 97, 0.6); }
          }
          
          .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
          .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
          .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; }
          .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
          .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
          .animate-slide-in-top { animation: slideInFromTop 1s ease-out forwards; }
          .animate-rotate-in { animation: rotateIn 1s ease-out forwards; }
          .animate-zoom-in { animation: zoomIn 0.8s ease-out forwards; }
          .animate-pulse-glow { animation: pulseGlow 2s infinite; }
          
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.3s; }
          .stagger-3 { animation-delay: 0.5s; }
          .stagger-4 { animation-delay: 0.7s; }
          .stagger-5 { animation-delay: 0.9s; }
          .stagger-6 { animation-delay: 1.1s; }
          
          .animate-on-scroll { opacity: 0; }
          
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
            background-color: var(--header-scrolled-bg);
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
          
          .logo-img { height: 40px; width: auto; }
          
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
            color: var(--header-text);
            padding: 8px 12px;
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
          
          .nav-link:hover { transform: translateY(-2px); }
          .dropdown { position: relative; }
          .dropdown:hover .dropdown-content { display: block; }
          
          .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: var(--header-dropdown-bg);
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
            color: var(--header-dropdown-text);
            text-decoration: none;
            transition: all 0.3s ease;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .dropdown-link:hover { background-color: #f0f0f0; color: #0edb61; }

          .mobile-menu-toggle {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--header-text);
            display: none;
            padding: 5px;
          }

          .mobile-nav {
            background-color: var(--header-mobile-bg);
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
            color: var(--header-mobile-text);
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
          
          .mobile-nav-link:hover { background-color: rgba(14, 219, 97, 0.1); }
          .mobile-dropdown { position: relative; }
          
          .mobile-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
            color: var(--header-mobile-text);
            text-decoration: none;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          
          .rotate-180 { transform: rotate(180deg); transition: transform 0.3s ease; }
          
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-toggle { display: block !important; }
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
                      handleNavigation(brand.route);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
            <a href="#leadership" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("leadership"); }}>
              Leadership
            </a>
            <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("services"); }}>
              Services
            </a>
            <a href="#approach" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("approach"); }}>
              Our Approach
            </a>
            <a href="#clients" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("clients"); }}>
              Target Clients
            </a>
            <a href="#cta" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("cta"); }}>
              Contact
            </a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-toggle">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/sub-brands" className="mobile-nav-link">Home</Link>
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
                    <a key={index} href={brand.route} className="mobile-nav-sublink" onClick={(e) => { e.preventDefault(); handleNavigation(brand.route); }}>
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => handleSmoothScroll("leadership")} className="mobile-nav-link">Leadership</button>
            <button onClick={() => handleSmoothScroll("services")} className="mobile-nav-link">Services</button>
            <button onClick={() => handleSmoothScroll("approach")} className="mobile-nav-link">Our Approach</button>
            <button onClick={() => handleSmoothScroll("clients")} className="mobile-nav-link">Target Clients</button>
            <button onClick={() => handleSmoothScroll("cta")} className="mobile-nav-link">Contact</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          <img
            src="/assets/logo/9.png"
            alt="8ConSult"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${isAnimated("hero") ? "animate-slide-in-top" : ""}`}
          />
          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className={`animate-on-scroll ${isAnimated("hero") ? "animate-fade-in-up stagger-1" : ""}`}>
              Business Development & Startup Advisory
            </p>
            <p style={styles.heroDescription} className={`animate-on-scroll ${isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""}`}>
              A consultation arm powered by real-world experience in entrepreneurship. Transform your business ideas into thriving ventures with expert guidance from ideation to execution, scaling, and investor readiness.
            </p>
            <div style={styles.heroButtons} className={`animate-on-scroll ${isAnimated("hero") ? "animate-zoom-in stagger-3" : ""}`}>
              <button
                style={styles.ctaButtonPrimary}
                className={isAnimated("hero") ? "animate-pulse-glow" : ""}
                onClick={() => handleSmoothScroll("services")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Calendar size={20} style={{ marginRight: "8px" }} />
                Book Consultation
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={() => { window.open("/assets/pdf/startup-guide.pdf", "_blank"); }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <FileText size={20} style={{ marginRight: "8px" }} />
                Get Startup Kit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section (Stacked with stats at bottom) */}
      <section id="leadership" ref={leadershipRef} style={styles.leadershipSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("leadership") ? "animate-slide-in-top" : ""}`}>
            LED BY <span style={{ color: "#39CC2F" }}>ENTREPRENEURIAL EXCELLENCE</span>
          </h2>
          <div style={styles.leadershipContent}>
            <div style={styles.aboutText} className={`animate-on-scroll ${isAnimated("leadership") ? "animate-fade-in-up stagger-1" : ""}`}>
              <p style={{ marginBottom: "1.5rem", color: "#A0ABB5", lineHeight: "1.8" }}>
                Spearheaded by <strong style={{ color: "#39CC2F" }}>Sir Nigel Santos</strong>, our Chief Business Development Officer, 8ConSult brings decades of real-world entrepreneurial experience to your business journey. Sir Nigel's proven track record in building successful ventures, navigating market challenges, and scaling businesses provides the foundation for our comprehensive advisory services.
              </p>
              <p style={{ color: "#A0ABB5", lineHeight: "1.8" }}>
                With expertise spanning startup ecosystems, business model innovation, and investor relations, Sir Nigel ensures that every consultation delivers actionable insights and strategic direction tailored to your unique business goals.
              </p>
            </div>
            
            <div style={styles.aboutStatsGrid}>
              {statsData.map((stat, index) => {
                const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
                const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

                return (
                  <div
                    key={index}
                    style={styles.cardStyle}
                    className={`animate-on-scroll ${isAnimated("leadership") ? `animate-scale-in stagger-${index + 2}` : ""}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                      e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 25px ${shadowGlow}`; 
                      e.currentTarget.style.borderColor = borderGlow; 
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <h3 style={{ ...styles.statNumber, color: index % 2 === 0 ? "#39CC2F" : "#ff1f2c" }}>
                      {stat.number}
                    </h3>
                    <p style={styles.statLabel}>{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (HAS TOP COLOR BAR) */}
      <section id="services" ref={servicesRef} style={styles.servicesSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("services") ? "animate-slide-in-top" : ""}`}>
            OUR ADVISORY <span style={{ color: "#ff1f2c" }}>SERVICES</span>
          </h2>
          <div className="grid-2x2-strict">
            {servicesData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={styles.cardStyle}
                  className={`animate-on-scroll ${isAnimated("services") ? `animate-zoom-in stagger-${index + 1}` : ""}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px ${shadowGlow}`; 
                    e.currentTarget.style.borderColor = borderGlow; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderTop = "1px solid rgba(255, 255, 255, 0.12)";
                  }}
                >
                  {/* TOP COLOR BAR */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: topColor }} />
                  
                  <div style={styles.cardIcon}>{data.icon}</div>
                  <h3 style={styles.cardTitle}>{data.title}</h3>
                  <p style={styles.cardDescription}>{data.description}</p>
                  <ul style={styles.cardList}>
                    {data.items.map((item, itemIndex) => (
                      <li key={itemIndex} style={styles.cardListItem}>
                        <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach Section (NO TOP COLOR BAR) */}
      <section id="approach" ref={approachRef} style={styles.approachSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("approach") ? "animate-slide-in-top" : ""}`}>
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONSULT?</span>
          </h2>
          <div className="grid-2x2-strict">
            {approachData.map((data, index) => {
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={styles.cardStyle}
                  className={`animate-on-scroll ${isAnimated("approach") ? `animate-fade-in-up stagger-${index + 1}` : ""}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px ${shadowGlow}`; 
                    e.currentTarget.style.borderColor = borderGlow; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderTop = "1px solid rgba(255, 255, 255, 0.12)";
                  }}
                >
                  <div style={styles.cardIcon}>{data.icon}</div>
                  <h3 style={styles.cardTitle}>{data.title}</h3>
                  <p style={styles.cardDescription}>{data.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Clients Section (STRICT 2x2 GRID - NO TOP COLOR BAR) */}
      <section id="clients" ref={clientsRef} style={styles.clientsSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("clients") ? "animate-slide-in-top" : ""}`}>
            WHO WE <span style={{ color: "#ff1f2c" }}>SERVE</span>
          </h2>
          <div className="grid-2x2-strict">
            {clientsData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={styles.cardStyle}
                  className={`animate-on-scroll ${isAnimated("clients") ? `animate-scale-in stagger-${index + 1}` : ""}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.6), 0 15px 35px ${shadowGlow}`; 
                    e.currentTarget.style.borderColor = borderGlow; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderTop = "1px solid rgba(255, 255, 255, 0.12)";
                  }}
                >
                  <div style={styles.cardIcon}>{data.icon}</div>
                  <h3 style={styles.cardTitle}>{data.title}</h3>
                  <ul style={styles.cardList}>
                    {data.items.map((item, itemIndex) => (
                      <li key={itemIndex} style={styles.cardListItem}>
                        <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className={`animate-on-scroll ${isAnimated("cta") ? "animate-slide-in-top" : ""}`}>
            READY TO TRANSFORM <span style={{ color: "#39CC2F" }}>YOUR BUSINESS VISION?</span>
          </h2>
          <p style={styles.ctaDescription} className={`animate-on-scroll ${isAnimated("cta") ? "animate-fade-in-up stagger-1" : ""}`}>
            Achieve more with 8ConSult—where expert guidance meets your ambition. Whether you're taking your first entrepreneurial steps or scaling an existing venture, Sir Nigel Santos and our team provide the strategic insights and practical support you need to succeed.
          </p>
          <div style={styles.ctaButtons} className={`animate-on-scroll ${isAnimated("cta") ? "animate-scale-in stagger-2" : ""}`}>
            
            <button
              style={styles.ctaButtonPrimary}
              className={`animate-on-scroll ${isAnimated("cta") ? "animate-bounce-in stagger-3" : ""}`}
              onClick={() => handleSmoothScroll("services")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Calendar size={20} style={{ marginRight: "8px" }} />
              Schedule Consultation
            </button>
            
            <button
              style={styles.ctaButtonRed}
              className={`animate-on-scroll ${isAnimated("cta") ? "animate-bounce-in stagger-4" : ""}`}
              onClick={() => { window.open("/assets/pdf/startup-guide.pdf", "_blank"); }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FileText size={20} style={{ marginRight: "8px" }} />
              Download Startup Guide
            </button>

          </div>
          <div
            style={styles.ctaHighlight}
            className={`animate-on-scroll ${isAnimated("cta") ? "animate-fade-in-up stagger-5" : ""}`}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.borderColor = "#39CC2F";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(57, 204, 47, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
            }}
          >
            <strong>
              From ideation to execution, from startup to scale-up—8ConSult is your trusted partner in building a successful business!
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConSult;