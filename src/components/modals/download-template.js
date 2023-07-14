import React from "react";

import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

import classes from "../../assets/css/modals/modal.module.scss";
import DownloadTemplate from "../../assets/images/template-download.png";
import Template from '../../assets/files/user.csv'
import "../../assets/css/modals/modal.scss";

class DownloadTemplateComponent extends React.Component {
  constructor() {
    super();
    this.asset = {};
  }

  uploadCSV = (event) => {
    const file = Array.from(event.target.files).at(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      this.asset = { csvFile: file, name: file.name };
    };
  };
  render() {
    const { modalStatus, closeModal, layoutTheme } = this.props;

    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={`${classes.modal} ${classes[layoutTheme]} ${layoutTheme}`}
      >
        <ModalHeader>
          <div className={classes.modal_header}>
            <button onClick={() => closeModal()}>
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
          <Row>
            <Col className="d-flex flex-column align-items-center pl-4 pr-4">
              <div className={`${classes.uploader}`}>
                <img src={DownloadTemplate} alt="" className="mb-4" />
              </div>

              <h5>If you already have a list or participianta</h5>
              <p>
                Import them via CSV. You’ll be able to sort, filter, tag,
                organize and invite them to research
              </p>
              <a className={classes["download-template"]} download={true} href={Template}>
                Download CSV file example{" "}
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
              </a>
              <div className={classes.btns}>
                <button
                  className={classes.btns__100}
                  type="button"
                  onClick={() => {
                    closeModal();
                    //this.props.uploadCSV(this.asset)
                  }}
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

export default DownloadTemplateComponent;
