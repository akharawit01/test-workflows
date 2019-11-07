import styled from 'styled-components'

const styleExperimenteeList = styled.div`
  padding: 20px 0;

  .table-mdf {
    .ant-table-thead > tr > th {
      background: #f8f6ed;
      border-radius: 0;
      border-bottom: 1px solid #000;
      border-top: 1px solid #c7ad4a;
    }

    .ant-table-thead > tr:first-child > th:first-child,
    .ant-table-thead > tr:first-child > th:last-child {
      border-radius: 0;
      color: #000;
    }
  }
`
export default styleExperimenteeList