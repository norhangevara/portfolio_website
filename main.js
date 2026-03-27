/* ============================================================
   NORHAN GEVARA PORTFOLIO — MAIN JS
   v3 — matches CSS class names exactly
   ============================================================ */

/* ─── HELPERS ─────────────────────────────────────────────── */
function pad2(n) { return n < 10 ? '0' + n : String(n); }

/* ─── PAGE LOADER ──────────────────────────────────────────── */
function runPageLoader() {
  var loader = document.getElementById('page-loader');
  var numEl  = document.getElementById('loader-num');
  if (!loader) return;

  var start = null;
  var dur   = 1400;

  function step(ts) {
    if (!start) start = ts;
    var prog = Math.min(1, (ts - start) / dur);
    var val  = Math.floor(prog * 100);
    if (numEl) numEl.textContent = val;
    if (prog < 1) {
      requestAnimationFrame(step);
    } else {
      if (numEl) numEl.textContent = '100';
      setTimeout(function() {
        loader.classList.add('out');
        setTimeout(function() {
          document.body.classList.add('loaded');
          var cue = document.getElementById('scroll-cue');
          if (cue) setTimeout(function() { cue.classList.add('show'); }, 350);
        }, 520);
      }, 200);
    }
  }
  requestAnimationFrame(step);
}

/* ─── BUILD LETTER-MASK HERO NAME ─────────────────────────── */
function buildHeroName() {
  var el = document.getElementById('hero-name');
  if (!el) return;

  var name = 'NORHAN GEVARA';
  el.innerHTML = '';

  for (var i = 0; i < name.length; i++) {
    var ch = name[i];
    if (ch === ' ') {
      var sp = document.createElement('span');
      sp.className = 'lm-char space';
      el.appendChild(sp);
    } else {
      var wrap  = document.createElement('span');
      wrap.className = 'lm-char';

      var inner = document.createElement('span');
      inner.className = 'lm-inner';

      var top = document.createElement('span');
      top.className   = 'lm-top';
      top.textContent = ch;

      var bot = document.createElement('span');
      bot.className   = 'lm-bot';
      bot.textContent = ch;

      inner.appendChild(top);
      inner.appendChild(bot);
      wrap.appendChild(inner);
      el.appendChild(wrap);
    }
  }
}

/* ─── HERO SCROLL EXPAND ──────────────────────────────────── */
function initHeroScrollExpand() {
  var outer   = document.getElementById('hero-outer');
  var leftEl  = document.getElementById('hero-left');
  var rightEl = document.getElementById('hero-right');
  var card    = document.getElementById('hero-card');
  var cue     = document.getElementById('scroll-cue');
  if (!outer || !card) return;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function onScroll() {
    var y     = window.scrollY || window.pageYOffset;
    var total = outer.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    var prog = Math.max(0, Math.min(1, y / total));
    var ep   = ease(prog);

    card.style.width        = (26 + 74 * ep) + 'vw';
    card.style.height       = (68 + 32 * ep) + 'vh';
    card.style.borderRadius = (8 * (1 - ease(Math.min(1, prog * 1.6)))) + 'px';

    if (leftEl && rightEl) {
      var shift  = ep * 18;
      var sideOp = Math.max(0, 1 - prog * 2.4);
      leftEl.style.transform  = 'translateX(' + shift + 'vw)';
      rightEl.style.transform = 'translateX(-' + shift + 'vw)';
      leftEl.style.opacity    = sideOp;
      rightEl.style.opacity   = sideOp;
    }

    if (cue) cue.style.opacity = Math.max(0, 1 - prog * 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

/* ─── LIVE CLOCK ──────────────────────────────────────────── */
function startClock() {
  var clocks = document.querySelectorAll('[data-clock],[data-live-clock]');
  if (!clocks.length) return;

  function update() {
    var now   = new Date();
    var cairo = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    var h     = cairo.getHours();
    var h12   = h % 12 || 12;
    var ampm  = h >= 12 ? 'PM' : 'AM';
    var str   = pad2(h12) + ':' + pad2(cairo.getMinutes()) + ':' + pad2(cairo.getSeconds()) + ' ' + ampm + '  GMT+2';
    for (var i = 0; i < clocks.length; i++) clocks[i].textContent = str;
  }
  update();
  setInterval(update, 1000);
}

/* ─── HEADER SCROLL ───────────────────────────────────────── */
function initHeaderScroll() {
  var header = document.getElementById('site-header');
  if (!header) return;
  var lastY = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY || window.pageYOffset;
    if (y > lastY && y > 80) header.classList.add('hide');
    else                     header.classList.remove('hide');
    lastY = y;
  }, { passive: true });
}

/* ─── BACK TO TOP ─────────────────────────────────────────── */
function initBackToTop() {
  var btns = document.querySelectorAll('#back-top, .back-top, .back-top-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal() {
  var items = document.querySelectorAll('.reveal, .reveal-up, .fade-up, .fade-in, .reveal-clip');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    for (var k = 0; k < items.length; k++) {
      items[k].classList.add('in');
      items[k].classList.add('visible');
    }
    return;
  }

  var obs = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var el    = entry.target;
        var delay = parseFloat(el.getAttribute('data-delay') || 0);
        (function(element) {
          setTimeout(function() {
            element.classList.add('in');
            element.classList.add('visible');
          }, delay * 1000);
        })(el);
        obs.unobserve(el);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  for (var j = 0; j < items.length; j++) obs.observe(items[j]);
}

/* ─── CUSTOM CURSOR ───────────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var ring = document.createElement('div');
  ring.id  = 'cursor-ring';
  var dot  = document.createElement('div');
  dot.id   = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + (mx - 2) + 'px,' + (my - 2) + 'px)';
  });

  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = 'translate(' + (rx - 18) + 'px,' + (ry - 18) + 'px)';
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseover', function(e) {
    var t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.classList.contains('cs-card') || t.classList.contains('w-card') ||
        t.classList.contains('pg-item') || t.classList.contains('pg-name-item')) {
      ring.classList.add('hov');
    }
  });
  document.addEventListener('mouseout', function(e) {
    var t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON' ||
        t.classList.contains('cs-card') || t.classList.contains('w-card') ||
        t.classList.contains('pg-item') || t.classList.contains('pg-name-item')) {
      ring.classList.remove('hov');
    }
  });
}

/* ─── MAGNETIC BUTTONS ────────────────────────────────────── */
function initMagneticButtons() {
  var btns = document.querySelectorAll('.pill-btn, .btn-pill');
  for (var i = 0; i < btns.length; i++) {
    (function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width  / 2) * 0.25;
        var y = (e.clientY - r.top  - r.height / 2) * 0.25;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function() { btn.style.transform = ''; });
    })(btns[i]);
  }
}

