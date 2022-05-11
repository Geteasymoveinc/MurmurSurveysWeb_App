// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  FETCHCAMPAIGNS,
  POSTUPDATECAMPAIGNSTATUSTOBACKEND,
} from "./actionTypes";

import { fetchCampaignsSuccess } from "./actions";

import {
  fetch_campaigns,
  post_updated_campaign_status,
  post_updated_campaigns_status,
} from "../../helpers/fakebackend_helper";

function* Campaigns({ payload: { url } }) {
  try {
    const response = yield call(fetch_campaigns, url);

    const { campaigns, campaign_adds, requests, request_adds } = response.data;
    yield put(
      fetchCampaignsSuccess(campaigns, campaign_adds, requests, request_adds)
    );
  } catch (err) {}
}

function* UpdateCampaignStatus({ payload: { id, ad_status } }) {
  try {
    yield call(
      post_updated_campaign_status,
      `https://backendapp.murmurcars.com/api/v1/admin/update-ad-status/${id}`,
      ad_status
    );
  } catch (err) {}
}

function* UpdateCampaignsStatus({ payload: { ids, ad_status } }) {
  try {
    yield call(
      post_updated_campaigns_status,
      `https://backendapp.murmurcars.com/api/v1/admin/update-multiple-ad-status/${ids}`,
      ad_status
    );
  } catch (err) {}
}

export function* watchCampaigns() {
  yield takeEvery(FETCHCAMPAIGNS, Campaigns);
}

export function* watchUpdateCampaignStatus() {
  yield takeEvery(POSTUPDATECAMPAIGNSTATUSTOBACKEND, UpdateCampaignStatus);
}

export function* watchUpdateCampaignsStatus() {
  yield takeEvery(POSTUPDATECAMPAIGNSTATUSTOBACKEND, UpdateCampaignsStatus);
}

function* CampaignsSaga() {
  yield all([
    fork(watchCampaigns),
    fork(watchUpdateCampaignStatus),
    fork(watchUpdateCampaignsStatus),
  ]);
}

export default CampaignsSaga;
