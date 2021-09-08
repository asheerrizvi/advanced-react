export default function calcTotalPrice(cart) {
  return cart.reduce((total, cartItem) => {
    // Products can be deleted but they could still be in the
    if (!cartItem.product) return total;

    return total + cartItem.quantity * cartItem.product.price;
  }, 0);
}
