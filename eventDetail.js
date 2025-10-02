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

        // Populate cover image
        const coverImg = document.querySelector('#eventDetail img');
        if (coverImg) {
            coverImg.src = info.imgSrc;
            coverImg.alt = info.imgAlt;
        }

        // Populate event title
        const eventTitle = document.querySelector('p.font-bold.text-\\[24px\\]');
        if (eventTitle) {
            eventTitle.textContent = info.title;
        }

        // Populate date/time (using the provided dateTime as time)
        const timeContainers = document.querySelectorAll('div.flex.items-center.space-x-2');
        if (timeContainers[1]) {
            const timeP = timeContainers[1].querySelector('p');
            if (timeP) {
                timeP.textContent = info.dateTime;
            }
        }

        // Populate events description
        const descP = document.querySelector('p.pt-5.text-sm.sm\\:text-base.text-left');
        if (descP) {
            descP.innerHTML = info.description.replace(/\n/g, '<br><br>');
        }

        // Populate single ticket price
        const pricingContainer = document.querySelector('div.flex.flex-col.sm\\:flex-row.space-y-4.sm\\:space-y-0.sm\\:space-x-10.pt-5.pb-10');
        if (pricingContainer) {
            const singlePriceP = pricingContainer.querySelector('div:first-child > p.text-sm.sm\\:text-base.text-\\[\\#9B51E0\\].font-bold');
            if (singlePriceP) {
                singlePriceP.textContent = `$${product.price}`;
            }
        }
    } else {
        console.error('Failed to load product');
        const container = document.getElementById("eventDetail");
        if (container) {
            container.innerHTML = '<p class="text-red-500 px-6 py-4">Product not found.</p>';
        }
    }
});