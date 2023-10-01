import { Modal } from "antd";
import styled from "styled-components";

export default styled(Modal)`
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
  .btn-logout {
    margin-top: 1em;
    width: 100%;
  }
`;
