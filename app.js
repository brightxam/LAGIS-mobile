const CATEGORY_META = {
  food:    { color: '#f97316', bg: '#fff4ed', emoji: '🍽️', label: 'Food & Drink' },
  bank:    { color: '#3b82f6', bg: '#eff6ff', emoji: '🏦', label: 'Banking' },
  health:  { color: '#22c55e', bg: '#f0fdf4', emoji: '🏥', label: 'Health' },
  market:  { color: '#a855f7', bg: '#faf5ff', emoji: '🛒', label: 'Market' },
  school:  { color: '#eab308', bg: '#fefce8', emoji: '🎓', label: 'Education' },
  fuel:    { color: '#ef4444', bg: '#fef2f2', emoji: '⛽', label: 'Fuel Station' },
  transit: { color: '#06b6d4', bg: '#ecfeff', emoji: '🚌', label: 'Transit' },
  tech:    { color: '#8b5cf6', bg: '#f5f3ff', emoji: '💻', label: 'Tech Hub' },
  hotel:   { color: '#ec4899', bg: '#fdf2f8', emoji: '🏨', label: 'Hotel' },
  cinema:  { color: '#f59e0b', bg: '#fffbeb', emoji: '🎬', label: 'Cinema' },
  other:   { color: '#888',    bg: '#f5f5f5', emoji: '📍', label: 'Other' },
};

