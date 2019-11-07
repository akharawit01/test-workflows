import React from "react";
import { compose, lifecycle } from "recompose";
import action from "../../redux/arbotena/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ExperimenteeStyle from "./style";
import { useTranslation } from "react-i18next";

import { Button } from "antd";
import { isAdmin } from "../../helper";
import ExperList from "../../components/molecules/experimenteeList";

const BreadcrumbArbo = props => {
  const { experimentees, isFetching, username, email } = props;
  const [t] = useTranslation();
  return (
    <ExperimenteeStyle>
      <h1>{t("common.arbotena_list")}</h1>
      <Link to="/arbotena/create">
        <Button type="dashed" icon="plus" size={"large"} block>
          {t("common.add_experimentee")}
        </Button>
      </Link>
      <ExperList
        data={experimentees}
        isLoading={isFetching}
        isAdmin={isAdmin(username, email)}
      />
    </ExperimenteeStyle>
  );
};
const mapStateToProps = state => ({
  experimentees: state.Arbotena.get("experimentees"),
  isFetching: state.Arbotena.get("isFetching"),
  username: state.User.get("username"),
  email: state.User.get("email")
});

const { fetchExperimentees, requestClear } = action;
export default compose(
  connect(
    mapStateToProps,
    { fetchExperimentees, requestClear }
  ),
  lifecycle({
    componentWillMount() {
      const { fetchExperimentees, requestClear, username, email } = this.props;
      requestClear();
      fetchExperimentees({ username, email });
    }
  })
)(BreadcrumbArbo);
