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

// Animate phone mockup labels
setInterval(() => {
    const beforeLabel = document.querySelector('.before-label');
    const afterLabel = document.querySelector('.after-label');

    if (beforeLabel && afterLabel) {
        beforeLabel.classList.toggle('active');
        afterLabel.classList.toggle('active');
    }
}, 3000);

// Shopify Integration
const SHOPIFY_STORE_URL = 'coventry-labs-llc.myshopify.com'; // Your Shopify store
const VARIANT_ID = '47492615405822'; // Blue variant ID
const PRODUCT_HANDLE = 'iphone-16e-dumbphone-configuration'; // Product handle as backup

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

// Get selected iPhone model (always iPhone 16e now)
function getSelectedModel() {
    // iPhone 16e is always selected
    return 'iPhone 16e 128GB - $799';
}

// Create order notes
function createOrderNotes() {
    const config = collectConfiguration();
    const model = getSelectedModel();

    let notes = '=== DUMBPHONE CONFIGURATION ===\n\n';
    notes += `IPHONE MODEL: ${model}\n\n`;
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
    console.log('Order Notes:', orderNotes);

    // Create a form and submit it to Shopify
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://${SHOPIFY_STORE_URL}/cart/add`;

    // Add variant ID
    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = VARIANT_ID;
    form.appendChild(idInput);

    // Add quantity
    const qtyInput = document.createElement('input');
    qtyInput.type = 'hidden';
    qtyInput.name = 'quantity';
    qtyInput.value = '1';
    form.appendChild(qtyInput);

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