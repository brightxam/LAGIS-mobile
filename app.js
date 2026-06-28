/* ═══════════════════════════════════════════════════════════════
   LAGIS 2026 — app.js
   Full architecture with rich discovery, weather, 2GIS-style UX
═══════════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. DATA LAYER
═══════════════════════════════════════════════════════════════ */
const CAT = {
  food:     { color:'#f97316', bg:'#fff4ed', emoji:'🍽️', label:'Food & Drink' },
  bank:     { color:'#3b82f6', bg:'#eff6ff', emoji:'🏦', label:'Banking' },
  health:   { color:'#22c55e', bg:'#f0fdf4', emoji:'🏥', label:'Health' },
  market:   { color:'#a855f7', bg:'#faf5ff', emoji:'🛒', label:'Market' },
  school:   { color:'#eab308', bg:'#fefce8', emoji:'🎓', label:'Education' },
  fuel:     { color:'#ef4444', bg:'#fef2f2', emoji:'⛽', label:'Fuel Station' },
  transit:  { color:'#06b6d4', bg:'#ecfeff', emoji:'🚌', label:'Transit' },
  tech:     { color:'#8b5cf6', bg:'#f5f3ff', emoji:'💻', label:'Tech Hub' },
  cinema:   { color:'#f59e0b', bg:'#fffbeb', emoji:'🎬', label:'Cinema' },
  hotel:    { color:'#ec4899', bg:'#fdf2f8', emoji:'🏨', label:'Hotel' },
  pharmacy: { color:'#10b981', bg:'#ecfdf5', emoji:'💊', label:'Pharmacy' },
  worship:  { color:'#6366f1', bg:'#eef2ff', emoji:'⛪', label:'Worship' },
  other:    { color:'#888',    bg:'#f5f5f5', emoji:'📍', label:'Other' },
};
function cat(c) { return CAT[c] || CAT.other; }

