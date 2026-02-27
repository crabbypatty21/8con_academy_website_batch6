import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import Header from "./Header";
import HeroSection from "./HeroSection.jsx";
import CoreBrandSection from "./CoreBrandSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ContactSection from "./ContactSection.jsx";
import InternshipSection from "./InternshipSection.jsx";
import Footer from "./Footer.jsx";
import "../App.css";
import smoothscroll from "smoothscroll-polyfill";
import CareerPathSection from "./CareerPathSection.jsx";
smoothscroll.polyfill();

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  //Modal
  const [showModal, setShowModal] = useState();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // Form state
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [contactNumber, setContactNumber] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
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
        setResumeFile(file); // Save the file to state
      }
    }
  };
  const testimonials = [
    {
      backgroundImage: "/assets/images/hajie.png",
    },
    {
      backgroundImage: "/assets/images/ken.png",
    },
    {
      backgroundImage: "/assets/images/clarence.png",
    },
    {
      backgroundImage: "/assets/images/jhames.png",
    },
    {
      backgroundImage: "/assets/images/cj.png",
    },
    {
      backgroundImage: "/assets/images/ryan.png",
    },
  ];

  const totalSlides = testimonials.length;
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
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // First, let's debug your handleApplyClick function:
  const handleApplyClick = (position) => {
    console.log("Position:", position); // Add this to see what position is being passed
    setSelectedPosition(position);
    setShowModal(true);

    // Add these to debug the state changes
    console.log("showModal set to:", true);
    console.log("selectedPosition set to:", position);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form when closing
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPhoneNumber("+63");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("resumeFile", resumeFile);
    formData.append("selectedPosition", selectedPosition);

    try {
      const res = await fetch("http://localhost:3001/apply", {
        method: "POST",
        body: formData,
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
  // End of Modal ni moran
  const handleContactSubmit = async (e) => {
    e.preventDefault(); // prevents default form submission behavior

    const payload = {
      name,
      email: contactEmail,
      contactNumber: contactNumber,
      message,
    };

    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Submitting contact form...", payload);
      ``;
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

  // Fade-in animation on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
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
          handleApplyClick={handleApplyClick}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleResumeChange={handleResumeChange}
          showModal={showModal}
          selectedPosition={selectedPosition}
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          email={email}
          address={address}
          phoneNumber={phoneNumber}
          resumeFile={resumeFile}
          setFirstName={setFirstName}
          setMiddleName={setMiddleName}
          setLastName={setLastName}
          setEmail={setEmail}
          setAddress={setAddress}
          setPhoneNumber={setPhoneNumber}
          setResumeFile={setResumeFile}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  );
};

export default Home;
