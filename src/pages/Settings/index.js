import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { queryForEmail } from '../../helpers/fakebackend_helper';

import EditProfileImage from '../../assets/css/Settings/edit.svg';
import SMS from '../../assets/css/common/icons/sms.svg';
import Location from '../../assets/css/layout/location.svg';
import Lock from '../../assets/css/common/icons/lock.svg';
import Eye from '../../assets/css/common/icons/icon.svg';
import EyeSlash from '../../assets/css/common/icons/eye-slash.svg';
import Phone from '../../assets/css/Authentication/Register/mobile.svg';
import Building from '../../assets/css/Settings/building.svg';
import classes from '../../assets/css/Settings/settings.module.css';

import ProfileMenu from '../../components/CommonForBoth/TopbarDropdown/ProfileMenu';

import { Upload } from 'antd';
import HeadSearch from '../../components/CommonForBoth/Headsearch';
const { Dragger } = Upload;

const propsD = {
  name: 'file',
  multiple: true,
  onDrop(e) {
  
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: false,
      company: '',
      phone_number: '',
      fullName: '',
      companyAddress: '',
      city: '',
      state: '',
      loading: false,
      profilePhoto: '',
      email: sessionStorage.getItem('authUser'),
      password: '',
      disabled: {
        email: true,
        fullName: true,
        password: true,
        phone_number: true,
        company: true,
      },
      image: '',
      file: '',
      profile_photo: '',
      wrong_credentials: [],
      updates: {},
    };
    this.toggleEye = this.toggleEye.bind(this);
  }

  toggleEye() {
    this.setState({ ...this.state, text: !this.state.text });
  }

  handleFileChange = (info) => {
    const reader = new FileReader();

    reader.readAsDataURL(info.file);
    reader.onload = (event) => {
      this.setState((state) => ({
        ...state,
        updates: {
          ...state.updates,
          profile_photo: info.file.name,
          imageFile: info.file,
        },
        image: event.target.result,
      }));
    };
  };

  settingInputsChange = (event) => {
    let name = event.target.name;
    const value = event.target.value;

    this.setState((state) => ({
      ...state,
      updates: { ...state.updates, [name]: value },
    }));
  };

  submitUpdateSettings = (event) => {
    event.preventDefault();
    let wrong_credentials = [];
    const password = this.state.updates.password;
    const email = this.state.updates.email;
    const password_edit = this.state.disabled.password;
    const email_edit = this.state.disabled.email;
    const updates = this.state.updates;

    if (!email_edit && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      wrong_credentials.push('email');
      this.setState({
        ...this.state,
        wrong_credentials: [...this.state.wrong_credentials, 'email'],
      });
    }
    if (
      !password_edit &&
      !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        password,
      )
    ) {
      wrong_credentials.push('password');
      this.setState({
        ...this.state,
        wrong_credentials: [...this.state.wrong_credentials, 'password'],
      });
    }

    if (!wrong_credentials.length) {
      this.setState({ ...this.state, loading: true });
      const formData = new FormData();

      for (let update in updates) {
        if (update === 'profile_photo') {
          formData.append(
            'profilePhoto',
            `https://stagingapp.murmurcars.com/advertisers/users/profilePhoto/${updates[update]}`,
          );
          continue;
        }
        if (update === 'imageFile') {
          formData.append('imageFile', updates[update]);
          continue;
        }
        formData.append([update], updates[update]);
      }

      axios({
        url: `https://stagingapp.murmurcars.com/api/v1/surveys/customer/update/${this.state._id}`,
        method: 'PUT',
        data: formData,
      })
        .then((res) => {
          const { data } = res;
          if(data.response.profilePhoto){
          sessionStorage.removeItem('profileImage');
          sessionStorage.setItem('profileImage', data.response.profilePhoto);
          }
          this.setState({ ...this.state, loading: false });
        })
        .catch((err) => {
          this.setState({ ...this.state, loading: false });
        });
    }
  };
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    queryForEmail(
      `https://stagingapp.murmurcars.com/api/v1/surveys/customer/checkEmail`,
      {
        email: this.state.email
      },
    )
      .then((res) => {
        const data = res.resp;

        this.setState({
          ...this.state,
          _id: data._id,
          company: data.company,
          phone_number: data.phone_number,
          //advertise_options: data.advertise_options,
          //subscribedToMurmurNewsettler: data.subscribedToMurmurNewsettler,
          fullName: data.fullName,
          companyAddress: data.companyAddress,
          city: data.city,
          state: data.state,
          subscription_status: data.subscription_status,
          loading: false,
          profilePhoto: data.profilePhoto
            ? data.profilePhoto.split(
                'https://stagingapp.murmurcars.com/advertisers/users/profilePhoto/',
              )[1]
            : null,
        });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
        }),
      );
  }

  render() {
    const { wrong_credentials, loading } = this.state;
    // const { hasBilling, hasSubscription } = user_billing;
    let email,
      password = false; // if failed validation

    if (wrong_credentials.length) {
      for (let i = 0; i < wrong_credentials.length; i++) {
        if (wrong_credentials[i] === 'email') {
          email = true;
        } else if (wrong_credentials[i] === 'password') {
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
            <HeadSearch page='Profile' />
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
                      background: 'white',
                      borderColor: 'transparent',
                    }}
                  >
                    <div className={classes.profil_relative}>
                      <ProfileMenu scope={'local'} image={this.state.image} />
                      <img
                        className={classes.profil_img_edit}
                        src={EditProfileImage}
                        alt=""
                      />
                    </div>
                  </Dragger>

                  {/*} <input type="file" className={classes.profil_img_edit}/>*/}

                  <div className={classes.stng_profil_detail}>
                    <p>{this.state.fullName}</p>
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
                            name="fullName"
                            id="stng-fullName"
                            defaultValue={this.state.fullName}
                            value={this.state.updates?.fullName}
                            onChange={this.settingInputsChange}
                            disabled={this.state.disabled.fullName}
                          />
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState((state) => ({
                              ...state,
                              disabled: { ...state.disabled, fullName: false },
                            }))
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
                            name="email"
                            id="stng-email"
                            defaultValue={this.state.email}
                            value={this.state.updates?.email}
                            onChange={(event) =>
                              this.settingInputsChange(event)
                            }
                            disabled={this.state.disabled.email}
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
                            this.setState((state) => ({
                              ...state,
                              disabled: { ...state.disabled, email: false },
                            }))
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
                            type={this.state.text ? 'text' : 'password'}
                            className={classes.stng_element}
                            name="password"
                            id="stng-password"
                            placeholder="123456"
                            onChange={(event) =>
                              this.settingInputsChange(event)
                            }
                            defaultValue={this.state.password}
                            value={this.state.updates?.password}
                            disabled={this.state.disabled.password}
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
                              {' '}
                              upercase, special character and 8 long
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className={classes.form_edit_btn}
                          onClick={() =>
                            this.setState((state) => ({
                              ...state,
                              disabled: { ...state.disabled, password: false },
                            }))
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
                            name="phone_number"
                            id="stng-phone"
                            defaultValue={this.state.phone_number}
                            value={this.state.updates?.phone_number}
                            onChange={this.settingInputsChange}
                            disabled={this.state.disabled.phone_number}
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
                            this.setState((state) => ({
                              ...state,
                              disabled: {
                                ...state.disabled,
                                phone_number: false,
                              },
                            }))
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
                            name="company"
                            id="stng-company"
                            defaultValue={this.state.company}
                            value={this.state.updates?.company}
                            disabled={this.state.disabled.company}
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
                            this.setState((state) => ({
                              ...state,
                              disabled: { ...state.disabled, company: false },
                            }))
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
                          name="companyAddress"
                          id="stng-address"
                          placeholder="Company address"
                          defaultValue={this.state.companyAddress}
                          value={this.state.updates?.companyAddress}
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
                          name="city"
                          id="stng-city"
                          defaultValue={this.state.city}
                          value={this.state.updates?.city}
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
                              name="state"
                              id="stng-state"
                              defaultValue={this.state.state}
                              value={this.state.updates?.state}
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
                              name="zip"
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
