import { useState, useEffect, useRef } from "react";
import { MessageData, message } from "../../../../../types/firebase";
import Style from "./style";
import { onValue, ref } from "firebase/database";
import axios from "axios";
import { format } from "date-fns";
const BASE_URL = "http://localhost:4000";
interface SmallInformation {
  id: string;
  name: string;
  image: string;
}
const Body = ({
  firebaseConfig,
  sender,
  recipient = undefined,
  messages,
}: {
  firebaseConfig: any;
  sender: string;
  recipient: string | undefined;
  messages: MessageData[];
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id] = useState(recipient);
  const [data, setData] = useState<MessageData[]>(messages);
  const [idMember, setIdMember] = useState("");
  const [dataMember, setDataMember] = useState<SmallInformation[]>([]);
  const scrollToEnd = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        top: scrollableRef.current.scrollHeight,
        // behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    messages.sort((a, b) => {
      return (
        parseInt(Object.keys(a)[0].slice(1)) -
        parseInt(Object.keys(b)[0].slice(1))
      );
    });
    // console.log("MEs", messages);
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
    }
    async function get() {
      setIsLoading(true);
      try {
        const db = firebaseConfig.getDatabase();
        const url =
          (await firebaseConfig.getUrlByKey("id", id, "/messages")) +
          "/message";
        const starCountRef = ref(db, url);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          // console.log(data);
          const arr = [];
          const keys = Object.keys(data);
          for (let i of keys) {
            arr.push(data[i]);
          }
          arr.pop();
          arr.sort((a: message, b: message) => {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
          });
          setData(arr);
        });
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    // get();
    setIsLoading(false);
  }, [isLoading]);
  const searchInformation = (id: string) => {
    // console.log("Id", id);

    for (let i of dataMember) {
      if (i.id === id) {
        return i;
      }
    }
    getInfoMembers(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
  const formatDate = (date: string) => {
    const dateTmp = new Date(date);
    const dateFormated = format(dateTmp, "dd/MM/yyyy");
    const timeFormated = format(dateTmp, "HH:mm");
    return dateFormated + " " + timeFormated;
  };
  const getInfoMembers = async (id: string) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/user/getSmallInformation",
        { id: id }
      );
      // console.log("response: ", response);
      const arr: SmallInformation[] = dataMember;
      arr.push(response.data);
      setDataMember(arr);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  if (!messages) return <p>Loading</p>;

  return (
    <Style className="scroll-bar" ref={scrollableRef} onLoad={scrollToEnd}>
      <div>
        <div className="start-chat"></div>
        {messages.map((message: MessageData) => {
          const mes = message[Object.keys(message)[0]];
          const data = searchInformation(mes.user);
          // formatDate(message[Object.keys(message)[0]].time);

          if (data?.id && idMember == data.id) {
            // setIdMember(data.id);
            return <p key={data?.id + data?.image}>{mes.body}</p>;
          } else if (data?.id && idMember != data.id) {
            // setIdMember(data.id);
            return (
              <div
                key={Object.keys(message)[0]}
                className="box-chat-item d-flex flex-row"
              >
                <img className="img" src={data?.image} alt="" />
                <div>
                  <div className="header-message">
                    <p className="name">
                      {data?.id == localStorage.id ? (
                        <span>{data?.name}</span>
                      ) : (
                        data?.name
                      )}
                    </p>
                    <p className="time">{formatDate(mes.time)}</p>
                  </div>
                  <p className="body">{mes.body}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </Style>
  );
};

export default Body;
