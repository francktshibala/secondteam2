import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import CartCount from "./CartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// Event listener for when header/footer are loaded
document.addEventListener("headerfooterloaded", () => {
  // Initialize cart count after header is loaded
  const cartCount = new CartCount(document.querySelector(".cart"));
  cartCount.render();
});

// Product listing functionality
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);
productList.init();