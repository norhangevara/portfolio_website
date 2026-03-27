/* ============================================================
   NORHAN GEVARA PORTFOLIO — MAIN JS
   ============================================================ */

/* ── PAGE LOADER ── */
function runPageLoader() {
  var loader = document.getElementById('page-loader');
  var numEl  = document.getElementById('loader-number');
  if (!loader || !numEl) return;

  var count    = 100;
  var duration = 1400;
  var steps    = 30;
  var stepTime = duration / steps;
  var decrement = count / steps;

  var interval = setInterval(function() {
    count = Math.max(0, count - decrement);
    numEl.textContent = String(Math.round(count)).padStart(3, '0');
    if (count <= 0) {
      clearInterval(interval);
      numEl.textContent = '000';
      setTimeout(function() {
        loader.classList.add('hidden');
        setTimeout(function() {
          startHeroEntrance();
        }, 300);
      }, 200);
    }
  }, stepTime);
}

/* ── BUILD LETTER-MASK HERO NAME ── */
function buildHeroName() {
  var nameEl = document.getElementById('hero-name');
  if (!nameEl) return;

  var fullName = 'NORHAN GEVARA';
  nameEl.innerHTML = '';

  for (var i = 0; i < fullName.length; i++) {
    var ch = fullName[i];
    if (ch === ' ') {
      var sp = document.createElement('span');
      sp.className = 'hero-letter space';
      nameEl.appendChild(sp);
    } else {
      var wrap = document.createElement('span');
      wrap.className = 'hero-letter';

      var inner = document.createElement('span');
      inner.className = 'hero-letter-inner';

      var top = document.createElement('span');
      top.className = 'hero-letter-top';
      top.textContent = ch;

      var bot = document.createElement('span');
      bot.className = 'hero-letter-bot';
      bot.textContent = ch;

      inner.appendChild(top);
      inner.appendChild(bot);
      wrap.appendChild(inner);
      nameEl.appendChild(wrap);
    }
  }
}

/* ── HERO ENTRANCE (after loader) ── */
function startHeroEntrance() {
  var nameWrap = document.getElementById('hero-name-wrap');
  var scrollCue = document.getElementById('scroll-cue');

  if (nameWrap) {
    // Name appears centered
    nameWrap.classList.add('visible');
  }

  // After a moment, reveal scroll cue
  setTimeout(function() {
    if (scrollCue) scrollCue.classList.add('visible');
  }, 800);

  // After more time, name moves up and video/sides appear
  setTimeout(function() {
    revealHeroMiddle();
  }, 1400);
}

function revealHeroMiddle() {
  var nameWrap  = document.getElementById('hero-name-wrap');
  var middleRow = document.getElementById('hero-middle-row');
  var scrollCue = document.getElementById('scroll-cue');

  if (nameWrap)  nameWrap.classList.add('moved-up');
  if (middleRow) middleRow.classList.add('visible');
  if (scrollCue) {
    scrollCue.classList.add('hidden-out');
    setTimeout(function() {
      scrollCue.classList.remove('visible');
    }, 500);
  }
}

