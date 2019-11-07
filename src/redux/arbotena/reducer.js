import { Map } from "immutable";
import Actions from "./action";

const initState = new Map({
  isFetching: false,
  isFetchingCreate: false,
  isFetchingManualPridict: false,
  experimentees: [],
  lang: "",
  quickCheck: [],
  experiment: [],
  blood_test_food: [],
  food: [],
  foodPredict: [],
  weight: 0,
  year_of_birth: 0,
  height: 0,
  id: 0,
  error: {}
});

export default function experimenteeReducer(state = initState, action) {
  switch (action.type) {
    case Actions.FETCH_EXPERIMENTEE:
      return state
        .set("isFetching", true)
        .set("weight", 0)
        .set("year_of_birth", 0)
        .set("height", 0)
        .set("food", [])
        .set("foodPredict", []);
    case Actions.FETCH_EXPERIMENTEE_SUCCESS:
      return state
        .set("experimentees", action.payload.data)
        .set("isFetching", false);
    case Actions.REQUEST_EXPERIMENTEE:
      return state.set("isFetching", true);
    case Actions.EXPERIMENTEE_SUCCESS:
      if (action.payload.result) {
        return state
          .set("foodPredict", action.payload.result.data)
          .set("food", action.payload.food)
          .set("quickCheck", action.payload.data)
          .set("experiment", action.payload.experiment)
          .set("weight", action.payload.weight)
          .set("height", action.payload.height)
          .set("year_of_birth", action.payload.year_of_birth)
          .set("lang", action.payload.lang)
          .set("blood_test_food", action.payload.blood_test_food)
          .set("isFetching", false);
      }
      return state
        .set("food", action.payload.food)
        .set("quickCheck", action.payload.data)
        .set("experiment", action.payload.experiment)
        .set("lang", action.payload.lang)
        .set("isFetching", false);
    case Actions.CREATE_EXPERIMENTEE:
      return state.set("isFetchingCreate", true);
    case Actions.CREATE_EXPERIMENTEE_SUCCESS:
      return state.set("isFetchingCreate", false).set("id", action.id);
    case Actions.CREATE_EXPERIMENTEE_ERROR:
      return state
        .set("isFetchingCreate", false)
        .set("error", action.error)
        .set("id", action.id);
    case Actions.MANUAL_PREDICT:
      return state.set("isFetchingManualPridict", true);
    case Actions.MANUAL_PREDICT_SUCCESS:
      return state.set("isFetchingManualPridict", false).set("id", action.id);
    case Actions.MANUAL_PREDICT_ERROR:
      return state
        .set("isFetchingManualPridict", false)
        .set("error", action.error)
        .set("id", action.id);
    case Actions.CLEAR:
      return state.set("blood_test_food", []).set("experimentees", []);
    default:
      return state;
  }
}
