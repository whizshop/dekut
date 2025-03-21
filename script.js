// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Cart functionality
  const addToCartButtons = document.querySelectorAll('.dish button');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const dish = this.closest('.dish');
      const dishName = dish.querySelector('h3').innerText;
      const dishPrice = dish.querySelector('p').innerText;
      const dishImage = dish.querySelector('img').src;

      const item = {
        name: dishName,
        price: dishPrice,
        image: dishImage,
      };

      cartItems.push(item);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert(`Added ${dishName} (${dishPrice}) to cart!`);
    });
  });

  // Display cart items on cart.html
  if (window.location.pathname.includes('cart.html')) {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let totalPrice = 0;

    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;
      cartContainer.appendChild(cartItem);

      totalPrice += parseFloat(item.price.replace('KES ', ''));
    });

    totalPriceElement.innerText = `KES ${totalPrice.toFixed(2)}`;
  }
});

function removeFromCart(itemName) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = cartItems.filter(item => item.name !== itemName);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert(`${itemName} removed from cart!`);
  location.reload();
}
