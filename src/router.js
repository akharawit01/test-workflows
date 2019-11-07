import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import User from "./views/user";
import Doctor from "./views/doctor";
import Arbotena from "./views/arbotena";

import Login from "./views/Login";
import ExperimenteeList from "./views/ExperimenteeList";
import ExperimenteeNew from "./views/ExperimenteeNew";

const PrivateRoute = ({ component: Component, username, email, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      username && email ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const PublicRouter = props => {
  const { history } = props;
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/experimentee" component={ExperimenteeList} />
        <Route exact path="/experimentee/new" component={ExperimenteeNew} />
        <Route exact path="/experimentee/:id" component={ExperimenteeNew} />
        {/* <PrivateRoute
          path="/arbotena"
          component={ExperimenteeList}
          username={username}
          email={email}
        /> */}
      </Switch>
    </Router>
  );
};
const mapStateToProps = state => ({
  username: state.User.get("username"),
  email: state.User.get("email")
});
export default connect(
  mapStateToProps,
  {}
)(PublicRouter);
