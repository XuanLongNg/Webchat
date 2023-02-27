import styled from "styled-components";
import colors from "../../../styles/color/index";
export default styled.div`
  height: 10vh;
  background-color: ${colors.orange};
  min-width: 16em;
  box-sizing: border-box;
  // position: absolute;
  left: 0;
  top: 90vh;
  .box-chat-item {
    width: 100%;
    align-items: center;
    color: ${colors.text_with_orange};
    .img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0 1em;
    }
    div {
      height: 10vh;
      min-width: 50%;
      box-sizing: border-box;
      padding: 1em 0 0;
      .name {
        height: 50%;
        overflow: hidden;
        font-size: 20px;
        margin: 0 0 1px;
      }
      .body {
        height: 35%;
        overflow: hidden;
        font-size: 13px;
        margin: 0;
      }
    }
    .setting-btn {
      margin-right: 0.5em;
      font-size: 1.5em;
      display: flex;
      right: 0;
      border: none;
      background-color: ${colors.orange};
      animation-name: zoomOut;
      animation-duration: 0.5s;
      animation-fill-mode: backwards;
    }
    .setting-btn:hover {
      animation-name: zoomIn;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
  }
  @keyframes zoomIn {
    0% {
      font-size: 1.5em;
    }
    100% {
      font-size: 2em;
    }
  }
  @keyframes zoomOut {
    0% {
      font-size: 2em;
    }
    100% {
      font-size: 1.5em;
    }
  }
`;
