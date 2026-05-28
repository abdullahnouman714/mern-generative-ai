// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Slider variables
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

// Initialize slider if it exists
if (slides.length > 0) {
    // Show initial slide
    showSlide(slideIndex);
    
    // Auto slide every 5 seconds
    startAutoSlide();
}

function showSlide(n) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Handle loop
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    // Add active class to current slide
    slides[slideIndex].classList.add('active');
    
    // Update dots
    updateDots();
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    resetAutoSlide();
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
    resetAutoSlide();
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    resetAutoSlide();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('✅ Added to cart!');
    }
}

function addToCartFromDetail() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const qty = parseInt(document.getElementById('product-qty').value);
    const product = products.find(p => p.id === parseInt(productId));
    
    if (product) {
        const existingItem = cart.find(item => item.id === parseInt(productId));
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ ...product, qty });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('✅ Added to cart!');
    }
}

// Products data
const products = [
    { id: 1, name: 'Unstitched Fabric', price: 2499, category: 'unstitched', image: 'https://images.unsplash.com/photo-1594938298603-c81488a74fcb?w=400&h=500&fit=crop', description: 'Premium quality unstitched fabric perfect for summer' },
    { id: 2, name: 'Stitched Suit', price: 3999, category: 'stitched', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=500&fit=crop', description: 'Beautifully stitched traditional suit for special occasions' },
    { id: 3, name: 'Designer Kurti', price: 1799, category: 'stitched', image: 'https://images.unsplash.com/photo-1596482103537-1f98c1dc20d4?w=400&h=500&fit=crop', description: 'Elegant kurti for daily wear with modern design' },
    { id: 4, name: 'Embroidered Dupatta', price: 999, category: 'accessories', image: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=400&h=500&fit=crop', description: 'Beautiful handcrafted embroidered dupatta' },
    { id: 5, name: 'Premium Lawns', price: 2199, category: 'unstitched', image: 'https://images.unsplash.com/photo-1574693832412-4e1036b1fb2a?w=400&h=500&fit=crop', description: 'Soft lawn fabric perfect for summer collection' },
    { id: 6, name: 'Winter Collection', price: 4499, category: 'stitched', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=500&fit=crop', description: 'Warm winter clothing for chilly weather' }
];

// Mobile menu toggle
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Initialize cart count
updateCartCount();