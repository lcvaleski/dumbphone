// App Icons for Essential and Social packages
const appIconLoader = {
    // Map of app names to their iTunes app IDs (for fetching icons)
    essentialAppIds: {
        'Phone': '1146562108', // Phone app
        'Messages': '1146560473', // Messages app
        'Maps': '915056765', // Apple Maps
        'Weather': '1069513131', // Weather
        'Calendar': '1108185179', // Calendar
        'Clock': '1584215688', // Clock app
        'Notes': '1110145109', // Notes
        'Reminders': '1108187841', // Reminders
        'Calculator': '1069511488', // Calculator
        'Camera': 'builtin-camera', // Built-in iOS app (no App Store listing)
        'Photos': 'builtin-photos', // Built-in iOS app (no App Store listing)
        'Settings': 'builtin-settings' // Built-in iOS app (no App Store listing)
    },

    socialAppIds: {
        'Instagram': '389801252',
        'TikTok': '835599320',
        'Snapchat': '447188370',
        'Facebook': '284882215',
        'Twitter/X': '333903271',
        'Discord': '985746746',
        'Reddit': '1064216828',
        'Twitch': '460177396',
        'BeReal': '1459645446',
        'Pinterest': '429047995',
        'Tumblr': '305343404',
        'LinkedIn': '288429040'
    },

    iconCache: new Map(),

    async loadAppIcons() {
        // Load essential app icons
        await this.loadIconsForSection('essential', this.essentialAppIds);
        // Load social app icons
        await this.loadIconsForSection('social', this.socialAppIds);
    },

    async loadIconsForSection(section, appIds) {
        const container = section === 'essential'
            ? document.querySelector('.essential-apps-preview .preview-pills')
            : document.querySelector('.social-apps-preview .preview-pills');

        if (!container) return;

        // Clear existing pills
        container.innerHTML = '';

        // Create icon pills
        const iconPromises = Object.entries(appIds).slice(0, 8).map(async ([appName, appId]) => {
            let iconUrl = this.iconCache.get(appId);

            // Skip API call for built-in apps
            if (!iconUrl && !appId.startsWith('builtin-')) {
                try {
                    const response = await fetch(`https://itunes.apple.com/lookup?id=${appId}`);
                    const data = await response.json();
                    if (data.results && data.results[0]) {
                        iconUrl = data.results[0].artworkUrl100;
                        this.iconCache.set(appId, iconUrl);
                    }
                } catch (error) {
                    console.log(`Could not fetch icon for ${appName}`);
                }
            }

            // Use emoji icons for built-in apps
            let iconContent;
            if (iconUrl) {
                iconContent = `<img src="${iconUrl}" alt="${appName}" class="app-icon-img">`;
            } else if (appId.startsWith('builtin-')) {
                // Use emojis for built-in apps
                const emojiMap = {
                    'builtin-phone': '📱',
                    'builtin-messages': '💬',
                    'builtin-clock': '⏰',
                    'builtin-camera': '📷',
                    'builtin-photos': '🖼️',
                    'builtin-settings': '⚙️'
                };
                const emoji = emojiMap[appId] || '📱';
                iconContent = `<span class="app-icon-emoji">${emoji}</span>`;
            } else {
                iconContent = `<span class="app-icon-text">${appName}</span>`;
            }

            // Create pill with icon or fallback
            return `
                <div class="app-icon-pill ${section === 'social' ? 'blocked' : ''}" title="${appName}">
                    ${iconContent}
                </div>
            `;
        });

        // Wait for all icons to load
        const iconHtml = await Promise.all(iconPromises);
        container.innerHTML = iconHtml.join('');

        // Add "show more" indicator
        const remainingCount = Object.keys(appIds).length - 8;
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