import React from "react";
import i18n from "../../../i18n";
import { compose, withHandlers, withState } from "recompose";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "antd";
import TopHeaderStyle from "./topHeader.style";

const TopHeader = props => {
  const { username, email, changeLanguage, switchTextLng } = props;
  const [t] = useTranslation();
  return (
    <TopHeaderStyle>
      <div className="container">
        <Row type="flex" justify="space-between">
          <Col span={8}>
            <Button
              type="dashed"
              size="small"
              ghost
              onClick={() => changeLanguage()}
            >
              {switchTextLng()}
            </Button>
          </Col>
          <Col span={8} className="text-right">
            {t("common.name")}: {username} &nbsp;&nbsp;
            {t("common.email")}: {email}
          </Col>
        </Row>
      </div>
    </TopHeaderStyle>
  );
};

const mapStateTopProps = state => ({
  username: state.User.get("username"),
  email: state.User.get("email")
});
export default compose(
  connect(
    mapStateTopProps,
    {}
  ),
  withState("lng", "updateLng", "en"),
  withHandlers({
    changeLanguage: props => () => {
      const lng = i18n.language === "en" ? "de" : "en";
      props.updateLng(lng);
      i18n.changeLanguage(lng);
    },
    switchTextLng: props => () => {
      const txtLng = {
        en: "English",
        de: "Deutsch"
      };
      return txtLng[i18n.language];
    }
  })
)(TopHeader);
