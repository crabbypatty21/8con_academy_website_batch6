import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-summary" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <ChevronDown className="faq-icon" />
      </div>
      <div
        className="faq-answer-wrapper"
        style={{
          maxHeight: isOpen ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email: contactEmail,
      contactNumber,
      message,
    };

    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong.");
    }
  };

  const faqs = [
    {
      question: "How can I enroll in the Forex Derivative Course?",
      answer:
        "You may visit us personally at 8Con Academy, Meycauayan, Bulacan, or message us on our official Facebook fan page. We highly recommend attending our FREE Forex Workshop every Saturday as a first step before enrolling.",
    },
    {
      question: "Do you offer scholarships?",
      answer:
        "Yes! We currently offer FULL SCHOLARSHIPS to all OJT interns and Private Scholars. However, Cooperative (Coop) Scholarships are on hold until further notice.",
    },
    {
      question: "How long does the Forex Derivatives course take?",
      answer:
        "The course runs for a total of 276 hours. Most students complete it within 2 to 3 months, depending on your schedule and commitment.",
    },
    {
      question: "What are the requirements to start learning forex?",
      answer:
        "You just need basic comprehension skills and the tools for digital trading, such as a mobile phone with data or a laptop with internet connection.",
    },
    {
      question: "What is your Enrollment to Employment program?",
      answer:
        "All 8Con graduates are eligible for our Enrollment to Employment program. You can explore our available career paths by visiting the Career section of our website.",
    },
    {
      question: "Can I enroll without a trading background?",
      answer:
        "Yes! Our course is designed for beginners, so no prior experience is required.",
    },
    {
      question: "What are your payment options?",
      answer:
        "We accept cash, bank transfer, and credit card payments via PayPal.",
    },
    {
      question: "Do I get a certificate after finishing the course?",
      answer:
        "Yes, a Certificate of Completion is issued to all successful graduates of the course.",
    },
    {
      question: "Can I have a consultation before enrolling?",
      answer:
        "Absolutely! We encourage all prospective students to attend our FREE Forex Workshop and schedule a consultation to better understand the course.",
    },
    {
      question: "Do you offer corporate training?",
      answer:
        "Yes, we offer corporate training packages. We require a minimum of 10 participants per batch.",
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container fade-in">
        <h2 className="section-title fade-in">Contact Us</h2>

        <div className="contact-top">
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="form-input"
                onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="form-input"
                onChange={(e) =>
                  setContactEmail(capitalizeFirstLetter(e.target.value))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber" className="form-label">
                Number
              </label>
              <input
                className="form-input"
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => {
                  const input = e.target.value;
                  const digitsOnly = input.replace(/\D/g, "");
                  setContactNumber(`+${digitsOnly}`);
                }}
                maxLength={14}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                required
                className="form-textarea"
                onChange={(e) =>
                  setMessage(capitalizeFirstLetter(e.target.value))
                }
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="intapply-btn">Submit</button>
            </div>
          </form>

          <div className="contact-right">
            <div className="map-section">
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                  color: "var(--text-primary)",
                }}
              >
                <strong>Where you can find us?</strong>
              </p>
              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.6238108973216!2d120.96140770000001!3d14.733848199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b386f399c96b%3A0x485afd33f61c132c!2s8Con%20Academy%20-%20Forex%20Trading%20%26%20Financial%20Literacy%20School!5e0!3m2!1sen!2sph!4v1750479622554!5m2!1sen!2sph"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="8Con Academy Google Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="faq" className="faq-section">
        <div className="contact-container fade-in">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-wrapper">
                <FAQItem {...faq} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactSection;
