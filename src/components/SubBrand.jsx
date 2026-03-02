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
import "../ConponentCSS/SubBrand.css";

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
      route: "/8construct",
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
      route: "/8conedge",
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
      route: "/8concise",
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
      route: "/8conquest",
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
      route: "/8converse",
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
      route: "/8connect",
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
      route: "/8conlift",
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
      route: "/8conpact",
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
      route: "/8conspace",
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
      route: "/8consult",
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
              Enroll now!
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

                  <span
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(brand.name)}
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </span>
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
    </div>
  );
};

export default SubBrand;
