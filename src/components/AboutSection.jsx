import React from "react";
import ScrollLink from "./ScrollLink";
import { MoveRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const AboutSection = () => {
  const { isDark } = useTheme();
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h1 className="aboutUsTitle fade-in">ABOUT US</h1>
          <p className="subTitle fade-in" style={{ color: isDark ? "#ffffff" : "#373737" }}>Confluence is Confidence</p>
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
            <h2 className="weAre fade-in">8CON <span style={{ color: "#39CC2F" }}>ACADEMY</span></h2>
            <p className="weAreParagraph">
              <span className="text-green-highlight fade-in" style={{ color: "#39CC2F" }}>8CON Academy</span>{" "}
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
                className="about-readmore-btn fade-in"
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
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  background: var(--bg-primary);
  box-shadow: none;
  position: relative;
  overflow: hidden;
  padding: 100px 40px 40px;
  box-sizing: border-box;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}

.aboutUsTitle {
  font-family: "Unbounded", sans-serif;
  font-weight: 800;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.2;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 10px;
  -webkit-text-fill-color: var(--text-primary);
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
}

.subTitle {
  font-family: "Geist Sans", sans-serif;
  font-weight: 400;
  font-size: clamp(16px, 1.5vw, 22px);
  line-height: 1.3;
  color: #373737;
  text-align: center;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
  align-items: start;
  gap: 50px;
}

.image-container {
  max-width: 100%;
  height: auto;
  max-height: 450px;
  border-radius: 3px;
  overflow: hidden;
  justify-self: center;
}

.aboutus-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.aboutus-logo-img:hover {
  transform: scale(1.02);
}

.text-content {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.whoWeAre {
  font-family: "Geist Sans", sans-serif;
  font-weight: 700;
  font-size: clamp(14px, 1.5vw, 20px);
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.weAre {
  font-family: "Unbounded", sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 3.5vw, 44px);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 25px;
  text-align: left;
}

.weAreParagraph {
  font-family: "Geist Sans", sans-serif;
  font-weight: 600;
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 30px;
  text-align: justify;
}

.about-readmore-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #F95545;
  color: #FFFFFF;
  border: none;
  width: 190px;
  height: 48px;
  border-radius: 40px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 48px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.about-readmore-btn:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

/* Large desktop */
@media (max-width: 1280px) {
  .aboutUsTitle {
    font-size: 56px;
    line-height: 70px;
  }

  .subTitle {
    font-size: 24px;
  }

  .weAre {
    font-size: 50px;
    line-height: 45px;
  }

  .weAreParagraph {
    font-size: 22px;
    line-height: 34px;
  }

  .whoWeAre {
    font-size: 26px;
  }
}

@media (max-width: 1024px) {
  .about-section {
    padding: 60px 30px 40px;
  }

  .aboutUsTitle {
    font-size: 48px;
    line-height: 60px;
  }

  .subTitle {
    font-size: 22px;
  }

  .weAre {
    font-size: 42px;
    line-height: 40px;
    margin-bottom: 30px;
  }

  .whoWeAre {
    font-size: 22px;
  }

  .weAreParagraph {
    font-size: 18px;
    line-height: 30px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .about-section {
    padding: 40px 20px 30px;
    height: 100vh;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .text-content {
    text-align: center;
    padding-right: 0;
    order: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    order: 1;
    max-height: 400px;
    margin: 0 auto;
    max-width: 500px;
  }

  .aboutUsTitle {
    font-size: 40px;
    line-height: 50px;
  }

  .subTitle {
    font-size: 20px;
  }

  .whoWeAre {
    font-size: 20px;
    text-align: center;
  }

  .weAre {
    font-size: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 25px;
  }

  .weAreParagraph {
    font-size: 16px;
    line-height: 28px;
    padding: 0 10px;
    text-align: center;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .about-section {
    padding: 30px 15px 20px;
  }

  .image-container {
    max-height: 300px;
    max-width: 300px;
  }

  .aboutUsTitle {
    font-size: 32px;
    line-height: 40px;
  }

  .subTitle {
    font-size: 16px;
  }

  .whoWeAre {
    font-size: 16px;
    letter-spacing: 1px;
  }

  .weAre {
    font-size: 28px;
    line-height: 30px;
    margin-bottom: 20px;
  }

  .weAreParagraph {
    font-size: 14px;
    line-height: 24px;
  }

  .about-readmore-btn {
    padding: 12px 30px;
    font-size: 0.9rem;
  }
}

/* Extra small screens */
@media (max-width: 320px) {
  .about-section {
    padding: 25px 10px 15px;
  }

  .image-container {
    max-height: 250px;
    max-width: 280px;
    border-radius: 3px;
  }

  .aboutUsTitle {
    font-size: 26px;
    line-height: 34px;
  }

  .subTitle {
    font-size: 14px;
  }

  .weAre {
    font-size: 22px;
    line-height: 26px;
  }

  .weAreParagraph {
    font-size: 13px;
    line-height: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
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

.about-readmore-btn:focus-visible {
  outline: 2px solid #F95545;
  outline-offset: 4px;
}`}
      </style>
    </section>
  );
};

export default AboutSection;
