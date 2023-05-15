import React, { useState, useEffect } from "react";
import Style, { HeaderStyled, MessageStyled, SendMessageStyled } from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { data } from "../../../database/data";
import { useParams } from "react-router-dom";
import { infoBoxChat, message } from "../../../types/firebase";
import { Button, Form, Input } from "antd";
import Client from "../../../database/client";
const client = new Client();
const Header = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.id);
  const [data, setData] = useState<infoBoxChat>();
  useEffect(() => {
    async function get() {
      try {
        const tmp = await client.getInfoBoxChat(id);
        setData(tmp);
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    get();
  }, []);
  // const [onclick, SetOnClick] = useState(false);
  const [onDisplaySearchBar, SetOnDisplaySearchBar] = useState(false);
  if (isLoading) return <p>Loading</p>;

  return (
    <HeaderStyled>
      <div className="box-chat-item d-flex">
        <img className="img" src={data?.image} alt="" />
        <div className="flex-grow-1 info-user">
          <h3 className="name">{data?.name}</h3>
          <p className="body">#{data?.id}</p>
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
const Messages = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.id);
  const [data, setData] = useState<message[]>([]);
  useEffect(() => {
    async function get() {
      try {
        const tmp = await client.getMessage(id);
        setData(tmp);
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    get();
  }, []);
  // const messages: any = ws.getMessage(props.sender, props.recipient);
  const idUser = props.sender;
  return (
    <MessageStyled>
      <div>
        {data.map((message: any) => {
          if (message.user === idUser) {
            return (
              <div>
                {message.user} {message.body}
              </div>
            );
          } else {
            return (
              <div>
                {message.user} {message.body}
              </div>
            );
          }
        })}
      </div>
    </MessageStyled>
  );
};
const SendMessage = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
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
const ChatArea = (props: any) => {
  const { url } = useParams<{ url: string }>();

  return (
    <Style>
      <Header id={url} />
      <Messages sender={props.id} recipient={url} />
      <SendMessage />
    </Style>
  );
};
export default ChatArea;
