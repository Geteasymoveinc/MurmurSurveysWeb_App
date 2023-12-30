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
  return axios
    .post(url, data)
    .then((response) => {

      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      
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
const subscribeBackend = (url, data) => {
  
  return axios
    .post(url, data)

    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
    
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
      if (response.data.status !== 204 && response.status === 200) {
        return response.data;
      }

      throw response.data;
    })
    .catch((err) => {
      throw err;
    });
};

const queryForEmail = (url, data) => {
  
  return axios
    .post(url, data)
    .then((response) => {
      
      return response.data;
    })
    .catch((err) => {
      throw { message: "COuld not find your email please rigister" };
    });
};

// postForgetPwd
const postForgetPwd = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 200 && response.data.status !== 204) {
        return response.data;
      } else {
        throw response.data;
      }
    })
    .catch((err) => {
      throw err;
    });
};

const post_surveys = (url, data, method) => {

  return axios({
    url,
    data,
    method,
  })
    .then((response) => {
      return response;
    })
    .catch((err) =>  err);
};

const get_survey = (url) => {
  return axios
    .get(url)
    .then((resp) => {
      const { survey } = resp.data;
      const {
        survey_questions,
        survey_audience_number,
        survey_earnings,
        survey_budget,
        survey_title,
        survey_caption,
        target_audience,
        survey_active,
        survey_specific,
        participants,
        survey_image,
        response,
        payment,
        researchConductedVia,
        targetUsersFrom,
        researcherContacts,
        research,
        paid,
        hasAwsReports,
        _id
      } = survey;


   
      return {
        survey_questions,
        survey_audience_number,
        survey_earnings,
        survey_budget,
        survey_title,
        survey_caption,
        target_audience,
        survey_image,
        survey_active,
        survey_specific,
        response,
        payment,
        participants,
        researchConductedVia,
        targetUsersFrom,
        research,
        paid,
        researcherContacts,
        hasAwsReports,
        _id
      };
  
    })
    .catch((err) => {
      throw new Error("something went wrong");
    });
};
export {
  getLoggedInUser,
  isUserAuthenticated,
  postRegister,
  postLogin,
  postForgetPwd,
  subscribeBackend,
  queryForEmail,
  //surveys
  post_surveys,
  get_survey,
};
