import Cart from "./cart.js";
import { products } from "./Product.js";

// Show available products
console.log("Available products:");
products.forEach(p => {
  console.log(`${p.id}. ${p.name} - $${p.price}`);
});

// Create a cart
const cart = new Cart();

// Add products to cart
cart.addProduct(1, 1);
cart.addProduct(2, 2);

console.log("Cart items:", cart.showItems());
console.log("Total cost: $", cart.getTotal());
