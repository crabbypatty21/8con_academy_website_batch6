import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import logo from "/assets/logo/logoIcon.png";

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

const generalResponses = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    answer: "Hello! Welcome to 8Con Academy. How can I help you today? Feel free to ask me anything or pick from the suggested questions below.",
  },
  {
    keywords: ["location", "address", "where", "find you", "office", "branch"],
    answer: "We are located at 8Con Academy, Meycauayan, Bulacan. You can also find us on Google Maps!",
  },
  {
    keywords: ["schedule", "time", "open", "hours", "when", "saturday", "workshop time"],
    answer: "Our FREE Forex Workshop is held every Saturday. For specific schedules and class hours, please contact us through our Facebook page or visit us at the academy.",
  },
  {
    keywords: ["price", "cost", "fee", "how much", "tuition", "afford"],
    answer: "For pricing details, please visit us at 8Con Academy or message us on our official Facebook page. We also offer full scholarships for OJT interns and Private Scholars!",
  },
  {
    keywords: ["contact", "phone", "number", "email", "reach", "call", "message"],
    answer: "You can reach us through our official Facebook fan page, or visit us personally at 8Con Academy, Meycauayan, Bulacan. You can also use the Contact form on our website.",
  },
  {
    keywords: ["forex", "trading", "what is forex", "currency", "market"],
    answer: "Forex (Foreign Exchange) is the global marketplace for trading currencies. At 8Con Academy, we teach Forex Derivatives trading through our comprehensive 276-hour course designed for beginners and experienced traders alike.",
  },
  {
    keywords: ["job", "career", "work", "hire", "employment", "opportunity"],
    answer: "All 8Con graduates are eligible for our Enrollment to Employment program. Visit the Career section of our website to explore available career paths.",
  },
  {
    keywords: ["intern", "ojt", "internship", "practicum"],
    answer: "We accept OJT interns and offer full scholarships to them! Check our Internship section on the website for available positions and application details.",
  },
  {
    keywords: ["thank", "thanks", "salamat", "appreciated"],
    answer: "You're welcome! If you have more questions, feel free to ask. We're happy to help!",
  },
  {
    keywords: ["facebook", "fb", "social media", "page"],
    answer: "You can find us on our official Facebook fan page. Search for '8Con Academy' on Facebook to message us directly!",
  },
];

const ChatbotFAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! Welcome to 8Con Academy. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showSuggestions]);

  const handleFaqClick = (faq) => {
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { from: "user", text: faq.question }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: faq.answer }]);
      setShowSuggestions(true);
    }, 600);
  };

  const handleInputSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    setShowSuggestions(false);
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInputValue("");
    setIsTyping(true);

    const input = trimmed.toLowerCase();
    const inputWords = input.split(/\s+/).filter((w) => w.length > 2);

    let match = null;
    let bestScore = 0;

    faqs.forEach((faq) => {
      const q = faq.question.toLowerCase();
      const a = faq.answer.toLowerCase();

      if (q.includes(input) || input.includes(q)) {
        match = faq;
        bestScore = 999;
        return;
      }

      let score = 0;
      inputWords.forEach((word) => {
        if (q.includes(word)) score += 2;
        if (a.includes(word)) score += 1;
      });

      if (score > bestScore) {
        bestScore = score;
        match = faq;
      }
    });

    if (bestScore < 2) match = null;

    let reply = null;
    if (match) {
      reply = match.answer;
    } else {
      const general = generalResponses.find((r) =>
        r.keywords.some((kw) => input.includes(kw))
      );
      reply = general
        ? general.answer
        : "Thanks for your message! For more detailed inquiries, please contact us through our Contact form or visit us at 8Con Academy, Meycauayan, Bulacan.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: reply },
      ]);
      setShowSuggestions(true);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSend();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle FAQ chatbot"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {isOpen && (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <div className="chatbot-window">
          {/* Header — Messenger style */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-wrapper">
                <img src={logo} alt="8Con" className="chatbot-avatar" />
                <span className="chatbot-online-dot"></span>
              </div>
              <div className="chatbot-header-text">
                <span className="chatbot-header-name">8Con Academy</span>
                <span className="chatbot-header-status">Active now</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => {
              const isBot = msg.from === "bot";
              const showAvatar =
                isBot &&
                (i === 0 || messages[i - 1]?.from !== "bot");

              return (
                <div
                  key={i}
                  className={`chatbot-msg-row ${msg.from}`}
                >
                  {isBot && (
                    <div className="chatbot-msg-avatar">
                      {showAvatar ? (
                        <img src={logo} alt="" className="chatbot-msg-avatar-img" />
                      ) : (
                        <div className="chatbot-msg-avatar-spacer"></div>
                      )}
                    </div>
                  )}
                  <div className={`chatbot-bubble ${msg.from}`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="chatbot-msg-row bot">
                <div className="chatbot-msg-avatar">
                  <img src={logo} alt="" className="chatbot-msg-avatar-img" />
                </div>
                <div className="chatbot-bubble bot typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* FAQ suggestion questions */}
          {showSuggestions && !isTyping && (
            <div className="chatbot-suggestions">
              <p className="chatbot-suggestions-label">Suggested questions:</p>
              <div className="chatbot-suggestions-list">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    className="chatbot-suggestion-btn"
                    onClick={() => handleFaqClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleInputSend}
              disabled={isTyping || !inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFAQ;
