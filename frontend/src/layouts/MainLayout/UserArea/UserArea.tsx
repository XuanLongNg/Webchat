import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useRef } from "react";
import { Avatar, Card, Skeleton, notification } from "antd";
import { SettingFilled } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { onValue, ref } from "firebase/database";
import ModalSendData from "./components/ModalSendData";
import ModalUser from "./components/ModalUser";
import { FirebaseServiceClient } from "../../../configs/firebaseConfig";
const BASE_URL = "http://localhost:4000";

const UserArea = ({ firebase }: { firebase: FirebaseServiceClient }) => {
  // const firebase = props.firebase;
  const [isLoading, setIsLoading] = useState(true);
  const profile = useRef({
    id: undefined,
    username: undefined,
    password: undefined,
    information: {
      address: undefined,
      dob: undefined,
      fname: undefined,
      lname: undefined,
      image: undefined,
      introduce: undefined,
    },
  });
  const [data, setData] = useState({
    name:
      profile.current?.information.fname +
      " " +
      profile.current?.information.lname,
    dob: profile.current?.information.dob,
    address: profile.current?.information.address,
    introduce: profile.current?.information.introduce,
  });
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isModalSendData, setIsModalSendData] = useState(false);
  const handleCancelSendDataModal = () => {
    setIsModalSendData(false);
  };
  const showModalUser = () => {
    setIsModalUserOpen(true);
    console.log(data);
  };
  const handleOkUserModal = () => {
    setIsModalUserOpen(false);
  };

  const handleCancelUserModal = () => {
    setIsModalUserOpen(false);
  };
  useEffect(() => {
    setIsLoading(true);
    async function updateProfile() {
      try {
        const db = firebase.getDatabase();
        const url = await firebase.getUrlByKey(
          "id",
          localStorage.id,
          "/account"
        );
        // "/information";
        // console.log("URL: ", url);
        const starCountRef = ref(db, url);
        onValue(starCountRef, (snapshot) => {
          profile.current = { ...profile.current, ...snapshot.val() };
          // console.log("Get info pro", profile.current);
          setData({
            ...data,
            name:
              profile.current.information.fname +
              " " +
              profile.current.information.lname,
            address: profile.current.information.address,
            introduce: profile.current.information.introduce,
            dob: profile.current.information.dob,
          });
          setIsLoading(false);
        });
      } catch (err) {
        console.log("Error: " + err);
        throw err;
      }
    }
    updateProfile();
  }, [isLoading]);

  const [readOnly, setReadOnly] = useState({
    name: true,
    dob: true,
    address: true,
    introduce: true,
  });
  const [closeEdit, setCloseEdit] = useState({
    name: false,
    dob: false,
    address: false,
    introduce: false,
  });

  const [degree, setDegree] = useState(0);

  const handleEdit = (edit: string) => {
    setReadOnly({ ...readOnly, [edit]: false });
    setCloseEdit({ ...closeEdit, [edit]: true });
  };
  const handleCancelEdit = (edit: string, content?: string) => {
    setReadOnly({ ...readOnly, [edit]: true });
    setCloseEdit({ ...closeEdit, [edit]: false });
    if (content === undefined) return;
    setData({ ...data, [edit]: content });
  };

  const handleSendData = () => {
    setData({ ...data });
    setIsModalSendData(false);
    handleCancelEdit("name");
    handleCancelEdit("dob");
    handleCancelEdit("address");
    const dataSend = {
      id: profile.current?.id,
      username: profile.current?.username,
      password: profile.current?.password,
      information: {
        image: profile.current?.information.image,
        fname: data.name.split(" ")[0],
        lname: data.name.substring(
          data.name.split(" ")[0].length + 1,
          data.name.length
        ),
        introduce: data.introduce,
        dob: moment(data.dob).format("YYYY-MM-DD"),
        address: data.address,
      },
    };
    console.log("Data:::: ", dataSend);
    axios
      .post(BASE_URL + "/api/user/updateProfile", dataSend)
      .then((response) => {
        if (response.data.message) {
          notification.success({ message: "Updated" });
        } else notification.error({ message: "Error" });
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    setIsModalSendData(true);
  };

  const layout = (
    <Style>
      <ModalUser
        isModalUserOpen={isModalUserOpen}
        handleOkUserModal={handleOkUserModal}
        handleCancelUserModal={handleCancelUserModal}
        readOnly={readOnly}
        profile={profile.current}
        data={data}
        setData={setData}
        handleSubmit={handleSubmit}
        closeEdit={closeEdit}
        handleEdit={handleEdit}
        handleCancelEdit={handleCancelEdit}
      />
      <ModalSendData
        handleSendData={handleSendData}
        isModalSendData={isModalSendData}
        handleCancelSendDataModal={handleCancelSendDataModal}
      />
      <Card bordered={false} className="user-card">
        {isLoading ? (
          <Skeleton.Avatar active size="large" className="avatar-card" />
        ) : (
          <Avatar
            size="large"
            className="avatar-card"
            src={profile.current?.information.image}
          />
        )}
        <Skeleton
          loading={isLoading}
          active
          paragraph={{ rows: 1 }}
          className="body-card"
        >
          <Card.Meta
            className="body-card flex-grow-1"
            title={data.name}
            description={profile.current?.id}
          />
        </Skeleton>

        <SettingFilled
          // onMouseOver={() => setDegree(10)}
          // onMouseOut={() => setDegree(0)}
          className="setting-card"
          rev=""
          // spin={spin}
          // rotate={degree}
          onClick={showModalUser}
        />
      </Card>
    </Style>
  );

  return layout;
};
export default UserArea;