const POIS = [
  // HEALTH
  { name: 'LUTH Hospital',                    category: 'health',  lat: 6.5175, lng: 3.3480, address: 'Idi-Araba, Yaba',              phone: '01-774-0050',  hours: 'Open 24hrs',        tags: ['emergency', 'doctor', 'surgery', 'medical', 'hospital'] },
  { name: 'Randle General Hospital',          category: 'health',  lat: 6.5020, lng: 3.3580, address: 'Randle Ave, Surulere',          phone: '01-774-0100',  hours: 'Open 24hrs',        tags: ['emergency', 'doctor', 'medical', 'hospital'] },
  { name: 'Infectious Diseases Hospital',     category: 'health',  lat: 6.5190, lng: 3.3560, address: 'Harvey Road, Yaba',            phone: '',             hours: 'Open 24hrs',        tags: ['hospital', 'infectious disease', 'medical', 'doctor'] },
  { name: 'Nigerian Institute of Medical Research', category: 'health', lat: 6.5198, lng: 3.3572, address: '6 Edmund Crescent, Yaba', phone: '',             hours: 'Mon–Fri 8am–5pm',   tags: ['research', 'medical', 'health', 'lab'] },
  { name: 'Federal Neuro Psychiatric Hospital', category: 'health', lat: 6.5185, lng: 3.3545, address: 'Harvey Road, Yaba',           phone: '',             hours: 'Open 24hrs',        tags: ['mental health', 'psychiatric', 'hospital', 'doctor'] },

  // SCHOOLS
  { name: 'Yaba College of Technology',       category: 'school',  lat: 6.5195, lng: 3.3710, address: 'Herbert Macaulay Way',         phone: '',             hours: 'Mon–Fri 8am–5pm',   tags: ['yabatech', 'polytechnic', 'engineering', 'education'] },
  { name: 'University of Lagos',              category: 'school',  lat: 6.5158, lng: 3.3980, address: 'Akoka, Yaba',                 phone: '',             hours: 'Mon–Fri 8am–5pm',   tags: ['unilag', 'university', 'degree', 'education', 'campus'] },
  { name: "Queen's College",                  category: 'school',  lat: 6.5168, lng: 3.3620, address: 'Yaba, Lagos',                 phone: '',             hours: 'Mon–Fri 7am–4pm',   tags: ['secondary school', 'girls school', 'education', 'federal'] },
  { name: 'Igbobi College',                   category: 'school',  lat: 6.5210, lng: 3.3650, address: 'Igbobi, Yaba',               phone: '',             hours: 'Mon–Fri 7am–4pm',   tags: ['secondary school', 'boys school', 'education'] },
  { name: 'St. Finbarr\'s College',           category: 'school',  lat: 6.5145, lng: 3.3590, address: 'Akoka Road, Yaba',           phone: '',             hours: 'Mon–Fri 7am–4pm',   tags: ['secondary school', 'education', 'boys school'] },
  { name: 'LASCOHET',                         category: 'school',  lat: 6.5172, lng: 3.3530, address: 'Yaba, Lagos',                phone: '',             hours: 'Mon–Fri 8am–5pm',   tags: ['health technology', 'college', 'education', 'pharmacy'] },

  // MARKETS
  { name: 'Tejuosho Market',                  category: 'market',  lat: 6.5063, lng: 3.3631, address: 'Ojuelegba Road, Yaba',        phone: '',             hours: 'Daily 7am–7pm',     tags: ['rice', 'pepper', 'tomatoes', 'yam', 'beans', 'fabric', 'clothes', 'thrift', 'provisions'] },
  { name: 'Makoko Fish Market',               category: 'market',  lat: 6.4966, lng: 3.3896, address: 'Makoko, Yaba',               phone: '',             hours: 'Daily 6am–6pm',     tags: ['fish', 'seafood', 'fresh fish', 'catfish', 'tilapia'] },
  { name: 'Sabo Market',                      category: 'market',  lat: 6.5088, lng: 3.3760, address: 'Sabo, Yaba',                 phone: '',             hours: 'Daily 7am–7pm',     tags: ['rice', 'pepper', 'tomatoes', 'food', 'provisions', 'vegetables'] },
  { name: 'Yaba Market',                      category: 'market',  lat: 6.5100, lng: 3.3640, address: 'Yaba, Lagos',                phone: '',             hours: 'Daily 6am–7pm',     tags: ['thrift', 'clothes', 'shoes', 'second hand', 'food', 'provisions'] },
  { name: 'Tejuosho Shopping Complex',        category: 'market',  lat: 6.5060, lng: 3.3625, address: 'Ojuelegba Road, Yaba',       phone: '',             hours: 'Daily 9am–8pm',     tags: ['pharmacy', 'cosmetics', 'grocery', 'shopping', 'clothes'] },

  // BANKS
  { name: 'Zenith Bank Yaba',                 category: 'bank',    lat: 6.5121, lng: 3.3700, address: 'Herbert Macaulay Way',        phone: '01-278-7000',  hours: 'Mon–Fri 8am–4pm',   tags: ['atm', 'transfer', 'savings', 'banking', 'cash'] },
  { name: 'GTBank Yaba',                      category: 'bank',    lat: 6.5135, lng: 3.3650, address: 'Corporation Drive, Yaba',    phone: '01-448-0000',  hours: 'Mon–Fri 8am–4pm',   tags: ['atm', 'transfer', 'savings', 'banking', 'cash'] },
  { name: 'Access Bank Yaba',                 category: 'bank',    lat: 6.5110, lng: 3.3720, address: 'Yaba Bus Stop',              phone: '',             hours: 'Mon–Fri 8am–4pm',   tags: ['atm', 'transfer', 'savings', 'banking', 'cash'] },
  { name: 'First Bank Yaba',                  category: 'bank',    lat: 6.5098, lng: 3.3668, address: 'Herbert Macaulay Way, Yaba', phone: '',             hours: 'Mon–Fri 8am–4pm',   tags: ['atm', 'transfer', 'savings', 'banking', 'cash'] },
  { name: 'UBA Yaba',                         category: 'bank',    lat: 6.5115, lng: 3.3690, address: 'Yaba, Lagos',                phone: '',             hours: 'Mon–Fri 8am–4pm',   tags: ['atm', 'transfer', 'savings', 'banking', 'cash'] },

  // FOOD
  { name: 'Chicken Republic Yaba',            category: 'food',    lat: 6.5118, lng: 3.3688, address: 'Herbert Macaulay Way',       phone: '',             hours: 'Daily 9am–10pm',    tags: ['chicken', 'burger', 'chips', 'fast food', 'jollof', 'rice'] },
  { name: 'Mr Biggs Yaba',                    category: 'food',    lat: 6.5105, lng: 3.3670, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 9am–9pm',     tags: ['pies', 'snacks', 'fast food', 'eat', 'lunch'] },
  { name: 'Tantalizers Yaba',                 category: 'food',    lat: 6.5130, lng: 3.3660, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 9am–9pm',     tags: ['chicken', 'rice', 'fast food', 'jollof'] },
  { name: 'White House Restaurant',           category: 'food',    lat: 6.5092, lng: 3.3710, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 10am–10pm',   tags: ['amala', 'african food', 'nigerian food', 'restaurant', 'local food'] },
  { name: "Domino's Pizza Yaba",              category: 'food',    lat: 6.5078, lng: 3.3698, address: 'E-Centre, Commercial Ave',  phone: '',             hours: 'Daily 10am–10pm',   tags: ['pizza', 'fast food', 'delivery', 'eat'] },
  { name: 'Burger King Yaba',                 category: 'food',    lat: 6.5072, lng: 3.3685, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 9am–10pm',    tags: ['burger', 'fast food', 'chips', 'eat'] },
  { name: 'Pancake Hub',                      category: 'food',    lat: 6.5088, lng: 3.3720, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 7am–5pm',     tags: ['pancake', 'breakfast', 'eat', 'snacks'] },
  { name: 'Yin Yang Express',                 category: 'food',    lat: 6.5095, lng: 3.3705, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 11am–9pm',    tags: ['chinese food', 'rice', 'noodles', 'restaurant'] },

  // TECH HUBS
  { name: 'CcHUB',                            category: 'tech',    lat: 6.5148, lng: 3.3695, address: '294 Herbert Macaulay Way',   phone: '',             hours: 'Mon–Fri 8am–6pm',   tags: ['startup', 'incubator', 'coworking', 'tech', 'innovation'] },
  { name: 'Andela Lagos',                     category: 'tech',    lat: 6.5155, lng: 3.3710, address: 'Herbert Macaulay Way, Yaba', phone: '',             hours: 'Mon–Fri 8am–6pm',   tags: ['tech', 'software', 'developers', 'training', 'coding'] },

  // FUEL
  { name: 'Total Filling Station Yaba',       category: 'fuel',    lat: 6.5140, lng: 3.3630, address: 'Western Ave, Yaba',          phone: '',             hours: 'Daily 6am–10pm',    tags: ['petrol', 'diesel', 'gas', 'fuel', 'filling station'] },
  { name: 'NNPC Filling Station Yaba',        category: 'fuel',    lat: 6.5082, lng: 3.3655, address: 'Ojuelegba Road, Yaba',       phone: '',             hours: 'Daily 6am–10pm',    tags: ['petrol', 'diesel', 'gas', 'fuel', 'filling station'] },

  // TRANSIT
  { name: 'Yaba Bus Stop',                    category: 'transit', lat: 6.5112, lng: 3.3679, address: 'Herbert Macaulay Way',       phone: '',             hours: 'Daily',             tags: ['bus', 'danfo', 'okada', 'keke', 'transport'] },
  { name: 'Mobolaji Johnson Railway Station', category: 'transit', lat: 6.5130, lng: 3.3600, address: 'Yaba, Lagos',               phone: '',             hours: 'Daily 6am–9pm',     tags: ['train', 'rail', 'railway', 'transport', 'ibadan', 'commute'] },
  { name: 'Ojuelegba Bus Stop',               category: 'transit', lat: 6.5058, lng: 3.3620, address: 'Ojuelegba, Yaba',           phone: '',             hours: 'Daily',             tags: ['bus', 'danfo', 'BRT', 'transport', 'commute'] },

  // CINEMA & ENTERTAINMENT
  { name: 'Ozone Cinemas E-Centre',           category: 'cinema',  lat: 6.5070, lng: 3.3690, address: 'Commercial Ave, Yaba',       phone: '',             hours: 'Daily 10am–10pm',   tags: ['cinema', 'movies', 'film', 'entertainment', 'fun'] },
  { name: 'E-Centre Mall',                    category: 'market',  lat: 6.5068, lng: 3.3688, address: 'Commercial Ave, Yaba',       phone: '',             hours: 'Daily 9am–9pm',     tags: ['mall', 'shopping', 'cinema', 'restaurant', 'games'] },
];

let map, markers = [], clusterMarkers = [], activeCategory = 'all';

function getMeta(cat) {
  return CATEGORY_META[cat] || CATEGORY_META.other;
}

function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false })
    .setView([6.5120, 3.3700], 15);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  renderMarkers(POIS);
  renderList(POIS);

  map.on('click', closeCard);
  map.on('zoomend', () => {
    const filtered = getFiltered();
    renderMarkers(filtered);
  });

  document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());

  document.getElementById('locate-btn').addEventListener('click', () => {
    map.locate({ setView: true, maxZoom: 16 });
  });

  map.on('locationfound', (e) => {
    L.circleMarker(e.latlng, {
      radius: 8, color: '#1a7a4a', fillColor: '#1a7a4a', fillOpacity: 0.8, weight: 2
    }).addTo(map).bindPopup('You are here').openPopup();
  });
}

// ── CLUSTERING ──
function clusterPOIs(pois) {
  const zoom = map.getZoom();
  if (zoom >= 15) return { clusters: [], unclustered: pois };

  const gridSize = zoom <= 12 ? 0.02 : 0.008;
  const clusters = [];
  const used = new Set();

  pois.forEach((poi, i) => {
    if (used.has(i)) return;
    const cluster = [poi];
    used.add(i);

    pois.forEach((other, j) => {
      if (used.has(j)) return;
      if (Math.abs(poi.lat - other.lat) < gridSize && Math.abs(poi.lng - other.lng) < gridSize) {
        cluster.push(other);
        used.add(j);
      }
    });

    if (cluster.length > 1) {
      clusters.push({
        lat: cluster.reduce((s, p) => s + p.lat, 0) / cluster.length,
        lng: cluster.reduce((s, p) => s + p.lng, 0) / cluster.length,
        count: cluster.length,
        pois: cluster
      });
    } else {
      clusters.push({ ...poi, count: 1 });
    }
  });

  return {
    clusters: clusters.filter(c => c.count > 1),
    unclustered: clusters.filter(c => c.count === 1).map(c => {
      const p = pois.find(p => p.name === c.name);
      return p || c;
    })
  };
}

function renderMarkers(pois) {
  markers.forEach(m => map.removeLayer(m));
  clusterMarkers.forEach(m => map.removeLayer(m));
  markers = [];
  clusterMarkers = [];

  const { clusters, unclustered } = clusterPOIs(pois);

  // Draw clusters
  clusters.forEach(cl => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:36px;height:36px;
        background:#1a7a4a;
        color:#fff;
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:13px;font-weight:700;
        border:3px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
      ">${cl.count}</div>`,
      iconSize: [36, 36], iconAnchor: [18, 18],
    });
    const m = L.marker([cl.lat, cl.lng], { icon })
      .addTo(map)
      .on('click', () => map.setView([cl.lat, cl.lng], map.getZoom() + 2));
    clusterMarkers.push(m);
  });

  // Draw individual markers
  unclustered.forEach(poi => {
    const meta = getMeta(poi.category);
    const icon = L.divIcon({
      className: '',
      html: `<div class="lagis-marker" style="width:13px;height:13px;background:${meta.color};"></div>`,
      iconSize: [13, 13], iconAnchor: [6, 6],
    });
    const m = L.marker([poi.lat, poi.lng], { icon }).addTo(map)
      .on('click', e => {
        L.DomEvent.stopPropagation(e);
        openCard(poi);
        map.setView([poi.lat, poi.lng], Math.max(map.getZoom(), 16));
      });
    markers.push(m);
  });
}

