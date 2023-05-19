import React, { useEffect, useState } from "react";
import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { infoBoxChat, message } from "../../../types/firebase";
import { Button, Form, Input } from "antd";
import Client from "../../../database/client";
import FirebaseConfig from "../../../configs/firebaseConfig";
import Body from "./components/body/Body";
import Header from "./components/header/Header";
import axios from "axios";
import Footer from "./components/footer/Footer";
const firebaseConfig = new FirebaseConfig();
const client = new Client();

const BASE_URL = "http://localhost:4000";

const ChatArea = (props: any) => {
  const { url } = useParams<{ url: string }>();
  const checkUrl = (box: infoBoxChat) => {
    return box.id == url;
  };
  console.log("Boxs: ", props.boxs);
  console.log("Box: ", props.boxs.find(checkUrl));

  let box = props.boxs.find(checkUrl);
  const tmpData = {
    image: "",
    name: "unknown",
    member: {},
  };
  box = box == undefined ? tmpData : box;
  console.log("Char area: ", box);
  return (
    <Style>
      <Header id={url} client={client} box={box} />
      <Body
        firebaseConfig={firebaseConfig}
        sender={props.sender}
        recipient={url}
      />
      <Footer sender={props.sender} client={client} recipient={url} />
    </Style>
  );
};
export default ChatArea;
