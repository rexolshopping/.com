const products = [
    {
        id: 1,
        name: "Nike Air Jordan 1",
        price: 120,
        images: [
            "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-jordan-1-mid-shoes-X5pM09.png",
            "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e5brh9qxqdhkzmrtqkpg/air-jordan-1-mid-shoes-X5pM09.png",
            "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/edbfe48d-0a7a-4d4f-8d0f-6d0e3e9b9b9b/air-jordan-1-mid-shoes-X5pM09.png"
        ],
        colors: ["Red", "Black", "White"],
        sizes: ["US 7", "US 8", "US 9", "US 10"]
    },
    {
        id: 2,
        name: "Adidas Yeezy Boost 350",
        price: 220,
        images: [
            "https://assets.adidas.com/images/w_600,f_auto,q_auto/2a1c7a04297e4e7d86d1aaf8011e60d2_9366/Yeezy_Boost_350_V2_Light_EG7489_01_standard.jpg",
            "https://assets.adidas.com/images/w_600,f_auto,q_auto/5a1c7a04297e4e7d86d1aaf8011e60d2_9366/Yeezy_Boost_350_V2_Light_EG7489_02_standard.jpg",
            "https://assets.adidas.com/images/w_600,f_auto,q_auto/7a1c7a04297e4e7d86d1aaf8011e60d2_9366/Yeezy_Boost_350_V2_Light_EG7489_04_standard.jpg"
        ],
        colors: ["Light", "Onyx", "Zebra"],
        sizes: ["US 7", "US 8", "US 9", "US 10"]
    },
    {
        id: 3,
        name: "Puma RS-X",
        price: 110,
        images: [
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/EEA/fmt/png/RS-X-3D-Unisex-Sneakers",
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/02/sv01/fnd/EEA/fmt/png/RS-X-3D-Unisex-Sneakers",
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/03/sv01/fnd/EEA/fmt/png/RS-X-3D-Unisex-Sneakers"
        ],
        colors: ["Blue", "Red", "Black"],
        sizes: ["US 7", "US 8", "US 9", "US 10"]
    },
    {
        id: 4,
        name: "Classic White Sneaker",
        price: 95,
        images: [
            "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&fit=crop&w=600&q=80",
            "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&fit=crop&w=600&q=80"
        ],
        colors: ["White"],
        sizes: ["US 7", "US 8", "US 9", "US 10"]
    }
];

let cart = [];
let wishlist = [];
let detailState = {
    id: null,
    size: "US 8",
    quantity: 1
};

function loadProducts() {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="product-card text-center">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-img img-fluid">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <div class="mb-2">
                        ${product.colors.map(color => 
                            `<span class="badge bg-secondary me-1">${color}</span>`
                        ).join('')}
                    </div>
                    <button class="btn btn-outline-primary view-details mb-2" data-id="${product.id}">
                        <i class="fas fa-eye me-2"></i>View Details
                    </button>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showProductDetails(id);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            addToCartDirect(id);
        });
    });
}

// ডিটেইলস মডাল দেখানোর ফাংশন
function showProductDetails(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;
    detailState.id = product.id;
    detailState.size = product.sizes[1] || product.sizes[0];
    detailState.quantity = 1;

    document.getElementById('productDetailTitle').innerText = product.name;
    document.getElementById('detailMainImage').src = product.images[0];
    document.getElementById('detailProductName').innerText = product.name;
    document.getElementById('detailProductPrice').innerText = `$${product.price}`;
    document.getElementById('detailOldPrice').innerText = `$${product.price + 20}`;
    document.getElementById('detailProductDescription').innerText = "This is a premium sneaker.";
    document.getElementById('detailProductFeatures').innerHTML = product.colors.map(color => `<li>${color}</li>`).join('');

    // থাম্বনেইল ইমেজ সেট করুন
    const thumbs = document.querySelectorAll('.detail-thumb');
    thumbs.forEach((thumb, idx) => {
        if (product.images[idx]) {
            thumb.src = product.images[idx];
            thumb.style.display = 'block';
            thumb.classList.remove('selected');
            if (idx === 0) thumb.classList.add('selected');
        } else {
            thumb.style.display = 'none';
        }
    });

    // Size options
    const sizeOptions = document.querySelector('.size-options');
    sizeOptions.innerHTML = '';
    product.sizes.forEach(size => {
        sizeOptions.innerHTML += `<span class="size-option${size === detailState.size ? ' selected' : ''}" data-size="${size}">${size}</span>`;
    });
    document.querySelectorAll('.size-option').forEach(el => {
        el.onclick = function() {
            document.querySelectorAll('.size-option').forEach(e => e.classList.remove('selected'));
            this.classList.add('selected');
            detailState.size = this.getAttribute('data-size');
        };
    });

    // Quantity
    document.getElementById('detailQuantity').value = detailState.quantity;

    // Wishlist button
    const wishlistBtn = document.querySelector('.btn-outline-secondary');
    wishlistBtn.onclick = function() {
        addToWishlist(product.id);
    };

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
}

// থাম্বনেইল ক্লিক করলে প্রধান ছবি চেঞ্জ
function changeDetailImage(img) {
    document.getElementById('detailMainImage').src = img.src;
    document.querySelectorAll('.detail-thumb').forEach(e => e.classList.remove('selected'));
    img.classList.add('selected');
}

// Quantity update
function updateDetailQuantity(val) {
    let qty = parseInt(document.getElementById('detailQuantity').value) + val;
    if (qty < 1) qty = 1;
    document.getElementById('detailQuantity').value = qty;
    detailState.quantity = qty;
}

// Add to Cart (from details modal)
function addToCartFromDetail() {
    const product = products.find(p => p.id == detailState.id);
    if (!product) return;
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: detailState.size,
        quantity: detailState.quantity
    });
    alert('Added to cart!');
}

// Add to Cart (direct from card)
function addToCartDirect(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: product.sizes[1] || product.sizes[0],
        quantity: 1
    });
    alert('Added to cart!');
}

// Buy Now
function buyNow() {
    addToCartFromDetail();
    // Checkout modal দেখাতে চাইলে এখানে কোড দিন
    alert('Proceeding to checkout...');
}

// Add to Wishlist
function addToWishlist(id) {
    if (!wishlist.includes(id)) {
        wishlist.push(id);
        alert('Added to wishlist!');
    } else {
        alert('Already in wishlist!');
    }
}

window.addEventListener('DOMContentLoaded', loadProducts);