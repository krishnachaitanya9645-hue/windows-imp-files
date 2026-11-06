import { cart, removeFromCart, updateCartTotal } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryoptions.js';
import { products } from '../data/products.js';
import { currencyFormat } from './util.js/money.js';

const formatDeliveryDate = (daysFromToday) =>
    const dateString = dayjs().add(daysFromToday, 'day').format('dddd, MMMM D');

function deliveryOptionsHTML(productId, cartItem) {
    let html = '';

    deliveryOptions.forEach((option) => {
        const deliveryDate = dayjs().add(option.deliveryDays, 'day');
        const priceText =
            option.priceCents === 0
                ? 'FREE Shipping'
                : `${currencyFormat(option.priceCents)} - Shipping`;

        const selectedDeliveryOptionId = cartItem?.deliveryOptionsId || '1';
        const isChecked = option.id === selectedDeliveryOptionId;

        html += `
            <div class="delivery-option">
                <input
                    type="radio"
                    ${isChecked ? 'checked' : ''}
                    id="delivery-${productId}-option-${option.id}"
                    class="delivery-option-input"
                    name="delivery-option-${productId}"
                    value="${option.id}"
                />
                <label for="delivery-${productId}-option-${option.id}">
                    <div class="delivery-option-date">${deliveryDate.format('dddd, MMMM D')}</div>
                    <div class="delivery-option-price">${priceText}</div>
                </label>
            </div>
        `;
    });

    return html;
}

let cartSummaryHTML = '';

cart.forEach((item) => {
    const productId = item.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container" data-product-id="${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${formatDeliveryDate(7)}</div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}" />

                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">${currencyFormat(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary"> Update </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}"> Delete </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML(matchingProduct.id, item)}
                </div>
            </div>
        </div>
    `;
});

const orderSummary = document.querySelector('.js-order-summary');

if (orderSummary) {
    orderSummary.innerHTML = cartSummaryHTML;
}

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container[data-product-id="${productId}"]`).remove();
    });
});

updateCartTotal();

const today = dayjs();
const delivearyDate = today.add(7, 'days');
console.log(delivearyDate.format('dddd,MMMM,D'));
