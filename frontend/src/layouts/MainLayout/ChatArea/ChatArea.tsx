import React, { useState, useEffect } from "react";
import Style, { HeaderStyled, MessageStyled, SendMessageStyled } from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { data } from "../../../database/data";
import { useParams } from "react-router-dom";
import ListChat from "../../../database/ListChat";
import { infoBoxChat, message } from "../../../types/firebase";
const listChat = new ListChat();
const Header = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.id);
  const [data, setData] = useState<infoBoxChat>();
  useEffect(() => {
    async function get() {
      try {
        const tmp = await listChat.getInfoBoxChat(id);
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
  const messages: any = [
    {
      sender: "hdhada",
      recipient: "dândnan",
      body: "Hello World",
      time: "dâdad",
    },
    {
      sender: "hdhad",
      recipient: "dândnan",
      body: "Lo cc",
      time: "dâdad",
    },
    {
      sender: "hdhada",
      recipient: "dândnan",
      body: "đaad",
      time: "dâdad",
    },
  ];
  // const messages: any = ws.getMessage(props.sender, props.recipient);
  const id = props.sender;
  return (
    <MessageStyled>
      <div>
        {messages.map((message: any) => {
          if (message.sender === id) {
            return (
              <div>
                {message.sender} {message.body}
              </div>
            );
          } else {
            return (
              <div>
                {message.recipient} {message.body}
              </div>
            );
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
