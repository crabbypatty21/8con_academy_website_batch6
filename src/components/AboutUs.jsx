import React, { useState, useEffect } from "react";
import { Menu, X, Goal, Eye, Atom, HeartHandshake } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import "../ConponentCSS/aboutus.css";
import "../ConponentCSS/Animations.css";
import ScrollLink from "./ScrollLink";
import "../App.css";
import Footer from "./Footer.jsx";
const AboutUs = () => {
  const { isDark } = useTheme();
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
    const elements = document.querySelectorAll(".fade-in, .fade-in-up");

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
              src={isDark ? "/assets/logo/8con Academy Logo White.png" : "/assets/logo/8con Academy Logo.png"}
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
            <h2 className="hero-title-centered">About <span style={{ color: "#75F94C" }}>Us</span></h2>
          <div className="about-us-image-container">
            <img
              src="/assets/images/aboutus_img.png"
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
                <h1>Who is <span style={{ color: "#F95545" }}>8Con</span> Academy?</h1>
              </div>
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in">
                    8CON Academy: Empowering Filipino Families through Financial
                    Education
                  </h2>
                </div>
                <p className="about-us-card-text justified-text fade-in" >
                  <span style={{ color: "#F95545" }}>8Con Academy</span> is a
                  premier trading and financial education institution based in
                  Meycauayan, Bulacan. We specialize in{" "}
                  <span style={{ color: "#75F94C" }}>Forex Derivative Education</span>
                  , equipping aspiring traders with the tools, mindset, and structure 
                  to thrive in the global financial markets.
                </p>
                <br />
                <p className="fade-in">
                  At the heart of our programs is a confluence-based, data-driven approach
                  blending technical analysis, fundamentals, market sentiment, 
                  and real-world insights to guide strategic decision-making. <span style={{ color: "#75F94C" }}>We go beyond theory</span> by offering 
                  structured training, live coaching, and hands-on simulations
                  ensuring our students trade with confidence, not guesswork.
                </p>
                <br />
                <p className="fade-in">
                  Our name, 8Con, stands for the <span style={{ color: "#75F94C" }}>8 essential</span> confluences
                  every trader must master to make consistent, profitable decisions. It’s more than a methodology, 
                  it’s a philosophy rooted in discipline, practice, and continuous growth.
                </p>
                <br />
                <p className="fade-in">
                  At <span style={{ color: "#F95545" }}>8Con Academy</span>, we believe that Confluence Builds Confidence
                  <br />Our mission: to help build a profitable trader in every Filipino household, one educated decision at a time.
                </p>

                {/* our services section */}
                <div className="services-section">
                <h3 className="about-us-card-subtitle fade-in services-title">Our Services</h3>
                <p className="about-us-card-text justified-text fade-in" style={{color:"#999999"}}>
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
                <p className="about-us-card-text justified-text fade-in"style={{color:"#999999"}}>
                  <strong>Sub-brands:</strong>
                </p>
                <ul className="about-us-card-text justified-list sub-brand-grid fade-in">
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConEdge:</strong></span> Proprietary forex scanner for
                      derivative traders. Provides market sentiment, technical
                      signals, and fundamental analysis in one platform,
                      empowering informed trading decisions.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConLift:</strong></span> Scholarship and community
                      upliftment arm offering free education, OJT placements,
                      and the "Enrollment to Employment" program. Focused on
                      transforming lives through inclusive learning
                      opportunities.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#F95545" }}><strong>8ConStruct:</strong></span> Offers data analytics,
                      statistical treatment, and research consulting for
                      students, academics, and businesses led by Doc May
                      Francisco. Ideal for theses, dissertations, market
                      research, and business data strategies.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#F95545" }}><strong>8ConCise:</strong></span> Comprehensive review center for
                      LET, Criminology, Civil Service, and College Entrance
                      Exams. Combines academic content, mock exams, and coaching
                      for exam success.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConVerse:</strong></span> Language proficiency program
                      designed for IELTS, TOEFL, and other English
                      certifications. Supports global career and migration plans
                      through effective communication skills training.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConNect:</strong></span> Business networking community
                      promoting collaboration, referrals, and entrepreneurial
                      growth. Hosts pitching events, coaching, and partnerships
                      for SMEs and local startups.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#F95545" }}><strong>8ConPact:</strong></span> CSR and LGU partnership program
                      supporting education, livelihood, and employment.
                      Implements LGU-aligned training, scholarships, and job
                      placement initiatives.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#F95545" }}><strong>8ConQuest:</strong></span> Academic coaching and
                      professional mentoring focused on thesis guidance, career
                      planning, and entrepreneurship development. Helps students
                      and professionals achieve academic and career goals with
                      expert support.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConSpace:</strong></span> A co-working and virtual
                      office hub for freelancers, students, and startups. Offers
                      flexible desk rentals, virtual business registration, and
                      community workshops in a productivity-focused environment.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{ color: "#75F94C" }}><strong>8ConSult:</strong></span> Business development and
                      startup advisory service led by Sir Nigel Santos. Covers
                      business model coaching, sales strategy, growth plans, and
                      investor pitch preparation. Advisory
                    </p>
                  </li>
                </ul>
                </div>
              <div className="what-makes-us-unique-section">
                <h3 className="about-us-card-subtitle">What Makes Us <span style={{ color: "#F95545" }}>Unique</span></h3>
                <p className="about-us-card-text justified-text fade-in" style={{ color: "#75F94C" }}>
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
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      A Full Scholarship covering Basic to Common Competency.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      Thesis & Dissertation Coaching.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      1-on-1 Career Mentorship
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
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
                  <strong><span style={{ color: "#F95545" }}>8ConEdge</span>: Proprietary Market Scanner</strong>
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
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      Campus workshops and speaking invitations.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      Free public orientations and trading webinars.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      Live fund management challenges.
                    </p>
                  </li>
                  <li className="justified-text fade-in">
                    <p className="fade-in">
                      <span style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#75F94C",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                        marginRight: "8px"
                      }}>✓</span>
                      Our graduates stay involved, often returning as mentors,
                      speakers, or collaborators. It's a shared journey built on
                      growth, support, and accountability.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in" style={{ textAlign: 'left', width: '100%' }}> Our <span style={{ color: "#75F94C" }}> Vision</span></h2>
                </div>
                <p className="about-us-card-text justified-text fade-in fade-in">
                  To be the Philippines’ most trusted and recognized hub for Forex education, 
                  building a ripple effect of empowered traders, impact-driven coaches, and 
                  ethical fund managers who uplift communities locally and globally.
                </p>
              </div>

              {/* Our Mission */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in"style={{ textAlign: 'right', width: '100%' }}>Our <span style={{ color: "#75F94C" }}> Mision</span></h2>
                </div>
                <p
                  className="about-us-card-text justified-text fade-in fade-in"
                  style={{ textAlign: "right" }}
                >
                  To raise a new generation of disciplined, confident, and financially literate Filipino traders
                  through structured education, confluence-based strategies, and personalized coaching. 
                  Powered by data-driven tools and real-world applications, our goal is simple yet bold:
                  <br/>
                  <br/>
                  Create a profitable trader in every Filipino household, one person at a time.
                </p>
              </div>
            </div>

            {/* Core Values and CSR Section */}
            <div className="about-us-grid">
              {/* Core Values */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in" style={{ textAlign: 'left', width: '100%' }}>Core <span style={{ color: "#75F94C" }}>Values</span></h2>
                </div>
                <div className="about-us-card-section">
                  <ul className="about-us-card-text justified-list fade-in">
                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#75F94C",
                            color: "white",
                            textAlign: "center",
                            lineHeight: "20px",
                            marginRight: "8px",
                          }}
                        >
                          ✓
                        </span>
                        <strong>Empowerment Through Education</strong> We believe that real change begins with
                        knowledge. We are committed to transforming lives by providing access to financial
                        literacy and trading skills that promote independence, resilience, and long-term
                        success.
                      </p>
                    </li>

                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#75F94C",
                            color: "white",
                            textAlign: "center",
                            lineHeight: "20px",
                            marginRight: "8px",
                          }}
                        >
                          ✓
                        </span>
                        <strong>Innovation With Purpose</strong> We harness technology and forward-thinking
                        strategies to continuously evolve our programs. By staying ahead of market trends,
                        we ensure our students are equipped to thrive in a dynamic global economy.
                      </p>
                    </li>

                    <li className="justified-text fade-in">
                      <p className="fade-in">
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#75F94C",
                            color: "white",
                            textAlign: "center",
                            lineHeight: "20px",
                            marginRight: "8px",
                          }}
                        >
                          ✓
                        </span>
                        <strong>Collaboration and Community</strong> We grow stronger together. Through
                        inclusive partnerships and a collaborative learning culture, we create a nurturing
                        environment where students, educators, and partners support one another in
                        achieving shared goals.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Corporate Social Responsibility Initiatives */}
              <div className="about-us-card">
                <div className="about-us-card-header fade-in">
                  <h2 className="about-us-card-title fade-in">
                    <span style={{ color: "#75F94C" }}>Corporate</span> Social <span style={{ color: "#75F94C" }}>Responsibility</span>
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
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#75F94C",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "20px",
                              marginRight: "8px",
                            }}
                          >
                            ✓
                          </span>
                          Free educational outreach in public universities and barangays.
                        </p>
                      </li>

                      <li className="justified-text fade-in">
                        <p className="fade-in">
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#75F94C",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "20px",
                              marginRight: "8px",
                            }}
                          >
                            ✓
                          </span>
                          Scholarships for marginalized but talented youth.
                        </p>
                      </li>

                      <li className="justified-text fade-in">
                        <p className="fade-in">
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#75F94C",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "20px",
                              marginRight: "8px",
                            }}
                          >
                            ✓
                          </span>
                          Mental health and psychology talks for traders.
                        </p>
                      </li>

                      <li className="justified-text fade-in">
                        <p className="fade-in">
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#75F94C",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "20px",
                              marginRight: "8px",
                            }}
                          >
                            ✓
                          </span>
                          Community business mentorships for aspiring entrepreneurs.
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
        </section>
        <div style={{ paddingTop: "80px", background: isDark ? "#19232A" : "#EFF9FF" }} />
        <Footer />
      </main>
    </div>
  );
};

export default AboutUs;
