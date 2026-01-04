// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Maximum time in days
    maxDays: 365,
    
    // Phase milestones with background images
    phases: [
        { 
            days: 0, 
            name: 'Phase 01', 
            subtitle: 'The Beginning',
            background: 'flower background.png'
        },
        { 
            days: 90, 
            name: 'Phase 02', 
            subtitle: '3 Months Later',
            background: 'flower background.png'
        },
        { 
            days: 180, 
            name: 'Phase 03', 
            subtitle: '6 Months Later',
            background: 'flower background.png'
        },
        { 
            days: 270, 
            name: 'Phase 04', 
            subtitle: '9 Months Later',
            background: 'flower background.png'
        },
        { 
            days: 365, 
            name: 'Final Phase', 
            subtitle: 'The End',
            background: 'flower background.png'
        }
    ]
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let currentPhaseIndex = 0;
let timeZeroElement = null;
let isInitialized = false;

// ============================================
// INITIALIZE BACKGROUND IMAGES
// ============================================

function initBackgrounds() {
    const sections = document.querySelectorAll('.parallax-section');
    
    sections.forEach(section => {
        const bgImage = section.getAttribute('data-bg');
        const bgElement = section.querySelector('.section-background');
        
        if (bgImage && bgElement) {
            bgElement.style.backgroundImage = `url('${bgImage}')`;
        }
    });
}

// ============================================
// TIME DISPLAY UPDATE
// ============================================

function updateTimeDisplay() {
    const timeDisplay = document.getElementById('time-display');
    const timeZero = document.getElementById('time-zero');
    
    if (!timeZero || !timeDisplay) return;
    
    const zeroPosition = timeZero.offsetTop;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate scroll progress
    // We want time to reach max when scrolling to time-zero element
    const maxScroll = zeroPosition - viewportHeight;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    // Calculate current days
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    
    // Update display with animation
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Update phase/chapter display
    updatePhaseDisplay(currentDays);
}

// ============================================
// PHASE DISPLAY UPDATE
// ============================================

function updatePhaseDisplay(days) {
    let newPhaseIndex = 0;
    
    // Find current phase based on days
    for (let i = 0; i < CONFIG.phases.length; i++) {
        if (days >= CONFIG.phases[i].days) {
            newPhaseIndex = i;
        }
    }
    
    // Only update if phase changed
    if (newPhaseIndex !== currentPhaseIndex) {
        currentPhaseIndex = newPhaseIndex;
        const phase = CONFIG.phases[currentPhaseIndex];
        
        // Update chapter display with transition
        const nameEn = document.getElementById('chapter-name-en');
        const name = document.getElementById('chapter-name');
        
        if (nameEn && name) {
            // Fade out
            nameEn.style.opacity = '0';
            name.style.opacity = '0';
            
            setTimeout(() => {
                nameEn.textContent = phase.name + ' /';
                name.textContent = phase.subtitle;
                
                // Fade in
                nameEn.style.opacity = '1';
                name.style.opacity = '1';
            }, 200);
        }
        
        console.log(`Phase changed to: ${phase.name} at ${days} days`);
    }
}

// ============================================
// GLASS CONTAINER VISIBILITY (Intersection Observer)
// ============================================

function initGlassObserver() {
    const options = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const glass = entry.target;
            
            if (entry.isIntersecting) {
                glass.classList.add('visible');
            } else {
                // Optional: Remove visibility when scrolling away
                // glass.classList.remove('visible');
            }
        });
    }, options);
    
    // Observe all glass containers
    document.querySelectorAll('.glass-container').forEach(container => {
        observer.observe(container);
    });
}

// ============================================
// SCROLL INDICATOR HIDE
// ============================================

function handleScrollIndicator() {
    if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('#fixed-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// PARALLAX BACKGROUND MOVEMENT (Optional enhancement)
// ============================================

function initParallaxMovement() {
    // This adds subtle movement to backgrounds based on scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                document.querySelectorAll('.section-background').forEach((bg, index) => {
                    // Subtle vertical shift for parallax depth
                    const shift = scrollY * 0.1 * (index + 1) * 0.1;
                    bg.style.transform = `translateY(${shift}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// MAIN SCROLL HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(() => {
        updateTimeDisplay();
        handleScrollIndicator();
    });
}

// ============================================
// RESIZE HANDLER
// ============================================

function handleResize() {
    // Recalculate positions on resize
    timeZeroElement = document.getElementById('time-zero');
}

// ============================================
// PRELOAD IMAGES
// ============================================

function preloadImages() {
    CONFIG.phases.forEach(phase => {
        const img = new Image();
        img.src = phase.background;
    });
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log('Dimension Diary: Initializing...');
    
    // Preload background images
    preloadImages();
    
    // Initialize backgrounds from data attributes
    initBackgrounds();
    
    // Initialize glass container observer
    initGlassObserver();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Optional: Initialize parallax movement
    // initParallaxMovement();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add transition to chapter display
    const chapterElements = document.querySelectorAll('#overlay-chapter span');
    chapterElements.forEach(el => {
        el.style.transition = 'opacity 0.2s ease';
    });
    
    // Initial update
    handleScroll();
    
    // Mark first glass container as visible immediately
    const firstGlass = document.querySelector('.parallax-section:first-child .glass-container');
    if (firstGlass) {
        setTimeout(() => firstGlass.classList.add('visible'), 500);
    }
    
    console.log('Dimension Diary: Ready!');
}

// ============================================
// DOM READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
