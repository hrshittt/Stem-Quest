import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k })

const messages = {
  en: {
    welcome: 'Welcome to STEM Quest',
    getStarted: 'GET STARTED',
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    alreadyAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    backToTopics: 'Back to Topics',
    submit: 'Submit',
    retry: 'Retry',
    continue: 'Continue'
  },
  hi: {
    welcome: 'एसटीईएम क्वेस्ट में आपका स्वागत है',
    getStarted: 'शुरू करें',
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    alreadyAccount: 'क्या आपका अकाउंट है?',
    dontHaveAccount: 'क्या आपका अकाउंट नहीं है?',
    backToTopics: 'विषयों पर वापस जाएं',
    submit: 'सबमिट',
    retry: 'फिर से प्रयास करें',
    continue: 'आगे बढ़ें'
  }
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useMemo(() => (key) => messages[lang]?.[key] ?? messages.en[key] ?? key, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)



