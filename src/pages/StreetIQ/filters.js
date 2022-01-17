import React from "react";

import SearchModal from "./modal";

import classes2 from "../../assets/css/StreetIQ/index.module.css";

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
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
    } = this.props.filterMethod;
    const { searchDistricts,selectActiveRadio } = this.props;
    
    return (
      <div className={classes2.stc_drops}>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Population"}
              labels={["Less than 100.000", "More than 100.000"]}
              filters={["<100000", ">100000"]}
              method={Population}
              activeRadio={(option) =>
                selectActiveRadio(option, "Population")
              }
            />
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Popular Places"}
              labels={["high rated", "low rated"]}
              filters={[">4", "<4"]}
              method={Places}
              activeRadio={(option) => selectActiveRadio(option, "Places")}
            />
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Age"}
              method={Age}
              labels={["20-34 less 30.000", "20-34 more 30.000"]}
              filters={["20-34<30000", "20-34>30000"]}
              activeRadio={(option) => selectActiveRadio(option, "Age")}
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Gender"}
              labels={["Males more than Females", "Females more than males"]}
              filters={["Males>Females", "Females>Males"]}
              method={Gender}
              activeRadio={(option) => selectActiveRadio(option, "Gender")}
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Marrige"}
              labels={["Less than 300", "More than 300"]}
              filters={["<300", ">300"]}
              method={Marrige}
              activeRadio={(option) =>
                selectActiveRadio(option, "Marrige")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Ethnisity"}
              labels={["russians<5000 ", "russians>5000"]}
              filters={["r<5000", "r>5000"]}
              method={Ethnisity}
              activeRadio={(option) =>
            selectActiveRadio(option, "Ethnisity")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Business"}
              labels={["Less than 10000", "More than 10000"]}
              filters={["b<10000", "b>10000"]}
              method={Business}
              activeRadio={(option) =>
                selectActiveRadio(option, "Business")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Small Business"}
              labels={["Less than 200", "More than 200"]}
              filters={["b<200", "b>200"]}
              method={Small_Business}
              activeRadio={(option) =>
                selectActiveRadio(option, "Small_Business")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Birth"}
              labels={[
                "Born boys less than girls",
                "Born boys more than girls",
              ]}
              filters={["b<g", "b>g"]}
              method={Birth}
              activeRadio={(option) => selectActiveRadio(option, "Birth")}
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Retired"}
              labels={["Less than 15000", "More than 15000"]}
              filters={["b<15000", "b>15000"]}
              method={Retired}
              activeRadio={(option) =>
                selectActiveRadio(option, "Retired")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <div className={classes2.stc_drop_select}>
            <SearchModal
              statistic={"Non_Retired"}
              labels={["Less than 100000", "More than 100000"]}
              filters={["b<100000", "b>100000"]}
              method={Non_Retired}
              activeRadio={(option) =>
                selectActiveRadio(option, "Non_Retired")
              }
            />
            {/*<!-- <span class="stc_slcted">#more than 5</span> -->*/}
          </div>
        </div>
        <div className={classes2.stc_drop}>
          <button
            className={classes2.stc_drop_submit}
            type="submit"
            onClick={searchDistricts}
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
