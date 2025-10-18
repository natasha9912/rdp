// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

// Smooth scroll for in-page links (with reduced-motion respect)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      if (navToggle && siteNav && window.innerWidth <= 960) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Back-to-top button visibility
const toTop = document.getElementById('toTop');
if (toTop) {
  const toggleTop = () => {
    if (window.scrollY > 400) toTop.classList.add('show');
    else toTop.classList.remove('show');
  };
  window.addEventListener('scroll', toggleTop, { passive: true });
  toggleTop();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Simple contact form validation
const form = document.getElementById('contactForm');
if (form) {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const interest = document.getElementById('interest');
  const message = document.getElementById('message');
  const success = document.getElementById('formSuccess');

  /** Basic email regex */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const setError = (id, msg) => {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = msg || '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Clear previous
    ['name', 'email', 'interest', 'message'].forEach((f) => setError(f, ''));

    if (name && name.value.trim().length < 2) {
      setError('name', 'Please enter your full name.');
      hasError = true;
    }

    if (email && !emailRegex.test(email.value)) {
      setError('email', 'Enter a valid work email.');
      hasError = true;
    }

    if (interest && !interest.value) {
      setError('interest', 'Select a category.');
      hasError = true;
    }

    if (message && message.value.trim().length < 10) {
      setError('message', 'Message should be at least 10 characters.');
      hasError = true;
    }

    if (!hasError) {
      // Demo: just show success state
      if (success) {
        success.hidden = false;
        success.focus?.();
      }
      form.reset();
      // Keep the placeholder option selected again
      if (interest) interest.selectedIndex = 0;
    }
  });
}
