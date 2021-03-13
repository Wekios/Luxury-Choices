import axios from "axios";
import { User } from "./userModel";
import { ThunkResult } from "store/store";
import {
  getFromStorage,
  setIntoStorage,
  removeFromStorage,
} from "utils/storage";
import { Dispatch } from "redux";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

interface RequestRegister {
  type: typeof USER_REGISTER_REQUEST;
}
interface RequestRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: User;
}
interface RequestRegisterFail {
  type: typeof USER_REGISTER_FAIL;
  payload: string;
}
interface RequestLogin {
  type: typeof USER_LOGIN_REQUEST;
}
interface RequestLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: User;
}
interface RequestLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}
interface RequestUserLogout {
  type: typeof USER_LOGOUT;
}

export type UserActions =
  | RequestRegister
  | RequestRegisterSuccess
  | RequestRegisterFail
  | RequestLogin
  | RequestLoginSuccess
  | RequestLoginFail
  | RequestUserLogout;

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

    const { data }: { data: User } = await axios.post(
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

export const logout = () => (dispatch: Dispatch) => {
  removeFromStorage("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (
  name: User["name"],
  email: User["email"],
  password: User["password"]
): ThunkResult => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data }: { data: User } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    setIntoStorage("userInfo", data);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
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
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};
