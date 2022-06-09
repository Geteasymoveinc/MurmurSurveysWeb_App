import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import "../../../../assets/css/Settings/modal.css";

class DeclineSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      survey_id: this.props.id
    }
  }
  userSurveyCanselReasongChange = (event) => {
    const reason = event.target.value
   this.setState({
      reason
    })
  }


  submitReasonForDelination = (e) => {
    e.preventDefault()
    const {reason, survey_id} = this.state 
    this.props.declineSurvey(survey_id, 'Declined', reason)
  }
  render() {

    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggleModal}
          className="setting_cancel_modal"
        >
          <ModalHeader>
            <span>Why do you want to decline the survey:</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={this.props.toggleModal}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4142 12L17.7072 7.70701C18.0982 7.31601 18.0982 6.68401 17.7072 6.29301C17.3162 5.90201 16.6842 5.90201 16.2933 6.29301L12.0002 10.586L7.70725 6.29301C7.31625 5.90201 6.68425 5.90201 6.29325 6.29301C5.90225 6.68401 5.90225 7.31601 6.29325 7.70701L10.5862 12L6.29325 16.293C5.90225 16.684 5.90225 17.316 6.29325 17.707C6.48825 17.902 6.74425 18 7.00025 18C7.25625 18 7.51225 17.902 7.70725 17.707L12.0002 13.414L16.2933 17.707C16.4882 17.902 16.7443 18 17.0002 18C17.2562 18 17.5122 17.902 17.7072 17.707C18.0982 17.316 18.0982 16.684 17.7072 16.293L13.4142 12Z"
                  fill="#3F2B89"
                />
              </svg>
            </button>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={this.submitReasonForDelination}>
     
              <div className="form_element_modal">
                <label htmlFor="about_reason">Say about your reason:</label>
                <textarea
                  name="about_reason"
                  id="about_reason"
                  cols="30"
                  rows="10"
                  className="form-control"
                  placeholder="Explain more..."
                  onChange={this.userSurveyCanselReasongChange}
                ></textarea>
              </div>
              <div className="form_element_btn text-center">
                <button type="submit" className="reason_cancel_btn">
                  Decline
                </button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        </React.Fragment>
    )
  }
}

export default DeclineSurvey