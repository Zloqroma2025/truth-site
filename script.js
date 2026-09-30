(() => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const storageKey = 'truth-theme';

    try {
        if (localStorage.getItem(storageKey) === 'light') {
            document.body.classList.add('light-theme');
        }
    } catch {
        // Theme switching still works when browser storage is unavailable.
    }

    const updateTheme = () => {
        const isLight = document.body.classList.contains('light-theme');
        toggle.setAttribute(
            'aria-label',
            isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'
        );
    };

    updateTheme();

    toggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        try {
            localStorage.setItem(storageKey, isLight ? 'light' : 'dark');
        } catch {
            // Keep the current theme for this page view.
        }
        updateTheme();
    });
})();


(() => {
    const mascot = document.getElementById('social-mascot');
    const socialLinks = document.querySelectorAll('.socials a');
    if (!mascot || !socialLinks.length) return;

    const moods = ['ebloid', 'pinterest', 'twitch', 'youtube', 'steam', 'telegram', 'x', 'github', '7tv'];
    const setMood = (link, active) => {
        mascot.dataset.mood = active ? (moods.find((mood) => link.classList.contains(mood)) || 'idle') : 'idle';
    };

    socialLinks.forEach((link) => {
        link.addEventListener('pointerenter', () => setMood(link, true));
        link.addEventListener('pointerleave', () => setMood(link, false));
        link.addEventListener('focus', () => setMood(link, true));
        link.addEventListener('blur', () => setMood(link, false));
    });
})();
