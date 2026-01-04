// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    maxDays: 365,
    
    themeChanges: [
        { 
            days: 0, 
            theme: 'theme-start', 
            name: 'Phase 01', 
            subtitle: 'The Beginning',
            bgImages: [
                'https://picsum.photos/seed/cosmic1/1920/1080',
                'https://picsum.photos/seed/stars1/1920/1080',
                'https://picsum.photos/seed/nebula1/1920/1080'
            ]
        },
        { 
            days: 90, 
            theme: 'theme-3months', 
            name: 'Phase 02', 
            subtitle: '3 Months Later',
            bgImages: [
                'https://picsum.photos/seed/ocean1/1920/1080',
                'https://picsum.photos/seed/deep1/1920/1080',
                'https://picsum.photos/seed/abyss1/1920/1080'
            ]
        },
        { 
            days: 180, 
            theme: 'theme-6months', 
            name: 'Phase 03', 
            subtitle: '6 Months Later',
            bgImages: [
                'https://picsum.photos/seed/forest1/1920/1080',
                'https://picsum.photos/seed/nature1/1920/1080',
                'https://picsum.photos/seed/green1/1920/1080'
            ]
        },
        { 
            days: 270, 
            theme: 'theme-9months', 
            name: 'Phase 04', 
            subtitle: '9 Months Later',
            bgImages: [
                'https://picsum.photos/seed/fire1/1920/1080',
                'https://picsum.photos/seed/sunset1/1920/1080',
                'https://picsum.photos/seed/ember1/1920/1080'
            ]
        },
        { 
            days: 365, 
            theme: 'theme-end', 
            name: 'Final Phase', 
            subtitle: 'The End',
            bgImages: [
                'https://picsum.photos/seed/light1/1920/1080',
                'https://picsum.photos/seed/white1/1920/1080',
                'https://picsum.photos/seed/sky1/1920/1080'
            ]
        }
    ],
    
    parallax: {
        speed1: 0.3,  // Slowest layer
        speed2: 0.5,  // Medium layer
        speed3: 0.7   // Fastest layer
    }
};

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';
let scrollY = 0;
let ticking = false;

// ============================================
// PARALLAX SYSTEM
// ============================================

function updateParallax() {
    const scrolled = window.scrollY;
    
    // Update CSS custom property for parallax layers
    document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
    
    // Direct transform updates for smoother parallax
    const layer1 = document.querySelector('.parallax-bg-1');
    const layer2 = document.querySelector('.parallax-bg-2');
    const layer3 = document.querySelector('.parallax-bg-3');
    
    if (layer1) {
        layer1.style.transform = `translateY(${scrolled * CONFIG.parallax.speed1}px)`;
    }
    if (layer2) {
        layer2.style.transform = `translateY(${scrolled * CONFIG.parallax.speed2}px)`;
    }
    if (layer3) {
        layer3.style.transform = `translateY(${scrolled * CONFIG.parallax.speed3}px)`;
    }
}

// ============================================
// TIME DISPLAY UPDATE
// ============================================

function updateTimeDisplay() {
    const timeDisplay = document.getElementById("time-display");
    const timeZero = document.getElementById("time-zero");
    
    if (!timeZero || !timeDisplay) return;
    
    const zeroPosition = timeZero.offsetTop;
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate progress considering viewport
    const effectiveScroll = Math.max(0, scrolled);
    const effectiveTotal = Math.max(1, zeroPosition - viewportHeight * 0.5);
    const scrollProgress = Math.min(1, effectiveScroll / effectiveTotal);
    
    // Calculate current days
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    
    // Update display with animation
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Update theme
    updateTheme(currentDays);
}

// ============================================
// THEME SWITCHING
// ============================================

function updateTheme(days) {
    let newThemeConfig = CONFIG.themeChanges[0];
    
    for (const config of CONFIG.themeChanges) {
        if (days >= config.days) {
            newThemeConfig = config;
        }
    }
    
    if (newThemeConfig.theme !== currentTheme) {
        currentTheme = newThemeConfig.theme;
        
        // Remove all theme classes
        CONFIG.themeChanges.forEach(t => {
            document.body.classList.remove(t.theme);
        });
        
        // Add new theme class
        document.body.classList.add(newThemeConfig.theme);
        
        // Update chapter display
        updateChapterDisplay(newThemeConfig.name, newThemeConfig.subtitle);
        
        // Update parallax backgrounds
        updateParallaxBackgrounds(newThemeConfig.bgImages);
        
        console.log(`Theme: ${newThemeConfig.theme} | Days: ${days}`);
    }
}

function updateChapterDisplay(name, subtitle) {
    const nameElement = document.getElementById("chapter-name-en");
    const subtitleElement = document.getElementById("chapter-name");
    
    if (nameElement) {
        nameElement.style.opacity = '0';
        setTimeout(() => {
            nameElement.textContent = name + " /";
            nameElement.style.opacity = '1';
        }, 200);
    }
    
    if (subtitleElement) {
        subtitleElement.style.opacity = '0';
        setTimeout(() => {
            subtitleElement.textContent = subtitle;
            subtitleElement.style.opacity = '1';
        }, 300);
    }
}

