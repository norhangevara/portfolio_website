/* ============================================================
   NORHAN GEVARA PORTFOLIO — MAIN JS
   ============================================================ */

/* ── PAGE LOADER ── */
function runPageLoader() {
  const loader = document.getElementById('page-loader');
  const numEl  = document.getElementById('loader-number');
  if (!loader || !numEl) return;

  let count = 100;
  const duration = 1400;
  const steps = 30;
  const stepTime = duration / steps;
  const decrement = count / steps;

  const interval = setInterval(() => {
    count = Math.max(0, count - decrement);
    numEl.textContent = String(Math.round(count)).padStart(3, '0');
    if (count <= 0) {
      clearInterval(interval);
      numEl.textContent = '000';
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(animateHeroEntrance, 300);
      }, 200);
    }
  }, stepTime);
}

/* ── HERO ENTRANCE (staggered reveal after loader) ── */
function animateHeroEntrance() {
  const els = [
    document.querySelector('.hero-title-wrap'),
    document.querySelector('.hero-subtitle-left'),
    document.querySelector('.hero-subtitle-right'),
    document.querySelector('.hero-card'),
    document.querySelector('.scroll-down'),
  ].filter(Boolean);

  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'none';
  });

  requestAnimationFrame(() => {
    els.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 90);
    });
  });
}

/* ── LIVE CLOCK (Cairo GMT+2) ── */
function startClock() {
  const clocks = document.querySelectorAll('[data-live-clock]');
  if (!clocks.length) return;

  function update() {
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    const h12  = String(cairoTime.getHours() % 12 || 12);
    const m    = String(cairoTime.getMinutes()).padStart(2, '0');
    const ampm = cairoTime.getHours() >= 12 ? 'PM' : 'AM';
    clocks.forEach(el => { el.textContent = h12 + ':' + m + ' ' + ampm + '  GMT+2'; });
  }
  update();
  setInterval(update, 1000);
}

/* ── HEADER SCROLL EFFECT ── */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastY = 0;
  window.addEventListener('scroll', function() {
    const y = window.scrollY;
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

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-clip, .fade-up, .fade-in');
  if (!items.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function(item) { observer.observe(item); });
}

/* ── SMOOTH SECTION TITLE REVEAL ── */
function initTitleReveal() {
  const titles = document.querySelectorAll('.section-title-bleed, .section-title-bleed-light');
  if (!titles.length) return;

  titles.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)';
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  titles.forEach(function(el) { observer.observe(el); });
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  const dot = document.createElement('div');
  dot.id = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.transform = 'translate(' + curX + 'px, ' + curY + 'px)';
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
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
      btn.style.transition = 'background 0.3s ease, color 0.3s ease';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'background 0.3s ease, color 0.3s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
}

/* ── FEATURED CARD ROTATOR (Homepage hero) ── */
var heroProjects = [
  { category: 'Brand Identity', year: '2025', title: 'Project 01' },
  { category: 'Art Direction', year: '2025', title: 'Project 02' },
  { category: 'Visual Systems', year: '2026', title: 'Project 03' },
  { category: 'Typography', year: '2025', title: 'Project 04' },
];

function initHeroCard() {
  const catEl  = document.getElementById('hero-card-cat');
  const yearEl = document.getElementById('hero-card-year');
  const phEl   = document.getElementById('hero-card-ph');
  if (!catEl) return;

  [catEl, yearEl].forEach(function(el) { el.style.transition = 'opacity 0.3s ease'; });

  let idx = 0;
  setInterval(function() {
    idx = (idx + 1) % heroProjects.length;
    const p = heroProjects[idx];
    catEl.style.opacity = '0';
    yearEl.style.opacity = '0';
    if (phEl) phEl.style.opacity = '0';
    setTimeout(function() {
      catEl.textContent  = p.category;
      yearEl.textContent = p.year;
      if (phEl) phEl.textContent = p.title;
      catEl.style.opacity = '1';
      yearEl.style.opacity = '1';
      if (phEl) phEl.style.opacity = '1';
    }, 300);
  }, 3200);
}

