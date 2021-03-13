import axios from "axios";
import { IProduct } from "./productModel";
import { ThunkResult } from "store/store";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

interface RequestProduct {
  type: typeof PRODUCT_DETAILS_REQUEST;
}

interface FetchProductSuccess {
  type: typeof PRODUCT_DETAILS_SUCCESS;
  payload: IProduct;
}

interface FetchProductFail {
  type: typeof PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type ProductDetailsActions =
  | RequestProduct
  | FetchProductSuccess
  | FetchProductFail;

export const fetchProduct = (id: IProduct["_id"]): ThunkResult => async (
  dispatch
) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data }: { data: IProduct } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export interface ProductDetail {
  error: string;
  loading: boolean;
  product: IProduct | null;
}

export const productDetailsState: ProductDetail = {
  error: "",
  loading: false,
  product: null,
};

export const productDetailsReducer = (
  state = productDetailsState,
  action: ProductDetailsActions
): ProductDetail => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
