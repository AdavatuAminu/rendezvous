export default class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (product) {
      this.items.push({ product, quantity });
    } else {
      console.log("Product not found!");
    }
  }

  showItems() {
    return this.items.map(item => `${item.product.name} x ${item.quantity}`).join(", ");
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}

