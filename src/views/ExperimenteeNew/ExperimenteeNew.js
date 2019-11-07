import React, { Fragment, useEffect } from "react";
import { compose } from 'recompose'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from 'antd'

import action from "../../redux/arbotena/action";
import actionDetail from "../../redux/arbotena/detail/action";

import MenuLeft from "../../components/ExperimenteeNew/MenuLeft";
import QuickCheck from "../../components/ExperimenteeNew/QuickCheck";

const { requestExperimentee } = action;
const ExperimenteeNew = props => {
  console.log(props)
  const { requestExperimentee, match } = props

  useEffect(() => {
    const paramID = match.params.id || null
    requestExperimentee()
  }, [])

  return (
    <Fragment>
      <Row gutter={16}>
        <Col span={6}><MenuLeft /></Col>
        <Col span={18}>
          <QuickCheck />
        </Col>
      </Row>
    </Fragment>
  );
};

export default compose(
  withRouter,
  connect(null, {
    requestExperimentee
  })
)(ExperimenteeNew);
