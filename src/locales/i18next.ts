import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './en-US.json';
import hiIN from './hi-IN.json';
import idID from './id-ID.json';
import itIT from './it-IT.json';
import jaJP from './ja-JP.json';
import koKR from './ko-KR.json';
import ptPT from './pt-PT.json';
import ruRU from './ru-RU.json';
import thTH from './th-TH.json';
import viVN from './vi-VN.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';

const resources = {
    "en-US": {
        common: enUS
    },
    "hi-IN": {
        common: hiIN
    },
    "id-ID": {
        common: idID
    },
    "it-IT": {
        common: itIT
    },
    "ja-JP": {
        common: jaJP
    },
    "ko-KR": {
        common: koKR
    },
    "pt-PT": {
        common: ptPT
    },
    "ru-RU": {
        common: ruRU
    },
    "th-TH": {
        common: thTH
    },
    "vi-VN": {
        common: viVN
    },
    "zh-CN": {
        common: zhCN
    },
    "zh-TW": {
        common: zhTW
    }
};


i18n.use(initReactI18next).init({
    resources: resources,
    lng: 'en-US',
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en-US',
});

export default i18n;