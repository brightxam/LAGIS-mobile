const CATEGORY_META = {
  food:    { color: '#f97316', bg: '#fff4ed', emoji: '🍽️', label: 'Food & Drink' },
  bank:    { color: '#3b82f6', bg: '#eff6ff', emoji: '🏦', label: 'Banking' },
  health:  { color: '#22c55e', bg: '#f0fdf4', emoji: '🏥', label: 'Health' },
  market:  { color: '#a855f7', bg: '#faf5ff', emoji: '🛒', label: 'Market' },
  school:  { color: '#eab308', bg: '#fefce8', emoji: '🎓', label: 'Education' },
  fuel:    { color: '#ef4444', bg: '#fef2f2', emoji: '⛽', label: 'Fuel Station' },
  transit: { color: '#06b6d4', bg: '#ecfeff', emoji: '🚌', label: 'Transit' },
  tech:    { color: '#8b5cf6', bg: '#f5f3ff', emoji: '💻', label: 'Tech Hub' },
  cinema:  { color: '#f59e0b', bg: '#fffbeb', emoji: '🎬', label: 'Cinema' },
  other:   { color: '#888',    bg: '#f5f5f5', emoji: '📍', label: 'Other' },
};

const POIS = [
  { name: 'LUTH Hospital',                      category: 'health',  lat: 6.5175, lng: 3.3480, address: 'Idi-Araba, Yaba',               phone: '01-774-0050', hours: 'Open 24hrs',      tags: ['emergency', 'doctor', 'surgery', 'medical', 'hospital'] },
  { name: 'Infectious Diseases Hospital',       category: 'health',  lat: 6.5190, lng: 3.3560, address: 'Harvey Road, Yaba',             phone: '',            hours: 'Open 24hrs',      tags: ['hospital', 'infectious disease', 'medical'] },
  { name: 'Federal Neuro Psychiatric Hospital', category: 'health',  lat: 6.5185, lng: 3.3545, address: 'Harvey Road, Yaba',             phone: '',            hours: 'Open 24hrs',      tags: ['mental health', 'psychiatric', 'hospital'] },
  { name: 'Nigerian Institute of Medical Research', category: 'health', lat: 6.5198, lng: 3.3572, address: '6 Edmund Crescent, Yaba',   phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['research', 'medical', 'health', 'lab'] },
  { name: 'Randle General Hospital',            category: 'health',  lat: 6.5020, lng: 3.3580, address: 'Randle Ave, Surulere',          phone: '01-774-0100', hours: 'Open 24hrs',      tags: ['hospital', 'emergency', 'doctor'] },
  { name: 'Yaba College of Technology',         category: 'school',  lat: 6.5195, lng: 3.3710, address: 'Herbert Macaulay Way, Yaba',   phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['yabatech', 'polytechnic', 'engineering', 'education'] },
  { name: 'University of Lagos',                category: 'school',  lat: 6.5158, lng: 3.3980, address: 'Akoka, Yaba',                  phone: '',            hours: 'Mon–Fri 8am–5pm', tags: ['unilag', 'university', 'degree', 'education'] },
  { name: "Queen's College",                    category: 'school',  lat: 6.5168, lng: 3.3620, address: 'Yaba, Lagos',                  phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'girls', 'federal', 'education'] },
  { name: 'Igbobi College',                     category: 'school',  lat: 6.5210, lng: 3.3650, address: 'Igbobi, Yaba',                phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'boys', 'education'] },
  { name: "St. Finbarr's College",              category: 'school',  lat: 6.5145, lng: 3.3590, address: 'Akoka Road, Yaba',            phone: '',            hours: 'Mon–Fri 7am–4pm', tags: ['secondary school', 'education'] },
  { name: 'Tejuosho Market',                    category: 'market',  lat: 6.5063, lng: 3.3631, address: 'Ojuelegba Road, Yaba',         phone: '',            hours: 'Daily 7am–7pm',   tags: ['rice', 'pepper', 'tomatoes', 'clothes', 'thrift', 'fabric', 'food'] },
  { name: 'Makoko Fish Market',                 category: 'market',  lat: 6.4966, lng: 3.3896, address: 'Makoko, Yaba',                phone: '',            hours: 'Daily 6am–6pm',   tags: ['fish', 'seafood', 'catfish', 'tilapia', 'fresh fish'] },
  { name: 'Sabo Market',                        category: 'market',  lat: 6.5088, lng: 3.3760, address: 'Sabo, Yaba',                  phone: '',            hours: 'Daily 7am–7pm',   tags: ['rice', 'pepper', 'tomatoes', 'food', 'vegetables'] },
  { name: 'Yaba Market',                        category: 'market',  lat: 6.5100, lng: 3.3640, address: 'Yaba, Lagos',                 phone: '',            hours: 'Daily 6am–7pm',   tags: ['thrift', 'clothes', 'shoes', 'second hand', 'food'] },
  { name: 'E-Centre Mall',                      category: 'market',  lat: 6.5068, lng: 3.3688, address: 'Commercial Ave, Yaba',        phone: '',            hours: 'Daily 9am–9pm',   tags: ['mall', 'shopping', 'cinema', 'restaurant', 'games'] },
  { name: 'Zenith Bank Yaba',                   category: 'bank',    lat: 6.5121, lng: 3.3700, address: 'Herbert Macaulay Way, Yaba',  phone: '01-278-7000', hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash'] },
  { name: 'GTBank Yaba',                        category: 'bank',    lat: 6.5135, lng: 3.3650, address: 'Corporation Drive, Yaba',     phone: '01-448-0000', hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash'] },
  { name: 'Access Bank Yaba',                   category: 'bank',    lat: 6.5110, lng: 3.3720, address: 'Yaba Bus Stop, Yaba',         phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash'] },
  { name: 'First Bank Yaba',                    category: 'bank',    lat: 6.5098, lng: 3.3668, address: 'Herbert Macaulay Way, Yaba',  phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash'] },
  { name: 'UBA Yaba',                           category: 'bank',    lat: 6.5115, lng: 3.3690, address: 'Yaba, Lagos',                 phone: '',            hours: 'Mon–Fri 8am–4pm', tags: ['atm', 'transfer', 'banking', 'cash'] },
  { name: 'Chicken Republic Yaba',              category: 'food',    lat: 6.5118, lng: 3.3688, address: 'Herbert Macaulay Way, Yaba',  phone: '',            hours: 'Daily 9am–10pm',  tags: ['chicken', 'burger', 'fast food', 'jollof', 'rice'] },
  { name: 'Mr Biggs Yaba',                      category: 'food',    lat: 6.5105, lng: 3.3670, address: 'Yaba, Lagos',                 phone: '',            hours: 'Daily 9am–9pm',   tags: ['pies', 'snacks', 'fast food', 'eat'] },
  { name: 'Tantalizers Yaba',                   category: 'food',    lat: 6.5130, lng: 3.3660, address: 'Yaba, Lagos',                 phone: '',            hours: 'Daily 9am–9pm',   tags: ['chicken', 'rice', 'fast food', 'jollof'] },
  { name: 'CcHUB',                              category: 'tech',    lat: 6.5148, lng: 3.3695, address: '294 Herbert Macaulay Way',    phone: '',            hours: 'Mon–Fri 8am–6pm', tags: ['startup', 'incubator', 'coworking', 'tech', 'innovation'] },
  { name: 'Total Filling Station Yaba',         category: 'fuel',    lat: 6.5140, lng: 3.3630, address: 'Western Ave, Yaba',           phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'fuel', 'filling station'] },
  { name: 'NNPC Filling Station Yaba',          category: 'fuel',    lat: 6.5082, lng: 3.3655, address: 'Ojuelegba Road, Yaba',        phone: '',            hours: 'Daily 6am–10pm',  tags: ['petrol', 'diesel', 'fuel', 'filling station'] },
  { name: 'Yaba Bus Stop',                      category: 'transit', lat: 6.5112, lng: 3.3679, address: 'Herbert Macaulay Way, Yaba',  phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'okada', 'keke', 'transport'] },
  { name: 'Mobolaji Johnson Railway Station',   category: 'transit', lat: 6.5130, lng: 3.3600, address: 'Yaba, Lagos',                 phone: '',            hours: 'Daily 6am–9pm',   tags: ['train', 'rail', 'ibadan', 'commute', 'transport'] },
  { name: 'Ojuelegba Bus Stop',                 category: 'transit', lat: 6.5058, lng: 3.3620, address: 'Ojuelegba, Yaba',             phone: '',            hours: 'Daily',           tags: ['bus', 'danfo', 'BRT', 'transport'] },
  { name: 'Ozone Cinemas E-Centre',             category: 'cinema',  lat: 6.5070, lng: 3.3690, address: 'Commercial Ave, Yaba',        phone: '',            hours: 'Daily 10am–10pm', tags: ['cinema', 'movies', 'film', 'entertainment'] },
];

let map, activeCategory = 'all', mapMarkers = [], is3D = false, selectedMarker = null;

function getMeta(cat) { return CATEGORY_META[cat] || CATEGORY_META.other; }

// ── MAP INIT ──
function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [3.3700, 6.5120],
    zoom: 15,
    pitch: 0,
    bearing: 0,
    attributionControl: false,
  });

  map.on('load', () => {
    renderMarkers(POIS);
    renderList(POIS);
  });

  map.on('click', closeCard);
  map.on('zoom', () => renderMarkers(getFiltered()));

  document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn({ duration: 300 }));
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut({ duration: 300 }));
  document.getElementById('btn-compass').addEventListener('click', () => map.easeTo({ bearing: 0, pitch: 0, duration: 500 }));
  document.getElementById('btn-3d').addEventListener('click', toggle3D);
  document.getElementById('locate-btn').addEventListener('click', locateMe);
}

