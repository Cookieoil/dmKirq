// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    maxDays: 365
};

// ============================================
// GLOBAL STATE
// ============================================

let currentDays = 0;
let contentLoaded = false;
let timeZeroPosition = null;

// ============================================
// HTML CONTENT (Placeholder)
// ============================================

const HTMLContent = `
    <!-- INTRO SECTION -->
    <section class="fullscreen gt-intro" data-onshow="updateChapter('Part 01 / ', 'The Beginning')">
        <div class="gt-intro-logo">
            <h1 class="title">DIMENSION DIARY</h1>
            <span class="author">TEST AUTHOR</span>
        </div>
    </section>

    <!-- CONTENT SECTION 1 -->
    <section class="page-flow dark">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_001</p>
                <p>
                    <span class="file-number">File No.<b>DD-0001</b></span>
                    <span class="file-type">Type<b>Log Entry</b></span>
                </p>
            </div>
            <p class="name">Test Speaker</p>
            <p>This is placeholder content for the first diary entry. The actual content would go here.</p>
            <p>More placeholder text to demonstrate the layout and styling of the modal boxes.</p>
            <em><p>Placeholder for italicized notes or stage directions.</p></em>
            <p class="name">Another Speaker</p>
            <p>Response placeholder text goes here.</p>
        </div>

        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_002</p>
                <p>
                    <span class="file-number">File No.<b>DD-0002</b></span>
                    <span class="file-type">Type<b>Document</b></span>
                </p>
            </div>
            <p><b>Title:</b> Test Document</p>
            <p><b>Classification:</b> Placeholder</p>
            <p><b>Description:</b> This is a placeholder for document-style content. It demonstrates how structured information would be displayed.</p>
        </div>
    </section>

    <!-- CONTENT SECTION 2 -->
    <section class="page-flow" data-onshow="updateChapter('Part 02 / ', 'Middle')">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_003</p>
                <p>
                    <span class="file-number">File No.<b>DD-0003</b></span>
                    <span class="file-type">Type<b>Audio Log</b></span>
                    <span class="file-date">Date<b>Day 100</b></span>
                </p>
            </div>
            <p class="name">Speaker A</p>
            <p>Placeholder dialogue for the middle section of the diary.</p>
            <p class="name">Speaker B</p>
            <p>Response placeholder. This section would contain the main narrative content.</p>
            <p class="name">Speaker A</p>
            <p>More placeholder content demonstrating the conversation format.</p>
        </div>

        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_004</p>
                <p>
                    <span class="file-number">File No.<b>DD-0004</b></span>
                    <span class="file-type">Type<b>Video Record</b></span>
                </p>
            </div>
            <p>Placeholder for video record description.</p>
            <p>Additional placeholder content for this entry.</p>
        </div>
    </section>

    <!-- CONTENT SECTION 3 -->
    <section class="page-flow dark" data-onshow="updateChapter('Part 03 / ', 'Approaching End')">
        <div class="modal rec">
            <div class="modal-heading monospace">
                <p>file://diary/entry_005</p>
                <p>
                    <span class="file-number">File No.<b>DD-0005</b></span>
                    <span class="file-type">Type<b>Final Entry</b></span>
                </p>
            </div>
            <p>Placeholder for the climactic section content.</p>
            <p>This would contain important narrative developments.</p>
        </div>
    </section>

    <!-- TIME ZERO SECTION -->
    <section id="time-zero" class="fullscreen" data-onshow="updateChapter('Final / ', 'Day 365')">
        <div class="final-display">
            <span class="final-display__label">DAY</span>
            <h1 class="final-display__number">365</h1>
            <p class="final-display__subtitle">The End</p>
        </div>
    </section>

    <!-- Footer spacer for bottom navbar -->
    <div id="footer-spacer"></div>
`;

// ============================================
// UI FUNCTIONS
// ============================================

function toggleSidebar() {
    const sideBar = document.getElementById("side-bar");
    const closeSideBar = document.getElementById("close-side-bar");
    
    sideBar.classList.toggle("open");
    closeSideBar.classList.toggle("open");
}

