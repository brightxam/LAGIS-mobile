const CATEGORY_META = {
  food:      { color: '#f97316', bg: '#fff4ed', emoji: '🍽️', label: 'Food & Drink' },
  bank:      { color: '#3b82f6', bg: '#eff6ff', emoji: '🏦', label: 'Banking' },
  health:    { color: '#22c55e', bg: '#f0fdf4', emoji: '🏥', label: 'Health' },
  market:    { color: '#a855f7', bg: '#faf5ff', emoji: '🛒', label: 'Market' },
  school:    { color: '#eab308', bg: '#fefce8', emoji: '🎓', label: 'Education' },
  fuel:      { color: '#ef4444', bg: '#fef2f2', emoji: '⛽', label: 'Fuel Station' },
  transit:   { color: '#06b6d4', bg: '#ecfeff', emoji: '🚌', label: 'Transit' },
  tech:      { color: '#8b5cf6', bg: '#f5f3ff', emoji: '💻', label: 'Tech Hub' },
  cinema:    { color: '#f59e0b', bg: '#fffbeb', emoji: '🎬', label: 'Cinema' },
  hotel:     { color: '#ec4899', bg: '#fdf2f8', emoji: '🏨', label: 'Hotel' },
  pharmacy:  { color: '#10b981', bg: '#ecfdf5', emoji: '💊', label: 'Pharmacy' },
  worship:   { color: '#6366f1', bg: '#eef2ff', emoji: '⛪', label: 'Place of Worship' },
  other:     { color: '#888',    bg: '#f5f5f5', emoji: '📍', label: 'Other' },
};

