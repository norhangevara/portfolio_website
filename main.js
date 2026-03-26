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
      setTimeout(() => loader.classList.add('hidden'), 200);
    }
  }, stepTime);
}

/* ── LIVE CLOCK (Cairo GMT+2) ── */
function startClock() {
  const clocks = document.querySelectorAll('[data-live-clock]');
  if (!clocks.length) return;

  function update() {
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    const h = String(cairoTime.getHours()).padStart(2, '0');
    const m = String(cairoTime.getMinutes()).padStart(2, '0');
    const ampm = cairoTime.getHours() >= 12 ? 'PM' : 'AM';
    const h12 = String(cairoTime.getHours() % 12 || 12).padStart(1, '0');
    const text = `${h12}:${m} ${ampm}  GMT+2`;
    clocks.forEach(el => el.textContent = text);
  }
  update();
  setInterval(update, 1000);
}

/* ── BACK TO TOP ── */
function initBackToTop() {
  const btns = document.querySelectorAll('.back-top-btn');
  btns.forEach(btn => btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-clip, .fade-up');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  items.forEach(item => observer.observe(item));
}

/* ── FEATURED CARD ROTATOR (Homepage hero) ── */
const heroProjects = [
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

  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % heroProjects.length;
    const p = heroProjects[idx];
    catEl.style.opacity = '0';
    yearEl.style.opacity = '0';
    if (phEl) phEl.style.opacity = '0';
    setTimeout(() => {
      catEl.textContent  = p.category;
      yearEl.textContent = p.year;
      if (phEl) phEl.textContent = p.title;
      catEl.style.opacity = '1';
      yearEl.style.opacity = '1';
      if (phEl) phEl.style.opacity = '1';
    }, 300);
  }, 3200);
  [catEl, yearEl].forEach(el => el.style.transition = 'opacity 0.3s ease');
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

  // Project names from data attributes
  const names = items.map(el => el.dataset.title || '');

  function updateCarousel(newIdx) {
    current = ((newIdx % total) + total) % total;

    items.forEach((item, i) => {
      item.classList.remove('active', 'adjacent', 'hidden');
      const diff = ((i - current + total) % total);
      if (diff === 0) item.classList.add('active');
      else if (diff === 1 || diff === total - 1) item.classList.add('adjacent');
      else item.classList.add('hidden');
    });

    // Scroll the active item into view
    const activeItem = items[current];
    activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });

    // Update title
    if (titleEl) {
      titleEl.style.opacity = '0';
      setTimeout(() => { titleEl.textContent = names[current]; titleEl.style.opacity = '1'; }, 200);
    }

    // Update counter
    if (counterEl) counterEl.textContent = `${current + 1}/${total}`;

    // Update pagination
    if (pgContainer) {
      pgContainer.querySelectorAll('.pg-num').forEach((el, i) => {
        el.classList.toggle('active', i === current);
      });
    }

    // Update right list
    if (rightList) {
      rightList.querySelectorAll('.carousel-right-item').forEach((el, i) => {
        el.classList.toggle('active', i === current);
      });
    }
  }

  // Build pagination
  if (pgContainer) {
    const visible = Math.min(5, total);
    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      span.className = 'pg-num';
      span.textContent = i + 1;
      span.addEventListener('click', () => updateCarousel(i));
      pgContainer.appendChild(span);
    }
  }

  // Build right list
  if (rightList) {
    names.forEach((name, i) => {
      const div = document.createElement('div');
      div.className = 'carousel-right-item';
      div.textContent = name;
      div.addEventListener('click', () => updateCarousel(i));
      rightList.appendChild(div);
    });
  }

  // Nav buttons
  document.getElementById('carousel-prev')?.addEventListener('click', () => updateCarousel(current - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => updateCarousel(current + 1));

  // Item clicks → navigate to project
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (i === current && item.dataset.href) {
        window.location.href = item.dataset.href;
      } else {
        updateCarousel(i);
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') updateCarousel(current - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') updateCarousel(current + 1);
  });

  updateCarousel(0);
}

/* ── CAROUSEL TIMER ── */
function initCarouselTimer() {
  const timerEl = document.getElementById('carousel-timer');
  if (!timerEl) return;
  let secs = 0;
  setInterval(() => {
    secs++;
    const hh = String(Math.floor(secs / 3600)).padStart(2, '0');
    const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    timerEl.textContent = `${hh}:${mm}:${ss}`;
  }, 1000);
}

/* ── PROJECT TABS ── */
function initProjectTabs() {
  const tabs    = document.querySelectorAll('.project-tab');
  const content = document.getElementById('project-tab-content');
  if (!tabs.length || !content) return;

  const contentMap = {
    overview:  'A brand system that holds together across every touchpoint — from strategy through to execution. This project began with a positioning audit and ended with a complete visual language.',
    approach:  'Every decision was made backwards from the question: how does this feel when someone encounters it in the real world? The system was stress-tested across digital, print, and environmental contexts before a single logo was finalized.',
    outcome:   'A cohesive brand identity with full guidelines, primary and secondary mark system, typographic hierarchy, colour palette, and application across key brand touchpoints.',
    details:   'Completed over 8 weeks. All assets delivered as editable source files (Figma + Illustrator), with a brand guidelines PDF and implementation notes.',
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.dataset.tab;
      content.style.opacity = '0';
      setTimeout(() => { content.textContent = contentMap[key] || ''; content.style.opacity = '1'; }, 200);
    });
  });
  content.style.transition = 'opacity 0.25s ease';
}

/* ── DISCIPLINE LINES ON ABOUT ── */
function initDisciplineReveal() {
  const lines = document.querySelectorAll('.discipline-line');
  if (!lines.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.closest('#about-disciplines')?.querySelectorAll('.discipline-line');
        items?.forEach((line, i) => {
          setTimeout(() => {
            line.style.color = 'rgba(var(--cl-text-1), 0.9)';
            line.style.transition = `color 0.6s ease ${i * 0.12}s`;
          }, i * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (lines[0]) observer.observe(lines[0]);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  runPageLoader();
  startClock();
  initBackToTop();
  initScrollReveal();
  initHeroCard();
  initCarousel();
  initCarouselTimer();
  initProjectTabs();
  initDisciplineReveal();
});
