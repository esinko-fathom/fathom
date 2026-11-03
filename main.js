/* ════════════════════════════════════════════════════════════
   FATHOM — Main JS
   Simple, robust animations using CSS classes + IntersectionObserver
   GSAP used only for parallax & structural scroll pinning
   ════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   1. SMOOTH SCROLL — Lenis
   ───────────────────────────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0, 0);


/* ─────────────────────────────────────────────────────────────
   2. GLOBAL CINEMATIC GSAP ORCHESTRATION
   Replaces old generic CSS fades with orchestrated Timelines
   ───────────────────────────────────────────────────────────── */
gsap.utils.toArray('section').forEach(section => {
  if (section.id === 'hero' || section.id === 'case-studies-section' || section.id === 'testimonials-section' || section.id === 'imagine-section') return;

  // Select all elements in this section that should cascade in
  const elements = section.querySelectorAll('.anim-reveal, .anim-fade-up, .hero-scroll-hint, .benefit-title, .benefit-card, .hiw-label, .hiw-title, .hiw-cta, .contact-heading, .contact-intro, .contact-trust > *, form > *, .ticker-wrap');
  
  if (elements.length > 0) {
    // Hide them initially
    gsap.set(elements, { opacity: 0, y: 35 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%", // Trigger when section enters viewport
      animation: gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15 // Cinematic cascade
      }),
      once: true
    });
  }
});

/* Philosophy logo — dedicated scale-in entrance */
(function() {
  const logoWrap = document.querySelector('.phil-logo-wrap');
  if (!logoWrap) return;
  gsap.set(logoWrap, { opacity: 0, scale: 0.5 });
  ScrollTrigger.create({
    trigger: logoWrap,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(logoWrap, {
        opacity: 1, scale: 1,
        duration: 1.0, ease: 'back.out(1.4)',
      });
    }
  });
})();



/* ─────────────────────────────────────────────────────────────
   STATEMENT REVEAL ANIMATION (Simple Fade In)
   ───────────────────────────────────────────────────────────── */
(function() {
  const section = document.getElementById('statement-reveal-section');
  const text = document.querySelector('.statement-text');
  
  if (!section || !text) return;

  gsap.fromTo(text, 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
})();

/* ─────────────────────────────────────────────────────────────
   HERO LOAD SEQUENCE
   ───────────────────────────────────────────────────────────── */
(function() {
  const heading = document.querySelector('.hero-text-reveal');
  const sub = document.querySelector('.hero-subtext');
  const hint = document.querySelector('.hero-scroll-hint');
  
  if (!heading) return;

  const tl = gsap.timeline();
  
  // Hide initial
  gsap.set([heading, sub, hint], { opacity: 0, y: 30 });

  tl.to(heading, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 })
    .to(sub, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .to(hint, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.4");
})();

/* ─────────────────────────────────────────────────────────────
   HERO TYPEWRITER
   ───────────────────────────────────────────────────────────── */
(function () {
  const target = document.getElementById('hero-typewriter-target');
  if (!target) return;

  const words   = ['drive ROI', 'are quick to deploy', 'are lean', 'perform', 'are affordable', 'are easy to operate'];
  const typeMs  = 75;
  const deleteMs = 45;
  const pauseAfterType   = 1800;
  const pauseAfterDelete = 300;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeMs);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
      } else {
        setTimeout(tick, deleteMs);
      }
    }
  }

  // Start after a slight delay
  setTimeout(tick, 1000);
})();

/* ─────────────────────────────────────────────────────────────
   PHILOSOPHY TYPEWRITER
   ───────────────────────────────────────────────────────────── */