function updateParallaxBackgrounds(images) {
    const layers = [
        document.querySelector('.parallax-bg-1'),
        document.querySelector('.parallax-bg-2'),
        document.querySelector('.parallax-bg-3')
    ];
    
    layers.forEach((layer, index) => {
        if (layer && images[index]) {
            layer.style.backgroundImage = `url('${images[index]}')`;
        }
    });
}

// ============================================
// SCROLL HANDLER (Optimized)
// ============================================

function onScroll() {
    scrollY = window.scrollY;
    
    if (!ticking) {
        requestAnimationFrame(() => {
            updateParallax();
            updateTimeDisplay();
            ticking = false;
        });
        ticking = true;
    }
}

// ============================================
// SECTION VISIBILITY OBSERVER
// ============================================

function initSectionObserver() {
    const options = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Execute data-onshow
                const onShow = entry.target.getAttribute('data-onshow');
                if (onShow) {
                    try { eval(onShow); } catch (e) { console.error(e); }
                }
            } else {
                entry.target.classList.remove('visible');
                
                // Execute data-onleave
                const onLeave = entry.target.getAttribute('data-onleave');
                if (onLeave) {
                    try { eval(onLeave); } catch (e) { console.error(e); }
                }
            }
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// PRELOAD IMAGES
// ============================================

function preloadImages() {
    CONFIG.themeChanges.forEach(theme => {
        theme.bgImages.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Set initial theme
    document.body.classList.add(CONFIG.themeChanges[0].theme);
    
    // Initialize parallax backgrounds
    updateParallaxBackgrounds(CONFIG.themeChanges[0].bgImages);
    
    // Preload theme images
    preloadImages();
    
    // Initialize observers
    initSectionObserver();
    
    // Scroll listener with passive for performance
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Resize listener
    window.addEventListener('resize', () => {
        updateParallax();
        updateTimeDisplay();
    });
    
    // Initial updates
    onScroll();
    
    console.log('Dimension Diary initialized with parallax effects');
});

// ============================================
// HTML CONTENT
// ============================================

const HTMLContent = `
    <!-- INTRO SECTION -->
    <section class="fullscreen intro-section">
        <div class="intro-logo">
            <h1>DIMENSION DIARY</h1>
            <span class="author">Your Name Here</span>
        </div>
        <div class="scroll-hint">↓ SCROLL TO BEGIN ↓</div>
    </section>

    <!-- PHASE 1: Days 0-90 -->
    <section class="page-flow">
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>file://diary/entry_001</span>
                    <span>Entry <b>001</b></span>
                    <span>Day <b>1</b></span>
                </p>
            </div>
            <p class="name">First Entry</p>
            <p>The experiment begins today. I've been assigned to document the dimensional anomalies occurring in Sector 7.</p>
            <p>Everything seems normal for now, but the instruments are picking up strange readings...</p>
            <em><p>Note: All personnel are advised to remain within designated safe zones.</p></em>
        </div>
    </section>

    <!-- ILLUSTRATION BREAK -->
    <section class="illustration-section" style="background-image: url('https://picsum.photos/seed/scene1/1920/1080');">
        <div class="illustration-caption">
            <p>"The first dimensional rift appeared without warning..."</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>file://diary/entry_030</span>
                    <span>Entry <b>030</b></span>
                    <span>Day <b>30</b></span>
                </p>
            </div>
            <p class="name">One Month</p>
            <p>A full month has passed. The anomalies are becoming more frequent.</p>
            <p>I've started to notice patterns in the dimensional shifts...</p>
        </div>
    </section>

    <!-- PHASE 2 MARKER -->
    <section class="fullscreen phase-marker">
        <div class="phase-title">
            <h2>PHASE 02</h2>
            <p>3 Months Later</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>file://diary/entry_090</span>
                    <span>Entry <b>090</b></span>
                    <span>Day <b>90</b></span>
                </p>
            </div>
            <p class="name">Three Months</p>
            <p>The first major breakthrough occurred today. We've managed to stabilize a dimensional pocket.</p>
            <p>But something else came through with us...</p>
        </div>
    </section>

    <!-- ILLUSTRATION -->
    <section class="illustration-section" style="background-image: url('https://picsum.photos/seed/scene2/1920/1080');">
        <div class="illustration-caption">
            <p>"Through the rift, we glimpsed another world..."</p>
        </div>
    </section>

    <!-- PHASE 3 MARKER -->
    <section class="fullscreen phase-marker">
        <div class="phase-title">
            <h2>PHASE 03</h2>
            <p>6 Months Later</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>file://diary/entry_180</span>
                    <span>Entry <b>180</b></span>
                    <span>Day <b>180</b></span>
                </p>
            </div>
            <p class="name">Half Year Mark</p>
            <p>Reality itself seems to be changing. The boundaries between dimensions are becoming thinner.</p>
            <p>I can no longer tell which world is the "real" one anymore...</p>
        </div>
    </section>

    <!-- PHASE 4 MARKER -->
    <section class="fullscreen phase-marker">
        <div class="phase-title">
            <h2>PHASE 04</h2>
            <p>9 Months Later</p>
        </div>
    </section>

    <section class="page-flow">
        <div class="modal">
            <div class="modal-heading">
                <p>
                    <span>file://diary/entry_270</span>
                    <span>Entry
