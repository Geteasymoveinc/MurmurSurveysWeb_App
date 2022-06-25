import {
  FETCHCAMPAIGNS,
  FETCHCAMPAIGNSSUCCESS,
  POSTUPDATECAMPAIGNSTATUSTOBACKEND,
  POSTUPDATECAMPAIGNSSTATUSTOBACKEND,
} from "./actionTypes";

const fetchCampaigns = (url) => {
  return {
    type: FETCHCAMPAIGNS,
    payload: { url },
  };
};

const fetchCampaignsSuccess = (
  campaigns,
  campaign_adds,
  requests,
  request_adds,
  completed_campaigns,
  completed_adds
) => {
  return {
    type: FETCHCAMPAIGNSSUCCESS,
    payload: {
      campaigns,
      campaign_adds,
      requests,
      request_adds,
      completed_campaigns,
      completed_adds,
    },
  };
};

const postUpdateCampaignStatusToBackend = (id, ad_status) => {
  return {
    type: POSTUPDATECAMPAIGNSTATUSTOBACKEND,
    payload: { id, ad_status },
  };
};
const postUpdateCampaignsStatusToBackend = (id, ad_status) => {
  return {
    type: POSTUPDATECAMPAIGNSSTATUSTOBACKEND,
    payload: { id, ad_status },
  };
};

export {
  fetchCampaigns,
  fetchCampaignsSuccess,
  postUpdateCampaignStatusToBackend,
  postUpdateCampaignsStatusToBackend,
};
