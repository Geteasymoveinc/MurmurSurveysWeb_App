import React, { Component, Fragment } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";
import Trash from "../../../assets/css/CreateAd/trash.svg";

import axios from "axios";

class PullParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      participants: this.props.participants,
      multiple_remove: false,
      multiple: false,
    };
  }

  checkParticipant = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;
    const participants = [...this.state.participants];
    let multiple = false;
    let count = 0;
    if (checked) {
      count++;
    }

    for (let i = 0; i < participants.length; i++) {
      if (participants[i]._id === id) {
        participants[i].checked = checked;
      }

      if (participants[i]._id !== id && participants[i].checked) {
        count++;
      }
    }
    if (count > 1) {
      multiple = true;
    }
    this.setState((state) => ({
      ...state,
      participants,
      multiple_remove: multiple,
    }));
  };

  checkAllParticipants = (e) => {
    const participants = [...this.state.participants];
    const checked = e.target.checked;

    for (let i = 0; i < participants.length; i++) {
      participants[i].checked = checked;
    }

    this.setState((state) => ({
      ...state,
      participants,
      multiple: checked,
      multiple_remove: checked,
    }));
  };

  handleParticipants = () => {
    const { multiple, multiple_remove } = this.state;
    let participants = [];

    this.state.participants.map((participant, i) => {
      participants.push(
        <tr key={participant._id}>
          <td className={classes.cads_td}>
            <div className={classes.cads_flex_th}>
              <div className={classes.cads_check}>
                <input
                  type="checkbox"
                  id={participant._id}
                  checked={
                    (multiple && participant.checked) || participant.checked
                  }
                  onChange={this.checkParticipant}
                />
                <label htmlFor={participant._id}>
                  <span className={classes.td_data}>
                    {participant.fullName}
                  </span>
                </label>
              </div>
              <div className={`${classes.cads_radio_active}`}>
                {participant.checked && !multiple_remove ? (
                  <button
                    type="button"
                    className={`${classes.check_remove}`}
                    onClick={() => this.deleteParticipants()}
                  >
                    <img src={Trash} alt="" />
                  </button>
                ) : null}
              </div>
            </div>
          </td>

          <td className={classes.cads_td}>
            <span className={classes.td_data}> {participant.phone_number}</span>
          </td>

          <td className={`${classes.cads_td} pr-0 text-center`}>
            <span className={classes.td_data}>{participant.email}</span>
          </td>
        </tr>
      );
    });

    return participants;
  };

  deleteParticipants = () => {
    const participants = this.state.participants;
    const list_of_ids = [];
    const leftParticipants = [];
    //this.setState({ ...this.state, loading: true });

    for (let participant of participants) {
      if (participant.checked) {
        list_of_ids.push(participant._id);
      } else {
        leftParticipants.push(participant);
      }
    }

    axios
      .delete(
        `http://localhost:4000/api/v1/surveys/survey/remove-participants/${list_of_ids}`
      )
      .then(() => {
        this.setState({
          ...this.state,
          //    loading: false,
          participants: leftParticipants,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { multiple, multiple_remove } = this.state;
    return (
      <Fragment>
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

        <div className={classes.cads_table}>
          <div />
          <table>
            <thead>
              <tr className={classes.first_tr}>
                <th className={`${classes.cads_th}`}>
                  <div
                    className={`${classes.cads_check} ${classes.invoice_th}`}
                  >
                    <input
                      type="checkbox"
                      id="survey"
                      onChange={this.checkAllParticipants}
                      checked={multiple}
                    />
                    <label htmlFor="survey">Name</label>
                    {multiple_remove && (
                      <button
                        type="button"
                        className={`${classes.check_remove} ${classes.multiple_remove}`}
                        onClick={() => this.deleteParticipants()}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                  </div>
                </th>

                <th className={classes.cads_th}>
                  <span>Number</span>
                </th>
                <th className={`${classes.cads_th} text-center`}>
                  <span>Email</span>
                </th>
              </tr>
            </thead>
            <tbody>{this.handleParticipants()}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default PullParticipants;
