import React from "react";

import uptrendChart from "../assets/images/uptrend.png";

const CoreBrandSection = ({
  currentIndex = 0,
  testimonials = [],
  prevSlide,
  nextSlide,
  goToSlide,
}) => {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#ffffff" }}>
      
      {/* ============================== */}
      {/* PAGE 1: Course Details & Image */}
      {/* ============================== */}
      <section
        style={{
          minHeight: "100vh",
          padding: "80px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f0f",
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
                fontSize: "3rem",
                fontWeight: "bold",
                lineHeight: 1.1,
                marginBottom: "20px",
                margin: 0,
                paddingBottom: "20px"
              }}
            >
              Forex Derivative <br />
              Trading <span style={{ color: "#00e676" }}>Level II</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "30px",
                maxWidth: "90%",
                lineHeight: 1.5,
              }}
            >
              An <span style={{ color: "#00e676" }}>Advanced Course</span>{" "}
              designed to equip students with comprehensive knowledge and
              hands-on skills in{" "}
              <span style={{ color: "#ef4444", fontWeight: "bold" }}>
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
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#00e676",
                      color: "white",
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
                display: "block",      // Change to block
                margin: "0 0 0 210px",     // Center horizontally
                backgroundColor: "#068c3b",
                color: "white",
                padding: "12px 32px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
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
            <div>
              {/* Replace with your actual chart image path */}
              <img
                src={uptrendChart}
                alt="Forex Chart"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  borderRadius: "15px",
                  display: "block",
                  filter: "contrast(1.5) brightness(0.9)", 
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* PAGE 2: Media / Carousel Area  */}
      {/* ============================== */}
      <section
        style={{
          minHeight: "100vh",
          padding: "80px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2d2d2d",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "30px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Forex Derivative <br />
              Trading <span style={{ color: "#00e676" }}>Level II</span>
            </h2>
            <button
              style={{
                backgroundColor: "#4b4b4b",
                color: "white",
                padding: "12px 32px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ENROLL NOW!
            </button>
          </div>

          {/* The Large Gray Placeholder Box */}
          <div
            style={{
              backgroundColor: "#d1d5db",
              width: "100%",
              height: "500px",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "30px",
              position: "relative",
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
                    style={{ minWidth: "100%", height: "100%" }}
                  >
                    <img
                      src={testimonial.backgroundImage}
                      alt="Testimonial"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
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
                  Video / Image Content Goes Here
                </div>
              )}
            </div>
          </div>

          {/* Controls (Dots centered, Arrows right) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
            }}
          >
            <div style={{ gridColumn: 1 }}></div> {/* Spacer to keep dots centered */}
            
            <div style={{ gridColumn: 2, display: "flex", gap: "12px" }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: index === currentIndex ? "#00e676" : "#6b7280",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div
              style={{
                gridColumn: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#4b4b4b",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={prevSlide}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                style={{
                  backgroundColor: "#4b4b4b",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={nextSlide}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CoreBrandSection;