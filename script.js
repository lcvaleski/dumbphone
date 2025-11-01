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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    updateAppCount();
    updateBlockedCount();
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