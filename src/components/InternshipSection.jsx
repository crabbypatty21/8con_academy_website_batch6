import React, { useState, useEffect } from "react";
import "../ConponentCSS/Internship.css";
import "../ConponentCSS/ApplyModal.css";
import { Upload, X, CheckCircle, XCircle, Briefcase, Users } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import TradingBackground from "./TradingBackground.jsx";

const internshipRoles = [
  {
    title: "MARKETING",
    description:
      "Brainstorms hooks faster than TikTok trends\u2014driving campaigns, growing communities, and turning scrollers into confident traders. Handles copywriting, social posts, email funnels, light ad tweaks, and community engagement on Discord and Facebook. Checks the data to answer: \u201CDid that reel convert?\u201D",
    key: "Marketing",
    icon: "/assets/icons/megaphone-fill.svg",
  },
  {
    title: "IT DEPARTMENT",
    description:
      "Thinks in Python, dreams in SQL, and debugs in their sleep. Builds trading dashboards, APIs, and features for 8ConEdge. Works on front-end tweaks (React, Next, or Vue), scripts data feeds, maintains servers, runs security checks, and automates tasks to streamline trading workflows.",
    key: "IT",
    icon: "/assets/icons/laptop-coding.png",
  },
  {
    title: "ACCOUNTING",
    description:
      "Spreadsheets sing under their fingertips. Keeps ledgers clean while linking PIPs to P&L. Manages daily bookkeeping, tracks costs for events and courses, builds reports management actually reads, and forecasts budgets with precision and yes, macros\u2014making every number count behind the scenes.",
    key: "Accounting",
    icon: "/assets/icons/receipt.png",
  },
  {
    title: "MULTIMEDIA",
    description:
      "Camera roll is 90% B-roll. Shoots, edits, and animates nonstop to make forex visually unforgettable. Cuts short-form content like Reels and YouTube Shorts, adds motion graphics and lower thirds, captures event photos, and designs branded assets that stand out across every feed.",
    key: "Multimedia",
    icon: "/assets/icons/camcorder.png",
  },
];

