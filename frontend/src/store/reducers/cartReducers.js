import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "store/constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedProduct = action.payload;

      // TODO: Think about refactoring this
      const productAlreadyInCart = state.cartItems.find(
        (product) => product._id === addedProduct._id
      );

      if (productAlreadyInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === productAlreadyInCart._id ? addedProduct : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, addedProduct],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};
