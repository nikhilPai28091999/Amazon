import { orders } from "../scripts/checkout/paymentSummary.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct } from "./products.js";

function getDate(dateString) {
  const orderDate = new Date(dateString);

  // Get just the date part in YYYY-MM-DD format
  const dateOnly = orderDate.toISOString().split("T")[0];
  return dateOnly;
  console.log(dateOnly);
}

renderOrderGrid();

function renderOrderGrid() {
  let ordersHTML = "";
  orders.map((order) => {
    console.log(order);
    ordersHTML += `
    <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${getDate(order.orderTime)}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>
            ${renderProducts(order.products)}
          </div>
      `;
  });

  function renderProducts(products) {
    let productsHTML = "";
    products.map((product) => {
      const productDetails = getProduct(product.productId);
      console.log(product);
      productsHTML += `
      <div class="order-details-grid">
      <div class="product-image-container">
                      <img src="${productDetails.image}" />
                    </div>
        
                    <div class="product-details">
                      <div class="product-name">
                        ${productDetails.name}
                      </div>
                      <div class="product-delivery-date">Arriving on: August 15</div>
                      <div class="product-quantity">Quantity: ${product.quantity}</div>
                      <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png" />
                        <span class="buy-again-message">Buy it again</span>
                      </button>
                    </div>
        
                    <div class="product-actions">
                      <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                    </div>
        </div>
      `;
    });
    return productsHTML;
  }

  document.querySelector(".js-order-grid").innerHTML = ordersHTML;
}
