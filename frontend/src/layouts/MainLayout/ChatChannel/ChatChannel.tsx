import Style from "./style";
import "../../../styles/scrollbar/index.css";
import { infoBoxChat } from "../../../types/firebase";
import { List } from "antd";
import ChatBox from "./components/CardChat/ChatBox";
import Utilities from "./components/Utilities/Utilities";

const ChatChannel = ({ boxes }: { boxes: infoBoxChat[] }) => {
  return (
    <Style>
      <Utilities />
      <List
        className="ListBoxChat scroll-bar"
        size="large"
        bordered={false}
        dataSource={boxes}
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
