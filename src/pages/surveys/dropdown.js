import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../../assets/css/surveys/dropdown.css'

import Chevron_Down from "../../assets/images/surveys/chevron-down.svg";

 class SurveyType extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selected_item: "Multipe choice "
    };
  }

  toggle(event) {
    console.log(event.target)

    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <div className='dropdown-custom'>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <span>Multipe choice </span> <img src={Chevron_Down} alt='dropdown icon'/>
        </DropdownToggle>
        <DropdownMenu left>
          <DropdownItem >Multiple</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >Checkboxes</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >Dropdown</DropdownItem>
          <DropdownItem divider />
          <DropdownItem >Short answer</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
    );
  }
}


export default  SurveyType