const POIS = [
  // HEALTH
  { name: 'LUTH Hospital',                        category: 'health',   lat: 6.5175, lng: 3.3480, address: 'Idi-Araba, Yaba',              phone: '01-774-0050', hours: 'Open 24hrs',      tags: ['emergency', 'doctor', 'surgery', 'medical', 'hospital', 'accident'] },
  { name: 'Infectious Diseases Hospital',         category: 'health',   lat: 6.5190, lng: 3.3560, address: 'Harvey Road, Yaba',            phone: '',            hours: 'Open 24hrs',      tags: ['hospital', 'infectious', 'medical', 'isolation'] },
  { name: 'Federal Neuro Psychiatric Hospital',   category: 'health',   lat: 6.5185, lng: 3.3545, address: 'Harvey Road, Yaba',            phone: '',            hours: 'Open 24hrs',      tags: ['mental health', 'psychiatric', 'hospital', 'counselling'] },
  { name: 'Nigerian Institute of Medical Research', category: 'health', lat: 6.5198, lng: 3.3572, address: '6 Edmund Crescent, Yaba',      phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['research', 'medical', 'lab', 'health'] },
  { name: 'Randle General Hospital',              category: 'health',   lat: 6.5020, lng: 3.3580, address: 'Randle Ave, Surulere',          phone: '01-774-0100', hours: 'Open 24hrs',      tags: ['hospital', 'emergency', 'doctor', 'medical'] },
  { name: 'LASUTH Outpatient Clinic',             category: 'health',   lat: 6.5180, lng: 3.3490, address: 'Idi-Araba, Yaba',              phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['clinic', 'doctor', 'outpatient', 'medical'] },

  // PHARMACY
  { name: 'MedPlus Pharmacy Yaba',                category: 'pharmacy', lat: 6.5108, lng: 3.3672, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Daily 8am–9pm',   tags: ['pharmacy', 'drugs', 'medicine', 'chemist', 'prescription'] },
  { name: 'Healthplus Pharmacy Yaba',             category: 'pharmacy', lat: 6.5115, lng: 3.3665, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 8am–9pm',   tags: ['pharmacy', 'drugs', 'medicine', 'chemist', 'health'] },

  // SCHOOLS
  { name: 'Yaba College of Technology',           category: 'school',   lat: 6.5195, lng: 3.3710, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['yabatech', 'polytechnic', 'engineering', 'education', 'admission'] },
  { name: 'University of Lagos',                  category: 'school',   lat: 6.5158, lng: 3.3980, address: 'Akoka, Yaba',                  phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['unilag', 'university', 'degree', 'education', 'campus', 'admission'] },
  { name: "Queen's College",                      category: 'school',   lat: 6.5168, lng: 3.3620, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'girls', 'federal', 'education'] },
  { name: 'Igbobi College',                       category: 'school',   lat: 6.5210, lng: 3.3650, address: 'Igbobi, Yaba',                 phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'boys', 'education'] },
  { name: "St. Finbarr's College",                category: 'school',   lat: 6.5145, lng: 3.3590, address: 'Akoka Road, Yaba',             phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'education', 'boys'] },
  { name: 'Yaba Metropolitan College',            category: 'school',   lat: 6.5160, lng: 3.3630, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['college', 'education', 'vocational', 'training'] },
  { name: 'LASCOHET',                             category: 'school',   lat: 6.5172, lng: 3.3530, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['health technology', 'college', 'pharmacy', 'nursing'] },

  // MARKETS
  { name: 'Tejuosho Market',                      category: 'market',   lat: 6.5063, lng: 3.3631, address: 'Ojuelegba Road, Yaba',          phone: '',            hours: 'Daily 7am–7pm',   tags: ['rice', 'pepper', 'tomatoes', 'yam', 'clothes', 'thrift', 'fabric', 'food', 'provisions'] },
  { name: 'Makoko Fish Market',                   category: 'market',   lat: 6.4966, lng: 3.3896, address: 'Makoko, Yaba',                  phone: '',            hours: 'Daily 6am–6pm',   tags: ['fish', 'seafood', 'catfish', 'tilapia', 'fresh fish', 'crayfish'] },
  { name: 'Sabo Market',                          category: 'market',   lat: 6.5088, lng: 3.3760, address: 'Sabo, Yaba',                    phone: '',            hours: 'Daily 7am–7pm',   tags: ['rice', 'pepper', 'tomatoes', 'food', 'vegetables', 'provisions'] },
  { name: 'Yaba Market',                          category: 'market',   lat: 6.5100, lng: 3.3640, address: 'Yaba, Lagos',                   phone: '',            hours: 'Daily 6am–7pm',   tags: ['thrift', 'clothes', 'shoes', 'second hand', 'bend down', 'okrika'] },
  { name: 'E-Centre Mall',                        category: 'market',   lat: 6.5068, lng: 3.3688, address: 'Commercial Ave, Yaba',          phone: '',            hours: 'Daily 9am–9pm',   tags: ['mall', 'shopping', 'cinema', 'restaurant', 'supermarket'] },
  { name: 'Tejuosho Shopping Complex',            category: 'market',   lat: 6.5060, lng: 3.3625, address: 'Ojuelegba Road, Yaba',          phone: '',            hours: 'Daily 9am–8pm',   tags: ['shopping', 'grocery', 'cosmetics', 'pharmacy', 'clothes'] },

  // BANKS
  { name: 'Zenith Bank Yaba',                     category: 'bank',     lat: 6.5121, lng: 3.3700, address: 'Herbert Macaulay Way, Yaba',   phone: '01-278-7000', hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash', 'savings', 'account'] },
  { name: 'GTBank Yaba',                          category: 'bank',     lat: 6.5135, lng: 3.3650, address: 'Corporation Drive, Yaba',      phone: '01-448-0000', hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash', 'savings', 'account'] },
  { name: 'Access Bank Yaba',                     category: 'bank',     lat: 6.5110, lng: 3.3720, address: 'Yaba Bus Stop, Yaba',          phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash', 'loan'] },
  { name: 'First Bank Yaba',                      category: 'bank',     lat: 6.5098, lng: 3.3668, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash', 'savings'] },
  { name: 'UBA Yaba',                             category: 'bank',     lat: 6.5115, lng: 3.3690, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash', 'account'] },
  { name: 'Fidelity Bank Yaba',                   category: 'bank',     lat: 6.5105, lng: 3.3678, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'banking', 'cash', 'savings', 'loan'] },
  { name: 'Polaris Bank Yaba',                    category: 'bank',     lat: 6.5092, lng: 3.3660, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'banking', 'cash', 'transfer'] },
  { name: 'Sterling Bank Yaba',                   category: 'bank',     lat: 6.5118, lng: 3.3645, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'banking', 'cash', 'transfer', 'savings'] },

  // FOOD
  { name: 'Chicken Republic Yaba',                category: 'food',     lat: 6.5118, lng: 3.3688, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Daily 9am–10pm',  tags: ['chicken', 'burger', 'fast food', 'jollof', 'rice', 'chips'] },
  { name: 'Mr Biggs Yaba',                        category: 'food',     lat: 6.5105, lng: 3.3670, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 9am–9pm',   tags: ['pies', 'snacks', 'fast food', 'eat', 'meat pie'] },
  { name: 'Tantalizers Yaba',                     category: 'food',     lat: 6.5130, lng: 3.3660, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 9am–9pm',   tags: ['chicken', 'rice', 'fast food', 'jollof', 'eat'] },
  { name: 'Kilimanjaro Yaba',                     category: 'food',     lat: 6.5112, lng: 3.3682, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Daily 9am–10pm',  tags: ['chicken', 'burger', 'fast food', 'shawarma', 'eat'] },
  { name: 'Mama Cass Yaba',                       category: 'food',     lat: 6.5095, lng: 3.3695, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 8am–9pm',   tags: ['nigerian food', 'rice', 'soup', 'amala', 'eba', 'local food'] },
  { name: 'Southern Fried Chicken Yaba',          category: 'food',     lat: 6.5122, lng: 3.3675, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 10am–10pm', tags: ['chicken', 'fast food', 'chips', 'burger', 'eat'] },
  { name: 'Subway Yaba',                          category: 'food',     lat: 6.5070, lng: 3.3692, address: 'E-Centre, Commercial Ave',     phone: '',            hours: 'Daily 9am–9pm',   tags: ['sandwich', 'sub', 'fast food', 'healthy', 'eat'] },
  { name: 'Cold Stone Creamery Yaba',             category: 'food',     lat: 6.5065, lng: 3.3685, address: 'E-Centre, Yaba',               phone: '',            hours: 'Daily 11am–10pm', tags: ['ice cream', 'dessert', 'cake', 'sweet', 'snacks'] },
  { name: 'The Place Restaurant Yaba',            category: 'food',     lat: 6.5088, lng: 3.3698, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 9am–10pm',  tags: ['nigerian food', 'chicken', 'rice', 'grills', 'eat', 'restaurant'] },
  { name: 'Olaiya Food Canteen',                  category: 'food',     lat: 6.5078, lng: 3.3655, address: 'Ojuelegba, Yaba',              phone: '',            hours: 'Daily 7am–8pm',   tags: ['amala', 'ewedu', 'gbegiri', 'local food', 'nigerian', 'cheap food'] },

  // TECH
  { name: 'CcHUB',                                category: 'tech',     lat: 6.5148, lng: 3.3695, address: '294 Herbert Macaulay Way',     phone: '',            hours: 'Mon–Fri 8am–6pm', tags: ['startup', 'incubator', 'coworking', 'tech', 'innovation', 'hub'] },
  { name: 'Izone Hub',                            category: 'tech',     lat: 6.5155, lng: 3.3705, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 9am–6pm', tags: ['coworking', 'tech', 'startup', 'office space', 'hub'] },
  { name: 'Wennovation Hub',                      category: 'tech',     lat: 6.5140, lng: 3.3688, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 9am–6pm', tags: ['startup', 'incubator', 'tech', 'innovation', 'entrepreneurs'] },

  // FUEL
  { name: 'Total Filling Station Yaba',           category: 'fuel',     lat: 6.5140, lng: 3.3630, address: 'Western Ave, Yaba',            phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'gas', 'fuel', 'filling station', 'pump'] },
  { name: 'NNPC Filling Station Yaba',            category: 'fuel',     lat: 6.5082, lng: 3.3655, address: 'Ojuelegba Road, Yaba',         phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'fuel', 'filling station', 'pump'] },
  { name: 'Ardova Filling Station Yaba',          category: 'fuel',     lat: 6.5095, lng: 3.3642, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'fuel', 'filling station', 'pump'] },
  { name: 'MRS Filling Station Yaba',             category: 'fuel',     lat: 6.5072, lng: 3.3668, address: 'Ojuelegba, Yaba',              phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'fuel', 'filling station', 'gas'] },

  // TRANSIT
  { name: 'Yaba Bus Stop',                        category: 'transit',  lat: 6.5112, lng: 3.3679, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'okada', 'keke', 'transport', 'BRT'] },
  { name: 'Mobolaji Johnson Railway Station',     category: 'transit',  lat: 6.5130, lng: 3.3600, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily 6am–9pm',   tags: ['train', 'rail', 'railway', 'ibadan', 'commute', 'NRC'] },
  { name: 'Ojuelegba Bus Stop',                   category: 'transit',  lat: 6.5058, lng: 3.3620, address: 'Ojuelegba, Yaba',              phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'BRT', 'transport', 'commute'] },
  { name: 'Sabo Bus Stop',                        category: 'transit',  lat: 6.5085, lng: 3.3758, address: 'Sabo, Yaba',                   phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'okada', 'transport'] },
  { name: 'Fadeyi Bus Stop',                      category: 'transit',  lat: 6.5220, lng: 3.3640, address: 'Fadeyi, Yaba',                 phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'BRT', 'transport'] },

  // CINEMA
  { name: 'Ozone Cinemas E-Centre',               category: 'cinema',   lat: 6.5070, lng: 3.3690, address: 'Commercial Ave, Yaba',         phone: '',            hours: 'Daily 10am–10pm', tags: ['cinema', 'movies', 'film', 'entertainment', 'watch movie'] },

  // HOTELS
  { name: 'De Edge Hotel Yaba',                   category: 'hotel',    lat: 6.5102, lng: 3.3658, address: 'Yaba, Lagos',                  phone: '',            hours: 'Open 24hrs',      tags: ['hotel', 'lodge', 'accommodation', 'sleep', 'room', 'stay'] },
  { name: 'Crystal Suites Yaba',                  category: 'hotel',    lat: 6.5088, lng: 3.3672, address: 'Yaba, Lagos',                  phone: '',            hours: 'Open 24hrs',      tags: ['hotel', 'lodge', 'accommodation', 'sleep', 'room', 'suites'] },
  { name: 'Mainland Hotel Yaba',                  category: 'hotel',    lat: 6.5075, lng: 3.3648, address: 'Yaba, Lagos',                  phone: '',            hours: 'Open 24hrs',      tags: ['hotel', 'lodge', 'accommodation', 'sleep', 'room', 'stay'] },

  // WORSHIP
  { name: 'Our Saviour Church Yaba',              category: 'worship',  lat: 6.5125, lng: 3.3625, address: 'Yaba, Lagos',                  phone: '',            hours: 'Sun 7am–12pm',    tags: ['church', 'worship', 'prayer', 'christianity', 'sunday service'] },
  { name: 'Yaba Central Mosque',                  category: 'worship',  lat: 6.5098, lng: 3.3712, address: 'Yaba, Lagos',                  phone: '',            hours: 'Daily',           tags: ['mosque', 'worship', 'prayer', 'islam', 'friday prayer'] },
  { name: 'RCCG Yaba Parish',                     category: 'worship',  lat: 6.5135, lng: 3.3698, address: 'Yaba, Lagos',                  phone: '',            hours: 'Sun 7am–1pm',     tags: ['church', 'rccg', 'worship', 'prayer', 'christianity'] },
];

let map, mapMarkers = [], activeCategory = 'all', routingControl = null, userLocation = null, currentPOI = null;
let savedPOIs = JSON.parse(localStorage.getItem('lagis_saved') || '[]');
let isSearchActive = false;

function getMeta(cat) { return CATEGORY_META[cat] || CATEGORY_META.other; }

// ── MAP INIT ──
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false }).setView([6.5120, 3.3700], 15);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

  // Start clean — no POIs shown
  showEmptyState();

  map.on('click', closeCard);
  map.on('zoomend', () => { if (isSearchActive) renderMarkers(getCurrentResults()); });

  document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
  document.getElementById('locate-btn').addEventListener('click', locateMe);
}

