import { loadHeaderFooter } from "./utils.mjs";
import CartCount from "./CartCount.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Load the header and footer
loadHeaderFooter();

// Event listener for when header/footer are loaded
document.addEventListener("headerfooterloaded", () => {
  // Initialize cart count after header is loaded
  const cartCount = new CartCount(document.querySelector(".cart"));
  cartCount.render();
  cartCount.listenForUpdates();
  
  // Initialize the shopping cart
  const cartList = document.querySelector(".product-list");
  const cart = new ShoppingCart(cartList);
  cart.init();
});