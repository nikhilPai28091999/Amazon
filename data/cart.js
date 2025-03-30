export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export let cartQuantity = localStorage.getItem("cartQuantity");

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });
}

// if (!cart) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 1,
//       deliveryOptionId: "2",
//     },
//     {
//       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity: 1,
//       deliveryOptionId: "3",
//     },
//   ];
// }

if (!cartQuantity) {
  cartQuantity = 0;
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function saveCartQuantity() {
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
}

export function addToCart(productId, selectedQuantity) {
  let matchingItem;
  if (!cart) {
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });
  }

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function updateCartQuantity() {
  cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  saveCartQuantity();
  return cartQuantity;
}

export function deleteFromCart(productId) {
  const newCart = cart.filter((item) => item.productId !== productId);
  cart = newCart;
  saveToStorage();
  return newCart;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