/* ─── HOMEPAGE PLAYGROUND HOVER ───────────────────────────── */
function initPgListHover() {
  var list     = document.getElementById('pg-list');
  var hoverImg = document.getElementById('pg-hover-img');
  if (!list || !hoverImg) return;

  var mx = 0, my = 0, cx = 0, cy = 0;
  var numEl = document.getElementById('pg-hph-num');

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
  });

  (function anim() {
    cx += (mx - cx) * 0.09;
    cy += (my - cy) * 0.09;
    hoverImg.style.left = cx + 'px';
    hoverImg.style.top  = cy + 'px';
    requestAnimationFrame(anim);
  })();

  var items = list.querySelectorAll('.pg-item');
  for (var i = 0; i < items.length; i++) {
    (function(item, idx) {
      item.addEventListener('mouseenter', function() {
        if (numEl) numEl.textContent = (idx < 9 ? '0' : '') + (idx + 1);
        hoverImg.classList.add('on');
      });
      item.addEventListener('mouseleave', function() {
        hoverImg.classList.remove('on');
      });
    })(items[i], i);
  }
}

/* ─── CAROUSEL (works.html + playground.html) ─────────────── */
function initCarousel() {
  var isWorks      = document.body.classList.contains('page-works');
  var isPlayground = document.body.classList.contains('page-playground');
  if (!isWorks && !isPlayground) return;

  var scene  = document.getElementById(isWorks ? 'carousel-scene' : 'pg-scene');
  if (!scene) return;

  var strip  = scene.querySelector('.cs-strip');
  if (!strip) return;

  var cards   = strip.querySelectorAll('.cs-card');
  var total   = cards.length;
  if (!total) return;

  var current = 0;
  var titleEl  = document.getElementById('cs-title');
  var ctrEl    = scene.querySelector('.cs-counter');
  var timerEl  = scene.querySelector('.cs-timer');
  var prevBtn  = scene.querySelector('.cs-prev');
  var nextBtn  = scene.querySelector('.cs-next');
  var nameList = document.getElementById('pg-name-list');

  /* update visual states */
  function updateStates() {
    for (var i = 0; i < total; i++) {
      var c    = cards[i];
      var diff = ((i - current) + total) % total;
      // diff: 0=active, 1=next, total-1=prev
      c.classList.remove('cs-active', 'cs-prev-card', 'cs-next-card', 'cs-far');
      if      (diff === 0)           c.classList.add('cs-active');
      else if (diff === total - 1)   c.classList.add('cs-prev-card');
      else if (diff === 1)           c.classList.add('cs-next-card');
      else                           c.classList.add('cs-far');
    }

    /* title fade swap */
    var newTitle = cards[current].getAttribute('data-title') || '';
    if (titleEl) {
      titleEl.style.opacity   = '0';
      titleEl.style.transform = 'translateY(6px)';
      setTimeout(function() {
        titleEl.textContent     = newTitle;
        titleEl.style.opacity   = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 180);
    }

    /* counter */
    if (ctrEl) ctrEl.textContent = pad2(current + 1) + ' / ' + pad2(total);

    /* playground name list */
    if (nameList) {
      var nItems = nameList.querySelectorAll('.pg-name-item');
      for (var j = 0; j < nItems.length; j++) {
        if (j === current) nItems[j].classList.add('active');
        else               nItems[j].classList.remove('active');
      }
    }

    /* pagination dots */
    var dots = scene.querySelectorAll('.cs-page-num');
    for (var d = 0; d < dots.length; d++) {
      if (d === current) dots[d].classList.add('active');
      else               dots[d].classList.remove('active');
    }
  }

  function goTo(n) {
    current = ((n % total) + total) % total;
    updateStates();
  }

  /* nav buttons */
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });

  /* name list click (playground) */
  if (nameList) {
    var ni = nameList.querySelectorAll('.pg-name-item');
    for (var x = 0; x < ni.length; x++) {
      (function(item, idx) {
        item.addEventListener('click', function() { goTo(idx); });
      })(ni[x], x);
    }
  }

  /* card click */
  strip.addEventListener('click', function(e) {
    var card = e.target;
    /* walk up to .cs-card */
    while (card && card !== strip) {
      if (card.classList && card.classList.contains('cs-card')) break;
      card = card.parentNode;
    }
    if (!card || card === strip) return;
    if (card.classList.contains('cs-active')) {
      var href = card.getAttribute('data-href');
      if (href) window.location.href = href;
    } else if (card.classList.contains('cs-prev-card')) {
      goTo(current - 1);
    } else if (card.classList.contains('cs-next-card')) {
      goTo(current + 1);
    }
  });

  /* keyboard */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  /* touch swipe */
  var touchX0 = 0;
  strip.addEventListener('touchstart', function(e) {
    touchX0 = e.touches[0].clientX;
  }, { passive: true });
  strip.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchX0;
    if (Math.abs(dx) > 50) { if (dx < 0) goTo(current + 1); else goTo(current - 1); }
  });

  /* running timer */
  if (timerEl) {
    var secs = 0;
    setInterval(function() {
      secs++;
      timerEl.textContent = pad2(Math.floor(secs / 3600)) + ':' + pad2(Math.floor((secs % 3600) / 60)) + ':' + pad2(secs % 60);
    }, 1000);
  }

  /* initial */
  updateStates();
  setTimeout(function() { scene.classList.add('in'); }, 80);
}

