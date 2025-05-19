// Updated cart.js file with fixed links

import { getLocalStorage } from "./utils.mjs";
import CartCount from "./CartCount.mjs";

const cartCount = new CartCount(document.querySelector(".cart"));
cartCount.render();
cartCount.listenForUpdates();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  
  // Select the product list element
  const productListElement = document.querySelector(".product-list");
  
  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    // Map each item to its HTML template and join them
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListElement.innerHTML = htmlItems.join("");
  } else {
    // Display a message if the cart is empty
    productListElement.innerHTML = `<li class="cart-empty">Your cart is empty</li>`;
  }
}

function cartItemTemplate(item) {
  // Check if the item has all the required properties
  if (!item || !item.Image || !item.Name || !item.Colors || !item.FinalPrice) {
    console.error("Invalid item in cart:", item);
    return `<li class="cart-card divider">
      <p class="cart-card__error">Invalid item in cart</p>
    </li>`;
  }

  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Call the render function when the page loads
renderCartContents();