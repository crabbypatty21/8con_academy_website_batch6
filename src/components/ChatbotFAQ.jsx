import React, { useState, useRef, useEffect } from "react";
import "../ConponentCSS/ChatbotFAQ.css";
import { MessageCircle, X, Send, Reply } from "lucide-react";
import logo from "/assets/logo/logoIcon.png";
import TradingBackground from "./TradingBackground.jsx";

const TYPING_DELAY = 800;
const MIN_MATCH_SCORE = 3;
const FB_LINK = "https://www.facebook.com/profile.php?id=61584489577286";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "can", "shall", "i", "me", "my", "we", "our",
  "you", "your", "it", "its", "they", "them", "their", "this", "that",
  "in", "on", "at", "to", "for", "of", "with", "by", "from", "as",
  "into", "about", "and", "or", "but", "not", "no", "so", "if", "then",
  "than", "too", "very", "just", "also", "how", "what", "when", "where",
  "who", "which", "why", "am", "up", "out",
]);

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

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
      { question: "How can I enroll in the Forex Derivative Course?", answer: `You may visit us personally at 8Con Academy, Meycauayan, Bulacan, or message us on our official Facebook page:\n${FB_LINK}\n\nWe highly recommend attending our FREE Forex Workshop every Saturday as a first step before enrolling.` },
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
      { question: "How much does the course cost?", answer: `For pricing details, please visit us at 8Con Academy or message us on our official Facebook page:\n${FB_LINK}\n\nWe also offer full scholarships for OJT interns and Private Scholars!` },
    ],
  },
  {
    name: "CONSULTATION",
    iconType: "consultation",
    description: "Can I have a consultation before enrolling?",
    faqs: [
      { question: "Can I have a consultation before enrolling?", answer: "Absolutely! We encourage all prospective students to attend our FREE Forex Workshop and schedule a consultation to better understand the course." },
      { question: "Do you offer corporate training?", answer: "Yes, we offer corporate training packages. We require a minimum of 10 participants per batch." },
      { question: "How can I contact you?", answer: `You can reach us through our official Facebook page:\n${FB_LINK}\n\nOr visit us personally at 8Con Academy, Meycauayan, Bulacan. You can also use the Contact form on our website.` },
    ],
  },
];

