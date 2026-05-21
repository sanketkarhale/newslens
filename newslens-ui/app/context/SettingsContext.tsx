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
  // Expanded fields
  defaultLanguage: string;
  setDefaultLanguage: (val: string) => void;
  activePlan: string;
  setActivePlan: (val: string) => void;
  emailDigest: string;
  setEmailDigest: (val: string) => void;
  pushEnabled: boolean;
  setPushEnabled: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  paymentCard: string;
  setPaymentCard: (val: string) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayName] = useState("Sanket G. Karhale");
  const [email, setEmail] = useState("founder@newslens.ai");
  const [aggressiveAi, setAggressiveAi] = useState(false);
  const [radarAlerts, setRadarAlerts] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  // New fields
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [activePlan, setActivePlan] = useState("Pro Analyst");
  const [emailDigest, setEmailDigest] = useState("daily");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paymentCard, setPaymentCard] = useState("Visa ending in 4242");

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("nl_displayName");
    const savedEmail = localStorage.getItem("nl_email");
    const savedAggressiveAi = localStorage.getItem("nl_aggressiveAi");
    const savedRadarAlerts = localStorage.getItem("nl_radarAlerts");
    const savedDataSaver = localStorage.getItem("nl_dataSaver");

    const savedLang = localStorage.getItem("nl_defaultLanguage");
    const savedPlan = localStorage.getItem("nl_activePlan");
    const savedEmailDigest = localStorage.getItem("nl_emailDigest");
    const savedPushEnabled = localStorage.getItem("nl_pushEnabled");
    const savedSoundEnabled = localStorage.getItem("nl_soundEnabled");
    const savedPaymentCard = localStorage.getItem("nl_paymentCard");

    if (savedName) setDisplayName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedAggressiveAi !== null) setAggressiveAi(savedAggressiveAi === "true");
    if (savedRadarAlerts !== null) setRadarAlerts(savedRadarAlerts === "true");
    if (savedDataSaver !== null) setDataSaver(savedDataSaver === "true");

    if (savedLang) setDefaultLanguage(savedLang);
    if (savedPlan) setActivePlan(savedPlan);
    if (savedEmailDigest) setEmailDigest(savedEmailDigest);
    if (savedPushEnabled !== null) setPushEnabled(savedPushEnabled === "true");
    if (savedSoundEnabled !== null) setSoundEnabled(savedSoundEnabled === "true");
    if (savedPaymentCard) setPaymentCard(savedPaymentCard);
    
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

    localStorage.setItem("nl_defaultLanguage", defaultLanguage);
    localStorage.setItem("nl_activePlan", activePlan);
    localStorage.setItem("nl_emailDigest", emailDigest);
    localStorage.setItem("nl_pushEnabled", String(pushEnabled));
    localStorage.setItem("nl_soundEnabled", String(soundEnabled));
    localStorage.setItem("nl_paymentCard", paymentCard);
  }, [displayName, email, aggressiveAi, radarAlerts, dataSaver, defaultLanguage, activePlan, emailDigest, pushEnabled, soundEnabled, paymentCard, isLoaded]);

  return (
    <SettingsContext.Provider value={{
      displayName, setDisplayName,
      email, setEmail,
      aggressiveAi, setAggressiveAi,
      radarAlerts, setRadarAlerts,
      dataSaver, setDataSaver,
      defaultLanguage, setDefaultLanguage,
      activePlan, setActivePlan,
      emailDigest, setEmailDigest,
      pushEnabled, setPushEnabled,
      soundEnabled, setSoundEnabled,
      paymentCard, setPaymentCard,
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
