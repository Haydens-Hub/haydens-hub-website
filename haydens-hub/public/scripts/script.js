// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
});

// FAQ toggles
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
        
        toggle.setAttribute('aria-expanded', !expanded);
        content.classList.toggle('hidden');
        
        const icon = toggle.querySelector('svg');
        icon.classList.toggle('rotate-180');
    });
});

// Form submission (demo only)
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real website, your message would be sent to our team.');
});