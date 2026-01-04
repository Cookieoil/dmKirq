// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    maxDays: 365,
    
    themeChanges: [
        { days: 0, theme: 'theme-start', name: 'Phase 01', subtitle: 'The Beginning' },
        { days: 90, theme: 'theme-3months', name: 'Phase 02', subtitle: '3 Months Later' },
        { days: 180, theme: 'theme-6months', name: 'Phase 03', subtitle: '6 Months Later' },
        { days: 270, theme: 'theme-9months', name: 'Phase 04', subtitle: '9 Months Later' },
        { days: 365, theme: 'theme-end', name: 'Final Phase', subtitle: 'The End' }
    ],
    
    // Background images - using reliable Unsplash images
    backgrounds: [
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80', 
        'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80'
    ],
    
    // Fallback colors if images fail to load
    fallbackColors: [
        '#1a0030', // Purple
        '#001428', // Blue
        '#001a10', // Green
        '#1a1000', // Orange
        '#e0e0e0'  // Light gray
    ]
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';
let contentLoaded = false;

// ============================================
// HTML CONTENT
// ============================================

const HTMLContent = `
    <!-- ==========================================
         PANEL 1: INTRO (Days 0-90)
         ========================================== -->
    <section class="bg-panel" data-phase="1">
        <!-- Background Layer -->
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[0]}'); background-color: ${CONFIG.fallbackColors[0]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <!-- Content Layer -->
        <div class="content-wrapper">
            <!-- Hero Screen -->
            <div class="panel-content panel-content--hero">
                <div class="hero-box">
                    <h1 class="hero-title">DIMENSION DIARY</h1>
                    <p class="hero-subtitle">A Journey Through Time</p>
                </div>
                <div class="scroll-indicator">
                    <span>Scroll to begin</span>
                    <div class="scroll-arrow"></div>
                </div>
            </div>
            
            <!-- Entry 1 -->
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_001</span>
                        <span class="diary-card__day">Day 1</span>
                    </header>
                    <h2 class="diary-card__title">First Entry</h2>
                    <p>The dimensional rift opened today. What I saw on the other side... defies description.</p>
                    <p>Time moves differently here. Or perhaps it's my perception that has changed.</p>
                </article>
            </div>
            
            <!-- Entry 2 -->
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_030</span>
                        <span class="diary-card__day">Day 30</span>
                    </header>
                    <h2 class="diary-card__title">One Month</h2>
                    <p>The boundaries between dimensions grow thinner each day.</p>
                    <p>I've started to see echoes of other timelines overlapping with this one.</p>
                </article>
            </div>
            
            <!-- Quote -->
            <div class="panel-content">
                <blockquote class="floating-quote">
                    "Time is not a line. It is a dimension."
                </blockquote>
            </div>
            
            <!-- Entry 3 -->
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_060</span>
                        <span class="diary-card__day">Day 60</span>
                    </header>
                    <h2 class="diary-card__title">Two Months</h2>
                    <p>I've learned to recognize the shimmer at the edges of reality.</p>
                    <p>Each dimension has its own color, its own taste.</p>
                </article>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 2: THREE MONTHS (Days 90-180)
         ========================================== -->
    <section class="bg-panel" data-phase="2">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[1]}'); background-color: ${CONFIG.fallbackColors[1]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <!-- Phase Title -->
            <div class="panel-content panel-content--phase">
                <div class="phase-marker">
                    <span class="phase-marker__number">02</span>
                    <h2 class="phase-marker__title">THREE MONTHS</h2>
                    <p class="phase-marker__subtitle">The patterns emerge</p>
                </div>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_090</span>
                        <span class="diary-card__day">Day 90</span>
                    </header>
                    <h2 class="diary-card__title">Quarter Year</h2>
                    <p>I've learned to navigate the shifts now. Each dimension has its own frequency, its own rhythm.</p>
                    <p>The key is synchronization.</p>
                </article>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_120</span>
                        <span class="diary-card__day">Day 120</span>
                    </header>
                    <h2 class="diary-card__title">Contact</h2>
                    <p>Met another traveler today. She's been jumping for years.</p>
                    <p><em>"The longer you stay," she said, "the less you remember who you were."</em></p>
                </article>
            </div>
            
            <div class="panel-content">
                <blockquote class="floating-quote">
                    "We are echoes of choices never made."
                </blockquote>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 3: SIX MONTHS (Days 180-270)
         ========================================== -->
    <section class="bg-panel" data-phase="3">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[2]}'); background-color: ${CONFIG.fallbackColors[2]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <div class="panel-content panel-content--phase">
                <div class="phase-marker">
                    <span class="phase-marker__number">03</span>
                    <h2 class="phase-marker__title">SIX MONTHS</h2>
                    <p class="phase-marker__subtitle">Identity fractures</p>
                </div>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_180</span>
                        <span class="diary-card__day">Day 180</span>
                    </header>
                    <h2 class="diary-card__title">Halfway</h2>
                    <p>Half a year. I can no longer remember my mother's face.</p>
                    <p>But I can see seventeen versions of this room simultaneously.</p>
                </article>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_210</span>
                        <span class="diary-card__day">Day 210</span>
                    </header>
                    <h2 class="diary-card__title">Fragmentation</h2>
                    <p>Which memories are mine? Which belong to the other versions of me?</p>
                    <p>The boundaries are dissolving.</p>
                </article>
            </div>
            
            <div class="panel-content">
                <blockquote class="floating-quote">
                    "I am not one. I am many."
                </blockquote>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 4: NINE MONTHS (Days 270-365)
         ========================================== -->
    <section class="bg-panel" data-phase="4">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[3]}'); background-color: ${CONFIG.fallbackColors[3]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <div class="panel-content panel-content--phase">
                <div class="phase-marker">
                    <span class="phase-marker__number">04</span>
                    <h2 class="phase-marker__title">NINE MONTHS</h2>
                    <p class="phase-marker__subtitle">The convergence approaches</p>
                </div>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_270</span>
                        <span class="diary-card__day">Day 270</span>
                    </header>
                    <h2 class="diary-card__title">Convergence</h2>
                    <p>The timelines are collapsing into one. I can feel the convergence.</p>
                    <p>All paths lead to a single point.</p>
                </article>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_300</span>
                        <span class="diary-card__day">Day 300</span>
                    </header>
                    <h2 class="diary-card__title">Understanding</h2>
                    <p>I understand now. The journey was never about reaching a destination.</p>
                    <p>It was about becoming something that could exist in all dimensions at once.</p>
                </article>
            </div>
            
            <div class="panel-content">
                <article class="diary-card">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_330</span>
                        <span class="diary-card__day">Day 330</span>
                    </header>
                    <h2 class="diary-card__title">Preparation</h2>
                    <p>The final transformation is near. I am ready.</p>
                    <p>Or rather, all versions of me are ready.</p>
                </article>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 5: THE END (Day 365) - TIME ZERO
         ========================================== -->
    <section class="bg-panel bg-panel--final" data-phase="5" id="time-zero">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[4]}'); background-color: ${CONFIG.fallbackColors[4]};"></div>
            <div class="bg-overlay bg-overlay--light"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <div class="panel-content panel-content--final">
                <div class="final-display">
                    <span class="final-display__label">DAY</span>
                    <h1 class="final-display__number">365</h1>
                    <p class="final-display__subtitle">The Convergence</p>
                </div>
            </div>
            
            <div class="panel-content">
                <article class="diary-card diary-card--light">
                    <header class="diary-card__header">
                        <span class="diary-card__file">file://dimension/log_365</span>
                        <span class="diary-card__day">Day 365</span>
                    </header>
                    <h2 class="diary-card__title">Final Entry</h2>
                    <p>It is done.</p>
                    <p>I am no longer bound by a single thread of time. I exist in all moments, all places, all possibilities.</p>
                    <p>This diary ends here. But I continue everywhere.</p>
                </article>
            </div>
            
            <div class="panel-content panel-content--ending">
                <div class="ending-display">
                    <span class="ending-display__symbol">∞</span>
                    <span class="ending-display__text">I AM EVERYWHERE</span>
                    <span class="ending-display__subtext">THE END IS THE BEGINNING</span>
                </div>
            </div>
        </div>
    </section>
`;

