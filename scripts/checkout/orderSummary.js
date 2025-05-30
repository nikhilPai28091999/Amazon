import {
  cart,
  deleteFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// Initialize the dayjs format plugin
if (dayjs.extend) {
  dayjs.extend(window.dayjs_plugin_customParseFormat);
}

export function renderOrderSummary() {
  let cartHtml = ""; // Initialize with empty string to avoid undefined

  cart.forEach((item) => {
    const matchingProduct = getProduct(item.productId);
    const deliveryOptionId = item.deliveryOptionId;
    const macthingDeliveryItem = getDeliveryOption(deliveryOptionId);

    cartHtml += `
    <div class="cart-item-container js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${getDateString(
        macthingDeliveryItem
      )}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${formatCurrency(
            matchingProduct.priceCents
          )}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${
              item.quantity
            }</span> </span>
            <span class="delete-quantity-link link-primary js-delete-from-cart" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryDatefn(matchingProduct, item)}
        </div>
      </div>
    </div>
    `;
  });

  function getDateString(deliveryOption) {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");
    return dateString;
  }

  function deliveryDatefn(matchingProduct, item) {
    let deliveryHTML = ""; // Initialize with empty string to avoid undefined
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = getDateString(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;

      deliveryHTML += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input
            ${isChecked ? "checked" : ""}
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} - Shipping</div>
            </div>
          </div>
          `;
    });

    return deliveryHTML;
  }

  document.querySelector(".order-summary").innerHTML = cartHtml;

  document.querySelectorAll(".js-delete-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      deleteFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      updateCartQuantity();
      renderPaymentSummary();
      console.log(cart);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      updateDeliveryOption(
        element.dataset.productId,
        element.dataset.deliveryOptionId
      );
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
