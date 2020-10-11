import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "store/constants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
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

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
