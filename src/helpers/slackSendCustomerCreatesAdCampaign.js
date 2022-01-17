//Whe customer creates Ad campaign, details send to slack group directly to Emin`s messages
import axios from "axios";

const slack_url =
  "https://hooks.slack.com/services/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";

function SlackSendCustomerCreatedAdCampaign(data) {
  let slackblocks = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${data.advertisers_email} create new Ad Campaign ${data.campaign_name} with campaign goal  ${data.brandAwareness}, ${data.traffic}, ${data.reach}, Campaign type is ${data.campaign_type}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Ad Schedule is ${data.ad_schedule}, Audience Gender is ${data.audienceGender}, Audience Age is ${data.audienceAge}, Audience Tags are ${data.audienceTags}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Campaign Daily budget ${data.daily_budget}, display quantity is ${data.display_quantity}, Campaign Area ${data.area}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Need Contact the customer and follow up on his need.Review his Ad Campaign",
        },
      },
    ],
  };
  axios
    .post(slack_url, slackblocks)
    .then((response) => console.log("From Slack", response))
    .catch((err) => console.log("from Slack", err));
}

export default SlackSendCustomerCreatedAdCampaign;
