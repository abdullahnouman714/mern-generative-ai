function loadCheckoutSummary() {
    const container = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price * item.qty;
        return `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>PKR ${item.price.toLocaleString()} x ${item.qty}</p>
                </div>
                <p>PKR ${(item.price * item.qty).toLocaleString()}</p>
            </div>
        `;
    }).join('');
    
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;
    document.getElementById('checkout-total').textContent = `PKR ${total.toLocaleString()}`;
}

document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
});

loadCheckoutSummary();