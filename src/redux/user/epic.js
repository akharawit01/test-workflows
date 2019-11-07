import { flatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import Actions from "./action";

import { message } from "antd";

const API = "https://arbotena-predict.20scoopscnx.com/api";
const errorPosts = (type, error) => {
  message.error(error.message);
  return {
    type: Actions[type],
    error
  };
};

const userRequestLogin = action$ =>
  action$.pipe(
    ofType(Actions.USER_REQUEST_LOGIN),
    flatMap(action =>
      ajax
        .post(`${API}/admin/login`, action.body, {
          "Content-Type": "application/json"
        })
        .pipe(
          map(payload => {
            localStorage.setItem("token", payload.response.token);
            localStorage.setItem(
              "user",
              JSON.stringify({
                username: "Doctor",
                email: action.body.email
              })
            );
            return {
              type: Actions.USER_LOGIN_SUCCESS,
              payload: {
                username: "Doctor",
                email: action.body.email,
                isAuth: true,
                isDoctor: true
              }
            };
          }),
          catchError(error =>
            of(errorPosts("USER_LOGIN_ERROR", error.response))
          )
        )
    )
  );

export default combineEpics(userRequestLogin);
