// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Products data (LOCAL IMAGES)
const products = [
    { id: 1, name: 'Unstitched Fabric', price: 2499, category: 'unstitched', image: 'images/1.jpg', description: 'Premium quality unstitched fabric perfect for summer' },
    { id: 2, name: 'Stitched Suit', price: 3999, category: 'stitched', image: 'images/2.jpg', description: 'Beautifully stitched traditional suit for special occasions' },
    { id: 3, name: 'Designer Kurti', price: 1799, category: 'stitched', image: 'images/3.jpg', description: 'Elegant kurti for daily wear with modern design' },
    { id: 4, name: 'Embroidered Dupatta', price: 999, category: 'accessories', image: 'images/4.jpg', description: 'Beautiful handcrafted embroidered dupatta' },
    { id: 5, name: 'Premium Lawns', price: 2199, category: 'unstitched', image: 'images/5.jpg', description: 'Soft lawn fabric perfect for summer collection' },
    { id: 6, name: 'Winter Collection', price: 4499, category: 'stitched', image: 'images/6.jpg', description: 'Warm winter clothing for chilly weather' },
    { id: 7, name: 'Luxury Lawn Set', price: 3299, category: 'unstitched', image: 'images/7.jpg', description: 'Exclusive lawn set with dupatta' },
    { id: 8, name: 'Party Wear Suit', price: 5499, category: 'stitched', image: 'images/8.jpg', description: 'Elegant party wear for special events' },
    { id: 9, name: 'Silk Scarf', price: 1299, category: 'accessories', image: 'images/9.jpg', description: 'Premium silk scarf with unique design' },
    { id: 10, name: 'Casual Kurti', price: 1599, category: 'stitched', image: 'images/10.jpg', description: 'Comfortable casual kurti for daily use' }
];

// Slider variables
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

// Initialize slider if it exists
if (slides.length > 0) {
    showSlide(slideIndex);
    startAutoSlide();
}

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
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

// Mobile menu toggle
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Initialize cart count
updateCartCount();