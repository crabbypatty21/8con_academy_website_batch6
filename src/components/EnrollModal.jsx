import { useEffect, useState } from "react";
import { X, CheckCircle, XCircle, GraduationCap, TrendingUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import "../ConponentCSS/EnrollModal.css";

const EnrollModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "+63",
    location: "",
    course: "Forex Derivative Trading Level II",
    tradingExperience: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultModal, setResultModal] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) newErrors.fullName = "Please enter your full name";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!/^\+63[0-9]{10}$/.test(formData.contact)) newErrors.contact = "Contact must be in format +63XXXXXXXXXX";
    if (!formData.location || formData.location.trim().length < 2) newErrors.location = "Please enter your location";
    if (!formData.tradingExperience) newErrors.tradingExperience = "Please select your trading experience";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5f8976e9-6357-4533-bd55-71314277e2f9",
          from_name: formData.fullName,
          subject: `New Course Enrollment from ${formData.fullName}`,
          name: formData.fullName,
          email: formData.email,
          contact: formData.contact,
          location: formData.location,
          course: formData.course,
          "trading_experience": formData.tradingExperience,
          form_type: "Course Enrollment",
        }),
      });
      const data = await response.json();

      if (data.success) {
        setResultModal({ show: true, type: "success", message: "Your enrollment has been submitted! We'll contact you within 24 hours with enrollment details and next steps." });
        setFormData({ fullName: "", email: "", contact: "+63", location: "", course: "Forex Derivative Trading Level II", tradingExperience: "" });
      } else {
        setResultModal({ show: true, type: "error", message: data.message || "Failed to submit. Please try again." });
      }
    } catch {
      setResultModal({ show: true, type: "error", message: "Something went wrong. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Result Modal */}
      {resultModal.show && (
        <div className="enroll-result-overlay" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
          <div className={`enroll-result-card enroll-result-${resultModal.type}`} onClick={(e) => e.stopPropagation()}>
            <button className="enroll-result-close" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
              <X size={18} />
            </button>
            {resultModal.type === "success" && (
              <div className="enroll-result-confetti">
                {[...Array(8)].map((_, i) => <span key={i} className={`confetti confetti-${i}`} />)}
              </div>
            )}
            <div className={`enroll-result-icon enroll-result-icon-${resultModal.type}`}>
              {resultModal.type === "success" ? <CheckCircle size={36} /> : <XCircle size={36} />}
            </div>
            <h3 className="enroll-result-title">
              {resultModal.type === "success" ? "Enrollment Submitted!" : "Something Went Wrong"}
            </h3>
            <p className="enroll-result-message">{resultModal.message}</p>
            <button className="enroll-result-btn" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
              {resultModal.type === "success" ? "Got it!" : "Try Again"}
            </button>
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      <div className="enroll-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={`enroll-modal ${isDark ? "" : "enroll-modal-light"}`}>
          <button className="enroll-close" onClick={onClose}><X size={20} /></button>

          {/* Header */}
          <div className="enroll-header">
            <div className="enroll-header-icon">
              <GraduationCap size={26} />
            </div>
            <h2 className="enroll-title">Course Enrollment</h2>
            <div className="enroll-course-badge">
              <TrendingUp size={14} />
              <span>Forex Derivative Trading Level II</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="enroll-form">
            <div className="enroll-form-row">
              <div className="enroll-field">
                <label className="enroll-label">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`enroll-input ${errors.fullName ? "enroll-input-error" : ""}`} placeholder="Juan Dela Cruz" required />
                {errors.fullName && <span className="enroll-error">{errors.fullName}</span>}
              </div>
              <div className="enroll-field">
                <label className="enroll-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`enroll-input ${errors.email ? "enroll-input-error" : ""}`} placeholder="you@example.com" required />
                {errors.email && <span className="enroll-error">{errors.email}</span>}
              </div>
            </div>

            <div className="enroll-form-row">
              <div className="enroll-field">
                <label className="enroll-label">Phone Number</label>
                <input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} className={`enroll-input ${errors.contact ? "enroll-input-error" : ""}`} placeholder="+63XXXXXXXXXX" required />
                {errors.contact && <span className="enroll-error">{errors.contact}</span>}
              </div>
              <div className="enroll-field">
                <label className="enroll-label">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className={`enroll-input ${errors.location ? "enroll-input-error" : ""}`} placeholder="City, Province" required />
                {errors.location && <span className="enroll-error">{errors.location}</span>}
              </div>
            </div>

            <div className="enroll-field">
              <label className="enroll-label">Trading Experience</label>
              <select name="tradingExperience" value={formData.tradingExperience} onChange={handleInputChange} className={`enroll-input enroll-select ${errors.tradingExperience ? "enroll-input-error" : ""}`} required>
                <option value="" disabled>Select your experience level</option>
                <option value="No Experience">No Experience</option>
                <option value="Beginner (Less than 1 year)">Beginner (Less than 1 year)</option>
                <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                <option value="Advanced (3+ years)">Advanced (3+ years)</option>
              </select>
              {errors.tradingExperience && <span className="enroll-error">{errors.tradingExperience}</span>}
            </div>

            <div className="enroll-field">
              <label className="enroll-label">Course</label>
              <select name="course" value={formData.course} onChange={handleInputChange} className="enroll-input enroll-select" disabled>
                <option value="Forex Derivative Trading Level II">Forex Derivative Trading Level II</option>
              </select>
            </div>

            <button type="submit" className="enroll-submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Enrollment"}
            </button>

            <p className="enroll-privacy">
              By submitting, you agree to 8Con Academy's privacy policy. Your information is secure and will only be used for enrollment purposes.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default EnrollModal;
