import styled from "styled-components";
import colors from "../../../../../styles/color";
const color_header = colors.pink,
  color_text_header = colors.white;
const Style = styled.div`
  align-items: center;
  height: 10vh;
  background-color: ${color_header};
  box-sizing: border-box;
  min-width: 30em;
  padding-left: 1em;
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  .header {
    height: 10vh;
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
      min-width: 25em;
      /* height: 10vh; */
      /* box-sizing: border-box; */
      /* padding: 1em 0 0; */
      .name {
        height: 40%;
        overflow: hidden;
        font-size: 15px;
        margin: 0px 0px 1px;
      }
    }
    .find-message-btn {
      color: ${colors.pink};
      background-color: white;
      border-top: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;

      transition: background-color 0.5s ease, color 0.5s ease, border 0.5s ease;
      box-shadow: none;
      &:hover {
        border: 1px solid white;
        background-color: ${colors.pink}!important;
        color: white !important;
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
export default Style;
