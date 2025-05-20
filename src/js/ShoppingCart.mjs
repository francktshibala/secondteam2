import { getLocalStorage } from "./utils.mjs";

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

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = getLocalStorage("so-cart") || [];
  }

  renderItems() {
    // Check if there are items in the cart
    if (this.cartItems && this.cartItems.length > 0) {
      // Map each item to its HTML template and join them
      const htmlItems = this.cartItems.map((item) => cartItemTemplate(item));
      this.listElement.innerHTML = htmlItems.join("");
      
      // Show checkout button
      const checkoutButton = document.querySelector(".checkout-button");
      if (checkoutButton) {
        checkoutButton.classList.remove("hide");
      }
    } else {
      // Display a message if the cart is empty
      this.listElement.innerHTML = `<li class="cart-empty">Your cart is empty</li>`;
      
      // Hide checkout button
      const checkoutButton = document.querySelector(".checkout-button");
      if (checkoutButton) {
        checkoutButton.classList.add("hide");
      }
    }
  }

  init() {
    this.renderItems();
  }
}