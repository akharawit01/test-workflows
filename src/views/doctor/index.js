import React from "react";
import { compose, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import UserStyle from "./style";
import Logo from "../../images/logo.svg";
import DoctorForm from "../../components/forms/doctor";
import action from "../../redux/user/action";

const { userRequestLogin, clearUser } = action;
const Doctor = props => {
  const { handlenSubmitFm, isFetching } = props;
  return (
    <UserStyle>
      <div className="logo-center">
        <img src={Logo} alt="Arbotena logo" />
      </div>
      <DoctorForm onSubmitFm={handlenSubmitFm} isFetching={isFetching} />
    </UserStyle>
  );
};

const mapStateToProps = state => ({
  isFetching: state.User.get("isFetching"),
  email: state.User.get("email")
});
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { userRequestLogin, clearUser }
  ),
  withHandlers({
    handlenSubmitFm: props => (email, password) => {
      const { userRequestLogin } = props;
      userRequestLogin(email, password);
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.clearUser();
    },
    componentWillReceiveProps(nextProps) {
      const { history, email } = this.props;
      if (nextProps.email !== email) {
        history.push("/arbotena");
      }
    }
  })
)(Doctor);
