import styled from 'styled-components'

const styleMenuCreate = styled.div`
  .create-menu {
    background: #f2f2f2;
    color: #000;
    & li {
      line-height: 44px;
      height: 45px;
    }
    & li:hover {
      color: #c8ae41;
    }
    & li.ant-menu-item-selected {
      background: #fff;
      border: 1px solid #c7ad4a;
      color: #000;
      &:after {
        border-left: 5px solid #c7ad4a;
        left: 0;
      }
    }
  }

  .ant-menu-vertical .ant-menu-item:after, 
  .ant-menu-vertical-left .ant-menu-item:after, 
  .ant-menu-vertical-right .ant-menu-item:after, 
  .ant-menu-inline .ant-menu-item:after {
    border-right: 0!important;
  }
`
export default styleMenuCreate