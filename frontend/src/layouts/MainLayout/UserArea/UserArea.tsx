import React from "react";
import Style from "./style";
import "bootstrap-icons/font/bootstrap-icons.css";
import User from "../../../database/User";
import { userProfile } from "../../../types/firebase";
import { useState, useEffect } from "react";
const user = new User();
const UserArea = () => {
  const [profile, setProfile] = useState<userProfile>(user.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function updateProfile() {
      const profile = await user.getProfile();
      setProfile(profile);
      setIsLoading(false);
    }
    updateProfile();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Style>
      <div className="box-chat-item d-flex">
        <img className="img" src={profile?.informations.image} alt="" />
        <div>
          <h3 className="name">
            {profile?.informations.fname + profile?.informations.lname}
          </h3>
          {/* <p className="body">#{id}</p> */}
        </div>
        <button className="setting-btn">
          <i className="bi bi-gear-fill float-end"></i>
        </button>
      </div>
    </Style>
  );
};
export default UserArea;
