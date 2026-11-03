/* ════════════════════════════════════════════════════════════
   FATHOM — Shared Navbar Component
   Injects the common navigation into every page.
   Automatically highlights the active nav link.
   Mobile toggle uses 'active' class to match existing CSS.
   ════════════════════════════════════════════════════════════ */

(function () {
  const NAVBAR_HTML = `
<header id="site-header">
  <nav id="nav">
    <!-- Brand Logo (left of solutions) -->
    <a href="index.html" id="nav-logo" aria-label="fathom home">
      <img src="./Images/fathom-full-text-transparent.webp" alt="fathom Logo" class="nav-main-logo" />
    </a>

    <!-- Nav Links -->
    <ul id="nav-links" role="list">
      <li><a href="solutions.html"                  class="nl-btn" data-nav="solutions">Solutions</a></li>
      <li><a href="products.html"                   class="nl-btn" data-nav="products">Standardized Products</a></li>
      <li><a href="return.html"                     class="nl-btn" data-nav="return">Calculate Project Return</a></li>
      <li><a href="testimonials.html"               class="nl-btn" data-nav="testimonials">Testimonials</a></li>
      <li><a href="index.html#contact"              class="nl-btn" data-nav="contact">Contact</a></li>
    </ul>

    <!-- Right Actions -->
    <div id="nav-actions">
      <a href="#" class="nav-search-pill" id="nav-ask-btn">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M9 9L12 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        + Ask fathom
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
      </a>
      <a href="index.html#contact" class="nav-contact-btn">CONTACT</a>
      <a href="index.html" id="nav-right-logo" aria-label="fathom home">
        <img src="./Images/fathom-f-logo.webp" alt="fathom f Logo" class="nav-f-logo" />
      </a>
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" onclick="toggleMobileNav()">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6"  x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </nav>
</header>`;

  /* ── Inject into placeholder or prepend to body ── */
  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.outerHTML = NAVBAR_HTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', NAVBAR_HTML);
  }

  /* ── Active link highlighting ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const activeMap = {
    'solutions.html':    'solutions',
    'products.html':     'products',
    'return.html':       'return',
    'testimonials.html': 'testimonials',
  };
  const updateNavActive = () => {
    document.querySelectorAll('#nav-links .nl-btn').forEach(el => el.classList.remove('nl-active'));
    if ((page === 'index.html' || page === '') && window.location.hash === '#contact') {
      document.querySelectorAll('[data-nav="contact"]').forEach(el => el.classList.add('nl-active'));
      return;
    }
    const activeKey = activeMap[page];
    if (activeKey) {
      document.querySelectorAll(`[data-nav="${activeKey}"]`).forEach(el => {
        el.classList.add('nl-active');
      });
    }
  };
  updateNavActive();
  window.addEventListener('hashchange', updateNavActive);

  /* ── Scroll-shrink header ── */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Mobile menu toggle (deferred so main.js lenis is available) ── */
  /* main.js defines toggleMobileNav globally — navbar.js just ensures it
     exists as a safe fallback if loaded on pages without main.js.        */
  if (typeof window.toggleMobileNav === 'undefined') {
    window.toggleMobileNav = function () {
      const nav = document.getElementById('mobile-nav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      const btn = document.getElementById('hamburger-btn');
      if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
  }
})();
