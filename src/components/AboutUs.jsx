import React, { useState, useEffect } from "react";
import ScrollUp from "./ScrollUp";
import Footer from "./Footer";
import { Menu, X, Goal, Eye, Atom, HeartHandshake } from "lucide-react";
import "../App.css";
import ScrollLink from "./ScrollLink";
const AboutUs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fade-in animation on scroll
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
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/#home" className="logo">
            <img
              src="/assets/logo/8con Academy Logo White.png"
              alt="8Con Academy Logo"
              className="logo-img"
            />
          </a>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          {/* Desktop Navigation */}

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

        {/* Mobile menu */}
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

            {/* Brands Dropdown */}
          </nav>
        )}
      </header>

      {/* Main content - Added padding-top to account for fixed header */}
      <main className="about-us-main">
        {/* Hero Section with Background Image */}
        <section className="about-us-hero">
          <div className="about-us-hero-overlay">
            <div className="about-us-image-container">
              <img
                src="/assets/images/aboutus2.jpg"
                alt="8Con Academy Logo"
                className="header-AboutUs"
              />
            </div>
          </div>
        </section>
        <section>
          {/* Content Container */}
          <div className="about-us-content">
            {/* Vision and Mission Section */}
            <div className="about-us-grid">
              {/* Our Vision */}
              <div className="about-us-main-title">
                <h1>Who is 8Con Academy?</h1>
              </div>

              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in">
                    8CON Academy: Empowering Filipino Families through Financial
                    Education
                  </h2>
                </div>
                <p className="about-us-card-text justified-text fade-in">
                  <span className="text-red-highlight">8Con Academy</span> is a
                  premier trading and financial education institution based in
                  Meycauayan, Bulacan. We specialize in{" "}
                  <span className="text-red-highlight">
                    Forex Derivative Education
                  </span>
                  , empowering aspiring traders through structured,
                  confluence-based strategies rooted in discipline, real-world
                  practice, and continuous coaching.
                </p>
                <br />
                <p className="fade-in">
                  At 8Con, we believe that Confluence Builds Confidence. Our
                  name, <span className="text-red-highlight">8Con</span>{" "}
                  reflects the 8 key confluences traders must master to make
                  sound, profitable decisions, a philosophy that runs through
                  every program we offer.
                </p>

                <h3 className="about-us-card-subtitle fade-in">Our Services</h3>
                <p className="about-us-card-text justified-text fade-in">
                  <strong>Core-brands:</strong>
                </p>
                <ul className="about-us-card-text justified-list fade-in">
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>Forex Derivative Trading Level II:</strong> An
                      Advanced Course designed to equip students with
                      comprehensive knowledge and hands-on skills in{" "}
                      <span className="text-red-highlight">Forex Trading </span>
                      to become profitable traders. decisions.
                    </p>
                  </li>
                </ul>
                <p className="about-us-card-text justified-text fade-in">
                  <strong>Sub-brands:</strong>
                </p>
                <ul className="about-us-card-text justified-list sub-brand-grid fade-in">
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConEdge:</strong> Proprietary forex scanner for
                      derivative traders. Provides market sentiment, technical
                      signals, and fundamental analysis in one platform,
                      empowering informed trading decisions.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConLift:</strong> Scholarship and community
                      upliftment arm offering free education, OJT placements,
                      and the "Enrollment to Employment" program. Focused on
                      transforming lives through inclusive learning
                      opportunities.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConStruct:</strong> Offers data analytics,
                      statistical treatment, and research consulting for
                      students, academics, and businesses led by Doc May
                      Francisco. Ideal for theses, dissertations, market
                      research, and business data strategies.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConCise:</strong> Comprehensive review center for
                      LET, Criminology, Civil Service, and College Entrance
                      Exams. Combines academic content, mock exams, and coaching
                      for exam success.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConVerse:</strong> Language proficiency program
                      designed for IELTS, TOEFL, and other English
                      certifications. Supports global career and migration plans
                      through effective communication skills training.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConNect:</strong> Business networking community
                      promoting collaboration, referrals, and entrepreneurial
                      growth. Hosts pitching events, coaching, and partnerships
                      for SMEs and local startups.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConPact:</strong> CSR and LGU partnership program
                      supporting education, livelihood, and employment.
                      Implements LGU-aligned training, scholarships, and job
                      placement initiatives.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConQuest:</strong> Academic coaching and
                      professional mentoring focused on thesis guidance, career
                      planning, and entrepreneurship development. Helps students
                      and professionals achieve academic and career goals with
                      expert support.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConSpace:</strong> A co-working and virtual
                      office hub for freelancers, students, and startups. Offers
                      flexible desk rentals, virtual business registration, and
                      community workshops in a productivity-focused environment.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <strong>8ConSult:</strong> Business development and
                      startup advisory service led by Sir Nigel Santos. Covers
                      business model coaching, sales strategy, growth plans, and
                      investor pitch preparation. Advisory
                    </p>
                  </li>
                </ul>

                <h3 className="about-us-card-subtitle">What Makes Us Unique</h3>
                <p className="about-us-card-text justified-text fade-in">
                  Confluence-Based Strategy Model
                </p>
                <br />
                <p className="fade-in">
                  Our curriculum is built on a multi-layered framework designed
                  to sharpen decision-making and reinforce trading discipline.
                  Rather than relying on just one method or signal, we teach
                  students how to identify aligned market factors or what we
                  call confluences before taking action.
                </p>
                <br />
                <p className="fade-in">
                  This approach helps them avoid guesswork, manage risk better,
                  and execute trades with confidence and clarity.
                </p>
                <br />
                <p className="fade-in">
                  <strong>
                    Internship with Real Value: Interns don’t just observe they
                    evolve. Each intern receives:
                  </strong>
                </p>
                <ul className="about-us-card-text justified-list fade-in">
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      A Full Scholarship covering Basic to Common Competency.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">Thesis & Dissertation Coaching.</p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">1-on-1 Career Mentorship</p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      Extended Support After Graduation: Growth doesn’t stop at
                      graduation. Our Student Satisfactory Program gives
                      qualified graduates an extra month of access to live
                      training, core modules, and mentorship, totally free.
                      Whether they need confidence, clarity, or a second wind,
                      we’ve got their back.
                    </p>
                  </li>
                </ul>
                <br />
                <p className="fade-in">
                  <strong>8ConEdge: Proprietary Market Scanner</strong>
                </p>
                <br />
                <p className="fade-in">
                  We’ve developed 8ConEdge, our in-house market scanning tool
                  built exclusively for 8Con traders and students.
                </p>
                <br />
                <p className="fade-in">
                  Designed to support strategic decision-making, it streamlines
                  key market data into one intuitive dashboard giving users a
                  smarter, more structured view of the market.
                </p>
                <br />
                <p className="fade-in">
                  No hype, no clutter, just a system that speaks the same
                  language we teach: confluence, structure, and confidence.
                </p>
                <br />
                <p className="fade-in">
                  Because at 8Con, even our tech is trained to think like a
                  trader.
                </p>
                <h3 className="about-us-card-subtitle fade-in">
                  Community Engagement
                </h3>
                <ul className="about-us-card-text justified-list fade-in">
                  <p className="about-us-card-text justified-text fade-in">
                    8Con Academy fosters an environment where learning continues
                    beyond the classroom.
                  </p>
                  <p className="about-us-card-text justified-text fade-in">
                    <strong>We actively build connections through:</strong>
                  </p>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      Campus workshops and speaking invitations.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      Free public orientations and trading webinars.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">Live fund management challenges.</p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      Our graduates stay involved, often returning as mentors,
                      speakers, or collaborators. It's a shared journey built on
                      growth, support, and accountability.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <Eye
                    size={32}
                    style={{ color: "#ff1f2c" }}
                    className="about-us-card-icon"
                  />
                  <h2 className="about-us-card-title fade-in">Our Vision</h2>
                </div>
                <p className="about-us-card-text justified-text fade-in fade-in">
                  To become the most trusted and recognized Forex education hub
                  in the Philippines, producing a ripple effect of empowered
                  traders, impactful coaches, and ethical fund managers who
                  create lasting value in communities here and abroad.
                </p>
              </div>

              {/* Our Mission */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <Goal
                    size={32}
                    style={{ color: "#ff1f2c" }}
                    className="about-us-card-icon"
                  />
                  <h2 className="about-us-card-title fade-in">Our Mission</h2>
                </div>
                <p className="about-us-card-text justified-text fade-in fade-in">
                  To raise disciplined, confident, and financially literate
                  Filipino traders through structured education,
                  confluence-based strategies, and career-focused coaching,
                  supported by data-driven tools and real-world application. We
                  are committed to creating a profitable trader in every
                  Filipino household, one person at a time.
                </p>
              </div>
            </div>

            {/* Core Values and CSR Section */}
            <div className="about-us-grid">
              {/* Core Values */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <Atom
                    size={32}
                    style={{ color: "#ff1f2c" }}
                    className="about-us-card-icon"
                  />
                  <h2 className="about-us-card-title fade-in">Core Values</h2>
                </div>
                <div className="about-us-card-section">
                  <ul className="about-us-card-text justified-list fade-in">
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <strong>Empowering Lives Through Education:</strong> We
                        are committed to transforming lives by equipping
                        individuals with the financial literacy and trading
                        expertise they need to achieve independence, resilience,
                        and long-term success. Education is the foundation for
                        creating opportunities and building a better future for
                        individuals and communities alike.
                      </p>
                    </li>
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <strong>Innovating for Lasting Impact:</strong> We
                        embrace innovation as a driver of excellence, leveraging
                        cutting-edge technology and adaptive strategies to
                        deliver education that creates enduring value. By
                        staying ahead of industry trends, we ensure our students
                        and stakeholders are prepared for the challenges of
                        tomorrow.
                      </p>
                    </li>
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <strong>
                          Strength in Collaboration and Inclusivity:
                        </strong>{" "}
                        We thrive through partnerships, uniting diverse
                        perspectives to create a supportive ecosystem where
                        everyone can succeed. Together, we empower students,
                        trainers, and communities, fostering a culture of mutual
                        growth, inclusivity, and shared achievement.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Corporate Social Responsibility Initiatives */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <HeartHandshake
                    size={32}
                    style={{ color: "#ff1f2c" }}
                    className="about-us-card-icon"
                  />
                  <h2 className="about-us-card-title fade-in">
                    Corporate Social Responsibility
                  </h2>
                </div>
                <div className="about-us-card-section">
                  <p
                    className="about-us-card-text justified-text fade-in fade-in"
                    style={{
                      textAlign: "center", // center the text inside
                      display: "flex", // allow alignment control
                      justifyContent: "center", // horizontal centering
                      alignItems: "center", // vertical centering (if needed in a container)
                    }}
                  >
                    We believe that trading is a tool for transformation.
                  </p>
                  <p className="about-us-card-text justified-text fade-in fade-in">
                    <strong>That’s why we support:</strong>
                  </p>
                  <ul className="about-us-card-text justified-list fade-in">
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        Free educational outreach in public universities and
                        barangays.
                      </p>
                    </li>
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        Scholarships for marginalized but talented youth.
                      </p>
                    </li>
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        Mental health and psychology talks for traders.
                      </p>
                    </li>
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        Community business mentorships for aspiring
                        entrepreneurs.
                      </p>
                    </li>
                  </ul>
                  <p className="about-us-card-text justified-text fade-in fade-in">
                    Our commitment is to multiply impact, one student, one
                    family, and one community at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <style>{`
          .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: transparent; /* transparent initially */
  padding: 10px 5%;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  transition: background-color 0.8s ease, box-shadow 0.8s ease;
}

.header.scrolled {
  background-color: rgb(0, 0, 0); /* optional slight bg */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5%;
  padding-left: 5%;
}

.header-font {
  font-family: "Montserrat", sans-serif;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-placeholder {
  height: 40px;
  width: 128px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: rgb(255, 255, 255);
  padding: 0px 15px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 10%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff9d9f, #ff1f2c);
  transition: width 0.3s ease;
  transform: translateX(0%);
}

.nav-link:hover {
  color: #ff1f2c;
  transform: translateY(-5px);
}

.nav-link:hover::before {
  width: 80%;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 5px 0;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.dropdown-content a,
.dropdown-link {
  display: block;
  padding: 10px 15px;
  color: #121411;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
}

.dropdown-content a:hover,
.dropdown-link:hover {
  background-color: white;
  color: #ff1f2c;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 60px; /* adjust to match header height */
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  text-decoration: none;
  color: #121411;
  border-bottom: 1px solid #f3f4f6;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}

.mobile-nav-link:hover {
  background-color: #f9fafb;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: white;
}

.mobile-dropdown {
  position: relative;
}

.mobile-dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mobile-dropdown-content {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  margin: 0.5rem 1rem;
}

.mobile-nav-sublink {
  display: block;
  padding: 0.75rem 1rem;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-sublink:last-child {
  border-bottom: none;
}

.mobile-nav-sublink:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* ==========================================
   MOBILE NAVIGATION - BLURRY TRANSPARENT DESIGN
   ========================================== */

/* Header adjustments for mobile */
@media (max-width: 1024px) {
  .header {
    transition: all 0.3s ease;
  }

  .header.scrolled {
    background: #000000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  /* Mobile navigation menu */
  .mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #000000;
    z-index: 998;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile navigation links */
  .mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  /* Hover effect for mobile links */
  .mobile-nav-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #0edb61;
    padding-left: 32px;
    border-left: 3px solid #0edb61;
  }

  .mobile-nav-link:hover::before {
    left: 100%;
  }

  .mobile-nav-link:last-child {
    border-bottom: none;
  }

  /* Active/pressed state */
  .mobile-nav-link:active {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(0.98);
  }

  /* Logo adjustments for mobile */
  .logo-img {
    height: 35px;
    transition: all 0.3s ease;
  }

  /* Header container adjustments */
  .header-container {
    padding-right: 20px;
    padding-left: 20px;
  }
}

/* ==========================================
   TABLET SPECIFIC ADJUSTMENTS
   ========================================== */
@media (max-width: 1024px) and (min-width: 769px) {
  .mobile-nav-link {
    padding: 18px 32px;
    font-size: 17px;
  }

  .logo-img {
    height: 38px;
  }
}

/* ==========================================
   MOBILE LARGE (768px and below)
   ========================================== */
@media (max-width: 768px) {
  .header {
    padding: 8px 4%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.85);
  }

  .mobile-nav-link {
    padding: 15px 20px;
    font-size: 15px;
  }

  .logo-img {
    height: 32px;
  }

  .header-container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

/* ==========================================
   MOBILE MEDIUM (480px and below)
   ========================================== */
@media (max-width: 480px) {
  .header {
    padding: 6px 3%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  .mobile-nav-link {
    padding: 14px 18px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  .mobile-menu-toggle {
    padding: 6px;
    font-size: 16px;
  }

  .logo-img {
    height: 28px;
  }

  .header-container {
    padding-right: 12px;
    padding-left: 12px;
  }
}

/* ==========================================
   MOBILE SMALL (375px and below)
   ========================================== */
@media (max-width: 375px) {
  .header {
    padding: 5px 2%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.92);
  }

  .mobile-nav-link {
    padding: 12px 16px;
    font-size: 13px;
  }

  .mobile-menu-toggle {
    padding: 5px;
    font-size: 15px;
  }

  .logo-img {
    height: 26px;
  }

  .header-container {
    padding-right: 10px;
    padding-left: 10px;
  }
}

/* ==========================================
   MOBILE EXTRA SMALL (320px and below)
   ========================================== */
@media (max-width: 320px) {
  .header {
    padding: 4px 2%;
  }

  .mobile-nav {
    background: rgba(0, 0, 0, 0.95);
  }

  .mobile-nav-link {
    padding: 11px 14px;
    font-size: 12px;
  }

  .mobile-menu-toggle {
    padding: 4px;
    font-size: 14px;
  }

  .logo-img {
    height: 24px;
  }

  .header-container {
    padding-right: 8px;
    padding-left: 8px;
  }
}

/* ==========================================
   ADDITIONAL ENHANCEMENTS
   ========================================== */

/* Smooth scrolling when clicking mobile nav links */
@media (max-width: 1024px) {
  html {
    scroll-behavior: smooth;
  }

  /* Add a subtle glow effect to the mobile menu */
  .mobile-nav::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 219, 97, 0.5),
      transparent
    );
    animation: shimmerLine 3s ease-in-out infinite;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Focus states for accessibility */
  .mobile-nav-link:focus-visible {
    outline: 2px solid #0edb61;
    outline-offset: -2px;
    background: rgba(14, 219, 97, 0.1);
  }

  /* Improved touch targets */
  .mobile-menu-toggle {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-link {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}

/* ==========================================
   DARK MODE COMPATIBILITY
   ========================================== */
@media (prefers-color-scheme: dark) and (max-width: 1024px) {
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    border-top-color: rgba(255, 255, 255, 0.15);
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }

  .mobile-nav-link {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
}

/* ==========================================
   REDUCED MOTION ACCESSIBILITY
   ========================================== */
@media (prefers-reduced-motion: reduce) and (max-width: 1024px) {
  .mobile-nav {
    animation: none;
  }

  .mobile-nav-link::before {
    transition: none;
  }

  .mobile-nav-link:hover::before {
    left: 0;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.5;
    }
  }
}

/* ==========================================
   ADDITIONAL ENHANCEMENTS
   ========================================== */

/* Smooth scrolling when clicking mobile nav links */
@media (max-width: 1024px) {
  html {
    scroll-behavior: smooth;
  }

  /* Add a subtle glow effect to the mobile menu */
  .mobile-nav::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 219, 97, 0.5),
      transparent
    );
    animation: shimmerLine 3s ease-in-out infinite;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }

  /* Focus states for accessibility */
  .mobile-nav-link:focus-visible {
    outline: 2px solid #0edb61;
    outline-offset: -2px;
    background: rgba(14, 219, 97, 0.1);
  }

  /* Improved touch targets */
  .mobile-menu-toggle {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-nav-link {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}

/* ==========================================
   DARK MODE COMPATIBILITY
   ========================================== */
@media (prefers-color-scheme: dark) and (max-width: 1024px) {
  .mobile-nav {
    background: rgba(0, 0, 0, 0.9);
    border-top-color: rgba(255, 255, 255, 0.15);
    border-bottom-color: rgba(255, 255, 255, 0.15);
  }

  .mobile-nav-link {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }
}

/* ==========================================
   REDUCED MOTION ACCESSIBILITY
   ========================================== */
@media (prefers-reduced-motion: reduce) and (max-width: 1024px) {
  .mobile-nav {
    animation: none;
  }

  .mobile-nav-link::before {
    transition: none;
  }

  .mobile-nav-link:hover::before {
    left: 0;
  }

  @keyframes shimmerLine {
    0%,
    100% {
      opacity: 0.5;
    }
  }
}
.header-AboutUs {
  background-color: transparent; /* fully transparent */
  backdrop-filter: blur(10px); /* optional: adds blur effect behind */
  -webkit-backdrop-filter: blur(10px); /* for Safari */
  box-shadow: none; /* remove shadow if not needed */
  position: sticky;
  top: 0;
  z-index: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
}

.header-AboutUs.scrolled {
  background-color: rgba(0, 0, 0, 0.5); /* Dark semi-transparent */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* AboutUs Page Styles */
.about-us-main {
  position: relative;
}

.about-us-hero {
  width: 100%;
  height: 60vh; /* Adjust as needed */
  position: relative;
  display: flex;
  align-items: flex-end; /* Align to bottom */
  justify-content: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.about-us-hero-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Optional dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-us-image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.header-AboutUs {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.about-us-main-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 25px;
}
.about-us-card-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
}

.about-us-card-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1.5rem;
}

.about-us-card-text {
  margin-top: 1%;
  font-size: 1rem;
}
.about-us-card-text li {
  display: flex;
  align-items: flex-start;
  margin-top: 1%;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: #000000;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLeft 0.6s ease-out forwards;
  font-family: "Roboto", sans-serif;
}

.about-us-card ul {
  margin-top: 0.5rem;
}

.about-us-card-text li::before {
  content: "✓";
  background: linear-gradient(135deg, #0edb61, #068c3b);
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(14, 219, 97, 0.3);
  transition: all 0.3s ease;
}

.about-us-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.about-us-hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin: 0;
}

.about-us-hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.about-us-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  background-color: #ffffff;
}

.about-us-grid {
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
}

.about-us-card {
  padding: 20px 40px 0px;
  border-radius: 12px;
}

.about-us-card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.about-us-card-icon {
  margin-right: 12px;
}

.about-us-card-text + .about-us-card-text {
  margin-top: 16px;
}

.about-us-card-subtitle {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000000;
  margin-top: 20px;
  text-align: left;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .about-us-hero-title {
    font-size: 2rem;
  }

  .about-us-hero-subtitle {
    font-size: 1rem;
  }

  .about-us-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .about-us-card {
    padding: 30px;
  }

  .about-us-card-title {
    font-size: 1.5rem;
  }

  .about-us-content {
    padding: 40px 20px;
  }
}`}</style>
        </section>
      </main>
      <ScrollUp />
      <Footer />
    </div>
  );
};

export default AboutUs;
