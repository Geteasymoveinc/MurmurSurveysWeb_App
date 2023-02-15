import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import '../../../assets/css/modal/index.scss'
import "bootstrap/dist/css/bootstrap.min.css";

class SpecialOffer extends React.Component {
  render() {
    return (
      <div className="modal">
      <Modal isOpen={this.props.modal}  >
        <ModalHeader  charCode="close">Special Offer</ModalHeader>
        <ModalBody>
          <div className="modal-body">
          <span>Congratulations</span> 
          <span>You are selected for the ‘Arrow’ offer</span>
          <span> As you’ve
          chosen to target more than 150 responders for your survey, the cost of
          the survey can be negotiated with MurmurSurveys team. Please send a
          request to info@murmurcars.com with ‘Special Offer’ subject line and
          our Sales team will contact you as soon as possible</span>
          </div>
        </ModalBody>
        <ModalFooter>
            <Row>
              <Col></Col>
            </Row>
            <button
              type="button"
              className="reason_cancel_btn"
              onClick={() => {
                this.props.closeModal()
              }}
            >
              Close
            </button>
          </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default SpecialOffer;
