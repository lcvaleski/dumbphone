// App selection functionality
const appOptions = document.querySelectorAll('.app-option');
const previewApps = document.getElementById('preview-apps');
const appCountElement = document.getElementById('app-count');
let selectedApps = ['phone', 'messages']; // Default selected apps

// Initialize app selection
appOptions.forEach(option => {
    option.addEventListener('click', () => {
        const app = option.dataset.app;

        // Toggle selection
        option.classList.toggle('selected');

        // Update selected apps array
        if (selectedApps.includes(app)) {
            selectedApps = selectedApps.filter(a => a !== app);
        } else {
            selectedApps.push(app);
        }

        // Update preview and count
        updatePreview();
        updateAppCount();
    });
});

// Update preview phone
function updatePreview() {
    const appData = {
        phone: { emoji: '📞', name: 'Phone', hasImage: false },
        messages: { emoji: '💬', name: 'Messages', hasImage: false },
        camera: { image: 'camera.png', name: 'Camera', hasImage: true },
        maps: { emoji: '🗺️', name: 'Maps', hasImage: false },
        notes: { image: 'notes.png', name: 'Notes', hasImage: true },
        calendar: { emoji: '📅', name: 'Calendar', hasImage: false },
        music: { emoji: '🎵', name: 'Music', hasImage: false },
        weather: { emoji: '☀️', name: 'Weather', hasImage: false },
        clock: { emoji: '⏰', name: 'Clock', hasImage: false },
        calculator: { emoji: '🧮', name: 'Calculator', hasImage: false }
    };

    previewApps.innerHTML = '';
    selectedApps.forEach(app => {
        if (appData[app]) {
            const appDiv = document.createElement('div');
            appDiv.className = 'app-icon';

            if (appData[app].hasImage) {
                appDiv.innerHTML = `
                    <img src="${appData[app].image}" alt="${appData[app].name}">
                    <span>${appData[app].name}</span>
                `;
            } else {
                appDiv.innerHTML = `
                    <div class="emoji-icon">${appData[app].emoji}</div>
                    <span>${appData[app].name}</span>
                `;
            }

            previewApps.appendChild(appDiv);
        }
    });
}

// Update app count
function updateAppCount() {
    appCountElement.textContent = `${selectedApps.length} app${selectedApps.length !== 1 ? 's' : ''}`;
}

// Website blocking functionality
const websiteInput = document.getElementById('website-input');
const addWebsiteBtn = document.getElementById('add-website-btn');
const blockedSitesContainer = document.querySelector('.blocked-sites');
const blockedCountElement = document.getElementById('blocked-count');
let blockedWebsites = ['instagram.com', 'youtube.com', 'tiktok.com', 'reddit.com'];

// Add website to block list
addWebsiteBtn.addEventListener('click', addWebsite);
websiteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addWebsite();
    }
});

function addWebsite() {
    const website = websiteInput.value.trim().toLowerCase();

    // Clean up the URL
    let cleanUrl = website.replace(/^(https?:\/\/)?(www\.)?/, '');

    if (cleanUrl && !blockedWebsites.includes(cleanUrl)) {
        blockedWebsites.push(cleanUrl);
        addBlockedWebsiteElement(cleanUrl);
        updateBlockedCount();
        websiteInput.value = '';
    }
}

// Add blocked website element
function addBlockedWebsiteElement(website) {
    const siteDiv = document.createElement('div');
    siteDiv.className = 'blocked-site';
    siteDiv.innerHTML = `
        ${website}
        <span class="remove">×</span>
    `;

    siteDiv.querySelector('.remove').addEventListener('click', () => {
        blockedWebsites = blockedWebsites.filter(w => w !== website);
        siteDiv.remove();
        updateBlockedCount();
    });

    blockedSitesContainer.appendChild(siteDiv);
}

// Update blocked count
function updateBlockedCount() {
    blockedCountElement.textContent = `${blockedWebsites.length} site${blockedWebsites.length !== 1 ? 's' : ''}`;
}

// Model selection
const modelCards = document.querySelectorAll('.model-card');
const selectedModelElement = document.getElementById('selected-model');
let selectedModel = null;

modelCards.forEach(card => {
    const selectBtn = card.querySelector('.select-model');
    selectBtn.addEventListener('click', () => {
        // Remove selected class from all cards
        modelCards.forEach(c => {
            c.classList.remove('selected');
            c.querySelector('.select-model').textContent = 'Select';
        });

        // Add selected class to clicked card
        card.classList.add('selected');
        selectBtn.textContent = 'Selected';

        // Update selected model
        selectedModel = card.dataset.model;
        const modelName = card.querySelector('h3').textContent;
        const modelPrice = card.querySelector('.model-price').textContent;
        selectedModelElement.textContent = `${modelName} - ${modelPrice}`;
    });
});

