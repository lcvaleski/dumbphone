// Scroll and add-to-cart button handling is now done through event delegation below

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Color selection for iPhone 16e
document.querySelectorAll('.color-option').forEach(radio => {
    radio.addEventListener('change', () => {
        // Update visual state of color boxes
        document.querySelectorAll('.color-box').forEach(box => {
            if (box.dataset.color === radio.value) {
                box.style.borderColor = '#0066cc';
                box.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
            } else {
                box.style.borderColor = '#e0e0e0';
                box.style.boxShadow = 'none';
            }
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

        // Reset to intro view when switching tabs - with proper opacity reset
        document.querySelectorAll('.mode-intro').forEach(intro => {
            intro.style.display = 'block';
            intro.style.opacity = '1';
            intro.style.transform = 'translateY(0)';
        });
        document.querySelectorAll('.app-selection-flow').forEach(flow => {
            flow.style.display = 'none';
            flow.style.opacity = '1';
            flow.style.transform = 'translateY(0)';
        });
    });
});

// Flow navigation for Allow Mode
const allowAppsBtn = document.getElementById('allow-apps-btn');
const allowSelection = document.getElementById('allow-selection');
const allowContinue = document.getElementById('allow-continue');

if (allowAppsBtn) {
    allowAppsBtn.addEventListener('click', () => {
        const introSection = allowAppsBtn.parentElement;

        // Add transition before fading
        introSection.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

        // Fade out intro
        introSection.style.opacity = '0';
        introSection.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            introSection.style.display = 'none';

            // Prepare selection for fade in
            allowSelection.style.display = 'block';
            allowSelection.style.opacity = '0';
            allowSelection.style.transform = 'translateY(20px)';

            // Trigger reflow
            allowSelection.offsetHeight;

            // Fade in selection
            allowSelection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            allowSelection.style.opacity = '1';
            allowSelection.style.transform = 'translateY(0)';
        }, 300);
    });
}

// Flow navigation for Block Mode
const blockAppsBtn = document.getElementById('block-apps-btn');
const blockSelection = document.getElementById('block-selection');
const blockContinue = document.getElementById('block-continue');

if (blockAppsBtn) {
    blockAppsBtn.addEventListener('click', () => {
        const introSection = blockAppsBtn.parentElement;

        // Add transition before fading
        introSection.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

        // Fade out intro
        introSection.style.opacity = '0';
        introSection.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            introSection.style.display = 'none';

            // Prepare selection for fade in
            blockSelection.style.display = 'block';
            blockSelection.style.opacity = '0';
            blockSelection.style.transform = 'translateY(20px)';

            // Trigger reflow
            blockSelection.offsetHeight;

            // Fade in selection
            blockSelection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            blockSelection.style.opacity = '1';
            blockSelection.style.transform = 'translateY(0)';
        }, 300);
    });
}

// Back button functionality
document.querySelectorAll('.back-to-intro').forEach(btn => {
    btn.addEventListener('click', () => {
        const flow = btn.closest('.app-selection-flow');
        const intro = flow.parentElement.querySelector('.mode-intro');

        // Add transition before fading
        flow.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

        // Fade out current flow
        flow.style.opacity = '0';
        flow.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            flow.style.display = 'none';

            // Prepare intro for fade in
            intro.style.display = 'block';
            intro.style.opacity = '0';
            intro.style.transform = 'translateY(20px)';

            // Trigger reflow
            intro.offsetHeight;

            // Fade in intro
            intro.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            intro.style.opacity = '1';
            intro.style.transform = 'translateY(0)';
        }, 300);
    });
});

