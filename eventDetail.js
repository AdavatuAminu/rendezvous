import { ProductService } from './index.js';

document.addEventListener("DOMContentLoaded", async () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const productId = params.get('productId');

    if (!productId) {
        console.error('No product ID provided in URL');
        document.getElementById("eventDetail").innerHTML = '<p class="text-red-500 px-6 py-4">Product not found.</p>';
        return;
    }

    const productService = new ProductService();
    const product = await productService.getProductById(productId);

    if (product) {
        const info = product.getProductInfo();
        const container = document.getElementById("eventDetail");

        container.innerHTML = `
            <img src="${info.imgSrc}" alt="${info.imgAlt}" class="w-full h-[200px] sm:h-[240px] rounded-t-lg object-cover">
            <p class="font-bold text-black text-base sm:text-lg px-6 pt-5">${info.title}</p>
            <p class="text-sm sm:text-base px-6 font-bold">${info.dateTime}</p>
            <p class="text-sm sm:text-base px-6 mb-6">${info.description}</p>
            <div class="flex justify-start items-center px-6 pb-4">
                <a href="index.html" class="text-sm sm:text-base text-[#432361] font-bold">Back to Events</a>
                <img src="${info.arrowSrc}" alt="${info.arrowAlt}" class="w-4 h-4 ml-2 rotate-180">
            </div>
        `;
    } else {
        console.error('Failed to load product');
        document.getElementById("eventDetail").innerHTML = '<p class="text-red-500 px-6 py-4">Product not found.</p>';
    }
});