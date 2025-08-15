import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Aqui defines os textos em cada idioma
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      signup: "Sign up",
      home: "Home",
      logout: "Logout",
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo",
      login: "Entrar",
      signup: "Criar conta",
      home: "Início",
      logout: "Sair",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: Localization.locale.startsWith("pt") ? "pt" : "en", // Detecta idioma do sistema
  fallbackLng: "en", // Se não encontrar, usa inglês
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