(function () {
  const target = document.getElementById('philosophy-typewriter-target');
  const cursor = document.querySelector('.philosophy-cursor');
  if (!target) return;

  const textToType = "Most engineering OEMS get lost in the complexity, driving up costs and slowing down your production deployment";
  const typeMs = 35;
  let charIndex = 0;
  let typingStarted = false;

  function typeTick() {
    charIndex++;
    target.textContent = textToType.slice(0, charIndex);
    
    if (charIndex === textToType.length) {
      // Done typing, hide cursor after a moment
      setTimeout(() => {
        if(cursor) cursor.style.display = 'none';
      }, 3000);
      return;
    }
    setTimeout(typeTick, typeMs);
  }

  // Only start typing when the section comes into view
  ScrollTrigger.create({
    trigger: '#philosophy-section',
    start: 'top 70%',
    onEnter: () => {
      if (!typingStarted) {
        typingStarted = true;
        setTimeout(typeTick, 300);
      }
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS TYPEWRITER
   ───────────────────────────────────────────────────────────── */
(function () {
  const target = document.getElementById('testimonials-typewriter-target');
  const cursor = document.querySelector('.testimonials-cursor');
  if (!target) return;

  const part1 = "We outperform";
  const part2 = "expectations.";
  const totalLength = part1.length + part2.length;
  const typeMs = 60;
  let charIndex = 0;
  let typingStarted = false;

  function typeTick() {
    charIndex++;
    
    if (charIndex <= part1.length) {
      target.innerHTML = part1.slice(0, charIndex);
    } else {
      const secondPartTyped = part2.slice(0, charIndex - part1.length);
      target.innerHTML = part1 + '<br><span class="contact-blue">' + secondPartTyped + '</span>';
    }
    
    if (charIndex === totalLength) {
      setTimeout(() => {
        if(cursor) cursor.style.display = 'none';
      }, 3000);
      return;
    }
    setTimeout(typeTick, typeMs);
  }

  ScrollTrigger.create({
    trigger: '#testimonials-section',
    start: 'top 70%',
    onEnter: () => {
      if (!typingStarted) {
        typingStarted = true;
        setTimeout(typeTick, 300);
      }
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   SOLUTIONS PAGE TYPEWRITER
   ───────────────────────────────────────────────────────────── */
(function () {
  const target = document.getElementById('solutions-hero-typewriter');
  if (!target) return;

  const words   = ['Hardware', 'Automation', 'Robotics', 'Equipment'];
  const typeMs  = 100;
  const deleteMs = 60;
  const pauseAfterType   = 2000;
  const pauseAfterDelete = 400;

  let wordIndex = 0;
  let charIndex = target.textContent.length; // start with 'Hardware' fully typed
  let deleting  = true; // start by deleting the initial word

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeMs);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteMs);
    }
  }

  // Start after a slight delay
  setTimeout(tick, 2000);
})();


/* ─────────────────────────────────────────────────────────────
   3. PARALLAX — video backgrounds
   ───────────────────────────────────────────────────────────── */
gsap.utils.toArray('.hero-slide-video').forEach(video => {
  gsap.to(video, {
    yPercent: 30, ease: 'none',
    scrollTrigger: {
      trigger: video.closest('section'),
      start: 'top top', end: 'bottom top', scrub: true
    }
  });
});

gsap.utils.toArray('.benefit-media').forEach(media => {
  const img = media.querySelector('.benefit-video');
  if (img) {
    gsap.fromTo(img, { yPercent: -15 }, {
      yPercent: 15, ease: 'none',
      scrollTrigger: {
        trigger: media,
        start: 'top bottom', end: 'bottom top', scrub: true
      }
    });
  }
});

/* ─────────────────────────────────────────────────────────────
   GENERAL PARALLAX ELEMENTS
   ───────────────────────────────────────────────────────────── */
gsap.utils.toArray('[data-parallax]').forEach(elem => {
  const speed = parseFloat(elem.getAttribute('data-parallax')) || 10;
  gsap.to(elem, {
    yPercent: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: elem,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS 3D STAGGER ENTRANCE (Option 2)
   ───────────────────────────────────────────────────────────── */
(function() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.testimonial-card');
  
  // Set perspective on the parent so 3D transforms look correct
  gsap.set(grid, { perspective: 1000 });

  gsap.fromTo(cards, 
    { 
      opacity: 0, 
      y: 100, 
      rotationX: -45, 
      transformOrigin: 'top center' 
    },
    { 
      opacity: 1, 
      y: 0, 
      rotationX: 0, 
      duration: 1.2, 
      ease: "power3.out", 
      stagger: 0.15,
      delay: 0.6,
      scrollTrigger: {
        trigger: document.querySelector('.testimonials-heading'),
        start: "top 85%"
      }
    }
  );
})();





/* ─────────────────────────────────────────────────────────────
   5. NAV SCROLL SHADOW
   ───────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─────────────────────────────────────────────────────────────
   6. CASE STUDIES (Now completely static)
   ───────────────────────────────────────────────────────────── */
// ScrollTrigger logic removed for simplified layout


/* Imagine section is now fully static HTML + CSS animations */


/* ─────────────────────────────────────────────────────────────
   8. YOS TITLE — flashlight mouse track
   ───────────────────────────────────────────────────────────── */
(function () {
  const titleEl  = document.getElementById('yos-title');
  const yosSection = document.getElementById('yos-section');
  const pretitle = document.getElementById('yos-pretitle');
  if (!yosSection) return;

  const TEXT = 'Fathom Framework';
  if (titleEl) {
    titleEl.innerHTML = '';
    TEXT.split('').forEach(ch => {
      if (ch === ' ') { titleEl.appendChild(document.createTextNode('\u2002')); return; }
      const s = document.createElement('span');
      s.className = 'yc';
      s.textContent = ch;
      titleEl.appendChild(s);
    });
  }

  if (pretitle) gsap.set(pretitle, { opacity: 0, y: 10 });

  if (titleEl) {
    ScrollTrigger.create({
      trigger: titleEl, start: 'top 80%',
      onEnter: () => { if (pretitle) gsap.to(pretitle, { opacity: 1, y: 0, duration: 0.5 }); }
    });
  }

  let mX = null, mY = null;
  yosSection.addEventListener('mousemove', (e) => {
    // Flashlight
    if (titleEl) {
      const rect = titleEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      titleEl.style.setProperty('--mouse-x', `${x}px`);
      titleEl.style.setProperty('--mouse-y', `${y}px`);
    }
    
    // Particles
    const secRect = yosSection.getBoundingClientRect();
    mX = e.clientX - secRect.left;
    mY = e.clientY - secRect.top;
  });
  yosSection.addEventListener('mouseleave', () => { mX = null; mY = null; });
})();

/* ─────────────────────────────────────────────────────────────
   9. HOW IT WORKS — laser path draw
   ───────────────────────────────────────────────────────────── */
(function () {
  const laser = document.getElementById('hiw-laser');
  if (!laser) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        gsap.to(laser, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' });
        obs.unobserve(laser);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(laser);
})();


/* ─────────────────────────────────────────────────────────────
   10. BENEFIT VIDEOS — play when in view
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('.benefit-video').forEach(vid => {
  if (vid.play && vid.pause) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      });
    }, { threshold: 0.15 });
    obs.observe(vid);
  }
});


/* ─────────────────────────────────────────────────────────────
   11. CONTACT FORM
   ───────────────────────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('f-submit');
  const txt  = document.getElementById('f-submit-text');
  if (!form || !btn) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    if (txt) txt.textContent = 'SENDING...';
    setTimeout(() => {
      if (txt) txt.textContent = 'SENT ✓';
      btn.classList.add('done');
      setTimeout(() => {
        form.reset();
        if (txt) txt.textContent = 'SUBMIT';
        btn.classList.remove('done');
        btn.disabled = false;
      }, 3500);
    }, 1600);
  });
})();

/* ─────────────────────────────────────────────────────────────
   CASE STUDY MODAL
   ───────────────────────────────────────────────────────────── */
function openCaseStudyModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  try { if (typeof lenis !== 'undefined') lenis.stop(); } catch(e) {}
}

function closeCaseStudyModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  try { if (typeof lenis !== 'undefined') lenis.start(); } catch(e) {}
}

// Expose globally so inline onclick attributes can call them
window.openCaseStudyModal  = openCaseStudyModal;
window.closeCaseStudyModal = closeCaseStudyModal;

// Also bind via JS (script is at end of body so DOM is ready — no DOMContentLoaded needed)
(function() {
  const btns = document.querySelectorAll('.case-study-btn');
  btns.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openCaseStudyModal('modal-' + (index + 1));
    });
  });

  // Close modals when clicking the backdrop overlay
  document.querySelectorAll('.cs-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      const modal = overlay.closest('.cs-modal');
      if (modal) closeCaseStudyModal(modal.id);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.cs-modal.active').forEach(m => closeCaseStudyModal(m.id));
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   LUSION TEXT ANIMATION
   ───────────────────────────────────────────────────────────── */
function splitTextPreserveHTML(element) {
  function traverse(node) {
    if (node.nodeType === 3) { // Text node
      const text = node.nodeValue;
      if (!text.trim()) return;
      const fragments = document.createDocumentFragment();
      let currentWord = null;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n' || char === '\t') {
          fragments.appendChild(document.createTextNode(char));
          currentWord = null;
        } else {
          if (!currentWord) {
            currentWord = document.createElement('span');
            currentWord.className = 'lusion-word';
            fragments.appendChild(currentWord);
          }
          const charSpan = document.createElement('span');
          charSpan.className = 'lusion-char';
          charSpan.textContent = char;
          currentWord.appendChild(charSpan);
        }
      }
      node.parentNode.replaceChild(fragments, node);
    } else if (node.nodeType === 1 && node.nodeName !== 'BR') {
      Array.from(node.childNodes).forEach(traverse);
    }
  }
  Array.from(element.childNodes).forEach(traverse);
}

document.querySelectorAll('.lusion-anim').forEach(el => {
  splitTextPreserveHTML(el);
  const chars = el.querySelectorAll('.lusion-char');
  
  gsap.fromTo(chars, 
    { yPercent: 120, rotation: 12, opacity: 0 },
    { 
      yPercent: 0, 
      rotation: 0, 
      opacity: 1, 
      duration: 0.9, 
      ease: "power4.out", 
      stagger: 0.025,
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    }
  );
});



/* ─────────────────────────────────────────────────────────────
   STACKING CARDS (Solutions Page)
   ───────────────────────────────────────────────────────────── */
(function() {
  const cards = gsap.utils.toArray('.solution-card');
  if (cards.length === 0) return;

  cards.forEach((card, index) => {
    if (index === cards.length - 1) return; // Last card doesn't scale

    gsap.to(card, {
      scale: 0.90, // Scale down slightly
      opacity: 0.3, // Darken slightly
      scrollTrigger: {
        trigger: cards[index + 1],
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    });
  });
})();

/* ─────────────────────────────────────────────────────────────
   GLOBAL TITLE TEXT ANIMATION
   ───────────────────────────────────────────────────────────── */
(function() {
  const titles = document.querySelectorAll('.built-by-title, .ff-item-title, .ff-title, .split-title, .contact-heading, .imagine-tagline');
  
  titles.forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true
        }
      }
    );
  });
})();

/* ─────────────────────────────────────────────────────────────
   INTERACTIVE HARDWARE ANIMATIONS (TILT & PARALLAX)
   ───────────────────────────────────────────────────────────── */
(function() {
  // 1. Tilt effect for Case Study Images (.split-vid)
  const splitVids = document.querySelectorAll('.split-vid');
  splitVids.forEach(vid => {
    vid.addEventListener('mousemove', (e) => {
      const rect = vid.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;
      const xPercent = (xPos / rect.width - 0.5) * 2;
      const yPercent = (yPos / rect.height - 0.5) * 2;
      
      gsap.to(vid, {
        rotationY: xPercent * 10,
        rotationX: -yPercent * 10,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    vid.addEventListener('mouseleave', () => {
      gsap.to(vid, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power2.out" });
    });
  });

  // 2. Glassmorphism hover tilt for Framework Features (.ff-item)
  const ffItems = document.querySelectorAll('.ff-item');
  ffItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;
      const xPercent = (xPos / rect.width - 0.5) * 2;
      const yPercent = (yPos / rect.height - 0.5) * 2;
      
      gsap.to(item, {
        rotationY: xPercent * 15,
        rotationX: -yPercent * 15,
        z: 30, // pop out
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 20px 40px rgba(0, 242, 254, 0.1)"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { 
        rotationY: 0, 
        rotationX: 0, 
        z: 0, 
        duration: 0.7, 
        ease: "power2.out",
        boxShadow: "none"
      });
    });
  });

  // 3. Blueprint Grid Parallax for Built-by section
  const builtBy = document.getElementById('built-by-section');
  if (builtBy) {
    builtBy.addEventListener('mousemove', (e) => {
      const xPos = e.clientX;
      const yPos = e.clientY;
      const moveX = (xPos * -0.05);
      const moveY = (yPos * -0.05);
      
      gsap.to(builtBy, {
        backgroundPosition: `${moveX}px ${moveY}px`,
        duration: 0.5,
        ease: "power1.out"
      });
    });
  }
})();

/* ─────────────────────────────────────────────────────────────
   11. TESTIMONIALS CONSTELLATION BACKGROUND
   ───────────────────────────────────────────────────────────── */
function initConstellationCanvas(canvasId, sectionId) {
  const canvas = document.getElementById(canvasId);
  const section = document.getElementById(sectionId);
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mX = null, mY = null;

  const resize = () => {
    width = section.offsetWidth;
    height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  };
  resize();
  window.addEventListener('resize', resize);

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    mX = e.clientX - rect.left;
    mY = e.clientY - rect.top;
  });
  section.addEventListener('mouseleave', () => { mX = null; mY = null; });

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mX !== null && mY !== null) {
        const dx = mX - this.x;
        const dy = mY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.fill();
    }
  }

  let nodes = [];
  for (let i = 0; i < 60; i++) nodes.push(new Node());

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    nodes.forEach(n => { n.update(); n.draw(); });

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.2 * (1 - dist/120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  };
  animate();
}

