import axios from "axios";

import { ThunkResult } from "store/store";
import { getFromStorage, setIntoStorage } from "utils/storage";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

interface RequestLogin {
  type: typeof USER_LOGIN_REQUEST;
}

interface RequestLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: any;
}

interface RequestLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}

interface RequestUserLogout {
  type: typeof USER_LOGOUT;
}

export type UserActions =
  | RequestLogin
  | RequestLoginSuccess
  | RequestLoginFail
  | RequestUserLogout;

export interface User {
  email: string;
  password: string;
}

export const login = (
  email: User["email"],
  password: User["password"]
): ThunkResult => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    setIntoStorage("userInfo", data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userState: {
  error: string;
  loading: boolean;
  userInfo: User | null;
} = {
  error: "",
  loading: false,
  userInfo: getFromStorage<null>("userInfo", null),
};

export const userReducer = (state = userState, action: UserActions) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      // TODO: this needs more work
      return state;
    default:
      return state;
  }
};