function renderList(pois) {
  const list = document.getElementById('poi-list');
  document.getElementById('list-count').textContent = `${pois.length} place${pois.length !== 1 ? 's' : ''}`;
  list.innerHTML = '';

  if (!pois.length) {
    list.innerHTML = `<div style="padding:32px;text-align:center;color:#aaa;font-size:13px;">No results found</div>`;
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

function openCard(poi) {
  const meta = getMeta(poi.category);
  const badge = document.getElementById('card-badge');
  badge.textContent = meta.label;
  badge.style.background = meta.bg;
  badge.style.color = meta.color;

  document.getElementById('card-name').textContent = poi.name;
  document.getElementById('card-address').textContent = poi.address || '';

  const phoneRow = document.getElementById('meta-phone');
  document.getElementById('meta-phone-text').textContent = poi.phone;
  phoneRow.classList.toggle('hidden', !poi.phone);

  const hoursRow = document.getElementById('meta-hours');
  document.getElementById('meta-hours-text').textContent = poi.hours;
  hoursRow.classList.toggle('hidden', !poi.hours);

  document.getElementById('poi-card').classList.remove('hidden');
  collapseSheet();
}

function closeCard() {
  document.getElementById('poi-card').classList.add('hidden');
  document.querySelectorAll('.poi-item').forEach(i => i.classList.remove('active'));
}

document.getElementById('card-close').addEventListener('click', closeCard);

// ── BOTTOM SHEET DRAG ──
const sheet = document.getElementById('bottom-sheet');
let sheetState = 'mid';
let dragStartY = 0;
let dragStartHeight = 0;
let isDragging = false;

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

handle.addEventListener('touchstart', e => {
  isDragging = true;
  dragStartY = e.touches[0].clientY;
  dragStartHeight = sheet.offsetHeight;
  sheet.style.transition = 'none';
}, { passive: true });

handle.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const diff = dragStartY - e.touches[0].clientY;
  const newH = Math.min(Math.max(dragStartHeight + diff, 70), window.innerHeight * 0.85);
  sheet.style.height = newH + 'px';
}, { passive: true });

