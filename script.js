// ============================================
// SYSTEM DESIGN MASTERY — Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCardExpansion();
  initMobileMenu();
  initScrollEffects();
  initIntersectionObserver();
});

// ========== THEME TOGGLE ==========
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');

  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      toggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    }
  });
}

// ========== CARD EXPANSION ==========
function initCardExpansion() {
  const cards = document.querySelectorAll('.concept-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't toggle if clicking a link
      if (e.target.tagName === 'A') return;

      const wasExpanded = card.classList.contains('expanded');

      // Close all cards in the same grid
      const grid = card.closest('.concepts-grid');
      if (grid) {
        grid.querySelectorAll('.concept-card.expanded').forEach(c => {
          if (c !== card) c.classList.remove('expanded');
        });
      }

      // Toggle current card
      card.classList.toggle('expanded');

      // Scroll into view if expanding
      if (!wasExpanded) {
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('.section');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        const id = section.getAttribute('id');
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--accent-light)';
          }
        });
      }
    });

    lastScroll = currentScroll;
  });
}

// ========== INTERSECTION OBSERVER (Animate on scroll) ==========
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all concept cards with initial hidden state
  document.querySelectorAll('.concept-card, .framework-step, .cheat-table, .number-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}
