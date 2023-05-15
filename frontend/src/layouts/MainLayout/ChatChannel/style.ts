import styled from "styled-components";
import colors from "../../../styles/color";
const Utilities = styled.div``;

export const StyleUtilities = styled(Utilities)`
  align-items: center;
  height: 10%;
  width: 100%;
  padding: 0 5%;
  .search {
    /* font:  */
    width: 70%;
    btn {
      background-color: ${colors.white};
    }
  }
  .find-user-btn,
  .find-gr-btn {
    color: ${colors.text_with_orange};
    width: 10%;
    height: 40%;
    margin: 0 2.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
  }
`;
export const StyleBoxChat = styled.div`
  height: 90%;
  box-shadow: 0 23px 23px #3b464d inset, 0 -23px 23px #3b464d inset;
  .box-chat-item {
    align-items: center;
    //   background-color: ${colors.orange};
    color: ${colors.gray};
    width: 90%;
    height: 10%;
    margin: 10px auto;
    border-radius: 5px;
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
  }
  .box-chat-item:hover,
  .box-chat-item:active {
    color: ${colors.white};
    background-color: #cccccc7e;
    border: 1px #cccccc7e solid;
    box-shadow: 0px 5px 10px #000;
  }
`;
const Style = styled.div`
  background-color: ${colors.greyish};
  min-width: 16em;
  height: 90vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  // position: absolute;
`;
export default Style;
