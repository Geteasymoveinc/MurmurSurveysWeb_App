import axios from "axios";

const registerUser = (url, data) => {
  return axios
    .post(usrl, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};
