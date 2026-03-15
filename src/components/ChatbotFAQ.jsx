import React, { useState, useRef, useEffect } from "react";
import "../ConponentCSS/ChatbotFAQ.css";
import { MessageCircle, X, Send, Reply } from "lucide-react";
import logo from "/assets/logo/logoIcon.png";
import TradingBackground from "./TradingBackground.jsx";

const FALLBACK_REPLY =
  "I'm sorry, I don't have an answer for that right now. Please message us directly on our official Facebook page (8Con Academy) or visit us at 8Con Academy, Meycauayan, Bulacan so we can assist you personally!";

const TYPING_DELAY = 600;
const MIN_MATCH_SCORE = 2;

const CategoryIcon = ({ type }) => {
  const icons = {
    enrollment: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 002-2v-5" />
      </svg>
    ),
    billing: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" />
        <path d="M12 18V6" />
      </svg>
    ),
    consultation: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

const categories = [
  {
    name: "ENROLLMENT",
    iconType: "enrollment",
    description: "What is your Enrollment to Employment program?",
    faqs: [
      { question: "What is your Enrollment to Employment program?", answer: "All 8Con graduates are eligible for our Enrollment to Employment program. You can explore our available career paths by visiting the Career section of our website." },
      { question: "How can I enroll in the Forex Derivative Course?", answer: "You may visit us personally at 8Con Academy, Meycauayan, Bulacan, or message us on our official Facebook fan page. We highly recommend attending our FREE Forex Workshop every Saturday as a first step before enrolling." },
      { question: "Can I enroll without a trading background?", answer: "Yes! Our course is designed for beginners, so no prior experience is required." },
      { question: "How long does the Forex Derivatives course take?", answer: "The course runs for a total of 276 hours. Most students complete it within 2 to 3 months, depending on your schedule and commitment." },
      { question: "What are the requirements to start learning forex?", answer: "You just need basic comprehension skills and the tools for digital trading, such as a mobile phone with data or a laptop with internet connection." },
      { question: "Do you offer scholarships?", answer: "Yes! We currently offer FULL SCHOLARSHIPS to all OJT interns and Private Scholars. However, Cooperative (Coop) Scholarships are on hold until further notice." },
      { question: "Do I get a certificate after finishing the course?", answer: "Yes, a Certificate of Completion is issued to all successful graduates of the course." },
    ],
  },
  {
    name: "BILLING",
    iconType: "billing",
    description: "What are your payment options?",
    faqs: [
      { question: "What are your payment options?", answer: "We accept cash, bank transfer, and credit card payments via PayPal." },
      { question: "How much does the course cost?", answer: "For pricing details, please visit us at 8Con Academy or message us on our official Facebook page. We also offer full scholarships for OJT interns and Private Scholars!" },
    ],
  },
  {
    name: "CONSULTATION",
    iconType: "consultation",
    description: "Can I have a consultation before enrolling?",
    faqs: [
      { question: "Can I have a consultation before enrolling?", answer: "Absolutely! We encourage all prospective students to attend our FREE Forex Workshop and schedule a consultation to better understand the course." },
      { question: "Do you offer corporate training?", answer: "Yes, we offer corporate training packages. We require a minimum of 10 participants per batch." },
      { question: "How can I contact you?", answer: "You can reach us through our official Facebook fan page, or visit us personally at 8Con Academy, Meycauayan, Bulacan. You can also use the Contact form on our website." },
    ],
  },
];

const generalResponses = [
  { keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "kumusta", "musta", "yo", "sup", "what's up", "whats up", "helo", "hii", "hiii", "greetings"], answer: "Hi there! 👋 Greetings from 8Con Academy! How can I help you today? Feel free to ask me anything about our courses, enrollment, or career opportunities — or pick from the categories below!" },
  { keywords: ["location", "address", "where", "find you", "office", "branch"], answer: "We are located at 8Con Academy, Meycauayan, Bulacan. You can also find us on Google Maps!" },
  { keywords: ["schedule", "time", "open", "hours", "when", "saturday", "workshop time"], answer: "Our FREE Forex Workshop is held every Saturday. For specific schedules and class hours, please contact us through our Facebook page or visit us at the academy." },
  { keywords: ["price", "cost", "fee", "how much", "tuition", "afford"], answer: "For pricing details, please visit us at 8Con Academy or message us on our official Facebook page. We also offer full scholarships for OJT interns and Private Scholars!" },
  { keywords: ["contact", "phone", "number", "email", "reach", "call", "message"], answer: "You can reach us through our official Facebook fan page, or visit us personally at 8Con Academy, Meycauayan, Bulacan. You can also use the Contact form on our website." },
  { keywords: ["forex", "trading", "what is forex", "currency", "market"], answer: "Forex (Foreign Exchange) is the global marketplace for trading currencies. At 8Con Academy, we teach Forex Derivatives trading through our comprehensive 276-hour course designed for beginners and experienced traders alike." },
  { keywords: ["job", "career", "work", "hire", "employment", "opportunity"], answer: "All 8Con graduates are eligible for our Enrollment to Employment program. Visit the Career section of our website to explore available career paths." },
  { keywords: ["intern", "ojt", "internship", "practicum"], answer: "We accept OJT interns and offer full scholarships to them! Check our Internship section on the website for available positions and application details." },
  { keywords: ["thank", "thanks", "salamat", "appreciated"], answer: "You're welcome! If you have more questions, feel free to ask. We're happy to help!" },
  { keywords: ["facebook", "fb", "social media", "page"], answer: "You can find us on our official Facebook fan page. Search for '8Con Academy' on Facebook to message us directly!" },
];

const allFaqs = categories.flatMap((cat) => cat.faqs);

