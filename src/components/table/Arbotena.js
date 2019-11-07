import React from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd'

const ArbotenaTablePropTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}
const ArbotenaTableDefaultProps = {
  columns: [],
  data: []
}

const ArbotenaTable = props => {
  const { columns, data } = props
  return (
    <Table columns={columns} dataSource={data} className="table-mdf" />
  )
}
ArbotenaTable.propTypes = ArbotenaTablePropTypes
ArbotenaTable.defaultProps = ArbotenaTableDefaultProps

export default ArbotenaTable