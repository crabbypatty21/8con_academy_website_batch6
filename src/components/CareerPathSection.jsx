import React from "react";
import "../ConponentCSS/CareerPath.css";
import TradingBackground from "./TradingBackground.jsx";

const CareerPathSection = () => {
  const careerPaths = [
    {
      title: "FUNDED TRADER",
      description:
        "Trade big. Risk none. Show consistency and confidence in your trading plan to qualify for real capital. Pass internal reviews, psychology evaluation, and mock account tests. Mentorship included—no fluff, no random signups.",
      borderColor: "#39CC2F",
    },
    {
      title: "WORKSHOP SPEAKER",
      description:
        "You traded with purpose, now you teach with it. As a Workshop Speaker, lead webinars, represent 8Con in events, and share your story. Qualification: Journal excellence, strong communication, and final interview.",
      borderColor: "#F51616",
    },
    {
      title: "FOREX INSTRUCTOR",
      description:
        "You learned with Confluence, now you teach it. As a certified Forex Coach, lead classes, mentor juniors, and guide new traders. Qualification: core competency completion, coaching evaluation, and a mock teaching session.",
      borderColor: "#39CC2F",
    },
    {
      title: "8CON FRANCHISEE",
      description:
        "Your own trading hub—powered by 8Con. Franchise opportunities are open to homegrown traders who embody our system, values, and standards. Qualification: full course graduate, business mentorship track, and completed operations training.",
      borderColor: "#F51616",
    },
  ];

  return (
    <section id="careerpath" className="section section-careerpath" style={{ position: "relative" }}>
      <TradingBackground variant={4} />
      <div className="careerpath-title fade-in-up" style={{ position: "relative", zIndex: 1 }}>
        <h2>CAREER PATH</h2>
        <div className="careerpath-underline"></div>
        <p>From learner to leader, your forex journey starts here.</p>
      </div>

      <div className="careerpath-cards">
        {careerPaths.map((path, index) => (
          <div className={`career-card scale-up anim-delay-${index + 1}`} key={index}>
            <div
              className="career-card-topline"
              style={{ background: path.borderColor }}
            ></div>
            <div className="career-content">
              <h3 className="career-title">{path.title}</h3>
              <p className="career-description">{path.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerPathSection;
