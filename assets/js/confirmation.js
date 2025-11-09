document.addEventListener('DOMContentLoaded', () => {
    const confirmationContainer = document.getElementById('confirmation-content');
    if (!confirmationContainer) return;

    const orderData = JSON.parse(sessionStorage.getItem('finalizedOrder'));

    const renderConfirmation = () => {
        let contentHtml = '';

        if (!orderData) {
            contentHtml = `
                <div class="confirmation-box">
                    <h2>No Order Found</h2>
                    <p>We couldn't find any recent order information.</p>
                    <a href="index.html" class="cta-button">Return to Homepage</a>
                </div>`;
        } else {
            let itemsHtml = '';
            orderData.items.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    itemsHtml += `
                        <div class="summary-item">
                            <img src="${product.image.thumbnail}" alt="${product.name}" class="summary-item-img">
                            <div class="summary-item-details">
                                <p class="summary-item-title">${product.name}</p>
                                <p class="summary-item-qty">Qty: ${item.quantity}</p>
                            </div>
                            <p class="summary-item-price">$${(product.price * item.quantity).toFixed(2)}</p>
                        </div>`;
                }
            });

            contentHtml = `
                <div class="confirmation-box">
                    <div class="confirmation-icon" data-animation="pop-in">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h2 data-animation="fade-in-up" data-delay="100">Thank You For Your Order!</h2>
                    <p data-animation="fade-in-up" data-delay="200">Your order <strong id="order-number">#${orderData.orderId}</strong> has been successfully placed.</p>
                    
                    <div class="order-summary-box" data-animation="fade-in-up" data-delay="300">
                        <h3>Order Summary</h3>
                        <div class="order-items-summary">${itemsHtml}</div>
                        <div class="summary-line total">
                            <span>Total Paid</span>
                            <strong id="order-total-paid">$${orderData.total.toFixed(2)}</strong>
                        </div>
                    </div>

                    <div class="confirmation-actions" data-animation="fade-in-up" data-delay="400">
                        <a href="index.html" class="place-order-btn primary">Continue Shopping</a>
                        <a href="#" class="place-order-btn secondary">View Order Details</a>
                    </div>
                </div>`;
        }

        confirmationContainer.innerHTML = contentHtml;
        
        // --- Trigger Staggered Animations ---
        const animatedElements = confirmationContainer.querySelectorAll('[data-animation]');
        animatedElements.forEach(el => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, parseInt(el.dataset.delay || 0));
        });
    };
    
    renderConfirmation();
});