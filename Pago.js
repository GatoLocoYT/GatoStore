// Pago.js

document.addEventListener('DOMContentLoaded', function() {
    const cashPaymentButton = document.getElementById('cash-payment');
    const cardPaymentButton = document.getElementById('card-payment');
    const cashSection = document.getElementById('cash-section');
    const cardSection = document.getElementById('card-section');
    const proceedCashPaymentButton = document.getElementById('proceed-cash-payment');
    const proceedCardPaymentButton = document.getElementById('proceed-card-payment');
    const totalPriceElement = document.getElementById('cash-total');
    const pagoFacilButton = document.getElementById('pago-facil');
    const rapipagoButton = document.getElementById('rapipago');

    let cart = JSON.parse(localStorage.getItem('CompraProducto')) || [];
    let totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    let discountedPrice = totalPrice * 0.85;

    cashPaymentButton.addEventListener('click', () => {
        cardSection.classList.add('hidden');
        cashSection.classList.remove('hidden');
        totalPriceElement.textContent = discountedPrice.toFixed(2);
    });

    cardPaymentButton.addEventListener('click', () => {
        cashSection.classList.add('hidden');
        cardSection.classList.remove('hidden');
    });

    const highlightSelected = (selectedButton) => {
        pagoFacilButton.classList.remove('selected');
        rapipagoButton.classList.remove('selected');
        selectedButton.classList.add('selected');
        proceedCashPaymentButton.classList.remove('hidden');
    };

    pagoFacilButton.addEventListener('click', () => {
        highlightSelected(pagoFacilButton);
    });

    rapipagoButton.addEventListener('click', () => {
        highlightSelected(rapipagoButton);
    });

    const generateInvoice = (discountApplied) => {
        const invoiceWindow = window.open('', '_blank');
        invoiceWindow.document.write('<html><head><title>Factura</title><style>');
        invoiceWindow.document.write('table { width: 100%; border-collapse: collapse; }');
        invoiceWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: left; }');
        invoiceWindow.document.write('th { background-color: #f2f2f2; }');
        invoiceWindow.document.write('</style></head><body>');
        invoiceWindow.document.write('<h1>Factura tipo C</h1>');
        invoiceWindow.document.write('<table><tr><th>Producto</th><th>Precio Unitario</th></tr>');
        cart.forEach(item => {
            invoiceWindow.document.write(`<tr><td>${item.name}</td><td>$${item.price}</td></tr>`);
        });
        invoiceWindow.document.write('</table>');
        invoiceWindow.document.write(`<h3>Total: $${discountApplied ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)}</h3>`);
        invoiceWindow.document.write('<button onclick="window.print()">Descargar PDF</button>');
        invoiceWindow.document.write('</body></html>');
        invoiceWindow.document.close();
    };

    proceedCashPaymentButton.addEventListener('click', () => {
        generateInvoice(true);
        alert('Pago realizado');
    });

    proceedCardPaymentButton.addEventListener('click', () => {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;

        if (cardNumber.length === 16 && cardExpiry.match(/\d{2}\/\d{2}/) && cardCvv.length === 3) {
            generateInvoice(false);
            alert('Pago realizado');
        } else {
            alert('Datos de tarjeta inválidos. Por favor, revise la información ingresada.');
        }
    });
});
