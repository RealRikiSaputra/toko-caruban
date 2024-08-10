async function loadProducts() {
    try {
        const response = await fetch('https://json-6ecde-default-rtdb.firebaseio.com/Caruban/product.json');
        const products = await response.json();
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'col-md-4';
            productItem.innerHTML = `
                <div class="product-item d-flex align-items-start">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-description ms-3">
                        <h5>${product.name}</h5>
                        <p>${product.description}</p>
                        <span class="product-price">${product.price}</span>
                        <button class="btn btn-primary btn-detail mt-2" onclick="viewDetails('${product.id}')">View Details</button>
                    </div>
                </div>

            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const itemName = item.querySelector('h5').textContent.toLowerCase();
        const itemCategory = item.getAttribute('data-category');

        if (
            (itemName.includes(searchInput) || searchInput === '') &&
            (itemCategory === categoryFilter || categoryFilter === '')
        ) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function viewDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
