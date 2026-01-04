/**
 * PARALLAX SCROLLING ENGINE
 * Uses translate3d for GPU-accelerated smooth scrolling
 */

class ParallaxEngine {
    constructor(options = {}) {
        this.config = {
            // How much the background "lags" behind scroll (0.5 = half speed)
            parallaxSpeed: options.parallaxSpeed || 0.5,
            // Enable/disable parallax
            enabled: options.enabled !== false,
            // Use GPU acceleration
            useGPU: options.useGPU !== false,
            // Throttle scroll events (ms)
            throttle: options.throttle || 10
        };
        
        this.parallaxElements = [];
        this.ticking = false;
        this.lastScrollY = 0;
        
        if (this.config.enabled) {
            this.init();
        }
    }
    
    init() {
        // Find all parallax containers
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        
        // Bind scroll event
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        window.addEventListener('resize', () => this.onResize(), { passive: true });
        
        // Initial update
        this.update();
        
        console.log(`Parallax initialized with ${this.parallaxElements.length} elements`);
    }
    
    onScroll() {
        this.lastScrollY = window.scrollY;
        
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.update();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    onResize() {
        this.update();
    }
    
    update() {
        const scrollY = this.lastScrollY;
        const viewportHeight = window.innerHeight;
        
        this.parallaxElements.forEach(container => {
            const rect = container.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            
            // Check if element is in viewport (with buffer)
            const buffer = viewportHeight;
            const isVisible = (
                scrollY + viewportHeight + buffer > elementTop &&
                scrollY - buffer < elementTop + elementHeight
            );
            
            if (!isVisible) return;
            
            // Calculate parallax offset
            const scrolledPast = scrollY - elementTop + viewportHeight;
            const totalScrollDistance = viewportHeight + elementHeight;
            const scrollProgress = scrolledPast / totalScrollDistance;
            
            // Get custom speed from data attribute or use default
            const speed = parseFloat(container.dataset.parallaxSpeed) || this.config.parallaxSpeed;
            
            // Calculate translation
            // The background moves slower than content, creating depth
            const maxOffset = elementHeight * speed;
            const offset = (scrollProgress - 0.5) * maxOffset;
            
            // Find the parallax image inside
            const parallaxImage = container.querySelector('.parallax-image');
            if (parallaxImage) {
                if (this.config.useGPU) {
                    // GPU-accelerated transform
                    parallaxImage.style.transform = `translate3d(0, ${offset}px, 0)`;
                } else {
                    // Fallback
                    parallaxImage.style.transform = `translateY(${offset}px)`;
                }
            }
        });
    }
    
    // Public method to add new parallax elements dynamically
    refresh() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.update();
    }
    
    // Enable/disable parallax
    toggle(enabled) {
        this.config.enabled = enabled;
        if (enabled) {
            this.update();
        }
    }
}

// Initialize parallax engine globally
window.parallaxEngine = null;

document.addEventListener('DOMContentLoaded', () => {
    window.parallaxEngine = new ParallaxEngine({
        parallaxSpeed: 0.4,
        enabled: true,
        useGPU: true
    });
});
