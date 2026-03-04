import React from "react";
import "../App.css";
import {
  Facebook,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Partnership */}
          <div className="footer-container">
            <h4 className="footer-title">Partnership</h4>
            <ul className="footer-list">
              <div className="footer-logo">
                <img
                  src="/assets/logo/tickmill.png"
                  alt="Tickmill Logo"
                  className="footer-logo-img"
                />
                <img
                  src="/assets/logo/dupoin.png"
                  alt="Dupoin Logo"
                  className="footer-logo-img"
                />
              </div>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-container">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li>
                <a href="#core-brand" className="quick-link">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="quick-link">
                  Newsletters
                </a>
              </li>
              <li>
                <a href="#internship" className="quick-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#about" className="quick-link">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-container">
            <h4 className="footer-title">Programs</h4>
            <ul className="footer-list">
              <li>
                <a href="#core-brand" className="program-link">
                  Core brands
                </a>
              </li>
              <li>
                <a href="#sub-brands" className="program-link">
                  Sub-brands
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-container">
            <h4 className="footer-title">Contact Info</h4>
            <div className="footer-contact-info">
              <p>
                <Phone
                  size={18}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                +63 954 996 1125
              </p>
              <p>
                <Mail
                  size={18}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                8ConAcademy@gmail.com
              </p>
              <p style={{ marginBottom: "16px" }}>
                <Clock
                  size={18}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Mon–Fri 11:00 AM – 8:00 PM
              </p>
              <div className="footer-social">
                <a
                  href="https://www.facebook.com/8ConAcademy"
                  className="fb-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/8conacademy/"
                  className="ig-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://ph.linkedin.com/company/8con-academy"
                  className="li-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; 2025 <strong>8Con Academy</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <style>{`.footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 32px 16px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 5px;
}

.footer-logo img {
  height: 100px;
  width: auto;
  object-fit: contain;
}

.footer-description {
  color: var(--footer-text);
  font-size: 14px;
}

.footer-title {
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-list {
  list-style: none;
  padding: 0;
  font-size: 14px;
}

.footer-list li {
  margin-bottom: 8px;
}

.quick-link,
.program-link {
  color: var(--footer-text);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}

.footer-social a {
  color: var(--footer-text);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}
.fb-link:hover {
  color: #1877f2;
}
.ig-link:hover {
  color: #d62976;
}
.li-link:hover {
  color: #0077b5;
}
.quick-link:hover {
  color: var(--accent-green);
}
.program-link:hover {
  color: var(--accent-red);
}

.footer-contact-info {
  font-size: 14px;
  color: var(--footer-text);
}

.footer-contact-info p {
  margin-bottom: 8px;
}

.footer-social {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.footer-bottom {
  border-top: 1px solid #ccc;
  margin-top: 32px;
  padding-top: 24px;
  text-align: center;
}

.footer-bottom-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: var(--footer-bottom-text);
}

.footer-bottom-links {
  display: flex;
  gap: 16px;
}

.scroll-to-top-button {
  position: fixed;
  right: 20px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: var(--accent-green);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease,
    transform 0.4s ease;
}
.scroll-to-top-button .chevron-icon {
  color: var(--footer-bg);
  transition: color 0.4s ease;
}

.scroll-to-top-button:hover {
  background-color: var(--accent-red);
  box-shadow: 0 0 12px var(--accent-red-dark), 0 0 24px var(--accent-red-dark);
}

.scroll-to-top-button:hover .chevron-icon {
  color: var(--footer-text);
}
@media (min-width: 2560px) {
  .logo-img {
    height: clamp(40px, 3vw, 80px);
    width: auto;
  }

  .nav-link {
    font-size: clamp(14px, 1vw, 30px);
  }

  .dropdown-content a {
    font-size: clamp(14px, 1vw, 18px);
  }

  .card-container {
    max-width: 1000px;
  }

  .feature-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }

  .faq-section {
    max-width: 1800px;
    margin: 0 auto;
    padding: 100px 10%;
  }

  .footer {
    padding: 60px 10%;
    font-size: 18px;
  }
}
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .nav-link {
    font-family: "Montserrat", sans-serif;
    font-size: 9.5px;
  }

  .logo-img {
    height: 30px;
    width: 100%;
  }

  .contact-content {
    flex-direction: column;
  }

  .footer-bottom-content {
    flex-direction: column;
  }

  .footer-bottom-links {
    margin-top: 16px;
  }

  .carousel-button-prev {
    left: -20px;
  }

  .carousel-button-next {
    right: -20px;
  }

  .core-brand-content {
    grid-template-columns: 1fr;
    gap: 60px;
    margin-bottom: 80px;
  }

  .core-brand-features,
  .core-brand-cta {
    padding: 32px;
  }

  .core-brand-header {
    margin-bottom: 60px;
  }
}
@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-toggle {
    display: none;
  }

  .contact-content {
    flex-direction: row;
  }

  .footer-bottom-content {
    flex-direction: row;
  }

  .footer-bottom-links {
    margin-top: 0;
  }
  .footer-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