const generalResponses = [
  // ===== GREETINGS & PLEASANTRIES =====
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "kumusta", "musta", "yo", "sup", "what's up", "whats up", "helo", "hii", "hiii", "greetings", "magandang umaga", "magandang hapon", "magandang gabi"],
    answers: [
      "Hi there! 👋 Welcome to 8Con Academy! How can I help you today?",
      "Hello! 😊 Great to have you here! What would you like to know about 8Con Academy?",
      "Hey there! 👋 I'm here to help. Ask me anything about our courses, enrollment, or career opportunities!",
    ],
  },
  {
    keywords: ["thank", "thanks", "salamat", "appreciated", "thank you", "ty", "tysm"],
    answers: [
      "You're welcome! 😊 If you have more questions, feel free to ask. We're happy to help!",
      "Glad I could help! Don't hesitate to ask if anything else comes to mind. 😊",
      "Anytime! We're here for you. Feel free to reach out whenever you need help! 🙌",
    ],
  },
  {
    keywords: ["bye", "goodbye", "see you", "paalam", "gotta go", "take care", "gtg"],
    answers: [
      "Goodbye! 👋 Feel free to come back anytime you have questions. See you at 8Con Academy!",
      "Take care! 😊 We're always here if you need us. Happy trading!",
      "See you! 🙌 Don't forget to check out our FREE Saturday workshop!",
    ],
  },
  {
    keywords: ["okay", "ok", "sure", "alright", "got it", "nice", "cool", "great", "awesome", "noted"],
    answers: [
      "Great! 😊 Is there anything else you'd like to know?",
      "Awesome! Feel free to ask if you have more questions! 👍",
    ],
  },
  {
    keywords: ["who are you", "what are you", "are you a bot", "are you real", "are you human"],
    answers: [
      `I'm 8Con Academy's virtual assistant! 🤖 I can help answer your questions about our courses, enrollment, sub-brands, career paths, and more. For complex inquiries, our team is always available on Facebook:\n${FB_LINK}\n\nOr visit us at the academy!`,
    ],
  },
  {
    keywords: ["help", "assist", "tulong", "paano"],
    answers: [
      "I'm here to help! 🙋 You can ask me about:\n\n• Enrollment & courses\n• Sub-brands (8ConStruct, 8ConEdge, etc.)\n• Career paths after graduation\n• Internship & OJT positions\n• Scholarships & billing\n• Workshop schedules\n• Location & contact info\n\nWhat would you like to know?",
    ],
  },

  // ===== ABOUT 8CON ACADEMY =====
  {
    keywords: ["what is 8con", "about 8con", "tell me about 8con", "8con academy", "ano ang 8con"],
    answers: [
      "8Con Academy is a forex trading and financial literacy academy founded in 2021, based in Meycauayan, Bulacan, Philippines. 🎓\n\nOur mission: \"Empowering Every Filipino Household With A Skilled And Profitable Forex Trader.\"\n\nWe offer a comprehensive 276-hour Forex Derivatives course, FREE Saturday workshops, 9 sub-brands, and an Enrollment to Employment program for our graduates!",
    ],
  },
  {
    keywords: ["mission", "vision", "goal", "purpose", "layunin"],
    answers: [
      "Our mission is: \"Empowering Every Filipino Household With A Skilled And Profitable Forex Trader.\" 🌟\n\nWe believe in making Forex Trading knowledge accessible, practical, and life-changing for every Filipino household. Our tagline — \"Confluence is Confidence\" — reflects our approach of combining multiple analysis methods for confident trading decisions.",
    ],
  },
  {
    keywords: ["founded", "established", "when was 8con", "history", "kailan"],
    answers: [
      "8Con Academy was founded in 2021 in Meycauayan, Bulacan, Philippines. 📅 Since then, we've grown into a pioneering financial education institution with 9 sub-brands, offering a blend of theoretical learning and hands-on application.",
    ],
  },
  {
    keywords: ["confluence", "tagline", "motto", "slogan"],
    answers: [
      "Our tagline is \"Confluence is Confidence.\" 💡 In trading, confluence means combining multiple technical and fundamental factors that align to support a trade decision. When these factors come together, it builds confidence in your trading strategy!",
    ],
  },
  {
    keywords: ["unique", "different", "why 8con", "why choose", "advantage", "bakit"],
    answers: [
      "What makes 8Con Academy unique? 🌟\n\n• Hands-on training with real-time market simulations\n• Strong emphasis on risk management & trading psychology\n• FREE Saturday workshops for anyone\n• Full scholarships for OJT interns & Private Scholars\n• Enrollment to Employment program — we help you find a career!\n• 9 sub-brands offering diverse services\n• Proprietary trading tools through 8ConEdge\n• Supportive community of traders & mentors",
    ],
  },

  // ===== COURSE DETAILS =====
  {
    keywords: ["course", "curriculum", "modules", "what will i learn", "program", "kurso"],
    answers: [
      "Our main course is the Forex Derivative Trading Level II: 📚\n\n• Duration: 276 hours (2-3 months)\n• Covers: Market analysis, trading strategies, risk management\n• Includes: Hands-on training with real-time market simulations\n• Access to proprietary Forex tools & trading platforms\n• Certificate of Completion upon graduation\n• Eligible for Enrollment to Employment program\n\nDesigned for both beginners and experienced traders!",
    ],
  },
  {
    keywords: ["forex", "trading", "what is forex", "currency", "market", "foreign exchange"],
    answers: [
      "Forex (Foreign Exchange) is the global marketplace for trading currencies — the largest financial market in the world! 📈\n\nAt 8Con Academy, we teach Forex Derivatives trading through our comprehensive 276-hour course. You'll learn technical analysis, fundamental analysis, risk management, and trading psychology. It's designed for both beginners and experienced traders!",
    ],
  },
  {
    keywords: ["technical analysis", "fundamental analysis", "chart", "candlestick", "indicator"],
    answers: [
      "Our course covers both technical and fundamental analysis in depth! 📊\n\n• Technical Analysis: Reading charts, candlestick patterns, indicators (EMA, Bollinger Bands), support/resistance levels\n• Fundamental Analysis: Understanding economic news, market sentiment, and how global events affect currency prices\n• Trading Psychology: Discipline, risk management, and emotional control\n\nYou'll practice all of this with real-time market simulations!",
    ],
  },
  {
    keywords: ["risk management", "money management", "lot size", "stop loss"],
    answers: [
      "Risk management is one of the core pillars of our curriculum! 🛡️ We teach you how to protect your capital through proper position sizing, stop-loss placement, and money management techniques. Our students learn to trade with discipline — not just for quick profits, but for long-term, sustainable success.",
    ],
  },
  {
    keywords: ["psychology", "mindset", "discipline", "emotions", "mental"],
    answers: [
      "Trading psychology is a key focus at 8Con Academy! 🧠 We teach you how to manage emotions like fear and greed, build a disciplined trading routine, and develop the mental toughness needed for consistent profitability. As our student Clarence shared: \"I used to think forex was 50/50 luck, until I realized it only feels that way without the right education.\"",
    ],
  },
  {
    keywords: ["beginner", "newbie", "start", "new to", "no experience", "first time", "bago", "wala akong alam"],
    answers: [
      "No worries at all! Our course is specifically designed for beginners with zero trading experience. 🌟\n\nHere's the best path to get started:\n1. Attend our FREE Saturday Workshop\n2. Schedule a free consultation\n3. Enroll in the Forex Derivatives course\n4. Learn at your own pace over 2-3 months\n\nYou just need basic comprehension skills and a phone/laptop with internet!",
    ],
  },
  {
    keywords: ["requirement", "need", "prerequisite", "kailangan", "qualification"],
    answers: [
      "The requirements are minimal! ✅ You just need:\n\n• Basic comprehension skills\n• A mobile phone with data OR a laptop with internet connection\n• No prior trading experience required!\n\nOur course is designed to take you from zero to a confident, profitable trader.",
    ],
  },
  {
    keywords: ["how long", "duration", "weeks", "months", "ilang buwan", "276"],
    answers: [
      "The Forex Derivatives course runs for a total of 276 hours. ⏳ Most students complete it within 2 to 3 months, depending on your schedule and commitment. You can learn at a pace that works for you!",
    ],
  },
  {
    keywords: ["certificate", "cert", "diploma", "completion", "sertipiko"],
    answers: [
      "Yes! A Certificate of Completion is issued to all successful graduates of the course. 🎓 It's recognized proof of your forex education and a great addition to your resume!",
    ],
  },
  {
    keywords: ["online", "virtual", "remote", "distance", "zoom"],
    answers: [
      `For the most up-to-date information on online/virtual class options, please message us on our Facebook page:\n${FB_LINK}\n\nOr visit us at the academy! 💻 We recommend the in-person experience for the full benefit of hands-on training and mentorship.`,
    ],
  },
  {
    keywords: ["age", "old", "edad", "minor", "kid", "teenager", "adult"],
    answers: [
      `For specific age requirements, please contact us through our Facebook page:\n${FB_LINK}\n\nOr visit us at the academy. Our courses are generally designed for individuals who are serious about learning forex trading and building financial literacy. 📋`,
    ],
  },

  // ===== ENROLLMENT & BILLING =====
  {
    keywords: ["enroll", "register", "sign up", "join", "apply", "mag-enroll", "paano mag-enroll"],
    answers: [
      `Here's how to enroll at 8Con Academy! 📝\n\n1. Visit us at 8Con Academy, Meycauayan, Bulacan\n2. Or message us on our official Facebook page:\n${FB_LINK}\n3. We recommend attending our FREE Saturday Workshop first!\n\nYou can also use the enrollment form on our website. We accept walk-ins and online inquiries!`,
    ],
  },
  {
    keywords: ["price", "cost", "fee", "how much", "tuition", "afford", "magkano", "bayad"],
    answers: [
      `For pricing details, please visit us at 8Con Academy or message us on our official Facebook page:\n${FB_LINK}\n\n💰 Great news — we offer full scholarships for OJT interns and Private Scholars! Payment options include cash, bank transfer, and credit card via PayPal.`,
    ],
  },
  {
    keywords: ["payment", "pay", "cash", "bank", "paypal", "credit card", "installment"],
    answers: [
      `We accept multiple payment methods! 💳\n\n• Cash payments\n• Bank transfer\n• Credit card payments via PayPal\n\nFor installment or flexible payment options, please contact us directly at the academy or through our Facebook page:\n${FB_LINK}`,
    ],
  },
  {
    keywords: ["scholarship", "free course", "libre", "scholar", "iskolar"],
    answers: [
      `Yes! We currently offer FULL SCHOLARSHIPS! 🎉\n\n• OJT Interns — Full scholarship\n• Private Scholars — Full scholarship\n• Cooperative (Coop) Scholarships — Currently on hold\n\nMessage us on Facebook:\n${FB_LINK}\n\nOr visit the academy for scholarship application details!`,
    ],
  },
  {
    keywords: ["workshop", "free workshop", "saturday workshop", "free class", "libre na class"],
    answers: [
      "We hold a FREE Forex Workshop every Saturday! 📚\n\nIt's the perfect first step before enrolling:\n• No registration fee required\n• Learn the basics of forex trading\n• Meet our mentors and community\n• Get a feel for our teaching style\n\nJust come to 8Con Academy, Meycauayan, Bulacan!",
    ],
  },
  {
    keywords: ["consultation", "consult", "advice", "guidance"],
    answers: [
      `Absolutely! We offer FREE consultations before enrollment. 🤝 It's a great way to understand the course, ask questions, and see if 8Con Academy is the right fit for you.\n\nJust visit us or message our Facebook page:\n${FB_LINK}`,
    ],
  },
  {
    keywords: ["corporate", "company", "team training", "group"],
    answers: [
      `Yes, we offer corporate training packages! 🏢 We require a minimum of 10 participants per batch.\n\nContact us through our Facebook page:\n${FB_LINK}\n\nOr visit us at the academy for custom corporate training options and pricing.`,
    ],
  },

  // ===== SUB-BRANDS =====
  {
    keywords: ["sub-brand", "sub brand", "brands", "services", "serbisyo", "branches"],
    answers: [
      "8Con Academy has 9 specialized sub-brands! 🏢\n\n1. 8ConStruct — Research & statistical consultancy\n2. 8ConEdge — Proprietary forex trading tools\n3. 8ConCise — Entrepreneur networking hub\n4. 8ConVerse — Language certification courses\n5. 8ConNect — Business networking & partnerships\n6. 8ConLift — Scholarships & training programs\n7. 8ConQuest — Thesis & career coaching\n8. 8ConSpace — Co-working space & virtual office\n9. 8ConSult — Business development advisory\n\nAsk me about any specific sub-brand for more details!",
    ],
  },
  {
    keywords: ["8construct", "construct", "research", "statistical", "data analysis"],
    answers: [
      "8ConStruct is our research and statistical consultancy arm! 📊\n\nServices include:\n• Market Research\n• Statistical Analysis\n• Data Visualization\n• Business Intelligence\n\nWe provide comprehensive research and statistical analysis services for businesses, academic institutions, and organizations.",
    ],
  },
  {
    keywords: ["8conedge", "conedge", "edge", "trading tools", "proprietary tools", "indicator"],
    answers: [
      "8ConEdge provides cutting-edge proprietary Forex trading tools! ⚡\n\nServices include:\n• Custom Trading Indicators\n• Market Analysis Tools\n• Automated Trading Systems\n• Risk Management Tools\n\nThese tools are designed specifically for Forex traders to give them a competitive edge in the market.",
    ],
  },
  {
    keywords: ["8concise", "concise", "entrepreneur networking"],
    answers: [
      "8ConCise is our entrepreneur networking hub! 🤝\n\nServices include:\n• Networking Events\n• Business Matching\n• Investor Relations\n• Partnership Development\n\nIt's a dynamic platform connecting entrepreneurs, investors, and business leaders to create opportunities together.",
    ],
  },
  {
    keywords: ["8converse", "converse", "language", "english", "ielts", "toefl", "communication"],
    answers: [
      "8ConVerse offers comprehensive language certification courses! 🗣️\n\nPrograms include:\n• English Proficiency\n• Business Communication\n• IELTS/TOEFL Preparation\n• Multilingual Training\n\nPerfect for enhancing your communication skills for both local and international opportunities!",
    ],
  },
  {
    keywords: ["8connect", "connect", "networking", "business matching"],
    answers: [
      "8ConNect is our business networking platform! 🌐\n\nServices include:\n• Networking Events\n• Business Matching\n• Investor Relations\n• Partnership Development\n\nWe connect entrepreneurs, investors, and business leaders for mutual growth and success.",
    ],
  },
  {
    keywords: ["8conlift", "conlift", "lift", "scholarship program", "community outreach"],
    answers: [
      "8ConLift is our scholarship and training program arm! 🎓\n\nServices include:\n• Full Scholarships\n• Skills Training\n• Mentorship Programs\n• Community Outreach\n\nWe're committed to educational empowerment through accessible learning opportunities for all Filipinos.",
    ],
  },
  {
    keywords: ["8conquest", "conquest", "thesis", "career coaching", "interview"],
    answers: [
      "8ConQuest provides thesis and career coaching services! 🎯\n\nServices include:\n• Thesis Writing Support\n• Career Coaching\n• Interview Preparation\n• Professional Development\n\nPerfect for students and professionals who need guidance in academic and career growth.",
    ],
  },
  {
    keywords: ["8conspace", "conspace", "space", "co-working", "coworking", "virtual office", "desk"],
    answers: [
      "8ConSpace is our co-working and virtual office solution! 🏠\n\nServices include:\n• Flexible Desk Rentals\n• Virtual Office Solutions\n• Startup-Friendly Environment\n• Student Pods\n\nIdeal for freelancers, entrepreneurs, online professionals, and students who need a productive workspace!",
    ],
  },
  {
    keywords: ["8consult", "consult", "business advisory", "startup coaching", "business development"],
    answers: [
      "8ConSult is our business development and startup advisory arm! 💼\n\nServices include:\n• Startup Coaching\n• Business Model Analysis\n• Sales Strategy & Growth Blueprint\n• Investor Deck & Pitch Support\n\nPowered by real-world entrepreneurship experience, spearheaded by Sir Nigel Santos.",
    ],
  },

  // ===== CAREER PATHS =====
  {
    keywords: ["career path", "after graduation", "career options", "what happens after", "pagkatapos"],
    answers: [
      "After graduating, you have 4 exciting career paths! 🚀\n\n1. Funded Trader — Trade with real capital after proving consistency\n2. Workshop Speaker — Lead webinars and represent 8Con at events\n3. Forex Instructor — Teach as a certified Forex Coach\n4. 8Con Franchisee — Own your own trading hub powered by 8Con\n\nAsk me about any specific career path for more details!",
    ],
  },
  {
    keywords: ["funded trader", "fund", "real capital", "trade for", "prop"],
    answers: [
      "Funded Trader is one of our career paths! 💰\n\nAs a Funded Trader, you get to trade with real capital after proving your consistency. Requirements include:\n• Pass internal reviews\n• Psychology evaluation\n• Mock account tests\n• Ongoing mentorship\n\nIt's a great opportunity to earn while applying what you've learned!",
    ],
  },
  {
    keywords: ["workshop speaker", "speaker", "webinar", "events", "teach workshop"],
    answers: [
      "Workshop Speaker is an exciting career path! 🎤\n\nAs a Workshop Speaker, you'll:\n• Lead webinars and workshops\n• Represent 8Con at events\n• Share your trading story with the community\n\nRequirements: Journal excellence, strong communication skills, and a final interview. It's perfect for those who love sharing knowledge!",
    ],
  },
  {
    keywords: ["forex instructor", "instructor", "teacher", "coach", "magturo"],
    answers: [
      "Forex Instructor is a rewarding career path! 👨‍🏫\n\nAs a certified Forex Coach, you'll:\n• Lead classes and training sessions\n• Mentor junior traders\n• Shape the next generation of traders\n\nRequirements: Core competency completion, coaching evaluation, and a mock teaching session. Perfect for those passionate about education!",
    ],
  },
  {
    keywords: ["franchise", "franchisee", "own branch", "business owner", "negosyo"],
    answers: [
      "8Con Franchisee lets you own your own trading hub! 🏪\n\nAs a franchisee, you'll:\n• Own and operate your own 8Con-powered trading academy\n• Receive full operational training\n• Benefit from the 8Con brand and system\n\nRequirements: Full course graduate, business mentorship track, and operations training. It's the ultimate entrepreneurial path!",
    ],
  },

  // ===== INTERNSHIP =====
  {
    keywords: ["intern", "ojt", "internship", "practicum", "on the job"],
    answers: [
      "We have 4 internship positions available! 🎉\n\n1. Marketing — Campaigns, social media, community engagement\n2. IT Department — Trading dashboards, APIs, web development\n3. Accounting — Financial records, reporting, budgets\n4. Multimedia — Content creation, video production, graphics\n\nAll interns receive FULL SCHOLARSHIPS! Apply through our website's Internship section with your resume (PDF, max 10MB).",
    ],
  },
  {
    keywords: ["marketing intern", "marketing position", "social media intern"],
    answers: [
      "Our Marketing Internship includes: 📣\n\n• Brainstorming campaigns & growing communities\n• Copywriting & social media posts\n• Email funnels & ad management\n• Community engagement on Discord, Facebook, TikTok\n• Data-driven decision making\n\nPlus a full scholarship for the Forex course! Apply on our website.",
    ],
  },
  {
    keywords: ["it intern", "it department", "developer intern", "tech intern", "programming"],
    answers: [
      "Our IT Department Internship includes: 💻\n\n• Building trading dashboards & APIs\n• Front-end development (React, Next.js, Vue)\n• Data feed scripts & automation\n• Server maintenance & security\n• Tech stack: Python, SQL, React, Next.js, Vue\n\nPlus a full scholarship for the Forex course! Apply on our website.",
    ],
  },
  {
    keywords: ["accounting intern", "accounting position", "finance intern", "bookkeeping"],
    answers: [
      "Our Accounting Internship includes: 📋\n\n• Daily bookkeeping & cost tracking\n• Financial report generation\n• Budget forecasting\n• Linking trading performance (PIPs) to P&L\n\nPlus a full scholarship for the Forex course! Apply on our website.",
    ],
  },
  {
    keywords: ["multimedia intern", "multimedia position", "video", "content creator", "graphic"],
    answers: [
      "Our Multimedia Internship includes: 🎬\n\n• Shooting B-roll footage\n• Editing short-form content (Reels, YouTube Shorts)\n• Motion graphics & animation\n• Event photography\n• Asset design for all branded content\n\nPlus a full scholarship for the Forex course! Apply on our website.",
    ],
  },
  {
    keywords: ["apply intern", "how to apply", "resume", "application"],
    answers: [
      "To apply for an internship, you'll need: 📄\n\n• Full name, email, and phone number (+63 format)\n• Complete address\n• PDF resume (max 10MB)\n\nApply through our website's Internship section, or visit us at 8Con Academy, Meycauayan, Bulacan!",
    ],
  },

  // ===== CONTACT & LOCATION =====
  {
    keywords: ["contact", "phone", "number", "email", "reach", "call", "message", "tawag"],
    answers: [
      `Here's how to reach us! 📞\n\n• Phone: +63 954 996 1125\n• Email: 8ConAcademy@gmail.com\n• Facebook:\n${FB_LINK}\n• Visit: Meycauayan, Bulacan\n• Business Hours: Mon–Fri, 11:00 AM – 8:00 PM\n\nYou can also use the Contact form on our website!`,
    ],
  },
  {
    keywords: ["location", "address", "where", "find you", "office", "branch", "saan", "nasaan", "map"],
    answers: [
      "We are located at 8Con Academy, Meycauayan, Bulacan, Philippines! 📍\n\nFind us on Google Maps:\nhttps://maps.google.com/?q=8Con+Academy+Meycauayan+Bulacan\n\nBusiness hours: Mon–Fri, 11:00 AM – 8:00 PM. Come visit us anytime!",
    ],
  },
  {
    keywords: ["business hours", "open hours", "schedule", "time", "anong oras", "bukas"],
    answers: [
      `Our business hours are Monday to Friday, 11:00 AM to 8:00 PM. ⏰\n\nOur FREE Forex Workshop is held every Saturday! For specific class schedules, please contact us through Facebook:\n${FB_LINK}\n\nOr visit us at the academy.`,
    ],
  },
  {
    keywords: ["facebook", "fb", "social media", "page", "instagram", "linkedin", "ig"],
    answers: [
      `Find us on social media! 📱\n\n• Facebook:\n${FB_LINK}\n\n• Instagram:\nhttps://www.instagram.com/8conacademy/\n\n• LinkedIn:\nhttps://ph.linkedin.com/company/8con-academy\n\n• Newsletter:\nhttps://www.8connews.org/\n\nFollow us for updates, trading tips, and community events!`,
    ],
  },

  // ===== PARTNERS =====
  {
    keywords: ["partner", "broker", "tickmill", "dupoin", "affiliate"],
    answers: [
      "8Con Academy partners with trusted industry leaders! 🤝\n\n• Tickmill — Our partner trading broker\n• Dupoin — Financial services partner\n\nThese partnerships ensure our students have access to reliable trading platforms and services.",
    ],
  },

  // ===== TRADING TERMS =====
  {
    keywords: ["pip", "pips", "lot", "leverage", "spread", "margin"],
    answers: [
      "Great question! These are essential forex terms you'll learn in our course: 📖\n\n• Pip: Smallest price movement in a currency pair\n• Lot: Unit of measurement for trade size\n• Leverage: Borrowed capital to increase trade exposure\n• Spread: Difference between bid and ask price\n• Margin: Required deposit to open a position\n\nOur 276-hour course covers all of these in depth!",
    ],
  },
  {
    keywords: ["profit", "earn", "kita", "income", "make money", "magkano kinikita"],
    answers: [
      "Forex trading can be profitable, but it requires proper education, discipline, and risk management. 💹\n\nAt 8Con Academy, we focus on building your skills for long-term, sustainable profitability — not quick-money schemes. As our student Hajie shared, he turned a FREE account into $100+ profit in just 6 weeks using what he learned here!",
    ],
  },
  {
    keywords: ["platform", "metatrader", "mt4", "mt5", "app", "software"],
    answers: [
      `Our course covers the trading platforms and tools you'll need! 📱 You'll also get access to proprietary trading tools through 8ConEdge.\n\nFor specific platform details, please visit us or message our Facebook page:\n${FB_LINK}`,
    ],
  },
  {
    keywords: ["demo", "practice", "mock", "simulation", "test account"],
    answers: [
      "Yes! Our course includes hands-on training with real-time market simulations. 🎮 You'll practice trading in a safe environment before risking real capital. It's one of the best ways to build confidence and skills!",
    ],
  },
  {
    keywords: ["scam", "legit", "legitimate", "fake", "totoo", "reliable", "trusted"],
    answers: [
      `8Con Academy is a legitimate, established financial education institution founded in 2021 in Meycauayan, Bulacan! ✅\n\nWe have:\n• Physical academy you can visit\n• Verified student testimonials\n• Trusted broker partnerships (Tickmill, Dupoin)\n• Active Facebook community:\n${FB_LINK}\n• FREE Saturday workshops (try before you enroll!)\n\nYou're welcome to visit us and see for yourself!`,
    ],
  },
  {
    keywords: ["testimonial", "review", "feedback", "student story", "success story"],
    answers: [
      "We have amazing student success stories! 🌟\n\n• Hajie turned a free account into $100+ profit in 6 weeks\n• Ken learned to predict market movements with confidence\n• Clarence mastered technical, fundamental analysis and trading psychology\n• Jhames gained skills to navigate markets effectively\n• CJ gained hands-on professional experience through OJT\n• Ryan developed real-world skills and a disciplined mindset\n\nVisit our website to read their full testimonials!",
    ],
  },
  {
    keywords: ["mentor", "mentorship", "sir", "teacher", "coach", "guro"],
    answers: [
      "Our academy is led by experienced mentors and traders! 👨‍🏫 You'll receive professional guidance throughout your learning journey, from classroom instruction to hands-on trading mentorship. Our consultation arm, 8ConSult, is spearheaded by Sir Nigel Santos.",
    ],
  },
  {
    keywords: ["nigel", "santos", "founder", "owner", "ceo"],
    answers: [
      "Sir Nigel Santos is a key figure at 8Con Academy, spearheading our business consultation arm, 8ConSult. 💼 He brings real-world entrepreneurship experience to guide students and startups alike. For more about our team, visit the About section on our website!",
    ],
  },
  {
    keywords: ["newsletter", "news", "updates", "8connews"],
    answers: [
      "Stay updated with 8Con Academy through our newsletter at 8connews.org! 📰 Get the latest trading tips, academy updates, and community news delivered to you.",
    ],
  },
];

