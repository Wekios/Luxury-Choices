import { IProduct } from "./productModel";
import { ThunkResult } from "store/store";
import axios from "axios";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

interface RequestProductList {
  type: typeof PRODUCT_LIST_REQUEST;
}

interface FetchProductListSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}

interface FetchProductListFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: string;
}

export type ProductListActions =
  | RequestProductList
  | FetchProductListSuccess
  | FetchProductListFail;

export const fetchProductList = (): ThunkResult => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export interface ProductList {
  products: IProduct[];
  loading: boolean;
  error: string;
}

export const productListState: ProductList = {
  products: [],
  loading: false,
  error: "",
};

export const productListReducer = (
  state = productListState,
  action: ProductListActions
): ProductList => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// export const ajaxRequest = (type: string, url: string) => (
//   param: any
// ): AppThunk => async (dispatch) => {
//   try {
//     dispatch({
//       type: `${type}_REQUEST`,
//     });

//     const { data } = await axios.get(url + param);

//     dispatch({
//       type: `${type}_SUCCESS`,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: `${type}_FAIL`,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
