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
  // console.log(catagories)
  // step-1: get the container and empty
  const productCatagories = document.getElementById("product-container");
  productCatagories.innerHTML = "";
  //step-2: get in to every catagorie
  for (let catagorie of catagories) {
    console.log(catagorie);
    // setp-3 : create element
    const button = document.createElement("button");
    button.innerHTML = `
        <button class="btn rounded-full">${catagorie}</button>
        `;
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
    //apend the container
    allProducts.append(cardDiv);
    console.log(product);
  }
};
