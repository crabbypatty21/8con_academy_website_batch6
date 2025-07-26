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
  Users,
  BookOpen,
  Lightbulb,
  Presentation,
  DollarSign,
  Briefcase,
  LineChart,
} from "lucide-react";

const ConSult = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] =
    useState(false);
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const [isInHeroSection, setIsInHeroSection] = useState(false);
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);
  // Refs for sections
  const heroRef = useRef(null);
  const leadershipRef = useRef(null);
  const servicesRef = useRef(null);
  const approachRef = useRef(null);
  const clientsRef = useRef(null);
  const ctaRef = useRef(null);

  const isAnimated = (sectionId) => animatedSections.has(sectionId);

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
      id: "conpact",
      name: "8ConPact",
      route: "/8conpact",
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

  // Observer for hero section to detect when user is at top
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

        if (nowInHero) {
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* CSS Styles with Business-Themed Animations */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 2px;
          }
          
          /* Header Styles */
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

          /* Business-Themed Animation Keyframes */
          @keyframes executeIn {
            from {
              opacity: 0;
              transform: translateY(-80px) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes strategicSlide {
            from {
              opacity: 0;
              transform: translateX(-120px) skewX(-10deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) skewX(0deg);
            }
          }

          @keyframes growthSurge {
            from {
              opacity: 0;
              transform: translateX(120px) rotateY(45deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) rotateY(0deg);
            }
          }

          @keyframes powerZoom {
            from {
              opacity: 0;
              transform: scale(0.3) rotate(20deg);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1) rotate(-5deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes consultativeRise {
            from {
              opacity: 0;
              transform: translateY(150px) rotateX(30deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }

          @keyframes expertiseUnfold {
            0% {
              opacity: 0;
              transform: perspective(800px) rotateY(-90deg) translateZ(-50px);
            }
            50% {
              opacity: 0.7;
              transform: perspective(800px) rotateY(-45deg) translateZ(0px);
            }
            100% {
              opacity: 1;
              transform: perspective(800px) rotateY(0deg) translateZ(0px);
            }
          }

          @keyframes boardroomSlide {
            from {
              opacity: 0;
              transform: translateX(-200px) perspective(600px) rotateY(45deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) perspective(600px) rotateY(0deg);
            }
          }

          @keyframes successBuild {
            0% {
              opacity: 0;
              transform: scaleY(0) translateY(50px);
              transform-origin: bottom;
            }
            60% {
              opacity: 0.8;
              transform: scaleY(1.1) translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: scaleY(1) translateY(0);
            }
          }

          @keyframes networkExpand {
            0% {
              opacity: 0;
              transform: scale(0.1) rotate(180deg);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.2) rotate(0deg);
            }
              70% {
              transform: scale(0.95) rotate(-5deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes innovationSpark {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(80px) rotate(-45deg);
              filter: brightness(0.3);
            }
            50% {
              opacity: 0.9;
              transform: scale(1.1) translateY(-20px) rotate(10deg);
              filter: brightness(1.3);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0) rotate(0deg);
              filter: brightness(1);
            }
          }

          @keyframes professionalGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(14, 219, 97, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 40px rgba(14, 219, 97, 0.6), 0 0 60px rgba(255, 31, 44, 0.2);
              transform: scale(1.02);
            }
          }

          /* Hero Section Animations - Executive Theme */
          .hero-title {
            animation: executeIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .hero-subtitle {
            animation: strategicSlide 1.2s ease-out 0.3s both;
          }

          .hero-description {
            animation: growthSurge 1.2s ease-out 0.6s both;
          }

          .hero-buttons {
            animation: powerZoom 1s ease-out 0.9s both;
          }

          /* Section Animations */
          .section-visible .section-title {
            animation: executeIn 0.9s ease-out both;
          }

          /* Leadership Section - Authority Theme */
          .section-visible .leadership-text {
            animation: boardroomSlide 1.2s ease-out 0.2s both;
          }

          .section-visible .leadership-stats {
            animation: consultativeRise 1s ease-out 0.4s both;
          }

          .section-visible .stat-item-1 {
            animation: successBuild 0.8s ease-out 0.6s both;
          }

          .section-visible .stat-item-2 {
            animation: successBuild 0.8s ease-out 0.8s both;
          }

          .section-visible .stat-item-3 {
            animation: successBuild 0.8s ease-out 1s both;
          }

          /* Services Section - Expertise Unfold */
          .section-visible .service-card-1 {
            animation: expertiseUnfold 1s ease-out 0.2s both;
          }

          .section-visible .service-card-2 {
            animation: expertiseUnfold 1s ease-out 0.4s both;
          }

          .section-visible .service-card-3 {
            animation: expertiseUnfold 1s ease-out 0.6s both;
          }

          .section-visible .service-card-4 {
            animation: expertiseUnfold 1s ease-out 0.8s both;
          }

          .section-visible .service-icon {
            animation: professionalGlow 2s ease-in-out infinite;
          }

          /* Approach Section - Innovation Spark */
          .section-visible .approach-card-1 {
            animation: innovationSpark 1s ease-out 0.2s both;
          }

          .section-visible .approach-card-2 {
            animation: innovationSpark 1s ease-out 0.4s both;
          }

          .section-visible .approach-card-3 {
            animation: innovationSpark 1s ease-out 0.6s both;
          }

          .section-visible .approach-card-4 {
            animation: innovationSpark 1s ease-out 0.8s both;
          }

          /* Clients Section - Network Expansion */
          .section-visible .client-card-1 {
            animation: networkExpand 1s ease-out 0.2s both;
          }

          .section-visible .client-card-2 {
            animation: networkExpand 1s ease-out 0.4s both;
          }

          .section-visible .client-card-3 {
            animation: networkExpand 1s ease-out 0.6s both;
          }

          .section-visible .client-card-4 {
            animation: networkExpand 1s ease-out 0.8s both;
          }

          /* CTA Section - Executive Decision */
          .section-visible .cta-title {
            animation: executeIn 1s ease-out both;
          }

          .section-visible .cta-description {
            animation: strategicSlide 1s ease-out 0.3s both;
          }

          .section-visible .cta-buttons {
            animation: powerZoom 0.8s ease-out 0.6s both;
          }

          .section-visible .cta-highlight {
            animation: consultativeRise 1s ease-out 0.9s both;
          }

          /* Responsive Styles */
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

          /* Responsive Animation Adjustments */
          @media (max-width: 768px) {
            .section-visible .leadership-text,
            .section-visible .leadership-stats {
              animation: consultativeRise 0.8s ease-out 0.2s both;
            }
            
            .section-visible .service-card-1,
            .section-visible .service-card-2,
            .section-visible .service-card-3,
            .section-visible .service-card-4 {
              animation: consultativeRise 0.8s ease-out 0.2s both;
            }
            
            .section-visible .approach-card-1,
            .section-visible .approach-card-2,
            .section-visible .approach-card-3,
            .section-visible .approach-card-4 {
              animation: consultativeRise 0.8s ease-out 0.2s both;
            }
            
            .section-visible .client-card-1,
            .section-visible .client-card-2,
            .section-visible .client-card-3,
            .section-visible .client-card-4 {
              animation: consultativeRise 0.8s ease-out 0.2s both;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              animation: executeIn 1s ease-out;
            }
            
            .hero-subtitle {
              animation: strategicSlide 0.8s ease-out 0.2s both;
            }
            
            .hero-description {
              animation: growthSurge 0.8s ease-out 0.4s both;
            }
            
            .hero-buttons {
              animation: powerZoom 0.6s ease-out 0.6s both;
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

/* Update existing hero animations */
.hero-title {
  animation: fadeInUp 1.2s ease-out 0.2s both;
}

.hero-subtitle {
  animation: fadeInUp 1.2s ease-out 0.4s both;
}

.hero-description {
  animation: fadeInUp 1.2s ease-out 0.6s both;
}

.hero-buttons {
  animation: fadeInUp 1.2s ease-out 0.8s both;
}

.consult-clients-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

/* Large screens - keep 2x2 grid */
@media (min-width: 1025px) {
  .consult-clients-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    max-width: 900px;
    margin: 3rem auto 0;
  }
}

/* Tablets and small laptops */
@media (max-width: 1024px) {
  .consult-clients-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
}

/* Tablets and large phones */
@media (max-width: 768px) {
  .consult-clients-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    margin-top: 2.5rem !important;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .consult-clients-grid {
    grid-template-columns: 1fr !important;
    gap: 1.2rem !important;
    margin-top: 2rem !important;
    padding: 0 10px;
  }
  
  .client-category {
    padding: 1.5rem 1.2rem !important;
  }
  
  .client-title {
    font-size: 1.1rem !important;
    margin-bottom: 1rem !important;
  }
  
  .client-list-item {
    font-size: 0.9rem !important;
    margin-bottom: 0.7rem !important;
    line-height: 1.4 !important;
  }
}

/* Very small screens like 425px */
@media (max-width: 425px) {
  .consult-clients-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
    margin-top: 1.5rem !important;
    padding: 0 5px;
  }
  
  .client-category {
    padding: 1.2rem 1rem !important;
    margin: 0 !important;
  }
  
  .client-title {
    font-size: 1rem !important;
    margin-bottom: 0.8rem !important;
    text-align: center;
  }
  
  .client-list {
    padding-left: 0 !important;
  }
  
  .client-list-item {
    font-size: 0.85rem !important;
    margin-bottom: 0.6rem !important;
    line-height: 1.3 !important;
    padding-left: 0.5rem;
  }
}
  .approach-grid-3-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 2rem;
  margin-top: 3rem;
}

/* Position the 4th card (Network Access) in the center of the second row */
.approach-grid-3-1 .approach-card:nth-child(4) {
  grid-column: 2 / 3; /* Place in the middle column of second row */
  grid-row: 2;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .approach-grid-3-1 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
  
  .approach-grid-3-1 .approach-card:nth-child(4) {
    grid-column: 1 / -1; /* Span full width on tablets */
    grid-row: auto;
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .approach-grid-3-1 {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  
  .approach-grid-3-1 .approach-card:nth-child(4) {
    grid-column: 1 !important;
    grid-row: auto !important;
    max-width: 100% !important;
    margin: 0 !important;
  }
}

@media (max-width: 480px) {
  .approach-grid-3-1 {
    gap: 1.2rem !important;
    margin-top: 2rem !important;
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
                      navigate(brand.route);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#leadership"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("leadership");
              }}
            >
              Leadership
            </a>
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
              href="#approach"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("approach");
              }}
            >
              Our Approach
            </a>
            <a
              href="#clients"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("clients");
              }}
            >
              Target Clients
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
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("leadership");
              }}
            >
              Leadership
            </a>
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
              href="#approach"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("approach");
              }}
            >
              Our Approach
            </a>
            <a
              href="#clients"
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("clients");
              }}
            >
              Target Clients
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

      {/* Hero Section */}
      <section id="hero" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          {/* Large Brand Logo/Number Image - Like ConVerse */}
          <img
            src="/assets/logo/9.png" // Replace with your ConSult logo/image
            alt="8ConSult"
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
              Business Development & Startup Advisory with Sir Nigel Santos
            </p>

            {/* Description */}
            <p
              style={styles.heroDescription}
              className={`animate-on-scroll ${
                isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""
              }`}
            >
              A consultation arm powered by real-world experience in
              entrepreneurship. Transform your business ideas into thriving
              ventures with expert guidance from ideation to execution, scaling,
              and investor readiness.
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
                  e.currentTarget.style.background = "#0cbb52";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book Consultation
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("services")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Startup Kit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section
        id="leadership"
        ref={leadershipRef}
        style={styles.leadershipSection}
        className={isAnimated("leadership") ? "section-visible" : ""}
      >
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="section-title">
            Led by Entrepreneurial Excellence
          </h2>
          <div style={styles.leadershipContent}>
            <div style={styles.leadershipText} className="leadership-text">
              <p style={styles.leadershipDescription}>
                Spearheaded by{" "}
                <strong style={styles.strongText}>Sir Nigel Santos</strong>, our
                Chief Business Development Officer, 8ConSult brings decades of
                real-world entrepreneurial experience to your business journey.
                Sir Nigel's proven track record in building successful ventures,
                navigating market challenges, and scaling businesses provides
                the foundation for our comprehensive advisory services.
              </p>
              <p style={styles.leadershipDescription}>
                With expertise spanning startup ecosystems, business model
                innovation, and investor relations, Sir Nigel ensures that every
                consultation delivers actionable insights and strategic
                direction tailored to your unique business goals.
              </p>
            </div>
            <div style={styles.leadershipStats} className="leadership-stats">
              <div style={styles.statItem} className="stat-item-1">
                <h3 style={styles.statNumber}>20+</h3>
                <p style={styles.statLabel}>Years Experience</p>
              </div>
              <div style={styles.statItem} className="stat-item-2">
                <h3 style={styles.statNumber}>200+</h3>
                <p style={styles.statLabel}>Startups Advised</p>
              </div>
              <div style={styles.statItem} className="stat-item-3">
                <h3 style={styles.statNumber}>95%</h3>
                <p style={styles.statLabel}>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        style={styles.servicesSection}
        className={isAnimated("services") ? "section-visible" : ""}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#ffffff" }}
            className="section-title"
          >
            Our Advisory Services
          </h2>
          <div style={styles.servicesGrid}>
            <div
              style={styles.serviceCard}
              className="service-card-1"
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
              <div style={styles.serviceIcon} className="service-icon">
                <Lightbulb size={48} color="#0edb61" />
              </div>
              <h3 style={styles.serviceTitle}>Startup Coaching</h3>
              <p style={styles.serviceDescription}>
                Comprehensive guidance for aspiring entrepreneurs from ideation
                to execution, ensuring your startup is built on solid
                foundations.
              </p>
              <ul style={styles.serviceList}>
                <li style={styles.serviceListItem}>
                  • Idea validation and market research
                </li>
                <li style={styles.serviceListItem}>
                  • Business plan development and refinement
                </li>
                <li style={styles.serviceListItem}>
                  • Team building and leadership guidance
                </li>
              </ul>
            </div>

            <div
              style={styles.serviceCard}
              className="service-card-2"
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
              <div style={styles.serviceIcon} className="service-icon">
                <LineChart size={48} color="#0edb61" />
              </div>
              <h3 style={styles.serviceTitle}>Business Model Analysis</h3>
              <p style={styles.serviceDescription}>
                Get your business evaluated and refined with expert input,
                optimizing for sustainability and growth potential.
              </p>
              <ul style={styles.serviceList}>
                <li style={styles.serviceListItem}>
                  • Revenue model optimization
                </li>
                <li style={styles.serviceListItem}>
                  • Cost structure analysis
                </li>
                <li style={styles.serviceListItem}>
                  • Competitive positioning strategy
                </li>
              </ul>
            </div>

            <div
              style={styles.serviceCard}
              className="service-card-3"
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
              <div style={styles.serviceIcon} className="service-icon">
                <TrendingUp size={48} color="#0edb61" />
              </div>
              <h3 style={styles.serviceTitle}>
                Sales Strategy & Growth Blueprint
              </h3>
              <p style={styles.serviceDescription}>
                Tailored game plans for scaling and market positioning, designed
                to accelerate your business growth and market penetration.
              </p>
              <ul style={styles.serviceList}>
                <li style={styles.serviceListItem}>
                  • Go-to-market strategy development
                </li>
                <li style={styles.serviceListItem}>
                  • Sales funnel optimization
                </li>
                <li style={styles.serviceListItem}>
                  • Growth hacking techniques
                </li>
              </ul>
            </div>

            <div
              style={styles.serviceCard}
              className="service-card-4"
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
              <div style={styles.serviceIcon} className="service-icon">
                <Presentation size={48} color="#0edb61" />
              </div>
              <h3 style={styles.serviceTitle}>Investor Deck & Pitch Support</h3>
              <p style={styles.serviceDescription}>
                Prepare for investor talks and funding rounds with compelling
                presentations and pitch strategies that get results.
              </p>
              <ul style={styles.serviceList}>
                <li style={styles.serviceListItem}>
                  • Investor deck creation and refinement
                </li>
                <li style={styles.serviceListItem}>
                  • Pitch practice and coaching
                </li>
                <li style={styles.serviceListItem}>
                  • Investor network introductions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section
        id="approach"
        ref={approachRef}
        style={styles.approachSection}
        className={isAnimated("approach") ? "section-visible" : ""}
      >
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="section-title">
            Why Choose 8ConSult?
          </h2>
          <div style={styles.approachGrid}>
            <div
              style={styles.approachCard}
              className="approach-card-1"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#0edb61";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.approachTitle}>Real-World Experience</h3>
              <p style={styles.approachDescription}>
                Benefit from decades of hands-on entrepreneurial experience, not
                just theoretical knowledge. Our advice comes from actual startup
                successes and lessons learned.
              </p>
            </div>

            <div
              style={styles.approachCard}
              className="approach-card-2"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#0edb61";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.approachTitle}>Personalized Strategy</h3>
              <p style={styles.approachDescription}>
                Every business is unique. We develop customized strategies that
                align with your specific industry, market conditions, and growth
                objectives.
              </p>
            </div>

            <div
              style={styles.approachCard}
              className="approach-card-3"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#0edb61";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.approachTitle}>End-to-End Support</h3>
              <p style={styles.approachDescription}>
                From initial concept to investor readiness, we provide
                comprehensive support throughout your entrepreneurial journey,
                ensuring no critical step is missed.
              </p>
            </div>

            <div
              style={styles.approachCard}
              className="approach-card-4"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#0edb61";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(14, 219, 97, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.approachTitle}>Network Access</h3>
              <p style={styles.approachDescription}>
                Gain access to an extensive network of investors, industry
                experts, and potential partners to accelerate your business
                growth and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients Section */}
      <section
        id="clients"
        ref={clientsRef}
        style={styles.clientsSection}
        className={isAnimated("clients") ? "section-visible" : ""}
      >
        <div style={styles.container2}>
          <h2
            style={{ ...styles.sectionTitle, color: "#ffffff" }}
            className="section-title"
          >
            Who We Serve
          </h2>
          <div className="consult-clients-grid">
            {" "}
            {/* Use className instead of style */}
            <div
              style={styles.clientCategory}
              className="client-card client-card-1"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) rotateY(5deg)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotateY(0deg)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.clientTitle}>Aspiring Entrepreneurs</h3>
              <ul style={styles.clientList}>
                <li style={styles.clientListItem}>
                  • First-time founders with innovative ideas
                </li>
                <li style={styles.clientListItem}>
                  • Professionals transitioning to entrepreneurship
                </li>
                <li style={styles.clientListItem}>
                  • Students developing startup concepts
                </li>
                <li style={styles.clientListItem}>
                  • Career changers seeking business opportunities
                </li>
              </ul>
            </div>
            <div
              style={styles.clientCategory}
              className="client-card client-card-2"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) rotateY(-5deg)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotateY(0deg)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.clientTitle}>Early-Stage Startups</h3>
              <ul style={styles.clientList}>
                <li style={styles.clientListItem}>
                  • Pre-seed and seed stage companies
                </li>
                <li style={styles.clientListItem}>
                  • Startups seeking product-market fit
                </li>
                <li style={styles.clientListItem}>
                  • Teams preparing for funding rounds
                </li>
                <li style={styles.clientListItem}>
                  • Companies needing strategic pivot guidance
                </li>
              </ul>
            </div>
            <div
              style={styles.clientCategory}
              className="client-card client-card-3"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) rotateY(5deg)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotateY(0deg)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.clientTitle}>Growing Businesses</h3>
              <ul style={styles.clientList}>
                <li style={styles.clientListItem}>
                  • SMEs ready for scaling operations
                </li>
                <li style={styles.clientListItem}>
                  • Companies entering new markets
                </li>
                <li style={styles.clientListItem}>
                  • Businesses optimizing for growth
                </li>
                <li style={styles.clientListItem}>
                  • Organizations seeking strategic partnerships
                </li>
              </ul>
            </div>
            <div
              style={styles.clientCategory}
              className="client-card client-card-4"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) rotateY(-5deg)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(14, 219, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotateY(0deg)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={styles.clientTitle}>Corporate Innovators</h3>
              <ul style={styles.clientList}>
                <li style={styles.clientListItem}>
                  • Large companies developing new ventures
                </li>
                <li style={styles.clientListItem}>
                  • Corporate innovation teams
                </li>
                <li style={styles.clientListItem}>
                  • Organizations launching intrapreneurship programs
                </li>
                <li style={styles.clientListItem}>
                  • Companies seeking digital transformation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        ref={ctaRef}
        style={styles.ctaSection}
        className={isAnimated("cta") ? "section-visible" : ""}
      >
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="cta-title">
            Ready to Transform Your Business Vision?
          </h2>
          <p style={styles.ctaDescription} className="cta-description">
            Achieve more with 8ConSult—where expert guidance meets your
            ambition. Whether you're taking your first entrepreneurial steps or
            scaling an existing venture, Sir Nigel Santos and our team provide
            the strategic insights and practical support you need to succeed.
          </p>
          <div style={styles.ctaButtons} className="cta-buttons">
            <button
              style={styles.ctaPrimaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0cbb52";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(14, 219, 97, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(14, 219, 97, 0.2)";
              }}
            >
              Schedule Your Consultation
            </button>
            <button
              style={styles.ctaSecondaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(255, 31, 44, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(255, 31, 44, 0.2)";
              }}
            >
              Download Startup Guide
            </button>
          </div>
          <div style={styles.ctaHighlight} className="cta-highlight">
            <strong>
              From ideation to execution, from startup to scale-up—8ConSult is
              your trusted partner in building a successful business!
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styling with alternating background colors and responsive design
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

  // Hero Section (Green to Black gradient)
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

  // Leadership Section (White background)
  leadershipSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: "3rem",
  },

  leadershipContent: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "3rem",
    alignItems: "center",
  },

  leadershipText: {
    maxWidth: "600px",
  },

  leadershipDescription: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    marginBottom: "1.5rem",
    color: "#000000",
  },

  strongText: {
    color: "#ff1f2c",
    fontWeight: "700",
  },

  leadershipStats: {
    display: "grid",
    gap: "2rem",
  },

  statItem: {
    textAlign: "center",
    padding: "1.5rem",
    borderRadius: "10px",
    border: "2px solid #0edb61",
  },

  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "0.5rem",
  },

  statLabel: {
    fontSize: "1rem",
    color: "#000000",
    fontWeight: "600",
  },

  // Services Section (Black background)
  servicesSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  serviceCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    border: "2px solid #0edb61",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
  },

  serviceIcon: {
    marginBottom: "1rem",
  },

  serviceTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "1rem",
  },

  serviceDescription: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
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
  },

  // Approach Section (White background)
  approachSection: {
    background: "#ffffff",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },

  approachGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },

  approachCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(14, 219, 97, 0.1)",
    textAlign: "center",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  approachTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1rem",
  },

  approachDescription: {
    fontSize: "1rem",
    color: "#000000",
    lineHeight: "1.7",
  },

  // Clients Section (Black background)
  clientsSection: {
    background: "#000000",
    padding: "80px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  clientCategory: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    border: "2px solid #0edb61",
  },

  clientTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#0edb61",
    marginBottom: "1.5rem",
    textAlign: "center",
  },

  clientList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  clientListItem: {
    fontSize: "1rem",
    color: "#000000",
    marginBottom: "1rem",
    lineHeight: "1.6",
  },

  // CTA Section (White background)
  ctaSection: {
    background: "#ffffff",
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
    color: "#000000",
  },

  ctaDescription: {
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    lineHeight: "1.8",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    color: "#000000",
  },

  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },

  ctaPrimaryButton: {
    background: "#0edb61",
    color: "#ffffff",
    padding: "1.2rem 2.5rem",
    borderRadius: "10px",
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(14, 219, 97, 0.2)",
  },

  ctaSecondaryButton: {
    background: "#ff1f2c",
    color: "#ffffff",
    padding: "1.2rem 2.5rem",
    borderRadius: "10px",
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 31, 44, 0.2)",
  },

  ctaHighlight: {
    background: "#f8f9fa",
    padding: "2rem",
    borderRadius: "15px",
    fontSize: "1.2rem",
    maxWidth: "700px",
    margin: "0 auto",
    border: "2px solid #0edb61",
    color: "#000000",
  },
};

export default ConSult;
