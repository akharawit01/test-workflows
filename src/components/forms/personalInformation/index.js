import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Form, Field } from "react-final-form";
import makeField from "../../hoc/makeInputField";
import {
  required,
  validateYear,
  mustBeNumber,
  composeValidators
} from "../../../helper/validation";

import SkeletonPersonalInformation from "../../../components/skeletons/personalInformation";

const _propTypes = {
  isFetching: PropTypes.bool,
  experiments: PropTypes.array,
  year_of_birth: PropTypes.number,
  weight: PropTypes.number,
  height: PropTypes.number,
  onHandleSubmit: PropTypes.func,
  t: PropTypes.func
};
const _defaultProps = {
  isFetching: false,
  experiments: [],
  year_of_birth: 0,
  weight: 0,
  height: 0,
  onHandleSubmit: () => ({}),
  t: () => ({})
};
const AInput = makeField(Input);
let submit;
class PersonalInformationForm extends Component {
  clickSubmit(event) {
    submit(event);
  }
  render() {
    const {
      isFetching,
      year_of_birth,
      weight,
      height,
      onHandleSubmit,
      t
    } = this.props;
    if (isFetching) return <SkeletonPersonalInformation />;
    return (
      <Fragment>
        <Form
          onSubmit={value => onHandleSubmit(value)}
          render={({ handleSubmit }) => {
            submit = handleSubmit;
            return (
              <form className="form-personal-in" onSubmit={handleSubmit}>
                <div>
                  {year_of_birth ? (
                    <div className="fm-lb-value">
                      <h4>{t("common.year_of_birth")}</h4>
                      {year_of_birth}
                    </div>
                  ) : (
                    <Field
                      name="year_of_birth"
                      component={AInput}
                      type="text"
                      label="Year of birth"
                      validate={composeValidators(required, validateYear)}
                    />
                  )}
                </div>
                <div>
                  {weight ? (
                    <div className="fm-lb-value">
                      <h4>{t("common.weight_kg")}</h4>
                      {weight}
                    </div>
                  ) : (
                    <Field
                      name="weight"
                      component={AInput}
                      type="text"
                      label="Weight (cm)"
                      validate={composeValidators(required, mustBeNumber)}
                    />
                  )}
                </div>
                <div>
                  {height ? (
                    <div className="fm-lb-value">
                      <h4>{t("common.height_cm")}</h4>
                      {height}
                    </div>
                  ) : (
                    <Field
                      name="height"
                      component={AInput}
                      type="text"
                      label="Height (cm)"
                      validate={composeValidators(required, mustBeNumber)}
                    />
                  )}
                </div>
              </form>
            );
          }}
        />
      </Fragment>
    );
  }
}

PersonalInformationForm.propTypes = _propTypes;
PersonalInformationForm.defaultProps = _defaultProps;
export default PersonalInformationForm;
