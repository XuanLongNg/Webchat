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
const firebaseConfig = new FirebaseConfig();
const client = new Client();

const SendMessage = (props: any) => {
  // console.log("Message", props);

  const onFinish = (values: any) => {
    const data: message = {
      sender: props.sender,
      time: new Date().toString(),
      body: values.message,
    };
    // console.log(data);

    client
      .sendMessage(props.recipient, data)
      .then()
      .catch((err) => console.log(err));
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    // <SendMessageStyled>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="inline"
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: "Enter your message!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // </SendMessageStyled>
  );
};
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
  const [idMember, setIdMember] = useState(box.member);
  const [dataMember, setDataMember] = useState();

  useEffect(() => {
    async function getInfoMembers() {
      try {
        const arr: any = [];
        const keys = Object.keys(idMember);
        console.log("Box: ", box);

        console.log("Id member", idMember);

        console.log("Keys", keys);

        for (let i of keys) {
          const response = await axios.post(
            BASE_URL + "/api/user/getSmallInformation",
            { id: idMember[i] }
          );
          console.log("response: ", response);

          arr.push(response.data);
        }
        console.log("Arrays: ", arr);

        setDataMember(arr);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getInfoMembers();
  });
  return (
    <Style>
      <Header id={url} client={client} box={box} />
      <Body
        firebaseConfig={firebaseConfig}
        sender={props.sender}
        recipient={url}
        box={box}
        dataMember={dataMember}
      />
      <SendMessage sender={props.sender} recipient={url} />
    </Style>
  );
};
export default ChatArea;