// ── EMPTY STATE ──
function showEmptyState() {
  clearMarkers();
  isSearchActive = false;
  const list = document.getElementById('poi-list');
  list.innerHTML = `
    <div style="padding:40px 20px;text-align:center;">
      <div style="font-size:40px;margin-bottom:12px;">🗺️</div>
      <div style="font-size:15px;font-weight:600;color:#1a1a1a;margin-bottom:6px;">Discover Yaba</div>
      <div style="font-size:13px;color:#999;line-height:1.5;">Search for businesses, places or tap a category above to explore</div>
    </div>
  `;
  document.getElementById('list-count').textContent = 'Explore Yaba';
  setSheet('mid');
}

let _currentResults = [];
function getCurrentResults() { return _currentResults; }

// ── LOCATION ──
function locateMe() {
  if (!navigator.geolocation) return;
  const btn = document.getElementById('locate-btn');
  btn.style.color = '#f97316';
  navigator.geolocation.getCurrentPosition(pos => {
    btn.style.color = '#1a7a4a';
    userLocation = [pos.coords.latitude, pos.coords.longitude];
    map.setView(userLocation, 16);
    L.circleMarker(userLocation, {
      radius: 8, color: '#1a7a4a', fillColor: '#1a7a4a', fillOpacity: 0.8, weight: 3
    }).addTo(map);
  }, () => { btn.style.color = '#ef4444'; setTimeout(() => btn.style.color = '', 2000); });
}

