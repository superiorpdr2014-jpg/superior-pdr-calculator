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
    website:      'https://www.superior-tim.com',
    accentColor:  '#cc0000',               // Red accent (can customize)
    imageAccent:  '#cc0000',
    currencySymbol: 'NT$',                 // New Taiwan Dollar
    validityDays: 7,

    experienceLine: 'Superior PDR 提供最專業的免烤漆凹痕修復服務，保留您車輛的原廠烤漆品質。',
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
      { id:'scuff',   base:7600 },
      { id:'blend',   base:5700 },
      { id:'scratch', base:10600 },
      { id:'xl',      base:14400 },
      { id:'body',    base:5500 },
      { id:'punch',   base:3700 },
      { id:'crack',   base:3500 },
      { id:'corner',  base:4800 },
      { id:'ri',      base:4800, min:1000, max:17300 },
      { id:'custom',  base:4800, min:0,    max:38400, custom:true }
    ],

    paint: [ { id:'flat', price:0 }, { id:'tricoat', price:3000 } ],

    tiers: { practical:0.7, improvement:0.6 }
  }
};
