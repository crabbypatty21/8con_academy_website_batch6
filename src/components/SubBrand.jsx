import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../ConponentCSS/SubBrand.css";
// Import the TradingBackground component
import TradingBackground from "./TradingBackground.jsx";

const SubBrand = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subBrandsDropdownOpen, setSubBrandsDropdownOpen] = useState(false);
  const [mobileSubBrandsDropdownOpen, setMobileSubBrandsDropdownOpen] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // State and Ref for scroll detection
  const [carouselInView, setCarouselInView] = useState(false);
  const carouselRef = useRef(null);

  const subBrandsData = [
    { id: "construct", name: "8ConStruct", route: "/8construct", image: "/assets/logo/7.png" },
    { id: "conedge", name: "8ConEdge", route: "/8conedge", image: "/assets/logo/5.png" },
    { id: "concise", name: "8ConCise", route: "/8concise", image: "/assets/logo/8.png" },
    { id: "conquest", name: "8ConQuest", route: "/8conquest", image: "/assets/logo/3.png" },
    { id: "converse", name: "8ConVerse", route: "/8converse", image: "/assets/logo/4.png" },
    { id: "connect", name: "8ConNect", route: "/8connect", image: "/assets/logo/1.png" },
    { id: "conlift", name: "8ConLift", route: "/8conlift", image: "/assets/logo/2.png" },
    { id: "conpact", name: "8ConPact", route: "/8conpact", image: "/assets/logo/6.png" },
    { id: "conspace", name: "8ConSpace", route: "/8conspace", image: "/assets/logo/10.png" },
    { id: "consult", name: "8ConSult", route: "/8consult", image: "/assets/logo/9.png" },
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

  // Observer to detect when you scroll to the carousel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCarouselInView(true);
          observer.disconnect(); // Only play the animation once
        }
      },
      { threshold: 0.15 } 
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const brandIndex = subBrandsData.findIndex((b) => b.id === id);
      
      if (brandIndex !== -1) {
        setCurrentIndex(brandIndex);
        const carouselElement = document.getElementById("subbrands-carousel");
        if (carouselElement) {
          setTimeout(() => {
            carouselElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    }
  }, [location]);

  const handleDropdownNavigation = (brandId) => {
    const brandIndex = subBrandsData.findIndex((b) => b.id === brandId);
    if (brandIndex !== -1) {
      setCurrentIndex(brandIndex);
    }
    
    const carouselElement = document.getElementById("subbrands-carousel");
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: "smooth" });
    }
    
    setMobileMenuOpen(false);
    setSubBrandsDropdownOpen(false);
    setMobileSubBrandsDropdownOpen(false);
  };

  const handleLearnMore = (brandName) => {
    const brand = subBrandsData.find((b) => b.name === brandName);
    if (brand && brand.route) {
      navigate(brand.route);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      console.log(`Learn more about ${brandName} - Component not yet available`);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === subBrandsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? subBrandsData.length - 1 : prevIndex - 1
    );
  };

  const getSlidePosition = (index) => {
    const total = subBrandsData.length;
    if (index === currentIndex) return "active";
    if (index === (currentIndex - 1 + total) % total) return "prev";
    if (index === (currentIndex - 2 + total) % total) return "prev2";
    if (index === (currentIndex + 1) % total) return "next";
    if (index === (currentIndex + 2) % total) return "next2";
    return "hidden";
  };

  return (
    <div className="app-container">
      {/* Inject Forex Trading Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <TradingBackground variant={3} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Restored animations + Sabay-sabay fade in */}
        <style>
          {`
            /* 1. Track Fade In (Sabay-sabay) */
            @keyframes pureFadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            
            .track-hidden {
              opacity: 0 !important;
            }

            .track-animate {
              opacity: 0; 
              animation: pureFadeIn 1.2s ease-in-out forwards;
            }

            /* 2. Restored Active Card Animations */
            @keyframes pulseZoom {
              0% { transform: scale(1); }
              50% { transform: scale(1.08); }
              100% { transform: scale(1); }
            }
            
            .brand-text-fx {
              transform: translate(-50%, -50%);
              text-shadow: 0 0 10px #04EC00;
            }

            .brand-text-fx.active {
              animation: starBright 1.5s ease-out forwards;
            }

            .brand-text-fx.active::after {
              content: '';
              position: absolute;
              top: 0;
              left: -20%;
              width: 40px;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
              transform: skewX(-20deg);
              filter: blur(2px);
              mix-blend-mode: screen;
              animation: sweepLeftToRight 0.8s ease-in-out forwards;
              pointer-events: none;
              opacity: 0;
            }

            @keyframes sweepLeftToRight {
              0% { left: -20%; opacity: 0; }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% { left: 110%; opacity: 0; }
            }

            @keyframes starBright {
              0% { text-shadow: 0 0 10px #04EC00; transform: translate(-50%, -50%) scale(1); }
              40% { text-shadow: 0 0 10px #04EC00; transform: translate(-50%, -50%) scale(1); }
              70% { 
                text-shadow: 0 0 20px #fff, 0 0 40px #04EC00, 0 0 80px #77FF28, 0 0 120px #fff; 
                transform: translate(-50%, -50%) scale(1.12); 
              }
              100% { text-shadow: 0 0 15px #04EC00; transform: translate(-50%, -50%) scale(1); }
            }
          `}
        </style>

        {/* Header */}
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
                        handleDropdownNavigation(brand.id);
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
                          handleDropdownNavigation(brand.id);
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
                className="btn-enroll"
                onClick={() => {
                  setCurrentIndex(0);
                  document.getElementById("subbrands-carousel")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                EXPLORE NOW
              </button>
            </div>
          </section>

          {/* --- CAROUSEL SECTION --- */}
          <section id="subbrands-carousel" className="carousel-section" ref={carouselRef} style={{ paddingTop: '95px' }}>
            
            {/* Title Section */}
            <div 
              className={`carousel-title-container ${carouselInView ? 'track-animate' : 'track-hidden'}`}
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              <h2 style={{ 
                color: 'white', 
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                fontWeight: 900, 
                fontFamily: '"Unbounded", sans-serif',
                margin: '0', 
                lineHeight: '1.1', 
                letterSpacing: '1px'
              }}>
                Explore Sub-Brands
              </h2>
              <p style={{ 
                color: '#e0e0e0', 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                margin: '20px', 
                marginTop: '-5px' 
              }}>
                Confidence through competency.
              </p>
            </div>

            <div className="carousel-wrapper coverflow-wrapper" style={{ marginTop: '-20px' }}>
              
              <button className="carousel-nav-btn left" onClick={prevSlide}>
                <ChevronLeft size={70} strokeWidth={4} />
              </button>

              <div className={`coverflow-track ${carouselInView ? 'track-animate' : 'track-hidden'}`}>
                {subBrandsData.map((brand, index) => {
                  const position = getSlidePosition(index);

                  return (
                    <div 
                      key={brand.id}
                      className={`coverflow-slide ${position}`}
                      onClick={() => {
                        if (position === "active") {
                          handleLearnMore(brand.name);
                        } else if (position !== "hidden") {
                          setCurrentIndex(index);
                        }
                      }}
                      title={position === "active" ? `Explore ${brand.name}` : ""}
                    >
                      {/* Restored the brand-text-fx class so the light sweep and glow works */}
                      <h2 
                        className={`brand-name-display brand-text-fx ${position === "active" ? "active" : ""}`} 
                        style={{ 
                          color: 'white', 
                          textAlign: 'center', 
                          textTransform: 'uppercase',
                          fontFamily: '"Unbounded", sans-serif',
                          fontSize: '2rem',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 'max-content',
                          whiteSpace: 'nowrap',
                          margin: 0
                        }}
                      >
                          {brand.name.substring(0, 4).toUpperCase()}
                          <span style={{ color: '#77FF28' }}>
                            {brand.name.substring(4).toUpperCase()}
                          </span>
                      </h2>
                      
                      {position === "active" && (
                        <div style={{
                          position: 'absolute',
                          bottom: '20px', 
                          left: '0',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          pointerEvents: 'none'
                        }}>
                          {/* Restored the pulseZoom animation for the button */}
                          <button 
                            className="card-learn-btn"
                            style={{ 
                              pointerEvents: 'auto',
                              animation: 'pulseZoom 2s infinite ease-in-out' 
                            }} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLearnMore(brand.name);
                            }}
                          >
                            Learn More
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="carousel-nav-btn right" onClick={nextSlide}>
                <ChevronRight size={70} strokeWidth={4} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="carousel-pagination">
              {subBrandsData.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SubBrand;