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
  Handshake,
  Building,
  Lightbulb,
  MessageSquare,
  BookOpen,
  TrendingUpIcon,
  UserCheck,
  Heart,
  Star,
  Zap,
  MapPin,
  CheckCircle,
} from "lucide-react";

const ConNect = () => {
  const { colors, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);

  // Refs for each section
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const benefitsRef = useRef(null);
  const whyConnectRef = useRef(null);
  const whoCanJoinRef = useRef(null);
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

  // Intersection Observer for all sections
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

    // Observe all sections
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: howItWorksRef, id: "how-it-works" },
      { ref: benefitsRef, id: "benefits" },
      { ref: whyConnectRef, id: "why-connect" },
      { ref: whoCanJoinRef, id: "who-can-join" },
      { ref: ctaRef, id: "cta" },
    ];

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Special observer for hero section to track when user enters/exits hero
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Helper function to check if section should be animated
  const isAnimated = (sectionId) => animatedSections.has(sectionId);

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
    },

    // Hero Section - Green Background
    heroSection: {
      minHeight: "100vh",
      backgroundImage: "linear-gradient(rgba(25, 35, 42, 0.65), rgba(25, 35, 42, 0.9)), url('../src/assets/images/imagebg.png')",
      backgroundColor: "#19232A", // Fallback color
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

    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "60px",
      color: colors.textPrimary,
    },

    // How It Works Section
    howItWorksSection: {
      background: colors.bgSurface,
      padding: "100px 0",
    },

    howItWorksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "40px",
    },

    howItWorksCard: {
      background: colors.bgCard,
      padding: "40px 30px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      border: `2px solid ${isDark ? "#f0f0f0" : "#d1d5db"}`,
    },

    howItWorksIcon: {
      marginBottom: "20px",
    },

    howItWorksTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "15px",
    },

    howItWorksDescription: {
      fontSize: "1rem",
      color: colors.textMuted,
      marginBottom: "20px",
      lineHeight: "1.6",
    },

    howItWorksList: {
      textAlign: "left",
      listStyle: "none",
      padding: "0",
      margin: "0",
    },

    howItWorksListItem: {
      fontSize: "0.9rem",
      color: colors.textMuted,
      marginBottom: "8px",
      lineHeight: "1.5",
    },

    // Benefits Section
    benefitsSection: {
      background: colors.bgSecondary,
      padding: "100px 0",
    },

    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
    },

    benefitCard: {
      background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.2)",
      padding: "40px 30px",
      borderRadius: "12px",
      textAlign: "center",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },

    benefitIcon: {
      marginBottom: "20px",
    },

    benefitTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "15px",
    },

    benefitDescription: {
      fontSize: "1rem",
      color: colors.textMuted,
      lineHeight: "1.6",
    },

    // Why Connect Section
    whyConnectSection: {
      background: isDark
        ? "linear-gradient(135deg, #0edb61 0%, #0cb851 100%)"
        : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      padding: "100px 0",
    },

    whyConnectContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "60px",
    },

    whyConnectLeft: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },

    whyConnectRight: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },

    whyConnectFeature: {
      display: "flex",
      alignItems: "flex-start",
      gap: "15px",
    },

    checkIcon: {
      marginTop: "5px",
      flexShrink: 0,
    },

    featureTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: isDark ? "#ffffff" : colors.textPrimary,
      marginBottom: "8px",
    },

    featureDescription: {
      fontSize: "1rem",
      color: isDark ? "#ffffff" : colors.textPrimary,
      opacity: "0.9",
      lineHeight: "1.5",
    },

    // Who Can Join Section
    whoCanJoinSection: {
      background: colors.bgSurface,
      padding: "100px 0",
    },

    whoCanJoinGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "40px",
    },

    whoCanJoinCard: {
      background: colors.bgCard,
      padding: "40px 30px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      border: `2px solid ${isDark ? "#f0f0f0" : "#d1d5db"}`,
    },

    memberIcon: {
      marginBottom: "20px",
    },

    memberTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "15px",
    },

    memberDescription: {
      fontSize: "1rem",
      color: colors.textMuted,
      lineHeight: "1.6",
    },

    // CTA Section
    ctaSection: {
      background: colors.bgSecondary,
      padding: "100px 0",
    },

    ctaContent: {
      textAlign: "center",
      maxWidth: "700px",
      margin: "0 auto",
    },

    ctaTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: "20px",
    },

    ctaDescription: {
      fontSize: "1.1rem",
      color: colors.textMuted,
      marginBottom: "40px",
      lineHeight: "1.7",
    },

    ctaButtons: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
    },

    ctaButtonLarge: {
      background: "#0edb61",
      color: "#ffffff",
      border: "none",
      padding: "18px 35px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    ctaButtonOutline: {
      background: "transparent",
      color: colors.textPrimary,
      border: `2px solid ${colors.textPrimary}`,
      padding: "18px 35px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
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
            color: var(--header-text);
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

          .dropdown-link:hover {
            background-color: #f0f0f0;
            color: #0edb61;
          }

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
            color: var(--header-mobile-text);
            border-bottom: 1px solid #f3f4f6;
            background: none;
            border: none;
            text-align: left;
            font-size: 16px;
            cursor: pointer;
          }

          .mobile-dropdown-content {
            background-color: var(--header-dropdown-bg);
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
          
          .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }

          /* Animation Keyframes */
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

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
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

          /* Animation Classes */
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-fade-in-left {
            animation: fadeInLeft 0.8s ease-out forwards;
          }

          .animate-fade-in-right {
            animation: fadeInRight 0.8s ease-out forwards;
          }

          .animate-fade-in-scale {
            animation: fadeInScale 0.6s ease-out forwards;
          }

          .animate-slide-in-bottom {
            animation: slideInFromBottom 1s ease-out forwards;
          }

          .animate-bounce-in {
            animation: bounceIn 0.8s ease-out forwards;
          }

          /* Staggered Animation Delays */
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-700 { animation-delay: 0.7s; }
          .delay-800 { animation-delay: 0.8s; }
          .delay-900 { animation-delay: 0.9s; }

          /* Initial hidden state for animations */
          .animate-element {
            opacity: 0;
          }

          .animate-element.animate {
            opacity: 1;
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

.hero-text-clear {
  clear: both !important;
  display: block !important;
  width: 100% !important;
  position: relative !important;
}

.hero-buttons-clear {
  clear: both !important;
  display: flex !important;
  margin-top: 2rem !important;
  position: relative !important;
  z-index: 10 !important;
}

.hero-description-fix {
  margin-bottom: 3rem !important;
  padding-bottom: 1rem !important;
  display: block !important;
  clear: both !important;
}

        `}
      </style>

      {/* Header - Navigation */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img
              src={isDark ? "/assets/logo/8con Academy Logo White.png" : "/assets/logo/8con Academy Logo.png"}
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
              href="#how-it-works"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("how-it-works");
              }}
            >
              How It Works
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
              href="#why-connect"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("why-connect");
              }}
            >
              Why 8ConNect
            </a>
            <a
              href="#who-can-join"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("who-can-join");
              }}
            >
              Who Can Join
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
              href="#how-it-works"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("how-it-works");
              }}
            >
              How It Works
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
              href="#why-connect"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("why-connect");
              }}
            >
              Why 8ConNect
            </a>
            <a
              href="#who-can-join"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("who-can-join");
              }}
            >
              Who Can Join
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
            src="/assets/logo/1.png"
            alt="8ConNect"
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
              Connecting Ideas, Opportunities, and Entrepreneurs
            </p>

            {/* Description */}
            <p
              style={styles.heroDescription}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""
              }`}
            >
              8ConNect is more than just a network—it's a collaborative hub
              designed to empower local entrepreneurs and businesses. By
              fostering connections and sharing opportunities, 8ConNect bridges
              the gap between ideas and growth.
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
                Join the Network
              </button>

              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("how-it-works")}
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

      {/* How 8ConNect Works Section - White Background */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        style={styles.howItWorksSection}
      >
        <div style={styles.container2}>
          <h2
            className={`animate-element ${
              isAnimated("how-it-works") ? "animate animate-fade-in-scale" : ""
            }`}
            style={{ ...styles.sectionTitle, color: colors.textPrimary }}
          >
            How 8ConNect Works
          </h2>
          <div style={styles.howItWorksGrid}>
            {[
              {
                icon: <UserCheck size={40} color="#0edb61" />,
                title: "Membership Program",
                description:
                  "Entrepreneurs and business owners can join as members to access exclusive benefits and opportunities.",
                list: [
                  "• Pitch business ideas to other members",
                  "• Access to networking events and workshops",
                  "• Shared platform for promoting services",
                  "• Exchange referrals for mutual growth",
                ],
              },
              {
                icon: <MessageSquare size={40} color="#0edb61" />,
                title: "Entrepreneurial Pitching Sessions",
                description:
                  "Regularly scheduled events where members present their business offerings and opportunities.",
                list: [
                  "• Present business ideas and challenges",
                  "• Open environment for idea sharing",
                  "• Receive feedback from community",
                  "• Form strategic partnerships",
                ],
              },
              {
                icon: <Heart size={40} color="#0edb61" />,
                title: "Community Building",
                description:
                  "A harmonious community where members support one another through collaboration and growth initiatives.",
                list: [
                  "• Mutual support through referrals",
                  "• Mentorship opportunities",
                  "• Joint ventures and partnerships",
                  "• Local business ecosystem development",
                ],
              },
              {
                icon: <BookOpen size={40} color="#0edb61" />,
                title: "Business Coach Guidance",
                description:
                  "Expert guidance from a Business Coach with extensive knowledge in community building and branding.",
                list: [
                  "• Workshops on branding and marketing",
                  "• One-on-one coaching sessions",
                  "• Business scaling strategies",
                  "• Community alignment insights",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`animate-element ${
                  isAnimated("how-it-works")
                    ? `animate animate-slide-in-bottom delay-${
                        (index + 1) * 200
                      }`
                    : ""
                }`}
                style={styles.howItWorksCard}
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
                <div style={styles.howItWorksIcon}>{item.icon}</div>
                <h3 style={styles.howItWorksTitle}>{item.title}</h3>
                <p style={styles.howItWorksDescription}>{item.description}</p>
                <ul style={styles.howItWorksList}>
                  {item.list.map((listItem, listIndex) => (
                    <li key={listIndex} style={styles.howItWorksListItem}>
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Joining Section - Black Background */}
      <section id="benefits" ref={benefitsRef} style={styles.benefitsSection}>
        <div style={styles.container2}>
          <h2
            className={`animate-element ${
              isAnimated("benefits") ? "animate animate-bounce-in" : ""
            }`}
            style={styles.sectionTitle}
          >
            Benefits of Joining 8ConNect
          </h2>
          <div style={styles.benefitsGrid}>
            {[
              {
                icon: <Network size={50} color="#0edb61" />,
                title: "Networking Opportunities",
                description:
                  "Build meaningful connections with like-minded entrepreneurs, exchange ideas, and expand your professional circle.",
                color: "#0edb61",
              },
              {
                icon: <TrendingUp size={50} color="#ff1f2c" />,
                title: "Business Growth",
                description:
                  "Gain exposure by pitching to fellow members, access new clients and markets through community referrals.",
                color: "#ff1f2c",
              },
              {
                icon: <Lightbulb size={50} color="#0edb61" />,
                title: "Knowledge Sharing",
                description:
                  "Stay updated with industry trends, tools, and strategies shared within the community and learn from experiences.",
                color: "#0edb61",
              },
              {
                icon: <Handshake size={50} color="#ff1f2c" />,
                title: "Supportive Ecosystem",
                description:
                  "A harmonious network that thrives on collaboration rather than competition, with shared resources and insights.",
                color: "#ff1f2c",
              },
              {
                icon: <Star size={50} color="#0edb61" />,
                title: "Branding & Visibility",
                description:
                  "Enhance your business branding with expert guidance and gain visibility through events and marketing opportunities.",
                color: "#0edb61",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className={`animate-element ${
                  isAnimated("benefits")
                    ? `animate animate-fade-in-scale delay-${(index + 1) * 200}`
                    : ""
                }`}
                style={{
                  ...styles.benefitCard,
                  borderTop: `4px solid ${benefit.color}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 15px 40px rgba(${
                    benefit.color === "#0edb61" ? "14, 219, 97" : "255, 31, 44"
                  }, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(255,255,255,0.1)";
                }}
              >
                <div style={styles.benefitIcon}>{benefit.icon}</div>
                <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                <p style={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose 8ConNect Section - Green Background */}
      <section
        id="why-connect"
        ref={whyConnectRef}
        style={styles.whyConnectSection}
      >
        <div style={styles.container2}>
          <h2
            className={`animate-element ${
              isAnimated("why-connect") ? "animate animate-fade-in-up" : ""
            }`}
            style={styles.sectionTitle}
          >
            Why Choose 8ConNect?
          </h2>
          <div style={styles.whyConnectContent}>
            <div
              className={`animate-element ${
                isAnimated("why-connect")
                  ? "animate animate-fade-in-left delay-200"
                  : ""
              }`}
              style={styles.whyConnectLeft}
            >
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Local Focus</h4>
                  <p style={styles.featureDescription}>
                    Specifically designed for local entrepreneurs to build
                    strong community ties
                  </p>
                </div>
              </div>
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Expert Guidance</h4>
                  <p style={styles.featureDescription}>
                    Access to experienced business coaches and industry
                    professionals
                  </p>
                </div>
              </div>
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Collaborative Environment</h4>
                  <p style={styles.featureDescription}>
                    Non-competitive space focused on mutual growth and support
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`animate-element ${
                isAnimated("why-connect")
                  ? "animate animate-fade-in-right delay-400"
                  : ""
              }`}
              style={styles.whyConnectRight}
            >
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Regular Events</h4>
                  <p style={styles.featureDescription}>
                    Consistent networking opportunities and business development
                    sessions
                  </p>
                </div>
              </div>
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Resource Sharing</h4>
                  <p style={styles.featureDescription}>
                    Platform for sharing tools, knowledge, and business
                    opportunities
                  </p>
                </div>
              </div>
              <div style={styles.whyConnectFeature}>
                <CheckCircle
                  size={24}
                  color="#ffffff"
                  style={styles.checkIcon}
                />
                <div>
                  <h4 style={styles.featureTitle}>Proven Results</h4>
                  <p style={styles.featureDescription}>
                    Track record of helping members grow their businesses and
                    networks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section - White Background */}
      <section
        id="who-can-join"
        ref={whoCanJoinRef}
        style={styles.whoCanJoinSection}
      >
        <div style={styles.container2}>
          <h2
            className={`animate-element ${
              isAnimated("who-can-join") ? "animate animate-bounce-in" : ""
            }`}
            style={{ ...styles.sectionTitle, color: colors.textPrimary }}
          >
            Who Can Join 8ConNect?
          </h2>
          <div style={styles.whoCanJoinGrid}>
            {[
              {
                icon: <Building size={60} color="#0edb61" />,
                title: "Local Entrepreneurs",
                description:
                  "Business owners looking to expand their network and grow their ventures",
              },
              {
                icon: <Users size={60} color="#ff1f2c" />,
                title: "Small Business Owners",
                description:
                  "Established businesses seeking collaboration and referral opportunities",
              },
              {
                icon: <Lightbulb size={60} color="#0edb61" />,
                title: "Startup Founders",
                description:
                  "Early-stage entrepreneurs looking for mentorship and business connections",
              },
              {
                icon: <Handshake size={60} color="#ff1f2c" />,
                title: "Service Providers",
                description:
                  "Professionals offering services who want to connect with potential clients",
              },
            ].map((member, index) => (
              <div
                key={index}
                className={`animate-element ${
                  isAnimated("who-can-join")
                    ? `animate animate-fade-in-up delay-${(index + 1) * 200}`
                    : ""
                }`}
                style={styles.whoCanJoinCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(14, 219, 97, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }}
              >
                <div style={styles.memberIcon}>{member.icon}</div>
                <h3 style={styles.memberTitle}>{member.title}</h3>
                <p style={styles.memberDescription}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Black Background */}
      <section id="cta" ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.container2}>
          <div
            className={`animate-element ${
              isAnimated("cta") ? "animate animate-fade-in-scale" : ""
            }`}
            style={styles.ctaContent}
          >
            <h2 style={styles.ctaTitle}>Ready to Connect and Grow?</h2>
            <p style={styles.ctaDescription}>
              Join 8ConNect today and become part of a thriving community of
              entrepreneurs dedicated to mutual growth and success.
            </p>
            <div style={styles.ctaButtons}>
              <button
                className={`animate-element ${
                  isAnimated("cta") ? "animate animate-bounce-in delay-300" : ""
                }`}
                style={styles.ctaButtonLarge}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Zap size={20} style={{ marginRight: "8px" }} />
                Join 8ConNect Now
              </button>
              <button
                className={`animate-element ${
                  isAnimated("cta") ? "animate animate-bounce-in delay-500" : ""
                }`}
                style={styles.ctaButtonOutline}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.color = "#000000";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = colors.textPrimary;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <MessageSquare size={20} style={{ marginRight: "8px" }} />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConNect;
