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
      const form = document.getElementById("contactForm");
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
  
          // Show loading state
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
          submitBtn.disabled = true;
  
          try {
            const response = await fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: {
                Accept: "application/json",
              },
            });
  
            if (response.ok) {
              // Show success message
              form.reset();
              this.showToast(
                "Success!",
                "Your message has been sent successfully."
              );
            } else {
              throw new Error("Failed to send message");
            }
          } catch (error) {
            // Show error message
            this.showToast(
              "Error!",
              "Failed to send message. Please try again later.",
              "error"
            );
          } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
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
        const fromTop = window.scrollY + 100;
  
        navLinks.forEach((link) => {
          // Only handle internal links (those starting with #)
          if (link.getAttribute("href").startsWith("#")) {
            const section = document.querySelector(link.hash);
            if (section) {
              if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
              ) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            }
          }
        });
      };
  
      // Handle link clicks
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          
          // Only prevent default for internal links
          if (href.startsWith("#")) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
  
          // Close offcanvas menu on mobile for all links
          if (window.innerWidth < 992) {
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
  
    showToast(title, message, type = "success") {
      const toastHTML = `
        <div class="toast align-items-center text-white bg-${
          type === "success" ? "success" : "danger"
        } border-0" 
             role="alert" 
             aria-live="assertive" 
             aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <strong>${title}</strong> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
  
      const toastContainer = document.createElement("div");
      toastContainer.className =
        "toast-container position-fixed bottom-0 end-0 p-3";
      toastContainer.innerHTML = toastHTML;
      document.body.appendChild(toastContainer);
  
      const toast = new bootstrap.Toast(toastContainer.querySelector(".toast"));
      toast.show();
  
      // Remove toast container after it's hidden
      toastContainer.addEventListener("hidden.bs.toast", () => {
        document.body.removeChild(toastContainer);
      });
    },
  };
  
  // Initialize the app when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => App.init());
  