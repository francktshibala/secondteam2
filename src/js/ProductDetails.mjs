import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        try {
            // use the datasource to get the details for the current product.
            this.product = await this.dataSource.findProductById(this.productId);
            
            if (!this.product) {
                throw new Error("Product not found");
            }
            
            // the product details are needed before rendering the HTML
            this.renderProductDetails();
            
            // once the HTML is rendered, add a listener to the Add to Cart button
            const addToCartButton = document.getElementById('addToCart');
            if (addToCartButton) {
                addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
                console.log("Add to cart event listener added");
            } else {
                console.error("Add to cart button not found");
            }
        } catch (error) {
            console.error("Error initializing product details:", error);
        }
    }

    addProductToCart() {
        try {
            console.log("Adding to cart:", this.product.Name);
            
            // Get current cart items or initialize empty array
            const cartItems = getLocalStorage("so-cart") || [];
            
            // Add the current product to the cart
            cartItems.push(this.product);
            
            // Save updated cart back to localStorage
            setLocalStorage("so-cart", cartItems);
            
            // Optional: Show confirmation to user
            alert(`${this.product.Name} has been added to your cart!`);
            
            // Update cart count display if it exists
            const cartCount = document.querySelector(".cart-count");
            if (cartCount) {
                cartCount.textContent = cartItems.length;
            }
            
            console.log("Cart updated. New count:", cartItems.length);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    renderProductDetails() {
        try {
            // Update page title
            document.querySelector('title').textContent = "Sleep Outside | " + this.product.NameWithoutBrand;
            
            // Find and update all product details elements
            const brandElement = document.querySelector('h3');
            if (brandElement) brandElement.textContent = this.product.Brand.Name;
            
            const nameElement = document.querySelector('h2');
            if (nameElement) nameElement.textContent = this.product.NameWithoutBrand;

            const image = document.getElementById('product-image');
            if (image) {
                image.src = this.product.Image;
                image.alt = this.product.NameWithoutBrand;
            }

            const priceElement = document.querySelector('p.product-card__price');
            if (priceElement) priceElement.textContent = `$${this.product.FinalPrice}`;
            
            const colorElement = document.querySelector('p.product__color');
            if (colorElement && this.product.Colors && this.product.Colors.length > 0) {
                colorElement.textContent = this.product.Colors[0].ColorName;
            }
            
            const descriptionElement = document.querySelector('p.product__description');
            if (descriptionElement) descriptionElement.textContent = this.product.Description;

            const addToCartButton = document.getElementById('addToCart');
            if (addToCartButton) addToCartButton.dataset.id = this.product.Id;
            
            console.log("Product details rendered successfully");
        } catch (error) {
            console.error("Error rendering product details:", error);
        }
    }
}