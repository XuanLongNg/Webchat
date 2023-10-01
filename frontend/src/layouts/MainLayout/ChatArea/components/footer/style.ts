import styled from "styled-components";
import colors from "../../../../../styles/color";

const Style = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 0 5%;
  border-top-left-radius: 5px;
  background-color: ${colors.pink};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  .ant-form-item {
    margin-inline-end: 2px;
  }
  .input {
    width: 50%;
    min-width: 5em;
    border-radius: 20px;
    height: 2.5em;
    font-size: 16px;
  }
  .btn-submit {
    border-radius: 50%;
    width: 2.5em;
    box-shadow: none;
    padding: none;
    &:hover {
      /* color: white !important; */
      background-color: rgba(128, 128, 128, 0.4) !important;
      background-color: ${colors.pink}!important;
    }
  }
`;
export default Style;
