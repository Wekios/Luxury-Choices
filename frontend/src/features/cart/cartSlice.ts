import axios from "axios";
import { IProduct } from "features/product";
import { ThunkResult } from "store/store";
import { setIntoStorage, getFromStorage } from "utils/storage";

export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_ITEMS = "cartItems";

interface AddProduct {
  type: typeof CART_ADD_ITEM;
  payload: IProduct;
}

interface RemoveProduct {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export type CartActions = AddProduct | RemoveProduct;

export const addToCart = (
  id: IProduct["_id"],
  quantity: IProduct["quantity"]
): ThunkResult => async (dispatch, getState) => {
  const { data } = await axios(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  setIntoStorage(CART_ITEMS, getState().cart.cartItems);
};

export const removeFromCart = (id: IProduct["_id"]): ThunkResult => (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  setIntoStorage(CART_ITEMS, getState().cart.cartItems);
};

export const cartInitialState: {
  [CART_ITEMS]: IProduct[];
} = {
  [CART_ITEMS]: getFromStorage<[]>(CART_ITEMS, []),
};

export const cartReducer = (
  state = cartInitialState,
  action: CartActions
): typeof cartInitialState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedProduct = action.payload;

      const productAlreadyInCart = state.cartItems.find(
        (p) => p._id === addedProduct._id
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
