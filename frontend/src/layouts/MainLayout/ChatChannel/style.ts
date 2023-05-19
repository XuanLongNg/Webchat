import styled from "styled-components";
import colors from "../../../styles/color";

const Style = styled.div`
  background-color: ${colors.black_blue_color};
  min-width: 16em;
  height: 90vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  .ListBoxChat {
    height: calc((100% / 9 * 8));
    overflow-y: scroll;
    overflow-x: hidden;
    .item {
      height: 15vh;
      padding: 0;
    }
  }
  // position: absolute;
`;
export default Style;
