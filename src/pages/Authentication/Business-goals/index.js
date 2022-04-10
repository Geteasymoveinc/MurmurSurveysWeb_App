import React from "react";

import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import { Button, Alert } from "reactstrap";

import { addPackage,Cleanup } from "../../../store/actions";

import classes from "../../../assets/css/Authentication/business/index.module.css";

import Logo from "../../../assets/css/common/icons/logoBlue.svg";
import Slash from "../../../assets/css/common/icons/slash.svg";
import Copyright from "../../../assets/css/common/icons/copyrightblack.svg";

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advertise_options: "",
      alert_status: false,
    };

    // handleValidSubmit
    this.submitPackage = this.submitPackage.bind(this);
  }

  onBusinessGoalSelected = (type) => {
    this.setState({
      ...this.state,
      error: false,

      advertise_options: type,
    });
  };

  submitPackage(event) {
    event.preventDefault();
    console.log(this.props);

    if (this.state.advertise_options.length > 0) {
      this.props.addPackage(
        { option: this.state.advertise_options, user: this.props.user },
        this.props.history
      );
    } else {
      this.setState({ ...this.state, alert_status: true });
    }
  }
  componentDidMount() {
    //this.props.apiError("");

    document.body.classList.add("bg-transparent");
  }


 componentWillUnmount(){
    Cleanup()
    document.body.classList.remove("bg-transparent");
 }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.loading && (
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
            </div>
          </div>
        )}
        {!this.props.loading && (
          <React.Fragment>
            {" "}
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo icon" />
                </a>
              </div>
            </header>
            <div className={classes.ads_section}>
              <div className={classes.ads_cover}>
                {this.state.alert_status || this.props.error ? (
                  <Alert
                    color="danger"
                    className="d-flex justify-content-between align-items-center"
                    style={{ padding: "0 1rem" }}
                  >
                    <span>
                      {`${
                        !this.props.error
                          ? "Choose one of available advertising products"
                          : "Wrong credentials"
                      }`}
                    </span>
                    {!this.props.error && (
                      <Button
                        color="link"
                        onClick={() =>
                          this.setState({ ...this.state, alert_status: false })
                        }
                      >
                        Close
                      </Button>
                    )}
                  </Alert>
                ) : null}

                <h1 className={classes.ads_h1}>
                  How are you planning to use Murmur?
                </h1>
                <h4 className={classes.ads_h4}>
                  We help you to target people where they go.
                </h4>
                <div className={classes.ads_form}>
                  <form onSubmit={this.submitPackage}>
                    <div className={classes.ads_row}>
                      <div className={classes.ads_col}>
                        <div className={classes.ads_item}>
                          <input
                            type="radio"
                            name="ads-type"
                            id="ads-type1"
                            onChange={() =>
                              this.onBusinessGoalSelected("outdoor")
                            }
                          />
                          <label htmlFor="ads-type1">
                            <svg
                              className={classes.ads_svg}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.51 2.83H8.49C6 2.83 5.45 4.07 5.13 5.59L4 11H20L18.87 5.59C18.55 4.07 18 2.83 15.51 2.83Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M21.99 19.82C22.1 20.99 21.16 22 19.96 22H18.08C17 22 16.85 21.54 16.66 20.97L16.46 20.37C16.18 19.55 16 19 14.56 19H9.43998C7.99998 19 7.78998 19.62 7.53998 20.37L7.33998 20.97C7.14998 21.54 6.99998 22 5.91998 22H4.03998C2.83998 22 1.89998 20.99 2.00998 19.82L2.56998 13.73C2.70998 12.23 2.99998 11 5.61998 11H18.38C21 11 21.29 12.23 21.43 13.73L21.99 19.82Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M4 8H3"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M21 8H20"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 3V5"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M10.5 5H13.5"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6 15H9"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15 15H18"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <p>Outdoor</p>
                            <span>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Dictum scelerisque.
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={classes.ads_col}>
                        <div className={classes.ads_item}>
                          <input
                            type="radio"
                            name="ads-type"
                            id="ads-type2"
                            onChange={() =>
                              this.onBusinessGoalSelected("backpack")
                            }
                          />
                          <label for="ads-type2">
                            <svg
                              className={classes.ads_svg2}
                              width="14"
                              height="20"
                              viewBox="0 0 14 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.920592 0.114291L0.800587 0.228583V2.40266V4.57674L0.659971 4.84266C0.455965 5.22847 0.239355 5.84766 0.111549 6.41024L0 6.90127V12.9814V19.0616L0.113724 19.2822C0.239929 19.5269 0.493777 19.7711 0.76573 19.9092L0.944282 20H7H13.0557L13.2343 19.9092C13.5062 19.7711 13.7601 19.5269 13.8863 19.2822L14 19.0616V12.9814V6.90127L13.8885 6.41024C13.7606 5.84766 13.544 5.22847 13.34 4.84266L13.1994 4.57674V2.40266V0.228583L13.0794 0.114291L12.9594 0H11.568H10.1766L10.0663 0.109677L9.95601 0.219316V1.05134C9.95601 1.701 9.94476 1.87918 9.90469 1.8644C9.87649 1.85396 9.68221 1.80497 9.47299 1.75554L9.09257 1.66565L9.05106 1.50729C8.87399 0.831867 8.25758 0.23132 7.55967 0.05435C7.28907 -0.0142718 6.71093 -0.0142718 6.44033 0.05435C5.74316 0.231163 5.12585 0.832063 4.94939 1.50573L4.90833 1.66244L4.52746 1.75523C4.31799 1.80626 4.12355 1.85638 4.09531 1.86659C4.05528 1.88109 4.04399 1.70459 4.04399 1.06291V0.240587L3.9377 0.120313L3.8314 0H2.436H1.0406L0.920592 0.114291ZM3.18182 1.52121V2.26041L2.9868 2.36704C2.71001 2.51844 2.26336 2.84235 1.93988 3.1263L1.66276 3.36958V2.07582V0.782014H2.42229H3.18182V1.52121ZM12.3372 2.07582V3.36958L12.0601 3.1263C11.7366 2.84235 11.29 2.51844 11.0132 2.36704L10.8182 2.26041V1.52121V0.782014H11.5777H12.3372V2.07582ZM7.37874 0.862014C7.46282 0.884262 7.61009 0.959453 7.706 1.02909C7.87921 1.15492 8.14956 1.45896 8.14956 1.52798C8.14956 1.54913 7.67442 1.56403 7 1.56403C6.32558 1.56403 5.85044 1.54913 5.85044 1.52798C5.85044 1.46667 6.10946 1.1668 6.26621 1.04665C6.34816 0.983851 6.48672 0.908192 6.57413 0.878514C6.76405 0.814037 7.16624 0.805787 7.37874 0.862014ZM9.01173 2.49345C10.5246 2.84102 11.6571 3.66909 12.4531 5.00966C12.5248 5.13056 12.5836 5.24039 12.5836 5.25376C12.5836 5.26714 12.385 5.08825 12.1422 4.85627C11.3092 4.06014 10.3524 3.56481 9.16314 3.31406C8.76527 3.23019 8.65976 3.22588 7 3.22588C5.34024 3.22588 5.23473 3.23019 4.83686 3.31406C3.64755 3.56481 2.69075 4.06014 1.85777 4.85627C1.61505 5.08825 1.41642 5.26714 1.41642 5.25376C1.41642 5.24039 1.47517 5.13056 1.54694 5.00966C2.35356 3.65118 3.58671 2.76383 5.04985 2.48895C5.56494 2.39222 5.54301 2.39312 7.1437 2.40344C8.51262 2.41228 8.69724 2.42119 9.01173 2.49345ZM9.11437 4.15496C10.1198 4.4052 10.8834 4.828 11.5812 5.52082C12.3248 6.25904 12.7728 7.08426 13.0464 8.21959C13.1323 8.57591 13.1341 8.66022 13.1477 12.7957L13.1615 17.0088H10.9192H8.67696L8.55696 17.1231C8.35311 17.3173 8.40907 17.654 8.6644 17.7694C8.78009 17.8217 9.09544 17.8299 10.9783 17.8299H13.1584L13.1582 18.3284C13.158 18.8767 13.1157 19.0034 12.885 19.1474C12.7774 19.2146 12.4942 19.218 7 19.218C1.50584 19.218 1.22264 19.2146 1.11499 19.1474C0.884258 19.0034 0.841971 18.8767 0.841806 18.3284L0.841642 17.8299H3.02166C4.90456 17.8299 5.21991 17.8217 5.3356 17.7694C5.59093 17.654 5.64689 17.3173 5.44304 17.1231L5.32304 17.0088H3.08078H0.838522L0.852317 12.7957C0.865865 8.66053 0.867754 8.57587 0.953601 8.21967C1.24165 7.02444 1.75641 6.12 2.57399 5.37267C3.36739 4.64743 4.24594 4.24246 5.43988 4.05161C5.49633 4.04258 6.25381 4.03914 7.12317 4.04399C8.68078 4.05263 8.70981 4.05423 9.11437 4.15496ZM6.70945 17.1231C6.50183 17.3208 6.56194 17.6542 6.82683 17.7739C7.19103 17.9385 7.56484 17.5802 7.39163 17.2326C7.26703 16.9825 6.91616 16.9262 6.70945 17.1231Z"
                                fill="#2E3A59"
                              />
                              <rect
                                x="2.87354"
                                y="6.09962"
                                width="8.29325"
                                height="9.65787"
                                rx="0.86217"
                                stroke="#2E3A59"
                                stroke-width="0.985337"
                              />
                            </svg>
                            <p>
                              Backpack
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0001 18.9583C5.05841 18.9583 1.04175 14.9417 1.04175 10C1.04175 5.05833 5.05841 1.04167 10.0001 1.04167C14.9417 1.04167 18.9584 5.05833 18.9584 10C18.9584 14.9417 14.9417 18.9583 10.0001 18.9583ZM10.0001 2.29167C5.75008 2.29167 2.29175 5.75 2.29175 10C2.29175 14.25 5.75008 17.7083 10.0001 17.7083C14.2501 17.7083 17.7084 14.25 17.7084 10C17.7084 5.75 14.2501 2.29167 10.0001 2.29167Z"
                                  fill="#2E3A59"
                                />
                                <path
                                  d="M10 11.4583C9.65833 11.4583 9.375 11.175 9.375 10.8333V6.66667C9.375 6.325 9.65833 6.04167 10 6.04167C10.3417 6.04167 10.625 6.325 10.625 6.66667V10.8333C10.625 11.175 10.3417 11.4583 10 11.4583Z"
                                  fill="#2E3A59"
                                />
                                <path
                                  d="M10.0001 14.1667C9.89175 14.1667 9.78341 14.1417 9.68341 14.1C9.58341 14.0583 9.49175 14 9.40841 13.925C9.33341 13.8417 9.27508 13.7583 9.23341 13.65C9.19175 13.55 9.16675 13.4417 9.16675 13.3333C9.16675 13.225 9.19175 13.1167 9.23341 13.0167C9.27508 12.9167 9.33341 12.825 9.40841 12.7417C9.49175 12.6667 9.58341 12.6083 9.68341 12.5667C9.88341 12.4833 10.1167 12.4833 10.3167 12.5667C10.4167 12.6083 10.5084 12.6667 10.5917 12.7417C10.6667 12.825 10.7251 12.9167 10.7667 13.0167C10.8084 13.1167 10.8334 13.225 10.8334 13.3333C10.8334 13.4417 10.8084 13.55 10.7667 13.65C10.7251 13.7583 10.6667 13.8417 10.5917 13.925C10.5084 14 10.4167 14.0583 10.3167 14.1C10.2167 14.1417 10.1084 14.1667 10.0001 14.1667Z"
                                  fill="#2E3A59"
                                />
                              </svg>
                            </p>
                            <span>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Dictum scelerisque.
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={classes.ads_col}>
                        <div className={classes.ads_item}>
                          <input
                            type="radio"
                            name="ads-type"
                            id="ads-type3"
                            onChange={() =>
                              this.onBusinessGoalSelected("indoor")
                            }
                          />
                          <label htmlFor="ads-type3">
                            <svg
                              className={classes.ads_svg}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.23 15.71L21.23 15.711C21.2349 18.1183 20.72 19.718 19.7138 20.7254C18.7074 21.7329 17.1075 22.25 14.7 22.25H9.30001C6.88734 22.25 5.28755 21.7328 4.28126 20.7254C3.27485 19.7179 2.76001 18.1179 2.76001 15.71V11.22C2.76001 11.0861 2.87615 10.97 3.01001 10.97C3.14387 10.97 3.26001 11.0861 3.26001 11.22V15.71C3.26001 17.7899 3.62342 19.348 4.64271 20.3673C5.66199 21.3866 7.22014 21.75 9.30001 21.75H14.69C16.7699 21.75 18.328 21.3866 19.3473 20.3673C20.3666 19.348 20.73 17.7899 20.73 15.71V11.22C20.73 11.0861 20.8462 10.97 20.98 10.97C21.1139 10.97 21.23 11.0861 21.23 11.22L21.23 15.71Z"
                                fill="#292D32"
                                stroke="#2E3A59"
                              />
                              <path
                                d="M10.35 2.25H9.89743L9.85248 2.70033L9.25271 8.70804C9.25267 8.70844 9.25263 8.70883 9.25258 8.70923C9.16922 9.51015 9.40773 10.2837 9.92987 10.8562C10.4663 11.4489 11.2484 11.725 12 11.725C12.7519 11.725 13.5344 11.4486 14.0709 10.8554L14.0728 10.8532C14.5903 10.2741 14.8312 9.50303 14.7474 8.70881L14.1475 2.70033L14.1026 2.25H13.65H10.35ZM12 12.25C11.034 12.25 10.1719 11.8745 9.56188 11.1958C8.94953 10.5144 8.661 9.62532 8.75751 8.6599C8.75751 8.65985 8.75752 8.6598 8.75752 8.65975L9.42725 1.98234C9.42729 1.98204 9.42732 1.98173 9.42735 1.98143C9.44179 1.84869 9.55382 1.75 9.68 1.75H14.35C14.4816 1.75 14.5884 1.84399 14.6026 1.98062C14.6026 1.98075 14.6026 1.98088 14.6026 1.98101L15.2725 8.65975C15.2725 8.6598 15.2725 8.65985 15.2725 8.6599C15.3688 9.62351 15.0816 10.5111 14.4716 11.1919C13.828 11.8769 12.9623 12.25 12 12.25Z"
                                fill="#292D32"
                                stroke="#2E3A59"
                              />
                              <path
                                d="M21.8625 8.33011L21.8626 8.33059C21.9688 9.37471 21.651 10.353 20.9794 11.0943C20.3079 11.8357 19.3643 12.25 18.31 12.25C16.5379 12.25 14.9416 10.8056 14.7574 9.03928C14.7574 9.03895 14.7574 9.03863 14.7573 9.0383L14.0577 2.0326C14.0577 2.03232 14.0577 2.03205 14.0577 2.03177C14.0514 1.96322 14.0742 1.88881 14.1263 1.82925C14.1688 1.78067 14.2303 1.75 14.31 1.75H17.36C18.768 1.75 19.7021 2.04531 20.3343 2.61418C20.9684 3.1848 21.3853 4.10806 21.5834 5.55878L21.8625 8.33011ZM15.14 2.25H14.5874L14.6425 2.79983L15.2625 8.98983L15.2625 8.98983L15.2627 8.99172C15.4188 10.493 16.7905 11.75 18.31 11.75C19.2019 11.75 20.0175 11.4072 20.6071 10.7694L20.6072 10.7694L20.6106 10.7656C21.1932 10.1223 21.4495 9.27012 21.3679 8.38414L21.3679 8.38414L21.3674 8.37935L21.0874 5.62935L21.0865 5.62068L21.0854 5.61205C20.9276 4.46184 20.6498 3.5734 20.0163 2.99753C19.3769 2.41624 18.4833 2.25 17.36 2.25H15.14Z"
                                fill="#292D32"
                                stroke="#2E3A59"
                              />
                              <path
                                d="M2.08746 8.33059L2.08763 8.32886L2.35667 5.58866C2.55984 4.12236 2.97944 3.19154 3.61518 2.61729C4.24847 2.04525 5.18215 1.75 6.59002 1.75H9.64002C9.70333 1.75 9.77381 1.77643 9.83525 1.84197C9.87593 1.88536 9.90011 1.94815 9.89235 2.03173C9.89233 2.03202 9.8923 2.03231 9.89227 2.03259L9.1927 9.0383C9.19267 9.03863 9.19263 9.03897 9.1926 9.03931C9.00842 10.8056 7.41207 12.25 5.64002 12.25C4.58568 12.25 3.64215 11.8357 2.97058 11.0943C2.29902 10.353 1.98127 9.37471 2.08746 8.33059ZM2.85483 5.6308L2.85344 5.64077L2.85245 5.65079L2.5826 8.37929C2.48884 9.27411 2.76029 10.1262 3.33942 10.7656C3.92157 11.4084 4.74018 11.75 5.64002 11.75C7.15597 11.75 8.54234 10.4961 8.68763 8.98884C8.68766 8.98849 8.6877 8.98813 8.68773 8.98778L9.30753 2.79983L9.3626 2.25H8.81002H6.59002C5.46791 2.25 4.57354 2.41331 3.93239 2.99632C3.29779 3.57337 3.01748 4.46686 2.85483 5.6308Z"
                                fill="#292D32"
                                stroke="#2E3A59"
                              />
                              <path
                                d="M9.75 21.25V21.75H10.25H13.75H14.25V21.25V19.5C14.25 18.8241 14.1221 18.22 13.7011 17.7989C13.28 17.3779 12.6759 17.25 12 17.25C11.3241 17.25 10.72 17.3779 10.2989 17.7989C9.87786 18.22 9.75 18.8241 9.75 19.5V21.25ZM14.5 22.25H9.5C9.36614 22.25 9.25 22.1339 9.25 22V19.5C9.25 18.5386 9.51192 17.8702 9.94105 17.4411C10.3702 17.0119 11.0386 16.75 12 16.75C12.9614 16.75 13.6298 17.0119 14.0589 17.4411C14.4881 17.8702 14.75 18.5386 14.75 19.5V22C14.75 22.1339 14.6339 22.25 14.5 22.25Z"
                                fill="#292D32"
                                stroke="#2E3A59"
                              />
                            </svg>
                            <p>
                              Indoor (Beta)
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0001 18.9583C5.05841 18.9583 1.04175 14.9417 1.04175 10C1.04175 5.05833 5.05841 1.04167 10.0001 1.04167C14.9417 1.04167 18.9584 5.05833 18.9584 10C18.9584 14.9417 14.9417 18.9583 10.0001 18.9583ZM10.0001 2.29167C5.75008 2.29167 2.29175 5.75 2.29175 10C2.29175 14.25 5.75008 17.7083 10.0001 17.7083C14.2501 17.7083 17.7084 14.25 17.7084 10C17.7084 5.75 14.2501 2.29167 10.0001 2.29167Z"
                                  fill="#2E3A59"
                                />
                                <path
                                  d="M10 11.4583C9.65833 11.4583 9.375 11.175 9.375 10.8333V6.66667C9.375 6.325 9.65833 6.04167 10 6.04167C10.3417 6.04167 10.625 6.325 10.625 6.66667V10.8333C10.625 11.175 10.3417 11.4583 10 11.4583Z"
                                  fill="#2E3A59"
                                />
                                <path
                                  d="M10.0001 14.1667C9.89175 14.1667 9.78341 14.1417 9.68341 14.1C9.58341 14.0583 9.49175 14 9.40841 13.925C9.33341 13.8417 9.27508 13.7583 9.23341 13.65C9.19175 13.55 9.16675 13.4417 9.16675 13.3333C9.16675 13.225 9.19175 13.1167 9.23341 13.0167C9.27508 12.9167 9.33341 12.825 9.40841 12.7417C9.49175 12.6667 9.58341 12.6083 9.68341 12.5667C9.88341 12.4833 10.1167 12.4833 10.3167 12.5667C10.4167 12.6083 10.5084 12.6667 10.5917 12.7417C10.6667 12.825 10.7251 12.9167 10.7667 13.0167C10.8084 13.1167 10.8334 13.225 10.8334 13.3333C10.8334 13.4417 10.8084 13.55 10.7667 13.65C10.7251 13.7583 10.6667 13.8417 10.5917 13.925C10.5084 14 10.4167 14.0583 10.3167 14.1C10.2167 14.1417 10.1084 14.1667 10.0001 14.1667Z"
                                  fill="#2E3A59"
                                />
                              </svg>
                            </p>
                            <span>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Dictum scelerisque.
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={classes.ads_submit}
                      onClick={this.submitPackage}
                    >
                      Complete Signup
                    </button>
                  </form>
                </div>
              </div>
              <img src={Slash} alt="" className={classes.slash_detail1} />
              <img src={Slash} alt="" className={classes.slash_detail2} />
            </div>
            <footer className={classes.footer}>
              <div className={`${classes.mur_contain} ${classes.mur_flex}`}>
                <p
                  className={`${classes.footer_copyright} ${classes.mur_flex}`}
                >
                  <img src={Copyright} alt="" />
                  <span>{new Date().getFullYear()}, Murmur</span>
                </p>
                <ul className={classes.footer_links}>
                  <li>
                    <a href="#" className={classes.footer_link}>
                      All rights reserved
                    </a>
                  </li>
                  <li>
                    <a href="#" className={classes.footer_link}>
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loading, error } = state.Business;

  const { user } = state.Account;

  return { user, loading, error };
};

export default connect(mapStatetoProps, {
  addPackage,
  Cleanup
})(withRouter(Business));
