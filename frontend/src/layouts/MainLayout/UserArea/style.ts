import styled from "styled-components";
import colors from "../../../styles/color/index";
import { Card, Modal } from "antd";

export default styled.div`
  height: 10vh;
  width: 20vw;
  min-width: 16em;
  box-sizing: border-box;
  border-radius: 0;
  position: absolute;
  bottom: 0;
  left: 0;

  .user-card {
    background-color: ${colors.pink};
    border-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    .ant-card-body {
      padding: 0;
      height: 10vh;
      display: flex;
      justify-content: between;
      align-items: center;
      .avatar-card {
        margin: 0 1em;
      }
      .body-card {
        /* padding: 0 0.5em; */
        max-width: 70%;
        .ant-skeleton-content {
        }
        .ant-card-meta-title,
        .ant-card-meta-description {
          margin: 0;
          color: ${colors.white};
        }
      }
      .setting-card {
        margin-right: 1em;
        font-size: 1.5em;
        color: white;
        transition: all 0.4s ease;
        &:hover {
          rotate: 90deg;
        }
      }
    }
  }
`;
