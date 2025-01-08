// Select the form and attach a submit event listener
const orderForm = document.getElementById('form-container1');
orderForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Hide the form
    orderForm.style.display = 'none';

    // Display a thank-you message
    const message = document.createElement('p');
    message.textContent = "Thank you for placing this order. Hope you have a nice day!";
    message.style.color = "green";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";

    // Append the message below the form
    const formContainer = document.querySelector('.grid-container');
    formContainer.appendChild(message);
});