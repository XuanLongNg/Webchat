import React from "react";
import Style, { HeaderStyled, MessageStyled, SendMessageStyled } from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { data } from "../../../database/data";

const Header = () => {
  const { id, name, avatar } = data.user.u1;
  return (
    <HeaderStyled>
      <div className="box-chat-item d-flex">
        <img className="img" src={avatar} alt="" />
        <div>
          <h3 className="name">{name}</h3>
          <p className="body">#{id}</p>
        </div>
        <button className="setting-btn">
          <i className="bi bi-exclamation-circle-fill"></i>
        </button>
      </div>
    </HeaderStyled>
  );
};
const Messages = () => {
  return <div>Hello</div>;
};
const SendMessage = () => {
  return <div>Hello</div>;
};
const ChatArea = () => {
  return (
    <Style>
      <Header />
      <Messages />
      <SendMessage />
    </Style>
  );
};
export default ChatArea;