function showBottomNavBar(id) {
    const navBars = document.querySelectorAll("#desktop-navbar-right ul[id^='desktop-navbar-menu-']");
    const targetNavBar = document.getElementById(id);
    
    const isOpen = targetNavBar.classList.contains("open");
    
    // Close all
    navBars.forEach(navBar => navBar.classList.remove("open"));
    
    // Toggle target
    if (!isOpen) {
        targetNavBar.classList.add("open");
    }
    
    // Click outside to close
    document.addEventListener("click", function closeHandler(event) {
        if (!event.target.closest("#desktop-navbar")) {
            navBars.forEach(navBar => navBar.classList.remove("open"));
            document.removeEventListener("click", closeHandler);
        }
    });
}

function showMobileNavbar(id) {
    const mobileNavbar = document.getElementById("mobile-navbar");
    const mobileNavbarItems = mobileNavbar.querySelectorAll("li[id^='mobile-navbar-item-']");
    const mobileNavContainer = document.getElementById("mobile-navbar-list");
    const containerItems = mobileNavContainer.querySelectorAll("li[for^='mobile-navbar-item-']");
    
    // Remove all selections
    mobileNavbarItems.forEach(item => item.classList.remove("selected"));
    containerItems.forEach(item => item.classList.remove("selected"));
    
    // Select clicked item
    document.getElementById(id).classList.add("selected");
    const selectedItem = mobileNavContainer.querySelector(`li[for="${id}"]`);
    if (selectedItem) {
        selectedItem.classList.add("selected");
    }
    
    // Click outside to close
    document.addEventListener("click", function closeHandler(event) {
        if (!event.target.closest("#mobile-navbar")) {
            mobileNavbarItems.forEach(item => item.classList.remove("selected"));
            containerItems.forEach(item => item.classList.remove("selected"));
            document.removeEventListener("click", closeHandler);
        }
    });
}

function updateChapter(nameEn, name) {
    const nameEnEl = document.getElementById("chapter-name-en");
    const nameEl = document.getElementById("chapter-name");
    if (nameEnEl) nameEnEl.textContent = nameEn;
    if (nameEl) nameEl.textContent = name;
}

// ============================================
// TIME COUNTER
// ============================================

function updateTimeZeroPosition() {
    const timeZeroEl = document.getElementById("time-zero");
    if (timeZeroEl) {
        timeZeroPosition = timeZeroEl.offsetTop;
    }
}

function updateTimeDisplay() {
    if (!contentLoaded || timeZeroPosition === null) return;
    
    const timeDisplay = document.getElementById("time-display");
    if (!timeDisplay) return;
    
    const scrollY = window.scrollY;
    const scrollProgress = Math.min(1, Math.max(0, scrollY / timeZeroPosition));
    
    currentDays = Math.floor(CONFIG.maxDays * scrollProgress);
    timeDisplay.textContent = currentDays.toLocaleString();
}

// ============================================
// SECTION OBSERVER (for data-onshow)
// ============================================

function initSectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const onShow = entry.target.getAttribute('data-onshow');
                if (onShow) {
                    try {
                        eval(onShow);
                    } catch (e) {
                        console.error('Error executing data-onshow:', e);
                    }
                }
            }
        });
    }, options);
    
    document.querySelectorAll('section[data-onshow]').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// SCROLL HANDLER
// ============================================

function handleScroll() {
    requestAnimationFrame(updateTimeDisplay);
}

// ============================================
// DEBOUNCE
// ============================================

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log('Initializing Dimension Diary...');
    
    // 1. Inject HTML content
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error('main-content not found!');
        return;
    }
    mainContent.innerHTML = HTMLContent;
    
    // 2. Mark as loaded
    contentLoaded = true;
    
    // 3. Initialize position tracking
    updateTimeZeroPosition();
    
    // 4. Initialize section observer
    initSectionObserver();
    
    // 5. Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', debounce(() => {
        updateTimeZeroPosition();
        handleScroll();
    }, 100));
    
    // 6. Initial update
    requestAnimationFrame(handleScroll);
    
    console.log('Initialization complete');
});
