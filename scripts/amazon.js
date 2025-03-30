import {
  cart,
  addToCart,
  saveToStorage,
  updateCartQuantity,
  cartQuantity,
} from "../data/cart.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProductsFetch(() => {}).then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
  let productsHtml = "";

  products.map((product) => {
    productsHtml += `
          <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src=${product.image}
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

            <div class="product-price">$${formatCurrency(
              product.priceCents
            )}</div>

            <div class="product-quantity-container js-quantity-selector">
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
            ${product.extraInfoHTML()}
            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-button" data-product-id = "${
              product.id
            }">Add to Cart</button>
          </div>`;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  document.querySelector(".js-products-grid").innerHTML = productsHtml;

  let selectedQuantity = 1;
  document.querySelectorAll(".js-quantity-selector").forEach((button) => {
    button.addEventListener("change", (event) => {
      {
        selectedQuantity = Number(event.target.value);
      }
    });
  });

  document.querySelectorAll(".js-add-button").forEach((button) => {
    button.addEventListener("click", () => {
      {
        const productId = button.dataset.productId;
        const productContainer = button.closest(".product-container");

        // Get the dropdown from within the same container as the clicked button
        const quantityDropdown = productContainer.querySelector("select");
        const selectedQuantity = Number(quantityDropdown.value);
        console.log(selectedQuantity);
        addToCart(productId, selectedQuantity);
        document.querySelector(".js-cart-quantity").innerHTML =
          updateCartQuantity();
      }
    });
  });
}
