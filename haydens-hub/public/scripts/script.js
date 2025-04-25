// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !expanded);
  mobileMenu.classList.toggle("hidden");
});

// FAQ toggles
const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const expanded = toggle.getAttribute("aria-expanded") === "true" || false;

    toggle.setAttribute("aria-expanded", !expanded);
    content.classList.toggle("hidden");

    const icon = toggle.querySelector("svg");
    icon.classList.toggle("rotate-180");
  });
});

// Form submission (demo only)
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real website, your message would be sent to our team.');
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const tagButtons = document.querySelectorAll(".tag");
    const articles = document.querySelectorAll(".article-card");
    const noResults = document.getElementById("no-results");
  
    tagButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active state on buttons
        tagButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
  
        const selectedTag = button.getAttribute("data-tag");
        let visibleCount = 0;
  
        // Filter articles
        articles.forEach((article) => {
          if (selectedTag === "all") {
            article.style.display = "block";
            visibleCount++;
          } else {
            const articleTags = article.getAttribute("data-tags");
            if (articleTags && articleTags.includes(selectedTag)) {
              article.style.display = "block";
              visibleCount++;
            } else {
              article.style.display = "none";
            }
          }
        });
  
        // Show/hide no results message
        if (visibleCount === 0) {
          noResults.classList.remove("hidden");
        } else {
          noResults.classList.add("hidden");
        }
      });
    });
  });
  