import React from "react";
import { Paperclip, X } from "lucide-react";

const InternshipSection = ({
  handleApplyClick,
  handleCloseModal,
  handleSubmit,
  handleResumeChange,
  showModal,
  selectedPosition,
  firstName,
  middleName,
  lastName,
  email,
  address,
  phoneNumber,
  resumeFile,
  setFirstName,
  setMiddleName,
  setLastName,
  setEmail,
  setAddress,
  setPhoneNumber,
  setResumeFile,
  capitalizeFirstLetter,
}) => {
  const internshipRoles = [
    {
      title: "MARKETING",
      description:
        'Brainstorms hooks faster than TikTok trends\u2014driving campaigns, growing communities, and turning scrollers into confident traders. Handles copywriting, social posts, email funnels, light ad tweaks, and community engagement on Discord and Facebook. Checks the data to answer: \u201CDid that reel convert?\u201D',
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

  return (
    <section id="internship" className="section section-internship">
      <div className="internship-title fade-in">
        <h2>INTERNSHIP</h2>
        <p>Join our team and kickstart your career</p>
      </div>

      <div className="intcards-container">
        {internshipRoles.map((role) => {
          return (
            <div className="intcard fade-in" key={role.key}>
              <div className="intcontent">
                <div className="intcard-icon">
                  {typeof role.icon === "string" ? (
                    <img src={role.icon} alt={role.title} style={role.key === "Marketing" ? { width: "45px", height: "45px" } : {}} />
                  ) : (
                    role.icon
                  )}
                </div>
                <h3 className="intcard-title">{role.title}</h3>
                <p className="intcard-description">{role.description}</p>
                <div className="intbutton-container">
                  <button
                    className="intapply-btn"
                    onClick={() => handleApplyClick(role.key)}
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" id="applicationModal">
          <div className="modal-dialog">
            <h2>Apply for {selectedPosition} Team</h2>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="modal-body">
              <div className="application-form-wrapper">
                <div className="application-form">
                  {/* First Name */}
                  <div className="form-field">
                    <label className="field-label">First Name</label>
                    <input
                      className="form-input"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) =>
                        setFirstName(capitalizeFirstLetter(e.target.value))
                      }
                      required
                    />
                  </div>

                  {/* Middle Name */}
                  <div className="form-field">
                    <label className="field-label">Middle Name</label>
                    <input
                      className="form-input"
                      type="text"
                      name="middleName"
                      value={middleName}
                      onChange={(e) =>
                        setMiddleName(capitalizeFirstLetter(e.target.value))
                      }
                    />
                  </div>

                  {/* Last Name */}
                  <div className="form-field">
                    <label className="field-label">Last Name</label>
                    <input
                      className="form-input"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) =>
                        setLastName(capitalizeFirstLetter(e.target.value))
                      }
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="field-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="form-field">
                    <label className="field-label">Complete Address</label>
                    <input
                      className="form-input"
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-field">
                    <label className="field-label" htmlFor="phoneNumber">
                      Phone number:
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onFocus={() => {
                        if (phoneNumber === "") setPhoneNumber("+639");
                      }}
                      onChange={(e) => {
                        const input = e.target.value;
                        const digitsOnly = input.replace(/\D/g, "");
                        if (!digitsOnly.startsWith("639")) {
                          setPhoneNumber("+639");
                          return;
                        }
                        const rest = digitsOnly.slice(3, 13);
                        setPhoneNumber(`+639${rest}`);
                      }}
                      placeholder="+639XXXXXXXXX"
                      title="Enter a valid Philippine phone number"
                      maxLength={13}
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="form-field">
                    <label className="field-label" htmlFor="resumeFile">
                      Resume (PDF only, max 10MB):
                    </label>
                    <div className="upload-resume">
                      <label htmlFor="resumeFile" className="upload-button">
                        <Paperclip className="icon" size={16} />
                        <span className="upload-text">Upload File Here</span>
                      </label>
                      <input
                        id="resumeFile"
                        name="resumeFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleResumeChange}
                        style={{ display: "none" }}
                      />
                      {resumeFile && (
                        <div className="file-actions">
                          <a
                            href={URL.createObjectURL(resumeFile)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-name clickable"
                          >
                            {resumeFile.name}
                          </a>
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => setResumeFile(null)}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={handleSubmit} className="intapply-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InternshipSection;