// ── ROUTE PANEL ──
function openRoutePanel(poi) {
  currentPOI = poi;
  document.getElementById('route-to').value = poi ? `${poi.name}, ${poi.address}` : '';
  document.getElementById('route-from').value = userLocation ? 'Your location' : '';
  window._routeDestPOI = poi;
  const panel = document.getElementById('route-panel');
  panel.classList.remove('hidden');
  setTimeout(() => panel.classList.add('visible'), 10);
  document.getElementById('route-overlay').classList.remove('hidden');
  closeCard();
  showNearbySuggestions(poi);
}

function closeRoutePanel() {
  const panel = document.getElementById('route-panel');
  panel.classList.remove('visible');
  document.getElementById('route-overlay').classList.add('hidden');
  setTimeout(() => panel.classList.add('hidden'), 300);
}

function showNearbySuggestions(poi) {
  if (!poi) return;
  const list = document.getElementById('route-suggestions-list');
  list.innerHTML = '';
  POIS.filter(p => p.name !== poi.name)
    .map(p => ({ ...p, dist: Math.abs(p.lat - poi.lat) + Math.abs(p.lng - poi.lng) }))
    .sort((a, b) => a.dist - b.dist).slice(0, 6)
    .forEach(p => {
      const meta = getMeta(p.category);
      const chip = document.createElement('div');
      chip.className = 'suggestion-chip';
      chip.textContent = `${meta.emoji} ${p.name}`;
      chip.addEventListener('click', () => {
        document.getElementById('route-to').value = `${p.name}, ${p.address}`;
        window._routeDestPOI = p;
      });
      list.appendChild(chip);
    });
}

