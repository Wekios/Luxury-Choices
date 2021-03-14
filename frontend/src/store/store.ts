import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "features/product";
import { cartReducer } from "features/cart";
import { userReducer } from "features/user";
import { callAPIMiddleware } from "./middleware";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof reducer>;

export type ThunkResult<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const middleware = [thunk, callAPIMiddleware];

export const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);
