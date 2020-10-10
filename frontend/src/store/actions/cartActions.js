import axios from "axios";
import { CART_ADD_ITEM } from "store/constants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productID: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
