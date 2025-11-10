// =======================================================
// EcoMart: Product Detail Page JavaScript (product.js)
// Version: Final Production-Ready
// =======================================================
// This file orchestrates the entire experience for the Product Detail page.
// It is responsible for:
// 1. Fetching the correct product data based on the URL.
// 2. Dynamically rendering all page components (gallery, info, reviews).
// 3. Handling all user interactions on this page (quantity, add to cart, tabs).
// It relies on the global cart functions provided by `main.js`.
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- [SECTION 1] INITIALIZATION & PAGE VALIDATION ---
  // =======================================================

  // First, validate that we are on a product detail page. If not, stop the script.
  // This is a robust way to ensure this code doesn't run unnecessarily on other pages.
  const productDetailPage = document.querySelector(".product-detail-page");
  if (!productDetailPage) {
    return;
  }

  // --- Element Selectors ---
  const breadcrumbsContainer = document.querySelector(".breadcrumbs");
  const galleryContainer = document.getElementById("product-gallery-container");
  const infoContainer = document.querySelector(".product-info");
  const longDetailsContainer = document.querySelector(".product-long-details");

  // --- Data Fetching ---
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find((p) => p.id === productId);

  // --- Handle Product Not Found (Graceful Failure) ---
  if (!product) {
    // Clear the page and show a user-friendly "Not Found" message.
    productDetailPage.innerHTML = `
            <div class="container product-not-found">
                <h2>Product Not Found</h2>
                <p>The product you are looking for may have been moved or discontinued.</p>
                <a href="index.html" class="cta-button">Return to Homepage</a>
            </div>
        `;
    document.title = "Product Not Found - EcoMart";
    console.error(
      `Execution stopped: Product with ID "${productId}" not found in data.js.`
    );
    return;
  }

  // --- [SECTION 2] RENDER FUNCTIONS ---
  // Each function is responsible for building a specific component.
  // This modular approach keeps the code clean and easy to maintain.
  // =======================================================

  /**
   * Renders the breadcrumb navigation.
   */
  const renderBreadcrumbs = () => {
    const categoryDisplay =
      product.category.charAt(0).toUpperCase() + product.category.slice(1);
    breadcrumbsContainer.innerHTML = `
            <a href="index.html">Home</a><span class="separator">/</span>
            <a href="index.html#products">${categoryDisplay}</a><span class="separator">/</span>
            <span class="current-page">${product.name}</span>`;
  };

  /**
   * Renders the interactive image gallery with thumbnails and initializes lightGallery.
   */
  const renderImageGallery = () => {
    const mainImageWrapper = document.createElement("div");
    mainImageWrapper.className = "main-image-wrapper";
    mainImageWrapper.innerHTML = `
            <img id="main-product-image" src="${product.image.gallery[0]}" alt="${product.name}">
            <div class="gallery-zoom-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </div>`;
    galleryContainer.appendChild(mainImageWrapper);

    if (product.image.gallery.length > 1) {
      const thumbnailsWrapper = document.createElement("div");
      thumbnailsWrapper.className = "gallery-thumbnails";
      product.image.gallery.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `${product.name} - view ${index + 1}`;
        thumb.className = "thumbnail-image";
        if (index === 0) thumb.classList.add("active");

        thumb.addEventListener("click", () => {
          document.getElementById("main-product-image").src = imgSrc;
          document
            .querySelectorAll(".thumbnail-image")
            .forEach((t) => t.classList.remove("active"));
          thumb.classList.add("active");
        });
        thumbnailsWrapper.appendChild(thumb);
      });
      galleryContainer.appendChild(thumbnailsWrapper);
    }

    lightGallery(mainImageWrapper, {
      dynamic: true,
      dynamicEl: product.image.gallery.map((imgSrc) => ({
        src: imgSrc,
        thumb: imgSrc,
      })),
      plugins: [lgZoom],
      speed: 500,
      download: false,
    });
  };

  /**
   * [STATE-OF-THE-ART] Renders the main product info, now "cart-aware."
   * It conditionally renders either an "Add to Cart" or an "Update Quantity" state.
   */

  /**
   * [PATCHED & FINAL] Renders the main product info, "cart-aware."
   * This version fixes the bug where total cart quantity was shown instead of the specific item's quantity.
   */
  const renderProductInfo = () => {
    const cart = getCart(); // From global main.js
    // Find the specific item in the cart that matches the current product page
    const itemInCart = cart.find((item) => item.id === product.id);

    const categoryDisplay =
      product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const ratingHtml = `${"&#9733;".repeat(
      Math.floor(product.avgRating)
    )}${"&#9734;".repeat(5 - Math.floor(product.avgRating))}`;
    const totalReviews = reviews.filter(
      (r) => r.productId === product.id
    ).length;

    // Conditionally generate the actions HTML based on cart state
    let actionsHtml = "";
    if (itemInCart) {
      // "Update" state: Item is already in the cart
      actionsHtml = `
                <div class="quantity-selector">
                    <button class="quantity-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
                    <!-- [CRITICAL FIX] Use itemInCart.quantity for the SPECIFIC item's quantity -->
                    <input type="text" id="quantity-input" value="${itemInCart.quantity}" readonly aria-label="Current quantity">
                    <button class="quantity-btn" data-action="increase" aria-label="Increase quantity">+</button>
                </div>
                <button id="update-cart-btn-detail" class="add-to-cart-btn-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.985 5.964m0 0a8.25 8.25 0 0111.667 0l3.181 3.183" /></svg>
                    Update Quantity
                </button>
            `;
    } else {
      // "Add" state: Item is not in the cart
      actionsHtml = `
                <div class="quantity-selector">
                    <button class="quantity-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
                    <!-- The default state is always 1 -->
                    <input type="text" id="quantity-input" value="1" readonly aria-label="Current quantity">
                    <button class="quantity-btn" data-action="increase" aria-label="Increase quantity">+</button>
                </div>
                <button id="add-to-cart-btn-detail" class="add-to-cart-btn-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Add to Cart
                </button>
            `;
    }

    infoContainer.innerHTML = `
            <p class="product-category-tag">${categoryDisplay}</p>
            <h1 class="product-title-main">${product.name}</h1>
            <div class="product-rating">${ratingHtml} <a href="#reviews" class="rating-link">(${totalReviews} Reviews)</a></div>
            <p class="product-price-main">$${product.price.toFixed(2)}</p>
            <p class="product-description-short">${product.shortDescription}</p>
            <div class="product-actions">${actionsHtml}</div>
            <div class="stock-status stock-${
              product.stockStatus
            }">Status: <span>${product.stockStatus.replace(
      "-",
      " "
    )}</span></div>`;
  };

  /**
   * [PATCHED] Renders the complete tabbed section for description, specs, and reviews.
   * This version corrects the HTML assembly bug.
   */
  const renderLongDetails = () => {
    const productReviews = reviews.filter((r) => r.productId === product.id);

    // --- 1. Generate all dynamic HTML parts ---

    let specsHtml = '<ul class="spec-list">';
    product.specifications.forEach((spec) => {
      specsHtml += `<li><strong>${spec.key}:</strong> ${spec.value}</li>`;
    });
    specsHtml += "</ul>";

    let reviewSummaryHtml = "";
    if (productReviews.length > 0) {
      const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      productReviews.forEach((r) => ratingCounts[r.rating]++);
      reviewSummaryHtml = `
                <div class="review-summary">
                    <div class="summary-overview">
                        <p class="overview-rating">${product.avgRating.toFixed(
                          1
                        )}</p>
                        <p class="overview-total">${
                          productReviews.length
                        } Reviews</p>
                    </div>
                    <div class="summary-bars">
                        ${[5, 4, 3, 2, 1]
                          .map(
                            (star) =>
                              `<div class="bar-item"><span class="bar-label">${star} star</span><div class="bar-container"><div class="bar-fill" style="width: ${
                                (ratingCounts[star] / productReviews.length) *
                                100
                              }%;"></div></div><span class="bar-count">${
                                ratingCounts[star]
                              }</span></div>`
                          )
                          .join("")}
                    </div>
                </div>`;
    }

    let reviewCardsHtml =
      '<div id="review-list-container" class="review-list">';
    if (productReviews.length > 0) {
      productReviews.forEach((review) => {
        reviewCardsHtml += `
                    <div class="review-card">
                        <div class="review-header">
                            <div class="review-author-info">
                                <strong class="review-author">${
                                  review.author
                                }</strong>
                                ${
                                  review.verifiedPurchase
                                    ? '<span class="verified-badge">Verified Purchase</span>'
                                    : ""
                                }
                            </div>
                            <span class="review-date">${new Date(
                              review.date
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</span>
                        </div>
                        <div class="review-rating">${"★".repeat(
                          Math.floor(review.rating)
                        )}${"☆".repeat(5 - Math.floor(review.rating))}</div>
                        <h5 class="review-title">${review.title}</h5>
                        <p class="review-text">${review.text}</p>
                    </div>`;
      });
    }
    reviewCardsHtml += "</div>";

    const reviewFormHtml = `
            <div class="review-submission-area">
                <div class="review-form-header">
                    <h3>Share Your Thoughts</h3>
                    <button id="write-review-btn" class="cta-button secondary">Write a Review</button>
                </div>
                <div id="review-form-container" class="review-form-container">
                    <form id="review-form" class="review-form" novalidate>
  
                            <div class="form-group-stars">
                            <label>Your rating</label>
                            <div class="star-rating-input">
                                <span data-value="5">☆</span><span data-value="4">☆</span><span data-value="3">☆</span><span data-value="2">☆</span><span data-value="1">☆</span>
                            </div>
                            <input type="hidden" name="rating" id="rating-value" value="0" required>
                            </div>

                            <!-- Move textarea INTO the grid and mark it full-width so it occupies the first row -->
                            <div class="form-grid">
                            <div class="form-group " style="display: block;">
                                <label for="review-text">Your review</label>
                                <textarea id="review-text" name="review" rows="6" cols="10" required></textarea>
                            </div>

                            <div>


                            </div>

                            <div class="form-group" style="padding-right: 20px;">
                                <label for="author-name">Name</label>
                                <input type="text" id="author-name" name="author" required>
                            </div>

                            <div class="form-group" style="padding-right: 20px;">
                                <label for="author-email">Email</label>
                                <input type="email" id="author-email" name="email" required>
                            </div>
                            </div>


                        <div id="review-form-error" class="form-error-message" style="display: none;"></div>
                        <button type="submit" class="cta-button primary">Submit Review</button>
                    </form>
                </div>
                <div id="review-success-message" class="review-success-message" style="display: none;">
                    <h4>Thank you for your review!</h4><p>Your contribution helps our community.</p>
                </div>
            </div>`;

    // --- 2. [CRITICAL FIX] Assemble all parts into the final, complete HTML structure ---
    longDetailsContainer.innerHTML = `
            <div class="tabs-container">
                <div class="tab-buttons">
                    <button class="tab-btn active" data-tab="description">Description</button>
                    <button class="tab-btn" data-tab="specs">Specifications</button>
                    <button class="tab-btn" data-tab="reviews">Reviews (${
                      productReviews.length
                    })</button>
                </div>
                <div class="tab-content">
                    <div id="tab-description" class="tab-pane active">
                        <p>${product.description}</p>
                    </div>
                    <div id="tab-specs" class="tab-pane">
                        ${specsHtml}
                    </div>
                    <div id="tab-reviews" class="tab-pane">
                        ${productReviews.length > 0 ? reviewSummaryHtml : ""}
                        ${reviewFormHtml}
                        ${reviewCardsHtml}
                    </div>
                </div>
            </div>`;
  };

  /**
   * Sets up all event listeners for interactive elements on the page.
   */
  const setupEventListeners = () => {
    // --- Quantity Selector Listeners ---
    const quantityInput = document.getElementById("quantity-input");
    const decreaseBtn = document.querySelector(
      '.quantity-btn[data-action="decrease"]'
    );
    const increaseBtn = document.querySelector(
      '.quantity-btn[data-action="increase"]'
    );

    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", () => {
        let val = parseInt(quantityInput.value);
        if (val > 1) quantityInput.value = val - 1;
      });
    }
    if (increaseBtn) {
      increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
    }

    // --- [NEW] Context-Aware Cart Button Listeners ---
    const addToCartBtn = document.getElementById("add-to-cart-btn-detail");
    const updateCartBtn = document.getElementById("update-cart-btn-detail");

    if (addToCartBtn) {
      // This runs if the "Add" button exists
      addToCartBtn.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);
        window.addToCart(product.id, quantity); // Call global add function

        // Re-render the entire info block to switch to the "Update" state instantly
        renderProductInfo();
        // We must re-run this function to attach the listener to the *newly created* update button
        setupEventListeners();
      });
    }

    if (updateCartBtn) {
      // This runs if the "Update" button exists
      updateCartBtn.addEventListener("click", () => {
        const newQuantity = parseInt(quantityInput.value);
        window.updateCartQuantity(product.id, newQuantity); // Call global update function

        // Provide premium visual feedback
        updateCartBtn.innerHTML = " Updating....";
        updateCartBtn.classList.add("added");
        setTimeout(() => {
          // Re-render to show the correct state and button text again
          renderProductInfo();
          setupEventListeners();
        }, 1500);
      });
    }

    // --- Tab Switching Listeners ---
    const tabButtons = longDetailsContainer.querySelectorAll(".tab-btn");
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.dataset.tab;

        longDetailsContainer
          .querySelectorAll(".tab-btn")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        longDetailsContainer.querySelectorAll(".tab-pane").forEach((pane) => {
          pane.classList.toggle("active", pane.id === `tab-${tabId}`);
        });
      });
    });
    const writeReviewBtn = document.getElementById("write-review-btn");
    const reviewFormContainer = document.getElementById(
      "review-form-container"
    );
    const reviewForm = document.getElementById("review-form");
    const starRatingInput = document.querySelector(".star-rating-input");
    const ratingValueInput = document.getElementById("rating-value");

    if (writeReviewBtn) {
      writeReviewBtn.addEventListener("click", () => {
        reviewFormContainer.classList.toggle("is-open");
        writeReviewBtn.textContent = reviewFormContainer.classList.contains(
          "is-open"
        )
          ? "Cancel"
          : "Write a Review";
      });
    }


    if (starRatingInput) {
        const stars = Array.from(starRatingInput.children); // No longer need to reverse here

        // Create a single, reliable function for visual updates
        const updateStarsVisual = (ratingValue) => {
            stars.forEach(star => {
                // The stars are in order 5, 4, 3, 2, 1 in the HTML.
                // So, a star should be filled if its value is LESS THAN OR EQUAL to the rating.
                star.textContent = star.dataset.value <= ratingValue ? '★' : '☆';
            });
        };

        starRatingInput.addEventListener("mouseover", (e) => {
            const hoverValue = e.target.dataset.value;
            if (hoverValue) {
                updateStarsVisual(hoverValue); // Update visuals on hover
            }
        });

        starRatingInput.addEventListener("mouseout", () => {
            // On mouseout, revert the visuals to the actual stored value
            updateStarsVisual(ratingValueInput.value); 
        });

        starRatingInput.addEventListener("click", (e) => {
            const selectedValue = e.target.dataset.value;
            if (selectedValue) {
                // Set the hidden input's value
                ratingValueInput.value = selectedValue;
                // And permanently update the visuals to match the click
                updateStarsVisual(selectedValue);
            }
        });
    }

    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const errorContainer = document.getElementById("review-form-error");
        errorContainer.style.display = "none";

        // Simple Validation
        if (
          ratingValueInput.value === "0" ||
          !document.getElementById("review-text").value.trim() ||
          !document.getElementById("author-name").value.trim()
        ) {
          errorContainer.textContent =
            "Please provide a rating, a review, and your name.";
          errorContainer.style.display = "block";
          return;
        }

        // --- Optimistic UI Update ---
        const newReview = {
          author: document.getElementById("author-name").value,
          rating: parseInt(ratingValueInput.value),
          title: "Just reviewed!", // Placeholder title
          text: document.getElementById("review-text").value,
          date: new Date().toISOString(),
          verifiedPurchase: false,
        };

        // Create and prepend the new review card
        const reviewList = document.getElementById("review-list-container");
        const newCard = document.createElement("div");
        newCard.className = "review-card optimistic";
        newCard.innerHTML = `
                <div class="review-header">...</div>
                <div class="review-rating">${"★".repeat(
                  newReview.rating
                )}${"☆".repeat(5 - newReview.rating)}</div>
                <h5 class="review-title">${newReview.title}</h5>
                <p class="review-text">${newReview.text}</p>`; // Build full card as before
        reviewList.prepend(newCard);

        // Hide form and show success message
        reviewFormContainer.classList.remove("is-open");
        document.getElementById("review-success-message").style.display =
          "block";
        writeReviewBtn.style.display = "none"; // Hide the "Write Review" button
      });
    }
  };

  // --- [SECTION 3] EXECUTION SEQUENCE ---
  // This is the master sequence that runs everything in the correct order.
  // =======================================================
  renderBreadcrumbs();
  renderImageGallery();
  renderProductInfo();
  renderLongDetails(); // <<< THIS IS THE CRITICAL FIX
  setupEventListeners(); // Must run AFTER all elements are rendered.
});
