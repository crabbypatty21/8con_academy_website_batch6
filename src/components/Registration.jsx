import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollUp from "./ScrollUp";
import Footer from "./Footer";
import { Menu, X, Goal, Eye, Atom, HeartHandshake } from "lucide-react";
import "../App.css";
import ScrollLink from "./ScrollLink";


const Registration = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Registration form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "+63",
    location: "",
    businessProfession: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Validation functions
  const validateFullName = (name) => {
    const nameRegex = /^[a-zA-Z\s\-\.]+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact) => {
    const contactRegex = /^\+63[0-9]{10}$/;
    return contactRegex.test(contact);
  };

  const validateLocation = (location) => {
    const locationRegex = /^[a-zA-Z\s\-\,\.]+$/;
    return locationRegex.test(location) && location.trim().length >= 2;
  };

  const validateBusinessProfession = (profession) => {
    const professionRegex = /^[a-zA-Z\s\-\,\.\/]+$/;
    return professionRegex.test(profession) && profession.trim().length >= 2;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Special handling for contact number
    if (name === "contact") {
      if (!value.startsWith("+63")) {
        processedValue = "+63" + value.replace(/^\+63/, "").replace(/\D/g, "");
      } else {
        processedValue = "+63" + value.substring(3).replace(/\D/g, "");
      }
      // Limit to +63 + 10 digits
      if (processedValue.length > 13) {
        processedValue = processedValue.substring(0, 13);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    
    if (!validateFullName(formData.fullName)) {
      newErrors.fullName = "Full name must contain only letters, spaces, hyphens, and periods";
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!validateContact(formData.contact)) {
      newErrors.contact = "Contact number must be in format +63XXXXXXXXXX";
    }
    
    if (!validateLocation(formData.location)) {
      newErrors.location = "Location must contain only letters, spaces, hyphens, commas, and periods";
    }
    
    if (!validateBusinessProfession(formData.businessProfession)) {
      newErrors.businessProfession = "Business/Profession must contain only letters, spaces, hyphens, commas, periods, and forward slashes";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", formData);
      
      const response = await fetch("http://localhost:3001/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          contact: formData.contact,
          location: formData.location,
          businessProfession: formData.businessProfession,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Registration successful! Your seat has been reserved.");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          contact: "+63",
          location: "",
          businessProfession: "",
        });
      } else {
        alert(`Error: ${data.error || 'Registration failed'}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (error.message.includes("Failed to fetch")) {
        alert("Cannot connect to server. Please check if the server is running on http://localhost:3001");
      } else if (error.message.includes("non-JSON")) {
        alert("Server error. Please try again later.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ScrollLink
              to="/#home"
              className="nav-link"
              style={{ display: "flex", alignItems: "center" }}
              onClick={(e) => e.currentTarget.blur()}
            >
              Home
            </ScrollLink>
          </nav>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <ScrollLink
              to="/#home"
              className="mobile-nav-link"
              style={{ display: "flex", alignItems: "center" }}
              onClick={(e) => e.currentTarget.blur()}
            >
              Home
            </ScrollLink>
          </nav>
        )}
      </header>

      {/* Registration Form Section */}
      <section id="registration_form" className="registration-section">
        <div className="registration-container">
          <div className="registration-content">
            {/* Left Column - Form */}
            <div className="form-column">
              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact" className="form-label">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`form-input ${errors.contact ? 'error' : ''}`}
                    placeholder="+63XXXXXXXXXX"
                    required
                  />
                  {errors.contact && <span className="error-message">{errors.contact}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`form-input ${errors.location ? 'error' : ''}`}
                    placeholder="Enter your location"
                    required
                  />
                  {errors.location && <span className="error-message">{errors.location}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="businessProfession" className="form-label">
                    Business / Profession *
                  </label>
                  <input
                    type="text"
                    id="businessProfession"
                    name="businessProfession"
                    value={formData.businessProfession}
                    onChange={handleInputChange}
                    className={`form-input ${errors.businessProfession ? 'error' : ''}`}
                    placeholder="Enter your business or profession"
                    required
                  />
                  {errors.businessProfession && <span className="error-message">{errors.businessProfession}</span>}
                </div>

                <button 
                  type="submit" 
                  className="reserve-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Reserving..." : "Reserve My Seat"}
                </button>
              </form>
            </div>

            {/* Right Column - Images */}
            <div className="image-column">
              <div className="logo-section">
                <div className="logo-container">
                  <img 
                    src="/assets/logo/8con Academy Logo White.png" 
                    alt="8Con Academy Logo" 
                    className="logo-image"
                  />
                </div>
              </div>
              <div className="workshop-image-container">
                <img 
                  src="/assets/images/workshop_pic.jpg" 
                  alt="8Con Academy Workshop" 
                  className="workshop-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          background: black;
          padding: 10px 0;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          transition: background-color 0.8s ease, box-shadow 0.8s ease;
        }

        .header-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
        }

        /* Add this to prevent content from hiding behind fixed header */
        body {
          padding-top: 60px;
        }

        .main-content {
          margin-top: 60px;
        }

        .header-font {
          font-family: "Montserrat", sans-serif;
        }

        /* Desktop Navigation */
        .desktop-nav {
          width: 1200px;
          height: 40px;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          position: relative;
          justify-content: flex-end;
        }

        .nav-link {
          text-decoration: none;
          color: rgb(255, 255, 255);
          padding: 0px 15px;
          border-radius: 6px;
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
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

        /* Mobile Navigation */
        .mobile-nav {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          background-color: white;
          z-index: 999;
          border-top: 1px solid #e5e7eb;
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

        /* Registration Form Styles */
        .registration-section {
          padding: 120px 0 80px 0;
          background: #a3293a;;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .registration-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }

        .registration-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* Form Column */
        .form-column {
          background: rgba(255, 255, 255, 0.95);
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 40px;
          text-align: center;
          font-family: "Montserrat", sans-serif;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-weight: 600;
          color: #333;
          font-size: 16px;
          font-family: "Montserrat", sans-serif;
          margin-bottom: 5px;
        }

        .form-input {
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          font-family: "Montserrat", sans-serif;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .form-input:focus {
          outline: none;
          border-color: #DAE539;
          box-shadow: 0 0 0 3px rgba(218, 229, 57, 0.1);
          background: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }

        .form-input.error {
          border-color: #dc3545;
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
        }

        .error-message {
          color: #dc3545;
          font-size: 14px;
          font-weight: 500;
          margin-top: 5px;
          font-family: "Montserrat", sans-serif;
        }

        .reserve-btn {
          background: linear-gradient(135deg, #F98D90, #FF6618);
          color: white;
          padding: 16px 32px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
          font-family: "Montserrat", sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 6px 16px rgba(249, 141, 144, 0.3);
        }

        .reserve-btn:hover {
          background: linear-gradient(135deg, #FF6618, #F98D90);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249, 141, 144, 0.4);
        }

        .reserve-btn:active {
          transform: translateY(-1px);
        }

        .reserve-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Image Column */
        .image-column {
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }

        .logo-section {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .logo-container {
          position: relative;
          width: 300px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .logo-container:hover {
          transform: translateY(-5px);
        }

        .logo-container::before {
          display: none;
        }

        .logo-image {
          width: 80%;
          height: auto;
          max-width: 250px;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .workshop-image-container {
          width: 400px;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          border: 3px solid #DAE539;
        }

        .workshop-image-container:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .workshop-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .workshop-image-container:hover .workshop-image {
          transform: scale(1.05);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .registration-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .form-column {
            padding: 40px 30px;
          }
          
          .form-title {
            font-size: 2rem;
            margin-bottom: 30px;
          }
          
          .registration-form {
            gap: 12px;
          }
          
          .logo-container {
            width: 250px;
            height: 160px;
          }
          
          .workshop-image-container {
            width: 300px;
            height: 300px;
          }
          
          .registration-section {
            padding: 100px 0 60px 0;
          }
        }

        @media (max-width: 480px) {
          .registration-section {
            padding: 80px 0 40px 0;
          }
          
          .registration-container {
            padding: 0 15px;
          }
          
          .form-column {
            padding: 30px 20px;
          }
          
          .form-title {
            font-size: 1.75rem;
          }
          
          .form-input {
            padding: 12px 16px;
            font-size: 14px;
          }
          
          .logo-container {
            width: 200px;
            height: 130px;
          }
          
          .workshop-image-container {
            width: 250px;
            height: 250px;
          }
        }

        /* Mobile header adjustments */
        @media (max-width: 1024px) {
          .header {
            transition: all 0.3s ease;
          }
          
          .header.scrolled {
            background: #000000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }
          
          .mobile-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #000000;
            z-index: 998;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            animation: slideDown 0.3s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .mobile-nav-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 24px;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.9);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
            font-size: 16px;
            font-weight: 500;
            font-family: "Montserrat", sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .mobile-nav-link:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #0edb61;
            padding-left: 32px;
            border-left: 3px solid #0edb61;
          }
        }
      `}</style>
      
      <ScrollUp />
      <Footer />
    </div>
  );
};

export default Registration;