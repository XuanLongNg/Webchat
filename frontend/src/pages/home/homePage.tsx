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
    if (localStorage.id) setIsLoggedIn(true);
    else setIsLoading(false);
    setIsLoading(false);
  };

  useEffect(checkLogin, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // return <MainLayout />;
  return <div>{!isLoggedIn ? <Navigate to="/login" /> : <MainLayout />}</div>;
};

export default Homepage;
