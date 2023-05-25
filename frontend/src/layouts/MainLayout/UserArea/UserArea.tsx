import React from "react";
import Style, { StyleModalView } from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Account, userProfile, message } from "../../../types/firebase";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Image,
  Input,
  Modal,
  notification,
} from "antd";
import Meta from "antd/es/card/Meta";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
  SettingFilled,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
const BASE_URL = "http://localhost:4000";
const UserArea = (props: any) => {
  console.log(props.user);
  const [profile, setProfile] = useState<userProfile>(props.user);

  const [isModalSendData, setIsModalSendData] = useState(false);

  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  const [name, setName] = useState(
    profile.information.fname + " " + profile.information.lname
  );
  const [readOnlyName, setReadOnlyName] = useState(true);
  const [closeEditName, setCloseEditName] = useState(false);

  const [dob, setDob] = useState(profile.information.dob);
  const [readOnlyDob, setReadOnlyDob] = useState(true);
  const [closeEditDob, setCloseEditDob] = useState(false);

  const [address, setAddress] = useState(profile.information.address);
  const [readOnlyAddress, setReadOnlyAddress] = useState(true);
  const [closeEditAddress, setCloseEditAddress] = useState(false);

  const [introduce, setIntroduce] = useState(profile.information.introduce);
  const [readOnlyIntroduce, setReadOnlyIntroduce] = useState(true);
  const [closeEditIntroduce, setCloseEditIntroduce] = useState(false);

  const [spin, setSpin] = useState(false);
  const showModalUser = () => {
    setIsModalUserOpen(true);
  };
  const handleOkUserModal = () => {
    setIsModalUserOpen(false);
  };

  const handleCancelUserModal = () => {
    setIsModalUserOpen(false);
  };
  // const handleEdit = (key: any, data: any) => {};
  const handleEditName = () => {
    setReadOnlyName(false);
    setCloseEditName(true);
  };
  const handleCancelEditName = () => {
    setReadOnlyName(true);
    setCloseEditName(false);
    setName(profile.information.fname + " " + profile.information.lname);
  };

  const handleEditDob = () => {
    setReadOnlyDob(false);
    setCloseEditDob(true);
  };
  const handleCancelEditDob = () => {
    setReadOnlyDob(true);
    setCloseEditDob(false);
    setDob(profile.information.dob);
  };

  const handleEditAddress = () => {
    setReadOnlyAddress(false);
    setCloseEditAddress(true);
  };
  const handleCancelEditAddress = () => {
    setReadOnlyAddress(true);
    setCloseEditAddress(false);
    setAddress(profile.information.address);
  };

  const handleEditIntroduce = () => {
    setReadOnlyIntroduce(false);
    setCloseEditIntroduce(true);
  };
  const handleCancelEditIntroduce = () => {
    setReadOnlyIntroduce(true);
    setCloseEditIntroduce(false);
    setIntroduce(profile.information.introduce);
  };
  // const onClickOutsiteInput = () => {
  //   setReadOnlyName(true);
  // };
  const ModalUser = () => {
    return (
      <StyleModalView
        open={isModalUserOpen}
        onOk={handleOkUserModal}
        onCancel={handleCancelUserModal}
        footer={null}
        centered
      >
        <Card
          className="card scroll-bar"
          // onClick={onClickOutsiteInput}
          hoverable
          cover={
            <div
              className="d-flex justify-content-center card-cover"
              style={{
                background: `rgba(0,0,0,0.3) url(${profile.information.image}) no-repeat center/cover`,
              }}
            >
              <div className="card-filter-blur-cover" />
              <Image
                className="card-avatar"
                // alt="avatar"
                preview
                src={profile.information.image}
              />
            </div>
          }
        >
          <Meta
            title={
              <span>
                <Input
                  readOnly={readOnlyName}
                  bordered={!readOnlyName}
                  value={name}
                  style={{ width: "auto" }}
                  onChange={(e: any) => {
                    let valueChange = e.target.value;
                    setName(valueChange);
                  }}
                  onPressEnter={handleSubmit}
                />
                {!closeEditName && (
                  <EditOutlined
                    className="float-end"
                    rev=""
                    onClick={handleEditName}
                  />
                )}
                {closeEditName && (
                  <div className="float-end">
                    <CheckCircleFilled
                      rev=""
                      onClick={() => {
                        handleSubmit();
                        handleCancelEditName();
                      }}
                    />
                    <CloseCircleFilled rev="" onClick={handleCancelEditName} />
                  </div>
                )}
              </span>
            }
            description={profile.id}
          />
          <Divider />
          <Descriptions title="About me" layout="vertical" column={3}>
            <Descriptions.Item label="Date of birth" span={6}>
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <Input
                  type="date"
                  value={dob}
                  readOnly={readOnlyDob}
                  bordered={!readOnlyDob}
                  style={{ width: "auto" }}
                  onChange={(e: any) => {
                    let valueChange = e.target.value;
                    setDob(valueChange);
                  }}
                  onPressEnter={handleSubmit}
                />
                {!closeEditDob && (
                  <EditOutlined
                    className="float-end"
                    rev=""
                    onClick={handleEditDob}
                  />
                )}
                {closeEditDob && (
                  <div className="float-end">
                    <CheckCircleFilled
                      rev=""
                      onClick={() => {
                        handleSubmit();
                        handleCancelEditDob();
                      }}
                    />
                    <CloseCircleFilled rev="" onClick={handleCancelEditDob} />
                  </div>
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              // className="d-flex justify-content-between"
              label="Address"
              span={6}
            >
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <Input
                  value={address}
                  readOnly={readOnlyAddress}
                  bordered={!readOnlyAddress}
                  style={{ width: "auto" }}
                  onChange={(e: any) => {
                    let valueChange = e.target.value;
                    setAddress(valueChange);
                  }}
                  onPressEnter={handleSubmit}
                />
                {!closeEditAddress && (
                  <EditOutlined
                    className="float-end"
                    rev=""
                    onClick={handleEditAddress}
                  />
                )}
                {closeEditAddress && (
                  <div className="float-end">
                    <CheckCircleFilled
                      rev=""
                      onClick={() => {
                        handleSubmit();
                        handleCancelEditAddress();
                      }}
                    />
                    <CloseCircleFilled
                      rev=""
                      onClick={handleCancelEditAddress}
                    />
                  </div>
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              // className="d-flex justify-content-between"
              label="Introduce"
              span={6}
            >
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <Input
                  value={introduce}
                  readOnly={readOnlyIntroduce}
                  bordered={!readOnlyIntroduce}
                  style={{ width: "auto" }}
                  onChange={(e: any) => {
                    let valueChange = e.target.value;
                    setIntroduce(valueChange);
                  }}
                  onPressEnter={handleSubmit}
                />
                {!closeEditIntroduce && (
                  <EditOutlined
                    className="float-end"
                    rev=""
                    onClick={handleEditIntroduce}
                  />
                )}
                {closeEditIntroduce && (
                  <div className="float-end">
                    <CheckCircleFilled
                      rev=""
                      onClick={() => {
                        handleSubmit();
                        handleCancelEditIntroduce();
                      }}
                    />
                    <CloseCircleFilled
                      rev=""
                      onClick={handleCancelEditIntroduce}
                    />
                  </div>
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
          <Divider />
        </Card>

        <Button
          type="primary"
          onClick={() => {
            notification.success({ message: "log out" });
            setTimeout(() => {
              window.location.href = "/login";
              console.log("Hello");
            }, 3000);
          }}
        >
          Logout
        </Button>
      </StyleModalView>
    );
  };
  const handleSubmit = () => {
    setIsModalSendData(true);
  };
  const handleSendData = () => {
    setName(name);
    setDob(dob);
    setAddress(address);
    setIntroduce(introduce);
    setIsModalSendData(false);
    setReadOnlyName(true);
    setCloseEditName(false);
    setReadOnlyDob(true);
    setCloseEditDob(false);
    setReadOnlyAddress(true);
    setCloseEditAddress(false);
    // setReadOnlyIntroduce(true);
    // setCloseEditIntroduce(false);
    const data = {
      id: profile.id,
      username: profile.username,
      password: profile.password,
      information: {
        image: profile.information.image,
        fname: name.split(" ")[0],
        lname: name.substring(name.split(" ")[0].length + 1, name.length),
        introduce: introduce,
        dob: moment(dob).format("YYYY-MM-DD"),
        address: address,
      },
    };
    console.log("Data:::: ", data);
    axios
      .post(BASE_URL + "/api/user/updateProfile", data)
      .then((response) => {
        if (response.data.message) {
          notification.success({ message: "Updated" });
        } else notification.error({ message: "Error" });
      })
      .catch((err) => console.log(err));
  };

  const handleCancelSendDataModal = () => {
    setIsModalSendData(false);
  };
  const ModalSendData = () => {
    return (
      <Modal
        open={isModalSendData}
        onOk={handleSendData}
        onCancel={handleCancelSendDataModal}
        footer={null}
        centered
      >
        Would you like to update this information?
        <Button type="primary" onClick={handleSendData}>
          Yes
        </Button>
        <Button>No</Button>
      </Modal>
    );
  };
  const layout = (
    <Style className="user-card" bordered={false}>
      {ModalUser()}
      {ModalSendData()}
      <Avatar
        size="large"
        className="avatar-card"
        src={profile.information.image}
      />
      <Card.Meta
        className="body-card flex-grow-1"
        title={profile.information.fname + " " + profile.information.lname}
        description={profile.id}
      />
      {/* <Button type="primary"> */}
      <SettingFilled
        onMouseOver={() => setSpin(true)}
        onMouseOut={() => setSpin(false)}
        className="setting-card"
        rev=""
        spin={spin}
        onClick={showModalUser}
      />
      {/* </Button> */}
    </Style>
  );

  return layout;
};
export default UserArea;
