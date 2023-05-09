import styled from "styled-components";
import colors from "../../../styles/color/index";
const color_header = colors.text_with_greyish,
  color_text_header = colors.text_with_orange;
export const HeaderStyled = styled.div`
  align-items: center;
  height: 10vh;
  background-color: ${color_header};
  box-sizing: border-box;
  min-width: 30em;
  padding-left: 1em;
  .box-chat-item {
    width: 100%;
    align-items: center;
    color: ${color_text_header};
    .img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0 1em;
    }
    .info-user {
      height: 10vh;
      min-width: 15em;
      box-sizing: border-box;
      padding: 1em 0 0;
      .name {
        height: 30%;
        overflow: hidden;
        font-size: 15px;
        margin: 0 0 1px;
      }
      .body {
        height: 35%;
        overflow: hidden;
        font-size: 13px;
        margin: 0;
      }
    }
    .setting-btn,
    .search-btn {
      margin-right: 0.5em;
      font-size: 1.5em;
      display: flex;
      right: 0;
      border: none;
      background-color: ${color_header};
    }
  }
`;
export const MessageStyled = styled.div`
  align-items: center;
  height: 80vh;
  width: 100%;
  padding: 0 5%;
  background-color: ${colors.white};
`;
export const SendMessageStyled = styled.div`
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 0 5%;
  background-color: ${colors.text_with_greyish};
`;
const Style = styled.div`
  //   position: absolute;
  left: 0;
  top: 0;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
`;
export default Style;
