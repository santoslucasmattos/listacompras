const form = document.getElementById('product-form');
const productInput = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const shoppingList = document.getElementById('shopping-list');
const totalPriceElement = document.getElementById('total-price');
const startScanButton = document.getElementById('start-scan');
const interactiveElement = document.getElementById('interactive');

let totalPrice = 0;

// Função para adicionar produto manualmente
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const product = productInput.value;
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceInput.value);
  const totalItemPrice = quantity * price;

  // Adicionar o produto à lista
  addProductToList(product, quantity, totalItemPrice);

  // Limpar os campos do formulário
  productInput.value = '';
  quantityInput.value = '';
  priceInput.value = '';
});

// Função para adicionar produto à lista
function addProductToList(product, quantity, totalItemPrice) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    ${quantity}x ${product} - R$ ${totalItemPrice.toFixed(2)}
    <button class="delete-btn">Remover</button>
  `;
  shoppingList.appendChild(listItem);

  // Atualizar o preço total
  totalPrice += totalItemPrice;
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Função de remover item da lista
  listItem.querySelector('.delete-btn').addEventListener('click', function () {
    shoppingList.removeChild(listItem);
    totalPrice -= totalItemPrice;
    totalPriceElement.textContent = totalPrice.toFixed(2);
  });
}

// Função para iniciar o scanner de código de barras
startScanButton.addEventListener('click', function () {
  interactiveElement.style.display = 'block'; // Mostrar a área de vídeo

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#interactive')
    },
    decoder: {
      readers: ["ean_reader"] // Leitor de códigos de barras padrão EAN
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    Quagga.start();
  });

  // Função para capturar o código de barras identificado
  Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    alert("Código de barras identificado: " + code);
    
    // Aqui você pode adicionar uma busca para identificar o produto e o preço com base no código de barras.
    // Para este exemplo, vou adicionar um produto genérico usando o código.
    const produtoIdentificado = `Produto ${code}`;
    const quantidade = 1;
    const preco = 10.00; // Você poderia fazer uma busca em uma API para encontrar o preço real do produto

    addProductToList(produtoIdentificado, quantidade, preco);

    // Parar o scanner após a leitura do código
    Quagga.stop();
    interactiveElement.style.display = 'none'; // Esconder a área de vídeo após a leitura
  });
});
