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
  BarChart3,
  Zap,
  Shield,
  Rocket,
  Users,
  Star,
  BookOpen,
} from "lucide-react";

const ConEdge = () => {
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
  const solutionsRef = useRef(null);
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

    const sectionRefs = [
      heroRef,
      aboutRef,
      toolsRef,
      solutionsRef,
      whyChooseRef,
      ctaRef,
    ];

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

  return (
    <div style={styles.container}>
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
            background: none;
            border: none;
            font-family: inherit;
            cursor: pointer;
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

          /* Animation Keyframes */
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

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
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

          @keyframes pulseIn {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.02);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes elasticIn {
            0% {
              opacity: 0;
              transform: scale(0.1) rotate(-30deg);
            }
            50% {
              transform: scale(1.05) rotate(10deg);
            }
            70% {
              transform: scale(0.95) rotate(-5deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          /* Hero Content Animations */
          .hero-title {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .hero-title.animate {
            opacity: 1;
            transform: translateY(0) scale(1);
            animation: heroTitleFloat 1.2s ease-out 0.2s both;
          }

          .hero-subtitle {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .hero-subtitle.animate {
            opacity: 1;
            transform: translateX(0);
            animation: heroSubtitleSlide 1s ease-out 0.5s both;
          }

          .hero-description {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .hero-description.animate {
            opacity: 1;
            transform: translateX(0);
            animation: heroDescriptionSlide 1s ease-out 0.8s both;
          }

          @keyframes heroTitleFloat {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.9);
            }
            50% {
              transform: translateY(-10px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes heroSubtitleSlide {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            60% {
              transform: translateX(5px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes heroDescriptionSlide {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            60% {
              transform: translateX(-5px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .slide-left {
            opacity: 0;
            transform: translateX(-100px);
          }

          .slide-left.animate {
            opacity: 1;
            transform: translateX(0);
            animation: slideInLeft 1s ease-out both;
          }

          .slide-right {
            opacity: 0;
            transform: translateX(100px);
          }

          .slide-right.animate {
            opacity: 1;
            transform: translateX(0);
            animation: slideInRight 1s ease-out both;
          }

          .bounce-in {
            opacity: 0;
            transform: scale(0.3);
          }

          .bounce-in.animate {
            opacity: 1;
            transform: scale(1);
            animation: bounceIn 0.8s ease-out both;
          }

          .scale-in {
            opacity: 0;
            transform: scale(0.8);
          }

          .scale-in.animate {
            opacity: 1;
            transform: scale(1);
            animation: scaleIn 0.8s ease-out both;
          }

          .pulse-in {
            opacity: 0;
            transform: scale(0.9);
          }

          .pulse-in.animate {
            opacity: 1;
            transform: scale(1);
            animation: pulseIn 0.6s ease-out both;
          }

          .stagger-item {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
            transition: all 0.6s ease-out;
          }

          .stagger-item.animate {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .stat-animate {
            opacity: 0;
            transform: scale(0.8) rotateX(45deg);
          }

          .stat-animate.animate {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
            animation: elasticIn 0.8s ease-out both;
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

.animate-pulse-glow {
  animation: pulseGlow 2s infinite;
}

.animate-slide-in-top {
  animation: slideInFromTop 1s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s ease-out forwards;
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.3s; }
.stagger-3 { animation-delay: 0.5s; }

// Hero Section - Green Background
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

 @keyframes smoothDataFlow {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.8);
    filter: blur(8px);
  }
  40% {
    opacity: 0.6;
    transform: translateY(20px) scale(0.95);
    filter: blur(3px);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-5px) scale(1.02);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}

/* Tool 2: Lightning Executor - Smooth Electric Slide */
@keyframes smoothElectricSlide {
  0% {
    opacity: 0;
    transform: translateX(-80px) skewX(-20deg);
    filter: brightness(1.3);
  }
  30% {
    opacity: 0.5;
    transform: translateX(-30px) skewX(-10deg);
    filter: brightness(1.15);
  }
  60% {
    opacity: 0.8;
    transform: translateX(10px) skewX(3deg);
    filter: brightness(1.08);
  }
  80% {
    opacity: 0.95;
    transform: translateX(-2px) skewX(-1deg);
    filter: brightness(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) skewX(0deg);
    filter: brightness(1);
  }
}

/* Tool 3: Risk Guardian - Smooth Shield Rise */
@keyframes smoothShieldRise {
  0% {
    opacity: 0;
    transform: translateY(50px) rotate(-45deg) scale(0.7);
  }
  25% {
    opacity: 0.4;
    transform: translateY(25px) rotate(-30deg) scale(0.85);
  }
  50% {
    opacity: 0.7;
    transform: translateY(5px) rotate(-10deg) scale(0.98);
  }
  75% {
    opacity: 0.9;
    transform: translateY(-3px) rotate(2deg) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
  }
}

/* Tool 4: Profit Accelerator - Smooth Rocket Ascent */
@keyframes smoothRocketAscent {
  0% {
    opacity: 0;
    transform: translateY(100px) rotate(25deg) scale(0.6);
    filter: blur(6px);
  }
  35% {
    opacity: 0.6;
    transform: translateY(40px) rotate(15deg) scale(0.8);
    filter: blur(3px);
  }
  65% {
    opacity: 0.85;
    transform: translateY(-8px) rotate(-3deg) scale(1.05);
    filter: blur(1px);
  }
  85% {
    opacity: 0.95;
    transform: translateY(2px) rotate(1deg) scale(0.98);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
    filter: blur(0px);
  }
}

/* Tool 5: Social Hub - Smooth Network Orbit */
@keyframes smoothNetworkOrbit {
  0% {
    opacity: 0;
    transform: scale(0.4) rotate(-180deg);
  }
  30% {
    opacity: 0.5;
    transform: scale(0.7) rotate(-120deg);
  }
  60% {
    opacity: 0.8;
    transform: scale(1.1) rotate(-60deg);
  }
  80% {
    opacity: 0.95;
    transform: scale(0.95) rotate(-20deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Tool 6: Backtesting - Smooth Portal Open */
@keyframes smoothPortalOpen {
  0% {
    opacity: 0;
    transform: perspective(800px) rotateY(90deg) scale(0.5);
    border-radius: 50%;
  }
  35% {
    opacity: 0.5;
    transform: perspective(800px) rotateY(60deg) scale(0.8);
    border-radius: 30%;
  }
  70% {
    opacity: 0.85;
    transform: perspective(800px) rotateY(20deg) scale(1.05);
    border-radius: 20%;
  }
  90% {
    opacity: 0.95;
    transform: perspective(800px) rotateY(-5deg) scale(0.98);
    border-radius: 18%;
  }
  100% {
    opacity: 1;
    transform: perspective(800px) rotateY(0deg) scale(1);
    border-radius: 15px;
  }
}

/* Smooth Icon Floating Animations */
@keyframes smoothIconFloat {
  0%, 100% { 
    transform: translateY(0px) scale(1); 
  }
  50% { 
    transform: translateY(-8px) scale(1.05); 
  }
}

@keyframes smoothIconPulse {
  0%, 100% { 
    transform: scale(1); 
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.08); 
    filter: brightness(1.1);
  }
}

@keyframes smoothIconRotate {
  0%, 100% { 
    transform: rotate(0deg) scale(1); 
  }
  50% { 
    transform: rotate(5deg) scale(1.06); 
  }
}

/* ===== SMOOTH WHY CHOOSE ANIMATIONS ===== */

@keyframes smoothTechReveal {
  0% {
    opacity: 0;
    transform: translateY(40px) perspective(600px) rotateX(45deg);
  }
  40% {
    opacity: 0.6;
    transform: translateY(15px) perspective(600px) rotateX(25deg);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-3px) perspective(600px) rotateX(-5deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) perspective(600px) rotateX(0deg);
  }
}

@keyframes smoothPerformanceGlow {
  0% {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
    box-shadow: 0 0 0 rgba(14, 219, 97, 0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0 10px 30px rgba(14, 219, 97, 0.2);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
}

@keyframes smoothInnovationWave {
  0% {
    opacity: 0;
    transform: translateX(-50px) scaleX(0.7);
  }
  40% {
    opacity: 0.7;
    transform: translateX(-10px) scaleX(0.95);
  }
  70% {
    opacity: 0.9;
    transform: translateX(5px) scaleX(1.05);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scaleX(1);
  }
}

@keyframes smoothSupportLift {
  0% {
    opacity: 0;
    transform: translateY(45px) rotate(-10deg);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

/* ===== SMOOTH CTA ANIMATIONS ===== */

@keyframes smoothCTATitle {
  0% {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  50% {
    opacity: 0.8;
    transform: translateY(5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes smoothCTADescription {
  0% {
    opacity: 0;
    transform: translateY(25px);
    filter: blur(3px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-2px);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}

@keyframes smoothCTAHighlight {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
    background: #f0f0f0;
  }
  60% {
    opacity: 0.9;
    transform: scale(1.02) translateY(-3px);
    background: #e8f5e8;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    background: #0edb61;
  }
}

/* Apply smooth animations */
.tools-section.section-visible .tool-card-1 {
  animation: smoothDataFlow 1s ease-out 0.1s both;
}

.tools-section.section-visible .tool-card-2 {
  animation: smoothElectricSlide 1s ease-out 0.2s both;
}

.tools-section.section-visible .tool-card-3 {
  animation: smoothShieldRise 1s ease-out 0.3s both;
}

.tools-section.section-visible .tool-card-4 {
  animation: smoothRocketAscent 1s ease-out 0.4s both;
}

.tools-section.section-visible .tool-card-5 {
  animation: smoothNetworkOrbit 1s ease-out 0.5s both;
}

.tools-section.section-visible .tool-card-6 {
  animation: smoothPortalOpen 1s ease-out 0.6s both;
}

/* Smooth icon animations */
.tool-card-1 .tool-icon { animation: smoothIconFloat 3s ease-in-out infinite; }
.tool-card-2 .tool-icon { animation: smoothIconPulse 3.5s ease-in-out infinite; }
.tool-card-3 .tool-icon { animation: smoothIconFloat 4s ease-in-out infinite; }
.tool-card-4 .tool-icon { animation: smoothIconRotate 4.5s ease-in-out infinite; }
.tool-card-5 .tool-icon { animation: smoothIconPulse 3s ease-in-out infinite; }
.tool-card-6 .tool-icon { animation: smoothIconFloat 5s ease-in-out infinite; }

/* Why Choose section animations */
.why-choose-section.section-visible .benefit-card-1 {
  animation: smoothTechReveal 0.8s ease-out 0.1s both;
}

.why-choose-section.section-visible .benefit-card-2 {
  animation: smoothPerformanceGlow 0.8s ease-out 0.2s both;
}

.why-choose-section.section-visible .benefit-card-3 {
  animation: smoothInnovationWave 0.8s ease-out 0.3s both;
}

.why-choose-section.section-visible .benefit-card-4 {
  animation: smoothSupportLift 0.8s ease-out 0.4s both;
}

/* CTA section animations */
.cta-section.section-visible .cta-title {
  animation: smoothCTATitle 0.8s ease-out 0.1s both;
}

.cta-section.section-visible .cta-description {
  animation: smoothCTADescription 0.8s ease-out 0.3s both;
}

.cta-section.section-visible .cta-highlight {
  animation: smoothCTAHighlight 1s ease-out 0.5s both;
}

.floating-tool-card {
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  will-change: transform, box-shadow, border-color;
  cursor: pointer;
}

.floating-tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 219, 97, 0.05) 0%, rgba(255, 31, 44, 0.05) 100%);
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.floating-tool-card:hover::before {
  opacity: 1;
}

.floating-tool-card .tool-icon {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.floating-tool-card h3 {
  transition: all 0.3s ease !important;
}

.floating-tool-card p {
  transition: all 0.3s ease !important;
}

/* Enhanced shadow for deeper floating effect */
.floating-tool-card:hover {
  filter: brightness(1.02);
}

/* Subtle animation for cards when they come into view */
@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.tools-section.section-visible .floating-tool-card {
  animation: floatIn 0.8s ease-out both;
}

.tools-section.section-visible .floating-tool-card:nth-child(1) { animation-delay: 0.1s; }
.tools-section.section-visible .floating-tool-card:nth-child(2) { animation-delay: 0.2s; }
.tools-section.section-visible .floating-tool-card:nth-child(3) { animation-delay: 0.3s; }
.tools-section.section-visible .floating-tool-card:nth-child(4) { animation-delay: 0.4s; }
.tools-section.section-visible .floating-tool-card:nth-child(5) { animation-delay: 0.5s; }
.tools-section.section-visible .floating-tool-card:nth-child(6) { animation-delay: 0.6s; }

/* Responsive adjustments for floating effect */
@media (max-width: 768px) {
  .floating-tool-card:hover {
    transform: translateY(-15px) scale(1.02) !important;
  }
}

@media (max-width: 480px) {
  .floating-tool-card:hover {
    transform: translateY(-10px) scale(1.01) !important;
  }
}

        `}
      </style>
      {/* Header - Navigation */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <a href="/" className="logo">
            <img
              src="/assets/logo/8con Academy Logo White.png"
              alt="8Con Academy Logo"
              className="logo-img"
            />
          </a>

          <nav className="desktop-nav">
            <a href="/sub-brands" className="nav-link">
              Home
            </a>
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
            <button
              onClick={() => handleSmoothScroll("about")}
              className="nav-link"
            >
              About
            </button>
            <button
              onClick={() => handleSmoothScroll("tools")}
              className="nav-link"
            >
              Tools
            </button>
            <button
              onClick={() => handleSmoothScroll("solutions")}
              className="nav-link"
            >
              Solutions
            </button>
            <button
              onClick={() => handleSmoothScroll("why-choose")}
              className="nav-link"
            >
              Insights
            </button>
            <button
              onClick={() => handleSmoothScroll("cta")}
              className="nav-link"
            >
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
            <a href="/sub-brands" className="mobile-nav-link">
              Home
            </a>
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
            <button
              onClick={() => handleSmoothScroll("about")}
              className="mobile-nav-link"
            >
              About
            </button>
            <button
              onClick={() => handleSmoothScroll("tools")}
              className="mobile-nav-link"
            >
              Tools
            </button>
            <button
              onClick={() => handleSmoothScroll("solutions")}
              className="mobile-nav-link"
            >
              Solutions
            </button>
            <button
              onClick={() => handleSmoothScroll("why-choose")}
              className="mobile-nav-link"
            >
              Why Choose
            </button>
            <button
              onClick={() => handleSmoothScroll("cta")}
              className="mobile-nav-link"
            >
              Contact
            </button>
          </nav>
        )}
      </header>
      {/* Hero Section */}
      <section id="hero" style={styles.heroSection} ref={heroRef}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          {/* Large Brand Logo/Number Image - Like ConVerse */}
          <img
            src="/assets/logo/5.png"
            alt="8ConEdge"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${
              animatedSections.has("hero") ? "animate-slide-in-top" : ""
            }`}
          />

          {/* Glassmorphic Content Block */}
          <div style={styles.heroForegroundContent}>
            {/* Subtitle */}
            <p
              style={styles.heroSubtitle}
              className={`animate-on-scroll ${
                animatedSections.has("hero")
                  ? "animate-fade-in-up stagger-1"
                  : ""
              }`}
            >
              Cutting-Edge Forex Tools for Trading Excellence
            </p>

            {/* Description */}
            <p
              style={styles.heroDescription}
              className={`animate-on-scroll ${
                animatedSections.has("hero")
                  ? "animate-fade-in-up stagger-2"
                  : ""
              }`}
            >
              Proprietary Forex tools and advanced trading systems designed to
              enhance trading efficiency, maximize profits, and provide traders
              with the competitive edge they need to succeed in the global
              markets.
            </p>

            {/* Buttons */}
            <div
              style={styles.heroButtons}
              className={`animate-on-scroll ${
                animatedSections.has("hero") ? "animate-zoom-in stagger-3" : ""
              }`}
            >
              <button
                style={styles.ctaButtonPrimary}
                className={
                  animatedSections.has("hero") ? "animate-pulse-glow" : ""
                }
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
        className={`slide-left ${
          animatedSections.has("about") ? "animate" : ""
        }`}
      >
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle}>Advanced Trading Technology</h2>
          <p style={styles.aboutText}>
            8ConEdge delivers{" "}
            <strong style={styles.strongText}>
              cutting-edge proprietary Forex tools
            </strong>{" "}
            that revolutionize the way traders analyze markets, execute trades,
            and manage risk. Our advanced technology combines artificial
            intelligence, real-time market analysis, and sophisticated
            algorithms to provide traders with unparalleled insights and trading
            advantages.
          </p>
          <div style={styles.statsGrid}>
            <div
              className={`stat-animate ${
                animatedSections.has("about") ? "animate" : ""
              }`}
              style={styles.statCard}
            >
              <div style={styles.statNumber}>95%</div>
              <div style={styles.statLabel}>Accuracy Rate</div>
            </div>
            <div
              className={`stat-animate ${
                animatedSections.has("about") ? "animate" : ""
              }`}
              style={styles.statCard}
            >
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Market Monitoring</div>
            </div>
            <div
              className={`stat-animate ${
                animatedSections.has("about") ? "animate" : ""
              }`}
              style={styles.statCard}
            >
              <div style={styles.statNumber}>500+</div>
              <div style={styles.statLabel}>Active Traders</div>
            </div>
          </div>
        </div>
      </section>
      {/* Tools Section */}
      <section
        id="tools"
        ref={toolsRef}
        style={styles.toolsSection}
        className={`tools-section ${
          animatedSections.has("tools") ? "section-visible" : ""
        }`}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#ffffff" }}
            className={`tools-section-title ${
              animatedSections.has("tools") ? "animate" : ""
            }`}
          >
            Our Proprietary Tools
          </h2>
          <div style={styles.toolsGrid}>
            {[
              {
                icon: (
                  <BarChart3
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Smart Market Analyzer",
                description:
                  "AI-powered market analysis tool that identifies profitable trading opportunities by analyzing multiple currency pairs simultaneously.",
                features: [
                  "• Real-time market scanning",
                  "• Pattern recognition algorithms",
                  "• Automated signal generation",
                ],
              },
              {
                icon: (
                  <Zap
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Lightning Trade Executor",
                description:
                  "Ultra-fast trade execution platform that ensures optimal entry and exit points with minimal slippage and maximum efficiency.",
                features: [
                  "• Sub-second execution speed",
                  "• Advanced order management",
                  "• Multi-broker compatibility",
                ],
              },
              {
                icon: (
                  <Shield
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Risk Guardian Pro",
                description:
                  "Comprehensive risk management system that protects your capital through advanced position sizing and automated stop-loss mechanisms.",
                features: [
                  "• Dynamic position sizing",
                  "• Automated risk controls",
                  "• Portfolio protection alerts",
                ],
              },
              {
                icon: (
                  <Rocket
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Profit Accelerator",
                description:
                  "Advanced profit optimization engine that maximizes returns through intelligent trade scaling and momentum-based position management.",
                features: [
                  "• Automated profit scaling",
                  "• Momentum indicators",
                  "• Performance optimization",
                ],
              },
              {
                icon: (
                  <Users
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Social Trading Hub",
                description:
                  "Connect with professional traders, copy successful strategies, and learn from the best performers in our exclusive trading community.",
                features: [
                  "• Strategy copying",
                  "• Performance leaderboards",
                  "• Community insights",
                ],
              },
              {
                icon: (
                  <Star
                    size={40}
                    style={{ color: "#0edb61", marginBottom: "1rem" }}
                    className="tool-icon"
                  />
                ),
                title: "Elite Backtesting Engine",
                description:
                  "Professional-grade backtesting platform that validates trading strategies using historical data with institutional-level accuracy and detail.",
                features: [
                  "• Historical data analysis",
                  "• Strategy validation",
                  "• Performance metrics",
                ],
              },
            ].map((tool, index) => (
              <div
                key={index}
                style={styles.toolCard}
                className={`floating-tool-card tool-card-${index + 1}`}
                onMouseEnter={(e) => {
                  // Floating effect like in your image
                  e.currentTarget.style.transform =
                    "translateY(-25px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 35px 80px rgba(14, 219, 97, 0.6), 0 0 0 3px #ff1f2c";
                  e.currentTarget.style.borderColor = "#ff1f2c";
                  e.currentTarget.style.zIndex = "10";

                  // Enhanced icon glow
                  const icon = e.currentTarget.querySelector(".tool-icon");
                  if (icon) {
                    icon.style.filter =
                      "drop-shadow(0 0 15px #0edb61) brightness(1.2)";
                    icon.style.transform = "scale(1.3) translateY(-5px)";
                  }

                  // Title effect
                  const title = e.currentTarget.querySelector("h3");
                  if (title) {
                    title.style.color = "#ff1f2c";
                    title.style.transform = "translateY(-3px)";
                    title.style.textShadow =
                      "0 2px 10px rgba(255, 31, 44, 0.3)";
                  }

                  // Description subtle animation
                  const description = e.currentTarget.querySelector("p");
                  if (description) {
                    description.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  // Reset to original state
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#0edb61";
                  e.currentTarget.style.zIndex = "1";

                  // Reset icon
                  const icon = e.currentTarget.querySelector(".tool-icon");
                  if (icon) {
                    icon.style.filter = "none";
                    icon.style.transform = "scale(1) translateY(0)";
                  }

                  // Reset title
                  const title = e.currentTarget.querySelector("h3");
                  if (title) {
                    title.style.color = "#000000";
                    title.style.transform = "translateY(0)";
                    title.style.textShadow = "none";
                  }

                  // Reset description
                  const description = e.currentTarget.querySelector("p");
                  if (description) {
                    description.style.transform = "translateY(0)";
                  }
                }}
              >
                <div className="tool-icon-container">{tool.icon}</div>
                <h3 style={styles.toolTitle}>{tool.title}</h3>
                <p style={styles.toolDescription}>{tool.description}</p>
                <ul style={styles.toolFeatures}>
                  {tool.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section
        id="why-choose"
        ref={whyChooseRef}
        style={styles.whyChooseSection}
        className={`why-choose-section ${
          animatedSections.has("why-choose") ? "section-visible" : ""
        }`}
      >
        <div style={styles.container2}>
          <h2 style={{ ...styles.sectionTitle, color: "#000000" }}>
            Why Choose 8ConEdge?
          </h2>
          <div style={styles.benefitsGrid}>
            {[
              {
                title: "Proprietary Technology",
                description:
                  "Our tools are built in-house by expert developers and traders, ensuring unique features and competitive advantages not available elsewhere.",
              },
              {
                title: "Proven Performance",
                description:
                  "Track record of helping traders achieve consistent profitability with tools tested and refined by professional traders in live market conditions.",
              },
              {
                title: "Continuous Innovation",
                description:
                  "Regular updates and new features based on market evolution and user feedback, keeping you ahead of market trends and opportunities.",
              },
              {
                title: "Expert Support",
                description:
                  "24/7 technical support from trading professionals who understand both the technology and the markets, ensuring you maximize your trading potential.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                style={styles.benefitCard}
                className={`smooth-benefit-card benefit-card-${index + 1}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.borderColor = "#0edb61";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(14, 219, 97, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                <p style={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        ref={ctaRef}
        style={styles.ctaSection}
        className={`cta-section ${
          animatedSections.has("cta") ? "section-visible" : ""
        }`}
      >
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="cta-title">
            Transform Your Trading Journey with 8ConEdge
          </h2>
          <p style={styles.ctaDescription} className="cta-description">
            Don't let another profitable opportunity slip away. With 8ConEdge's
            cutting-edge proprietary tools, you'll gain the precision, speed,
            and intelligence that separates consistently profitable traders from
            the rest. Our AI-powered market analysis, lightning-fast execution,
            and advanced risk management systems work together 24/7 to maximize
            your trading potential while protecting your capital.
          </p>
          <div
            style={styles.ctaHighlight}
            className="cta-highlight"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff1f2c";
              e.currentTarget.style.borderColor = "#ff1f2c";
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(255, 31, 44, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0edb61";
              e.currentTarget.style.borderColor = "#0edb61";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(14, 219, 97, 0.2)";
            }}
          >
            <strong>
              🚀 Unlock Your Trading Potential - Start Your 14-Day Free Trial &
              Experience Professional-Grade Results!
            </strong>
          </div>

          {/* Additional compelling elements */}
          {/* <div style={styles.ctaFeatures}>
            <div style={styles.ctaFeature}>
              <span style={styles.ctaFeatureIcon}>⚡</span>
              <span>Instant Access to All Tools</span>
            </div>
            <div style={styles.ctaFeature}>
              <span style={styles.ctaFeatureIcon}>🛡️</span>
              <span>No Risk - Cancel Anytime</span>
            </div>
            <div style={styles.ctaFeature}>
              <span style={styles.ctaFeatureIcon}>🎯</span>
              <span>24/7 Expert Support</span>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

// Clean responsive styling approach matching ConCise
const styles = {
  container: {
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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

  aboutSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#0edb61",
    textAlign: "center",
    marginBottom: "2rem",
  },

  aboutText: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 3rem",
    color: "#000000",
    lineHeight: "1.8",
  },

  strongText: {
    color: "#ff1f2c",
    fontWeight: "700",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  statCard: {
    textAlign: "center",
    padding: "2rem",
    background: "#000000",
    borderRadius: "15px",
    border: "2px solid #0edb61",
  },

  statNumber: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "bold",
    color: "#0edb61",
    marginBottom: "0.5rem",
  },

  statLabel: {
    fontSize: "1.1rem",
    color: "#ffffff",
    fontWeight: "600",
  },

  toolsSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  toolCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    border: "2px solid #0edb61",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    cursor: "pointer",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  toolTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "1rem",
  },

  toolDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },

  toolFeatures: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left",
  },

  solutionsSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  solutionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  solutionCard: {
    background: "#f8f9fa",
    padding: "2.5rem",
    borderRadius: "15px",
    border: "2px solid #0edb61",
    textAlign: "center",
  },

  solutionTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
  },

  solutionDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },

  solutionFeatures: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 2rem 0",
    textAlign: "left",
  },

  solutionButton: {
    background: "#0edb61",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-block",
  },

  whyChooseSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  benefitCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(14, 219, 97, 0.1)",
    textAlign: "center",
    border: "2px solid transparent",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cursor: "pointer",
  },

  benefitTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
  },

  benefitDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
  },

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
    fontSize: "clamp(2.2rem, 5vw, 2.8rem)",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#000000",
    background: "linear-gradient(135deg, #0edb61 0%, #ff1f2c 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
  },

  ctaDescription: {
    fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
    lineHeight: "1.8",
    maxWidth: "900px",
    margin: "0 auto 2.5rem",
    color: "#ffffff",
    fontWeight: "500",
  },

  ctaHighlight: {
    background: "#0edb61",
    padding: "1.8rem 2rem",
    borderRadius: "15px",
    fontSize: "clamp(1.2rem, 3vw, 1.4rem)",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    border: "2px solid #0edb61",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    boxShadow: "0 8px 25px rgba(14, 219, 97, 0.2)",
    fontWeight: "700",
  },

  // ctaFeatures: {
  //   display: "flex",
  //   justifyContent: "center",
  //   gap: "2rem",
  //   marginTop: "2rem",
  //   flexWrap: "wrap",
  //   "@media (max-width: 768px)": {
  //     flexDirection: "column",
  //     alignItems: "center",
  //     gap: "1rem",
  //   },
  // },

  // ctaFeature: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "0.8rem",
  //   padding: "1rem 1.8rem",
  //   background: "rgba(14, 219, 97, 0.1)",
  //   borderRadius: "30px",
  //   border: "2px solid #0edb61",
  //   fontSize: "1.1rem",
  //   fontWeight: "600",
  //   color: "#000000",
  //   transition: "all 0.3s ease",
  //   cursor: "default",
  //   minWidth: "200px",
  //   justifyContent: "center",
  // },

  // ctaFeatureIcon: {
  //   fontSize: "1.4rem",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   minWidth: "24px",
  // },
};

export default ConEdge;
