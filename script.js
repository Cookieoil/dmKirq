// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================

const CONFIG = {
    // Maximum time in days (e.g., 365 days = 1 year)
    maxDays: 365,
    
    // Theme change milestones (in days)
    // Each milestone triggers a theme change
    themeChanges: [
        { days: 0, theme: 'theme-start', name: 'Phase 01', subtitle: 'The Beginning' },
        { days: 90, theme: 'theme-3months', name: 'Phase 02', subtitle: '3 Months Later' },
        { days: 180, theme: 'theme-6months', name: 'Phase 03', subtitle: '6 Months Later' },
        { days: 270, theme: 'theme-9months', name: 'Phase 04', subtitle: '9 Months Later' },
        { days: 365, theme: 'theme-end', name: 'Final Phase', subtitle: 'The End' }
    ]
};

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';
let timeZeroPosition = null;
let timeZeroElement = null;

// ============================================
// SCROLL DATA
// ============================================

window.scrollData = {
    scrollY: 0,
    scrollPercent: 0,
    viewportHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight
};

// ============================================
// TIME DISPLAY UPDATE
// ============================================

function updateTimeDisplay() {
    const timeDisplay = document.getElementById("time-display");
    const timeZero = document.getElementById("time-zero");
    
    if (!timeZero || !timeDisplay) return;
    
    const zeroPosition = timeZero.offsetTop;
    const scrollY = window.scrollY;
    
    // Calculate scroll progress (0 at top, 1 at time-zero element)
    const scrollProgress = Math.min(1, Math.max(0, scrollY / zeroPosition));
    
    // Calculate current days based on scroll
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    
    // Update display
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Check for theme changes
    updateTheme(currentDays);
}

// ============================================
// THEME SWITCHING
// ============================================

function updateTheme(days) {
    let newTheme = CONFIG.themeChanges[0];
    
    // Find the appropriate theme for current day count
    for (const themeConfig of CONFIG.themeChanges) {
        if (days >= themeConfig.days) {
            newTheme = themeConfig;
        }
    }
    
    // Only update if theme changed
    if (newTheme.theme !== currentTheme) {
        currentTheme = newTheme.theme;
        
        // Remove all theme classes
        document.body.classList.remove(...CONFIG.themeChanges.map(t => t.theme));
        
        // Add new theme class
        document.body.classList.add(newTheme.theme);
        
        // Update chapter display
        updateChapterDisplay(newTheme.name, newTheme.subtitle);
        
        console.log(`Theme changed to: ${newTheme.theme} at ${days} days`);
    }
}

function updateChapterDisplay(name, subtitle) {
    const nameElement = document.getElementById("chapter-name-en");
    const subtitleElement = document.getElementById("chapter-name");
    
    if (nameElement) nameElement.textContent = name + " /";
    if (subtitleElement) subtitleElement.textContent = subtitle;
}

// ============================================
// SCROLL EVENT HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(() => {
        // Update scroll data
        window.scrollData.scrollY = window.scrollY;
        window.scrollData.documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        window.scrollData.scrollPercent = 
            (window.scrollY / (window.scrollData.documentHeight - window.innerHeight)) * 100;
        
        // Update time display
        updateTimeDisplay();
    });
}

// ============================================
// SECTION VISIBILITY (Intersection Observer)
// ============================================

let sectionObserver;
let shownElements = new Set();

function initSectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            
            if (entry.isIntersecting) {
                // Execute data-onshow callback
                const onShow = section.getAttribute('data-onshow');
                if (onShow && !shownElements.has(section)) {
                    try {
                        eval(onShow);
                        shownElements.add(section);
                    } catch (error) {
                        console.error('Error executing data-onshow:', error);
                    }
                }
            } else {
                // Execute data-onleave callback
                if (shownElements.has(section)) {
                    const onLeave = section.getAttribute('data-onleave');
                    if (onLeave) {
                        try {
                            eval(onLeave);
                        } catch (error) {
                            console.error('Error executing data-onleave:', error);
                        }
                    }
                    shownElements.delete(section);
                }
            }
        });
    }, options);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Initialize scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize section observer
    initSectionObserver();
    
    // Initial update
    handleScroll();
    
    // Set initial theme
    document.body.classList.add(CONFIG.themeChanges[0].theme);
    
    console.log('Dimension Diary initialized');
});

// ============================================
// HTML CONTENT - Your story content goes here
// ============================================

const HTMLContent = `
    <!-- INTRO SECTION -->
    <section class="fullscreen intro-section">
        <div class="intro-logo">
            <h1>DIMENSION DIARY</h1>
            <span class="author">Your Name</span>
        </div>
    </section>

    <!-- PHASE 1: The Beginning (Days 0-90) -->
    <section class="page-flow" data-onshow="console.log('Phase 1 visible')">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_001</p>
                <p>
                    <span class="file-number">Entry<b>001</b></span>
                    <span class="file-date">Day<b>1</b></span>
                </p>
            </div>
            <p class="name">Researcher Notes</p>
            <p>This is where your first diary entry goes...</p>
            <p>The experiment begins today. I don't know what to expect.</p>
        </div>
    </section>

    <!-- More entries... -->
    <section class="page-flow">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_002</p>
            </div>
            <p class="name">Day 30</p>
            <p>One month has passed. Things are starting to change...</p>
        </div>
    </section>

    <!-- PHASE 2: 3 Months (Days 90-180) -->
    <section class="page-flow phase-marker" id="phase-2-start">
        <div class="phase-title">
            <h2>PHASE 02</h2>
            <p>3 Months Later</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_090</p>
            </div>
            <p class="name">Day 90</p>
            <p>Three months. The first dimensional shift occurred today...</p>
        </div>
    </section>

    <!-- PHASE 3: 6 Months (Days 180-270) -->
    <section class="page-flow phase-marker" id="phase-3-start">
        <div class="phase-title">
            <h2>PHASE 03</h2>
            <p>6 Months Later</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_180</p>
            </div>
            <p class="name">Day 180</p>
            <p>Half a year. Reality feels different now...</p>
        </div>
    </section>

    <!-- TIME ZERO - The final point -->
    <section class="fullscreen" id="time-zero">
        <div class="final-display">
            <h1>DAY 365</h1>
            <p>The End</p>
        </div>
    </section>

    <!-- ENDING -->
    <section class="fullscreen ending">
        <div class="endscreen">
            <p>終</p>
            <span>THE END</span>
        </div>
    </section>
`;

// Inject content
document.querySelector('main-content').innerHTML = HTMLContent;
