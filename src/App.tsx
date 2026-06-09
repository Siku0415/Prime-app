import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import { 
  Download, 
  Smartphone, 
  Zap, 
  TrendingUp, 
  Coins, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Globe, 
  RefreshCw, 
  ShieldAlert,
  Play,
  Heart,
  HelpCircle,
  Menu,
  X,
  Share2
} from 'lucide-react';

// Live matka markets list with details
interface Market {
  id: string;
  nameEN: string;
  nameHI: string;
  openTime: string;
  closeTime: string;
  pattiOpen: string;
  jodi: string;
  pattiClose: string;
  status: 'LIVE' | 'CLOSED' | 'WAITING';
}

const INITIAL_MARKETS: Market[] = [
  { id: 'kalyan_morning', nameEN: 'KALYAN MORNING', nameHI: 'कल्याण मॉर्निंग', openTime: '11:00 AM', closeTime: '12:00 PM', pattiOpen: '235', jodi: '08', pattiClose: '125', status: 'CLOSED' },
  { id: 'sridevi', nameEN: 'SRIDEVI', nameHI: 'श्रीदेवी', openTime: '11:35 AM', closeTime: '12:35 PM', pattiOpen: '149', jodi: '49', pattiClose: '126', status: 'CLOSED' },
  { id: 'time_bazar', nameEN: 'TIME BAZAR', nameHI: 'टाइम बाजार', openTime: '01:00 PM', closeTime: '02:00 PM', pattiOpen: '456', jodi: '56', pattiClose: '150', status: 'CLOSED' },
  { id: 'madhur_day', nameEN: 'MADHUR DAY', nameHI: 'मधुर डे', openTime: '01:30 PM', closeTime: '02:30 PM', pattiOpen: '139', jodi: '32', pattiClose: '237', status: 'LIVE' },
  { id: 'milan_day', nameEN: 'MILAN DAY', nameHI: 'मिलन डे', openTime: '03:00 PM', closeTime: '05:00 PM', pattiOpen: '468', jodi: '81', pattiClose: '137', status: 'LIVE' },
  { id: 'rajdhani_day', nameEN: 'RAJDHANI DAY', nameHI: 'राजधानी डे', openTime: '03:00 PM', closeTime: '05:00 PM', pattiOpen: '249', jodi: '55', pattiClose: '140', status: 'LIVE' },
  { id: 'kalyan', nameEN: 'KALYAN', nameHI: 'कल्याण', openTime: '04:30 PM', closeTime: '06:30 PM', pattiOpen: '100', jodi: '18', pattiClose: '189', status: 'LIVE' },
  { id: 'sridevi_night', nameEN: 'SRIDEVI NIGHT', nameHI: 'श्रीदेवी नाइट', openTime: '07:00 PM', closeTime: '08:00 PM', pattiOpen: '349', jodi: '61', pattiClose: '146', status: 'WAITING' },
  { id: 'milan_night', nameEN: 'MILAN NIGHT', nameHI: 'मिलन नाइट', openTime: '09:00 PM', closeTime: '11:00 PM', pattiOpen: '159', jodi: '50', pattiClose: '230', status: 'WAITING' },
  { id: 'rajdhani_night', nameEN: 'RAJDHANI NIGHT', nameHI: 'राजधानी नाइट', openTime: '09:00 PM', closeTime: '11:00 PM', pattiOpen: '238', jodi: '34', pattiClose: '248', status: 'WAITING' }
];

// Supported Languages List
const LANGUAGES = [
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
] as const;

type LangCode = typeof LANGUAGES[number]['code'];

