// ============================================
// NAVBAR FUNCTIONS
// ============================================

function showBottomNavBar(id) {
    let navBars = document.querySelectorAll("ul[id^='desktop-navbar-']");
    let bottomNavBar = document.getElementById(id);
    
    let isOpen = bottomNavBar.classList.contains("open");
    
    navBars.forEach(navBar => {
        navBar.classList.remove("open");
    });
    
    if (!isOpen) {
        bottomNavBar.classList.add("open");
    }

    document.addEventListener("click", function(event) {
        if (!event.target.closest("#desktop-navbar")) {
            navBars.forEach(navBar => {
                navBar.classList.remove("open");
            });
        }
    });
}

function toggleSidebar() {
    let sideBar = document.getElementById("side-bar");
    sideBar.classList.toggle("open");

    let closeSideBar = document.getElementById("close-side-bar");
    closeSideBar.classList.toggle("open");
}

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
    
    backgrounds: [
        'flower  background.png',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80', 
        'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80'
    ],
    
    fallbackColors: [
        '#1a0030',
        '#001428',
        '#001a10',
        '#1a1000',
        '#e0e0e0'
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
    <!-- PANEL 1: INTRO (Days 0-90) -->
    <section class="bg-panel" data-phase="1">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[0]}'); background-color: ${CONFIG.fallbackColors[0]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <div class="panel-content panel-content--hero">
                <h1 class="hero-title">DIMENSION DIARY</h1>
                <p class="hero-subtitle">A Journey Through Time</p>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_001</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-001</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 1</p>
                    <p>The dimensional rift opened today. What I saw on the other side... defies description.</p>
                    <p>Time moves differently here. Or perhaps it's my perception that has changed.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_030</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-030</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 30 - One Month</p>
                    <p>The boundaries between dimensions grow thinner each day.</p>
                    <p>I've started to see echoes of other timelines overlapping with this one.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_060</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-060</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 60 - Two Months</p>
                    <p>I've learned to recognize the shimmer at the edges of reality.</p>
                    <p>Each dimension has its own color, its own taste.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PANEL 2: THREE MONTHS (Days 90-180) -->
    <section class="bg-panel" data-phase="2">
        <div class="bg-layer">
            <div class="bg-fixed" style="background-image: url('${CONFIG.backgrounds[1]}'); background-color: ${CONFIG.fallbackColors[1]};"></div>
            <div class="bg-overlay"></div>
            <div class="bg-noise"></div>
        </div>
        
        <div class="content-wrapper">
            <div class="panel-content panel-content--phase">
                <div class="phase-marker">
                    <span class="phase-marker__number">02</span>
                    <h2 class="phase-marker__title">THREE MONTHS</h2>
                    <p class="phase-marker__subtitle">The patterns emerge</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_090</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-090</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 90 - Quarter Year</p>
                    <p>I've learned to navigate the shifts now. Each dimension has its own frequency, its own rhythm.</p>
                    <p>The key is synchronization.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_120</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-120</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 120 - Contact</p>
                    <p>Met another traveler today. She's been jumping for years.</p>
                    <p><em>"The longer you stay," she said, "the less you remember who you were."</em></p>
                </div>
            </div>
        </div>
    </section>

    <!-- PANEL 3: SIX MONTHS (Days 180-270) -->
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
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_180</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-180</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 180 - Halfway</p>
                    <p>Half a year. I can no longer remember my mother's face.</p>
                    <p>But I can see seventeen versions of this room simultaneously.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_210</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-210</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 210 - Fragmentation</p>
                    <p>Which memories are mine? Which belong to the other versions of me?</p>
                    <p>The boundaries are dissolving.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PANEL 4: NINE MONTHS (Days 270-365) -->
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
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_270</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-270</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 270 - Convergence</p>
                    <p>The timelines are collapsing into one. I can feel the convergence.</p>
                    <p>All paths lead to a single point.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_300</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-300</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 300 - Understanding</p>
                    <p>I understand now. The journey was never about reaching a destination.</p>
                    <p>It was about becoming something that could exist in all dimensions at once.</p>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="modal rec">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_330</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-330</b></span>
                            <span class="file-type">Type<b>Journal Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 330 - Preparation</p>
                    <p>The final transformation is near. I am ready.</p>
                    <p>Or rather, all versions of me are ready.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- PANEL 5: THE END (Day 365) -->
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
                <div class="modal rec modal--light">
                    <div class="modal-heading monospace">
                        <p>file://dimension/log_365</p>
                        <p>
                            <span class="file-number">File No.<b>LOG-365</b></span>
                            <span class="file-type">Type<b>Final Entry</b></span>
                        </p>
                    </div>
                    <p class="name">Day 365 - Final Entry</p>
                    <p>It is done.</p>
                    <p>I am no longer bound by a single thread of time. I exist in all moments, all places, all possibilities.</p>
                    <p>This diary ends here. But I continue everywhere.</p>
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
        return;
    }
    
    const zeroPosition = timeZero.offsetTop;
    if (zeroPosition <= 0) return;
    
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
    let newThemeConfig = CONFIG.themeChanges[0];
    
    for (const themeConfig of CONFIG.themeChanges) {
        if (days >= themeConfig.days) {
            newThemeConfig = themeConfig;
        }
    }
    
    if (newThemeConfig.theme !== currentTheme) {
        currentTheme = newThemeConfig.theme;
        
        CONFIG.themeChanges.forEach(t => document.body.classList.remove(t.theme));
        document.body.classList.add(newThemeConfig.theme);
        
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
    
    const contentArea = document.getElementById('main-content-area');
    if (!contentArea) {
        console.error('main-content-area not found!');
        return;
    }
    contentArea.innerHTML = HTMLContent;
    console.log('Content injected');
    
    contentLoaded = true;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    requestAnimationFrame(() => {
        const timeZero = document.getElementById('time-zero');
        console.log('time-zero position:', timeZero?.offsetTop);
        handleScroll();
    });
    
    console.log('Initialization complete');
});
