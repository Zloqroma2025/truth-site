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
    const mascotWrap = mascot?.closest('.mascot-wrap');
    const socialLinks = document.querySelectorAll('.socials a');
    if (!mascot || !mascotWrap || !socialLinks.length) return;

    const emotions = {
        ebloid: 'заинтересован',
        pinterest: 'делится находкой',
        twitch: 'смеётся в гарнитуре',
        youtube: 'удивлён',
        steam: 'играет на геймпаде',
        telegram: 'машет рукой',
        x: 'подмигивает',
        github: 'показывает лайк',
        '7tv': 'радуется победе'
    };

    const setMood = (link, active) => {
        const mood = active
            ? (Object.keys(emotions).find((name) => link.classList.contains(name)) || 'idle')
            : 'idle';
        mascot.dataset.mood = mood;
        mascotWrap.dataset.mood = mood;
        mascot.setAttribute(
            'aria-label',
            mood === 'idle' ? '3D-аватар TRUTH' : `3D-аватар TRUTH: ${emotions[mood]}`
        );
    };

    socialLinks.forEach((link) => {
        link.addEventListener('pointerenter', () => setMood(link, true));
        link.addEventListener('pointerleave', () => setMood(link, false));
        link.addEventListener('focus', () => setMood(link, true));
        link.addEventListener('blur', () => setMood(link, false));
    });
})();
