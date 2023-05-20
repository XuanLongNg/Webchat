import styled from "styled-components";
import colors from "../../../styles/color/index";
import { Card, Modal } from "antd";
export const StyleModalView = styled(Modal)`
  .card {
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    .card-cover {
      width: 100%;
      height: 200px;
      border-radius: 11px;
      position: relative;
      .card-filter-blur-cover {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        pointer-events: none;
      }
      .card-avatar {
        position: absolute;
        object-fit: cover;
        height: 100%;
        background: transparent;
        position: absolute;
        object-fit: cover;
        width: auto;
        height: 100%;
        transform: translateX(-50%);
        background: transparent;
      }
    }
  }
`;
export default styled(Card)`
  height: 10vh;
  background-color: ${colors.light_blue_color};
  min-width: 16em;
  box-sizing: border-box;
  border-radius: 0;
  // position: absolute;
  left: 0;
  .ant-card-body {
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 10vh;
    .avatar-card {
      margin: 0 1em;
    }
    .body-card {
      /* padding: 0 0.5em; */
      .ant-card-meta-title,
      .ant-card-meta-description {
        margin: 0;
        color: ${colors.white};
      }
    }
    .setting-card {
      margin-left: 1em;
      font-size: 1.5em;
      color: white;
      /* transition: transform 0.4s ease; */
    }
  }

  /* top: 90vh; */
  /* .user-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    align-items: center;
    color: ${colors.white};
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
      background-color: ${colors.light_blue_color};
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
  } */
`;
