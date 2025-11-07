# CorePhone Project Documentation

## Overview
CorePhone is a service that configures brand new iPhone 16e devices with permanent parental controls. Parents can either whitelist only essential apps or blacklist specific problematic apps/websites. Once configured, these restrictions cannot be bypassed.

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Hosting**: Vercel
- **E-commerce**: Shopify
- **Configuration Method**: Apple MDM (Mobile Device Management)

## Key Files
- `index.html` - Main landing page
- `styles.css` - All styling
- `script.js` - Configuration logic and Shopify integration

## Shopify Integration

### Store Details
- Store URL: `coventry-labs-llc.myshopify.com`
- Product: iPhone 16e CorePhone Configuration
- Variant ID: `47492615405822`
- Price: $799

### How Orders Work
1. Customer selects whitelist/blacklist mode
2. Chooses apps to allow/block
3. Configuration is sent as order notes to Shopify
4. Manual fulfillment: configure each iPhone based on order notes

### Order Notes Format
```
=== COREPHONE CONFIGURATION ===

IPHONE MODEL: iPhone 16e 128GB - $799

MODE: WHITELIST

ALLOWED APPS ONLY (10):
Phone
Messages
Maps
Banking Apps
...

ALL OTHER APPS AND WEBSITES: BLOCKED

Configuration Date: 11/6/2025
```

## Configuration Modes

### Whitelist Mode (Safest)
- Only explicitly allowed apps can be installed
- Everything else is permanently blocked
- Recommended essential apps pre-selected
- Best for younger children

### Blacklist Mode (Flexible)
- Only selected apps/websites are blocked
- Everything else remains available
- Common problem apps pre-selected
- Better for teens

## Key Features
- **Permanent restrictions** - Cannot be bypassed or removed
- **No subscription fees** - One-time purchase
- **Latest iPhone model** - Brand new iPhone 16e
- **Custom configuration** - Parents choose exact restrictions

## Testing Commands
```bash
# Run locally
open index.html

# Deploy to Vercel
git add .
git commit -m "Update message"
git push

# Check for brand references
grep -r "dumbphone" . --ignore-dir=.git
```

## Important Notes

### Security Consideration
The Shopify variant ID and store URL are exposed in client-side JavaScript. This means someone could theoretically add the product to cart without configuration. Solutions:
1. Hide product from online store in Shopify
2. Manually validate all orders have proper configuration notes
3. Future: Move to backend API for checkout creation

### Branding
- Changed from "Dumbphone" to "CorePhone"
- Avoid any references to "final solution" (Nazi connotation)
- Keep messaging focused on parental control and child safety

### Mobile Optimization
- Tab buttons stack vertically on mobile
- Single column layout for app selection
- Larger touch targets (24x24px minimum)
- 16px input font to prevent iOS zoom

### Order Fulfillment Process
1. Order comes in with configuration in notes
2. Manually configure iPhone using Apple MDM
3. Install supervised profile with restrictions
4. Ship configured device to customer

## Common Tasks

### Update Shopify Product
1. Get new variant ID from Shopify admin
2. Update in `script.js` line 60
3. Test checkout flow

### Add New Apps to Lists
1. Edit `index.html` whitelist/blacklist sections
2. Add new `<label>` with checkbox and app name
3. Deploy changes

### Change Pricing
1. Update price in Shopify product
2. Update display price in confirmation modal (index.html line 492)
3. Update `getSelectedModel()` in script.js

## Deployment
Auto-deploys to Vercel on push to main branch

## Support & Maintenance
- Keep iOS version references updated
- Monitor for new social apps to add to blacklist
- Update comparison table as competitors change