import { Map } from "immutable";
import Actions from "./action";

const initState = new Map({
  isFetching: false,
  id: 0,
  quickCheck: [],
  food: [],
  weight: 0,
  year_of_birth: 0,
  height: 0,
  result: [],
  predict: [],
  createdAt: '',
  error: {}
});

export default function experimenteeReducer(state = initState, action) {
  switch (action.type) {
    case Actions.EXPERIMENTEE_BYID_SUCCESS:
      return state
        .set("isFetching", false)
        .set("id", action.payload.id)
        .set("food", action.payload.food)
        .set("quickCheck", action.payload.data)
        .set("weight", action.payload.weight)
        .set("height", action.payload.height)
        .set("year_of_birth", action.payload.year_of_birth)
        .set("result", action.payload.result)
        .set("predict", action.payload.predict)
        .set("createdAt", action.payload.createdAt)
    default:
      return state;
  }
}
