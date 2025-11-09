// =======================================================
// EcoMart: Main JavaScript File (main.js)
// Version: Final Production-Ready
// =======================================================
// This file contains the foundational, globally-accessible
// scripts for the entire EcoMart website. It handles:
// 1. Core cart management (get, save, add, remove, update).
// 2. Global UI updates (header cart badge).
// 3. Global component interactions (header scroll, mobile menu).
// =======================================================


// --- [SECTION 1] CORE CART LOGIC ---
// These functions are defined in the global scope to be accessible
// from any other script file (like product.js or checkout.js).
// =======================================================

/**
 * Retrieves the user's shopping cart from localStorage.
 * @returns {Array} An array of cart item objects (e.g., [{id, quantity}]), or an empty array if no cart exists.
 */
const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

/**
 * Updates the cart badge in the header to show the total number of items.
 * This is the central function for keeping the UI in sync with the cart state.
 */
const updateCartBadge = () => {
    const cart = getCart();
    // Use reduce to sum up the quantities of all items for an accurate count.
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountDesktop = document.getElementById('cart-count');
    const cartCountMobile = document.getElementById('cart-count-mobile'); // For the mobile slide-out menu

    if (cartCountDesktop) {
        cartCountDesktop.textContent = totalItems;
        // Add a subtle animation when the count changes
        cartCountDesktop.classList.add('updated');
        setTimeout(() => cartCountDesktop.classList.remove('updated'), 300);
    }
    if (cartCountMobile) {
        cartCountMobile.textContent = totalItems;
    }
};

/**
 * Saves the provided cart array to localStorage and triggers a badge update.
 * This is the primary "commit" function for any cart modifications.
 * @param {Array} cart - The cart array to be saved.
 */
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge(); // Always update the UI after a change is saved.
};

/**
 * Adds a specified quantity of a product to the cart.
 * If the product already exists, its quantity is updated.
 * This function is attached to the global 'window' object to be easily callable.
 * @param {string} productId - The unique ID of the product to add.
 * @param {number} [quantity=1] - The number of items to add. Defaults to 1.
 */
window.addToCart = (productId, quantity = 1) => {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // Product already in cart, update its quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Product not in cart, add it as a new item
        cart.push({ id: productId, quantity: quantity });
    }

    saveCart(cart);
    console.log(`Cart updated: ${quantity} of product ${productId} added.`);
};

/**
 * Updates the quantity of a specific product already in the cart.
 * @param {string} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the product.
 */
window.updateCartQuantity = (productId, newQuantity) => {
    let cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (newQuantity > 0) {
            cart[productIndex].quantity = newQuantity;
        } else {
            // If new quantity is 0 or less, remove the item
            cart.splice(productIndex, 1);
        }
        saveCart(cart);
        console.log(`Cart updated: Product ${productId} quantity set to ${newQuantity}.`);
    }
};

/**
 * Removes a product entirely from the cart, regardless of quantity.
 * @param {string} productId - The ID of the product to remove.
 */
window.removeFromCart = (productId) => {
    let cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    
    saveCart(updatedCart);
    console.log(`Cart updated: Product ${productId} removed from cart.`);
};


// --- [SECTION 2] GLOBAL EVENT LISTENERS & UI SETUP ---
// This runs once the basic HTML document structure is loaded.
// It sets up interactions for components present on ALL pages.
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Handles the header's visual transition on page scroll.
     * The header starts transparent (on pages with a hero) and becomes solid.
     */
    const handleHeaderScroll = () => {
        const header = document.getElementById('main-header');
        if (!header) return;

        // On pages without a hero (like product/checkout), the header might start with .scrolled.
        // This logic correctly handles both cases.
        const scrollThreshold = 50; 
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                // We only remove 'scrolled' if the header doesn't have a 'no-transparent' class.
                // This is a safety for pages that should always have a solid header.
                if(!header.classList.contains('no-transparent')) {
                     header.classList.remove('scrolled');
                }
            }
        });
    };

    /**
     * Initializes the entire mobile navigation system.
     * It dynamically creates the menu, appends it, and sets up all event listeners.
     */
    const initializeMobileMenu = () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (!mobileMenuBtn || document.querySelector('.mobile-nav-overlay')) return;

        const mobileNav = document.createElement('div');
        mobileNav.classList.add('mobile-nav-overlay');

mobileNav.innerHTML = `
            <div class="mobile-nav-content">
                <button class="close-btn" aria-label="Close Menu">&times;</button>
                
                <!-- Main Navigation -->
                <nav class="mobile-nav-links">
                    <a href="#">COLLECTIONS</a>
                    <a href="#">NEW ARRIVALS</a>
                    <a href="#">BESTSELLERS</a>
                    <a href="#">SELL WITH US</a>
                </nav>
                
                <!-- Utility/Account Links -->
                <div class="mobile-nav-secondary">
                    <a href="#">Sign In / Register</a>
                    <a href="#">Wishlist</a>
                    <a href="#">Track Order</a>
                    <a href="#">Customer Support</a>
                    <a href="#">Store Locator</a>
                </div>
            </div>
        `;

        document.body.appendChild(mobileNav);

        const closeBtn = mobileNav.querySelector('.close-btn');
        const allLinks = mobileNav.querySelectorAll('a');

        const openMobileMenu = () => {
            mobileNav.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileMenu = () => {
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeBtn.addEventListener('click', closeMobileMenu);
        mobileNav.addEventListener('click', (event) => {
            if (event.target === mobileNav) closeMobileMenu();
        });
        allLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    };
    
    // --- Initializations on Page Load ---
    handleHeaderScroll();
    initializeMobileMenu();
    updateCartBadge(); // Ensure the cart badge is correct on every single page load.

});