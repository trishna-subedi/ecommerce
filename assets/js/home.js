// =======================================================
// EcoMart: Home Page JavaScript (home.js)
// Version: Final Production-Ready
// =======================================================
// This file contains all scripts specific to the home page, including:
// 1. The initialization for the Collections Carousel (Swiper.js).
// 2. The dynamic rendering and filtering for the main Product Grid.
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- [SECTION 1] COLLECTIONS CAROUSEL (SWIPER.JS) ---
    // This is the critical logic that was missing. It finds the
    // Swiper container in the HTML and activates it.
    // =======================================================
    const collectionsSwiper = new Swiper('.collections-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    const specialsSwiperContainer = document.querySelector('.specials-swiper .swiper-wrapper');

    if (specialsSwiperContainer) {
        // We'll feature the first 5 products as "specials"
        const specialProducts = products.slice(0, 5); 

        specialProducts.forEach(product => {
            const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const totalReviews = reviews.filter(r => r.productId === product.id).length;

            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="special-product-card">
                    <a href="product.html?id=${product.id}" class="special-product-image-link">
                        <img src="${product.image.thumbnail}" alt="${product.name}">
                        <span class="special-price-badge">Special Price in Progress</span>
                    </a>
                    <div class="special-product-info">
                        <h4 class="special-product-title">${product.name}</h4>
                        <p class="special-product-price">$${product.price.toFixed(2)}</p>
                        <p class="special-product-discount">Wow Discount Price ${discountPercent}%</p>
                        <div class="special-product-rating">
                            <span class="stars">${'★'.repeat(Math.round(product.avgRating))}${'☆'.repeat(5 - Math.round(product.avgRating))}</span>
                            <span class="review-count">(${totalReviews.toLocaleString()})</span>
                        </div>
                    </div>
                </div>
            `;
            specialsSwiperContainer.appendChild(slide);
        });
        
        // Now, initialize Swiper for this new carousel
        const specialsSwiper = new Swiper('.specials-swiper', {
            slidesPerView: 2,
            spaceBetween: 15,
            breakpoints: {
                640: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
                1280: { slidesPerView: 5, spaceBetween: 30 },
            },
            pagination: {
                el: '.specials-pagination',
                type: 'fraction', // This creates the "1 / 5" style
            },
            navigation: {
                nextEl: '.specials-next',
                prevEl: '.specials-prev',
            },
        });
    }

    // --- [SECTION 2] PRODUCT GRID & FILTERING LOGIC ---
    // =======================================================
    const productGrid = document.getElementById('product-grid');
    const filterButtonsContainer = document.getElementById('filter-buttons');

    /**
     * [REFINED] State-of-the-Art Product Rendering Function
     * Renders the product cards with the premium, animated design.
     */
    const renderProducts = (productArray) => {
        productGrid.innerHTML = '';

        if (!productArray || productArray.length === 0) {
            productGrid.innerHTML = '<p class="no-products-found">No products found matching your criteria.</p>';
            return;
        }

        productArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const categoryDisplay = product.category.charAt(0).toUpperCase() + product.category.slice(1);
            
            productCard.innerHTML = `
                <div class="product-card-image-container">
                    <a href="product.html?id=${product.id}" class="product-image-link">
                        <img src="${product.image.thumbnail}" alt="${product.name}" class="product-image">
                    </a>
                    <div class="product-card-hover-actions">
                        <button class="action-btn" aria-label="Add to Wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                        </button>
                        <button class="action-btn" aria-label="Quick View">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </button>
                    </div>
                </div>
                <div class="product-card-info">
                    <p class="product-category">${categoryDisplay}</p>
                    <h4 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h4>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-reveal-btn">
                         <span class="btn-text">Add to Cart</span>
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    };

    /**
     * Handles the logic for filtering products when a category button is clicked.
     */
    const filterProducts = (event) => {
        if (event.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const category = event.target.dataset.category;
            
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts);
            }
        }
    };

    if (filterButtonsContainer) {
        filterButtonsContainer.addEventListener('click', filterProducts);
    }

    // --- [SECTION 3] INITIAL RENDER ---
    // This ensures that when the homepage loads, the product grid is populated.
    if (productGrid) {
        renderProducts(products);
    }
});