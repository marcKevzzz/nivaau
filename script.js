document.addEventListener("DOMContentLoaded", () => {
  // const toggle1 = document.getElementById("theme-toggle");
  // const toggle2 = document.getElementById("theme-toggles");

  // const icons = [
  //   toggle1 ? toggle1.querySelector("i") : null,
  //   toggle2 ? toggle2.querySelector("i") : null,
  // ].filter(Boolean);

  // // Update icons for both toggles
  // function updateIcons(isDark) {
  //   icons.forEach((icon) => {
  //     icon.classList.toggle("fa-moon", !isDark);
  //     icon.classList.toggle("fa-sun", isDark);
  //     icon.classList.toggle("active", isDark);
  //   });
  // }

  // // Initialize theme
  // function applyTheme(theme) {
  //   const isDark = theme === "dark";
  //   document.documentElement.classList.toggle("dark", isDark); // Tailwind dark mode
  //   updateIcons(isDark);
  //   localStorage.setItem("theme", theme);
  // }

  // // Load saved or system preference
  // const savedTheme = localStorage.getItem("theme");
  // if (
  //   savedTheme === "dark" ||
  //   (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   applyTheme("dark");
  // } else {
  //   applyTheme("light");
  // }

  // // Toggle theme handler
  // function toggleTheme() {
  //   const isDark = !document.documentElement.classList.contains("dark");
  //   applyTheme(isDark ? "dark" : "light");
  // }

  // // Attach listeners
  // if (toggle1) toggle1.addEventListener("click", toggleTheme);
  // if (toggle2) toggle2.addEventListener("click", toggleTheme);

  const numStars = 15;
  const hero = document.getElementById("hero");

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const delay = Math.random() * 2;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${delay}s`;

    hero.appendChild(star);
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navbarMobile = document.getElementById("navbar-mobile");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menuToggle.addEventListener("click", () => {
    navbarMobile.classList.toggle("hidden");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });

  // Active navigation link
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function setActiveLink() {
    let current = "hero"; // Default to hero section

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const linkSection = link.getAttribute("data-section");
      if (linkSection === current) {
        link.classList.add("active");
      }
    });
  }

  // Set initial active state
  setActiveLink();

  window.addEventListener("scroll", setActiveLink);

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navbarMobile.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
    });
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;
  const carousel = document.getElementById("carousel");

  let autoSlideInterval; // store interval here

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.style.opacity = i === index ? "1" : "0";
    });

    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
        indicator.style.backgroundColor = "white";
      } else {
        indicator.classList.remove("active");
        indicator.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Manual navigation
  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-slide setup
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Pause carousel on hover
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Start autoplay initially
  startAutoSlide();

  const fadeUps = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // ✅ runs ONCE only
        }
      });
    },
    { threshold: 0.2 } // triggers when 20% visible
  );

  fadeUps.forEach((el) => observer.observe(el));
});
