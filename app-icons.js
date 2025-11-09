// App Icons for Essential and Social packages
const appIconLoader = {
    // Map of app names to their local icon files
    essentialAppIcons: {
        'Phone': 'icons/phone.png',
        'Messages': 'icons/messages.png',
        'Maps': 'icons/maps.png',
        'Weather': 'icons/weather.png',
        'Calendar': 'icons/calendar.png',
        'Clock': 'icons/clock.png',
        'Notes': 'icons/notes.png',
        'Reminders': 'icons/reminders.png',
        'Calculator': 'icons/calculator.png',
        'Camera': 'builtin-camera',
        'Photos': 'builtin-photos',
        'Settings': 'builtin-settings'
    },

    socialAppIcons: {
        'Instagram': 'icons/instagram.png',
        'TikTok': 'icons/tiktok.png',
        'Snapchat': 'icons/snapchat.png',
        'Facebook': 'icons/facebook.png',
        'Twitter/X': 'icons/twitter.png',
        'Discord': 'icons/discord.png',
        'Reddit': 'icons/reddit.png',
        'Twitch': 'icons/twitch.png',
        'BeReal': 'icons/bereal.png',
        'Pinterest': 'icons/pinterest.png',
        'Tumblr': 'icons/tumblr.png',
        'LinkedIn': 'icons/linkedin.png'
    },

    iconCache: new Map(),

    async loadAppIcons() {
        // Load essential app icons
        this.loadIconsForSection('essential', this.essentialAppIcons);
        // Load social app icons
        this.loadIconsForSection('social', this.socialAppIcons);
    },

    loadIconsForSection(section, appIcons) {
        const container = section === 'essential'
            ? document.querySelector('.essential-apps-preview .preview-pills')
            : document.querySelector('.social-apps-preview .preview-pills');

        if (!container) return;

        // Clear existing pills
        container.innerHTML = '';

        // Create icon pills
        const iconHtmlArray = Object.entries(appIcons).slice(0, 8).map(([appName, iconPath]) => {
            let iconContent;

            if (iconPath.startsWith('builtin-')) {
                // Use emojis for built-in apps
                const emojiMap = {
                    'builtin-camera': '📷',
                    'builtin-photos': '🖼️',
                    'builtin-settings': '⚙️'
                };
                const emoji = emojiMap[iconPath] || '📱';
                iconContent = `<span class="app-icon-emoji">${emoji}</span>`;
            } else {
                // Use local icon file
                iconContent = `<img src="${iconPath}" alt="${appName}" class="app-icon-img" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'app-icon-text\\'>${appName}</span>'">`;
            }

            // Create pill with icon
            return `
                <div class="app-icon-pill ${section === 'social' ? 'blocked' : ''}" title="${appName}">
                    ${iconContent}
                </div>
            `;
        });

        // Add all icons
        container.innerHTML = iconHtmlArray.join('');

        // Add "show more" indicator
        const remainingCount = Object.keys(appIcons).length - 8;
        if (remainingCount > 0) {
            container.innerHTML += `
                <div class="app-pill show-more">
                    +${remainingCount} more
                </div>
            `;
        }
    },

    // Initialize on page load
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadAppIcons();
            });
        } else {
            this.loadAppIcons();
        }

        // Re-load icons when tabs change (in case content is dynamically shown)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('expand-toggle') ||
                e.target.classList.contains('expand-toggle-social')) {
                setTimeout(() => this.loadAppIcons(), 100);
            }
        });
    }
};

// Initialize the icon loader
appIconLoader.init();