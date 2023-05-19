import styled from "styled-components";
import colors from "../../../styles/color/index";

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
  background-color: ${colors.light_blue_color};
`;
const Style = styled.div`
  //   position: absolute;
  left: 0;
  top: 0;
  background-color: ${colors.black_blue_color};
  width: 100%;
  height: 100%;
`;
export default Style;