// Initialize existing blocked websites
document.querySelectorAll('.blocked-site .remove').forEach(removeBtn => {
    removeBtn.addEventListener('click', (e) => {
        const siteDiv = e.target.closest('.blocked-site');
        const website = siteDiv.textContent.trim().replace('×', '').trim();
        blockedWebsites = blockedWebsites.filter(w => w !== website);
        siteDiv.remove();
        updateBlockedCount();
    });
});


// Order button functionality
document.querySelector('.order-button').addEventListener('click', () => {
    if (!selectedModel) {
        alert('Please select a phone model to continue.');
        document.getElementById('models').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // Create order summary
    const orderData = {
        model: selectedModel,
        apps: selectedApps,
        blockedWebsites: blockedWebsites
    };

    console.log('Order data:', orderData);
    alert('Order functionality would be implemented here. Check console for order details.');
});

// App data with icons
const appIcons = {
    phone: { emoji: '📞', name: 'Phone', hasImage: false },
    messages: { emoji: '💬', name: 'Messages', hasImage: false },
    camera: { image: 'camera.png', name: 'Camera', hasImage: true },
    settings: { emoji: '⚙️', name: 'Settings', hasImage: false },
    notes: { image: 'notes.png', name: 'Notes', hasImage: true },
    calendar: { emoji: '📅', name: 'Calendar', hasImage: false },
    reminders: { emoji: '📝', name: 'Reminders', hasImage: false },
    clock: { emoji: '⏰', name: 'Clock', hasImage: false },
    maps: { emoji: '🗺️', name: 'Maps', hasImage: false },
    weather: { emoji: '☀️', name: 'Weather', hasImage: false },
    wallet: { emoji: '💳', name: 'Wallet', hasImage: false },
    music: { emoji: '🎵', name: 'Music', hasImage: false },
    photos: { emoji: '🖼️', name: 'Photos', hasImage: false },
    podcasts: { emoji: '🎙️', name: 'Podcasts', hasImage: false }
};

// Live customization functionality
function initLiveCustomizer() {
    const checkboxes = document.querySelectorAll('.app-checkbox input');
    const livePreview = document.getElementById('live-preview');
    const appCounter = document.getElementById('live-app-count');

    function updateLivePreview() {
        const selectedApps = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedApps.push(checkbox.dataset.app);
            }
        });

        // Update the live iPhone display
        livePreview.innerHTML = '';
        selectedApps.forEach(appId => {
            const appInfo = appIcons[appId];
            if (appInfo) {
                const appDiv = document.createElement('div');
                appDiv.className = 'app-icon';

                if (appInfo.hasImage) {
                    appDiv.innerHTML = `
                        <img src="${appInfo.image}" alt="${appInfo.name}">
                        <span>${appInfo.name}</span>
                    `;
                } else {
                    appDiv.innerHTML = `
                        <div class="emoji-icon">${appInfo.emoji}</div>
                        <span>${appInfo.name}</span>
                    `;
                }

                livePreview.appendChild(appDiv);
            }
        });

        // Update counter
        appCounter.textContent = selectedApps.length;
    }

    // Add event listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateLivePreview);
    });

    // Initial update
    updateLivePreview();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize live customizer
    initLiveCustomizer();

    // Keep old functionality for the lower customization section if it still exists
    if (document.getElementById('preview-apps')) {
        updatePreview();
        updateAppCount();
        updateBlockedCount();
    }

    // Phone transition functionality
    const transitionPhone = document.querySelector('.transition-phone');
    const transitionToggle = document.querySelector('.transition-toggle');
    const clutteredImage = document.querySelector('.phone-image.cluttered');
    const cleanImage = document.querySelector('.phone-image.clean');
    const toggleText = document.querySelector('.toggle-text');

    let autoAnimating = true;
    let currentState = 'cluttered';

    // Start auto-animation after a short delay
    setTimeout(() => {
        if (transitionPhone) {
            transitionPhone.classList.add('auto-animate');
        }
    }, 1000);

    // Handle manual toggle
    if (transitionToggle) {
        transitionToggle.addEventListener('click', () => {
            // Stop auto-animation
            autoAnimating = false;
            transitionPhone.classList.remove('auto-animate');

            // Toggle between states
            if (currentState === 'cluttered') {
                clutteredImage.classList.remove('active');
                cleanImage.classList.add('active');
                currentState = 'clean';
                toggleText.textContent = 'See the problem';
            } else {
                clutteredImage.classList.add('active');
                cleanImage.classList.remove('active');
                currentState = 'cluttered';
                toggleText.textContent = 'See the transformation';
            }
        });
    }

    // Auto-animate between states if not manually controlled
    if (transitionPhone && autoAnimating) {
        setInterval(() => {
            if (!autoAnimating) return;

            if (currentState === 'cluttered') {
                currentState = 'clean';
            } else {
                currentState = 'cluttered';
            }
        }, 4000);
    }
});


// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});