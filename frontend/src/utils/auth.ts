import axios from "axios";

export const isLogin = (): boolean => {
  axios
    .get("api/user")
    .then((response) => {
      console.log(response.data.message, response.data.message === "logged");
      if (response.data.message === "logged") {
        return true;
      } else return false;
    })
    .catch((error) => {
      console.error(error);
    });
  return false;
};
