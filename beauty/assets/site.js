/* ============================================================
   SUPERIOR PDR — shared subpage behaviour
   - bilingual (zh default) via a [selector, en, zh, mode] table
   - hover dropdown is CSS-only; JS only assigns data-key + lang
   - reuses localStorage key 'superior-lang' shared with the homepage
   ============================================================ */
(function () {
  // shared chrome strings (nav + dropdown + footer + cta band)
  var CHROME_T = [
    ['nav.top .logo-text .bot-line', 'SINCE 2014 · TAIPEI · TAIWAN', '自 2014 · 台北 · 台灣', 'text'],
    ['nav.top .links a[data-key="home"]',        'Home',        '首頁',     'text'],
    ['nav.top .links a[data-key="about"]',       'About',       '關於我們', 'text'],
    ['nav.top .links a[data-key="services"]',    'Services',    '服務項目', 'text'],
    ['nav.top .links a[data-key="tools"]',       '凹痕工廠Tools', '凹痕工廠Tools', 'text'],
    ['nav.top .links a[data-key="studio"]',      'Journal',     '工作日誌', 'text'],
    ['nav.top .links a[data-key="case"]',        'Case Study',  '案例實績', 'text'],
    ['nav.top .links a[data-key="training"]',    'Training',    '技術教學', 'text'],
    ['nav.top .links a[data-key="locations"]',   'Locations',   '據點分佈', 'text'],
    ['nav.top .links a[data-key="contact"]',     'Contact',     '聯絡我們', 'text'],
    ['nav.top .dropdown a[data-d="excellence"]', 'Journey of Excellence', '卓越歷程', 'text'],
    ['nav.top .dropdown a[data-d="about"]',      'About Us',              '關於我們', 'text'],
    ['nav.top .dropdown a[data-d="quality"]',    'Repair Quality',        '關於修復品質', 'text'],
    ['nav.top .dropdown a[data-d="pricing"]',    'Pricing & Booking',     '參考價目與預約流程', 'text'],
    ['nav.top .dropdown a[data-d="technicians"]','Certified Technicians',  '卓越技師', 'text'],
    ['nav.top .dropdown a[data-d="svc-pdr"]',   'PDR Dent Repair',         'PDR凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-ev"]',    'EV Dent Repair',          '電動車凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-large"]', 'Large Area Dent Repair',  '大面積凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-alloy"]', 'Alloy Dent Repair',       '鋁合金凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-moto"]',  'Motorcycle Tank Repair',  '重機油箱凹痕修復', 'text'],
    ['nav.top .cta span', 'Book Now', '立即預約', 'text'],
    // cta band (shared)
    ['.cta-band .ct .s', 'BOOK NOW · FREE ESTIMATE', '立即預約 · 免費估價', 'text'],
    ['.cta-band .ct .t', 'Ready when you are.', '隨時為您服務。', 'text'],
    ['.cta-band .ct-actions .cta:nth-of-type(1) span', 'Online Booking', '線上預約', 'text'],
    ['.cta-band .ct-actions .cta:nth-of-type(2) span', 'Call Us', '客服專線', 'text'],
    // footer
    ['footer .foot-links a:nth-of-type(1)', 'Home',      '首頁',     'text'],
    ['footer .foot-links a:nth-of-type(2)', 'Services',  '服務項目', 'text'],
    ['footer .foot-links a:nth-of-type(3)', 'Showcase',  '作品實績', 'text'],
    ['footer .foot-links a:nth-of-type(4)', 'Training',  '技術教學', 'text'],
    ['footer .foot-links a:nth-of-type(5)', 'Locations', '據點分佈', 'text'],
    ['footer .foot-links a:nth-of-type(6)', 'Contact',   '聯絡我們', 'text'],
    ['footer .logo-text .bot-line', '© 2026 SUPERIOR PDR · ALL RIGHTS RESERVED', '© 2026 SUPERIOR PDR · 版權所有', 'text']
  ];

  function table() { return CHROME_T.concat(window.PAGE_T || []); }

  /* ── Central nav template ──────────────────────────────────────────
     Pages set <nav id="topnav" data-current="KEY"></nav> (empty).
     Keys: home | about | excellence | quality | pricing | technicians
           svc-pdr | svc-ev | svc-large | svc-alloy | svc-moto
           credentials | showcase | blog | training | contact
     To add a new page: add its key here and set data-current on that page.
  ─────────────────────────────────────────────────────────────────── */
  function buildNavHTML(cur) {
    var aboutKeys = ['excellence','about','quality','pricing','technicians'];
    var svcKeys   = ['svc-pdr','svc-ev','svc-large','svc-alloy','svc-moto'];
    var trainKeys = ['training','training-2w','training-4w','training-adv','training-event','training-school'];
    var aboutOn = aboutKeys.indexOf(cur) > -1;
    var svcOn   = svcKeys.indexOf(cur) > -1;
    var trainOn = trainKeys.indexOf(cur) > -1;
    function cc(k)  { return cur === k ? ' current' : ''; }
    function ddc(d) { return cur === d ? ' current' : ''; }
    return [
      '<a href="index.html" class="logo">',
      '  <img class="logo-circle" src="media/logo-circle.png" alt="Superior PDR">',
      '  <div class="logo-text"><div class="top-line">SUPERIOR PDR</div>',
      '  <div class="bot-line">自 2014 · 台北 · 台灣</div></div>',
      '</a>',
      '<div class="links">',
      '  <a class="nav-link'+cc('home')+'" href="index.html" data-key="home">首頁</a>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(aboutOn?' current':'')+'" href="about-us.html" data-key="about">關於我們<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('excellence')+'" data-d="excellence" href="history.html">卓越歷程</a>',
      '      <a class="ddi'+ddc('about')+'" data-d="about" href="about-us.html">關於我們</a>',
      '      <a class="ddi'+ddc('technicians')+'" data-d="technicians" href="technicians.html">卓越技師</a>',
      '      <a class="ddi'+ddc('quality')+'" data-d="quality" href="quality.html">關於修復品質</a>',
      '      <a class="ddi'+ddc('pricing')+'" data-d="pricing" href="price-2.html">參考價目與預約流程</a>',
      '    </div>',
      '  </div>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(svcOn?' current':'')+'" href="pdr.html" data-key="services">服務項目<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('svc-pdr')+'" data-d="svc-pdr" href="pdr.html">PDR凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-ev')+'" data-d="svc-ev" href="electriccar.html">電動車凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-large')+'" data-d="svc-large" href="bigdent.html">大面積凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-alloy')+'" data-d="svc-alloy" href="aluminum.html">鋁合金凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-moto')+'" data-d="svc-moto" href="motortank.html">重機油箱凹痕修復</a>',
      '    </div>',
      '  </div>',
      '  <a class="nav-link'+cc('blog')+'" href="blog.html" data-key="studio">工作日誌</a>',
      '  <a class="nav-link'+cc('case-video')+'" href="case-video.html" data-key="case">案例實績</a>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(trainOn?' current':'')+' " href="news-3.html" data-key="training">技術教學<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('training')+'" data-d="training" href="news-3.html">學習PDR</a>',
      '      <a class="ddi" href="https://www.denttrainer.com/courses/pdr-pdr-101-course" target="_blank" rel="noopener">PDR線上教學</a>',
      '      <a class="ddi'+ddc('training-2w')+'" data-d="training-2w" href="training-2week.html">中階技術訓練 <small style="opacity:.6;font-size:11px">2 Week</small></a>',
      '      <a class="ddi'+ddc('training-4w')+'" data-d="training-4w" href="training-4week.html">完整技術訓練 <small style="opacity:.6;font-size:11px">4 Week</small></a>',
      '      <a class="ddi'+ddc('training-adv')+'" data-d="training-adv" href="advancedtraining.html">PDR進階技術訓練</a>',
      '      <a class="ddi'+ddc('training-event')+'" data-d="training-event" href="advancedevent.html">國際進階訓練研討會</a>',
      '      <a class="ddi'+ddc('training-school')+'" data-d="training-school" href="vocational-school-training.html">前進校園｜技職扎根</a>',
      '    </div>',
      '  </div>',
      '  <a class="nav-link'+cc('contact')+'" href="contact.html" data-key="locations">據點分佈</a>',
      '  <a class="nav-link" href="https://www.dentstagetools.com.tw/" data-key="tools" target="_blank" rel="noopener">凹痕工廠Tools</a>',
      '</div>',
      '<div class="nav-social" style="display:flex;align-items:center;gap:8px;margin-left:10px">',
      '  <a href="https://www.facebook.com/PdrSuperior" target="_blank" rel="noopener" aria-label="Facebook" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#1877f2;text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>',
      '  <a href="https://www.instagram.com/superiorpdrtaiwan/" target="_blank" rel="noopener" aria-label="Instagram" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7);text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg></a>',
      '  <a href="https://www.youtube.com/channel/UC8mXr_dYrD6Or-jA91W1irw?view_as=subscriber" target="_blank" rel="noopener" aria-label="YouTube" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#ff0000;text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/></svg></a>',
      '</div>',
      '<a class="cta" href="https://lin.ee/7ijf0fu" target="_blank" rel="noopener">',
      '  <span>LINE 預約</span>',
      '  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>',
      '</a>',
      '<button id="langToggle" class="lang-toggle" aria-label="Toggle language">',
      '  <span class="lang-opt zh active">中</span>',
      '  <span class="lang-sep">/</span>',
      '  <span class="lang-opt en">EN</span>',
      '</button>',
      '<button id="hamBtn" class="ham" aria-label="Menu">',
      '  <span></span><span></span><span></span>',
      '</button>'
    ].join('\n');
  }

  function injectNav() {
    var nav = document.getElementById('topnav');
    if (!nav || !nav.hasAttribute('data-current')) return;
    nav.innerHTML = buildNavHTML(nav.getAttribute('data-current'));
  }

  function applyLang(lang) {
    table().forEach(function (row) {
      var sel = row[0], en = row[1], zh = row[2], mode = row[3] || 'text';
      var el = document.querySelector(sel);
      if (!el) return;
      var val = lang === 'zh' ? zh : en;
      if (mode === 'html') el.innerHTML = val; else el.textContent = val;
    });
    // any element carrying data-en / data-zh (lets page authors translate inline)
    document.querySelectorAll('[data-zh]').forEach(function (el) {
      var v = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      if (v == null) return;
      if (v.indexOf('<') !== -1) el.innerHTML = v; else el.textContent = v;
    });
    document.querySelectorAll('#langToggle .lang-opt').forEach(function (o) { o.classList.remove('active'); });
    var act = document.querySelector('#langToggle .lang-opt.' + lang);
    if (act) act.classList.add('active');
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    try { localStorage.setItem('superior-lang', lang); } catch (e) {}
  }
  window.applySuperiorLang = applyLang;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    // inject centralised nav if page uses stub pattern
    injectNav();

    // ── Mobile nav drawer ────────────────────────────────────────────
    var mobNavEl = document.createElement('div');
    mobNavEl.className = 'mob-nav';
    mobNavEl.innerHTML = [
      '<div class="mob-group"><a href="index.html">首頁</a></div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">關於我們<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="history.html">卓越歷程</a>',
      '    <a href="about-us.html">關於我們</a>',
      '    <a href="technicians.html">卓越技師</a>',
      '    <a href="quality.html">關於修復品質</a>',
      '    <a href="price-2.html">參考價目與預約流程</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">服務項目<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="pdr.html">PDR凹痕修復</a>',
      '    <a href="electriccar.html">電動車凹痕修復</a>',
      '    <a href="bigdent.html">大面積凹痕修復</a>',
      '    <a href="aluminum.html">鋁合金凹痕修復</a>',
      '    <a href="motortank.html">重機油箱凹痕修復</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group"><a href="blog.html">工作日誌</a></div>',
      '<div class="mob-group"><a href="case-video.html">案例實績</a></div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">技術教學<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="news-3.html">學習PDR</a>',
      '    <a href="https://www.denttrainer.com/courses/pdr-pdr-101-course" target="_blank" rel="noopener">PDR線上教學</a>',
      '    <a href="training-2week.html">中階技術訓練 (2 Week)</a>',
      '    <a href="training-4week.html">完整技術訓練 (4 Week)</a>',
      '    <a href="advancedtraining.html">PDR進階技術訓練</a>',
      '    <a href="advancedevent.html">國際進階訓練研討會</a>',
      '    <a href="vocational-school-training.html">前進校園｜技職扎根</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group"><a href="contact.html">據點分佈</a></div>',
      '<div class="mob-group"><a href="https://www.dentstagetools.com.tw/" target="_blank" rel="noopener">凹痕工廠Tools</a></div>',
      '<div class="mob-cta-wrap">',
      '  <a class="mob-cta" href="https://lin.ee/7ijf0fu" target="_blank" rel="noopener">',
      '    LINE 預約',
      '    <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>',
      '  </a>',
      '</div>'
    ].join('\n');
    document.body.appendChild(mobNavEl);

    var hamBtn = document.getElementById('hamBtn');
    if (hamBtn) {
      hamBtn.addEventListener('click', function () {
        hamBtn.classList.toggle('open');
        mobNavEl.classList.toggle('open');
        document.body.style.overflow = mobNavEl.classList.contains('open') ? 'hidden' : '';
      });
    }
    mobNavEl.querySelectorAll('.mob-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.mob-group').classList.toggle('open');
      });
    });
    mobNavEl.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (hamBtn) hamBtn.classList.remove('open');
        mobNavEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // assign stable nav keys to the 9 top-level links (skip dropdown items)
    var navKeys = ['home', 'about', 'services', 'studio', 'case', 'training', 'locations', 'tools'];
    document.querySelectorAll('nav.top .links .nav-link').forEach(function (a, i) {
      if (navKeys[i]) a.setAttribute('data-key', navKeys[i]);
    });

    // language
    var saved = 'zh';
    try { saved = localStorage.getItem('superior-lang') || 'zh'; } catch (e) {}
    applyLang(saved);
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.addEventListener('click', function () {
      var cur = 'zh';
      try { cur = localStorage.getItem('superior-lang') || 'zh'; } catch (e) {}
      applyLang(cur === 'zh' ? 'en' : 'zh');
    });

    // nav scrolled state
    var nav = document.getElementById('topnav');
    if (nav) window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });

    // reveal on scroll（threshold 改小，避免很高的區塊永遠達不到門檻而不顯示）
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.02, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    // 安全網：載入後 1.5 秒，將仍卡在隱藏、且已進入或接近視窗的 reveal 一律補顯示
    window.addEventListener('load', function () {
      setTimeout(function () {
        document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 1.2) el.classList.add('in');
        });
      }, 1500);
    });

    // counters
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.dataset.counter, 10), suffix = el.dataset.suffix || '';
        var start = performance.now(), dur = 1500;
        (function step(now) {
          var t = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString() + suffix;
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach(function (el) { cio.observe(el); });
  });

  /* ============ ECHO 線上諮詢浮動視窗（引導加 LINE 傳照片評估）============ */
  function buildEchoWidget() {
    if (!document.body || document.getElementById('echoWidget')) return;
    // CSS 用 JS 注入（首頁等未載入 site.css 的頁面也能正常顯示）
    if (!document.getElementById('echoStyle')) {
      var st = document.createElement('style'); st.id = 'echoStyle';
      st.textContent =
        '#echoWidget{position:fixed;right:22px;bottom:22px;z-index:99998;font-family:"Space Grotesk","Noto Sans TC",sans-serif}'
      + '.echo-fab{position:relative;width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;background:#ff2a3d;color:#fff;box-shadow:0 6px 24px rgba(255,42,61,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s}'
      + '.echo-fab:hover{transform:scale(1.07)}.echo-fab svg{width:28px;height:28px}'
      + '.echo-fab::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #ff2a3d;animation:echoPulse 2.2s ease-out infinite}'
      + '@keyframes echoPulse{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}'
      + '.echo-fab .echo-dot{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#2ecc71;border:2px solid #fff}'
      + '.echo-panel{position:absolute;right:0;bottom:78px;width:330px;max-width:calc(100vw - 32px);background:#0d1014;border:1px solid rgba(255,255,255,.13);border-radius:16px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.55);opacity:0;visibility:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom right;transition:opacity .22s,transform .22s,visibility .22s}'
      + '#echoWidget.open .echo-panel{opacity:1;visibility:visible;transform:translateY(0) scale(1)}'
      + '.echo-head{display:flex;align-items:center;gap:11px;padding:15px 16px;background:linear-gradient(135deg,#1a1f27,#11151b);border-bottom:1px solid rgba(255,255,255,.08)}'
      + '.echo-avatar{width:40px;height:40px;border-radius:50%;background:#ff2a3d;color:#fff;font-family:"Bebas Neue";font-size:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0}'
      + '.echo-name{font-size:15px;font-weight:600;color:#f3f5f8;line-height:1.2}'
      + '.echo-status{font-family:"JetBrains Mono";font-size:10px;color:#2ecc71;letter-spacing:.08em;margin-top:2px}'
      + '.echo-close{margin-left:auto;background:none;border:none;color:#9aa3b2;font-size:18px;cursor:pointer;width:28px;height:28px;border-radius:6px}'
      + '.echo-close:hover{background:rgba(255,255,255,.06);color:#fff}'
      + '.echo-body{padding:18px 16px;background:#0d1014}'
      + '.echo-body{max-height:62vh;overflow-y:auto}'
      + '.echo-msg{background:#11151b;border:1px solid rgba(255,255,255,.07);border-radius:4px 14px 14px 14px;padding:13px 15px;font-size:13.5px;line-height:1.7;color:#d3d8e0;margin-top:10px}'
      + '.echo-msg:first-child{margin-top:0}'
      + '.echo-msg.user{background:#ff2a3d;border-color:#ff2a3d;color:#fff;border-radius:14px 4px 14px 14px;margin-left:auto;max-width:80%}'
      + '.echo-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}'
      + '.echo-chip{font-size:12.5px;padding:8px 12px;border-radius:16px;border:1px solid rgba(255,42,61,.4);background:rgba(255,42,61,.08);color:#f3f5f8;cursor:pointer;transition:background .2s}'
      + '.echo-chip:hover{background:rgba(255,42,61,.18)}'
      + '.echo-quick{display:flex;flex-direction:column;gap:8px;margin-top:14px;border-top:1px solid rgba(255,255,255,.07);padding-top:14px}'
      + '.echo-quick a{display:flex;align-items:center;gap:9px;padding:11px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:#11151b;color:#f3f5f8;font-size:13.5px;text-decoration:none;transition:border-color .2s,background .2s}'
      + '.echo-quick a:hover{border-color:#ff2a3d;background:#161b22}'
      + '.echo-cta{display:flex;align-items:center;justify-content:center;gap:9px;margin:4px 16px 16px;padding:14px;border-radius:11px;background:#06C755;color:#fff;font-size:14.5px;font-weight:700;text-decoration:none}'
      + '.echo-cta:hover{filter:brightness(1.08)}.echo-cta svg{width:20px;height:20px}'
      + '.echo-input-row{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(255,255,255,.08)}'
      + '.echo-input{flex:1;background:#11151b;border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#f3f5f8;font-size:13.5px;padding:10px 12px;outline:none;font-family:inherit}'
      + '.echo-input:focus{border-color:#ff2a3d}'
      + '.echo-send{background:#ff2a3d;border:none;color:#fff;border-radius:10px;width:44px;cursor:pointer;font-size:16px;flex-shrink:0}'
      + '.echo-send:disabled{opacity:.5;cursor:default}'
      + '.echo-typing{font-size:12px;color:#9aa3b2;margin-top:10px;font-style:italic}'
      + '@media(max-width:560px){#echoWidget{right:16px;bottom:16px}.echo-fab{width:56px;height:56px}.echo-panel{bottom:70px}}';
      document.head.appendChild(st);
    }
    var LINE = 'https://lin.ee/7ijf0fu';
    var lineSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.7 2 10.2c0 4 3.6 7.4 8.5 8.05.33.07.78.22.9.5.1.26.07.66.03.92l-.14.87c-.04.26-.2 1.02.9.56s5.96-3.5 8.13-6h0C21.5 13.6 22 12 22 10.2 22 5.7 17.5 2 12 2z"/></svg>';
    var w = document.createElement('div');
    w.id = 'echoWidget';
    w.innerHTML =
      '<div class="echo-panel" role="dialog" aria-label="ECHO 線上諮詢">'
      + '<div class="echo-head"><div class="echo-avatar">E</div>'
      + '<div><div class="echo-name">ECHO 智能客服</div><div class="echo-status">● 線上中</div></div>'
      + '<button class="echo-close" aria-label="關閉">✕</button></div>'
      + '<div class="echo-body" id="echoBody">'
      + '<div class="echo-msg">嗨，我是卓越 PDR 的 AI 助理 <b>ECHO</b> 👋<br>有什麼想了解的都可以問我。想估價或預約，加官方 LINE 傳照片讓技師<b>免費評估</b>最快喔。</div>'
      + '<div class="echo-chips" id="echoChips"></div>'
      + '<div class="echo-quick">'
      + '<a href="' + LINE + '" target="_blank" rel="noopener">📷 傳照片免費估價</a>'
      + '<a href="/contact.html">📍 找最近的據點</a>'
      + '</div></div>'
      + '<div class="echo-input-row"><input class="echo-input" id="echoInput" type="text" placeholder="輸入問題，ECHO 為您解答…" maxlength="300" autocomplete="off"><button class="echo-send" id="echoSend" aria-label="送出">➤</button></div>'
      + '<a class="echo-cta" href="' + LINE + '" target="_blank" rel="noopener">' + lineSvg + '加官方 LINE 傳照片評估</a>'
      + '</div>'
      + '<button class="echo-fab" aria-label="線上諮詢 ECHO"><span class="echo-dot"></span>'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
      + '</button>';
    document.body.appendChild(w);
    var fab = w.querySelector('.echo-fab');
    var closeBtn = w.querySelector('.echo-close');
    function toggle(open) { w.classList[open ? 'add' : 'remove']('open'); }
    fab.addEventListener('click', function () { toggle(!w.classList.contains('open')); });
    closeBtn.addEventListener('click', function () { toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

    // 真・ECHO 網頁對話：常見問題與輸入框都呼叫 web-chat API
    var API = 'https://echo.pdrsuperior.com/echo/web-chat';
    var STARTERS = ['關於PDR趨勢課程資訊', '凹痕修復要多少錢？', '哪些車款能修？'];
    var body = w.querySelector('#echoBody');
    var chips = w.querySelector('#echoChips');
    var quick = w.querySelector('.echo-quick');
    var input = w.querySelector('#echoInput');
    var sendBtn = w.querySelector('#echoSend');
    var history = [];
    var busy = false;
    var session = (function () { try { var s = sessionStorage.getItem('echo_sid'); if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem('echo_sid', s); } return s; } catch (e) { return ''; } })();

    // 訊息提示音（Web Audio，免音檔）
    var _ac = null;
    function beep(freq, dur, delay, vol) {
      try {
        _ac = _ac || new (window.AudioContext || window.webkitAudioContext)();
        var o = _ac.createOscillator(), g = _ac.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        o.connect(g); g.connect(_ac.destination);
        var t = _ac.currentTime + (delay || 0);
        g.gain.setValueAtTime(vol || 0.05, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.12));
        o.start(t); o.stop(t + (dur || 0.12));
      } catch (e) {}
    }
    function soundSend() { beep(620, 0.09); }                          // 傳出：單音
    function soundReceive() { beep(880, 0.10); beep(1170, 0.12, 0.10); } // 收到：雙音

    function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
    function linkify(s) {
      return esc(s).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:#ff6b78;text-decoration:underline">$1</a>').replace(/\n/g, '<br>');
    }
    function bubble(role, htmlStr) {
      var d = document.createElement('div');
      d.className = 'echo-msg' + (role === 'user' ? ' user' : '');
      d.innerHTML = htmlStr;
      body.insertBefore(d, quick);
      body.scrollTop = body.scrollHeight;
      return d;
    }
    function sendMessage(text) {
      text = (text || '').trim();
      if (!text || busy) return;
      busy = true; sendBtn.disabled = true;
      bubble('user', esc(text));
      soundSend();
      history.push({ role: 'user', content: text });
      var typing = bubble('echo', '<span class="echo-typing">ECHO 輸入中…</span>');
      fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history, session: session }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          typing.remove();
          if (d && d.reply) {
            history.push({ role: 'assistant', content: d.reply });
            var out = linkify(d.reply);
            if (d.reply.indexOf('lin.ee/56xjQEm') !== -1) {
              out += '<br><img src="https://qr-official.line.me/gs/M_876hlotl_GW.png?oat_content=qr" alt="趨勢課 LINE QR" style="width:150px;height:auto;border-radius:8px;margin-top:8px;display:block">';
            }
            bubble('echo', out); soundReceive();
          }
          else { throw new Error('no reply'); }
        })
        .catch(function () {
          typing.remove();
          bubble('echo', '不好意思，我這邊忙線中。估價或預約最快的方式是加官方 LINE，傳照片讓技師免費評估喔。<br><a href="' + LINE + '" target="_blank" rel="noopener" style="color:#06C755;font-weight:700">點我加官方 LINE</a>');
          soundReceive();
        })
        .finally(function () { busy = false; sendBtn.disabled = false; if (input) input.focus(); });
    }
    STARTERS.forEach(function (q) {
      var b = document.createElement('button');
      b.className = 'echo-chip'; b.type = 'button'; b.textContent = q;
      b.addEventListener('click', function () { sendMessage(q); });
      chips.appendChild(b);
    });
    sendBtn.addEventListener('click', function () { var v = input.value; input.value = ''; sendMessage(v); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var v = input.value; input.value = ''; sendMessage(v); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildEchoWidget);
  else buildEchoWidget();
})();