initConstellationCanvas('testimonials-canvas', 'testimonials-section');
initConstellationCanvas('yos-particles', 'fathom-framework-section');

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS SLIDER NAVIGATION
   ───────────────────────────────────────────────────────────── */
(function() {
  const wrap = document.querySelector('.testimonials-marquee-wrap');
  const btnPrev = document.querySelector('.testim-prev');
  const btnNext = document.querySelector('.testim-next');

  if (!wrap || !btnPrev || !btnNext) return;

  const scrollAmount = 400; // Roughly the width of one card + gap

  btnPrev.addEventListener('click', () => {
    wrap.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnNext.addEventListener('click', () => {
    wrap.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────────────────────────
   CASE STUDIES - STACKING CARDS ANIMATION
   ───────────────────────────────────────────────────────────── */
(function() {
  const cards = gsap.utils.toArray('.cs-card');
  if (cards.length === 0) return;

  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    
    const inner = card.querySelector('.cs-card-inner');
    
    gsap.to(inner, {
      scale: 0.92,
      filter: 'brightness(0.4)',
      ease: 'none',
      scrollTrigger: {
        trigger: cards[i + 1],
        start: 'top 85%', 
        end: 'top 15%',      
        scrub: true,
      }
    });
  });
})();

// ═══════════════════════════════════════════════════
//   LENIS ANCHOR SCROLLING & INITIAL HASH JUMP
// ═══════════════════════════════════════════════════
function scrollToCurrentHash(immediate = false) {
  if (!window.location.hash) return;
  const targetId = window.location.hash.slice(1);
  if (!targetId) return;
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    if (typeof lenis !== 'undefined') {
      lenis.scrollTo(targetElement, { immediate });
    } else {
      targetElement.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
    }
  }
}

if (window.location.hash) {
  scrollToCurrentHash(true);
  window.addEventListener('load', () => {
    setTimeout(() => scrollToCurrentHash(false), 100);
  });
}

document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    let href = this.getAttribute('href');
    let targetId = href.includes('#') ? href.split('#')[1] : null;
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement);
        // update hash
        history.pushState(null, null, '#' + targetId);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    }
  });
});