function toggle3D() {
  is3D = !is3D;
  const btn = document.getElementById('btn-3d');
  if (is3D) {
    map.easeTo({ pitch: 55, bearing: -15, duration: 800 });
    btn.style.background = '#1a7a4a';
    btn.style.color = '#fff';
  } else {
    map.easeTo({ pitch: 0, bearing: 0, duration: 500 });
    btn.style.background = '';
    btn.style.color = '';
  }
}

function locateMe() {
  if (!navigator.geolocation) return;
  const btn = document.getElementById('locate-btn');
  btn.style.color = '#f97316';
  navigator.geolocation.getCurrentPosition(pos => {
    btn.style.color = '#1a7a4a';
    map.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 16, duration: 1000 });
    const el = document.createElement('div');
    el.style.cssText = 'width:16px;height:16px;background:#1a7a4a;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 3px rgba(26,122,74,0.3);';
    new maplibregl.Marker({ element: el }).setLngLat([pos.coords.longitude, pos.coords.latitude]).addTo(map);
  }, () => { btn.style.color = '#ef4444'; setTimeout(() => btn.style.color = '', 2000); });
}

// ── MARKERS ──
function renderMarkers(pois) {
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  const zoom = map.getZoom();
  const { clusters, unclustered } = clusterPOIs(pois, zoom);

  clusters.forEach(cl => {
    const el = document.createElement('div');
    el.style.cssText = `width:40px;height:40px;background:#1a7a4a;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.25);cursor:pointer;`;
    el.textContent = cl.count;
    el.addEventListener('click', e => { e.stopPropagation(); map.flyTo({ center: [cl.lng, cl.lat], zoom: map.getZoom() + 2, duration: 500 }); });
    mapMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([cl.lng, cl.lat]).addTo(map));
  });

  unclustered.forEach(poi => {
    const meta = getMeta(poi.category);
    const el = document.createElement('div');
    el.style.cssText = `width:34px;height:34px;background:${meta.color};border-radius:50%;border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;transition:all 0.15s;`;
    el.textContent = meta.emoji;
    el.addEventListener('click', e => {
      e.stopPropagation();
      el.style.width = '44px';
      el.style.height = '44px';
      el.style.fontSize = '20px';
      el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.35)';
      map.flyTo({ center: [poi.lng, poi.lat], zoom: Math.max(map.getZoom(), 16), duration: 600 });
      openCard(poi);
    });
    mapMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([poi.lng, poi.lat]).addTo(map));
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
  document.getElementById('list-count').textContent = `${pois.length} place${pois.length !== 1 ? 's' : ''}`;
  list.innerHTML = '';
  if (!pois.length) { list.innerHTML = `<div style="padding:32px;text-align:center;color:#aaa;font-size:13px;">No results found</div>`; return; }
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
      map.flyTo({ center: [poi.lng, poi.lat], zoom: Math.max(map.getZoom(), 16), duration: 600 });
      openCard(poi);
    });
    list.appendChild(item);
  });
}

