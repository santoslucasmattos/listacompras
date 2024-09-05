const form = document.getElementById('product-form');
const productInput = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const shoppingList = document.getElementById('shopping-list');
const totalPriceElement = document.getElementById('total-price');

let totalPrice = 0;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const product = productInput.value;
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const totalItemPrice = quantity * price;

  // Adicionar o produto à lista
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    ${quantity}x ${product} - R$ ${totalItemPrice.toFixed(2)}
    <button class="delete-btn">Remover</button>
  `;
  shoppingList.appendChild(listItem);

  // Atualizar o preço total
  totalPrice += totalItemPrice;
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Limpar os campos do formulário
  productInput.value = '';
  quantityInput.value = '';
  priceInput.value = '';

  // Função de remover item da lista
  listItem.querySelector('.delete-btn').addEventListener('click', function () {
    shoppingList.removeChild(listItem);
    totalPrice -= totalItemPrice;
    totalPriceElement.textContent = totalPrice.toFixed(2);
  });
});
