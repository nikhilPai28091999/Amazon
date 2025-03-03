const products = [
  {
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    Image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    priceCents: 1090,
  },
  {
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    Image: "images/products/intermediate-composite-basketball.jpg",
    priceCents: 2095,
  },
];

let productsHtml = "";

products.map((product) => {
  productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${product.Image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.priceCents * 10}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>`;
});
console.log(productsHtml);
document.querySelector(".js-products").innerHTML = productsHtml;
