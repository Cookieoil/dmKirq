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
            subtitle: 'The Beginning'
        },
        { 
            days: 90, 
            theme: 'theme-3months', 
            name: 'Phase 02', 
            subtitle: '3 Months Later'
        },
        { 
            days: 180, 
            theme: 'theme-6months', 
            name: 'Phase 03', 
            subtitle: '6 Months Later'
        },
        { 
            days: 270, 
            theme: 'theme-9months', 
            name: 'Phase 04', 
            subtitle: '9 Months Later'
        },
        { 
            days: 365, 
            theme: 'theme-end', 
            name: 'Final Phase', 
            subtitle: 'The End'
        }
    ],
    
    // Background images for each phase
    backgrounds: [
        'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
        'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80'
    ]
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let currentTheme = 'theme-start';
let contentLoaded = false;

// ============================================
// HTML CONTENT - Seamless Background Panels
// ============================================

const HTMLContent = `
    <!-- ==========================================
         PANEL 1: INTRO (Days 0-90)
         Background covers this entire section
         ========================================== -->
    <section class="bg-panel" data-bg-index="0">
        <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[0]}')"></div>
        <div class="bg-overlay"></div>
        
        <!-- Hero Content -->
        <div class="panel-content hero-content">
            <div class="hero-title">
                <h1>DIMENSION DIARY</h1>
                <span class="subtitle">A Journey Through Time</span>
            </div>
            <div class="scroll-hint">
                <span>Scroll to begin</span>
                <div class="scroll-arrow"></div>
            </div>
        </div>
        
        <!-- Diary Entries on this background -->
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_001</span>
                    <span class="entry-day">Day 1</span>
                </div>
                <h3 class="entry-title">First Entry</h3>
                <p>The dimensional rift opened today. What I saw on the other side... defies description.</p>
                <p>Time moves differently here. Or perhaps it's my perception that has changed.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_030</span>
                    <span class="entry-day">Day 30</span>
                </div>
                <h3 class="entry-title">One Month</h3>
                <p>The boundaries between dimensions grow thinner each day.</p>
                <p>I've started to see echoes of other timelines overlapping with this one.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <blockquote class="floating-quote">
                "Time is not a line. It is a dimension."
            </blockquote>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_060</span>
                    <span class="entry-day">Day 60</span>
                </div>
                <h3 class="entry-title">Two Months</h3>
                <p>I've learned to recognize the shimmer at the edges of reality.</p>
                <p>Each dimension has its own color, its own taste.</p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 2: THREE MONTHS (Days 90-180)
         This background "reveals" over Panel 1
         ========================================== -->
    <section class="bg-panel" data-bg-index="1">
        <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[1]}')"></div>
        <div class="bg-overlay"></div>
        
        <!-- Phase Title -->
        <div class="panel-content phase-intro">
            <div class="phase-marker">
                <span class="phase-number">02</span>
                <h2>THREE MONTHS</h2>
                <p>The patterns emerge</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_090</span>
                    <span class="entry-day">Day 90</span>
                </div>
                <h3 class="entry-title">Quarter Year</h3>
                <p>I've learned to navigate the shifts now. Each dimension has its own frequency, its own rhythm.</p>
                <p>The key is synchronization.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_120</span>
                    <span class="entry-day">Day 120</span>
                </div>
                <h3 class="entry-title">Contact</h3>
                <p>Met another traveler today. She's been jumping for years.</p>
                <p class="italic">"The longer you stay," she said, "the less you remember who you were."</p>
            </div>
        </div>
        
        <div class="panel-content">
            <blockquote class="floating-quote">
                "We are echoes of choices never made."
            </blockquote>
        </div>
    </section>

    <!-- ==========================================
         PANEL 3: SIX MONTHS (Days 180-270)
         ========================================== -->
    <section class="bg-panel" data-bg-index="2">
        <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[2]}')"></div>
        <div class="bg-overlay"></div>
        
        <div class="panel-content phase-intro">
            <div class="phase-marker">
                <span class="phase-number">03</span>
                <h2>SIX MONTHS</h2>
                <p>Identity fractures</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_180</span>
                    <span class="entry-day">Day 180</span>
                </div>
                <h3 class="entry-title">Halfway</h3>
                <p>Half a year. I can no longer remember my mother's face.</p>
                <p>But I can see seventeen versions of this room simultaneously.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_210</span>
                    <span class="entry-day">Day 210</span>
                </div>
                <h3 class="entry-title">Fragmentation</h3>
                <p>Which memories are mine? Which belong to the other versions of me?</p>
                <p>The boundaries are dissolving.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <blockquote class="floating-quote">
                "I am not one. I am many."
            </blockquote>
        </div>
    </section>

    <!-- ==========================================
         PANEL 4: NINE MONTHS (Days 270-365)
         ========================================== -->
    <section class="bg-panel" data-bg-index="3">
        <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[3]}')"></div>
        <div class="bg-overlay"></div>
        
        <div class="panel-content phase-intro">
            <div class="phase-marker">
                <span class="phase-number">04</span>
                <h2>NINE MONTHS</h2>
                <p>The convergence approaches</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_270</span>
                    <span class="entry-day">Day 270</span>
                </div>
                <h3 class="entry-title">Convergence</h3>
                <p>The timelines are collapsing into one. I can feel the convergence.</p>
                <p>All paths lead to a single point.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_300</span>
                    <span class="entry-day">Day 300</span>
                </div>
                <h3 class="entry-title">Understanding</h3>
                <p>I understand now. The journey was never about reaching a destination.</p>
                <p>It was about becoming something that could exist in all dimensions at once.</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_330</span>
                    <span class="entry-day">Day 330</span>
                </div>
                <h3 class="entry-title">Preparation</h3>
                <p>The final transformation is near. I am ready.</p>
                <p>Or rather, all versions of me are ready.</p>
            </div>
        </div>
    </section>

    <!-- ==========================================
         PANEL 5: THE END (Day 365)
         This is the "time-zero" reference point
         ========================================== -->
    <section class="bg-panel" data-bg-index="4" id="time-zero">
        <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[4]}')"></div>
        <div class="bg-overlay overlay-light"></div>
        
        <div class="panel-content final-content">
            <div class="final-display">
                <span class="final-label">DAY</span>
                <h1 class="final-number">365</h1>
                <p class="final-subtitle">The Convergence</p>
            </div>
        </div>
        
        <div class="panel-content">
            <div class="diary-entry glass-card glass-light">
                <div class="entry-header">
                    <span class="entry-file">file://dimension/log_365</span>
                    <span class="entry-day">Day 365</span>
                </div>
                <h3 class="entry-title">Final Entry</h3>
                <p>It is done.</p>
                <p>I am no longer bound by a single thread of time. I exist in all moments, all places, all possibilities.</p>
                <p>This diary ends here. But I continue everywhere.</p>
            </div>
        </div>
        
        <div class="panel-content ending-content">
            <div class="endscreen">
                <p class="end-symbol">∞</p>
                <span class="end-text">I AM EVERYWHERE</span>
                <span class="end-subtext">THE END IS THE BEGINNING</span>
            </div>
        </div>
    </section>
`;

