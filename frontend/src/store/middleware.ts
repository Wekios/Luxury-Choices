import { AxiosError, AxiosPromise } from "axios";
import { Action, Dispatch } from "redux";
import { RootState } from "./store";

export interface CallAPIMiddlewareAction extends Action {
  types: [string, string, string];
  callAPI: () => AxiosPromise;
  shouldCallAPI?: (arg0: RootState) => boolean;
  payload?: {};
}

export function callAPIMiddleware({
  dispatch,
  getState,
}: {
  dispatch: Dispatch;
  getState: () => RootState;
}) {
  return (next: Dispatch) => (action: CallAPIMiddlewareAction) => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every((type) => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.");
    }

    if (typeof callAPI !== "function") {
      throw new Error("Expected callAPI to be a function.");
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      type: requestType,
      payload,
    });

    return callAPI().then(
      ({ data }) =>
        dispatch({
          payload: {
            ...payload,
            ...data,
          },
          type: successType,
        }),
      (error: AxiosError) =>
        dispatch({
          type: failureType,
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
    );
  };
}
