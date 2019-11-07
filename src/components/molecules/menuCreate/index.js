import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuCreateStyle from "./menuCreate.style";
import { Menu } from "antd";

const _propTypes = {
  onSelectedMenu: PropTypes.func,
  isShowFood: PropTypes.bool,
  defaultkey: PropTypes.string,
  isDoctor: PropTypes.bool,
  t: PropTypes.func
};
const _defaultProps = {
  onSelectedMenu: () => ({}),
  isShowFood: true,
  defaultkey: "1",
  isDoctor: false,
  t: () => ({})
};
class MenuCreate extends Component {
  render() {
    const { onSelectedMenu, isShowFood, defaultkey, isDoctor, t } = this.props;
    return (
      <MenuCreateStyle>
        <Menu
          className="create-menu"
          mode="inline"
          defaultSelectedKeys={[defaultkey]}
          selectedKeys={[defaultkey]}
          onSelect={onSelectedMenu}
        >
          <Menu.Item key="1">{t("common.quick_check")}</Menu.Item>
          {isDoctor ? (
            <Menu.Item key="2" disabled={isShowFood}>
              {t("common.record_form")}
            </Menu.Item>
          ) : null}
          <Menu.Item key="3" disabled={isShowFood}>
            {t("common.predict_result")}
          </Menu.Item>
        </Menu>
      </MenuCreateStyle>
    );
  }
}
MenuCreate.propTypes = _propTypes;
MenuCreate.defaultProps = _defaultProps;

export default MenuCreate;
