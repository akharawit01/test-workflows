import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "antd";

import action from "../../redux/arbotena/action";
import ExperList from "../../components/molecules/experimenteeList";

const { fetchExperimentees } = action;
const ExperimenteeList = props => {
  const [t] = useTranslation();
  const { experimentees, isFetching, fetchExperimentees } = props;

  useEffect(() => {
    fetchExperimentees({ username: "not", email: "not@not.com" });
  }, []);

  return (
    <Fragment>
      <h1>{t("common.arbotena_list")}</h1>
      <Link to="/experimentee/new">
        <Button type="dashed" icon="plus" size={"large"} block>
          {t("common.add_experimentee")}
        </Button>
      </Link>
      <ExperList data={experimentees} isLoading={isFetching} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  experimentees: state.Arbotena.get("experimentees"),
  isFetching: state.Arbotena.get("isFetching")
});

export default connect(
  mapStateToProps,
  { fetchExperimentees }
)(ExperimenteeList);
