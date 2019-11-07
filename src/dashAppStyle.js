import styled from "styled-components";

const DashAppStyle = styled.div`
  .ant-layout-content {
    background: #fff;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    position: relative;
    padding: 0 24px;
  }
  .d-block {
    display: block;
  }

  .btn {
    &-arbo {
      border: 1px solid #c8ae41;
      background: #f8f6ed;
      color: #c8ae41;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: #c8ae41;
        color: #fff;
      }
    }
  }

  .d-none {
    display: none;
  }
  .hl {
    background: #baffc4;
    &-red {
      background: #ffbaba;
    }
  }

  .item-manualpre {
    & .ant-list-item-content {
      justify-content: space-between;
    }
  }
`;
export default DashAppStyle;
