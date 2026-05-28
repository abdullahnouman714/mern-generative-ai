function loadProduct() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === parseInt(productId));
    
    if (product) {
        document.getElementById('main-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `PKR ${product.price.toLocaleString()}`;
        document.getElementById('product-description').textContent = product.description;
    }
}

loadProduct();