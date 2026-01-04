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
            // Placeholder images from Unsplash
            backgroundImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
            overlayColor: 'rgba(17, 0, 34, 0.6)'
        },
        { 
            days: 90, 
            theme: 'theme-3months', 
            name: 'Phase 02', 
            subtitle: '3 Months Later',
            backgroundImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
            overlayColor: 'rgba(0, 20, 40, 0.6)'
        },
        { 
            days: 180, 
            theme: 'theme-6months', 
            name: 'Phase 03', 
            subtitle: '6 Months Later',
            backgroundImage: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80',
            overlayColor: 'rgba(0, 30, 20, 0.6)'
        },
        { 
            days: 270, 
            theme: 'theme-9months', 
            name: 'Phase 04', 
            subtitle: '9 Months Later',
            backgroundImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
            overlayColor: 'rgba(40, 20, 0, 0.6)'
        },
        { 
            days: 365, 
            theme: 'theme-end', 
            name: 'Final Phase', 
            subtitle: 'The End',
            backgroundImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80',
            overlayColor: 'rgba(255, 255, 255, 0.3)'
        }
    ],
    
    // Glass effect settings
    glassEffect: {
        overlayOpacity: 0.4,
        blurAmount: 0,  // Set to 0 for performance, use overlay instead
        noiseOpacity: 0.03
    }
};

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';

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
    const scrollProgress = Math.min(1, Math.max(0, scrollY / zeroPosition));
    
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    timeDisplay.textContent = currentDays.toLocaleString();
    
    updateTheme(currentDays);
}

// ============================================
// THEME SWITCHING WITH BACKGROUND
// ============================================

function updateTheme(days) {
    let newThemeConfig = CONFIG.themeChanges[0];
    
    for (const themeConfig of CONFIG.themeChanges) {
        if (days >= themeConfig.days) {
            newThemeConfig = themeConfig;
        }
    }
    
    if (newThemeConfig.theme !== currentTheme) {
        currentTheme = newThemeConfig.theme;
        
        // Remove all theme classes
        document.body.classList.remove(...CONFIG.themeChanges.map(t => t.theme));
        document.body.classList.add(newThemeConfig.theme);
        
        // Update chapter display
        updateChapterDisplay(newThemeConfig.name, newThemeConfig.subtitle);
        
        // Update CSS variables for dynamic overlay color
        document.documentElement.style.setProperty(
            '--current-overlay-color', 
            newThemeConfig.overlayColor
        );
        
        console.log(`Theme: ${newThemeConfig.theme} | Days: ${days}`);
    }
}

function updateChapterDisplay(name, subtitle) {
    const nameElement = document.getElementById("chapter-name-en");
    const subtitleElement = document.getElementById("chapter-name");
    
    if (nameElement) nameElement.textContent = name + " /";
    if (subtitleElement) subtitleElement.textContent = subtitle;
}

// ============================================
// SCROLL HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(() => {
        window.scrollData.scrollY = window.scrollY;
        window.scrollData.documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        window.scrollData.scrollPercent = 
            (window.scrollY / (window.scrollData.documentHeight - window.innerHeight)) * 100;
        
        updateTimeDisplay();
    });
}

// ============================================
// SECTION OBSERVER
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
                const onShow = section.getAttribute('data-onshow');
                if (onShow && !shownElements.has(section)) {
                    try {
                        eval(onShow);
                        shownElements.add(section);
                    } catch (error) {
                        console.error('Error executing data-onshow:', error);
                    }
                }
                
                // Add visible class for CSS animations
                section.classList.add('section-visible');
            } else {
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
                section.classList.remove('section-visible');
            }
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    initSectionObserver();
    handleScroll();
    document.body.classList.add(CONFIG.themeChanges[0].theme);
    
    // Refresh parallax after content loads
    setTimeout(() => {
        if (window.parallaxEngine) {
            window.parallaxEngine.refresh();
        }
    }, 100);
    
    console.log('Dimension Diary with Parallax initialized');
});

// ============================================
// HTML CONTENT WITH PARALLAX SECTIONS
// ============================================

