import { useState, useEffect } from "react";
import { message } from "../../../../../types/firebase";
import Style from "./style";
import { onValue, ref } from "firebase/database";
import axios from "axios";
const BASE_URL = "http://localhost:4000";
const Body = (props: any) => {
  const box = props.box;
  const firebaseConfig = props.firebaseConfig;
  console.log("Body: ", box);

  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(props.recipient);
  const [data, setData] = useState<message[]>([]);
  const [idMember, setIdMember] = useState(box.member);
  const [dataMember, setDataMember] = useState();
  useEffect(() => {
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
          setData(arr);
        });
        setIsLoading(false);
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    async function getInfoMembers() {
      try {
        const arr: any = [];
        const keys = Object.keys(idMember);
        console.log("Box: ", box);

        console.log("Id member", idMember);

        console.log("Keys", keys);

        for (let i of keys) {
          const response = await axios.post(
            BASE_URL + "/api/user/getSmallInformation",
            { id: idMember[i] }
          );
          console.log("response: ", response);

          arr.push(response.data);
        }
        console.log("Arrays: ", arr);

        setDataMember(arr);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getInfoMembers();
    get();
  }, []);
  const idUser = props.sender;
  if (isLoading) return <p>Loading</p>;
  console.log(dataMember);

  return (
    <Style>
      <div>
        {data.map((message: any) => {
          if (message.user === idUser) {
            return (
              <div className="message chat-user">
                {message.user} {message.body}
              </div>
            );
          } else {
            return (
              <div className="message">
                {message.user} {message.body}
              </div>
            );
          }
        })}
      </div>
    </Style>
  );
};

export default Body;
