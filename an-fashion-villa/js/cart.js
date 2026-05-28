function loadCart() {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('subtotal').textContent = 'PKR 0';
        document.getElementById('total').textContent = 'PKR 150';
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
    
    document.getElementById('subtotal').textContent = `PKR ${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `PKR ${shipping}`;
    document.getElementById('total').textContent = `PKR ${total.toLocaleString()}`;
}

loadCart();