const quickSuggestions = [
  "How can I enroll?",
  "What is 8Con Academy?",
  "Sub-brands",
  "Career paths",
  "Internship positions",
  "Scholarships",
  "Free workshop",
  "Contact info",
];

const allFaqs = categories.flatMap((cat) => cat.faqs);

const tokenize = (text) =>
  text.toLowerCase().split(/\s+/).filter((w) => w.length > 1 && !STOP_WORDS.has(w));

const findBestFaqMatch = (input) => {
  const inputTokens = tokenize(input);
  if (inputTokens.length === 0) return null;

  let match = null;
  let bestScore = 0;

  for (const faq of allFaqs) {
    const qTokens = tokenize(faq.question);
    let score = 0;

    for (const word of inputTokens) {
      if (qTokens.some((qt) => qt === word || qt.includes(word) && word.length > 3)) {
        score += 3;
      } else if (faq.answer.toLowerCase().includes(word) && word.length > 3) {
        score += 1;
      }
    }

    const coverage = score / (inputTokens.length * 3);
    if (coverage > 0.3 && score > bestScore) {
      bestScore = score;
      match = faq;
    }
  }

  return bestScore >= MIN_MATCH_SCORE ? match : null;
};

const findGeneralResponse = (input) => {
  const lower = input.toLowerCase().trim();

  for (const r of generalResponses) {
    for (const kw of r.keywords) {
      if (kw.includes(" ")) {
        if (lower.includes(kw)) return r;
      } else {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        if (regex.test(lower)) return r;
      }
    }
  }
  return null;
};