/* ── HERO SCROLL EXPAND ── */
function initHeroScrollExpand() {
  var container = document.getElementById('hero-scroll-container');
  var hero      = document.getElementById('hero');
  var videoCard = document.getElementById('hero-video-card');
  var sideLeft  = document.getElementById('hero-side-left');
  var sideRight = document.getElementById('hero-side-right');
  var nameWrap  = document.getElementById('hero-name-wrap');

  if (!container || !hero || !videoCard) return;

  var vh = window.innerHeight;

  // Set container height to create scroll space
  // 0–100% scroll: hero animates; 100%+: user has scrolled past
  container.style.height = (vh * 3) + 'px';

  function onScroll() {
    var scrollY  = window.scrollY;
    var maxScroll = container.offsetHeight - vh;
    var progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    // p0: 0–0.4 → video card grows
    // p1: 0–0.6 → sides converge
    // p2: 0.6–1 → card goes full bleed

    var cardProgress = Math.min(1, progress / 0.5);
    var sideProgress = Math.min(1, progress / 0.7);
    var bleedProgress = Math.max(0, (progress - 0.5) / 0.5);

    // Card: grows from ~28vw to 100vw, aspect changes
    var vw = window.innerWidth;
    var baseW = Math.min(380, vw * 0.28);
    var targetW = vw;
    var cardW = baseW + (targetW - baseW) * cardProgress;

    // Height: from natural aspect (9/14) to 100vh
    var baseH = baseW * (14/9);
    var targetH = vh;
    var cardH = baseH + (targetH - baseH) * cardProgress;

    // Border radius: from 8px to 0
    var cardR = 8 * (1 - bleedProgress);

    videoCard.style.width  = cardW + 'px';
    videoCard.style.height = cardH + 'px';
    videoCard.style.borderRadius = cardR + 'px';

    // Sides converge: start far apart, end beside card
    // At progress=0: at edges
    // At progress=0.7: just outside the card
    if (sideLeft && sideRight) {
      var sideOffset = (1 - sideProgress) * 80; // extra vw offset
      var basePad = 40;
      var sideX = basePad + sideOffset;

      var halfCard = cardW / 2;
      var targetX = (vw / 2) - halfCard - 80;
      var leftX = sideOffset > 0
        ? -(sideOffset * 1.2) + 'px'
        : Math.max(0, (vw / 2) - halfCard - 100) * sideProgress + 'px';

      // Simpler: just translate them toward center as card grows
      var convergeFactor = sideProgress;
      sideLeft.style.transform  = 'translateX(' + (-convergeFactor * 60) + 'px)';
      sideRight.style.transform = 'translateX(' +  (convergeFactor * 60) + 'px)';

      // Fade sides out as card goes full bleed
      var sideOpacity = 1 - bleedProgress;
      sideLeft.style.opacity  = sideOpacity;
      sideRight.style.opacity = sideOpacity;
    }

    // Name: fade out as video takes over
    if (nameWrap) {
      var nameOpacity = 1 - Math.min(1, progress / 0.2);
      nameWrap.style.opacity = nameOpacity;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Update on resize
  window.addEventListener('resize', function() {
    vh = window.innerHeight;
    container.style.height = (vh * 3) + 'px';
    onScroll();
  });
  onScroll();
}

/* ── BUILD LETTER-BY-LETTER TITLES ── */
function buildLetterTitles() {
  var wraps = document.querySelectorAll('.letter-title-wrap');
  wraps.forEach(function(wrap) {
    var text  = wrap.dataset.letters || '';
    var titleEl = wrap.querySelector('.letter-title');
    if (!titleEl || !text) return;

    titleEl.innerHTML = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === ' ') {
        var sp = document.createElement('span');
        sp.className = 'lt-space';
        titleEl.appendChild(sp);
      } else {
        var outer = document.createElement('span');
        outer.className = 'lt-char';

        var inner = document.createElement('span');
        inner.className = 'lt-char-inner';
        inner.textContent = ch;

        outer.appendChild(inner);
        titleEl.appendChild(outer);
      }
    }
  });
}

function initLetterTitleReveal() {
  var wraps = document.querySelectorAll('.letter-title-wrap');
  wraps.forEach(function(wrap) {
    var chars = Array.from(wrap.querySelectorAll('.lt-char'));
    if (!chars.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          chars.forEach(function(char, i) {
            setTimeout(function() {
              char.classList.add('revealed');
            }, i * 45);
          });
          observer.unobserve(wrap);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(wrap);
  });
}

/* ── PLAYGROUND HOVER IMAGE ── */
function initPlaygroundHover() {
  var list     = document.getElementById('playground-list');
  var hoverImg = document.getElementById('pg-hover-image');
  if (!list || !hoverImg) return;

  var mouseX = 0, mouseY = 0;
  var imgX = 0, imgY = 0;
  var isHovering = false;
  var currentItem = null;
  var rafId = null;

  // Color backgrounds per item (replace with real images using bg-image)
  var colors = [
    'rgba(56,30,18,0.95)',
    'rgba(140,115,85,0.95)',
    'rgba(176,91,59,0.95)',
    'rgba(13,13,13,0.95)',
    'rgba(100,80,60,0.95)',
  ];

  var items = Array.from(list.querySelectorAll('.playground-item'));
  items.forEach(function(item, idx) {
    item.addEventListener('mouseenter', function(e) {
      isHovering = true;
      currentItem = item;

      // Update color
      var ph = hoverImg.querySelector('.pg-img-placeholder');
      if (ph) {
        ph.style.background = colors[idx % colors.length];
        ph.textContent = String(idx + 1).padStart(2, '0');
      }

      hoverImg.classList.add('visible');
      if (!rafId) animateImg();
    });

    item.addEventListener('mouseleave', function() {
      isHovering = false;
      currentItem = null;
      hoverImg.classList.remove('visible');
    });
  });

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateImg() {
    imgX += (mouseX - imgX) * 0.1;
    imgY += (mouseY - imgY) * 0.1;
    hoverImg.style.left = imgX + 'px';
    hoverImg.style.top  = imgY + 'px';

    if (isHovering) {
      rafId = requestAnimationFrame(animateImg);
    } else {
      rafId = null;
    }
  }
}

/* ── LIVE CLOCK (Cairo GMT+2) ── */
function startClock() {
  var clocks = document.querySelectorAll('[data-live-clock]');
  if (!clocks.length) return;

  function update() {
    var now = new Date();
    var cairoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    var h    = cairoTime.getHours();
    var h12  = String(h % 12 || 12);
    var m    = String(cairoTime.getMinutes()).padStart(2, '0');
    var ampm = h >= 12 ? 'PM' : 'AM';
    var str  = h12 + ':' + m + ' ' + ampm + '  GMT+2';
    clocks.forEach(function(el) { el.textContent = str; });
  }
  update();
  setInterval(update, 1000);
}

/* ── HEADER SCROLL EFFECT ── */
function initHeaderScroll() {
  var header = document.getElementById('site-header');
  if (!header) return;

  var lastY = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    if (y > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (y > lastY && y > 80) {
      header.classList.add('hidden-up');
    } else {
      header.classList.remove('hidden-up');
    }
    lastY = y;
  }, { passive: true });
}

