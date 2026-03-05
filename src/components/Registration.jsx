import { Menu, RefreshCw, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import "../App.css";
import Footer from "./Footer";
import ScrollLink from "./ScrollLink";

const Registration = () => {
  const { isDark, toggleTheme } = useTheme();
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
  
  // Captcha state
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Define API base URL based on environment
  const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : 'https://8conacademy.com'; 

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput("");
    setCaptchaError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      { threshold: 0.1 }
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

    if (name === "contact") {
      if (!value.startsWith("+63")) {
        processedValue = "+63" + value.replace(/^\+63/, "").replace(/\D/g, "");
      } else {
        processedValue = "+63" + value.substring(3).replace(/\D/g, "");
      }
      if (processedValue.length > 13) {
        processedValue = processedValue.substring(0, 13);
      }
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
    if (captchaError) {
      setCaptchaError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate captcha first
    if (captchaInput !== captcha) {
      setCaptchaError("Captcha verification failed. Please try again.");
      return;
    }
    
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
      console.log("Submitting registration data:", formData);
      
      // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwz8131H9pOp56Iu8OQpV4pf9df1DdNvHX-Gn1MmmF_fcZqIeDrOxjRrtZDPf0Ai5KE/exec";
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // Notice we are NOT sending 'Content-Type': 'application/json' in the headers here.
        // Google Apps Script CORS handles plain text bodies better to avoid preflight (OPTIONS) errors.
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.status === "success") {
        alert("Registration successful! Your seat has been reserved and details sent to 8Con Academy.");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          contact: "+63",
          location: "",
          businessProfession: "",
        });
        
        // Generate new captcha
        generateCaptcha();
      } else {
        throw new Error(data.message || "Failed to save to Google Sheets");
      }
      
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
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

      <section id="registration_form" className="registration-section">
        <div className="registration-container">
          <div className="mobile-workshop-header">
            <img 
              src="/assets/images/workshop-mobile-title-8conacademy.png" 
              alt="8Con Academy Workshop Title"
              className="mobile-header-image"
            />
          </div>
          
          <div className="registration-content">
            {/* The Unified Card Container */}
            <div className="registration-card">
              
              {/* Left Column - Form */}
              <div className="form-column">
                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-group2">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="Full Name"
                      required
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>

                  <div className="form-group2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="Email Address"
                      required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group2">
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className={`form-input ${errors.contact ? 'error' : ''}`}
                      placeholder="Phone Number (+63XXXXXXXXXX)"
                      required
                    />
                    {errors.contact && <span className="error-message">{errors.contact}</span>}
                  </div>

                  <div className="form-group2">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`form-input ${errors.location ? 'error' : ''}`}
                      placeholder="Your Location"
                      required
                    />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                  </div>

                  <div className="form-group2">
                    <input
                      type="text"
                      id="businessProfession"
                      name="businessProfession"
                      value={formData.businessProfession}
                      onChange={handleInputChange}
                      className={`form-input ${errors.businessProfession ? 'error' : ''}`}
                      placeholder="Your business or profession"
                      required
                    />
                    {errors.businessProfession && <span className="error-message">{errors.businessProfession}</span>}
                  </div>

                  {/* Captcha Section */}
                  <div className="captcha-section">
                    <div className="captcha-container">
                      <div className="captcha-display">
                        <span className="captcha-text">{captcha}</span>
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="captcha-refresh"
                          title="Generate new captcha"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={handleCaptchaChange}
                        className={`form-input captcha-input ${captchaError ? 'error' : ''}`}
                        placeholder="Enter Captcha"
                        required
                      />
                    </div>
                    {captchaError && <span className="error-message">{captchaError}</span>}
                  </div>

                  {/* Privacy Policy Section */}
                  <div className="privacy-policy-section">
                    <h3 className="privacy-title">Privacy Policy</h3>
                    <p className="privacy-text">
                      8Con Academy respects your privacy and is committed to protecting any personal information you provide when registering for our workshops, courses, or events.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    className="reserve-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "RESERVING..." : "RESERVE MY SEAT"}
                  </button>
                </form>
              </div>

              {/* Right Column - Images */}
              <div className="image-column">
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
            background: var(--bg-primary);
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

          body {
            padding-top: 60px;
            background-color: #1a2228; /* Fallback for the overall background */
          }

          .nav-link {
            text-decoration: none;
            color: var(--header-text);
            padding: 0px 15px;
            border-radius: 6px;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
            position: relative;
            display: inline-block;
            cursor: pointer;
          }

          .desktop-nav {
            width: 1200px;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            position: relative;
            justify-content: flex-end;
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

          .mobile-menu-toggle {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--header-text);
          }

          .registration-section {
            background: url('/src/assets/images/registration-bg-8conacademy.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .registration-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            min-height: 80vh;
            background-color: #161e24; /* Darker overlay to match image bg */
            opacity: 0.95;
            z-index: 1;
          }

          .registration-section > * {
            position: relative;
            z-index: 2;
          }

          .registration-container {
            max-width: 1000px; /* Constrain width for the unified card */
            margin: 0 auto;
            width: 100%;
            padding: 40px 20px;
          }

          /* The New Unified Card */
          .registration-card {
            display: flex;
            flex-direction: row;
            background-color: #1a2329;
            border-radius: 12px;
            overflow: hidden; /* Clips the corners cleanly */
            box-shadow: 0 0 15px rgba(50, 168, 115, 0.1), 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid #293842;
            align-items: stretch; /* CRUCIAL: Forces the form and image to be the exact same height */
          }

          /* Left Side: Form */
          .form-column {
            flex: 1 1 50%; /* Takes up half the card */
            padding: 30px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .registration-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .form-group2 {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .form-input {
            padding: 14px 16px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-family: "Montserrat", sans-serif;
            background-color: #27343e;
            color: #ffffff;
            transition: all 0.3s ease;
          }

          .form-input::placeholder {
            color: #8c9ba5;
          }

          .form-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #4caf50;
            background-color: #2e3d48;
          }

          .form-input.error {
            box-shadow: 0 0 0 2px #dc3545;
          }

          .error-message {
            color: #ff6b6b;
            font-size: 12px;
            margin-top: 4px;
            font-family: "Montserrat", sans-serif;
          }

          /* Captcha Styles */
          .captcha-section {
            margin: 4px 0;
          }

          .captcha-container {
            display: flex;
            gap: 12px;
            align-items: center;
          }

          .captcha-display {
            display: flex;
            align-items: center;
            background-color: #27343e;
            border-radius: 6px;
            padding: 14px 16px;
            min-width: 140px;
            height: 48px;
            justify-content: space-between;
          }

          .captcha-text {
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 2px;
            user-select: none;
          }

          .captcha-refresh {
            background: none;
            border: none;
            cursor: pointer;
            color: #8c9ba5;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
          }

          .captcha-refresh:hover {
            color: #ffffff;
          }

          .captcha-input {
            flex: 1;
            height: 48px;
          }

          /* Privacy Policy Styles */
          .privacy-policy-section {
            margin: 10px 0;
            padding: 16px;
            background-color: #7b9e7d;
            border-radius: 4px;
            border-left: 5px solid #a32939;
          }

          .privacy-title {
            font-family: "Montserrat", sans-serif;
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 6px 0;
            text-transform: uppercase;
          }

          .privacy-text {
            font-family: "Montserrat", sans-serif;
            font-size: 11px;
            color: #e2ede3;
            line-height: 1.4;
            margin: 0;
          }

          /* Submit Button */
          .reserve-btn {
            background-color: #a3293a;
            color: white;
            padding: 16px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: "Montserrat", sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 10px;
          }

          .reserve-btn:hover {
            background-color: #8a202f;
          }

          .reserve-btn:disabled {
            background-color: #4a555e;
            cursor: not-allowed;
            color: #8c9ba5;
          }

          /* The New Unified Card */
          .registration-card {
            display: flex;
            flex-direction: row;
            background-color: #1a2329;
            border-radius: 12px;
            overflow: hidden; /* Clips the corners cleanly */
            box-shadow: 0 0 15px rgba(50, 168, 115, 0.1), 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid #293842;
            align-items: stretch; /* CRUCIAL: Forces the form and image to be the exact same height */
          }

          /* Left Side: Form */
          .form-column {
            flex: 1 1 50%; /* Takes up half the card */
            padding: 30px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          /* Right Side: Image */
          .image-column {
            flex: 0 0 auto; /* Wraps tightly around the image's dynamic width */
            display: flex;
            background-color: #1a2329; 
          }

          .workshop-image {
            height: 100%; /* Locks exactly to the top and bottom of the form */
            width: auto; /* Scales automatically so absolutely nothing gets cropped */
            max-width: 500px; /* Safety net: stops it from getting too wide and crushing the form */
            object-fit: cover; /* Failsafe: ensures it fills the space if it hits the max-width */
            object-position: center;
            display: block; /* CRUCIAL: Removes the invisible tiny gap at the bottom of the image */
          }

          .mobile-workshop-header {
            display: none;
          }

          /* Responsive Design */
          @media (max-width: 900px) {
            .registration-card {
              flex-direction: column;
              max-width: 500px;
              margin: 0 auto;
            }
              
            .form-column {
              width: 100%;
              padding: 30px 20px;
            }

            .image-column {
              width: 100%;
              order: -1; /* Puts image on top for mobile */
            }

            .workshop-image {
              width: 100%;
              height: auto;
              max-width: none;
              object-fit: contain;
            }
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }

            .captcha-container {
              flex-direction: column;
              align-items: stretch;
            }

            .captcha-display {
              justify-content: center;
              gap: 20px;
            }
          }

          @media (max-width: 1024px) {
            .mobile-nav {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: var(--header-mobile-bg);
              z-index: 998;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            .mobile-nav-link {
              padding: 16px 24px;
              text-decoration: none;
              color: var(--header-mobile-text);
              border-bottom: 1px solid var(--header-mobile-border);
              width: 100%;
              text-align: left;
              font-family: "Montserrat", sans-serif;
            }
          }
        `}</style>
        
        <div className="footer-hidden-mobile">
          <Footer />
        </div>
      </div>
    );
  };

  export default Registration;