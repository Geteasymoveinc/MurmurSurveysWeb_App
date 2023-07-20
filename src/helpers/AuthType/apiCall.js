import axios from "axios";

// Login Method
const handleLogin = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      return response.data;
    })
    .catch((err) => {
  
      throw err[1];
    });
};

export { handleLogin };
