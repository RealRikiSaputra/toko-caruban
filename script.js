async function loadProducts() {
    try {
        const response = await fetch('https://json.link/V53GeF1B0T.json');
        const products = await response.json();
        const productList = document.getElementById('product-list');
        const categorySet = new Set();

        productList.innerHTML = '';  // Clear the product list
        products.forEach(product => {
            categorySet.add(product.category);  // Collect categories from JSON data

            const productItem = document.createElement('div');
            productItem.className = 'col-md-4';
            productItem.setAttribute('data-category', product.category);  // Store category in data attribute
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

function viewDetails(productId) {
    window.location.href = `detail.html?id=${productId}`;
}

async function loadTestimonials() {
  try {
      const response = await fetch('https://json-6ecde-default-rtdb.firebaseio.com/Caruban/testimoni.json');
      const testimonials = await response.json();
      const gallery = document.getElementById('testimonial-gallery');

      gallery.innerHTML = testimonials.map(testimonial => `
          <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#imageModal">
              <img src="${testimonial.img}" alt="Testimonial Image">
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadTestimonials();
});
