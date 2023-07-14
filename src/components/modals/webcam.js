import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

//import "../../assets/css/modals/webcam-modal.scss";

import Webcam from "../webcam";

class WebcamModal extends React.Component {
  render() {
    const { modalStatus, closeModal, layoutTheme } = this.props;
    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={`${layoutTheme}`}
      >
    
        <ModalBody className='modal-body'>
          <Webcam  uploadVideo={this.props.uploadVideo}/>
        </ModalBody>
      </Modal>
    );
  }
}

export default WebcamModal;