/* ── BACK TO TOP ── */
function initBackToTop() {
  document.querySelectorAll('.back-top-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ── SCROLL REVEAL (fade-up, fade-in, reveal-clip) ── */
function initScrollReveal() {
  var items = document.querySelectorAll('.reveal-clip, .fade-up, .fade-in');
  if (!items.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = parseFloat(entry.target.dataset.delay || 0);
        var el = entry.target;
        setTimeout(function() {
          el.classList.add('visible');
        }, delay * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function(item) { observer.observe(item); });
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  var dot = document.createElement('div');
  dot.id = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  var mouseX = -100, mouseY = -100;
  var curX = -100, curY = -100;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px)';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.transform = 'translate(' + curX + 'px,' + curY + 'px)';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .card, .carousel-item, .playground-item').forEach(function(el) {
    el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
  });

  document.addEventListener('mouseleave', function() {
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function() {
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  });
}

/* ── MAGNETIC BUTTONS ── */
function initMagneticButtons() {
  document.querySelectorAll('.btn-pill').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width  / 2;
      var y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.25) + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'background 0.3s ease, color 0.3s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
}

/* ── CAROUSEL (Works & Playground pages) ── */
function initCarousel() {
  var strip = document.getElementById('carousel-strip');
  if (!strip) return;

  var items       = Array.from(strip.querySelectorAll('.carousel-item'));
  var titleEl     = document.getElementById('carousel-title');
  var counterEl   = document.getElementById('carousel-counter');
  var timerEl     = document.getElementById('carousel-timer');
  var total       = items.length;
  var current     = 0;

  var names = items.map(function(el) { return el.dataset.title || ''; });

  if (titleEl) {
    titleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  function updateCarousel(newIdx) {
    current = ((newIdx % total) + total) % total;

    items.forEach(function(item, i) {
      item.classList.remove('active', 'adjacent', 'hidden');
      var diff = ((i - current + total) % total);
      if (diff === 0)                       item.classList.add('active');
      else if (diff === 1 || diff === total-1) item.classList.add('adjacent');
      else                                  item.classList.add('hidden');
    });

    // Position adjacent items
    var activeEl = items[current];
    var prevIdx = ((current - 1 + total) % total);
    var nextIdx = ((current + 1) % total);
    var prevEl  = items[prevIdx];
    var nextEl  = items[nextIdx];

    // Reset transforms on all
    items.forEach(function(item) {
      if (item.classList.contains('hidden')) {
        item.style.transform = 'scale(0.8)';
        item.style.left = '50%';
        item.style.top  = '50%';
        item.style.marginLeft = '-' + (item.offsetWidth  / 2) + 'px';
        item.style.marginTop  = '-' + (item.offsetHeight / 2) + 'px';
      }
    });

    if (activeEl) {
      activeEl.style.transform = 'translate(-50%,-50%)';
      activeEl.style.left = '50%';
      activeEl.style.top  = '50%';
    }
    if (prevEl && prevEl !== activeEl) {
      var offset = (activeEl ? activeEl.offsetWidth * 0.7 : 300);
      prevEl.style.left = '50%';
      prevEl.style.top  = '50%';
      prevEl.style.transform = 'translate(calc(-50% - ' + offset + 'px), -50%) scale(0.9)';
    }
    if (nextEl && nextEl !== activeEl) {
      var offsetN = (activeEl ? activeEl.offsetWidth * 0.7 : 300);
      nextEl.style.left = '50%';
      nextEl.style.top  = '50%';
      nextEl.style.transform = 'translate(calc(-50% + ' + offsetN + 'px), -50%) scale(0.9)';
    }

    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(8px)';
      setTimeout(function() {
        titleEl.textContent = names[current];
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 200);
    }

    if (counterEl) counterEl.textContent = String(current + 1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  }

  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { updateCarousel(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { updateCarousel(current + 1); });

  items.forEach(function(item, i) {
    item.addEventListener('click', function() {
      if (i === current && item.dataset.href) {
        window.location.href = item.dataset.href;
      } else {
        updateCarousel(i);
      }
    });
  });

  // Touch swipe
  var touchStartX = 0;
  strip.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  strip.addEventListener('touchend', function(e) {
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) updateCarousel(delta < 0 ? current + 1 : current - 1);
  });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   updateCarousel(current - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') updateCarousel(current + 1);
  });

  // Timer
  if (timerEl) {
    var secs = 0;
    setInterval(function() {
      secs++;
      var hh = String(Math.floor(secs / 3600)).padStart(2, '0');
      var mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
      var ss = String(secs % 60).padStart(2, '0');
      timerEl.textContent = hh + ':' + mm + ':' + ss;
    }, 1000);
  }

  updateCarousel(0);
  // Re-position on resize
  window.addEventListener('resize', function() { updateCarousel(current); });
}

/* ── CAROUSEL PAGE ENTRANCE (works / playground pages) ── */
function initCarouselPageEntrance() {
  var page = document.getElementById('carousel-page');
  if (!page) return;

  setTimeout(function() {
    page.classList.add('page-entered');
  }, 100);
}

/* ── PROJECT TABS ── */
function initProjectTabs() {
  var tabs    = document.querySelectorAll('.project-tab');
  var content = document.getElementById('project-tab-content');
  if (!tabs.length || !content) return;

  var contentMap = {
    overview: 'A brand system that holds together across every touchpoint — from strategy through to execution. This project began with a positioning audit and ended with a complete visual language.',
    approach: 'Every decision was made backwards from the question: how does this feel when someone encounters it in the real world? The system was stress-tested across digital, print, and environmental contexts before a single logo was finalized.',
    outcome:  'A cohesive brand identity with full guidelines, primary and secondary mark system, typographic hierarchy, colour palette, and application across key brand touchpoints.',
    details:  'Completed over 8 weeks. All assets delivered as editable source files (Figma + Illustrator), with a brand guidelines PDF and implementation notes.',
  };

  content.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var key = tab.dataset.tab;
      content.style.opacity = '0';
      content.style.transform = 'translateY(6px)';
      setTimeout(function() {
        content.textContent = contentMap[key] || '';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 200);
    });
  });
}

