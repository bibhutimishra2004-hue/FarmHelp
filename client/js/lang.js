const translations = {
  en: {
    // Auth & Navigation
    app_title: "🌱 AgriTech",
    welcome_back: "Welcome Back",
    login_sub: "Log in to access your farmer dashboard",
    username: "Username",
    password: "Password",
    sign_in: "Sign In",
    new_user: "New user?",
    create_account: "Create an account",
    register_title: "Create Account",
    register_sub: "Sign up to access your farmer dashboard",
    register_btn: "Register",
    back_login: "Back to Login",
    dashboard: "Dashboard",
    logout: "Logout",
    
    // Dashboard Cards
    farmer_modules: "Farmer Modules",
    select_module: "Select a module to run analysis or view data.",
    crop_rec_title: "Crop Recommendation",
    crop_rec_desc: "Run crop inference model",
    mandi_title: "💰 Mandi Prices",
    mandi_desc: "Fetch latest market rates",
    weather_title: "🌤 Weather Dashboard",
    weather_desc: "Live meteorological data",
    disease_title: "🌿 Disease Detection",
    disease_desc: "Analyze leaf imagery",
    
    // Tools
    back_btn: "[←] Dashboard",
    mandi_query: "💰 Mandi Market Query",
    mandi_sub: "Fetch latest crop prices from APIs",
    location_label: "Location (State/District)",
    execute_query: "Execute Query()",
    waiting: "> Waiting for input...",

    rec_model: "🌾 Run Recommendation Model",
    rec_sub: "Input environmental parameters to infer best crop.",
    region_label: "Region",
    soil_label: "Soil Type",
    weather_cond: "Weather Conditions",
    season_label: "Season",

    leaf_analysis: "🌿 Leaf Image Analysis",
    leaf_sub: "Upload an image of a leaf for deep-learning plant disease classification.",
    analyze_btn: "Analyze Image",

    weather_forecast: "🌤 Weather Forecast",
    weather_sub_msg: "Fetch meteorological data for your region.",
    city_label: "City Name",
    fetch_data: "Fetch Data",
    
    // General Actions
    query_model: "model.predict()"
  },
  hi: {
    // Auth & Navigation
    app_title: "🌱 एग्रीटेक",
    welcome_back: "वापसी पर स्वागत है",
    login_sub: "अपने किसान डैशबोर्ड तक पहुंचने के लिए लॉग इन करें",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    sign_in: "साइन इन करें",
    new_user: "नया उपयोगकर्ता?",
    create_account: "खाता बनाएं",
    register_title: "खाता बनाएं",
    register_sub: "अपने किसान डैशबोर्ड तक पहुंचने के लिए साइन अप करें",
    register_btn: "रजिस्टर करें",
    back_login: "लॉगिन पर वापस जाएं",
    dashboard: "डैशबोर्ड",
    logout: "लॉग आउट",
    
    // Dashboard Cards
    farmer_modules: "किसान मॉड्यूल",
    select_module: "डेटा देखने या विश्लेषण के लिए एक मॉड्यूल चुनें।",
    crop_rec_title: "फसल सुझाव",
    crop_rec_desc: "फसल अनुमान मॉडल चलाएं",
    mandi_title: "💰 मंडी भाव",
    mandi_desc: "नवीनतम बाजार दरें प्राप्त करें",
    weather_title: "🌤 मौसम डैशबोर्ड",
    weather_desc: "लाइव मौसम विवरण",
    disease_title: "🌿 रोग पहचान",
    disease_desc: "फसल रोग का विश्लेषण करें",
    
    // Tools
    back_btn: "[←] डैशबोर्ड",
    mandi_query: "💰 मंडी भाव पूछताछ",
    mandi_sub: "एपीआई से नवीनतम फसल की कीमतें प्राप्त करें",
    location_label: "स्थान (राज्य/जिला)",
    execute_query: "खोजें()",
    waiting: "> इनपुट की प्रतीक्षा है...",

    rec_model: "🌾 फसल सुझाव मॉडल चलाएं",
    rec_sub: "सर्वोत्तम फसल का अनुमान लगाने के लिए विवरण दर्ज करें।",
    region_label: "क्षेत्र",
    soil_label: "मिट्टी का प्रकार",
    weather_cond: "मौसम की स्थिति",
    season_label: "मौसम (सीजन)",

    leaf_analysis: "🌿 पत्ती छवि विश्लेषण",
    leaf_sub: "पौधे के रोग की पहचान के लिए पत्ती की एक तस्वीर अपलोड करें।",
    analyze_btn: "छवि का विश्लेषण करें",

    weather_forecast: "🌤 मौसम का पूर्वानुमान",
    weather_sub_msg: "अपने क्षेत्र के लिए मौसम का डेटा प्राप्त करें।",
    city_label: "शहर का नाम",
    fetch_data: "डेटा प्राप्त करें",

    // General Actions
    query_model: "अनुमान लगाएं()"
  }
};

function setLanguage(lang) {
  localStorage.setItem('agritech_lang', lang);
  updateContent(lang);
}

function updateContent(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Check if input element with placeholder
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        // Special case for placeholders if needed, but for now just text content
        // Or if it's an input with placeholder
      }
      el.innerText = translations[lang][key];
    }
  });

  // Update button active states
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.style.color = 'var(--accent-glow)';
      btn.style.fontWeight = 'bold';
    } else {
      btn.style.color = 'var(--accent-dim)';
      btn.style.fontWeight = 'normal';
    }
  });
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('agritech_lang') || 'en';
  updateContent(savedLang);
});
