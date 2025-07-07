import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  ArrowRight,
  Home,
  BookOpen,
  Users,
} from "lucide-react";

const SubBrand = () => {
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
      route: "/construct",
      desc: "Research and statistical consultancy to empower decision-making.",
      detailedDesc:
        "Comprehensive research and statistical analysis services for businesses, academic institutions, and organizations. We provide data-driven insights to help you make informed decisions and achieve your strategic objectives.",
      icon: <Brain size={60} />,
      image: "/assets/logo/7.png",
      services: [
        "Market Research",
        "Statistical Analysis",
        "Data Visualization",
        "Business Intelligence",
      ],
    },
    {
      id: "conedge",
      name: "8ConEdge",
      route: "/conedge",
      desc: "Proprietary Forex tools to enhance trading efficiency.",
      detailedDesc:
        "Cutting-edge trading tools and analytics designed specifically for Forex traders. Gain a competitive advantage with our proprietary indicators, automated systems, and market analysis tools.",
      icon: <TrendingUp size={60} />,
      image: "/assets/logo/5.png",
      services: [
        "Trading Indicators",
        "Market Analysis",
        "Automated Systems",
        "Risk Management Tools",
      ],
    },
    {
      id: "concise",
      name: "8ConCise",
      route: "/concise",
      desc: "Entrepreneur networking hub to grow business relationships.",
      detailedDesc:
        "A dynamic platform connecting entrepreneurs, investors, and business leaders. Build meaningful relationships, discover collaboration opportunities, and accelerate your business growth.",
      icon: <Network size={60} />,
      image: "/assets/logo/8.png",
      services: [
        "Networking Events",
        "Business Matching",
        "Investor Relations",
        "Partnership Development",
      ],
    },
    {
      id: "conquest",
      name: "8ConQuest",
      route: "/conquest",
      desc: "Thesis and career coaching for students and professionals.",
      detailedDesc:
        "Professional guidance for academic and career development. From thesis writing support to career transition coaching, we help individuals achieve their educational and professional goals.",
      icon: <Target size={60} />,
      image: "/assets/logo/3.png",
      services: [
        "Thesis Writing Support",
        "Career Coaching",
        "Interview Preparation",
        "Professional Development",
      ],
    },
    {
      id: "converse",
      name: "8ConVerse",
      route: "/converse",
      desc: "Language certification courses to broaden opportunities.",
      detailedDesc:
        "Comprehensive language learning programs designed to enhance communication skills and open global opportunities. Master new languages with our expert instructors and proven methodologies.",
      icon: <Globe size={60} />,
      image: "/assets/logo/4.png",
      services: [
        "English Proficiency",
        "Business Communication",
        "IELTS/TOEFL Prep",
        "Multilingual Training",
      ],
    },
    {
      id: "connect",
      name: "8ConNect",
      route: "/connect",
      desc: "Entrepreneur networking hub to grow business relationships.",
      detailedDesc:
        "A dynamic platform connecting entrepreneurs, investors, and business leaders. Build meaningful relationships, discover collaboration opportunities, and accelerate your business growth.",
      icon: <Network size={60} />,
      image: "/assets/logo/1.png",
      services: [
        "Networking Events",
        "Business Matching",
        "Investor Relations",
        "Partnership Development",
      ],
    },
    {
      id: "conlift",
      name: "8ConLift",
      route: "/conlift",
      desc: "Scholarship and training programs for deserving students.",
      detailedDesc:
        "Educational empowerment through scholarships and specialized training programs. We believe in lifting communities by providing access to quality education and skill development opportunities.",
      icon: <Award size={60} />,
      image: "/assets/logo/2.png",
      services: [
        "Full Scholarships",
        "Skills Training",
        "Mentorship Programs",
        "Community Outreach",
      ],
    },
    {
      id: "conpact",
      name: "8ConPact",
      route: "/conpact",
      desc: "Scholarship and training programs for deserving students.",
      detailedDesc:
        "Educational empowerment through scholarships and specialized training programs. We believe in lifting communities by providing access to quality education and skill development opportunities.",
      icon: <Award size={60} />,
      image: "/assets/logo/6.png",
      services: [
        "Full Scholarships",
        "Skills Training",
        "Mentorship Programs",
        "Community Outreach",
      ],
    },
    {
      id: "conspace",
      name: "8ConSpace",
      route: "/conspace",
      desc: "Co-working space and virtual office solutions for professionals and students.",
      detailedDesc:
        "A dynamic, productivity-driven space for freelancers, entrepreneurs, online professionals, and students. Whether you're building a startup or finishing your research, 8ConSpace gives you a professional and collaborative environment to grow and execute.",
      icon: <Users size={60} />,
      image: "/assets/logo/10.png",
      services: [
        "Flexible Desk Rentals",
        "Virtual Office Solutions",
        "Startup Environment",
        "Student Pods",
      ],
    },
    {
      id: "consult",
      name: "8ConSult",
      route: "/consult",
      desc: "Business development and startup advisory with Sir Nigel Santos.",
      detailedDesc:
        "A consultation arm powered by real-world experience in entrepreneurship. Spearheaded by Sir Nigel Santos, this service provides personalized startup coaching and business model refinement to help entrepreneurs thrive.",
      icon: <BookOpen size={60} />,
      image: "/assets/logo/9.png",
      services: [
        "Startup Coaching",
        "Business Model Analysis",
        "Sales Strategy & Growth Blueprint",
        "Investor Deck & Pitch Support",
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setSubBrandsDropdownOpen(false);
  };

  const handleLearnMore = (brandName) => {
    const brand = subBrandsData.find((b) => b.name === brandName);
    if (brand && brand.route) {
      navigate(brand.route);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      console.log(
        `Learn more about ${brandName} - Component not yet available`
      );
    }
  };

  const handleDropdownNavigation = (brand, action = "scroll") => {
    if (action === "navigate" && brand.route) {
      navigate(brand.route);
    } else {
      scrollToSection(brand.id);
    }
    setMobileMenuOpen(false);
    setSubBrandsDropdownOpen(false);
    setMobileSubBrandsDropdownOpen(false);
  };

  // New scroll-based animation effect
  useEffect(() => {
    const animatedImages = document.querySelectorAll(".animated-image");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    animatedImages.forEach((img) => observer.observe(img));

    return () => {
      animatedImages.forEach((img) => observer.unobserve(img));
    };
  }, []);

  useEffect(() => {
    const fadeSections = document.querySelectorAll(".fade-section");

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    fadeSections.forEach((section) => fadeObserver.observe(section));

    return () => {
      fadeSections.forEach((section) => fadeObserver.unobserve(section));
    };
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
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
            <a
              href="#top"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Home
            </a>

            <div className="dropdown">
              <span className="nav-link">Sub-brands ▾</span>
              <div className="dropdown-content">
                {subBrandsData.map((brand, index) => (
                  <a
                    key={index}
                    href={`#${brand.id}`}
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(brand.id);
                    }}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
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
            <a
              href="/"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
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
                      href={`#${brand.id}`}
                      className="mobile-nav-sublink"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setMobileSubBrandsDropdownOpen(false);
                        scrollToSection(brand.id);
                      }}
                    >
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className="parallax-bull">
          <div className="parallax-overlay"></div>
          <div className="parallax-content">
            <h1 className="parallax-title">Discover Our Sub-Brands</h1>
            <p className="parallax-subtitle">
              Comprehensive solutions across multiple domains to empower your
              growth and success
            </p>
            <button
              className="btn-primary"
              onClick={() => scrollToSection("construct")}
            >
              Explore Sub-Brands
            </button>
          </div>
        </section>

        {/* Sub-brands Sections */}
        {subBrandsData.map((brand, index) => (
          <section
            key={index}
            id={brand.id}
            className={`brand-section parallax-container ${
              index % 2 === 1 ? "alternate-bg" : ""
            }`}
          >
            <div className="brand-container">
              <div
                className={`brand-content-wrapper ${
                  index % 2 === 1 ? "reverse" : ""
                }`}
              >
                <div
                  className="brand-content fade-section"
                  data-speed="0.2"
                  data-id={brand.id}
                >
                  <div className="brand-description-highlight">
                    <p className="brand-description-bold">
                      {brand.detailedDesc}
                    </p>
                  </div>

                  <div className="services-grid">
                    {brand.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="service-item">
                        <span className="service-bullet">✓</span>
                        {service}
                      </div>
                    ))}
                  </div>

                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(brand.name)}
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="brand-visual">
                  <div className="brand-visual-content animated-image">
                    <div className="image-container">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="brand-image"
                        onError={(e) => {
                          e.target.src = "/assets/logo/7.png";
                        }}
                      />
                      <div className="image-overlay"></div>
                      <div className="floating-dots">
                        <div className="dot dot-1"></div>
                        <div className="dot dot-2"></div>
                        <div className="dot dot-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: #e4eed3;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          background: transparent;
          padding: 10px 5%;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          transition: background-color 0.8s ease, box-shadow 0.8s ease;
        }

        .header.scrolled {
          background-color: rgb(0, 0, 0);
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

        /* New animated image styles */
        .animated-image {
          opacity: 0;
          transform: translateY(60px) scale(0.8);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animated-image.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
        }

        .brand-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          transition: transform 0.6s ease;
        }

        .brand-visual-content:hover .brand-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(6, 140, 59, 0.15) 0%,
            rgba(14, 219, 97, 0.1) 50%,
            transparent 100%
          );
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .brand-visual-content:hover .image-overlay {
          opacity: 1;
        }

        .floating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #0edb61;
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 10px rgba(14, 219, 97, 0.5);
        }

        .animated-image.visible .dot {
          animation: floatDot 3s ease-in-out infinite;
        }

        .dot-1 {
          top: 20%;
          left: 85%;
          animation-delay: 0s;
        }

        .dot-2 {
          top: 60%;
          left: 90%;
          animation-delay: 1s;
        }

        .dot-3 {
          top: 80%;
          left: 15%;
          animation-delay: 2s;
        }

        @keyframes floatDot {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px);
          }
        }

        .fade-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 14px;
          font-weight: 600;
          position: relative;
        }

        .nav-link {
          text-decoration: none;
          color: rgb(255, 255, 255);
          padding: 0px 15px;
          border-radius: 6px;
          transition: background-color 0.3s ease, color 0.3s ease,
            transform 0.3s ease;
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 10%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff9d9f, #ff1f2c);
          transition: width 0.3s ease;
          transform: translateX(0%);
        }

        .nav-link:hover {
          color: #ff1f2c;
          transform: translateY(-5px);
        }

        .nav-link:hover::before {
          width: 80%;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          padding: 5px 0;
          min-width: 160px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .dropdown-content a,
        .dropdown-link {
          display: block;
          padding: 10px 15px;
          color: #121411;
          text-decoration: none;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .dropdown-content a:hover,
        .dropdown-link:hover {
          background-color: white;
          color: #ff1f2c;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .mobile-nav {
          background-color: white;
          border-top: 1px solid #e5e7eb;
          margin-top: 16px;
          padding: 0;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 8px;
          text-decoration: none;
          color: #121411;
          border-bottom: 1px solid #f3f4f6;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-size: 1rem;
          cursor: pointer;
        }

        .mobile-nav-link:hover {
          background-color: #f9fafb;
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: white;
        }

        .mobile-dropdown {
          position: relative;
        }

        .mobile-dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .mobile-dropdown-content {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          margin: 0.5rem 1rem;
        }

        .mobile-nav-sublink {
          display: block;
          padding: 0.75rem 1rem;
          color: rgba(0, 0, 0, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-sublink:last-child {
          border-bottom: none;
        }

        .mobile-nav-sublink:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .parallax-bull {
          position: relative;
          height: 100vh;
          background-image: url("/assets/images/bull1.png");
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          z-index: 1;
          overflow: hidden;
        }

        .parallax-overlay {
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .parallax-content {
          position: relative;
          z-index: 3;
          max-width: 800px;
          padding: 2rem;
        }

        .parallax-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
        }

        .parallax-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
        }

        .parallax-container {
          position: relative;
          overflow: hidden;
        }

        .parallax-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
          z-index: -1;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #068c3b 0%, #0edb61 100%);
          color: white;
          border: none;
          border-radius: 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(6, 140, 59, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(6, 140, 59, 0.4);
        }

        .brand-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 20px;
          position: relative;
        }

        .brand-section:nth-child(odd) {
          background: linear-gradient(
            135deg,
            #e4eed3 0%,
            rgba(228, 238, 211, 0.7) 100%
          );
        }

        .brand-section.alternate-bg {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.9) 50%,
            #e4eed3 100%
          );
        }

        .brand-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .brand-content-wrapper {
          display: flex;
          align-items: center;
          gap: 80px;
        }

        .brand-content-wrapper.reverse {
          flex-direction: row-reverse;
        }

        .brand-content {
          flex: 1;
          max-width: 600px;
        }

        .brand-description-highlight {
          background: linear-gradient(
            135deg,
            rgba(6, 140, 59, 0.08) 0%,
            rgba(14, 219, 97, 0.05) 100%
          );
          border-radius: 20px;
          padding: 2rem;
          border-left: 6px solid #068c3b;
          box-shadow: 0 8px 25px rgba(6, 140, 59, 0.1);
          position: relative;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }

        .brand-description-highlight::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(14, 219, 97, 0.03),
            transparent
          );
          animation: shimmerDesc 4s ease-in-out infinite;
        }

        @keyframes shimmerDesc {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
        }

        .brand-name-accent {
          display: inline-block;
          font-size: 1.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #068c3b 0%, #0edb61 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          z-index: 2;
        }

        .brand-description-bold {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2d3748;
          line-height: 1.6;
          margin: 1rem 0 0 0;
          position: relative;
          z-index: 2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: rgba(6, 140, 59, 0.05);
          border-radius: 0.75rem;
          color: #068c3b;
          font-weight: 500;
          border-left: 4px solid #068c3b;
          transition: all 0.3s ease;
        }

        .service-item:hover {
          background: rgba(6, 140, 59, 0.1);
          transform: translateX(5px);
        }

        .service-bullet {
          color: #0edb61;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .learn-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, #990f17 0%, #ff1f2c 100%);
          color: white;
          border: none;
          border-radius: 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 31, 44, 0.3);
          font-size: 1rem;
        }

        .learn-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 31, 44, 0.4);
        }

        .brand-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-visual-content {
          width: 320px;
          height: 320px;
          background: linear-gradient(
            135deg,
            rgba(6, 140, 59, 0.08) 0%,
            rgba(14, 219, 97, 0.12) 100%
          );
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(6, 140, 59, 0.15);
          border: 2px solid rgba(6, 140, 59, 0.1);
        }

        .brand-visual-content::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #068c3b,
            #0edb61,
            #068c3b,
            #0edb61
          );
          background-size: 400% 400%;
          border-radius: 20px;
          z-index: -1;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mobile-nav {
            display: block;
          }

          .brand-visual-content {
            width: 280px;
            height: 280px;
          }
        }

        @media (max-width: 768px) {
          .parallax-title {
            font-size: 2.5rem;
          }

          .parallax-subtitle {
            font-size: 1.1rem;
          }

          .brand-content-wrapper,
          .brand-content-wrapper.reverse {
            flex-direction: column;
            gap: 40px;
            text-align: center;
          }

          .brand-name-accent {
            font-size: 1.5rem;
          }

          .brand-description-bold {
            font-size: 1.2rem;
          }

          .brand-description-highlight {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .brand-visual-content {
            width: 250px;
            height: 250px;
          }

          .brand-section {
            padding: 60px 20px;
          }

          .dot {
            width: 6px;
            height: 6px;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 3%;
          }

          .parallax-bull {
            padding: 100px 15px 60px;
          }

          .parallax-title {
            font-size: 2rem;
          }

          .brand-section {
            padding: 50px 15px;
          }

          .brand-name-accent {
            font-size: 1.3rem;
            letter-spacing: 1px;
          }

          .brand-description-bold {
            font-size: 1.1rem;
          }

          .brand-description-highlight {
            padding: 1.25rem;
            border-left-width: 4px;
          }

          .brand-content-wrapper {
            gap: 30px;
          }

          .brand-visual-content {
            width: 200px;
            height: 200px;
          }

          .services-grid {
            gap: 0.75rem;
          }

          .service-item {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .dot {
            width: 4px;
            height: 4px;
          }

          .dot-1 {
            top: 15%;
            left: 80%;
          }

          .dot-2 {
            top: 70%;
            left: 85%;
          }

          .dot-3 {
            top: 85%;
            left: 20%;
          }
        }

        /* Large desktop screens */
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex;
          }

          .mobile-menu-toggle {
            display: none;
          }
        }

        /* Extra large screens */
        @media (min-width: 1440px) {
          .brand-visual-content {
            width: 360px;
            height: 360px;
          }

          .brand-container {
            max-width: 1400px;
          }
        }
      `}</style>
    </div>
  );
};

export default SubBrand;
