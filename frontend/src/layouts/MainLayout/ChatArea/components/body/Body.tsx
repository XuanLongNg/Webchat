import { useState, useEffect, useRef } from "react";
import { MessageData, message } from "../../../../../types/firebase";
import Style from "./style";
import { onValue, ref } from "firebase/database";
import axios from "axios";
import { format } from "date-fns";
import { Format_YYYY_MM_DD_HH_mm_ss } from "../../../../../utils/formatTime";
const BASE_URL = "http://localhost:4000";
interface SmallInformation {
  id: string;
  name: string;
  image: string;
}
const Body = ({
  recipient = undefined,
  messages,
  filter,
}: {
  recipient: string | undefined;
  messages?: MessageData[];
  filter: string;
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MessageData[] | undefined>(messages);
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
    setData(
      messages?.sort((a, b) => {
        return (
          parseInt(Object.keys(a)[0].slice(1)) -
          parseInt(Object.keys(b)[0].slice(1))
        );
      })
    );

    if (filter) {
      console.log(
        "fill :",
        messages?.filter((e) => e[Object.keys(e)[0]].body.indexOf(filter) != -1)
      );
      setData(
        messages?.filter((e) => e[Object.keys(e)[0]].body.indexOf(filter) != -1)
      );
      console.log(messages);
    }
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight - scrollableRef.current.clientHeight;
    }
  }, [messages, filter]);
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
  if (!data)
    return <p style={{ height: "calc(80vh - 2px)", margin: "0" }}>Loading</p>;
  return (
    <Style className="scroll-bar" ref={scrollableRef} onLoad={scrollToEnd}>
      <div>
        <div className="start-chat"></div>
        {data.map((message: MessageData) => {
          const mes = message[Object.keys(message)[0]];
          const data = searchInformation(mes.user);
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
                  <p className="time">
                    {Format_YYYY_MM_DD_HH_mm_ss(mes.time).time}
                  </p>
                </div>
                <p className="body">{mes.body}</p>
              </div>
            </div>
          );
          // }
        })}
      </div>
    </Style>
  );
};

export default Body;
