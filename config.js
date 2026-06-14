/* =====================================================================
   PER-SHOP CONFIG — Superior PDR (Jay Ma, Taiwan)

   locale: 'zh' = Traditional Chinese (繁體中文)
   currency: NT$ (New Taiwan Dollar)
   pricing: Dent Time base × 0.6 (40% less) × converted to TWD (~32:1)

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
      { id:'scuff',       base:6000 },
      { id:'blend',       base:4000 },
      { id:'body',        base:7500 },
      { id:'xl_body',     base:10000 },
      { id:'alu_body',    base:10000 },
      { id:'alu_xl_body', base:20000 },
      { id:'punch',       base:1850 },
      { id:'crack',       base:1750 },
      { id:'ri',          base:2000, min:500,  max:8650 },
      { id:'custom',      base:3000, min:0,    max:19200, custom:true }
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

// ── LINE 傳送整合 ──────────────────────────────────────────────────────────────
// index.html 的 modal-actions 已有靜態按鈕 #line-send-btn（display:none）。
// 當 URL 帶有 line_id 時顯示該按鈕，並定義 sendToLineUser() 供它 onclick 呼叫。
// 點擊後：渲染估價圖 → base64 → POST /echo/send-line-estimate → 傳給客戶並更新 Airtable 已報價。
(function () {
  var LINE_ENDPOINT = 'https://echo.pdrsuperior.com/echo/send-line-estimate';
  var LINE_ID = new URLSearchParams(window.location.search).get('line_id') || null;

  // 定義全域函數（index.html 按鈕的 onclick 直接呼叫）
  window.sendToLineUser = function (btn) {
    if (!LINE_ID) { alert('找不到 LINE 用戶 ID，請從 Telegram 重新開啟估價頁面。'); return; }
    if (typeof collectRepairs === 'undefined') { alert('估價工具尚未載入，請稍後再試。'); return; }
    var reps = collectRepairs();
    if (!reps.length) { alert('請先新增至少一個修復項目。'); return; }
    var span = btn ? btn.querySelector('span') : null;
    var orig = span ? span.textContent : '';
    if (span) span.textContent = '傳送中…';
    if (btn) btn.disabled = true;

    var priceEl = document.getElementById('total-val') || document.querySelector('.total-val');
    var priceText = priceEl ? priceEl.textContent.trim() : '';

    renderEstimateCanvas(reps, function (canvas, err) {
      if (!canvas) {
        alert('圖片生成失敗：' + (err && err.message || err || '未知錯誤'));
        if (span) span.textContent = orig;
        if (btn) btn.disabled = false;
        return;
      }
      fetch(LINE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineUserId:  LINE_ID,
          imageBase64: canvas.toDataURL('image/jpeg', 0.88),
          priceText:   priceText
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.ok) {
            if (span) span.textContent = '✅ 已傳送！';
            setTimeout(function () { if (span) span.textContent = orig; if (btn) btn.disabled = false; }, 3000);
          } else {
            alert('傳送失敗：' + (d.error || '伺服器錯誤'));
            if (span) span.textContent = orig;
            if (btn) btn.disabled = false;
          }
        })
        .catch(function (e) {
          alert('網路錯誤：' + e.message);
          if (span) span.textContent = orig;
          if (btn) btn.disabled = false;
        });
    });
  };

  // 顯示按鈕（僅在有 line_id 時）
  if (LINE_ID) {
    function showLineBtn() {
      var lb = document.getElementById('line-send-btn');
      if (lb) lb.style.display = 'flex';
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(showLineBtn, 300); });
    } else {
      setTimeout(showLineBtn, 300);
    }
  }
})();
