// Scroll to configuration section when clicking scroll buttons
document.querySelectorAll('.scroll-to-config').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.app-config').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Update active states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Handle custom input for both whitelist and blacklist
document.querySelectorAll('.custom-input').forEach(customInput => {
    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            const list = e.target.parentElement.querySelector('.app-list');
            const newLabel = document.createElement('label');
            const isWhitelist = e.target.classList.contains('whitelist-custom');

            newLabel.innerHTML = `
                <input type="checkbox" ${isWhitelist ? '' : 'checked'}>
                <span>${e.target.value.trim()}</span>
            `;
            list.appendChild(newLabel);
            e.target.value = '';
        }
    });
});

// Animate phone mockup labels and images in sync
setInterval(() => {
    const beforeLabel = document.querySelector('.before-label');
    const afterLabel = document.querySelector('.after-label');
    const beforeImage = document.querySelector('.phone-image.before');
    const afterImage = document.querySelector('.phone-image.after');

    if (beforeLabel && afterLabel) {
        beforeLabel.classList.toggle('active');
        afterLabel.classList.toggle('active');
    }

    if (beforeImage && afterImage) {
        beforeImage.classList.toggle('active');
        afterImage.classList.toggle('active');
    }
}, 3000);

// Shopify Integration
const SHOPIFY_STORE_URL = 'coventry-labs-llc.myshopify.com'; // Your Shopify store

// Variant IDs for each iPhone model and storage configuration
const VARIANT_IDS = {
    'iphone-17-pro-max': {
        '256': '47492615405822', // Update with actual variant ID
        '512': '47492615405823', // Update with actual variant ID
        '1024': '47492615405824', // Update with actual variant ID
        '2048': '47492615405825'  // Update with actual variant ID
    },
    'iphone-17-pro': {
        '256': '47492615405826', // Update with actual variant ID
        '512': '47492615405827', // Update with actual variant ID
        '1024': '47492615405828' // Update with actual variant ID
    },
    'iphone-17': {
        '256': '47492615405829', // Update with actual variant ID
        '512': '47492615405830'  // Update with actual variant ID
    },
    'iphone-air': {
        '256': '47492615405831', // Update with actual variant ID
        '512': '47492615405832', // Update with actual variant ID
        '1024': '47492615405833' // Update with actual variant ID
    },
    'iphone-16e': {
        '128': '47492615405822', // Current variant ID
        '256': '47492615405834'  // Update with actual variant ID
    }
};

// Collect configuration based on current mode
function collectConfiguration() {
    const activeTab = document.querySelector('.tab-content.active').id;
    const isWhitelistMode = activeTab === 'whitelist-tab';

    if (isWhitelistMode) {
        // Whitelist mode: collect allowed apps
        const allowedApps = [];
        document.querySelectorAll('#whitelist-tab input[type="checkbox"]:checked').forEach(checkbox => {
            allowedApps.push(checkbox.nextElementSibling.textContent.trim());
        });

        return {
            mode: 'whitelist',
            allowedApps: allowedApps,
            blockedApps: [], // Everything else is blocked
            blockedWebsites: [] // All non-essential websites blocked
        };
    } else {
        // Blacklist mode: collect blocked items
        const blockedApps = [];
        const blockedWebsites = [];

        document.querySelectorAll('#blacklist-tab .selection-column:first-child input[type="checkbox"]:checked').forEach(checkbox => {
            blockedApps.push(checkbox.nextElementSibling.textContent.trim());
        });

        document.querySelectorAll('#blacklist-tab .selection-column:last-child input[type="checkbox"]:checked').forEach(checkbox => {
            blockedWebsites.push(checkbox.nextElementSibling.textContent.trim());
        });

        return {
            mode: 'blacklist',
            allowedApps: [], // Everything else is allowed
            blockedApps: blockedApps,
            blockedWebsites: blockedWebsites
        };
    }
}

