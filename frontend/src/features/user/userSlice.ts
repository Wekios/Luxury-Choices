import axios from "axios";
import { User } from "./userModel";
import { store, ThunkResult } from "store/store";
import {
  getFromStorage,
  setIntoStorage,
  removeFromStorage,
} from "utils/storage";
import { Dispatch } from "redux";
import { GenericRequest, GenericFail, GenericSuccess } from "types/types";
import { CallAPIMiddlewareAction } from "store/middleware";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";

export const USER_UPDATE_DETAILS_REQUEST = "USER_UPDATE_DETAILS_REQUEST";
export const USER_UPDATE_DETAILS_SUCCESS = "USER_UPDATE_DETAILS_SUCCESS";
export const USER_UPDATE_DETAILS_FAIL = "USER_UPDATE_DETAILS_FAIL";
export const USER_UPDATE_DETAILS_RESET = "USER_UPDATE_DETAILS_RESET";

export type UserActions =
  | GenericRequest<typeof USER_REGISTER_REQUEST>
  | GenericSuccess<typeof USER_REGISTER_SUCCESS, User>
  | GenericFail<typeof USER_REGISTER_FAIL, string>
  | GenericRequest<typeof USER_LOGIN_REQUEST>
  | GenericSuccess<typeof USER_LOGIN_SUCCESS, User>
  | GenericFail<typeof USER_LOGIN_FAIL, string>
  | GenericRequest<typeof USER_LOGOUT>
  | GenericRequest<typeof USER_DETAILS_REQUEST>
  | GenericSuccess<typeof USER_DETAILS_SUCCESS, User>
  | GenericFail<typeof USER_DETAILS_FAIL, string>
  | GenericRequest<typeof USER_UPDATE_DETAILS_REQUEST>
  | GenericSuccess<typeof USER_UPDATE_DETAILS_SUCCESS, User>
  | GenericFail<typeof USER_UPDATE_DETAILS_FAIL, string>
  | GenericRequest<typeof USER_UPDATE_DETAILS_RESET>;

export function login(
  email: User["email"],
  password: User["password"]
): Omit<CallAPIMiddlewareAction, "type"> {
  return {
    types: [USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL],
    callAPI: () =>
      axios.post<User>(`/api/users/login`, {
        email,
        password,
      }),
  };
}

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

    const { data }: { data: User } = await axios.post("/api/users", {
      name,
      email,
      password,
    });

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

export const getUser = (id: User["_id"]): ThunkResult => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { userInfo } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data }: { data: User } = await axios.get(
      `/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserProfile = (user: User): ThunkResult => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_UPDATE_DETAILS_REQUEST,
    });

    const { userInfo } = getState().user;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data }: { data: User } = await axios.put(
      "/api/users/profile",
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfileReset = () => {
  store.dispatch({
    type: USER_UPDATE_DETAILS_RESET,
  });
};

export const userState: {
  error: string;
  loading: boolean;
  userInfo: User | null;
  isProfileUpdated: boolean;
} = {
  error: "",
  loading: false,
  userInfo: getFromStorage<null>("userInfo", null),
  isProfileUpdated: false,
};

export const userReducer = (
  state = userState,
  action: UserActions
): typeof userState => {
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

    case USER_DETAILS_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_UPDATE_DETAILS_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isProfileUpdated: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_DETAILS_RESET:
      return { ...state, isProfileUpdated: false };

    default:
      return state;
  }
};
