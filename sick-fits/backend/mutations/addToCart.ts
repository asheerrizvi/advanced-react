import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current user and see if they are signed in.
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user's cart.
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );
    // 3. See if the item they are adding is already in their cart:
    // 4. increment if it is in the cart.
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 5. create new if it is not in the cart.
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}

export default addToCart;
