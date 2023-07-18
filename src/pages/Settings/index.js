import React, { Component } from "react";

import axios from "axios";

import { connect } from "react-redux";
import { queryForEmail } from "../../helpers/fakebackend_helper";

import EditProfileImage from "../../assets/css/Settings/edit.svg";
import SMS from "../../assets/css/common/icons/sms.svg";
import Location from "../../assets/css/layout/location.svg";
import Lock from "../../assets/css/common/icons/lock.svg";
import Eye from "../../assets/css/common/icons/icon.svg";
import EyeSlash from "../../assets/css/common/icons/eye-slash.svg";
import Phone from "../../assets/css/Authentication/Register/mobile.svg";
import Building from "../../assets/css/Settings/building.svg";
import classes from "../../assets/css/Settings/settings.module.css";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import { Upload } from "antd";
import HeadSearch from "../../components/CommonForBoth/Headsearch";
const { Dragger } = Upload;

const propsD = {
  name: "file",
  multiple: true,
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
      stng_address: "",
      stng_city: "",
      stng_state: "",
      email: true,
      fullName: true,
      password: true,
      phone_number: true,
      company: true,
      image: "",
      file: "",
      profile_photo: "",
      loading: false,
      wrong_credentials: [],
    };
    this.toggleEye = this.toggleEye.bind(this);
  }

  toggleEye() {
    this.setState({ ...this.state, text: !this.state.text });
  }

  openModal = (modal) => {
    this.setState({ ...this.state, [modal]: true });
  };

  toggleModal = (modal) => {
    this.setState({ ...this.state, [modal]: false });
  };

  handleFileChange = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file);
    reader.onload = (event) => {
      this.setState({
        ...this.state,
        image: event.target.result,
        file: info.file,
        profile_photo: info.file.name,
      });
    };
  };

  settingInputsChange = (event) => {
    let name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.state, [name]: value });
  };

  submitUpdateSettings = (event) => {
    event.preventDefault();
    let wrong_credentials = [];
    const password = this.state.stng_password;
    const email = this.state.stng_email;
    const password_edit = this.state.password;
    const email_edit = this.state.email;
    if (!password_edit || !email_edit) {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
        wrong_credentials.push("email");
        this.setState({
          ...this.state,
          wrong_credentials: [...this.state.wrong_credentials, "email"],
        });
      }
      if (
        !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          password
        )
      ) {
        wrong_credentials.push("password");
        this.setState({
          ...this.state,
          wrong_credentials: [...this.state.wrong_credentials, "password"],
        });
      }
    }
    if (!wrong_credentials.length) {
      this.setState({ ...this.state, loading: true });
      const formData = new FormData();
      formData.append("email", this.state.stng_email);
      formData.append("phone_number", this.state.stng_phone);
      formData.append("company", this.state.stng_company);
      if (this.state.stng_password.length) {
        formData.append("password", this.state.stng_password);
      }
      //formData.append("photo", this.state.image);
      formData.append("advertise_options", this.state.stng_advertise_options);
      formData.append(
        "subscribedToMurmurNewsettler",
        this.state.stng_subscribedToMurmurNewsettler
      );
      formData.append("fullName", this.state.stng_fullName);
      formData.append("subscription_status", this.state.subscription_status);
      if (this.state.profile_photo) {
        formData.append("photo", this.state.profile_photo);
      }
      formData.append("companyAddress", this.state.stng_address);
      formData.append("profilePhoto", this.state.file);
      //formData.append('billing_id', this.state.user_billing._id)
      axios({
        url: `https://backendapp.murmurcars.com/api/v1/users/update/${this.state.stng_id}`,
        method: "PUT",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          sessionStorage.removeItem("profileImage");
          sessionStorage.setItem(
            "profileImage",
            `http://backendapp.murmurcars.com/advertisers/users/profilePhoto/${this.state.profile_photo}`
          );
          this.setState({ ...this.state, loading: false });
        })
        .catch((err) => {
          this.setState({ ...this.state, loading: false });
          alert(err);
        });
    }
  };

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: this.state.stng_email,
        role: "2",
      }
    )
      .then((res) => {
        const data = res.resp;

        this.setState({
          ...this.state,
          stng_id: data._id,
          stng_company: data.company,
          stng_phone: data.phone_number,
          stng_advertise_options: data.advertise_options,
          stng_subscribedToMurmurNewsettler: data.subscribedToMurmurNewsettler,
          stng_fullName: data.fullName,
          stng_address: data.companyAddress,
          stng_city: data.city,
          stng_state: data.state,
          subscription_status: data.subscription_status,
          loading: false,
          profile_photo: data.profilePhoto
            ? data.profilePhoto.split(
                "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
              )[1]
            : null,
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
    const { wrong_credentials, loading } = this.state;

    let email,
      password = false;

    if (wrong_credentials.length) {
      for (let i = 0; i < wrong_credentials.length; i++) {
        if (wrong_credentials[i] === "email") {
          email = true;
        } else if (wrong_credentials[i] === "password") {
          password = true;
        }
      }
    }

    return (
      <React.Fragment>
        {loading && (
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
        {!loading && (
          <div
            className={`${classes.dash_right} ${
              classes[this.props.layoutTheme]
            }`}
          >
            <HeadSearch page={"Settings"} />
            {/*<!-- settings block -->*/}
            <div className={classes.setting_block}>
              <div className={classes.setting_left}>
                <h4 className={classes.stng_plan}>Profile settings</h4>

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
                        htmlFor="stng-fullName"
                        className={classes.stng_label}
                      >
                        Full name
                      </label>
                      <div className={classes.stng_form_flex}>
                        <div className={classes.stng_relative}>
                          <img
                            src={SMS}
                            alt="email icon"
                            className={classes.stng_email_icon}
                          />
                          <input
                            type="text"
                            className={classes.stng_element}
                            name="stng_fullName"
                            id="stng-fullName"
                            value={this.state.stng_fullName}
                            onChange={this.settingInputsChange}
                            disabled={this.state.fullName}
                          />
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState({ ...this.state, fullName: false })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
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
                            type="text"
                            className={classes.stng_element}
                            name="stng_email"
                            id="stng-email"
                            value={this.state.stng_email}
                            onChange={(event) =>
                              this.settingInputsChange(event)
                            }
                            disabled={this.state.email}
                          />
                          {email && (
                            <span className={classes.pass_error}>
                              incorrect email
                            </span>
                          )}
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
                            onChange={(event) =>
                              this.settingInputsChange(event)
                            }
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
                          {password && (
                            <span className={classes.pass_error}>
                              {" "}
                              upercase, special character and 8 long
                            </span>
                          )}
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
                          value={this.state.stng_address}
                          onChange={this.settingInputsChange}
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
                          value={this.state.stng_city}
                          onChange={this.settingInputsChange}
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
                              value={this.state.stng_state}
                              onChange={this.settingInputsChange}
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
                              onChange={this.settingInputsChange}
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
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user } = state.Login;

  return { user, ...state.Layout };
};

export default connect(mapStatetoProps)(Settings);
