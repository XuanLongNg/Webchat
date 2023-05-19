import Style from "./style";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/scrollbar/index.css";
import { infoBoxChat } from "../../../types/firebase";
import { List } from "antd";
import ChatBox from "./components/CardChat/ChatBox";
import Utilities from "./components/Utilities/Utilities";

const ChatChannel = (props: any) => {
  return (
    <Style>
      <Utilities idUser={props.idUser} />
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
