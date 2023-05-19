import styled from "styled-components";
import colors from "../../../../../styles/color";
export const StyleModal = styled.div`
  .list-user {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;
const Style = styled.div`
  align-items: center;
  height: calc((100% / 9));
  width: 100%;
  padding: 0 5%;
  background-color: ${colors.light_blue_color};

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
export default Style;