// ============================================
// TIME/DAYS COUNTER
// ============================================

function updateTimeDisplay() {
    if (!contentLoaded) return;
    
    const timeDisplay = document.getElementById("time-display");
    const timeZero = document.getElementById("time-zero");
    
    if (!timeZero || !timeDisplay) {
        console.warn('Required elements not found');
        return;
    }
    
    const zeroPosition = timeZero.offsetTop;
    if (zeroPosition <= 0) return;
    
    const scrollY = window.scrollY;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / zeroPosition));
    
    // Update days display
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Update theme
    updateTheme(currentDays);
}

// ============================================
// THEME SWITCHING
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
        
        // Remove all theme classes and add new one
        CONFIG.themeChanges.forEach(t => document.body.classList.remove(t.theme));
        document.body.classList.add(newThemeConfig.theme);
        
        // Update chapter info
        const nameEl = document.getElementById("chapter-name-en");
        const subtitleEl = document.getElementById("chapter-name");
        if (nameEl) nameEl.textContent = newThemeConfig.name + " /";
        if (subtitleEl) subtitleEl.textContent = newThemeConfig.subtitle;
        
        console.log(`Day ${days} → ${newThemeConfig.theme}`);
    }
}

// ============================================
// SCROLL HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(updateTimeDisplay);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log('Initializing Dimension Diary...');
    
    // 1. Inject HTML content
    const contentArea = document.getElementById('main-content-area');
    if (!contentArea) {
        console.error('main-content-area not found!');
        return;
    }
    contentArea.innerHTML = HTMLContent;
    console.log('Content injected');
    
    // 2. Mark as loaded
    contentLoaded = true;
    
    // 3. Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // 4. Initial calculation (after a frame to ensure layout)
    requestAnimationFrame(() => {
        const timeZero = document.getElementById('time-zero');
        console.log('time-zero position:', timeZero?.offsetTop);
        console.log('Document height:', document.documentElement.scrollHeight);
        handleScroll();
    });
    
    console.log('Initialization complete');
});
