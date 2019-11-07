import React, { Component } from "react";
import PropTypes from "prop-types";
import QuickCheckStyle from "./quickCheck.style";
import _ from "lodash";
import { Collapse, Checkbox, List } from "antd";

import SkeletonQuickCheck from "../../../components/skeletons/quickCheck";

const { Panel } = Collapse;
const _propTypes = {
  isFetching: PropTypes.bool,
  quickCheckList: PropTypes.array,
  onChangeQuickCheck: PropTypes.func,
  isView: PropTypes.bool,
  t: PropTypes.func
};
const _defaultProps = {
  isFetching: false,
  quickCheckList: [],
  onChangeQuickCheck: () => ({}),
  isView: false,
  t: () => ({})
};
class QuickCheck extends Component {
  render() {
    const {
      isFetching,
      quickCheckList,
      onChangeQuickCheck,
      isView,
      t
    } = this.props;
    let quickChecks = quickCheckList;
    if (!isView) {
      quickChecks = quickCheckList.map(data => {
        const value = _.filter(data.children, ["value", true]);
        if (!!value.length) {
          return {
            group_label: data.group_label,
            children: value
          };
        } else {
          return false;
        }
      });
      quickChecks = _.compact(quickChecks);
    }

    if (isFetching) return <SkeletonQuickCheck />;
    return (
      <QuickCheckStyle>
        <Collapse className="quick-check" accordion>
          {quickChecks.map((group, i) => (
            <Panel header={group.group_label} key={i}>
              <List
                className="quick-check-list"
                size="small"
                bordered
                dataSource={group.children}
                renderItem={item => (
                  <List.Item>
                    {!isView ? (
                      t("quick_check." + item.key)
                    ) : (
                      <Checkbox
                        className="d-block"
                        defaultChecked={item.value}
                        onChange={onChangeQuickCheck}
                        value={item.key}
                      >
                        {t("quick_check." + item.key)}
                      </Checkbox>
                    )}
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </QuickCheckStyle>
    );
  }
}
QuickCheck.propTypes = _propTypes;
QuickCheck.defaultProps = _defaultProps;

export default QuickCheck;
