export class Product {
  constructor(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

export const products = [
  new Product(1, "Laptop", 1200, "A powerful laptop"),
  new Product(2, "Headphones", 150, "Noise-cancelling headphones"),
  new Product(3, "Smartphone", 800, "Latest model smartphone"),
  new Product(4, "Keyboard", 75, "Mechanical keyboard"),
];
