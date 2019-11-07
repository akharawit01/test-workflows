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

const fetchExperimentees = action$ =>
  action$.pipe(
    ofType(Actions.FETCH_EXPERIMENTEE),
    flatMap(action => {
      const { user } = action;
      const queryString = Object.keys(user)
        .map(key => key + "=" + user[key])
        .join("&");
      return ajax
        .get(`${API}/experimentees?${queryString}`, {
          Authorization: `${localStorage.getItem("token") || ""}`
        })
        .pipe(
          map(payload => ({
            type: Actions.FETCH_EXPERIMENTEE_SUCCESS,
            payload: payload.response
          }))
        );
    })
  );

const fetchExEpic = action$ =>
  action$.pipe(
    ofType(Actions.REQUEST_EXPERIMENTEE),
    flatMap(action =>
      ajax.get(`${API}/experimentees/${action.id}`).pipe(
        map(payload => ({
          type: Actions.EXPERIMENTEE_SUCCESS,
          payload: payload.response
        }))
      )
    )
  );

const createExEpic = action$ =>
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

const manualPredict = action$ =>
  action$.pipe(
    ofType(Actions.MANUAL_PREDICT),
    flatMap(action =>
      ajax
        .put(`${API}/experimentees/${action.id}`, action.body, {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token") || ""}`
        })
        .pipe(
          map(payload => {
            const id = action.id;
            message.success("create success");
            return {
              type: Actions.MANUAL_PREDICT_SUCCESS,
              id
            };
          }),
          catchError(error =>
            of(errorPosts("MANUAL_PREDICT_ERROR", action.id, error.response))
          )
        )
    )
  );

export default combineEpics(
  fetchExperimentees,
  fetchExEpic,
  createExEpic,
  manualPredict
);
