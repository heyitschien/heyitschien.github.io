// Modular JavaScript structure
const App = {
  init() {
    this.showLoading();
    this.initScrollAnimation();
    this.initFormValidation();
    this.initScrollToTop();
    this.initNavigation();

    // Hide loading when everything is ready
    window.addEventListener("load", () => {
      this.hideLoading();
    });
  },

  initScrollAnimation() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  },

  initFormValidation() {
    // Form validation logic
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted");
      });
    }
  },

  initScrollToTop() {
    // Scroll to top logic
    const scrollBtn = document.getElementById("scrollTop");
    if (scrollBtn) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
          scrollBtn.classList.add("show");
        } else {
          scrollBtn.classList.remove("show");
        }
      });

      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  },

  initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const offcanvas = document.querySelector(".offcanvas");
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);

    // Update active link based on scroll position
    const updateActiveLink = () => {
      const fromTop = window.scrollY + 100; // Offset for fixed header

      navLinks.forEach((link) => {
        const section = document.querySelector(link.hash);

        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    // Handle link clicks
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Close offcanvas menu on mobile
        if (window.innerWidth < 992) {
          // Bootstrap's lg breakpoint
          bsOffcanvas.hide();
        }
      });
    });

    // Update active link on scroll
    window.addEventListener("scroll", () => {
      requestAnimationFrame(updateActiveLink);
    });
  },

  showLoading() {
    const skeleton = document.querySelector(".loading-skeleton");
    if (skeleton) {
      skeleton.style.display = "flex";
      skeleton.style.justifyContent = "center";
      skeleton.style.alignItems = "center";
    }
  },

  hideLoading() {
    const skeleton = document.querySelector(".loading-skeleton");
    if (skeleton) {
      skeleton.style.display = "none";
    }
  },
};

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => App.init());
