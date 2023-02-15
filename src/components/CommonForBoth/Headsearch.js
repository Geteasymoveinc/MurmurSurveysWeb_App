
import React from "react"

import classes from '../../assets/css/common/css/head-search.module.css'
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";







class HeadSearch extends React.Component{


    toggleFullscreen() {

        if (
          !document.fullscreenElement &&
          /* alternative standard method */ !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      }

    render(){
        return(
            <div className={classes.head_search}>
            <h1 className={classes.dash_h1}>{this.props.page}</h1>
            <form onSubmit={this.submitLocationToZoomIn} >
              <div
                className={`${classes.dash_relative} ${classes.search_box}`}
              >
                <input type="text" placeholder="Search" />
                <div className={classes.search_box_flex}>
    
                  <button type="button" className={classes.search_maximize}>
                    <img
                      src={SearchMaximize}
                      alt=""
                      className={classes.maximize_img}
                      onClick={this.toggleFullscreen}
                    />
                  </button>

                  <ProfileMenu scope={"global"} />
                </div>
              </div>
            </form>
          </div>
        )
    }
}


export default HeadSearch