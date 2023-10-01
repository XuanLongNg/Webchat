import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import { infoBoxChat, message } from "../../../types/firebase";
import client from "../../../database/client";
import Firebase from "../../../configs/firebaseConfig";
import Body from "./components/body/Body";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { RootState } from "../../../hooks/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  ADD,
  DELETE,
  addMessage,
} from "../../../hooks/redux/messages/messagesActions";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

// const firebaseConfig = new FirebaseConfig();
// const client = new Client();

const ChatArea = ({ boxes }: { boxes: infoBoxChat[] }) => {
  const { message } = useParams<{ message: string }>();
  const checkUrl = (box: infoBoxChat) => {
    return box.id == message;
  };
  const { messages } = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<Dispatch<ADD | DELETE>>();
  const [isLoading, setIsLoading] = useState(false);

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
            dispatch(
              addMessage({
                [i]: data[i],
              })
            );
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
      <Header box={box} />
      <Body
        firebaseConfig={Firebase}
        sender={localStorage.id}
        recipient={message}
        messages={messages}
      />
      <Footer sender={localStorage.id} client={client} recipient={message} />
    </Style>
  );
};
export default ChatArea;
