import axios from "axios";

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

const fetch_user_analytics = (url) => {
  return axios
    .get(url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};

const fetch_campaigns = (url) => {
  return axios
    .get(url)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};

const post_updated_campaign_status = (url, data) => {
  console.log(url, data);
  return axios
    .put(url, { ad_status: data })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};

const post_updated_campaigns_status = (url, data) => {
  console.log(url, data);
  return axios
    .put(url, { ad_status: data })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};


const fetch_surveys = (url) => {
  return axios
    .get(url)
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};


const fetch_customers = (url) => {
  return axios.get(url)
  .then((data) => {
    return data;
  })
  .catch((err) => {
    throw new Error("Something went wrong");
  });
}

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

const  post_surveys = (url, data, method) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: data,
  };
  return axios({
    url,
    data,
    method,
  })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};


const get_survey = (url) => {
  return axios
    .get(url)
    .then((response) => {
      const { survey } = response.data;
  
      const {
        survey_questions,
        survey_audience_number,
        survey_earnings,
        survey_title,
        survey_caption,
        target_audience,
        survey_active,
        survey_image,
        analytics,
      } = survey;
      return {
        survey_questions,
        survey_audience_number,
        survey_earnings,
        survey_title,
        survey_caption,
        target_audience,
        survey_image,
        survey_active,
        analytics,
      };
    })
    .catch((err) => {
      throw new Error("something went wrong");
    });
};

export {
  postLogin,
  fetch_user_analytics,
  fetch_campaigns,
  post_updated_campaign_status,
  post_updated_campaigns_status,
  fetch_surveys,
  fetch_customers,
  queryForEmail,
  post_surveys,
  get_survey
};
