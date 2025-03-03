document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products");
  const cartBody = document.querySelector(".cart-body");
  const cartQty = document.querySelector(".cart-qty");
  const cartTotal = document.querySelector(".cart-total");
  const cartAvgPrice = document.querySelector(".cart-avg-price");
  const cartSortSelect = document.querySelector("#sort-price");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartElement = document.querySelector(".cart");
  const cartClose = document.querySelector(".cart-close");
  const cartBtn = document.querySelector(".cart-btn");
  const cartClear = document.querySelector(".cart-clear");
  const minPriceInput = document.querySelector("#min-price");
  const maxPriceInput = document.querySelector("#max-price");
  const applyFilterBtn = document.querySelector(".apply-filter");

  const notification = document.createElement("div");
  document.body.appendChild(notification);
  notification.classList.add("notification");

  let products = [];
  let cart = new Map();

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function displayProducts(productList) {
    productsContainer.innerHTML = "";
    productList.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.classList.add("product");
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p class="desc">${product.description.substring(0, 50)}...</p>
        <p class="price">Price: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productsContainer.appendChild(productEl);
    });

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });
  }

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);

    if (!cart.has(productId)) {
      cart.set(productId, { ...product, quantity: 1 });
      appendCartItem(cart.get(productId));
    } else {
      const cartItem = cart.get(productId);
      cartItem.quantity += 1;
      updateCartItemUI(productId, cartItem.quantity);
    }
    updateCartSummary();
    showNotification(product.title);
  }

  function appendCartItem(item) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-id", item.id);
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p class="price">Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <span class="quantity">1</span>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    cartBody.appendChild(cartItem);
    addCartItemEventListeners(cartItem);
  }

  function updateCartItemUI(productId, quantity) {
    const cartItem = document.querySelector(
      `.cart-item[data-id='${productId}']`
    );
    if (cartItem) {
      const item = cart.get(productId);
      cartItem.querySelector(".quantity").textContent = quantity;
      cartItem.querySelector(".price").textContent = `Price: $${(
        item.price * item.quantity
      ).toFixed(2)}`;
    }
  }

  function updateCartSummary() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
    });

    cartQty.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartAvgPrice.textContent = totalItems
      ? `$${(totalPrice / totalItems).toFixed(2)}`
      : "$0.00";
  }

  function addCartItemEventListeners(cartItem) {
    cartItem.querySelector(".increase").addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      increaseQuantity(productId);
    });

    cartItem.querySelector(".decrease").addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      decreaseQuantity(productId);
    });
  }

  function increaseQuantity(productId) {
    if (cart.has(productId)) {
      const cartItem = cart.get(productId);
      cartItem.quantity += 1;
      updateCartItemUI(productId, cartItem.quantity);
      updateCartSummary();
    }
  }

  function decreaseQuantity(productId) {
    if (cart.has(productId)) {
      const cartItem = cart.get(productId);
      if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
            updateCartItemUI(productId, cartItem.quantity);
      } else {
        cart.delete(productId);
        removeCartItemUI(productId);
      }
      updateCartSummary();
     
    }
  }

  function removeCartItemUI(productId) {
    const cartItem = document.querySelector(
      `.cart-item[data-id='${productId}']`
    );
    if (cartItem) cartItem.remove();
  }

  cartClear.addEventListener("click", () => {
    cart.clear();
    cartBody.innerHTML = "";
    updateCartSummary();
  });

  cartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("show");
    cartElement.classList.add("show");
  });

  cartClose.addEventListener("click", () => {
    cartOverlay.classList.remove("show");
    cartElement.classList.remove("show");
  });

  function showNotification(productTitle) {
    notification.textContent = `${productTitle} added to cart!`;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
    }
    console.log(document.querySelector(".cart-qty"));

  // 🛒 Filter by price
  applyFilterBtn.addEventListener("click", () => {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    const filteredCart = [...cart.values()].filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    cartBody.innerHTML = "";
    filteredCart.forEach((item) => appendCartItem(item));
    updateCartSummary();
  });

  // 🔄 Sort by price
  cartSortSelect.addEventListener("change", () => {
    const sortBy = cartSortSelect.value;
    const sortedCart = [...cart.values()].sort((a, b) =>
      sortBy === "low-high" ? a.price * a.quantity - b.price * b.quantity
        : b.price * b.quantity - a.price * a.quantity )

    cartBody.innerHTML = "";
    sortedCart.forEach((item) => appendCartItem(item));
  });

  fetchProducts();
});
