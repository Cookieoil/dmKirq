/**
 * PARALLAX SCROLLING ENGINE
 * Uses translate3d for GPU-accelerated smooth scrolling
 */

class ParallaxEngine {
    constructor(options = {}) {
        this.config = {
            parallaxSpeed: options.parallaxSpeed || 0.5,
            enabled: options.enabled !== false,
            useGPU: options.useGPU !== false,
            throttle: options.throttle || 10
        };
        
        this.parallaxElements = [];
        this.ticking = false;
        this.lastScrollY = 0;
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        // Find all parallax containers
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (this.parallaxElements.length === 0) {
            console.warn('No parallax elements found. Make sure content is loaded first.');
            return;
        }
        
        // Bind scroll event
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        window.addEventListener('resize', () => this.onResize(), { passive: true });
        
        // Initial update
        this.update();
        this.initialized = true;
        
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
        if (!this.config.enabled) return;
        
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
            const maxOffset = elementHeight * speed;
            const offset = (scrollProgress - 0.5) * maxOffset;
            
            // Find the parallax image inside
            const parallaxImage = container.querySelector('.parallax-image');
            if (parallaxImage) {
                if (this.config.useGPU) {
                    parallaxImage.style.transform = `translate3d(0, ${offset}px, 0)`;
                } else {
                    parallaxImage.style.transform = `translateY(${offset}px)`;
                }
            }
        });
    }
    
    refresh() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.update();
        console.log(`Parallax refreshed: ${this.parallaxElements.length} elements`);
    }
    
    toggle(enabled) {
        this.config.enabled = enabled;
        if (enabled) {
            this.update();
        }
    }
}

// Create global instance but DON'T initialize yet
window.parallaxEngine = new ParallaxEngine({
    parallaxSpeed: 0.4,
    enabled: true,
    useGPU: true
});