// ═══════════════════════════════════════════════════
//   MOBILE NAVIGATION TOGGLE
// ═══════════════════════════════════════════════════
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.toggle('active');
    // Disable/enable scrolling based on menu state
    if (nav.classList.contains('active')) {
      if (typeof lenis !== 'undefined') lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (typeof lenis !== 'undefined') lenis.start();
      document.body.style.overflow = '';
    }
  }
}
window.toggleMobileNav = toggleMobileNav;

// ═══════════════════════════════════════════════════
//   SEARCH MODAL
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const searchModalHTML = `
    <div id="search-modal" class="search-modal">
      <div class="search-modal-overlay" onclick="closeSearchModal()"></div>
      <div class="search-modal-content">
        <div class="search-header">
          <svg width="20" height="20" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M9 9L12 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          <input type="text" id="search-input" placeholder="Ask fathom..." autocomplete="off">
          <button class="search-close-btn" onclick="closeSearchModal()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="search-results" id="search-results">
          <ul class="search-suggestions">
            <li><a href="solutions.html">Solutions</a></li>
            <li><a href="products.html">Standardized Products</a></li>
            <li><a href="index.html#split-section">Case Studies</a></li>
            <li><a href="testimonials.html">Testimonials</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', searchModalHTML);

  const searchPills = document.querySelectorAll('.nav-search-pill');
  searchPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchModal();
    });
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.search-suggestions li');
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});

window.openSearchModal = function() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.add('active');
    // Stop body scroll
    if (typeof lenis !== 'undefined') lenis.stop();
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.getElementById('search-input').focus();
    }, 100);
  }
};

window.closeSearchModal = function() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('active');
    // Start body scroll
    if (typeof lenis !== 'undefined') lenis.start();
    document.body.style.overflow = '';
  }
};

/* ─────────────────────────────────────────────────────────────
   SOLUTIONS CAROUSEL CONTROLS
   ───────────────────────────────────────────────────────────── */
(function() {
  const prevBtn = document.getElementById('sol-prev-btn');
  const nextBtn = document.getElementById('sol-next-btn');
  const sidePrevBtn = document.getElementById('sol-side-prev');
  const sideNextBtn = document.getElementById('sol-side-next');
  const trackWrap = document.getElementById('sol-track-wrap');

  if (!trackWrap) return;

  const scrollNext = () => {
    const card = trackWrap.querySelector('.sol-slide-card');
    const scrollAmount = card ? card.offsetWidth + 32 : 450;
    trackWrap.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    const card = trackWrap.querySelector('.sol-slide-card');
    const scrollAmount = card ? card.offsetWidth + 32 : 450;
    trackWrap.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  if (nextBtn) nextBtn.addEventListener('click', scrollNext);
  if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
  if (sideNextBtn) sideNextBtn.addEventListener('click', scrollNext);
  if (sidePrevBtn) sidePrevBtn.addEventListener('click', scrollPrev);
})();
