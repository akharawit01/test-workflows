import React, { Fragment } from "react";
import { compose, withHandlers, withState } from "recompose";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import ExperimenteeListStyle from "./style";
import { useTranslation } from "react-i18next";

import { Table, Icon, Divider, Input, Button } from "antd";
import Highlighter from "react-highlight-words";

const _propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  isAdmin: PropTypes.bool,
  isDoctor: PropTypes.bool
};
const _defaultProps = {
  isLoading: true,
  data: [],
  isAdmin: false,
  isDoctor: false
};

const ExperimenteeList = props => {
  const [t] = useTranslation();
  const { data, isLoading, isAdmin, isDoctor, getColumnSearchProps } = props;
  const columns = [
    {
      title: t("common.id"),
      key: "id",
      dataIndex: "_id"
    },
    {
      title: t("common.year_of_birth"),
      key: "year_of_birth",
      dataIndex: "year_of_birth"
    },
    {
      title: t("common.weight_kg"),
      dataIndex: "weight"
    },
    {
      title: t("common.height_cm"),
      key: "height",
      dataIndex: "height"
    },
    {
      title: t("common.test_date"),
      key: "created_at",
      dataIndex: "created_at",
      render: value => moment(value).format("MMM Do YY")
    },
    {
      title: t("common.actions"),
      key: "actions",
      dataIndex: "_id",
      render: value => (
        <Fragment>
          <Link to={`/arbotena/${value}`}>
            <Icon type="search" /> {t("common.view")}
          </Link>
          <Divider type="vertical" />
          <a
            href={`https://arbotena-predict.20scoopscnx.com/api/experimentees/${value}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="export" /> {t("common.pdf")}
          </a>
        </Fragment>
      )
    }
  ];

  if (isAdmin || isDoctor) {
    columns.splice(1, 0, {
      title: t("common.username"),
      key: "name",
      dataIndex: "username",
      ...getColumnSearchProps("username")
    });
  }

  return (
    <ExperimenteeListStyle>
      <Table
        className="table-mdf"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    </ExperimenteeListStyle>
  );
};
ExperimenteeList.propTypes = _propTypes;
ExperimenteeList.defaultProps = _defaultProps;

export default compose(
  withState("searchText", "setSearchText", ""),
  withHandlers({
    handleSearch: props => (selectedKeys, confirm) => {
      const { setSearchText } = props;
      confirm();
      setSearchText(selectedKeys[0]);
    },
    handleReset: props => clearFilters => {
      const { setSearchText } = props;
      clearFilters();
      setSearchText("");
    }
  }),
  withHandlers({
    getColumnSearchProps: props => dataIndex => {
      const [t] = useTranslation();
      const { searchText, handleSearch, handleReset } = props;
      let searchInput;
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 238, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 140, marginRight: 8 }}
            >
              {t("common.search")}
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              {t("common.reset")}
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        )
      };
    }
  })
)(ExperimenteeList);