@media (max-width: 768px) {
  @media (max-width: 768px) {
    .intcard .intcontent {
      width: 100%;
      height: auto;
    }

    .card-container {
      order: 4;
    }
  }
  .mvv-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }

  .mvv-card {
    padding: 30px 20px;
  }

  .about-main-title {
    font-size: 2.5rem;
  }

  .search-input:focus,
  .search-input.expanded {
    z-index: 999;
    width: 150px;
  }

  .faq-list {
    grid-template-columns: 1fr; /* <== DELETE this */
  }
  .testimonials-section {
    padding: 3rem 0;
  }

  .testimonials-container {
    padding: 0 1rem;
  }

  .testimonials-header {
    margin-bottom: 3rem;
  }

  .carousel-button {
    width: 50px;
    height: 50px;
  }

  .carousel-button-prev {
    left: -10px;
  }

  .carousel-button-next {
    right: -10px;
  }

  .testimonial-card {
    border-radius: 20px;
  }

  .testimonial-text {
    font-size: 1.2rem;
  }

  .testimonial-footer {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .intcards-container {
    flex-direction: column;
    gap: 20px;
  }

  .internship-title h1,
  .careerpath-title h1 {
    font-size: 2rem;
  }

  .core-brand-section {
    padding: 60px 20px;
  }
}
@media (max-width: 480px) {
  .intcards-container,
  .careerpath-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 340px;
    width: 100%;
  }

  .intcard,
  .career-card {
    width: 100%;
    max-width: 320px;
    justify-self: center;
  }

  .internship-title h1,
  .careerpath-title h1 {
    font-size: 2.5rem;
  }

  .internship-title p,
  .careerpath-title p {
    font-size: 1rem;
  }
  .core-brand-section {
    padding: 30px 8px;
  }

  .core-brand-container {
    padding: 0 8px;
  }

  .core-brand-content-wrapper {
    gap: 25px;
    margin-top: 15px;
  }

  .core-brand-title {
    font-size: 28px;
    line-height: 1.2;
  }

  .core-brand-description {
    font-size: 15px;
    padding: 0 0.5rem;
  }

  .core-brand-list {
    padding: 0.8rem 1rem;
    margin: 0.8rem auto;
  }

  .core-brand-list li {
    font-size: 13px;
    line-height: 1.5;
  }

  .core-brand-list li::before {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    font-size: 14px;
  }

  /* Testimonials for mobile */
  .testimonials-section {
    padding: 1rem 0;
  }

  .testimonials-container {
    padding: 0;
  }

  .testimonials-carousel {
    flex-direction: column;
    gap: 1rem;
  }

  .carousel-button-prev,
  .carousel-button-next {
    position: static;
    margin: 0 auto;
    order: 2;
  }

  .testimonials-track {
    order: 1;
    width: 100%;
  }

  .carousel-indicators {
    order: 3;
    margin-top: 1rem;
  }

  .testimonial-card {
    min-height: 250px;
  }

  .testimonial-text {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }

  .testimonial-footer {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }

  .testimonial-avatar img {
    width: 50px;
    height: 50px;
  }

  .testimonial-author {
    font-size: 1rem;
  }

  .carousel-indicators {
    gap: 0.5rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }
}
@media (max-width: 320px) {
  .testimonials-container {
    padding: 0;
  }

  .testimonial-card {
    margin: 0;
    border-radius: 16px;
  }

  .testimonials-track {
    border-radius: 16px;
  }

  .core-brand-list li {
    font-size: 12px;
  }

  .core-brand-title {
    font-size: 22px;
  }

  .intapply-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
  .footer-title {
    text-align: center;
  }
  .footer-logo {
    align-items: center;
    justify-content: center;
  }
  .footer-contact-info p {
    text-align: center;
  }
  .footer-social {
    align-items: center;
    justify-content: center;
  }
}
@media (max-width: 426px) {
  .sub-brand-grid {
    grid-template-columns: 1fr; /* Switch to one column */
  }
  .quick-link a {
    text-align: center;
  }
  .footer-title {
    text-align: center;
  }
  .footer-logo {
    align-items: center;
    justify-content: center;
  }
  .footer-contact-info p {
    text-align: center;
  }
  .footer-social {
    align-items: center;
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .sub-brand-grid {
    grid-template-columns: 1fr; /* Switch to one column */
  }
  .quick-link,
  .program-link {
    align-items: center;
    justify-content: center;
  }
  .footer-title {
    text-align: center;
  }
  .footer-logo {
    align-items: center;
    justify-content: center;
  }
  .footer-contact-info p {
    text-align: center;
  }
  .footer-social {
    align-items: center;
    justify-content: center;
  }
}`}</style>
    </footer>
  );
};

export default Footer;
