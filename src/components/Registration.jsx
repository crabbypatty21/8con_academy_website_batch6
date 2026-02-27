import { Menu, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
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
  
  // Captcha state
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Define API base URL based on environment
  const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' // Your backend server port
    : 'https://8conacademy.com'; // Production URL

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

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

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
      
      // Construct the API endpoint URL
      const apiUrl = `${API_BASE_URL}/registration`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // Add timeout and additional fetch options
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Response data:", data);

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
      
    } catch (error) {
      console.error("Submit error:", error);
      
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        alert("Request timed out. Please check your internet connection and try again.");
      } else if (error.message.includes("Failed to fetch") || error.message.includes("ERR_CONNECTION_REFUSED")) {
        alert(`Cannot connect to server. Please check your internet connection and try again later.`);
      } else if (error.message.includes("non-JSON")) {
        alert("Server error. Please try again later.");
      } else if (error.message.includes("HTTP error")) {
        alert(`Server error (${error.message.split('status: ')[1]}). Please try again later.`);
      } else {
        alert("Something went wrong. Please check your internet connection and try again.");
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
          {/* Mobile Workshop Header Image - Now outside the form */}
          <div className="mobile-workshop-header">
            <img 
              src="/assets/images/workshop-mobile-title-8conacademy.png" 
              alt="8Con Academy Workshop Title"
              className="mobile-header-image"
            />
          </div>
          
          <div className="registration-content">
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
                    placeholder="+63XXXXXXXXXX"
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
                      className={`captcha-input ${captchaError ? 'error' : ''}`}
                      placeholder="Enter captcha"
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
                  {isSubmitting ? "Reserving..." : "Reserve My Seat"}
                </button>
              </form>
            </div>

            {/* Right Column - Images */}
            <div className="image-column">
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

          body {
            padding-top: 60px;
          }

          .main-content {
            margin-top: 60px;
          }

          .header-font {
            font-family: "Montserrat", sans-serif;
          }

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

          .registration-section {
            background: url('/src/assets/images/registration-bg-8conacademy.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 80vh;
            display: flex;
            align-items: center;
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
            background-color: #121411; 
            opacity: .8;
            z-index: 1;
          }

          .registration-section > * {
            position: relative;
            z-index: 2;
          }

          .registration-container {
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            padding-bottom: 20px;
          }

          .registration-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            padding-top: 20px;
          }

          .form-column {
            background: rgba(255, 255, 255, 0.41);
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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

          .form-group2 {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 3px;
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
            border-color: #0d7805ff;
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

          /* Captcha Styles */
          .captcha-section {
            margin: 10px 0;
          }

          .captcha-container {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;
          }

          .captcha-display {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border: 2px solid #dee2e6;
            border-radius: 8px;
            padding: 12px 16px;
            min-width: 120px;
            height:48px;
            justify-content: center;
            position: relative;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .captcha-text {
            font-family: "Montserrat", sans-serif;
            font-weight: bold;
            color: #495057;
            letter-spacing: 3px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            user-select: none;
            background: linear-gradient(45deg, #6c757d, #495057);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .captcha-refresh {
            background: none;
            border: none;
            cursor: pointer;
            margin-left: 8px;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.3s ease;
            color: #6c757d;
          }

          .captcha-refresh:hover {
            background: rgba(108, 117, 125, 0.1);
          }

          .captcha-input {
            padding: 12px 16px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
            font-family: "Montserrat", sans-serif;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            flex: 1;
            letter-spacing: 2px;
          }

          .captcha-input:focus {
            outline: none;
            border-color: #0d7805ff;
            box-shadow: 0 0 0 3px rgba(218, 229, 57, 0.1);
            background: rgba(255, 255, 255, 1);
            transform: translateY(-1px);
          }

          .captcha-input.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
          }

          /* Privacy Policy Styles */
          .privacy-policy-section {
            margin: 0 0 20px 0;
            padding: 10px;
            background: #0d78052b;
            border-radius: 8px;
            border-left: 3px solid #a3293961;
          }

          .privacy-title {
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: black;
            margin: 0 0 8px 0;
          }

          .privacy-text {
            font-family: "Montserrat", sans-serif;
            font-size: 14px;
            color: black;
            line-height: 1.5;
            margin: 0;
          }

          .reserve-btn {
            background: #a3293a;
            color: white;
            padding: 16px 32px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: "Montserrat", sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 6px 16px rgba(249, 141, 144, 0.3);
          }

          .reserve-btn:hover {
            background: #375435;
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

          /* Mobile Workshop Header Image - Fixed positioning */
          .mobile-workshop-header {
            display: none;
            width: 100%;
            text-align: center;
            margin-bottom: 30px;
            padding: 0 20px;
            margin-top: 10px;
          }

          .mobile-header-image {
            width: 100%;
            max-width: 400px;
            height: auto;
            object-fit: contain;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .image-column {
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
          }

          .workshop-image-container {
            width: 490px;
            height: 490px;
            border-radius: 20px;
            overflow: visible;
            transition: all 0.3s ease;
            position: relative;
            margin: 20px;
          }

          .workshop-image-container::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
            border-radius: 30px;
            z-index: -1;
            filter: blur(15px);
            opacity: 0.8;
            animation: glow 3s ease-in-out infinite alternate;
          }

          .workshop-image-container::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
            border-radius: 25px;
            z-index: -1;
            filter: blur(8px);
            opacity: 0.6;
            animation: glow 2s ease-in-out infinite alternate-reverse;
          }

          @keyframes glow {
            0% {
              opacity: 0.6;
              transform: scale(0.98);
            }
            100% {
              opacity: 1;
              transform: scale(1.02);
            }
          }

          .workshop-image-container:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          }

          .workshop-image-container:hover::before {
            filter: blur(20px);
            opacity: 1;
          }

          .workshop-image-container:hover::after {
            filter: blur(12px);
            opacity: 0.8;
          }

          .workshop-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
            border-radius: 20px;
            box-shadow: inset 0 0 20px rgba(218, 229, 57, 0.2);
            position: relative;
            z-index: 1;
          }

          .workshop-image-container:hover .workshop-image {
            transform: scale(1.05);
          }

          /* Hide footer on mobile devices */
          .footer-hidden-mobile {
            display: block;
          }

          @media (max-width: 768px) {
            .footer-hidden-mobile {
              display: none;
            }
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none;
            }

            body {
            padding-top: 40px;
            }
            
            .header-container {
              padding: 0 20px;
            }
            
            .mobile-menu-toggle {
              display: block;
            }
            
            .registration-content {
              padding: 0 20px;
            }
          }

          @media (max-width: 768px) {
            .registration-content {
              grid-template-columns: 1fr;
              gap: 0;
              padding: 0 20px;
            }

            body {
            padding-top: 40px;
            }
            
            .form-column {
              padding: 30px 25px;
              margin: 20px 0;
              position: relative;
              overflow: visible;
            }
            
            .form-column::before {
              content: '';
              position: absolute;
              top: -8px;
              left: -8px;
              right: -8px;
              bottom: -8px;
              background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
              border-radius: 28px;
              z-index: -1;
              filter: blur(12px);
              opacity: 0.8;
              animation: glow 3s ease-in-out infinite alternate;
            }
            
            .form-column::after {
              content: '';
              position: absolute;
              top: -4px;
              left: -4px;
              right: -4px;
              bottom: -4px;
              background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
              border-radius: 24px;
              z-index: -1;
              filter: blur(6px);
              opacity: 0.6;
              animation: glow 2s ease-in-out infinite alternate-reverse;
            }
            
            .form-title {
              font-size: 2rem;
              margin-bottom: 25px;
            }
            
            .registration-form {
              gap: 12px;
            }
            
            .form-input {
              padding: 12px 14px;
              font-size: 16px;
            }
            
            .captcha-container {
              flex-direction: column;
              gap: 12px;
              align-items: stretch;
            }
            
            .captcha-display {
              align-self: center;
              min-width: 150px;
            }
            
            .captcha-input {
              width: 100%;
            }
            
            .reserve-btn {
              padding: 14px 24px;
              font-size: 15px;
            }
            
            .image-column {
              display: none;
            }
            
            /* Show mobile header image on mobile */
            .mobile-workshop-header {
              display: block;
              margin-top: 10px;
            }
            
            .registration-section {
              padding: 20px 0 40px 0;
              min-height: 100vh;
            }
          }

          @media (max-width: 480px) {
            .registration-section {
              padding: 20px 0 40px 0;
              min-height: 100vh;
            }

            body {
            padding-top: 40px;
            }
            
            .registration-container {
              padding: 0 15px;
            }
            
            .mobile-workshop-header {
              margin-bottom: 25px;
              padding: 0 15px;
              margin-top: 10px;
            }
            
            .mobile-header-image {
              max-width: 350px;
              border-radius: 12px;
            }
            
            .form-column {
              padding: 25px 20px;
              margin: 15px 0;
              border-radius: 15px;
              position: relative;
              overflow: visible;
            }
            
            .form-column::before {
              content: '';
              position: absolute;
              top: -6px;
              left: -6px;
              right: -6px;
              bottom: -6px;
              background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
              border-radius: 21px;
              z-index: -1;
              filter: blur(10px);
              opacity: 0.8;
              animation: glow 3s ease-in-out infinite alternate;
            }
            
            .form-column::after {
              content: '';
              position: absolute;
              top: -3px;
              left: -3px;
              right: -3px;
              bottom: -3px;
              background: linear-gradient(15deg, #b90d24ff, #0d7805ff);
              border-radius: 18px;
              z-index: -1;
              filter: blur(5px);
              opacity: 0.6;
              animation: glow 2s ease-in-out infinite alternate-reverse;
            }
            
            .form-title {
              font-size: 1.75rem;
              margin-bottom: 20px;
            }
            
            .form-input {
              padding: 12px 14px;
              font-size: 16px;
            }
            
            .captcha-display {
              min-width: 130px;
              padding: 10px 14px;
            }
            
            .captcha-text {
              letter-spacing: 2px;
              font-size: 14px;
            }
            
            .reserve-btn {
              padding: 14px 20px;
              font-size: 14px;
              letter-spacing: 0.5px;
            }
            
            .error-message {
              font-size: 12px;
            }
          }

          /* Mobile header adjustments */
          @media (max-width: 1024px) {
            .header {
              transition: all 0.3s ease;
            }
              
            body {
            padding-top: 40px;
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
        
        <div className="footer-hidden-mobile">
          <Footer />
        </div>
      </div>
    );
  };

  export default Registration;