function executeRoute() {
  const destPOI = window._routeDestPOI;
  if (!destPOI) { showToast('Please select a destination'); return; }
  const from = userLocation || [6.5120, 3.3700];
  const mode = document.querySelector('.mode-btn.active')?.dataset.mode || 'driving';
  drawRoute(from, destPOI, mode);
  closeRoutePanel();
}

function drawRoute(from, poi, mode = 'driving') {
  if (routingControl) { map.removeControl(routingControl); routingControl = null; }
  const color = mode === 'walking' ? '#06b6d4' : mode === 'cycling' ? '#f59e0b' : '#1a7a4a';
  routingControl = L.Routing.control({
    waypoints: [L.latLng(from[0], from[1]), L.latLng(poi.lat, poi.lng)],
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      profile: mode === 'walking' ? 'foot' : mode === 'cycling' ? 'bike' : 'car'
    }),
    lineOptions: { styles: [{ color, weight: 5, opacity: 0.85 }] },
    show: false, addWaypoints: false, routeWhileDragging: false,
    fitSelectedRoutes: true, showAlternatives: false,
    createMarker: (i, wp) => L.marker(wp.latLng, {
      icon: L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;background:${i === 0 ? '#1a7a4a' : '#f97316'};border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7]
      })
    })
  }).addTo(map);

  routingControl.on('routesfound', e => {
    const route = e.routes[0];
    const km = (route.summary.totalDistance / 1000).toFixed(1);
    const mins = Math.round(route.summary.totalTime / 60);
    document.getElementById('route-distance').textContent = `📍 ${km} km`;
    document.getElementById('route-time').textContent = `⏱ ${mins} min`;
    document.getElementById('route-info').classList.remove('hidden');
    showCancelRoute();
  });
}

function showCancelRoute() {
  let btn = document.getElementById('cancel-route');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'cancel-route';
    btn.textContent = '✕ Cancel Route';
    btn.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;border:none;border-radius:20px;padding:10px 20px;font-size:14px;font-weight:600;box-shadow:0 2px 12px rgba(0,0,0,0.2);z-index:500;cursor:pointer;`;
    btn.addEventListener('click', () => {
      if (routingControl) { map.removeControl(routingControl); routingControl = null; }
      document.getElementById('route-info').classList.add('hidden');
      btn.remove();
    });
    document.body.appendChild(btn);
  }
}

// ── SHARE ──
function sharePOI(poi) {
  const text = `${poi.name}\n${poi.address}\n\nFound on LAGIS — Lagos Interactive Map\nhttps://brightxam.github.io/LAGIS-mobile`;
  if (navigator.share) navigator.share({ title: poi.name, text, url: 'https://brightxam.github.io/LAGIS-mobile' });
  else navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
}

