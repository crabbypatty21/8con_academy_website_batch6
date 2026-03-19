import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import "../ConponentCSS/Animations.css"; // Imported native animations
import TradingBackground from "./TradingBackground.jsx"; // Forex trading background
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
  Briefcase,
  GraduationCap,
  Plane,
  Mic,
  Check,
  Handshake,
} from "lucide-react";

const ConVerse = () => {
  const { colors, isDark } = useTheme();
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

    const animatedElements = document.querySelectorAll(".slide-in-right, .fade-in-up, .scale-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleLearnMore = () => {
    handleSmoothScroll("services");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Premium Dark Theme Styles
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
      boxShadow: "0 4px 15px rgba(255, 31, 44, 0.3)",
    },

    sectionCommon: {
      padding: "clamp(80px, 15vh, 120px) clamp(20px, 5vw, 40px)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
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

  // Data Arrays for clean mapping
  const importanceData = [
    {
      icon: <Briefcase size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Access to In-Demand Jobs",
      description: "Healthcare professionals, BPO workers, teachers, and skilled tradespeople need language certifications for local and international opportunities.",
      items: [
        "Healthcare: Nurses, caregivers, medical workers",
        "BPO: Customer service, technical support",
        "Education: International schools, universities",
        "Hospitality: Hotels, cruise lines, tourism"
      ]
    },
    {
      icon: <GraduationCap size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Academic Opportunities",
      description: "Universities and colleges in English-speaking countries require IELTS, TOEFL, or equivalent scores for admission and scholarship programs.",
      items: [
        "University admissions worldwide",
        "Scholarship program eligibility",
        "Advanced study opportunities",
        "Research collaboration access"
      ]
    },
    {
      icon: <TrendingUp size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Competitive Advantage",
      description: "Language proficiency opens doors to promotions, higher salaries, and better job opportunities both locally and internationally.",
      items: [
        "Career advancement opportunities",
        "Higher salary potential",
        "Professional confidence building",
        "Global communication skills"
      ]
    }
  ];

  const servicesData = [
    {
      icon: <BookOpen size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Comprehensive Review",
      description: "Tailored courses for IELTS, TOEFL, and other certification exams with complete skill development.",
      items: [
        "Listening, Reading, Writing, Speaking Skills",
        "Practice tests aligned with actual exam formats",
        "Score maximization strategies",
        "Time management techniques"
      ]
    },
    {
      icon: <Users size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Experienced Instructors",
      description: "Learn from seasoned language coaches who specialize in preparing students for high-stakes exams.",
      items: [
        "Expert tips and strategies",
        "Personalized feedback",
        "Proven teaching methodologies",
        "Individual attention"
      ]
    },
    {
      icon: <Mic size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Interactive Learning",
      description: "Engage in role-playing, mock interviews, and real-world scenarios to improve fluency and confidence.",
      items: [
        "Role-playing exercises",
        "Mock interview sessions",
        "Real-world communication scenarios",
        "Confidence building activities"
      ]
    },
    {
      icon: <Clock size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Flexible Learning Options",
      description: "On-site and online classes designed to fit the busy schedules of working professionals and students.",
      items: [
        "On-site classroom sessions",
        "Online virtual classes",
        "Flexible scheduling",
        "Self-paced learning modules"
      ]
    }
  ];

  const whyChooseData = [
    {
      icon: <Award size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Proven Success",
      description: "With a track record of students passing IELTS, TOEFL, and other exams, we've helped individuals unlock opportunities globally."
    },
    {
      icon: <Target size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Industry-Relevant Training",
      description: "Tailored programs to meet the needs of high-demand professions both locally and abroad, ensuring relevant and focused learning."
    },
    {
      icon: <Brain size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Confidence Building",
      description: "Beyond exams, 8ConVerse equips students with the practical communication skills needed for workplace and social interactions."
    },
    {
      icon: <Users size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Supportive Community",
      description: "A welcoming environment that encourages growth, learning, and success with peer support and collaborative learning."
    }
  ];

  const benefitsData = [
    {
      icon: <Plane size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Aspiring Overseas Workers",
      items: [
        "Healthcare professionals seeking international opportunities",
        "Skilled workers and tradespeople",
        "Professionals looking to qualify for jobs abroad"
      ]
    },
    {
      icon: <TrendingUp size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Professionals Seeking Advancement",
      items: [
        "BPO and customer service employees",
        "Hospitality and tourism workers",
        "Education sector professionals"
      ]
    },
    {
      icon: <GraduationCap size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Students & Migrants",
      items: [
        "High school and college students",
        "Those preparing for admissions abroad",
        "Families applying for migration programs"
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 60px;
          }

          /* ----- Beautiful CSS for the Cards ----- */
          .converse-card {
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
            align-items: center;
            text-align: center;
            gap: 1rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s ease-out, border-color 0.3s ease-out;
          }

          .converse-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(57, 204, 47, 0.15);
            border-color: rgba(57, 204, 47, 0.3);
          }
          
          /* ----- Grid Layouts ----- */
          .grid-2x2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            margin-top: 3rem;
          }

          .grid-3col {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
          }
          
          @media (max-width: 768px) {
            .grid-2x2 {
              grid-template-columns: 1fr;
            }
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
          
          .nav-link:hover { transform: translateY(-2px); color: #0edb61; }
          .dropdown { position: relative; }
          .dropdown:hover .dropdown-content { display: block; }
          
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

          .dropdown-link:hover { background-color: rgba(255, 255, 255, 0.05); color: #0edb61; }

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
            border-bottom: 1px solid rgba(255,255,255,0.05);
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
                      navigate(brand.route);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
            <button className="nav-link" onClick={() => handleSmoothScroll("importance")}>Why Language Matters</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("services")}>How We Help</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("why-choose")}>Why Choose Us</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("benefits")}>Who Benefits</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("cta")}>Contact</button>
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
                    <a key={index} href={brand.route} className="mobile-nav-sublink" onClick={(e) => { e.preventDefault(); navigate(brand.route); }}>
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => handleSmoothScroll("importance")} className="mobile-nav-link">Why Language Matters</button>
            <button onClick={() => handleSmoothScroll("services")} className="mobile-nav-link">How We Help</button>
            <button onClick={() => handleSmoothScroll("why-choose")} className="mobile-nav-link">Why Choose Us</button>
            <button onClick={() => handleSmoothScroll("benefits")} className="mobile-nav-link">Who Benefits</button>
            <button onClick={() => handleSmoothScroll("cta")} className="mobile-nav-link">Contact</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <img
            src="/assets/logo/4.png"
            alt="8ConVerse"
            style={styles.heroTopImage}
            className="fade-in-up anim-delay-1"
          />
          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className="fade-in-up anim-delay-2">
              Fluency Meets Confidence
            </p>
            <p style={styles.heroDescription} className="fade-in-up anim-delay-3">
              In today's interconnected world, the ability to communicate effectively in English has become a vital skill for success. 8ConVerse is dedicated to empowering individuals to master IELTS, TOEFL, and other language certifications.
            </p>
            <div style={styles.heroButtons} className="fade-in-up anim-delay-4">
              <button
                style={styles.ctaButtonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff1f2c";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 31, 44, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0edb61";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(14, 219, 97, 0.3)";
                }}
              >
                Start Your Journey
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={handleLearnMore}
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

      {/* Importance Section */}
      <section id="importance" style={{ ...styles.sectionCommon, backgroundColor: "#131B21" }}>
        <TradingBackground variant={1} />
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            WHY LANGUAGE <span style={{ color: "#39CC2F" }}>MATTERS</span>
          </h2>
          <div className="grid-3col">
            {importanceData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";

              return (
                <div key={index} className={`scale-up anim-delay-${(index % 3) + 1}`}>
                  <div className="converse-card">
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: topColor }} />
                    
                    <div>{data.icon}</div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                    <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{data.description}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", width: "100%", marginTop: "0.5rem" }}>
                      {data.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ fontSize: "0.95rem", color: "#A0ABB5", marginBottom: "0.8rem", lineHeight: "1.5", display: "flex", alignItems: "flex-start" }}>
                          <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                          <span>{item}</span>
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

      {/* Services Section */}
      <section id="services" style={{ ...styles.sectionCommon, backgroundColor: "#19232A" }}>
        <TradingBackground variant={2} />
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            HOW <span style={{ color: "#39CC2F" }}>8CONVERSE</span> HELPS
          </h2>
          <div className="grid-2x2">
            {servicesData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";

              return (
                <div key={index} className={`slide-in-right anim-delay-${(index % 4) + 1}`}>
                  <div className="converse-card">
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", backgroundColor: topColor }} />

                    <div>{data.icon}</div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                    <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{data.description}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", width: "100%", marginTop: "0.5rem" }}>
                      {data.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ fontSize: "0.95rem", color: "#A0ABB5", marginBottom: "0.8rem", lineHeight: "1.5", display: "flex", alignItems: "flex-start" }}>
                          <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                          <span>{item}</span>
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
      <section id="why-choose" style={{ ...styles.sectionCommon, backgroundColor: "#131B21" }}>
        <TradingBackground variant={3} />
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONVERSE?</span>
          </h2>
          <div className="grid-2x2">
            {whyChooseData.map((data, index) => (
              <div key={index} className={`fade-in-up anim-delay-${(index % 4) + 1}`}>
                <div className="converse-card" style={{ justifyContent: "center" }}>
                  <div>{data.icon}</div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                  <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{ ...styles.sectionCommon, backgroundColor: "#19232A" }}>
        <TradingBackground variant={1} />
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            WHO CAN BENEFIT <span style={{ color: "#39CC2F" }}>FROM 8CONVERSE?</span>
          </h2>
          <div className="grid-3col">
            {benefitsData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";

              return (
                <div key={index} className={`scale-up anim-delay-${(index % 3) + 1}`}>
                  <div className="converse-card">
                    <div>{data.icon}</div>
                    <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", width: "100%", marginTop: "0.5rem" }}>
                      {data.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ fontSize: "0.95rem", color: "#A0ABB5", marginBottom: "0.8rem", lineHeight: "1.5", display: "flex", alignItems: "flex-start" }}>
                          <Check size={18} color={topColor} strokeWidth={4} style={{ marginRight: "8px", flexShrink: 0, marginTop: "2px" }} />
                          <span>{item}</span>
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

      {/* CTA Section */}
      <section id="cta" style={{ ...styles.sectionCommon, backgroundColor: "#131B21", textAlign: "center" }}>
        <TradingBackground variant={2} />
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="fade-in-up anim-delay-1">
            YOUR GATEWAY TO <span style={{ color: "#ff1f2c" }}>GLOBAL OPPORTUNITIES</span>
          </h2>
          <p style={styles.ctaDescription} className="fade-in-up anim-delay-2">
            8ConVerse bridges the gap between potential and achievement by empowering Filipinos to communicate confidently and fluently in English. With the right guidance, tools, and strategies, we ensure your success in passing language certifications and excelling in real-world applications.
          </p>
          <div style={styles.ctaButtons} className="fade-in-up anim-delay-3">
            <button
              style={styles.ctaButtonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 31, 44, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(14, 219, 97, 0.3)";
              }}
            >
              Start Learning Today
            </button>
            <button
              style={styles.ctaButtonRed}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0edb61";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(14, 219, 97, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff1f2c";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 31, 44, 0.3)";
              }}
            >
              Book Consultation
            </button>
          </div>
          <div className="fade-in-up anim-delay-4" style={{ marginTop: "2rem" }}>
            <div
              style={styles.ctaHighlight}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                e.currentTarget.style.borderColor = "#ff1f2c";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 31, 44, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
              }}
            >
              <strong>
                Let 8ConVerse be your partner in achieving fluency, confidence, and a brighter future!
              </strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConVerse;