import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Message = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const { message } = useParams<{ message: string }>();
  const checkLogin = () => {
    setIsLoading(true);
    axios
      .get("api/user")
      .then((response) => {
        if (response.data.message === "logged") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(checkLogin, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{!isLoggedIn ? <Navigate to="/login" /> : <MainLayout />}</div>;
};

export default Message;
