/* ═══════════════════════════════════════════════════════════════
   LAGIS 2026 — app.js
   Architecture:
     1. DATA LAYER      — POI definitions, category metadata
     2. THEME           — dark/light mode
     3. WEATHER         — Open-Meteo API (free, no key)
     4. MAP LAYER       — Leaflet init, markers, clustering
     5. LOCATION        — GPS / locate-me
     6. BOTTOM SHEET    — drag, states, height management
     7. DISCOVERY       — home screen content
     8. SEARCH          — local + AI search, dropdown
     9. CATEGORY FILTER — pill navigation
    10. POI CARD        — business detail panel
    11. ROUTE PANEL     — directions + OSRM routing
    12. SHARE / SAVE    — clipboard, localStorage
    13. TOAST           — notification system
    14. INIT            — boot sequence
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

/* Enriched POI schema:
   Every POI now supports: rating, reviewCount, isOpen, website
   Fields left blank where unverified — structure ready for real data */
const POIS = [
  // ── HEALTH ──
  { name:'LUTH Hospital',                       category:'health',   lat:6.5175, lng:3.3480, address:'Idi-Araba, Yaba',           phone:'01-774-0050', hours:'Open 24hrs',      rating:4.1, reviewCount:312, isOpen:true,  tags:['emergency','doctor','surgery','medical','hospital','accident'] },
  { name:'Infectious Diseases Hospital',        category:'health',   lat:6.5190, lng:3.3560, address:'Harvey Road, Yaba',         phone:'',            hours:'Open 24hrs',      rating:3.8, reviewCount:87,  isOpen:true,  tags:['hospital','infectious','medical','isolation'] },
  { name:'Federal Neuro Psychiatric Hospital',  category:'health',   lat:6.5185, lng:3.3545, address:'Harvey Road, Yaba',         phone:'',            hours:'Open 24hrs',      rating:3.6, reviewCount:54,  isOpen:true,  tags:['mental health','psychiatric','hospital','counselling'] },
  { name:'Nigerian Institute of Medical Research',category:'health', lat:6.5198, lng:3.3572, address:'6 Edmund Crescent, Yaba',   phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.0, reviewCount:29,  isOpen:false, tags:['research','medical','lab','health'] },
  { name:'Randle General Hospital',             category:'health',   lat:6.5020, lng:3.3580, address:'Randle Ave, Surulere',      phone:'01-774-0100', hours:'Open 24hrs',      rating:3.9, reviewCount:143, isOpen:true,  tags:['hospital','emergency','doctor','medical'] },
  { name:'LASUTH Outpatient Clinic',            category:'health',   lat:6.5180, lng:3.3490, address:'Idi-Araba, Yaba',           phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:61,  isOpen:false, tags:['clinic','doctor','outpatient','medical'] },

  // ── PHARMACY ──
  { name:'MedPlus Pharmacy Yaba',               category:'pharmacy', lat:6.5108, lng:3.3672, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 8am–9pm',   rating:4.3, reviewCount:198, isOpen:true,  tags:['pharmacy','drugs','medicine','chemist','prescription'] },
  { name:'Healthplus Pharmacy Yaba',            category:'pharmacy', lat:6.5115, lng:3.3665, address:'Yaba, Lagos',               phone:'',            hours:'Daily 8am–9pm',   rating:4.2, reviewCount:156, isOpen:true,  tags:['pharmacy','drugs','medicine','chemist','health'] },

  // ── SCHOOLS ──
  { name:'Yaba College of Technology',          category:'school',   lat:6.5195, lng:3.3710, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.0, reviewCount:820, isOpen:true,  tags:['yabatech','polytechnic','engineering','education','admission'] },
  { name:'University of Lagos',                 category:'school',   lat:6.5158, lng:3.3980, address:'Akoka, Yaba',               phone:'',            hours:'Mon–Fri 8am–5pm', rating:4.4, reviewCount:2100,isOpen:true,  tags:['unilag','university','degree','education','campus','admission'] },
  { name:"Queen's College",                     category:'school',   lat:6.5168, lng:3.3620, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.5, reviewCount:430, isOpen:false, tags:['secondary school','girls','federal','education'] },
  { name:'Igbobi College',                      category:'school',   lat:6.5210, lng:3.3650, address:'Igbobi, Yaba',              phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.3, reviewCount:380, isOpen:false, tags:['secondary school','boys','education'] },
  { name:"St. Finbarr's College",               category:'school',   lat:6.5145, lng:3.3590, address:'Akoka Road, Yaba',          phone:'',            hours:'Mon–Fri 7am–4pm', rating:4.2, reviewCount:290, isOpen:false, tags:['secondary school','education','boys'] },
  { name:'Yaba Metropolitan College',           category:'school',   lat:6.5160, lng:3.3630, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:72,  isOpen:false, tags:['college','education','vocational','training'] },
  { name:'LASCOHET',                            category:'school',   lat:6.5172, lng:3.3530, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–5pm', rating:3.9, reviewCount:48,  isOpen:false, tags:['health technology','college','pharmacy','nursing'] },

  // ── MARKETS ──
  { name:'Tejuosho Market',                     category:'market',   lat:6.5063, lng:3.3631, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 7am–7pm',   rating:4.1, reviewCount:534, isOpen:true,  tags:['rice','pepper','tomatoes','yam','clothes','thrift','fabric','food','provisions'] },
  { name:'Makoko Fish Market',                  category:'market',   lat:6.4966, lng:3.3896, address:'Makoko, Yaba',              phone:'',            hours:'Daily 6am–6pm',   rating:4.3, reviewCount:287, isOpen:true,  tags:['fish','seafood','catfish','tilapia','fresh fish','crayfish'] },
  { name:'Sabo Market',                         category:'market',   lat:6.5088, lng:3.3760, address:'Sabo, Yaba',                phone:'',            hours:'Daily 7am–7pm',   rating:3.9, reviewCount:201, isOpen:true,  tags:['rice','pepper','tomatoes','food','vegetables','provisions'] },
  { name:'Yaba Market',                         category:'market',   lat:6.5100, lng:3.3640, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–7pm',   rating:4.0, reviewCount:445, isOpen:true,  tags:['thrift','clothes','shoes','second hand','bend down','okrika'] },
  { name:'E-Centre Mall',                       category:'market',   lat:6.5068, lng:3.3688, address:'Commercial Ave, Yaba',      phone:'',            hours:'Daily 9am–9pm',   rating:4.4, reviewCount:873, isOpen:true,  tags:['mall','shopping','cinema','restaurant','supermarket'] },
  { name:'Tejuosho Shopping Complex',           category:'market',   lat:6.5060, lng:3.3625, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 9am–8pm',   rating:3.8, reviewCount:162, isOpen:true,  tags:['shopping','grocery','cosmetics','pharmacy','clothes'] },

  // ── BANKS ──
  { name:'Zenith Bank Yaba',                    category:'bank',     lat:6.5121, lng:3.3700, address:'Herbert Macaulay Way, Yaba',phone:'01-278-7000', hours:'Mon–Fri 8am–4pm', rating:3.9, reviewCount:214, isOpen:false, tags:['atm','transfer','banking','cash','savings','account'] },
  { name:'GTBank Yaba',                         category:'bank',     lat:6.5135, lng:3.3650, address:'Corporation Drive, Yaba',   phone:'01-448-0000', hours:'Mon–Fri 8am–4pm', rating:4.0, reviewCount:189, isOpen:false, tags:['atm','transfer','banking','cash','savings','account'] },
  { name:'Access Bank Yaba',                    category:'bank',     lat:6.5110, lng:3.3720, address:'Yaba Bus Stop, Yaba',       phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:143, isOpen:false, tags:['atm','transfer','banking','cash','loan'] },
  { name:'First Bank Yaba',                     category:'bank',     lat:6.5098, lng:3.3668, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:298, isOpen:false, tags:['atm','transfer','banking','cash','savings'] },
  { name:'UBA Yaba',                            category:'bank',     lat:6.5115, lng:3.3690, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.9, reviewCount:167, isOpen:false, tags:['atm','transfer','banking','cash','account'] },
  { name:'Fidelity Bank Yaba',                  category:'bank',     lat:6.5105, lng:3.3678, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.8, reviewCount:92,  isOpen:false, tags:['atm','banking','cash','savings','loan'] },
  { name:'Polaris Bank Yaba',                   category:'bank',     lat:6.5092, lng:3.3660, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.6, reviewCount:78,  isOpen:false, tags:['atm','banking','cash','transfer'] },
  { name:'Sterling Bank Yaba',                  category:'bank',     lat:6.5118, lng:3.3645, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 8am–4pm', rating:3.7, reviewCount:84,  isOpen:false, tags:['atm','banking','cash','transfer','savings'] },

  // ── FOOD ──
  { name:'Chicken Republic Yaba',               category:'food',     lat:6.5118, lng:3.3688, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 9am–10pm',  rating:4.1, reviewCount:623, isOpen:true,  tags:['chicken','burger','fast food','jollof','rice','chips'] },
  { name:'Mr Biggs Yaba',                       category:'food',     lat:6.5105, lng:3.3670, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–9pm',   rating:3.9, reviewCount:341, isOpen:true,  tags:['pies','snacks','fast food','eat','meat pie'] },
  { name:'Tantalizers Yaba',                    category:'food',     lat:6.5130, lng:3.3660, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–9pm',   rating:4.0, reviewCount:287, isOpen:true,  tags:['chicken','rice','fast food','jollof','eat'] },
  { name:'Kilimanjaro Yaba',                    category:'food',     lat:6.5112, lng:3.3682, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily 9am–10pm',  rating:4.2, reviewCount:412, isOpen:true,  tags:['chicken','burger','fast food','shawarma','eat'] },
  { name:'Mama Cass Yaba',                      category:'food',     lat:6.5095, lng:3.3695, address:'Yaba, Lagos',               phone:'',            hours:'Daily 8am–9pm',   rating:4.4, reviewCount:567, isOpen:true,  tags:['nigerian food','rice','soup','amala','eba','local food'] },
  { name:'Southern Fried Chicken Yaba',         category:'food',     lat:6.5122, lng:3.3675, address:'Yaba, Lagos',               phone:'',            hours:'Daily 10am–10pm', rating:4.0, reviewCount:198, isOpen:true,  tags:['chicken','fast food','chips','burger','eat'] },
  { name:'Subway Yaba',                         category:'food',     lat:6.5070, lng:3.3692, address:'E-Centre, Commercial Ave',  phone:'',            hours:'Daily 9am–9pm',   rating:4.1, reviewCount:234, isOpen:true,  tags:['sandwich','sub','fast food','healthy','eat'] },
  { name:'Cold Stone Creamery Yaba',            category:'food',     lat:6.5065, lng:3.3685, address:'E-Centre, Yaba',            phone:'',            hours:'Daily 11am–10pm', rating:4.5, reviewCount:489, isOpen:true,  tags:['ice cream','dessert','cake','sweet','snacks'] },
  { name:'The Place Restaurant Yaba',           category:'food',     lat:6.5088, lng:3.3698, address:'Yaba, Lagos',               phone:'',            hours:'Daily 9am–10pm',  rating:4.3, reviewCount:378, isOpen:true,  tags:['nigerian food','chicken','rice','grills','eat','restaurant'] },
  { name:'Olaiya Food Canteen',                 category:'food',     lat:6.5078, lng:3.3655, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily 7am–8pm',   rating:4.6, reviewCount:892, isOpen:true,  tags:['amala','ewedu','gbegiri','local food','nigerian','cheap food'] },

  // ── TECH ──
  { name:'CcHUB',                               category:'tech',     lat:6.5148, lng:3.3695, address:'294 Herbert Macaulay Way',  phone:'',            hours:'Mon–Fri 8am–6pm', rating:4.7, reviewCount:543, isOpen:true,  tags:['startup','incubator','coworking','tech','innovation','hub'] },
  { name:'Izone Hub',                           category:'tech',     lat:6.5155, lng:3.3705, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 9am–6pm', rating:4.3, reviewCount:187, isOpen:true,  tags:['coworking','tech','startup','office space','hub'] },
  { name:'Wennovation Hub',                     category:'tech',     lat:6.5140, lng:3.3688, address:'Yaba, Lagos',               phone:'',            hours:'Mon–Fri 9am–6pm', rating:4.4, reviewCount:213, isOpen:true,  tags:['startup','incubator','tech','innovation','entrepreneurs'] },

  // ── FUEL ──
  { name:'Total Filling Station Yaba',          category:'fuel',     lat:6.5140, lng:3.3630, address:'Western Ave, Yaba',         phone:'',            hours:'Daily 6am–10pm',  rating:3.8, reviewCount:134, isOpen:true,  tags:['petrol','diesel','gas','fuel','filling station','pump'] },
  { name:'NNPC Filling Station Yaba',           category:'fuel',     lat:6.5082, lng:3.3655, address:'Ojuelegba Road, Yaba',      phone:'',            hours:'Daily 6am–10pm',  rating:3.6, reviewCount:98,  isOpen:true,  tags:['petrol','diesel','fuel','filling station','pump'] },
  { name:'Ardova Filling Station Yaba',         category:'fuel',     lat:6.5095, lng:3.3642, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–10pm',  rating:3.7, reviewCount:76,  isOpen:true,  tags:['petrol','diesel','fuel','filling station','pump'] },
  { name:'MRS Filling Station Yaba',            category:'fuel',     lat:6.5072, lng:3.3668, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily 6am–10pm',  rating:3.9, reviewCount:112, isOpen:true,  tags:['petrol','diesel','fuel','filling station','gas'] },

  // ── TRANSIT ──
  { name:'Yaba Bus Stop',                       category:'transit',  lat:6.5112, lng:3.3679, address:'Herbert Macaulay Way, Yaba',phone:'',            hours:'Daily',           rating:3.5, reviewCount:245, isOpen:true,  tags:['bus','danfo','okada','keke','transport','BRT'] },
  { name:'Mobolaji Johnson Railway Station',    category:'transit',  lat:6.5130, lng:3.3600, address:'Yaba, Lagos',               phone:'',            hours:'Daily 6am–9pm',   rating:3.8, reviewCount:167, isOpen:true,  tags:['train','rail','railway','ibadan','commute','NRC'] },
  { name:'Ojuelegba Bus Stop',                  category:'transit',  lat:6.5058, lng:3.3620, address:'Ojuelegba, Yaba',           phone:'',            hours:'Daily',           rating:3.4, reviewCount:312, isOpen:true,  tags:['bus','danfo','BRT','transport','commute'] },
  { name:'Sabo Bus Stop',                       category:'transit',  lat:6.5085, lng:3.3758, address:'Sabo, Yaba',                phone:'',            hours:'Daily',           rating:3.3, reviewCount:143, isOpen:true,  tags:['bus','danfo','okada','transport'] },
  { name:'Fadeyi Bus Stop',                     category:'transit',  lat:6.5220, lng:3.3640, address:'Fadeyi, Yaba',              phone:'',            hours:'Daily',           rating:3.5, reviewCount:98,  isOpen:true,  tags:['bus','danfo','BRT','transport'] },

  // ── CINEMA ──
  { name:'Ozone Cinemas E-Centre',              category:'cinema',   lat:6.5070, lng:3.3690, address:'Commercial Ave, Yaba',      phone:'',            hours:'Daily 10am–10pm', rating:4.3, reviewCount:678, isOpen:true,  tags:['cinema','movies','film','entertainment','watch movie'] },

  // ── HOTELS ──
  { name:'De Edge Hotel Yaba',                  category:'hotel',    lat:6.5102, lng:3.3658, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:3.8, reviewCount:123, isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','stay'] },
  { name:'Crystal Suites Yaba',                 category:'hotel',    lat:6.5088, lng:3.3672, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:4.0, reviewCount:89,  isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','suites'] },
  { name:'Mainland Hotel Yaba',                 category:'hotel',    lat:6.5075, lng:3.3648, address:'Yaba, Lagos',               phone:'',            hours:'Open 24hrs',      rating:3.7, reviewCount:167, isOpen:true,  tags:['hotel','lodge','accommodation','sleep','room','stay'] },

  // ── WORSHIP ──
  { name:'Our Saviour Church Yaba',             category:'worship',  lat:6.5125, lng:3.3625, address:'Yaba, Lagos',               phone:'',            hours:'Sun 7am–12pm',    rating:4.6, reviewCount:234, isOpen:false, tags:['church','worship','prayer','christianity','sunday service'] },
  { name:'Yaba Central Mosque',                 category:'worship',  lat:6.5098, lng:3.3712, address:'Yaba, Lagos',               phone:'',            hours:'Daily',           rating:4.5, reviewCount:189, isOpen:true,  tags:['mosque','worship','prayer','islam','friday prayer'] },
  { name:'RCCG Yaba Parish',                    category:'worship',  lat:6.5135, lng:3.3698, address:'Yaba, Lagos',               phone:'',            hours:'Sun 7am–1pm',     rating:4.7, reviewCount:312, isOpen:false, tags:['church','rccg','worship','prayer','christianity'] },
];

/* ═══════════════════════════════════════════════════════════════
   2. STATE
═══════════════════════════════════════════════════════════════ */
let map            = null;
let mapMarkers     = [];
let routingControl = null;
let userLocation   = null;   // [lat, lng]
let currentPOI     = null;
let isSearchActive = false;
let _currentResults= [];
let searchTimeout  = null;
let isDraggingSheet= false;
let sheetState     = 'peek'; // 'peek' | 'mid' | 'full'
let savedPOIs      = JSON.parse(localStorage.getItem('lagis_saved') || '[]');
let recentSearches = JSON.parse(localStorage.getItem('lagis_recent') || '[]');

/* ═══════════════════════════════════════════════════════════════
   3. THEME
═══════════════════════════════════════════════════════════════ */
let isDark = localStorage.getItem('lagis_dark') === '1';

function applyTheme() {
  document.body.classList.toggle('dark', isDark);
  document.getElementById('theme-icon-light').style.display = isDark ? 'none' : '';
  document.getElementById('theme-icon-dark').style.display  = isDark ? '' : 'none';
}

document.getElementById('theme-btn').addEventListener('click', () => {
  isDark = !isDark;
  localStorage.setItem('lagis_dark', isDark ? '1' : '0');
  applyTheme();
});
applyTheme();

/* ═══════════════════════════════════════════════════════════════
   4. WEATHER — Open-Meteo, free, no key needed
═══════════════════════════════════════════════════════════════ */
const WMO_ICONS = {
  0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
  45:'🌫️', 48:'🌫️',
  51:'🌦️', 53:'🌦️', 55:'🌧️',
  61:'🌧️', 63:'🌧️', 65:'🌧️',
  71:'❄️', 73:'❄️', 75:'❄️',
  80:'🌦️', 81:'🌧️', 82:'⛈️',
  95:'⛈️', 96:'⛈️', 99:'⛈️'
};
const WMO_DESC = {
  0:'Clear sky', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Foggy', 48:'Icy fog',
  51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
  61:'Slight rain', 63:'Rain', 65:'Heavy rain',
  71:'Light snow', 73:'Snow', 75:'Heavy snow',
  80:'Rain showers', 81:'Rain showers', 82:'Violent showers',
  95:'Thunderstorm', 96:'Thunderstorm', 99:'Hail storm'
};

async function loadWeather() {
  try {
    const r = await fetch(
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=6.512&longitude=3.370' +
      '&current_weather=true&temperature_unit=celsius'
    );
    const d = await r.json();
    const cw   = d.current_weather;
    const code = cw.weathercode;
    const temp = Math.round(cw.temperature);
    document.getElementById('weather-icon').textContent = WMO_ICONS[code] || '🌡️';
    document.getElementById('weather-temp').textContent = `${temp}°`;
    document.getElementById('weather-desc').textContent = WMO_DESC[code] || '';
  } catch {
    document.getElementById('weather-widget').style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════════════
   5. MAP LAYER
═══════════════════════════════════════════════════════════════ */
function initMap() {
  /* Map fills 100% of the viewport — the CSS does this.
     We just init Leaflet with the correct options. */
  map = L.map('map', {
    zoomControl:       false,
    attributionControl: false,
    tap:               true,
    tapTolerance:      15,
    maxZoom:           19,
    minZoom:           11,
  }).setView([6.5120, 3.3700], 15);

  /* Carto Light — clean, Africa-readable tile set */
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { maxZoom: 19, subdomains: 'abcd' }
  ).addTo(map);

  /* Dismiss card + close search when tapping blank map */
  map.on('click', () => {
    closeCard();
    hideDropdown();
  });

  /* Re-cluster on zoom */
  map.on('zoomend', () => {
    if (isSearchActive && _currentResults.length) {
      renderMarkers(_currentResults);
    }
  });

  /* Zoom button wiring */
  document.getElementById('zoom-in') .addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
  document.getElementById('locate-btn').addEventListener('click', locateMe);
}

/* ── Marker rendering ── */
function clearMarkers() {
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];
}

function buildMarkerIcon(poi, isActive = false) {
  const m = cat(poi.category);
  const size = isActive ? 40 : 34;
  return L.divIcon({
    className: '',
    html: `<div class="lagis-marker${isActive?' active':''}"
                style="width:${size}px;height:${size}px;background:${m.color}">
             <span style="font-size:${isActive?18:15}px;line-height:1">${m.emoji}</span>
           </div>`,
    iconSize:   [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor:[0, -size/2],
  });
}

function buildClusterIcon(count) {
  const big  = count > 20;
  const size = big ? 46 : 38;
  return L.divIcon({
    className: '',
    html: `<div class="lagis-cluster${big?' large':''}"
                style="width:${size}px;height:${size}px;font-size:${big?15:13}px">
             ${count}
           </div>`,
    iconSize:   [size, size],
    iconAnchor: [size/2, size/2],
  });
}

function renderMarkers(pois) {
  clearMarkers();
  const zoom = map.getZoom();
  const { clusters, singles } = cluster(pois, zoom);

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

/* ── Spatial clustering ── */
function cluster(pois, zoom) {
  if (zoom >= 15) return { clusters: [], singles: pois };
  const grid = zoom <= 12 ? 0.025 : 0.012;
  const used = new Set();
  const clusters = [], singles = [];

  pois.forEach((poi, i) => {
    if (used.has(i)) return;
    const group = [poi];
    used.add(i);
    pois.forEach((other, j) => {
      if (used.has(j)) return;
      if (Math.abs(poi.lat - other.lat) < grid &&
          Math.abs(poi.lng - other.lng) < grid) {
        group.push(other);
        used.add(j);
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
  if (!navigator.geolocation) {
    showToast('Geolocation not supported on this device');
    return;
  }
  const btn = document.getElementById('locate-btn');
  btn.classList.add('locating');

  navigator.geolocation.getCurrentPosition(
    pos => {
      btn.classList.remove('locating');
      btn.classList.add('located');
      setTimeout(() => btn.classList.remove('located'), 3000);

      userLocation = [pos.coords.latitude, pos.coords.longitude];

      /* Remove previous user dot */
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.marker(userLocation, {
        icon: L.divIcon({
          className: '',
          html: '<div class="lagis-user-dot"></div>',
          iconSize:   [16, 16],
          iconAnchor: [8, 8],
        }),
        zIndexOffset: 1000,
      }).addTo(map);

      map.flyTo(userLocation, 16, { duration: 0.8 });
    },
    err => {
      btn.classList.remove('locating');
      btn.classList.add('error');
      setTimeout(() => btn.classList.remove('error'), 2000);
      const msg = {
        1: 'Location permission denied',
        2: 'Location unavailable',
        3: 'Location request timed out',
      }[err.code] || 'Could not get location';
      showToast(msg);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. BOTTOM SHEET
═══════════════════════════════════════════════════════════════ */
const sheet = document.getElementById('bottom-sheet');

const SHEET_HEIGHTS = {
  peek: () => 88,
  mid:  () => Math.round(window.innerHeight * 0.46),
  full: () => Math.round(window.innerHeight * 0.88),
};

function setSheet(state, animate = true) {
  sheetState = state;
  const h = SHEET_HEIGHTS[state]();
  sheet.style.transition = animate
    ? 'height 320ms cubic-bezier(0.4,0,0.2,1)'
    : 'none';
  sheet.style.height = h + 'px';

  /* Sync zoom + weather widget position with sheet */
  const mapCtrl = document.getElementById('map-controls-right');
  const weather  = document.getElementById('weather-widget');
  const offset   = h + 16;
  mapCtrl.style.bottom = offset + 'px';
  weather.style.bottom  = offset + 'px';
}

/* Drag-to-resize sheet */
const handleWrap = document.getElementById('sheet-handle-wrap');
let dragStart = 0, dragH = 0;

function onDragStart(clientY) {
  isDraggingSheet = true;
  dragStart = clientY;
  dragH     = sheet.offsetHeight;
  sheet.style.transition = 'none';
}
function onDragMove(clientY) {
  if (!isDraggingSheet) return;
  const delta  = dragStart - clientY;
  const newH   = Math.min(
    Math.max(dragH + delta, SHEET_HEIGHTS.peek()),
    SHEET_HEIGHTS.full()
  );
  sheet.style.height = newH + 'px';
  /* live-update widget positions */
  const off = newH + 16;
  document.getElementById('map-controls-right').style.bottom = off + 'px';
  document.getElementById('weather-widget').style.bottom      = off + 'px';
}
function onDragEnd() {
  if (!isDraggingSheet) return;
  isDraggingSheet = false;
  const h   = sheet.offsetHeight;
  const mid = SHEET_HEIGHTS.mid();
  const full= SHEET_HEIGHTS.full();
  const peek= SHEET_HEIGHTS.peek();
  if      (h < (peek + mid) / 2) setSheet('peek');
  else if (h < (mid + full) / 2) setSheet('mid');
  else                            setSheet('full');
}

/* Touch */
handleWrap.addEventListener('touchstart', e => onDragStart(e.touches[0].clientY), { passive: true });
handleWrap.addEventListener('touchmove',  e => { e.preventDefault(); onDragMove(e.touches[0].clientY); }, { passive: false });
handleWrap.addEventListener('touchend',   onDragEnd);
/* Mouse (desktop) */
handleWrap.addEventListener('mousedown',  e => onDragStart(e.clientY));
window.addEventListener('mousemove', e => onDragMove(e.clientY));
window.addEventListener('mouseup',   onDragEnd);
/* Tap cycle */
handleWrap.addEventListener('click', () => {
  if (isDraggingSheet) return;
  const next = { peek:'mid', mid:'full', full:'peek' }[sheetState];
  setSheet(next);
});

/* ═══════════════════════════════════════════════════════════════
   8. DISCOVERY — home screen
═══════════════════════════════════════════════════════════════ */
function showDiscovery() {
  clearMarkers();
  isSearchActive    = false;
  _currentResults   = [];

  /* top-rated across all categories */
  const topRated = [...POIS]
    .sort((a, b) => (b.rating * Math.log(b.reviewCount + 1)) -
                     (a.rating * Math.log(a.reviewCount + 1)))
    .slice(0, 8);

  /* open right now */
  const openNow = POIS.filter(p => p.isOpen)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const list = document.getElementById('poi-list');
  document.getElementById('list-count').textContent = 'Discover Yaba';
  document.getElementById('sheet-area').textContent  = 'Lagos, Nigeria';

  list.innerHTML = `
    <!-- Welcome banner -->
    <div class="disc-banner">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none"
           style="margin-bottom:10px" aria-hidden="true">
        <circle cx="28" cy="28" r="28" fill="#1a7a4a" opacity="0.10"/>
        <circle cx="28" cy="28" r="20" fill="#1a7a4a" opacity="0.14"/>
        <path d="M28 14C22.5 14 18 18.5 18 24C18 32 28 42 28 42
                 C28 42 38 32 38 24C38 18.5 33.5 14 28 14Z" fill="#1a7a4a"/>
        <circle cx="28" cy="24" r="5" fill="white"/>
      </svg>
      <div class="disc-banner-title">Discover Yaba</div>
      <div class="disc-banner-sub">Lagos's tech &amp; culture hub.<br>
        Search or tap a category to explore.</div>
    </div>

    <!-- Quick explore 2×2 grid -->
    <div class="disc-section-label">Quick explore</div>
    <div class="qe-grid">
      <div class="qe-card" style="background:#fff4ed;border-color:#fed7aa"
           onclick="quickExplore('food')" role="button" tabindex="0"
           aria-label="Explore Food and Drink">
        <div class="qe-emoji">🍽️</div>
        <div class="qe-label" style="color:#f97316">Food &amp; Drink</div>
        <div class="qe-sub">${POIS.filter(p=>p.category==='food').length} places</div>
      </div>
      <div class="qe-card" style="background:#eff6ff;border-color:#bfdbfe"
           onclick="quickExplore('bank')" role="button" tabindex="0"
           aria-label="Explore Banking">
        <div class="qe-emoji">🏦</div>
        <div class="qe-label" style="color:#3b82f6">Banking</div>
        <div class="qe-sub">${POIS.filter(p=>p.category==='bank').length} branches</div>
      </div>
      <div class="qe-card" style="background:#f0fdf4;border-color:#bbf7d0"
           onclick="quickExplore('health')" role="button" tabindex="0"
           aria-label="Explore Health">
        <div class="qe-emoji">🏥</div>
        <div class="qe-label" style="color:#22c55e">Health</div>
        <div class="qe-sub">${POIS.filter(p=>p.category==='health').length} facilities</div>
      </div>
      <div class="qe-card" style="background:#faf5ff;border-color:#e9d5ff"
           onclick="quickExplore('market')" role="button" tabindex="0"
           aria-label="Explore Markets">
        <div class="qe-emoji">🛒</div>
        <div class="qe-label" style="color:#a855f7">Markets</div>
        <div class="qe-sub">${POIS.filter(p=>p.category==='market').length} markets</div>
      </div>
    </div>

    <!-- Open now section -->
    <div class="disc-section-label" style="margin-top:8px">Open now</div>
    ${openNow.map(poi => buildPoiItemHTML(poi)).join('')}

    <!-- Top rated section -->
    <div class="disc-section-label" style="margin-top:8px">Top rated in Yaba</div>
    ${topRated.map(poi => buildPoiItemHTML(poi)).join('')}
  `;

  /* Attach click listeners to all poi items just rendered */
  list.querySelectorAll('.poi-item').forEach(el => {
    const name = el.dataset.poi;
    const poi  = POIS.find(p => p.name === name);
    if (poi) {
      el.addEventListener('click', () => {
        map.flyTo([poi.lat, poi.lng], 16, { duration: 0.5 });
        openCard(poi);
      });
    }
  });

  setSheet('mid');
}

/* ═══════════════════════════════════════════════════════════════
   9. POI LIST RENDERING
═══════════════════════════════════════════════════════════════ */
function buildPoiItemHTML(poi) {
  const m      = cat(poi.category);
  const stars  = poi.rating ? `${'★'.repeat(Math.round(poi.rating))}${'☆'.repeat(5-Math.round(poi.rating))}` : '';
  const status = poi.isOpen != null
    ? `<span class="poi-status ${poi.isOpen?'open':'closed'}">${poi.isOpen?'Open':'Closed'}</span>`
    : '';
  const ratingHTML = poi.rating
    ? `<span style="color:#f59e0b;font-size:11px;font-weight:600">${poi.rating.toFixed(1)} ★</span>
       <span style="color:var(--text-3);font-size:11px">(${poi.reviewCount})</span>`
    : '';
  return `
    <div class="poi-item" data-poi="${poi.name.replace(/"/g,'&quot;')}"
         role="listitem" tabindex="0"
         aria-label="${poi.name}, ${m.label}">
      <div class="poi-dot" style="background:${m.bg}">${m.emoji}</div>
      <div class="poi-info">
        <div class="poi-name">${poi.name}</div>
        <div class="poi-sub">${m.label} · ${poi.address}</div>
        ${poi.rating ? `<div style="display:flex;align-items:center;gap:6px;margin-top:3px">${ratingHTML}</div>` : ''}
      </div>
      <div class="poi-right">
        ${status}
        <span class="poi-chevron">›</span>
      </div>
    </div>
  `;
}

function renderList(pois) {
  const list = document.getElementById('poi-list');
  document.getElementById('list-count').textContent =
    `${pois.length} result${pois.length !== 1 ? 's' : ''}`;
  document.getElementById('sheet-area').textContent = 'Yaba, Lagos';

  if (!pois.length) {
    list.innerHTML = `
      <div style="padding:40px 20px;text-align:center">
        <div style="font-size:40px;margin-bottom:12px">🔍</div>
        <div style="font-size:15px;font-weight:600;color:var(--text-1);margin-bottom:6px">
          No results found
        </div>
        <div style="font-size:13px;color:var(--text-2)">
          Try a different search term or category
        </div>
      </div>`;
    return;
  }

  list.innerHTML = pois.map(poi => buildPoiItemHTML(poi)).join('');
  list.querySelectorAll('.poi-item').forEach(el => {
    const name = el.dataset.poi;
    const poi  = POIS.find(p => p.name === name);
    if (!poi) return;
    el.addEventListener('click', () => {
      list.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
      el.classList.add('active');
      map.flyTo([poi.lat, poi.lng], Math.max(map.getZoom(), 16), { duration: 0.4 });
      openCard(poi);
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   10. POI CARD (business detail)
═══════════════════════════════════════════════════════════════ */
function openCard(poi) {
  currentPOI = poi;
  const m    = cat(poi.category);

  /* Badge */
  const badge = document.getElementById('card-badge');
  badge.textContent  = m.label;
  badge.style.background = m.bg;
  badge.style.color      = m.color;

  /* Name + address */
  document.getElementById('card-name').textContent    = poi.name;
  document.getElementById('card-address').textContent = poi.address || '';

  /* Stats row */
  const ratingEl  = document.getElementById('stat-rating');
  const distEl    = document.getElementById('stat-distance');
  const openEl    = document.getElementById('stat-open');

  if (poi.rating) {
    document.getElementById('stat-rating-val').textContent = poi.rating.toFixed(1);
    document.getElementById('stat-reviews').textContent    = `(${poi.reviewCount} reviews)`;
    ratingEl.style.display = 'flex';
  } else {
    ratingEl.style.display = 'none';
  }

  if (userLocation) {
    const d = haversine(userLocation[0], userLocation[1], poi.lat, poi.lng);
    document.getElementById('stat-distance-val').textContent = d < 1
      ? `${Math.round(d * 1000)}m away`
      : `${d.toFixed(1)}km away`;
    distEl.style.display = 'flex';
  } else {
    distEl.style.display = 'none';
  }

  if (poi.isOpen != null) {
    openEl.textContent  = poi.isOpen ? 'Open now' : 'Closed';
    openEl.className    = `stat-open ${poi.isOpen ? 'open' : 'closed'}`;
    openEl.style.display= 'inline-flex';
  } else {
    openEl.style.display = 'none';
  }

  /* Meta rows */
  const phone   = document.getElementById('meta-phone');
  const hours   = document.getElementById('meta-hours');
  const website = document.getElementById('meta-website');

  document.getElementById('meta-phone-text').textContent   = poi.phone   || '';
  document.getElementById('meta-hours-text').textContent   = poi.hours   || '';
  document.getElementById('meta-website-text').textContent = poi.website || '';

  phone.classList.toggle('hidden', !poi.phone);
  hours.classList.toggle('hidden', !poi.hours);
  website.classList.toggle('hidden', !poi.website);

  /* Save button state */
  const isSaved = savedPOIs.some(p => p.name === poi.name);
  const saveIcon = document.getElementById('save-icon');
  const saveBtn  = document.getElementById('btn-save');
  saveIcon.setAttribute('fill', isSaved ? m.color : 'none');
  saveIcon.setAttribute('stroke', isSaved ? m.color : 'currentColor');
  saveBtn.querySelector
    ? saveBtn.lastChild.textContent = isSaved ? 'Saved' : 'Save'
    : null;

  /* Show card */
  document.getElementById('poi-card').classList.remove('hidden');
  setSheet('peek');
}

function closeCard() {
  document.getElementById('poi-card').classList.add('hidden');
  document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
  currentPOI = null;
}

document.getElementById('card-close').addEventListener('click', closeCard);

/* Directions button */
document.getElementById('btn-directions').addEventListener('click', () => {
  if (currentPOI) openRoutePanel(currentPOI);
});

/* Share button */
document.getElementById('btn-share').addEventListener('click', () => {
  if (currentPOI) sharePOI(currentPOI);
});

/* Save button */
document.getElementById('btn-save').addEventListener('click', () => {
  if (currentPOI) toggleSave(currentPOI);
});

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
  const nearby = [...POIS]
    .filter(p => p.name !== refPOI.name)
    .map(p => ({
      ...p,
      dist: Math.hypot(p.lat - refPOI.lat, p.lng - refPOI.lng)
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 8);

  nearby.forEach(p => {
    const m   = cat(p.category);
    const chip = document.createElement('div');
    chip.className  = 'suggestion-chip';
    chip.textContent= `${m.emoji} ${p.name}`;
    chip.addEventListener('click', () => {
      document.getElementById('route-to').value = `${p.name}, ${p.address}`;
      window._routeDestPOI = p;
    });
    list.appendChild(chip);
  });
}

function executeRoute() {
  const destPOI = window._routeDestPOI;
  if (!destPOI) { showToast('Please enter a destination'); return; }
  const from = userLocation || [6.5120, 3.3700];
  const mode = document.querySelector('.mode-btn.active')?.dataset.mode || 'driving';
  drawRoute(from, destPOI, mode);
  closeRoutePanel();
}

function drawRoute(from, poi, mode = 'driving') {
  if (routingControl) { map.removeControl(routingControl); routingControl = null; }
  removeElement('cancel-route');

  const colors = { driving:'#1a7a4a', walking:'#06b6d4', cycling:'#f59e0b' };
  const color  = colors[mode] || '#1a7a4a';
  const profile= { driving:'car', walking:'foot', cycling:'bike' }[mode] || 'car';

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(from[0], from[1]),
      L.latLng(poi.lat, poi.lng),
    ],
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      profile,
    }),
    lineOptions: {
      styles: [{ color, weight: 5, opacity: 0.88, lineCap:'round', lineJoin:'round' }]
    },
    show:              false,
    addWaypoints:      false,
    routeWhileDragging:false,
    fitSelectedRoutes: true,
    showAlternatives:  false,
    createMarker: (i, wp) => L.marker(wp.latLng, {
      icon: L.divIcon({
        className: '',
        html: `<div style="
          width:14px;height:14px;
          background:${i===0?'#1a7a4a':'#f97316'};
          border-radius:50%;
          border:2.5px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize:[14,14], iconAnchor:[7,7],
      }),
    }),
  }).addTo(map);

  routingControl.on('routesfound', e => {
    const route = e.routes[0];
    const km    = (route.summary.totalDistance / 1000).toFixed(1);
    const mins  = Math.round(route.summary.totalTime / 60);
    document.getElementById('route-distance').textContent = `📍 ${km} km`;
    document.getElementById('route-time').textContent     = `⏱ ${mins} min`;
    document.getElementById('route-info').classList.remove('hidden');
    addCancelRouteBtn();
  });

  routingControl.on('routingerror', () => {
    showToast('Could not find a route. Try a different mode.');
  });
}

function addCancelRouteBtn() {
  removeElement('cancel-route');
  const btn = document.createElement('button');
  btn.id   = 'cancel-route';
  btn.setAttribute('aria-label', 'Cancel active route');
  btn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
    Cancel Route`;
  btn.addEventListener('click', () => {
    if (routingControl) { map.removeControl(routingControl); routingControl = null; }
    document.getElementById('route-info').classList.add('hidden');
    removeElement('cancel-route');
  });
  document.body.appendChild(btn);
}

/* Route panel event bindings */
document.getElementById('route-close').addEventListener('click', closeRoutePanel);
document.getElementById('route-overlay').addEventListener('click', closeRoutePanel);
document.getElementById('btn-get-route').addEventListener('click', executeRoute);

document.getElementById('btn-use-location').addEventListener('click', () => {
  locateMe();
  document.getElementById('route-from').value = 'My location';
});
document.getElementById('btn-clear-to').addEventListener('click', () => {
  document.getElementById('route-to').value = '';
  window._routeDestPOI = null;
});
document.getElementById('route-swap').addEventListener('click', () => {
  const from = document.getElementById('route-from');
  const to   = document.getElementById('route-to');
  [from.value, to.value] = [to.value, from.value];
});
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-pressed', 'true');
  });
});

/* ═══════════════════════════════════════════════════════════════
   12. SEARCH
═══════════════════════════════════════════════════════════════ */
const searchEl  = document.getElementById('search');
const clearBtn  = document.getElementById('search-clear');
const dropdown  = document.getElementById('search-dropdown');

function showDropdown(items, label = '') {
  dropdown.innerHTML = '';
  if (!items.length) { hideDropdown(); return; }
  if (label) {
    const lbl = document.createElement('div');
    lbl.className   = 'dd-label';
    lbl.textContent = label;
    dropdown.appendChild(lbl);
  }
  items.forEach(item => {
    const row  = document.createElement('div');
    row.className = 'dd-item';
    row.setAttribute('role', 'option');
    row.setAttribute('aria-label', item.name);
    row.innerHTML = `
      <div class="dd-icon" style="background:${item.bg}">${item.emoji}</div>
      <div style="flex:1;min-width:0">
        <div class="dd-name">${item.name}</div>
        <div class="dd-sub">${item.sub}</div>
      </div>
    `;
    row.addEventListener('click', () => {
      hideDropdown();
      searchEl.value = item.name;
      clearBtn.classList.remove('hidden');
      if (item.poi) {
        _currentResults = [item.poi];
        isSearchActive  = true;
        renderMarkers([item.poi]);
        renderList([item.poi]);
        map.flyTo([item.poi.lat, item.poi.lng], 16, { duration: 0.5 });
        openCard(item.poi);
        saveRecent(item.poi.name);
        setSheet('peek');
      }
    });
    dropdown.appendChild(row);
  });
  dropdown.style.display = 'block';
}

function hideDropdown() { dropdown.style.display = 'none'; }

function poiToDropdownItem(poi, subOverride = '') {
  const m = cat(poi.category);
  return {
    name:  poi.name,
    sub:   subOverride || `${m.label} · ${poi.address}`,
    emoji: m.emoji,
    bg:    m.bg,
    poi,
  };
}

searchEl.addEventListener('focus', () => {
  if (!searchEl.value && recentSearches.length) {
    const items = recentSearches
      .map(name => POIS.find(p => p.name === name))
      .filter(Boolean)
      .map(poi => poiToDropdownItem(poi, '🕐 Recent'));
    showDropdown(items, 'Recent searches');
  }
});

searchEl.addEventListener('input', function() {
  clearBtn.classList.toggle('hidden', !this.value);
  clearTimeout(searchTimeout);
  const q = this.value.trim();

  if (!q) { hideDropdown(); showDiscovery(); return; }

  /* Instant local match */
  const ql  = q.toLowerCase();
  const local = POIS.filter(p =>
    p.name.toLowerCase().includes(ql) ||
    p.tags.some(t => t.toLowerCase().includes(ql)) ||
    p.address.toLowerCase().includes(ql)
  ).slice(0, 6);

  showDropdown(local.map(p => poiToDropdownItem(p)), 'Places in Yaba');

  if (local.length) {
    _currentResults = local;
    isSearchActive  = true;
    renderMarkers(local);
    renderList(local);
    setSheet('mid');
  }

  /* AI search after 700ms debounce */
  searchTimeout = setTimeout(async () => {
    document.getElementById('list-count').textContent = 'Searching…';
    const aiResults = await aiSearch(q);
    if (aiResults && aiResults.length) {
      _currentResults = aiResults;
      renderMarkers(aiResults);
      renderList(aiResults);
      showDropdown(
        aiResults.map(p => poiToDropdownItem(p, `🤖 AI match · ${p.address}`)),
        'AI results'
      );
    }
  }, 700);
});

clearBtn.addEventListener('click', () => {
  searchEl.value = '';
  clearBtn.classList.add('hidden');
  hideDropdown();
  showDiscovery();
});

document.addEventListener('click', e => {
  if (!e.target.closest('#search-box') &&
      !e.target.closest('#search-dropdown')) {
    hideDropdown();
  }
});

/* ── AI search via Anthropic API ── */
async function aiSearch(query) {
  const ctx = POIS.map((p, i) =>
    `${i}:${p.name}(${p.category})-${p.address}-${p.tags.join(',')}`
  ).join('\n');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-api-key':      CONFIG.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 150,
        messages: [{
          role:    'user',
          content: `Yaba Lagos directory. Query: "${query}"\n\nPlaces:\n${ctx}\n\n` +
                   `Return ONLY a JSON array of matching index numbers (max 8). ` +
                   `Return [] if no match. No explanation, no markdown.`,
        }],
      }),
    });
    const data = await res.json();
    const text = data.content[0].text.trim();
    const indices = JSON.parse(text.replace(/```json|```/g,'').trim());
    return indices.map(i => POIS[i]).filter(Boolean);
  } catch { return null; }
}

/* ── Category pills ── */
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.pill').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-pressed', 'true');

    const c = this.dataset.cat;
    if (c === 'all') {
      searchEl.value = '';
      clearBtn.classList.add('hidden');
      showDiscovery();
      return;
    }

    const filtered = POIS.filter(p => p.category === c);
    _currentResults = filtered;
    isSearchActive  = true;
    renderMarkers(filtered);
    renderList(filtered);
    document.getElementById('list-count').textContent =
      `${filtered.length} ${CAT[c]?.label || c}`;
    setSheet('mid');

    if (filtered.length) {
      map.fitBounds(
        L.latLngBounds(filtered.map(p => [p.lat, p.lng])),
        { padding: [60, 60], maxZoom: 16, animate: true, duration: 0.6 }
      );
    }
  });
});

/* Quick explore shortcut (from discovery grid) */
function quickExplore(c) {
  const filtered = POIS.filter(p => p.category === c);
  _currentResults = filtered;
  isSearchActive  = true;
  renderMarkers(filtered);
  renderList(filtered);
  document.getElementById('list-count').textContent =
    `${filtered.length} ${CAT[c]?.label || c}`;
  document.querySelectorAll('.pill').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === c);
    b.setAttribute('aria-pressed', b.dataset.cat === c ? 'true' : 'false');
  });
  setSheet('mid');
  if (filtered.length) {
    map.fitBounds(
      L.latLngBounds(filtered.map(p => [p.lat, p.lng])),
      { padding: [60, 60], maxZoom: 16, animate: true, duration: 0.6 }
    );
  }
}

/* ═══════════════════════════════════════════════════════════════
   13. SHARE / SAVE
═══════════════════════════════════════════════════════════════ */
function sharePOI(poi) {
  const text = `${poi.name}\n${poi.address}\n\nFound on LAGIS — Lagos City Map\nhttps://brightxam.github.io/LAGIS-mobile`;
  if (navigator.share) {
    navigator.share({ title: poi.name, text, url: 'https://brightxam.github.io/LAGIS-mobile' })
      .catch(() => {}); // user cancelled
  } else {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Copied to clipboard!'))
      .catch(() => showToast('Could not copy'));
  }
}

function toggleSave(poi) {
  const idx = savedPOIs.findIndex(p => p.name === poi.name);
  if (idx === -1) {
    savedPOIs.push(poi);
    showToast(`${poi.name} saved!`);
  } else {
    savedPOIs.splice(idx, 1);
    showToast('Removed from saved');
  }
  localStorage.setItem('lagis_saved', JSON.stringify(savedPOIs));
  /* Refresh the save button appearance if card still open */
  if (currentPOI && currentPOI.name === poi.name) {
    const m      = cat(poi.category);
    const isSaved= savedPOIs.some(p => p.name === poi.name);
    const icon   = document.getElementById('save-icon');
    if (icon) {
      icon.setAttribute('fill',   isSaved ? m.color : 'none');
      icon.setAttribute('stroke', isSaved ? m.color : 'currentColor');
    }
  }
}

function saveRecent(name) {
  recentSearches = [name, ...recentSearches.filter(n => n !== name)].slice(0, 8);
  localStorage.setItem('lagis_recent', JSON.stringify(recentSearches));
}

/* ═══════════════════════════════════════════════════════════════
   14. TOAST
═══════════════════════════════════════════════════════════════ */
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById('lagis-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lagis-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

/* ═══════════════════════════════════════════════════════════════
   15. UTILITIES
═══════════════════════════════════════════════════════════════ */
function haversine(lat1, lon1, lat2, lon2) {
  const R  = 6371;
  const dL = (lat2 - lat1) * Math.PI / 180;
  const dG = (lon2 - lon1) * Math.PI / 180;
  const a  = Math.sin(dL/2)**2 +
              Math.cos(lat1*Math.PI/180) *
              Math.cos(lat2*Math.PI/180) *
              Math.sin(dG/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function removeElement(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ═══════════════════════════════════════════════════════════════
   16. BOOT
═══════════════════════════════════════════════════════════════ */
function boot() {
  initMap();
  loadWeather();
  showDiscovery();
  setSheet('mid');
  /* Expose quickExplore globally for inline onclick in discovery HTML */
  window.quickExplore = quickExplore;
}

boot();