const POIS = [
  // ── HEALTH ──
  { name:'LUTH Hospital',                         category:'health',   lat:6.5175, lng:3.3480, address:'Idi-Araba, Yaba',           phone:'01-774-0050', hours:'Open 24hrs',      rating:4.1, reviewCount:312, isOpen:true,  tags:['emergency','doctor','surgery','medical','hospital','accident'] },
  { name:'Infectious Diseases Hospital',          category:'health',   lat:6.5190, lng:3.3560, address:'Harvey Road, Yaba',         phone:'',            hours:'Open 24hrs',      rating:3.8, reviewCount:87,  isOpen:true,  tags:['hospital','infectious','medical','isolation'] },
  { name:'Federal Neuro Psychiatric Hospital',    category:'health',   lat:6.5185, lng:3.3545, address:'Harvey Road, Yaba',         phone:'',            hours:'Open 24hrs',      rating:3.6, reviewCount:54,  isOpen:true,  tags:['mental health','psychiatric','hospital','counselling'] },
  { name:'Nigerian Institute of Medical Research',category:'health',   lat:6.5198, lng:3.3572, address:'6 Edmund Crescent, Yaba',   phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.0, reviewCount:29,  isOpen:false, tags:['research','medical','lab','health'] },
  { name:'Randle General Hospital',               category:'health',   lat:6.5020, lng:3.3580, address:'Randle Ave, Surulere',      phone:'01-774-0100', hours:'Open 24hrs',      rating:3.9, reviewCount:143, isOpen:true,  tags:['hospital','emergency','doctor','medical'] },
  { name:'LASUTH Outpatient Clinic',              category:'health',   lat:6.5180, lng:3.3490, address:'Idi-Araba, Yaba',           phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:61,  isOpen:false, tags:['clinic','doctor','outpatient','medical'] },

  // ── PHARMACY ──
  { name:'MedPlus Pharmacy Yaba',                 category:'pharmacy', lat:6.5108, lng:3.3672, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 8am–9pm',   rating:4.3, reviewCount:198, isOpen:true,  tags:['pharmacy','drugs','medicine','chemist','prescription'] },
  { name:'Healthplus Pharmacy Yaba',              category:'pharmacy', lat:6.5115, lng:3.3665, address:'Yaba, Lagos',               phone:'',            hours:'Daily 8am–9pm',   rating:4.2, reviewCount:156, isOpen:true,  tags:['pharmacy','drugs','medicine','chemist','health'] },

  // ── SCHOOLS ──
  { name:'Yaba College of Technology',            category:'school',   lat:6.5195, lng:3.3710, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.0, reviewCount:820, isOpen:true,  tags:['yabatech','polytechnic','engineering','education','admission'] },
  { name:'University of Lagos',                   category:'school',   lat:6.5158, lng:3.3980, address:'Akoka, Yaba',               phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.4, reviewCount:2100,isOpen:true,  tags:['unilag','university','degree','education','campus','admission'] },
  { name:"Queen's College",                       category:'school',   lat:6.5168, lng:3.3620, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.5, reviewCount:430, isOpen:false, tags:['secondary school','girls','federal','education'] },
  { name:'Igbobi College',                        category:'school',   lat:6.5210, lng:3.3650, address:'Igbobi, Yaba',              phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.3, reviewCount:380, isOpen:false, tags:['secondary school','boys','education'] },
  { name:"St. Finbarr's College",                 category:'school',   lat:6.5145, lng:3.3590, address:'Akoka Road, Yaba',          phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.2, reviewCount:290, isOpen:false, tags:['secondary school','education','boys'] },
  { name:'Yaba Metropolitan College',             category:'school',   lat:6.5160, lng:3.3630, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:72,  isOpen:false, tags:['college','education','vocational','training'] },
  { name:'LASCOHET',                              category:'school',   lat:6.5172, lng:3.3530, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–5pm', rating:3.9, reviewCount:48,  isOpen:false, tags:['health technology','college','pharmacy','nursing'] },

  // ── MARKETS ──
  { name:'Tejuosho Market',                       category:'market',   lat:6.5063, lng:3.3631, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 7am–7pm',   rating:4.1, reviewCount:534, isOpen:true,  tags:['rice','pepper','tomatoes','yam','clothes','thrift','fabric','food','provisions'] },
  { name:'Makoko Fish Market',                    category:'market',   lat:6.4966, lng:3.3896, address:'Makoko, Yaba',              phone:'',            hours:'Daily 6am–6pm',   rating:4.3, reviewCount:287, isOpen:true,  tags:['fish','seafood','catfish','tilapia','fresh fish','crayfish'] },
  { name:'Sabo Market',                           category:'market',   lat:6.5088, lng:3.3760, address:'Sabo, Yaba',                phone:'',            hours:'Daily 7am–7pm',   rating:3.9, reviewCount:201, isOpen:true,  tags:['rice','pepper','tomatoes','food','vegetables','provisions'] },
  { name:'Yaba Market',                           category:'market',   lat:6.5100, lng:3.3640, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–7pm',   rating:4.0, reviewCount:445, isOpen:true,  tags:['thrift','clothes','shoes','second hand','bend down','okrika'] },
  { name:'E-Centre Mall',                         category:'market',   lat:6.5068, lng:3.3688, address:'Commercial Ave, Yaba',      phone:'',            hours:'Daily 9am–9pm',   rating:4.4, reviewCount:873, isOpen:true,  tags:['mall','shopping','cinema','restaurant','supermarket'] },
  { name:'Tejuosho Shopping Complex',             category:'market',   lat:6.5060, lng:3.3625, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 9am–8pm',   rating:3.8, reviewCount:162, isOpen:true,  tags:['shopping','grocery','cosmetics','pharmacy','clothes'] },

  // ── BANKS ──
  { name:'Zenith Bank Yaba',                      category:'bank',     lat:6.5121, lng:3.3700, address:'Herbert Macaulay Way, Yaba',phone:'01-278-7000', hours:'Mon–Fri 8am–4pm', rating:3.9, reviewCount:214, isOpen:false, tags:['atm','transfer','banking','cash','savings','account'] },
  { name:'GTBank Yaba',                           category:'bank',     lat:6.5135, lng:3.3650, address:'Corporation Drive, Yaba',   phone:'01-448-0000', hours:'Mon–Fri 8am–4pm', rating:4.0, reviewCount:189, isOpen:false, tags:['atm','transfer','banking','cash','savings','account'] },
  { name:'Access Bank Yaba',                      category:'bank',     lat:6.5110, lng:3.3720, address:'Yaba Bus Stop, Yaba',       phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:143, isOpen:false, tags:['atm','transfer','banking','cash','loan'] },
  { name:'First Bank Yaba',                       category:'bank',     lat:6.5098, lng:3.3668, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:298, isOpen:false, tags:['atm','transfer','banking','cash','savings'] },
  { name:'UBA Yaba',                              category:'bank',     lat:6.5115, lng:3.3690, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.9, reviewCount:167, isOpen:false, tags:['atm','transfer','banking','cash','account'] },
  { name:'Fidelity Bank Yaba',                    category:'bank',     lat:6.5105, lng:3.3678, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:92,  isOpen:false, tags:['atm','banking','cash','savings','loan'] },
  { name:'Polaris Bank Yaba',                     category:'bank',     lat:6.5092, lng:3.3660, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.6, reviewCount:78,  isOpen:false, tags:['atm','banking','cash','transfer'] },
  { name:'Sterling Bank Yaba',                    category:'bank',     lat:6.5118, lng:3.3645, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:84,  isOpen:false, tags:['atm','banking','cash','transfer','savings'] },

  // ── FOOD ──
  { name:'Chicken Republic Yaba',                 category:'food',     lat:6.5118, lng:3.3688, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 9am–10pm',  rating:4.1, reviewCount:623, isOpen:true,  tags:['chicken','burger','fast food','jollof','rice','chips'] },
  { name:'Mr Biggs Yaba',                         category:'food',     lat:6.5105, lng:3.3670, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–9pm',   rating:3.9, reviewCount:341, isOpen:true,  tags:['pies','snacks','fast food','eat','meat pie'] },
  { name:'Tantalizers Yaba',                      category:'food',     lat:6.5130, lng:3.3660, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–9pm',   rating:4.0, reviewCount:287, isOpen:true,  tags:['chicken','rice','fast food','jollof','eat'] },
  { name:'Kilimanjaro Yaba',                      category:'food',     lat:6.5112, lng:3.3682, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 9am–10pm',  rating:4.2, reviewCount:412, isOpen:true,  tags:['chicken','burger','fast food','shawarma','eat'] },
  { name:'Mama Cass Yaba',                        category:'food',     lat:6.5095, lng:3.3695, address:'Yaba, Lagos',               phone:'',            hours:'Daily 8am–9pm',   rating:4.4, reviewCount:567, isOpen:true,  tags:['nigerian food','rice','soup','amala','eba','local food'] },
  { name:'Southern Fried Chicken Yaba',           category:'food',     lat:6.5122, lng:3.3675, address:'Yaba, Lagos',               phone:'',            hours:'Daily 10am–10pm', rating:4.0, reviewCount:198, isOpen:true,  tags:['chicken','fast food','chips','burger','eat'] },
  { name:'Subway Yaba',                           category:'food',     lat:6.5070, lng:3.3692, address:'E-Centre, Commercial Ave',  phone:'',            hours:'Daily 9am–9pm',   rating:4.1, reviewCount:234, isOpen:true,  tags:['sandwich','sub','fast food','healthy','eat'] },
  { name:'Cold Stone Creamery Yaba',              category:'food',     lat:6.5065, lng:3.3685, address:'E-Centre, Yaba',            phone:'',            hours:'Daily 11am–10pm', rating:4.5, reviewCount:489, isOpen:true,  tags:['ice cream','dessert','cake','sweet','snacks'] },
  { name:'The Place Restaurant Yaba',             category:'food',     lat:6.5088, lng:3.3698, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–10pm',  rating:4.3, reviewCount:378, isOpen:true,  tags:['nigerian food','chicken','rice','grills','eat','restaurant'] },
  { name:'Olaiya Food Canteen',                   category:'food',     lat:6.5078, lng:3.3655, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily 7am–8pm',   rating:4.6, reviewCount:892, isOpen:true,  tags:['amala','ewedu','gbegiri','local food','nigerian','cheap food'] },

  // ── TECH ──
  { name:'CcHUB',                                 category:'tech',     lat:6.5148, lng:3.3695, address:'294 Herbert Macaulay Way',  phone:'',            hours:'Mon–Fri 8am–6pm', rating:4.7, reviewCount:543, isOpen:true,  tags:['startup','incubator','coworking','tech','innovation','hub'] },
  { name:'Izone Hub',                             category:'tech',     lat:6.5155, lng:3.3705, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 9am–6pm', rating:4.3, reviewCount:187, isOpen:true,  tags:['coworking','tech','startup','office space','hub'] },
  { name:'Wennovation Hub',                       category:'tech',     lat:6.5140, lng:3.3688, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 9am–6pm', rating:4.4, reviewCount:213, isOpen:true,  tags:['startup','incubator','tech','innovation','entrepreneurs'] },

  // ── FUEL ──
  { name:'Total Filling Station Yaba',            category:'fuel',     lat:6.5140, lng:3.3630, address:'Western Ave, Yaba',         phone:'',            hours:'Daily 6am–10pm',  rating:3.8, reviewCount:134, isOpen:true,  tags:['petrol','diesel','gas','fuel','filling station','pump'] },
  { name:'NNPC Filling Station Yaba',             category:'fuel',     lat:6.5082, lng:3.3655, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 6am–10pm',  rating:3.6, reviewCount:98,  isOpen:true,  tags:['petrol','diesel','fuel','filling station','pump'] },
  { name:'Ardova Filling Station Yaba',           category:'fuel',     lat:6.5095, lng:3.3642, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–10pm',  rating:3.7, reviewCount:76,  isOpen:true,  tags:['petrol','diesel','fuel','filling station','pump'] },
  { name:'MRS Filling Station Yaba',              category:'fuel',     lat:6.5072, lng:3.3668, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily 6am–10pm',  rating:3.9, reviewCount:112, isOpen:true,  tags:['petrol','diesel','fuel','filling station','gas'] },

  // ── TRANSIT ──
  { name:'Yaba Bus Stop',                         category:'transit',  lat:6.5112, lng:3.3679, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily',           rating:3.5, reviewCount:245, isOpen:true,  tags:['bus','danfo','okada','keke','transport','BRT'] },
  { name:'Mobolaji Johnson Railway Station',      category:'transit',  lat:6.5130, lng:3.3600, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–9pm',   rating:3.8, reviewCount:167, isOpen:true,  tags:['train','rail','railway','ibadan','commute','NRC'] },
  { name:'Ojuelegba Bus Stop',                    category:'transit',  lat:6.5058, lng:3.3620, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily',           rating:3.4, reviewCount:312, isOpen:true,  tags:['bus','danfo','BRT','transport','commute'] },
  { name:'Sabo Bus Stop',                         category:'transit',  lat:6.5085, lng:3.3758, address:'Sabo, Yaba',                phone:'',            hours:'Daily',           rating:3.3, reviewCount:143, isOpen:true,  tags:['bus','danfo','okada','transport'] },
  { name:'Fadeyi Bus Stop',                       category:'transit',  lat:6.5220, lng:3.3640, address:'Fadeyi, Yaba',              phone:'',            hours:'Daily',           rating:3.5, reviewCount:98,  isOpen:true,  tags:['bus','danfo','BRT','transport'] },

  // ── CINEMA ──
  { name:'Ozone Cinemas E-Centre',                category:'cinema',   lat:6.5070, lng:3.3690, address:'Commercial Ave, Yaba',      phone:'',            hours:'Daily 10am–10pm', rating:4.3, reviewCount:678, isOpen:true,  tags:['cinema','movies','film','entertainment','watch movie'] },

  // ── HOTELS ──
  { name:'De Edge Hotel Yaba',                    category:'hotel',    lat:6.5102, lng:3.3658, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:3.8, reviewCount:123, isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','stay'] },
  { name:'Crystal Suites Yaba',                   category:'hotel',    lat:6.5088, lng:3.3672, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:4.0, reviewCount:89,  isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','suites'] },
  { name:'Mainland Hotel Yaba',                   category:'hotel',    lat:6.5075, lng:3.3648, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:3.7, reviewCount:167, isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','stay'] },

  // ── WORSHIP ──
  { name:'Our Saviour Church Yaba',               category:'worship',  lat:6.5125, lng:3.3625, address:'Yaba, Lagos',               phone:'',            hours:'Sun 7am–12pm',    rating:4.6, reviewCount:234, isOpen:false, tags:['church','worship','prayer','christianity','sunday service'] },
  { name:'Yaba Central Mosque',                   category:'worship',  lat:6.5098, lng:3.3712, address:'Yaba, Lagos',               phone:'',            hours:'Daily',           rating:4.5, reviewCount:189, isOpen:true,  tags:['mosque','worship','prayer','islam','friday prayer'] },
  { name:'RCCG Yaba Parish',                      category:'worship',  lat:6.5135, lng:3.3698, address:'Yaba, Lagos',               phone:'',            hours:'Sun 7am–1pm',     rating:4.7, reviewCount:312, isOpen:false, tags:['church','rccg','worship','prayer','christianity'] },
];

/* ═══════════════════════════════════════════════════════════════
   2. STATE
═══════════════════════════════════════════════════════════════ */
let map            = null;
let mapMarkers     = [];
let routingControl = null;
let userLocation   = null;
let currentPOI     = null;
let isSearchActive = false;
let _currentResults= [];
let searchTimeout  = null;
let isDraggingSheet= false;
let sheetState     = 'mid';
let savedPOIs      = JSON.parse(localStorage.getItem('lagis_saved') || '[]');
let recentSearches = JSON.parse(localStorage.getItem('lagis_recent') || '[]');
let weatherData    = null; /* store last fetched weather for re-use */

/* ═══════════════════════════════════════════════════════════════
   3. THEME
═══════════════════════════════════════════════════════════════ */
let isDark = localStorage.getItem('lagis_dark') === '1';
function applyTheme() {
  document.body.classList.toggle('dark', isDark);
  document.getElementById('theme-icon-light').style.display = isDark ? 'none' : '';
  document.getElementById('theme-icon-dark').style.display  = isDark ? ''     : 'none';
}
document.getElementById('theme-btn').addEventListener('click', () => {
  isDark = !isDark;
  localStorage.setItem('lagis_dark', isDark ? '1' : '0');
  applyTheme();
});
applyTheme();

/* ═══════════════════════════════════════════════════════════════
   4. WEATHER
   - Fetches real Lagos Yaba temperature from Open-Meteo (free)
   - Widget position updates live as sheet drags
   - Falls back gracefully with no error shown to user
═══════════════════════════════════════════════════════════════ */
const WMO = {
  icons: { 0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',53:'🌦️',55:'🌧️',61:'🌧️',63:'🌧️',65:'🌧️',71:'❄️',73:'❄️',75:'❄️',80:'🌦️',81:'🌧️',82:'⛈️',95:'⛈️',96:'⛈️',99:'⛈️' },
  desc:  { 0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Showers',81:'Rain showers',82:'Heavy showers',95:'Thunderstorm',96:'Thunderstorm',99:'Hailstorm' },
};

async function loadWeather() {
  const widget = document.getElementById('weather-widget');
  try {
    const r = await fetch(
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=6.512&longitude=3.370' +
      '&current_weather=true' +
      '&hourly=relativehumidity_2m' +
      '&temperature_unit=celsius' +
      '&timezone=Africa%2FLagos'
    );
    if (!r.ok) throw new Error('weather fetch failed');
    const d   = await r.json();
    const cw  = d.current_weather;
    const code= cw.weathercode;
    const temp= Math.round(cw.temperature);

    weatherData = { code, temp, icon: WMO.icons[code] || '🌡️', desc: WMO.desc[code] || '' };

    document.getElementById('weather-icon').textContent = weatherData.icon;
    document.getElementById('weather-temp').textContent = `${temp}°C`;
    document.getElementById('weather-desc').textContent = weatherData.desc;

    /* Make widget visible and clickable — tapping shows detail toast */
    widget.style.display       = 'flex';
    widget.style.pointerEvents = 'auto';
    widget.style.cursor        = 'pointer';
    widget.onclick = () => showToast(`Lagos · ${weatherData.desc} · ${temp}°C`);

    /* If discovery is showing, refresh the weather card in it */
    if (!isSearchActive) refreshWeatherCard();

  } catch {
    /* Silently hide the widget — non-critical */
    widget.style.display = 'none';
  }
}

function refreshWeatherCard() {
  const card = document.getElementById('disc-weather-card');
  if (!card || !weatherData) return;
  card.innerHTML = buildWeatherCardHTML();
}

function buildWeatherCardHTML() {
  if (!weatherData) return '';
  return `
    <div style="font-size:28px;line-height:1">${weatherData.icon}</div>
    <div>
      <div style="font-size:22px;font-weight:700;color:var(--text-1);line-height:1">${weatherData.temp}°C</div>
      <div style="font-size:11px;color:var(--text-2);margin-top:2px">${weatherData.desc}</div>
    </div>
    <div style="margin-left:auto;text-align:right">
      <div style="font-size:11px;font-weight:600;color:var(--brand-600)">Yaba</div>
      <div style="font-size:10px;color:var(--text-3)">Lagos, NG</div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   5. MAP LAYER
═══════════════════════════════════════════════════════════════ */
function initMap() {
  map = L.map('map', {
    zoomControl:        false,
    attributionControl: false,
    tap:                true,
    tapTolerance:       15,
    maxZoom:            19,
    minZoom:            11,
  }).setView([6.5120, 3.3700], 15);

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { maxZoom: 19, subdomains: 'abcd' }
  ).addTo(map);

  map.on('click', () => { closeCard(); hideDropdown(); });
  map.on('zoomend', () => {
    if (isSearchActive && _currentResults.length) renderMarkers(_currentResults);
  });

  document.getElementById('zoom-in') .addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
  document.getElementById('locate-btn').addEventListener('click', locateMe);
}

function clearMarkers() {
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];
}

function buildMarkerIcon(poi, isActive = false) {
  const m    = cat(poi.category);
  const size = isActive ? 42 : 36;
  return L.divIcon({
    className: '',
    html: `<div class="lagis-marker${isActive ? ' active' : ''}"
                style="width:${size}px;height:${size}px;background:${m.color}">
             <span style="font-size:${isActive ? 19 : 16}px;line-height:1">${m.emoji}</span>
           </div>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function buildClusterIcon(count) {
  const big  = count > 20;
  const size = big ? 48 : 40;
  return L.divIcon({
    className: '',
    html: `<div class="lagis-cluster${big ? ' large' : ''}"
                style="width:${size}px;height:${size}px;font-size:${big ? 15 : 13}px">
             ${count}
           </div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function renderMarkers(pois) {
  clearMarkers();
  const zoom = map.getZoom();
  const { clusters, singles } = clusterPOIs(pois, zoom);

  clusters.forEach(cl => {
    const m = L.marker([cl.lat, cl.lng], { icon: buildClusterIcon(cl.count) })
      .addTo(map)
      .on('click', e => {
        L.DomEvent.stopPropagation(e);
        map.flyTo([cl.lat, cl.lng], map.getZoom() + 2, { duration: 0.5 });
      });
    mapMarkers.push(m);
  });

  singles.forEach(poi => {
    const m = L.marker([poi.lat, poi.lng], { icon: buildMarkerIcon(poi) })
      .addTo(map)
      .on('click', e => {
        L.DomEvent.stopPropagation(e);
        map.flyTo([poi.lat, poi.lng], Math.max(map.getZoom(), 16), { duration: 0.4 });
        openCard(poi);
      });
    mapMarkers.push(m);
  });
}

function clusterPOIs(pois, zoom) {
  if (zoom >= 15) return { clusters: [], singles: pois };
  const grid = zoom <= 12 ? 0.025 : 0.012;
  const used = new Set(), clusters = [], singles = [];
  pois.forEach((poi, i) => {
    if (used.has(i)) return;
    const group = [poi]; used.add(i);
    pois.forEach((other, j) => {
      if (used.has(j)) return;
      if (Math.abs(poi.lat - other.lat) < grid && Math.abs(poi.lng - other.lng) < grid) {
        group.push(other); used.add(j);
      }
    });
    if (group.length > 1) {
      clusters.push({
        lat:   group.reduce((s, p) => s + p.lat, 0) / group.length,
        lng:   group.reduce((s, p) => s + p.lng, 0) / group.length,
        count: group.length,
      });
    } else {
      singles.push(poi);
    }
  });
  return { clusters, singles };
}

/* ═══════════════════════════════════════════════════════════════
   6. LOCATION
═══════════════════════════════════════════════════════════════ */
let userMarker = null;

function locateMe() {
  if (!navigator.geolocation) { showToast('Geolocation not supported'); return; }
  const btn = document.getElementById('locate-btn');
  btn.classList.add('locating');
  navigator.geolocation.getCurrentPosition(
    pos => {
      btn.classList.remove('locating');
      userLocation = [pos.coords.latitude, pos.coords.longitude];
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.marker(userLocation, {
        icon: L.divIcon({
          className: '',
          html: '<div class="lagis-user-dot"></div>',
          iconSize: [16, 16], iconAnchor: [8, 8],
        }),
        zIndexOffset: 1000,
      }).addTo(map);
      map.flyTo(userLocation, 16, { duration: 0.8 });
      /* Refresh discovery to show distances */
      if (!isSearchActive) showDiscovery();
    },
    err => {
      btn.classList.remove('locating');
      const msgs = { 1:'Location permission denied', 2:'Location unavailable', 3:'Request timed out' };
      showToast(msgs[err.code] || 'Could not get location');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. BOTTOM SHEET — drags over full-screen map
═══════════════════════════════════════════════════════════════ */
const sheet = document.getElementById('bottom-sheet');

const HEIGHTS = {
  peek: () => 92,
  mid:  () => Math.round(window.innerHeight * 0.46),
  full: () => Math.round(window.innerHeight * 0.88),
};

function setSheet(state, animate = true) {
  sheetState = state;
  const h = HEIGHTS[state]();
  sheet.style.transition = animate ? 'height 300ms cubic-bezier(0.4,0,0.2,1)' : 'none';
  sheet.style.height     = h + 'px';
  syncFloatingControls(h);
}

function syncFloatingControls(sheetH) {
  const offset = sheetH + 14;
  const ctrl   = document.getElementById('map-controls-right');
  const weather = document.getElementById('weather-widget');
  if (ctrl)    ctrl.style.bottom    = offset + 'px';
  if (weather) weather.style.bottom = offset + 'px';
}

const handleWrap = document.getElementById('sheet-handle-wrap');
let dragStartY = 0, dragStartH = 0;

function onDragStart(y) { isDraggingSheet = true; dragStartY = y; dragStartH = sheet.offsetHeight; sheet.style.transition = 'none'; }
function onDragMove(y) {
  if (!isDraggingSheet) return;
  const h = Math.min(Math.max(dragStartH + (dragStartY - y), HEIGHTS.peek()), HEIGHTS.full());
  sheet.style.height = h + 'px';
  syncFloatingControls(h);
}
function onDragEnd() {
  if (!isDraggingSheet) return;
  isDraggingSheet = false;
  const h = sheet.offsetHeight;
  setSheet(h < (HEIGHTS.peek() + HEIGHTS.mid()) / 2 ? 'peek' : h < (HEIGHTS.mid() + HEIGHTS.full()) / 2 ? 'mid' : 'full');
}

handleWrap.addEventListener('touchstart', e => onDragStart(e.touches[0].clientY), { passive: true });
handleWrap.addEventListener('touchmove',  e => { e.preventDefault(); onDragMove(e.touches[0].clientY); }, { passive: false });
handleWrap.addEventListener('touchend',   onDragEnd);
handleWrap.addEventListener('mousedown',  e => onDragStart(e.clientY));
window.addEventListener('mousemove', e => { if (isDraggingSheet) onDragMove(e.clientY); });
window.addEventListener('mouseup',   onDragEnd);
handleWrap.addEventListener('click', () => {
  if (isDraggingSheet) return;
  setSheet({ peek:'mid', mid:'full', full:'peek' }[sheetState]);
});

/* ═══════════════════════════════════════════════════════════════
   8. DISCOVERY — rich 2GIS-style home screen
   Sections:
     • Live weather card
     • Near you (distance-sorted if GPS available, else proximity to Yaba center)
     • Open now (horizontal scroll cards)
     • Things to do (curated activity suggestions)
     • Top rated (horizontal scroll cards)
     • Quick category grid
═══════════════════════════════════════════════════════════════ */
function showDiscovery() {
  clearMarkers();
  isSearchActive  = false;
  _currentResults = [];

  document.getElementById('list-count').textContent = 'Yaba, Lagos';
  document.getElementById('sheet-area').textContent  = 'Lagos State · Nigeria';

  /* ── Compute sections ── */
  const ref   = userLocation || [6.5120, 3.3700]; /* fallback: Yaba center */
  const withDist = POIS.map(p => ({
    ...p,
    _dist: haversine(ref[0], ref[1], p.lat, p.lng),
  }));

  /* Near you: 6 closest POIs */
  const nearYou = [...withDist].sort((a, b) => a._dist - b._dist).slice(0, 6);

  /* Open now: open places, highest rated first */
  const openNow = [...withDist]
    .filter(p => p.isOpen)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  /* Top rated: weighted score */
  const topRated = [...withDist]
    .sort((a, b) =>
      (b.rating * Math.log10(b.reviewCount + 10)) -
      (a.rating * Math.log10(a.reviewCount + 10))
    )
    .slice(0, 8);

  /* Things to do: curated list of activities mapped to POI categories */
  const thingsToDo = [
    { label:'Grab a meal',     emoji:'🍽️', cat:'food',    hint:'Best local food' },
    { label:'Visit a market',  emoji:'🛒', cat:'market',  hint:'Fresh & affordable' },
    { label:'Watch a movie',   emoji:'🎬', cat:'cinema',  hint:'Entertainment' },
    { label:'Visit a hospital',emoji:'🏥', cat:'health',  hint:'Medical care' },
    { label:'Find a bank',     emoji:'🏦', cat:'bank',    hint:'ATM & banking' },
    { label:'Tech hubs',       emoji:'💻', cat:'tech',    hint:'Work & innovate' },
    { label:'Fill up fuel',    emoji:'⛽', cat:'fuel',    hint:'Petrol stations' },
    { label:'Get a room',      emoji:'🏨', cat:'hotel',   hint:'Places to stay' },
  ];

  const list = document.getElementById('poi-list');
  list.innerHTML = `

    <!-- ── WEATHER CARD ── -->
    <div id="disc-weather-card"
         style="
           display:flex;align-items:center;gap:12px;
           margin:12px 12px 0;
           padding:14px 16px;
           background:linear-gradient(135deg,#e8f5ee,#f0fdf4);
           border-radius:16px;
           border:1px solid rgba(26,122,74,0.12);
           cursor:pointer;
         "
         onclick="showToast('${weatherData ? `Lagos · ${weatherData.desc} · ${weatherData.temp}°C` : 'Loading weather…'}')">
      ${weatherData ? buildWeatherCardHTML() : `
        <div style="font-size:28px">⛅</div>
        <div>
          <div style="font-size:20px;font-weight:700;color:var(--text-1)">--°C</div>
          <div style="font-size:11px;color:var(--text-2)">Loading…</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:11px;font-weight:600;color:var(--brand-600)">Yaba</div>
          <div style="font-size:10px;color:var(--text-3)">Lagos, NG</div>
        </div>
      `}
    </div>

    <!-- ── NEAR YOU ── -->
    <div class="disc-section-label" style="margin-top:20px">
      📍 ${userLocation ? 'Near you' : 'Around Yaba'}
    </div>
    ${nearYou.map(poi => buildPoiRowHTML(poi, true)).join('')}

    <!-- ── OPEN NOW — horizontal scroll ── -->
    <div class="disc-section-header">
      <span class="disc-section-label" style="margin:0">🟢 Open now</span>
      <button class="disc-see-all" onclick="filterOpenNow()">See all</button>
    </div>
    <div class="disc-hscroll">
      ${openNow.map(poi => buildHCard(poi)).join('')}
    </div>

    <!-- ── THINGS TO DO ── -->
    <div class="disc-section-label" style="margin-top:8px">✨ Things to do in Yaba</div>
    <div class="disc-hscroll">
      ${thingsToDo.map(t => `
        <div class="disc-activity-card" onclick="quickExplore('${t.cat}')"
             role="button" tabindex="0" aria-label="${t.label}">
          <div class="disc-activity-emoji">${t.emoji}</div>
          <div class="disc-activity-label">${t.label}</div>
          <div class="disc-activity-hint">${t.hint}</div>
        </div>
      `).join('')}
    </div>

    <!-- ── TOP RATED — horizontal scroll ── -->
    <div class="disc-section-header">
      <span class="disc-section-label" style="margin:0">⭐ Top rated</span>
      <button class="disc-see-all" onclick="showAllTopRated()">See all</button>
    </div>
    <div class="disc-hscroll">
      ${topRated.map(poi => buildHCard(poi)).join('')}
    </div>

    <!-- ── QUICK CATEGORY GRID ── -->
    <div class="disc-section-label" style="margin-top:8px">🗺️ Explore by category</div>
    <div class="qe-grid">
      <div class="qe-card" style="background:#fff4ed;border-color:#fed7aa"
           onclick="quickExplore('food')" role="button" tabindex="0">
        <div class="qe-emoji">🍽️</div>
        <div class="qe-label" style="color:#f97316">Food & Drink</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'food').length} places</div>
      </div>
      <div class="qe-card" style="background:#eff6ff;border-color:#bfdbfe"
           onclick="quickExplore('bank')" role="button" tabindex="0">
        <div class="qe-emoji">🏦</div>
        <div class="qe-label" style="color:#3b82f6">Banking</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'bank').length} branches</div>
      </div>
      <div class="qe-card" style="background:#f0fdf4;border-color:#bbf7d0"
           onclick="quickExplore('health')" role="button" tabindex="0">
        <div class="qe-emoji">🏥</div>
        <div class="qe-label" style="color:#22c55e">Health</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'health').length} facilities</div>
      </div>
      <div class="qe-card" style="background:#faf5ff;border-color:#e9d5ff"
           onclick="quickExplore('market')" role="button" tabindex="0">
        <div class="qe-emoji">🛒</div>
        <div class="qe-label" style="color:#a855f7">Markets</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'market').length} markets</div>
      </div>
      <div class="qe-card" style="background:#f5f3ff;border-color:#ddd6fe"
           onclick="quickExplore('tech')" role="button" tabindex="0">
        <div class="qe-emoji">💻</div>
        <div class="qe-label" style="color:#8b5cf6">Tech Hubs</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'tech').length} hubs</div>
      </div>
      <div class="qe-card" style="background:#fefce8;border-color:#fde68a"
           onclick="quickExplore('school')" role="button" tabindex="0">
        <div class="qe-emoji">🎓</div>
        <div class="qe-label" style="color:#eab308">Education</div>
        <div class="qe-sub">${POIS.filter(p => p.category === 'school').length} schools</div>
      </div>
    </div>

    <!-- Bottom padding for safe area -->
    <div style="height:32px"></div>
  `;

  /* Wire up all poi-row click handlers */
  attachPoiRowHandlers(list);

  /* Wire up horizontal card click handlers */
  list.querySelectorAll('.disc-hcard').forEach(el => {
    const name = el.dataset.poi;
    const poi  = POIS.find(p => p.name === name);
    if (!poi) return;
    el.addEventListener('click', () => {
      map.flyTo([poi.lat, poi.lng], 16, { duration: 0.5 });
      openCard(poi);
    });
  });

  setSheet('mid');
}

/* ── Horizontal scroll POI card (compact) ── */
function buildHCard(poi) {
  const m       = cat(poi.category);
  const distTxt = userLocation
    ? (() => {
        const d = haversine(userLocation[0], userLocation[1], poi.lat, poi.lng);
        return d < 1 ? `${Math.round(d * 1000)}m` : `${d.toFixed(1)}km`;
      })()
    : '';
  const openBadge = poi.isOpen != null
    ? `<span style="
        font-size:10px;font-weight:600;padding:2px 6px;border-radius:999px;
        background:${poi.isOpen ? '#dcfce7' : '#fee2e2'};
        color:${poi.isOpen ? '#166534' : '#991b1b'}"
      >${poi.isOpen ? 'Open' : 'Closed'}</span>`
    : '';
  return `
    <div class="disc-hcard" data-poi="${poi.name.replace(/"/g, '&quot;')}"
         role="button" tabindex="0" aria-label="${poi.name}">
      <div class="disc-hcard-icon" style="background:${m.bg}">${m.emoji}</div>
      <div class="disc-hcard-name">${poi.name}</div>
      <div class="disc-hcard-meta">
        ${poi.rating ? `<span style="color:#f59e0b;font-size:10px;font-weight:700">${poi.rating}★</span>` : ''}
        ${distTxt    ? `<span style="color:var(--text-3);font-size:10px">${distTxt}</span>` : ''}
        ${openBadge}
      </div>
    </div>
  `;
}

/* ── Vertical POI row with distance ── */
function buildPoiRowHTML(poi, showDist = false) {
  const m          = cat(poi.category);
  const ratingHTML = poi.rating
    ? `<span style="color:#f59e0b;font-size:11px;font-weight:600">${poi.rating.toFixed(1)} ★</span>
       <span style="color:var(--text-3);font-size:11px"> (${poi.reviewCount})</span>`
    : '';
  const distHTML = showDist && userLocation
    ? (() => {
        const d = haversine(userLocation[0], userLocation[1], poi.lat, poi.lng);
        return `<span class="poi-distance">${d < 1 ? Math.round(d * 1000) + 'm' : d.toFixed(1) + 'km'}</span>`;
      })()
    : '';
  const statusHTML = poi.isOpen != null
    ? `<span class="poi-status ${poi.isOpen ? 'open' : 'closed'}">${poi.isOpen ? 'Open' : 'Closed'}</span>`
    : '';
  return `
    <div class="poi-item" data-poi="${poi.name.replace(/"/g, '&quot;')}"
         role="listitem" tabindex="0" aria-label="${poi.name}">
      <div class="poi-dot" style="background:${m.bg}">${m.emoji}</div>
      <div class="poi-info">
        <div class="poi-name">${poi.name}</div>
        <div class="poi-sub">${m.label} · ${poi.address}</div>
        ${poi.rating ? `<div style="display:flex;align-items:center;gap:5px;margin-top:3px">${ratingHTML}</div>` : ''}
      </div>
      <div class="poi-right">
        ${statusHTML}
        ${distHTML}
        <span class="poi-chevron">›</span>
      </div>
    </div>
  `;
}

/* Legacy alias used by renderList */
function buildPoiItemHTML(poi) { return buildPoiRowHTML(poi, !!userLocation); }

function attachPoiRowHandlers(container) {
  container.querySelectorAll('.poi-item').forEach(el => {
    const name = el.dataset.poi;
    const poi  = POIS.find(p => p.name === name);
    if (!poi) return;
    el.addEventListener('click', () => {
      container.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
      el.classList.add('active');
      map.flyTo([poi.lat, poi.lng], 16, { duration: 0.5 });
      openCard(poi);
    });
  });
}

/* Helper functions for discovery "see all" buttons */
function filterOpenNow() {
  const open = POIS.filter(p => p.isOpen).sort((a, b) => b.rating - a.rating);
  _currentResults = open;
  isSearchActive  = true;
  renderMarkers(open);
  renderList(open);
  document.getElementById('list-count').textContent = `${open.length} Open now`;
  setSheet('mid');
}
function showAllTopRated() {
  const top = [...POIS].sort((a, b) =>
    (b.rating * Math.log10(b.reviewCount + 10)) - (a.rating * Math.log10(a.reviewCount + 10))
  );
  _currentResults = top;
  isSearchActive  = true;
  renderMarkers(top);
  renderList(top);
  document.getElementById('list-count').textContent = 'Top rated in Yaba';
  setSheet('mid');
}

/* ═══════════════════════════════════════════════════════════════
   9. RESULTS LIST
═══════════════════════════════════════════════════════════════ */
function renderList(pois) {
  const list = document.getElementById('poi-list');
  document.getElementById('list-count').textContent =
    `${pois.length} result${pois.length !== 1 ? 's' : ''}`;
  document.getElementById('sheet-area').textContent = 'Yaba, Lagos';

  if (!pois.length) {
    list.innerHTML = `
      <div style="padding:48px 24px;text-align:center">
        <div style="font-size:44px;margin-bottom:14px">🔍</div>
        <div style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:6px">No results</div>
        <div style="font-size:13px;color:var(--text-2);line-height:1.6">
          Try a different search term,<br>or tap a category above.
        </div>
      </div>`;
    return;
  }

  list.innerHTML = pois.map(poi => buildPoiItemHTML(poi)).join('');
  attachPoiRowHandlers(list);
}

/* ═══════════════════════════════════════════════════════════════
   10. POI DETAIL CARD
═══════════════════════════════════════════════════════════════ */
function openCard(poi) {
  currentPOI = poi;
  const m    = cat(poi.category);

  const badge = document.getElementById('card-badge');
  badge.textContent      = m.label;
  badge.style.background = m.bg;
  badge.style.color      = m.color;

  document.getElementById('card-name').textContent    = poi.name;
  document.getElementById('card-address').textContent = poi.address || '';

  /* Stats */
  const rEl = document.getElementById('stat-rating');
  const dEl = document.getElementById('stat-distance');
  const oEl = document.getElementById('stat-open');

  if (poi.rating) {
    document.getElementById('stat-rating-val').textContent = poi.rating.toFixed(1);
    document.getElementById('stat-reviews').textContent    = `(${poi.reviewCount} reviews)`;
    rEl.style.display = 'flex';
  } else { rEl.style.display = 'none'; }

  if (userLocation) {
    const d = haversine(userLocation[0], userLocation[1], poi.lat, poi.lng);
    document.getElementById('stat-distance-val').textContent =
      d < 1 ? `${Math.round(d * 1000)}m away` : `${d.toFixed(1)}km away`;
    dEl.style.display = 'flex';
  } else { dEl.style.display = 'none'; }

  if (poi.isOpen != null) {
    oEl.textContent   = poi.isOpen ? 'Open now' : 'Closed';
    oEl.className     = `stat-open ${poi.isOpen ? 'open' : 'closed'}`;
    oEl.style.display = 'inline-flex';
  } else { oEl.style.display = 'none'; }

  /* Meta */
  document.getElementById('meta-phone-text').textContent   = poi.phone   || '';
  document.getElementById('meta-hours-text').textContent   = poi.hours   || '';
  document.getElementById('meta-website-text').textContent = poi.website || '';
  document.getElementById('meta-phone')  .classList.toggle('hidden', !poi.phone);
  document.getElementById('meta-hours')  .classList.toggle('hidden', !poi.hours);
  document.getElementById('meta-website').classList.toggle('hidden', !poi.website);

  /* Save icon state */
  const isSaved  = savedPOIs.some(p => p.name === poi.name);
  const saveIcon = document.getElementById('save-icon');
  if (saveIcon) {
    saveIcon.setAttribute('fill',   isSaved ? m.color : 'none');
    saveIcon.setAttribute('stroke', isSaved ? m.color : 'currentColor');
  }

  document.getElementById('poi-card').classList.remove('hidden');
  setSheet('peek');
}

function closeCard() {
  document.getElementById('poi-card').classList.add('hidden');
  document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
  currentPOI = null;
}

document.getElementById('card-close')      .addEventListener('click', closeCard);
document.getElementById('btn-directions')  .addEventListener('click', () => { if (currentPOI) openRoutePanel(currentPOI); });
document.getElementById('btn-share')       .addEventListener('click', () => { if (currentPOI) sharePOI(currentPOI); });
document.getElementById('btn-save')        .addEventListener('click', () => { if (currentPOI) toggleSave(currentPOI); });

/* ═══════════════════════════════════════════════════════════════
   11. ROUTE PANEL
═══════════════════════════════════════════════════════════════ */
function openRoutePanel(poi) {
  document.getElementById('route-to').value   = poi ? `${poi.name}, ${poi.address}` : '';
  document.getElementById('route-from').value = userLocation ? 'My location' : '';
  window._routeDestPOI = poi;
  const panel = document.getElementById('route-panel');
  panel.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('visible'));
  document.getElementById('route-overlay').classList.remove('hidden');
  closeCard();
  if (poi) buildRouteSuggestions(poi);
}

function closeRoutePanel() {
  const panel = document.getElementById('route-panel');
  panel.classList.remove('visible');
  document.getElementById('route-overlay').classList.add('hidden');
  setTimeout(() => panel.classList.add('hidden'), 320);
}

function buildRouteSuggestions(refPOI) {
  const list = document.getElementById('route-suggestions-list');
  list.innerHTML = '';
  [...POIS]
    .filter(p => p.name !== refPOI.name)
    .map(p => ({ ...p, dist: Math.hypot(p.lat - refPOI.lat, p.lng - refPOI.lng) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 8)
    .forEach(p => {
      const m    = cat(p.category);
      const chip = document.createElement('div');
      chip.className   = 'suggestion-chip';
      chip.textContent = `${m.emoji} ${p.name}`;
      chip.addEventListener('click', () => {
        document.getElementById('route-to').value = `${p.name}, ${p.address}`;
        window._routeDestPOI = p;
      });
      list.appendChild(chip);
    });
}

function executeRoute() {
  const dest = window._routeDestPOI;
  if (!dest) { showToast('Please select a destination'); return; }
  const from = userLocation || [6.5120, 3.3700];
  const mode = document.querySelector('.mode-btn.active')?.dataset.mode || 'driving';
  drawRoute(from, dest, mode);
  closeRoutePanel();
}

function drawRoute(from, poi, mode = 'driving') {
  if (routingControl) { map.removeControl(routingControl); routingControl = null; }
  removeElement('cancel-route');
  const colors  = { driving:'#1a7a4a', walking:'#06b6d4', cycling:'#f59e0b' };
  const profiles= { driving:'car',      walking:'foot',     cycling:'bike'    };
  routingControl = L.Routing.control({
    waypoints: [L.latLng(from[0], from[1]), L.latLng(poi.lat, poi.lng)],
    router: L.Routing.osrmv1({ serviceUrl:'https://router.project-osrm.org/route/v1', profile: profiles[mode] || 'car' }),
    lineOptions: { styles: [{ color: colors[mode] || '#1a7a4a', weight:5, opacity:0.88, lineCap:'round', lineJoin:'round' }] },
    show:false, addWaypoints:false, routeWhileDragging:false, fitSelectedRoutes:true, showAlternatives:false,
    createMarker: (i, wp) => L.marker(wp.latLng, {
      icon: L.divIcon({
        className:'',
        html:`<div style="width:14px;height:14px;background:${i===0?'#1a7a4a':'#f97316'};border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize:[14,14], iconAnchor:[7,7],
      }),
    }),
  }).addTo(map);
  routingControl.on('routesfound', e => {
    const r = e.routes[0];
    document.getElementById('route-distance').textContent = `📍 ${(r.summary.totalDistance/1000).toFixed(1)} km`;
    document.getElementById('route-time').textContent     = `⏱ ${Math.round(r.summary.totalTime/60)} min`;
    document.getElementById('route-info').classList.remove('hidden');
    addCancelRouteBtn();
  });
  routingControl.on('routingerror', () => showToast('Could not find a route'));
}

function addCancelRouteBtn() {
  removeElement('cancel-route');
  const btn = document.createElement('button');
  btn.id        = 'cancel-route';
  btn.innerHTML = '✕ Cancel Route';
  btn.addEventListener('click', () => {
    if (routingControl) { map.removeControl(routingControl); routingControl = null; }
    document.getElementById('route-info').classList.add('hidden');
    removeElement('cancel-route');
  });
  document.body.appendChild(btn);
}

document.getElementById('route-close')   .addEventListener('click', closeRoutePanel);
document.getElementById('route-overlay') .addEventListener('click', closeRoutePanel);
document.getElementById('btn-get-route') .addEventListener('click', executeRoute);
document.getElementById('btn-use-location').addEventListener('click', () => {
  locateMe();
  document.getElementById('route-from').value = 'My location';
});
document.getElementById('btn-clear-to').addEventListener('click', () => {
  document.getElementById('route-to').value = '';
  window._routeDestPOI = null;
});
document.getElementById('route-swap').addEventListener('click', () => {
  const f = document.getElementById('route-from');
  const t = document.getElementById('route-to');
  [f.value, t.value] = [t.value, f.value];
});
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.mode-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    this.classList.add('active'); this.setAttribute('aria-pressed','true');
  });
});

/* ═══════════════════════════════════════════════════════════════
   12. SEARCH
═══════════════════════════════════════════════════════════════ */
const searchEl = document.getElementById('search');
const clearBtn = document.getElementById('search-clear');
const dropdown = document.getElementById('search-dropdown');

function showDropdown(items, label = '') {
  dropdown.innerHTML = '';
  if (!items.length) { hideDropdown(); return; }
  if (label) {
    const lbl = document.createElement('div');
    lbl.className = 'dd-label'; lbl.textContent = label;
    dropdown.appendChild(lbl);
  }
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'dd-item';
    row.innerHTML = `
      <div class="dd-icon" style="background:${item.bg}">${item.emoji}</div>
      <div style="flex:1;min-width:0">
        <div class="dd-name">${item.name}</div>
        <div class="dd-sub">${item.sub}</div>
      </div>`;
    row.addEventListener('click', () => {
      hideDropdown();
      searchEl.value = item.name;
      clearBtn.classList.remove('hidden');
      if (item.poi) {
        _currentResults = [item.poi]; isSearchActive = true;
        renderMarkers([item.poi]); renderList([item.poi]);
        map.flyTo([item.poi.lat, item.poi.lng], 16, { duration: 0.5 });
        openCard(item.poi); saveRecent(item.poi.name); setSheet('peek');
      }
    });
    dropdown.appendChild(row);
  });
  dropdown.style.display = 'block';
}
function hideDropdown() { dropdown.style.display = 'none'; }
function toItem(poi, sub = '') {
  const m = cat(poi.category);
  return { name:poi.name, sub: sub || `${m.label} · ${poi.address}`, emoji:m.emoji, bg:m.bg, poi };
}

searchEl.addEventListener('focus', () => {
  if (!searchEl.value && recentSearches.length) {
    showDropdown(
      recentSearches.map(n => POIS.find(p => p.name === n)).filter(Boolean).map(p => toItem(p, '🕐 Recent')),
      'Recent searches'
    );
  }
});

searchEl.addEventListener('input', function() {
  clearBtn.classList.toggle('hidden', !this.value);
  clearTimeout(searchTimeout);
  const q = this.value.trim();
  if (!q) { hideDropdown(); showDiscovery(); return; }
  const ql    = q.toLowerCase();
  const local = POIS.filter(p =>
    p.name.toLowerCase().includes(ql) ||
    p.tags.some(t => t.toLowerCase().includes(ql)) ||
    p.address.toLowerCase().includes(ql)
  ).slice(0, 6);
  showDropdown(local.map(p => toItem(p)), 'Places in Yaba');
  if (local.length) {
    _currentResults = local; isSearchActive = true;
    renderMarkers(local); renderList(local); setSheet('mid');
  }
  searchTimeout = setTimeout(async () => {
    document.getElementById('list-count').textContent = 'Searching…';
    const ai = await aiSearch(q);
    if (ai && ai.length) {
      _currentResults = ai; renderMarkers(ai); renderList(ai);
      showDropdown(ai.map(p => toItem(p, `🤖 AI · ${p.address}`)), 'AI results');
    }
  }, 700);
});

clearBtn.addEventListener('click', () => {
  searchEl.value = ''; clearBtn.classList.add('hidden');
  hideDropdown(); showDiscovery();
});
document.addEventListener('click', e => {
  if (!e.target.closest('#search-box') && !e.target.closest('#search-dropdown')) hideDropdown();
});

async function aiSearch(query) {
  const ctx = POIS.map((p, i) => `${i}:${p.name}(${p.category})-${p.address}-${p.tags.join(',')}`).join('\n');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json','x-api-key':CONFIG.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true' },
      body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:150, messages:[{ role:'user', content:`Yaba Lagos directory. Query: "${query}"\n\nPlaces:\n${ctx}\n\nReturn ONLY a JSON array of matching index numbers (max 8). Return [] if no match. No explanation.` }] }),
    });
    const data = await res.json();
    return JSON.parse(data.content[0].text.trim().replace(/```json|```/g,'')).map(i => POIS[i]).filter(Boolean);
  } catch { return null; }
}

/* ── Category pills ── */
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.pill').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    this.classList.add('active'); this.setAttribute('aria-pressed','true');
    const c = this.dataset.cat;
    if (c === 'all') { searchEl.value = ''; clearBtn.classList.add('hidden'); showDiscovery(); return; }
    const filtered = POIS.filter(p => p.category === c);
    _currentResults = filtered; isSearchActive = true;
    renderMarkers(filtered); renderList(filtered);
    document.getElementById('list-count').textContent = `${filtered.length} ${CAT[c]?.label || c}`;
    setSheet('mid');
    if (filtered.length) map.fitBounds(L.latLngBounds(filtered.map(p=>[p.lat,p.lng])),{ padding:[60,60], maxZoom:16, animate:true, duration:0.6 });
  });
});

function quickExplore(c) {
  const filtered = POIS.filter(p => p.category === c);
  _currentResults = filtered; isSearchActive = true;
  renderMarkers(filtered); renderList(filtered);
  document.getElementById('list-count').textContent = `${filtered.length} ${CAT[c]?.label || c}`;
  document.querySelectorAll('.pill').forEach(b => { b.classList.toggle('active', b.dataset.cat===c); b.setAttribute('aria-pressed', b.dataset.cat===c?'true':'false'); });
  setSheet('mid');
  if (filtered.length) map.fitBounds(L.latLngBounds(filtered.map(p=>[p.lat,p.lng])),{ padding:[60,60], maxZoom:16, animate:true, duration:0.6 });
}

/* ═══════════════════════════════════════════════════════════════
   13. SHARE / SAVE
═══════════════════════════════════════════════════════════════ */
function sharePOI(poi) {
  const text = `${poi.name}\n${poi.address}\n\nFound on LAGIS — Lagos City Map\nhttps://brightxam.github.io/LAGIS-mobile`;
  if (navigator.share) navigator.share({ title:poi.name, text, url:'https://brightxam.github.io/LAGIS-mobile' }).catch(()=>{});
  else navigator.clipboard.writeText(text).then(()=>showToast('Copied!')).catch(()=>showToast('Could not copy'));
}

function toggleSave(poi) {
  const idx = savedPOIs.findIndex(p => p.name === poi.name);
  if (idx === -1) { savedPOIs.push(poi); showToast(`${poi.name} saved!`); }
  else            { savedPOIs.splice(idx,1); showToast('Removed from saved'); }
  localStorage.setItem('lagis_saved', JSON.stringify(savedPOIs));
  if (currentPOI && currentPOI.name === poi.name) {
    const m = cat(poi.category);
    const isSaved = savedPOIs.some(p => p.name === poi.name);
    const icon = document.getElementById('save-icon');
    if (icon) { icon.setAttribute('fill', isSaved?m.color:'none'); icon.setAttribute('stroke', isSaved?m.color:'currentColor'); }
  }
}

function saveRecent(name) {
  recentSearches = [name, ...recentSearches.filter(n=>n!==name)].slice(0,8);
  localStorage.setItem('lagis_recent', JSON.stringify(recentSearches));
}

/* ═══════════════════════════════════════════════════════════════
   14. TOAST
═══════════════════════════════════════════════════════════════ */
let toastTimer = null;
function showToast(msg) {
  let t = document.getElementById('lagis-toast');
  if (!t) { t = document.createElement('div'); t.id='lagis-toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('visible'), 2400);
}

/* ═══════════════════════════════════════════════════════════════
   15. UTILITIES
═══════════════════════════════════════════════════════════════ */
function haversine(lat1, lon1, lat2, lon2) {
  const R=6371, dL=(lat2-lat1)*Math.PI/180, dG=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dL/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dG/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function removeElement(id) { const el=document.getElementById(id); if(el) el.remove(); }

/* ═══════════════════════════════════════════════════════════════
   16. BOOT
═══════════════════════════════════════════════════════════════ */
function boot() {
  initMap();
  loadWeather();
  showDiscovery();
  setSheet('mid');
  window.quickExplore    = quickExplore;
  window.filterOpenNow   = filterOpenNow;
  window.showAllTopRated = showAllTopRated;
}
boot();
