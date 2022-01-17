
import React from 'react'

import classes2 from "../../assets/css/StreetIQ/index.module.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { segments, selectedDataSegment, areaStatistic, Places } = this.props;

    return (
      <div className={classes2.stc_result_list}>
        <div className={classes2.stc_list_each}>
          {segments[0] === "Population" && (
            <React.Fragment>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Population</p>
                  <span>{areaStatistic.population}</span>
                </li>

                <li className={classes2.stc_list_li}>
                  <p>Female</p>
                  <span>
                    {Number.parseFloat(areaStatistic.population_females)}
                  </span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Male</p>
                  <span>
                    {Number.parseFloat(areaStatistic.population_males)}
                  </span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Retired</p>
                  <span>
                    {Number.parseFloat(areaStatistic.retiredPopulation.male) +
                      Number.parseFloat(areaStatistic.retiredPopulation.female)}
                  </span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Non-Retired</p>
                  <span>
                    {" "}
                    {Number.parseFloat(
                      areaStatistic.nonRetiredPopulation.male
                    ) +
                      Number.parseFloat(
                        areaStatistic.nonRetiredPopulation.female
                      )}
                  </span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Kids</p>
                  <span>
                    {Number.parseFloat(
                      areaStatistic.nonRetiredPopulation.kids.boy
                    ) +
                      Number.parseFloat(
                        areaStatistic.nonRetiredPopulation.kids.girl
                      )}
                  </span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>age_0_19</p>
                  <span>{areaStatistic.population_age["age_0_19"]}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>age_20_24</p>
                  <span>{areaStatistic.population_age["age_20_24"]}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>age_25_34</p>
                  <span>{areaStatistic.population_age["age_25_34"]}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>age_35_44</p>
                  <span>{areaStatistic.population_age["age_35_44"]}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>age_45_54</p>
                  <span>{areaStatistic.population_age["age_45_54"]}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>age_55_74</p>
                  <span>{areaStatistic.population_age["age_55_74"]}</span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>marriage quantity</p>
                  <span>{areaStatistic.marriage_total_quantity}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>divorcement quantity</p>
                  <span>{areaStatistic.divorcement_total_quantity}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>marriage male quantity</p>
                  <span>
                    {Number.parseFloat(
                      areaStatistic.population_marriage_growth.male["age_18_29"]
                    ) +
                      Number.parseFloat(
                        areaStatistic.population_marriage_growth.male[
                          "age_30_44"
                        ]
                      ) +
                      Number.parseFloat(
                        areaStatistic.population_marriage_growth.male["age_45_"]
                      )}
                  </span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>marriage female quantity</p>
                  <span>
                    {Number.parseInt(
                      areaStatistic.population_marriage_growth.female[
                        "age_18_29"
                      ]
                    ) +
                      Number.parseInt(
                        areaStatistic.population_marriage_growth.female[
                          "age_30_44"
                        ]
                      ) +
                      Number.parseInt(
                        areaStatistic.population_marriage_growth.female[
                          "age_45_"
                        ]
                      )}
                  </span>
                </li>
              </ul>
            </React.Fragment>
          )}

          {segments[0] === "Ethnisity" && (
            <React.Fragment>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Azeri</p>
                  <span>{areaStatistic.population_ethnicity.azeri}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Russian</p>
                  <span>{areaStatistic.population_ethnicity.russian}</span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Lezgi</p>
                  <span>{areaStatistic.population_ethnicity.lezgi}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Jewish</p>
                  <span className={classes2.stc_list_li}>
                    {areaStatistic.population_ethnicity.jewish}
                  </span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Georgians</p>
                  <span>{areaStatistic.population_ethnicity.georgians}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Turkish</p>
                  <span className={classes2.stc_list_li}>
                    {areaStatistic.population_ethnicity.turkish}
                  </span>
                </li>
              </ul>
            </React.Fragment>
          )}
          {segments[0] === "Business" && (
            <React.Fragment>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Quantity of Business</p>
                  <span>{areaStatistic.quantity_of_businesses}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Quantity of Small Business</p>
                  <span>{areaStatistic.quantity_of_small_businesses}</span>
                </li>
              </ul>
              <ul>
                <li className={classes2.stc_list_li}>
                  <p>Enterpreneurs Female</p>
                  <span>{areaStatistic.enterpreneurs_gender.female}</span>
                </li>
                <li className={classes2.stc_list_li}>
                  <p>Enterpreneurs Male</p>
                  <span>{areaStatistic.enterpreneurs_gender.male}</span>
                </li>
              </ul>
            </React.Fragment>
          )}
          {segments[0] === "Places" && (
            <React.Fragment>
              <ul>
                {areaStatistic.popular_places_in_area &&
                  areaStatistic.popular_places_in_area.map((place, index) => {
                    if (
                      place[Object.keys(place)[0]].position &&
                      (Places.length > 0 &&
                      Places === ">4"
                        ? place[Object.keys(place)[0]].rating > 4
                        : place[Object.keys(place)[0]].rating < 4)
                    ) {
                      return (
                        <li key={index} className={classes2.stc_list_li}>
                          <p>{Object.keys(place)[0]}</p>
                          <span>{place[Object.keys(place)[0]].rating}</span>
                          <span>{place[Object.keys(place)[0]].address}</span>
                        </li>
                      );
                    } else if (place[Object.keys(place)[0]].position) {
                      return (
                        <li key={index} className={classes2.stc_list_li}>
                          <p>{Object.keys(place)[0]}</p>
                          <span>{place[Object.keys(place)[0]].rating}</span>
                          <span>{place[Object.keys(place)[0]].address}</span>
                        </li>
                      );
                    }
                  })}
              </ul>
            </React.Fragment>
          )}
        </div>
        <div className={classes2.stc_list_each}>
          <ul>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value="Population"
                onClick={() => selectedDataSegment("Population")}
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value="Ethnisity"
                onClick={() => selectedDataSegment("Ethnisity")}
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value="Business"
                onClick={() => selectedDataSegment("Business")}
              />
            </li>
            <li className={classes2.stc_list_li_input}>
              <input
                type="button"
                value="Places"
                onClick={() => selectedDataSegment("Places")}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Statistic;
