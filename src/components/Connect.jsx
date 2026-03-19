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
  Users,
  Handshake,
  Building,
  Lightbulb,
  MessageSquare,
  BookOpen,
  UserCheck,
  Heart,
  Star,
  Zap,
  CheckCircle,
  Check,
} from "lucide-react";

const ConNect = () => {
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
      zIndex: 2, // Shielding the hero from the fixed animation background
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
      boxShadow: "0 4px 15px rgba(255, 31, 44, 0.3)",
      display: "flex",
      alignItems: "center",
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

    // A specific style for the features list inside Why Connect
    whyConnectFeature: {
      background: "linear-gradient(145deg, #1c2730, #131b21)",
      padding: "1.5rem",
      borderRadius: "12px",
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
      cursor: "default",
    },

    featureTitle: {
      fontSize: "1.1rem",
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
    },

    featureDescription: {
      fontSize: "0.95rem",
      color: "#A0ABB5",
      lineHeight: "1.5",
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
  const howItWorksData = [
    {
      icon: <UserCheck size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Membership Program",
      description: "Entrepreneurs and business owners can join as members to access exclusive benefits and opportunities.",
      items: [
        "Pitch business ideas to other members",
        "Access to networking events and workshops",
        "Shared platform for promoting services",
        "Exchange referrals for mutual growth",
      ],
    },
    {
      icon: <MessageSquare size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Pitching Sessions",
      description: "Regularly scheduled events where members present their business offerings and opportunities.",
      items: [
        "Present business ideas and challenges",
        "Open environment for idea sharing",
        "Receive feedback from community",
        "Form strategic partnerships",
      ],
    },
    {
      icon: <Heart size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Community Building",
      description: "A harmonious community where members support one another through collaboration and growth initiatives.",
      items: [
        "Mutual support through referrals",
        "Mentorship opportunities",
        "Joint ventures and partnerships",
        "Local business ecosystem development",
      ],
    },
    {
      icon: <BookOpen size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Business Guidance",
      description: "Expert guidance from a Business Coach with extensive knowledge in community building and branding.",
      items: [
        "Workshops on branding and marketing",
        "One-on-one coaching sessions",
        "Business scaling strategies",
        "Community alignment insights",
      ],
    },
  ];

  const benefitsData = [
    {
      icon: <Network size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Networking Opportunities",
      description: "Build meaningful connections with like-minded entrepreneurs, exchange ideas, and expand your professional circle.",
    },
    {
      icon: <TrendingUp size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Business Growth",
      description: "Gain exposure by pitching to fellow members, access new clients and markets through community referrals.",
    },
    {
      icon: <Lightbulb size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Knowledge Sharing",
      description: "Stay updated with industry trends, tools, and strategies shared within the community and learn from experiences.",
    },
    {
      icon: <Handshake size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Supportive Ecosystem",
      description: "A harmonious network that thrives on collaboration rather than competition, with shared resources and insights.",
    },
    {
      icon: <Star size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Branding & Visibility",
      description: "Enhance your business branding with expert guidance and gain visibility through events and marketing opportunities.",
    },
  ];

  const whyConnectData = [
    {
      title: "Local Focus",
      description: "Specifically designed for local entrepreneurs to build strong community ties."
    },
    {
      title: "Expert Guidance",
      description: "Access to experienced business coaches and industry professionals."
    },
    {
      title: "Collaborative Environment",
      description: "Non-competitive space focused on mutual growth and support."
    },
    {
      title: "Regular Events",
      description: "Consistent networking opportunities and business development sessions."
    },
    {
      title: "Resource Sharing",
      description: "Platform for sharing tools, knowledge, and business opportunities."
    },
    {
      title: "Proven Results",
      description: "Track record of helping members grow their businesses and networks."
    },
  ];

  const whoCanJoinData = [
    {
      icon: <Building size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Local Entrepreneurs",
      description: "Business owners looking to expand their network and grow their ventures.",
    },
    {
      icon: <Users size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Small Business Owners",
      description: "Established businesses seeking collaboration and referral opportunities.",
    },
    {
      icon: <Lightbulb size={50} color="#39CC2F" strokeWidth={1.5} />,
      title: "Startup Founders",
      description: "Early-stage entrepreneurs looking for mentorship and business connections.",
    },
    {
      icon: <Handshake size={50} color="#ff1f2c" strokeWidth={1.5} />,
      title: "Service Providers",
      description: "Professionals offering services who want to connect with potential clients.",
    },
  ];

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
          .connect-card {
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

          .connect-card:hover {
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
          
          .flex-centered-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
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
            <button className="nav-link" onClick={() => handleSmoothScroll("how-it-works")}>How It Works</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("benefits")}>Benefits</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("why-connect")}>Why 8ConNect</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("who-can-join")}>Who Can Join</button>
            <button className="nav-link" onClick={() => handleSmoothScroll("cta")}>Join Us</button>
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
            <button onClick={() => handleSmoothScroll("how-it-works")} className="mobile-nav-link">How It Works</button>
            <button onClick={() => handleSmoothScroll("benefits")} className="mobile-nav-link">Benefits</button>
            <button onClick={() => handleSmoothScroll("why-connect")} className="mobile-nav-link">Why 8ConNect</button>
            <button onClick={() => handleSmoothScroll("who-can-join")} className="mobile-nav-link">Who Can Join</button>
            <button onClick={() => handleSmoothScroll("cta")} className="mobile-nav-link">Join Us</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <img
            src="/assets/logo/1.png"
            alt="8ConNect"
            style={styles.heroTopImage}
            className="fade-in-up anim-delay-1"
          />
          <div style={styles.heroForegroundContent}>
            <p style={styles.heroSubtitle} className="fade-in-up anim-delay-2">
              Connecting Ideas, Opportunities, and Entrepreneurs
            </p>
            <p style={styles.heroDescription} className="fade-in-up anim-delay-3">
              8ConNect is more than just a network—it's a collaborative hub designed to empower local entrepreneurs and businesses. By fostering connections and sharing opportunities, 8ConNect bridges the gap between ideas and growth.
            </p>
            <div style={styles.heroButtons} className="fade-in-up anim-delay-4">
              <button
                style={styles.ctaButtonPrimary}
                onClick={() => handleSmoothScroll("how-it-works")}
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
                Join the Network
              </button>
              <button
                style={styles.ctaButtonSecondary}
                onClick={() => handleSmoothScroll("how-it-works")}
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

      {/* How It Works Section */}
      <section id="how-it-works" style={{ ...styles.sectionCommon, backgroundColor: "#131B21" }}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            HOW <span style={{ color: "#39CC2F" }}>8CONNECT</span> WORKS
          </h2>
          <div className="grid-2x2">
            {howItWorksData.map((data, index) => {
              const topColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";

              return (
                <div key={index} className={`slide-in-right anim-delay-${(index % 4) + 1}`}>
                  <div className="connect-card">
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

      {/* Benefits Section */}
      <section id="benefits" style={{ ...styles.sectionCommon, backgroundColor: "#19232A" }}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            BENEFITS OF <span style={{ color: "#ff1f2c" }}>JOINING 8CONNECT</span>
          </h2>
          <div className="flex-centered-grid">
            {benefitsData.map((data, index) => (
              <div key={index} style={{ flex: "1 1 350px", maxWidth: "400px", width: "100%" }} className={`scale-up anim-delay-${(index % 5) + 1}`}>
                <div className="connect-card" style={{ justifyContent: "center" }}>
                  <div>{data.icon}</div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                  <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-connect" style={{ ...styles.sectionCommon, backgroundColor: "#131B21" }}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            WHY CHOOSE <span style={{ color: "#39CC2F" }}>8CONNECT?</span>
          </h2>
          <div className="grid-3col">
            {whyConnectData.map((data, index) => {
              const iconColor = index % 2 === 0 ? "#39CC2F" : "#ff1f2c";
              return (
                <div
                  key={index}
                  style={styles.whyConnectFeature}
                  className={`fade-in-up anim-delay-${(index % 6) + 1}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = `0 15px 35px rgba(${index % 2 === 0 ? '57, 204, 47' : '255, 31, 44'}, 0.2)`;
                    e.currentTarget.style.borderColor = `rgba(${index % 2 === 0 ? '57, 204, 47' : '255, 31, 44'}, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.03)";
                  }}
                >
                  <CheckCircle size={28} color={iconColor} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h4 style={styles.featureTitle}>{data.title}</h4>
                    <p style={styles.featureDescription}>{data.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section id="who-can-join" style={{ ...styles.sectionCommon, backgroundColor: "#19232A" }}>
        <div style={styles.container2}>
          <h2 style={styles.sectionTitle} className="fade-in-up">
            WHO CAN JOIN <span style={{ color: "#ff1f2c" }}>8CONNECT?</span>
          </h2>
          <div className="grid-2x2">
            {whoCanJoinData.map((data, index) => (
              <div key={index} className={`scale-up anim-delay-${(index % 4) + 1}`}>
                <div className="connect-card" style={{ justifyContent: "center" }}>
                  <div>{data.icon}</div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontFamily: "'Unbounded', sans-serif", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>{data.title}</h3>
                  <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1rem)", color: "#A0ABB5", lineHeight: "1.6" }}>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" style={{ ...styles.sectionCommon, backgroundColor: "#131B21", textAlign: "center" }}>
        <div style={styles.container2}>
          <h2 style={styles.ctaTitle} className="fade-in-up anim-delay-1">
            READY TO CONNECT AND <span style={{ color: "#39CC2F" }}>GROW?</span>
          </h2>
          <p style={styles.ctaDescription} className="fade-in-up anim-delay-2">
            Join 8ConNect today and become part of a thriving community of entrepreneurs dedicated to mutual growth and success. Build meaningful connections, share resources, and expand your professional circle.
          </p>
          <div style={styles.ctaButtons} className="fade-in-up anim-delay-3">
            <button
              style={styles.ctaButtonPrimary}
              onClick={() => handleSmoothScroll("how-it-works")}
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
              <Zap size={20} style={{ marginRight: "8px" }} />
              Join 8ConNect Now
            </button>
            <button
              style={styles.ctaButtonRed}
              onClick={() => {
                window.location.href = "mailto:contact@8construct.com";
              }}
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
              <MessageSquare size={20} style={{ marginRight: "8px" }} />
              Contact Us
            </button>
          </div>
          <div className="fade-in-up anim-delay-4" style={{ marginTop: "2rem" }}>
            <div
              style={styles.ctaHighlight}
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
                Don't miss the opportunity to elevate your business. Your network is your net worth!
              </strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConNect;