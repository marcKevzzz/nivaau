document.addEventListener("DOMContentLoaded", () => {
  const toggle1 = document.getElementById("theme-toggle");
  const toggle2 = document.getElementById("theme-toggles");
  const body = document.body;

  const icons = [
    toggle1 ? toggle1.querySelector("i") : null,
    toggle2 ? toggle2.querySelector("i") : null,
  ].filter(Boolean);

  function updateIcons(isDark) {
    icons.forEach((icon) => {
      icon.classList.toggle("fa-moon", !isDark);
      icon.classList.toggle("fa-sun", isDark);
    });
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    body.classList.toggle("dark-mode", isDark);
    updateIcons(isDark);
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  function toggleTheme() {
    const isDark = body.classList.contains("dark-mode");
    applyTheme(isDark ? "light" : "dark");
  }

  if (toggle1) toggle1.addEventListener("click", toggleTheme);
  if (toggle2) toggle2.addEventListener("click", toggleTheme);

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

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function setActiveLink() {
    let current = "hero";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
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

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

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
  let autoSlideInterval;

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

  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);
  startAutoSlide();

  const fadeUps = document.querySelectorAll(".fade-up");
  const observedSections = new Map();

  fadeUps.forEach((el) => {
    const section =
      el.closest("section") || el.closest("nav") || el.closest("footer");
    if (section && !observedSections.has(section)) {
      observedSections.set(section, []);
    }
    if (section) {
      observedSections.get(section).push(el);
    }
  });

  observedSections.forEach((elements, section) => {
    elements.sort((a, b) => {
      const delayA = parseInt(a.getAttribute("data-delay") || "0");
      const delayB = parseInt(b.getAttribute("data-delay") || "0");
      return delayA - delayB;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const elements = observedSections.get(section);

          if (elements) {
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("show");
              }, index * 150);
            });
          }

          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.1 }
  );

  observedSections.forEach((elements, section) => {
    if (section) {
      observer.observe(section);
    }
  });

  const typingEl = document.getElementById("typing-name");
  const cursorEl = document.querySelector(".cursor");

  const names = [
    "Nikita Valerie Aurelia",
    "A Creative Thinker",
    "A Passionate Learner",
    "An Inspiring Student",
  ];

  let i = 0; // word index
  let j = 0; // letter index
  let isDeleting = false;

  function typeEffect() {
    const currentWord = names[i];
    const visibleText = currentWord.substring(0, j);
    typingEl.textContent = visibleText;

    // cursorEl.style.transform = `translateX(${typingEl.offsetWidth}px)`;

    if (!isDeleting && j < currentWord.length) {
      j++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && j > 0) {
      j--;
      setTimeout(typeEffect, 60);
    } else {
      if (!isDeleting && j === currentWord.length) {
        setTimeout(() => ((isDeleting = true), typeEffect()), 1500);
      } else {
        isDeleting = false;
        i = (i + 1) % names.length;
        setTimeout(typeEffect, 200);
      }
    }
  }

  typeEffect();
});
