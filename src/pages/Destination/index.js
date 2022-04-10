import React, { Component } from "react";


import "antd/dist/antd.css";




import classes from "../../assets/css/Destination/index.module.css";
import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import ArrowDown from "../../assets/css/Destination/arrow-down.svg";
import AddCircle from "../../assets/css/Destination/add-circle.svg";
import Facebook from "../../assets/css/Destination/facebook.svg";
import FirstLine from "../../assets/css/Destination/first-line.svg";
import Google from "../../assets/css/Destination/google-ads.svg";
import L from "../../assets/css/Destination/l.svg";
import LastLine from "../../assets/css/Destination/last-line.svg";
import Line1 from "../../assets/css/Destination/line1.svg";
import Line2 from "../../assets/css/Destination/line2.svg";
import Micon from "../../assets/css/Destination/m-icon.svg";
import Segment from "../../assets/css/Destination/segment.svg";

import ToggleButtonDopDown from "./toggleButtonDopDown";

class Destination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      modalStatus: false,
      destination: "Outdoor to Online",
      to_indoor: {
        center: "facebook",
        murmur:true,
        items: [
          {
            item_img: Google,
            item_platform: "Google Ads",
            item_name: "google",
            active: true,
          },
          {
            item_img: Facebook,
            item_platform: "Facebook",
            item_name: "facebook",
            active: true,
          },
          {
            item_img: Segment,
            item_platform: "Segment",
            item_name: "segment",
            active: true,
          },
        ],
      },
      to_outdoor: {
        center: "facebook",
        murmur: true,
        items: [
          {
            item_img: Google,
            item_platform: "Google Ads",
            item_name: "google",
            active: true,
          },
          {
            item_img: Facebook,
            item_platform: "Facebook",
            item_name: "facebook",
            active: true,
          },
          {
            item_img: Segment,
            item_platform: "Segment",
            item_name: "segment",
            active: true,
          },
        ],
      },
    };
  }

  callback = (key) => {
    console.log(key);
  };

  addSegment = () => {};

  toggleModal = () => {
    const modalStatus = !this.state.modalStatus;
    this.setState({ ...this.state, modalStatus });
  };

  selectDetinationType = (event) => {
    const value = event.target.value;
    this.setState({ ...this.state, destination: value });
  };

  changeDetinationElementStatus = (type, destination) => {
    let selectedType = this.state[type].items;
    const updatedType = selectedType.map((el) => {
      if (el.item_name === destination) {
        el.active = !el.active;
        return el;
      } else {
        return el;
      }
    });

    this.setState({
      ...this.state,
      [type]: { ...this.state[type], items: updatedType },
    });
  };
  toggleMurmur = (type,destination)=> {
    const selectedType = this.state[type]
    selectedType[destination] = !selectedType[destination]
    this.setState({...this.state, [selectedType]: selectedType})
  }

  deleteOnlineElement = (type, destination) => {
    let selectedType = this.state[type].items;
    const updatedType = selectedType.filter(
      (el) => el.item_name !== destination
    );

    this.setState({
      ...this.state,
      [type]: { ...this.state[type], items: updatedType },
    });
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className={classes.dash_right}>
          <div className={classes.head_search}>
            <h1 className={classes.dash_h1}>Destination</h1>

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
                <h4 className={classes.destin_h4}>Sources and Destinations</h4>
                <p className={classes.destin_p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor lacinia vel pulvinar pellentesque. Dolor.
                </p>
              </div>
              <div className={classes.destin_head_right}>
                <div className={classes.step_form_item}>
                  <label
                    htmlFor="choose_destionation"
                    className={classes.step_label}
                  >
                    Choose Destination type
                  </label>
                  <div className={classes.step_relative}>
                    <select
                      name=""
                      id="choose_destionation"
                      className={classes.step_select_item}
                      onChange={this.selectDetinationType}
                    >
                      <option value="Outdoor to Online">
                        Outdoor to Online
                      </option>
                      <option value="Online to Outdoor">
                        Online to Outdoor
                      </option>
                    </select>
                    <img
                      src={ArrowDown}
                      alt=""
                      className={classes.step_select_icon}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- destionation style 1 -->*/}
            {this.state.destination === "Outdoor to Online" && (
              <div className={classes.destin_trees}>
                <div className={classes.tree_sources}>
                  <div className={classes.trees_head}>
                    <h5 className={classes.trees_h5}>Sources</h5>
                    <button type="button" className={classes.add_sources}>
                      <img src={AddCircle} alt="" />
                      <span>Add source</span>
                    </button>
                  </div>
                  <ul className={classes.sources_ul}>
                    <li className={classes.sources_li}>
                      <div className={classes.sources_item}>
                        <p className={classes.sources_p}>
                          <img src={Micon} alt="" />
                          <span>MurmurCars</span>
                        </p>
                        <div className={classes.source_item_right}>
                          <span className={classes.source_status}>
                            {this.state.to_indoor.murmur
                              ? "Active"
                              : "Deactive"}
                            <small
                              className={`${
                                this.state.to_indoor.murmur
                                  ? classes.active_status_dot
                                  : classes.deactive_status_dot
                              }`}
                            ></small>
                          </span>
                          <div className={classes.dot_dropdown}>
                            <ToggleButtonDopDown
                              switchDestinationStatus={() =>
                                this.toggleMurmur(
                                  "to_indoor",
                                  'murmur'
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={classes.tree_center}>
                  <img src={FirstLine} alt="" className={classes.first_line} />
                  {this.state.to_indoor.items.find(
                    (item) => item.item_name === this.state.to_indoor.center
                  ) && (
                    <img src={LastLine} alt="" className={classes.last_line} />
                  )}
                  <div className={classes.tree_m}>
                    <img src={L} alt="" className={classes.tree_center_m} />
                  </div>
                  {this.state.to_indoor.items.length &&
                    this.state.to_indoor.items[0].item_name === "google" && (
                      <img src={Line1} alt="" className={classes.tree_line1} />
                    )}
                  {this.state.to_indoor.items.length &&
                    this.state.to_indoor.items.at(-1).item_name ===
                      "segment" && (
                      <img src={Line2} alt="" className={classes.tree_line2} />
                    )}
                </div>

                <div className={classes.tree_destionations}>
                  <div className={classes.trees_head}>
                    <h5 className={classes.trees_h5}>Destination</h5>
                    <button type="button" className={classes.add_sources}>
                      <img src={AddCircle} alt="" />
                      <span>Add Destination</span>
                    </button>
                  </div>
                  <ul
                    className={`${classes.sources_ul} ${
                      this.state.to_indoor.items.length &&
                      (this.state.to_indoor.items[0].item_name !== "google" &&
                      this.state.to_indoor.items.length > 1
                        ? classes.first_short
                        : this.state.to_indoor.items.at(-1).item_name !==
                            "segment" && this.state.to_indoor.items.length > 1
                        ? classes.last_short
                        : "")
                    }`}
                  >
                    {this.state.to_indoor.items.map((el, i) => (
                      <li
                        key={i}
                        className={`${classes.sources_li} ${
                          el.item_name === "segment" &&
                          !this.state.to_indoor.items.find(
                            (element) =>
                              element.item_name === this.state.to_indoor.center
                          ) &&
                          this.state.to_indoor.items.length > 1
                            ? classes.short_center
                            : !this.state.to_indoor.items.find(
                                (element) =>
                                  element.item_name ===
                                  this.state.to_indoor.center
                              ) &&
                              !this.state.to_indoor.items.find(
                                (element) => element.item_name === "segment"
                              )
                            ? classes.short_center_last
                            : !this.state.to_indoor.items.find(
                                (element) =>
                                  element.item_name ===
                                  this.state.to_indoor.center
                              ) &&
                              !this.state.to_indoor.items.find(
                                (element) => element.item_name === "google"
                              )
                            ? classes.short_center_first
                            : ""
                        }`}
                      >
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={el.item_img} alt="" />
                            <span>{el.item_platform}</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              {el.active ? "Live" : "Deactive"}
                              <small
                                className={`${
                                  el.active
                                    ? classes.active_status_dot
                                    : classes.deactive_status_dot
                                }`}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown
                                switchDestinationStatus={() =>
                                  this.changeDetinationElementStatus(
                                    "to_indoor",
                                    el.item_name
                                  )
                                }
                                deleteElementFromOnline={() =>
                                  this.deleteOnlineElement(
                                    "to_indoor",
                                    el.item_name
                                  )
                                }
                                type={el.active}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {false && (
                    <ul className={classes.sources_ul}>
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Google} alt="" />
                            <span>Google Ads</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              {this.state.to_indoor.google
                                ? "Live"
                                : "Deactive"}
                              <small
                                className={`${
                                  this.state.to_indoor.google
                                    ? classes.active_status_dot
                                    : classes.deactive_status_dot
                                }`}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown
                                switchDestinationStatus={() =>
                                  this.changeDetinationElementStatus(
                                    "to_indoor",
                                    "google"
                                  )
                                }
                                type={this.state.to_indoor.google}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Facebook} alt="" />
                            <span>Facebook</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              {this.state.to_indoor.facebook
                                ? "Live"
                                : "Deactive"}
                              <small
                                className={`${
                                  this.state.to_indoor.facebook
                                    ? classes.active_status_dot
                                    : classes.deactive_status_dot
                                }`}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown
                                switchDestinationStatus={() =>
                                  this.changeDetinationElementStatus(
                                    "to_indoor",
                                    "facebook"
                                  )
                                }
                                type={this.state.to_indoor.facebook}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Segment} alt="" />
                            <span>Segment.com</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              {this.state.to_indoor.segment
                                ? "Live"
                                : "Deactive"}
                              <small
                                className={`${
                                  this.state.to_indoor.segment
                                    ? classes.active_status_dot
                                    : classes.deactive_status_dot
                                }`}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown
                                switchDestinationStatus={() =>
                                  this.changeDetinationElementStatus(
                                    "to_indoor",
                                    "segment"
                                  )
                                }
                                type={this.state.to_indoor.segment}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
            {/*<!-- destionation style 2 -->*/}
            {this.state.destination === "Online to Outdoor" && (
              <div
                className={`${classes.destin_trees} ${classes.destion_style2}`}
              >
                <div className={classes.tree_sources}>
                  <div className={classes.trees_head}>
                    <h5 className={classes.trees_h5}>Sources</h5>
                    <button type="button" className={classes.add_sources}>
                      <img src={AddCircle} alt="" />
                      <span>Add source</span>
                    </button>
                  </div>
                  <ul
                    className={`${classes.sources_ul} ${
                      this.state.to_outdoor.items.length &&
                      (this.state.to_outdoor.items[0].item_name !== "google" &&
                      this.state.to_outdoor.items.length > 1
                        ? classes.first_short
                        : this.state.to_outdoor.items.at(-1).item_name !==
                            "segment" && this.state.to_outdoor.items.length > 1
                        ? classes.last_short
                        : "")
                    }`}
                  >
                    {this.state.to_outdoor.items.map((el, i) => (
                      <li
                        key={i}
                        className={`${classes.sources_li} ${
                          el.item_name === "segment" &&
                          !this.state.to_outdoor.items.find(
                            (element) =>
                              element.item_name === this.state.to_outdoor.center
                          ) &&
                          this.state.to_outdoor.items.length > 1
                            ? classes.short_center
                            : !this.state.to_outdoor.items.find(
                                (element) =>
                                  element.item_name ===
                                  this.state.to_outdoor.center
                              ) &&
                              !this.state.to_outdoor.items.find(
                                (element) => element.item_name === "segment"
                              )
                            ? classes.short_center_last
                            : !this.state.to_outdoor.items.find(
                                (element) =>
                                  element.item_name ===
                                  this.state.to_outdoor.center
                              ) &&
                              !this.state.to_outdoor.items.find(
                                (element) => element.item_name === "google"
                              )
                            ? classes.short_center_first
                            : ""
                        }`}
                      >
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={el.item_img} alt="" />
                            <span>{el.item_platform}</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              {el.active ? "Live" : "Deactive"}
                              <small
                                className={`${
                                  el.active
                                    ? classes.active_status_dot
                                    : classes.deactive_status_dot
                                }`}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown
                                switchDestinationStatus={() =>
                                  this.changeDetinationElementStatus(
                                    "to_outdoor",
                                    el.item_name
                                  )
                                }
                                deleteElementFromOnline={() =>
                                  this.deleteOnlineElement(
                                    "to_outdoor",
                                    el.item_name
                                  )
                                }
                                type={el.active}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {false && (
                    <ul>
                      {" "}
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Google} alt="" />
                            <span>Google Ads</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              Live
                              <small
                                className={classes.active_status_dot}
                              ></small>
                            </span>
                            <div className={classes.dot_dropdown}>
                              <ToggleButtonDopDown />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Facebook} alt="" />
                            <span>Facebook</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              Deactive
                              <small
                                className={classes.deactive_status_dot}
                              ></small>
                            </span>

                            <ToggleButtonDopDown />
                          </div>
                        </div>
                      </li>
                      <li className={classes.sources_li}>
                        <div className={classes.sources_item}>
                          <p className={classes.sources_p}>
                            <img src={Segment} alt="" />
                            <span>Segment.com</span>
                          </p>
                          <div className={classes.source_item_right}>
                            <span className={classes.source_status}>
                              Live
                              <small
                                className={classes.active_status_dot}
                              ></small>
                            </span>
                            <ToggleButtonDopDown />
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
                <div className={classes.tree_center}>
                  {this.state.to_outdoor.items.find(
                    (item) => item.item_name === this.state.to_outdoor.center
                  ) && (
                    <img src={LastLine} alt="" className={classes.first_line} />
                  )}
                  <img src={FirstLine} alt="" className={classes.last_line} />
                  <div className={classes.tree_m}>
                    <img src={L} alt="" className={classes.tree_center_m} />
                  </div>
                  {this.state.to_outdoor.items.length &&
                    this.state.to_outdoor.items[0].item_name === "google" && (
                      <img src={Line1} alt="" className={classes.tree_line1} />
                    )}
                  {this.state.to_outdoor.items.length &&
                    this.state.to_outdoor.items.at(-1).item_name ===
                      "segment" && (
                      <img src={Line2} alt="" className={classes.tree_line2} />
                    )}
                </div>

                <div className={classes.tree_destionations}>
                  <div className={classes.trees_head}>
                    <h5 className={classes.trees_h5}>Destination</h5>
                    <button type="button" className={classes.add_sources}>
                      <img src={AddCircle} alt="" />
                      <span>Add Destination</span>
                    </button>
                  </div>
                  <ul className={classes.sources_ul}>
                    <li className={classes.sources_li}>
                      <div className={classes.sources_item}>
                        <p className={classes.sources_p}>
                          <img src={Micon} alt="" />
                          <span>MurmurCars</span>
                        </p>
                        <div className={classes.source_item_right}>
                          <span className={classes.source_status}>
                            {this.state.to_outdoor.murmur
                              ? "Active"
                              : "Deactive"}
                            <small
                              className={`${
                                this.state.to_outdoor.murmur
                                  ? classes.active_status_dot
                                  : classes.deactive_status_dot
                              }`}
                            ></small>
                          </span>
                          <div className={classes.dot_dropdown}>
                            <ToggleButtonDopDown
                              switchDestinationStatus={() =>
                                this.toggleMurmur(
                                  "to_outdoor",
                                  'murmur'
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Destination;
