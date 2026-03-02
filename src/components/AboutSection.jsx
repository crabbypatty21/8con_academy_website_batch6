import React from "react";
import ScrollLink from "./ScrollLink"; // Ensure this component handles smooth scroll or routing
import { MoveRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h1 className="aboutUsTitle fade-in">About Us</h1>
          <p className="subTitle fade-in">Confluence is Confidence</p>
        </div>

        <div className="content-grid">
          <div className="image-container fade-in">
            <img
              src="/assets/images/aboutus.jpg"
              alt="8Con Logo"
              className="aboutus-logo-img"
            />
          </div>
          <div className="text-content fade-in">
            <h3 className="whoWeAre fade-in">WHO WE ARE</h3>
            <h2 className="weAre fade-in">8Con Academy</h2>
            <p className="weAreParagraph">
              <span className="text-green-highlight fade-in">8CON Academy</span>{" "}
              is a pioneering financial education institution in Meycauayan,
              Bulacan, Philippines. We specialize in forex trading education
              with a mission to make{" "}
              <span className="text-red-highlight fade-in">Forex Trading</span>{" "}
              knowledge accessible, practical, and life-changing for every
              Filipino household. Founded in 2021, we have quickly become a
              trusted center for both aspiring and experienced traders, offering
              a unique blend of theoretical learning and hands-on application.
            </p>

            <div
              id="page-content"
              style={{ display: "flex", justifyContent: "left" }}
            >
              <ScrollLink
                to="/aboutus"
                className="intapply-btn fade-in"
                style={{ display: "flex", alignItems: "center" }}
                onClick={(e) => e.currentTarget.blur()}
              >
                Read More
                <MoveRight size={18} style={{ marginLeft: "8px" }} />
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`.about-section {
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Center horizontally */
  justify-content: center; /* ✅ Optional: center vertically */
  min-height: 100vh;
  margin: 0 auto;
  background: #131B21;
  position: relative;
  overflow: hidden;
  padding: 60px 40px 40px;
}
.about-header {
  text-align: center;
}
.about-container {
  margin: 0 auto;
  max-width: 1200px;
}

.aboutUsTitle {
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  justify-self: center;
  margin-bottom: 20px;
  background: #ffffff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}
.aboutus-logo {
  display: left;
  align-items: center;
  justify-content: center;
}

.aboutus-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.aboutus-logo-img:hover {
  transform: scale(1.02); /* Slight zoom on hover */
}

.subTitle {
  text-align: center;
  justify-self: center;
  font-size: 1.3rem;
  color: #ffffff;
  font-weight: 300;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  align-items: center; /* vertical centering */
  gap: 40px;
}

.text-content {
  text-align: left;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.whoWeAre {
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;
  text-align: left;
}

.weAre {
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 25px;
  line-height: 1.2;
  text-align: left;
}

.weAreParagraph {
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 35px;
  text-align: justify;
}

.image-container {
  max-width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  justify-self: center;
}

.read-more-btn {
  background: linear-gradient(45deg, #c31d30 0%, black, #395537 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.text-content .read-more-btn {
  margin: 0; /* No auto margin on desktop */
  align-self: flex-start; /* Align to start on desktop */
  display: inline-block;
  width: auto;
}

.read-more-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.read-more-btn:hover::before {
  left: 100%;
}

.read-more-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.read-more-btn:active {
  transform: translateY(-1px);
}

.background {
  width: 100%;
  height: 250px;
}@media (max-width: 1024px) {
  .about-section {
    padding: 50px 30px 30px;
  }

  .about-container {
    margin: 0 20px;
  }

  .content-grid {
    gap: 30px;
  }

  .aboutUsTitle {
    font-size: 3rem;
  }

  .weAre {
    font-size: 2.5rem;
  }

  .weAreParagraph {
    font-size: 1rem;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .about-section {
    padding: 40px 20px 30px;
    min-height: auto; /* Allow natural height on mobile */
  }

  .about-container {
    margin: 0 10px;
  }

  .content-grid {
    grid-template-columns: 1fr; /* Stack vertically */
    gap: 30px;
    text-align: center; /* Center content on mobile */
  }

  .text-content {
    text-align: center; /* Center text on mobile */
    padding-right: 0; /* Remove right padding */
    order: 2; /* Put text below image */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center all content including button */
  }

  .image-container {
    order: 1; /* Put image above text */
    max-height: 400px;
    margin: 0 auto; /* Center the image container */
    max-width: 400px; /* Limit image width on mobile */
  }

  .aboutUsTitle {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  .subTitle {
    font-size: 1.1rem;
    padding: 0 20px; /* Add horizontal padding */
  }

  .text-content {
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .whoWeAre {
    font-size: 0.8rem;
    text-align: center;
  }

  .weAre {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 20px;
  }

  .weAreParagraph {
    font-size: 1rem;
    padding: 0 10px;
    margin-bottom: 25px;
  }

  .read-more-btn {
    margin: 0 auto; /* Center the button */
    display: block;
    width: fit-content; /* Ensure button only takes needed width */
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .about-section {
    padding: 30px 15px 20px;
  }

  .about-container {
    margin: 0 5px;
  }

  .content-grid {
    gap: 20px;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center everything on mobile */
  }

  .image-container {
    max-height: 300px;
    max-width: 300px;
    border-radius: 15px; /* Slightly smaller border radius */
  }

  .aboutUsTitle {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .subTitle {
    font-size: 1rem;
    padding: 0 15px;
  }

  .whoWeAre {
    font-size: 0.7rem;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .weAre {
    font-size: 1.8rem;
    line-height: 1.1;
    margin-bottom: 15px;
  }

  .weAreParagraph {
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 0 5px;
    margin-bottom: 20px;
  }

  .text-content .read-more-btn {
    padding: 10px 25px;
    font-size: 0.9rem;
    margin: 0 auto; /* Center the button */
    align-self: center; /* Override desktop alignment */
    display: block;
    width: fit-content; /* Ensure button only takes needed width */
  }
}

/* Extra small screens */
@media (max-width: 320px) {
  .about-section {
    padding: 25px 10px 15px;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center everything on mobile */
  }

  .image-container {
    max-height: 250px;
    max-width: 280px;
    border-radius: 12px;
  }

  .aboutUsTitle {
    font-size: 1.7rem;
  }

  .subTitle {
    font-size: 0.9rem;
    padding: 0 10px;
  }

  .weAre {
    font-size: 1.5rem;
  }

  .weAreParagraph {
    font-size: 0.85rem;
    padding: 0;
  }

  .text-content .read-more-btn {
    padding: 10px 25px;
    font-size: 0.9rem;
    margin: 0 auto; /* Center the button */
    align-self: center; /* Override desktop alignment */
    display: block;
    width: fit-content; /* Ensure button only takes needed width */
  }
}@media (prefers-reduced-motion: reduce) {
  .aboutus-logo-img,
  .image-container,
  .text-content * {
    animation: none;
    transition: none;
  }

  .aboutus-logo-img:hover,
  .image-container:hover {
    transform: none;
  }
}

/* Focus states for better accessibility */
.read-more-btn:focus-visible {
  outline: 2px solid #0edb61;
  outline-offset: 4px;
}@media (prefers-contrast: high) {
  .about-section {
    background: #000000;
  }

  .aboutUsTitle,
  .subTitle,
  .whoWeAre,
  .weAre,
  .weAreParagraph {
    color: #ffffff;
  }

  .image-container {
    border: 2px solid #ffffff;
  }
}@media (max-width: 768px) {
  @media (max-width: 768px) {

  .about-main-title {
    font-size: 2.5rem;
  }
}`}
      </style>
    </section>
  );
};

export default AboutSection;
