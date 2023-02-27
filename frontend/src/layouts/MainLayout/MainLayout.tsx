import ChatChannel from "./ChatChannel/ChatChannel";
import UserArea from "./UserArea/UserArea";
import ChatArea from "./ChatArea/ChatArea";
import { LayoutProps } from "antd";
import Style from "./style";
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Style className="d-flex">
      <div id="sidebar">
        <ChatChannel />
        <UserArea />
      </div>
      <div id="chat-area" className="flex-grow-1">
        <ChatArea />
      </div>
    </Style>
  );
};

export default MainLayout;
