import styled from "styled-components";
import colors from "../../../styles/color";

const Style = styled.div`
  /* background-color: ${colors.black_blue_color}; */
  min-width: 16em;
  height: 90vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  .ListBoxChat {
    height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
    .item {
      height: 10vh;
      padding: 0;
      margin: 1vh 0;
      border-block-end: none;
    }
  }
  .active {
    width: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  // position: absolute;
`;
export default Style;