// Handle model card selection
document.addEventListener('DOMContentLoaded', () => {
    const modelCards = document.querySelectorAll('.model-card');
    const storageOptions = document.querySelectorAll('.storage-option');

    // Handle model card clicks
    modelCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger on storage option clicks
            if (e.target.closest('.storage-option')) return;

            // Remove active from all cards
            modelCards.forEach(c => c.classList.remove('active'));
            // Add active to clicked card
            card.classList.add('active');

            // Select first storage option for this model
            const firstStorage = card.querySelector('.storage-option');
            if (firstStorage) {
                firstStorage.click();
            }
        });
    });

    // Handle storage option clicks
    storageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // Find parent model card
            const modelCard = option.closest('.model-card');

            // Make this model card active
            modelCards.forEach(c => c.classList.remove('active'));
            modelCard.classList.add('active');

            // Remove active from other storage options in this card
            modelCard.querySelectorAll('.storage-option').forEach(opt => {
                opt.classList.remove('active');
            });

            // Add active to clicked option
            option.classList.add('active');

            // Check the radio button
            const radio = option.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
});

// Get selected iPhone model
function getSelectedModel() {
    const activeCard = document.querySelector('.model-card.active');
    if (!activeCard) return {
        display: 'iPhone 16e 128GB - $499',
        model: 'iphone-16e',
        storage: '128',
        variantId: VARIANT_IDS['iphone-16e']['128']
    };

    const modelName = activeCard.querySelector('h4').textContent;
    const modelKey = activeCard.getAttribute('data-model');
    const activeStorage = activeCard.querySelector('.storage-option.active');

    if (!activeStorage) {
        return {
            display: `${modelName} 128GB - $499`,
            model: modelKey,
            storage: '128',
            variantId: VARIANT_IDS[modelKey] ? VARIANT_IDS[modelKey]['128'] : VARIANT_IDS['iphone-16e']['128']
        };
    }

    const storageText = activeStorage.querySelector('span').textContent;
    const storageValue = activeStorage.querySelector('input[type="radio"]').value;

    return {
        display: `${modelName} ${storageText}`,
        model: modelKey,
        storage: storageValue,
        variantId: VARIANT_IDS[modelKey] ? VARIANT_IDS[modelKey][storageValue] : VARIANT_IDS['iphone-16e']['128']
    };
}

// Create order notes
function createOrderNotes() {
    const config = collectConfiguration();
    const modelInfo = getSelectedModel();

    let notes = '=== COREPHONE CONFIGURATION ===\n\n';
    notes += `IPHONE MODEL: ${modelInfo.display}\n\n`;
    notes += `MODE: ${config.mode.toUpperCase()}\n\n`;

    if (config.mode === 'whitelist') {
        notes += `ALLOWED APPS ONLY (${config.allowedApps.length}):\n`;
        notes += config.allowedApps.length > 0 ? config.allowedApps.join('\n') : 'None';
        notes += '\n\n';
        notes += 'ALL OTHER APPS AND WEBSITES: BLOCKED';
    } else {
        notes += `BLOCKED APPS (${config.blockedApps.length}):\n`;
        notes += config.blockedApps.length > 0 ? config.blockedApps.join('\n') : 'None';
        notes += '\n\n';
        notes += `BLOCKED WEBSITES (${config.blockedWebsites.length}):\n`;
        notes += config.blockedWebsites.length > 0 ? config.blockedWebsites.join('\n') : 'None';
    }

    notes += '\n\n';
    notes += `Configuration Date: ${new Date().toLocaleDateString()}`;

    return notes;
}

