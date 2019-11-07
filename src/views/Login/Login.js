import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import action from "../../redux/user/action";

import LoginForm from "../../components/forms/doctor";

const { userRequestLogin } = action;
const Login = props => {
  const { userRequestLogin, isFetching, isAuth, history } = props;
  const handlenSubmitFm = (email, password) => {
    userRequestLogin(email, password);
  };

  useEffect(() => {
    if (isAuth) history.push("/experimentee");
  });

  return <LoginForm onSubmitFm={handlenSubmitFm} isFetching={isFetching} />;
};

const mapStateToProps = state => ({
  isFetching: state.User.get("isFetching"),
  isAuth: state.User.get("isAuth")
});
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { userRequestLogin }
  )
)(Login);
