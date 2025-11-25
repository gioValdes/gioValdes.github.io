// Animated gradient background with scroll
let lastScrollY = window.pageYOffset;

function updateGradientOnScroll() {
    const scrollY = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;

    // Create smooth color transitions based on scroll position
    const hue1 = 220 + (scrollPercent * 40); // Blue to cyan range
    const hue2 = 240 + (scrollPercent * 60); // Purple to blue range  
    const hue3 = 210 + (scrollPercent * 50); // Dark blue variations

    const gradient = `linear-gradient(180deg, 
        hsl(${hue1}, 25%, 8%) 0%, 
        hsl(${hue2}, 30%, 12%) 50%, 
        hsl(${hue3}, 28%, 15%) 100%)`;

    document.body.style.background = gradient;
    document.body.style.backgroundAttachment = 'fixed';

    lastScrollY = scrollY;
}

// Throttle scroll event for performance
let ticking = false;
window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            updateGradientOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize
updateGradientOnScroll();
