// Simple interaction for custom website input
const customInput = document.querySelector('.custom-input');

if (customInput) {
    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            // Add to block list
            const blockList = e.target.parentElement.querySelector('.block-list');
            const newLabel = document.createElement('label');
            newLabel.innerHTML = `
                <input type="checkbox" checked>
                <span>${e.target.value.trim()}</span>
            `;
            blockList.appendChild(newLabel);
            e.target.value = '';
        }
    });
}

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
const SHOPIFY_STORE_URL = 'YOUR-STORE.myshopify.com'; // Replace with your store URL
const VARIANT_ID = 'YOUR-VARIANT-ID'; // Replace with your product variant ID

// Collect all blocked apps and websites
function collectBlockedItems() {
    const blockedApps = [];
    const blockedWebsites = [];

    // Get all checked app checkboxes
    document.querySelectorAll('.blocker-column:first-child input[type="checkbox"]:checked').forEach(checkbox => {
        blockedApps.push(checkbox.nextElementSibling.textContent);
    });

    // Get all checked website checkboxes
    document.querySelectorAll('.blocker-column:last-child input[type="checkbox"]:checked').forEach(checkbox => {
        blockedWebsites.push(checkbox.nextElementSibling.textContent);
    });

    // Add any custom added websites
    const customWebsites = document.querySelectorAll('.blocker-column:last-child .block-list label');
    customWebsites.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        const text = label.querySelector('span').textContent;
        if (checkbox && checkbox.checked && !blockedWebsites.includes(text)) {
            blockedWebsites.push(text);
        }
    });

    return {
        apps: blockedApps,
        websites: blockedWebsites
    };
}

// Get selected iPhone model (always iPhone 16e now)
function getSelectedModel() {
    // iPhone 16e is always selected
    return 'iPhone 16e 128GB - $799';
}

// Create order notes
function createOrderNotes() {
    const blocked = collectBlockedItems();
    const model = getSelectedModel();

    let notes = '=== DUMBPHONE CONFIGURATION ===\n\n';
    notes += `IPHONE MODEL: ${model}\n\n`;
    notes += `BLOCKED APPS (${blocked.apps.length}):\n`;
    notes += blocked.apps.length > 0 ? blocked.apps.join('\n') : 'None';
    notes += '\n\n';
    notes += `BLOCKED WEBSITES (${blocked.websites.length}):\n`;
    notes += blocked.websites.length > 0 ? blocked.websites.join('\n') : 'None';
    notes += '\n\n';
    notes += `Configuration Date: ${new Date().toLocaleDateString()}`;

    return notes;
}

// Handle main CTA buttons
document.querySelectorAll('.add-to-cart:not(.model-card button)').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const orderNotes = createOrderNotes();

        // For testing - log the order notes
        console.log('Order Notes:', orderNotes);

        // Create Shopify checkout URL with the order notes
        // This will add 1 unit of the product with the custom notes
        const checkoutUrl = `https://${SHOPIFY_STORE_URL}/cart/${VARIANT_ID}:1?note=${encodeURIComponent(orderNotes)}`;

        // Uncomment this line when ready to go live:
        // window.location.href = checkoutUrl;

        // For now, just alert the user
        alert('Ready to checkout!\n\nPlease update the SHOPIFY_STORE_URL and VARIANT_ID in script.js with your Shopify details.\n\nOrder notes will include:\n' + orderNotes);
    });
});