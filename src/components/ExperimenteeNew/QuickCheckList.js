import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Collapse, Checkbox, List } from "antd";

const QuickCheckListPropTypes = {
  quickCheckList: PropTypes.array,
  isView: PropTypes.bool,
  onChangeQuickCheck: PropTypes.func,
  getQuickCheckValue: PropTypes.func
}
const QuickCheckListDefaultProps = {
  quickCheckList: [],
  isView: false,
  onChangeQuickCheck: () => ({}),
  getQuickCheckValue: () => ({})
}
const { Panel } = Collapse;
const QuickChcekList = props => {
  const [value, setValue] = useState([])
  const { quickCheckList, isView, getQuickCheckValue } = props;
  const [t] = useTranslation();

  const handleQuickCheck = e => {
    const targetValue = e.target.value
    const indexOfValue = value.indexOf(targetValue);
    const data = indexOfValue === -1
      ? [...value, targetValue]
      : value.filter(item => item !== targetValue);
    setValue(data);
  }

  useEffect(() => {
    getQuickCheckValue(value)
  }, [value])

  return (
    <Collapse className="quick-check" accordion>
      {quickCheckList.map((group, i) => (
        <Panel header={group.group_label} key={i}>
          <List
            className="quick-check-list"
            size="small"
            bordered
            dataSource={group.children}
            renderItem={item => (
              <List.Item>
                {isView ? (
                  t("quick_check." + item.key)
                ) : (
                  <Checkbox
                    className="d-block"
                    defaultChecked={item.value}
                    onChange={handleQuickCheck}
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
  )
}
QuickChcekList.propTypes = QuickCheckListPropTypes;
QuickChcekList.defaultProps = QuickCheckListDefaultProps;

export default QuickChcekList