/**
 * ============================================
 * PARALLAX SCROLLING ENGINE
 * ============================================
 * 
 * Creates smooth, GPU-accelerated parallax effects
 * using transform: translate3d() for performance.
 * 
 * Usage:
 * 1. Add class "parallax-section" to a section
 * 2. Add data-parallax-image="URL" for background
 * 3. Add data-parallax-speed="0.5" for speed (0-1)
 * 4. Optionally add data-parallax-overlay="rgba(0,0,0,0.5)"
 */

class ParallaxEngine {
    constructor(options = {}) {
        this.options = {
            // Default parallax speed (0 = fixed, 1 = same as scroll)
            defaultSpeed: 0.5,
            // Enable/disable on mobile
            enableOnMobile: false,
            // Mobile breakpoint
            mobileBreakpoint: 768,
            // Smooth factor for interpolation
            smoothFactor: 0.1,
            ...options
        };
        
        this.parallaxElements = [];
        this.scrollY = 0;
        this.targetScrollY = 0;
        this.rafId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.collectElements();
        this.createParallaxLayers();
        this.bindEvents();
        this.start();
        
        console.log(`ParallaxEngine initialized with ${this.parallaxElements.length} elements`);
    }
    
    /**
     * Collect all elements with parallax data attributes
     */
    collectElements() {
        const sections = document.querySelectorAll('[data-parallax-image]');
        
        sections.forEach((section, index) => {
            this.parallaxElements.push({
                element: section,
                image: section.getAttribute('data-parallax-image'),
                speed: parseFloat(section.getAttribute('data-parallax-speed')) || this.options.defaultSpeed,
                overlay: section.getAttribute('data-parallax-overlay') || null,
                blur: section.getAttribute('data-parallax-blur') || '0px',
                layer: null,
                currentY: 0,
                targetY: 0
            });
        });
    }
    
    /**
     * Create the parallax background layers (separate divs)
     */
    createParallaxLayers() {
        this.parallaxElements.forEach((item, index) => {
            const section = item.element;
            
            // Ensure section has position relative
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            // Create parallax container
            const parallaxContainer = document.createElement('div');
            parallaxContainer.className = 'parallax-layer-container';
            parallaxContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 120%;
                z-index: 0;
                pointer-events: none;
                will-change: transform;
            `;
            
            // Create background image layer
            const imageLayer = document.createElement('div');
            imageLayer.className = 'parallax-layer-image';
            imageLayer.style.cssText = `
                position: absolute;
                top: -10%;
                left: 0;
                width: 100%;
                height: 120%;
                background-image: url('${item.image}');
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
                will-change: transform;
                transform: translate3d(0, 0, 0);
            `;
            
            // Create overlay layer if specified
            if (item.overlay) {
                const overlayLayer = document.createElement('div');
                overlayLayer.className = 'parallax-layer-overlay';
                overlayLayer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: ${item.overlay};
                    z-index: 1;
                `;
                parallaxContainer.appendChild(overlayLayer);
            }
            
            parallaxContainer.insertBefore(imageLayer, parallaxContainer.firstChild);
            section.insertBefore(parallaxContainer, section.firstChild);
            
            // Store reference to the image layer for animation
            item.layer = imageLayer;
            
            // Ensure content is above parallax layer
            const contentWrapper = section.querySelector('.parallax-content');
            if (contentWrapper) {
                contentWrapper.style.position = 'relative';
                contentWrapper.style.zIndex = '2';
            }
        });
    }
    
    /**
     * Bind scroll and resize events
     */
    bindEvents() {
        // Scroll event (passive for performance)
        window.addEventListener('scroll', () => {
            this.targetScrollY = window.scrollY;
        }, { passive: true });
        
        // Resize event
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Initial scroll position
        this.targetScrollY = window.scrollY;
        this.scrollY = window.scrollY;
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Check if should disable on mobile
        if (!this.options.enableOnMobile && window.innerWidth < this.options.mobileBreakpoint) {
            this.resetLayers();
        }
    }
    
    /**
     * Reset all layers to default position
     */
    resetLayers() {
        this.parallaxElements.forEach(item => {
            if (item.layer) {
                item.layer.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    }
    
    /**
     * Start the animation loop
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    /**
     * Stop the animation loop
     */
    stop() {
        this.isRunning = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
    
    /**
     * Main animation loop using requestAnimationFrame
     */
    animate() {
        if (!this.isRunning) return;
        
        // Smooth interpolation for buttery scrolling
        this.scrollY += (this.targetScrollY - this.scrollY) * this.options.smoothFactor;
        
        // Update each parallax element
        this.updateLayers();
        
        // Continue the loop
        this.rafId = requestAnimationFrame(() => this.animate());
    }
    
    /**
     * Update the transform of each parallax layer
     */
    updateLayers() {
        // Skip on mobile if disabled
        if (!this.options.enableOnMobile && window.innerWidth < this.options.mobileBreakpoint) {
            return;
        }
        
        this.parallaxElements.forEach(item => {
            if (!item.layer) return;
            
            const section = item.element;
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + this.scrollY;
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Check if section is in view (with buffer)
            const isInView = rect.top < viewportHeight + 200 && rect.bottom > -200;
            
            if (isInView) {
                // Calculate parallax offset
                // When section is at top of viewport, offset should be 0
                // When section is at bottom of viewport, offset should be max
                const scrollProgress = (this.scrollY - sectionTop + viewportHeight) / (sectionHeight + viewportHeight);
                const maxOffset = sectionHeight * item.speed;
                const offset = (scrollProgress - 0.5) * maxOffset;
                
                // Apply transform with translate3d (GPU accelerated)
                item.layer.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        });
    }
    
    /**
     * Destroy the engine and clean up
     */
    destroy() {
        this.stop();
        this.parallaxElements = [];
    }
}

// Auto-initialize
window.ParallaxEngine = ParallaxEngine;