// Content translations dictionary
const LANGUAGE_DATA: Record<LangCode, {
  title: string;
  tagline: string;
  downloadBtn: string;
  subDownload: string;
  winLakhs: string;
  instantDeposit: string;
  autoSystem: string;
  liveSupport: string;
  playersOnline: string;
  fastResults: string;
  fastResultsSub: string;
  instantPayments: string;
  instantPaymentsSub: string;
  safeSec: string;
  safeSecSub: string;
  gameRates: string;
  calcWinnings: string;
  selectGame: string;
  enterAmount: string;
  youWillGet: string;
  playToWin: string;
  recentWinners: string;
  installGuide: string;
  step1: string;
  step1Sub: string;
  step2: string;
  step2Sub: string;
  step3: string;
  step3Sub: string;
  step4: string;
  step4Sub: string;
  faqTitle: string;
  navHome: string;
  navFeatures: string;
  navResults: string;
  navRates: string;
  navGuide: string;
  disclaimer: string;
  guaranteedAuto: string;
}> = {
  en: {
    title: "India's Most Trusted Matka App",
    tagline: "India's No. 1 Satta Matka platform with standard fast timings, lightning-quick results, and instant 24/7 payments. (Min Deposit only ₹200)",
    downloadBtn: "Download Prime Matka App",
    subDownload: "Safe & Secure .apk File (8.4 MB)",
    winLakhs: "Download Today & Win Lakhs of Rupees!",
    instantDeposit: "Min Deposit ₹200 & 24/7 Withdrawal",
    autoSystem: "Automatic 24/7 System",
    liveSupport: "24x7 Dedicated Live Support",
    playersOnline: "Active Players Online Currently",
    fastResults: "Fastest Live Results",
    fastResultsSub: "We declare results 100% on time with extreme accuracy.",
    instantPayments: "Instant 24x7 Settlement",
    instantPaymentsSub: "Receive your winning amount in your bank/UPI 24/7 instantly within 1 minute.",
    safeSec: "100% Secure & Trusted",
    safeSecSub: "Your identity and money are backed by our ultra-secured automated network system.",
    gameRates: "Premium Game Rates",
    calcWinnings: "Interactive Winnings Calculator",
    selectGame: "Select Game Type",
    enterAmount: "Enter Bid Amount (₹)",
    youWillGet: "You Will Receive Instantly:",
    playToWin: "Download App to Play Now",
    recentWinners: "Live Payout Ledger",
    installGuide: "How to Download & Install?",
    step1: "1. Click the Download Button",
    step1Sub: "Tap on any Download App button on our webpage to download the official secure APK file.",
    step2: "2. Confirm Chrome Warning",
    step2Sub: "If Google Chrome prompts 'File might be harmful', click on 'Download Anyway'. Our APK is certified virus-free.",
    step3: "3. Enable Unknown Sources",
    step3Sub: "Go to settings or click open, and enable 'Allow Installation from Unknown Sources' to install the app.",
    step4: "4. Register in 10 Seconds",
    step4Sub: "Enter your name, mobile number, and start exploring live markets!",
    faqTitle: "Frequently Asked Questions",
    navHome: "Home",
    navFeatures: "Features",
    navResults: "Results",
    navRates: "Rates",
    navGuide: "Guide",
    disclaimer: "Disclaimer: This app is intended for users 18+ only. Satta Matka gaming involves financial risk, please play responsibly.",
    guaranteedAuto: "Auto deposit (Min ₹200) & withdrawal approved 24/7 instantly without latency.",
  },
  hi: {
    title: "भारत का सबसे भरोसेमंद मटका एप्लिकेशन",
    tagline: "भारत का नंबर 1 सट्टा मटका प्लेटफॉर्म। तेज़ परिणाम, पारदर्शी खेल, मिनिमम डिपाजिट ₹200 और 24 घंटे सैटलमेंट।",
    downloadBtn: "अप्लिकेशन डाउनलोड करें",
    subDownload: "सुरक्षित .apk फ़ाइल डाउनलोड करें (8.4 MB)",
    winLakhs: "आज ही डाउनलोड करें और जीतें लाखों रुपए!",
    instantDeposit: "मिनिमम डिपाजिट ₹200 & 24/7 विड्रॉल",
    autoSystem: "24/7 पूरी तरह से ऑटोमैटिक सिस्टम",
    liveSupport: "24x7 लाइव व्हाट्सएप और कॉल सपोर्ट",
    playersOnline: "सक्रिय खिलाड़ी अभी खेल रहे हैं",
    fastResults: "सबसे पहले लाइव परिणाम",
    fastResultsSub: "सभी मटका बाजारों के सटीक और सबसे तेज़ परिणाम सीधे हमारे सर्वर से घोषित होते हैं।",
    instantPayments: "तुरंत भुगतान (24x7)",
    instantPaymentsSub: "अपनी जीती हुई राशि मात्र 1 मिनट में 24/7 अपने बैंक खाते या UPI में सीधे प्राप्त करें।",
    safeSec: "100% सुरक्षित और गुप्त",
    safeSecSub: "आपका सारा डेटा एन्क्रिप्टेड है। बिना किसी डर के खुलकर खेलें और तुरंत जीतें।",
    gameRates: "बेहतरीन गेम रेट्स",
    calcWinnings: "इंटरएक्टिव कमाई कैलकुलेटर",
    selectGame: "गेम का प्रकार चुनें",
    enterAmount: "बिड राशि दर्ज करें (₹)",
    youWillGet: "आप तुरंत प्राप्त करेंगे:",
    playToWin: "खेलने के लिए ऐप अभी डाउनलोड करें",
    recentWinners: "लाइव भुगतान प्रमाण",
    installGuide: "डाउनलोड और इंस्टॉल कैसे करें?",
    step1: "1. डाउनलोड बटन दबाएं",
    step1Sub: "हमारी वेबसाइट पर दिए गए 'डाउनलोड ऐप' बटन पर क्लिक करके सुरक्षित एपीके फ़ाइल डाउनलोड करें।",
    step2: "2. वॉर्निंग मंजूर करें",
    step2Sub: "क्रोम ब्राउज़र में 'File might be harmful' आने पर बिना डरे 'Download anyway' पर क्लिक करें।",
    step3: "3. अननोन सोर्स चालू करें",
    step3Sub: "फ़ाइल को ओपन करें और अपने फ़ोन सेटिंग्स में जाकर 'Allow from this source' को इनेबल करें।",
    step4: "4. तुरंत रजिस्टर करें",
    step4Sub: "अपना नाम और मोबाइल नंबर डालकर एकाउंट बनाएं और सीधे मटका चार्ट्स पर खेलना शुरू करें!",
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    navHome: "मुख्य पृष्ठ",
    navFeatures: "विशेषताएं",
    navResults: "लाइव रिजल्ट",
    navRates: "गेम रेट्स",
    navGuide: "सीखें",
    disclaimer: "चेतावनी: यह ऐप केवल 18+ आयु वर्ग के लिए है। मटका खेलों में वित्तीय जोखिम शामिल है, कृपया जिम्मेदारी से खेलें।",
    guaranteedAuto: "ऑटो डिपाजिट (न्यूनतम ₹200) और 24/7 विड्रॉल सीधे आपके अकाउंट में तुरंत मिलता है।",
  },
  mr: {
    title: "भारतातील सर्वात विश्वसनीय मटका ॲप",
    tagline: "भारतातील नं. 1 सट्टा मटका प्लॅटफॉर्म. जलद निकाल, अत्यंत पारदर्शक खेळ, किमान डिपॉझिट ₹200 आणि २४ तास पेमेंट.",
    downloadBtn: "अधिकृत ॲप डाउनलोड करा",
    subDownload: "सुरक्षित .apk फाईल डाउनलोड करा (8.4 MB)",
    winLakhs: "आजच डाउनलोड करा आणि लाखों रुपये जिंका!",
    instantDeposit: "किमान डिपॉझिट ₹200 आणि 24/7 विड्रॉल",
    autoSystem: "पूर्णपणे स्वयंचलित 24/7 सिस्टीम",
    liveSupport: "24x7 थेट व्हॉट्सॲप आणि कॉल सपोर्ट",
    playersOnline: "सक्रिय खेळाडू सध्या खेळत आहेत",
    fastResults: "सर्वात जलद थेट निकाल",
    fastResultsSub: "अत्यंत अचूक आणि जलद वेळेवर निकाल थेट आमच्या सर्व्हरवरून घोषित होतात.",
    instantPayments: "त्वरित विड्रॉल (24x7)",
    instantPaymentsSub: "तुमची जिंकलेली रक्कम अवघ्या 1 मिनिटात थेट तुमच्या बँक किंवा UPI खात्यात मिळवा.",
    safeSec: "100% सुरक्षित आणि गोपनीय",
    safeSecSub: "तुमचा सर्व डेटा एनक्रिप्टेड आणि अति-सुरक्षित स्वयंचलित नेटवर्कने सुरक्षित आहे.",
    gameRates: "सर्वोत्तम गेम रेट्स",
    calcWinnings: "इंटरॲक्टिव्ह कमाई कॅल्क्युलेटर",
    selectGame: "गेमचा प्रकार निवडा",
    enterAmount: "बिड रक्कम टाका (₹)",
    youWillGet: "तुम्हाला लगेच मिळतील:",
    playToWin: "खेळण्यासाठी आताच ॲप डाउनलोड करा",
    recentWinners: "थेट पेमेंट पुरावा",
    installGuide: "डाउनलोड आणि इंस्टॉल कसे करायचे?",
    step1: "1. डाउनलोड बटण दाबा",
    step1Sub: "आमच्या वेबसाईटवरील 'डाउनलोड ॲप' बटणावर क्लिक करून थेट अधिकृत एपीके फाईल डाउनलोड करा.",
    step2: "2. क्रोम वॉर्निंग मंजूर करा",
    step2Sub: "क्रोम ब्राउझरमध्ये 'File might be harmful' आल्यास काळजी न करता 'Download anyway' वर क्लिक करा.",
    step3: "3. अननोन सोर्स चालू करा",
    step3Sub: "फाईल ओपन करा आणि तुमच्या फोन सेटिंग्समध्ये जाऊन 'Allow from this source' चालू करा.",
    step4: "4. लगेच रजिस्ट्रेशन करा",
    step4Sub: "तुमचे नाव आणि मोबाईल नंबर टाकून खाते बनवा आणि थेट मटका खेळणे सुरू करा!",
    faqTitle: "सतत विचारले जाणारे प्रश्न",
    navHome: "मुख्य पृष्ठ",
    navFeatures: "वैशिष्ट्ये",
    navResults: "थेट निकाल",
    navRates: "गेम रेट्स",
    navGuide: "मार्गदर्शन",
    disclaimer: "चेतावणी: हे ॲप केवळ १८+ वयोगटासाठी आहे. मटका खेळामध्ये आर्थिक जोखीम समाविष्ट आहे, कृपया जबाबदारीने खेळा.",
    guaranteedAuto: "ऑटो डिपॉझिट (किमान ₹200) आणि 24/7 त्वरित विड्रॉल स्वयंचलित पद्धतीने मंजूर केले जाते.",
  },
  kn: {
    title: "ಭಾರತದ ಅತ್ಯಂತ ನಂಬಿಕಸ್ಥ ಮಟ್ಕಾ ಆಪ್",
    tagline: "ಭಾರತದ ನಂ. 1 ಸಟ್ಟಾ ಮಟ್ಕಾ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್. ವೇಗದ ಫಲಿತಾಂಶಗಳು, ತ್ವರಿತ ಪಾವತಿಗಳು ಮತ್ತು ಕನಿಷ್ಠ ಡೆಪಾಸಿಟ್ ಕೇವಲ ₹200.",
    downloadBtn: "ಪ್ರೈಮ್ ಮಟ್ಕಾ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    subDownload: "ಸುರಕ್ಷಿತ .apk ಫೈಲ್ (8.4 MB)",
    winLakhs: "ಇಂದೇ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಲಕ್ಷಾಂತರ ರೂಪಾಯಿ ಗೆಲ್ಲಿ!",
    instantDeposit: "ಕನಿಷ್ಠ ಡೆಪಾಸಿಟ್ ₹200 ಮತ್ತು 24/7 ವಿತ್‌ಡ್ರಾ",
    autoSystem: "ಸ್ವಯಂಚಾಲಿತ 24/7 ಸಿಸ್ಟಮ್",
    liveSupport: "24x7 ಲೈವ್ ವಾಟ್ಸಾಪ್ ಮತ್ತು ಕಾಲ್ ಸಪೋರ್ಟ್",
    playersOnline: "ಪ್ರಸ್ತುತ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿರುವ ಸಕ್ರಿಯ ಆಟಗಾರರು",
    fastResults: "ಅತಿ ವೇಗದ ಲೈವ್ ಫಲಿತಾಂಶಗಳು",
    fastResultsSub: "ನಾವು 100% ನಿಖರತೆಯೊಂದಿಗೆ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಫಲಿತಾಂಶಗಳನ್ನು ಪ್ರಕಟಿಸುತ್ತೇವೆ.",
    instantPayments: "ತ್ವರಿತ 24/7 ಸೆಟಲ್‌ಮೆಂಟ್",
    instantPaymentsSub: "ನೀವು ಗೆದ್ದ ಹಣವನ್ನು ಕೇವಲ 1 ನಿಮಿಷದಲ್ಲಿ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್/UPI ಗೆ ಪಡೆಯಿರಿ.",
    safeSec: "100% ಸುರಕ್ಷಿತ ಮತ್ತು ನಂಬಿಕಸ್ಥ",
    safeSecSub: "ನಿಮ್ಮ ಗುರುತು ಮತ್ತು ಹಣವನ್ನು ನಮ್ಮ ಅತ್ಯಂತ ಸುರಕ್ಷಿತ ಸ್ವಯಂಚಾಲಿತ ನೆಟ್‌ವರ್ಕ್ ವ್ಯವಸ್ಥೆಯಿಂದ ರಕ್ಷಿಸಲಾಗಿದೆ.",
    gameRates: "ಪ್ರೀಮಿಯಂ ಗೇಮ್ ದರಗಳು",
    calcWinnings: "ಗಳಿಕೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    selectGame: "ಆಟದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    enterAmount: "ಬಿಡ್ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ (₹)",
    youWillGet: "ನೀವು ತಕ್ಷಣ ಪಡೆಯುತ್ತೀರಿ:",
    playToWin: "ಈಗಲೇ ಆಟವಾಡಲು ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    recentWinners: "ಲೈವ್ ಪಾವತಿ ಪ್ರದರ್ಶನ",
    installGuide: "ಡೌನ್‌ಲೋಡ್ ಮತ್ತು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವುದು ಹೇಗೆ?",
    step1: "1. ಡೌನ್‌ಲೋಡ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ",
    step1Sub: "ಅಧಿಕೃತ ಸುರಕ್ಷಿತ APK ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಡೌನ್‌ಲೋಡ್ ಬಟನ್ ಒತ್ತಿರಿ.",
    step2: "2. ಕ್ರೋಮ್ ಎಚ್ಚರಿಕೆ ಒಪ್ಪಿಕೊಳ್ಳಿ",
    step2Sub: "'File might be harmful' ಎಂದು ತೋರಿಸಿದರೆ, 'Download anyway' ಕ್ಲಿಕ್ ಮಾಡಿ. ಇದು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದೆ.",
    step3: "3. ಅನ್‌ಲೋನ್ ಸೋರ್ಸ್ ಸಕ್ರಿಯಗೊಳಿಸಿ",
    step3Sub: "ಸೆಟ್ಟಿಂಗ್ಸ್‌ಗೆ ಹೋಗಿ 'Allow from this source' ಸಕ್ರಿಯಗೊಳಿಸಿ ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.",
    step4: "4. 10 ಸೆಕೆಂಡ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ",
    step4Sub: "ನಿಮ್ಮ ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಲೈವ್ ಮಾರ್ಕೆಟ್ ಆಟವಾಡಿ!",
    faqTitle: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    navHome: "ಮುಖ್ಯ ಪುಟ",
    navFeatures: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    navResults: "ಫಲಿತಾಂಶಗಳು",
    navRates: "ದರಗಳು",
    navGuide: "ಮಾರ್ಗದರ್ಶಿ",
    disclaimer: "ಹಕ್ಕುತ್ಯಾಗ: ಈ ಆಪ್ 18+ ವರ್ಷ ಮೇಲ್ಪಟ್ಟವರಿಗೆ ಮಾತ್ರ. ಈ ಆಟದಲ್ಲಿ ಹಣಕಾಸಿನ ಅಪಾಯವಿದೆ, ದಯವಿಟ್ಟು ಜವಾಬ್ದಾರಿಯಿಂದ ಆಟವಾಡಿ.",
    guaranteedAuto: "ಸ್ವಯಂಚಾಲಿತ ಡೆಪಾಸಿಟ್ (ಕನಿಷ್ಠ ₹200) ಮತ್ತು ತ್ವರಿತ 24/7 ವಿತ್‌ಡ್ರಾ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅನುಮೋದಿಸಲಾಗಿದೆ.",
  },
  te: {
    title: "భారతదేశంలో అత్యంత విశ్వసనీయమైన మట్కా యాప్",
    tagline: "భారతదేశపు నంబర్ 1 సట్టా మట్కా ప్లాట్‌ఫారమ్. వేగవంతమైన ఫలితాలు, తక్షణ చెల్లింపులు మరియు కనీస డిపాజిట్ కేవలం ₹200.",
    downloadBtn: "ప్రైమ్ మట్కా యాప్ డౌన్లోడ్ చేసుకోండి",
    subDownload: "సురక్షితమైన .apk ఫైల్ (8.4 MB)",
    winLakhs: "ఈరోజే డౌన్లోడ్ చేసుకోండి మరియు లక్షలాది రూపాయలు గెలవండి!",
    instantDeposit: "కనీస డిపాజిట్ ₹200 & 24/7 విత్డ్రా",
    autoSystem: "ఆటోమేటిక్ 24/7 సిస్టమ్",
    liveSupport: "24x7 ప్రత్యేక వాట్సాప్ మరియు కాల్ సపోర్ట్",
    playersOnline: "ప్రస్తుతం ఆన్లైన్లో ఉన్న యాక్టివ్ ప్లేయర్స్",
    fastResults: "అతి వేగవంతమైన లైవ్ ఫలితాలు",
    fastResultsSub: "మేము 100% ఖచ్చితత్వంతో సమయానికి ఫలితాలను వెల్లడిస్తాము.",
    instantPayments: "తక్షణ 24/7 సెటిల్మెంట్",
    instantPaymentsSub: "మీరు గెలుచుకున్న డబ్బును కేవలం 1 నిమిషంలో నేరుగా మీ బ్యాంక్/UPI కి పొందండి.",
    safeSec: "100% సురక్షితం & విశ్వసనీయం",
    safeSecSub: "మీ గుర్తింపు మరియు డబ్బు మా అత్యాధునిక ఆటోమేటెడ్ సెక్యూర్ సిస్టమ్ ద్వారా రక్షించబడతాయి.",
    gameRates: "ప్రీమియం గేమ్ రేట్లు",
    calcWinnings: "విన్నింగ్స్ కాలిక్యులేటర్",
    selectGame: "గేమ్ రకం ఎంచుకోండి",
    enterAmount: "బిడ్ మొత్తం ఎంటర్ చేయండి (₹)",
    youWillGet: "మీకు తక్షణమే లభిస్తుంది:",
    playToWin: "ఆడటానికి యాప్ ఇప్పుడే డౌన్లోడ్ చేసుకోండి",
    recentWinners: "లైవ్ పేమెంట్ ప్రూఫ్",
    installGuide: "డౌన్లోడ్ మరియు ఇన్స్టాల్ చేయడం ఎలా?",
    step1: "1. డౌన్లోడ్ బటన్పై క్లిక్ చేయండి",
    step1Sub: "మా వెబ్సైట్ లోని 'డౌన్లోడ్ యాప్' పై క్లిక్ చేసి అధికారిక సురక్షిత APK ఫైల్ను డౌన్లోడ్ చేసుకోండి.",
    step2: "2. క్రోమ్ హెచ్చరికను అంగీకరించండి",
    step2Sub: "ఒకవేళ 'File might be harmful' అని వస్తే, 'Download anyway' క్లిక్ చేయండి. మా యాప్ 100% సురక్షితం.",
    step3: "3. అన్లోన్ సోర్సెస్ ఎనేబుల్ చేయండి",
    step3Sub: "ఫైల్ను ఓపెన్ చేసి మీ ఫోన్ సెట్టింగ్స్లో 'Allow from this source' ఆప్షన్ను ఆన్ చేసుకోండి.",
    step4: "4. 10 సెకన్లలో రిజిస్టర్ చేసుకోండి",
    step4Sub: "మీ పేరు, మొబైల్ నంబర్ ఉపయోగించి సులభంగా లాగిన్ అయి లైవ్ మట్కా మార్కెట్లలో ఆడండి!",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
    navHome: "హోమ్",
    navFeatures: "ఫీచర్లు",
    navResults: "ఫలితాలు",
    navRates: "ధరలు",
    navGuide: "గైడ్",
    disclaimer: "హెచ్చరిక: ఈ యాప్ కేవలం 18+ వయస్సు ఉన్నవారికి మాత్రమే. ఈ ఆటలలో ఆర్థికపరమైన నష్టాలు ఉంటాయి, దయచేసి బాధ్యతాయుతంగా ఆడండి.",
    guaranteedAuto: "ఆటో డిపాజిట్ (కనీసం ₹200) మరియు 24/7 తక్షణ విత్డ్రా నేరుగా మీ అకౌంట్కు చేరతాయి.",
  },
  ta: {
    title: "இந்தியாவின் மிகவும் நம்பகமான மட்கா செயலி",
    tagline: "இந்தியாவின் நம்பர் 1 சட்டா மட்கா தளம். விரைவான முடிவுகள், 24/7 உடனடி பணம் செலுத்துதல் மற்றும் குறைந்தபட்ச வைப்புத்தொகை ₹200.",
    downloadBtn: "பிரைம் மட்கா செயலியைப் பதிவிறக்கவும்",
    subDownload: "பாதுகாப்பான .apk கோப்பு (8.4 MB)",
    winLakhs: "இன்றே பதிவிறக்கம் செய்து லட்சக்கணக்கில் வெல்லுங்கள்!",
    instantDeposit: "குறைந்தபட்ச வைப்பு ₹200 & 24/7 உடனடி பணம் எடுத்தல்",
    autoSystem: "தானியங்கி 24/7 சிஸ்டம்",
    liveSupport: "24x7 பிரத்யேக வாட்ஸ்அப் மற்றும் அழைப்பு ஆதரவு",
    playersOnline: "ஆன்லைனில் விளையாடும் செயலில் உள்ள வீரர்கள்",
    fastResults: "மிக விரைவான நேரடி முடிவுகள்",
    fastResultsSub: "நாங்கள் 100% துல்லியமாகவும் மிக வேகமாகவும் முடிவுகளை வெளியிடுகிறோம்.",
    instantPayments: "உடனடி 24/7 செட்டில்மெண்ட்",
    instantPaymentsSub: "நீங்கள் வென்ற தொகையை 1 நிமிடத்திற்குள் நேரடியாக உங்கள் வங்கி/UPI கணக்கில் பெற்றுக் கொள்ளுங்கள்.",
    safeSec: "100% பாதுகாப்பானது & நம்பகமானது",
    safeSecSub: "உங்கள் அடையாளமும் பணமும் எங்களின் பாதுகாக்கப்பட்ட தானியங்கி நெட்வொர்க் அமைப்பால் பாதுகாக்கப்படுகிறது.",
    gameRates: "பிரீமியம் கேம் விகிதங்கள்",
    calcWinnings: "வருவாய் கால்குலேட்டர்",
    selectGame: "கேம் வகையைத் தேர்ந்தெடு",
    enterAmount: "பண விபரம் உள்ளிடவும் (₹)",
    youWillGet: "உங்களுக்கு உடனடியாகக் கிடைப்பது:",
    playToWin: "விளையாட செயலியை உடனே பதிவிறக்கவும்",
    recentWinners: "நேரடி கட்டண சான்று",
    installGuide: "பதிவிறக்கம் செய்து நிறுவுவது எப்படி?",
    step1: "1. பதிவிறக்க பொத்தானைக் கிளிக் செய்யவும்",
    step1Sub: "அதிகாரப்பூர்வ பாதுகாப்பான APK கோப்பைப் பெற எங்களின் பதிவிறக்க பொத்தானை அழுத்தவும்.",
    step2: "2. எச்சரிக்கையை ஏற்கவும்",
    step2Sub: "கூகுள் குரோமில் 'File might be harmful' எனக் காட்டினால், 'Download anyway' என்பதைத் தேர்ந்தெடுக்கவும். இது ஆபத்தற்றது.",
    step3: "3. அறியப்படாத மூலங்களை இயக்கவும்",
    step3Sub: "கோப்பைத் திறந்து, செட்டிங்ஸில் 'Allow configuration from unknown sources' என்பதை இயக்கவும்.",
    step4: "4. 10 வினாடிகளில் பதிவு செய்யவும்",
    step4Sub: "உங்கள் பெயர், கைபேசி எண் உள்ளிட்டு கணக்கு தொடங்கி நேரடி சந்தைகளில் விளையாடுங்கள்!",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    navHome: "முகப்பு",
    navFeatures: "அம்சங்கள்",
    navResults: "முடிவுகள்",
    navRates: "விகிதங்கள்",
    navGuide: "வழிகாட்டி",
    disclaimer: "எச்சரிக்கை: இந்தச் செயலி 18+ வயதுடையவர்களுக்கு மட்டுமே. சட்டா விளையாட்டில் நிதி அபாயங்கள் உள்ளன, பொறுப்புடன் விளையாடவும்.",
    guaranteedAuto: "தானியங்கி டெபாசிட் (குறைந்தது ₹200) மற்றும் 24/7 உடனடி பணம் எடுத்தல் தானாகவே அங்கீகரிக்கப்படும்.",
  },
  gu: {
    title: "ભારતની સૌથી વિશ્વસનીય મટકા એપ્લિકેશન",
    tagline: "ભારતનું પ્રથમ ક્રમાંકનું સટ્ટા મટકા પ્લેટફોર્મ. ઝડપી પરિણામો, ત્વરિત ચૂકવણીઓ, અને લઘુત્તમ ડિપોઝિટ માત્ર ₹200.",
    downloadBtn: "પ્રાઇમ મટકા એપ ડાઉનલોડ કરો",
    subDownload: "સુરક્ષિત .apk ફાઇઇલ (8.4 MB)",
    winLakhs: "આજે જ ડાઉનલોડ કરો અને લાખો રૂપિયા જીતો!",
    instantDeposit: "ન્યૂનતમ ડિપોઝિટ ₹200 અને 24/7 ઉપાડ",
    autoSystem: "સ્વયંસંચાલિત 24/7 સિસ્ટમ",
    liveSupport: "24x7 સમર્પિત વોટ્સએપ અને કોલ સપોર્ટ",
    playersOnline: "હાલમાં ઓનલાઇન રમી રહેલા ખેલાડીઓ",
    fastResults: "સૌથી ઝડપી લાઈવ પરિણામો",
    fastResultsSub: "અમે તમામ બજારોના 100% સચોટ અને ઝડપી પરિણામો સમયસર જાહેર કરીએ છીએ.",
    instantPayments: "ઝડપી 24/7 ઉપાડ ચૂકવણી",
    instantPaymentsSub: "તમારી જીતેલી રકમ માત્ર 1 મિનિટમાં સીધા તમારા બેંક અથવા UPI ખાતામાં મેળવો.",
    safeSec: "100% સુરક્ષિત અને ગોપનીય",
    safeSecSub: "તમારા પૈસા અને ઓળખ અલ્ટ્રા-સુરક્ષિત ઓટોમેટેડ નેટવર્ક દ્વારા સુરક્ષિત છે.",
    gameRates: "શ્રેષ્ઠ ગેમ રેટ્સ",
    calcWinnings: "કેલ્ક્યુલેટર",
    selectGame: "ગેમનો પ્રકાર પસંદ કરો",
    enterAmount: "બિડની રકમ દાખલ કરો (₹)",
    youWillGet: "તમને તરત જ મળશે:",
    playToWin: "રમવા માટે હમણાં જ એપ ડાઉનલોડ કરો",
    recentWinners: "લાઇવ પરફોર્મન્સ પ્રૂફ",
    installGuide: "ડાઉનલોડ અને ઇન્સ્ટોલ કેવી રીતે કરવું?",
    step1: "1. ડાઉનલોડ બટન પર ક્લિક કરો",
    step1Sub: "અધિકૃત અને સુરક્ષિત APK ડાઉનલોડ કરવા માટે વેબસાઇટ પરના બટનને દબાવો.",
    step2: "2. ક્રોમ ચેતવણી સ્વીકારો",
    step2Sub: "જો ક્રોમ 'File might be harmful' ચેતવણી આપે, તો પણ 'Download anyway' પર ક્લિક કરો. તે સંપૂર્ણ સુરક્ષિત છે.",
    step3: "3. અનનોન સોર્સ ચાલુ કરો",
    step3Sub: "ફાઇલ ખોલો અને તમારા ફોનમાં 'Allow from this source' ની મંજૂરી સક્રિય કરો.",
    step4: "4. ૧૦ સેકન્ડમાં રજીસ્ટ્રેશન",
    step4Sub: "તમારું નામ, મોબાઈલ નંબર દાખલ કરો અને લાઈવ બજારોમાં સફર શરૂ કરો!",
    faqTitle: "વારંવાર પૂછાતા પ્રશ્નો",
    navHome: "હોમ પેજ",
    navFeatures: "વિશેષતાઓ",
    navResults: "પરિણામો",
    navRates: "ગેમ રેટ્સ",
    navGuide: "માર્ગદર્શિકા",
    disclaimer: "ચેતવણી: આ એપ્લિકેશન ફક્ત 18+ વર્ષના વપરાશકર્તાઓ માટે છે. ગેમિંગમાં નાણાકીય જોખમ શામેલ છે, કૃપા કરીને જવાબદારીપૂર્વક રમો.",
    guaranteedAuto: "ઓટો ડિપોઝિટ (લઘુત્તમ ₹200) અને 24/7 ત્વરિત ઉપાડ ઓટોમેટીક રીતે માન્ય થાય છે.",
  }
};