// ── POI CARD ──
function openCard(poi) {
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
  document.getElementById('poi-card').classList.remove('hidden');
  collapseSheet();
}

function closeCard() {
  document.getElementById('poi-card').classList.add('hidden');
  document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
  selectedMarker = null;
}

document.getElementById('card-close').addEventListener('click', closeCard);

// ── BOTTOM SHEET DRAG ──
const sheet = document.getElementById('bottom-sheet');
let sheetState = 'mid', dragStartY = 0, dragStartHeight = 0, isDragging = false;

function getSheetHeight(state) {
  if (state === 'collapsed') return 80;
  if (state === 'expanded') return window.innerHeight * 0.80;
  return window.innerHeight * 0.45;
}

function setSheet(state) {
  sheetState = state;
  sheet.style.transition = 'height 0.3s cubic-bezier(0.4,0,0.2,1)';
  sheet.style.height = getSheetHeight(state) + 'px';
}

function collapseSheet() { setSheet('collapsed'); }

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
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 100, messages: [{ role: 'user', content: `Lagos Yaba directory. User searched: "${query}"\n\nPlaces:\n${ctx}\n\nReturn ONLY JSON array of matching index numbers. Max 5. Return [] if none.` }] })
    });
    const data = await res.json();
    return JSON.parse(data.content[0].text.trim()).map(i => POIS[i]).filter(Boolean);
  } catch { return null; }
}

// ── SEARCH ──
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('search-clear');
let searchTimeout;

searchInput.addEventListener('input', function () {
  clearBtn.classList.toggle('hidden', !this.value);
  clearTimeout(searchTimeout);
  const q = this.value.trim();
  if (!q) { filterAndRender(); return; }
  document.getElementById('list-count').textContent = 'Searching…';
  searchTimeout = setTimeout(async () => {
    const results = await aiSearch(q);
    if (results && results.length) { renderMarkers(results); renderList(results); document.getElementById('list-count').textContent = `${results.length} AI result${results.length !== 1 ? 's' : ''}`; }
    else filterAndRender();
  }, 600);
});

clearBtn.addEventListener('click', () => { searchInput.value = ''; clearBtn.classList.add('hidden'); filterAndRender(); });

// ── CATEGORY FILTER ──
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    activeCategory = this.dataset.cat;
    filterAndRender();
  });
});

function getFiltered() {
  const q = searchInput.value.toLowerCase();
  return POIS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || (p.tags && p.tags.some(t => t.includes(q)));
    return matchCat && matchQ;
  });
}

function filterAndRender() { const f = getFiltered(); renderMarkers(f); renderList(f); }

initMap();