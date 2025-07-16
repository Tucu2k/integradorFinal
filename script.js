document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Vortex Run X",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/1011b872-402_A-removebg-preview.png"
    },
    {
      id: 2,
      name: "Neon Pulse",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/nike_dh5392-400_0000-removebg-preview.png"
    },
    {
      id: 3,
      name: "Skytrail Pro",
      price: 150,
      category: "Running",
      detail: "Running Shoe",
      image: "/assets/Zapatillas-maraton-New-Balance-FuelCell-SuperComp-Elite-v3-1024x1024-removebg-preview.png"
    },
    {
      id: 4,
      name: "Velvet Grace",
      price: 150,
      category: "Woman",
      detail: "Woman Shoe",
      image: "/assets/1a20ca02-1dfb-4a53-82df-77675e1ff9a7-d4487ddd25392b26b517471691498166-1024-1024-removebg-preview.png"
    },
    {
      id: 5,
      name: "Luna Etoile",
      price: 150,
      category: "Woman",
      detail: "Woman Shoe",
      image: "/assets/zapato-vestir-azul-mujer-dino-butelli-4-removebg-preview.png"
    },
    {
      id: 6,
      name: "Montecarlo Prime",
      price: 150,
      category: "Man",
      detail: "Man Shoe",
      image: "/assets/Palermo-Negro-1-removebg-preview.png"
    },
    {
      id: 7,
      name: "Sable Noir",
      price: 150,
      detail: "Man shoe",
      category: "Man",
      image: "/assets/dillan-1243-4-d9402e0854c3fdb27a17254654641202-1024-1024-removebg-preview.png"
    },
    {
      id: 8,
      name: "Stormkick Elite",
      price: 150,
      detail : "Football",
      category: "Football",
      image : "/assets/PU107767-01-6-removebg-preview.png"

    },
    {
      id: 9,
      name: "Inferno Blade",
      price: 150,
      detail : "Football",
      category: "Football",
      image: "/assets/D_NQ_NP_752859-MLA80098993734_102024-O-removebg-preview.png"

    },
    {
      id: 10,
      name: "Gravity Bounce",
      price: 150,
      detail : "Basket Shoe",
      category: "Basket",
      image : "/assets/TO89605-6-removebg-preview.png"
    },
    {
      id: 11,
      name: "Rebound ZR",
      price: 150,
      detail : "Basket Shoe",
      category: "Basket",
      image : "/assets/UA3026640-300-6-removebg-preview.png"
    },
    {
      id: 12,
      name: "Dunk Eclipse",
      price: 150,
      detail : "Basket Shoe",
      category: "Basket",
      image: "/assets/5f523250f151c-1924-4-removebg-preview.png"
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
  ''

  const toggleCartBtn = document.getElementById("toggle-cart");
  const cartDiv = document.getElementById("cart");
  const closecart = document.getElementById("closecart");

  toggleCartBtn.addEventListener("click", () => {
    cartDiv.classList.toggle("visible");
  });

  closecart.addEventListener("click", () => {
    cartDiv.classList.remove("visible");
  })


  const categories = ["Basket", "Woman", "Man", "Football", "Running"];
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



document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formmessage = document.getElementById("formMensaje");

  if (!name || !email || !message) {
    formmessage.textContent = "Por favor, completa todos los campos.";
    formmessage.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formmessage.textContent = "Por favor, ingresa un email válido.";
    formmessage.style.color = "red";
    return;
  }

  formmessage.textContent = "Mensaje enviado correctamente. ¡Gracias por contactarnos!";
  formmessage.style.color = "green";

  document.getElementById("contactForm").reset();
});

});