const GAME_RATES = [
  { typeEN: 'Single Digits (Ank)', typeHI: 'सिंगल अंक', rateEN: '10 Ka 95', rateHI: '10 का 95', ratio: 9.5 },
  { typeEN: 'Jodi Digits', typeHI: 'जोड़ी डिजिट', rateEN: '10 Ka 950', rateHI: '10 का 950', ratio: 95 },
  { typeEN: 'Single Pana (Patti)', typeHI: 'सिंगल पाना', rateEN: '10 Ka 1500', rateHI: '10 का 1500', ratio: 150 },
  { typeEN: 'Double Pana (Patti)', typeHI: 'डबल पाना', rateEN: '10 Ka 3000', rateHI: '10 का 3000', ratio: 300 },
  { typeEN: 'Triple Pana (Patti)', typeHI: 'ट्रिपल पाना', rateEN: '10 Ka 12000', rateHI: '10 का 12000', ratio: 1200 },
  { typeEN: 'Half Sangam', typeHI: 'हाफ संगम', rateEN: '10 Ka 10000', rateHI: '10 का 10000', ratio: 1000 },
  { typeEN: 'Full Sangam', typeHI: 'फुल संगम', rateEN: '10 Ka 100000', rateHI: '10 का 100000', ratio: 10000 },
];