const FALLBACK_REPLIES = [
  `I'm sorry, I don't have an answer for that right now. 🤔 For further assistance, please email us directly at:\n8ConAcademy@gmail.com\n\nOr message us on our Facebook page:\n${FB_LINK}\n\nYou can also try picking a topic below!`,
  `Hmm, I couldn't find a match for that one. 📧 Please send your question to:\n8ConAcademy@gmail.com\n\nYou can also reach us on Facebook:\n${FB_LINK}`,
  `That's a great question, but it's beyond what I can answer right now. 📩 Please reach out to us at:\n8ConAcademy@gmail.com\n\nOr call: +63 954 996 1125\n\nFacebook:\n${FB_LINK}`,
];

const getReply = (input) => {
  const generalMatch = findGeneralResponse(input);
  if (generalMatch) return { text: pickRandom(generalMatch.answers), showSuggestions: false };

  const faqMatch = findBestFaqMatch(input);
  if (faqMatch) return { text: faqMatch.answer, showSuggestions: false };

  return { text: pickRandom(FALLBACK_REPLIES), showSuggestions: true };
};

const addBotReply = (setIsTyping, setMessages, reply, showSuggestions = false) => {
  setIsTyping(true);
  const delay = Math.min(TYPING_DELAY + reply.length * 3, 1800);
  setTimeout(() => {
    setIsTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply, time: formatTime(), showSuggestions }]);
  }, delay);
};

