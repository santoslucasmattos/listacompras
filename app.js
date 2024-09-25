document.addEventListener("DOMContentLoaded", () => {
  // Array de produtos
  let products = [];

  // Elementos do DOM
  const productForm = document.getElementById("product-form");
  const productList = document.getElementById("shopping-list");
  const totalPriceEl = document.getElementById("total-price");

  // Função para atualizar a lista de produtos no DOM
  function updateProductList() {
    // Limpa a lista
    productList.innerHTML = '';

    // Atualiza a lista de produtos na tela
    products.forEach((product, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add('list-item'); // Adicionando classe para estilização
      listItem.innerHTML = `
        <span class="product-info">${product.name} - Qtd: <span class="quantity">${product.quantity}</span> - Preço: R$ <span class="price">${product.price.toFixed(2)}</span></span>
        <div class="action-buttons">
          <button class="edit-button" data-index="${index}"><i class="fas fa-pen"></i></button>
          <button class="delete-button" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      productList.appendChild(listItem);
    });

    // Atualiza o total
    updateTotalPrice();

    // Adiciona eventos aos botões de editar e excluir
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    editButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.closest("button").getAttribute("data-index");
        editProduct(index);
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.closest("button").getAttribute("data-index");
        deleteProduct(index);
      });
    });
  }

  // Função para adicionar produto
  function addProduct(product) {
    products.push(product);
    updateProductList();
  }

  // Função para editar produto
  function editProduct(index) {
    const product = products[index];
    const newQuantity = prompt("Altere a quantidade:", product.quantity);
    const newPrice = prompt("Altere o preço:", product.price);

    if (newQuantity !== null && newPrice !== null) {
      products[index].quantity = parseFloat(newQuantity);
      products[index].price = parseFloat(newPrice);
      updateProductList();
    }
  }

  // Função para excluir produto
  function deleteProduct(index) {
    products.splice(index, 1);
    updateProductList();
  }

  // Função para calcular e atualizar o preço total
  function updateTotalPrice() {
    const totalPrice = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    totalPriceEl.textContent = totalPrice.toFixed(2);
  }

  // Evento de submissão do formulário
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productName = document.getElementById("product").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    const newProduct = {
      name: productName,
      quantity: quantity,
      price: price
    };

    // Adicionar o novo produto ao array
    addProduct(newProduct);

    // Limpar o formulário
    productForm.reset();
  });
});
