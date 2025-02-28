function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayCart(cart);
}

function displayCart(cart) {
  const cartContainer = document.querySelector(".cart");
  const totalPriceElement = document.getElementById("total-price");
  const avgPriceElement = document.getElementById("avg-price");
  const maxPriceElement = document.getElementById("max-price");
  const minPriceElement = document.getElementById("min-price");
  cartContainer.innerHTML = "";

  let total = 0;
  let totalItems = 0;
  let maxPrice = 0;
  let minPrice = cart.length > 0 ? cart[0].price : 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
    totalItems += product.quantity;
    if (product.price > maxPrice) maxPrice = product.price;
    if (product.price < minPrice) minPrice = product.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
            <img src="${product.image}" width="100" height="100">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
    cartContainer.appendChild(div);
  });

  totalPriceElement.textContent = total.toFixed(2);
  avgPriceElement.textContent = totalItems
    ? (total / totalItems).toFixed(2)
    : 0;
  maxPriceElement.textContent = maxPrice.toFixed(2);
  minPriceElement.textContent = minPrice.toFixed(2);
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
  alert("Your cart is empty!");
}

function sortCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const sortOption = document.getElementById("sortOptions").value;
  cart.sort((a, b) =>
    sortOption === "asc" ? a.price - b.price : b.price - a.price
  );
  displayCart(cart);
}

function filterCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const filterPrice = parseFloat(document.getElementById("filterPrice").value);
  if (!isNaN(filterPrice)) {
    cart = cart.filter((product) => product.price > filterPrice);
  }
  displayCart(cart);
}

loadCart();
