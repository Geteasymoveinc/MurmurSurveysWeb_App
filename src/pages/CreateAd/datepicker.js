import React from 'react'
import DatePicker from "react-datepicker";


class DatePicking extends React.Component{
    constructor(props){
      super(props)
      this.state = this.getInitialState();
    }

    
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }
    componentDidMount() {
      //this.props.apiError("");

    }
    render(){
      const { from, to } = this.state;
      const modifiers = { start: from, end: to };
    return (
      <DatePicker
      className="Selectable"
      numberOfMonths={this.props.numberOfMonths}
      selectedDays={[from, { from, to }]}
      modifiers={modifiers}
      onDayClick={this.handleDayClick}
    />
    );
  };
}


export default DatePicking