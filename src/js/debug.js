// debug.js - Tool for diagnosing issues in production
export function setupDebugLogging() {
    // Only setup in production environment (Netlify)
    if (!window.location.hostname.includes('netlify')) {
        console.log("Debug panel not enabled for local development");
        return { logDebug: console.log };
    }
    
    console.log("Setting up debug panel for Netlify environment");
    
    // Create a debug display element
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debug-panel';
    debugDiv.style.position = 'fixed';
    debugDiv.style.bottom = '0';
    debugDiv.style.right = '0';
    debugDiv.style.padding = '10px';
    debugDiv.style.background = 'rgba(0,0,0,0.7)';
    debugDiv.style.color = 'white';
    debugDiv.style.fontSize = '12px';
    debugDiv.style.maxHeight = '200px';
    debugDiv.style.overflowY = 'auto';
    debugDiv.style.zIndex = '9999';
    debugDiv.style.maxWidth = '50%';
    
    // Toggle button to show/hide debug info
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Debug';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '0';
    toggleButton.style.right = '0';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.background = '#f0a868';
    toggleButton.style.border = 'none';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.cursor = 'pointer';
    
    let showing = false;
    toggleButton.addEventListener('click', () => {
        showing = !showing;
        debugDiv.style.display = showing ? 'block' : 'none';
    });
    
    // Hide debug initially
    debugDiv.style.display = 'none';
    
    document.body.appendChild(debugDiv);
    document.body.appendChild(toggleButton);
    
    // Function to log debug information
    window.logDebug = function(message, data = null) {
        const entry = document.createElement('div');
        entry.style.marginBottom = '5px';
        entry.style.borderBottom = '1px solid #555';
        
        entry.innerHTML = `
            <div><strong>${new Date().toLocaleTimeString()}</strong>: ${message}</div>
            ${data ? `<pre>${JSON.stringify(data, null, 2)}</pre>` : ''}
        `;
        
        debugDiv.appendChild(entry);
        console.log(`[DEBUG] ${message}`, data);
    };
    
    // Log environment info
    logDebug('Environment', {
        'URL': window.location.href,
        'LocalStorage available': !!window.localStorage,
        'User Agent': navigator.userAgent
    });
    
    // Test localStorage
    try {
        localStorage.setItem('debug-test', 'test');
        const testValue = localStorage.getItem('debug-test');
        logDebug('LocalStorage test', { success: testValue === 'test' });
        localStorage.removeItem('debug-test');
    } catch (e) {
        logDebug('LocalStorage test failed', e.toString());
    }
    
    // Override console.error to capture in debug panel
    const originalError = console.error;
    console.error = function() {
        originalError.apply(console, arguments);
        const args = Array.from(arguments).map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : arg
        ).join(' ');
        
        const entry = document.createElement('div');
        entry.style.color = '#ff6b6b';
        entry.style.marginBottom = '5px';
        entry.style.borderBottom = '1px solid #555';
        entry.innerHTML = `
            <div><strong>${new Date().toLocaleTimeString()} ERROR:</strong> ${args}</div>
        `;
        
        debugDiv.appendChild(entry);
    };
    
    // Add "Check Cart" button
    const checkCartButton = document.createElement('button');
    checkCartButton.textContent = 'Check Cart';
    checkCartButton.style.position = 'fixed';
    checkCartButton.style.bottom = '0';
    checkCartButton.style.right = '70px';
    checkCartButton.style.zIndex = '10000';
    checkCartButton.style.background = '#525b0f';
    checkCartButton.style.color = 'white';
    checkCartButton.style.border = 'none';
    checkCartButton.style.padding = '5px 10px';
    checkCartButton.style.cursor = 'pointer';
    
    checkCartButton.addEventListener('click', () => {
        try {
            const cartItems = JSON.parse(localStorage.getItem("so-cart") || "[]");
            logDebug("Current cart contents", { 
                count: cartItems.length,
                items: cartItems.map(item => item?.Name || "Unknown item")
            });
        } catch (e) {
            logDebug("Error checking cart", e.toString());
        }
    });
    
    document.body.appendChild(checkCartButton);
    
    return { logDebug: window.logDebug };
}