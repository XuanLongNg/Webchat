import Style, { StyleModal } from "./style";
import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  Space,
  Avatar,
  List,
  notification,
  Card,
  Descriptions,
} from "antd";
import axios from "axios";
import { Account } from "../../../../../types/firebase";
import Meta from "antd/es/card/Meta";
import { Divider } from "antd";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const BASE_URL = "http://localhost:4000";
const Utilities = (props: any) => {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  const [idUser, setIdUser] = useState(props.idUser);
  const value: any = useRef("");
  const [ArrayUser, SetArrayUser] = useState([]);
  const [userProfile, setUserProfile] = useState({
    id: "",
    information: {
      lname: "",
      fname: "",
      image: "",
      dob: "",
      address: "",
    },
  });
  const handleSrearchFriend = async () => {
    SetArrayUser([]);

    const data = {
      key: value.current.input.value,
      id: idUser,
    };
    console.log(data);

    const response = await axios.post(BASE_URL + "/api/user/searchData", data);
    SetArrayUser(response.data);
    console.log(response.data);
  };
  const handleAddFriend = async (id: string) => {
    const data = {
      id: idUser,
      idFriend: id,
    };
    console.log(data);

    const response = await axios.post(BASE_URL + "/api/user/addFriend", data);
    console.log(response.data);

    if (response.data.result == "complete")
      notification.success({ message: "success" });
    else notification.error({ message: "You are friends with this user" });
  };
  const showModalSearch = () => {
    setIsModalSearchOpen(true);
  };
  const showModalUser = () => {
    setIsModalUserOpen(true);
  };

  const handleOk = () => {
    setIsModalSearchOpen(false);
  };

  const handleCancel = () => {
    setIsModalSearchOpen(false);
  };
  const handleOkUserModal = () => {
    setIsModalUserOpen(false);
  };

  const handleCancelUserModal = () => {
    setIsModalUserOpen(false);
  };
  const ModalUser = (user: any) => {
    return (
      <div>
        <Modal
          open={isModalUserOpen}
          onOk={handleOkUserModal}
          onCancel={handleCancelUserModal}
          footer={null}
          centered
        >
          <Card
            hoverable
            // style={{ width: 240 }}
            cover={
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  background: `rgba(0,0,0,0.3) url(${user.information.image}) no-repeat center/cover`,
                  borderRadius: "11px",
                  position: "relative",
                  //   filter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(8px)",
                    pointerEvents: "none",
                  }}
                />
                <img
                  alt="example"
                  src={user.information.image}
                  style={{
                    position: "absolute",
                    objectFit: "cover",
                    height: "100%",
                    background: "transparent",
                  }}
                />
              </div>
            }
          >
            <Meta
              title={user.information.fname + " " + user.information.lname}
              description={user.id}
            />
            <Divider />
            <Descriptions title="About me" layout="vertical">
              <Descriptions.Item label="Date of birth">
                {user.information.dob}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {user.information.address}
              </Descriptions.Item>
              <Descriptions.Item label="Introduce">
                {user.information.introduce}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
          </Card>
          {/* <Avatar src={user.information.image} /> */}
        </Modal>
      </div>
    );
  };
  const ModalAddFriend = () => {
    return (
      <StyleModal>
        <Modal
          open={isModalSearchOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Space direction="vertical" size="large">
            <Space.Compact style={{ width: "100%" }}>
              <Input ref={value} placeholder="Search id or name" />
              <Button type="primary" onClick={handleSrearchFriend}>
                Search
              </Button>
            </Space.Compact>
          </Space>
          <List
            className="scroll-bar"
            style={{
              maxHeight: "300px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            itemLayout="horizontal"
            dataSource={ArrayUser}
            renderItem={(item: Account, index) => (
              <List.Item
                actions={[
                  <Button
                    key="list-loadmore-edit"
                    type="primary"
                    onClick={() => handleAddFriend(item.id)}
                  >
                    Add friend
                  </Button>,
                  <Button
                    key="list-loadmore-more"
                    onClick={() => {
                      showModalUser();
                      setUserProfile(item);
                    }}
                  >
                    View
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  style={{ display: "flex", alignItems: "center" }}
                  avatar={
                    <Avatar
                      src={item.information.image}
                      //   style={{ verticalAlign: "middle" }}
                    />
                  }
                  title={
                    <p style={{ marginBottom: "0" }}>
                      {item.information.fname + " " + item.information.lname}
                    </p>
                  }
                  description={item.id}
                />
              </List.Item>
            )}
          />
        </Modal>
      </StyleModal>
    );
  };
  return (
    <Style className="d-flex flex-row util utilities">
      {ModalAddFriend()},{ModalUser(userProfile)}
      <div className="input-group search">
        <input
          className="form-control bi bi-search"
          type="text"
          placeholder=" Search"
        />
      </div>
      <button className="find-user-btn" onClick={showModalSearch}>
        <i className="bi bi-person-fill-add"></i>
      </button>
      <button className="find-gr-btn">
        <i className="bi bi-people-fill"></i>
      </button>
    </Style>
  );
};
export default Utilities;