/* ── CAROUSEL (Works & Playground pages) ── */
function initCarousel() {
  const strip = document.getElementById('carousel-strip');
  if (!strip) return;

  const items       = Array.from(strip.querySelectorAll('.carousel-item'));
  const titleEl     = document.getElementById('carousel-title');
  const counterEl   = document.getElementById('carousel-counter');
  const pgContainer = document.getElementById('carousel-pagination');
  const rightList   = document.getElementById('carousel-right-list');
  const total       = items.length;
  let current       = 0;

  const names = items.map(function(el) { return el.dataset.title || ''; });

  if (titleEl) {
    titleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  function updateCarousel(newIdx) {
    current = ((newIdx % total) + total) % total;

    items.forEach(function(item, i) {
      item.classList.remove('active', 'adjacent', 'hidden');
      const diff = ((i - current + total) % total);
      if (diff === 0)                          item.classList.add('active');
      else if (diff === 1 || diff === total-1) item.classList.add('adjacent');
      else                                     item.classList.add('hidden');
    });

    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(8px)';
      setTimeout(function() {
        titleEl.textContent = names[current];
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 200);
    }

    if (counterEl) counterEl.textContent = (current + 1) + ' / ' + total;

    if (pgContainer) {
      pgContainer.querySelectorAll('.pg-num').forEach(function(el, i) {
        el.classList.toggle('active', i === current);
      });
    }

    if (rightList) {
      rightList.querySelectorAll('.carousel-right-item').forEach(function(el, i) {
        el.classList.toggle('active', i === current);
      });
    }
  }

  if (pgContainer) {
    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      span.className = 'pg-num';
      span.textContent = String(i + 1).padStart(2, '0');
      span.addEventListener('click', (function(idx) {
        return function() { updateCarousel(idx); };
      })(i));
      pgContainer.appendChild(span);
    }
  }

  if (rightList) {
    names.forEach(function(name, i) {
      const div = document.createElement('div');
      div.className = 'carousel-right-item';
      div.textContent = name;
      div.addEventListener('click', (function(idx) {
        return function() { updateCarousel(idx); };
      })(i));
      rightList.appendChild(div);
    });
  }

  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
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
  let touchStartX = 0;
  strip.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  strip.addEventListener('touchend', function(e) {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) updateCarousel(delta < 0 ? current + 1 : current - 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   updateCarousel(current - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  updateCarousel(current + 1);
  });

  updateCarousel(0);
}

/* ── CAROUSEL TIMER ── */
function initCarouselTimer() {
  const timerEl = document.getElementById('carousel-timer');
  if (!timerEl) return;
  let secs = 0;
  setInterval(function() {
    secs++;
    const hh = String(Math.floor(secs / 3600)).padStart(2, '0');
    const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    timerEl.textContent = hh + ':' + mm + ':' + ss;
  }, 1000);
}

/* ── PROJECT TABS ── */
function initProjectTabs() {
  const tabs    = document.querySelectorAll('.project-tab');
  const content = document.getElementById('project-tab-content');
  if (!tabs.length || !content) return;

  const contentMap = {
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
      const key = tab.dataset.tab;
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

/* ── DISCIPLINE LINES ON ABOUT ── */
function initDisciplineReveal() {
  const lines = document.querySelectorAll('.discipline-line');
  if (!lines.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const allLines = document.querySelectorAll('.discipline-line');
        allLines.forEach(function(line, i) {
          setTimeout(function() {
            line.style.color = 'rgba(var(--cl-text-1), 0.9)';
            line.style.transition = 'color 0.7s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.1) + 's';
          }, i * 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(lines[0]);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  runPageLoader();
  startClock();
  initHeaderScroll();
  initBackToTop();
  initScrollReveal();
  initTitleReveal();
  initCursor();
  initHeroCard();
  initCarousel();
  initCarouselTimer();
  initProjectTabs();
  initDisciplineReveal();
  initMagneticButtons();
});
