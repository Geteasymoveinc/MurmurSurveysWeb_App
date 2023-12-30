
import React from "react";

import Logo from "../../assets/images/LogoWhiteTheme.png";
import classes from "../../assets/css/surveys/index.module.scss";
import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import PaymentSuccessIcon from "../../components/payment-result/payment-ok";

import axios from 'axios'
import {withRouter} from 'react-router-dom'


class PaymentSuccess extends React.Component {
    
    componentDidMount(){
        const url = this.props.location.search; //search property of history props
        const token = new URLSearchParams(url).get('temp_token') //extracting id 
    
        axios.post(`https://stagingapp.murmurcars.com/api/v1/surveys/survey/handle-payment-status?temp_token=${token}`)
        .then((res) => {
     
        })
        .catch((err) => {
     
        })
    }
    render(){
        return (

                <div className={classes.dash_right}>
                  <header className={classes.header}>
                    <div className={classes.mur_contain}>
                      <a href="#" className={classes.logo}>
                        <img src={Logo} alt="logo" />
                      </a>
                    </div>
                    <div className={classes.menu_self_flex}></div>
                    <div className={classes.dash_relative}>
                      <div className={classes.search_box_flex_end}>
                        <Profile scope={"survey"} />
                      </div>
                    </div>
                  </header>
      
                  <div className={classes.surveys_container}>
                    <div className={`${classes.create_ads} ${classes.create_ads_2}`}>
               
                       <PaymentSuccessIcon/>
                       
              
                    </div>
                  </div>
                </div>
      
          );
        }
}


export default withRouter(PaymentSuccess)