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
const Style = styled.div`
  background-color: ${colors.black_blue_color};
  min-width: 16em;
  height: 90vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  .ListBoxChat {
    height: 90%;
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
