import React from "react";

import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

import classes from "../../assets/css/modals/modal.module.scss";
import Upgrade from "../../assets/images/upgrade.png";
import "../../assets/css/modals/modal.scss";

class UpgradeSubscription extends React.Component {
  
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
            <button onClick={() => closeModal(false)}>
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
                <img src={Upgrade} alt="" className="mb-4" />
              </div>

              <h5>Upgrading your subscription</h5>
  
              <p
                className={classes["download-template"]}
    
              >
                Hipster ipsum tattooed brunch I'm baby. Post-ironic lyft
                pitchfork blue put. Quinoa celiac trade synth williamsburg
                taiyaki tattooed. Pok dollar 3-moon direct letterpress.
              </p>
              <div className={classes.btns}>
                <button
                  type="button"
                  onClick={() => {
                    closeModal(false);
                    //this.props.uploadCSV(this.asset)
                  }}
                >
                  Cansel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeModal(true);
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

export default UpgradeSubscription;
