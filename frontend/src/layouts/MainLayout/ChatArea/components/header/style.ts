import styled from "styled-components";
import colors from "../../../../../styles/color";
const color_header = colors.light_blue_color,
  color_text_header = colors.white;
const Style = styled.div`
  align-items: center;
  height: 10vh;
  background-color: ${color_header};
  box-sizing: border-box;
  min-width: 30em;
  padding-left: 1em;
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
