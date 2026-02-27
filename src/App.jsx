import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SubBrands from "./components/SubBrand";
import Construct from "./components/Construct";
import ConEdge from "./components/Conedge";
import ConCise from "./components/Concise";
import ConVerse from "./components/Converse";
import ConNect from "./components/Connect";
import ConLift from "./components/Conlift";
import ConPact from "./components/Conpact";
import ConQuest from "./components/Conquest";
import ConSpace from "./components/Conspace";
import ConSult from "./components/Consult";
import AboutUs from "./components/AboutUs";
import Loader from "./components/Loader";
import Registration from "./components/Registration";
import ChatbotFAQ from "./components/ChatbotFAQ";

function App() {
  const [loading, setLoading] = useState(true);

  // On initial load only: prevent browser from remembering scroll
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
          }}
        >
          <Loader />
        </div>
      ) : (
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sub-brands" element={<SubBrands />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/8construct" element={<Construct />} />
              <Route path="/8conedge" element={<ConEdge />} />
              <Route path="/8concise" element={<ConCise />} />
              <Route path="/8converse" element={<ConVerse />} />
              <Route path="/8connect" element={<ConNect />} />
              <Route path="/8conlift" element={<ConLift />} />
              <Route path="/8conpact" element={<ConPact />} />
              <Route path="/8conquest" element={<ConQuest />} />
              <Route path="/8conspace" element={<ConSpace />} />
              <Route path="/8consult" element={<ConSult />} />
              <Route path="/registration" element={<Registration />} />
          </Routes>
          <ChatbotFAQ />
        </Router>
      )}
    </>
  );
}

export default App;
