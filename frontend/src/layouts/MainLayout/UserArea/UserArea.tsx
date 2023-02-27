import React from "react";
import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { data } from "../../../database/data";
const UserArea = () => {
  const { id, name, avatar } = data.user.u1;
  return (
    <Style>
      <div className="box-chat-item d-flex">
        <img className="img" src={avatar} alt="" />
        <div>
          <h3 className="name">{name}</h3>
          <p className="body">#{id}</p>
        </div>
        <button className="setting-btn">
          <i className="bi bi-gear-fill float-end"></i>
        </button>
      </div>
    </Style>
  );
};
export default UserArea;
