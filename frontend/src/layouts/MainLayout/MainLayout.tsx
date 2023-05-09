import ChatChannel from "./ChatChannel/ChatChannel";
import UserArea from "./UserArea/UserArea";
import ChatArea from "./ChatArea/ChatArea";
import { LayoutProps } from "antd";
import Style from "./style";
import react, { useState, useEffect } from "react";
import User from "../../database/User";
import { infoBoxChat, userProfile } from "../../types/firebase";
import listChat from "../../database/ListChat";
import { Navigate } from "react-router-dom";
const user = new User();
const ListChat = new listChat();

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<userProfile>(user.user);
  const [boxs, setBoxs] = useState<infoBoxChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getListChat() {
      try {
        const result = await ListChat.getListChats();
        let arrtmp: infoBoxChat[] = [];
        for (let i of result) {
          const tmp: infoBoxChat = await ListChat.getInfoBoxChat(i);
          arrtmp.push(tmp);
        }
        setBoxs(arrtmp);
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    async function updateProfile() {
      const profile = await user.getProfile(document.cookie);
      setProfile(profile);
      setIsLoading(false);
    }
    updateProfile();
    getListChat();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  const url = "/message/" + boxs[0].id;
  console.log(url);

  return (
    <Style className="d-flex">
      {/* <Navigate to={url} /> */}
      <div id="sidebar">
        <ChatChannel boxs={boxs} />
        <UserArea user={profile} />
      </div>
      <div id="chat-area" className="flex-grow-1">
        <ChatArea sender={profile.id} url={boxs[0].id} />
      </div>
    </Style>
  );
};

export default MainLayout;
