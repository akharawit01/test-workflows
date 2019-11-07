import React from "react";
import PropTypes from "prop-types";
import ListFoodStyle from "./listFood.style";
import { List, Empty } from "antd";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import SkeletonQuickCheck from "../../../components/skeletons/quickCheck";

const _propTypes = {
  isFetching: PropTypes.bool,
  foodList: PropTypes.array,
  manualPredict: PropTypes.array,
  t: PropTypes.func
};
const _defaultProps = {
  isFetching: false,
  foodList: [],
  manualPredict: [],
  t: () => ({})
};
const ListFood = props => {
  const [t] = useTranslation();
  const { isFetching, foodList, manualPredict } = props;
  if (isFetching) return <SkeletonQuickCheck />;
  if (!foodList.length) return <Empty />;

  let foods = _.filter(foodList, ["eatable", false]);
  const manualPredictKey = _.map(manualPredict, v => v.key);

  _.map(manualPredictKey, v => {
    const hv = _.filter(foods, food => food.name === v);
    if (!hv.length) foods.push({ eatable: false, name: v, isNoHave: true });
  });

  return (
    <ListFoodStyle>
      <List
        className="quick-check-list"
        size="small"
        bordered
        dataSource={foods}
        renderItem={item => (
          <List.Item
            className={`${
              _.includes(manualPredictKey, item.name) ? "hl" : undefined
            } ${item.isNoHave && "hl-red"}`}
          >
            {t("food." + item.name)}
          </List.Item>
        )}
      />
    </ListFoodStyle>
  );
};
ListFood.propTypes = _propTypes;
ListFood.defaultProps = _defaultProps;

export default ListFood;
