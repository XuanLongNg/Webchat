import React from "react";
import { User } from "../../../types";
import { data } from "../../../database/data";
import Style, { StyleUtilities, StyleBoxChat } from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
const chatBox = (data: User) => {
  const { name, avatar, boxs } = data;
  return (
    <StyleBoxChat className="box-chat scroll-bar">
      {Object.entries(boxs).map((key, value) => {
        return (
          <div className="box-chat-item d-flex flex-row">
            <img className="img" src={avatar} alt="" />
            <div>
              <h3 className="name">{name}</h3>
              <p className="body">Hello</p>
            </div>
          </div>
        );
      })}
    </StyleBoxChat>
  );
};
const ChatChannel = () => {
  const user = data.user.u1;
  return (
    <Style className="chat-channel">
      <StyleUtilities className="d-flex flex-row util utilities">
        <div className="input-group search">
          <input
            className="form-control bi bi-search"
            type="text"
            placeholder=" Search"
          />
        </div>
        <button className="find-user-btn">
          <i className="bi bi-person-fill-add"></i>
        </button>
        <button className="find-gr-btn">
          <i className="bi bi-people-fill"></i>
        </button>
      </StyleUtilities>
      {chatBox(user)}
    </Style>
  );
};
export default ChatChannel;
