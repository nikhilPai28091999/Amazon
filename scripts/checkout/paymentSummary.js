import { cart } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxPriceCents = productPriceCents + shippingPriceCents;
  const estimatedTexPriceCents = totalBeforeTaxPriceCents * 0.1;
  const totalCents = totalBeforeTaxPriceCents + estimatedTexPriceCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(
          productPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(
          shippingPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalBeforeTaxPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(
          estimatedTexPriceCents
        )}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
  `;

  function addOrder(order) {
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      const order = await response.json();
      addOrder(order);
      console.log(order);

      window.location.href = "orders.html";
      localStorage.removeItem("cart");
      localStorage.removeItem("cartQuantity");
    });
}
