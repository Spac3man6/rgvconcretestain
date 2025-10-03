document.addEventListener("DOMContentLoaded", function() {

    // --- Load Navbar and Footer ---
    const loadHTML = (selector, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`File not found: ${url}`))
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .then(() => {
                // This needs to run after the content is loaded
                if (selector === '#navbar-placeholder') {
                    setActiveNavLink();
                    // Add scroll listener only after navbar is loaded
                    handleNavbarScroll();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    loadHTML('#navbar-placeholder', '_navbar.html');
    loadHTML('#footer-placeholder', '_footer.html');

    // --- Set Active Navigation Link ---
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
                // If it's a dropdown item, also activate the dropdown toggle
                const dropdownToggle = link.closest('.nav-item.dropdown')?.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        });
    };

    // Note: setActiveNavLink is called within the loadHTML promise chain
    // to ensure the navbar exists before the script runs.

    // --- Navbar Scroll Effect ---
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Function to add/remove class
        const scrollAction = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        };

        window.addEventListener('scroll', scrollAction);
    };

    // --- Set Dynamic Copyright Year ---
    const setCopyrightYear = () => {
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };
});