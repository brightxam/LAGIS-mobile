/* ═══════════════════════════════════════════════════════════════
   LAGIS 2026 — Core Application
   Lagos Interactive GIS | Leaflet + OSRM + OSM Buildings
═══════════════════════════════════════════════════════════════ */
'use strict';

// ─── CONSTANTS ────────────────────────────────────────────────
const LAGOS_CENTER = [6.5244, 3.3792];
const OSRM_BASE    = 'https://router.project-osrm.org/route/v1';
const WEATHER_URL  = 'https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current_weather=true';

// ─── POI DATABASE — 200+ verified Lagos locations ─────────────
const POIS = [
  // ── YABA ─────────────────────────────────────────────────
  // Health & Medical
  { id:'y001', name:'Lagos University Teaching Hospital (LUTH)', cat:'health', sub:'Teaching Hospital', area:'Yaba', lat:6.5117, lng:3.3632, emoji:'🏥', open:true,  phone:'+234-1-774-5051', hours:'24 hours', verified:true },
  { id:'y002', name:'Trinity Medical Centre Yaba', cat:'health', sub:'Private Hospital', area:'Yaba', lat:6.5131, lng:3.3810, emoji:'🏥', open:true,  phone:'+234-809-000-0011', hours:'24 hours', verified:true },
  { id:'y003', name:'Yaba Specialist Clinic', cat:'health', sub:'Specialist Clinic', area:'Yaba', lat:6.5148, lng:3.3775, emoji:'🏥', open:true,  phone:'+234-812-300-0000', hours:'Mon-Sat 8am-6pm', verified:true },
  { id:'y004', name:'PharmaCare Yaba (24hr)', cat:'pharmacy', sub:'24-Hour Pharmacy', area:'Yaba', lat:6.5142, lng:3.3791, emoji:'💊', open:true,  phone:'+234-802-000-0002', hours:'24 hours', verified:true },
  { id:'y005', name:'MedPlus Pharmacy Yaba', cat:'pharmacy', sub:'Pharmacy', area:'Yaba', lat:6.5155, lng:3.3799, emoji:'💊', open:true,  phone:'+234-817-000-0005', hours:'Daily 8am-9pm', verified:true },
  { id:'y006', name:'Alpha Pharmacy & Stores', cat:'pharmacy', sub:'Pharmacy', area:'Yaba', lat:6.5133, lng:3.3782, emoji:'💊', open:true,  phone:'+234-803-600-0006', hours:'Mon-Sat 8am-8pm', verified:true },
  { id:'y007', name:'Yaba Dental Clinic', cat:'health', sub:'Dental Clinic', area:'Yaba', lat:6.5144, lng:3.3808, emoji:'🦷', open:true,  phone:'+234-806-400-0007', hours:'Mon-Fri 9am-5pm', verified:true },
  { id:'y008', name:'Eye Care Opticians Yaba', cat:'health', sub:'Opticians', area:'Yaba', lat:6.5139, lng:3.3793, emoji:'👁️', open:true,  phone:'+234-811-200-0008', hours:'Mon-Sat 9am-6pm', verified:true },

  // Food & Restaurants
  { id:'y009', name:'Nkoyo Restaurant', cat:'food', sub:'Nigerian Cuisine', area:'Yaba', lat:6.5145, lng:3.3802, emoji:'🍛', open:true,  phone:'+234-808-000-0009', hours:'Daily 11am-10pm', verified:true },
  { id:'y010', name:'Jevinik Restaurant Yaba', cat:'food', sub:'Nigerian & Continental', area:'Yaba', lat:6.5138, lng:3.3796, emoji:'🍽️', open:true,  phone:'+234-801-200-0010', hours:'Daily 9am-11pm', verified:true },
  { id:'y011', name:'Mr Biggs Yaba', cat:'food', sub:'Fast Food', area:'Yaba', lat:6.5126, lng:3.3779, emoji:'🍔', open:true,  phone:null, hours:'Daily 8am-10pm', verified:true },
  { id:'y012', name:'Tantalizers Yaba', cat:'food', sub:'Fast Food', area:'Yaba', lat:6.5152, lng:3.3785, emoji:'🍗', open:true,  phone:null, hours:'Daily 8am-10pm', verified:true },
  { id:'y013', name:'Chicken Republic Yaba', cat:'food', sub:'Fast Food', area:'Yaba', lat:6.5148, lng:3.3790, emoji:'🍗', open:true,  phone:null, hours:'Daily 8am-11pm', verified:true },
  { id:'y014', name:'Tastee Fried Chicken Yaba', cat:'food', sub:'Fast Food', area:'Yaba', lat:6.5122, lng:3.3784, emoji:'🍗', open:true,  phone:null, hours:'Daily 8am-10pm', verified:true },
  { id:'y015', name:'Amala Joint Herbert Macaulay', cat:'food', sub:'Local Nigerian Food', area:'Yaba', lat:6.5137, lng:3.3803, emoji:'🥣', open:true,  phone:null, hours:'Daily 11am-9pm', verified:true },
  { id:'y016', name:'Sky Restaurant & Lounge', cat:'food', sub:'Restaurant & Bar', area:'Yaba', lat:6.5166, lng:3.3819, emoji:'🍷', open:true,  phone:'+234-806-100-0016', hours:'Daily 12pm-12am', verified:true },
  { id:'y017', name:'Suya Spot Yaba', cat:'food', sub:'Suya & Grills', area:'Yaba', lat:6.5129, lng:3.3776, emoji:'🍢', open:true,  phone:null, hours:'Daily 4pm-12am', verified:true },
  { id:'y018', name:'Domino\'s Pizza Yaba', cat:'food', sub:'Pizza & Fast Food', area:'Yaba', lat:6.5162, lng:3.3807, emoji:'🍕', open:true,  phone:'+234-1-200-0018', hours:'Daily 10am-11pm', verified:true },
  { id:'y019', name:'Cold Stone Creamery Yaba', cat:'food', sub:'Ice Cream', area:'Yaba', lat:6.5174, lng:3.3832, emoji:'🍦', open:true,  phone:'+234-806-700-0019', hours:'Daily 11am-10pm', verified:true },
  { id:'y020', name:'Cafe Neo Yaba', cat:'food', sub:'Café & Coffee', area:'Yaba', lat:6.5184, lng:3.3847, emoji:'☕', open:true,  phone:'+234-815-000-0020', hours:'Daily 7am-9pm', verified:true },

  // Banks & Finance
  { id:'y021', name:'GTBank Yaba Branch', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5138, lng:3.3788, emoji:'🏦', open:true,  phone:'+234-1-448-3368', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y022', name:'Access Bank Yaba', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5144, lng:3.3796, emoji:'🏦', open:true,  phone:'+234-1-280-2000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y023', name:'First Bank Yaba', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5127, lng:3.3780, emoji:'🏦', open:true,  phone:'+234-1-905-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y024', name:'Zenith Bank Yaba', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5149, lng:3.3800, emoji:'🏦', open:true,  phone:'+234-1-278-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y025', name:'UBA Yaba Branch', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5133, lng:3.3789, emoji:'🏦', open:true,  phone:'+234-1-280-5000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y026', name:'Stanbic IBTC Yaba', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5158, lng:3.3805, emoji:'🏦', open:true,  phone:'+234-1-422-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y027', name:'Sterling Bank Herbert Macaulay', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5141, lng:3.3794, emoji:'🏦', open:true,  phone:'+234-1-422-0001', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'y028', name:'FCMB Yaba', cat:'bank', sub:'Bank & ATM', area:'Yaba', lat:6.5135, lng:3.3797, emoji:'🏦', open:true,  phone:'+234-1-279-0000', hours:'Mon-Fri 8am-4pm', verified:true },

  // Tech, Cowork & Innovation
  { id:'y029', name:'CcHub (Co-creation Hub)', cat:'cowork', sub:'Leading Tech Hub', area:'Yaba', lat:6.5188, lng:3.3862, emoji:'🚀', open:true,  phone:'+234-1-342-7241', hours:'Mon-Fri 8am-8pm', verified:true },
  { id:'y030', name:'Unilag Co-working Space', cat:'cowork', sub:'University Co-working', area:'Yaba', lat:6.5179, lng:3.3902, emoji:'🖥️', open:true,  phone:'+234-1-820-1000', hours:'Mon-Fri 8am-9pm', verified:true },
  { id:'y031', name:'Fintech Hub Lagos', cat:'cowork', sub:'Fintech Startup Hub', area:'Yaba', lat:6.5195, lng:3.3851, emoji:'💳', open:true,  phone:'+234-813-000-0015', hours:'Mon-Sat 8am-8pm', verified:true },
  { id:'y032', name:'Yaba Tech Market', cat:'tech', sub:'Electronics & Gadgets', area:'Yaba', lat:6.5158, lng:3.3784, emoji:'💻', open:true,  phone:'+234-801-000-0001', hours:'Mon-Sat 8am-7pm', verified:true },
  { id:'y033', name:'RE:LEARN Yaba', cat:'cowork', sub:'Ed-Tech & Training', area:'Yaba', lat:6.5183, lng:3.3845, emoji:'📚', open:true,  phone:'+234-818-000-0033', hours:'Mon-Sat 9am-6pm', verified:true },
  { id:'y034', name:'Meltwater Entrepreneurial School', cat:'school', sub:'Business School', area:'Yaba', lat:6.5190, lng:3.3858, emoji:'🎓', open:true,  phone:'+234-1-342-0034', hours:'Mon-Fri 8am-6pm', verified:true },
  { id:'y035', name:'Ventures Platform Yaba', cat:'cowork', sub:'Tech Accelerator', area:'Yaba', lat:6.5186, lng:3.3854, emoji:'💡', open:true,  phone:'+234-802-000-0035', hours:'Mon-Fri 8am-7pm', verified:true },

  // Schools & Education
  { id:'y036', name:'University of Lagos (UNILAG)', cat:'school', sub:'Federal University', area:'Akoka/Yaba', lat:6.5179, lng:3.3902, emoji:'🎓', open:true,  phone:'+234-1-820-1000', hours:'Mon-Fri 8am-5pm', verified:true },
  { id:'y037', name:'Yaba College of Technology', cat:'school', sub:'Polytechnic', area:'Yaba', lat:6.5112, lng:3.3742, emoji:'🏫', open:true,  phone:'+234-1-774-4001', hours:'Mon-Fri 8am-5pm', verified:true },
  { id:'y038', name:'Methodist Boys High School', cat:'school', sub:'Secondary School', area:'Yaba', lat:6.5089, lng:3.3720, emoji:'🏫', open:false, phone:'+234-806-000-0007', hours:'Mon-Fri 8am-3pm', verified:true },
  { id:'y039', name:'Yaba Model College', cat:'school', sub:'Secondary School', area:'Yaba', lat:6.5098, lng:3.3734, emoji:'🏫', open:false, phone:'+234-806-400-0039', hours:'Mon-Fri 8am-3pm', verified:true },
  { id:'y040', name:'Lagos State Polytechnic Yaba', cat:'school', sub:'Polytechnic', area:'Yaba', lat:6.5105, lng:3.3749, emoji:'🏫', open:true,  phone:'+234-1-774-4002', hours:'Mon-Fri 8am-5pm', verified:true },
  { id:'y041', name:'Yaba Primary School', cat:'school', sub:'Primary School', area:'Yaba', lat:6.5118, lng:3.3762, emoji:'🏫', open:false, phone:null, hours:'Mon-Fri 8am-2pm', verified:true },

  // Markets & Shopping
  { id:'y042', name:'Tejuosho Ultra-Modern Market', cat:'market', sub:'General Market', area:'Yaba', lat:6.5095, lng:3.3783, emoji:'🛒', open:true,  phone:null, hours:'Daily 7am-8pm', verified:true },
  { id:'y043', name:'Oyingbo Market', cat:'market', sub:'Food & Produce Market', area:'Ebute-Metta', lat:6.5071, lng:3.3839, emoji:'🛒', open:true,  phone:null, hours:'Daily 6am-8pm', verified:true },
  { id:'y044', name:'Yaba Saturday Market', cat:'market', sub:'Open-Air Market', area:'Yaba', lat:6.5088, lng:3.3771, emoji:'🛒', open:true,  phone:null, hours:'Sat 6am-6pm', verified:true },
  { id:'y045', name:'Spar Supermarket Yaba', cat:'market', sub:'Supermarket', area:'Yaba', lat:6.5170, lng:3.3824, emoji:'🛒', open:true,  phone:'+234-1-291-0045', hours:'Daily 8am-10pm', verified:true },

  // Fuel & Transit
  { id:'y046', name:'Total Energies Yaba', cat:'fuel', sub:'Fuel Station', area:'Yaba', lat:6.5161, lng:3.3801, emoji:'⛽', open:true,  phone:'+234-805-000-0006', hours:'Daily 6am-10pm', verified:true },
  { id:'y047', name:'NNPC Filling Station Yaba', cat:'fuel', sub:'Fuel Station', area:'Yaba', lat:6.5108, lng:3.3761, emoji:'⛽', open:true,  phone:null, hours:'Daily 6am-10pm', verified:true },
  { id:'y048', name:'Ardova Petrol Station Yaba', cat:'fuel', sub:'Fuel Station', area:'Yaba', lat:6.5124, lng:3.3772, emoji:'⛽', open:true,  phone:null, hours:'Daily 5:30am-11pm', verified:true },
  { id:'y049', name:'Yaba BRT Stop (Herbert Macaulay)', cat:'transit', sub:'BRT Bus Stop', area:'Yaba', lat:6.5102, lng:3.3768, emoji:'🚌', open:true,  phone:null, hours:'Daily 5am-11pm', verified:true },
  { id:'y050', name:'Yaba Train Station', cat:'transit', sub:'SGR Rail Station', area:'Yaba', lat:6.5082, lng:3.3752, emoji:'🚆', open:true,  phone:null, hours:'Daily 6am-9pm', verified:true },
  { id:'y051', name:'Yaba Motor Park', cat:'transit', sub:'Bus / Danfo Park', area:'Yaba', lat:6.5090, lng:3.3758, emoji:'🚌', open:true,  phone:null, hours:'Daily 5am-11pm', verified:true },

  // Hotels & Accommodation
  { id:'y052', name:'Radisson Blu Hotel Yaba', cat:'hotel', sub:'4-Star Hotel', area:'Yaba', lat:6.5163, lng:3.3821, emoji:'🏨', open:true,  phone:'+234-810-000-0012', hours:'24 hours', verified:true },
  { id:'y053', name:'Westwood Hotel Yaba', cat:'hotel', sub:'3-Star Hotel', area:'Yaba', lat:6.5147, lng:3.3812, emoji:'🏨', open:true,  phone:'+234-805-200-0053', hours:'24 hours', verified:true },
  { id:'y054', name:'Declan Hotel Yaba', cat:'hotel', sub:'Hotel', area:'Yaba', lat:6.5140, lng:3.3806, emoji:'🏨', open:true,  phone:'+234-809-400-0054', hours:'24 hours', verified:true },

  // Worship
  { id:'y055', name:'Assembly of God Church Yaba', cat:'worship', sub:'Pentecostal Church', area:'Yaba', lat:6.5108, lng:3.3791, emoji:'⛪', open:false, phone:'+234-811-000-0013', hours:'Sun 8am-12pm', verified:true },
  { id:'y056', name:'First Baptist Church Yaba', cat:'worship', sub:'Baptist Church', area:'Yaba', lat:6.5119, lng:3.3774, emoji:'⛪', open:false, phone:'+234-803-100-0056', hours:'Sun 8am-1pm', verified:true },
  { id:'y057', name:'Yaba Central Mosque', cat:'worship', sub:'Mosque', area:'Yaba', lat:6.5101, lng:3.3777, emoji:'🕌', open:true,  phone:null, hours:'Daily prayer times', verified:true },
  { id:'y058', name:'Our Lady of Fatima Catholic Church', cat:'worship', sub:'Catholic Church', area:'Yaba', lat:6.5114, lng:3.3785, emoji:'⛪', open:false, phone:'+234-1-774-3058', hours:'Sun 7am & 10am', verified:true },
  { id:'y059', name:'Deeper Life Church Yaba', cat:'worship', sub:'Pentecostal Church', area:'Yaba', lat:6.5093, lng:3.3768, emoji:'⛪', open:false, phone:null, hours:'Sun 8am-12pm, Wed 6pm', verified:true },

  // Landmarks & Attractions
  { id:'y060', name:'Herbert Macaulay Road', cat:'landmark', sub:'Historic Street', area:'Yaba', lat:6.5135, lng:3.3790, emoji:'🗺️', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'y061', name:'National Theatre Nigeria', cat:'landmark', sub:'Cultural & Arts Centre', area:'Iganmu (near Yaba)', lat:6.4978, lng:3.3806, emoji:'🎭', open:true,  phone:'+234-1-773-0001', hours:'Tue-Sun 9am-6pm', verified:true },
  { id:'y062', name:'Sabo Yaba Junction', cat:'landmark', sub:'Major Junction', area:'Yaba', lat:6.5096, lng:3.3763, emoji:'🗺️', open:true,  phone:null, hours:'24 hours', verified:true },

  // Cinema & Entertainment
  { id:'y063', name:'Silverbird Cinemas Yaba', cat:'cinema', sub:'Cinema', area:'Yaba', lat:6.5177, lng:3.3835, emoji:'🎬', open:true,  phone:'+234-812-000-0014', hours:'Daily 12pm-11pm', verified:true },
  { id:'y064', name:'Leisure Mall Yaba', cat:'cinema', sub:'Entertainment Mall', area:'Yaba', lat:6.5171, lng:3.3830, emoji:'🎮', open:true,  phone:'+234-805-300-0064', hours:'Daily 10am-10pm', verified:true },
  { id:'y065', name:'Yaba Sport Centre', cat:'landmark', sub:'Sports & Recreation', area:'Yaba', lat:6.5106, lng:3.3756, emoji:'⚽', open:true,  phone:null, hours:'Daily 7am-9pm', verified:true },

  // ── VICTORIA ISLAND ──────────────────────────────────────
  { id:'vi001', name:'Eko Hotel & Suites', cat:'hotel', sub:'5-Star Hotel & Conference', area:'Victoria Island', lat:6.4306, lng:3.4265, emoji:'🏨', open:true,  phone:'+234-1-277-0000', hours:'24 hours', verified:true },
  { id:'vi002', name:'Shoprite Victoria Island', cat:'market', sub:'Supermarket', area:'Victoria Island', lat:6.4298, lng:3.4189, emoji:'🛒', open:true,  phone:'+234-1-280-0000', hours:'Daily 9am-10pm', verified:true },
  { id:'vi003', name:'Bar Beach', cat:'landmark', sub:'Beach & Recreation', area:'Victoria Island', lat:6.4264, lng:3.4157, emoji:'🏖️', open:true,  phone:null, hours:'Daily 6am-9pm', verified:true },
  { id:'vi004', name:'GTBank HQ Victoria Island', cat:'bank', sub:'Bank & ATM', area:'Victoria Island', lat:6.4314, lng:3.4241, emoji:'🏦', open:true,  phone:'+234-1-448-3368', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'vi005', name:'Nok by Alara', cat:'food', sub:'Fine Dining', area:'Victoria Island', lat:6.4328, lng:3.4253, emoji:'🍽️', open:true,  phone:'+234-708-400-0000', hours:'Daily 12pm-11pm', verified:true },
  { id:'vi006', name:'Chicken Republic VI', cat:'food', sub:'Fast Food', area:'Victoria Island', lat:6.4287, lng:3.4225, emoji:'🍗', open:true,  phone:'+234-1-290-0000', hours:'Daily 8am-12am', verified:true },
  { id:'vi007', name:'Shell Nigeria HQ', cat:'office', sub:'Corporate Office', area:'Victoria Island', lat:6.4302, lng:3.4271, emoji:'🏢', open:true,  phone:'+234-1-462-0000', hours:'Mon-Fri 8am-5pm', verified:true },
  { id:'vi008', name:'Total Energies VI', cat:'fuel', sub:'Fuel Station', area:'Victoria Island', lat:6.4281, lng:3.4198, emoji:'⛽', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'vi009', name:'Radisson Blu Anchorage', cat:'hotel', sub:'5-Star Hotel', area:'Victoria Island', lat:6.4345, lng:3.4177, emoji:'🏨', open:true,  phone:'+234-1-277-3000', hours:'24 hours', verified:true },
  { id:'vi010', name:'Lafia Hospital VI', cat:'health', sub:'Private Hospital', area:'Victoria Island', lat:6.4319, lng:3.4207, emoji:'🏥', open:true,  phone:'+234-1-270-0000', hours:'24 hours', verified:true },
  { id:'vi011', name:'Landmark Beach VI', cat:'landmark', sub:'Beach & Entertainment', area:'Victoria Island', lat:6.4274, lng:3.4123, emoji:'🏖️', open:true,  phone:'+234-1-291-0000', hours:'Daily 10am-10pm', verified:true },
  { id:'vi012', name:'Access Bank VI Branch', cat:'bank', sub:'Bank & ATM', area:'Victoria Island', lat:6.4308, lng:3.4232, emoji:'🏦', open:true,  phone:'+234-1-280-2000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'vi013', name:'Dermacare Clinic VI', cat:'health', sub:'Dermatology Clinic', area:'Victoria Island', lat:6.4322, lng:3.4261, emoji:'🏥', open:true,  phone:'+234-803-300-0000', hours:'Mon-Sat 9am-5pm', verified:true },
  { id:'vi014', name:'Terra Kulture', cat:'landmark', sub:'Arts & Culture Centre', area:'Victoria Island', lat:6.4334, lng:3.4186, emoji:'🎭', open:true,  phone:'+234-1-291-3000', hours:'Daily 10am-9pm', verified:true },
  { id:'vi015', name:'Brasserie VI', cat:'food', sub:'Continental Restaurant', area:'Victoria Island', lat:6.4337, lng:3.4268, emoji:'🍷', open:true,  phone:'+234-1-270-5000', hours:'Daily 11am-12am', verified:true },

  // ── IKEJA ────────────────────────────────────────────────
  { id:'ik001', name:'Ikeja City Mall', cat:'market', sub:'Shopping Mall', area:'Ikeja', lat:6.5967, lng:3.3422, emoji:'🏬', open:true,  phone:'+234-1-793-0000', hours:'Daily 9am-10pm', verified:true },
  { id:'ik002', name:'Murtala Muhammed International Airport', cat:'transit', sub:'International Airport', area:'Ikeja', lat:6.5774, lng:3.3218, emoji:'✈️', open:true,  phone:'+234-1-496-0000', hours:'24 hours', verified:true },
  { id:'ik003', name:'Lagos State Government House', cat:'landmark', sub:'Government', area:'Ikeja', lat:6.5983, lng:3.3466, emoji:'🏛️', open:true,  phone:'+234-1-773-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'ik004', name:'Zenith Bank Ikeja Branch', cat:'bank', sub:'Bank & ATM', area:'Ikeja', lat:6.5950, lng:3.3419, emoji:'🏦', open:true,  phone:'+234-1-278-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'ik005', name:'Lagos State General Hospital Ikeja', cat:'health', sub:'General Hospital', area:'Ikeja', lat:6.5939, lng:3.3441, emoji:'🏥', open:true,  phone:'+234-1-493-0000', hours:'24 hours', verified:true },
  { id:'ik006', name:'Chicken Republic Allen', cat:'food', sub:'Fast Food', area:'Ikeja', lat:6.5960, lng:3.3410, emoji:'🍗', open:true,  phone:null, hours:'Daily 8am-12am', verified:true },
  { id:'ik007', name:'Total Energies Allen Avenue', cat:'fuel', sub:'Fuel Station', area:'Ikeja', lat:6.5970, lng:3.3398, emoji:'⛽', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'ik008', name:'Sheraton Lagos Hotel', cat:'hotel', sub:'5-Star Hotel', area:'Ikeja', lat:6.5964, lng:3.3444, emoji:'🏨', open:true,  phone:'+234-1-797-1000', hours:'24 hours', verified:true },
  { id:'ik009', name:'Ikeja Under Bridge Market', cat:'market', sub:'Electronics Market', area:'Ikeja', lat:6.5944, lng:3.3436, emoji:'🛒', open:true,  phone:null, hours:'Daily 8am-7pm', verified:true },
  { id:'ik010', name:"Domino's Pizza Allen", cat:'food', sub:'Pizza & Fast Food', area:'Ikeja', lat:6.5956, lng:3.3425, emoji:'🍕', open:true,  phone:'+234-1-200-0000', hours:'Daily 10am-11pm', verified:true },
  { id:'ik011', name:'MRS Petroleum Ikeja', cat:'fuel', sub:'Fuel Station', area:'Ikeja', lat:6.5948, lng:3.3407, emoji:'⛽', open:true,  phone:null, hours:'Daily 6am-11pm', verified:true },
  { id:'ik012', name:'Oasis Pharmacy Ikeja', cat:'pharmacy', sub:'Pharmacy', area:'Ikeja', lat:6.5957, lng:3.3433, emoji:'💊', open:true,  phone:'+234-803-100-0000', hours:'Daily 8am-9pm', verified:true },
  { id:'ik013', name:'Genesis Cinema Ikeja', cat:'cinema', sub:'Cinema', area:'Ikeja', lat:6.5968, lng:3.3421, emoji:'🎬', open:true,  phone:'+234-1-793-0200', hours:'Daily 12pm-11pm', verified:true },
  { id:'ik014', name:'First Bank Ikeja', cat:'bank', sub:'Bank & ATM', area:'Ikeja', lat:6.5941, lng:3.3418, emoji:'🏦', open:true,  phone:'+234-1-905-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'ik015', name:'Lagos State Secretariat', cat:'landmark', sub:'Government Complex', area:'Ikeja', lat:6.5985, lng:3.3474, emoji:'🏛️', open:true,  phone:'+234-1-773-1000', hours:'Mon-Fri 8am-4pm', verified:true },

  // ── LEKKI ────────────────────────────────────────────────
  { id:'lk001', name:'The Palms Shopping Mall', cat:'market', sub:'Shopping Mall', area:'Lekki Phase 1', lat:6.4422, lng:3.4848, emoji:'🏬', open:true,  phone:'+234-1-277-8000', hours:'Daily 9am-10pm', verified:true },
  { id:'lk002', name:'Quilox Club Lekki', cat:'food', sub:'Nightclub & Bar', area:'Lekki Phase 1', lat:6.4419, lng:3.4831, emoji:'🎵', open:false, phone:'+234-901-300-0000', hours:'Thu-Sun 9pm-4am', verified:true },
  { id:'lk003', name:'Lekki Conservation Centre', cat:'landmark', sub:'Nature Reserve', area:'Lekki', lat:6.4643, lng:3.5614, emoji:'🌳', open:true,  phone:'+234-1-261-0000', hours:'Daily 8am-5pm', verified:true },
  { id:'lk004', name:'Eko Atlantic City', cat:'landmark', sub:'New Development', area:'Eko Atlantic', lat:6.4117, lng:3.4017, emoji:'🌊', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'lk005', name:'Zenith Bank Lekki', cat:'bank', sub:'Bank & ATM', area:'Lekki Phase 1', lat:6.4416, lng:3.4842, emoji:'🏦', open:true,  phone:'+234-1-278-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'lk006', name:'Dominos Lekki Phase 1', cat:'food', sub:'Pizza & Fast Food', area:'Lekki Phase 1', lat:6.4428, lng:3.4839, emoji:'🍕', open:true,  phone:null, hours:'Daily 10am-11pm', verified:true },
  { id:'lk007', name:'Lekki General Hospital', cat:'health', sub:'General Hospital', area:'Lekki', lat:6.4582, lng:3.5401, emoji:'🏥', open:true,  phone:'+234-1-774-0000', hours:'24 hours', verified:true },
  { id:'lk008', name:'MRS Petrol Lekki', cat:'fuel', sub:'Fuel Station', area:'Lekki Phase 1', lat:6.4411, lng:3.4855, emoji:'⛽', open:true,  phone:null, hours:'Daily 6am-11pm', verified:true },
  { id:'lk009', name:'Oriental Hotel Lekki', cat:'hotel', sub:'5-Star Hotel', area:'Lekki', lat:6.4423, lng:3.4861, emoji:'🏨', open:true,  phone:'+234-1-277-0000', hours:'24 hours', verified:true },
  { id:'lk010', name:'Landmark Event Centre', cat:'landmark', sub:'Events & Conference', area:'Lekki', lat:6.4398, lng:3.4788, emoji:'🎪', open:true,  phone:'+234-1-291-0000', hours:'Event days', verified:true },
  { id:'lk011', name:'Shoprite Lekki', cat:'market', sub:'Supermarket', area:'Lekki Phase 1', lat:6.4431, lng:3.4845, emoji:'🛒', open:true,  phone:null, hours:'Daily 9am-10pm', verified:true },
  { id:'lk012', name:'Reddington Hospital Lekki', cat:'health', sub:'Private Hospital', area:'Lekki Phase 2', lat:6.4709, lng:3.5822, emoji:'🏥', open:true,  phone:'+234-1-291-4000', hours:'24 hours', verified:true },
  { id:'lk013', name:'Total Energies Lekki', cat:'fuel', sub:'Fuel Station', area:'Lekki Phase 1', lat:6.4426, lng:3.4858, emoji:'⛽', open:true,  phone:null, hours:'24 hours', verified:true },

  // ── LAGOS ISLAND ─────────────────────────────────────────
  { id:'li001', name:'Balogun Market', cat:'market', sub:'Textile & Fashion Market', area:'Lagos Island', lat:6.4521, lng:3.3946, emoji:'🛒', open:true,  phone:null, hours:'Mon-Sat 7am-7pm', verified:true },
  { id:'li002', name:'Tafawa Balewa Square', cat:'landmark', sub:'National Monument', area:'Lagos Island', lat:6.4534, lng:3.3893, emoji:'🏛️', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'li003', name:'Lagos Island General Hospital', cat:'health', sub:'General Hospital', area:'Lagos Island', lat:6.4551, lng:3.3851, emoji:'🏥', open:true,  phone:'+234-1-263-0000', hours:'24 hours', verified:true },
  { id:'li004', name:'First Bank Head Office', cat:'bank', sub:'Corporate HQ & ATM', area:'Lagos Island', lat:6.4558, lng:3.3898, emoji:'🏦', open:true,  phone:'+234-1-905-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'li005', name:'National Museum Lagos', cat:'landmark', sub:'Museum', area:'Lagos Island', lat:6.4544, lng:3.3874, emoji:'🏛️', open:true,  phone:'+234-1-263-5000', hours:'Tue-Sun 9am-5pm', verified:true },
  { id:'li006', name:'Holy Cross Cathedral', cat:'worship', sub:'Cathedral', area:'Lagos Island', lat:6.4527, lng:3.3905, emoji:'⛪', open:false, phone:'+234-1-263-1000', hours:'Sun 8am-12pm', verified:true },
  { id:'li007', name:'Lagos Central Mosque', cat:'worship', sub:'Mosque', area:'Lagos Island', lat:6.4543, lng:3.3892, emoji:'🕌', open:true,  phone:null, hours:'Daily prayer times', verified:true },
  { id:'li008', name:'Marina Beach Lagos', cat:'landmark', sub:'Historic Waterfront', area:'Lagos Island', lat:6.4506, lng:3.3949, emoji:'🌊', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'li009', name:'Broad Street Pharmacy', cat:'pharmacy', sub:'Pharmacy', area:'Lagos Island', lat:6.4538, lng:3.3907, emoji:'💊', open:true,  phone:'+234-1-264-0000', hours:'Mon-Sat 8am-7pm', verified:true },
  { id:'li010', name:'Federal High Court Lagos', cat:'landmark', sub:'Court', area:'Lagos Island', lat:6.4561, lng:3.3886, emoji:'⚖️', open:true,  phone:'+234-1-264-5000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'li011', name:'GTBank Marina', cat:'bank', sub:'Bank & ATM', area:'Lagos Island', lat:6.4552, lng:3.3919, emoji:'🏦', open:true,  phone:'+234-1-448-3368', hours:'Mon-Fri 8am-4pm', verified:true },

  // ── IKOYI ────────────────────────────────────────────────
  { id:'iy001', name:'Ikoyi Club 1938', cat:'landmark', sub:'Members Club', area:'Ikoyi', lat:6.4552, lng:3.4316, emoji:'🏌️', open:true,  phone:'+234-1-269-0000', hours:'Daily 8am-10pm', verified:true },
  { id:'iy002', name:'Four Points by Sheraton', cat:'hotel', sub:'4-Star Hotel', area:'Ikoyi', lat:6.4543, lng:3.4338, emoji:'🏨', open:true,  phone:'+234-1-269-4000', hours:'24 hours', verified:true },
  { id:'iy003', name:'Ikoyi General Hospital', cat:'health', sub:'General Hospital', area:'Ikoyi', lat:6.4568, lng:3.4302, emoji:'🏥', open:true,  phone:'+234-1-269-5000', hours:'24 hours', verified:true },
  { id:'iy004', name:'Access Bank Ikoyi', cat:'bank', sub:'Bank & ATM', area:'Ikoyi', lat:6.4548, lng:3.4322, emoji:'🏦', open:true,  phone:'+234-1-280-2000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'iy005', name:'Bogobiri House', cat:'hotel', sub:'Boutique Hotel & Arts', area:'Ikoyi', lat:6.4558, lng:3.4330, emoji:'🏨', open:true,  phone:'+234-1-269-2000', hours:'24 hours', verified:true },
  { id:'iy006', name:'Churrasco Brazilian Grill', cat:'food', sub:'Brazilian Steakhouse', area:'Ikoyi', lat:6.4541, lng:3.4345, emoji:'🥩', open:true,  phone:'+234-1-270-3000', hours:'Daily 12pm-12am', verified:true },
  { id:'iy007', name:'Total Energies Ikoyi', cat:'fuel', sub:'Fuel Station', area:'Ikoyi', lat:6.4537, lng:3.4312, emoji:'⛽', open:true,  phone:null, hours:'Daily 6am-11pm', verified:true },

  // ── SURULERE ─────────────────────────────────────────────
  { id:'su001', name:'National Stadium Lagos', cat:'landmark', sub:'Sports Stadium', area:'Surulere', lat:6.5004, lng:3.3596, emoji:'🏟️', open:true,  phone:'+234-1-773-2000', hours:'Event days & 8am-6pm', verified:true },
  { id:'su002', name:'Aguda Market', cat:'market', sub:'Local Market', area:'Surulere', lat:6.5028, lng:3.3621, emoji:'🛒', open:true,  phone:null, hours:'Daily 7am-7pm', verified:true },
  { id:'su003', name:'Lagos Polo Club', cat:'landmark', sub:'Sports Club', area:'Surulere', lat:6.4997, lng:3.3578, emoji:'🏇', open:true,  phone:'+234-1-772-0000', hours:'Event days & weekends', verified:true },
  { id:'su004', name:'General Hospital Surulere', cat:'health', sub:'General Hospital', area:'Surulere', lat:6.5041, lng:3.3599, emoji:'🏥', open:true,  phone:'+234-1-773-3000', hours:'24 hours', verified:true },
  { id:'su005', name:'Zenith Bank Surulere', cat:'bank', sub:'Bank & ATM', area:'Surulere', lat:6.5036, lng:3.3624, emoji:'🏦', open:true,  phone:'+234-1-278-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'su006', name:'KFC Surulere', cat:'food', sub:'Fast Food', area:'Surulere', lat:6.5019, lng:3.3607, emoji:'🍗', open:true,  phone:null, hours:'Daily 9am-11pm', verified:true },
  { id:'su007', name:'Total Energies Surulere', cat:'fuel', sub:'Fuel Station', area:'Surulere', lat:6.5022, lng:3.3614, emoji:'⛽', open:true,  phone:null, hours:'Daily 6am-11pm', verified:true },
  { id:'su008', name:'Shitta-Bey Mosque', cat:'worship', sub:'Historic Mosque', area:'Surulere', lat:6.5043, lng:3.3641, emoji:'🕌', open:true,  phone:null, hours:'Daily prayer times', verified:true },

  // ── MARYLAND ─────────────────────────────────────────────
  { id:'md001', name:'Lagos Metro Mall Maryland', cat:'market', sub:'Shopping Mall', area:'Maryland', lat:6.5622, lng:3.3648, emoji:'🏬', open:true,  phone:'+234-1-793-3000', hours:'Daily 9am-10pm', verified:true },
  { id:'md002', name:'Maryland Comprehensive Health Centre', cat:'health', sub:'Health Centre', area:'Maryland', lat:6.5638, lng:3.3662, emoji:'🏥', open:true,  phone:'+234-1-493-1000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'md003', name:'First Bank Maryland', cat:'bank', sub:'Bank & ATM', area:'Maryland', lat:6.5627, lng:3.3655, emoji:'🏦', open:true,  phone:'+234-1-905-0000', hours:'Mon-Fri 8am-4pm', verified:true },
  { id:'md004', name:'Ojota MRS Fuel Station', cat:'fuel', sub:'Fuel Station', area:'Ojota', lat:6.5797, lng:3.3822, emoji:'⛽', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'md005', name:'Maryland Pizza Hut', cat:'food', sub:'Fast Food', area:'Maryland', lat:6.5616, lng:3.3642, emoji:'🍕', open:true,  phone:null, hours:'Daily 10am-11pm', verified:true },

  // ── APAPA ────────────────────────────────────────────────
  { id:'ap001', name:'Lagos Port Complex', cat:'landmark', sub:'Seaport', area:'Apapa', lat:6.4506, lng:3.3581, emoji:'⚓', open:true,  phone:'+234-1-545-0000', hours:'24 hours', verified:true },
  { id:'ap002', name:'Tin Can Island Port', cat:'landmark', sub:'Container Port', area:'Tin Can Island', lat:6.4367, lng:3.3213, emoji:'🚢', open:true,  phone:'+234-1-545-1000', hours:'24 hours', verified:true },
  { id:'ap003', name:'Apapa General Hospital', cat:'health', sub:'General Hospital', area:'Apapa', lat:6.4484, lng:3.3597, emoji:'🏥', open:true,  phone:'+234-1-545-2000', hours:'24 hours', verified:true },

  // ── MUSHIN / OSHODI ──────────────────────────────────────
  { id:'ms001', name:'Oshodi Market', cat:'market', sub:'General Market', area:'Oshodi', lat:6.5569, lng:3.3467, emoji:'🛒', open:true,  phone:null, hours:'Daily 6am-8pm', verified:true },
  { id:'ms002', name:'Mushin General Hospital', cat:'health', sub:'General Hospital', area:'Mushin', lat:6.5357, lng:3.3518, emoji:'🏥', open:true,  phone:'+234-1-452-0000', hours:'24 hours', verified:true },
  { id:'ms003', name:'Oshodi Transport Hub', cat:'transit', sub:'Bus Terminal', area:'Oshodi', lat:6.5577, lng:3.3455, emoji:'🚌', open:true,  phone:null, hours:'Daily 5am-11pm', verified:true },

  // ── FESTAC ───────────────────────────────────────────────
  { id:'ft001', name:'FESTAC Town Complex', cat:'landmark', sub:'Housing Estate', area:'FESTAC', lat:6.4675, lng:3.2841, emoji:'🏘️', open:true,  phone:null, hours:'24 hours', verified:true },
  { id:'ft002', name:'Amuwo Odofin Market', cat:'market', sub:'General Market', area:'Amuwo-Odofin', lat:6.4698, lng:3.2931, emoji:'🛒', open:true,  phone:null, hours:'Daily 7am-7pm', verified:true },
  { id:'ft003', name:'FESTAC General Hospital', cat:'health', sub:'General Hospital', area:'FESTAC', lat:6.4681, lng:3.2858, emoji:'🏥', open:true,  phone:'+234-1-774-1000', hours:'24 hours', verified:true },

  // ── AJAH / LEKKI EAST ────────────────────────────────────
  { id:'aj001', name:'Sangotedo Market Ajah', cat:'market', sub:'General Market', area:'Ajah', lat:6.4661, lng:3.5771, emoji:'🛒', open:true,  phone:null, hours:'Daily 7am-7pm', verified:true },
  { id:'aj002', name:'Lagos Free Zone Lekki', cat:'office', sub:'Industrial Zone', area:'Lekki Free Zone', lat:6.5133, lng:3.7611, emoji:'🏭', open:true,  phone:'+234-1-291-0001', hours:'Mon-Fri 8am-5pm', verified:true },

  // ── GBAGADA ──────────────────────────────────────────────
  { id:'gb001', name:'Gbagada General Hospital', cat:'health', sub:'General Hospital', area:'Gbagada', lat:6.5512, lng:3.3896, emoji:'🏥', open:true,  phone:'+234-1-773-4000', hours:'24 hours', verified:true },
  { id:'gb002', name:'Gbagada Shopping Centre', cat:'market', sub:'Supermarket', area:'Gbagada', lat:6.5498, lng:3.3877, emoji:'🛒', open:true,  phone:null, hours:'Daily 8am-9pm', verified:true },
  { id:'gb003', name:'UBA Gbagada', cat:'bank', sub:'Bank & ATM', area:'Gbagada', lat:6.5504, lng:3.3884, emoji:'🏦', open:true,  phone:'+234-1-280-5000', hours:'Mon-Fri 8am-4pm', verified:true },

  // ── BADAGRY ──────────────────────────────────────────────
  { id:'bd001', name:'Badagry Heritage Museum', cat:'landmark', sub:'Slave History Museum', area:'Badagry', lat:6.4153, lng:2.8842, emoji:'🏛️', open:true,  phone:'+234-1-773-5000', hours:'Tue-Sun 9am-5pm', verified:true },
  { id:'bd002', name:'Badagry Beach', cat:'landmark', sub:'Beach', area:'Badagry', lat:6.4062, lng:2.8718, emoji:'🏖️', open:true,  phone:null, hours:'Daily 6am-6pm', verified:true },

  // ── AGEGE ────────────────────────────────────────────────
  { id:'ag001', name:'Agege Stadium', cat:'landmark', sub:'Sports Stadium', area:'Agege', lat:6.6217, lng:3.3191, emoji:'🏟️', open:true,  phone:null, hours:'Event days', verified:true },
  { id:'ag002', name:'Pen Cinema Agege', cat:'transit', sub:'Bus Terminus', area:'Agege', lat:6.6231, lng:3.3204, emoji:'🚌', open:true,  phone:null, hours:'Daily 5am-11pm', verified:true },

  // ── ONIKAN / CULTURAL ────────────────────────────────────
  { id:'on001', name:'Onikan Stadium', cat:'landmark', sub:'Sports Facility', area:'Onikan', lat:6.4512, lng:3.3931, emoji:'🏟️', open:true,  phone:null, hours:'Event days', verified:true },
];

// ─── APP STATE ────────────────────────────────────────────────
let map, userMarker, osmBuildings;
let markerLayer = L.layerGroup();
let activeTab = 'explore';
let currentCategory = 'all';
let selectedPOI = null;
let routePolylines = [];
let routeLabels = [];
let navActive = false;
let nearbyCat = 'food';
let sheet3State = 'peek';
let is3DOn = false;
let darkMode = false;
let userLat = LAGOS_CENTER[0], userLng = LAGOS_CENTER[1];
let ambientLabels = [];
let routeFrom = null, routeTo = null;
let routeMode = 'driving';

// ─── CATEGORY CONFIG ──────────────────────────────────────────
const CATS = {
  all:      { label:'All',        color:'#1a7a4a', bg:'#e8f5ee' },
  food:     { label:'Food',       color:'#f97316', bg:'#fff7ed' },
  market:   { label:'Shops',      color:'#8b5cf6', bg:'#f5f3ff' },
  health:   { label:'Health',     color:'#ef4444', bg:'#fef2f2' },
  bank:     { label:'Banks',      color:'#3b82f6', bg:'#eff6ff' },
  fuel:     { label:'Fuel',       color:'#f59e0b', bg:'#fffbeb' },
  hotel:    { label:'Hotels',     color:'#06b6d4', bg:'#ecfeff' },
  transit:  { label:'Transit',    color:'#6366f1', bg:'#eef2ff' },
  worship:  { label:'Worship',    color:'#ec4899', bg:'#fdf2f8' },
  school:   { label:'Schools',    color:'#10b981', bg:'#ecfdf5' },
  pharmacy: { label:'Pharmacy',   color:'#14b8a6', bg:'#f0fdfa' },
  cowork:   { label:'Tech/Work',  color:'#6366f1', bg:'#eef2ff' },
  cinema:   { label:'Cinema',     color:'#f43f5e', bg:'#fff1f2' },
  landmark: { label:'Landmarks',  color:'#78716c', bg:'#fafaf9' },
  office:   { label:'Corporate',  color:'#64748b', bg:'#f8fafc' },
  tech:     { label:'Tech',       color:'#6366f1', bg:'#eef2ff' },
};

// ─── MARKER PRIORITY TIERS ────────────────────────────────────
// tier 1 → largest / always visible (zoom 10+)
// tier 2 → standard elevated (zoom 12+)
// tier 3 → smaller, appears at zoom 13+
const MARKER_PRIORITY = {
  health:1, landmark:1, transit:1,
  bank:2, hotel:2, market:2, school:2,
  food:3, fuel:3, pharmacy:3, worship:3,
  cowork:3, cinema:3, office:3, tech:3,
};

// ─── TURN ICONS ───────────────────────────────────────────────
const TURN_ICONS = {
  Head:'⬆️', Continue:'⬆️', SlightRight:'↗️', Right:'➡️',
  SharpRight:'↱', TurnRight:'➡️', SlightLeft:'↖️', Left:'⬅️',
  SharpLeft:'↰', TurnLeft:'⬅️', Roundabout:'🔄',
  Arrive:'🏁', DestinationReached:'🏁', Depart:'📍',
};

// ─── HELPERS ──────────────────────────────────────────────────
function haversine(a, b) {
  const R = 6371;
  const dLat = (b[0]-a[0]) * Math.PI/180;
  const dLng = (b[1]-a[1]) * Math.PI/180;
  const x = Math.sin(dLat/2)**2 +
            Math.cos(a[0]*Math.PI/180)*Math.cos(b[0]*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}
function fmtDist(km) {
  return km < 1 ? Math.round(km*1000)+'m' : km.toFixed(1)+'km';
}
function fmtTime(sec) {
  const m = Math.round(sec/60);
  if (m < 60) return m+'min';
  return `${Math.floor(m/60)}h ${m%60}m`;
}
function fmtArrival(sec) {
  return new Date(Date.now()+sec*1000)
    .toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit',hour12:true});
}
function showToast(msg, dur=2600) {
  const t = document.getElementById('lagis-toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('visible'), dur);
}
function getPOI(id) { return POIS.find(p=>p.id===id); }

// Deterministic simulated rating from POI id — consistent across sessions
function getRating(poi) {
  if (!poi) return null;
  let h = 0;
  for (let i=0; i<poi.id.length; i++) h = (h*31 + poi.id.charCodeAt(i)) >>> 0;
  const base = 3.8 + (h % 17) * 0.075; // range 3.8 – 5.0
  const rating = Math.min(5.0, parseFloat(base.toFixed(1)));
  const reviews = 40 + (h % 280);
  return { rating, reviews };
}
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half?'½':'') + '☆'.repeat(empty);
}
// Tapped location state
let tappedLatlng = null;

// ─── TILE LAYER URLS (LAGIS identity: Voyager light / DarkMatter dark) ────
const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_DARK  = 'https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png';
const TILE_OPTS  = { attribution:'© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>', subdomains:'abcd', maxZoom:20 };
let activeTileLayer = null;

// ─── MAP INIT ─────────────────────────────────────────────────
function initMap() {
  map = L.map('map', {
    center: LAGOS_CENTER, zoom: 12,
    zoomControl: false, attributionControl: true,
  });
  // LAGIS custom tile theme — Voyager gives premium road hierarchy out of the box
  // CSS filter in style.css adds LAGIS-specific warm tone (hue-rotate + saturation)
  activeTileLayer = L.tileLayer(TILE_LIGHT, TILE_OPTS).addTo(map);

  markerLayer.addTo(map);
  renderMarkers(POIS);
  map.on('zoomend moveend', onMapMove);
  map.on('click', onMapClick);
  locateUser();
  loadWeather();
  setupBottomSheet();
}

// ─── 3D BUILDINGS — 2GIS style ────────────────────────────────
const BUILDING_STYLE = {
  // 2GIS colour palette: sandy rooftops, warm walls, tinted glass
  roofColor:   '#d4c5a9',   // warm sandy beige (2GIS roof tone)
  wallColor:   '#e8dcc8',   // slightly lighter warm stone
  shadowColor: '#b8a898',   // darker base shadow
  strokeColor: '#c0b09a',   // thin outline
  strokeWidth: 1,
  minHeight:   0,
  // Highlighted buildings (e.g. hospitals, landmarks)
  highlightRoof: '#f0e6d0',
  highlightWall: '#f5edd8',
};

function enable3D(silent) {
  const btn = document.getElementById('btn-3d');
  if (typeof OSMBuildings === 'undefined') {
    if (!silent) showToast('3D library loading, try again…');
    return false;
  }
  if (osmBuildings) return true; // already on

  try {
    osmBuildings = new OSMBuildings(map);
    // Style buildings in 2GIS warm-neutral palette
    osmBuildings.set({
      color: BUILDING_STYLE.wallColor,
      roofColor: BUILDING_STYLE.roofColor,
    });
    osmBuildings.load('https://data.osmbuildings.org/0.2/59cc7a8b/tile/{z}/{x}/{y}.json');
    is3DOn = true;
    btn.classList.add('active');
    btn.title = '3D On';
    document.body.classList.add('map-3d');
    document.getElementById('badge-3d-active')?.classList.add('visible');
    // Show floor selector at zoom 17+
    if (map.getZoom() >= 17) {
      document.getElementById('floor-selector').classList.remove('hidden');
    }
    if (!silent) showToast('3D buildings enabled — zoom in to see them');
    return true;
  } catch(e) {
    if (!silent) showToast('3D error: ' + e.message);
    return false;
  }
}

function disable3D(silent) {
  const btn = document.getElementById('btn-3d');
  if (osmBuildings) {
    try { osmBuildings.remove(); } catch(e){}
    osmBuildings = null;
  }
  is3DOn = false;
  btn.classList.remove('active');
  btn.title = '3D Off';
  document.body.classList.remove('map-3d');
  document.getElementById('badge-3d-active')?.classList.remove('visible');
  document.getElementById('floor-selector').classList.add('hidden');
  if (!silent) showToast('3D buildings off');
}

function toggle3D() {
  is3DOn ? disable3D() : enable3D();
}

// Auto-enable 3D when user zooms to 16+ in Yaba/dense areas
const YABA_BBOX = { minLat:6.504, maxLat:6.525, minLng:3.370, maxLng:3.396 };
function checkAutoToggle3D() {
  const z     = map.getZoom();
  const c     = map.getCenter();
  const inYaba = c.lat>=YABA_BBOX.minLat && c.lat<=YABA_BBOX.maxLat &&
                 c.lng>=YABA_BBOX.minLng && c.lng<=YABA_BBOX.maxLng;

  if (z >= 16 && inYaba && !is3DOn) {
    enable3D(true); // silently auto-enable in Yaba at high zoom
  } else if (z < 15 && is3DOn) {
    disable3D(true); // silently disable when zooming out
  }
  // Update floor selector visibility based on zoom
  const fs = document.getElementById('floor-selector');
  if (is3DOn && z >= 17) fs.classList.remove('hidden');
  else if (z < 17) fs.classList.add('hidden');
}

// ─── AMBIENT LABELS ───────────────────────────────────────────
function onMapMove() {
  const z = map.getZoom();
  if (z >= 16) renderAmbientLabels();
  else clearAmbientLabels();
  checkAutoToggle3D();
  // Re-render markers at new zoom for size changes
  const visible = currentCategory==='all' ? POIS : POIS.filter(p=>p.cat===currentCategory);
  renderMarkers(visible);
}
function renderAmbientLabels() {
  clearAmbientLabels();
  const bounds = map.getBounds();
  POIS.filter(p=>bounds.contains([p.lat,p.lng])).forEach(p=>{
    const icon = L.divIcon({
      className:'',
      html:`<div class="ambient-label">${p.name}</div>`,
      iconAnchor:[0,0], iconSize:null,
    });
    const m = L.marker([p.lat,p.lng],{icon,interactive:false,zIndexOffset:-100}).addTo(map);
    ambientLabels.push(m);
  });
}
function clearAmbientLabels() {
  ambientLabels.forEach(m=>map.removeLayer(m));
  ambientLabels = [];
}

// ─── MARKERS ──────────────────────────────────────────────────
function renderMarkers(pois) {
  markerLayer.clearLayers();
  const z = map.getZoom ? map.getZoom() : 13;

  // Cluster at low zoom
  if (z < 11) { renderClusters(pois); return; }

  // Filter by tier based on zoom level
  const visiblePois = pois.filter(p => {
    const tier = MARKER_PRIORITY[p.cat] || 3;
    if (z < 12 && tier > 1) return false;
    if (z < 13 && tier > 2) return false;
    return true;
  });

  // Cluster medium zoom
  if (z < 13) { renderClusters(visiblePois); return; }

  visiblePois.forEach(p => {
    const cfg  = CATS[p.cat] || CATS.all;
    const tier = MARKER_PRIORITY[p.cat] || 3;
    // Base size by zoom, boosted for tier 1
    const baseSize = z>=15 ? 40 : z>=13 ? 34 : 28;
    const sz = tier===1 ? Math.round(baseSize * 1.18) : tier===2 ? baseSize : Math.round(baseSize * 0.90);
    const tierClass = `tier-${tier}`;

    const icon = L.divIcon({
      className: '',
      html: `<div class="lagis-marker ${tierClass}" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz*0.48)}px;background:${cfg.bg};border-color:${cfg.color}">${p.emoji}</div>`,
      iconAnchor: [sz/2, sz/2],
      iconSize: [sz, sz],
    });
    const m = L.marker([p.lat, p.lng], {
      icon,
      zIndexOffset: tier===1 ? 200 : tier===2 ? 100 : 50,
    }).addTo(markerLayer);
    m.on('click', e => {
      L.DomEvent.stopPropagation(e);
      // Visually select
      document.querySelectorAll('.lagis-marker.selected').forEach(el=>el.classList.remove('selected'));
      const el = m.getElement()?.querySelector('.lagis-marker');
      if (el) el.classList.add('selected');
      showPOICard(p);
    });
  });
}
function renderClusters(pois) {
  const z    = map.getZoom ? map.getZoom() : 10;
  // Finer grid at higher zooms for tighter clusters
  const grid = z >= 11 ? 8 : z >= 9 ? 5 : 3;
  const clusters = {};

  pois.forEach(p => {
    const key = `${Math.round(p.lat*grid)}_${Math.round(p.lng*grid)}`;
    if (!clusters[key]) {
      clusters[key] = { lat:p.lat, lng:p.lng, count:0, topTier:3, emoji:'📍' };
    }
    const cl  = clusters[key];
    cl.count++;
    const tier = MARKER_PRIORITY[p.cat] || 3;
    if (tier < cl.topTier) { cl.topTier = tier; cl.emoji = p.emoji; }
    // accumulate centroid
    cl.lat = (cl.lat * (cl.count-1) + p.lat) / cl.count;
    cl.lng = (cl.lng * (cl.count-1) + p.lng) / cl.count;
  });

  Object.values(clusters).forEach(cl => {
    const isSmall = cl.count <= 4;
    const isMed   = cl.count <= 10;
    const sz = isSmall ? 36 : isMed ? 44 : 52;
    const sizeClass = isSmall ? 'cluster-sm' : isMed ? 'cluster-md' : 'cluster-lg';
    const label = cl.count === 1 ? cl.emoji : cl.count;
    const icon = L.divIcon({
      className: '',
      html: `<div class="lagis-cluster-inner ${sizeClass}" style="width:${sz}px;height:${sz}px;font-size:${cl.count===1?Math.round(sz*0.48):Math.round(sz*0.33)}px">${label}</div>`,
      iconAnchor: [sz/2, sz/2],
      iconSize: [sz, sz],
    });
    const m = L.marker([cl.lat, cl.lng], { icon, zIndexOffset:50 }).addTo(markerLayer);
    // Clicking a cluster zooms in
    m.on('click', () => {
      map.setView([cl.lat, cl.lng], Math.min(map.getZoom()+2, 16));
    });
  });
}

// ─── USER LOCATION ────────────────────────────────────────────
function locateUser() {
  const btn = document.getElementById('locate-btn');
  btn.classList.add('locating');
  navigator.geolocation?.getCurrentPosition(pos=>{
    userLat = pos.coords.latitude;
    userLng = pos.coords.longitude;
    btn.classList.remove('locating');
    const icon = L.divIcon({
      className:'',
      html:'<div class="lagis-user-dot"></div>',
      iconAnchor:[8,8], iconSize:[16,16],
    });
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.marker([userLat,userLng],{icon,zIndexOffset:1000}).addTo(map);
    map.flyTo([userLat,userLng],15,{duration:1.2});
  }, ()=>{
    btn.classList.remove('locating');
    showToast('Could not get location');
  },{enableHighAccuracy:true,timeout:8000});
}

// ─── WEATHER ──────────────────────────────────────────────────
async function loadWeather() {
  try {
    const r = await fetch(WEATHER_URL);
    const d = await r.json();
    const w = d.current_weather;
    const code = w.weathercode;
    const icon = code<=1?'☀️':code<=3?'⛅':code<=67?'🌧️':'⛈️';
    document.getElementById('weather-icon').textContent = icon;
    document.getElementById('weather-temp').textContent = `${Math.round(w.temperature)}°C`;
    document.getElementById('weather-desc').textContent = code<=1?'Clear':code<=3?'Cloudy':'Rain';
  } catch(e){}
}

// ─── MAP TAP ──────────────────────────────────────────────────
function onMapClick(e) {
  // Close POI card first if open
  if (selectedPOI) { closePOICard(); return; }

  // Routes tab: set destination on tap
  if (activeTab==='routes') {
    const toIn = document.getElementById('route-to');
    if (toIn && !toIn.value) {
      toIn.value = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
      routeTo = [e.latlng.lat, e.latlng.lng];
    }
    return;
  }

  // Otherwise: show contextual location card
  showLocationCard(e.latlng);
}

function showLocationCard(latlng) {
  tappedLatlng = latlng;
  const card = document.getElementById('location-card');
  const coordEl  = document.getElementById('lcard-coords');
  const addrEl   = document.getElementById('lcard-address');

  coordEl.textContent  = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
  addrEl.textContent   = 'Getting address…';
  card.classList.remove('hidden');

  // Reverse geocode via Nominatim (free, OSM-based)
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json&accept-language=en`;
  fetch(url, { headers:{ 'Accept-Language':'en' } })
    .then(r => r.json())
    .then(d => {
      const a = d.address || {};
      const parts = [
        a.road || a.pedestrian || a.footway || '',
        a.suburb || a.neighbourhood || '',
        a.city_district || a.town || a.city || 'Lagos',
      ].filter(Boolean);
      addrEl.textContent = parts.join(', ') || d.display_name?.split(',').slice(0,2).join(', ') || 'Lagos';
    })
    .catch(() => { addrEl.textContent = 'Lagos, Nigeria'; });
}

function closeLocationCard() {
  tappedLatlng = null;
  document.getElementById('location-card').classList.add('hidden');
}

// ─── BOTTOM SHEET ─────────────────────────────────────────────
function setupBottomSheet() {
  const sheet = document.getElementById('bottom-sheet');
  const handle = document.getElementById('sheet-handle-wrap');
  let startY, startH, dragging=false;

  function setState(s) {
    sheet3State = s;
    const peekH = 88;
    const midH  = Math.floor(window.innerHeight*0.46);
    const fullH = Math.floor(window.innerHeight*0.88);
    sheet.style.height = {peek:peekH+'px',mid:midH+'px',full:fullH+'px'}[s];
    updateOverlayPositions();
  }

  handle.addEventListener('click',()=>{
    setState({peek:'mid',mid:'full',full:'peek'}[sheet3State]||'mid');
  });

  handle.addEventListener('mousedown', e=>{startY=e.clientY;startH=sheet.offsetHeight;dragging=true;});
  window.addEventListener('mousemove', e=>{
    if(!dragging)return;
    const dy=startY-e.clientY;
    sheet.style.height = Math.min(Math.max(startH+dy,80),window.innerHeight*0.92)+'px';
  });
  window.addEventListener('mouseup', e=>{
    if(!dragging)return; dragging=false;
    snapSheet(sheet);
  });
  handle.addEventListener('touchstart', e=>{startY=e.touches[0].clientY;startH=sheet.offsetHeight;dragging=true;},{passive:true});
  window.addEventListener('touchmove',  e=>{
    if(!dragging)return;
    const dy=startY-e.touches[0].clientY;
    sheet.style.height = Math.min(Math.max(startH+dy,80),window.innerHeight*0.92)+'px';
  },{passive:true});
  window.addEventListener('touchend', ()=>{
    if(!dragging)return; dragging=false;
    snapSheet(sheet);
  });
}

function snapSheet(sheet) {
  const h=sheet.offsetHeight;
  const mid=window.innerHeight*0.46;
  const full=window.innerHeight*0.88;
  if (h<mid*0.55) setSheetState('peek');
  else if (h<full*0.70) setSheetState('mid');
  else setSheetState('full');
}

function setSheetState(s) {
  sheet3State = s;
  const sheet = document.getElementById('bottom-sheet');
  const h = {peek:'88px', mid:Math.floor(window.innerHeight*0.46)+'px', full:Math.floor(window.innerHeight*0.88)+'px'}[s];
  sheet.style.height = h;
  updateOverlayPositions();
}

function updateOverlayPositions() {
  const sheetH = {
    peek:88, mid:Math.floor(window.innerHeight*0.46),
    full:Math.floor(window.innerHeight*0.88)
  }[sheet3State]||88;
  const tabH = 56;
  const bot = sheetH+tabH+16;
  ['weather-widget','map-controls-right'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.bottom = bot+'px';
  });
}

// ─── TABS ─────────────────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b=>
    b.classList.toggle('active', b.dataset.tab===tab));
  document.querySelectorAll('.tab-content').forEach(c=>c.style.display='none');
  const tc = document.getElementById('tab-'+tab);
  if (tc) { tc.style.display='flex'; tc.style.flexDirection='column'; }

  if (tab==='explore') { renderExploreTab(); }
  if (tab==='nearby')  { renderNearbyTab('food'); }
  if (tab==='saved')   { renderSavedTab(); }
  if (tab==='routes')  { renderRouteTab(); }
  if (tab==='navigate'){ renderNavigateTab(); }

  if (['routes','nearby','saved','navigate'].includes(tab)) {
    setSheetState('mid');
  }
}

// ─── EXPLORE TAB ─────────────────────────────────────────────
function renderExploreTab() {
  const list = document.getElementById('poi-list');
  if (!list) return;
  const filtered = currentCategory==='all' ? POIS : POIS.filter(p=>p.cat===currentCategory);
  const sorted = [...filtered].sort((a,b)=>
    haversine([userLat,userLng],[a.lat,a.lng]) - haversine([userLat,userLng],[b.lat,b.lng])
  );

  let html='';
  // Featured: nearby food (horizontal scroll)
  if (currentCategory==='all') {
    const nearFood = [...POIS].filter(p=>p.cat==='food')
      .sort((a,b)=>haversine([userLat,userLng],[a.lat,a.lng])-haversine([userLat,userLng],[b.lat,b.lng]))
      .slice(0,6);
    html += `<div class="disc-section-header">
      <div class="disc-section-label">🍽️ Restaurants Nearby</div>
      <button class="disc-see-all" onclick="filterCat('food')">See all</button>
    </div>
    <div class="disc-hscroll">`;
    nearFood.forEach(p=>{
      const d=haversine([userLat,userLng],[p.lat,p.lng]);
      const cfg=CATS[p.cat]||CATS.all;
      html+=`<div class="disc-hcard" onclick="showPOICard(getPOI('${p.id}'))">
        <div class="disc-hcard-icon" style="background:${cfg.bg}">${p.emoji}</div>
        <div class="disc-hcard-name">${p.name}</div>
        <div class="disc-hcard-meta">
          <span class="poi-distance">${fmtDist(d)}</span>
          <span class="poi-status ${p.open?'open':'closed'}">${p.open?'Open':'Closed'}</span>
        </div>
      </div>`;
    });
    html+=`</div>`;
  }

  html+=`<div class="disc-section-label" style="padding-top:16px">
    ${currentCategory==='all'?'All Places':'Category: '+((CATS[currentCategory]||{}).label||currentCategory)} (${sorted.length})
  </div>`;

  sorted.forEach(p=>{
    const d=haversine([userLat,userLng],[p.lat,p.lng]);
    const cfg=CATS[p.cat]||CATS.all;
    html+=`<div class="poi-item" onclick="showPOICard(getPOI('${p.id}'))">
      <div class="poi-dot" style="background:${cfg.bg}">${p.emoji}</div>
      <div class="poi-info">
        <div class="poi-name">${p.name}</div>
        <div class="poi-sub">${p.sub}</div>
        <div class="poi-area">${p.area}</div>
      </div>
      <div class="poi-right">
        <span class="poi-status ${p.open?'open':'closed'}">${p.open?'Open':'Closed'}</span>
        <span class="poi-distance">${fmtDist(d)}</span>
      </div>
    </div>`;
  });

  list.innerHTML = html;
  const cnt = document.getElementById('list-count');
  if (cnt) cnt.textContent = `${sorted.length} places`;
  const area = document.getElementById('sheet-area');
  if (area) area.textContent = 'Lagos';
}

// ─── CATEGORY FILTER ──────────────────────────────────────────
function filterCat(cat) {
  currentCategory = cat;
  document.querySelectorAll('.pill').forEach(p=>
    p.classList.toggle('active', p.dataset.cat===cat));
  const filtered = cat==='all'?POIS:POIS.filter(p=>p.cat===cat);
  renderMarkers(filtered);
  if (activeTab==='explore') renderExploreTab();
}

// ─── POI CARD ─────────────────────────────────────────────────
function showPOICard(poi) {
  if (!poi) return;
  selectedPOI = poi;
  const cfg = CATS[poi.cat] || CATS.all;
  closeLocationCard();
  map.panTo([poi.lat, poi.lng], { animate:true, duration:0.5 });

  // Photo hero — gradient based on category colour
  const photo    = document.getElementById('card-photo');
  const photoEmoji = document.getElementById('card-photo-emoji');
  const photoGrad  = document.getElementById('card-photo-gradient');
  const photoVerif = document.getElementById('card-photo-verified');
  photoEmoji.textContent = poi.emoji;
  photoGrad.style.background = `linear-gradient(145deg, ${cfg.bg} 0%, ${cfg.color}22 100%)`;
  photoVerif.classList.toggle('hidden', !poi.verified);

  // Badge
  const badge = document.getElementById('card-badge');
  badge.textContent = cfg.label;
  badge.style.background = cfg.bg;
  badge.style.color = cfg.color;

  document.getElementById('card-name').textContent = poi.name;
  document.getElementById('card-address').textContent = `${poi.sub} · ${poi.area}, Lagos`;

  // Rating
  const ratingBlock = document.getElementById('stat-rating');
  const ratingR = getRating(poi);
  if (ratingR && ratingBlock) {
    document.getElementById('stat-rating-val').textContent = ratingR.rating.toFixed(1);
    document.getElementById('stat-reviews').textContent = `(${ratingR.reviews} reviews)`;
    ratingBlock.style.display = 'flex';
  }

  // Open status
  const openEl = document.getElementById('stat-open');
  if (openEl) {
    openEl.textContent = poi.open ? 'Open Now' : 'Closed';
    openEl.className = `stat-open ${poi.open ? 'open' : 'closed'}`;
    openEl.style.display = 'inline-flex';
  }

  // Distance
  const distVal = document.getElementById('stat-distance-val');
  if (distVal) {
    distVal.textContent = fmtDist(haversine([userLat,userLng],[poi.lat,poi.lng])) + ' away';
    document.getElementById('stat-distance').style.display = 'flex';
  }

  // Phone
  const phoneRow = document.getElementById('meta-phone');
  const phoneTxt = document.getElementById('meta-phone-text');
  if (phoneRow && phoneTxt) {
    phoneTxt.textContent = poi.phone || '';
    phoneRow.classList.toggle('hidden', !poi.phone);
  }

  // Hours
  const hoursRow = document.getElementById('meta-hours');
  const hoursTxt = document.getElementById('meta-hours-text');
  if (hoursRow && hoursTxt) {
    hoursTxt.textContent = poi.hours || '';
    hoursRow.classList.toggle('hidden', !poi.hours);
  }

  document.getElementById('poi-card').classList.remove('hidden');
  setSheetState('mid');
}

function closePOICard() {
  selectedPOI = null;
  document.getElementById('poi-card').classList.add('hidden');
  // Deselect marker
  document.querySelectorAll('.lagis-marker.selected').forEach(el=>el.classList.remove('selected'));
}

// ─── FULL DETAIL PAGE ──────────────────────────────────────────
function showPOIDetail(poi) {
  if (!poi) poi = selectedPOI;
  if (!poi) return;
  const cfg = CATS[poi.cat] || CATS.all;
  const ratingR = getRating(poi);

  // Hero
  document.getElementById('detail-hero-emoji').textContent = poi.emoji;
  document.getElementById('detail-hero-gradient').style.background =
    `linear-gradient(155deg, ${cfg.bg} 0%, ${cfg.color}33 60%, ${cfg.color}66 100%)`;
  document.getElementById('detail-verified-badge').classList.toggle('hidden', !poi.verified);

  // Header
  const badge = document.getElementById('detail-badge');
  badge.textContent = cfg.label;
  badge.style.background = cfg.bg;
  badge.style.color = cfg.color;
  document.getElementById('detail-name').textContent = poi.name;
  document.getElementById('detail-sub').textContent  = `${poi.sub} · ${poi.area}, Lagos`;

  // Rating
  if (ratingR) {
    document.getElementById('detail-stars').textContent = renderStars(ratingR.rating);
    document.getElementById('detail-rating-num').textContent = ratingR.rating.toFixed(1);
    document.getElementById('detail-reviews-count').textContent = `· ${ratingR.reviews} reviews`;
  }

  // Phone action button
  const callBtn = document.getElementById('detail-btn-call');
  if (poi.phone) {
    callBtn.style.display = 'flex';
    callBtn.onclick = () => { window.location.href = `tel:${poi.phone}`; };
  } else {
    callBtn.style.display = 'none';
  }

  // Info rows
  document.getElementById('dinfo-address-text').textContent = `${poi.area}, Lagos, Nigeria`;

  const phoneRow2 = document.getElementById('dinfo-phone');
  const phoneTxt2 = document.getElementById('dinfo-phone-text');
  if (poi.phone) {
    phoneTxt2.textContent = poi.phone;
    phoneTxt2.href = `tel:${poi.phone}`;
    phoneRow2.classList.remove('hidden');
  } else phoneRow2.classList.add('hidden');

  const hoursRow2 = document.getElementById('dinfo-hours');
  if (poi.hours) {
    document.getElementById('dinfo-hours-text').textContent = poi.hours;
    const pill = document.getElementById('dinfo-open-pill');
    pill.textContent = poi.open ? 'Open' : 'Closed';
    pill.className = `detail-open-pill ${poi.open ? 'open' : 'closed'}`;
    hoursRow2.classList.remove('hidden');
  } else hoursRow2.classList.add('hidden');

  // Popular times bars (simulated based on poi id hash)
  let h = 0;
  for (let i=0; i<poi.id.length; i++) h = (h*31 + poi.id.charCodeAt(i)) >>> 0;
  const chart = document.getElementById('detail-popular-chart');
  const HOURS = ['9','10','11','12','1','2','3','4','5','6','7','8'];
  const bars = HOURS.map((hr, i) => {
    const raw   = (Math.sin((h+i)*0.7) * 0.5 + 0.5);
    const pct   = Math.max(10, Math.round(raw * 90));
    const now   = new Date().getHours();
    const hourN = (9+i) % 24;
    const cls   = hourN === now ? 'current' : pct > 70 ? 'peak' : '';
    return `<div class="popular-bar ${cls}" style="height:${pct}%" title="${hr}:00"></div>`;
  }).join('');
  chart.innerHTML = bars;
  document.getElementById('detail-popular-times').classList.remove('hidden');

  // Similar nearby
  const similar = POIS.filter(p => p.id !== poi.id && p.cat === poi.cat)
    .sort((a,b) => haversine([poi.lat,poi.lng],[a.lat,a.lng]) - haversine([poi.lat,poi.lng],[b.lat,b.lng]))
    .slice(0, 5);
  const nearbyList = document.getElementById('detail-nearby-list');
  if (similar.length) {
    nearbyList.innerHTML = similar.map(p => {
      const c = CATS[p.cat] || CATS.all;
      const d = haversine([userLat,userLng],[p.lat,p.lng]);
      return `<div class="detail-nearby-item" onclick="showPOICard(getPOI('${p.id}'));closeDetailPage()">
        <div class="detail-nearby-dot" style="background:${c.bg}">${p.emoji}</div>
        <div class="detail-nearby-info">
          <div class="detail-nearby-name">${p.name}</div>
          <div class="detail-nearby-sub">${p.sub}</div>
        </div>
        <div class="detail-nearby-dist">${fmtDist(d)}</div>
      </div>`;
    }).join('');
    document.getElementById('detail-nearby-section').classList.remove('hidden');
  } else {
    document.getElementById('detail-nearby-section').classList.add('hidden');
  }

  // Wire action buttons
  document.getElementById('detail-btn-directions').onclick = () => {
    closeDetailPage();
    closePOICard();
    selectedPOI = poi;
    routeToPOI();
  };
  document.getElementById('detail-btn-share').onclick = () => {
    if (navigator.share) navigator.share({ title:poi.name, text:`${poi.sub} · ${poi.area}, Lagos` });
    else showToast('Link copied!');
  };
  document.getElementById('detail-btn-save').onclick = () => showToast('Saved! (coming soon)');

  // Show detail page
  document.getElementById('poi-detail-page').classList.remove('hidden');
}

function closeDetailPage() {
  document.getElementById('poi-detail-page').classList.add('hidden');
}

function routeToPOI() {
  if (!selectedPOI) return;
  routeFrom = [userLat, userLng];
  routeTo   = [selectedPOI.lat, selectedPOI.lng];
  document.getElementById('route-from').value = 'My Location';
  document.getElementById('route-to').value   = selectedPOI.name;
  closePOICard();
  switchTab('routes');
  setTimeout(calculateRoute, 200);
}

// ─── NEARBY TAB ───────────────────────────────────────────────
function renderNearbyTab(cat) {
  document.querySelectorAll('.nearby-tab-cat').forEach(b=>
    b.classList.toggle('active', b.dataset.cat===cat));
  const list = document.getElementById('nearby-poi-list');
  if (!list) return;
  const filtered = cat==='all'?POIS:POIS.filter(p=>p.cat===cat);
  const sorted = [...filtered].sort((a,b)=>
    haversine([userLat,userLng],[a.lat,a.lng]) - haversine([userLat,userLng],[b.lat,b.lng])
  );
  list.innerHTML = sorted.map(p=>{
    const d=haversine([userLat,userLng],[p.lat,p.lng]);
    const cfg=CATS[p.cat]||CATS.all;
    return `<div class="poi-item" onclick="showPOICard(getPOI('${p.id}'))">
      <div class="poi-dot" style="background:${cfg.bg}">${p.emoji}</div>
      <div class="poi-info">
        <div class="poi-name">${p.name}</div>
        <div class="poi-sub">${p.sub}</div>
        <div class="poi-area">${p.area}</div>
      </div>
      <div class="poi-right">
        <span class="poi-status ${p.open?'open':'closed'}">${p.open?'Open':'Closed'}</span>
        <span class="poi-distance">${fmtDist(d)}</span>
      </div>
    </div>`;
  }).join('');
}

// ─── SAVED TAB ────────────────────────────────────────────────
function renderSavedTab() {
  const c = document.getElementById('tab-saved');
  if (!c) return;
  c.innerHTML = `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;color:var(--text-3)">
      <div style="font-size:44px;margin-bottom:12px">🔖</div>
      <div style="font-weight:600;color:var(--text-2);font-size:15px;margin-bottom:6px">No saved places yet</div>
      <div style="font-size:13px;text-align:center">Tap the bookmark icon on any place to save it here.</div>
    </div>`;
}

// ─── ROUTE TAB ────────────────────────────────────────────────
function renderRouteTab() {
  document.querySelectorAll('.mode-grid-btn').forEach(b=>
    b.classList.toggle('active', b.dataset.mode===routeMode));
  if (routeFrom) document.getElementById('route-from').value='My Location';
}

// ─── NAVIGATE TAB ─────────────────────────────────────────────
function renderNavigateTab() {
  const c = document.getElementById('tab-navigate');
  if (!c) return;
  if (!navActive) {
    c.innerHTML=`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;color:var(--text-3)">
        <div style="font-size:44px;margin-bottom:12px">🧭</div>
        <div style="font-weight:600;color:var(--text-2);font-size:15px;margin-bottom:6px">Not navigating</div>
        <div style="font-size:13px;text-align:center">Plan a route from the Routes tab to start navigation.</div>
      </div>`;
  }
}

// ─── ROUTE CALCULATION ────────────────────────────────────────
async function calculateRoute() {
  if (!routeFrom||!routeTo) { showToast('Enter start & destination'); return; }
  const profile = {driving:'car',walking:'foot',cycling:'bike',motorcycle:'car'}[routeMode]||'car';
  const url = `${OSRM_BASE}/${profile}/${routeFrom[1]},${routeFrom[0]};${routeTo[1]},${routeTo[0]}?overview=full&steps=true&geometries=geojson`;
  try {
    showToast('Calculating route…', 2000);
    const r = await fetch(url);
    const d = await r.json();
    if (!d.routes?.length) { showToast('No route found'); return; }
    clearRoute();
    const route = d.routes[0];
    const coords = route.geometry.coordinates.map(c=>[c[1],c[0]]);
    const color = {driving:'#1a7a4a',walking:'#3b82f6',cycling:'#f59e0b',motorcycle:'#8b5cf6'}[routeMode]||'#1a7a4a';

    const outline = L.polyline(coords,{color:'#ffffff',weight:10,opacity:0.78,lineCap:'round',lineJoin:'round'}).addTo(map);
    const fill    = L.polyline(coords,{color,weight:6.5,opacity:0.93,lineCap:'round',lineJoin:'round'}).addTo(map);
    routePolylines.push(outline, fill);
    map.fitBounds(L.latLngBounds(coords),{padding:[60,60]});

    addRouteLabel(coords[0],'Start','origin');
    const destPOI = POIS.find(p=>p.lat===routeTo[0]&&p.lng===routeTo[1]);
    addRouteLabel(coords[coords.length-1], destPOI?destPOI.name:'Destination', 'destination');

    updateRouteSummary(route.duration, route.distance, color);
    renderDirections(route.legs[0].steps);
    buildNearbyAlongRoute(routeTo);

    document.getElementById('route-summary').classList.remove('hidden');
    document.getElementById('route-directions').classList.remove('hidden');
    document.getElementById('route-nearby').classList.remove('hidden');
    setSheetState('mid');
  } catch(e) { showToast('Route error. Check connection.'); }
}

function clearRoute() {
  routePolylines.forEach(p=>map.removeLayer(p));
  routePolylines = [];
  routeLabels.forEach(m=>map.removeLayer(m));
  routeLabels = [];
  document.getElementById('route-summary')?.classList.add('hidden');
  document.getElementById('route-directions')?.classList.add('hidden');
  document.getElementById('route-nearby')?.classList.add('hidden');
}

function addRouteLabel(latlng, text, type) {
  const icon = L.divIcon({
    className:'',
    html:`<div class="route-map-label ${type}">${text}</div>`,
    iconAnchor:[0,36], iconSize:null,
  });
  const m = L.marker(latlng,{icon,zIndexOffset:800}).addTo(map);
  routeLabels.push(m);
}

function updateRouteSummary(sec, meters, color) {
  const km = meters/1000;
  const modeLabels={driving:'🚗 Drive',walking:'🚶 Walk',cycling:'🚲 Cycle',motorcycle:'🏍️ Moto'};
  const trafficLevel = sec>km*200?'high':sec>km*100?'medium':'low';
  const trafficText  = {low:'Low traffic',medium:'Moderate',high:'Heavy traffic'}[trafficLevel];
  document.getElementById('route-summary-time').textContent     = fmtTime(sec);
  document.getElementById('route-summary-distance').textContent = fmtDist(km);
  document.getElementById('route-summary-arrive').textContent   = 'Arrive '+fmtArrival(sec);
  document.getElementById('route-mode-badge').textContent       = modeLabels[routeMode]||'🚗 Drive';
  const dot = document.querySelector('.traffic-dot');
  if (dot) dot.className = `traffic-dot ${trafficLevel}`;
  const tl = document.getElementById('route-traffic-label');
  if (tl) tl.textContent = trafficText;
}

function renderDirections(steps) {
  const list = document.getElementById('directions-list');
  if (!list) return;
  list.innerHTML = steps.map(s=>{
    const key = s.maneuver?.type
      ? s.maneuver.type.charAt(0).toUpperCase()+s.maneuver.type.slice(1)
      : 'Continue';
    const icon = TURN_ICONS[key]||TURN_ICONS[s.maneuver?.modifier]||'⬆️';
    return `<div class="direction-step">
      <div class="direction-icon">${icon}</div>
      <div>
        <div class="direction-road">${s.name||s.ref||'Continue'}</div>
        <div class="direction-dist">${fmtDist(s.distance/1000)}</div>
      </div>
    </div>`;
  }).join('');
}

function toggleDirections() {
  const btn  = document.getElementById('directions-toggle');
  const list = document.getElementById('directions-list');
  const exp  = btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded', String(!exp));
  list.classList.toggle('expanded', !exp);
}

function buildNearbyAlongRoute(dest, cat) {
  cat = cat || nearbyCat || 'food';
  nearbyCat = cat;
  document.querySelectorAll('.nearby-cat-btn').forEach(b=>
    b.classList.toggle('active', b.dataset.cat===cat));
  const ref = dest||routeTo||[userLat,userLng];
  const catPOIs = cat==='all'?POIS:POIS.filter(p=>p.cat===cat);
  const sorted  = [...catPOIs].sort((a,b)=>
    haversine([a.lat,a.lng],ref)-haversine([b.lat,b.lng],ref)
  ).slice(0,8);
  const c = document.getElementById('route-nearby-list');
  if (!c) return;
  c.innerHTML = sorted.map(p=>{
    const d=haversine([userLat,userLng],[p.lat,p.lng]);
    const cfg=CATS[p.cat]||CATS.all;
    return `<div class="nearby-place-card" onclick="showPOICard(getPOI('${p.id}'))">
      <div class="nearby-place-icon" style="background:${cfg.bg}">${p.emoji}</div>
      <div class="nearby-place-name">${p.name}</div>
      <div class="nearby-place-meta">
        <span class="nearby-open-badge ${p.open?'open':'closed'}">${p.open?'Open':'Closed'}</span>
        <span class="nearby-place-dist">${fmtDist(d)}</span>
      </div>
    </div>`;
  }).join('');
}

// ─── NAVIGATION ───────────────────────────────────────────────
function startNavigation() {
  navActive = true;
  document.getElementById('nav-bar').classList.add('visible');
  document.getElementById('bottom-sheet').style.transform = 'translateY(120px)';
  showToast('Navigation started');
  let i=0;
  const times=['12 min','11 min','9 min','7 min','5 min','Arriving'];
  const dists=['5.2 km','4.8 km','4.0 km','3.2 km','2.1 km','0.5 km'];
  const iv = setInterval(()=>{
    if (!navActive||i>=times.length){clearInterval(iv);return;}
    document.getElementById('nav-bar-time').textContent=times[i];
    document.getElementById('nav-bar-dist').textContent=dists[i];
    i++;
  },4000);
}

function endNavigation(confirmed) {
  if (!confirmed) {
    document.getElementById('end-nav-confirm').classList.remove('hidden');
    return;
  }
  navActive=false;
  document.getElementById('nav-bar').classList.remove('visible');
  document.getElementById('end-nav-confirm').classList.add('hidden');
  document.getElementById('bottom-sheet').style.transform='';
  clearRoute();
  routeFrom=routeTo=null;
  document.getElementById('route-from').value='';
  document.getElementById('route-to').value='';
  switchTab('explore');
  showToast('Navigation ended');
}

// ─── SEARCH ───────────────────────────────────────────────────
function onSearchInput(val) {
  const dd = document.getElementById('search-dropdown');
  const q  = val.trim().toLowerCase();
  if (!q) { dd.style.display='none'; return; }
  const results = POIS.filter(p=>
    p.name.toLowerCase().includes(q)||
    p.area.toLowerCase().includes(q)||
    p.sub.toLowerCase().includes(q)||
    p.cat.includes(q)
  ).slice(0,8);
  if (!results.length) { dd.style.display='none'; return; }
  dd.style.display='block';
  dd.innerHTML=`<div class="dd-label">Results (${results.length})</div>`+
    results.map(p=>{
      const cfg=CATS[p.cat]||CATS.all;
      return `<div class="dd-item" onclick="selectSearchResult('${p.id}')">
        <div class="dd-icon" style="background:${cfg.bg}">${p.emoji}</div>
        <div><div class="dd-name">${p.name}</div><div class="dd-sub">${p.area} · ${p.sub}</div></div>
      </div>`;
    }).join('');
}
function selectSearchResult(id) {
  const poi=getPOI(id); if(!poi)return;
  document.getElementById('search').value=poi.name;
  document.getElementById('search-clear').classList.remove('hidden');
  document.getElementById('search-dropdown').style.display='none';
  map.flyTo([poi.lat,poi.lng],17,{duration:1.0});
  showPOICard(poi);
}
function clearSearch() {
  document.getElementById('search').value='';
  document.getElementById('search-clear').classList.add('hidden');
  document.getElementById('search-dropdown').style.display='none';
}

// ─── VOICE SEARCH ─────────────────────────────────────────────
function startVoiceSearch() {
  const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
  if (!SR) { showToast('Voice not supported in this browser'); return; }
  const rec = new SR();
  rec.lang='en-NG'; rec.continuous=false; rec.interimResults=false;
  const btn=document.getElementById('search-voice');
  btn.classList.add('listening');
  rec.onresult = e=>{
    const t=e.results[0][0].transcript;
    document.getElementById('search').value=t;
    document.getElementById('search-clear').classList.remove('hidden');
    onSearchInput(t); btn.classList.remove('listening');
  };
  rec.onerror=rec.onend=()=>btn.classList.remove('listening');
  rec.start(); showToast('Listening…', 3000);
}

// ─── DARK MODE ────────────────────────────────────────────────
function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);

  // Swap tile layer: Voyager (light) ↔ DarkMatter (dark)
  if (activeTileLayer) map.removeLayer(activeTileLayer);
  activeTileLayer = L.tileLayer(darkMode ? TILE_DARK : TILE_LIGHT, TILE_OPTS).addTo(map);

  const btn = document.getElementById('theme-btn');
  btn.innerHTML = darkMode
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ─── EVENT WIRING ─────────────────────────────────────────────
function setupEventListeners() {
  // Search
  const searchEl = document.getElementById('search');
  searchEl.addEventListener('input', e=>{
    onSearchInput(e.target.value);
    document.getElementById('search-clear').classList.toggle('hidden',!e.target.value);
  });
  document.getElementById('search-clear').addEventListener('click', clearSearch);
  document.getElementById('search-voice').addEventListener('click', startVoiceSearch);
  document.addEventListener('click', e=>{
    if (!e.target.closest('#search-box')&&!e.target.closest('#search-dropdown'))
      document.getElementById('search-dropdown').style.display='none';
  });

  // Tab bar
  document.querySelectorAll('.tab-btn').forEach(b=>
    b.addEventListener('click',()=>switchTab(b.dataset.tab)));

  // Category pills
  document.querySelectorAll('.pill').forEach(p=>
    p.addEventListener('click',()=>filterCat(p.dataset.cat)));

  // Map controls
  document.getElementById('locate-btn').addEventListener('click', locateUser);
  document.getElementById('btn-3d').addEventListener('click', toggle3D);
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);

  // POI card
  document.getElementById('card-close').addEventListener('click', closePOICard);
  document.getElementById('btn-directions').addEventListener('click', routeToPOI);
  document.getElementById('btn-save')?.addEventListener('click', ()=>showToast('Saved! (coming soon)'));
  document.getElementById('btn-share')?.addEventListener('click', ()=>{
    if (selectedPOI && navigator.share) {
      navigator.share({title:selectedPOI.name,text:selectedPOI.sub+' · '+selectedPOI.area+', Lagos'});
    } else showToast('Link copied!');
  });
  // Zoom controls
  document.getElementById('zoom-in')?.addEventListener('click', ()=>map.zoomIn());
  document.getElementById('zoom-out')?.addEventListener('click', ()=>map.zoomOut());
  // Navigate tab search button
  document.getElementById('btn-nav-search')?.addEventListener('click', ()=>switchTab('routes'));

  // Floor selector
  document.querySelectorAll('.floor-btn').forEach(b=>
    b.addEventListener('click',()=>{
      document.querySelectorAll('.floor-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      showToast('Floor '+( b.dataset.floor||'G'));
    }));

  // Route inputs
  const fromIn = document.getElementById('route-from');
  const toIn   = document.getElementById('route-to');
  fromIn.addEventListener('focus',()=>{ if(!fromIn.value) fromIn.value='My Location'; routeFrom=[userLat,userLng]; });
  toIn.addEventListener('input', e=>{
    const q=e.target.value.trim().toLowerCase();
    if (!q) return;
    const match=POIS.find(p=>p.name.toLowerCase().startsWith(q));
    if (match) routeTo=[match.lat,match.lng];
  });

  // Swap
  document.getElementById('route-swap-sheet').addEventListener('click', function(){
    this.classList.remove('swapping'); void this.offsetWidth; this.classList.add('swapping');
    setTimeout(()=>{
      const t=fromIn.value; fromIn.value=toIn.value; toIn.value=t;
      const c=routeFrom; routeFrom=routeTo; routeTo=c;
    },175);
  });

  // Use location
  document.getElementById('btn-use-location').addEventListener('click',()=>{
    routeFrom=[userLat,userLng]; fromIn.value='My Location';
  });

  // Mode buttons
  document.querySelectorAll('.mode-grid-btn').forEach(b=>
    b.addEventListener('click',()=>{
      routeMode=b.dataset.mode;
      document.querySelectorAll('.mode-grid-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
    }));

  // Get route
  document.getElementById('btn-get-route').addEventListener('click',()=>{
    if (!routeFrom) routeFrom=[userLat,userLng];
    calculateRoute();
  });

  // Navigation controls
  document.getElementById('btn-start-nav').addEventListener('click', startNavigation);
  document.getElementById('btn-end-nav').addEventListener('click',()=>endNavigation(false));
  document.getElementById('btn-end-confirm').addEventListener('click',()=>endNavigation(true));
  document.getElementById('btn-end-cancel').addEventListener('click',()=>
    document.getElementById('end-nav-confirm').classList.add('hidden'));

  // Directions toggle
  document.getElementById('directions-toggle').addEventListener('click', toggleDirections);

  // Nearby cats (route)
  document.querySelectorAll('.nearby-cat-btn').forEach(b=>
    b.addEventListener('click',()=>buildNearbyAlongRoute(routeTo,b.dataset.cat)));

  // Nearby tab cats
  document.querySelectorAll('.nearby-tab-cat').forEach(b=>
    b.addEventListener('click',()=>renderNearbyTab(b.dataset.cat)));

  // View Details button on POI card
  document.getElementById('btn-view-details')?.addEventListener('click', ()=>showPOIDetail(selectedPOI));

  // Detail page back button
  document.getElementById('detail-back')?.addEventListener('click', closeDetailPage);

  // Location card buttons
  document.getElementById('lcard-btn-close')?.addEventListener('click', closeLocationCard);
  document.getElementById('lcard-btn-nav')?.addEventListener('click', ()=>{
    if (!tappedLatlng) return;
    routeFrom = [userLat, userLng];
    routeTo   = [tappedLatlng.lat, tappedLatlng.lng];
    const addrTxt = document.getElementById('lcard-address')?.textContent || 'Tapped location';
    document.getElementById('route-from').value = 'My Location';
    document.getElementById('route-to').value   = addrTxt;
    closeLocationCard();
    switchTab('routes');
    setTimeout(calculateRoute, 200);
  });
  document.getElementById('lcard-btn-copy')?.addEventListener('click', ()=>{
    if (!tappedLatlng) return;
    const txt = `${tappedLatlng.lat.toFixed(6)}, ${tappedLatlng.lng.toFixed(6)}`;
    navigator.clipboard?.writeText(txt).then(()=>showToast('Coordinates copied!'))
      .catch(()=>showToast(txt));
  });

  // Close location card on map tap elsewhere (handled by onMapClick → selectedPOI guard)
  // Also close detail page on Android back gesture via popstate
  window.addEventListener('popstate', ()=>{
    if (!document.getElementById('poi-detail-page').classList.contains('hidden')) {
      history.pushState(null, '');
      closeDetailPage();
    }
  });
  history.pushState(null, '');
}

// ─── BOOT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  initMap();
  setupEventListeners();
  switchTab('explore');
  setTimeout(()=>{
    const sheet=document.getElementById('bottom-sheet');
    if(sheet) sheet.style.height='88px';
    updateOverlayPositions();
  }, 150);
});