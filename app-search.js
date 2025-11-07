// App Store Search Integration
class AppStoreSearch {
    constructor() {
        this.searchCache = new Map();
        this.selectedApps = new Map();
        this.initializeSearch();
    }

    initializeSearch() {
        // Add search UI to both whitelist and blacklist sections
        this.addSearchUI('whitelist');
        this.addSearchUI('blacklist');

        // Add global click handler to close search results when clicking outside
        document.addEventListener('click', (e) => {
            // Close all search results if clicking outside of search containers
            if (!e.target.closest('.search-box')) {
                this.clearAllResults();
            }
        });
    }

    addSearchUI(mode) {
        const searchHTML = `
            <div class="app-search-container">
                <div class="search-header">
                    <div class="search-title-row">
                        <h3>Add More Apps</h3>
                        <span class="search-badge">Optional</span>
                    </div>
                    <p class="search-description">Search the App Store to add specific apps to your ${mode === 'whitelist' ? 'allowed' : 'blocked'} list</p>
                </div>
                <div class="search-box">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input type="text"
                           class="app-search-input"
                           placeholder="Search App Store (e.g., Spotify, Uber, Banking apps)..."
                           data-mode="${mode}">
                    <div class="search-results" data-mode="${mode}"></div>
                </div>
                <div class="selected-apps" data-mode="${mode}">
                    <div class="selected-apps-header">
                        <h4>${mode === 'whitelist' ? 'Additional Apps Selected' : 'Additional Apps to Block'}</h4>
                    </div>
                    <div class="selected-apps-list"></div>
                </div>
            </div>
        `;

        // Add right after the essential apps section for whitelist, or at the top for blacklist
        const targetSection = document.querySelector(`#${mode}-tab`);
        if (targetSection) {
            let searchContainer = targetSection.querySelector('.app-store-search-section');
            if (!searchContainer) {
                searchContainer = document.createElement('div');
                searchContainer.className = 'app-store-search-section';
                searchContainer.innerHTML = searchHTML;

                if (mode === 'whitelist') {
                    // For whitelist, insert right after essential apps
                    const essentialSection = targetSection.querySelector('.essential-apps-section');
                    if (essentialSection && essentialSection.nextSibling) {
                        essentialSection.parentNode.insertBefore(searchContainer, essentialSection.nextSibling);
                    } else {
                        targetSection.appendChild(searchContainer);
                    }
                } else {
                    // For blacklist, add after social media section
                    const socialSection = targetSection.querySelector('.social-media-section');
                    if (socialSection && socialSection.nextSibling) {
                        socialSection.parentNode.insertBefore(searchContainer, socialSection.nextSibling);
                    } else {
                        targetSection.appendChild(searchContainer);
                    }
                }
            }

            // Add event listeners
            const input = searchContainer.querySelector('.app-search-input');
            input.addEventListener('input', this.debounce((e) => this.searchApps(e.target.value, mode), 300));

            // Add escape key handler to close search results
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.clearResults(mode);
                    input.blur();
                }
            });

            // Clear results when input loses focus (with a small delay to allow clicking results)
            input.addEventListener('blur', () => {
                setTimeout(() => {
                    // Only clear if not clicking within the search results
                    if (!document.activeElement?.closest('.search-results')) {
                        this.clearResults(mode);
                    }
                }, 200);
            });

            // Hide the selected apps section initially if no apps selected
            this.updateSelectedAppsDisplay(mode);
        }
    }

    async searchApps(query, mode) {
        if (query.length < 2) {
            this.clearResults(mode);
            return;
        }

        // Check cache first
        const cacheKey = `${query}-${mode}`;
        if (this.searchCache.has(cacheKey)) {
            this.displayResults(this.searchCache.get(cacheKey), mode);
            return;
        }

        try {
            // iTunes Search API - no auth required, CORS-friendly
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=us&entity=software&limit=10`);
            const data = await response.json();

            const apps = data.results.map(app => ({
                id: app.trackId,
                name: app.trackName,
                developer: app.artistName,
                icon: app.artworkUrl100,
                bundleId: app.bundleId,
                category: app.primaryGenreName,
                description: app.description?.substring(0, 100) + '...'
            }));

            this.searchCache.set(cacheKey, apps);
            this.displayResults(apps, mode);
        } catch (error) {
            console.error('Error searching apps:', error);
            this.displayError(mode);
        }
    }

    displayResults(apps, mode) {
        const resultsContainer = document.querySelector(`.search-results[data-mode="${mode}"]`);

        if (apps.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No apps found</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        const resultsHTML = apps.map(app => `
            <div class="app-result" data-app-id="${app.id}" data-mode="${mode}">
                <img src="${app.icon}" alt="${app.name}" class="app-icon">
                <div class="app-info">
                    <div class="app-name">${app.name}</div>
                    <div class="app-developer">${app.developer}</div>
                    <div class="app-category">${app.category}</div>
                </div>
                <button class="add-app-btn" data-app-id="${app.id}">
                    ${mode === 'whitelist' ? 'Allow' : 'Block'}
                </button>
            </div>
        `).join('');

        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.style.display = 'block';

        // Add click handlers
        resultsContainer.querySelectorAll('.add-app-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the click from bubbling up
                const appId = e.target.dataset.appId;
                const app = apps.find(a => a.id == appId);
                if (app) {
                    this.selectApp(app, mode);
                    e.target.textContent = 'Added ✓';
                    e.target.disabled = true;

                    // Clear the search and results after a brief delay
                    setTimeout(() => {
                        const input = document.querySelector(`.app-search-input[data-mode="${mode}"]`);
                        if (input) {
                            input.value = '';
                        }
                        this.clearResults(mode);
                    }, 500);
                }
            });
        });
    }

    selectApp(app, mode) {
        const key = `${mode}-${app.id}`;
        if (!this.selectedApps.has(key)) {
            this.selectedApps.set(key, app);
            this.updateSelectedAppsDisplay(mode);
        }
    }

    updateSelectedAppsDisplay(mode) {
        const container = document.querySelector(`.selected-apps[data-mode="${mode}"]`);
        if (!container) return;

        const apps = Array.from(this.selectedApps.entries())
            .filter(([key]) => key.startsWith(`${mode}-`))
            .map(([key, app]) => app);

        // Show or hide the container based on whether there are apps
        if (apps.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        const appsHTML = apps.map(app => `
            <div class="selected-app-chip" data-app-id="${app.id}">
                <img src="${app.icon}" alt="${app.name}" class="chip-icon">
                <span>${app.name}</span>
                <button class="remove-app" data-key="${mode}-${app.id}" aria-label="Remove ${app.name}">×</button>
            </div>
        `).join('');

        const headerElement = container.querySelector('.selected-apps-header');
        const listElement = container.querySelector('.selected-apps-list');

        if (headerElement) {
            headerElement.innerHTML = `<h4>${mode === 'whitelist' ? 'Apps from App Store (Allowed)' : 'Apps from App Store (Blocked)'} (${apps.length})</h4>`;
        }

        if (listElement) {
            listElement.innerHTML = appsHTML;

            // Add remove handlers
            listElement.querySelectorAll('.remove-app').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectedApps.delete(e.target.dataset.key);
                    this.updateSelectedAppsDisplay(mode);

                    // Clear the search results if visible
                    this.clearResults(mode);
                });
            });
        }
    }

    clearResults(mode) {
        const resultsContainer = document.querySelector(`.search-results[data-mode="${mode}"]`);
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
        }
    }

    clearAllResults() {
        // Clear results for all modes
        ['whitelist', 'blacklist'].forEach(mode => {
            this.clearResults(mode);
        });
    }

    displayError(mode) {
        const resultsContainer = document.querySelector(`.search-results[data-mode="${mode}"]`);
        resultsContainer.innerHTML = '<div class="search-error">Error searching apps. Please try again.</div>';
        resultsContainer.style.display = 'block';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Get selected apps for order processing
    getSelectedApps(mode) {
        return Array.from(this.selectedApps.entries())
            .filter(([key]) => key.startsWith(`${mode}-`))
            .map(([key, app]) => ({
                name: app.name,
                bundleId: app.bundleId,
                appStoreId: app.id
            }));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.appStoreSearch = new AppStoreSearch();
});

// Export for use in main script
window.AppStoreSearch = AppStoreSearch;