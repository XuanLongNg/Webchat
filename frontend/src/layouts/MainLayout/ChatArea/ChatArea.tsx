import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { MessageData, infoBoxChat, message } from "../../../types/firebase";
import client from "../../../database/client";
import Firebase from "../../../configs/firebaseConfig";
import Body from "./components/body/Body";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { RootState } from "../../../hooks/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
// import {
//   ADD,
//   DELETE,
//   addMessage,
// } from "../../../hooks/redux/messages/messagesActions";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import {
  TADD_MESSAGE,
  addMessage,
} from "../../../hooks/redux/boxes/boxesActions";

const ChatArea = ({
  boxes,
}: {
  boxes: { info: infoBoxChat; messages: MessageData[] }[];
}) => {
  const { message } = useParams<{ message: string }>();
  const checkUrl = (box: { info: infoBoxChat; messages: MessageData[] }) => {
    return box.info.id == message;
  };
  // const { boxes } = useSelector((state: RootState) => state.boxes);
  const dispatch = useDispatch<Dispatch<TADD_MESSAGE | TADD_MESSAGE>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const onSearch = (value: string) => {
    setSearchBy(value);
  };
  let box = boxes.find(checkUrl);
  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      try {
        const db = Firebase.getDatabase();
        const url =
          (await Firebase.getUrlByKey(
            "id",
            message ? message : "",
            "/messages"
          )) + "/message";
        const starCountRef = ref(db, url);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          // console.log("data\n", data);
          const arr = [];
          const keys = Object.keys(data);
          for (let i of keys) {
            if (i == "number") continue;
            dispatch(addMessage({ [i]: data[i] }, box?.info));
          }
        });
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    };
    getMessages();
  }, [message]);
  return (
    <Style>
      <Header box={box} onSearch={onSearch} />
      <Body filter={searchBy} recipient={message} messages={box?.messages} />
      <Footer sender={localStorage.id} client={client} recipient={message} />
    </Style>
  );
};
export default ChatArea;
