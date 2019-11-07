import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";

import { useTranslation } from "react-i18next";

const MenuLeftPropTypes = {
  isDoctor: PropTypes.bool
}
const MenuLeftDefaultProps = {
  isDoctor: false
}
const MenuLeft = props => {
  const { isDoctor } = props
  const [t] = useTranslation();
  return (
    <Menu
      mode="inline"
    >
      <Menu.Item key="1">{t("common.quick_check")}</Menu.Item>
      {isDoctor ? (
        <Menu.Item key="2">
          {t("common.record_form")}
        </Menu.Item>
      ) : null}
      <Menu.Item key="3">
        {t("common.predict_result")}
      </Menu.Item>
    </Menu>
  )
};

MenuLeft.propTypes = MenuLeftPropTypes
MenuLeft.defaultProps = MenuLeftDefaultProps

export default MenuLeft;
