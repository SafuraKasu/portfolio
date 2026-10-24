/*
 * Visual effects only: Matrix rain and the binary "collapse" text reveal.
 * No site copy lives here (see content.js). Both effects are skipped or frozen
 * when the visitor prefers reduced motion, and the rain pauses in hidden tabs.
 */
(function () {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = () => motionQuery.matches;

    // =========================
    // Matrix Rain (live glow on hover)
    // =========================
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    const chars = '01';
    const fontSize = 16;
    const FRAME_MS = 60;
    let columns, drops, glowIntensity;
    let mouseX = -10000, mouseY = -10000;
    let lastFrame = 0;
    let running = false;

    function resetColumns() {
        columns = Math.ceil(canvas.width / fontSize);
        drops = Array(columns).fill(1);
        glowIntensity = Array(columns).fill(0);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetColumns();
        if (prefersReducedMotion()) drawStaticFrame();
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        // subtle motion blur for trails (low alpha)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + "px 'OCR A', monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // boost glow when the cursor is near this glyph
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 100;
            if (dist < radius) {
                glowIntensity[i] = Math.min(1, glowIntensity[i] + 0.5 * (1 - dist / radius));
            }
            glowIntensity[i] = Math.max(0, glowIntensity[i] - 0.03);

            const glow = glowIntensity[i];
            const baseGreen = 0x33;
            const g = Math.min(255, baseGreen + Math.floor(glow * 170));
            ctx.fillStyle = `rgb(0, ${g}, ${baseGreen})`;

            if (glow > 0.1) {
                ctx.shadowColor = `rgba(0, 255, 100, ${glow * 0.7})`;
                ctx.shadowBlur = Math.min(20, 12 * glow);
            } else {
                ctx.shadowBlur = 0;
                ctx.shadowColor = 'transparent';
            }

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.985) drops[i] = 0;
            drops[i]++;
        }
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

    // Reduced motion: one still frame of dim binary, no animation.
    function drawStaticFrame() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + "px 'OCR A', monospace";
        ctx.fillStyle = 'rgb(0, 60, 25)';
        for (let i = 0; i < columns; i++) {
            const rows = Math.floor(Math.random() * (canvas.height / fontSize) * 0.6);
            const start = Math.floor(Math.random() * (canvas.height / fontSize));
            for (let r = 0; r < rows; r++) {
                ctx.fillText(chars[Math.floor(Math.random() * 2)], i * fontSize, ((start + r) % Math.ceil(canvas.height / fontSize)) * fontSize);
            }
        }
    }

    function loop(ts) {
        if (!running) return;
        if (ts - lastFrame >= FRAME_MS) {
            lastFrame = ts;
            draw();
        }
        requestAnimationFrame(loop);
    }

    function startRain() {
        if (running || prefersReducedMotion() || document.hidden) return;
        running = true;
        requestAnimationFrame(loop);
    }
    function stopRain() { running = false; }

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? stopRain() : startRain()));
    motionQuery.addEventListener('change', () => {
        if (prefersReducedMotion()) { stopRain(); drawStaticFrame(); } else { startRain(); }
    });

    resizeCanvas();
    if (prefersReducedMotion()) drawStaticFrame(); else startRain();

    // =========================
    // Quantum text effect: binary noise that collapses into the real text.
    // `el` is a decorative element (aria-hidden); the real text is in a sibling .sr-only node.
    // =========================
    function noise(len, text) {
        let s = '';
        for (let i = 0; i < len; i++) s += text[i] === ' ' ? ' ' : (Math.random() > 0.5 ? '1' : '0');
        return s;
    }

    function collapseText(el, finalText, delay = 0, totalMs = 900) {
        if (prefersReducedMotion()) { el.textContent = finalText; return; }
        const step = Math.max(15, Math.floor(totalMs / finalText.length));
        el.textContent = noise(finalText.length, finalText);
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                i++;
                el.textContent = finalText.slice(0, i) + noise(finalText.length - i, finalText.slice(i));
                if (i >= finalText.length) clearInterval(timer);
            }, step);
        }, delay);
    }

    window.SiteEffects = { collapseText };
})();