// ── SAVE ──
function toggleSave(poi) {
  const idx = savedPOIs.findIndex(p => p.name === poi.name);
  if (idx === -1) { savedPOIs.push(poi); showToast(`${poi.name} saved!`); }
  else { savedPOIs.splice(idx, 1); showToast('Removed from saved'); }
  localStorage.setItem('lagis_saved', JSON.stringify(savedPOIs));
  updateSaveBtn(poi);
}

function updateSaveBtn(poi) {
  const btn = document.getElementById('btn-save');
  if (!btn) return;
  const saved = savedPOIs.some(p => p.name === poi.name);
  btn.style.color = saved ? '#1a7a4a' : '';
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('lagis-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lagis-toast';
    toast.style.cssText = `position:fixed;bottom:180px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:500;z-index:600;opacity:0;transition:opacity 0.2s;pointer-events:none;white-space:nowrap;`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => toast.style.opacity = '0', 2000);
}

// ── MARKERS ──
function clearMarkers() {
  mapMarkers.forEach(m => map.removeLayer(m));
  mapMarkers = [];
}

function renderMarkers(pois) {
  clearMarkers();
  const zoom = map.getZoom();
  const { clusters, unclustered } = clusterPOIs(pois, zoom);

  clusters.forEach(cl => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:38px;height:38px;background:#1a7a4a;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.25);cursor:pointer;">${cl.count}</div>`,
      iconSize: [38, 38], iconAnchor: [19, 19]
    });
    const m = L.marker([cl.lat, cl.lng], { icon }).addTo(map)
      .on('click', e => { L.DomEvent.stopPropagation(e); map.setView([cl.lat, cl.lng], map.getZoom() + 2); });
    mapMarkers.push(m);
  });

  unclustered.forEach(poi => {
    const meta = getMeta(poi.category);
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:34px;height:34px;background:${meta.color};border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;">${meta.emoji}</div>`,
      iconSize: [34, 34], iconAnchor: [17, 17]
    });
    const m = L.marker([poi.lat, poi.lng], { icon }).addTo(map)
      .on('click', e => {
        L.DomEvent.stopPropagation(e);
        map.setView([poi.lat, poi.lng], Math.max(map.getZoom(), 16));
        openCard(poi);
      });
    mapMarkers.push(m);
  });
}

// ── CLUSTERING ──
function clusterPOIs(pois, zoom) {
  if (zoom >= 15) return { clusters: [], unclustered: pois };
  const grid = zoom <= 12 ? 0.025 : 0.01;
  const used = new Set(), result = [];
  pois.forEach((poi, i) => {
    if (used.has(i)) return;
    const group = [poi]; used.add(i);
    pois.forEach((other, j) => {
      if (used.has(j)) return;
      if (Math.abs(poi.lat - other.lat) < grid && Math.abs(poi.lng - other.lng) < grid) { group.push(other); used.add(j); }
    });
    result.push(group.length > 1
      ? { lat: group.reduce((s, p) => s + p.lat, 0) / group.length, lng: group.reduce((s, p) => s + p.lng, 0) / group.length, count: group.length }
      : { ...poi, count: 1 });
  });
  return {
    clusters: result.filter(c => c.count > 1),
    unclustered: result.filter(c => c.count === 1).map(c => pois.find(p => p.name === c.name)).filter(Boolean)
  };
}

// ── POI LIST ──
function renderList(pois) {
  const list = document.getElementById('poi-list');
  document.getElementById('list-count').textContent = `${pois.length} result${pois.length !== 1 ? 's' : ''}`;
  list.innerHTML = '';
  if (!pois.length) {
    list.innerHTML = `<div style="padding:32px;text-align:center;color:#aaa;font-size:13px;">No results found in Yaba</div>`;
    return;
  }
  pois.forEach(poi => {
    const meta = getMeta(poi.category);
    const item = document.createElement('div');
    item.className = 'poi-item';
    item.innerHTML = `
      <div class="poi-dot" style="background:${meta.bg}">${meta.emoji}</div>
      <div class="poi-info">
        <div class="poi-name">${poi.name}</div>
        <div class="poi-sub">${meta.label} · ${poi.address}</div>
      </div>
      <div class="poi-chevron">›</div>
    `;
    item.addEventListener('click', () => {
      document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      map.setView([poi.lat, poi.lng], Math.max(map.getZoom(), 16));
      openCard(poi);
    });
    list.appendChild(item);
  });
}

