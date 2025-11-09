// =======================================================
// EcoMart: Cart Review Page JavaScript (checkout.js)
// Version: Final Production-Ready
// =======================================================
// This script handles logic ONLY for the Cart Review page.
// Its job is to display the cart and allow modifications.
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- [SECTION 1] VALIDATION & SELECTORS ---
    const checkoutPage = document.querySelector('.checkout-page');
    // More specific check: Ensure this is the review page, NOT the payment page.
    if (!checkoutPage || document.getElementById('payment-form')) return;

    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.querySelector('.cart-empty-message');
    const proceedBtn = document.getElementById('proceed-to-payment-btn');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    // --- [SECTION 2] CORE RENDER FUNCTION ---
    const renderCartReview = () => {
        const cart = getCart(); // From global main.js

        // PATCHED (Silent Bug Fix): Safely remove only the item cards, not the empty message container.
        cartItemsContainer.querySelectorAll('.cart-item-card').forEach(card => card.remove());

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            proceedBtn.classList.add('disabled'); // Use a class to "disable" a link
            updateSummary(0);
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        proceedBtn.classList.remove('disabled'); // Enable the link
        
        let currentSubtotal = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            currentSubtotal += product.price * item.quantity;

            const card = document.createElement('div');
            card.className = 'cart-item-card';
            card.dataset.productId = item.id;
            card.innerHTML = `
                <div class="cart-item-image"><img src="${product.image.thumbnail}" alt="${product.name}"></div>
                <div class="cart-item-details">
                    <h4 class="item-title">${product.name}</h4>
                    <p class="item-price">$${product.price.toFixed(2)}</p>
                    <button class="item-remove-btn">Remove</button>
                </div>
                <div class="cart-item-quantity">
                     <div class="quantity-selector-checkout">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <input type="text" value="${item.quantity}" readonly class="quantity-input">
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                </div>
                <div class="cart-item-total"><p>$${(product.price * item.quantity).toFixed(2)}</p></div>
            `;
            // Prepend to show the most recently added items at the top
            cartItemsContainer.prepend(card);
        });

        updateSummary(currentSubtotal);
    };

    const updateSummary = (subtotal) => {
        const shipping = subtotal > 0 ? 5.00 : 0;
        const total = subtotal + shipping;
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        shippingEl.textContent = `$${shipping.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    };

    // --- [SECTION 3] EVENT LISTENERS ---
    cartItemsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.cart-item-card');
        if (!card) return;
        const productId = card.dataset.productId;
        
        if (event.target.matches('.quantity-btn')) {
            const action = event.target.dataset.action;
            const item = getCart().find(i => i.id === productId);
            if(!item) return;
            let qty = item.quantity;

            if (action === 'increase') qty++;
            else if (action === 'decrease') qty--;
            
            window.updateCartQuantity(productId, qty); // Global function from main.js
            renderCartReview();
        }

        if (event.target.matches('.item-remove-btn')) {
            window.removeFromCart(productId); // Global function from main.js
            renderCartReview();
        }
    });

    // Add a listener to prevent the 'Proceed' link from working when disabled
    proceedBtn.addEventListener('click', (event) => {
        if(proceedBtn.classList.contains('disabled')) {
            event.preventDefault(); // Stop the navigation
        }
    });

    // --- [SECTION 4] INITIAL RENDER ---
    renderCartReview();

    // DELETED: The entire 'placeOrderBtn' event listener for finalizing the order.
    // That logic correctly belongs in payment.js, not here.
});