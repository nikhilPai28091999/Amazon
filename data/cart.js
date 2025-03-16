export let cart = JSON.parse(localStorage.getItem("cart"));
export let cartQuantity = localStorage.getItem("cartQuantity");

if (!cart) {
  cart = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "2",
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
      deliveryOptionId: "3",
    },
  ];
}

if (!cartQuantity) {
  cartQuantity = 0;
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function saveCartQuantity() {
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
}

export function addToCart(productId) {
  let matchingItem;

  if (!cart) {
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });
  }

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveToStorage();
}

export function updateCartQuantity() {
  cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  saveCartQuantity();
}

export function deleteFromCart(productId) {
  //   debugger;
  const newCart = cart.filter((item) => item.productId !== productId);
  //   cart = newCart;
  saveToStorage();
  return newCart;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
