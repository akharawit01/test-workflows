import { Map } from "immutable";
import Actions from "./action";

let localUser = JSON.parse(localStorage.getItem("user")) || {};
const initState = new Map({
  ...localUser,
  isAuth: false,
  isFetching: false,
  isDoctor: false,
  error: {}
});

export default function experimenteeReducer(state = initState, action) {
  switch (action.type) {
    case Actions.USER_LOGIN:
      return state.set("username", action.username).set("email", action.email);
    case Actions.USER_REQUEST_LOGIN:
      return state.set("isFetching", true);
    case Actions.USER_LOGIN_SUCCESS:
      const { username, email, isDoctor, isAuth } = action.payload;
      return state
        .set("isFetching", false)
        .set("username", username)
        .set("email", email)
        .set("isAuth", isAuth)
        .set("isDoctor", isDoctor);
    case Actions.USER_LOGIN_ERROR:
      return state.set("isFetching", false).set("error", action.error);
    default:
      return state;
  }
}