// ============================================
// TIME/DAYS COUNTER UPDATE
// ============================================

function updateTimeDisplay() {
    if (!contentLoaded) return;
    
    const timeDisplay = document.getElementById("time-display");
    const timeZero = document.getElementById("time-zero");
    
    if (!timeZero || !timeDisplay) return;
    
    const zeroPosition = timeZero.offsetTop;
    if (zeroPosition <= 0) return;
    
    const scrollY = window.scrollY;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / zeroPosition));
    
    // Calculate and display days
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    timeDisplay.textContent = currentDays.toLocaleString();
    
    // Update theme based on days
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
        
        // Update body class
        CONFIG.themeChanges.forEach(t => document.body.classList.remove(t.theme));
        document.body.classList.add(newThemeConfig.theme);
        
        // Update chapter display
        const nameEl = document.getElementById("chapter-name-en");
        const subtitleEl = document.getElementById("chapter-name");
        if (nameEl) nameEl.textContent = newThemeConfig.name + " /";
        if (subtitleEl) subtitleEl.textContent = newThemeConfig.subtitle;
        
        console.log(`Theme: ${newThemeConfig.theme} | Days: ${days}`);
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
    // 1. Inject content
    const contentArea = document.getElementById('main-content-area');
    if (contentArea) {
        contentArea.innerHTML = HTMLContent;
    }
    
    // 2. Mark as loaded
    contentLoaded = true;
    
    // 3. Setup scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // 4. Initial update
    requestAnimationFrame(() => {
        handleScroll();
        console.log('Initialized. time-zero at:', document.getElementById('time-zero')?.offsetTop);
    });
});
