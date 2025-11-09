// =======================================================
// EcoMart: Payment Page JavaScript (payment.js)
// Version: Final Production-Ready
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- [SECTION 1] VALIDATION & SELECTORS ---
    if (!document.getElementById('payment-form')) return; // Ensure script runs only on the payment page

    const summaryContainer = document.getElementById('summary-container');
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const formErrorContainer = document.getElementById('form-error');

    // --- [SECTION 2] CORE RENDER & CALCULATION ---
    const renderSummary = () => {
        const cart = getCart();
        if (cart.length === 0) {
            window.location.href = 'checkout.html'; // Redirect if cart is empty
            return;
        }

        // PATCHED (Silent Bug Fix): Safely calculate subtotal
        const subtotal = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            // Only add to sum if product exists and has a valid price
            if (product && typeof product.price === 'number') {
                return sum + (product.price * item.quantity);
            }
            return sum;
        }, 0);

        const shipping = 5.00;
        const total = subtotal + shipping;

        summaryContainer.innerHTML = `
            <h2 class="summary-title">Order Summary</h2>
            <div class="summary-details">
                <div class="summary-line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                <div class="summary-line"><span>Shipping</span><span>$${shipping.toFixed(2)}</span></div>
                <div class="summary-divider"></div>
                <div class="summary-line total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
            </div>
            <button id="place-order-btn" class="place-order-btn">Pay $${total.toFixed(2)}</button>`;
        
        document.getElementById('place-order-btn').addEventListener('click', placeOrderHandler);
    };
    
    // --- [SECTION 3] FORM VALIDATION & ORDER PLACEMENT ---
    
    /**
     * Validates a form, adds/removes error classes, and returns validity.
     * @param {HTMLFormElement} form - The form element to validate.
     * @returns {boolean} - True if the form is valid, false otherwise.
     */
    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        return isValid;
    };
    
    /**
     * Shows a premium, on-page error message.
     * @param {string} message - The error message to display.
     */
    const showFormError = (message) => {
        formErrorContainer.textContent = message;
        formErrorContainer.style.display = 'block';
    };

    const placeOrderHandler = (event) => {
        event.preventDefault();
        formErrorContainer.style.display = 'none'; // Hide previous errors

        const isShippingValid = validateForm(shippingForm);
        const isPaymentValid = validateForm(paymentForm);

        // PATCHED (Silent Bug Fix): Use elegant on-page errors instead of an alert
        if (isShippingValid && isPaymentValid) {
            const cart = getCart();
            const total = parseFloat(summaryContainer.querySelector('.total span:last-child').textContent.replace('$', ''));
            
            const finalOrder = {
                orderId: `ECO-${Math.floor(Math.random() * 90000) + 10000}`,
                date: new Date().toISOString(),
                items: cart,
                total: total
            };

            sessionStorage.setItem('finalizedOrder', JSON.stringify(finalOrder));
            saveCart([]);
            window.location.href = 'confirmation.html';
        } else {
            showFormError('Please fill out all required fields in the highlighted sections.');
            window.scrollTo(0, 0); // Scroll to top to make sure error is visible
        }
    };
    
    // --- [SECTION 4] INITIALIZE CLEAVE.JS & RENDER ---
    new Cleave('#card-number', { creditCard: true, onCreditCardTypeChanged: (type) => {
        document.getElementById('card-icon').style.backgroundImage = type === 'unknown' ? '' : `url('https://checkout.stripe.com/images/brands/light/${type}.svg')`;
    }});
    new Cleave('#expiry-date', { date: true, datePattern: ['m', 'y'] });
    new Cleave('#cvc', { blocks: [3], numericOnly: true });

    renderSummary();
});