const InputBar = ({ inputValue, setInputValue, onSend, onKeyDown, isTyping }) => (
  <div className="chatbot-input-bar">
    <input
      type="text"
      className="chatbot-input"
      placeholder="Type your message..."
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

const renderTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\bhttps?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);

    const rendered = parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a key={`${lineIdx}-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="chatbot-link">
            {part}
          </a>
        );
      }
      if (emailRegex.test(part)) {
        return (
          <a key={`${lineIdx}-${i}`} href={`mailto:${part}`} className="chatbot-link">
            {part}
          </a>
        );
      }
      return part;
    });

    return (
      <React.Fragment key={lineIdx}>
        {rendered}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

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
    <div className="chatbot-msg-content">
      <div className={`chatbot-bubble ${msg.from}`}>{renderTextWithLinks(msg.text)}</div>
      {msg.time && <span className={`chatbot-msg-time ${msg.from}`}>{msg.time}</span>}
    </div>
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

const QuickSuggestions = ({ onSelect }) => (
  <div className="chatbot-quick-suggestions">
    {quickSuggestions.map((text, i) => (
      <button key={i} className="chatbot-quick-btn" onClick={() => onSelect(text)}>
        {text}
      </button>
    ))}
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
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, view]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setView("chat");
    setMessages([{ from: "bot", text: `Here are some questions about ${category.name.toLowerCase()}. Pick one or type your own!`, time: formatTime() }]);
  };

  const handleFaqClick = (faq) => {
    setAskedQuestions((prev) => [...prev, faq.question]);
    setMessages((prev) => [...prev, { from: "user", text: faq.question, time: formatTime() }]);
    addBotReply(setIsTyping, setMessages, faq.answer);
  };

  const handleSendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed, time: formatTime() }]);
    setInputValue("");

    if (view === "home") {
      setView("chat");
      setActiveCategory(null);
    }

    const reply = getReply(trimmed);
    addBotReply(setIsTyping, setMessages, reply.text, reply.showSuggestions);
  };

  const handleInputSend = () => handleSendMessage(inputValue);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSend();
    }
  };

  const handleQuickSuggestion = (text) => handleSendMessage(text);

  const handleBack = () => {
    setView("home");
    setMessages([]);
    setActiveCategory(null);
    setAskedQuestions([]);
  };

  const remainingFaqs = activeCategory
    ? activeCategory.faqs.filter((faq) => !askedQuestions.includes(faq.question))
    : [];

  const lastMessage = messages[messages.length - 1];
  const showQuickSuggestions = lastMessage?.from === "bot" && lastMessage?.showSuggestions && !isTyping;

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

              <div className="chatbot-messages" ref={messagesContainerRef}>
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    msg={msg}
                    showAvatar={msg.from === "bot" && (i === 0 || messages[i - 1]?.from !== "bot")}
                  />
                ))}

                {isTyping && <TypingIndicator />}

                {showQuickSuggestions && (
                  <QuickSuggestions onSelect={handleQuickSuggestion} />
                )}

                {activeCategory && !isTyping && remainingFaqs.length > 0 && (
                  <div className="chatbot-faq-list">
                    {remainingFaqs.map((faq, i) => (
                      <button key={i} className="chatbot-faq-btn" onClick={() => handleFaqClick(faq)}>
                        {faq.question}
                      </button>
                    ))}
                  </div>
                )}

              </div>

              <InputBar
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSend={handleInputSend}
                onKeyDown={handleKeyDown}
                isTyping={isTyping}
                inputRef={inputRef}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotFAQ;
