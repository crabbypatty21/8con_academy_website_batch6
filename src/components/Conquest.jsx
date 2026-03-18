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
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  Building,
  Lightbulb,
  PieChart,
  FileText,
  UserCheck,
  Zap,
  Check, // Imported for clean bullet points
  Handshake,
} from "lucide-react";

const ConQuest = () => {
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

  // Refs for animation observers
  const heroRef = useRef(null);
  const focusAreasRef = useRef(null);
  const whatSetsApartRef = useRef(null);
  const whoBenefitsRef = useRef(null);
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
      focusAreasRef,
      whatSetsApartRef,
      whoBenefitsRef,
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
    focusAreasSection: {
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

    // 2x2 Grid Layout
    grid2x2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
      gap: "2.5rem",
      marginTop: "2rem",
    },

    // Flex layout to center odd cards
    flexCenteredGrid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
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

    featuresTitle: {
      fontSize: "1rem",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
      marginTop: "0.5rem",
      alignSelf: "flex-start",
    },

    cardList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "left",
      width: "100%",
    },

    cardListItem: {
      fontSize: "0.95rem",
      color: "#A0ABB5",
      marginBottom: "0.8rem",
      lineHeight: "1.5",
      display: "flex",
      alignItems: "flex-start",
    },

    // Apply #19232A Background
    whatSetsApartSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#19232A", 
    },

    // Apply #131B21 Background
    whoBenefitsSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#131B21", 
    },

    // Apply #19232A Background
    ctaSection: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#19232A", 
      textAlign: "center",
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
      background: "#131B21",
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
  const focusAreasData = [
    {
      icon: <FileText size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Thesis Coaching",
      description: "Work with seasoned mentors who specialize in academic research and writing, ensuring high-quality outputs with comprehensive support.",
      subtitle: "Comprehensive Support:",
      items: [
        "Research proposals, topic selection, and literature reviews",
        "Statistical analysis, data interpretation, and report writing",
        "Oral defense preparation with confidence coaching",
      ],
    },
    {
      icon: <UserCheck size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Career Mentorship",
      description: "Receive mentorship from experienced professionals in business, finance, and other industries with personalized career development.",
      subtitle: "Personalized Development:",
      items: [
        "Tailored coaching to identify strengths and career goals",
        "Resume building, interview preparation, networking strategies",
        "Industry insights and competitive market navigation",
      ],
    },
    {
      icon: <Lightbulb size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Entrepreneurship",
      description: "Learn from entrepreneurs and business leaders with proven success in building and scaling businesses from idea to execution.",
      subtitle: "From Idea to Execution:",
      items: [
        "Business idea development, planning, and venture launching",
        "Marketing, branding, and operational strategies",
        "Funding opportunities, financial management, sustainable growth",
      ],
    },
  ];

  const whatSetsApartData = [
    {
      icon: <Star size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Expert Mentors",
      description: "Access a team of academic and industry experts with years of experience in guiding students, professionals, and entrepreneurs."
    },
    {
      icon: <PieChart size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Holistic Approach",
      description: "Combines academic coaching, career mentorship, and entrepreneurial guidance to provide comprehensive support."
    },
    {
      icon: <Target size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Customized Support",
      description: "Tailored solutions for individuals based on their unique goals, challenges, and aspirations."
    },
    {
      icon: <CheckCircle size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Actionable Insights",
      description: "Focus on delivering practical strategies and high-quality outputs that align with real-world demands."
    },
  ];

  const whoBenefitsData = [
    {
      icon: <GraduationCap size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Students",
      description: "Undergraduate and postgraduate students needing support in completing their thesis, dissertations, or research projects."
    },
    {
      icon: <Briefcase size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Professionals",
      description: "Individuals looking to advance their careers or transition into new industries with expert coaching."
    },
    {
      icon: <Zap size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Aspiring Entrepreneurs",
      description: "Those seeking guidance on launching or scaling their businesses with proven strategies and mentorship."
    },
    {
      icon: <Building size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Educational Institutions",
      description: "Schools and universities looking for expert-led coaching programs for their students and staff."
    },
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
            <a href="#focus-areas" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("focus-areas"); }}>
              Key Focus Areas
            </a>
            <a href="#what-sets-apart" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("what-sets-apart"); }}>
              What Sets Us Apart
            </a>
            <a href="#who-benefits" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("who-benefits"); }}>
              Who Benefits
            </a>
            <a href="#cta" className="nav-link" onClick={(e) => { e.preventDefault(); handleSmoothScroll("cta"); }}>
              Start Your Journey
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
            <button onClick={() => handleSmoothScroll("focus-areas")} className="mobile-nav-link">Key Focus Areas</button>
            <button onClick={() => handleSmoothScroll("what-sets-apart")} className="mobile-nav-link">What Sets Us Apart</button>
            <button onClick={() => handleSmoothScroll("who-benefits")} className="mobile-nav-link">Who Benefits</button>
            <button onClick={() => handleSmoothScroll("cta")} className="mobile-nav-link">Start Your Journey</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroContent} key={heroAnimationKey}>
          <img
            src="/assets/logo/3.png" // Updated to 8ConQuest Logo #3
            alt="8ConQuest"
            style={styles.heroTopImage}
            className={`animate-on-scroll ${isAnimated("hero") ? "animate-slide-in-top" : ""}`}
          />
          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className={`animate-on-scroll ${isAnimated("hero") ? "animate-fade-in-up stagger-1" : ""}`}>
              Conquer Your Academic and Career Goals
            </p>
            <p style={styles.heroDescription} className={`animate-on-scroll ${isAnimated("hero") ? "animate-fade-in-up stagger-2" : ""}`}>
              8ConQuest is dedicated to empowering students and professionals to achieve their academic and career aspirations through structured coaching, mentorship, and expert support with a focus on thesis and dissertation coaching, career development, and entrepreneurship mentorship.
            </p>
            <div style={styles.heroButtons} className={`animate-on-scroll ${isAnimated("hero") ? "animate-zoom-in stagger-3" : ""}`}>
              <button
                style={styles.ctaButtonPrimary}
                className={isAnimated("hero") ? "animate-pulse-glow" : ""}
                onClick={() => { window.location.href = "mailto:coaching@8conquest.com"; }}
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
                Get Expert Guidance
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("focus-areas")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "translateY(-3px)";
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

      {/* Key Focus Areas Section (HAS TOP COLOR BAR) */}
      <section id="focus-areas" ref={focusAreasRef} style={styles.focusAreasSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("focus-areas") ? "animate-slide-in-top" : ""}`}>
            KEY FOCUS AREAS OF <span style={{ color: "#39CC2F" }}>8CONQUEST</span>
          </h2>
          {/* Centered with Flex for bottom card */}
          <div style={styles.flexCenteredGrid}>
            {focusAreasData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={{
                    ...styles.cardStyle,
                    flex: "1 1 350px", 
                    maxWidth: "450px", 
                    width: "100%",     
                  }}
                  className={`animate-on-scroll ${isAnimated("focus-areas") ? `animate-bounce-in stagger-${index + 1}` : ""}`}
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
                  {/* TOP COLOR BAR FOR FIRST SECTION ONLY */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: topColor }} />
                  
                  <div style={styles.cardIcon}>{data.icon}</div>
                  <h3 style={styles.cardTitle}>{data.title}</h3>
                  <p style={styles.cardDescription}>{data.description}</p>
                  
                  {data.subtitle && <h4 style={styles.featuresTitle}>{data.subtitle}</h4>}
                  
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

      {/* What Sets Us Apart Section (NO TOP COLOR BAR) */}
      <section id="what-sets-apart" ref={whatSetsApartRef} style={styles.whatSetsApartSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("what-sets-apart") ? "animate-slide-in-top" : ""}`}>
            WHAT SETS <span style={{ color: "#ff1f2c" }}>8CONQUEST APART?</span>
          </h2>
          <div style={styles.grid2x2}>
            {whatSetsApartData.map((data, index) => {
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={styles.cardStyle}
                  className={`animate-on-scroll ${isAnimated("what-sets-apart") ? `animate-scale-in stagger-${index + 1}` : ""}`}
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

      {/* Who Benefits Section (NO TOP COLOR BAR) */}
      <section id="who-benefits" ref={whoBenefitsRef} style={styles.whoBenefitsSection}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className={`animate-on-scroll ${isAnimated("who-benefits") ? "animate-slide-in-top" : ""}`}>
            WHO CAN BENEFIT <span style={{ color: "#39CC2F" }}>FROM 8CONQUEST?</span>
          </h2>
          <div style={styles.grid2x2}>
            {whoBenefitsData.map((data, index) => {
              const shadowGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.25)" : "rgba(255, 31, 44, 0.25)";
              const borderGlow = index % 2 === 0 ? "rgba(57, 204, 47, 0.5)" : "rgba(255, 31, 44, 0.5)";

              return (
                <div
                  key={index}
                  style={styles.cardStyle}
                  className={`animate-on-scroll ${isAnimated("who-benefits") ? `animate-fade-in-up stagger-${index + 1}` : ""}`}
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

      {/* CTA Section */}
      <section id="cta" ref={ctaRef} style={styles.ctaSection}>
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className={`animate-on-scroll ${isAnimated("cta") ? "animate-slide-in-top" : ""}`}>
            EMPOWER YOUR JOURNEY <span style={{ color: "#ff1f2c" }}>WITH 8CONQUEST</span>
          </h2>
          <p style={styles.ctaDescription} className={`animate-on-scroll ${isAnimated("cta") ? "animate-fade-in-up stagger-1" : ""}`}>
            Whether you're completing your academic requirements, planning your next career move, or starting your entrepreneurial journey, 8ConQuest is here to guide you every step of the way. With structured coaching and mentorship from seasoned experts, you'll gain the skills, confidence, and insights needed to conquer your goals.
          </p>
          <div style={styles.ctaButtons} className={`animate-on-scroll ${isAnimated("cta") ? "animate-scale-in stagger-2" : ""}`}>
            
            <button
              style={styles.ctaButtonPrimary}
              className={`animate-on-scroll ${isAnimated("cta") ? "animate-bounce-in stagger-3" : ""}`}
              onClick={() => { window.location.href = "mailto:coaching@8conquest.com"; }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Target size={20} style={{ marginRight: "8px" }} />
              Start Your Coaching
            </button>
            
            <button
              style={styles.ctaButtonRed}
              className={`animate-on-scroll ${isAnimated("cta") ? "animate-bounce-in stagger-4" : ""}`}
              onClick={() => { window.location.href = "mailto:mentorship@8conquest.com"; }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Users size={20} style={{ marginRight: "8px" }} />
              Get Mentorship
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
              Conquer your goals with expert guidance – your success story starts here!
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConQuest;