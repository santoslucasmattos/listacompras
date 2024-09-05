// Seleciona os elementos do DOM
const shoppingForm = document.getElementById('shopping-form');
const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const shoppingList = document.getElementById('shopping-list');
const totalPriceDisplay = document.getElementById('total-price');

let totalPrice = 0;

// Função para formatar valores monetários
function formatCurrency(value) {
  return value.toFixed(2).replace('.', ',');
}

// Função para atualizar o total
function updateTotal(price) {
  totalPrice += parseFloat(price);
  totalPriceDisplay.textContent = formatCurrency(totalPrice);
}

// Função para remover um item e atualizar o total
function removeItem(li, price) {
  shoppingList.removeChild(li);
  totalPrice -= parseFloat(price);
  totalPriceDisplay.textContent = formatCurrency(totalPrice);
}

// Função para adicionar item
shoppingForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  const price = parseFloat(priceInput.value);

  // Cria um novo item na lista
  const li = document.createElement('li');
  li.innerHTML = `
    ${newItem} - R$ ${formatCurrency(price)}
    <button class="delete-btn">Excluir</button>
  `;

  // Adiciona o item à lista
  shoppingList.appendChild(li);

  // Atualiza o total
  updateTotal(price);

  // Limpa os campos de entrada
  itemInput.value = '';
  priceInput.value = '';

  // Adiciona funcionalidade de excluir
  li.querySelector('.delete-btn').addEventListener('click', function() {
    removeItem(li, price);
  });
});