const findBestFaqMatch = (input) => {
  const inputWords = input.split(/\s+/).filter((w) => w.length > 2);
  let match = null;
  let bestScore = 0;

  for (const faq of allFaqs) {
    const q = faq.question.toLowerCase();
    if (q.includes(input) || input.includes(q)) return faq;

    let score = 0;
    for (const word of inputWords) {
      if (q.includes(word)) score += 2;
      if (faq.answer.toLowerCase().includes(word)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      match = faq;
    }
  }

  return bestScore >= MIN_MATCH_SCORE ? match : null;
};

const findGeneralResponse = (input) =>
  generalResponses.find((r) => r.keywords.some((kw) => input.includes(kw)));

const getReply = (input) => {
  const lowerInput = input.toLowerCase();
  const faqMatch = findBestFaqMatch(lowerInput);
  if (faqMatch) return faqMatch.answer;

  const generalMatch = findGeneralResponse(lowerInput);
  return generalMatch ? generalMatch.answer : FALLBACK_REPLY;
};

const addBotReply = (setIsTyping, setMessages, reply) => {
  setIsTyping(true);
  setTimeout(() => {
    setIsTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  }, TYPING_DELAY);
};

const InputBar = ({ inputValue, setInputValue, onSend, onKeyDown, isTyping }) => (
  <div className="chatbot-input-bar">
    <input
      type="text"
      className="chatbot-input"
      placeholder="What is in your mind?"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={isTyping}
    />
    <button
      className="chatbot-send-btn"
      onClick={onSend}
      disabled={isTyping || !inputValue.trim()}
      aria-label="Send message"
    >
      <Send size={18} />
    </button>
  </div>
);

const MessageBubble = ({ msg, showAvatar }) => (
  <div className={`chatbot-msg-row ${msg.from}`}>
    {msg.from === "bot" && (
      <div className="chatbot-msg-avatar">
        {showAvatar ? (
          <img src={logo} alt="" className="chatbot-msg-avatar-img" />
        ) : (
          <div className="chatbot-msg-avatar-spacer" />
        )}
      </div>
    )}
    <div className={`chatbot-bubble ${msg.from}`}>{msg.text}</div>
  </div>
);

const TypingIndicator = () => (
  <div className="chatbot-msg-row bot">
    <div className="chatbot-msg-avatar">
      <img src={logo} alt="" className="chatbot-msg-avatar-img" />
    </div>
    <div className="chatbot-bubble bot typing">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </div>
);

const ChatbotFAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("home");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setView("chat");
    setMessages([{ from: "bot", text: `Here are some questions about ${category.name.toLowerCase()}. Pick one or type your own!` }]);
  };

  const handleFaqClick = (faq) => {
    setAskedQuestions((prev) => [...prev, faq.question]);
    setMessages((prev) => [...prev, { from: "user", text: faq.question }]);
    addBotReply(setIsTyping, setMessages, faq.answer);
  };

  const handleInputSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInputValue("");

    if (view === "home") {
      setView("chat");
      setActiveCategory(null);
    }

    addBotReply(setIsTyping, setMessages, getReply(trimmed));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSend();
    }
  };

  const handleBack = () => {
    setView("home");
    setMessages([]);
    setActiveCategory(null);
    setAskedQuestions([]);
  };

  const remainingFaqs = activeCategory
    ? activeCategory.faqs.filter((faq) => !askedQuestions.includes(faq.question))
    : [];

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle FAQ chatbot"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {isOpen && <div className="chatbot-overlay" onClick={() => setIsOpen(false)} />}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-trading-bg">
            <TradingBackground variant={1} />
          </div>
          {view === "home" ? (
            <>
              <div className="chatbot-home">
                <div className="chatbot-home-header">
                  <button className="chatbot-back-circle" onClick={() => setIsOpen(false)} aria-label="Hide chatbot">
                    <Reply size={20} />
                  </button>
                  <h1 className="chatbot-greeting">
                    HI <span className="chatbot-greeting-green">TRADER!</span>
                  </h1>
                  <p className="chatbot-subtitle">What Do You Want To Chat Today?</p>
                </div>

                <div className="chatbot-categories">
                  {categories.map((cat, i) => (
                    <button key={i} className="chatbot-category-card" onClick={() => handleCategoryClick(cat)}>
                      <div className="chatbot-category-icon">
                        <CategoryIcon type={cat.iconType} />
                      </div>
                      <div className="chatbot-category-text">
                        <span className="chatbot-category-name">{cat.name}</span>
                        <span className="chatbot-category-desc">{cat.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <InputBar
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSend={handleInputSend}
                onKeyDown={handleKeyDown}
                isTyping={isTyping}
              />
            </>
          ) : (
            <>
              <div className="chatbot-chat-header">
                <button className="chatbot-back-circle" onClick={handleBack} aria-label="Go back">
                  <Reply size={20} />
                </button>
                <span className="chatbot-chat-title">
                  {activeCategory ? activeCategory.name : "8Con Academy"}
                </span>
                <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                  <X size={20} />
                </button>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    msg={msg}
                    showAvatar={msg.from === "bot" && (i === 0 || messages[i - 1]?.from !== "bot")}
                  />
                ))}

                {isTyping && <TypingIndicator />}

                {activeCategory && !isTyping && remainingFaqs.length > 0 && (
                  <div className="chatbot-faq-list">
                    {remainingFaqs.map((faq, i) => (
                      <button key={i} className="chatbot-faq-btn" onClick={() => handleFaqClick(faq)}>
                        {faq.question}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <InputBar
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSend={handleInputSend}
                onKeyDown={handleKeyDown}
                isTyping={isTyping}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotFAQ;
