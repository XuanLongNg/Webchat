import ChatChannel from "./ChatChannel/ChatChannel";
import UserArea from "./UserArea/UserArea";
import ChatArea from "./ChatArea/ChatArea";
import { LayoutProps } from "antd";
import Style from "./style";
import react, { useState, useEffect } from "react";
import User from "../../database/User";
import { infoBoxChat } from "../../types/firebase";
import client from "../../database/client";
import { Navigate, useParams } from "react-router-dom";
import Firebase from "../../configs/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../hooks/redux/store";
import { ADD, DELETE, addBox } from "../../hooks/redux/boxes/boxesActions";
import { Dispatch } from "redux";

const user = new User();
// const client = new Client();
// const firebaseConfig = new FirebaseConfig();

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { boxes } = useSelector((state: RootState) => state.boxes);
  const dispatch = useDispatch<Dispatch<ADD | DELETE>>();
  const { message } = useParams<{ message: string }>();

  useEffect(() => {
    setIsLoading(true);
    async function getListChat() {
      try {
        const result = await client.getListChats();

        if (!result.find((e) => e == message)) window.location.href = result[0];

        for (let i of result) {
          const box: infoBoxChat = await client.getInfoBoxChat(i);
          dispatch(addBox(box));
        }
        // console.log(boxes);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    getListChat();

    setIsLoading(false);
  }, [dispatch, isLoading]);
  return (
    <Style className="d-flex">
      <div id="sidebar">
        {isLoading && <>Loading....</>}
        {!isLoading && <ChatChannel boxes={boxes} />}
        <UserArea firebase={Firebase} />
      </div>
      <div id="chat-area" className="flex-grow-1">
        <ChatArea boxes={boxes} />
      </div>
    </Style>
  );
};

export default MainLayout;
