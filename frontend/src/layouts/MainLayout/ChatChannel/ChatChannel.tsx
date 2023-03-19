import React, { useState } from "react";
import { data } from "../../../database/data";
import Style, { StyleUtilities, StyleBoxChat } from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
import ListChat from "../../../database/ListChat";
import { infoBoxChat } from "../../../types/firebase";
import { useEffect } from "react";
const listChat = new ListChat();
const ChatBox = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [boxs, setBoxs] = useState<infoBoxChat[]>([]);
  useEffect(() => {
    async function getListChat() {
      const result = await listChat.getListChats();
      setBoxs(result);
      setIsLoading(false);
    }
    getListChat();
  }, []);
  const com = (
    <StyleBoxChat className="box-chat scroll-bar">
      {boxs.map((box) => {
        return (
          <div className="box-chat-item d-flex flex-row">
            <img className="img" src={box.image} alt="" />
            <div>
              <h3 className="name">{box.name}</h3>
              <p className="body">Hello</p>
            </div>
          </div>
        );
      })}
    </StyleBoxChat>
  );
  if (isLoading) return <p>Loading</p>;
  return com;
};
const ChatChannel = () => {
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
      {ChatBox()}
    </Style>
  );
};
export default ChatChannel;