/* ─── DISCIPLINE REVEAL (About) ───────────────────────────── */
function initDisciplineReveal() {
  var lines = document.querySelectorAll('.disc-line');
  if (!lines.length) return;

  var obs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      var all = document.querySelectorAll('.disc-line');
      for (var i = 0; i < all.length; i++) {
        (function(line, idx) {
          setTimeout(function() { line.classList.add('lit'); }, idx * 90);
        })(all[i], i);
      }
      obs.disconnect();
    }
  }, { threshold: 0.15 });

  obs.observe(lines[0]);
}

/* ─── ABOUT BLEED TITLE PARALLAX ─────────────────────────── */
function initAboutParallax() {
  var title = document.querySelector('.about-bleed-title');
  if (!title) return;
  window.addEventListener('scroll', function() {
    var y = window.scrollY || window.pageYOffset;
    title.style.transform = 'translateX(' + (y * -0.04) + 'px)';
  }, { passive: true });
}

/* ─── PROJECT TABS ────────────────────────────────────────── */
function initProjectTabs() {
  var tabs    = document.querySelectorAll('.project-tab');
  var content = document.getElementById('project-tab-content');
  if (!tabs.length || !content) return;

  var map = {
    overview: 'A brand system that holds together across every touchpoint — from strategy through to execution. This project began with a positioning audit and ended with a complete visual language.',
    approach: 'Every decision was made backwards from the question: how does this feel when someone encounters it in the real world? The system was stress-tested across digital, print, and environmental contexts before a single logo was finalized.',
    outcome:  'A cohesive brand identity with full guidelines, primary and secondary mark system, typographic hierarchy, colour palette, and application across key brand touchpoints.',
    details:  'Completed over 8 weeks. All assets delivered as editable source files (Figma + Illustrator), with a brand guidelines PDF and implementation notes.'
  };

  content.style.transition = 'opacity .25s ease, transform .25s ease';

  for (var i = 0; i < tabs.length; i++) {
    (function(tab) {
      tab.addEventListener('click', function() {
        for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove('active');
        tab.classList.add('active');
        var key = tab.getAttribute('data-tab');
        content.style.opacity   = '0';
        content.style.transform = 'translateY(6px)';
        setTimeout(function() {
          content.textContent     = map[key] || '';
          content.style.opacity   = '1';
          content.style.transform = 'translateY(0)';
        }, 200);
      });
    })(tabs[i]);
  }
}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  buildHeroName();
  startClock();
  initHeaderScroll();
  initBackToTop();
  initScrollReveal();
  initCursor();
  initMagneticButtons();
  initPgListHover();
  initHeroScrollExpand();
  initCarousel();
  initDisciplineReveal();
  initAboutParallax();
  initProjectTabs();

  if (document.getElementById('page-loader')) {
    runPageLoader();
  }
});
