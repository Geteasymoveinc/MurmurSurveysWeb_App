import React from "react";

import classes from "../../assets/css/Destination/index.module.css";
import classes2 from "../../assets/css/Tracking/index.module.css";
import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import Clipboard from "../../assets/css/Tracking/clipboard.svg";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

class Tracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  copyTextToClipboard = () => {
    const r = this.textarea;
    navigator.clipboard.writeText(r.value);
    this.setState({ copied: true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { copied } = this.state;
    if (prevState.copied !== copied) {
      if (copied === true) {
        setTimeout(
          () =>
            this.setState({
              copied: false,
            }),
          1000
        );
      }
    }
  }
  render() {
    const copyText = `function normalizeColor(hexCode) {
      return [
        ((hexCode >> 16) & 255) / 255,
        ((hexCode >> 8) & 255) / 255,
        (255 & hexCode) / 255,
      ];
    };`;
    const { copied } = this.state;

    let icon = <img src={Clipboard} />;
    if (copied) {
      icon = "Copied";
    }
    return (
      <React.Fragment>
        <div className={`${classes.dash_right} ${classes2.dash_right_tracking}`}>
          <div className={classes.head_search}>
            <h1 className={classes.dash_h1}>Main Page</h1>

            <form>
              <div className={`${classes.dash_relative} ${classes.search_box}`}>
                <input type="text" placeholder="Search" />
                <div className={classes.search_box_flex}>
                  <button type="submit" className={classes.search_icon}>
                    <img
                      src={SearchNormal}
                      alt=""
                      className={classes.search_img}
                    />
                  </button>
                  <button type="button" className={classes.search_maximize}>
                    <img
                      src={SearchMaximize}
                      alt=""
                      className={classes.maximize_img}
                    />
                  </button>

                  <ProfileMenu scope={"global"} />
                </div>
              </div>
            </form>
          </div>
          <div className={classes.destionation_page}>
            <div className={classes.destin_head}>
              <div className={classes.destin_head_left}>
                <h4 className={classes.destin_h4}>Tracking Pixel</h4>
                <p className={classes.destin_p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor lacinia vel pulvinar pellentesque. Dolor.
                </p>
              </div>
            </div>
            <div>
              <div className={classes2.tracking_page}>
                <div>
                  <h1>On your site:</h1>
                  <p>
                    Paste this HTML just before the end of your{" "}
                    <code style={{ fontSize: "17px" }}>&lt;body&gt;</code> tag
                  </p>
                </div>
              </div>
              <div
                className={classes2.code_snippet_row}
                onClick={() => this.copyTextToClipboard("copy")}
              >
                <div className={classes2.code_snippet_col}>
                  <p>
                    {" "}
                    <code>function</code>{" "}
                    <code className={classes2.parameter}>
                      normalizeColor(hexCode) <code className={`${classes2.parameter} ${classes2.curly_bracket}`} >&#123;{" "}</code>
                    </code>
                  </p>
                  <code>
                    {" "}
                    return [(<code className={classes2.parameter}>
                      hexCode
                    </code>{" "}
                    &gt;&gt; 16 & 255) / 255, (
                    <code className={classes2.parameter}>hexCode</code> &gt;&gt;
                    8 & 255) / 255, (255 &{" "}
                    <code className={classes2.parameter}>hexCode</code>) / 255]
                 
                  </code>{" "}
                   <div>
                   <code className={`${classes2.parameter} ${classes2.curly_bracket}`}>&#125;</code>
                   </div>
                </div>
                <textarea
                  style={{ display: "none" }}
                  ref={(textarea) => (this.textarea = textarea)}
                  value={copyText}
                />
                <span className={classes2.clipboard_icon}>{icon}</span>
              </div>
              <div className={classes2.about_snippet_code}>
                <div>
                  <h1>About this code</h1>
                </div>
                <div className={classes2.top_border}>
                  <span className={classes2.mailshake}>mailshake.js</span>
                  <span>goes on your site and turns out:</span>
                </div>
                <div className={classes2.list_of_qualities}>
                  <ol>
                    <li>Lorem ipsum dolo</li>
                    <li> consectetur adipiscing elit.</li>
                    <li>Volutpat id rhoncus adipiscing amet ac ut.</li>
                    <li>consectetur adipiscing elit. Volutpat id rhoncus</li>
                    <li> ipsum dolor sit amet, consectetur adipiscing elit</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tracking;
