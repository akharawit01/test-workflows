import React from 'react'
import { Form } from 'antd'
const FormItem = Form.Item

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = (meta.error || meta.submitError) && meta.touched
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} />
    </FormItem>
  )
}

export default makeField