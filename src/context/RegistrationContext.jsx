import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const openRegistration = () => setShowRegistration(true);
  const closeRegistration = () => setShowRegistration(false);

  return (
    <RegistrationContext.Provider value={{ showRegistration, openRegistration, closeRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
