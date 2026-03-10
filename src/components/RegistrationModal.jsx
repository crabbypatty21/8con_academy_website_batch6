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

      <style>{`
        /* ===== MODAL OVERLAY ===== */
        .reg-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(2px);
        }

        /* ===== MODAL CONTENT WRAPPER ===== */
        .reg-modal-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border-radius: 12px;
          background-color: #1a2329;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.15),
            0 0 80px rgba(255, 255, 255, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.7);
        }

        .reg-modal-content::-webkit-scrollbar {
          display: none;
        }

        /* ===== CLOSE BUTTON ===== */
        .reg-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.4);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .reg-modal-close:hover {
          background-color: #a3293a;
          color: #ffffff;
        }

        .reg-modal-close:focus-visible {
          outline: 2px solid #4caf50;
          outline-offset: 2px;
        }

        /* ===== FORM CARD (mirrors Registration.jsx inline styles) ===== */
        .reg-modal-content .registration-card {
          display: flex;
          flex-direction: row;
          width: 100%;
          background-color: #1a2329;
          border-radius: 12px;
          overflow: hidden;
          border: none;
        }

        .reg-modal-content .form-column {
          flex: 1 1 40%;
          width: 40%;
          padding: 24px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .reg-modal-content .image-column {
          flex: 1 1 60%;
          width: 60%;
          display: block;
          background-color: #1a2329;
          padding: 0;
          margin: 0;
        }

        .reg-modal-content .workshop-image {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
        }

        .reg-modal-content .registration-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .reg-modal-content .form-group2 {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reg-modal-content .form-input {
          padding: 12px 14px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-family: "Montserrat", sans-serif;
          background-color: #27343e;
          color: #f2f2f2;
          transition: all 0.3s ease;
        }

        .reg-modal-content .form-input::placeholder {
          color: #8c9ba5;
        }

        .reg-modal-content .form-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px #4caf50;
          background-color: #2e3d48;
        }

        .reg-modal-content .form-input.error {
          box-shadow: 0 0 0 2px #dc3545;
        }

        .reg-modal-content .error-message {
          color: #ff6b6b;
          font-size: 12px;
          margin-top: 4px;
          font-family: "Montserrat", sans-serif;
        }

        /* Captcha */
        .reg-modal-content .captcha-section {
          margin: 4px 0;
        }

        .reg-modal-content .captcha-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .reg-modal-content .captcha-display {
          display: flex;
          align-items: center;
          background-color: #27343e;
          border-radius: 6px;
          padding: 12px 14px;
          min-width: 140px;
          height: 44px;
          justify-content: space-between;
        }

        .reg-modal-content .captcha-text {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 2px;
          user-select: none;
        }

        .reg-modal-content .captcha-refresh {
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

        .reg-modal-content .captcha-refresh:hover {
          color: #ffffff;
        }

        .reg-modal-content .captcha-input {
          flex: 1;
          height: 44px;
        }

        /* Privacy Policy */
        .reg-modal-content .privacy-policy-section {
          margin: 8px 0;
          padding: 14px;
          background-color: #7b9e7d;
          border-radius: 4px;
          border-left: 5px solid #a32939;
        }

        .reg-modal-content .privacy-title {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
          text-transform: uppercase;
        }

        .reg-modal-content .privacy-text {
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          color: #e2ede3;
          line-height: 1.4;
          margin: 0;
        }

        /* Submit Button */
        .reg-modal-content .reserve-btn {
          background-color: #a3293a;
          color: white;
          padding: 14px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Montserrat", sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 6px;
        }

        .reg-modal-content .reserve-btn:hover {
          background-color: #8a202f;
        }

        .reg-modal-content .reserve-btn:disabled {
          background-color: #4a555e;
          cursor: not-allowed;
          color: #8c9ba5;
        }

        /* ===== LIGHT MODE ===== */
        html.light-mode .reg-modal-content {
          background-color: #E9F1F9;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.3),
            0 20px 60px rgba(0, 0, 0, 0.4);
        }

        html.light-mode .reg-modal-close {
          background-color: rgba(0, 0, 0, 0.15);
          color: #373737;
        }

        html.light-mode .reg-modal-close:hover {
          background-color: #a3293a;
          color: #ffffff;
        }

        html.light-mode .reg-modal-content .registration-card {
          background-color: #E9F1F9;
          border: none;
        }

        html.light-mode .reg-modal-content .image-column {
          background-color: #E9F1F9;
        }

        html.light-mode .reg-modal-content .form-input {
          background-color: #f1f5f9;
          color: #373737;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        html.light-mode .reg-modal-content .form-input::placeholder {
          color: #94a3b8;
        }

        html.light-mode .reg-modal-content .form-input:focus {
          background-color: #ffffff;
          box-shadow: 0 0 0 2px #4caf50;
        }

        html.light-mode .reg-modal-content .captcha-display {
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
        }

        html.light-mode .reg-modal-content .captcha-text {
          color: #373737;
        }

        html.light-mode .reg-modal-content .captcha-refresh {
          color: #64748b;
        }

        html.light-mode .reg-modal-content .captcha-refresh:hover {
          color: #373737;
        }

        html.light-mode .reg-modal-content .privacy-policy-section {
          background-color: #a3c9a5;
        }

        html.light-mode .reg-modal-content .privacy-title {
          color: #1a1a1a;
        }

        html.light-mode .reg-modal-content .privacy-text {
          color: #2d4a2e;
        }

        html.light-mode .reg-modal-content .reserve-btn:disabled {
          background-color: #cbd5e1;
          color: #94a3b8;
        }

        html.light-mode .reg-modal-content .error-message {
          color: #dc2626;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .reg-modal-content .registration-card {
            flex-direction: column;
          }

          .reg-modal-content .form-column {
            width: 100%;
            padding: 30px 20px;
          }

          .reg-modal-content .image-column {
            width: 100%;
            order: -1;
          }

          .reg-modal-content .workshop-image {
            height: auto;
            object-fit: contain;
          }
        }

        @media (max-width: 768px) {
          .reg-modal-overlay {
            padding: 12px;
          }

          .reg-modal-content .captcha-container {
            flex-direction: column;
            align-items: stretch;
          }

          .reg-modal-content .captcha-display {
            justify-content: center;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationModal;
