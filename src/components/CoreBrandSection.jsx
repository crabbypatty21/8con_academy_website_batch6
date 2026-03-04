import React from "react";

import uptrendChart from "../assets/images/uptrend.png";
import { useTheme } from "../context/ThemeContext.jsx";

const CoreBrandSection = ({
  currentIndex = 0,
  testimonials = [],
  prevSlide,
  nextSlide,
  goToSlide,
}) => {
  const { colors } = useTheme();
  return (
    <div style={{ fontFamily: '"Geist Sans", sans-serif', color: colors.textPrimary }}>
      
      {/* ============================== */}
      {/* PAGE 1: Course Details & Image */}
      {/* ============================== */}
      <section
        id="core-brand"
        style={{
          height: "100vh",
          padding: "100px 5% 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bgSecondary,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap", // Helps with responsiveness without media queries
          }}
        >
          {/* Left Content */}
          <div style={{ flex: "1 1 50%", minWidth: "300px" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 3.5vw, 4rem)",
                fontWeight: "bold",
                fontFamily: '"Unbounded", sans-serif',
                lineHeight: 1.1,
                marginBottom: "20px",
                margin: 0,
                paddingBottom: "20px"
              }}
            >
              <span style={{ color: "#F95545" }}>Forex</span> Derivative <br />
              Trading <span style={{ color: colors.accentGreen }}>Level II</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.2vw, 1.35rem)",
                marginBottom: "30px",
                maxWidth: "90%",
                lineHeight: 1.5,
              }}
            >
              An <span style={{ color: colors.accentGreen }}>Advanced Course</span>{" "}
              designed to equip students with comprehensive knowledge and
              hands-on skills in{" "}
              <span style={{ color: "#F95545", fontWeight: "bold" }}>
                Forex Trading
              </span>{" "}
              to become profitable traders.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0" }}>
              {[
                "In-depth curriculum covering market analysis, strategies, and risk management.",
                "Hands-on training with real-time market simulations.",
                "Access to proprietary Forex tools and trading platforms.",
                "Enrollment to Employment program ensuring job placement assistance.",
              ].map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                    fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)",
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: colors.accentGreen,
                      color: "#ffffff",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      marginRight: "12px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ✔
                  </span>
                  <p style={{ margin: 0 }}>{text}</p>
                </li>
              ))}
            </ul>
            <button
              style={{
                display: "block",
                margin: "0 auto",
                backgroundColor: "#F95545",
                color: "white",
                padding: "12px 32px",
                borderRadius: "35px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
                fontFamily: '"Geist Sans", sans-serif',
              }}
            >
              ENROLL NOW!
            </button>
          </div>

          {/* Right Image */}
          <div
            style={{
              flex: "1 1 40%",
              display: "flex",
              justifyContent: "flex-end",
              minWidth: "300px",
            }}
          >
            <div style={{
              position: "relative",
              display: "inline-block",
              borderRadius: "15px",
              overflow: "hidden",
              maxWidth: "350px",
            }}>
              <img
                src={uptrendChart}
                alt="Forex Chart"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  display: "block",
                  filter: "contrast(1.5) brightness(0.9)",
                  mixBlendMode: "screen",
                }}
              />
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                boxShadow: "inset 0 10px 50px rgba(0, 0, 0, 0.85), inset 0 -10px 50px rgba(0, 0, 0, 0.85), inset 10px 0 50px rgba(0, 0, 0, 0.7), inset -10px 0 50px rgba(0, 0, 0, 0.7)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* PAGE 2: Media / Carousel Area  */}
      {/* ============================== */}
      <section
        style={{
          height: "100vh",
          padding: "100px 5% 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bgTertiary,
          overflow: "hidden",
          fontFamily: '"Geist Sans", sans-serif',
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>

          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
              flexWrap: "wrap",
              gap: "20px",
              width: "calc(100% + 120px)",
              marginLeft: "-60px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 3rem)",
                fontWeight: "bold",
                fontFamily: '"Unbounded", sans-serif',
                margin: 0,
                color: colors.textPrimary,
                letterSpacing: "0.5px",
              }}
            >
              Testimonies
            </h2>
            <button
              style={{
                backgroundColor: "#F95545", 
                color: "white",
                padding: "10px 24px",
                borderRadius: "35px", 
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                fontFamily: '"Geist Sans", sans-serif',
              }}
            >
              ENROLL NOW!
            </button>
          </div>

          {/* The Carousel Card with Gradient Background */}
          <div
            style={{
              background: "radial-gradient(circle at 50% 50%, #2a2a2a 0%, #050505 80%, #000000 100%)", 
              width: "100%",
              height: "clamp(300px, 40vw, 450px)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "20px",
              position: "relative",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                transition: "transform 0.4s ease-in-out",
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
                {testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start", 
                      gap: "20px", 
                      boxSizing: "border-box",
                      position: "relative", // <-- ADD THIS LINE to trap the image inside its slide!
                    }}
                  >
                    
                      {/* LEFT: Text Content */}
                    <div 
                      style={{ 
                        flex: 1, 
                        padding: "0 20px 0 clamp(20px, 4vw, 60px)",
                        maxWidth: "70%", // <-- CHANGE: Increased from 50% to 70%
                        zIndex: 2,
                        position: "relative", // <-- ADD THIS to ensure zIndex works perfectly
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          fontSize: "clamp(0.9rem, 1.2vw, 1.25rem)",
                          lineHeight: "1.6",
                          marginBottom: "clamp(30px, 6vw, 80px)",
                          fontWeight: "600",
                        }}
                      >
                        "{testimonial.message}"
                      </p>

                      <h3
                        style={{
                          color: colors.textPrimary,
                          fontSize: "clamp(1.2rem, 2.5vw, 2.25rem)",
                          fontWeight: "bold",
                          fontFamily: '"Unbounded", sans-serif',
                          margin: "0 0 10px 0",
                        }}
                      >
                        {testimonial.name}
                      </h3>

                      <div style={{ display: "flex", gap: "6px" }}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="#FACC15" 
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: Profile Image */}
                    <div
                      style={{
                        width: "50%", 
                        height: "100%",
                        flexShrink: 0,
                        position: "absolute", // <-- CHANGE: Make it absolute
                        right: 0,             // <-- ADD THIS: Pin it to the right edge
                        display: "flex", 
                        alignItems: "flex-end", 
                        justifyContent: "flex-end", 
                        paddingRight: "clamp(20px, 4vw, 50px)",
                        zIndex: 1,
                      }}
                    >
                      <img
                        src={testimonial.backgroundImage}
                        alt={`${testimonial.name}'s Profile`}
                        style={{
                          width: "auto", 
                          height: "90%", 
                          maxWidth: "100%", 
                          objectFit: "contain", 
                          // CHANGE 2: Move from bottom left to bottom right
                          objectPosition: "bottom right", 
                          WebkitMaskImage: "linear-gradient(to top left, black 60%, transparent 100%)",
                          maskImage: "linear-gradient(to top left, black 60%, transparent 100%)",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    color: "#666",
                    fontSize: "1.5rem",
                  }}
                >
                  No Testimonials Available
                </div>
              )}
            </div>
            {/* Inset shadow overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              boxShadow: "inset 0 8px 40px rgba(0, 0, 0, 0.8), inset 0 -8px 40px rgba(0, 0, 0, 0.8), inset 8px 0 40px rgba(0, 0, 0, 0.6), inset -8px 0 20px rgba(0, 0, 0, 0.3)",
              pointerEvents: "none",
              zIndex: 3,
            }} />
          </div>

          {/* Controls: Left Arrow, Center Dots, Right Arrow */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "#404040",
                color: colors.textPrimary,
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={prevSlide}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  style={{
                    width: index === currentIndex ? "24px" : "10px", 
                    height: "10px",
                    borderRadius: "10px",
                    backgroundColor: index === currentIndex ? colors.accentGreen : "#4b5563",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              style={{
                backgroundColor: "#404040",
                color: colors.textPrimary,
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={nextSlide}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CoreBrandSection;