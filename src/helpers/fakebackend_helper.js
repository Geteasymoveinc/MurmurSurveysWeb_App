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

export {
  postLogin,
  fetch_user_analytics,
  fetch_campaigns,
  post_updated_campaign_status,
  post_updated_campaigns_status,
  fetch_surveys,
  fetch_customers
};
