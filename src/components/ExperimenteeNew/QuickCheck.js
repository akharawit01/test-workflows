import React, { Fragment, useState, useRef, useEffect } from "react";
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import action from '../../redux/arbotena/create/action'

import PersonalInformationForm from '../forms/personalInformation'
import QuickCheckList from './QuickCheckList'
import QuickCheckFooter from './QuickCheckFooter'

const QuickCheckPropTypes = {
  isFetching: PropTypes.bool,
  quickCheck: PropTypes.array
}
const QuickCheckDefaultProps = {
  isFetching: false,
  quickCheck: []
}
const { createExperimentee } = action
const QuickCheck = props => {
  const { id, username, email, quickCheck, createExperimentee, history } = props;
  const [quickCheckValue, setQuickCheckValue] = useState([])
  const registerForm = useRef();
  const onSubmit = event => {
    registerForm.current.clickSubmit(event)
  }

  const handleSubmit = values => {
    const body = {
      ...values,
      username,
      email,
      quick_check: quickCheckValue
    };
    createExperimentee(body);
  }

  const getQuickCheckValue = value => {
    setQuickCheckValue(value)
  }

  useEffect(() => {
    if (id) history.push(`/experimentee/${id}`);
  }, [id]);

  return (
    <Fragment>
      <PersonalInformationForm onHandleSubmit={handleSubmit} ref={registerForm} />
      <QuickCheckList quickCheckList={quickCheck} getQuickCheckValue={getQuickCheckValue} />
      <QuickCheckFooter handleSubmitForm={onSubmit} />
    </Fragment>
  )
};

QuickCheck.propTypes = QuickCheckPropTypes
QuickCheck.defaultProps = QuickCheckDefaultProps

const mapStateToProps = state => ({
  isFetching: state.Arbotena.get("isFetching"),
  quickCheck: state.Arbotena.get("quickCheck"),
  username: state.User.get("username"),
  email: state.User.get("email"),
  isCreating: state.ArbotenaCreate.get("isFetching"),
  id: state.ArbotenaCreate.get("id")
});

export default compose(
  withRouter,
  connect(mapStateToProps, { createExperimentee })
)(QuickCheck);
