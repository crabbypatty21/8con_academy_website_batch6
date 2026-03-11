import { Menu, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import "../App.css";
import "../ConponentCSS/Registration.css";
main
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

  // OTP Verification state
  const [step, setStep] = useState(1); // 1: Registration Form, 2: OTP Verification
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // Define API base URL based on environment
  const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://8conacademy.com';

  // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzkGl3HPfl_V6A2yqbTMU0TvKgD9mEObFzU5XNToy1txKgFuQ-RBXZnamhFWgJf2nLMmw/exec";

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

  // Handle countdown timer for OTP
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

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

  // STEP 1: Handle Form Submission (Request OTP)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

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
      console.log("Requesting OTP for:", formData.email);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ ...formData, action: "requestOTP" }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setStep(2);        // Move to OTP step
        setTimer(300);     // Reset timer to 5 minutes
        setOtpError("");
      } else {
        alert(data.message || "Failed to request OTP. Email might be registered already.");
      }

    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: Handle OTP Verification (Final Submission)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp.length < 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ ...formData, action: "verifyAndRegister", otp: otp }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Registration successful! Your seat has been reserved and details sent to 8Con Academy.");

        // Reset Everything
        setStep(1);
        setFormData({
          fullName: "",
          email: "",
          contact: "+63",
          location: "",
          businessProfession: "",
        });
        setOtp("");
        setCaptchaInput("");
        generateCaptcha();
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify error:", error);
      alert("Verification failed. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format Timer output
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
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
            <div className="registration-card">
              
              {/* Left Column - Form */}
              <div className="form-column">
                
                {step === 1 ? (
                  // ----------------------------------------
                  // STEP 1: REGISTRATION FORM
                  // ----------------------------------------
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
                ) : (
                  // ----------------------------------------
                  // STEP 2: OTP VERIFICATION FORM
                  // ----------------------------------------
                  <form onSubmit={handleVerifyOTP} className="registration-form">
                    <h2 style={{ color: 'white', fontFamily: '"Montserrat", sans-serif', marginBottom: '8px' }}>
                      Verify Email
                    </h2>
                    <p style={{ color: '#8c9ba5', fontSize: '13px', marginBottom: '24px', lineHeight: '1.5' }}>
                      We sent a 6-digit verification code to <strong style={{ color: 'white' }}>{formData.email}</strong>.
                    </p>

                    <div className="form-group2">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, '').substring(0, 6)); // Only digits, max 6
                          setOtpError("");
                        }}
                        className={`form-input ${otpError ? 'error' : ''}`}
                        placeholder="Enter 6-digit OTP"
                        style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }}
                        required
                      />
                      {otpError && <span className="error-message">{otpError}</span>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px' }}>
                      <span style={{ color: timer > 0 ? '#8c9ba5' : '#dc3545' }}>
                        {timer > 0 ? `Code expires in ${formatTime(timer)}` : "Code expired."}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="reserve-btn"
                      disabled={isSubmitting || timer === 0 || otp.length < 6}
                    >
                      {isSubmitting ? "VERIFYING..." : "VERIFY & REGISTER"}
                    </button>

                    {/* Additional Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                      <button
                        type="button"
                        onClick={handleSubmit} // Re-triggers the requestOTP logic
                        className="reserve-btn"
                        style={{ background: 'transparent', border: '1px solid #4a555e', marginTop: '0' }}
                        disabled={isSubmitting || timer > 0} // Only resend if expired
                      >
                        RESEND OTP
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => { setStep(1); setOtp(""); setTimer(0); }}
                        style={{ background: 'transparent', border: 'none', color: '#8c9ba5', cursor: 'pointer', textDecoration: 'underline', marginTop: '8px' }}
                      >
                        Change Email Address
                      </button>
                    </div>
                  </form>
                )}

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

      <div className="footer-hidden-mobile">
        <Footer />
      </div>
    </div>
  );
};

export default Registration;