const HTMLContent = `
    <!-- ==========================================
         HERO SECTION - Full Screen Parallax
         ========================================== -->
    <section class="fullscreen parallax-section" data-parallax data-parallax-speed="0.3">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80')"></div>
            <div class="parallax-overlay"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content title-background">
            <div class="intro-logo">
                <h1 class="glass-text">DIMENSION DIARY</h1>
                <span class="author">A Journey Through Time</span>
            </div>
            <div class="scroll-indicator">
                <span>Scroll to begin</span>
                <div class="scroll-arrow"></div>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PHASE 1: DAYS 0-90
         ========================================== -->
    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_001</p>
                <p>
                    <span class="file-number">Log<b>#001</b></span>
                    <span class="file-date">Day<b>1</b></span>
                </p>
            </div>
            <p class="name">First Entry</p>
            <p>The dimensional rift opened today. What I saw on the other side... defies description.</p>
            <p>Time moves differently here. Or perhaps it's my perception that has changed.</p>
        </div>
    </section>

    <!-- Parallax Image Break -->
    <section class="parallax-section medium" data-parallax data-parallax-speed="0.5">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80')"></div>
            <div class="parallax-overlay"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content">
            <blockquote class="parallax-quote">
                "Time is not a line. It is a dimension."
            </blockquote>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_030</p>
            </div>
            <p class="name">Day 30</p>
            <p>One month. The boundaries between dimensions grow thinner each day.</p>
            <p>I've started to see echoes of other timelines overlapping with this one.</p>
        </div>
    </section>

    <!-- ==========================================
         PHASE 2: DAYS 90-180 (3 Months)
         ========================================== -->
    <section class="fullscreen parallax-section phase-transition" data-parallax data-parallax-speed="0.4" id="phase-2">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')"></div>
            <div class="parallax-overlay" style="background: rgba(0, 20, 40, 0.6)"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content title-background">
            <div class="phase-title">
                <span class="phase-number">02</span>
                <h2>THREE MONTHS</h2>
                <p>The patterns emerge</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_090</p>
                <p>
                    <span class="file-number">Log<b>#090</b></span>
                    <span class="file-date">Day<b>90</b></span>
                </p>
            </div>
            <p class="name">Three Months</p>
            <p>I've learned to navigate the shifts now. Each dimension has its own frequency, its own rhythm.</p>
            <p>The key is synchronization.</p>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_120</p>
            </div>
            <p class="name">Day 120</p>
            <p>Met another traveler today. She's been jumping for years.</p>
            <p class="italic">"The longer you stay," she said, "the less you remember who you were."</p>
        </div>
    </section>

    <!-- ==========================================
         PHASE 3: DAYS 180-270 (6 Months)
         ========================================== -->
    <section class="fullscreen parallax-section phase-transition" data-parallax data-parallax-speed="0.4" id="phase-3">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80')"></div>
            <div class="parallax-overlay" style="background: rgba(0, 30, 20, 0.6)"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content title-background">
            <div class="phase-title">
                <span class="phase-number">03</span>
                <h2>SIX MONTHS</h2>
                <p>Identity fractures</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_180</p>
            </div>
            <p class="name">Day 180</p>
            <p>Half a year. I can no longer remember my mother's face.</p>
            <p>But I can see seventeen versions of this room simultaneously.</p>
        </div>
    </section>

    <!-- Parallax Quote Break -->
    <section class="parallax-section medium" data-parallax data-parallax-speed="0.6">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&q=80')"></div>
            <div class="parallax-overlay"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content">
            <blockquote class="parallax-quote">
                "We are not lost. We are everywhere at once."
            </blockquote>
        </div>
    </section>

    <!-- ==========================================
         PHASE 4: DAYS 270-365 (9 Months)
         ========================================== -->
    <section class="fullscreen parallax-section phase-transition" data-parallax data-parallax-speed="0.4" id="phase-4">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80')"></div>
            <div class="parallax-overlay" style="background: rgba(40, 20, 0, 0.6)"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content title-background">
            <div class="phase-title">
                <span class="phase-number">04</span>
                <h2>NINE MONTHS</h2>
                <p>The convergence approaches</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_270</p>
            </div>
            <p class="name">Day 270</p>
            <p>The timelines are collapsing into one. I can feel the convergence.</p>
            <p>All paths lead to a single point.</p>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="modal rec glass-card">
            <div class="modal-heading monospace">
                <p>file://dimension/log_300</p>
            </div>
            <p class="name">Day 300</p>
            <p>I understand now. The journey was never about reaching a destination.</p>
            <p>It was about becoming something that could exist in all dimensions at once.</p>
        </div>
    </section>

    <!-- ==========================================
         FINAL: DAY 365
         ========================================== -->
    <section class="fullscreen parallax-section" data-parallax data-parallax-speed="0.3" id="time-zero">
        <div class="parallax-background">
            <div class="parallax-image" style="background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80')"></div>
            <div class="parallax-overlay" style="background: rgba(255, 255, 255, 0.2)"></div>
            <div class="parallax-noise"></div>
        </div>
        <div class="glass-content title-background">
            <div class="final-display">
                <span class="final-label">DAY</span>
                <h1 class="final-number">365</h1>
                <p class="final-subtitle">The Convergence</p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         ENDING
         ========================================== -->
    <section class="fullscreen ending-section">
        <div class="endscreen">
            <p class="end-symbol">∞</p>
            <span class="end-text">I AM EVERYWHERE</span>
            <span class="end-subtext">THE END IS THE BEGINNING</span>
        </div>
    </section>
`;

// Inject content
document.querySelector('main-content').innerHTML = HTMLContent;