// Continue to device selection
document.querySelectorAll('.continue-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Scroll to device selection
        const deviceSection = document.querySelector('.model-selection');
        if (deviceSection) {
            deviceSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Add custom website blocking functionality
const customWebsiteInput = document.getElementById('custom-website-input');
const addWebsiteBtn = document.getElementById('add-website-btn');
const blockedWebsitesList = document.getElementById('blocked-websites-list');

function addCustomWebsite() {
    const website = customWebsiteInput.value.trim();

    if (website) {
        // Clean up the URL - remove http/https and www if present
        let cleanedWebsite = website
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/\/$/, '');

        // Check if website already exists
        const existingWebsites = Array.from(document.querySelectorAll('#blocked-websites-list span')).map(span => span.textContent);
        if (existingWebsites.includes(cleanedWebsite)) {
            customWebsiteInput.value = '';
            return;
        }

        // Create new label element
        const newLabel = document.createElement('label');
        newLabel.innerHTML = `
            <input type="checkbox" checked class="social-website custom-added-website">
            <span>${cleanedWebsite}</span>
        `;

        // Add to the list
        blockedWebsitesList.appendChild(newLabel);

        // Clear input
        customWebsiteInput.value = '';
    }
}

if (addWebsiteBtn) {
    addWebsiteBtn.addEventListener('click', addCustomWebsite);
}

if (customWebsiteInput) {
    customWebsiteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomWebsite();
        }
    });
}

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


// Shopify Integration
const SHOPIFY_STORE_URL = 'coventry-labs-llc.myshopify.com'; // Your Shopify store

// Variant IDs from Shopify
const VARIANT_IDS = {
    'iphone-16e': {
        'black': '47506004279550', // iPhone 16e 128GB - Black
        'white': '47506004312318'  // iPhone 16e 128GB - White
    },
    'refurbished': {
        '128': '47506007294206' // Refurbished iPhone
    },
    'ship-in': {
        'service': '47492615405823' // Ship-in service variant (you'll need to create this in Shopify)
    }
};

// Collect configuration based on current mode
function collectConfiguration() {
    const activeTab = document.querySelector('.tab-content.active').id;
    const isWhitelistMode = activeTab === 'whitelist-tab';

    if (isWhitelistMode) {
        // Whitelist mode: collect allowed apps
        const allowedApps = [];
        const bundleIds = [];

        // Get essential apps if checked
        document.querySelectorAll('.essential-app:checked').forEach(checkbox => {
            const appName = checkbox.nextElementSibling.textContent.trim();
            const bundleId = checkbox.getAttribute('data-bundle-id');
            allowedApps.push(appName);
            if (bundleId) {
                bundleIds.push(`${appName}: ${bundleId}`);
            }
        });

        // Get apps from App Store search if available
        if (window.appStoreSearch) {
            const searchedApps = window.appStoreSearch.getSelectedApps('whitelist');
            searchedApps.forEach(app => {
                allowedApps.push(app.name);
                bundleIds.push(`${app.name}: ${app.bundleId}`);
            });
        }

        return {
            mode: 'whitelist',
            allowedApps: allowedApps,
            bundleIds: bundleIds,
            blockedApps: [], // Everything else is blocked
            blockedWebsites: [] // All non-essential websites blocked
        };
    } else {
        // Blacklist mode: collect blocked items
        const blockedApps = [];
        const bundleIds = [];
        const blockedWebsites = [];

        // Get social media apps if checked
        document.querySelectorAll('.social-app:checked').forEach(checkbox => {
            const appName = checkbox.nextElementSibling.textContent.trim();
            const bundleId = checkbox.getAttribute('data-bundle-id');
            blockedApps.push(appName);
            if (bundleId) {
                bundleIds.push(`${appName}: ${bundleId}`);
            }
        });

        // Get blocked websites if checked
        document.querySelectorAll('.social-website:checked').forEach(checkbox => {
            blockedWebsites.push(checkbox.nextElementSibling.textContent.trim());
        });

        // Get apps from App Store search if available
        if (window.appStoreSearch) {
            const searchedApps = window.appStoreSearch.getSelectedApps('blacklist');
            searchedApps.forEach(app => {
                blockedApps.push(app.name);
                bundleIds.push(`${app.name}: ${app.bundleId}`);
            });
        }

        return {
            mode: 'blacklist',
            allowedApps: [], // Everything else is allowed
            blockedApps: blockedApps,
            bundleIds: bundleIds,
            blockedWebsites: blockedWebsites
        };
    }
}

