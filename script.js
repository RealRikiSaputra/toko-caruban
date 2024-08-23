async function loadProducts() {
    try {
        const response = await fetch('https://json-6ecde-default-rtdb.firebaseio.com/Caruban/product.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products.');
        }
        const products = await response.json();
        const productList = document.getElementById('product-list');

        productList.innerHTML = '';  // Clear the product list
        products.forEach(product => {
            if (product.name && product.price) {

                const productItem = document.createElement('div');
                productItem.className = 'col-md-4'; // Store category in data attribute
                productItem.innerHTML = `
                    <div class="product-item d-flex align-items-start">
                        <img src="${product.image || 'img/default_product.png'}" alt="${product.name}" class="product-img">
                        <div class="product-description ms-3">
                            <h5>${product.name}</h5>
                            <p>${product.description || ''}</p>
                            <span class="product-price">${product.price}</span>
                            <button class="btn btn-primary btn-detail mt-2" onclick="viewDetails('${product.id}')">View Details</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            }
        });

    } catch (error) {
        console.error('Error loading products:', error);
        productList.innerHTML = '<p class="text-danger">Failed to load products.</p>';
    }
}

function viewDetails(productId) {
    window.location.href = `detail.html?id=${productId}`;
}

async function loadTestimonials() {
    try {
        const response = await fetch('https://json-6ecde-default-rtdb.firebaseio.com/Caruban/testimoni.json');
        if (!response.ok) {
            throw new Error('Failed to fetch testimonials.');
        }
        const testimonials = await response.json();
        const gallery = document.getElementById('testimonial-gallery');

        gallery.innerHTML = testimonials.map(testimonial => `
            <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#imageModal">
                <img src="${testimonial.img || 'img/default-testimonial.jpg'}" alt="Testimonial Image">
            </div>
        `).join('');

        // Add event listener for the modal
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                document.getElementById('modalImage').src = imgSrc;
            });
        });

    } catch (error) {
        console.error('Error loading testimonials:', error);
        gallery.innerHTML = '<p class="text-danger">Failed to load testimonials.</p>';
    }
}

async function loadPharmacies() {
    try {
        const response = await fetch('https://json-6ecde-default-rtdb.firebaseio.com/Caruban/apotek.json');
        if (!response.ok) {
            throw new Error('Failed to fetch pharmacies.');
        }
        const pharmacies = await response.json();
        const pharmacyList = document.getElementById('pharmacy-list');

        pharmacyList.innerHTML = pharmacies.map(pharmacy => `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${pharmacy.img || 'img/apotek.jpeg'}" class="card-img-top" alt="${pharmacy.nama}">
                    <div class="card-body">
                        <h5 class="card-title">${pharmacy.nama}</h5>
                        <p class="card-text">${pharmacy.alamat}</p>
                        <a href="${pharmacy.maps || '#'}" target="_blank" class="btn btn-primary">View in Maps</a>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading pharmacies:', error);
        document.getElementById('pharmacy-list').innerHTML = '<p class="text-danger">Failed to load pharmacies.</p>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadTestimonials();
    loadPharmacies();
});
