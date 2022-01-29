import React, { Component } from "react";
import Gallery from "../../assets/css/ABTesting/gallery.svg";
import Add from "../../assets/css/ABTesting/add.svg";
import classes from "../../assets/css/ABTesting/index.module.css";

import AddVariantModal from "./add-variant";
import axios from "axios";

class ABTargets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Variants: [
        {
          name: "Variant 1",
          weight: "50%",
          img: Gallery,
        },
        {
          name: "Variant 2",
          weight: "50%",
          img: Gallery,
        },
      ],
    };
  }
  openAddVariantModal = () => {
    this.setState({
      modal: true,
    });
  };

  closeAddVariantModal = () => {
    this.setState({
      modal: false,
    });
  };

  addNewVariant = (data) => {
    const Variants = this.state.Variants;
    Variants.push({ name: data.name, weight: data.weight, img: Gallery });
    this.setState({ ...this.state, modal: false, Variants});
    axios.post('http://localhost:4000/api/v1/campaigns/create-ab-testing',{
      advertisers_email: sessionStorage.getItem('authUser'),
      ab_experiment: true,
      ad_creativity_url: data.image,
      ab_experiement_weight: data.weight,
      ad_schedule: data.DateFrom + ' ' + data.DateTo,
      ad_schedule_time: data.TimeFrom + " " +  data.TimeTo,
      ad_experiement_name: data.name
    }).then(resp => console.log(resp)).catch()
  };

  render() {
    return (
      <React.Fragment>
        <h4 className={classes.testing_h4}>Targeting and Variants</h4>
        <p className={classes.testing_p}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
          lacinia vel pulvinar pellentesque. Dolor.
        </p>
        <div className={classes.testing_table}>
          <table className={classes.ab_details_table}>
            <thead>
              <tr>
                <th>
                  <span className={classes.ab_th}>Name</span>
                </th>
                <th>
                  <span className={classes.ab_th}>Weight</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.Variants.map((variant, index) => (
                <tr key={index}>
                  <td>
                    <span className={classes.ab_td_tt}>
                      {index+1}. <small>{variant.name}</small>
                    </span>
                  </td>
                  <td>
                    <span className={classes.ab_td}>{variant.weight}</span>
                  </td>
                  <td>
                    <a href="#" className={classes.view_creative}>
                      <span>View Creative</span>
                      <img src={variant.img} alt="" />
                    </a>
                  </td>
                </tr>
              ))}
              {/*<tr>
                <td>
                  <span className={classes.ab_td_tt}>
                    1. <small>Variant 1</small>
                  </span>
                </td>
                <td>
                  <span className={classes.ab_td}>50%</span>
                </td>
                <td>
                  <a href="#" className={classes.view_creative}>
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
                  <span className={classes.ab_td}>50%</span>
                </td>
                <td>
                  <a href="#" className={classes.view_creative}>
                    <span>View Creative</span>
                    <img src={Gallery} alt="" />
                  </a>
                </td>
              </tr>*/}
            </tbody>
          </table>
          <button
            type="button"
            className={classes.new_variant_btn}
            onClick={this.openAddVariantModal}
          >
            <img src={Add} alt="" />
            <span>Add new Variant</span>
          </button>
        </div>

        <AddVariantModal
          modal={this.state.modal}
          closeModal={this.closeAddVariantModal}
          submitingSelectedData={this.addNewVariant}
        />
      </React.Fragment>
    );
  }
}

export default ABTargets;
