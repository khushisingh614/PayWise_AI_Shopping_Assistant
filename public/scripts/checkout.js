document.addEventListener("DOMContentLoaded", function() {
    // Sample data for cart items
    const cartItems = [
        { name: "Aashirvaad Wheat Flour", price:470, quantity: 1 },
        { name: "Refrigerator", price: 32000, quantity: 1 },
        { name: "Blue Polka Dot Dress", price: 900, quantity: 1 }
    ];

    // Function to format price as currency
    function formatPrice(price) {
        return `₹${price.toFixed(2)}`;
    }

    // Function to calculate the subtotal
    function calculateSubtotal() {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    }

    // Function to render cart items
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div>${item.name}</div>
                <div>${item.quantity} x ${formatPrice(item.price)}</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Function to render order summary
    function renderSummary() {
        const subtotalElement = document.getElementById('subtotal');
        const subtotal = calculateSubtotal();
        subtotalElement.textContent = formatPrice(subtotal);
    }

    // Initial rendering of cart items and summary
    renderCartItems();
    renderSummary();

    // Checkout button event listener
    document.getElementById('checkout-button').addEventListener('click', function() {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const useBadges = document.getElementById('use-badges').checked ? "Yes" : "No";
        alert(`Proceeding to payment with ${selectedPaymentMethod}. Use badges: ${useBadges}`);
    });
});
