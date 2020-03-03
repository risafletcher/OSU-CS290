function addToCart(id, qty = 1) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const quantity = cart[id] ? cart[id].quantity + qty : qty;
    console.log(cart);
    const newCart = {
        ...cart,
        [id]: { quantity }
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
}

function removeFromCart(id, qty) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let newCart = { ...cart };
    let quantity;
    if (cart[id].quantity <= 1 || !qty) {
        quantity = undefined;
        newCart[id] = undefined;
    } else {
        quantity = cart[id] && qty ? cart[id].quantity - qty : undefined;
        if (!quantity) {
            newCart[id] = undefined;
        }
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
}