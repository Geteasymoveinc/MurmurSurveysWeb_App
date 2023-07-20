import React from "react";

import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

import classes from "../../assets/css/modals/modal.module.scss";
import UploadCSV from "../../assets/images/openCSV.png";
import "../../assets/css/modals/modal.scss";

import { WarningFeedback, SuccessFeedback } from "../feedbacks";

class UploadParticipants extends React.Component {
  constructor() {
    super();
    this.state = { asset: {}, warning: false, successFeedback: false };
  }

  uploadCSV = (event) => {
    const file = Array.from(event.target.files).at(0);

    if (!file.name.includes("csv")) {
      this.setState(() => ({ warning: true }));

      setTimeout(() => this.setState(() => ({ warning: false })), 3000);

      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      this.setState(() => ({ successFeedback: true }));

      setTimeout(() => this.setState(() => ({ successFeedback: false })), 3000);
      this.setState(() => ({ asset: { csvFile: file, name: file.name } }));
    };
  };
  render() {
    const { modalStatus, closeModal, layoutTheme, loading } = this.props;

    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={`${classes.modal} ${classes[layoutTheme]} ${layoutTheme}`}
      >
        <ModalHeader>
          <div className={classes.modal_header}>
            <button onClick={() => closeModal(false, null)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <WarningFeedback
            showFeedback={this.state.warning}
            feedback="Please upload CSV file"
          />

          <SuccessFeedback
            showFeedback={this.state.successFeedback}
            feedback={"Success. File is ready for upload"}
          />
          <Row>
            <Col className="d-flex flex-column align-items-center pl-4 pr-4">
              {loading ? (
                <div id="status">
                  <div className="spinner-chase">
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                    <div className="chase-dot"></div>
                  </div>
                </div>
              ) : null}
              <div className={`${classes.uploader}`}>
                <input
                  type="file"
                  onChange={this.uploadCSV}
                  disabled={loading}
                />

                <img src={UploadCSV} alt="" className="mb-4" />

                <span>Click here</span>
              </div>

              <h5>If you already have a list or participianta</h5>
              <p>
                Import them via CSV. You’ll be able to sort, filter, tag,
                organize and invite them to research
              </p>
              <button
                className={classes["download-template"]}
                onClick={() => {
                  closeModal("download", null);
                  //this.props.uploadCSV(this.asset)
                }}
                disabled={loading}
              >
                Check CSV file example{" "}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334"
                    stroke="#344054"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={classes.btns}>
                <button
                  type="button"
                  onClick={() => {
                    closeModal(false, null);
                    //this.props.uploadCSV(this.asset)
                  }}
                  disabled={loading}
                >
                  Cansel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeModal(true, this.state.asset);
                  }}
                  disabled={!this.state.asset.name || loading}
                >
                  Continue
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}

export default UploadParticipants;
