import styled from "styled-components";
import colors from "../../../../../styles/color";
import { Modal } from "antd";
export const StyleModalSearch = styled(Modal)`
  .group-search {
    .input-search {
      /* width: 100px; */
    }
  }
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
  height: 10vh;
  width: calc(100%-0.5em);
  padding: 0 5%;
  margin-right: 0.5em;
  background-color: ${colors.pink};
  /* border-top-right-radius: 5px; */
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  .search {
    /* font:  */
    width: 70%;
    btn {
      background-color: ${colors.white};
    }
    input {
      &:focus {
        /* border-color: #fe8680; */
        /* box-shadow: 0 0 0 0.25rem #fe8680; */
      }
    }
  }
  .find-user-btn,
  .find-gr-btn {
    color: ${colors.pink};
    background-color: white;
    padding: 4px 6px;
    height: auto;
    margin-left: 2.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: all 0.5s ease;
    border-radius: 5px;
    border: 2px solid white !important;

    &:hover {
      background-color: ${colors.pink}!important;
      color: white !important;
    }
  }
`;
export default Style;
