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
const user = new User();
const client = new Client();

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<userProfile>(user.user);
  const [boxs, setBoxs] = useState<infoBoxChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getListChat() {
      try {
        const result = await client.getListChats();
        let arrtmp: infoBoxChat[] = [];
        for (let i of result) {
          // console.log(i);
          const tmp: infoBoxChat = await client.getInfoBoxChat(i);
          arrtmp.push(tmp);
        }
        setBoxs(arrtmp);
        // for (let i in boxs) console.log(i);

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
  // const url = "/message/" + boxs[0].id;
  // console.log(url);

  return (
    <Style className="d-flex">
      {/* <Navigate to={url} /> */}
      <div id="sidebar">
        <ChatChannel boxs={boxs} />
        <UserArea user={profile} />
      </div>
      <div id="chat-area" className="flex-grow-1">
        <ChatArea sender={profile.id} url={"#1"} />
      </div>
    </Style>
  );
};

export default MainLayout;
