



import React from "react";
import { Component, Fragment } from "react";

import Logo from "../../assets/images/surveys/logoBlue.svg";
import Eye from "../../assets/images/surveys/eye.svg";
import classes from "../../assets/css/surveys/index.module.scss";

import SurveyQuestion from "./questions";
import SurveySettings from "./settings";
import SurveyAnalytics from "./analytics";
import SurveyAnswers from "./answers";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import { changeSideBar } from "../../store/actions";
import { connect } from "react-redux";
import {Link, withRouter} from 'react-router-dom'


class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        menu_item: "questions",
        preview:false,
        
      },
    };
  }
  togleMenuItem = (menu) => {
      this.setState({
        ...this.state, menu: {
          menu_item: menu
        }
      })

  } 

 
  componentWillUnmount() {

    //document.body.classList.remove("grey-background");

  }
  componentDidMount() {
    console.log(this.props.history)
    //document.body.classList.add("grey-background");
    this.props.changeSideBar(false);
  }

  render() {
    const { menu } = this.state;
    const { menu_item } = menu;
    return (
      <Fragment>
          
      </Fragment>
    );
  }
}

export default connect(null, {changeSideBar})(withRouter(Surveys));
