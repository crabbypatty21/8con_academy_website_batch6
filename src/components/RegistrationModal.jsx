/**
 * RegistrationModal
 *
 * A modal overlay wrapping the workshop registration form.
 *
 * Props:
 *   isOpen  {boolean}  - controls visibility
 *   onClose {function} - called when the user dismisses the modal
 *
 * Usage:
 *   <RegistrationModal isOpen={showReg} onClose={() => setShowReg(false)} />
 */

import { useEffect, useState } from "react";
import { RefreshCw, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import "../App.css";
import "../ConponentCSS/Registration.css";

const RegistrationModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

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

  // Generate random captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput("");
    setCaptchaError("");
  };

  // Generate captcha on first mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Validation helpers
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

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
      newErrors.fullName =
        "Full name must contain only letters, spaces, hyphens, and periods";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validateContact(formData.contact)) {
      newErrors.contact = "Contact number must be in format +63XXXXXXXXXX";
    }

    if (!validateLocation(formData.location)) {
      newErrors.location =
        "Location must contain only letters, spaces, hyphens, commas, and periods";
    }

    if (!validateBusinessProfession(formData.businessProfession)) {
      newErrors.businessProfession =
        "Business/Profession must contain only letters, spaces, hyphens, commas, periods, and forward slashes";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting registration data:", formData);

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzkGl3HPfl_V6A2yqbTMU0TvKgD9mEObFzU5XNToy1txKgFuQ-RBXZnamhFWgJf2nLMmw/exec";

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert(
          "Registration successful! Your seat has been reserved and details sent to 8Con Academy."
        );

        setFormData({
          fullName: "",
          email: "",
          contact: "+63",
          location: "",
          businessProfession: "",
        });

        generateCaptcha();
        onClose();
      } else {
        throw new Error(data.message || "Failed to save to Google Sheets");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(
        "Something went wrong. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on overlay click (but not on content click)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Do not render anything when closed
  if (!isOpen) return null;

  return (
    <div
      className="reg-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Workshop Registration"
    >
      <div className="reg-modal-content">
        {/* Close button */}
        <button
          className="reg-modal-close"
          onClick={onClose}
          aria-label="Close registration modal"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Registration card — form + image, same layout as Registration.jsx */}
        <div className="registration-card">
          {/* Left Column - Form */}
          <div className="form-column">
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group2">
                <input
                  type="text"
                  id="reg-modal-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.fullName ? "error" : ""}`}
                  placeholder="Full Name"
                  required
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group2">
                <input
                  type="email"
                  id="reg-modal-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="Email Address"
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group2">
                <input
                  type="tel"
                  id="reg-modal-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`form-input ${errors.contact ? "error" : ""}`}
                  placeholder="Phone Number (+63XXXXXXXXXX)"
                  required
                />
                {errors.contact && (
                  <span className="error-message">{errors.contact}</span>
                )}
              </div>

              <div className="form-group2">
                <input
                  type="text"
                  id="reg-modal-location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`form-input ${errors.location ? "error" : ""}`}
                  placeholder="Your Location"
                  required
                />
                {errors.location && (
                  <span className="error-message">{errors.location}</span>
                )}
              </div>

              <div className="form-group2">
                <input
                  type="text"
                  id="reg-modal-businessProfession"
                  name="businessProfession"
                  value={formData.businessProfession}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.businessProfession ? "error" : ""
                  }`}
                  placeholder="Your business or profession"
                  required
                />
                {errors.businessProfession && (
                  <span className="error-message">
                    {errors.businessProfession}
                  </span>
                )}
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
                    className={`form-input captcha-input ${
                      captchaError ? "error" : ""
                    }`}
                    placeholder="Enter Captcha"
                    required
                  />
                </div>
                {captchaError && (
                  <span className="error-message">{captchaError}</span>
                )}
              </div>

              {/* Privacy Policy Section */}
              <div className="privacy-policy-section">
                <h3 className="privacy-title">Privacy Policy</h3>
                <p className="privacy-text">
                  8Con Academy respects your privacy and is committed to
                  protecting any personal information you provide when
                  registering for our workshops, courses, or events.
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

          {/* Right Column - Image */}
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
  );
};

export default RegistrationModal;
