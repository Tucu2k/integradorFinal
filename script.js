document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Nike Rocket",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/deportiva_1-removebg-preview.png"
    },
    {
      id: 2,
      name: "Nike Blue Sky",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/deportiva_2-removebg-preview.png"
    },
    {
      id: 3,
      name: "Nike force 1",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/deportiva_3-removebg-preview.png"
    },
    {
      id: 4,
      name: "Zapato de mujer 1",
      price: 150,
      category: "Woman",
      detail: "Woman Shoe",
      image: "/assets/Mujer_1-removebg-preview.png"
    },
    {
      id: 5,
      name: "Zapato de mujer 2",
      price: 150,
      category: "Woman",
      detail: "Woman Shoe",
      image: "/assets/mujer_2-removebg-preview.png"
    },
    {
      id: 6,
      name: "Zapato de hombre 1",
      price: 150,
      category: "Man",
      detail: "Man Shoe",
    },
    {
      id: 7,
      name: "Zapato de hombre 2",
      price: 150,
      category: "Man"
    },
    {
      id: 8,
      name: "botines de futbol 1",
      price: 150,
      category: "Football"
    },
    {
      id: 9,
      name: "botines de futbol 2",
      price: 150,
      category: "Football"
    },
    {
      id: 10,
      name: "Basket shoes 1",
      price: 150,
      category: "Basket"
    },
    {
      id: 11,
      name: "Basket shoes 2",
      price: 150,
      category: "Basket"
    },
    {
      id: 12,
      name: "Basket shoes 3",
      price: 150,
      category: "Basket",
      image: ""
    }
  ];

  const productList = document.getElementById("product-list");
  const categoryFilter = document.getElementById("categoryFilter");

  function renderProducts(filtered = products) {
    productList.innerHTML = "";
    filtered.forEach((product) => {
      const li = document.createElement("li")
      li.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
        <h3>${product.name}</h3>
        <p>${product.detail}</p>
        <p><strong>$${product.price}</strong></p> 
        <button class="add-to-cart" 
          data-id="${product.id}"
          data-name="${product.name}" 
          data-price="${product.price}" 
          data-image="${product.image}">
          Añadir al carrito
        </button>`;
      productList.appendChild(li);
    });
    setupCartButtons();
  }

  function setupCartButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = button.dataset.price;
        const image = button.dataset.image;
        addToCart(id, name, price, image);
      });
    });
  }

  let cart = [];

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartUI();
  }

  // Helper function to save cart
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(id, name, price, image) {
    price = parseFloat(price);
    cart.push({ id, name, price, image });
    saveCartToLocalStorage();
    updateCartUI();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartUI();
  }

  function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 50px; vertical-align: middle; margin-right: 10px;">
        ${item.name} - $${item.price}
        <button class="remove-item" data-index="${index}"><i class="bi bi-x-octagon-fill"></i></button>`;
      cartItemsContainer.appendChild(li);
      total += item.price;
    });

    
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        removeFromCart(index);
      });
    });

    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  }
  

  const toggleCartBtn = document.getElementById("toggle-cart");
  const cartDiv = document.getElementById("cart");
  const closecart = document.getElementById("closecart");

  toggleCartBtn.addEventListener("click", () => {
    cartDiv.classList.toggle("visible");
  });

  closecart.addEventListener("click", () => {
    cartDiv.classList.remove("visible");
  })


  const categories = ["all", "Basket", "Woman", "Man", "Football", "Running"];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerHTML = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.addEventListener("change", (e) => {
    const selected = e.target.value;
    const filtered =
      selected === "all"
        ? products
        : products.filter((p) => p.category === selected);
    renderProducts(filtered);
  });

  renderProducts();



  const nav = document.querySelector("#nav");
  const abrir = document.querySelector("#abrir");
  const cerrar = document.querySelector("#cerrar");

  abrir.addEventListener("click" , () => {
    nav.classList.add("visible");
  })

  cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
  })





});