const ApplicationModal = ({ isOpen, onClose, selectedPosition }) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "+63",
    resumeFile: null,
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

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "phoneNumber") {
      if (!value.startsWith("+63")) {
        processedValue = "+63" + value.replace(/^\+63/, "").replace(/\D/g, "");
      } else {
        processedValue = "+63" + value.substring(3).replace(/\D/g, "");
      }
      if (processedValue.length > 13) {
        processedValue = processedValue.substring(0, 13);
      }
    }

    if (["firstName", "middleName", "lastName"].includes(name)) {
      processedValue = capitalize(value);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, resumeFile: "Only PDF files are allowed" }));
        e.target.value = null;
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resumeFile: "File must be less than 10MB" }));
        e.target.value = null;
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file }));
      if (errors.resumeFile) setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.trim().length < 2) newErrors.firstName = "Please enter your first name";
    if (!formData.lastName || formData.lastName.trim().length < 2) newErrors.lastName = "Please enter your last name";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.address || formData.address.trim().length < 2) newErrors.address = "Please enter your address";
    if (!/^\+63[0-9]{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone must be in format +63XXXXXXXXXX";
    if (!formData.resumeFile) newErrors.resumeFile = "Please upload your resume";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      const fullName = [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" ");

      const payload = new FormData();
      payload.append("access_key", "5f8976e9-6357-4533-bd55-71314277e2f9");
      payload.append("from_name", fullName);
      payload.append("subject", `Internship Application - ${fullName} for ${selectedPosition}`);
      payload.append("name", fullName);
      payload.append("first_name", formData.firstName);
      payload.append("middle_name", formData.middleName);
      payload.append("last_name", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phoneNumber);
      payload.append("address", formData.address);
      payload.append("department", selectedPosition);
      payload.append("form_type", "Internship Application");
      payload.append("attachment", formData.resumeFile);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();

      if (data.success) {
        setResultModal({ show: true, type: "success", message: "Your application has been submitted! We'll review it and get back to you soon." });
        setFormData({ firstName: "", middleName: "", lastName: "", email: "", address: "", phoneNumber: "+63", resumeFile: null });
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
        <div className="apply-result-overlay" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
          <div className={`apply-result-card apply-result-${resultModal.type}`} onClick={(e) => e.stopPropagation()}>
            <button className="apply-result-close" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
              <X size={18} />
            </button>
            {resultModal.type === "success" && (
              <div className="apply-result-confetti">
                {[...Array(8)].map((_, i) => <span key={i} className={`confetti confetti-${i}`} />)}
              </div>
            )}
            <div className={`apply-result-icon apply-result-icon-${resultModal.type}`}>
              {resultModal.type === "success" ? <CheckCircle size={36} /> : <XCircle size={36} />}
            </div>
            <h3 className="apply-result-title">
              {resultModal.type === "success" ? "Application Submitted!" : "Something Went Wrong"}
            </h3>
            <p className="apply-result-message">{resultModal.message}</p>
            <button className="apply-result-btn" onClick={() => { setResultModal({ ...resultModal, show: false }); if (resultModal.type === "success") onClose(); }}>
              {resultModal.type === "success" ? "Got it!" : "Try Again"}
            </button>
          </div>
        </div>
      )}

      {/* Application Modal */}
      <div className="apply-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={`apply-modal ${isDark ? "" : "apply-modal-light"}`}>
          <button className="apply-close" onClick={onClose}><X size={20} /></button>

          {/* Header */}
          <div className="apply-header">
            <div className="apply-header-icon">
              <Briefcase size={26} />
            </div>
            <h2 className="apply-title">Internship Application</h2>
            <div className="apply-position-badge">
              <Users size={14} />
              <span>{selectedPosition} Team</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="apply-form">
            <div className="apply-form-row">
              <div className="apply-field">
                <label className="apply-label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`apply-input ${errors.firstName ? "apply-input-error" : ""}`} placeholder="Juan" required />
                {errors.firstName && <span className="apply-error">{errors.firstName}</span>}
              </div>
              <div className="apply-field">
                <label className="apply-label">Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="apply-input" placeholder="Santos (optional)" />
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-field">
                <label className="apply-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`apply-input ${errors.lastName ? "apply-input-error" : ""}`} placeholder="Dela Cruz" required />
                {errors.lastName && <span className="apply-error">{errors.lastName}</span>}
              </div>
              <div className="apply-field">
                <label className="apply-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`apply-input ${errors.email ? "apply-input-error" : ""}`} placeholder="you@example.com" required />
                {errors.email && <span className="apply-error">{errors.email}</span>}
              </div>
            </div>

            <div className="apply-form-row">
              <div className="apply-field">
                <label className="apply-label">Complete Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`apply-input ${errors.address ? "apply-input-error" : ""}`} placeholder="City, Province" required />
                {errors.address && <span className="apply-error">{errors.address}</span>}
              </div>
              <div className="apply-field">
                <label className="apply-label">Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={`apply-input ${errors.phoneNumber ? "apply-input-error" : ""}`} placeholder="+63XXXXXXXXXX" maxLength={13} required />
                {errors.phoneNumber && <span className="apply-error">{errors.phoneNumber}</span>}
              </div>
            </div>

            <div className="apply-field">
              <label className="apply-label">Resume (PDF only, max 10MB)</label>
              <label className={`apply-upload-zone ${formData.resumeFile ? "has-file" : ""} ${errors.resumeFile ? "apply-input-error" : ""}`} htmlFor="apply-resume-input">
                {formData.resumeFile ? (
                  <>
                    <Upload size={18} className="apply-upload-icon" />
                    <a
                      href={URL.createObjectURL(formData.resumeFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-file-name"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {formData.resumeFile.name}
                    </a>
                    <button
                      type="button"
                      className="apply-file-remove"
                      onClick={(e) => { e.preventDefault(); setFormData((prev) => ({ ...prev, resumeFile: null })); }}
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={18} className="apply-upload-icon" />
                    <span className="apply-upload-text">Click to upload your resume</span>
                    <span className="apply-upload-hint">PDF format, up to 10MB</span>
                  </>
                )}
              </label>
              <input
                id="apply-resume-input"
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                style={{ display: "none" }}
              />
              {errors.resumeFile && <span className="apply-error">{errors.resumeFile}</span>}
            </div>

            <button type="submit" className="apply-submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            <p className="apply-privacy">
              By submitting, you agree to 8Con Academy's privacy policy. Your information is secure and will only be used for internship application purposes.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const InternshipSection = ({
  handleApplyClick,
  showModal,
  selectedPosition,
  handleCloseModal,
}) => (
  <section id="internship" className="section section-internship" style={{ position: "relative" }}>
    <TradingBackground variant={5} />

    <div className="internship-title fade-in-up" style={{ position: "relative", zIndex: 1 }}>
      <h2>INTERNSHIP</h2>
      <p>Join our team and kickstart your career</p>
    </div>

    <div className="intcards-container">
      {internshipRoles.map((role, index) => (
        <div className={`intcard slide-in-right anim-delay-${index + 1}`} key={role.key}>
          <div className="intcontent">
            <div className="intcard-icon">
              {typeof role.icon === "string" ? (
                <img
                  src={role.icon}
                  alt={role.title}
                  style={role.key === "Marketing" ? { width: "45px", height: "45px" } : {}}
                />
              ) : (
                role.icon
              )}
            </div>
            <h3 className="intcard-title">{role.title}</h3>
            <p className="intcard-description">{role.description}</p>
            <div className="intbutton-container">
              <button className="intapply-btn" onClick={() => handleApplyClick(role.key)}>
                APPLY NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <ApplicationModal
      isOpen={showModal}
      onClose={handleCloseModal}
      selectedPosition={selectedPosition}
    />
  </section>
);

export default InternshipSection;
