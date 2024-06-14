// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("product-modal");
    const modalContent = modal.querySelector(".modal-content");
    const span = modal.querySelector(".close");
    const addToCartButton = document.getElementById("add-to-cart");
    
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = product.getAttribute('data-price');
            let productStock = product.getAttribute('data-stock');

            document.getElementById("product-name").innerText = productName;
            document.getElementById("product-price").innerText = `Precio: $${productPrice}`;
            document.getElementById("product-stock").innerText = `Stock: ${productStock}`;

            modal.style.display = "block";

            addToCartButton.onclick = function() {
                if (productStock > 0) {
                    productStock--;
                    product.setAttribute('data-stock', productStock);
                    document.getElementById("product-stock").innerText = `Stock: ${productStock}`;

                    let cart = JSON.parse(localStorage.getItem('CompraProducto')) || [];
                    cart.push({ id: productId, name: productName, price: productPrice });
                    localStorage.setItem('CompraProducto', JSON.stringify(cart));
                } else {
                    alert('No hay suficiente stock.');
                }
            };
        });
    });

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

// carrito.js

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('CompraProducto')) || [];
    let totalPrice = 0;

    const updateTotalPrice = () => {
        totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    const removeCartItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('CompraProducto', JSON.stringify(cart));
        renderCartItems();
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('cart-item-details');

            const itemName = document.createElement('h4');
            itemName.textContent = item.name;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.price}`;

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', () => removeCartItem(index));

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);
            cartItem.appendChild(itemDetails);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
        });
        updateTotalPrice();
    };

    document.getElementById('checkout').addEventListener('click', function() {
        window.location.href = '/Pago.html';
    });

    renderCartItems();
});
