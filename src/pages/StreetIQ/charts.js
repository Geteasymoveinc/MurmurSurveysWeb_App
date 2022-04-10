import React from "react";

import classes2 from "../../assets/css/StreetIQ/index.module.css";

import PieChart from "./pieChart";
import ENthnisityChart from "./EthnisityAndRace";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  render() {
    const {
      selectedDataSegment,
      areaStatistic,
      Places,
      Country,
      expandStatisticModalWithScrool,
    } = this.props;

    const { modal } = this.props;
    let propsArr = [];
    let lablesArr = [];
    const segments = Object.keys(areaStatistic);
    let RaceOrEthnisity = Object.keys(areaStatistic[segments[1]]);

    RaceOrEthnisity = RaceOrEthnisity.filter((data) => data !== "azeri");
    

    let props = {};
    let data = {};
    
 
    for (let i = 0; i < RaceOrEthnisity.length; i++) {
      data[RaceOrEthnisity[i]] = Number.parseInt(
        areaStatistic[segments[1]][RaceOrEthnisity[i]]
      );
    }
    RaceOrEthnisity = RaceOrEthnisity.map((data) => data.split("_").join(" "));
    const labels = RaceOrEthnisity;
    lablesArr.push(labels);
    props = { ...data };

    let Population = Object.keys(areaStatistic[segments[0]]);

    //Population = Population.map((data) => data.split("_").join(" "));
    propsArr.push(props);

    for (let x = 1; x < Population.length; x++) {
      let label = Object.keys(areaStatistic[segments[0]][Population[x]]).map(
        (data) => data.split("_").join(" ")
      );
      let inner = Object.keys(areaStatistic[segments[0]][Population[x]]);
      data = [];
      props = {};
      lablesArr.push(label);
      for (let y = 0; y < inner.length; y++) {
        data[inner[y]] = Number.parseInt(
          areaStatistic[segments[0]][Population[x]][inner[y]]
        );
      }
      props = { ...data };
      if (
        Population[x] !== "nonRetiredPopulation" &&
        Population[x] !== "retiredPopulation"
      ) {
        propsArr.push({ [Population[x].split("_").join(" ")]: props });
      } else if (Population[x] === "nonRetiredPopulation") {
        propsArr.push({ "non retired population": props });
      } else {
        propsArr.push({ "retired population": props });
      }
    }
    console.log(propsArr);
    console.log(lablesArr);
    return (
      <React.Fragment>
        <div className={classes2.stc_result_list}>
          <div className={classes2.stc_list_each}>
            <ul>
              <p>Population {Population[0]}</p>
              <li className={`${classes2.stc_list_li}`}>
                <PieChart
                  labels={["males", "females"]}
                  males={
                    areaStatistic["Population"]["General"]["population_males"]
                  }
                  females={
                    areaStatistic["Population"]["General"]["population_females"]
                  }
                />
              </li>
            </ul>
            <ul>
              {propsArr.slice(1, propsArr.length).map((el, i) => {
                if(Country !=='US'){
                return (
                 <>
                 <p>{Object.keys(el)[0]}</p>
                    <li
                      className={`${
                        lablesArr[i + 1].length > 5 &&
                        classes2.stc_list_li_height
                      } ${classes2.stc_list_li}`}
                    >
                      <ENthnisityChart
                        labels={lablesArr[i + 1]}
                        data={el[Object.keys(el)[0]]}
                      />
                    </li>
                
                  </>
                );
                }else if(Object.keys(el)[0] !=='Income'){
                  return (
                  <>
                  <p>{Object.keys(el)[0]}</p>
                     <li
                       className={`${
                         lablesArr[i + 1].length > 5 &&
                         classes2.stc_list_li_height
                       } ${classes2.stc_list_li}`}
                     >
                       <ENthnisityChart
                         labels={lablesArr[i + 1]}
                         data={el[Object.keys(el)[0]]}
                       />
                     </li>
                 
                   </>
                  )
                }
              })}
            </ul>
          </div>
          <div className={classes2.stc_list_each}>
            {Country !== "US" ? ( <ul>
                <p>Ethnisity</p>
                <li className={`${classes2.stc_list_li}`}>
                  <ENthnisityChart labels={lablesArr[0]} data={propsArr[0]} />
                </li>
              </ul>
            ) :  <ul>  <p>Race</p>
            <li className={`${classes2.stc_list_li}`}>
              <ENthnisityChart labels={lablesArr[0]} data={propsArr[0]} />
            </li>
          </ul>}
          </div>
          <div className={classes2.stc_list_each}>
            {Country !== "US" ? (
              <ul>
                <p>Business</p>
                <li className={`${classes2.stc_list_li}`}>
                  <PieChart
                    labels={["males", "females"]}
                    males={areaStatistic["Business"]["enterpreneurs_male"]}
                    females={areaStatistic["Business"]["enterpreneurs_female"]}
                  />
                </li>
              </ul>
            ): null}
            <div
              className={`d-flex justify-content-end align-items-flex-end ${
                classes2.button_expand_modal
              } ${modal ? classes2.button_fixed  : null} ${modal? classes2.button_fixed_charts:null}`}
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

export default Charts;
