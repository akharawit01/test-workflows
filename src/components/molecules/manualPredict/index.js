import React from "react";
import PropTypes from "prop-types";
import ManualPredictStyle from "./style";

import { Collapse, List, Input } from "antd";

const { Panel } = Collapse;
const _propType = {
  foods: PropTypes.array,
  handleManualPredict: PropTypes.func,
  t: PropTypes.func
};
const _defaultProps = {
  foods: [],
  handleManualPredict: () => ({}),
  t: () => ({})
};
const ManualPredict = props => {
  const { foods, handleManualPredict, t } = props;
  return (
    <ManualPredictStyle>
      <Collapse className="manual-predict" accordion>
        {foods.map((group, i) => (
          <Panel header={group.group_label} key={i}>
            <List
              className="manual-predict-list"
              size="small"
              bordered
              dataSource={group.children}
              renderItem={item => {
                const val = item.value === 0 ? "" : item.value;
                return (
                  <List.Item className="item-manualpre">
                    <span>{t("food." + item.key)}</span>
                    <Input
                      type="text"
                      defaultValue={val}
                      onChange={event => handleManualPredict(event)}
                      name={item.key}
                      addonAfter={`%`}
                    />{" "}
                  </List.Item>
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </ManualPredictStyle>
  );
};
ManualPredict.propTypes = _propType;
ManualPredict.defaultProps = _defaultProps;
export default ManualPredict;
