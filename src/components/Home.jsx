import React, { useState, useEffect } from "react";
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
      : "/assets/images/testimonial/light mode/Group 876.png",
  },
  {
    name: "Ken, Trader",
    message:
      "At first, I struggled to understand forex terms - until I joined 8Con Academy. Through step-by-step guidance, I learned to read fundamentals and analyze technicals, helping me predict market movements with confidence. What sets 8Con apart is you can already trade profitably even before finishing the course. This experience made me realize my goal: to achieve financial freedom through trading.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Ken Trader.png"
      : "/assets/images/testimonial/light mode/Group 880.png",
  },
  {
    name: "Clarence, Trader",
    message:
      "At 8Con, I've learned not just technical and fundamental analysis, but also the importance of trading psychology. I used to think forex was just 50/50 luck, until I realized it only feels that way without the right education. Learning this shifted my mindset and helped me pursue forex seriously as a potential source of income.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Clarence Trader.png"
      : "/assets/images/testimonial/light mode/Group 881.png",
  },
  {
    name: "Jhames, Entreprenuer",
    message:
      "8Con Academy's curriculum, expert mentorship, and practical guidance have equipped me with the skills and confidence to navigate the markets effectively. I now trade with a clear strategy and a disciplined approach, thanks to their support.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Jhames Entrepreneur.png"
      : "/assets/images/testimonial/light mode/Group 882.png",
  },
  {
    name: "CJ, Trader",
    message:
      "8Con provides a supportive and professional environment where OJT students and interns gain valuable, hands-on experience, fostering growth, confidence, and real-world skills across any field of work.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/CJ Trader.png"
      : "/assets/images/testimonial/light mode/Group 883.png",
  },
  {
    name: "Ryan, Trader",
    message:
      "8Con Academy's practical approach gave me real-world trading skills and the mindset needed for long-term success. Their support and mentorship helped me grow into a confident, disciplined trader, ready to navigate today's fast-paced market.",
    backgroundImage: isDark
      ? "/assets/images/testimonial/Ryan Trader.png"
      : "/assets/images/testimonial/light mode/Group 884.png",
  },
];

const INITIAL_FORM_DATA = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  address: "",
  phoneNumber: "+63",
  resumeFile: null,
};

const INITIAL_CONTACT_DATA = {
  name: "",
  contactEmail: "",
  contactNumber: "",
  message: "",
};

const Home = () => {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [contactData, setContactData] = useState(INITIAL_CONTACT_DATA);

  const testimonials = getTestimonials(isDark);
  const totalSlides = testimonials.length;

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isPDF = file.type === "application/pdf";
      const isTooLarge = file.size > 10 * 1024 * 1024; // 10MB

      if (!isPDF) {
        alert("Only PDF files are allowed.");
        e.target.value = null;
      } else if (isTooLarge) {
        alert("File must be less than 10MB.");
        e.target.value = null;
      } else {
        setFormData((prev) => ({ ...prev, resumeFile: file }));
      }
    }
  };

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("middleName", formData.middleName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("address", formData.address);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("resumeFile", formData.resumeFile);
    payload.append("selectedPosition", selectedPosition);

    try {
      const res = await fetch(`${API_BASE_URL}/apply`, {
        method: "POST",
        body: payload,
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        handleCloseModal();
      } else {
        alert(result.error || "Application failed");
      }
    } catch (error) {
      console.error(error);
      alert("Submission error");
    }
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
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
          testimonials={testimonials}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          goToSlide={goToSlide}
        />

        <AboutSection />

        <CareerPathSection />

        <InternshipSection
          formData={formData}
          setFormData={setFormData}
          handleApplyClick={handleApplyClick}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleResumeChange={handleResumeChange}
          showModal={showModal}
          selectedPosition={selectedPosition}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
