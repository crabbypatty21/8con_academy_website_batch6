import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "light" : "dark");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const colors = {
    bgPrimary: isDark ? "#131B21" : "#E9F1F9",
    bgSecondary: isDark ? "#19232A" : "#EFF9FF",
    bgTertiary: isDark ? "#19232A" : "#EFF9FF",
    bgSurface: isDark ? "#121411" : "#f8f9fa",
    bgCard: isDark ? "#19232A" : "#ffffff",

    textPrimary: isDark ? "#ffffff" : "#373737",
    textSecondary: isDark ? "rgba(255,255,255,0.8)" : "#373737",
    textMuted: isDark ? "#cccccc" : "#828282",
    textHeading: isDark ? "#ffffff" : "#373737",
    textBody: isDark ? "#E4EED3" : "#373737",

    accentGreen: isDark ? "#0edb61" : "#059669",
    accentGreenLight: isDark ? "#75F94C" : "#10b981",
    accentGreenDark: isDark ? "#068c3b" : "#047857",
    accentGreenHover: isDark ? "#2DB062" : "#059669",
    accentRed: isDark ? "#ff1f2c" : "#dc2626",
    accentRedDark: isDark ? "#990f17" : "#b91c1c",

    cardBg: isDark ? "rgba(255,255,255,0.1)" : "#ffffff",
    cardBorder: isDark ? "rgba(255,255,255,0.2)" : "#e2e8f0",
    cardShadow: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)",

    headerScrolledBg: isDark ? "rgba(19,27,33,0.87)" : "rgba(255,255,255,0.95)",

    footerBg: isDark ? "#000000" : "#1e293b",
    footerText: isDark ? "#ffffff" : "#f1f5f9",
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
