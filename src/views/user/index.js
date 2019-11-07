import React from "react";
import { compose, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import UserStyle from "./style";
import Logo from "../../images/logo.svg";
import UserForm from "../../components/forms/user";
import action from "../../redux/user/action";

const { userLogin, clearUser } = action;
const Doctor = props => {
  const { handlenSubmitFm } = props;
  return (
    <UserStyle>
      <div className="logo-center">
        <img src={Logo} alt="Arbotena logo" />
      </div>
      <UserForm onSubmitFm={handlenSubmitFm} />
    </UserStyle>
  );
};

export default compose(
  withRouter,
  connect(
    null,
    { userLogin, clearUser }
  ),
  withHandlers({
    handlenSubmitFm: props => value => {
      const { userLogin, history } = props;
      userLogin(value);
      history.push("/arbotena");
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.clearUser()
    }
  })
)(Doctor);
