import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import classes from '../../assets/css/modals/modal.module.scss';
//import "../../assets/css/modals/webcam-modal.scss";

import Webcam from '../webcam';

class WebcamModal extends React.Component {
  render() {
    const { modalStatus, closeModal, layoutTheme } = this.props;
    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={`${classes.modal} ${layoutTheme}`}
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
        <ModalBody className="modal-body">
          <Webcam
            uploadVideo={this.props.uploadVideo}
            exitWebcam={this.props.exitWebcam}
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default WebcamModal;
