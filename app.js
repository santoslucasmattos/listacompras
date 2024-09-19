document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  const productList = document.getElementById("shopping-list");
  const totalPriceEl = document.getElementById("total-price");
  let totalPrice = 0;

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    const itemTotal = quantity * price;
    totalPrice += itemTotal;

    // Criar o item na lista com a opção de editar
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${product} - Qtd: <span class="quantity">${quantity}</span> - Preço: R$ <span class="price">${price.toFixed(2)}</span></span>
      <button class="edit-button">Editar</button>
    `;
    productList.appendChild(listItem);

    // Atualiza o total
    totalPriceEl.textContent = totalPrice.toFixed(2);

    // Limpar o formulário
    productForm.reset();

    // Adicionar funcionalidade de edição
    const editButton = listItem.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      const quantitySpan = listItem.querySelector(".quantity");
      const priceSpan = listItem.querySelector(".price");

      // Criar campos de edição
      const newQuantity = prompt("Altere a quantidade:", quantitySpan.textContent);
      const newPrice = prompt("Altere o preço:", priceSpan.textContent);

      if (newQuantity !== null && newPrice !== null) {
        // Atualiza os valores no item
        const oldItemTotal = parseFloat(quantitySpan.textContent) * parseFloat(priceSpan.textContent);
        quantitySpan.textContent = newQuantity;
        priceSpan.textContent = parseFloat(newPrice).toFixed(2);

        // Atualiza o total geral
        const newItemTotal = parseFloat(newQuantity) * parseFloat(newPrice);
        totalPrice = totalPrice - oldItemTotal + newItemTotal;
        totalPriceEl.textContent = totalPrice.toFixed(2);
      }
    });
  });
});