handle.addEventListener('touchend', () => {
  isDragging = false;
  const currentH = sheet.offsetHeight;
  const mid = getSheetHeight('mid');
  const expanded = getSheetHeight('expanded');
  if (currentH < 150) setSheet('collapsed');
  else if (currentH < (mid + expanded) / 2) setSheet('mid');
  else setSheet('expanded');
});

handle.addEventListener('click', () => {
  if (sheetState === 'collapsed') setSheet('mid');
  else if (sheetState === 'mid') setSheet('expanded');
  else setSheet('mid');
});

setSheet('mid');

// ── AI SEARCH ──
async function aiSearch(query) {
  const poiContext = POIS.map((p, i) =>
    `${i}: ${p.name} (${p.category}) - ${p.address} - offers: ${p.tags.join(', ')}`
  ).join('\n');

  const prompt = `You are a Lagos business directory assistant for Yaba, Nigeria.
A user searched: "${query}"

Here are the available places:
${poiContext}

Return ONLY a JSON array of index numbers (e.g. [0, 3, 7]) of places that best match.
Match by what they're looking for, not just name. Max 5 results. If nothing matches return [].
Return ONLY the JSON array, nothing else.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONFIG.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content[0].text.trim();
    const indices = JSON.parse(text);
    return indices.map(i => POIS[i]).filter(Boolean);
  } catch (e) {
    console.error('AI search failed:', e);
    return null;
  }
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
    const aiResults = await aiSearch(q);
    if (aiResults && aiResults.length > 0) {
      renderMarkers(aiResults);
      renderList(aiResults);
      document.getElementById('list-count').textContent = `${aiResults.length} AI result${aiResults.length !== 1 ? 's' : ''}`;
    } else {
      filterAndRender();
    }
  }, 600);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.add('hidden');
  filterAndRender();
});

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

function filterAndRender() {
  const filtered = getFiltered();
  renderMarkers(filtered);
  renderList(filtered);
}

initMap();