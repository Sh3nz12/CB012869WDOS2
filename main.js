// Identifying DOM Elements
const dropdowns = document.getElementsByTagName('select');
const quantityInputs = document.querySelectorAll('input[type="number"]:not([readonly])');
const priceInputs = document.querySelectorAll('input[readonly]');
const addToCartButtons = document.querySelectorAll('#addtocartbtn');
const clearButtons = document.querySelectorAll('#clearBtn');
const orderSummaryTable = document.getElementById('order-summary').getElementsByTagName('tbody')[0];
const totalPriceElement = document.getElementById('totalPrice');
const displayTotalBtn = document.getElementById('displayTotalBtn');
const addToFavouritesBtn = document.getElementById('addToFavouritesBtn');
const applyFavouritesBtn = document.getElementById('applyFavouritesBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

// Variables
let orderSummary = [];
let favourites = [];

// Event Listeners
Array.from(addToCartButtons).forEach((btn, index) => {
    btn.addEventListener('click', () => addToCart(index));
});

Array.from(clearButtons).forEach((btn, index) => {
    btn.addEventListener('click', () => clearForm(index));
});

displayTotalBtn.addEventListener('click', displayTotal);
addToFavouritesBtn.addEventListener('click', addToFavourites);
applyFavouritesBtn.addEventListener('click', applyFavourites);
clearCartBtn.addEventListener('click', clearCart);

// Functions
function addToCart(index) {
    const productName = dropdowns[index].options[dropdowns[index].selectedIndex].text;
    const quantity = parseInt(quantityInputs[index].value);
    const price = parseFloat(priceInputs[index].value);

    if (!quantity || quantity <= 0) {
        alert('Error: Quantity must be specified and greater than zero.');
        return;
    }

    // Ensure the current price is calculated before adding to the cart
    if (price > 0) {
        orderSummary.push({ productName, quantity, price });
        updateOrderSummaryTable();
        clearForm(index);
    } else {
        alert('Error: Unable to calculate price. Please check the product and quantity.');
    }
}

function clearForm(index) {
    dropdowns[index].selectedIndex = 0;
    quantityInputs[index].value = '';
    priceInputs[index].value = '0';
}

function updateOrderSummaryTable() {
    orderSummaryTable.innerHTML = '';
    orderSummary.forEach((item, index) => {
        const row = document.createElement('tr');

        const productNameCell = document.createElement('td');
        productNameCell.textContent = item.productName;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price.toFixed(2);

        row.appendChild(productNameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        orderSummaryTable.appendChild(row);
    });
}

function displayTotal() {
    const total = orderSummary.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = `Total Price: ${total.toFixed(2)} LKR`;
}

function addToFavourites() {
    localStorage.setItem('favourites', JSON.stringify(orderSummary));
    alert('Favourites saved successfully!');
}

function applyFavourites() {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (savedFavourites) {
        orderSummary = savedFavourites;
        updateOrderSummaryTable();
        alert('Favourites applied successfully!');
    } else {
        alert('No favourites found.');
    }
}

function clearCart() {
    orderSummary = [];
    updateOrderSummaryTable();
    totalPriceElement.textContent = 'Total Price: 0 LKR';
}

// Automatically calculate price when quantity or dropdown is updated
Array.from(dropdowns).forEach((dropdown, index) => {
    dropdown.addEventListener('change', () => calculatePrice(index));
});

Array.from(quantityInputs).forEach((input, index) => {
    input.addEventListener('input', () => calculatePrice(index));
});

function calculatePrice(index) {
    const selectedOption = dropdowns[index].options[dropdowns[index].selectedIndex].text;
    const priceMatch = selectedOption.match(/Rs\.(\d+\.\d+)/);
    const unitPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;

    const quantity = parseInt(quantityInputs[index].value) || 0;

    if (quantity > 0) {
        priceInputs[index].value = (unitPrice * quantity).toFixed(2);
    } else {
        priceInputs[index].value = '0'; // Reset price if quantity is invalid
    }
}




