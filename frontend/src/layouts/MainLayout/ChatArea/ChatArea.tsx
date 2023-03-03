import React, { useState } from "react";
import Style, { HeaderStyled, MessageStyled, SendMessageStyled } from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { data } from "../../../database/data";

const Header = () => {
  const { id, name, avatar } = data.user.u1;
  // const [onclick, SetOnClick] = useState(false);
  const [onDisplaySearchBar, SetOnDisplaySearchBar] = useState(false);

  return (
    <HeaderStyled>
      <div className="box-chat-item d-flex">
        <img className="img" src={avatar} alt="" />
        <div className="flex-grow-1 info-user">
          <h3 className="name">{name}</h3>
          <p className="body">#{id}</p>
        </div>
        <div className="input-group search">
          <input
            // style={{ display: `${onDisplaySearchBar ? "block" : "none"}` }}
            type="text"
            className="form-control"
          />
          <button
            className="search-btn btn btn-outline-secondary"
            onClick={() => {
              SetOnDisplaySearchBar(true);
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
        <button className="setting-btn">
          <i className="bi bi-exclamation-circle-fill"></i>
        </button>
      </div>
    </HeaderStyled>
  );
};
const Messages = () => {
  const messages: any = [];
  const id = "dadadad";
  return (
    <MessageStyled>
      <div>
        {messages.map((message: any) => {
          if (message.id === id) {
            return <div>hello</div>;
          } else {
            return <div>Hello</div>;
          }
        })}
      </div>
    </MessageStyled>
  );
};
const SendMessage = () => {
  return (
    <SendMessageStyled>
      <div className="input-group mb-3">
          <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon1"
        >
          Send Message
        </button>
        <input type="text" className="form-control" placeholder="" />
      </div>
    </SendMessageStyled>
  );
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