/* ── DISCIPLINE REVEAL (About page) ── */
function initDisciplineReveal() {
  var lines = document.querySelectorAll('.discipline-line');
  if (!lines.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var allLines = document.querySelectorAll('.discipline-line');
        allLines.forEach(function(line, i) {
          setTimeout(function() {
            line.style.color = 'rgba(' + getComputedStyle(document.documentElement).getPropertyValue('--cl-text-1') + ', 0.9)';
            line.style.transition = 'color 0.7s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.1) + 's';
          }, i * 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(lines[0]);
}

/* ── ABOUT HERO ENTRANCE ── */
function initAboutEntrance() {
  var hero = document.getElementById('about-hero');
  if (!hero) return;

  var els = hero.querySelectorAll('.reveal-clip, .fade-up');
  els.forEach(function(el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'none';
    setTimeout(function() {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1) ' + (i*0.08) + 's, transform 0.8s cubic-bezier(0.22,1,0.36,1) ' + (i*0.08) + 's';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 80);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  // Build dynamic elements first
  buildHeroName();
  buildLetterTitles();

  // Start loader (homepage) or carousel entrance (works/playground)
  var loader = document.getElementById('page-loader');
  if (loader) {
    runPageLoader();
  }

  // Hero scroll (homepage only)
  if (document.getElementById('hero-scroll-container')) {
    initHeroScrollExpand();
  }

  // Letter title reveal
  initLetterTitleReveal();

  // Playground hover
  initPlaygroundHover();

  // Global
  startClock();
  initHeaderScroll();
  initBackToTop();
  initScrollReveal();
  initCursor();
  initMagneticButtons();

  // Carousel pages
  if (document.getElementById('carousel-strip')) {
    initCarousel();
    initCarouselPageEntrance();
  }

  // Project detail
  initProjectTabs();

  // About
  initDisciplineReveal();
  if (document.body.classList.contains('page-about')) {
    initAboutEntrance();
  }
});
