// Setup EmailJS
(function() {
    emailjs.init("7XrwXhjTWbjENBLAr"); 
})();

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".mobile-menu-overlay");

  function toggleMenu() {
    navLinks.classList.toggle("active");
    if(navLinks.classList.contains("active")) {
      navToggle.innerHTML = '<i class="bx bx-x"></i>';
    } else {
        navToggle.innerHTML = '<i class="bx bx-menu-alt-right"></i>';
    }
  }

  if(navToggle){
    navToggle.addEventListener("click", toggleMenu);
  }

  // Close menu when link is clicked
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if(navLinks.classList.contains("active")) toggleMenu();
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Tilt Effect for Cards (Vanilla JS Tilt)
  const tiltCards = document.querySelectorAll("[data-tilt]");
  
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
       card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
  });

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Helper to add animation class styles dynamically
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .animate-in { animation: fadeInUp 0.8s ease forwards; opacity: 1 !important; transform: translateY(0) !important; }
    [data-aos] { opacity: 0; transform: translateY(30px); transition: 0.8s; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  document.querySelectorAll("[data-aos]").forEach(el => {
    observer.observe(el);
  });
  // Also observe sections
  document.querySelectorAll("section h2").forEach(el => observer.observe(el));


  // Contact Form Handling (EmailJS)
  function sendEmail(e) {
      e.preventDefault();
      
      const statusDiv = document.getElementById("form-status");
      const btn = document.querySelector(".submit-btn");
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
          statusDiv.innerHTML = '<span style="color:red">Please fill in all required fields.</span>';
          return;
      }

      statusDiv.innerHTML = "Sending...";
      
      const params = {
          from_name: name,
          from_email: email,
          from_phone: phone,
          message: message,
      };

      emailjs.send("service_1bxb5li", "template_wr8ni1k", params)
      .then(function() {
          statusDiv.innerHTML = '<span style="color:var(--primary-color)">Message sent successfully!</span>';
          document.getElementById("contact-form").reset();
      })
      .catch(function(error) {
          console.error("Failed:", error);
          statusDiv.innerHTML = '<span style="color:red">Failed to send message. Please try again.</span>';
      });
  }

  // Bind the function to the global scope so inline onclick works, 
  // or better, standard event listener
  const contactForm = document.getElementById("contact-form");
  if(contactForm) {
      contactForm.addEventListener("submit", sendEmail);
  }

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  
  if(lightbox) {
      // Open links that have images
      // NOTE: Original code logic was slightly different, adapting for new structure
      // We are checking for clicks on .project-card img or overlay buttons
      
      // Close button
      document.querySelector('.close').addEventListener('click', () => {
          lightbox.classList.add('hidden');
      });
      
      // Close on BG click
      lightbox.addEventListener('click', (e) => {
          if(e.target === lightbox) lightbox.classList.add('hidden');
      });
  }
});
