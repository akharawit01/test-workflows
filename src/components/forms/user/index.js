import React from "react";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";

import {
  required,
  validateEmail,
  composeValidators
} from "../../../helper/validation";

import { Form, Field } from "react-final-form";
import makeField from "../../hoc/makeInputField";

const AInput = makeField(Input);

const UserForm = props => {
  const { onSubmitFm } = props;
  const [t] = useTranslation();
  return (
    <Form
      onSubmit={value => onSubmitFm(value)}
      render={({ handleSubmit, hasValidationErrors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              component={AInput}
              type="text"
              name="username"
              label={t("common.name")}
              validate={required}
            />
            <Field
              component={AInput}
              type="email"
              name="email"
              label={t("common.email")}
              validate={composeValidators(required, validateEmail)}
            />
            <div className="buttons mt-5">
              <Button
                type="submit"
                htmlType="submit"
                disabled={hasValidationErrors}
              >
                {t("common.login")}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default UserForm;
