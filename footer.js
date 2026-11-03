class FathomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<footer id="footer">
  <!-- Bottom grid -->
  <div class="footer-bottom-grid">
    <!-- Col 1: Brand -->
    <div class="footer-col">
      <div class="footer-logo-wrap">
        <img src="./Images/fathom-made-in-america-logo.webp" alt="fathom - MADE IN AMERICA" style="height: 87px; width: auto; object-fit: contain;" />
      </div>
      <p class="footer-address" style="color: rgba(255, 255, 255, 0.6); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
        500 Bic Drive, Building 2, Unit 3A<br>Milford, CT, 06461
      </p>
      <p class="footer-copyright" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        Copyright fathom Automation © 2026 All Rights Reserved
      </p>
    </div>

    <!-- Col 2: Navigation -->
    <div class="footer-col">
      <p class="footer-col-label">Navigation</p>
      <ul class="footer-link-list" role="list">
        <li><a href="solutions.html">Solutions</a></li>
        <li><a href="products.html">Standardized Products</a></li>
        <li><a href="return.html">Calculate Project Return</a></li>
        <li><a href="testimonials.html">Testimonials</a></li>
      </ul>
    </div>

    <!-- Col 3: Company -->
    <div class="footer-col">
      <p class="footer-col-label">Company</p>
      <ul class="footer-link-list" role="list">
        <li><a href="solutions.html">Custom Engineering</a></li>
        <li><a href="services.html">Services & Capabilities</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </div>

    <!-- Col 4: Reach Us -->
    <div class="footer-col">
      <p class="footer-col-label">Reach Us</p>
      <p class="footer-reach-text">Ready for your floor of the future?</p>
      <a href="tel:2032939564" class="footer-phone">203-293-9564</a>
      <p class="footer-phone-sub">Give us a call today.</p>
      <div class="footer-social-row">
        <a href="https://instagram.com/fathom__usa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
    `;
  }
}

customElements.define('fathom-footer', FathomFooter);