// ── POI CARD ──
function openCard(poi) {
  currentPOI = poi;
  const meta = getMeta(poi.category);
  const badge = document.getElementById('card-badge');
  badge.textContent = meta.label;
  badge.style.background = meta.bg;
  badge.style.color = meta.color;
  document.getElementById('card-name').textContent = poi.name;
  document.getElementById('card-address').textContent = poi.address || '';
  document.getElementById('meta-phone-text').textContent = poi.phone;
  document.getElementById('meta-phone').classList.toggle('hidden', !poi.phone);
  document.getElementById('meta-hours-text').textContent = poi.hours;
  document.getElementById('meta-hours').classList.toggle('hidden', !poi.hours);

  const isSaved = savedPOIs.some(p => p.name === poi.name);
  document.getElementById('card-btns').innerHTML = `
    <button class="card-action primary" id="btn-directions">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
      Directions
    </button>
    <button class="card-action" id="btn-share">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      Share
    </button>
    <button class="card-action" id="btn-save" style="color:${isSaved ? '#1a7a4a' : ''}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? '#1a7a4a' : 'none'}" stroke="${isSaved ? '#1a7a4a' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      ${isSaved ? 'Saved' : 'Save'}
    </button>
  `;

  document.getElementById('btn-directions').addEventListener('click', () => openRoutePanel(poi));
  document.getElementById('btn-share').addEventListener('click', () => sharePOI(poi));
  document.getElementById('btn-save').addEventListener('click', () => toggleSave(poi));

  document.getElementById('poi-card').classList.remove('hidden');
  setSheet('collapsed');
}

function closeCard() {
  document.getElementById('poi-card').classList.add('hidden');
  document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
  currentPOI = null;
}

document.getElementById('card-close').addEventListener('click', closeCard);

// ── ROUTE PANEL EVENTS ──
document.getElementById('route-close').addEventListener('click', closeRoutePanel);
document.getElementById('route-overlay').addEventListener('click', closeRoutePanel);
document.getElementById('btn-get-route').addEventListener('click', executeRoute);
document.getElementById('btn-use-location').addEventListener('click', () => {
  locateMe();
  document.getElementById('route-from').value = 'Your location';
});
document.getElementById('btn-clear-to').addEventListener('click', () => {
  document.getElementById('route-to').value = '';
  window._routeDestPOI = null;
});
document.getElementById('route-swap').addEventListener('click', () => {
  const from = document.getElementById('route-from');
  const to = document.getElementById('route-to');
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
});
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── BOTTOM SHEET DRAG ──
const sheet = document.getElementById('bottom-sheet');
let sheetState = 'mid', dragStartY = 0, dragStartHeight = 0, isDragging = false;

function getSheetHeight(state) {
  if (state === 'collapsed') return 80;
  if (state === 'expanded') return window.innerHeight * 0.80;
  return window.innerHeight * 0.35;
}

function setSheet(state) {
  sheetState = state;
  sheet.style.transition = 'height 0.3s cubic-bezier(0.4,0,0.2,1)';
  sheet.style.height = getSheetHeight(state) + 'px';
}

const handle = document.getElementById('sheet-handle-wrap');
handle.addEventListener('touchstart', e => { isDragging = true; dragStartY = e.touches[0].clientY; dragStartHeight = sheet.offsetHeight; sheet.style.transition = 'none'; }, { passive: true });
handle.addEventListener('touchmove', e => { if (!isDragging) return; sheet.style.height = Math.min(Math.max(dragStartHeight + (dragStartY - e.touches[0].clientY), 70), window.innerHeight * 0.85) + 'px'; }, { passive: true });
handle.addEventListener('touchend', () => { isDragging = false; const h = sheet.offsetHeight, mid = getSheetHeight('mid'), exp = getSheetHeight('expanded'); setSheet(h < 150 ? 'collapsed' : h < (mid + exp) / 2 ? 'mid' : 'expanded'); });
handle.addEventListener('click', () => setSheet(sheetState === 'collapsed' ? 'mid' : sheetState === 'mid' ? 'expanded' : 'mid'));
setSheet('mid');

