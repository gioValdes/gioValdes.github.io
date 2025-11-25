// ===========================
// Parallax Scroll Effect
// ===========================

let ticking = false;

// Smooth parallax on scroll
function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero background parallax
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Timeline entries parallax
    const entries = document.querySelectorAll('.timeline-entry.visible');
    entries.forEach((entry, index) => {
        const rect = entry.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const distance = elementCenter - windowCenter;
        
        // Calculate parallax offset based on distance from center
        const parallaxOffset = distance * 0.05;
        
        // Apply parallax to image
        const image = entry.querySelector('.timeline-image-wrapper');
        if (image) {
            image.style.transform = `translateY(${parallaxOffset}px)`;
        }
        
        // Apply subtle parallax to content
        const content = entry.querySelector('.timeline-content');
        if (content) {
            const contentOffset = distance * 0.02;
            content.style.transform = `translateY(${contentOffset}px)`;
        }
    });
    
    ticking = false;
}

// Request animation frame for smooth performance
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// ===========================
// Intersection Observer for Timeline Entries
// ===========================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on entry index
            const delay = Array.from(entry.target.parentElement.children)
                .indexOf(entry.target) * 100;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            
            // Don't unobserve so parallax continues to work
        }
    });
}, observerOptions);

// Observe all timeline entries
document.addEventListener('DOMContentLoaded', () => {
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    timelineEntries.forEach(entry => {
        observer.observe(entry);
    });
    
    // Initial parallax update
    updateParallax();
});

// ===========================
// Smooth Scroll Enhancement
// ===========================

// Add smooth scroll to any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Enhanced Hover Effects
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            // Add subtle scale to the entire card
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// ===========================
// Parallax Mouse Movement on Hero
// ===========================

const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const moveX = (mouseX - 0.5) * 30;
            const moveY = (mouseY - 0.5) * 30;
            heroBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ===========================
// Performance: Reduce motion for users who prefer it
// ===========================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable parallax effects for users who prefer reduced motion
    window.removeEventListener('scroll', requestTick);
    document.querySelectorAll('.timeline-entry').forEach(entry => {
        entry.style.transition = 'opacity 0.3s ease';
    });
}
