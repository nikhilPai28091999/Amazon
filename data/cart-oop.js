function Cart() {
  const cart = {
    cartItems: undefined,
    cartQuantity: 0,
    loadFromStorage: function () {
      this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));
      this.cartQuantity = localStorage.getItem("cartQuantity-oop");

      if (!this.cartItems) {
        this.cartItems = [
          {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "2",
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "3",
          },
        ];
      }

      if (!this.cartQuantity) {
        this.cartQuantity = 0;
      }
    },
    saveToStorage: function () {
      localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    },
    saveCartQuantity: function () {
      localStorage.setItem(
        "cartQuantity-oop",
        JSON.stringify(this.cartQuantity)
      );
    },
    addToCart: function (productId) {
      let matchingItem;

      if (!this.cartItems) {
        this.cartItems.forEach((item) => {
          if (item.productId === productId) {
            matchingItem = item;
          }
        });
      }

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          id: productId,
          quantity: 1,
        });
      }
      this.saveToStorage();
    },
    deleteFromCart: function (productId) {
      const newCart = this.cartItems.filter((item) => item.id !== productId);
      this.cartItems = newCart;
      this.saveToStorage();
      return newCart;
    },
    updateCartQuantity: function () {
      this.cartQuantity = 0;
      this.cartItems.forEach((item) => {
        this.cartQuantity += item.quantity;
      });
    },
    updateDeliveryOption: function (productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((item) => {
        if (item.id === productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart();

cart.loadFromStorage();
// document.querySelector(".js-cart-quantity").innerHTML = cart.cartQuantity;
cart.saveCartQuantity();

console.log(cart);
