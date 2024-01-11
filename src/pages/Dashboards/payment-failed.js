

import React from "react";

import Logo from "../../assets/images/LogoWhiteTheme.png";
import classes from "../../assets/css/surveys/index.module.scss";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import PaymentFailedIcon from "../../components/payment-result/payment-failed";

import {withRouter} from 'react-router-dom'


class PaymentFailed extends React.Component {
    

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
                      <Profile scope="global" />
                      </div>
                    </div>
                  </header>
      
                  <div className={classes.surveys_container}>
                    <div className={classes.create_ads}>
                      <div className={classes.ads_section}>
                       <PaymentFailedIcon/>
                       
                      </div>
                    </div>
                  </div>
                </div>
      
          );
        }
}


export default withRouter(PaymentFailed)




