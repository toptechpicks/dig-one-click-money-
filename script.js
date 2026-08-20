// ===========================
// Configuration
// ===========================

const WALLET_ADDRESS = "0xAa3729061FFb165eC3B3fcD81399bEFF52D33F6a";
const REWARD_AMOUNT = "0.1 ETH";
const REWARD_ALTERNATIVE = "10 USDT";

// ===========================
// Claim Crypto Function
// ===========================

function claimCrypto() {
    const button = document.querySelector('.claim-button');
    
    // Disable button temporarily
    button.disabled = true;
    button.style.opacity = '0.6';
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = '⏳ Processing...';
    
    // Simulate processing delay
    setTimeout(() => {
        // Show success message
        showNotification(`🎉 Success! You've received ${REWARD_AMOUNT}!`);
        
        // Show alert
        alert(`✅ Congratulations!\n\nYou've successfully claimed ${REWARD_AMOUNT} (${REWARD_ALTERNATIVE})!\n\nThis has been sent to your wallet.\n\nWallet: ${WALLET_ADDRESS}\n\nYou can now:\n1. Check your wallet balance\n2. Trade or sell the crypto\n3. Withdraw to your bank account\n\nShare this link with friends to earn more! 🚀`);
        
        // Restore button
        button.disabled = false;
        button.style.opacity = '1';
        button.textContent = originalText;
        
        // Log the claim (for analytics)
        logClaim();
    }, 1500);
}

// ===========================
// Copy Wallet Function
// ===========================

function copyWallet() {
    const wallet = WALLET_ADDRESS;
    
    // Copy to clipboard
    navigator.clipboard.writeText(wallet).then(() => {
        showNotification('📋 Wallet address copied!');
        
        // Update button feedback
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        showNotification('❌ Failed to copy');
    });
}

// ===========================
// Notification Function
// ===========================

function showNotification(message) {
    const notification = document.getElementById('notification');
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// ===========================
// Analytics & Logging
// ===========================

function logClaim() {
    const claimData = {
        timestamp: new Date().toISOString(),
        wallet: WALLET_ADDRESS,
        reward: REWARD_AMOUNT,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
    };
    
    // Log to console (for debugging)
    console.log('Claim logged:', claimData);
    
    // You can send this data to a server here
    // Example:
    // fetch('/api/log-claim', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(claimData)
    // });
}

// ===========================
// Page Initialization
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DIG One-Click Money System loaded');
    
    // Add keyboard support for button
    document.querySelector('.claim-button').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            claimCrypto();
        }
    });
    
    // Track page views
    trackPageView();
});

// ===========================
// Page View Tracking
// ===========================

function trackPageView() {
    const visitData = {
        timestamp: new Date().toISOString(),
        page: window.location.href,
        referrer: document.referrer || 'direct'
    };
    
    console.log('Page view:', visitData);
}

// ===========================
// Utility Functions
// ===========================

// Check if wallet exists (placeholder)
function validateWallet(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Share functionality (optional)
function shareLink() {
    const url = window.location.href;
    const text = `💰 Get free crypto with DIG One-Click Money System! ${url}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'DIG One-Click Money',
            text: 'Get free cryptocurrency instantly!',
            url: url
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text);
        showNotification('📋 Link copied to clipboard!');
    }
}

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.error);
    showNotification('❌ An error occurred. Please refresh the page.');
});

// ===========================
// Service Worker Registration (Optional)
// ===========================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('sw.js')
        //     .catch(err => console.log('SW registration failed:', err));
    });
}
