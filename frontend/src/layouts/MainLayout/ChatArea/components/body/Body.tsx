import { useState, useEffect, useRef } from "react";
import { message } from "../../../../../types/firebase";
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
const Body = (props: any) => {
  const firebaseConfig = props.firebaseConfig;

  const scrollableRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.recipient);
  const [data, setData] = useState<message[]>([]);
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
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
    }
    async function get() {
      try {
        const db = firebaseConfig.getDatabase();
        const url =
          (await firebaseConfig.getUrlByKey("id", id, "/messages")) +
          "/message";
        const starCountRef = ref(db, url);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
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
    get();
  }, []);
  const searchInformation = (id: string) => {
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
      console.log("response: ", response);
      const arr: SmallInformation[] = dataMember;
      arr.push(response.data);
      setDataMember(arr);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const idUser = props.sender;
  if (isLoading) return <p>Loading</p>;

  return (
    <Style className="scroll-bar" ref={scrollableRef} onLoad={scrollToEnd}>
      <div>
        <div className="start-chat">Start chat</div>
        {data.map((message: any) => {
          const data = searchInformation(message.user);
          console.log("Find data: ", data);
          formatDate(message.time);
          if (idMember == data?.id) {
            return <p>{message.body}</p>;
          } else {
            return (
              <div className="box-chat-item d-flex flex-row">
                <img className="img" src={data?.image} alt="" />
                <div>
                  <div className="header-message">
                    <p className="name">{data?.name}</p>
                    <p className="time">{formatDate(message.time)}</p>
                  </div>
                  <p className="body">{message.body}</p>
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
