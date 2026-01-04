/**
 * ============================================
 * DIMENSION DIARY - Main Script
 * ============================================
 */

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
            // Unsplash placeholder images for each phase
            bgImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80'
        },
        { 
            days: 90, 
            theme: 'theme-3months', 
            name: 'Phase 02', 
            subtitle: '3 Months Later',
            bgImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80'
        },
        { 
            days: 180, 
            theme: 'theme-6months', 
            name: 'Phase 03', 
            subtitle: '6 Months Later',
            bgImage: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80'
        },
        { 
            days: 270, 
            theme: 'theme-9months', 
            name: 'Phase 04', 
            subtitle: '9 Months Later',
            bgImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80'
        },
        { 
            days: 365, 
            theme: 'theme-end', 
            name: 'Final Phase', 
            subtitle: 'The End',
            bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
        }
    ]
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';
let parallaxEngine = null;

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
// THEME SWITCHING
// ============================================

function updateTheme(days) {
    let newTheme = CONFIG.themeChanges[0];
    
    for (const themeConfig of CONFIG.themeChanges) {
        if (days >= themeConfig.days) {
            newTheme = themeConfig;
        }
    }
    
    if (newTheme.theme !== currentTheme) {
        currentTheme = newTheme.theme;
        
        // Remove all theme classes
        document.body.classList.remove(...CONFIG.themeChanges.map(t => t.theme));
        document.body.classList.add(newTheme.theme);
        
        // Update chapter display
        updateChapterDisplay(newTheme.name, newTheme.subtitle);
        
        console.log(`Theme: ${newTheme.theme} at ${days} days`);
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
        updateTimeDisplay();
    });
}

// ============================================
// SECTION OBSERVER
// ============================================

function initSectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const shownElements = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            
            if (entry.isIntersecting) {
                const onShow = section.getAttribute('data-onshow');
                if (onShow && !shownElements.has(section)) {
                    try {
                        eval(onShow);
                        shownElements.add(section);
                    } catch (e) {
                        console.error('data-onshow error:', e);
                    }
                }
                // Add visible class for CSS animations
                section.classList.add('section-visible');
            } else {
                const onLeave = section.getAttribute('data-onleave');
                if (onLeave && shownElements.has(section)) {
                    try {
                        eval(onLeave);
                    } catch (e) {
                        console.error('data-onleave error:', e);
                    }
                    shownElements.delete(section);
                }
            }
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    // Inject HTML content first
    document.querySelector('main-content').innerHTML = HTMLContent;
    
    // Initialize parallax engine
    parallaxEngine = new ParallaxEngine({
        defaultSpeed: 0.5,
        enableOnMobile: false,
        smoothFactor: 0.08
    });
    
    // Initialize scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize section observer
    initSectionObserver();
    
    // Initial updates
    handleScroll();
    document.body.classList.add(CONFIG.themeChanges[0].theme);
    
    console.log('Dimension Diary initialized');
});

// ============================================
// HTML CONTENT
// ============================================

