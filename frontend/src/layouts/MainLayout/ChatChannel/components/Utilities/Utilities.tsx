import Style, { StyleModalSearch, StyleModalView } from "./style";
import React, { useState, useRef } from "react";
import { notification } from "antd";
import axios from "axios";
import { Account, userProfile } from "../../../../../types/firebase";
import Meta from "antd/es/card/Meta";
import { Divider } from "antd";
import ModalUser from "./components/ModalUser";
import ModalAddFriend from "./components/ModalAddFriend";
import Button from "../../../../../utils/button";

const BASE_URL = "http://localhost:4000";
const Utilities = ({ updateFilter }: { updateFilter: Function }) => {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  const [idUser, setIdUser] = useState(localStorage.id);
  const value: any = useRef("");
  const [ArrayUser, SetArrayUser] = useState<userProfile[]>([]);
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

  return (
    <Style className="d-flex flex-row util utilities">
      <ModalAddFriend
        ArrayUser={ArrayUser}
        isModalSearchOpen={isModalSearchOpen}
        value={value}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleAddFriend={handleAddFriend}
        handleSearchFriend={handleSrearchFriend}
        setUserProfile={setUserProfile}
        showModalUser={showModalUser}
      />
      <ModalUser
        user={userProfile}
        isModalUserOpen={isModalUserOpen}
        handleOkUserModal={handleOkUserModal}
        handleCancelUserModal={handleCancelUserModal}
      />
      <div className="input-group search">
        <input
          className="form-control bi bi-search"
          type="text"
          placeholder=" Search"
          onChange={(e) => {
            updateFilter(e.target.value);
          }}
        />
      </div>
      <Button
        type="default"
        className="find-user-btn"
        onClick={showModalSearch}
        content={<i className="bi bi-person-fill-add"></i>}
      />
      <Button
        type="default"
        className="find-gr-btn"
        onClick={showModalSearch}
        content={<i className="bi bi-people-fill"></i>}
      />
    </Style>
  );
};
export default Utilities;
