export function getDeliveryOption(deliveryOptionId) {
  let macthingDeliveryItem;
  deliveryOptions.forEach((deliveryOptionsItem) => {
    if (deliveryOptionsItem.id === deliveryOptionId) {
      macthingDeliveryItem = deliveryOptionsItem;
    }
  });

  return macthingDeliveryItem || macthingDeliveryItem[0];
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
