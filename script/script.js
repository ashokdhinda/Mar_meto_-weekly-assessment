async function fetchProducts() {
  const response = await fetch("./prodct.json");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
            <img src="${product.image}" width="100" height="100">
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
    productsContainer.appendChild(div);
  });
}

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = cart.find((product) => product.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

fetchProducts();
