export let cart = JSON.parse(localStorage.getItem("cart"));
export let cartQuantity = JSON.parse(localStorage.getItem("cart-quantity"));

if (!cart) {
  cart = [];
}

if (!cartQuantity) {
  cartQuantity = 0;
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  if (cart) {
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
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  saveToStorage();
}

export function deleteFromCart(productId) {
  //   debugger;
  const newCart = cart.filter((item) => item.productId !== productId);
  //   cart = newCart;
  saveToStorage();
  return newCart;
}
