export let products = [];

function loadProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://supersimplebackend.dev/products');

    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response);
    });

    xhr.send();
}

loadProducts();
