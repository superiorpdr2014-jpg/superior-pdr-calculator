/* =====================================================================
   PER-SHOP CONFIG  —  Superior PDR (Jay Ma, Taiwan)

   locale: 'zh' = Traditional Chinese (繁體中文)
   currency: NT$ (New Taiwan Dollar)
   pricing: Dent Time base × 0.6 (40% less) → converted to TWD (~32:1)

   ★ This file is SAFE across engine updates. When the seller ships a new
     calculator.html with new features, this config is never touched — the
     shop's language, prices, and branding stay exactly as set.
   ===================================================================== */
window.SHOP_CONFIG = {

  locale: 'zh',
  shopId: 'superior-pdr',

  // ---- BRANDING ----------------------------------------------------
  brand: {
    companyName:  'Superior PDR',
    logoUrl:      'logo.png',
    phone:        '0901242511',
    phonePretty:  '0901-242-511',
    website:      'https://www.tar-tw.com/',
    accentColor:  '#cc0000',               // Red accent (can customize)
    imageAccent:  '#cc0000',
    currencySymbol: 'NT$',                 // New Taiwan Dollar
    validityDays: 30,

    experienceLine: 'Superior 提供專業傳統板金烤漆修復服務，採用原廠色號與標準工序，確保修復品質與整體外觀完美一致。',
    guaranteeShort: '滿意保證，不滿意不收費。',
    guaranteeLong:  '我們保證您對修復結果完全滿意，否則不收取任何費用。',

    // Backend endpoints — manual mode (Save/Download + Copy, no direct SMS/Email through our server)
    sending:       'manual',
    apiBase:       '',
    smsEndpoint:   '/api/estimate-sms/send',
    emailEndpoint: '/api/estimate-email/send',

    // Aluminum / HSS auto-check (shared Supabase list)
    aluminum: {
      enabled:     true,
      supabaseUrl: 'https://ffavrtepcitlbmgmrpyu.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmYXZydGVwY2l0bGJtZ21ycHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzA5NTYsImV4cCI6MjA2NTUwNjk1Nn0.xFIfrif_6lVOQpg8rCKAEevQGyaEm0CY0EoxFR6A7w4'
    }
  },

  // ---- PRICING (TWD — New Taiwan Dollar) ----------------------------
  // Base: Dent Time USD prices × 0.6 (40% less) × 32 (USD→TWD), rounded to nearest 100
  pricing: {
    pdrSizes: [1500,2000,2600,3200,3800,4400,5100,5700,6300,6900,7500,8100,8800,9400,10000,10600,11200,11800,12400,13100,13700,14300,14900,15500],
    pdrSizeLabels: [3,5,8,10,13,15,18,20,23,25,28,30,33,35,38,40,43,45,48,50,53,55,58,60],

    pdrGroups: [
      { id:'access',   factors:[ {id:'braced',pct:25}, {id:'edge',pct:25}, {id:'obstructed',pct:25}, {id:'bodyline',pct:50} ] },
      { id:'severity', factors:[ {id:'shallow',pct:0}, {id:'medium',pct:15}, {id:'deep',pct:30}, {id:'crease',pct:25} ] },
      { id:'material', factors:[ {id:'aluminum',pct:50}, {id:'classic',pct:30}, {id:'exotic',pct:40}, {id:'glue',pct:50}, {id:'structural',pct:35}, {id:'lateral',pct:25}, {id:'laminated',pct:25}, {id:'sound',pct:25} ] }
    ],

    bumperFactors: [
      { id:'scuff',   base:3800 },
      { id:'blend',   base:2850 },
      { id:'scratch', base:5300 },
      { id:'xl',      base:7200 },
      { id:'body',    base:2750 },
      { id:'punch',   base:1850 },
      { id:'crack',   base:1750 },
      { id:'corner',  base:2400 },
      { id:'ri',      base:2400, min:500,  max:8650 },
      { id:'custom',  base:2400, min:0,    max:19200, custom:true }
    ],

    paint: [ { id:'flat', price:0 }, { id:'tricoat', price:2500 } ],

    tiers: { practical:0.7, improvement:0.6 },

    panelMinPrices: {
      'Roof': 900,
      'Hood': 900,
      'Left Quarter': 900,
      'Right Quarter': 900,
      'Trunk': 900,
      'Tailgate': 900
    }
  }
};
