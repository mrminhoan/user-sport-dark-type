import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import en from "/public/locales/en/translation.json";
import vi from "/public/locales/vi/translation.json";
import ko from "/public/locales/ko/translation.json";

const defaultLang = localStorage.getItem("lang");

const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    },
    ko: {
        translation: ko
    }
};

i18n
    .use(initReactI18next) 
    .init({
        resources,
        lng: defaultLang || 'ko',
        // keySeparator: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;