import ChatChannel from "./ChatChannel/ChatChannel";
import UserArea from "./UserArea/UserArea";
import ChatArea from "./ChatArea/ChatArea";
import { LayoutProps } from "antd";
import Style from "./style";
import react, { useState, useEffect } from "react";
import User from "../../database/User";
import { infoBoxChat, userProfile } from "../../types/firebase";
import Client from "../../database/client";
import { Navigate } from "react-router-dom";
import FirebaseConfig from "../../configs/firebaseConfig";

const user = new User();
const client = new Client();
const firebaseConfig = new FirebaseConfig();

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<userProfile>(user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);
  if (isLoading) return <div>Loading...</div>;

  return (
    <Style className="d-flex">
      <div id="sidebar">
        <ChatChannel client={client} firebase={firebaseConfig} />
        <UserArea firebase={firebaseConfig} />
      </div>
      <div id="chat-area" className="flex-grow-1">
        <ChatArea firebase={firebaseConfig} />
      </div>
    </Style>
  );
};

export default MainLayout;
