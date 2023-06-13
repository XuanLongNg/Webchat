import Style from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
import { infoBoxChat } from "../../../types/firebase";
import { List } from "antd";
import ChatBox from "./components/CardChat/ChatBox";
import Utilities from "./components/Utilities/Utilities";
import { useEffect, useState } from "react";

const ChatChannel = (props: any) => {
  const client = props.client;
  const [boxs, setBoxs] = useState<infoBoxChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getListChat() {
      try {
        const result = await client.getListChats();
        let arrtmp: infoBoxChat[] = [];
        for (let i of result) {
          const tmp: infoBoxChat = await client.getInfoBoxChat(i);
          arrtmp.push(tmp);
        }
        setBoxs(arrtmp);

        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    getListChat();
  });
  return (
    <Style>
      <Utilities />
      <List
        className="ListBoxChat scroll-bar"
        size="large"
        bordered={false}
        dataSource={boxs}
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
