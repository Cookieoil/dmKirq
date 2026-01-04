/**
 * DIMENSION DIARY - Simplified
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    maxDays: 365,
    
    // Theme milestones with background images
    themes: [
        { 
            days: 0, 
            id: 'theme-1',
            bgImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80'
        },
        { 
            days: 90, 
            id: 'theme-2',
            bgImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80'
        },
        { 
            days: 180, 
            id: 'theme-3',
            bgImage: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80'
        },
        { 
            days: 270, 
            id: 'theme-4',
            bgImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80'
        },
        { 
            days: 365, 
            id: 'theme-5',
            bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
        }
    ]
};

// ============================================
// STATE
// ============================================

let currentDays = 0;

// ============================================
// TIME DISPLAY
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
    document.querySelector('main-content').innerHTML = HTMLContent;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});

// ============================================
// HTML CONTENT
// ============================================

const HTMLContent = `

    <!-- SECTION 1: Theme 1 Background -->
    <section class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80')">
        
        <div class="content-layer">
            <div class="intro">
                <h1>DIMENSION DIARY</h1>
                <p>A Journey Through Time</p>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/001</span>
                    <span>Day 1</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>The experiment began today. I don't know what to expect.</p>
                <p>The portal stands ready. There's no turning back.</p>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/030</span>
                    <span>Day 30</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>One month has passed. Something feels different.</p>
                <p>The boundaries are thinner than I thought.</p>
            </div>
        </div>

    </section>

    <!-- SECTION 2: Theme 2 Background (overlaps theme 1) -->
    <section class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80')">
        
        <div class="content-layer">
            <div class="phase-marker">
                <span>02</span>
                <h2>3 MONTHS LATER</h2>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/090</span>
                    <span>Day 90</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>Three months. The first dimensional shift occurred.</p>
                <p>I woke up in a room identical to mine, but everything was reversed.</p>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/120</span>
                    <span>Day 120</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>The shifts are becoming more frequent now.</p>
                <p>Sometimes I see two versions of objects overlapping.</p>
            </div>
        </div>

    </section>

    <!-- SECTION 3: Theme 3 Background -->
    <section class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80')">
        
        <div class="content-layer">
            <div class="phase-marker">
                <span>03</span>
                <h2>6 MONTHS LATER</h2>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/180</span>
                    <span>Day 180</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>Half a year. Reality feels different now.</p>
                <p>The boundaries between dimensions are dissolving.</p>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry">
                <div class="entry-header">
                    <span>file://diary/210</span>
                    <span>Day 210</span>
                </div>
                <p class="speaker">Researcher's Log</p>
                <p>I've stopped counting the shifts.</p>
                <p>Which version of me is writing this?</p>
            </div>
        </div>

    </section>

    <!-- SECTION 4: Theme 4 Background -->
    <section class="parallax-bg" style="background-image: url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80')">
        
        <div class="content-layer">
            <div class="phase-marker">
                <span>04</span>
                <h2>9 MONTHS LATER</h2>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry warning">
                <div class="entry-header">
                    <span>file://diary/270</span>
                    <span>Day 270</span>
                </div>
                <p class="speaker">???</p>
                <p>Nine months. Or has it been nine years?</p>
                <p>All the timelines are converging into one point.</p>
            </div>
        </div>
        
        <div class="content-layer">
            <div class="entry warning">
                <div class="entry-header">
                    <span>file://diary/300</span>
                    <span>Day 300</span>
                </div>
                <p class="speaker">???</p>
                <p>I can see all of them now. All the versions.</p>
                <p>The convergence is near.</p>
            </div>
        </div>

    </section>

    <!-- SECTION 5: Theme 5 Background (Final) -->
    <section class="parallax-bg" id="time-zero" style="background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')">
        
        <div class="content-layer">
            <div class="final-display">
                <span class="label">DAY</span>
                <span class="number">365</span>
                <span class="subtitle">THE END</span>
            </div>
        </div>
        
        <div class="content-layer ending">
            <p class="end-symbol">終</p>
        </div>

    </section>

`;