// ── AI SEARCH ──
async function aiSearch(query) {
  const ctx = POIS.map((p, i) => `${i}: ${p.name} (${p.category}) - ${p.address} - offers: ${p.tags.join(', ')}`).join('\n');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CONFIG.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 100, messages: [{ role: 'user', content: `Lagos Yaba directory. User searched: "${query}"\n\nPlaces:\n${ctx}\n\nReturn ONLY JSON array of matching index numbers. Max 8. Return [] if none.` }] })
    });
    const data = await res.json();
    return JSON.parse(data.content[0].text.trim()).map(i => POIS[i]).filter(Boolean);
  } catch { return null; }
}

// ── SEARCH WITH AUTOCOMPLETE ──
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('search-clear');
let searchTimeout;

const dropdown = document.createElement('div');
dropdown.id = 'search-dropdown';
dropdown.style.cssText = `position:fixed;top:64px;left:12px;right:12px;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.12);z-index:400;overflow:hidden;max-height:50vh;overflow-y:auto;display:none;`;
document.body.appendChild(dropdown);

function showDropdown(items) {
  dropdown.innerHTML = '';
  if (!items.length) { dropdown.style.display = 'none'; return; }
  items.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #f0f0f0;cursor:pointer;`;
    row.innerHTML = `
      <div style="width:36px;height:36px;background:${item.bg};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${item.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:14px;font-weight:600;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
        <div style="font-size:12px;color:#999;margin-top:2px;">${item.sub}</div>
      </div>
    `;
    row.addEventListener('click', () => {
      hideDropdown();
      searchInput.value = item.name;
      if (item.poi) {
        const results = [item.poi];
        _currentResults = results;
        isSearchActive = true;
        renderMarkers(results);
        renderList(results);
        map.setView([item.poi.lat, item.poi.lng], 16);
        openCard(item.poi);
        setSheet('collapsed');
      }
    });
    dropdown.appendChild(row);
  });
  dropdown.style.display = 'block';
}

function hideDropdown() { dropdown.style.display = 'none'; }

searchInput.addEventListener('focus', () => {
  if (!searchInput.value) {
    const recent = JSON.parse(localStorage.getItem('lagis_recent') || '[]');
    if (recent.length) {
      const items = recent.map(name => {
        const poi = POIS.find(p => p.name === name);
        if (!poi) return null;
        const meta = getMeta(poi.category);
        return { name: poi.name, sub: '🕐 Recent', emoji: meta.emoji, bg: meta.bg, poi };
      }).filter(Boolean);
      showDropdown(items);
    }
  }
});

searchInput.addEventListener('input', function () {
  clearBtn.classList.toggle('hidden', !this.value);
  clearTimeout(searchTimeout);
  const q = this.value.trim();

  if (!q) {
    hideDropdown();
    showEmptyState();
    return;
  }

  // Instant local matches for dropdown
  const localMatches = POIS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.tags.some(t => t.includes(q.toLowerCase()))
  ).slice(0, 5);

  showDropdown(localMatches.map(poi => {
    const meta = getMeta(poi.category);
    return { name: poi.name, sub: meta.label + ' · ' + poi.address, emoji: meta.emoji, bg: meta.bg, poi };
  }));

  // Show local results immediately
  if (localMatches.length) {
    _currentResults = localMatches;
    isSearchActive = true;
    renderMarkers(localMatches);
    renderList(localMatches);
    setSheet('mid');
  }

  // AI search after delay
  searchTimeout = setTimeout(async () => {
    document.getElementById('list-count').textContent = 'AI searching…';
    const results = await aiSearch(q);
    if (results && results.length) {
      _currentResults = results;
      renderMarkers(results);
      renderList(results);
      document.getElementById('list-count').textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
      const items = results.map(poi => {
        const meta = getMeta(poi.category);
        return { name: poi.name, sub: '🤖 AI · ' + poi.address, emoji: meta.emoji, bg: meta.bg, poi };
      });
      showDropdown(items);
    }
  }, 800);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.add('hidden');
  hideDropdown();
  showEmptyState();
});

document.addEventListener('click', e => {
  if (!e.target.closest('#search-box') && !e.target.closest('#search-dropdown')) hideDropdown();
});

// ── CATEGORY FILTER ──
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const cat = this.dataset.cat;

    if (cat === 'all') {
      showEmptyState();
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      return;
    }

    const filtered = POIS.filter(p => p.category === cat);
    _currentResults = filtered;
    isSearchActive = true;
    renderMarkers(filtered);
    renderList(filtered);
    setSheet('mid');
    document.getElementById('list-count').textContent = `${filtered.length} ${CATEGORY_META[cat]?.label || cat}`;

    if (filtered.length > 0) {
      const bounds = L.latLngBounds(filtered.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  });
});

initMap();