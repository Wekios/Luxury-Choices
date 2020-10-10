import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "store/constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log("cart reducer", state);

  switch (action.type) {
    case CART_ADD_ITEM:
      const addedProduct = action.payload;

      const productAlreadyInCart = state.cartItems.find(
        (product) => product.id === addedProduct.id
      );

      if (productAlreadyInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === productAlreadyInCart.id ? addedProduct : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, addedProduct],
        };
      }

    default:
      return state;
  }
};