// Package functionality removed - apps are now shown individually
document.addEventListener('DOMContentLoaded', () => {
    // Apps are displayed directly without package grouping
    const essentialApps = document.querySelectorAll('.essential-app');
    const socialApps = document.querySelectorAll('.social-app');
    const socialWebsites = document.querySelectorAll('.social-website');

    // All package-related functionality has been removed
    // Apps are now shown individually without grouping or expand/collapse

    // Handle device card selection
    const modelCards = document.querySelectorAll('.model-card');
    const shipInInfo = document.querySelector('.ship-in-info');

    modelCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all cards
            modelCards.forEach(c => c.classList.remove('active'));
            // Add active to clicked card
            card.classList.add('active');

            // Show/hide ship-in info
            if (shipInInfo) {
                if (card.getAttribute('data-model') === 'ship-in') {
                    shipInInfo.style.display = 'block';
                } else {
                    shipInInfo.style.display = 'none';
                }
            }
        });
    });

    // Set initial active state (default to iPhone 16e)
    const defaultCard = document.querySelector('.model-card[data-model="iphone-16e"]');
    if (defaultCard) {
        defaultCard.classList.add('active');
    }
});

// Get selected iPhone model
function getSelectedModel() {
    const selectedCard = document.querySelector('.model-card.active');
    if (!selectedCard) {
        // Default to iPhone 16e black if nothing selected
        return {
            display: 'iPhone 16e 128GB (Black) - $949.99',
            model: 'iphone-16e',
            color: 'black',
            variantId: VARIANT_IDS['iphone-16e']['black'],
            price: 949.99
        };
    }

    const model = selectedCard.getAttribute('data-model');
    const price = parseFloat(selectedCard.getAttribute('data-price'));

    if (model === 'refurbished') {
        return {
            display: 'Refurbished iPhone (Black) - $449.99',
            model: 'refurbished',
            color: 'black',
            storage: '128',
            variantId: VARIANT_IDS['refurbished']['128'],
            price: price
        };
    } else if (model === 'ship-in') {
        return {
            display: 'Ship-In Service - $199',
            model: 'ship-in',
            storage: 'service',
            variantId: VARIANT_IDS['ship-in']['service'],
            price: 199
        };
    } else if (model === 'iphone-16e') {
        // Get selected color
        const selectedColor = document.querySelector('input[name="iphone-color"]:checked')?.value || 'black';
        const colorDisplay = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);
        return {
            display: `iPhone 16e 128GB (${colorDisplay}) - $949.99`,
            model: 'iphone-16e',
            color: selectedColor,
            variantId: VARIANT_IDS['iphone-16e'][selectedColor],
            price: 949.99
        };
    } else {
        return {
            display: 'iPhone 16e 128GB (Black) - $949.99',
            model: 'iphone-16e',
            color: 'black',
            variantId: VARIANT_IDS['iphone-16e']['black'],
            price: 949.99
        };
    }
}

// Create order notes
function createOrderNotes() {
    const config = collectConfiguration();
    const modelInfo = getSelectedModel();

    let notes = '=== COREPHONE CONFIGURATION ===\n\n';
    notes += `DEVICE OPTION: ${modelInfo.display}\n`;
    if (modelInfo.model === 'ship-in') {
        notes += `SERVICE TYPE: Configuration Service Only\n`;
        notes += `CUSTOMER WILL SHIP: Their existing iPhone\n`;
    }
    notes += `\n`;
    notes += `MODE: ${config.mode.toUpperCase()}\n\n`;

    if (config.mode === 'whitelist') {
        notes += `ALLOWED APPS ONLY (${config.allowedApps.length}):\n`;
        notes += config.allowedApps.length > 0 ? config.allowedApps.join('\n') : 'None';
        notes += '\n\n';
        notes += `BUNDLE IDS FOR MDM CONFIGURATION:\n`;
        notes += config.bundleIds.length > 0 ? config.bundleIds.join('\n') : 'None';
        notes += '\n\n';
        notes += 'ALL OTHER APPS AND WEBSITES: BLOCKED';
    } else {
        notes += `BLOCKED APPS (${config.blockedApps.length}):\n`;
        notes += config.blockedApps.length > 0 ? config.blockedApps.join('\n') : 'None';
        notes += '\n\n';
        notes += `BUNDLE IDS FOR MDM CONFIGURATION:\n`;
        notes += config.bundleIds.length > 0 ? config.bundleIds.join('\n') : 'None';
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
        summaryPrice.textContent = pricePart || '$949.99';
    }

    // Update mode section
    const modeDesc = document.getElementById('mode-description');
    if (config.mode === 'whitelist') {
        modeDesc.textContent = 'Allow List Mode - Only allow specific apps';
        modeDesc.className = 'mode-badge whitelist';
    } else {
        modeDesc.textContent = 'Block List Mode - Block specific apps';
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
        blockedSection.innerHTML = '<h3>Everything Else</h3><p style="color: #666; margin: 0;">All apps and websites not listed above will be permanently blocked.</p>';
    }

    // Show modal
    modal.classList.add('show');
}

