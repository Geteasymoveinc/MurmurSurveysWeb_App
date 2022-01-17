import axios from "axios";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postRegister = (url, data) => {
  console.log("This is url", url, data);
  return axios
    .post(url, data)
    .then((response) => {
      console.log(response)
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      console.log(err)
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};
const subscribe = (url, data) => {
  console.log(url);
  return axios
    .post(url, data)

    .then((response) => {


 

      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
      console.log(err);
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 400:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};
// Login Method
const postLogin = (url, data) => {

  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500){
       
        throw response.data;
      }
  
      return response.data;
    })
    .catch((err) => {
      console.log(err.message)
      throw err.message;
    });
};

const queryForEmail = (url, data) => {
  console.log(url,data)
  return axios
    .post(url, data)
    .then((response) => {

      console.log(response)
      return response.data;
    })
    .catch((err) => {

      throw {message: "COuld not find your email please rigister"}
    });
};




// postForgetPwd
const postForgetPwd = (url, data) => {
  console.log(data)
  return axios
    .post(url, data)
    .then((response) => {
      console.log(response)
      if (response.status === 400 || response.status === 500)
        throw response.data;
      return response.data;
    })
    .catch((err) => {
      console.log(err)
      throw err[1];
    });
};

export {
  getLoggedInUser,
  isUserAuthenticated,
  postRegister,
  postLogin,
  postForgetPwd,
  subscribe,
  queryForEmail

};
