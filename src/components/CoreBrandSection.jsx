import React, { useState } from "react";
import "../ConponentCSS/CoreBrand.css";
import "../ConponentCSS/Testimonials.css";

import zigzagArrow from "../assets/images/arrow_edited.png";
import { useTheme } from "../context/ThemeContext.jsx";
import EnrollModal from "./EnrollModal.jsx";
import TradingBackground from "./TradingBackground.jsx";

const COURSE_FEATURES = [
  "In-depth curriculum covering market analysis, strategies, and risk management.",
  "Hands-on training with real-time market simulations.",
  "Access to proprietary Forex tools and trading platforms.",
  "Enrollment to Employment program ensuring job placement assistance.",
];

const carouselNavButtonStyle = {
  backgroundColor: "#434343",
  color: "#ffffff",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const enrollButtonStyle = {
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
};

/**
 * @param {{ direction: "prev" | "next" }} props
 */
const CarouselArrowIcon = ({ direction }) => {
  const d = direction === "prev" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CoreBrandSection = ({
  currentIndex = 0,
  actualIndex = 0,
  extendedTestimonials = [],
  testimonials = [],
  isTransitioning = true,
  onTransitionEnd,
  prevSlide,
  nextSlide,
  goToSlide,
}) => {
  const { colors, isDark } = useTheme();
  const [showEnroll, setShowEnroll] = useState(false);

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
          backgroundColor: isDark ? "#19232A" : "#E9F1F9",
          overflow: "hidden",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <TradingBackground variant={1} />
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Content */}
          <div className="slide-in-left" style={{ flex: "1 1 50%", minWidth: "300px" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 3.5vw, 4rem)",
                fontWeight: "bold",
                fontFamily: '"Unbounded", sans-serif',
                lineHeight: 1.1,
                marginBottom: "20px",
                margin: 0,
                paddingBottom: "20px",
              }}
            >
              <span style={{ color: "#F95545" }}>Forex</span> Derivative <br />
              Trading <span style={{ color: "#0ED85F" }}>Level II</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1.15rem, 1.4vw, 1.5rem)",
                fontWeight: "bold",
                marginBottom: "30px",
                maxWidth: "90%",
                lineHeight: 1.5,
              }}
            >
              An <span style={{ color: "#0ED85F", fontWeight: "bold" }}>Advanced Course</span>{" "}
              designed to equip students with comprehensive knowledge and
              hands-on skills in{" "}
              <span style={{ color: "#F95545", fontWeight: "bold" }}>
                Forex Trading
              </span>{" "}
              to become profitable traders.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0" }}>
              {COURSE_FEATURES.map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                    fontSize: "clamp(1.05rem, 1.3vw, 1.35rem)",
                    lineHeight: 1.4,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#0ED85F",
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

            <button onClick={() => setShowEnroll(true)} style={enrollButtonStyle}>
              ENROLL NOW!
            </button>
          </div>

          {/* Right Image */}
          <div
            className="slide-in-right anim-delay-2"
            style={{
              flex: "1 1 40%",
              display: "flex",
              justifyContent: "flex-end",
              minWidth: "300px",
              position: "relative",
              zIndex: 0,
            }}
          >
            <img
              src={zigzagArrow}
              alt="Forex Chart"
              className="yellow-arrow-img"
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "block",
                filter:
                  "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3)) drop-shadow(0 0 20px rgba(255, 165, 0, 0.15))",
              }}
            />
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
          backgroundColor: isDark ? "#19232A" : "#EFF9FF",
          overflow: "hidden",
          fontFamily: '"Geist Sans", sans-serif',
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <TradingBackground variant={2} />
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            className="fade-in-up"
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
              TESTIMONIES
            </h2>
          </div>

          {/* Carousel Card */}
          <div
            className="scale-up anim-delay-2"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #2a2a2a 0%, #050505 80%, #000000 100%)",
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
              onTransitionEnd={onTransitionEnd}
              style={{
                display: "flex",
                height: "100%",
                transition: isTransitioning ? "transform 0.4s ease-in-out" : "none",
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {extendedTestimonials.length > 0 ? (
                extendedTestimonials.map((testimonial, index) => (
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
                      position: "relative",
                    }}
                  >
                    <img
                      src={testimonial.backgroundImage}
                      alt={`${testimonial.name}'s Profile`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "0% 60%",
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
                  No Testimonials Available
                </div>
              )}
            </div>
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
            <button style={carouselNavButtonStyle} onClick={prevSlide}>
              <CarouselArrowIcon direction="prev" />
            </button>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  style={{
                    width: index === actualIndex ? "24px" : "10px",
                    height: "10px",
                    borderRadius: "10px",
                    backgroundColor: index === actualIndex ? "#0ED85F" : "#4b5563",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button style={carouselNavButtonStyle} onClick={nextSlide}>
              <CarouselArrowIcon direction="next" />
            </button>
          </div>
        </div>
      </section>

      <EnrollModal isOpen={showEnroll} onClose={() => setShowEnroll(false)} />
    </div>
  );
};

export default CoreBrandSection;
