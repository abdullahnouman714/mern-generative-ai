function loadProducts() {
    const container = document.getElementById('shop-products');
    const filteredProducts = products;
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">PKR ${product.price.toLocaleString()}</p>
            <button class="btn-add" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

loadProducts();