import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection.jsx";
import CoreBrandSection from "./CoreBrandSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ContactSection from "./ContactSection.jsx";
import InternshipSection from "./InternshipSection.jsx";
import Footer from "./Footer.jsx";
import "../App.css";
import "../ConponentCSS/Animations.css";
import smoothscroll from "smoothscroll-polyfill";
import CareerPathSection from "./CareerPathSection.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

smoothscroll.polyfill();

const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://8conacademy.com"
    : "http://localhost:3001";

/**
 * Returns the testimonials array, resolving theme-dependent image paths.
 * @param {boolean} isDark - Whether the dark theme is active.
 */
const getTestimonials = (isDark) => [
  {
    name: "Hajie, Trader",
    message:
      "In less than six weeks on 8Con Academy's Basic Competency course, I turned their FREE account into over $100 profit. The step-by-step lessons, strong focus on risk management, and a truly supportive community proved that even a beginner like me can trade confidently and aim for real financial freedom.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Hajie Trader.png"
      : "/assets/images/light update/Hajie light.png",
  },
  {
    name: "Ken, Trader",
    message:
      "At first, I struggled to understand forex terms - until I joined 8Con Academy. Through step-by-step guidance, I learned to read fundamentals and analyze technicals, helping me predict market movements with confidence. What sets 8Con apart is you can already trade profitably even before finishing the course. This experience made me realize my goal: to achieve financial freedom through trading.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Ken Trader.png"
      : "/assets/images/light update/ken light.png",
  },
  {
    name: "Clarence, Trader",
    message:
      "At 8Con, I've learned not just technical and fundamental analysis, but also the importance of trading psychology. I used to think forex was just 50/50 luck, until I realized it only feels that way without the right education. Learning this shifted my mindset and helped me pursue forex seriously as a potential source of income.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Clarence Trader.png"
      : "/assets/images/light update/Clarence light.png",
  },
  {
    name: "Jhames, Entreprenuer",
    message:
      "8Con Academy's curriculum, expert mentorship, and practical guidance have equipped me with the skills and confidence to navigate the markets effectively. I now trade with a clear strategy and a disciplined approach, thanks to their support.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Jhames Entrepreneur.png"
      : "/assets/images/light update/jhames light.png",
  },
  {
    name: "CJ, Trader",
    message:
      "8Con provides a supportive and professional environment where OJT students and interns gain valuable, hands-on experience, fostering growth, confidence, and real-world skills across any field of work.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/CJ Trader.png"
      : "/assets/images/light update/Cj light.png",
  },
  {
    name: "Ryan, Trader",
    message:
      "8Con Academy's practical approach gave me real-world trading skills and the mindset needed for long-term success. Their support and mentorship helped me grow into a confident, disciplined trader, ready to navigate today's fast-paced market.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Ryan Trader.png"
      : "/assets/images/light update/ryan trader (1).png",
  },
];

const Home = () => {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1); // start at 1 because of prepended clone
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const testimonials = getTestimonials(isDark);
  const totalSlides = testimonials.length;

  // Create extended slides: [last, ...all, first] for infinite loop
  const extendedTestimonials = testimonials.length > 0
    ? [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]]
    : [];

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: contactData.name,
      email: contactData.contactEmail,
      contactNumber: contactData.contactNumber,
      message: contactData.message,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong.");
    }
  };

  const handleTransitionEnd = useCallback(() => {
    // When we land on the clone of the first slide (end), jump to the real first
    if (currentIndex === extendedTestimonials.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    // When we land on the clone of the last slide (beginning), jump to the real last
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(extendedTestimonials.length - 2);
    }
  }, [currentIndex, extendedTestimonials.length]);

  // Re-enable transition after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // offset by 1 because of prepended clone
  };

  // Map currentIndex to actual slide index for dots
  const actualIndex = (() => {
    if (currentIndex === 0) return totalSlides - 1;
    if (currentIndex === extendedTestimonials.length - 1) return 0;
    return currentIndex - 1;
  })();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlideRef = useRef(nextSlide);
  useEffect(() => {
    nextSlideRef.current = nextSlide;
  });

  useEffect(() => {
    const interval = setInterval(() => nextSlideRef.current(), 8000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations — replay every time elements scroll in/out of view
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-up, .fade-in-up"
    );

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
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <HeroSection />

        <CoreBrandSection
          currentIndex={currentIndex}
          actualIndex={actualIndex}
          extendedTestimonials={extendedTestimonials}
          testimonials={testimonials}
          isTransitioning={isTransitioning}
          onTransitionEnd={handleTransitionEnd}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          goToSlide={goToSlide}
        />

        <AboutSection />

        <CareerPathSection />

        <InternshipSection
          handleApplyClick={handleApplyClick}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          selectedPosition={selectedPosition}
        />

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
