// Navigation link active state toggling
const navLink = $("nav ul li");

navLink.each(function () {
  $(this).on("click", function () {
    navLink.removeClass("active"); // Remove "active" class from all nav links
    $(this).addClass("active"); // Add "active" class to the clicked nav link
  });
});

// Show nav bar on mobile
$("#nav-menu").click(function () {
  $(".nav-bar").addClass("show");
});

// Close nav bar on mobile
$(".close-nav-menu").click(function () {
  $(".nav-bar").removeClass("show");
});

// Select all thumbnail images
const thumbnailImagesMain = $(".product-page .thumbnail-wrapper img");
const thumbnailImagesOverlay = $(
  ".product-images-overlay .thumbnail-wrapper img"
);

// Select the main image elements in both the original and overlay sections
const selectedSneakerOriginal = $(".product-page #selected-sneaker");
const selectedSneakerOverlay = $(".product-images-overlay #selected-sneaker-overlay");

// Select next and previous buttons
const prevButton = $(".prevButton");
const nextButton = $(".nextButton");

let currentThumbnailIndex = 0;

// Function to update the main image based on the current thumbnail index
function updateMainImage() {
  const num = currentThumbnailIndex + 1;
  selectedSneakerOriginal.attr("src", `./images/image-product-${num}.jpg`);
  selectedSneakerOverlay.attr("src", `./images/image-product-${num}.jpg`);
}

// Function to update the active class on thumbnails
function updateActiveThumbnail(index) {
  $(".product-page .thumbnail-wrapper").removeClass("thumbnails-active");
  $(".product-page .thumbnail-wrapper").eq(index).addClass("thumbnails-active");
  $(".product-images-overlay .thumbnail-wrapper").removeClass(
    "thumbnails-active"
  );
  $(".product-images-overlay .thumbnail-wrapper")
    .eq(index)
    .addClass("thumbnails-active");
}

// Update main images when a thumbnail is clicked
thumbnailImagesMain.each(function (index) {
  $(this).on("click", function () {
    currentThumbnailIndex = index;
    updateMainImage(index);
    updateActiveThumbnail(index);
  });
});

selectedSneakerOriginal.click(function () {
  if (window.innerWidth >= 769) {
    $(".product-images-overlay").css("display", "flex");
  }
});

thumbnailImagesOverlay.each(function (index) {
  $(this).on("click", function () {
    currentThumbnailIndex = index;
    updateMainImage(index);
    updateActiveThumbnail(index);
  });
});

// Close product overlay
$(".close-overlay").click(function () {
  $(".product-images-overlay").css("display", "none");
});

// Previous button click event
prevButton.on("click", function () {
  if (currentThumbnailIndex > 0) {
    currentThumbnailIndex--;
    updateMainImage(currentThumbnailIndex);
    updateActiveThumbnail(currentThumbnailIndex);
  }
});

// Next button click event
nextButton.on("click", function () {
  if (currentThumbnailIndex < thumbnailImagesMain.length - 1) {
    currentThumbnailIndex++;
    updateMainImage(currentThumbnailIndex);
    updateActiveThumbnail(currentThumbnailIndex);
  }
});

// Function to update quantity from contenteditable span
function updateQuantity() {
  return parseInt($("#quantity").text());
}

// Function to set quantity to contenteditable span
function setQuantity(value) {
  $("#quantity").text(value);
}

// Decrement button click event
$(".decrement").click(function () {
  let quantity = updateQuantity();
  if (quantity > 0) {
    quantity--;
    setQuantity(quantity);
  }
});

// Increment button click event
$(".increment").click(function () {
  let quantity = updateQuantity();
  quantity++;
  setQuantity(quantity);
});

// Ensure valid quantity when contenteditable span is modified
$("#quantity").on("input", function () {
  let quantity = updateQuantity();
  if (isNaN(quantity) || quantity < 0) {
    setQuantity(null);
  }
});

// Toggle cart dropdown visibility
$(".cart-icon").click(function (event) {
  event.stopPropagation(); // Prevent click from propagating to the document
  $(".cart-dropdown").toggleClass("show");
});

// Hide cart dropdown when clicking outside of it
$(document).click(function (event) {
  const target = $(event.target);
  if (
    !target.closest(".cart").length &&
    !target.closest(".cart-dropdown").length
  ) {
    $(".cart-dropdown").removeClass("show");
  }
});

let cartQuantity = 0;

// Add to cart functionality
$(".add-to-cart").click(function () {
  let quantity = updateQuantity();
  if (quantity > 0) {
    cartQuantity += quantity;
    $("#cart-details").html(`
      <div class="cart-item">
        <img src="./images/image-product-1.jpg" alt="Sneaker">
        <div class="item-details">
          <p>Fall Limited Edition Sneakers</p>
          <p>£125.00 x ${cartQuantity}<strong> £${(125 * cartQuantity).toFixed(
      2
    )}</strong></p>
        </div>
        <button class="remove-item" onclick="removeItem()"><i class="fa-solid fa-trash-can fa-md"></i></button>
      </div>
      <button class="checkout">Checkout</button>
    `);
    $(".cart-quantity").html(`<p>${cartQuantity}</p>`);
    showPopup();
  }
  setQuantity(0);
});

// Function to show popup notification
function showPopup() {
  let popup = $("#popup");
  popup.addClass("show");
  setTimeout(() => {
    popup.removeClass("show");
  }, 1000);
}

// Function to remove item from cart
function removeItem() {
  cartQuantity = 0; // Reset cart quantity
  $(".cart-quantity p").remove();
  $("#cart-details").html("<p>Your cart is empty.</p>");
  let popup = $("#remove-popup");
  popup.addClass("show");
  setTimeout(() => {
    popup.removeClass("show");
  }, 1000);
}
