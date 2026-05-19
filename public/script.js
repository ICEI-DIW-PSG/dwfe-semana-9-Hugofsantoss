// =========================
// BASE DE DADOS (JSON)
// =========================

const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15",
      preco: 5999.90,
      categoria: "Celulares",
      imagem: "https://picsum.photos/300/200?1",
      descricao: "Smartphone Apple com câmera avançada.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Galaxy S24",
      preco: 4899.90,
      categoria: "Celulares",
      imagem: "https://picsum.photos/300/200?2",
      descricao: "Celular Samsung de última geração.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell",
      preco: 4200.00,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/300/200?3",
      descricao: "Notebook ideal para estudos e trabalho.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air",
      preco: 8999.90,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/300/200?4",
      descricao: "Notebook Apple leve e poderoso.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 199.90,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/300/200?5",
      descricao: "Mouse RGB com alta precisão.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 349.90,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/300/200?6",
      descricao: "Teclado mecânico com iluminação RGB.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4299.90,
      categoria: "Games",
      imagem: "https://picsum.photos/300/200?7",
      descricao: "Console de nova geração da Sony.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 3999.90,
      categoria: "Games",
      imagem: "https://picsum.photos/300/200?8",
      descricao: "Console poderoso da Microsoft.",
      emEstoque: true
    }
  ]
};

// =========================
// SELEÇÃO DE ELEMENTOS (DOM)
// =========================

// getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const btnRender = document.getElementById("btnRender");

// querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

// =========================
// FUNÇÕES
// =========================

// Formatar preço
function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

// Criar card
function createProductCard(produto) {

  // createElement
  const card = document.createElement("div");

  // setAttribute
  card.setAttribute("data-id", produto.id);

  // classList.add
  card.classList.add("card");

  // style
  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";

  // Imagem
  const image = document.createElement("img");
  image.src = produto.imagem;
  image.alt = produto.nome;

  // Conteúdo
  const content = document.createElement("div");
  content.classList.add("card-content");

  // Título
  const title = document.createElement("h3");
  title.textContent = produto.nome;
  title.classList.add("card-title");

  // Preço
  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);
  price.classList.add("price");

  // Categoria
  const category = document.createElement("p");
  category.textContent = produto.categoria;
  category.classList.add("category");

  // Área dos botões
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("card-buttons");

  // Botão detalhes
  const detailsBtn = document.createElement("button");
  detailsBtn.textContent = "Ver detalhes";

  detailsBtn.addEventListener("click", () => {
    showProductDetails(produto);
  });

  // Botão destacar
  const highlightBtn = document.createElement("button");
  highlightBtn.textContent = "Destacar";

  highlightBtn.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  // appendChild
  buttonsDiv.appendChild(detailsBtn);
  buttonsDiv.appendChild(highlightBtn);

  content.appendChild(title);
  content.appendChild(price);
  content.appendChild(category);
  content.appendChild(buttonsDiv);

  card.appendChild(image);
  card.appendChild(content);

  return card;
}

// Renderizar produtos
function renderProducts(produtos) {

  // Limpar lista
  productList.innerHTML = "";

  produtos.forEach((produto) => {
    const card = createProductCard(produto);

    // appendChild
    productList.appendChild(card);
  });

  // querySelectorAll
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {
    console.log("Card renderizado ID:", card.dataset.id);

    // pequeno efeito visual
    card.style.transition = "0.3s";
  });
}

// Renderizar categorias
function renderCategories() {

  categorySelect.innerHTML = "";

  // Opção Todas
  const defaultOption = document.createElement("option");
  defaultOption.value = "Todas";
  defaultOption.textContent = "Todas";

  categorySelect.appendChild(defaultOption);

  // Pegar categorias únicas
  const categorias = [
    ...new Set(data.produtos.map((produto) => produto.categoria))
  ];

  categorias.forEach((categoria) => {

    const option = document.createElement("option");

    option.value = categoria;
    option.textContent = categoria;

    categorySelect.appendChild(option);
  });
}

// Mostrar detalhes
function showProductDetails(produto) {

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>

    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <p>
      <strong>Estoque:</strong>
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

// Filtrar produtos
function filterProducts() {

  const searchText = searchInput.value.toLowerCase();

  const selectedCategory = categorySelect.value;

  return data.produtos.filter((produto) => {

    const matchesText =
      produto.nome.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "Todas" ||
      produto.categoria === selectedCategory;

    return matchesText && matchesCategory;
  });
}

// =========================
// EVENTOS
// =========================

// Input busca
searchInput.addEventListener("input", () => {

  const filtered = filterProducts();

  renderProducts(filtered);
});

// Mudança categoria
categorySelect.addEventListener("change", () => {

  const filtered = filterProducts();

  renderProducts(filtered);
});

// Botão renderizar
btnRender.addEventListener("click", () => {

  const filtered = filterProducts();

  renderProducts(filtered);
});

// =========================
// INICIALIZAÇÃO
// =========================

renderCategories();

renderProducts(data.produtos);