// Function to show confirmation modal
function showConfirmationModal() {
    const config = collectConfiguration();
    const modal = document.getElementById('confirmation-modal');

    // Update device info
    const modelInfo = getSelectedModel();
    const summaryDevice = document.querySelector('.summary-device');
    const summaryPrice = document.querySelector('.summary-price');
    if (summaryDevice && summaryPrice) {
        const [modelPart, pricePart] = modelInfo.display.split(' - ');
        summaryDevice.textContent = modelPart;
        summaryPrice.textContent = pricePart || '$499';
    }

    // Update mode section
    const modeDesc = document.getElementById('mode-description');
    if (config.mode === 'whitelist') {
        modeDesc.textContent = 'Whitelist Mode - Only allow specific apps';
        modeDesc.className = 'mode-badge whitelist';
    } else {
        modeDesc.textContent = 'Blacklist Mode - Block specific apps';
        modeDesc.className = 'mode-badge blacklist';
    }

    // Update allowed apps section
    const allowedSection = document.getElementById('allowed-section');
    const allowedList = document.getElementById('allowed-list');
    allowedList.innerHTML = '';

    if (config.mode === 'whitelist') {
        allowedSection.style.display = 'block';
        config.allowedApps.forEach(app => {
            const pill = document.createElement('div');
            pill.className = 'app-pill';
            pill.textContent = app;
            allowedList.appendChild(pill);
        });
    } else {
        allowedSection.style.display = 'none';
    }

    // Update blocked section
    const blockedSection = document.getElementById('blocked-section');
    const blockedList = document.getElementById('blocked-list');
    blockedList.innerHTML = '';

    if (config.mode === 'blacklist') {
        blockedSection.style.display = 'block';
        config.blockedApps.concat(config.blockedWebsites).forEach(item => {
            const pill = document.createElement('div');
            pill.className = 'app-pill';
            pill.textContent = item;
            blockedList.appendChild(pill);
        });
    } else {
        blockedSection.innerHTML = '<h3>🚫 Everything Else</h3><p style="color: #666; margin: 0;">All apps and websites not listed above will be permanently blocked.</p>';
    }

    // Show modal
    modal.classList.add('show');
}

// Handle ONLY the checkout button (not scroll buttons)
document.querySelectorAll('.add-to-cart.config-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showConfirmationModal();
    });
});

// Modal close button
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('confirmation-modal').classList.remove('show');
});

// Modal edit button
document.getElementById('modal-edit').addEventListener('click', () => {
    document.getElementById('confirmation-modal').classList.remove('show');
});

// Modal checkout button
document.getElementById('modal-checkout').addEventListener('click', () => {
    const orderNotes = createOrderNotes();
    const config = collectConfiguration();
    const modelInfo = getSelectedModel();
    console.log('Order Notes:', orderNotes);
    console.log('Selected Model:', modelInfo);

    // Create a form and submit it to Shopify
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://${SHOPIFY_STORE_URL}/cart/add`;

    // Add variant ID based on selected model and storage
    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = modelInfo.variantId;
    form.appendChild(idInput);

    // Add quantity
    const qtyInput = document.createElement('input');
    qtyInput.type = 'hidden';
    qtyInput.name = 'quantity';
    qtyInput.value = '1';
    form.appendChild(qtyInput);

    // Add iPhone model as a property
    const modelInput = document.createElement('input');
    modelInput.type = 'hidden';
    modelInput.name = 'properties[iPhone Model]';
    modelInput.value = modelInfo.display;
    form.appendChild(modelInput);

    // Add mode as a property
    const modeInput = document.createElement('input');
    modeInput.type = 'hidden';
    modeInput.name = 'properties[Configuration Mode]';
    modeInput.value = config.mode === 'whitelist' ? 'Whitelist (Safest)' : 'Blacklist (Flexible)';
    form.appendChild(modeInput);

    if (config.mode === 'whitelist') {
        // Add allowed apps for whitelist mode
        const appsInput = document.createElement('input');
        appsInput.type = 'hidden';
        appsInput.name = 'properties[Allowed Apps Only]';
        appsInput.value = config.allowedApps.slice(0, 5).join(', ') + (config.allowedApps.length > 5 ? '...' : '');
        form.appendChild(appsInput);
    } else {
        // Add blocked apps and sites for blacklist mode
        const appsInput = document.createElement('input');
        appsInput.type = 'hidden';
        appsInput.name = 'properties[Blocked Apps]';
        appsInput.value = config.blockedApps.join(', ') || 'None';
        form.appendChild(appsInput);

        const sitesInput = document.createElement('input');
        sitesInput.type = 'hidden';
        sitesInput.name = 'properties[Blocked Websites]';
        sitesInput.value = config.blockedWebsites.join(', ') || 'None';
        form.appendChild(sitesInput);
    }

    // Add return URL to go to cart with note
    const returnInput = document.createElement('input');
    returnInput.type = 'hidden';
    returnInput.name = 'return_to';
    returnInput.value = `/cart?note=${encodeURIComponent(orderNotes)}`;
    form.appendChild(returnInput);

    // Append form to body and submit
    document.body.appendChild(form);
    form.submit();
});