import React from "react";
import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import User from "../../../database/User";
import { userProfile } from "../../../types/firebase";
import { useState, useEffect } from "react";
const UserArea = (props: any) => {
  const [profile, setProfile] = useState<userProfile>(props.user);
  // console.log(props.user);

  return (
    <Style>
      <div className="box-chat-item d-flex">
        <img className="img" src={profile.information.image} alt="" />
        <div>
          <h3 className="name">
            {profile.information.fname + " " + profile.information.lname}
          </h3>
          <p className="body">{profile.id}</p>
        </div>
        <button className="setting-btn">
          <i className="bi bi-gear-fill float-end"></i>
        </button>
      </div>
    </Style>
  );
};
export default UserArea;
