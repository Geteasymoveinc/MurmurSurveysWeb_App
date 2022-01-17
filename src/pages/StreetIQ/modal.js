import React from "react";

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import ArrowDown from "../../assets/css/CreateAd/arrow-down.svg";
import classes from "../../assets/css/StreetIQ/index.module.css";

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <Dropdown
        className={classes.stc_drop_dropdown}
        isOpen={this.state.modal}
        toggle={this.toggle}
      >
        {/*<div className={classes.stc_drop_select}>*/}
        <DropdownToggle
          tag="button"
          type="button"
          className={classes.stc_drop_btn}
        >
          {this.props.statistic}
          <img src={ArrowDown} alt="" />
        </DropdownToggle>
        {/* <span className="stc_slcted">#more than 5</span> */}
        {/*</div>*/}
        <DropdownMenu left='true'>
          {this.props.labels.map((label,index) => <DropdownItem key={index}
            tag="a"
            id={this.props.filters[index]}
            className={`${classes.slc_drop_label} ${
              this.props.method === this.props.filters[index] && classes.active
            }`}
            onClick={this.props.activeRadio}
          >
            <span  id={this.props.filters[index]} className={classes.slc_tag_span}>{label}</span>
          </DropdownItem>)}
          {/*<DropdownItem
            tag="a"
            id={this.props.filters[1]}
            className={`${classes.slc_drop_label} ${
                this.props.method === this.props.filters[1] && classes.active
              }`}
            onClick={this.props.activeRadio}
          >
            <span  id={this.props.filters[1]} className={classes.slc_tag_span} name="second">
              {this.props.filters[1]}
            </span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            id="third"
            className={`${classes.slc_drop_label} ${
                this.props.method === "third" && classes.active
              }`}
            onClick={this.props.activeRadio}
          >
            <span id="third" className={classes.slc_tag_span}>custom</span>
            </DropdownItem>*/}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default SearchModal;
