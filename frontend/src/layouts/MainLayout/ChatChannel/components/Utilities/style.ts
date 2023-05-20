import styled from "styled-components";
import colors from "../../../../../styles/color";
import { Modal } from "antd";
export const StyleModalSearch = styled(Modal)`
  .list-user {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;
export const StyleModalView = styled(Modal)`
  .card {
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    .card-cover {
      width: 100%;
      height: 200px;
      border-radius: 11px;
      position: relative;
      .card-filter-blur-cover {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        pointer-events: none;
      }
      .card-avatar {
        position: absolute;
        object-fit: cover;
        height: 100%;
        background: transparent;
        position: absolute;
        object-fit: cover;
        width: auto;
        height: 100%;
        transform: translateX(-50%);
        background: transparent;
      }
    }
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
