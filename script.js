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
                productItem.className = 'col-md-4';
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

function player(){
    const source = 'https://stream.carubantv.id/hls/stream.m3u8';
	const video = document.querySelector('video');
  
	// For more options see: https://github.com/sampotts/plyr/#options
	// captions.update is required for captions to work with hls.js
	const player = new Plyr(video, {
	  controls: [
		'play-large', // The large play button in the center
        // 'restart', // Restart playback
        // 'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        // 'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        // 'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        // 'captions', // Toggle captions
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        // 'airplay', // Airplay (currently Safari only)
        // 'download', // Custom download button
        'fullscreen', // Toggle fullscreen
		'quality' // Add quality control
	  ],
	  settings: ['captions', 'quality', 'speed', 'loop'],
	});
  
	if (!Hls.isSupported()) {
	  video.src = source;
	} else {
	  // For more Hls.js options, see https://github.com/dailymotion/hls.js
	  const hls = new Hls();
	  hls.loadSource(source);
	  hls.attachMedia(video);
	  window.hls = hls;
  
	  // Expose available video qualities
	  player.on('hlsLevelLoaded', (event) => {
		const levels = hls.levels;
		const options = levels.map((level, index) => ({
		  label: `Quality ${level.bitrate / 1000} kbps`,
		  value: index,
		}));
		player.addSetting('quality', options);
	  });
  
	  // Handle quality selection from player
	  player.on('settingchange', (event) => {
		if (event.detail.name === 'quality') {
		  hls.currentLevel = event.detail.value;
		}
	  });
	}
  
	// Expose player so it can be used from the console
	window.player = player;
}

document.addEventListener('DOMContentLoaded', () => {
    const player1 = new Plyr('#player1');
            const player2 = new Plyr('#player2');
            const player3 = new Plyr('#player3');
    loadProducts();
    loadTestimonials();
    loadPharmacies();
    player();
});
