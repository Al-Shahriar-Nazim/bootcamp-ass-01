function show(id) {
  document.querySelectorAll(".page").forEach(function (page) {
    page.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
  loadProductCatagories();
}

const loadProductCatagories = () => {
  products();
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayProductCatagories(data));
};

const displayProductCatagories = (catagories) => {
  const productCatagories = document.getElementById("product-container");
  productCatagories.innerHTML = "";

  for (let catagorie of catagories) {
    const button = document.createElement("button");
    button.innerHTML = `
        <p class="bg-gray-100 p-2 shadow-lg rounded-full hover:bg-indigo-600 hover:text-white">${catagorie}</p>
        `;
    // button.innerText = catagorie;
    button.onclick = () => {
      // 1. Remove 'btn-active' from all buttons
      document.querySelectorAll("#product-container button").forEach((btn) => {
        btn.classList.remove("btn-active");
      });

      // 2. Add 'btn-active' to clicked button
      button.classList.add("btn-active");
      loadCatagoryProduct(catagorie);
    };
    //step:4 append the container
    productCatagories.append(button);
  }
};

// all products
const products = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displaydata(data));
};

const displaydata = (products) => {
  // console.log(products);
  // 1.get the container and empty
  const allProducts = document.getElementById("all-products");
  allProducts.innerHTML = "";
  for (const product of products) {
    //2.create the element
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
 <div class="card bg-base-100 w-[80%] mx-auto md:w-75 shadow-sm h-full">
          <figure class="bg-gray-200 py-5">
            <img
              class="w-[150px] h-[150px]"
              src="${product.image}"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="w-30">
                <p
                  class="text-center text-blue-700 bg-indigo-200 p-1 rounded-3xl"
                >
                ${product.category}
                </p>
              </div>
              <div>
                <p class= "font-medium text-gray-600">
                  <span><i class="fa-solid fa-star text-yellow-500"></i></span>
  ${product.rating.rate} (${product.rating.count})
                </p>
              </div>
            </div>
            <h2 class="card-title">
             ${product.title}
            </h2>
            <h3 class="text-xl font-bold">$ ${product.price}</h3>

            <div class="mt-auto card-actions flex justify-end">
              <button onclick="loadCartDetails(${product.id})" class="btn shadow-lg">
                <i class="fa-solid fa-eye"></i>
                Details
              </button>
              <button class="btn btn-primary hover:bg-purple-700">
                <i class="fa-solid fa-cart-arrow-down"></i>
                Add
              </button>
            </div>
          </div>
        </div>
`;
    //apend the container
    allProducts.append(cardDiv);
    console.log(product);
  }
};

// load single catagory
const loadCatagoryProduct = (category) => {
  document.getElementById("all-products").classList.add("hidden");
  document.getElementById("singleContainer").classList.remove("hidden");
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => showProducts(data));
};
const showProducts = (products) => {
  const singleContainer = document.getElementById("singleContainer");
  singleContainer.innerHTML = "";

  for (let product of products) {
    // console.log(product)
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
<div class="card bg-base-100 w-[80%] mx-auto md:w-75 shadow-sm h-full">
          <figure class="bg-gray-200 py-5">
            <img
              class="w-[150px] h-[150px]"
              src="${product.image}"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div class="w-30">
                <p
                  class="text-center text-blue-700 bg-indigo-200 p-1 rounded-3xl"
                >
                ${product.category}
                </p>
              </div>
              <div>
                <p class= "font-medium text-gray-600">
                  <span><i class="fa-solid fa-star text-yellow-500"></i></span>
  ${product.rating.rate} (${product.rating.count})
                </p>
              </div>
            </div>
            <h2 class="card-title">
             ${product.title}
            </h2>
            <h3 class="text-xl font-bold">$ ${product.price}</h3>

            <div class="mt-auto card-actions flex justify-end">
              <button class="btn shadow-lg">
                <i class="fa-solid fa-eye"></i>
                Details
              </button>
              <button class="btn btn-primary hover:bg-purple-700">
                <i class="fa-solid fa-cart-arrow-down"></i>
                Add
              </button>
  
            </div>
          </div>
        </div>
    `;
    singleContainer.append(cardDiv);
  }
};

const showAll = () => {
  document.getElementById("singleContainer").classList.add("hidden");
  document.getElementById("all-products").classList.remove("hidden");
  products();
  // Remove active from all category buttons
  document.querySelectorAll("#product-container button").forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  // Add active to All button
  // document.querySelector("#proudcts .btn").classList.add("btn-active");
};

const loadCartDetails = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetails(details);
};

const displayCardDetails = (word) => {
  // console.log(word)
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
   <div class="card bg-base-100 w-full md:w-96 shadow-sm">
              <figure class="bg-gray-200 pb-5">
                <img
                  class="w-[150px]"
                  src=${word.image}
                  alt="Shoes"
                />
              </figure>
              <div class="card-body">
                <div class="flex items-center justify-between">
                  <div class="w-30">
                    <p
                      class="text-center text-blue-700 bg-indigo-200 p-2 rounded-3xl font-medium"
                    >
                      ${word.category}
                    </p>
                  </div>
                  <div>
                    <p class="text-xl font-medium text-gray-600">
                      <span
                        ><i class="fa-solid fa-star text-yellow-500"></i
                      ></span>
                      ${word.rating.rate}(${word.rating.count})
                    </p>
                  </div>
                </div>
                <h2 class="card-title">
              ${word.title}
                </h2>
                <p class="text-xs font-medium text-gray-400">${word.description}</p>
                <h3 class="text-xl font-bold">$ ${word.price}</h3>

                <div class="card-actions flex justify-end">
                  <button class="btn btn-primary">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
  `;

  document.getElementById("card_model").showModal();
};
