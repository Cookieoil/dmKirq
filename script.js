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
                    <p>Met another traveler today. She's been
