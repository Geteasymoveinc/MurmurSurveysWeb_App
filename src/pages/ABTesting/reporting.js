import React, { Component } from "react";

import ReportingChart from "./reportingchart";

import Gallery from "../../assets/css/ABTesting/gallery.svg";
import classes from "../../assets/css/ABTesting/index.module.css";

class ABReporting extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h4 className={classes.testing_h4}>Report</h4>
        <p className={classes.testing_p}>
          {" "}
          The Variant 1 has a 100% probability to be the best.
        </p>
        <div className={classes.testing_table}>
          <table className={classes.ab_reports_table}>
            <thead>
              <tr>
                <th>
                  <span className={classes.ab_th}>Name</span>
                </th>
                <th>
                  <span className={classes.ab_th}>View</span>
                </th>
                <th>
                  <span className={classes.ab_th}>Engagements</span>
                </th>
                <th>
                  <span className={classes.ab_th}>Dweel time</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={classes.ab_td_tt}>
                    1. <small>Variant 1</small>
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>
                    <small className={classes.ab_td_plus}>+600</small>
                    {/*<!-- <small class="ab_td_minus">-200</small> -->*/}
                    1000
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>
                    <small className={classes.ab_td_plus}>+600</small>
                    {/*<!-- <small class="ab_td_minus">-200</small> -->*/}
                    5000
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>5s</span>
                </td>
                <td>
                  <a href="#" className={classes.view_creative_report}>
                    <span>View Creative</span>
                    <img src={Gallery} alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <span className={classes.ab_td_tt}>
                    2. <small>Variant 2</small>
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>
                    {/*<!-- <small class="ab_td_plus">+600</small> -->*/}
                    <small className={classes.ab_td_minus}>-200</small>
                    1500
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>
                    {/*<!-- <small class="ab_td_plus">+600</small> -->*/}
                    <small className={classes.ab_td_minus}>-200</small>
                    7000
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>20s</span>
                </td>
                <td>
                  <a href="#" className={classes.view_creative_report}>
                    <span>View Creative</span>
                    <img src={Gallery} alt="" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={classes.reports_charts}>
            <ReportingChart className={classes.reports_graph} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ABReporting;
