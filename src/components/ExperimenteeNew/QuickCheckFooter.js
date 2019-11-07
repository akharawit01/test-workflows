import React from 'react';
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next";
import { Col, Button } from 'antd'

const QuickCheckFooterPropTypes = {
  handleSubmitForm: PropTypes.func
}
const QuickCheckFooterDefaultProps = {
  handleSubmitForm: () => ({})
}
const QuickCheckFooter = props => {
  const { handleSubmitForm } = props
  const [t] = useTranslation();
  return (
    <Col span={18} offset={6} className="footer-form">
      <Button
        type="primary"
        icon="plus"
        className="btn-arbo"
        onClick={event => handleSubmitForm(event)}
      >
        {t("common.save_predict")}
      </Button>
    </Col>
  )
}
QuickCheckFooter.propTypes = QuickCheckFooterPropTypes
QuickCheckFooter.defaultProps = QuickCheckFooterDefaultProps

export default QuickCheckFooter