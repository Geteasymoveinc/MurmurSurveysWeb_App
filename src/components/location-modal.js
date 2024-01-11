import React from "react";

import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";

import classes from "../assets/css/modals/locations.module.scss";
import ArrowDown from "../assets/images/arrow-down.svg";
import AIQMap from "../assets/images/aiq-map.png";
import CloseBtn from "../assets/images/close.svg";

class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
      country: this.props.country,
      dummies: {
        Azerbaijan: ["Baku"],
        USA: ["Chicago", "SF"],
        Georgia: ["Tbilisi"],
        Kazakhstan:['Almata']
      },
    };
  }

  locationOnMapChange = (e, type) => {
    const val = e.target.value;

    if (val === null) {
      return;
    }
    if(type==='country'){
        const city_slct = document.getElementById('city_locate')
        city_slct.value = 'null'
    }
    this.setState({
      ...this.state,
      [type]: val,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.city !== this.props.city
    ) {
      this.setState({
        ...this.state,
        city: this.props.city,
        country: this.props.country,
      });
    }
  }
  render() {
    const { modalStatus, closeModal } = this.props;
    const { dummies, country, city } = this.state;

    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={classes.modal}
      >
        <ModalHeader className="border border-white">
          <div className={classes.modal_header}>
            <span>Change Location</span>{" "}
            <button onClick={() => closeModal(false)}>
              <img src={CloseBtn} alt="" />
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="d-flex flex-column align-items-center pl-4 pr-4">
              <img src={AIQMap} alt="" className="mb-4" />
              <div className={classes.locmodal_form_country}>
                <select
                  onChange={(e) => this.locationOnMapChange(e, "country")}
                >
                  <option value={null}>Country</option>
                  {["USA", "Azerbaijan", "Georgia", 'Kazakhstan'].map((el, i) => (
                    <option key={i} value={ el}>
                      {el}
                    </option>
                  ))}
                  <option value='all'>All Countries</option>
                </select>
                <img src={ArrowDown} alt="" />
              </div>
              <div className={classes.locmodal_form_country}>
                <select onChange={(e) => this.locationOnMapChange(e, "city")} id='city_locate'>
                  <option value={null}>City</option>
                  {dummies[country] &&
                    dummies[country].map((el, i) => {
                      
                        return (
                          <option key={i} value={el}>
                            {el}
                          </option>
                        );
                      
                    })}
                    <option value='all'>All Cities</option>
                </select>
                <img src={ArrowDown} alt="" />
              </div>
              <div className={classes.btns}>
                <button
                  type="button"
                  onClick={() => {
                    closeModal(false);
                  }}
                  className="mr-4"
                >
                  Cansel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if(country === 'all'){
                      closeModal(true, country, city);
                      return
                    }
                    closeModal(true, country, city);
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

export default LocationModal;
