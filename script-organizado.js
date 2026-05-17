/* =========================
   CONFIGURAÇÕES
========================= */

const whatsappNumber = "5514996674524";
let cart = [];

/* =========================
   UTILITÁRIOS
========================= */

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",");
}

function changeImages(firstImageId, firstImageSrc, secondImageId, secondImageSrc) {
  document.getElementById(firstImageId).src = firstImageSrc;
  document.getElementById(secondImageId).src = secondImageSrc;
}

function getSelectedColor(colorId) {
  const colorElement = document.getElementById(colorId);

  if (colorElement.classList.contains("color-options")) {
    return colorElement.querySelector(".color-btn.active").dataset.color;
  }

  return colorElement.value;
}

function increaseQuantity(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(id) {
  const input = document.getElementById(id);

  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

/* =========================
   SELETOR DE CORES
========================= */

document.querySelectorAll(".color-options").forEach((group) => {
  const buttons = group.querySelectorAll(".color-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

/* =========================
   CARRINHO
========================= */

function addToCart(name, price, colorId, sizeId, quantityId) {

  const color = getSelectedColor(colorId);
  const size = document.getElementById(sizeId).value;
  const quantity = parseInt(document.getElementById(quantityId).value);

  cart.push({
    name,
    price,
    color,
    size,
    quantity
  });

  updateCart();
  openCart();
}

function addComboCopa() {
  const corTop = getSelectedColor("cor-top-combo-copa");
  const corShorts = getSelectedColor("cor-shorts-combo-copa");
  const size = document.getElementById("tam-combo-copa").value;

  cart.push({
    name: "2 Conjuntos Copa",
    price: 119.80,
    color: `Top: ${corTop} | Shorts: ${corShorts}`,
    size
  });

  updateCart();
  openCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    const subtotal = item.price * item.quantity;

    total += subtotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Cor: ${item.color}</p>
        <p>Tamanho: ${item.size}</p>
        <p>Quantidade: ${item.quantity}</p>
        <p>Subtotal: R$ ${formatPrice(subtotal)}</p>

        <button onclick="removeItem(${index})">
          Remover
        </button>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = formatPrice(total);
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function openCart() {
  document.getElementById("cart").classList.add("active");
  document.getElementById("cart-overlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cart").classList.remove("active");
  document.getElementById("cart-overlay").classList.remove("active");
}

function finishOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let message = "Olá! Quero finalizar meu pedido na VYBES:%0A%0A";

  cart.forEach((item, index) => {

  const subtotal = item.price * item.quantity;

  message += `${index + 1}. ${item.name}%0A`;
  message += `Cor: ${item.color}%0A`;
  message += `Tamanho: ${item.size}%0A`;
  message += `Quantidade: ${item.quantity}%0A`;
  message += `Subtotal: R$ ${formatPrice(subtotal)}%0A%0A`;

});

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  message += `Total: R$ ${formatPrice(total)}%0A%0A`;
  message += "Aguardo o atendimento para combinar pagamento e entrega.";

  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

/* =========================
   FILTRO DOS PRODUTOS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const productCategory = card.dataset.category;

      if (selectedFilter === "todos" || selectedFilter === productCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});