// Handle all add-to-cart buttons using event delegation
document.addEventListener('click', function(e) {
    // Check if clicked element or its parent is an add-to-cart button
    const button = e.target.closest('.add-to-cart');

    if (button) {
        e.preventDefault();

        // Check if it's a scroll button or the config button
        if (button.classList.contains('scroll-to-config')) {
            // Scroll to configuration section
            document.querySelector('.app-config').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (button.classList.contains('config-button') || button.classList.contains('large')) {
            // Show confirmation modal for checkout buttons
            try {
                showConfirmationModal();
            } catch (error) {
                console.error('Error showing modal:', error);
                // Fallback: reload and try again
                location.reload();
            }
        }
    }
});

// Modal close button
document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('confirmation-modal').classList.remove('show');
});

// Modal edit button - using event delegation to handle dynamically created content
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'modal-edit') {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.remove('show');

        // Check if we need to restore the modal (after checkout success)
        const modalBody = document.querySelector('.modal-body');
        if (modalBody && modalBody.querySelector('svg')) {
            // Modal was replaced with success message, reload to restore
            location.reload();
            return;
        }

        // Scroll to configuration section for editing
        const appConfig = document.querySelector('.app-config');
        if (appConfig) {
            setTimeout(() => {
                appConfig.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
});

// Modal checkout button - using event delegation
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'modal-checkout') {
        const orderNotes = createOrderNotes();
        const config = collectConfiguration();
        const modelInfo = getSelectedModel();
        console.log('Order Notes:', orderNotes);
        console.log('Selected Model:', modelInfo);

        // Create a form and submit it to Shopify in a new tab
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://${SHOPIFY_STORE_URL}/cart/add`;
        form.target = '_blank'; // Open in new tab

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
        modeInput.value = config.mode === 'whitelist' ? 'Allow List (Safest)' : 'Block List (Flexible)';
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

        // Remove form after submission
        setTimeout(() => {
            form.remove();
        }, 100);

        // Show success message in modal body while preserving modal structure
        const modalBody = document.querySelector('.modal-body');
        const modalHeader = document.querySelector('.modal-header');
        const modalFooter = document.querySelector('.modal-footer');

        // Hide header and footer for success message
        if (modalHeader) modalHeader.style.display = 'none';
        if (modalFooter) modalFooter.style.display = 'none';

        if (modalBody) {
            modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style="margin-bottom: 20px;">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 style="margin-bottom: 10px;">Added to Cart!</h2>
                <p style="color: #666; margin-bottom: 30px;">Your CorePhone configuration has been added to the cart. The cart opened in a new tab.</p>
                <button class="btn btn-primary" id="continue-shopping">Continue Shopping</button>
                <button class="btn btn-secondary" style="margin-left: 10px;" id="close-success">Close</button>
            </div>
        `;

        // Add event listeners for the new buttons
        document.getElementById('continue-shopping').addEventListener('click', () => {
            location.reload();
        });

        document.getElementById('close-success').addEventListener('click', () => {
            document.getElementById('confirmation-modal').classList.remove('show');
            // Reload to restore modal structure
            setTimeout(() => {
                location.reload();
            }, 300);
        });
        }
    }
});