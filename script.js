// ===========================
// Terminal Resume - JavaScript
// ===========================

// Global function for tab switching (used by bottom nav buttons)
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Remove active from all
    tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active to target
    const targetTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    const targetContent = document.getElementById(tabId);

    if (targetTab && targetContent) {
        targetTab.classList.add('active');
        targetTab.setAttribute('aria-selected', 'true');
        targetContent.classList.add('active');

        // Scroll to top of terminal content
        document.querySelector('.terminal-content').scrollTop = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typingText = document.getElementById('typingText');
    const text = "hi, I'm rhea 👋 NZ-born, AU-raised, SF-based. I'm into food, coffee, skiing, pottery, and EDM. below is a quick look at the work I do in AI + developer tools.";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30); // Adjust speed here (lower = faster)
        } else {
            // Optional: remove cursor after typing is done
            setTimeout(() => {
                const cursor = document.querySelector('.typing-cursor');
                if (cursor) cursor.style.display = 'none';
            }, 2000);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(type, 500);

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            document.getElementById(targetId).classList.add('active');

            // Scroll to top
            document.querySelector('.terminal-content').scrollTop = 0;
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Tab key to cycle through tabs
        if (e.key === 'Tab') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab.active');
            const allTabs = Array.from(tabs);
            const currentIndex = allTabs.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % allTabs.length;
            allTabs[nextIndex].click();
        }

        // Arrow keys to navigate tabs
        if (e.key === 'ArrowRight' && e.ctrlKey) {
            e.preventDefault();
            const activeTab = document.querySelector('.tab.active');
            const allTabs = Array.from(tabs);
            const currentIndex = allTabs.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % allTabs.length;
            allTabs[nextIndex].click();
        }

        if (e.key === 'ArrowLeft' && e.ctrlKey) {
            e.preventDefault();
            const activeTab = document.querySelector('.tab.active');
            const allTabs = Array.from(tabs);
            const currentIndex = allTabs.indexOf(activeTab);
            const prevIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
            allTabs[prevIndex].click();
        }

        // Number keys (1-4) to jump to specific tabs
        if (e.key >= '1' && e.key <= '4' && e.ctrlKey) {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            if (tabIndex < tabs.length) {
                tabs[tabIndex].click();
            }
        }
    });

    // Window control dots functionality
    const redDot = document.querySelector('.control-dot.red');
    const yellowDot = document.querySelector('.control-dot.yellow');
    const greenDot = document.querySelector('.control-dot.green');
    const terminalWindow = document.querySelector('.terminal-window');

    const handleRedDot = () => {
        // Easter egg: shake effect
        terminalWindow.style.animation = 'shake 0.5s';
        setTimeout(() => {
            terminalWindow.style.animation = '';
        }, 500);
    };

    const handleYellowDot = () => {
        // Minimize effect
        terminalWindow.style.transform = 'scale(0.95)';
        setTimeout(() => {
            terminalWindow.style.transform = 'scale(1)';
        }, 200);
    };

    const handleGreenDot = () => {
        // Fullscreen toggle effect
        document.body.style.padding = document.body.style.padding === '0px' ? '2rem' : '0px';
        terminalWindow.style.borderRadius = terminalWindow.style.borderRadius === '0px' ? '12px' : '0px';
    };

    redDot.addEventListener('click', handleRedDot);
    redDot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRedDot();
        }
    });

    yellowDot.addEventListener('click', handleYellowDot);
    yellowDot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleYellowDot();
        }
    });

    greenDot.addEventListener('click', handleGreenDot);
    greenDot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleGreenDot();
        }
    });

    // Add typing effect to command prompt cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Add hover effects to stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 0 20px rgba(80, 250, 123, 0.3)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = 'none';
        });
    });

    // Add subtle animations to job blocks on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    const jobBlocks = document.querySelectorAll('.job-block');
    jobBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-20px)';
        block.style.transition = 'all 0.5s ease';
        observer.observe(block);
    });

    // Console easter egg
    console.log(`
    ╔════════════════════════════════════════╗
    ║                                        ║
    ║   👋 Hey there, curious developer!     ║
    ║                                        ║
    ║   Thanks for checking out my code.    ║
    ║   If you're reading this, we should   ║
    ║   probably chat! 🚀                   ║
    ║                                        ║
    ║   Email: rheapatel23@gmail.com        ║
    ║                                        ║
    ╚════════════════════════════════════════╝
    `);

    // Add konami code easter egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join('') === konamiSequence.join('')) {
            activateMatrixMode();
        }
    });

    function activateMatrixMode() {
        document.body.style.background = '#000';
        const originalColors = {
            highlight: getComputedStyle(document.documentElement).getPropertyValue('--color-highlight'),
            link: getComputedStyle(document.documentElement).getPropertyValue('--color-link'),
        };

        document.documentElement.style.setProperty('--color-highlight', '#00ff00');
        document.documentElement.style.setProperty('--color-link', '#00ff00');

        alert('🎮 MATRIX MODE ACTIVATED! 🎮\n\nYou found the secret! Refreshing page...');

        setTimeout(() => {
            document.documentElement.style.setProperty('--color-highlight', originalColors.highlight);
            document.documentElement.style.setProperty('--color-link', originalColors.link);
        }, 3000);
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add glitch effect on ASCII art hover
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        asciiArt.addEventListener('mouseenter', () => {
            asciiArt.style.animation = 'glitch 0.3s, pulse 2s ease-in-out';
            asciiArt.style.textShadow = '0 0 10px rgba(80, 250, 123, 0.8), 0 0 20px rgba(80, 250, 123, 0.6)';
        });

        asciiArt.addEventListener('mouseleave', () => {
            asciiArt.style.animation = '';
            asciiArt.style.textShadow = '0 0 5px rgba(80, 250, 123, 0.3)';
        });
    }

    // CSS already handles display logic via .tab-content and .tab-content.active classes
    // No need for manual display manipulation

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<span aria-hidden="true">🌙</span>';
        themeToggle.setAttribute('title', 'Switch to dark mode');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        // Update icon and labels
        themeToggle.innerHTML = isLight ? '<span aria-hidden="true">🌙</span>' : '<span aria-hidden="true">☀️</span>';
        themeToggle.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Switched to ${isLight ? 'light' : 'dark'} mode`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    });

    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    const terminalContent = document.querySelector('.terminal-content');

    if (backToTopButton && terminalContent) {
        // Show/hide button based on scroll position
        terminalContent.addEventListener('scroll', () => {
            if (terminalContent.scrollTop > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            terminalContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            filter: brightness(1);
        }
        50% {
            transform: scale(1.02);
            filter: brightness(1.2);
        }
    }
`;
document.head.appendChild(style);
