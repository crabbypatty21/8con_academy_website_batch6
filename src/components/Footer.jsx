import React from "react";
import "../App.css";
import {
  Facebook,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Top: Logo + tagline */}
        <div className="footer-brand fade-in-up">
          <img
            src={isDark ? "/assets/logo/8con Academy Logo White.png" : "/assets/logo/8con Academy Logo.png"}
            alt="8Con Academy"
            className="footer-brand-logo"
          />
          <p className="footer-tagline">Confluence is Confidence</p>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/8ConAcademy"
              className="social-icon fb-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/8conacademy/"
              className="social-icon ig-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://ph.linkedin.com/company/8con-academy"
              className="social-icon li-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <div className="footer-grid fade-in-up anim-delay-2">
          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#home" className="quick-link">Home</a></li>
              <li><a href="#about" className="quick-link">About Us</a></li>
              <li><a href="#core-brand" className="quick-link">Brands</a></li>
              <li><a href="#internship" className="quick-link">Careers</a></li>
              <li><a href="#contact" className="quick-link">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-col">
            <h4 className="footer-title">Programs</h4>
            <ul className="footer-list">
              <li><a href="#core-brand" className="program-link">Core Brands</a></li>
              <li><Link to="/sub-brands" className="program-link">Sub-brands</Link></li>
              <li><a href="https://www.8connews.org/" target="_blank" rel="noopener noreferrer" className="program-link">Newsletters</a></li>
            </ul>
          </div>

          {/* Partnership */}
          <div className="footer-col">
            <h4 className="footer-title">Partnership</h4>
            <div className="footer-logo">
              <img src="/assets/logo/tickmill.png" alt="Tickmill" className="footer-logo-img" />
              <img src="/assets/logo/dupoin.png" alt="Dupoin" className="footer-logo-img" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Info</h4>
            <div className="footer-contact-info">
              <p><Phone size={14} className="footer-icon" /> +63 954 996 1125</p>
              <p><Mail size={14} className="footer-icon" /> 8ConAcademy@gmail.com</p>
              <p><Clock size={14} className="footer-icon" /> Mon–Fri 11:00 AM – 8:00 PM</p>
              <p><MapPin size={14} className="footer-icon" /> Meycauayan, Bulacan, Philippines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; 2025 <strong>8Con Academy</strong>. All rights reserved.</p>
      </div>

      <style>{`
.footer {
  background-color: #131b21; /* Changed background color here */
  color: var(--footer-text);
  padding: 32px 16px;
  background: ${isDark ? "#19232A" : "#EFF9FF"};
  color: ${isDark ? "#ffffff" : "#373737"};
  padding: 20px 5% 0;
  font-family: "Geist Sans", sans-serif;
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  padding-bottom: 16px;
}

.footer-brand {
  flex: 0 0 150px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-brand-logo {
  width: 90px;
  height: auto;
  object-fit: contain;
}

.footer-tagline {
  font-size: 10px;
  color: ${isDark ? "rgba(255, 255, 255, 0.5)" : "#828282"};
  font-weight: 400;
  letter-spacing: 0.5px;
}

.footer-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.footer-title {
  font-family: "Unbounded", sans-serif;
  font-weight: 700;
  font-size: 11px;
  margin-bottom: 8px;
  color: ${isDark ? "#ffffff" : "#373737"};
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 6px;
}

.footer-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: #0ED85F;
  border-radius: 2px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 6px;
}

.quick-link,
.program-link {
  color: ${isDark ? "rgba(255, 255, 255, 0.65)" : "#666666"};
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.2s ease, padding-left 0.2s ease;
  display: block;
}

.quick-link:hover {
  color: #0ED85F;
  padding-left: 4px;
}

.program-link:hover {
  color: #F95545;
  padding-left: 4px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-logo img {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: ${isDark ? "brightness(0) invert(1)" : "brightness(0)"};
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.footer-logo img:hover {
  opacity: 1;
}

.footer-contact-info {
  font-size: 11px;
  color: ${isDark ? "rgba(255, 255, 255, 0.65)" : "#666666"};
}

.footer-contact-info p {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.4;
}

.footer-icon {
  color: #0ED85F;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.social-icon {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${isDark ? "rgba(255, 255, 255, 0.7)" : "#666666"};
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-icon.fb-link:hover {
  background: #1877f2;
  color: #ffffff;
}

.social-icon.ig-link:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: #ffffff;
}

.social-icon.li-link:hover {
  background: #0077b5;
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.1)"};
  padding: 12px 0;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-bottom p {
  font-size: 11px;
  color: ${isDark ? "rgba(255, 255, 255, 0.4)" : "#828282"};
  margin: 0;
}

.footer-bottom strong {
  color: ${isDark ? "rgba(255, 255, 255, 0.6)" : "#373737"};
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

/* Responsive */
@media (min-width: 2560px) {
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

  .footer-main {
    flex-direction: column;
    gap: 40px;
  }

  .footer-brand {
    flex: none;
    align-items: center;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (min-width: 1024px) {
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
  .intcard .intcontent {
    width: 100%;
    height: auto;
  }

  .card-container {
    order: 4;
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
    grid-template-columns: 1fr;
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

  .sub-brand-grid {
    grid-template-columns: 1fr;
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
    justify-content: center;
  }

  .footer-social {
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 40px 5% 0;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-list li {
    margin-bottom: 8px;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-contact-info p {
    justify-content: center;
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
    gap: 0.5rem;
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

  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 426px) {
  .sub-brand-grid {
    grid-template-columns: 1fr;
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
}
`}</style>
    </footer>
  );
};

export default Footer;