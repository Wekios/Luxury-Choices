import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  cartReducer,
  userLoginReducer,
} from "store/reducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

function getFromStorage<T>(key: string, fallback: T): string | T {
  let items = localStorage.getItem(key);
  if (items) return JSON.parse(items);
  else return fallback;
}

const cartItemsFromStorage = getFromStorage<[]>("cartItems", []);
const userInfoFromStorage = getFromStorage<null>("userInfo", null);

export interface IRootState {
  productList: any;
  productDetails: any;
  cart: any;
  userLogin: any;
}

const initialState: IRootState = {
  productList: {},
  productDetails: {},
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
