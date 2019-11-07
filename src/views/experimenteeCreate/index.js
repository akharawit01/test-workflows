import React, { Fragment } from "react";
import ExperimenteeCreageStyle from "./style";
import { compose, withHandlers, lifecycle, withState } from "recompose";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "antd";
import _ from "lodash";

import MenuCreate from "../../components/molecules/menuCreate";
import PersonalInformationForm from "../../components/forms/personalInformation";
import QuickCheck from "../../components/molecules/quickCheck";
import ListFood from "../../components/molecules/listFood";
import ManualPredict from "../../components/molecules/manualPredict";

import action from "../../redux/arbotena/action";

const BreadcrumbArbo = props => {
  const {
    isFetching,
    isFetchingManualPridict,
    experiments,
    quickCheck,
    food,
    foodPredict,
    match,
    height,
    weight,
    year_of_birth,
    isFetchingCreate,
    defaultkey,
    handleQuickCheck,
    handleSelectedMenu,
    handleSubmit,
    registerChild,
    onSubmit,
    isDoctor,
    manualPredict,
    handleManualPredict,
    handleManualPredictSubmit
  } = props;
  const isShowFood = !match.params.id;
  const [t] = useTranslation();
  let content = null;
  content = (
    <Fragment>
      <div className={defaultkey === "1" ? "" : "d-none"}>
        <h3 className="title">{t("common.personal_information")}</h3>
        <PersonalInformationForm
          ref={registerChild}
          isFetching={isFetching}
          experiments={experiments}
          onHandleSubmit={handleSubmit}
          height={height}
          weight={weight}
          year_of_birth={year_of_birth}
          t={t}
        />

        <h3 className="title">{t("common.quick_check")}</h3>
        <QuickCheck
          isView={isShowFood}
          isFetching={isFetching}
          quickCheckList={quickCheck}
          onChangeQuickCheck={handleQuickCheck}
          t={t}
        />
      </div>

      <div className={defaultkey === "2" ? "" : "d-none"}>
        <h3 className="title">{t("common.blood_test")}</h3>
        <ManualPredict
          foods={food}
          t={t}
          handleManualPredict={handleManualPredict}
        />
        <Col span={18} offset={6} className="footer-form">
          <Button
            type="primary"
            icon="plus"
            className="btn-arbo"
            loading={isFetchingManualPridict}
            onClick={event => handleManualPredictSubmit(event)}
          >
            {t("common.save")}
          </Button>
        </Col>
      </div>

      <div className={defaultkey === "3" ? "" : "d-none"}>
        <h3 className="title">{t("common.predict_result")}</h3>
        <ListFood
          isFetching={isFetching}
          foodList={foodPredict}
          manualPredict={manualPredict}
          t={t}
        />
      </div>
    </Fragment>
  );

  return (
    <ExperimenteeCreageStyle>
      <h1>{t("common.create_experimentee")}</h1>
      <Row gutter={16}>
        <Col span={6}>
          <MenuCreate
            isShowFood={isShowFood}
            onSelectedMenu={handleSelectedMenu}
            defaultkey={defaultkey}
            isDoctor={isDoctor}
            t={t}
          />
        </Col>
        <Col span={18}>{content}</Col>
        {isShowFood && (
          <Col span={18} offset={6} className="footer-form">
            <Button
              type="primary"
              icon="plus"
              className="btn-arbo"
              loading={isFetchingCreate}
              onClick={event => onSubmit(event)}
            >
              {t("common.save_predict")}
            </Button>
          </Col>
        )}
      </Row>
    </ExperimenteeCreageStyle>
  );
};

const mapStateToProps = state => ({
  isFetching: state.Arbotena.get("isFetching"),
  isFetchingCreate: state.Arbotena.get("isFetchingCreate"),
  isFetchingManualPridict: state.Arbotena.get("isFetchingManualPridict"),
  experimentees: state.Arbotena.get("experimentees"),
  lang: state.Arbotena.get("lang"),
  quickCheck: state.Arbotena.get("quickCheck"),
  foodPredict: state.Arbotena.get("foodPredict"),
  food: state.Arbotena.get("food"),
  experiments: state.Arbotena.get("experiment"),
  height: state.Arbotena.get("height"),
  weight: state.Arbotena.get("weight"),
  year_of_birth: state.Arbotena.get("year_of_birth"),
  username: state.User.get("username"),
  email: state.User.get("email"),
  id: state.Arbotena.get("id"),
  isDoctor: state.User.get("isDoctor"),
  blood_test_food: state.Arbotena.get("blood_test_food")
});
const { requestExperimentee, createExperimentee, manualPreciet } = action;
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { requestExperimentee, createExperimentee, manualPreciet, submit }
  ),
  withState("defaultkey", "updateDefaultkey", "1"),
  withState("quickCheckValue", "updateQuickCheckValue", []),
  withState("manualPredict", "updateManualPredict", []),
  lifecycle({
    componentWillMount() {
      const { requestExperimentee, updateDefaultkey, match } = this.props;
      requestExperimentee(match.params.id);
      updateDefaultkey(match.params.id ? "3" : "1");
    },
    componentDidUpdate(prevProps) {
      const { requestExperimentee, history, id, updateDefaultkey } = this.props;
      if (prevProps.id !== id) {
        requestExperimentee(id);
        updateDefaultkey(id ? "3" : "1");
        history.push("/arbotena/" + id);
      }
    },
    componentWillReceiveProps(nextProps) {
      const { blood_test_food } = nextProps;
      const { quickCheckValue, updateManualPredict } = this.props;
      if (
        blood_test_food &&
        this.props.blood_test_food &&
        blood_test_food.length !== this.props.blood_test_food.length
      ) {
        updateManualPredict([...quickCheckValue, ...blood_test_food]);
      }
    }
  }),
  withHandlers(() => {
    let ref_;
    return {
      registerChild: () => ref => {
        ref_ = ref;
      },
      onSubmit: () => event => {
        ref_.clickSubmit(event);
      },
      handleSelectedMenu: props => ({ key }) => {
        props.updateDefaultkey(key);
      },
      handleQuickCheck: props => e => {
        const { quickCheckValue, updateQuickCheckValue } = props;
        const indexOfValue = quickCheckValue.indexOf(e.target.value);
        const data =
          indexOfValue === -1
            ? [...quickCheckValue, e.target.value]
            : quickCheckValue.filter(item => item !== e.target.value);
        updateQuickCheckValue(data);
      },
      handleManualPredict: props => e => {
        const { manualPredict, updateManualPredict } = props;
        const { name, value } = e.target;
        const withOutKey = _.filter(manualPredict, v => v.key !== name);
        value
          ? updateManualPredict(() => [...withOutKey, { key: name, value }])
          : updateManualPredict(() => [...withOutKey]);
      },
      handleSubmit: props => values => {
        const { createExperimentee, username, email, quickCheckValue } = props;
        const experiment = values;
        const body = {
          ...experiment,
          username,
          email,
          quick_check: quickCheckValue
        };
        createExperimentee(body);
      },
      handleManualPredictSubmit: props => () => {
        const { match, manualPredict, manualPreciet } = props;
        manualPreciet(match.params.id, { blood_test_food: manualPredict });
      }
    };
  })
)(BreadcrumbArbo);
