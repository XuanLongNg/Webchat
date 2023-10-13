import styled from "styled-components";
import colors from "../../styles/color";

export default styled.div`
  position: relative;
  background: ${colors.black_blue_color} url("/k.png") no-repeat center/cover;

  #sidebar {
    width: 20vw;
    min-width: 16em;
    background-color: rgba(0, 0, 0, 0.5);
  }
  #chat-area {
    width: 80vw;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
