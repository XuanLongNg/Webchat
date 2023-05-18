import React, { useState, useEffect } from "react";
import Style, { StyleUtilities } from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
import Client from "../../../database/client";
import { infoBoxChat } from "../../../types/firebase";
import { useParams, Route, Navigate } from "react-router-dom";
import { Divider, List, Typography } from "antd";
import ChatBox from "./components/ChatBox";

// const ListChatBox = (boxs: infoBoxChat[]) => {
//   const com = (
//     <StyleBoxChat className="box-chat scroll-bar">
//       {boxs.map((box: infoBoxChat) => {
//         return ChatBox(box);
//       })}
//     </StyleBoxChat>
//   );
//   return com;
// };

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
    <Style>
      {Utilities()}
      <List
        className="ListBoxChat scroll-bar"
        size="large"
        bordered={false}
        dataSource={props.boxs}
        renderItem={(item: infoBoxChat) => (
          <List.Item className="item">
            <ChatBox box={item}></ChatBox>
          </List.Item>
        )}
      />
    </Style>
  );
};
export default ChatChannel;
