import React from "react";

import classes2 from "../../assets/css/StreetIQ/index.module.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  render() {
    const { areaStatistic, Country, expandStatisticModalWithScrool, modal } =
      this.props;

    const segments = Object.keys(areaStatistic);

    return (
      <React.Fragment>
        <div className={classes2.stc_result_list}>
          <div className={classes2.stc_list_each}>
            {Object.keys(areaStatistic[segments[0]]).map((segment, index) => {
              return (
                <React.Fragment key={index}>
                  {modal && (
                    <p>
                      {segment === "nonRetiredPopulation"
                        ? "non retired population"
                        : segment === "retiredPopulation"
                        ? "retired population"
                        : segment.split("_").join(" ").toLowerCase()}
                    </p>
                  )}
                  <ul key={index}>
                    {Object.keys(areaStatistic[segments[0]][segment]).map(
                      (key, i) => (
                        <li className={classes2.stc_list_li} key={i}>
                          <p>{key.split("_").join(" ")}</p>
                          <span>
                            {areaStatistic["Population"][segment][key]}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </React.Fragment>
              );
            })}
          </div>
          <div className={classes2.stc_list_each}>
            <ul>
              {modal && Country.includes("US") ? (
                <p>race</p>
              ) : modal ? (
                <p>ethnisity</p>
              ) : null}
              {Object.keys(areaStatistic[segments[1]]).map((key, index) => (
                <li className={classes2.stc_list_li} key={index}>
                  <p>{key.split("_").join(" ")}</p>
                  <span>{areaStatistic[segments[1]][key]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes2.stc_list_each}>
            {Country.includes("US") ? (
              Object.keys(areaStatistic["Real_Estate"]).map(
                (segment, index) => (
                  <React.Fragment key={index}>
                    {modal && <p>{segment.split("_").join(" ")}</p>}
                    <ul>
                      {Object.keys(areaStatistic["Real_Estate"][segment]).map(
                        (key, index) => (
                          <li className={classes2.stc_list_li} key={index}>
                            <p>{key.split("_").join(" ").toLowerCase()}</p>
                            <span>
                              {areaStatistic["Real_Estate"][segment][key]}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </React.Fragment>
                )
              )
            ) : (
              <>
                {modal && (
                  <p>{segments[2].split("_").join(" ").toLowerCase()}</p>
                )}
                <ul>
                  {Object.keys(areaStatistic["Business"]).map((key, index) => (
                    <li className={classes2.stc_list_li} key={index}>
                      <p>{key.split("_").join(" ").toLowerCase()}</p>
                      <span>{areaStatistic["Business"][key]}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div
              className={` ${classes2.button_expand_modal} ${
                Country === "Georgia" && modal
                  ? classes2.button_fixed_2
                  : modal
                  ? classes2.button_fixed
                  : null
              }`}
            >
              {" "}
              <button
                type="button"
                onClick={() => {
                  this.setState({
                    modal: !this.state.modal,
                  });
                  expandStatisticModalWithScrool();
                }}
              >
                {modal ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Statistic;
