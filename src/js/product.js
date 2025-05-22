import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import CartCount from "./CartCount.mjs";

// Load the header and footer
loadHeaderFooter();

// Event listener for when header/footer are loaded
document.addEventListener("headerfooterloaded", () => {
  // Initialize cart count after header is loaded
  const cartCount = new CartCount(document.querySelector(".cart"));
  cartCount.render();
});

// Product details functionality
const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();