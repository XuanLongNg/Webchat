import styled from "styled-components";
import colors from "../../../../../styles/color";
import { Link } from "react-router-dom";

const Style = styled(Link)`
  height: 100%;
  width: 95%;
  background-color: ${colors.pink};
  border-radius: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  transition: all 0.4s ease;

  padding: 0;
  text-decoration: none;
  .box-chat-item {
    align-items: center;
    //   background-color: ${colors.orange};
    color: ${colors.white};
    width: 90%;
    margin: auto;
    overflow: hidden;
    .img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0 1em;
    }
    div {
      height: 100%;
      padding: 10px 0 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .name {
        height: 1.4em;
        overflow: hidden;
        font-size: 20px;
        margin: -10px 0px 1px;
        line-height: 1.4em;
      }
      .body {
        height: 35%;
        overflow: hidden;
        font-size: 13px;
        margin: 0;
      }
    }
  }
  &:hover {
    width: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export default Style;
