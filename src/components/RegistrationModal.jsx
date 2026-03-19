import { useEffect, useState } from "react";
import { RefreshCw, X, ShieldCheck } from "lucide-react";
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
  const [step, setStep] = useState(1); // Step 1: Info, Step 2: OTP
  const [otpInput, setOtpInput] = useState("");

  // Captcha state
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwijMVI4g16Yv8lMNFgbyzcFNSnR4fxDrWMdmvNap6WbMLVV7lWeEncs02oqprW35XcOQ/exec";

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
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(1); // Reset to step 1 whenever modal opens
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Validation helpers
  const validateFullName = (name) => /^[a-zA-Z\s\-\.]+$/.test(name) && name.trim().length >= 2;
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validateContact = (contact) => /^\+63[0-9]{10}$/.test(contact);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "contact") {
      processedValue = "+63" + value.replace(/^\+63/, "").replace(/\D/g, "").substring(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // STEP 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      setCaptchaError("Captcha verification failed.");
      return;
    }

    const newErrors = {};
    if (!validateFullName(formData.fullName)) newErrors.fullName = "Invalid Name";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid Email";
    if (!validateContact(formData.contact)) newErrors.contact = "Format: +63XXXXXXXXXX";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ ...formData, action: "requestOTP" }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Network Error: Could not send OTP. Ensure your Script is deployed as 'Anyone'.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: Verify OTP and Finalize Registration
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          otp: otpInput,
          action: "verifyAndRegister"
        }),
      });
      const data = await response.json();

      if (data.status === "success") {
        alert("Registration successful!");
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reg-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog">
      <div className="reg-modal-content">
        <button className="reg-modal-close" onClick={onClose}><X size={20} /></button>

        <div className="registration-card">
          <div className="form-column">
            {step === 1 ? (
              <form onSubmit={handleRequestOTP} className="registration-form">
                <div className="form-group2">
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-input" placeholder="Full Name" required />
                </div>
                <div className="form-group2">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="Email Address" required />
                </div>
                <div className="form-group2">
                  <input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} className="form-input" placeholder="Phone Number" required />
                </div>
                <div className="form-group2">
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="form-input" placeholder="Location" required />
                </div>
                <div className="form-group2">
                  <input type="text" name="businessProfession" value={formData.businessProfession} onChange={handleInputChange} className="form-input" placeholder="Profession" required />
                </div>

                <div className="captcha-section">
                  <div className="captcha-container">
                    <div className="captcha-display">
                      <span className="captcha-text">{captcha}</span>
                      <button type="button" onClick={generateCaptcha} className="captcha-refresh"><RefreshCw size={16} /></button>
                    </div>
                    <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="form-input captcha-input" placeholder="Captcha" required />
                  </div>
                </div>

                <button type="submit" className="reserve-btn" disabled={isSubmitting}>
                  {isSubmitting ? "SENDING OTP..." : "GET VERIFICATION CODE"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="registration-form otp-step">
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <ShieldCheck size={48} color="#d9534f" style={{ margin: "0 auto" }} />
                  <h3 style={{ marginTop: "10px" }}>Verify Your Email</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>We sent a 6-digit code to {formData.email}</p>
                </div>
                
                <div className="form-group2">
                  <input 
                    type="text" 
                    value={otpInput} 
                    onChange={(e) => setOtpInput(e.target.value)} 
                    className="form-input" 
                    placeholder="Enter 6-Digit Code" 
                    maxLength="6"
                    required 
                  />
                </div>

                <button type="submit" className="reserve-btn" disabled={isSubmitting}>
                  {isSubmitting ? "VERIFYING..." : "CONFIRM RESERVATION"}
                </button>
                <button type="button" onClick={() => setStep(1)} className="back-btn" style={{ background: "none", border: "none", color: "#666", cursor: "pointer", marginTop: "10px", width: "100%" }}>
                  Edit Information
                </button>
              </form>
            )}
          </div>

          <div className="image-column">
            <img src="/assets/images/workshop_pic.jpg" alt="Workshop" className="workshop-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;