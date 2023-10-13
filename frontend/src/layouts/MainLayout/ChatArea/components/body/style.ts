import styled from "styled-components";
import colors from "../../../../../styles/color/index";

const Style = styled.div`
  align-items: center;
  height: calc(80vh - 2px);
  width: 100%;
  padding: 0 1%;
  border-radius: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 1px 0;
  .start-chat {
    display: flex;
    justify-content: center;
    padding: 0.5em;
    /* border-bottom: 1px solid gray; */
    width: 80%;
    margin: 0px auto 2em;
    text-transform: uppercase;
    color: black;
  }
  .box-chat-item {
    align-items: center;
    //   background-color: ${colors.orange};
    /* color: ${colors.white}; */
    color: white;

    width: 90%;
    margin: 0 0 1em;
    overflow: hidden;
    .img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
      margin: 0 1em;
      border: 2px solid ${colors.white};
    }
    div {
      height: 100%;
      padding: 10px 0 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .header-message {
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        display: flex;
        margin: -20px 0 0;
        .name {
          height: 1.4em;
          overflow: hidden;
          font-size: 14px;
          margin: 0px 7px 1px 0px;
          font-weight: bold;
          span {
            color: ${colors.pink};
          }
        }
        .time {
          height: 1.4em;
          overflow: hidden;
          font-size: 10px;
          /* margin: 0px 0px 1px; */
          margin: 4px 0 1px;
        }
      }
      .body {
        height: 35%;
        overflow: hidden;
        font-size: 14px;
        margin: 0;
      }
    }
  }
`;
export default Style;
