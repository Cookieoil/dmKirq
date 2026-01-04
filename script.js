// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    maxDays: 365,
    parallaxSpeed: 0.4, // Background moves at 40% of scroll speed
    
    // Theme changes with background images
    themeChanges: [
        { 
            days: 0, 
            name: 'Phase 01', 
            subtitle: 'The Beginning',
            bgClass: 'bg-theme-1'
        },
        { 
            days: 90, 
            name: 'Phase 02', 
            subtitle: '3 Months Later',
            bgClass: 'bg-theme-2'
        },
        { 
            days: 180, 
            name: 'Phase 03', 
            subtitle: '6 Months Later',
            bgClass: 'bg-theme-3'
        },
        { 
            days: 270, 
            name: 'Phase 04', 
            subtitle: 'The Final Days',
            bgClass: 'bg-theme-4'
        }
    ]
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let currentThemeIndex = 0;
let lastScrollY = 0;

// ============================================
// PARALLAX SCROLLING
// ============================================

function updateParallax() {
    const scrollY = window.scrollY;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    // Move all layers at parallax speed (slower than content)
    const parallaxOffset = scrollY * CONFIG.parallaxSpeed;
    
    parallaxLayers.forEach(layer => {
        // Use translate3d for GPU acceleration
        layer.style.transform = `translate3d(0, ${-parallaxOffset}px, 0)`;
    });
    
    lastScrollY = scrollY;
}

// ============================================
// THEME/BACKGROUND SWITCHING
// ============================================

function updateTheme(days) {
    let newThemeIndex = 0;
    
    // Find which theme should be active
    for (let i = 0; i < CONFIG.themeChanges.length; i++) {
        if (days >= CONFIG.themeChanges[i].days) {
            newThemeIndex = i;
        }
    }
    
    // Only update if theme changed
    if (newThemeIndex !== currentThemeIndex) {
        currentThemeIndex = newThemeIndex;
        
        const theme = CONFIG.themeChanges[newThemeIndex];
        
        // Update background layers - activate current, deactivate others
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach((layer, index) => {
            if (index <= newThemeIndex) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        });
        
        // Update chapter display
        updateChapterDisplay(theme.name, theme.subtitle);
        
        console.log(`Theme changed to: ${theme.name} at ${days} days`);
    }
}

function updateChapterDisplay(name, subtitle) {
    const nameElement = document.getElementById("chapter-name-en");
    const subtitleElement = document.getElementById("chapter-name");
    
    if (nameElement) nameElement.textContent = name + " /";
    if (subtitleElement) subtitleElement.textContent = subtitle;
}

// ============================================
// TIME DISPLAY
// ============================================

function updateTimeDisplay() {
    const timeDisplay = document.getElementById("time-display");
    const timeZero = document.getElementById("time-zero");
    
    if (!timeZero || !timeDisplay) return;
    
    const zeroPosition = timeZero.offsetTop;
    const scrollY = window.scrollY;
    
    // Calculate scroll progress
    const scrollProgress = Math.min(1, Math.max(0, scrollY / zeroPosition));
    
    // Calculate current days
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    
    // Update display
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Check for theme changes
    updateTheme(currentDays);
}

// ============================================
// MAIN SCROLL HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(() => {
        updateParallax();
        updateTimeDisplay();
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Create parallax container and layers
    createParallaxLayers();
    
    // Create glass overlay
    createGlassOverlay();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial update
    handleScroll();
    
    // Set initial theme
    const firstTheme = CONFIG.themeChanges[0];
    updateChapterDisplay(firstTheme.name, firstTheme.subtitle);
    
    // Activate first background
    const firstLayer = document.querySelector('.parallax-layer');
    if (firstLayer) firstLayer.classList.add('active');
    
    console.log('Initialized with parallax scrolling');
});

// ============================================
// CREATE PARALLAX LAYERS
// ============================================

function createParallaxLayers() {
    const container = document.createElement('div');
    container.id = 'parallax-container';
    
    // Create a layer for each theme
    CONFIG.themeChanges.forEach((theme, index) => {
        const layer = document.createElement('div');
        layer.className = `parallax-layer ${theme.bgClass}`;
        container.appendChild(layer);
    });
    
    // Insert at beginning of body
    document.body.insertBefore(container, document.body.firstChild);
}

// ============================================
// CREATE GLASS OVERLAY
// ============================================

function createGlassOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'glass-overlay';
    document.body.insertBefore(overlay, document.getElementById('content-container'));
}

// ============================================
// HTML CONTENT
// ============================================

const HTMLContent = `
    <!-- INTRO -->
    <section class="fullscreen intro-section">
        <div class="intro-logo">
            <h1>DIMENSION DIARY</h1>
            <span class="author">Your Name</span>
        </div>
    </section>

    <!-- PHASE 1 CONTENT -->
    <section>
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>Entry <b>001</b></span>
                    <span>Day <b>1</b></span>
                </p>
            </div>
            <p class="name">The Beginning</p>
            <p>First diary entry content here...</p>
            <p>The experiment begins today.</p>
        </div>
    </section>

    <section>
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>Entry <b>030</b></span>
                    <span>Day <b>30</b></span>
                </p>
            </div>
            <p class="name">One Month</p>
            <p>One month has passed...</p>
        </div>
    </section>

    <!-- PHASE 2 TITLE -->
    <section class="fullscreen">
        <div class="phase-title">
            <h2>PHASE 02</h2>
            <p>3 Months Later</p>
        </div>
    </section>

    <section>
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>Entry <b>090</b></span>
                    <span>Day <b>90</b></span>
                </p>
            </div>
            <p class="name">Three Months</p>
            <p>Something changed today...</p>
        </div>
    </section>

    <!-- PHASE 3 TITLE -->
    <section class="fullscreen">
        <div class="phase-title">
            <h2>PHASE 03</h2>
            <p>6 Months Later</p>
        </div>
    </section>

    <section>
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>Entry <b>180</b></span>
                    <span>Day <b>180</b></span>
                </p>
            </div>
            <p class="name">Half Year</p>
            <p>Reality feels different now...</p>
        </div>
    </section>

    <!-- PHASE 4 TITLE -->
    <section class="fullscreen">
        <div class="phase-title">
            <h2>PHASE 04</h2>
            <p>The Final Days</p>
        </div>
    </section>

    <section>
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>Entry <b>270</b></span>
                    <span>Day <b>270</b></span>
                </p>
            </div>
            <p class="name">Nine Months</p>
            <p>Almost there...</p>
        </div>
    </section>

    <!-- TIME ZERO -->
    <section class="fullscreen" id="time-zero">
        <div class="phase-title">
            <h2>DAY 365</h2>
            <p>The End</p>
        </div>
    </section>

    <!-- ENDING -->
    <section class="fullscreen">
        <div class="endscreen">
            <p>終</p>
            <span>THE END</span>
        </div>
    </section>
`;

document.querySelector('main-content').innerHTML = HTMLContent;