const HTMLContent = `
    <!-- ==========================================
         SECTION 1: INTRO (Fullscreen Parallax)
         ========================================== -->
    <section class="fullscreen parallax-section" 
             data-parallax-image="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80"
             data-parallax-speed="0.4"
             data-parallax-overlay="rgba(0, 0, 20, 0.6)">
        <div class="parallax-content">
            <div class="intro-hero">
                <h1 class="glass-title">DIMENSION DIARY</h1>
                <p class="glass-subtitle">A Journey Through Time and Space</p>
                <span class="scroll-indicator">↓ Scroll to Begin</span>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 2: PHASE 1 INTRO
         ========================================== -->
    <section class="phase-header parallax-section"
             data-parallax-image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80"
             data-parallax-speed="0.3"
             data-parallax-overlay="linear-gradient(180deg, rgba(10,0,18,0.8) 0%, rgba(10,0,18,0.95) 100%)">
        <div class="parallax-content">
            <div class="phase-title-container glass-panel">
                <span class="phase-number">01</span>
                <h2>THE BEGINNING</h2>
                <p>Days 0 - 90</p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 3: DIARY ENTRIES (Glass Cards)
         ========================================== -->
    <section class="page-flow content-section">
        <div class="glass-card modal">
            <div class="modal-heading">
                <span class="file-path">file://diary/entry_001</span>
                <div class="file-meta">
                    <span class="file-number">Entry <b>001</b></span>
                    <span class="file-date">Day <b>1</b></span>
                </div>
            </div>
            <div class="modal-content">
                <p class="speaker-name">Researcher's Log</p>
                <p>The experiment began today at 0600 hours. I don't know what to expect from this journey through the dimensional rifts.</p>
                <p>The equipment is calibrated. The portal stands ready. There's no turning back now.</p>
                <p><em>Initial readings are stable. Dimensional variance: 0.003%</em></p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="glass-card modal">
            <div class="modal-heading">
                <span class="file-path">file://diary/entry_015</span>
                <div class="file-meta">
                    <span class="file-number">Entry <b>015</b></span>
                    <span class="file-date">Day <b>15</b></span>
                </div>
            </div>
            <div class="modal-content">
                <p class="speaker-name">Researcher's Log</p>
                <p>Two weeks in. The boundaries between dimensions are thinner than I thought.</p>
                <p>Last night I saw something in the mirror that wasn't my reflection.</p>
                <p><em>Dimensional variance increasing: 0.12%</em></p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 4: VISUAL BREAK (Parallax)
         ========================================== -->
    <section class="fullscreen parallax-section visual-break"
             data-parallax-image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
             data-parallax-speed="0.6"
             data-parallax-overlay="rgba(0, 20, 40, 0.5)">
        <div class="parallax-content">
            <div class="quote-container glass-panel-light">
                <blockquote>
                    "Between dimensions, time flows like water through broken glass."
                </blockquote>
                <cite>— Unknown Entity, Day 45</cite>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 5: PHASE 2 (3 MONTHS)
         ========================================== -->
    <section class="phase-header parallax-section" id="phase-2"
             data-parallax-image="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80"
             data-parallax-speed="0.35"
             data-parallax-overlay="linear-gradient(180deg, rgba(0,10,20,0.7) 0%, rgba(0,10,20,0.95) 100%)">
        <div class="parallax-content">
            <div class="phase-title-container glass-panel">
                <span class="phase-number">02</span>
                <h2>3 MONTHS LATER</h2>
                <p>Days 90 - 180</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="glass-card modal">
            <div class="modal-heading">
                <span class="file-path">file://diary/entry_090</span>
                <div class="file-meta">
                    <span class="file-number">Entry <b>090</b></span>
                    <span class="file-date">Day <b>90</b></span>
                </div>
            </div>
            <div class="modal-content">
                <p class="speaker-name">Researcher's Log</p>
                <p>Three months. The first dimensional shift occurred today.</p>
                <p>I woke up in a room that was identical to mine, but everything was reversed. Left became right. The clock ran backwards.</p>
                <p><em>Warning: Dimensional variance critical: 2.7%</em></p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 6: PHASE 3 (6 MONTHS)
         ========================================== -->
    <section class="phase-header parallax-section" id="phase-3"
             data-parallax-image="https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80"
             data-parallax-speed="0.4"
             data-parallax-overlay="linear-gradient(180deg, rgba(0,20,10,0.7) 0%, rgba(0,20,10,0.95) 100%)">
        <div class="parallax-content">
            <div class="phase-title-container glass-panel">
                <span class="phase-number">03</span>
                <h2>6 MONTHS LATER</h2>
                <p>Days 180 - 270</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="glass-card modal">
            <div class="modal-heading">
                <span class="file-path">file://diary/entry_180</span>
                <div class="file-meta">
                    <span class="file-number">Entry <b>180</b></span>
                    <span class="file-date">Day <b>180</b></span>
                </div>
            </div>
            <div class="modal-content">
                <p class="speaker-name">Researcher's Log</p>
                <p>Half a year. I've stopped counting the shifts.</p>
                <p>Reality feels different now. Sometimes I see two versions of objects overlapping. The boundaries are dissolving.</p>
                <p><em>Dimensional variance: 8.4% — Containment breach imminent</em></p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 7: DRAMATIC PARALLAX BREAK
         ========================================== -->
    <section class="fullscreen parallax-section dramatic-break"
             data-parallax-image="https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&q=80"
             data-parallax-speed="0.7"
             data-parallax-overlay="radial-gradient(ellipse at center, rgba(40,0,0,0.3) 0%, rgba(0,0,0,0.9) 100%)">
        <div class="parallax-content">
            <div class="dramatic-text">
                <span class="glitch" data-text="REALITY">REALITY</span>
                <span class="glitch" data-text="FRACTURING">FRACTURING</span>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 8: PHASE 4 (9 MONTHS)
         ========================================== -->
    <section class="phase-header parallax-section" id="phase-4"
             data-parallax-image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80"
             data-parallax-speed="0.35"
             data-parallax-overlay="linear-gradient(180deg, rgba(20,8,0,0.7) 0%, rgba(20,8,0,0.95) 100%)">
        <div class="parallax-content">
            <div class="phase-title-container glass-panel">
                <span class="phase-number">04</span>
                <h2>9 MONTHS LATER</h2>
                <p>Days 270 - 365</p>
            </div>
        </div>
    </section>

    <section class="page-flow content-section">
        <div class="glass-card modal warning">
            <div class="modal-heading">
                <span class="file-path">file://diary/entry_270</span>
                <div class="file-meta">
                    <span class="file-number">Entry <b>270</b></span>
                    <span class="file-date">Day <b>270</b></span>
                </div>
            </div>
            <div class="modal-content">
                <p class="speaker-name">???</p>
                <p>Nine months. Or has it been nine years? Nine seconds?</p>
                <p>I can see all of them now. All the versions. All the timelines converging into one point.</p>
                <p><em class="critical">CRITICAL: Dimensional variance exceeds measurable limits</em></p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 9: TIME ZERO (The End Point)
         ========================================== -->
    <section class="fullscreen parallax-section time-zero-section" id="time-zero"
             data-parallax-image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
             data-parallax-speed="0.2"
             data-parallax-overlay="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,1) 100%)">
        <div class="parallax-content">
            <div class="time-zero-display">
                <span class="day-label">DAY</span>
                <span class="day-number">365</span>
                <span class="day-subtitle">THE CONVERGENCE</span>
            </div>
        </div>
    </section>

    <!-- ==========================================
         SECTION 10: ENDING
         ========================================== -->
    <section class="fullscreen ending-section">
        <div class="ending-content glass-panel-inverted">
            <p class="ending-symbol">終</p>
            <span class="ending-text">THE END</span>
            <p class="ending-quote">"Every dimension tells the same story, in infinite variations."</p>
        </div>
    </section>
`;
