import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Message = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // console.log("Local: ", localStorage);

    if (localStorage.id) setIsLoggedIn(true);
    else setIsLoading(false);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{!isLoggedIn ? <Navigate to="/login" /> : <MainLayout />}</div>;
};

export default Message;
