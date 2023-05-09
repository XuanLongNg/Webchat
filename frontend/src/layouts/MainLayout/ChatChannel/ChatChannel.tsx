import React, { useState, useEffect } from "react";
import Style, { StyleUtilities, StyleBoxChat } from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
import listChat from "../../../database/ListChat";
import { infoBoxChat } from "../../../types/firebase";
import { useParams, Route, Navigate } from "react-router-dom";
const ChatBox = (box: infoBoxChat) => {
  const nav = "/" + box.id;
  const html = (
    <a href={nav}>
      <div className="box-chat-item d-flex flex-row">
        <img className="img" src={box.image} alt="" />
        <div>
          <h3 className="name">{box.name}</h3>
          <p className="body">Hello</p>
        </div>
      </div>
    </a>
  );

  return html;
};

const ListChatBox = (boxs: infoBoxChat[]) => {
  const com = (
    <StyleBoxChat className="box-chat scroll-bar">
      {boxs.map((box: infoBoxChat) => {
        return ChatBox(box);
      })}
    </StyleBoxChat>
  );
  return com;
};

const Utilities = () => {
  return (
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
  );
};

const ChatChannel = (props: any) => {
  return (
    <Style className="chat-channel">
      {Utilities()},{ListChatBox(props.boxs)}
    </Style>
  );
};
export default ChatChannel;
