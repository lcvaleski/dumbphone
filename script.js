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