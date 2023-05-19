import styled from "styled-components";
import colors from "../../../../styles/color";

const Style = styled.a`
  height: 100%;
  background-color: ${colors.black_blue_color};
  transition: background-color 0.4s ease;
  transition: box-shadow 0.4s ease;

  /* box-shadow: 0 23px 23px #3b464d inset, 0 -23px 23px #3b464d inset; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-decoration: none;
  border-bottom: 1px solid gray;
  .box-chat-item {
    align-items: center;
    //   background-color: ${colors.orange};
    color: ${colors.white};
    width: 90%;
    margin: auto;
    overflow: hidden;
    .img {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0 1em;
    }
    div {
      height: 100%;
      padding: 10px 0 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .name {
        height: 1.4em;
        overflow: hidden;
        font-size: 20px;
        margin: 0px 0px 1px;
      }
      .body {
        height: 35%;
        overflow: hidden;
        font-size: 13px;
        margin: 0;
      }
    }
  }
  &:hover,
  &:active {
    color: ${colors.white};
    /* background-color: #cccccc7e; */
    box-shadow: 0px -11px 9px -5px rgba(204, 204, 204, 0.494) inset,
      0px 11px 11px -6px rgba(204, 204, 204, 0.494) inset;
  }
`;

export default Style;
