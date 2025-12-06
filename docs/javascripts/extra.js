/* Extra JavaScript for Yuho documentation */

// Initialize mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
    // Add animated GitHub corner (monochrome)
    const githubCorner = document.createElement('a');
    githubCorner.href = '#';
    githubCorner.className = 'github-corner';
    githubCorner.setAttribute('aria-label', 'GitHub Stats');
    githubCorner.onclick = function(e) {
        e.preventDefault();
        const popup = document.querySelector('.github-stats-popup');
        popup.classList.toggle('show');
    };
    githubCorner.innerHTML = `
        <svg width="80" height="80" viewBox="0 0 250 250" style="color:#ffffff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </svg>
    `;
    document.body.appendChild(githubCorner);

    // Add GitHub stats popup
    const statsPopup = document.createElement('div');
    statsPopup.className = 'github-stats-popup';
    statsPopup.innerHTML = `
        <h3>gongahkia/yuho-2</h3>
        <div class="stat">
            <span class="stat-label">Stars:</span>
            <span class="stat-value" id="github-stars">7</span>
        </div>
        <div class="stat">
            <span class="stat-label">Branches:</span>
            <span class="stat-value" id="github-branches">1</span>
        </div>
        <div class="stat">
            <span class="stat-label">Tag:</span>
            <span class="stat-value" id="github-tag">3.0</span>
        </div>
    `;
    document.body.appendChild(statsPopup);

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.github-corner') && !e.target.closest('.github-stats-popup')) {
            statsPopup.classList.remove('show');
        }
    });

    // Mermaid configuration - Initialize after library loads
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
        });
    } else {
        // Wait for Mermaid to load if not immediately available
        window.addEventListener('load', function() {
            if (typeof mermaid !== 'undefined') {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: 'default',
                    securityLevel: 'loose',
                });
            }
        });
    }

    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        // Create copy button
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = 'position:absolute;top:5px;right:5px;padding:4px 8px;background:#000000;color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;';
        
        // Make pre position relative
        const pre = codeBlock.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        // Copy to clipboard on click
        button.addEventListener('click', function() {
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text).then(function() {
                button.textContent = 'Copied!';
                setTimeout(function() {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // Smooth scroll for anchor links
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
});

