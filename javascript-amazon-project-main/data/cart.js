const defaultCart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionsId: '1',
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionsId: '2',
    },
    {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionsId: '1',
    },
];

const savedCart = JSON.parse(localStorage.getItem('cart') || 'null');

export let cart = Array.isArray(savedCart) && savedCart.length > 0 ? savedCart : defaultCart;

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getMatchingItem(productId) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    return matchingItem;
}

export function getCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    return cartQuantity;
}

export function updateCartTotal() {
    const cartQuantity = getCartQuantity();

    const cartQuantityElement = document.querySelector('.js-cart-quantity');

    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
    }

    const headerMiddleElement = document.querySelector('.js-header-middle');

    if (headerMiddleElement) {
        headerMiddleElement.innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} item${cartQuantity === 1 ? '' : 's'}</a>)`;
    }

    return cartQuantity;
}

export function addToCart(productId, quantity) {
    const matchingItem = getMatchingItem(productId);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionsId: '1',
        });
    }

    updateCartTotal();
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    updateCartTotal();
    saveToStorage();
}

const cartQuantity = getCartQuantity();
const headerMiddleElement = document.querySelector('.js-header-middle');

if (headerMiddleElement) {
    headerMiddleElement.innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} item${cartQuantity === 1 ? '' : 's'}</a>)`;
}

updateCartTotal();
