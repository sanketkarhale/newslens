"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  aggressiveAi: boolean;
  setAggressiveAi: (val: boolean) => void;
  radarAlerts: boolean;
  setRadarAlerts: (val: boolean) => void;
  dataSaver: boolean;
  setDataSaver: (val: boolean) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayName] = useState("Sanket G. Karhale");
  const [email, setEmail] = useState("founder@newslens.ai");
  const [aggressiveAi, setAggressiveAi] = useState(false);
  const [radarAlerts, setRadarAlerts] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("nl_displayName");
    const savedEmail = localStorage.getItem("nl_email");
    const savedAggressiveAi = localStorage.getItem("nl_aggressiveAi");
    const savedRadarAlerts = localStorage.getItem("nl_radarAlerts");
    const savedDataSaver = localStorage.getItem("nl_dataSaver");

    if (savedName) setDisplayName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAggressiveAi !== null) setAggressiveAi(savedAggressiveAi === "true");
    if (savedRadarAlerts !== null) setRadarAlerts(savedRadarAlerts === "true");
    if (savedDataSaver !== null) setDataSaver(savedDataSaver === "true");
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage when values change (if loaded)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nl_displayName", displayName);
    localStorage.setItem("nl_email", email);
    localStorage.setItem("nl_aggressiveAi", String(aggressiveAi));
    localStorage.setItem("nl_radarAlerts", String(radarAlerts));
    localStorage.setItem("nl_dataSaver", String(dataSaver));
  }, [displayName, email, aggressiveAi, radarAlerts, dataSaver, isLoaded]);

  return (
    <SettingsContext.Provider value={{
      displayName, setDisplayName,
      email, setEmail,
      aggressiveAi, setAggressiveAi,
      radarAlerts, setRadarAlerts,
      dataSaver, setDataSaver,
      isLoaded
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
