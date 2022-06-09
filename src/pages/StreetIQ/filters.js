import React from "react";

import SearchModal from "./modal";

import classes2 from "../../assets/css/StreetIQ/index.module.css";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    }
  }

  render() {
    const {
      searchLocationsByFilterData,
      selectFilterData,
      Country,
      filters,
      filterMethod,
    } = this.props;

   /* const {
      Population,
      Places,
      Age,
      Gender,
      Marrige,
      Ethnisity,
      Birth,
      Non_Retired,
      Retired,
      Business,
      Small_Business,
      Income,
      Race,
      Real_Estate,
      Education,
    } = filterMethod;*/

    
 console.log(Country)
    return (
      <div className={classes2.stc_drops}>
        {filters.length &&
          filters.map((filter, i) => (
            <div className={classes2.stc_drop} key={i}>
              <div className={classes2.stc_drop_select}>
               <SearchModal
       statistic={filter.filter}
              labels= {filter.labels}
              filters={filter.filters}
              method={filterMethod[filter.filter]}
              activeRadio={(option) => selectFilterData(option, filter.filter)}
        />
              </div>
            </div>
          ))}
        {/*<div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Population"}
              labels={
                Country !== "US"
                  ? ["Less than 100.000", "More than 100.000"]
                  : ["Less than 50.000", "More than 50.000"]
              }
              filters={
                Country !== "US" ? ["<100000", ">100000"] : ["<50000", ">50000"]
              }
              method={Population}
              activeRadio={(option) => selectFilterData(option, "Population")}
            />
          </div>
        </div>

        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Age"}
              method={Age}
              labels={ Country !=='US' ?[
                "20-34 less than 10.000",
                "20-34 more than 10.000",
                "35-44 less than 20.000",
                "35-44 more than 20.000",
              ] : ['20-39 less than 20.000', '20-39 more than 20.000']}
              filters={Country !=='US' ? [
                "20-34<10000",
                "20-34>10000",
                "35-44<20000",
                "35-44>20000",
              ] : ['20-39<20000', '20-39>20000']}
              activeRadio={(option) => selectFilterData(option, "Age")}
            />
            
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Gender"}
              labels={["Males more than Females", "Females more than males"]}
              filters={["Males>Females", "Females>Males"]}
              method={Gender}
              activeRadio={(option) => selectFilterData(option, "Gender")}
            />
          
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={Country !== "US" ? "Marrige" : "Income"}
              labels={
                Country !== "US"
                  ? ["Less than 700", "More than 700"]
                  : ["Less than 100.000", "More than 100.000", 'Less than 50.000']
              }
              filters={
                Country !== "US" ? ["<700", ">700"] : ["<100000", ">100000", '<50000']
              }
              method={Country !== "US" ? Marrige : Income}
              activeRadio={(option) =>
                selectFilterData(
                  option,
                  Country !== "US" ? "Marrige" : "Income"
                )
              }
            />
            
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={Country !== "US" ? "Ethnisity" : "Race"}
              labels={
                Country !== "US"
                  ? ["russians<5.000 ", "russians>5.000"]
                  : ["white<1.000", "white>1.000"]
              }
              filters={
                Country !== "US" ? ["r<5000", "r>5000"] : ["w<1000", "w>1000"]
              }
              method={Country !== "US" ? Ethnisity : Race}
              activeRadio={(option) =>
                selectFilterData(
                  option,
                  Country !== "US" ? "Ethnisity" : "Race"
                )
              }
            />
            
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={Country !== "US" ? "Business" : "Real-Estate"}
              labels={
                Country !== "US"
                  ? ["Less than 10000", "More than 10000"]
                  : [
                      "median home value lover $200.000",
                      "median home value higher $200.000 ",
                    ]
              }
              filters={Country!=='US'?["b<10000", "b>10000"]: ['<200000', '>200000']}
              method={Country!=='US'? Business: Real_Estate}
              activeRadio={(option) => selectFilterData(option, Country !=='US'?"Business":'Real_Estate')}
            />
      
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            {Country!=='US' ? <SearchModal
              statistic={"Small Business"}
              labels={["Less than 500", "More than 500"]}
              filters={["b<500", "b>500"]}
              method={Small_Business}
              activeRadio={(option) =>
                selectFilterData(option, "Small_Business")
              }
            /> : <SearchModal
            statistic={"Education"}
            labels={["bachelors degree lover than 50%", "bachelors degree higher than 50%"]}
            filters={["b<50%", "b>59%"]}
            method={Education}
            activeRadio={(option) =>
              selectFilterData(option, "Education")
            }
            />}
            
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            {Country!=='US' && <SearchModal
              statistic={"Birth"}
              labels={[
                "Boys borm less than 1000",
                "Boys borm more than 1000",
                "Girls born less than 1000",
                'Girls born more than 1000'
              ]}
              filters={["b<1000", "b>1000", 'g<1000', 'g>1000']}
              method={Birth}
              activeRadio={(option) => selectFilterData(option, "Birth")}
            />}
          
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            {Country!=='US' && <SearchModal
              statistic={"Retired"}
              labels={["Males and Females < 15000", "Males and Females > 15000"]}
              filters={["r<15000", "r>15000"]}
              method={Retired}
              activeRadio={(option) => selectFilterData(option, "Retired")}
            />}

          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            {Country!=='US' && <SearchModal
              statistic={"Non_Retired"}
              labels={["Males and Females < 100000", "Males and females > 100000"]}
              filters={["n_r<100000", "n_r>100000"]}
              method={Non_Retired}
              activeRadio={(option) => selectFilterData(option, "Non_Retired")}
            />}
  
          </div>
            </div>*/}
       <div className={classes2.stc_drop}>
          <button
            className={classes2.stc_drop_submit}
            type="submit"
            onClick={() => searchLocationsByFilterData()}
          >
            <span>Search</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 16.5L15 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          </div>
      </div>
    );
  }
}

export default Filters;
