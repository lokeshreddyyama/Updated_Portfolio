// ============================================================
//  LOKESH REDDY PORTFOLIO - PREMIUM JAVASCRIPT
// ============================================================

// Setup EmailJS
(function () {
  emailjs.init("7XrwXhjTWbjENBLAr");
})();

document.addEventListener("DOMContentLoaded", () => {

  // ==================== CUSTOM CURSOR ====================
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    // Smooth cursor follow
    function animateCursor() {
      outX += (mouseX - outX) * 0.12;
      outY += (mouseY - outY) * 0.12;
      cursorOutline.style.left = outX + "px";
      cursorOutline.style.top = outY + "px";
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    document.querySelectorAll("a, button, .skill-card, .project-card, .service-card").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // ==================== PARTICLE CANVAS ====================
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const PARTICLE_COUNT = 80;
    const COLORS = ["rgba(139,92,246,", "rgba(0,242,255,", "rgba(236,72,153,"];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
        this.alphaDir = (Math.random() - 0.5) * 0.003;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.alphaDir;
        if (this.alpha < 0.05 || this.alpha > 0.6) this.alphaDir *= -1;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ")";
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Draw connections between close particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ==================== NAVBAR ====================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const mobileOverlay = document.getElementById("mobile-overlay");

  // Scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveNavLink();
  });

  // Mobile menu
  function toggleMobileMenu(forceClose = false) {
    const isOpen = navLinks.classList.contains("open");
    if (forceClose || isOpen) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    } else {
      navLinks.classList.add("open");
      navToggle.classList.add("open");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  navToggle.addEventListener("click", () => toggleMobileMenu());
  mobileOverlay.addEventListener("click", () => toggleMobileMenu(true));

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => toggleMobileMenu(true));
  });

  // Active nav link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    let current = "home";
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.getAttribute("id");
    });
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  }

  // ==================== TYPEWRITER EFFECT ====================
  const typewriterEl = document.getElementById("typewriter");
  const phrases = [
    "Beautiful Websites",
    "Full Stack Apps",
    "React Experiences",
    "Backend Systems",
    "Database Solutions",
    "Digital Futures"
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeWrite() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typewriterEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeWrite, 1800);
        return;
      }
    } else {
      typewriterEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeWrite, deleting ? 60 : 90);
  }

  if (typewriterEl) typeWrite();

  // ==================== COUNTER ANIMATION ====================
  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // ==================== INTERSECTION OBSERVER ====================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);

        // Trigger skill bar animations
        if (entry.target.classList.contains("skill-card")) {
          const fill = entry.target.querySelector(".skill-fill");
          if (fill) {
            setTimeout(() => {
              fill.style.width = fill.style.getPropertyValue("--target") || "0%";
            }, 200);
          }
        }
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Observe all reveal elements
  document.querySelectorAll("[data-reveal], [data-reveal-right]").forEach(el => {
    revealObserver.observe(el);
  });

  // Observe hero stats
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) counterObserver.observe(heroStats);

  // ==================== SKILL BAR INITIAL STATE ====================
  document.querySelectorAll(".skill-fill").forEach(fill => {
    fill.style.width = "0%";
  });

  // ==================== SKILLS TAB FILTER ====================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;

      skillCards.forEach(card => {
        const show = tab === "all" || card.dataset.category === tab;
        card.classList.toggle("hidden", !show);

        if (show) {
          // Animate skill fill when shown
          setTimeout(() => {
            const fill = card.querySelector(".skill-fill");
            if (fill) fill.style.width = fill.style.getPropertyValue("--target") || "0%";
          }, 100);
        }
      });
    });
  });

  // ==================== PROJECT FILTER ====================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === "all" || card.dataset.category === filter;
        if (match) {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ==================== TILT EFFECT ====================
  document.querySelectorAll(".project-card, .service-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==================== CONTACT FORM ====================
  function sendEmail(e) {
    e.preventDefault();
    e.stopPropagation();

    const statusDiv = document.getElementById("form-status");
    const btn = document.getElementById("submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const btnLoader = btn.querySelector(".btn-loader");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      statusDiv.innerHTML = '<span style="color:#f472b6">⚠️ Please fill in all required fields.</span>';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusDiv.innerHTML = '<span style="color:#f472b6">⚠️ Please enter a valid email address.</span>';
      return;
    }

    // Loading state
    btn.disabled = true;
    btnText.textContent = "Sending...";
    btnLoader.style.display = "block";
    statusDiv.innerHTML = "";

    const params = {
      from_name: name,
      from_email: email,
      from_phone: document.getElementById("subject")?.value || "",
      message: message,
    };

    emailjs.send("service_1bxb5li", "template_wr8ni1k", params)
      .then(() => {
        statusDiv.innerHTML = '<span style="color:#10b981">✅ Message sent successfully! I\'ll get back to you soon.</span>';
        document.getElementById("contact-form").reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        statusDiv.innerHTML = '<span style="color:#f472b6">❌ Failed to send. Please email me directly at lokeshreddy.1831151@gmail.com</span>';
      })
      .finally(() => {
        btn.disabled = false;
        btnText.textContent = "Send Message";
        btnLoader.style.display = "none";
      });
  }

  // Bind send function globally for onclick attribute compatibility
  window.sendEmail = sendEmail;

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", sendEmail);
  }

  // ==================== ADD FADE-IN KEYFRAME ====================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // ==================== INITIAL REVEAL ====================
  // Trigger reveal for elements already in view
  setTimeout(() => {
    document.querySelectorAll("[data-reveal], [data-reveal-right]").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("revealed");
      }
    });

    // Animate hero stat counters immediately
    if (heroStats) {
      heroStats.querySelectorAll("[data-count]").forEach(animateCounter);
    }

    // Animate visible skill bars
    document.querySelectorAll(".skill-card:not(.hidden)").forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        const fill = card.querySelector(".skill-fill");
        if (fill) fill.style.width = fill.style.getPropertyValue("--target") || "0%";
      }
    });
  }, 300);

  console.log("🚀 Portfolio loaded | Lokesh Reddy | Full Stack Developer");
});
