import styled from "styled-components";
import colors from "../../styles/color";

const Style = styled.div`
  background: ${colors.black_blue_color} url("/k.png") no-repeat center/cover;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    margin: 5em 0;
    background-color: rgba(0, 0, 0, 0.5);

    /* height: 30em; */
    width: 22em;
    border-radius: 10px;
    padding: 2em;
    .container-header {
      margin-top: 3em;
      color: ${colors.white};
    }
    .input {
      width: 100%;
    }
    .btn-login,
    .btn-register {
      width: 100%;
    }
  }
`;
export default Style;
