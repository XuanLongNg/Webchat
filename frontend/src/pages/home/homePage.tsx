import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { URL_SERVER } from "../../constant";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useParams<{ url: string }>();
  const checkLogin = () => {
    setIsLoading(true);
    console.log(document.cookie);
    const url_api = URL_SERVER + "/api/user";
    axios
      .post(url_api, { id: document.cookie })
      .then((response) => {
        console.log(response.data.message);
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
  return (
    <div>
      {!isLoggedIn ? <Navigate to="/login" /> : <MainLayout />}
      {/* <MainLayout /> */}
    </div>
  );
};

export default Homepage;
