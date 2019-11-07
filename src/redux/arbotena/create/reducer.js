import { Map } from "immutable";
import Actions from "./action";

const initState = new Map({
  isFetching: false,
  id: '',
  error: {}
});

export default function experimenteeReducer(state = initState, action) {
  switch (action.type) {
    case Actions.CREATE_EXPERIMENTEE:
      return state.set("isFetching", true);
    case Actions.CREATE_EXPERIMENTEE_SUCCESS:
      return state.set("isFetching", false).set("id", action.id);
    case Actions.CREATE_EXPERIMENTEE_ERROR:
      return state
        .set("isFetching", false)
        .set("error", action.error)
    default:
      return state;
  }
}
