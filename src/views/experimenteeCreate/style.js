import styled from "styled-components";

const styleExperimenteeCreate = styled.div`
  .title {
    background: #f8f6ed;
    border-bottom: 2px solid #c7ad4a;
    color: #c7ad4a;
    margin-bottom: 10px;
    padding: 10px;
  }
  .personalInformationForm {
    label {
      color: #9f8a3b;
    }
    input {
      border: 0;
      border-bottom: 1px solid #e0e0e0;
      border-radius: 0;
      touch-action: none;
    }
  }
  .footer-form {
    padding: 35px 8px;
    text-align: right;
  }
  .fm-lb-value {
    margin-bottom: 10px;
  }
  .ant-form-item-label {
    line-height: 20px;
  }
  .form-personal-in {
    .ant-input {
      border: 0;
      border-bottom: 2px solid #c8ae41;
      border-radius: 0;
      &:hover {
        border-color: #c8ae41;
      }
      &:focus {
        border-color: #ff4d4f;
        outline: 0;
        box-shadow: none;
        border-right-width: 1px !important;
      }
    }
  }
`;
export default styleExperimenteeCreate;
