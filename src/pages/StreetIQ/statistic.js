import React from "react";

import classes2 from "../../assets/css/StreetIQ/index.module.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { segments, selectedDataSegment, areaStatistic, Places, Country } =
      this.props;

    return (
      <div className={classes2.stc_result_list}>
        <div className={classes2.stc_list_each}>
          {segments[0] === "Population" && (
            <React.Fragment>
              {Object.keys(areaStatistic[segments[0]]).map((segment, index) => (
                <ul key={index}>
                  <h6>{segment}</h6>
                  {Object.keys(areaStatistic[segments[0]][segment]).map(
                    (key, index) => (
                      <li className={classes2.stc_list_li} key={index}>
                        <p>{key}</p>
                        <span>{areaStatistic[segments[0]][segment][key]}</span>
                      </li>
                    )
                  )}
                </ul>
              ))}
            </React.Fragment>
          )}

          {(segments[0] === "Ethnisity" || segments[0] === "Race") && (
            <React.Fragment>
              <ul>
                <h6>{segments[0]}</h6>
                {Object.keys(areaStatistic[segments[0]]).map((key, index) => (
                  <li className={classes2.stc_list_li} key={index}>
                    <p>{key}</p>
                    <span>{areaStatistic[segments[0]][key]}</span>
                  </li>
                ))}
              </ul>
              )
            </React.Fragment>
          )}
          {(segments[0] === "Business" || segments[0] === "Real_Estate") && (
            <React.Fragment>
              {segments[0] === "Real_Estate" ? (
                Object.keys(areaStatistic[segments[0]]).map(
                  (segment, index) => (
                    <ul key={index}>
                      <h6>{segment}</h6>
                      {Object.keys(areaStatistic[segments[0]][segment]).map(
                        (key, index) => (
                          <li className={classes2.stc_list_li} key={index}>
                            <p>{key}</p>
                            <span>
                              {areaStatistic[segments[0]][segment][key]}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  )
                )
              ) : (
                <ul>
                  <h6>{segments[0]}</h6>
                  {Object.keys(areaStatistic[segments[0]]).map((key, index) => (
                    <li className={classes2.stc_list_li} key={index}>
                      <p>{key}</p>
                      <span>{areaStatistic[segments[0]][key]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          )}
          {(segments[0] === "Places" || segments[0] === "Education") && (
            <React.Fragment>
              {segments[0] === "Places"
                ? areaStatistic[segments[0]].map((area, index) => {
                    if (
                      Places.length === 0
                        ? true
                        : Places === ">4"
                        ? Object.keys(area)[0] === "high_rated"
                        : Object.keys(area)[0] === "low_rated"
                    ) {
                      return (
                        <ul key={index}>
                          <h6>{Object.keys(area)[0]}</h6>
                          {area[Object.keys(area)[0]].map((el, i) => (
                            <li className={classes2.stc_list_li} key={i}>
                              <p>{Object.keys(el)[0]}</p>
                              <span>
                                {el[Object.keys(el)[0]].rating +
                                  " rated, at " +
                                  el[Object.keys(el)[0]].address}
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                  })
                : Object.keys(areaStatistic[segments[0]]).map(
                    (segment, index) => (
                      <ul key={index}>
                        <h6>{segment}</h6>
                        {Object.keys(areaStatistic[segments[0]][segment]).map(
                          (key, index) => (
                            <li className={classes2.stc_list_li} key={index}>
                              <p>{key}</p>
                              <span>
                                {areaStatistic[segments[0]][segment][key]}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    )
                  )}
              
            </React.Fragment>
          )}
        </div>
        <div className={classes2.stc_list_each}>
          <ul>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value={`${Object.keys(areaStatistic)[0]}`}
                onClick={() =>
                  selectedDataSegment(Object.keys(areaStatistic)[0])
                }
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value={`${Object.keys(areaStatistic)[1]}`}
                onClick={() =>
                  selectedDataSegment(Object.keys(areaStatistic)[1])
                }
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value={`${
                  Object.keys(areaStatistic)[2]
                    ? Object.keys(areaStatistic)[2]
                    : "N/A"
                }`}
                onClick={() =>
                  selectedDataSegment(Object.keys(areaStatistic)[2])
                }
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value={`${
                  Object.keys(areaStatistic)[3]
                    ? Object.keys(areaStatistic)[3]
                    : "N/A"
                }`}
                onClick={() =>
                  selectedDataSegment(Object.keys(areaStatistic)[3])
                }
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Statistic;