const DOWNLOAD_APK_URL = "https://primematka.online/app/primematka.apk";

export default function App() {
  const [lang, setLang] = useState<LangCode>('hi'); // Defaulting to Hindi
  const [currentMarkets, setCurrentMarkets] = useState<Market[]>(INITIAL_MARKETS);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'closed'>('all');
  const [calcGameIndex, setCalcGameIndex] = useState<number>(1); // Default to Jodi
  const [calcAmount, setCalcAmount] = useState<string>("100");
  const [livePlayersCount, setLivePlayersCount] = useState<number>(45827);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Custom states to mimic the real app screenshot perfectly
  const [phoneTab, setPhoneTab] = useState<'home' | 'bids' | 'history' | 'rates' | 'support' | 'add_fund' | 'withdraw'>('home');
  const [phoneNotification, setPhoneNotification] = useState<string>("Rohit Sharma successfully withdrawn ₹8452");
  const [phoneBalance, setPhoneBalance] = useState<number>(1000); // Standard demo index

  // Rotate payouts in phone simulator
  useEffect(() => {
    const list = [
      "Rohit Sharma successfully withdrawn ₹8452",
      "Amit Khanna successfully withdrawn ₹12000",
      "Piyush Yadav successfully withdrawn ₹5200",
      "Vijay Solanki successfully withdrawn ₹18700",
      "Anil Mewati successfully withdrawn ₹3100",
      "Deepak Choudhary successfully withdrawn ₹45000",
      "Satish Kumar successfully withdrawn ₹980",
    ];
    let counter = 0;
    const interval = setInterval(() => {
      counter = (counter + 1) % list.length;
      setPhoneNotification(list[counter]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const t = LANGUAGE_DATA[lang];

  // Set document head details
  useEffect(() => {
    document.title = lang === 'hi'
      ? "Prime Matka – भारत का सबसे भरोसेमंद Satta Matka App"
      : "Prime Matka – India's No. 1 Satta Matka Application";
  }, [lang]);

  // Handle dynamic countdown / numbers updates to simulate active market conditions
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePlayersCount(prev => prev + Math.floor(Math.random() * 9) - 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Toast notifications for user wins
  useEffect(() => {
    const names = ['Rahul', 'Piyush', 'Vikram', 'Anil', 'Sandeep', 'Deepak', 'Ganesh', 'Sunny', 'Ravi', 'Raja', 'Harsh', 'Mohit'];
    const markets = ['Kalyan', 'Main Bazar', 'Milan Night', 'Rajdhani Day', 'Sridevi', 'Jodi'];
    const amounts = [1500, 4500, 9500, 19000, 3000, 12000, 50000];

    const interval = setInterval(() => {
      const selectedName = names[Math.floor(Math.random() * names.length)];
      const anonymized = selectedName.substring(0, 3) + "****";
      const selectedMarket = markets[Math.floor(Math.random() * markets.length)];
      const selectedAmount = amounts[Math.floor(Math.random() * amounts.length)];
      
      const text = lang === 'hi' 
        ? `🔥 बधाई हो! खिलाड़ी ${anonymized} ने ${selectedMarket} में ₹${selectedAmount.toLocaleString()} जीते। (तुरंत ट्रांसफर)`
        : `🔥 Congratulations! Player ${anonymized} won ₹${selectedAmount.toLocaleString()} in ${selectedMarket}. (Paid Instantly)`;
      
      setNotification(text);
      
      // Auto dim toast after 6 seconds
      setTimeout(() => {
        setNotification(null);
      }, 6000);

    }, 15000);

    return () => clearInterval(interval);
  }, [lang]);

  // Refresh live markets data with tiny updates
  const refreshResults = () => {
    setNotification(lang === 'hi' ? "🔄 परिणाम रीफ्रेश हो रहे हैं..." : "🔄 Refreshing live Satta results...");
    setTimeout(() => {
      setCurrentMarkets(prev => 
        prev.map(m => {
          if (m.status === 'LIVE' && Math.random() > 0.5) {
            return {
              ...m,
              jodi: String(Math.floor(Math.random() * 90) + 10),
            };
          }
          return m;
        })
      );
      setNotification(lang === 'hi' ? "✅ नवीनतम परिणाम प्रस्तुत हैं।" : "✅ Live results updated to latest index!");
      setTimeout(() => setNotification(null), 2500);
    }, 1000);
  };

  const handleDownloadClick = () => {
    window.location.href = DOWNLOAD_APK_URL;
  };

  const calculateReturn = () => {
    const amt = parseFloat(calcAmount) || 0;
    const ratio = GAME_RATES[calcGameIndex].ratio;
    return amt * ratio;
  };

  const filteredMarkets = currentMarkets.filter(m => {
    if (activeTab === 'live') return m.status === 'LIVE';
    if (activeTab === 'closed') return m.status === 'CLOSED';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      
      {/* BACKGROUND GRAPHIC ORNAMENTS (Light Theme) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-200/20 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-80 h-80 bg-orange-200/20 filter blur-[100px] pointer-events-none" />

      {/* TOP NOTIFICATION BAR (LIVE WINNING TOAST) */}
      <div className="fixed top-4 right-4 z-50 max-w-sm w-full font-sans">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white border border-amber-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3"
            >
              <div className="relative flex-shrink-0">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {notification}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STICKY BOTTOM DOWNLOAD CTA FOR MOBILE DEVICES */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200/80 p-3 flex items-center justify-between backdrop-blur-md md:hidden shadow-lg">
        <div className="flex items-center gap-2">
          <Logo className="w-10 h-10 drop-shadow-[0_0_6px_rgba(217,119,6,0.2)]" />
          <div>
            <div className="text-xs font-black text-slate-800 tracking-wide">PRIME MATKA</div>
            <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {livePlayersCount.toLocaleString()} {lang === 'hi' ? 'खिलाड़ी ऑनलाइन' : 'Players Online'}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleDownloadClick}
          id="btn-sticky-download"
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs py-2.5 px-4 font-black rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all text-center cursor-pointer"
        >
          <Download size={14} className="animate-bounce" />
          <span>Download Now</span>
        </button>
      </div>

      {/* COMPLIANT NAVIGATION HEADER */}
      <header id="applet-nav-header" className="sticky top-0 z-30 bg-white/95 border-b border-slate-200/85 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo className="w-11 h-11 sm:w-13 sm:h-13" />
              <div className="ml-1 flex flex-col justify-center">
                <span className="text-lg sm:text-2xl font-black font-display tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  PRIME MATKA
                </span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-mono -mt-1 font-black">
                  {lang === 'hi' ? 'भरोसेमंद गेमिंग प्लेटफॉर्म' : 'Verified Secure Platform'}
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAV TABS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
            <a href="#hero-section" className="hover:text-amber-500 transition-all">{t.navHome}</a>
            <a href="#results-section" className="hover:text-amber-500 transition-all">{t.navResults}</a>
            <a href="#features-section" className="hover:text-amber-500 transition-all">{t.navFeatures}</a>
            <a href="#rates-section" className="hover:text-amber-500 transition-all">{t.navRates}</a>
            <a href="#guide-section" className="hover:text-amber-500 transition-all">{t.navGuide}</a>
          </nav>

          {/* RIGHT UTILITIES */}
          <div className="flex items-center gap-3">
            
            {/* Lang Dropdown Select - Beautiful Light Styling */}
            <div className="relative flex items-center">
              <Globe size={13} className="absolute left-2.5 text-amber-600 pointer-events-none" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LangCode)}
                className="appearance-none pl-7.5 pr-6 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-black text-slate-700 hover:border-amber-500/40 focus:outline-none focus:border-amber-500 cursor-pointer text-center"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Main Header Download button for desktop */}
            <button
              onClick={handleDownloadClick}
              id="btn-header-download"
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-black text-sm shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download Prime Matka App</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 py-6 flex flex-col gap-4 font-bold text-slate-600 shadow-lg"
          >
            <a href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition-all">{t.navHome}</a>
            <a href="#results-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition-all">{t.navResults}</a>
            <a href="#features-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition-all">{t.navFeatures}</a>
            <a href="#rates-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition-all">{t.navRates}</a>
            <a href="#guide-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500 transition-all">{t.navGuide}</a>
            
            {/* DRAWER DOWNLOAD BUTTON REMOVED */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO HERO SECTION */}
      <section id="hero-section" className="relative pt-8 pb-10 md:pt-16 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Main text container */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            
            {/* Live Trust Banner */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 py-1.5 px-3.5 rounded-full text-xs font-bold text-amber-700 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{lang === 'hi' ? '🇮🇳 100% विश्वसनीय Satta Matka App' : '🇮🇳 India’s No. 1 Satta Matka App'}</span>
            </div>

            {/* Glowing Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-slate-900">
              {lang === 'hi' ? (
                <>
                  भारत का सबसे <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">भरोसेमंद</span> <br />
                  <span className="text-amber-600">मटका</span> ऐप
                </>
              ) : (
                <>
                  India's Most <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">Trusted</span> <br />
                  Matka App
                </>
              )}
            </h1>

            {/* Descriptive block */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-semibold">
              {t.tagline}
            </p>

            {/* BIG ATTRACTIVE HERO DOWNLOAD BUTTON */}
            <div className="w-full flex justify-center lg:justify-start">
              <button
                onClick={handleDownloadClick}
                id="btn-hero-download"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-base sm:text-lg py-4 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 active:scale-95 hover:scale-[1.01] duration-150 transition-all cursor-pointer"
              >
                <div className="bg-white/10 p-1.5 rounded-lg flex-shrink-0">
                  <Smartphone className="text-white h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                </div>
                <div className="text-left font-sans">
                  <span className="block font-black leading-tight">Download Prime Matka App</span>
                  <span className="block text-[10px] sm:text-xs text-white/80 font-medium mt-0.5">Safe & Secure .apk File (8.4 MB)</span>
                </div>
              </button>
            </div>

            {/* Interactive Social Numbers Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-sm my-1">
              <div className="bg-white border border-slate-200/80 p-3 rounded-xl rounded-b-none border-b-2 border-b-amber-500 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black font-mono text-amber-600">45K+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lang === 'hi' ? 'सक्रिय खिलाड़ी' : 'Active Players'}</div>
              </div>
              <div className="bg-white border border-slate-200/80 p-3 rounded-xl rounded-b-none border-b-2 border-b-amber-600 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black font-mono text-amber-700">4.8 ★</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lang === 'hi' ? 'यूज़र रेटिंग' : 'User Rating'}</div>
              </div>
              <div className="bg-white border border-slate-200/80 p-3 rounded-xl rounded-b-none border-b-2 border-b-amber-500 text-center col-span-2 sm:col-span-1 shadow-xs">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600">99.9%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lang === 'hi' ? 'सटीक टाइम' : 'On-Time Result'}</div>
              </div>
            </div>

            {/* GIANT DOWNLOAD BUTTON - REMOVED TO ONLY KEEP STICKY BOTTOM AND MAIN HEADER */}
            <div className="flex flex-col items-center lg:items-start gap-2 w-full">
              <p className="text-sm text-slate-700 font-black flex items-center gap-1.5 bg-amber-500/10 px-4 py-2.5 rounded-xl border border-amber-500/15">
                <span className="inline-block text-emerald-600 font-black">✔</span>
                {t.guaranteedAuto}
              </p>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-2 text-slate-500 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>{t.instantDeposit}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>{t.autoSystem}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>{t.liveSupport}</span>
              </div>
            </div>

          </div>

          {/* Interactive Mobile Application mockups */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center items-center select-none pt-4 lg:pt-0">
            <div className="relative w-76 sm:w-[325px] h-[640px] sm:h-[680px] rounded-[40px] border-8 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden shadow-amber-500/10">
              
              {/* Speaker notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-800 h-6 w-32 rounded-b-xl z-50 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-900 rounded-full mb-1" />
              </div>

              {/* Internal Mockup Screen */}
              <div className="h-full w-full flex flex-col relative bg-slate-50 text-slate-800 font-sans">
                
                {/* 1. Android Status Bar (Teal `#007c8d`) */}
                <div className="bg-[#007c8d] text-white/95 px-5 pt-7 pb-1 text-[10px] font-bold flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span>12:03</span>
                    <span>⏰</span>
                    <span>📳</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[9px]">
                    <span className="text-[7px] bg-white/20 px-0.5 rounded leading-none">VoLTE</span>
                    <span>5G+</span>
                    <span>📶</span>
                    <span>🔋 47%</span>
                  </div>
                </div>

                {/* 2. Main App Header (Solid Teal `#007c8d`) */}
                <div className="bg-[#007c8d] text-white px-3.5 pb-2.5 pt-1.5 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPhoneTab('home')} 
                      className="w-8 h-8 rounded-full hover:bg-white/10 flex flex-col justify-center items-center gap-1 cursor-pointer shrink-0"
                    >
                      <div className="w-4 h-0.5 bg-white rounded-full"></div>
                      <div className="w-4 h-0.5 bg-white rounded-full"></div>
                      <div className="w-4 h-0.5 bg-white rounded-full"></div>
                    </button>
                    <span className="font-extrabold text-white text-xs sm:text-sm tracking-wide">PRIME MATKA</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div 
                      onClick={() => setPhoneTab('add_fund')}
                      className="bg-white hover:bg-slate-100 text-[#007c8d] px-2 py-0.5 rounded font-black text-[10px] sm:text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 duration-100"
                    >
                      <span>₹ {phoneBalance}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Sliding Marquee/Ticker Bar */}
                <div className="bg-cyan-50 border-y border-cyan-500/10 h-7 flex items-center overflow-hidden relative select-none">
                  <div className="w-1 bg-[#007c8d] h-full z-10 sticky left-0 shrink-0" />
                  <div className="whitespace-nowrap flex items-center text-[#007c8d] font-black text-[10px] tracking-wide animate-marquee pl-3">
                    PRIME MATKA ONLINE &nbsp;&nbsp; REGISTER NOW &nbsp;&nbsp; MINIMUM DEPOSIT - ₹200 &nbsp;&nbsp; MINIMUM WITHDRAW - ₹100 &nbsp;&nbsp; AUTOMATIC 24/7 WITHDRAWALS IN 1 MINUTE &nbsp;&nbsp; BEST RATES &nbsp;&nbsp; FULL SECURE &nbsp;&nbsp;
                  </div>
                </div>

                {/* 4. Mock Screen Body */}
                <div className="flex-1 overflow-y-auto pb-20 scroll-smooth">
                  
                  {phoneTab === 'home' && (
                    <div className="space-y-3 p-3">
                      
                      {/* Payout ticker pill */}
                      <div className="w-full bg-[#008c9e] text-white py-1.5 px-3 rounded-full flex items-center justify-center gap-1 shadow-xs text-[9px] font-bold">
                        <span className="animate-pulse shrink-0">✨</span>
                        <span className="truncate">{phoneNotification}</span>
                      </div>

                      {/* Simulator Actions Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button 
                          onClick={() => setPhoneTab('add_fund')}
                          className="bg-[#00ad43] hover:bg-[#00963a] text-white py-2 px-3 rounded-xl flex items-center justify-center gap-1 font-bold text-[11px] shadow-sm active:scale-95 duration-100 cursor-pointer"
                        >
                          <span>💰 Add Fund</span>
                        </button>

                        <button 
                          onClick={() => setPhoneTab('withdraw')}
                          className="bg-[#007c8d] hover:bg-[#006a78] text-white py-2 px-3 rounded-xl flex items-center justify-center gap-1 font-bold text-[11px] shadow-sm active:scale-95 duration-100 cursor-pointer"
                        >
                          <span>🏦 Withdraw</span>
                        </button>

                        <button 
                          onClick={() => alert("★ Starline: Standard game rate is 10 ka 950! Play inside final app.")}
                          className="bg-[#313ee5] text-white py-2 px-2 rounded-xl flex items-center justify-center gap-1 font-bold text-[11px] active:scale-95 duration-100 cursor-pointer"
                        >
                          <span>▶ StarLine</span>
                        </button>

                        <button 
                          onClick={() => alert("★ Gali Disawar: Rate is 10 ka 950! Fast payments on download.")}
                          className="bg-[#0a8264] text-white py-2 px-2 rounded-xl flex items-center justify-center gap-1 font-bold text-[11px] active:scale-95 duration-100 cursor-pointer"
                        >
                          <span>▶ Disawar</span>
                        </button>

                        <a 
                          href="https://wa.me/917300062482" 
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-white text-slate-800 py-2 px-2 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-1 font-bold text-[11px] active:scale-95 duration-100"
                        >
                          <span className="text-emerald-500">💬</span>
                          <span>Whatsapp</span>
                        </a>

                        <a 
                          href="https://t.me/primematka" 
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-white text-slate-800 py-2 px-2 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-1 font-bold text-[11px] active:scale-95 duration-100"
                        >
                          <span className="text-sky-500">✈</span>
                          <span>Telegram</span>
                        </a>
                      </div>

                      {/* Markets Title */}
                      <div className="flex items-center justify-between px-1 pt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Markets</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      {/* Market Cards list */}
                      <div className="space-y-2.5">
                        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden text-slate-800">
                          <div className="bg-[#007c8d] text-white font-bold text-[8px] py-1 px-3 flex items-center justify-between">
                            <span>Open: 10:00 AM</span>
                            <span>Close: 11:00 AM</span>
                          </div>
                          <div className="p-2.5 flex items-center justify-between">
                            <div className="text-left">
                              <h4 className="font-extrabold text-[11px] text-slate-900 leading-tight">SRIDEVI MORNING</h4>
                              <div className="text-[#0a8192] font-black text-sm tracking-wider font-mono my-0.5">679-22-589</div>
                              <div className="text-rose-600 font-bold text-[8px] flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-rose-600 block" />
                                <span>Market Closed</span>
                              </div>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">■</button>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden text-slate-800">
                          <div className="bg-[#007c8d] text-white font-bold text-[8px] py-1 px-3 flex items-center justify-between">
                            <span>Open: 11:00 AM</span>
                            <span>Close: 12:00 PM</span>
                          </div>
                          <div className="p-2.5 flex items-center justify-between">
                            <div className="text-left">
                              <h4 className="font-extrabold text-[11px] text-slate-900 leading-tight">KALYAN MORNING</h4>
                              <div className="text-emerald-600 font-black text-sm tracking-wider font-mono my-0.5">235-08-125</div>
                              <div className="text-emerald-600 font-bold text-[8px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
                                <span>Market Live</span>
                              </div>
                            </div>
                            <button onClick={handleDownloadClick} className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">▶</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {phoneTab === 'add_fund' && (
                    <div className="p-3.5 space-y-3.5 text-left text-slate-800">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <h3 className="font-black text-xs text-slate-900 uppercase">Load Wallet Cash</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Simulated PRACTICE Wallet Balance</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">₹ {phoneBalance}</div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-600 block">CHOOSE FAST DEMO FUND (₹)</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[200, 500, 1000, 2000].map(amt => (
                            <button 
                              key={amt} 
                              onClick={() => {
                                setPhoneBalance(prev => prev + amt);
                                setNotification(lang === 'hi' ? `💰 सफलतापूर्वक ₹${amt} जमा किए गए!` : `💰 Added virtual ₹${amt}!`);
                                setTimeout(() => setNotification(null), 2000);
                              }}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-1.5 rounded font-black text-[10px] border border-emerald-200"
                            >
                              +{amt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg text-[9px] leading-relaxed border border-emerald-100">
                        ⚡ Deposit approvals happen inside 10 seconds securely. Minimum deposit is ₹200.
                      </div>
                    </div>
                  )}

                  {phoneTab === 'withdraw' && (
                    <div className="p-3.5 space-y-3.5 text-left text-slate-800">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <h3 className="font-black text-xs text-slate-900 uppercase">Instant Withdrawal</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="text-[9px] font-bold text-slate-400 uppercase">Available Cash</div>
                        <div className="text-lg font-black text-[#007c8d] mt-0.5">₹ {phoneBalance}</div>
                      </div>

                      {phoneBalance === 0 ? (
                        <div className="text-center py-4 bg-slate-100 border rounded-lg">
                          <p className="text-[10px] text-slate-500 font-bold">Your balance is ₹0.</p>
                          <button onClick={() => setPhoneBalance(1000)} className="mt-2 bg-[#007c8d] text-white text-[9px] px-2.5 py-1 rounded">Load ₹1,000</button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-600 block">UPI ENTER ID (PhonePe/GooglePay)</label>
                            <input type="text" placeholder="yourname@paytm" className="w-full border p-1 rounded text-xs" />
                          </div>
                          <button 
                            onClick={() => {
                              alert(lang === 'hi' 
                                ? `💸 तुरंत विड्रॉल रिक्वेस्ट (₹${phoneBalance}) भेज दी गई है!` 
                                : `💸 Fast withdrawal request of ₹${phoneBalance} submitted!`
                              );
                              setPhoneBalance(0);
                              setPhoneTab('home');
                            }}
                            className="w-full bg-[#007c8d] text-white py-2 rounded text-xs font-bold"
                          >
                            Withdraw Instantly to Bank (UPI)
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {phoneTab === 'bids' && (
                    <div className="p-3 space-y-3 text-left">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <h3 className="font-black text-xs text-slate-900 uppercase">My Bid Ledger</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>
                      <div className="space-y-2 text-[10px]">
                        <div className="bg-white p-2.5 rounded-lg border flex justify-between items-center">
                          <div>
                            <div className="font-extrabold text-slate-900 text-left">SRIDEVI MORNING</div>
                            <div className="text-slate-400 text-[9px]">Ank 7 (Single Digit)</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-800">₹200</div>
                            <div className="text-emerald-600 font-extrabold">Won +₹1,900</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {phoneTab === 'history' && (
                    <div className="p-3 space-y-3 text-left">
                      <div className="flex items-center justify-between border-b pb-1.5">
                        <h3 className="font-black text-xs text-slate-900 uppercase">Transaction History</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>
                      <div className="space-y-2 text-[10px]">
                        <div className="bg-white p-2.5 rounded-lg border flex justify-between items-center">
                          <div>
                            <div className="font-extrabold text-slate-900">Win Balance Cre</div>
                            <div className="text-slate-400 text-[8px]">Sridevi Winning Approved</div>
                          </div>
                          <p className="font-black text-emerald-600">+ ₹1,900</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {phoneTab === 'rates' && (
                    <div className="p-2 space-y-2 text-left">
                      <div className="flex items-center justify-between border-b pb-1">
                        <h3 className="font-black text-xs text-slate-900 uppercase">App Rates</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>
                      <div className="bg-white rounded-lg border overflow-hidden text-[9px]">
                        {GAME_RATES.map((gr, idx) => (
                          <div key={idx} className="p-1.5 flex justify-between border-b hover:bg-slate-50 font-bold">
                            <span>{lang === 'hi' ? gr.typeHI : gr.typeEN}</span>
                            <span className="text-emerald-600">{lang === 'hi' ? gr.rateHI : gr.rateEN}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phoneTab === 'support' && (
                    <div className="p-3 space-y-2 text-left">
                      <div className="flex items-center justify-between border-b pb-1">
                        <h3 className="font-black text-xs text-slate-900 uppercase">Live Support</h3>
                        <button onClick={() => setPhoneTab('home')} className="text-[#007c8d] font-bold text-[10px] bg-slate-100 px-2 py-0.5 rounded">◀ Back</button>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border text-center space-y-2">
                        <h4 className="font-extrabold text-xs text-slate-950">Chat is Online 24/7</h4>
                        <div className="flex flex-col gap-1.5 pt-2">
                          <a href="https://wa.me/917300062482" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-1.5 px-3 rounded text-[10px] text-center font-bold">💬 Whatsapp Help Desk</a>
                          <a href="tel:+917300062482" className="bg-[#007c8d] text-white py-1.5 px-3 rounded text-[10px] text-center font-bold">📞 Support Hotline</a>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* 5. Bottom Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 grid grid-cols-5 py-1 z-40 select-none">
                  <button onClick={() => setPhoneTab('bids')} className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${phoneTab === 'bids' ? 'text-[#007c8d]' : 'text-slate-400'}`}>
                    <span className="text-xs">📋</span>
                    <span className="text-[8px] font-black tracking-tight">My Bids</span>
                  </button>

                  <button onClick={() => setPhoneTab('history')} className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${phoneTab === 'history' ? 'text-[#007c8d]' : 'text-slate-400'}`}>
                    <span className="text-xs">🏆</span>
                    <span className="text-[8px] font-black tracking-tight">Win History</span>
                  </button>

                  <div className="relative flex items-center justify-center">
                    <button onClick={() => setPhoneTab('home')} className="absolute -top-3 w-11 h-11 bg-[#007c8d] rounded-full border-4 border-slate-50 shadow flex items-center justify-center text-white cursor-pointer transform hover:scale-105 duration-100">
                      <span className="text-lg leading-none">⌂</span>
                    </button>
                    <span className="text-[8px] font-black mt-8 text-slate-400">Home</span>
                  </div>

                  <button onClick={() => setPhoneTab('rates')} className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${phoneTab === 'rates' ? 'text-[#007c8d]' : 'text-slate-400'}`}>
                    <span className="text-xs">📋</span>
                    <span className="text-[8px] font-black tracking-tight">Rates</span>
                  </button>

                  <button onClick={() => setPhoneTab('support')} className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer ${phoneTab === 'support' ? 'text-[#007c8d]' : 'text-slate-400'}`}>
                    <span className="text-xs">🎧</span>
                    <span className="text-[8px] font-black tracking-tight">Support</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* REFRESH LIVE TICKER STATUS */}
      <section id="results-section" className="py-10 bg-slate-100/80 border-y border-slate-200 px-4 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-center md:text-left">
              <span className="text-xs text-amber-600 font-mono tracking-wider uppercase font-black">{lang === 'hi' ? 'लाइव परिणाम सूची' : 'MARKET LEDGER'}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
                {t.fastResults}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-white p-1 rounded-xl flex gap-1 border border-slate-200">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-slate-800'}`}
                >
                  {lang === 'hi' ? 'सभी बाजार' : 'All Markets'}
                </button>
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'live' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-800'}`}
                >
                  {lang === 'hi' ? 'लाइव' : 'Live Only'}
                </button>
                <button
                  onClick={() => setActiveTab('closed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'closed' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-800'}`}
                >
                  {lang === 'hi' ? 'बंद' : 'Closed Only'}
                </button>
              </div>

              <button
                onClick={refreshResults}
                id="btn-refresh-results"
                className="bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 p-2.5 rounded-xl transition-all cursor-pointer text-slate-600 flex items-center justify-center shadow-xs"
                title="Refresh Results"
              >
                <RefreshCw size={15} className="hover:rotate-180 duration-500 font-bold" />
              </button>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map((market) => {
              const name = lang === 'en' ? market.nameEN : market.nameHI;
              return (
                <div 
                  key={market.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-400/50 transition-all group hover:shadow-lg duration-150"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                      {name}
                    </h3>

                    {market.status === 'LIVE' ? (
                      <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    ) : market.status === 'WAITING' ? (
                      <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Waiting
                      </span>
                    ) : (
                      <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Closed
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 pb-3 border-b border-slate-100 mb-3 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-amber-500" />
                      Open: {market.openTime}
                    </span>
                    <span>
                      Close: {market.closeTime}
                    </span>
                  </div>

                  {/* Patti / Jodi Panel */}
                  <div className="bg-slate-50 py-3 px-4 rounded-xl border border-slate-200 text-center transition-all group-hover:bg-slate-100/50 duration-150">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-slate-500 font-mono font-bold tracking-widest text-xs sm:text-sm">
                        {market.pattiOpen}
                      </span>
                      
                      <span className="text-lg sm:text-2xl font-black text-amber-700 font-mono tracking-widest bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-lg shadow-xs">
                        {market.jodi}
                      </span>
                      
                      <span className="text-slate-500 font-mono font-bold tracking-widest text-xs sm:text-sm">
                        {market.pattiClose}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* KEY FEATURES */}
      <section id="features-section" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs text-amber-600 font-mono tracking-wider uppercase font-black">{lang === 'hi' ? 'सर्वोत्तम विशेषताएं' : 'KEY PLATFORM FEATURES'}</span>
            <h2 className="text-3xl font-extrabold font-display text-slate-950 mt-1">
              {lang === 'hi' ? 'प्राइम मटका ऐप सर्वश्रेष्ठ क्यों है?' : 'Why Choose Prime Matka App?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* FAST RESULTS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 hover:border-amber-400 transform hover:scale-101 duration-150">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Zap size={22} className="fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{t.fastResults}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">{t.fastResultsSub}</p>
              </div>
            </div>

            {/* INSTANT SETTLEMENT */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 hover:border-amber-400 transform hover:scale-101 duration-150">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Coins size={22} className="fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{t.instantPayments}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">{t.instantPaymentsSub}</p>
              </div>
            </div>

            {/* SECURE BLOCK */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 hover:border-amber-400 transform hover:scale-101 duration-150 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#007c8d] flex items-center justify-center flex-shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{t.safeSec}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">{t.safeSecSub}</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* GAME RATES & CALCULATOR */}
      <section id="rates-section" className="py-12 bg-slate-100/90 border-y border-slate-200 px-4 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Rates Table */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="mb-6">
                <span className="text-xs text-amber-600 font-mono tracking-wider uppercase font-black">{lang === 'hi' ? 'सर्वोत्तम गेम रेट्स' : 'RATE STRUCTURE'}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {t.gameRates}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold">{lang === 'hi' ? 'अन्य सभी ऐप्स की तुलना में हमारे दरें सबसे अधिक और पारदर्शी हैं।' : 'Unbeatable returns on every level, processed automatically.'}</p>
              </div>

              <div className="space-y-2">
                {GAME_RATES.map((rate, ind) => (
                  <div 
                    key={ind} 
                    className="flex justify-between items-center py-3 px-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-all font-bold"
                  >
                    <span className="text-slate-700 text-sm">{lang === 'en' ? rate.typeEN : rate.typeHI}</span>
                    <span className="bg-amber-100 text-amber-800 text-xs sm:text-sm font-mono border border-amber-200 py-1 px-3 rounded-lg font-bold">
                      {lang === 'en' ? rate.rateEN : rate.rateHI}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="text-xs text-amber-600 font-mono tracking-wider uppercase font-black">{lang === 'hi' ? 'रियल-टाइम प्रॉफिट कैलकुलेटर' : 'INTERACTIVE PAYOUT CHECK'}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
                    {t.calcWinnings}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                      {t.selectGame}
                    </label>
                    <select
                      value={calcGameIndex}
                      onChange={(e) => setCalcGameIndex(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:border-amber-500 focus:outline-none font-bold cursor-pointer"
                    >
                      {GAME_RATES.map((rate, ind) => (
                        <option key={ind} value={ind}>
                          {lang === 'en' ? `${rate.typeEN} (${rate.rateEN})` : `${rate.typeHI} (${rate.rateHI})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                      {t.enterAmount}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-amber-600">₹</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="100"
                        value={calcAmount}
                        onChange={(e) => setCalcAmount(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-slate-800 font-mono font-black text-base focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">{t.youWillGet}</span>
                    <div className="text-2xl sm:text-4xl font-black text-emerald-600 font-mono mt-1 flex items-center gap-1 tracking-tight">
                      <span>₹{calculateReturn().toLocaleString()}</span>
                      <span className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">
                        Paid Instantly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CALCULATOR DOWNLOAD BUTTON REMOVED */}

            </div>

          </div>

        </div>
      </section>

      {/* INSTALLATION GUIDE */}
      <section id="guide-section" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs text-amber-600 font-mono tracking-wider uppercase font-black">{lang === 'hi' ? 'इंस्टालेशन गाइड' : 'EASY 4-STEP SETUP'}</span>
            <h2 className="text-3xl font-extrabold font-display text-slate-950 mt-1">
              {t.installGuide}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* step 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">{t.step1}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t.step1Sub}</p>
            </div>

            {/* step 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-xs">
              <h3 className="text-lg font-black text-amber-600 mb-2">{t.step2}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t.step2Sub}</p>
              <div className="absolute top-4 right-4 text-amber-600 opacity-60">
                <ShieldAlert size={18} />
              </div>
            </div>

            {/* step 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">{t.step3}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t.step3Sub}</p>
            </div>

            {/* step 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-xs">
              <h3 className="text-lg font-black text-emerald-600 mb-2">{t.step4}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t.step4Sub}</p>
              <div className="absolute top-4 right-4 text-emerald-500 opacity-60">
                <CheckCircle2 size={18} />
              </div>
            </div>

          </div>

          {/* GUIDE DOWNLOAD BUTTON REMOVED */}

        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-100 border-t border-slate-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.playersOnline}</div>
            <div className="text-2xl font-black font-mono text-amber-600 flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block animate-ping" />
              <span>{livePlayersCount.toLocaleString()}+ Players</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-black text-slate-600">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">🛡 Anti-Ban Premium</span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">⚡ Auto Withdrawal Sync</span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">🤝 100% Virus-Free APK</span>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-extrabold text-sm sm:text-base text-amber-800 mb-2">
                Q1. {lang === 'hi' ? 'प्राइम मटका में मिनिमम डिपाजिट और विड्रॉल कितना है?' : 'What is the minimum deposit and withdrawal amount on Prime Matka?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {lang === 'hi' 
                  ? 'ऐप के अंदर न्यूनतम डिपाजिट (Minimum Deposit) केवल ₹200 है और न्यूनतम विड्रॉल (Minimum Withdrawal) मात्र ₹100 है जिसे आप 24 घंटे में कभी भी विड्रॉल कर सकते है। हमारे यहाँ 24X7 विड्रॉल उपलब्ध है।' 
                  : 'The minimum deposit is only ₹200 and the minimum withdrawal is only ₹100. Best of all, they are processed 24/7 automatically into your bank or UPI within 1 minute.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-extrabold text-sm sm:text-base text-amber-800 mb-2">
                Q2. {lang === 'hi' ? 'क्या सट्टा मटका के परिणाम बिल्कुल समय पर मिलते हैं?' : 'Are results declared exactly on time?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {lang === 'hi' 
                  ? 'हाँ, प्राइम मटका कल्याण और मेन बाजार सहित सभी प्रमुख भारतीय मटका बाजारों के सबसे सटीक परिणाम सीधे लाइव दिखाता है।' 
                  : 'Yes, Prime Matka shows live and declaration times 100% on schedule with extreme accuracy.'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-extrabold text-sm sm:text-base text-amber-800 mb-2">
                Q3. {lang === 'hi' ? 'ऐप डाउनलोड करते समय Warning क्यों दिखाई देती है?' : 'Why does Chrome show a protection alert when downloading Prime Matka APK?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {lang === 'hi' 
                  ? 'चूंकि ऐप गूगल प्ले स्टोर पर उपलब्ध नहीं है और आप इसे सीधे वेब से डाउनलोड कर रहे हैं, इसलिए गूगल क्रोम स्टैंडर्ड चेतावनी देता है। यह हमारी फ़ाइल के हानिकारक होने का संकेत नहीं है। यह ऐप 100% वाइरस-मुक्त और सुरक्षित है।' 
                  : 'Google Chrome flags all manual third-party APK downloads with a standard warn prompt because it is not from Play Store. However, our file is safely certified, virus-free, and highly secure.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CORE LEGAL FOOTER */}
      <footer className="mt-auto bg-slate-100 border-t border-slate-200 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          
          <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold font-display">
            <Logo className="w-8 h-8" />
            <span className="text-base tracking-wider text-amber-600 font-black">PRIME MATKA</span>
          </div>

          <p className="text-[11px] text-slate-500 max-w-3xl mx-auto leading-relaxed font-semibold">
            {t.disclaimer}
          </p>

          <p className="text-[10px] text-slate-400 font-bold">
            Copyright © 2026 Prime Matka Online. All Rights Reserved. 
          </p>

        </div>
      </footer>

    </div>
  );
}
