document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("dropdownButton");
    const menu = document.getElementById("dropdownMenu");

    if (button && menu) {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!button.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add("hidden");
            }
        });
    }
});

// Function to create a card
const createCard = (data) => {
    const card = document.createElement('div');
    card.className = 'bg-white border border-gray-200 rounded-lg w-full max-w-[421px] mx-auto';

    // make the image clickable
    const imgLink = document.createElement('a');
    imgLink.href = `2index.html?productId=${data.id}`;

    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.alt = data.imgAlt;
    img.className = 'w-full h-[200px] sm:h-[240px] rounded-t-lg object-cover';

    imgLink.appendChild(img);
    card.appendChild(imgLink);

    const title = document.createElement('p');
    title.className = 'font-bold text-black text-base sm:text-lg px-6 pt-5';
    title.textContent = data.title;
    card.appendChild(title);

    const dateTime = document.createElement('p');
    dateTime.className = 'text-sm sm:text-base px-6 font-bold';
    dateTime.textContent = data.dateTime || 'Date TBD';
    card.appendChild(dateTime);

    const description = document.createElement('p');
    description.className = 'text-sm sm:text-base px-6 mb-6';
    description.innerHTML = data.description;
    card.appendChild(description);

    const footer = document.createElement('div');
    footer.className = 'flex justify-start items-center px-6 pb-4';

    const link = document.createElement('a');
    link.href = `2index.html?productId=${data.id}`;
    link.className = 'text-sm sm:text-base text-[#432361] font-bold';
    link.textContent = data.linkText;

    const arrow = document.createElement('img');
    arrow.src = data.arrowSrc;
    arrow.alt = data.arrowAlt;
    arrow.className = 'w-4 h-4 ml-2';

    footer.appendChild(link);
    footer.appendChild(arrow);
    card.appendChild(footer);

    document.querySelector('#cardContainer').appendChild(card);
};

// Product class to structure API data
class Product {
    constructor({ id, title, description, category, image, price }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price;
    }

    getProductInfo() {
        return {
            id: this.id,
            imgSrc: this.image,
            imgAlt: `${this.title} image`,
            title: this.title,
            dateTime: `Price: $${this.price}`,
            description: this.description.replace(/\n/g, '<br>'),
            linkText: 'View Details',
            linkHref: `#product-${this.id}`,
            arrowSrc: './assets/images/Arrow--up-right.png',
            arrowAlt: 'Arrow Up'
        };
    }
}

// ProductService method class to fetch API data
export class ProductService {
    async getProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            // Convert API data to Product instances & reduce to 6
            return data.slice(0, 6).map(product => new Product(product));
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch product with ID ${id}`);
            }
            const data = await response.json();
            return new Product(data);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
    }

    addProducts() {
        
    }

    updateProducts() {
        
    }

    deleteProducts(id) {
       
    }
}

// Fetch products for cards input
const loadCards = async () => {
    const productService = new ProductService();
    const products = await productService.getProducts();
    if (products.length === 0) {
        console.warn('No products fetched from API');
        return;
    }

    // Map Product instances to card data using getProductInfo
    const cardData = products.map(product => product.getProductInfo());
    cardData.forEach(data => createCard(data));
};

loadCards();