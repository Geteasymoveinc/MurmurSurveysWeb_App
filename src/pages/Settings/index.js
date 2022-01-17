import React, { Component } from "react";

import axios from "axios";

import { connect } from "react-redux";
import { queryForEmail } from "../../helpers/fakebackend_helper";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import EditProfileImage from "../../assets/css/Settings/edit.svg";
import SMS from "../../assets/css/common/icons/sms.svg";
import Location from "../../assets/css/layout/location.svg";
import Lock from "../../assets/css/common/icons/lock.svg";
import Eye from "../../assets/css/common/icons/icon.svg";
import EyeSlash from "../../assets/css/common/icons/eye-slash.svg";
import Phone from "../../assets/css/Authentication/Register/mobile.svg";
import Building from "../../assets/css/Settings/building.svg";
import Car from "../../assets/css/Settings/car.svg";

import classes from "../../assets/css/Settings/settings.module.css";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import Modal from "./settingsModal";

import ImageUploader from "react-images-upload";

import { Upload } from "antd";
const { Dragger } = Upload;

const propsD = {
  name: "file",
  multiple: true,

  /* onChange(info) {
    console.log({ info });
    const { status } = info.file;
   if (status !== "uploading") {
    console.log(info.file, info.fileList);
   }
   if (status === "done") {
     //message.success(`${info.file.name} file uploaded successfully.`);
   } else if (status === "error") {
      //message.error(`${info.file.name} file upload failed.`);
  }
 },*/
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: false,
      canselModal: false,
      updateModal: false,
      stng_email: sessionStorage.getItem("authUser"),
      stng_company: "",
      stng_phone: "",
      stng_password: "",
      stng_fullName: "",
      email: true,
      password: true,
      phone_number: true,
      company: true,
      billing: "plan_walk",
      image: "",
      loading: false,
      subscription_status: "",
    };
    this.toggleEye = this.toggleEye.bind(this);
  }

  toggleEye() {
    this.setState({ ...this.state, text: !this.state.text });
  }

  openUpdateModal = () => {
    this.setState({ ...this.state, updateModal: true });
  };

  closeUpdateModal = () => {
    this.setState({ ...this.state, updateModal: false });
  };

  openCanselModal = () => {
    this.setState({ ...this.state, canselModal: true });
  };

  closeCanselModal = () => {
    this.setState({ ...this.state, canselModal: false });
  };

  handleFileChange = (info) => {
    const reader = new FileReader();
    console.log(info);
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      console.log(e.target.result.length);

      this.setState({ ...this.state, image: e.target.result });
    };
  };

  settingInputsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.state, [name]: value });
  };

  selectUpdatePackage = (event) => {
    const name = event.target.id;

    this.setState({ ...this.state, billing: name });
    console.log(this.state);
  };

  submitUpdateSettings = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", this.state.stng_email);
    formData.append("phone_number", this.state.stng_phone);
    formData.append("company", this.state.stng_company);
    if (this.state.password.length > 0) {
      formData.append("password", this.state.stng_password);
    }
    formData.append("profile_photo", this.state.image);
    formData.append("advertise_options", this.state.stng_advertise_options);
    formData.append(
      "subscribedToMurmurNewsettler",
      this.state.stng_subscribedToMurmurNewsettler
    );
    formData.append("fullName", this.state.stng_fullName);
    formData.append("subscription_status", this.state.subscription_status);
    console.log(formData.values());
    axios({
      url: `https://backendapp.murmurcars.com/api/v1/users/update/${this.state.stng_id}`,
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
    /*   data: {
        email: this.state.stng_email,
        phone_number: this.state.stng_phone,
        company: this.state.stng_company,
        password: this.state.stng_password,
        profile_photo: this.state.image,
        advertise_options: this.state.stng_advertise_options,
        subscribedToMurmurNewsettler: this.state.stng_subscribedToMurmurNewsettler
      },*/
  };

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    queryForEmail( "https://backendapp.murmurcars.com/api/v1/users/checkEmail", {
      email: this.state.stng_email,
    })
      .then((res) => {
        console.log(res);
        const data = res.resp.at(-1);
        this.setState({
          ...this.state,
          stng_id: data._id,
          stng_company: data.company,
          stng_phone: data.phone_number,
          stng_advertise_options: data.advertise_options,
          stng_subscribedToMurmurNewsettler: data.subscribedToMurmurNewsettler,
          stng_fullName: data.fullName,
          subscription_status: data.subscription_status,
          loading: false,
        });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
        })
      );
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.loading && (
          <div id="preloader">
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
          </div>
        )}
        {!this.state.loading && (
          <div className={classes.dash_right}>
            <form className={classes.head_search}>
              <h1 className={classes.dash_h1}>Settings</h1>

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
            {/*<!-- settings block -->*/}
            <div className={classes.setting_block}>
              <div className={classes.setting_left}>
                <h4 className={classes.stng_plan}>Subscription Plan</h4>

                <div className={classes.stng_profil}>
                  <Dragger
                    listType="picture-card"
                    {...propsD}
                    openFileDialogOnClick={true}
                    showUploadList={false}
                    beforeUpload={() => false}
                    className="profil_img_edit"
                    onChange={(info) => this.handleFileChange(info)}
                    style={{
                      background: "white",
                      borderColor: "transparent",
                    }}
                  >
                    <div className={classes.profil_relative}>
                      <ProfileMenu scope={"local"} image={this.state.image} />
                      <img
                        className={classes.profil_img_edit}
                        src={EditProfileImage}
                        alt="prfofile image edit"
                      />
                    </div>
                  </Dragger>
   
                  {/*} <input type="file" className={classes.profil_img_edit}/>*/}

                  <div className={classes.stng_profil_detail}>
                    <p>{this.state.stng_fullName}</p>
                    <span>Active</span>
                  </div>
                </div>
                <form onSubmit={this.submitUpdateSettings}>
                  <div className={classes.stng_form}>
                    <div className={classes.stng_form_item}>
                      <label
                        htmlFor="stng-email"
                        className={classes.stng_label}
                      >
                        E-mail
                      </label>
                      <div className={classes.stng_form_flex}>
                        <div className={classes.stng_relative}>
                          <img
                            src={SMS}
                            alt="email icon"
                            className={classes.stng_email_icon}
                          />
                          <input
                            type="email"
                            className={classes.stng_element}
                            name="stng_email"
                            id="stng-email"
                            value={this.state.stng_email}
                            onChange={this.settingInputsChange}
                            disabled={this.state.email}
                          />
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState({ ...this.state, email: false })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className={classes.stng_form_item}>
                      <label
                        htmlFor="stng-password"
                        className={classes.stng_label}
                      >
                        Password
                      </label>
                      <div className={classes.stng_form_flex}>
                        <div className={classes.stng_relative}>
                          <input
                            type={this.state.text ? "text" : "password"}
                            className={classes.stng_element}
                            name="stng_password"
                            id="stng-password"
                            placeholder="123456"
                            onChange={this.settingInputsChange}
                            value={this.state.stng_password}
                            disabled={this.state.password}
                          />
                          <img
                            src={Lock}
                            alt=""
                            className={classes.stng_email_icon}
                          />
                          <button
                            type="button"
                            className={classes.pass_eye}
                            onClick={this.toggleEye}
                          >
                            <img
                              src={this.state.text ? EyeSlash : Eye}
                              alt=""
                            />
                          </button>
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState({ ...this.state, password: false })
                          }
                        >
                          Edit
                        </button>
                      </div>
                      {/*<span className={classes.pass_error}>
                    Must be at least 8 characters.
              </span>*/}
                    </div>
                    <div className={classes.stng_form_item}>
                      <label
                        htmlFor="stng-phone"
                        className={classes.stng_label}
                      >
                        Phone number
                      </label>
                      <div className={classes.stng_form_flex}>
                        <div className={classes.stng_relative}>
                          <input
                            type="phone"
                            className={classes.stng_element}
                            name="stng_phone"
                            id="stng-phone"
                            value={this.state.stng_phone}
                            onChange={this.settingInputsChange}
                            disabled={this.state.phone_number}
                            placeholder=""
                          />
                          <img
                            src={Phone}
                            alt=""
                            className={classes.stng_email_icon}
                          />
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              phone_number: false,
                            })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className={classes.stng_form_item}>
                      <label
                        htmlFor="stng-company"
                        className={classes.stng_label}
                      >
                        Company name
                      </label>
                      <div className={classes.stng_form_flex}>
                        <div className={classes.stng_relative}>
                          <input
                            type="text"
                            className={classes.stng_element}
                            name="stng_company"
                            id="stng-company"
                            value={this.state.stng_company}
                            disabled={this.state.company}
                            onChange={this.settingInputsChange}
                          />
                          <img
                            src={Building}
                            alt=""
                            className={classes.stng_email_icon}
                          />
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState({ ...this.state, company: false })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className={classes.stng_form_item}>
                      <label
                        htmlFor="stng-address"
                        className={classes.stng_label}
                      >
                        Company address
                      </label>
                      <div className={classes.stng_relative}>
                        <input
                          type="text"
                          className={classes.stng_element}
                          name="stng_address"
                          id="stng-address"
                          placeholder="Company address"
                        />
                        <img
                          src={Location}
                          alt=""
                          className={classes.stng_email_icon}
                        />
                      </div>
                    </div>
                    <div className={classes.stng_form_item}>
                      <label htmlFor="stng-city" className={classes.stng_label}>
                        City
                      </label>
                      <div className={classes.stng_relative}>
                        <input
                          type="text"
                          className={classes.stng_element}
                          name="stng_city"
                          id="stng-city"
                          placeholder="City"
                        />
                        <img
                          src={Location}
                          alt=""
                          className={classes.stng_email_icon}
                        />
                      </div>
                    </div>
                    <div className={classes.stng_row}>
                      <div className={classes.stng_col}>
                        <div className={classes.stng_form_item}>
                          <label
                            htmlFor="stng-state"
                            className={classes.stng_label}
                          >
                            State
                          </label>
                          <div className={classes.stng_relative}>
                            <input
                              type="text"
                              className={classes.stng_element}
                              name="stng_state"
                              id="stng-state"
                              placeholder="City"
                            />
                            <img
                              src={Location}
                              alt=""
                              className={classes.stng_email_icon}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={classes.stng_col}>
                        <div className={classes.stng_form_item}>
                          <label
                            htmlFor="stng-zip"
                            className={classes.stng_label}
                          >
                            Zip
                          </label>
                          <div className={classes.stng_relative}>
                            <input
                              type="text"
                              className={classes.stng_element}
                              name="stng_zip"
                              id="stng-zip"
                              placeholder="Zip"
                            />
                            <img
                              src={Location}
                              alt=""
                              className={classes.stng_email_icon}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className={classes.stng_submit}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div className={classes.setting_right}>
                <h4 className={classes.subc_plan}>Profile settings</h4>
                <div className={classes.subc_block}>
                  <div className={classes.subcrb_top}>
                    <div className={classes.ads_subtype}>
                      <p>Walk Package</p>
                      <span>30 Days remaining</span>
                      <span>
                        Type {this.state.stng_advertise_options}
                      </span>
                    </div>
                    <p className={classes.subc_price}>
                      56$<span>/month</span>
                    </p>
                  </div>
                  <div className={classes.subc_flex}>
                    <button
                      className={classes.subc_upgrade_plan}
                      onClick={this.openUpdateModal}
                    >
                      Upgrade plan
                    </button>
                    <button
                      type="button"
                      className={classes.subc_cancel}
                      onClick={this.openCanselModal}
                    >
                      Cancel plan
                    </button>
                  </div>
                  <img src={Car} alt="" className={classes.subc_car} />
                </div>
              </div>
              <Modal
                updateModal={this.state.updateModal}
                canselModal={this.state.canselModal}
                closeUpdateModal={this.closeUpdateModal}
                closeCanselModal={this.closeCanselModal}
                selectUpdatePackage={this.selectUpdatePackage}
                billing={this.state.billing}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user } = state.Login;
  return { user };
};

export default connect(mapStatetoProps)(Settings);
