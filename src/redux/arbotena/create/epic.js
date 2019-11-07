import { flatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import Actions from "./action";

import { message } from "antd";

const API = "https://arbotena-predict.20scoopscnx.com/api";
const errorPosts = (type, projectId, error) => {
  message.error(error.message);
  return {
    type: Actions[type],
    id: projectId,
    error
  };
};

const epicCreateExperiment = action$ =>
  action$.pipe(
    ofType(Actions.CREATE_EXPERIMENTEE),
    flatMap(action =>
      ajax
        .post(`${API}/experimentees`, action.body, {
          "Content-Type": "application/json"
        })
        .pipe(
          map(payload => {
            const id = payload.response._id;
            message.success("create success");
            return {
              type: Actions.CREATE_EXPERIMENTEE_SUCCESS,
              id
            };
          }),
          catchError(error =>
            of(errorPosts("CREATE_EXPERIMENTEE_ERROR", error.response))
          )
        )
    )
  );

export default combineEpics(
  epicCreateExperiment
);
